/**
 * 处理跨域请求 
 * - 判断是否是跨域请求
 * - 如果是跨域请求，则删除 request.emulateHTTP 即 x-http-Method-Override
 * - 交给下一个中间件处理 next()
 */

import Url from './../url';
const isSupportsCors = 'withCredentials' in new XMLHttpRequest();

function isCrossOrigin(request) {
  const originUrl = Url.parse(location.href);
  const requestUrl = Url.parse(Url(request));
  return (requestUrl.protocol !== originUrl.protocol || requestUrl.host !== originUrl.host)
}
export default function cors(request, next) {
  if (!request.crossOrigin && isCrossOrigin(request)) {
    request.crossOrigin = true;
  } 
  if (request.crossOrigin) {
    delete request.emulateHTTP;
  }
  if (!isSupportsCors) {
    // XMLHttpRequest not support cors 
  }
  next();
}
