import Promise from 'ahbing-promise';
import xhr from './xhr';

import { warn, isObject, isFunction } from './util';

const reqHandlers = [sendRequest];
const resHandlers = [];
const handler;
const Client = function(request) {
  return new Promise((reslove) => {
    function exec() {
      handler = reqHandlers.pop();
      if (typeof handler === 'function') {
        handler.call(null, request, next);
      } else {
        warn(`${handler}必须是一个函数`);
        next();
      }
    }

    function next(response) {
      if (isFunction(response)) {
        resHandlers.unshift(response);
        exec();
      } else if (isObject(response)) {
        resHandlers.push(reslove);  // 最后 reslove(response)
        resHandlers.forEach((handler) => {
          response = Promise.reslove(response).then((response) => {
            return handler.call(null, response);
          });
        });
        // Promise.reslove(response).then((response) => {
        //   return reslove.call(response);
        // });
        return;
      }
    }

    exec();
  }); 
};
Client.use = (handler) => {
  reqHandlers.push(handler);
};

const sendRequest = function(request, next) {
  const client = request.client || xhr;
  // 发送请求
  next(client(request));
};

export default Client;
