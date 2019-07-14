const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(baseConfig, {
    output: {
        publicPath: 'https://ksana.oss-cn-shenzhen.aliyuncs.com/'
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    devtool: '#source-map',
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                // 把 highlight 单独打包出来
                highlight: {
                    test: /highlight.js/,
                    chunks: 'initial'
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(['assets/styles/*.*'])(),
        new MiniCssExtractPlugin({
            filename: 'assets/styles/styles.[chunkhash:5].css'
        })
        // new BundleAnalyzerPlugin() // 打包分析
    ]
})
