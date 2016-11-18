/**
 * Request 构造一个请求体
 */

import Response from './response';
import Header from './header';
import { toUpper, assign } from './util';
import Url from './url';

export default class Request {
  constructor(options) {
    this.body = null;
    this.params = {};
    Object.assign(this, options, {
      method: toUpper(options.method) || 'GET',
    });
    if (!(this.header instanceof Header)) {
      this.header = new Header(this.header);
    }
  }
  getUrl() {
    // 解析 request.params 等等  生成 url
    return Url(this);
  }
  getBody() {
    return this.body;
  }
  responseWith(body, options) {
    return new Response(body, assign(options || {}, { url: this.getUrl() }));
  }
} 

