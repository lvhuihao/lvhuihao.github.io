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

- **[我的网页](https://lvhuihao.github.io/home.html)**

### Javascript

#### Promise(期约)

- 快速入门

  promise是用于异步处理

  ```javascript
  let p = new Promise((resolve,reject)=>{
    setTimeout(resolve(),1000)//1s后resolve
    setTimeout(reject(),1100)//1.1s后reject//状态不会改变，因此这个reject没有作用
  });
  p.then(
    ()=>{
      //fulfill后的回调函数
      ...
    },
    ()=>{
      //reject后的回调函数
      ...
    });
  p.catch(()=>{
    //reject后的回调函数
    ...
  });//是p.then(null,()=>{...})的语法糖
  p.finally(()=>{
    //无论resolve还是reject，最后都会执行的函数
    ...
  })
  ```

- 三种状态

  Pending，fullfilled，rejected

- 主要方法

  Promise.prototype.then()

  Promise.prototype.catch()

  Promise.prototype.finally()

  在异步函数中通过resolve(), reject()方法改变promise的状态

  通过Promise.resolve(), Promise.reject()可以直接得到fullfilled和rejected状态的promise

- 执行顺序问题

  1. 定义promise时指定的函数会立即执行
  2. 根据promise的状态执行的程序，比如then()中的程序会放到消息队列中在下次循环中执行
  3. promise添加多个处理程序，当状态发生变化时，按照添加顺序依次执行

- 数据传递

  resolve()函数第一个参数与reject()函数第一个参数将传递给后续的onResolved与onRejected函数

- 异常处理

  在promise的异步函数中抛出异常会导致reject

  promise的异步函数中抛出异常不会导致同步代码的执行

  promise的reject导致的异常不能被try-catch捕获

  可以在promise的异步函数中使用try-catch捕获异常并处理异常

#### es6模块

- 导出方式

  - 命名导出

    - 行内式

      ```javascript
      export const foo = 'foo';
      //可以连续导出
      export const foo = 'foo', bar = 'bar';
      //可以声明多个行内式导出
      export const foo = 'foo';
      export const bar = 'bar';
      export const baz = 'baz';
      ```

    - 子句式

      ```javascript
      const foo = 'foo';
      export { foo };
      //可以为部分或全部导出设置别名
      export { foo as myFoo};
      //可以声明多个子句式导出
      const foo = 'foo';
      const bar = 'bar';
      const baz = 'baz';
      export { foo, bar as myBar};
      export { baz };
      ```

  - 默认导出（只能有一个）

    ```javascript
    //只能采用子句式
    const foo = 'foo';
    export default foo;//与下面的等价
    export { foo as default };
    ```

  - 混合导出

    ```javascript
    const foo = 'foo';
    const bar = 'bar';
    const baz = 'baz';
    // export { bar, baz };
    // export default foo;
    export { bar, baz, foo as default };
    ```

    

- 导入方式

  - 针对命名导出的导入

    ```javascript
    //指名导入，可设置别名
    import { foo, baz, myBar as bar } from './es6_export.js';
    //使用 * 全部导入，需设置别名
    import * as Foo from './es6_export.js';
    ```

  - 针对默认导出的导入

    ```javascript
    //将默认导出作为default引入，并指定别名
    import { default as foo } from './es6_export.js';//两个等效
    //不使用大括号直接导入
    import foo from './es6_export.js';//两个等效
    ```

  - 混合导入

    ```javascript
    //foo为默认导出的内容，bar, baz为命名导出的内容
    import foo, { bar, baz } from './es6_export.js';
    import {default as foo, bar, baz } from './es6_export.js'
    import foo, * as Foo from './es6_export.js';
    
    //存在默认导出时，直接使用 * 会认为默认导出的内容的名字是default
    import * as Foo from './es6_export.js';
    console.log(Foo)//输出{ bar: 'bar', baz: 'baz', default: 'foo' }
    ```

    

## 正则表达式

#### 基础内容

1. 元字符--正则表达式中的基本元素

   | 元字符 | 匹配元素                 |
   | ------ | ------------------------ |
   | .      | 所有字符                 |
   | \w     | 字母或数字或下划线或汉字 |
   | \s     | 任意空白字符             |
   | \d     | 数字                     |
   | \b     | 单词的开始或结束         |
   | ^      | 字符串的开始             |
   | $      | 字符串的结束             |

2. 重复限定符--指定重复次数的符号元素

   | 重复限定符 | 重复次数    |
   | ---------- | ----------- |
   | *          | 0次或多次   |
   | +          | 1次或多次   |
   | ?          | 0次或1次    |
   | { n }      | n次         |
   | { n, }     | n次或更多次 |
   | { n, m }   | n~m次       |

3. 分组

   | 分组符号 | 说明                                                         |
   | -------- | ------------------------------------------------------------ |
   | （）     | 没有括号情况下，所有符号只匹配临近的一个字符；使用括号后，括号内内容被视为一个整体被符号所作用。 |

4. 转义

   | 符号 | 说明                     |
   | ---- | ------------------------ |
   | \    | 将功能符号转换成普通字符 |

5. 条件或

   | 符号 | 说明                       |
   | ---- | -------------------------- |
   | \|   | 用在"()"里面，表示或者条件 |

6. 区间

   | 符号 | 说明                                                         |
   | ---- | ------------------------------------------------------------ |
   | [ ]  | 用于匹配的字符范围区间，直接将每个字符写在[]里面，如果是连续字符可用"首字符-尾字符"表示 |

   

7. 

