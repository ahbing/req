# Req
[![Build Status](https://travis-ci.org/ahbing/req.svg?branch=master)](https://travis-ci.org/ahbing/req)
[![NPM version](https://img.shields.io/npm/v/req.svg?style=flat)](https://www.npmjs.com/package/req)
[![Coverage Status](https://coveralls.io/repos/github/ahbing/req/badge.svg?branch=master)](https://coveralls.io/github/ahbing/req?branch=master)
![David DM](https://david-dm.org/ahbing/req.svg)


一个支持跨域配置的简单请求。

```JavaScript

import req from 'req';

req.get('world').then(() => {
  console.log('hello world');
}, () => {
  console.log('goodbye world');
});

```
