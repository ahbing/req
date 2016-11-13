import Promise from 'ahbing-promise';
import xhrClient from './xhr';

import { warn, isObject, isFunction } from './../util';

const reqHandlers = [sendRequest];
const resHandlers = [];
let handler;
const client = function(request) {
  return new Promise((reslove) => {
    function exec() {
      handler = reqHandlers.pop();
      if (handler && isFunction(handler)) {
        handler.call(null, request, next);
      } else {
        warn(`${handler}必须是一个函数`);
        next();
      }
    }

    function next(response) {
      if (isFunction(response)) {
        resHandlers.unshift(response);
      } else if (isObject(response)) {
        resHandlers.push(reslove);  // 最后 reslove(response)
        resHandlers.forEach((handler) => {
          response = Promise.reslove(response).then((response) => {
            return handler.call(null, response);
          });
        });
      } 
      exec();
    }

    exec();

  }); 
};

client.use = (handler) => {
  reqHandlers.push(handler);
};

const sendRequest = function(request, next) {
  const sendClient = request.client || xhrClient;
  // 发送请求
  next(sendClient(request));
};

export default client;
