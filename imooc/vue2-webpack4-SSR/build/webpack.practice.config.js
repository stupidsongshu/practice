const path = require('path')
// const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.config')

let config

const defaultPlugins = [
  // short-circuits all Vue.js warning code
  new webpack.DefinePlugin({
    'process.env': {
      // NODE_ENV: isDev ? '"development"' : '"production"'
      NODE_ENV: '"development"'
    }
  }),
  // new HtmlWebpackPlugin({
  //   title: 'Custom template using Handlebars',
  //   template: "../src/index.html",
  //   filename: 'index.html',
  //   // chunks: ['app', 'vendor', 'runtime'],
  //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
  //   chunksSortMode: 'dependency'
  // }),
  new HtmlWebpackPlugin({
    title: 'practice',
  })
]

const devServer = {
  port: 8080,
  // Specify a host to use. By default this is localhost. If you want your server to be accessible externally, specify it like this
  host: '0.0.0.0',
  // Shows a full-screen overlay in the browser when there are compiler errors or warnings. Disabled by default.
  overlay: {
    warnings: false,
    errors: true
  },
  open: true,
  hot: true
}

config = merge(baseWebpackConfig, {
  devtool: '#cheap-module-eval-source-map',
  entry: path.join(__dirname, '../practice/index.js'),
  devServer,
  resolve: {
    alias: {
      /**
       * 指定在入口文件中 import Vue from 'vue' 引入的vue版本
       */
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          // 'style-loader',
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: defaultPlugins.concat([
    // HMR should never be used in production.
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  ])
})

module.exports = config
