## Github Page

这是一个文档总结网站，主要用于记录自己的一些学习过程。

### webpack

[webpack官方文档](https://webpack.js.org/)

#### 快速入门

- 文件目录
```
project
|- src
|   |- index.js
|   |- index.html
|- webpack.config.js
```

- 基本配置(webpack.config.js)
```javascript
module.exports = {
    mode: 'development',
    entry:'./src/index.js',
    output: {
        filename: 'bundle.js',
        path = path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        })
    ]
}
```

- 配置指南

### vue

[vue官方文档](https://v3.cn.vuejs.org/)

- 快速入门
- 配置指南

### node

### javascript

### 网络

### 其他

- **[我的网页](https://lvhuihao.github.io/home.html)**