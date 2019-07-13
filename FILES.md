`html-webpack-plugin`   指定你生成的文件所依赖哪一个html文件模板，模板类型可以是html、jade、ejs等

`css-loader`            使你能够使用类似@import 和 url(...)的方法实现 require()的功能；

`style-loader`          将所有的计算后的样式加入页面中； 与css-loader组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。

`sass-resources-loader` 配置全局less；不仅支持SASS，还支持LESS，POSTCSS等

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
