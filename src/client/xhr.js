
import Promise from 'ahbing-promise';

import { isFunction, trim, each } from './../util';

export default function xhrClient(request) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    const handler = function(event) {
      // 生成 response
      const response = request.responseWith(
        'response' in xhr ? xhr.response : xhr.responseText, {
          status: xhr.status,
          statusText: xhr.statusText
        }
      ); 
      each(trim(xhr.getAllResponseHeaders()).split('\n'), (row) => {
        let colonIndex = row.indexOf(":");
        response.header.append(row.slice(colonIndex + 1), row.slice(0, colonIndex));  
      });
      resolve(response);
    };

    request.abort = () => xhr.abort();

    if (isFunction(request.progress)) {
      if (request.method === 'GET') {
        xhr.addEventListener('progress', request.progress);
      } else if (/^(POST|PUT)$/i.test(request.method)) {
        xhr.upload.addEventListener('progress', request.progress);
      }
    }

    if (request.credentials) {
      xhr.withCredentials = true;
    }
    xhr.open(request.method, request.getUrl(), true);

    // Http 请求各部分有指定顺序：
    // 请求方法和 URL 首先到达，然后是请求头，最后是请求主体。
    // XMLHttpRequest 实现通常之道调用 send() 方法才开始启动网络。 
    // 所有 setRequestHeader() 方法的调用必须在 open() 方法之后，send() 方法之前。

    each(request.header.map, (v, k) => {
      xhr.setRequestHeader(k, v);
    });
    
    xhr.onload = handler;
    xhr.onerror = handler;
    xhr.send(request.getBody());
  });
}
