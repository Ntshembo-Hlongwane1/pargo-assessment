const webpack = require('webpack');
const { inDev } = require('./webpack.helpers');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  inDev() && new webpack.HotModuleReplacementPlugin(),
  inDev() && new ReactRefreshWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    favicon: 'assets/images/logo.svg',
    inject: true,
    meta: {
      viewport: 'width=device-width, initial-scale=1',
    },
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[chunkhash].css',
    chunkFilename: '[name].[chunkhash].chunk.css',
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: './src/manifest.json',
        to: '',
      },
      {
        from: './assets',
        to: '',
      },
    ],
  }),
  new WorkboxPlugin.InjectManifest({
    swSrc: './src/sw.js',
    swDest: 'sw.js',
  }),
].filter(Boolean);
