const os = require('os');
const path = require('path');
const webpack = require('webpack');
const config = require('./config.js')
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const argv = require('yargs-parser')(process.argv.slice(4))
const APP_ENV = argv.env || 'env'

const env = require('./env.json')
const oriEnv = env[config.APP_ENV]
Object.assign(oriEnv, {
  APP_ENV: config.APP_ENV
})

const defineEnv = {}
for (let key in oriEnv) {
  defineEnv[`process.env.${key}`] = JSON.stringify(oriEnv[key])
}

function createHappyPlugin(id, loaders) {
  return new HappyPack({ id, loaders })
}

module.exports={
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    filename: 'js/[name].[hash:7].js',
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
    hot: true,
    quiet: true,
    stats: "errors-only",
  },
  module: {
    rules: [{
      test: /\.(j|t)sx?$/,
      use: ['happypack/loader?id=happy-babel-js'],
      // use: [{
      //   loader: 'babel-loader'
      // }],
      include: path.join(__dirname, '../src'),
      // 排除node_modules底下的
      exclude: path.join(__dirname, '../node_modules/')
    }, {
      test: /\.css$/,
      // use: config.extractCss ?
      //   [MiniCssExtractPlugin.loader, 'happypack/loader?id=happy-css'] :
      //   ['style-loader', 'happypack/loader?id=happy-css'],
      use: [
        config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoader: 1 // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
          }
        },
        'postcss-loader',
      ],
      exclude: path.join(__dirname, '../node_modules/')
    }, {
      test: /\.less$/,
      use: [
        // 'style-loader',
        config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
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
      '@ant-design/icons/lib/dist$': path.join(__dirname, '../src/assets/images/icons.ts'),
    },
  },
  plugins: [
    new ProgressBarPlugin({
      // format: chalk.blue.bold('build [:bar]') + chalk.green.bold(' :percent') + '(' + chalk.magenta(' :elapsed') + 'seconds)',
      format: 'build' + chalk.green.bold(' [:bar]') + ' :percent (:elapsed seconds)',
      clear: false,
      width: 500,
    }),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.DefinePlugin(defineEnv),
    createHappyPlugin('happy-babel-js', [{
      loader: 'babel-loader',
      query: {}
    }]),
    // createHappyPlugin('happy-css', [{
    //   loader: 'css-loader',
    //   query: {
    //     minimize: false,
    //     importLoader: 1
    //   }
    // }, {
    //   loader: 'postcss-loader',
    //   query: {}
    // }])
  ]
}
