
# 1. 开发环境配置 or 生产环境配置
  a). 创建 `build/webpack.dev.js` 和 `build/webpack.prod.js` 文件，使用 `webpack-merge`与`webpack.common.js`合并配置
  ```
    npm install webpack-merge -D
  ```
  ```
    const webpack=require('webpack')
    const merge = require('webpack-merge')
    const baseConfig=require('./webpack.common')
    const HtmlWebpackPlugin = require('html-webpack-plugin')

    const devConfig={
      // 生产环境 'development', 开发环境production'
      mode: 'development',
      // 生产环境 'source-map', 开发环境'eval-source-map', 便于错误调试
      devtool: 'eval-source-map',
      plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: 'public/index.html',
          inject: true
        }),
        // 用于启用局部模块热重载方便我们开发,仅在开发环境使用
        // new webpack.HotModuleReplacementPlugin()
      ],
    }
  ```
  b). 修改 `package.json` 文件
  ```
  "scripts": {
    "dev": "webpack-dev-server --config build/webpack.dev.js --mode development --open",
    "build": "webpack --config build/webpack.prod.js --mode production --env prod",
  },
  ```

# 2. html-webpack-plugin  自动生成html,并默认将打包生成的js、css引入到html文件中
```
  npm install html-webpack-plugin -D
```
  a). 修改 `build/webpack.prod.js`
  ```
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const prodConfig = {
      /* 忽略其他 */
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
    }
  ```

# 3. mini-css-extract-plugin 将css从js里分离出来
```
  npm install mini-css-extract-plugin -D
```
  a). 修改 `build/webpack.prod.js`
  ```
    const MiniCssExtractPlugin = require('mini-css-extract-plugin')
    const prodConfig = {
      /* 忽略其他 */
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: path.posix.join('', 'css/[name].[contenthash].css'),
        chunkFilename: path.posix.join('', 'css/[name].[id].[contenthash].css')
      }),
    }
  ```
  b). 修改 `build/webpack.common.js`
  ```
    const MiniCssExtractPlugin = require('mini-css-extract-plugin')
    module.exports={
      module: {
        rules: [
          /* 忽略其他 */
          {
            test: /\.css$/,
            use: [
              config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
              /* 忽略其他 */
            ]
          }, {
            test: /\.less$/,
            use: [
              config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
              /* 忽略其他 */
            ]
          }
        ]
      }
    }
  ```

# 4. clean-webpack-plugin 清除生产环境打包的时候dist本地文件
```
  npm install clean-webpack-plugin -D
```
  a). 修改 `build/webpack.prod.js`
  ```
    const { CleanWebpackPlugin } = require('clean-webpack-plugin')
    const prodConfig = {
      /* 忽略其他 */
      plugins: [
        new CleanWebpackPlugin(),
        /* 忽略其他 */
      ]
    }

  ```

# 5. terser-webpack-plugin && optimize-css-assets-webpack-plugin
在webpack打包时使用 cssnano 压缩器优化压缩css代码; 压缩 js 代码
```
  npm install terser-webpack-plugin optimize-css-assets-webpack-plugin script-ext-html-webpack-plugin -D
```
  a). 修改 `build/webpack.prod.js`
  ```
    const TerserPlugin = require('terser-webpack-plugin')
    const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
    const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
    const prodConfig = {
      /* 忽略其他 */
      optimization: {
        // 开启 manifest 缓存，每个入口单独创建
        // 将包含chunks 映射关系的 list单独从 app.js里提取出来
        // 打包生成的 runtime.js非常的小，gzip 之后一般只有几 kb，但这个文件又经常会改变
        // 我们每次都需要重新请求它，它的 http 耗时远大于它的执行时间了，
        // 所以建议不要将它单独拆包，有关优化就是将他将它内联到我们的 index.html 之中。
        runtimeChunk: true,
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
        /* 忽略其他 */
        new ScriptExtHtmlWebpackPlugin({
          //`runtime` must same as runtimeChunk name. default is `runtime`
          inline: /runtime\..*\.js$/
        }),
      ]
    }
  ```

