'use strict';
var path = require('path');

var webpackConfig = {
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: [path.resolve('node_modules/')]
    }],
    preLoaders: [{
      test: /\.js$/,
      include: [path.resolve('src/')],
      loader: 'isparta' 
    }]
  },

  devtool: '#inline-source-map'
};

module.exports = function(config) {
  var configuration = {
    // 测试框架
    frameworks: ['mocha'],
    // 测试需要加载的资源
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js', 
      './test/**/*.js'
    ],
    // 对 files 中的文件做预处理
    preprocessors: {
      './test/**/*.spec.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    },
    // 插件列表
    plugins: ['karma-mocha', 'karma-chrome-launcher', 'karma-coverage', 'karma-spec-reporter', 'karma-webpack', 'karma-sourcemap-loader', 'karma-phantomjs-launcher'],
    // 测试的浏览器
    browsers: ['Chrome'],
    customLaunchers: {
      PhantomJS_custom: {
        base: 'PhantomJS',
        options: {
          windowName: 'my-window',
          settings: {
            webSecurityEnabled: false
          }
        },
        flags: ['--load-images=true'],
        debug: true
      }
    },
    // 生成哪些测试报告
    reporters: ['spec', 'coverage'],
    // 覆盖率报告生成规则
    coverageReporter: {
      dir: 'coverage',
      reporters: [{
        type: 'json',
        subdir: '.',
        file: 'coverage.json',
      }, {
        type: 'lcov',
        subdir: '.'
      }, {
        type: 'text-summary'
      }]
    }
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['PhantomJS', 'PhantomJS_custom'];
    configuration.phantomjsLauncher = {
      exitOnResourceError: true
    }
  }
  config.set(configuration);
};
