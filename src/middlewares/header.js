/**
 * 请求头处理 
 * - 根据是否跨域 生成请求头 headers
 * - 与原 request.headers 求并
 * - 交给下一个中间件处理 next()
 */
import { toLower, assign, each } from './../util';

const CUSTOM_HEADERS = { 'X-Requested-With': 'XMLHttpRequest' };
const COMMON_HEADERS = { 'Accept': 'application/json, text/plain, */*' };
const JSON_CONTENT_TYPE = { 'Content-Type': 'application/json;charset=utf-8' };

const HEADERS = {
  put: JSON_CONTENT_TYPE,
  post: JSON_CONTENT_TYPE,
  patch: JSON_CONTENT_TYPE,
  delete: JSON_CONTENT_TYPE,
  custom: CUSTOM_HEADERS,
  common: COMMON_HEADERS
};

export default function header(request, next) {
  const crossOriginHeaders = !request.crossOrigin ? HEADERS.custom : {};
  const methodHeaders = HEADERS[toLower(request.method)] || {};
  const headers = assign(HEADERS.common, crossOriginHeaders, methodHeaders);

  each(headers, (v, k) => {
    if (!request.header.has(k)) {
      request.header.set(k, v);
    }
  });

  next();
}

