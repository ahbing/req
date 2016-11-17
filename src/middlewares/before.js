/**
 * 注册请求发送前的回调 
 */

import { isFunction } from './../util';

export default function before(request, next) {
  if (isFunction(request.before)) {
    request.before.call(null, request);
  } 
  next();
}