# 6. happypack && webpack.DllPlugin && webpack.DllReferencePlugin
```
  npm install happypack add-asset-html-webpack-plugin -D
```
  a). 创建 `build/webpack.dll.js`
  ```
    const path = require('path')
    const webpack = require('webpack')
    const { CleanWebpackPlugin } = require('clean-webpack-plugin')

    module.exports = {
      mode:'production',
      entry: {
        // 还有redux 之类的也可以放进来
        vendor: ['react', 'react-dom', 'react-router-dom', 'redux', 'react-redux']
      },
      output: {
        filename: '[name].dll.[hash:8].js',
        path: path.join(__dirname, '../dll'),
        // 链接库输出方式 默认'var'形式赋给变量
        libraryTarget: 'var',
        // 全局变量名称 导出库将被以var的形式赋给这个全局变量 通过这个变量获取到里面模块
        library: '_dll_[name]_[hash:8]'
      },
      plugins: [
        // 每次运行时清空之前的 dll 文件
        new CleanWebpackPlugin({
          cleanOnceBeforeBuildPatterns: [path.join(__dirname, '../dll/**/*')]
        }),
        new webpack.DllPlugin({
          // path 指定manifest文件的输出路径
          path: path.join(__dirname, '../dll/[name].manifest.json'),
          // 和library 一致，输出的manifest.json中的name值
          name: '_dll_[name]_[hash:8]'
        })
      ]
    }
  ```
  b). 修改 `webpack.prod.js` 使用 `webpack.DllReferencePlugin` 告诉 Webpack 使用了哪些动态链接库
  ```
    const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
    const prodConfig = {
      plugins: [
        // 告诉 Webpack 使用了哪些动态链接库
        new webpack.DllReferencePlugin({
          manifest: path.join(__dirname, `../dll/vendor.manifest.json`)
        }),
        /* 忽略其他 */
        // 静态资源css或者js引入到html-webpack-plugin生成的html文件中。
        // 必须放在 html-webpack-plugin 后面
        new AddAssetHtmlPlugin({
          filepath: path.join(__dirname, '../dll/**/*.js'),
          includeSourcemap: false
        }),
      ]
    }
  ```
  c). 修改 `package.json`
  ```
    "scripts": {
      /* 忽略其他 */
      "dll": "webpack --config build/webpack.config.dll.js",
    }
  ```
  运行后会在 `dll` 文件夹下有 `vendor.dll.[hash:8].js` 和 `vendor.manifest.json` 两个文件
  d). 修改 `build/webpack.common.js`
  ```
    const HappyPack = require('happypack');

    function createHappyPlugin(id, loaders) {
      return new HappyPack({ id, loaders })
    }

    module.exports={
      /* 忽略其他 */
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
        }, /* 忽略其他 */]
        plugins: [
          /* 忽略其他 */
          new webpack.DefinePlugin(defineEnv),
          createHappyPlugin('happy-babel-js', [{
            loader: 'babel-loader',
            query: {}
          }]),
        ]
    }
  ```
  个人觉得，使用happypack开启多线程编译打包，实际上是开启多个进程作业，其中消耗的时间大于编译打包时间时，除非大型项目，否则不建议


# 平时常用的一些webpack插件
  a). `progress-bar-webpack-plugin` 编译进度条插件
  ```
    npm install progress-bar-webpack-plugin chalk -D
  ```
  在 `build/webpack.common.js`中使用
  ```
  const chalk = require('chalk')
  const ProgressBarPlugin = require('progress-bar-webpack-plugin')
  /* 省略其他 */
  module.exports={
    /* 省略其他 */
    plugins: [
      new ProgressBarPlugin({
        // format: chalk.blue.bold('build [:bar]') + chalk.green.bold(' :percent') + '(' + chalk.magenta(' :elapsed') + 'seconds)',
        format: 'build' + chalk.green.bold(' [:bar]') + ' :percent (:elapsed seconds)',
        clear: false,
        width: 500,
      }),
      /* 省略其他 */
    ]
  }
  ```

  b). `speed-measure-webpack-plugin` 统计编译过程中，各loader和plugin使用的时间。
  ```
    npm install speed-measure-webpack-plugin -D
  ```
  在 `build/webpack.dev.js` 或者 `build/webpack.prod.js` 中使用,因为这两者会跟 `build/webpack.common.js` 合并
  ```
    const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
    const smp = new SpeedMeasurePlugin();
    /* 省略其他 */
    const devConfig = { /* ... */ }
    module.exports=smp.wrap(merge(baseConfig, devConfig))
  ```
  使用 `DllPlugin && DllReferencePlugin` 会报错 `Cannot read property 'tapPromise' of undefined`

  c). `webpack-bundle-analyzer` 编译模块分析插件

  ```
    npm install webpack-bundle-analyzer -D
  ```
  在 `build/webpack.dev.js` 或者 `build/webpack.prod.js` 中使用,看个人需要
  ```
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    /* 省略其他 */
    module.exports={
      /* 省略其他 */
      plugins: [
        new BundleAnalyzerPlugin({ analyzerPort: 10001 }),
        /* 省略其他 */
      ]
    }
  ```
