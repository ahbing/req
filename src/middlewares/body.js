/**
 * 处理请求体
 * - 根据不同的请求体数据类型，设置相应的 Content-Type
 * - 创建 bodyResHandler, 根据不同的响应的体，返回相应的 Content-Type 
 */
import Promise from 'ahbing-promise';
import Url from './../url';
import { isFormData, isObject, isString } from './../util';

export default function body(request, next) {
  const body = request.body;
  if (isFormData(body)) {
    // 使用 FormDate api 提交，浏览器根据不同的提交自主添加 MIME 类型
    request.header.delete('Content-Type');
  } else if (isObject(body)) {
    if (request.emulateJSON) {
      request.body = Url.params(body); 
      request.header.set('Content-Type', 'application/x-www-form-urlencoded');
    } else {
      request.body = JSON.stringify(body);
    }
  }

  function bodyResHandler(response) {
    const type = response.header.get('Content-Type');
    if (response.bodyText) {
      const type = response.headers.get('Content-Type');      
      if (isString(type) && type.indexOf('application/json') === 0) {
        try {
          response.body = JSON.parse(response.bodyText);
        } catch(e) {
          console.error('parse response body error');
          response.body = null;
        }
      }
    }

    return response;
  }

  next(bodyResHandler);
}
