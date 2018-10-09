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
[后端webpack打包样例](https://github.com/timnity/Express-Scaffold/commit/43b3b1ed6ceb138d5fd0d408f25bf2b07bd722b1)

注意：
1. target 要为 node，这样fs、path等内置包才可以用，否则默认要用V8的引擎来执行
2. node_modules 文件夹要忽略掉，用第三方库或自己写代码忽略即可

### Code Splitting 代码分割
一般代码分割需要做这些事情：

1. 为第三方库或公共基础组件，变化较少的公共库单独打包，利于缓存。
2. 为 Webpack 的运行时单独打包。
3. 为不同入口的公共业务代码打包。
4. 为异步加载的代码打一个公共的包。

Code Splitting 在webpack中一般是通过 CommonsChunkPlugin 来完成的。由于配置比较麻烦，大家的配置往往互相copy，基本上成了模板代码。如果比较复杂的要求，那就很难配置了。

在 Webpack4 下，对 CommonsChunkPlugin 直接废弃了，引入 optimization.splitChunks 这个选项。

optimization.splitChunks 默认是不用色泽的。如果 mode 是 production，那 Webpack4 就会开启 Code Splitting。
```
默认 Webpack4 只会对按需加载的代码做分割。如果我们需要配置初始加载的代码也加入到代码分割中，可以设置 splitChunks.chunks 为 'all'。
```

### Long-term caching
给静态文件一个很长的缓存过期时间，比如一年。然后再给文件里加上一个 hash，每次构建时，当文件内容发生改变时，文件名中的 hash 也会变。

```
output: {
    filename: [name].[chunkhash].js
}
```