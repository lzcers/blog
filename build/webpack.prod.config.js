const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(baseConfig, {
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/,
        loader: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  devtool: '#source-map',
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '/assets/styles/styles.[chunkhash:5].css'
    })
    // new BundleAnalyzerPlugin() // 打包分析
  ]
})
