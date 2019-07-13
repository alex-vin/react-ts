const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist')
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
    overlay: {
      errors: true //当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
    },
    inline: true,
    hot: true
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, '../src')
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true
    })
  ]
}
