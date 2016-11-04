/**
 * 处理请求方法 
 */
export default function method(request, next) {
  // http method 代理
  if (request.emulateHTTP && /^(DELETE|PUT|PATCH)$/i.test(request.method)) {
    request.header.set('X-HTTP-Method-Overried', request.method);
    request.method = 'POST';
  }
  next();
}