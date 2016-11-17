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

