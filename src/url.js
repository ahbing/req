/**
 * Url 解析请求/响应生成完整的 rul
 */

import { each, isObject, isString, isArray } from './util';

const el = document.createElement('a');

export default function Url(request) {
  // generate a url by request url & params
  let root = request.root || null;
  let url = request.url || '';
  let query = Url.params(request.params);
  if (isString(root) && !url.match(/^(https?:)/)) {
    url = root + '/' + url
  }
  if (query) {
    url = url + '?' + query;
  }
  return url;
}


Url.parse = (url) => {
  // parse href to an object
  el.href = url;

  return {
    href: el.href,
    protocol: el.protocol || '',
    port: el.port,
    host: el.host, // host = hostnmae + port
    hostname: el.hostname,
    pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
    search: el.search,
    hash: el.hash
  }
};

Url.params = (obj) => {
  const params = [];
  const escape = encodeURIComponent;

  params.add = (key, value) => {
    if (value == null) value = ''; 
    params.push(escape(key) + '=' + escape(value));
  };
  
  serialize(params, obj);
  return params.join('&').replace('/%20/g', '+');
}

function serialize(params, obj) {
  if (isObject(obj)) {
    each(obj, (value, key) => {
      params.add(key, value);
    })
  }
}
