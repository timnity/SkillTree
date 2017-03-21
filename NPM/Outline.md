# NPM Node.js包管理器

npm是Node.js的包管理器，安装node.js会自动一起安装这个工具，它是 Node 获得成功的重要原因之一。 正因为有了npm，我们只要一行命令，就能安装别人写好的模块。

npm当前已经是最大的第三方类库集合，它的官网地址是: [npmjs.org](https://npmjs.org)。

### package.json
要安装什么包，哪个版本，安装在什么环境下，都通过一个配置文件 [package.json](https://github.com/timnity/SkillTree/blob/master/NPM/package.json)

### 常用npm命令
1. `npm update -g npm` 更新npm版本。
2. `npm install` 或简写 `npm i` 安装package.json里罗列的所有包。
3. `npm i -g xxx` 全局安装第三方包，一般是安装一些独立运行的小工具，如 nodemon。
4. `npm i xxx` 在当前目录下安装xxx包，并且不写入package.json。
5. `npm i xxx --save` 在当前目录下安装xxx包，并且写入package.json中的 dependencies 里。
6. `npm i xxx --save-dev` 在当前目录下安装xxx包，并且写入package.json中的 devDependencies 里。

### 了解 Yarn 和 cnpm

### 了解 npm-check-updates
