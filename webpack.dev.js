const path = require('path')
const webpack = require('webpack')
const { keys } = require('lodash/fp')
const packages = require('./package.json')
const AutoDllPlugin = require('autodll-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = { // eslint-disable-line fp/no-mutation
  entry: {
    app: [
      'babel-polyfill',
      './src/index.js',
    ],
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader?cacheDirectory=true'],
      include: path.join(__dirname, 'src'),
    }, {
      test: /\.(css|scss)$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    }, {
      test: /\.(eot|otf|svg|ttf|woff|woff2)$/,
      loader: 'file-loader',
    }, {
      test: /\.(jpg|jpeg|png|gif)$/,
      loaders: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          query: {
            progressive: true,
            optimizationLevel: 7,
            interlaced: false,
            pngquant: {
              quality: '65-90',
              speed: 4,
            },
          },
        },
      ],
    }],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.EnvironmentPlugin({
      DEVELOPMENT: true,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html',
    }),
    new AutoDllPlugin({
      inject: true,
      context: __dirname,
      entry: { vendor: keys(packages.dependencies) },
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
