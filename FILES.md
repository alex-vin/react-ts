`html-webpack-plugin`   指定你生成的文件所依赖哪一个html文件模板，模板类型可以是html、jade、ejs等

`css-loader`            使你能够使用类似@import 和 url(...)的方法实现 require()的功能；

`style-loader`          将所有的计算后的样式加入页面中； 与css-loader组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。

`sass-resources-loader` 配置全局less；不仅支持SASS，还支持LESS，POSTCSS等

`@babel/cli` 为babel的脚手架工具
`@babel/core` babel-core是作为babel的核心存在，babel的核心api都在这个模块里面，比如：transform，用于字符串转码得到ASTbabel-loader: 就是用于编译JavaScript代码
`@babel/preset-env` 官方解释“用于编写下一代JavaScript的编译器”，编译成浏览器认识的JavaScript标准
`@babel/preset-react` 用于编译react的jsx，开发react应用必备
`@babel/plugin-proposal-class-properties` 解析class类的属性
`@babel/plugin-proposal-decorators` 解析装饰器模式语法，如使用react-redux的
`@connect@babel/plugin-proposal-export-default-from` 解析export xxx from 'xxx'语法

##### PostCSS
```
PostCSS 是一个允许使用 JS 插件转换样式的工具。 这些插件可以检查（lint）你的 CSS，支持 CSS Variables 和 Mixins，
编译尚未被浏览器广泛支持的先进的 CSS 语法，内联图片，以及其它很多优秀的功能。
它提供了很多常用的插件

  1. 提前使用先进的 CSS 特性
    autoprefixer 添加了 vendor 浏览器前缀，它使用 Can I Use 上面的数据。
    postcss-preset-env 允许你使用未来的 CSS 特性。

  2. 更佳的 CSS 可读性
    precss 囊括了许多插件来支持类似 Sass 的特性，比如 CSS 变量，套嵌，mixins 等。

  3. 图片和字体
    postcss-assets 可以插入图片尺寸和内联文件。
    postcss-sprites 能生成雪碧图。

...还有很多，具体可以查看<a href="https://github.com/postcss/postcss/blob/master/README-cn.md" target="_self">PostCSS中文</a>
```

`webpack-merge`                         用于合并webpack的公共配置和环境配置(合并webpack.config.js和webpack.development.js或者webpack.production.js)

`webpack.DefinePlugin`                  在编译时创建一些全局变量

`webpack.HotModuleReplacementPlugin`    用于启用局部模块热重载，开发环境用的

`html-webpack-plugin`                   根据webpack打包生成的bundle，来生成html

`add-asset-html-webpack-plugin`         跟html-webpack-plugin配合使用，把资源文件引用到它生成的html中

`mini-css-extract-plugin`               把css抽取到不同的文件中

`terser-webpack-plugin`                 新的压缩js代码插件

`optimize-css-assets-webpack-plugin`    在webpack打包时优化压缩css代码，主要使用 cssnano 压缩器。

`webpack.runtimeChunk`                  与持久化缓存有关

`webpack.splitChunks`                   webpack 4 最大的改动就是废除了 CommonsChunkPlugin 引入了 optimization.splitChunks，用来配置分包策略。

`webpack.DllPlugin`                     将模块预先编译，它会在第一次编译的时候将配置好的需要预先编译的模块编译在缓存中，第二次编译的时候，解析到这些模块就直接使用缓存

`webpack.DllReferencePlugin`            将预先编译好的模块关联到当前编译中，当 webpack 解析到这些模块时，会直接使用预先编译好的模块

`webpack-bundle-analyzer`               webpack打包分析器，可以直观看到各bundle占比

`clean-webpack-plugin`                  清理打包文件夹

`yargs-parser`                          用于将我们的npm scripts中的命令行参数转换成键值对的形式如 --mode development会被解析成键值对的形式mode: "development"，便于在配置文件中获取参数
