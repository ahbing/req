import Request from './request';
import Response from './response';
import Promise from 'ahbing-promise';

import client from './client';

// middlewares
import before from './middlewares/before';
import timeout from './middlewares/timeout';
import method from './middlewares/method';
import body from './middlewares/body';
import header from './middlewares/header';
import jsonp from './middlewares/jsonp';
import cors from './middlewares/cors';
import { assign } from './util';

const CUSTOM_HEADERS = { 'X-Requested-With': 'XMLHttpRequest' };
const COMMON_HEADERS = { 'Accept': 'application/json, text/plain, */*' };
const JSON_CONTENT_TYPE = { 'Content-Type': 'application/json;charset=utf-8' };

export default function Req(options) { 
  let newOptions = assign(Req.options, options);
  Req.middlewares.forEach((middleware) => {
    client.use(middleware);
  });
  return client(new Request(newOptions)).then((response) => {
    response.ok ? response : Promise.reject(response);
  }, (response) => {
    Promise.reject(response);
  });
};

Req.headers = {
  put: JSON_CONTENT_TYPE,
  post: JSON_CONTENT_TYPE,
  patch: JSON_CONTENT_TYPE,
  delete: JSON_CONTENT_TYPE,
  custom: CUSTOM_HEADERS,
  common: COMMON_HEADERS
};

Req.options = {};

Req.middlewares = [before, timeout, method, body, jsonp, header, cors];

[
  'get',
  'head',
  'delete',
  'jsonp',
].forEach((method) => {
  Req[method] = function(url, options) {
    return this(assign(options || {}, { url, method }));
  }
});

[
  'post',
  'put',
  'patch'
].forEach((method) => {
  Req[method] = function(url, body, options) {
    return this(assign(options || {}, { url, method, body }));
  }
});

