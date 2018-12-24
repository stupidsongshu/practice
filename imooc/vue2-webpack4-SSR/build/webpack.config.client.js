const path = require('path')
// const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseWebpackConfig = require('./webpack.config.base')
const VueClientPliugin = require('vue-server-renderer/client-plugin')

const isDev = process.env.NODE_ENV === 'development'

let config

const defaultPlugins = [
  // short-circuits all Vue.js warning code
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
      // NODE_ENV: '"production"'
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
    template: path.join(__dirname, 'template.html')
  }),
  new VueClientPliugin()
]

const devServer = {
  port: 8000,
  // Specify a host to use. By default this is localhost. If you want your server to be accessible externally, specify it like this
  host: '0.0.0.0',
  // Shows a full-screen overlay in the browser when there are compiler errors or warnings. Disabled by default.
  overlay: {
    warnings: false,
    errors: true
  },
  open: true,
  hot: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  // https://webpack.docschina.org/configuration/dev-server/#devserver-historyapifallback 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。
  historyApiFallback: {
    index: '/public/index.html'
    // index: '/index.html'
  },
  proxy: {
    '/api': 'http://127.0.0.1:3333',
    '/user': 'http://127.0.0.1:3333'
  }
}

if (isDev) { // development 开发环境
  config = merge(baseWebpackConfig, {
    devtool: '#cheap-module-eval-source-map',
    devServer,
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
} else { // production 生产环境
  config = merge(baseWebpackConfig, {
    entry: {
      app: path.join(__dirname, '../client/client-entry.js'),
      // 将vue类库单独打包
      vendor: ['vue'],
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/public/'
    },
    module: {
      rules: [
        {
          test: /\.styl$/,
          use: ExtractTextPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    plugins: defaultPlugins.concat([
      new ExtractTextPlugin({
        filename: '[name].[contenthash:8].css'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })
    ])
  })
}

module.exports = config
