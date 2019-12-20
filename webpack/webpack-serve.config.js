var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var port = "9091";
var devPublicPath = 'http://localhost:' + port + '/assets/';

module.exports = {
    entry: ['@babel/polyfill', './serve.js'],
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
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: ["@babel/preset-env", "@babel/preset-react"]
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
                            modules: {
                                localIdentName:  "[name]--[local]--[hash:base64:8]"
                            },
                            importLoaders: 1
                        }
                    },
                    'postcss-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'serve-template.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'eval'
};