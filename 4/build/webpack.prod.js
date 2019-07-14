const path = require('path');
const config = require('./config.js')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.common')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    runtimeChunk: true, // 开启 manifest 缓存，每个入口单独创建
    splitChunks: {
      chunks: 'async', // 提取的 chunk 类型，all: 所有，async: 异步，initial: 初始
      // minSize: 30000, // 默认值，新 chunk 产生的最小限制 整数类型（以字节为单位）
      // maxSize: 0, // 默认值，新 chunk 产生的最大限制，0为无限 整数类型（以字节为单位）
      // minChunks: 1, // 默认值，新 chunk 被引用的最少次数
      // maxAsyncRequests: 5, // 默认值，按需加载的 chunk，最大数量
      // maxInitialRequests: 3, // 默认值，初始加载的 chunk，最大数量
      // name: true, // 默认值，控制 chunk 的命名
      cacheGroups: {
        // 配置缓存组
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: 10, // 优先级
          reuseExistingChunk: false, // 允许复用已经存在的代码块
          test: /node_modules\/(.*)\.js/
        },
        common: {
          name: 'common',
          chunks: 'initial',
          // test: resolve("src/components"), // 可自定义拓展你的规则
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        // parallel: true,
        terserOptions: {
          compress: {
            warnings: true,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log'] // 移除console
          }
        },
        sourceMap: Boolean(config.sourceMap)
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'), // 使用 cssnano 压缩器
        cssProcessorOptions: {
          reduceIdents: false,
          autoprefixer: false,
          safe: true,
          discardComments: {
            removeAll: true
          }
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 告诉 Webpack 使用了哪些动态链接库
    new webpack.DllReferencePlugin({
      manifest: path.join(__dirname, `../dll/vendor.manifest.json`)
    }),
    new BundleAnalyzerPlugin({ analyzerPort: 10001 }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true,
      minify: {
        removeComments: true, // 去掉注释
        collapseWhitespace: true, // 去掉多余空白
        removeAttributeQuotes: true // 去掉一些属性的引号，例如id="moo" => id=moo
      }
    }),
    new AddAssetHtmlPlugin({
      filepath: path.join(__dirname, '../dll/**/*.js'),
      includeSourcemap: false
    }),
    new ScriptExtHtmlWebpackPlugin({
      //`runtime` must same as runtimeChunk name. default is `runtime`
      inline: /runtime\..*\.js$/
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: path.posix.join('', 'css/[name].[contenthash].css'),
      chunkFilename: path.posix.join('', 'css/[name].[id].[contenthash].css')
    }),
  ],
}
// module.exports = smp.wrap(merge(baseConfig, prodConfig))
module.exports = merge(baseConfig, prodConfig)
