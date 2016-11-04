# 用法

```JavaScript

import req from 'req';

req.get(url, {...options}).then(function(data) {});
req.head(url, {...options}).then(function(data) {});
req.delete(url, {...options}).then(function(data) {});
req.jsonp(url, {...options}).then(function(data) {});
req.post(url, body, {...options}).then(function(data) {});
req.put(url, body, {...options}).then(function(data) {});
req.patch(url, body, {...options}).then(function(data) {});

```


# 请求配置

{
  before: Function, // 发送请求前的钩子
  progress: Function, // 请求进行中的钩子
  headers: Header, // 手动配置 http 的请求头
  emulateHTTP: Boolean, // 设置 `X-HTTP-Method-Override` 头，将 `PUT`, `PATCH` 和 `DELETE` 请求使用 `POST` 提交。 Restful api 风格
  emulateJSON: Boolean, // 请求体的 Content-type 设置成 `application/x-www-form-urlencoded`
  timeout: Number, // 设置请求超时时间
  params: Object, // 作为 URL 参数发送的数据
  credentials: Boolean, // 设置跨域请求是否发送 cookie 等凭证。
}

# 响应数据

## 内容
{
  url: String  // 响应源
  headers: Header // 响应头
  body: Object, Blob, string  // 响应体
  ok: Boolean // http 的状态在 200 - 299 之间
  status: Number // 响应的状态码
  statusText: String // 响应的状态描述
}

## 方法

{
  text() // 响应体解析成字符串
  json() // 响应体解析成 Json
  blob() // 响应体解析成 Blob 
}
