var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
require("babel-polyfill")
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // webpack打包时排除以下js依赖 需手动加入js
  // externals: {
  //   'vue': 'Vue',
  //   'vue-router': 'VueRouter',
  //   'vuex': 'Vuex',
  //   'axios': 'axios'
  // },
  // entry: {
    // app: ['eventsource-polyfill', 'event-source-polyfill', "babel-polyfill", "./src/main.js"]
    // app: './src/main.js'
  // },
  entry: ["event-source-polyfill", "babel-polyfill", "./app/js"],
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      '/components': resolve('src/components'),
      '/page': resolve('src/page'),
      '/common': resolve('src/common'),
      '/assets': resolve('src/assets'),
      '/api': resolve('src/api'),
      '/utils': resolve('src/utils')
    }
  },
  module: {
    rules: [
     /* {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },*/
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      }, {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/webpack-dev-server/client'),
          resolve('node_modules/vue-awesome'),
          resolve('node_modules/element-ui/packages'),
          resolve('node_modules/element-ui/src'),
          resolve('./node_modules/element-ui/src'),
          resolve('./node_modules/element-ui/packages'),
          resolve('./node_modules/_element-ui@2.3.9@element-ui/src'),
          resolve('./node_modules/_element-ui@2.3.9@element-ui/packages')
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
