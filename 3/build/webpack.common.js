const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
  entry: path.join(__dirname, '../src/index.tsx'),
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
      test: /\.(j|t)sx?$/,
      use: [{
        loader: 'babel-loader'
      }],
      include: path.join(__dirname, '../src'),
      // 排除node_modules底下的
      exclude: path.join(__dirname, '../node_modules/')
    }, {
      test: /\.(css|less)$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
            modifyVars: {
              'primary-color': 'black',
              'border-radius-base': '10px'
            }
          }
        },
        {
          loader: 'sass-resources-loader',
          options: {
            resources: [path.join(__dirname, '../src/assets/styles/common.less')]
          }
        }
      ],
      include: [path.join(__dirname, '../node_modules/antd'), path.join(__dirname, '../src')],
      // exclude: path.join(__dirname, '../node_modules/')
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          //1024 == 1kb
          //小于10kb时打包成base64编码的图片否则单独打包成图片
          limit: 10240,
          name: path.join('img/[name].[hash:7].[ext]')
        }
      }]
    },{
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: path.join('font/[name].[hash:7].[ext]')
        }
      }]
    }]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.join(__dirname, '../src'),
      '@pages': path.join(__dirname, '../src/pages'),
      '@assets': path.join(__dirname, '../src/assets'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true
    })
  ]
}
