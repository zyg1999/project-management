const JSONbig = require('json-bigint');

const PROTECTION_PREFIX = /^\)\]\}',?\n/;

const headers: {
  [key: string]: string;
} = {
  'X-Requested-With': 'XMLHttpRequest',
};
export const customOptions = {
  headers,
  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: 'csrftoken', // default
  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-CSRFToken', // default
  // 若需提交大数，则也需要transformRequest。参考：tea_fe/node_modules/axios/lib/defaults.js
  transformResponse: [
    function transformResponse(data: string | any) {
      // 对响应中的 response 进行JSONbig的转换，以防数据太大，导致超出js原生的计算范围
      if (typeof data === 'string') {
        data = data.replace(PROTECTION_PREFIX, '');
        try {
          data = JSONbig.parse(data);
        } catch (e) {
          /* Ignore */
        }
      }
      return data;
    },
  ],
};
export const URL_PREFIX = '';

export const finalCustomOptions = {
  ...customOptions,
  baseURL: URL_PREFIX,
};
