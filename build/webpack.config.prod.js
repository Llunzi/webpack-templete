'use strict'

const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin') // 复制静态资源的插件
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成html的插件
const webpack = require('webpack')
const baseConfig = require('./webpack.base')
const merge = require('webpack-merge')
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

module.exports = merge(baseConfig, {
  entry: {
    main: "./src/test.js"
  },
  output:{
    publicPath: './' //这里要放的是静态资源CDN的地址(一般只在生产环境下配置)
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      vendor: './vendor.dll.js',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new WebpackParallelUglifyPlugin({
      uglifyJS: {
        output: {
          beautify: false, //不需要格式化
          comments: false //不保留注释
        },
        compress: {
          // warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
          drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
          collapse_vars: true, // 内嵌定义了但是只用到一次的变量
          reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
        }
      }
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '..', 'dist', 'manifest.json')
    }),
  ]
})
