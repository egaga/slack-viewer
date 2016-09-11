var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var port = "9091";
var devPublicPath = 'http://localhost:' + port + '/assets/';

module.exports = {
  entry: ['babel-polyfill', './serve.js'],
  output: {
    path: __dirname,
    filename: './app.js',
    publicPath: devPublicPath // https://github.com/webpack/docs/wiki/configuration#outputpublicpath
  },
  devServer: {
    port: port,
    publicPath: devPublicPath,
    contentBase: './app',
    hot: true, // use HotModuleReplacementPlugin
    inline: true // the webserver is embedded in the bundle
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        babelrc: false,
        query: {
          presets: ['react', 'es2015', 'stage-0', 'stage-3'],
          plugins: ['transform-runtime']
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: [
          'isomorphic-style-loader',
          'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:3]',
          'postcss-loader'
        ]
      }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'serve-template.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'eval'
};