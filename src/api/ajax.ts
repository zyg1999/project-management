import HttpApi, { IGetCustomOpt, IPostCustomOpt } from './HttpApi';
import { finalCustomOptions, URL_PREFIX } from './customOptions';

const axiosInstance = new HttpApi(finalCustomOptions);
const { get, post, del } = axiosInstance;

axiosInstance.axiosInstance.interceptors.request.use(config => {
  const newConf = {
    ...config,
    headers: {
      ...config.headers,
      'X-Date': new Date().toUTCString(),
    },
  };
  return newConf;
});
export default axiosInstance;