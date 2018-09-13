### 1.如何运行
* 新建一个js文件，如 [hello.js](https://github.com/timnity/SkillTree/blob/master/NodeBase/1-hello.js)
* 在hello.js中写入一点js运行代码，如 `console.log('----- Hello World -----')` 打印一段话
* 打开命令行（Terminal/Command）执行 `node hello.js`

### 2.多个文件间如何互相引用？
[2-moduleDemo.js](https://github.com/timnity/SkillTree/blob/master/NodeBase/2-moduleDemo.js)

[2-moduleRun.js](https://github.com/timnity/SkillTree/blob/master/NodeBase/2-moduleRun.js)

打开命令行运行 `node 2-moduleRun.js`

### 3. 一个简单的http服务
[httpserver.js](https://github.com/timnity/SkillTree/blob/master/NodeBase/3-httpserver.js)

### 有意识区分：module.exports 和 exports

相关细节看 [这里](http://www.ghostchina.com/module-exports-and-exports-in-node-js/) 和 [这里](http://gywbd.github.io/posts/2014/11/using-exports-nodejs-interface-design-pattern.html)

> 总结使用原则： module.exports 用于导出构造函数，exports用于导出属性参数
