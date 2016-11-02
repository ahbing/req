# req

一个支持跨域配置的简单请求。

```JavaScript

import req from 'req';

req.get('world').then(() => {
  console.log('hello world');
}, () => {
  console.log('goodbye world');
});

```