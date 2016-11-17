/**
 * jsonp 请求的客户端
 * https://en.wikipedia.org/wiki/JSONP
 */

import Promise from 'ahbing-promise';

export default function jsonpClient(request) {
  return new Promise((reslove) => {
    let script = null;
    let body = null;
    let status = 0;
    let name = request.jsonp || 'callback';
    let callback = '_jsonp' + Math.random().toString(36).substr(2);

    const handler = ({ type }) => {
      console.log('type', type);
      if (type === 'load' && body !== null) {
        status = 200;
      } else if (type === 'error') {
        status = 500;
      }
      request.responseWith(body, { status });
      delete window[callback];
      document.body.removeChild(script);
    };

    request.params[name] = callback; 

    window[callback] = (result) => {
      console.log('result', result)
      body = JSON.stringify(result)
    };

    script = document.createElement('script');
    script.src = request.getUrl();
    script.type = "text/javascript";
    script.async = true;  // async 在文档解析完成之后执行
    script.onload = handler;
    script.onerror = handler;

    document.body.appendChild(script);
  });
}
