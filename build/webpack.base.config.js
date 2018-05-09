/*
  webpack 打包的基础配置
*/
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const path = require('path')
const resolve = (...dir) => path.resolve(__dirname, ...dir)

module.exports = {
  entry: {
    main: './src/main.js'
  },
  resolve: {
    alias: {
      '@': resolve('../src')
    }
  },
  output: {
    path: resolve('../dist'),
    publicPath: '',
    filename: '[name].build.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name:'/assets/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(eot|ttf|woff)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name:'/assets/fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: '/assets/media/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('../', 'index.html'),
      filename: 'index.html',
      // favicon: require('./src/config').favicon || false,
      minify: {
        // https://github.com/kangax/html-minifier#options-quick-reference
        removeComments: true,
        collapseWhitespace: true
      },
      chunksSortMode: 'dependency'
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: resolve('../src/static'),
    //     to: resolve('../dist/static'),
    //     ignore: ['.*']
    //   }
    // ])
  ]
}