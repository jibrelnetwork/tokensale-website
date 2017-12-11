const path = require('path')
const webpack = require('webpack')
const { keys } = require('lodash/fp')
const packages = require('./package.json')
const AutoDllPlugin = require('autodll-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const cacheLoader = {
  loader: 'cache-loader',
  options: {
    cacheDirectory: path.join(__dirname, 'node_modules', '.cache-loader'),
  },
}

module.exports = { // eslint-disable-line fp/no-mutation
  entry: { app: ['babel-polyfill', './src/index.js'] },
  devtool: 'eval-source-map',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [{
      use: [cacheLoader, 'babel-loader?cacheDirectory=true'],
      test: /\.js$/,
      exclude: /node_modules/,
      include: path.join(__dirname, 'src'),
    }, {
      use: [cacheLoader, 'style-loader', 'css-loader', 'sass-loader'],
      test: /\.(css|scss)$/,
    }, {
      use: [cacheLoader, 'file-loader'],
      test: /\.(eot|otf|svg|ttf|woff|woff2|jpg|jpeg|png|gif)$/,
    }],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.EnvironmentPlugin({ DEV: true }),
    new HtmlWebpackPlugin({ inject: true, template: './index.html' }),
    new AutoDllPlugin({
      entry: { vendor: keys(packages.dependencies) },
      inject: true,
      context: __dirname,
    }),
  ],
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    stats: {
      hash: false,
      colors: true,
      errors: true,
      source: false,
      chunks: false,
      assets: false,
      version: false,
      timings: true,
      modules: false,
      reasons: false,
      children: false,
      warnings: true,
      publicPath: false,
      errorDetails: true,
    },
    // historyApiFallback: true, // for BrowserHistory
  },
}
