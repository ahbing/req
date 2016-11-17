/**
 * Response 构造一个响应体
 */
import Header from './header';
import { isString } from './util';


export default class Response {
  constructor(body, { url, header, status, statusText }) {
    this.url = url;
    this.header = new Header(header);
    this.status = status;
    this.ok = status >= 200 && status < 300;
    this.statusText = statusText;
    this.body = body;
    if (isString(body)) {
      this.bodyText = body;
    }
  }
}


