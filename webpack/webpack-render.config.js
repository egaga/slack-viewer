var path = require('path');
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// from :http://jlongster.com/Backend-Apps-with-Webpack--Part-I
// without adding nodeModules to externals, html minifier does not work
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => nodeModules[mod] = 'commonjs ' + mod);

module.exports = {
  entry: ['babel-polyfill', './index.js'],
  target: 'node',
  externals: nodeModules, // externals allows you to specify dependencies for your library that are not resolved by webpack, but become dependencies of the output. This means they are imported from the environment during runtime.
  entry: './render.js',
  output: {
    path: __dirname,
    filename: '/build/render.js'
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
  }
};