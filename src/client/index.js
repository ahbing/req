import Promise from 'ahbing-promise';
import xhrClient from './xhr';

import { warn, isObject, isFunction } from './../util';

let reqHandlers = [sendRequest];
let resHandlers = [];
let handler;
const client = function(request) {
  
  return new Promise((resolve) => {
    function exec() {
      handler = reqHandlers.pop();
      
      if (isFunction(handler)) {
        handler.call(null, request, next);
        
      } else if (handler) {
        warn(`${handler} is not a function`);
        next();
      }
    }

    function next(response) {
      if (isFunction(response)) {
        resHandlers.unshift(response);
      } else if (isObject(response)) {   
        resHandlers.forEach((handler) => {
          response = Promise.resolve(response).then((response) => {
            return handler.call(null, response);
          });
        });

        return resolve(response);
      } 
      exec();
    }

    exec();

  }); 
};

client.use = (handler) => {
  reqHandlers.push(handler);
};

function sendRequest(request, next) {
  const sendClient = request.client || xhrClient;
  // 发送请求
  next(sendClient(request));
};

export default client;
