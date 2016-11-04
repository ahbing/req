/**
 * 请求头处理 
 * - 根据是否跨域 生成请求头 headers
 * - 与原 request.headers 求并
 * - 交给下一个中间件处理 next()
 */

import Req from './../index';
import { toLower, each } from './../util';

export default function header(request, next) {
  const crossOriginHeaders = !request.crossOrigin ? Req.headers.custom : {};
  const methodHeaders = Req.headers[toLower(request.method)]
  const headers = Object.assign({}, Req.headers.common, crossOriginHeaders, methodHeaders);

  each(request.header, (v, k) => {
    if (!request.header.has(k)) {
      request.header.set(k, v);
    }
  });

  next();
}
