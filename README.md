--save 的意思是将模块安装到项目目录下，并在package文件的dependencies节点写入依赖。
```
  1. 安装模块到项目node_modules目录下。
  2. 会将模块依赖写入dependencies 节点。
  3. 运行 npm install 初始化项目时，会将模块下载到项目目录下。
  4. 运行npm install --production或者注明NODE_ENV变量值为production时，会自动下载模块到node_modules目录中。
```
-save-dev 的意思是将模块安装到项目目录下，并在package文件的devDependencies节点写入依赖。
```
  1. 安装模块到项目node_modules目录下。
  2. 会将模块依赖写入devDependencies 节点。
  3. 运行 npm install 初始化项目时，会将模块下载到项目目录下。
  4. 运行npm install --production或者注明NODE_ENV变量值为production时，不会自动下载模块到node_modules目录中。
```

### 总结
```
  devDependencies 节点下的模块是我们在开发时需要用的，比如项目中使用构建工具webkpack、 gulp ，用来辅助压缩js、css、html等。这些模块在我们的项目部署后是不需要的，所以我们可以使用 --save-dev 的形式安装；像 bootstrap、vue、angular、express 这些模块是项目运行必备的，应该安装在 dependencies 节点下，所以我们应该使用 --save 的形式安装；工具类的比如构建工具gulp，需要使用命令来运行任务，则需要使用—global来安装。
```

# 1.创建目录，初始化项目
```
  mkdir react-ts-template
  cd react-ts-template
  yarn init -y 或者 npm init -y
```

# 2.安装webpack  webpack-cli
```
  npm install webpack webpack-cli -D
```
  webpack4将命令行相关的操作抽离到了webpack-cli中，比如init、migrate、serve等等。
  a). 安装完毕后在根目录新建 `build` 文件夹,并在build文件夹新建 `webpck.common.js` 文件，用来存放webpack公共配置。
  ```
    const path = require('path');
    module.exports={
      entry: path.join(__dirname, '../src/index.js'),
      output: {
        filename: `'bundle.js'`,
        path: path.join(__dirname, '../dist')
      }
    }
  ```
  b). 在根目录下新建 `src` 文件夹，并在src文件夹新建一个 `index.js` 文件

  c). 在 `package.json` 写入一个脚本，并在控制台中运行 `npm run build`
  ```
    "scripts": {
      "build": "webpack --config build/webpack.common.js --mode production"
    }
  ```
  webpack4中提供了 `mode` 配置选项，告知 webpack 使用相应模式的内置优化,如果不提供mode，webpack将会使用 `production` 模式。
  之后会发现生成了一个 `dist` 文件夹 里面有 `bundle.js`

# 3.Babel7
```
  npm i @babel/core @babel/preset-env @babel/preset-react babel-loader -D
```
  a). 在根目录下新建 `babel.config.js`,详细信息查看官网<a href="https://babeljs.io/docs/en/config-files#project-wide-configuration" target="_blank">babel官网配置</a>

  ```
    module.exports = {
      presets: [
        '@babel/preset-env',
        '@babel/preset-react'
      ],
      plugins: []
    }
  ```
  b). 修改 `webpack.common.js`, 添加js文件的loader配置
  ```
    module.exports={
      /* 省略其它 */
      module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader'],
            include: path.join(__dirname, '../src')
        }]
      }
    }
  ```

# 4.React
```
  npm install react react-dom -S
```
  a). 修改 `src/index.js` 内容：
  ```
    import React from 'react';
    import ReactDom from 'react-dom';

    ReactDom.render(<div>Hello React!</div>, document.getElementById('root'));

  ```
  b). 在根目录下新建 `public` 文件夹，并新建 `index.html` 文件
  ```
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>React-TS-Tempalte</title>
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>
  ```
  c). 配置webpack以 `public/index.html` 为模板，安装 `html-webpack-plugin` 插件
  ```
    npm install html-webpack-plugin -D
  ```
  并修改 `webpack.common.js` 文件。
  ```
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    ...
    module.exports={
      /* 忽略其他 */
      plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: 'public/index.html',
          inject: true
        })
      ]
    }
  ```

# 5.安装 `webpack-dev-server` 搭建简易服务器
```
  npm i webpack-dev-server -D
```
  a). 修改 `webpack.common.js` 配置
  ```
    module.exports={
      /* 忽略其他 */
      devServer: {
        host: 'localhost',
        port: 8080,
        historyApiFallback: true,
        overlay: {
          errors: true //当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
        },
        inline: true,
        hot: true
      }
    }
  ```
  详细信息查看<a href="https://webpack.js.org/configuration/dev-server/" target="_blank">devServer配置</a>
  b). 在package.json 修改 “scripts”:
  ```
    "start": "webpack-dev-server --config build/webpack.common.js --mode development --open"
  ```

至此，运行 `npm run start` 即可打开 `http://localhost:8080`
