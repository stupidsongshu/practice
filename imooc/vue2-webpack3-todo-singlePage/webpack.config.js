const path = require('path')
// const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.[name].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // short-circuits all Vue.js warning code
    new webpack.DefinePlugin({
      'process.env': {
        // NODE_ENV: isDev ? '"development"' : '"production"'
        NODE_ENV: '"production"'
      }
    }),

    new HtmlWebpackPlugin({
      title: 'Custom template using Handlebars',
      template: "./src/index.html",
      filename: 'index.html',
      // chunks: ['app', 'vendor', 'runtime'],
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
  
    // (vue-loader v15) make sure to include the plugin for the magic
    // new VueLoaderPlugin()
  ]
}

if (isDev) { // development 开发环境
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
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
  config.module.rules.push(
    {
      test: /\.styl$/,
      use: [
        // 'vue-style-loader',
        'style-loader',
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
  )
  config.plugins.push(
    // HMR should never be used in production.
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  )
} else { // production 生产环境
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    // 将vue类库单独打包
    vendor: ['vue'],
  }

  config.output.filename = '[name].[chunkhash:8].js'

  config.module.rules.push(
    {
      test: /\.styl$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
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
  )

  config.plugins.push(
    new ExtractTextPlugin({
      filename: '[name].[contenthash:8].css'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  )
}

module.exports = config
