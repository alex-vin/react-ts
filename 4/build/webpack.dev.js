const webpack=require('webpack')
const merge = require('webpack-merge')
const baseConfig=require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

const devConfig={
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    overlay: {//当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
      errors: true
    },
    inline: true,
    hot: true,
    // proxy: {
    //   '/api/v1': {
    //     target: '',
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api/v1': '/api/v1'
    //     }
    //   }
    // }
  },
}

module.exports=smp.wrap(merge(baseConfig, devConfig))
