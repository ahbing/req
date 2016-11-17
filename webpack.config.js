var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: __dirname,
    filename: 'Req.js',
    library: 'Req',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      }
    ]
  },

  devtool: 'cheap-module-eval-source-map'

};
