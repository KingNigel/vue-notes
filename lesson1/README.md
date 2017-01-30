#webpack
##webpack
###网站
官网http://webpack.github.io/
1.X官方文档http://webpack.github.io/docs/
###什么是webpack？
webpack is a module bundler.
webpack是一个模块化的打包工具。---->先抛开node.js
sea.js+符合CMD规范开发的js文件---------->一起引入html进行执行
符合CMD规范开发的js文件---通过webpack的解析---->合并成一个js文件--->引入html进行执行
![webpack](./pic/1.png)
![webpack](./pic/2.png)
###webpack所支持的规范
CMD、AMD、CommonJS、ES2015 module
###webpack的使用
安装命令
npm install webpack -g
使用命令
webpack ./app.js app.bundle.js
###webpack配置文件
1. 文件名--->webpack.config.js
2. 配置文件,使用module.exports曝露出对象
3. 通过对对象属性的设置进而设置webpack的任务
```javascript
 module.exports = {
     entry: './src/app.js',
     output: {
         path: './bin',
         filename: 'app.bundle.js',
     }
 }
```
entry属性：用来配置要打包的入口文件
值可以是

1. 字符串  entry: './src/app.js'

2. 数组  entry: ['./src/app1.js','./src/app2.js']

3. 对象  对象的键名这里称之为块名（代码块的意思），块名可以在output属性中使用
entry: { 
    app1:"./src/app1.js",
    app2:"./src/app2.js",
}
 output: {
    path: './bin',
    filename: '[name].bundle.js',
}
###练习计算器打包
###webpack使用插件把css打包进入js
why

1. css 要怎么打包？为什么要打包css？

how

1. webpack是一个框架里面可以使用插件--->我们称之为loader(加载器)

2. 安装 style-loader css-loader  --->npm i

3. webpack.config.js中添加module属性，添加loaders上数组，
在loaders可以添加多个配置

4. {test:/\.css$/,loader:'style-loader!css-loader'}
test 使用正则去匹配要加载的文件
loader 使用什么加载器 后面的loader先被加载

5. 在js中require css文件

https://my.oschina.net/dawd/blog/788155

###webpack打包css自动添加浏览器内核前缀

1. 使用autoprefixer-loader
2. {test:/\.css$/,loader:'style-loader!autoprefixer-loader'}

###webpack打包less文件
1. 需要的包 less less-loader

###web打包sass文件
1. 需要的包 node-sass sass-loader

###web打包图片进入js
1. 下载url-loader，这个loader可以把图片转成base64的字符串放入就是文件。

2. 在loader属性中写要使用的loader的时候可以省略‘-loader’

3. 在loader的后面通过？给loader传参
  例,loader:'url?limit=40000'

4. url的参数limit设定打包入js中的图片的大小，
  如果小于限制的大小，则会被打包入js文件中
  如果大于限制的大小，则会被放到js同级目录中。(需要file-loader这样才能创建文件)
###webpack开发工具
产生的问题

1. 修改了代码后，都要打包一下才能测试
2. 打包后的代码和图片如果不与页面在一个目录下，可能会产生路径问题

解决问题
使用webpack-dev-server，是一个基于node的express开发的服务器
http://webpack.github.io/docs/webpack-dev-server.html

安装 npm i -g webpack-dev-server

使用webpack-dev-server --inline --hot --open --port 3001 命令

--inline 自动刷新
--hot 热加载
--open 默认浏览器打开
--port 设置服务器开启端口号

虽然解决的路径加载的问题，但是并没有热加载和自动刷新

需要安装一个插件  html-webpack-plugin
安装 npm i html-webpack-plugin
new htmlWebpackPlugin({
   title:'index', 
   filename:'index.html',
   template:'index1.html'
})
title //生成的页面标题
filename //生成的文件名称
template //根据index1.html这个模板来生成

注意点：webpack-dev-server html-webpack-plugin
在使用的时候会报一些 说找不到webpack/XX/XX文件这样的错误
这个原因是我们的webpack是全局安装的，插件需要用webpack里面的代码
这里同时需要本地下载一个webpack，也就是使用命令 npm i webpack 一下就可以了。


###webpack打包es6语法的模块化代码
why
vue里面是在使用es6里面的模块化的语法

es6 模块化的写法
引用

1. require('foo.js');
   import 'foo.js' ;

2. var bar =require('bar.js');
   import bar from 'bar.js';

曝露

1. exports function foo(){} 普通曝露
    exports var foo=123;
   import {foo} from 'xx.js';

2. exports default function foo (){}指定默认输出
    import foo from 'xx.js';

3. exports default {foo:foo,bar:bar}
 
es6、vue、webpack、node关系

how
安装相关包 babel-core babel-loader babel-preset-es2015 babel-plugin-transform-runtime
1.第一种方法
{
  test:/\.js$/,
  exclude:'./node_modules',
  loader:'babel?presets[]=es2015'
}
2.第二种方法
{
    test:/\.js$/,
    exclude:/node_modules/,
    loader:'babel-loader'
}

module.exports里面加
   babel:{
     presets:['es2015'],
     plugins:['transform-runtime']
   }