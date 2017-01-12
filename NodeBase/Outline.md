# Node Install / Node 环境搭建

## 用NVM安装Node

### 1. [Install NVM](https://github.com/creationix/nvm)
在终端执行以下命令

`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash`

或

`wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash`


### 2. NVM常用命令
* nvm ls
* nvm ls-remote
* nvm install [版本号]
* nvm uninstall [版本号]
* nvm alias default [版本号]

### 3.安装 Node.js
`nvm install [版本号]`

`npm update -g npm`

### 4.运行
* 新建一个js文件，如hello.js
* 在hello.js中写入一点js运行代码，如 `console.log('----- Hello World -----')` 打印一段话
* 执行 `node hello.js`

### 5.module.exports 和 exports 使用原则

相关细节看 [这里](http://www.ghostchina.com/module-exports-and-exports-in-node-js/) 和 [这里](http://gywbd.github.io/posts/2014/11/using-exports-nodejs-interface-design-pattern.html)

> 总结使用原则： module.exports 用于导出构造函数，exports用于导出属性参数
