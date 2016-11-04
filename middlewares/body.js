/**
 * 处理请求体
 * - 根据不同的请求体数据类型，设置相应的 Content-Type
 * - 创建 bodyResHandler, 根据不同的响应的体，返回相应的 Content-Type 
 */
import Promise from 'ahbing-promise';
import { isFormData, isObject, isString } from './../util';
export default function body(request, next) {

  if (isFormData(response)) {
    // 使用 FormDate api 提交，浏览器根据不同的提交自主添加 MIME 类型
    request.header.delete('Content-Type');
  } else if (isObject(response)) {
    if (request.emulateJSON) {
      // @todo 编码请求体
      // response.body = 编码(response.body)
      response.header.set('Content-Type', 'application/x-www-form-urlencoded');
    } else {
      response.body = JSON.stringify(response.body);
    }
  }

  function bodyResHandler(response) {
    // const type = response.header.get('Content-Type');
    // 响应不同的格式
  }

  next(bodyResHandler);
}