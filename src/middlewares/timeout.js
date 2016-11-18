/**
 * 注册请求超时的回调
 * - 如果请求超时就将请求取消掉
 * - 在响应的 resHanders[] 里清除定时器 
 */
export default function timeout(request, next) {
  let timeout;
  if (request.timeout) {
    timeout = setTimout(() => {
      request.abort();
    }, request.timeout);
  }
  next((response) => {
    timeout && clearTimeout(timeout);
    return response;
  });
}
