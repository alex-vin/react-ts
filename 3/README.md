具体可以参照antd官网 <a href="https://ant.design/docs/react/use-in-typescript-cn" target="_self">Antd官网</a>

# 添加 AntDesign
###### 为什么把 antd 单独拿出来说？因为公司项目并不是完全需要，等内部组建库建立吧！！！估计遥遥无期

```
  npm install antd --save
  npm install babel-plugin-import -D
```
babel-plugin-import 用于按需引入

  a). 在 `babel.config.js`配置：
  ```
    plugins: [
      /* 忽略其他 */
      ['import', {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        style: true
      }]
    ]
  ```
  b). 在 `webpack.common.js` 配置less
  ```
    module.exports={
      /* 忽略其它 */
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
        },
        include: [path.join(__dirname, '../node_modules/antd'), path.join(__dirname, '../src')],
        // exclude: path.join(__dirname, '../node_modules/')
      ]
    }
  ```
  c). 在 `src/App.tsc` 肆无忌惮
  ```
    /* 忽略其它 */
    import { Button } from 'antd';
    /* 忽略其它 */
    <li>
      <Button><Link to="/">To Home</Link></Button>
    </li>
    <li>
      <Button><Link to="/about">To About</Link></Button>
    </li>

  ```
