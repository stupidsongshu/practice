const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: '[name]-hello.[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": isDev ? '"development"' : '"production"'
    }),
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
}

if (isDev) {
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
  config.plugins.push(
    // HMR should never be used in production.
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  )
}

module.exports = config