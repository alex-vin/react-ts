# 1.Typescript
  a). 除了 `typescript` 关键依赖包外，还有 `@types/react、@types/react-dom`
  ```
    npm install typescript @types/react @types/react-dom -D
  ```
  b). 此刻替换后缀为`.js  .jsx`文件为 `.ts .tsx`,且配置webpack.common.js
  ```
  module.exports={
    entry: path.join(__dirname, '../src/index.tsx'),
    /* 忽略其他 */
    rules: [{
      test: /\.(j|t)sx?$/,
      use: [{
        loader: 'babel-loader'
      }],
      include: [resolve('../src')],
      // 排除node_modules底下的
      exclude: path.join(__dirname, '../node_modules/')
    }]
  }
  ```
  c). 在根目录新建 `tsconfig.json`,官网的推荐配置<a href="http://www.typescriptlang.org/docs/handbook/tsconfig-json.html" target="_self">tsconfig.json</a> 。
  ```
    {
      "compilerOptions": {
        /* Basic Options */
        "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */
        "module": "esnext",                       /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
        "lib": [
          "dom",
          "dom.iterable",
          "esnext"
        ],                                        /* Specify library files to be included in the compilation. */
        "allowJs": true,                          /* Allow javascript files to be compiled. */
        "jsx": "react",                           /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
        "sourceMap": true,                        /* Generates corresponding '.map' file. */
        "outDir": "./dist",                       /* Redirect output structure to the directory. */
        "isolatedModules": true,                  /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */
        "resolveJsonModule": true,
        "forceConsistentCasingInFileNames": true,
        "skipLibCheck": true,
        "strict": true,                           /* Enable all strict type-checking options. */
        "noImplicitThis": true,                   /* Raise error on 'this' expressions with an implied 'any' type. */
        "noImplicitReturns": true,                /* Report error when not all code paths in function return a value. */
        "moduleResolution": "node",               /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
        "baseUrl": ".",                       /* Base directory to resolve non-absolute module names. */
        "paths": {},                                        /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
        "allowSyntheticDefaultImports": true,     /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
        "esModuleInterop": true,                  /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
        "experimentalDecorators": true,           /* Enables experimental support for ES7 decorators. */
      },
      "include": [
        "src"
      ],
      "exclude": [
        "node_modules"
      ]
    }
  ```

# 2.css配置
  ```
    npm install css-loader style-loader -D
  ```
  `css-loader`            使你能够使用类似@import 和 url(...)的方法实现 require()的功能；
  `style-loader`          将所有的计算后的样式加入页面中； 与css-loader组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。

  a). 在 `webpack.common.js` 中配置规则
  ```
    rules: [
      /* 忽略其他 */
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
        exclude: path.join(__dirname, '../node_modules/')
      }
    ]
  ```
  b). 在 `webpack.common.js` 中配置规则resolve.extensions,来自动解析确定的扩展
  ```
  module.exports={
    /* 忽略其他 */
    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'jsx']
    }
  }
  ```
  c). 在 `src/`目录下新建 `index.css` 和 `App.tsx`,在 `index.tsx`引用它们
  ```
    // index.css
    .app {
      text-align: center;
    }

    // App.tsx
    import React from 'react'

    class App extends React.Component {
      render() {
        return (
          <div className="app">
            Hello React
          </div>
        )
      }
    }
    export default App

    // index.tsx
    import React from 'react'
    import ReactDOM from 'react-dom'
    import App from './App'
    import './index.css'

    ReactDOM.render(<App />, document.getElementById('root'))
  ```

# 3.Less
```
  npm install less less-loader -D
```
受控于公司镜像源问题，不推荐使用sass，因为还没找到安装`node-sass`的方法。

  a). 在`webpack.common.js`配置
  ```
    rules: [
      /* 忽略其他 */
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ],
        exclude: path.join(__dirname, '../node_modules/')
      }
    ]
  ```
  b). 修改`src/index.tsx`内容; 修改 `src/index.css` 为 `src/index.less`,且修改内容：
  ```
    // src/index.tsx
    import './index.less';

    // src/index.less
    @color-red: red;
    .app {
      color: @color-red;
      text-align: center;
    }
  ```
  项目启动后发现可以成功解析scss文件。

# 4.配置全局 less 变量
```
  npm install sass-resources-loader -D
```
sass-resources-loader不仅支持SASS，还支持LESS，POSTCSS等

  a). 新建 `src/assets/styles/common.less`
  ```
    @color-red: red;
  ```
  b). 修改 `webpack.common.js`
  ```
    rules: [
      /* 忽略其他 */
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [path.join(__dirname, '../src/assets/styles/common.less')]
            }
          }
        ],
        exclude: path.join(__dirname, '../node_modules/')
      }
    ]
  ```
  c). 修改 `src/index.less`
  ```
  //  @color-red: red;
  .app {
    color: @color-red;
    text-align: center;
  }
  ```

