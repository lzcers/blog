---
Title: Webpack 4 升级 
Tags: 前端 
PublishDate: 2018/3/14 01:12:51 
---

因为依赖的关系，无法直接使用 npm up webpack 的方式更新，需要重新安装 webpack 4，除此之外还需要安装 webpack-cli ，然后一路跟着错误提示修改即可。
1. >
  The CLI moved into a separate package: webpack-cli.
  Please install 'webpack-cli' in addition to webpack itself to use the CLI.
  -> When using npm: npm install webpack-cli -D
  -> When using yarn: yarn add webpack-cli -D

照提示安装 weboack-cli 即可

2. > Error: webpack.optimize.UglifyJsPlugin has been removed, please use config.optimization.minimize instead.

这个插件在 webpack4 里已经不用手动引入了，直接 optimization.minimize 为 true 就行，生产模式下自动为 true。


3. >
  Error: webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead.

CommonsChunkPlugin 已经再见，变为 optimization.splitChunks 和 optimization.runtimeChunk 两个配置，默认配置就会对异步请求的模块进行提取拆分，更多介绍看*[这里](https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366)*。

4. >
Webpack 4: compilation.mainTemplate.applyPluginsWaterfall is not a function

解决办法 npm uninstall html-webpack-plugin 然后重装

5. >
  DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead  77% module and chunk tree optimization unnamed compat plugin(node:14460) UnhandledPromiseRejectionWarning: 

依旧重装 extract-text-webpack-plugin 。

webpack 终于知道约定优于配置了，parcel 恐成最大输家。