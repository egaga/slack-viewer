var path = require('path');
var fs = require('fs');

// from :http://jlongster.com/Backend-Apps-with-Webpack--Part-I
// without adding nodeModules to externals, html minifier does not work
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => nodeModules[mod] = 'commonjs ' + mod);

module.exports = {
  entry: ['babel-polyfill', './render.js'],
  target: 'node',
  externals: nodeModules, // externals allows you to specify dependencies for your library that are not resolved by webpack, but become dependencies of the output. This means they are imported from the environment during runtime.
  output: {
    path: __dirname,
    filename: 'build/render.js'
  },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'isomorphic-style-loader',
                    {
                      loader: 'css-loader',
                      options: {
                          modules: true,
                          importLoaders: 1,
                          localIdentName: "[name]--[local]--[hash:base64:8]"
                      },
                    },
                    'postcss-loader'
                ]
            }
        ]
    },
};