# 5. 添加PostCSS (仅添加autoprefixer)
```
  npm install postcss-loader autoprefixer -D
```
autoprefixer 添加了 vendor 浏览器前缀

  a). 在根目录下新建postcss.config.js
  ```
    module.exports = {
      plugins: [
        require('autoprefixer')
      ]
    }
  ```
  b). 在webpack.common.js的样式相关插件的 css-loader 之后加上配置
  ```
  rules: [
    /* 忽略其他 */
    {
      test: /\.(css|less)$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader', // add it
        'less-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            resources: [path.join(__dirname, '../src/assets/styles/common.less')]
          }
        }
      ],
      exclude: path.join(__dirname, '../node_modules/')
    }
  ]
  ```

# 6.css modules优化和图片字体等资源加载
```
  CSS Modules 是为了加入局部作用域和模块依赖，方案有scoped，以及bem命名方式等，为了解决多组合作的方式，暂不采用

  引入图片字体等资源
  npm install url-loader file-loader -D
```
  a). 在 `webpack.common.js` 配置
  ```
    rules:[
      /* 忽略其他 */
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
          loader: 'url-loader',
          options: {
            //1024 == 1kb  
            //小于10kb时打包成base64编码的图片否则单独打包成图片
            limit: 10240,
            name: path.join('img/[name].[hash:7].[ext]')
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240,
            name: path.join('font/[name].[hash:7].[ext]')
          }
        }]
      }
    ]
  ```

# 7. Eslint
```
  npm install  eslint eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
```
  a).在根目录下新建 `.eslintrc.js`
  ```
    module.exports = {
      extends: [
        "eslint:recommended",
        "plugin:react/recommended"
      ],
      parserOptions: {
        "ecmaVersion": 2019,
        "sourceType": "module"
      },
      env: {
        node: true,
        browser: true,
        commonjs: true,
        es6: true
      },
      parser: '@typescript-eslint/parser',
      plugins: [
        "@typescript-eslint",
        "react-hooks"
      ],
      globals: {
        // 这里填入你的项目需要的全局变量
        // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
        // React: false,
        // ReactDOM: false
      },
      settings: {
        react: {
            pragma: "React",
            version: "detect"
        }
      },
      rules: {
        // 这里填入你的项目需要的个性化配置，比如：
        //
        // // @fixable 一个缩进必须用两个空格替代
        semi: ['error', 'never'],
        'no-console': 'off',
        'no-unused-vars': [
          'warn',
          {
            vars: 'all',
            args: 'none',
            caughtErrors: 'none'
          }
        ],
        'max-nested-callbacks': 'off',
        'react/no-children-prop': 'off',
        'typescript/member-ordering': 'off',
        'typescript/member-delimiter-style': 'off',
        'react/jsx-indent-props': 'off',
        'react/no-did-update-set-state': 'off',
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        indent: [
          'off',
          2,
          {
            SwitchCase: 1,
            flatTernaryExpressions: true
          }
        ]
      }
    }
  ```

# 8. 更新babel配置
```
  npm install @babel/preset-typescript @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators @babel/plugin-syntax-dynamic-import -D
```
支持装饰器以及路由的动态引入。

  a). 修改 `babel.config.js`
  ```
    module.exports = {
      presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        '@babel/preset-react',
      ],
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        '@babel/plugin-syntax-dynamic-import'
      ]
    }
  ```

# 9. React-router loadable懒加载
```
  npm install react-router-dom @loadable/component @types/loadable__component @types/react-router-dom -D
```
  a). 创建 `src/pages/Home/index.tsx`
  ```
    import React from 'react'
    class Index extends React.Component {
      render() {
        return (
          <div className="home">
            <p>
              <i><b>路漫漫其修远兮，吾将上下而求索...</b></i>
            </p>
          </div>
        )
      }
    }
    export default Index
  ```
  b). 创建 `src/pages/About/index.tsx`
  ```
    import React from 'react'
    class Index extends React.Component {
      render() {
        return (
          <div className="about">
            <p>
              <a href="https://github.com/alex-vin/react-ts" target="_blank">Alex-vin's  github</a>
            </p>
          </div>
        )
      }
    }
    export default Index
  ```
  c). 在 `src/App.tsx` 使用
  ```
    import React from 'react'
    import { HashRouter as Router, Route, Link } from "react-router-dom"
    import loadable from '@loadable/component'

    const HomeComponent = loadable(() => import(/* webpackChunkName: "home" */ './views/Home'))
    const AboutComponent = loadable(() => import(/* webpackChunkName: "about" */ './views/About'))

    class App extends React.Component {
      render() {
        return (
          <div className="app">
            <Router>
              <ul>
                <li>
                  <Link to="/">To Home</Link>
                </li>
                <li>
                  <Link to="/about">To About</Link>
                </li>
              </ul>
              <Route exact path='/' component={HomeComponent}></Route>
              <Route path='/about' component={AboutComponent}></Route>
            </Router>
            <p className="aps">talk is cheap, show me the code</p>
          </div>
        )
      }
    }

    export default App
  ```

# 10. 配置别名 alias
  a). 在 `webpack.common.js` `resolve`项下添加
  ```
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@': path.join(__dirname, '../src'),
        '@pages': path.join(__dirname, '../src/pages'),
        '@assets': path.join(__dirname, '../src/assets'),
      },
    },
  ```
  b). 修改 `tsconfig.json`
  ```
    "paths": {
      "@": ["src/*"],
      "@pages": ["src/pages/*"],
      "@assets": ["src/assets/*"],
    },
  ```

  至此，所有配置就结束了
