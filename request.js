/**
 * Request 构造一个请求体
 */

import Response from './response';
import Header from './header';
import { assign, toUpper } from './util';

export default class Request {
  constructor(options) {
    this.body = null;
    this.params = {};
    assign(this, options, {
      method: toUpper(options.method) || 'GET',
    });
    if (!(this.header instanceof Header)) {
      this.header = new Header(this.header);
    }
  }
  getUrl() {
    // return this.url;
  }
  getBody() {
    return this.body;
  }
  responseWith() {
    return new Response();
  } 
} 

