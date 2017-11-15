const webpack = require('webpack');
const devConfig = require('./webpack.dev.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = { // eslint-disable-line fp/no-mutation
  entry: './src/index.js',
  output: devConfig.output,
  module: devConfig.module,
  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: true,
    }),
    new webpack.EnvironmentPlugin({
      PRODUCTION: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),
  ],
};
