/**
 * 处理 jsonp 请求
 * - 判断是否是 jsonp 请求
 * - 是 jsonp 请求则设置 request.client 为 jsonpClient
 * - 创建响应的处理方法 通过 next 传入给 resHandlers[] 
 */

import jsonpClient from './../client/jsonp';
import Promise from 'ahbing-promise';

export default function jsonp(request, next) {
  if (request.method === 'JSONP') {
    request.client = jsonpClient;
  }

  function jsonpResHandler(response) {
    if (request.method === 'JSONP') {
      return Promise.resolve(response.json()).then(function(json) {
        response.body = json;
        return response;
      })
    }
    return response;
  }
  
  next(jsonpResHandler);
}
