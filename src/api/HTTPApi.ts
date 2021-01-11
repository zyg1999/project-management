import axios, { AxiosError, AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { message } from 'antd';
import uuidV4 from 'uuid';

type TResponse = AxiosResponse & { request: { responseURL: string } };
interface ICusHttpOpt extends Partial<AxiosRequestConfig> {
  isCustomErrCode?: boolean;
  isCustomRes?: boolean;
  isCustomErrHttp?: boolean;
  isAddLogIdHeader?: boolean;
  isWrapData?: boolean;
}
interface IParamOpt {
  url: string;
  method: NonNullable<AxiosRequestConfig['method']>;
}
interface IGetParam extends IParamOpt {
  params: object;
}
interface IPostParam  extends IParamOpt {
  data: object;
}
type IOmit<T, K> = Pick<T, Exclude<keyof T, keyof K>>;

interface IErrTracerParam {
  request_id: string;
  url: string;
  http_code?: number;
  ajax_error_msg?: string;
  is_online?: string;
}

export type IGetCustomOpt = IOmit<ICusHttpOpt, IGetParam>;
export type IPostCustomOpt = IOmit<ICusHttpOpt, IPostParam>;
export default class HttpApi {

  axiosInstance: AxiosInstance & { [key: string]: any };

  constructor(options?: AxiosRequestConfig) {
    this.axiosInstance = axios.create(options);
  }

  get = (url: string, params: object = {}, cusOpt?: IGetCustomOpt) => {
    return this.request({
      method: 'get',
      url, params,
    }, cusOpt);
  }
  post = (url: string, params: object = {}, cusOpt?: IPostCustomOpt) => {
    return this.request({
      method: 'post',
      url,
      data: params,
    }, cusOpt);
  }
  put = (url: string, params: object = {}, cusOpt?: IPostCustomOpt) => {
    return this.request({
      method: 'put',
      url,
      data: params,
    }, cusOpt);
  }
  del = (url: string, params: object = {}, cusOpt?: IPostCustomOpt) => {
    return this.request({
      method: 'delete',
      url,
      data: params,
    }, cusOpt);
  }
  patch = (url: string, params: object = {}, cusOpt?: IOmit<ICusHttpOpt, IPostParam>) => {
    return this.request({
      method: 'patch',
      url,
      data: params,
    }, cusOpt);
  }
  request(options: IPostParam | IGetParam, customOpt: ICusHttpOpt = {}) {
    const {
      isCustomErrCode = false, isCustomRes = false, isCustomErrHttp = false,
      isAddLogIdHeader = true, isWrapData = false,
      ...otherOpts
    } = customOpt;
    const lastOption = { ...otherOpts, ...options };
    const requestId = uuidV4();
    const startTime = new Date();
    const headers = {
      ...lastOption.headers,
    };
    if (isAddLogIdHeader) {
      headers['X-TT-LOGID'] = requestId;
    }
    return this.axiosInstance.request({
      ...lastOption,
      headers,
      params: {
        ...lastOption.params,
        trace_id: requestId,
        env: 'development',
      },
    }).then(response => {
      if (isCustomRes) {
        return response;
      }
      const { data } = response;
      if (data.code === 200) {
        return isWrapData ? data : data.data;
      }
      if (isCustomErrCode) {
        return Promise.reject(response);
      }
      const text = '未知错误';
      message.error(data.message || text, 5);
      return Promise.reject(response);
    }, (err: AxiosError) => {
      if (axios.isCancel(err)) {
        return Promise.reject(err);
      }
      if (this.axiosInstance.defaults.baseURL === '/tea/api') {
        this._sendHttpEvent(err, options, requestId, startTime);
      }
      if (isCustomErrHttp) {
        return Promise.reject(err);
      }
      this._processNot200HttpCode(err);
      return Promise.reject(err);
    }) as Promise<any>;
  }

  _processNot200HttpCode(err: AxiosError) {
    if (axios.isCancel(err)) {
      console.log(JSON.stringify(err));
      return;
    }
    // http 非200区域的状态码
    let msg = '';
    const duration = 5;
    if (err.response) {
      // eg:404,503
      const { response } = err;
      msg = `[${response.status}] ${response.statusText}`;
    } else {
      // eg:Net Error
      switch (err.message.toLowerCase()) {
        case 'network error':
          msg = '请检查网络状态是否正常';
          // 前端无法区分跨域错误和网络错误，只能通过检查网络是否正常来武断的判断。
          // 目前会误判的情况：域名解析错误、
          if (window.navigator.onLine) {
            // duration = 9999999
            // eslint-disable-next-line
            // msg = <span>网络错误或登录超时！请<a href="javascript:window.location.reload()">刷新页面</a>，重新登录。</span>
          }
          break;
        default:
          msg = err.message;
      }
      err.message = msg;
    }
    message.destroy();
    message.error(msg, duration);
  }
  _sendHttpEvent(err: AxiosError, options: IPostParam | IGetParam, requestId: string, startTime: Date) {
    const costTime = +new Date() - +startTime;
    const params: IErrTracerParam = { url: '', request_id: requestId };
    if (err.response) {
      params.http_code = err.response.status;
      if ((err.response as TResponse).request) {
        params.url = (err.response as TResponse).request.responseURL;
      }
    } else if (err.message) { // 这种情况一般是网络出了问题，ajax不会返回response
      params.url = err.config.url || '';
      params.ajax_error_msg = err.message;
      params.is_online = window.navigator.onLine ? 'yes' : 'no';
    }
    // 报警接口不需要上报也不能报错，否则会死循环
    const ignoreUrls = ['version', 'notification', 'bad_api_alarm'];
    if (ignoreUrls.some(item => params.url.indexOf(item) > -1)) {
      return;
    }
    // TODO js报错收集 [XHR Error], params
  }
}

