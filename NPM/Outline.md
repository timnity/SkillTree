# NPM 包管理器

开发一个大型系统，什么都自己从头写，比如加密解密、网络通讯都要自己从头写，那是非常痛苦的，所以从很早以前，软件工程师们就知道写一些通用的代码片段，或叫工具包(tools/utils)或叫插件(Plugin)或叫第三方库(third part lib)，然后调用一下，就拥有相应的功能，做个不恰当的比喻，写系统就像拼积木，把各个积木块拼在一起就好了。

这些积木块，以前是要到处去找的，非常费时间，也有一些专业网站提供下载，但是要把积木拼在一起，还是非常麻烦，总会出现各种各样的问题。

因此，后来工程师们就想出了「包管理器(包管理工具)」的办法，通过制定标准插件接口，别人随便写工具，只要能够对上接口，再上传到统一的地方，就可以随时安装调用了。

npm 就是Node.js的包管理器，它能够通过命令行，做出相应的动作，自动给当前的项目安装好第三方包。它是 Node 获得成功的重要原因之一。

安装 node 的时候，npm 其实一起安装好了，正因为有了npm，我们只要一行命令，就能安装别人写好的模块。

那么去哪里找到这些库，并且看到详细信息呢？npm 当前已经是所有编程语言中最大的第三方类库集合工具，它的官网地址是: [npmjs.org](https://npmjs.org)。

### 项目怎么知道我要装什么，哪个版本呢
要安装什么包，哪个版本，安装在什么环境下，都通过一个配置文件 [package.json](https://github.com/timnity/SkillTree/blob/master/NPM/package.json)

然后运行 `npm install` 即可直接安装。(注意要在项目根目录下)

### 常用npm命令
1. `npm update -g npm` 更新npm版本。
2. `npm install` 或简写 `npm i` 安装package.json里罗列的所有包。
3. `npm i -g xxx` 全局安装第三方包，一般是安装一些独立运行的小工具，如 nodemon。
4. `npm i xxx` 在当前目录下安装xxx包，并且不写入package.json。
5. `npm i xxx --save` 在当前目录下安装xxx包，并且写入package.json中的 dependencies 里。
6. `npm i xxx --save-dev` 在当前目录下安装xxx包，并且写入package.json中的 devDependencies 里。

### 安装最新版的 node 同时把上个版本的依赖库一起安装过来
`nvm install node --reinstall-packages-from=node`

### 把 npm 的默认仓库改为国内的
`npm config set registry https://registry.npm.taobao.org`

### npm-check
如果现在安装的库升级了怎么查看呢？使用第三方小工具 npm-check 即可
```
# 检查当前项目内的库是否升级
> npm-check -u

# 检查全局工具库是否升级
> npm-check -ug
```
