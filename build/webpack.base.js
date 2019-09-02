'use strict'
const path = require('path')
const { join, relative } = require('path')
const chalk = require('chalk')
// const webpack = require('webpack')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin') // 通过 npm 安装
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清空打包目录的插件
const CopyWebpackPlugin = require('copy-webpack-plugin') // 复制静态资源的插件
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const os = require('os')
const PurifyCssWebpack = require('purifycss-webpack')
const glob = require('glob-all')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //CSS文件单独提取出来
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function assetsPath(_path_) {
  let assetsSubDirectory
  if (process.env.NODE_ENV === 'production') {
    assetsSubDirectory = 'static' //可根据实际情况修改
  } else {
    assetsSubDirectory = 'static'
  }
  return path.posix.join(assetsSubDirectory, _path_)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  mode: 'production',
  output: {
    path: resolve('dist'),
    filename: '[name].[hash].js'
  },
  resolve: {
    // extensions: [".js", ".css", ".json"],
    alias: {
      '@ant-design/icons/lib/dist': path.resolve(__dirname, '../src/icons.js')
    } //配置别名可以加快webpack查找模块的速度
  },
  module: {
    // 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
    rules: [
      {
        test: /\.css$/,
        use: ['css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        // include: [resolve('src')] //限制范围，提高打包速度
        // exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: ['css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
        include: [resolve('src')]
        // exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        include: [resolve('src')],
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader'
        }
      },
      {
        //file-loader 解决css等文件中引入图片路径的问题
        // url-loader 当图片较小的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝
        test: /\.(png|jpg|jpeg|gif)/,
        use: {
          loader: 'url-loader',
          options: {
            name: assetsPath('images/[name].[hash:7].[ext]'), // 图片输出的路径
            limit: 5 * 1024
          }
        },
        exclude: path.resolve(__dirname, '../src/assets/')
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: path.resolve(__dirname, '../src/assets/'),
        options: {
          extract: true,
          name: assetsPath('svg/[name].[hash:7].[ext]')
          // spriteFilename: svgPath => `sprite${svgPath.substr(-4)}`
        }
      }
    ]
  },
  optimization: {
    //webpack4.x的最新优化配置项，用于提取公共代码
    splitChunks: {
      minSize: 30 * 30 * 1024,
      minChunks: 1,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          name: 'common',
          minChunks: 1,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 30 * 1024, // This is example is too small to create commons chunks
          reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
    new PurifyCssWebpack({
      paths: glob.sync([join(__dirname, '../src/**/*.js'), join(__dirname, '../src/*.html')]),
      minimize: true
    }),
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    }),
    new SpriteLoaderPlugin({
      plainSprite: true,
      spriteAttrs: {
        id: 'my-custom-sprite-id'
      }
    }),
    // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en_us/),
    new MomentLocalesPlugin({
      localesToKeep: ['es-us', 'zh-cn']
    }),
    new LodashModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '..', 'static'),
        to: path.join(__dirname, '..', 'dist', 'static'),
        ignore: ['.*']
      }
    ]),
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '..'),
      exclude: ['manifest.json', 'vendor.dll.js'],
      verbose: true,
      dry: false
    })
    // , new BundleAnalyzerPlugin()
  ]
}
