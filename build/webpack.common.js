const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist')
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
