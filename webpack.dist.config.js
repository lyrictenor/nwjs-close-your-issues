/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {

  output: {
    publicPath: 'assets/',
    path: 'dist/assets/',
    filename: 'main.js'
  },

  debug: false,
  devtool: false,
  entry: './src/scripts/components/main.js',
  target: 'node-webkit',

  stats: {
    colors: true,
    reasons: false
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.IgnorePlugin(/vertx/),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })
  ],

  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js'],
    alias: {
      'styles': 'src/styles',
      'components': 'src/scripts/components',
      'myUtils': 'src/scripts/utils'
    }
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/
        ],
        loader: 'eslint'
      }
    ],

    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel?stage=1&optional=runtime'
      },
      {
        test: /\.jsx?$/,
        loader: "strip?strip[]=debug,strip[]=console.log"
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?(\?v=[0-9a-f]{40})?$/,
        loader: 'url?limit=8192'
      }
    ]
  }
};
