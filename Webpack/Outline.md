### 说明
Webpack 是一个很好用的代码打包和集成工具，但是一直以来，它的配置文件太麻烦，较高的门槛阻止了很多新手入坑。但从 4.0 版本以后可以无需配置文件即可运行。

#### 安装和无配置运行 webpack
`npm i webpack webpack-cli --save-dev`

试着运行： `node ./node_modules/.bin/webpack` 或把它写到package.json 的script里 `"build": "node ./node_modules/.bin/webpack"`

报错哦：
```
RROR in Entry module not found: Error: Can't resolve './src' in 'project-folder'
```

原来是因为没有入口文件，人家说可以没有配置文件，可没说没有入口文件也可以呢，webpack 4 在 ./src 目录下找一个入口文件，在以前入口文件必须在 webpack.config.js 配置文件里指定，现在不用指定，默认是 ./src/index.js 这个文件。

测试一下：创建 index.js 文件，内容随便写：
```
console.log('----- Hello webpack -----')
```
再次执行 `npm run build`

#### 生产和开发模式
webpack 有两个配置文件是常事，一个用于生产环境，一个用于开发环境。
* 开发环境：一般有dev server，和 hot load 热加载相关的。
* 生产环境：一般肯定要压缩文件的 UglifyPlugin,sourcemap等。

在 package.json 中这样写script:
```
"scripts": {
  "dev": "webpack --mode development",
  "build": "webpack --mode production"
}
```
分别运行`npm run dev` 和 `npm run build`

分别对比最后的输出文件可以发现，开发环境的代码没有压缩，而生产环境的直接压缩了。

#### loader
webpack 通过 loader 来给自己扩展功能。基本现在做框架的思路都是这样，核心库尽可能小，功能通过扩展来实现。这个扩展在某些框架或语言里，叫 extends、plugin等等，在webpack里官方叫它们loader。

loader 可以不通过配置文件直接使用，但那导致命令行太长了，我们要的是实用，不追求这种「魔法」，所以直接上配置文件吧，具体使用方法各种资料都有，这里不赘述。


### Backend-Config
