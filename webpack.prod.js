const webpack = require('webpack')
const devConfig = require('./webpack.dev.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = { // eslint-disable-line fp/no-mutation
  entry: devConfig.entry,
  output: devConfig.output,
  module: devConfig.module,
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.EnvironmentPlugin({ PROD: true, BACKEND: process.env.BACKEND }),
    new UglifyJsPlugin({ uglifyOptions: { compress: { warnings: false } } }),
    new HtmlWebpackPlugin({ template: './index.html', inject: true }),
    new CopyWebpackPlugin([{ from: 'static', to: 'static' }]),
  ],
}
