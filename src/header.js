/**
 * Header 构造 http 头部
 */

import { each } from './util';

export default class Header {
  constructor(headers) {
    this.map = {};
    
    each(headers, (value, key) => {
      this.append(value, key);
    });    
  }

  append(value, key) {
    if (key && !this.has(key)) {
      this.set(key, value);
    }
  }

  has(key) {
    return this.map[key];
  }

  set(key, value) {
    this.map[key] = value;
  }

  get(key) {
    return this.map[key];
  }

  delete(key) {
    delete this.map[key];
  }
};
