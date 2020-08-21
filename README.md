## 🏹 概述

这是一个 babel 插件， 类似于 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import), 作用是替换 CommonJS、ES6 module 中指定的文件后缀, 比如测试调试环境我们需要导入 scss, 而正式环境不能确保所有用户都是用 sass, 所以都导入最终编译好的 css 文件。

## 🗝 配置使用

    在bable配置中加入 需要替换的后缀
    such as:

```js
    "plugins": [
        [
            "./bable-import-style-suffix.js",
            {
                "matchSuffixArr": [".sass", ".scss"],
                "relaceStrSuffix": ".css"
            }
        ]
    ]
```
