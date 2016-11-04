/**
 * 处理跨域请求 
 * - 判断是否是跨域请求
 * - 如果是跨域请求，则删除 request.emulateHTTP 即 x-http-Method-Override
 * - 交给下一个中间件处理 next()
 */


// const isSupportsCors = 'withCredentials' in new XMLHttpRequest();

function isCrossOrigin(request) {
  // 解析 request => requestUrl
  // 解析 location.href => originUrl
  // @todo 解析函数
  // const originUrl 
  // const requestUrl;
  // return (requestUrl.protocol !== originUrl.protocol || requestUrl.host !== originUrl.host)
  return true;
}
if (!request.crossOrigin && isCrossOrigin(request)) {
  request.crossOrigin = true;
}
export default function cors(request, next) {
  if (request.crossOrigin) {
    delete request.emulateHTTP;
  }
  // console.log('request===', request);
  next();
}
