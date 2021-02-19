# JavaScript 代码风格规范和工具
JavaScript 语言是一周之内完成的，它没有严格的语法要求，语法要求太严格，门槛太高容易影响生产效率；语法要求太松，每个人按自己的习惯来书写，导致难以协作维护，也不好。JavaScript就属于语法要求特别特别不严的那种，所以各种「黑魔法」层出不穷，一开始自己搞点黑魔法还挺好玩，要是要你接手前任留下的代码，那就想死的心都有了。

现在已经完全不是个人单打独斗的时代，特别讲求团队合作，所以大家代码风格的一致性，除了通过口头约定，也必须要有个工具来进行代码的规范性检查。

JavaScript发展到现代，逐步地加入了高级语言的特性，并且逐步产生了一定的代码规约，其中比较著名的有Google的代码规范标准、Airbnb JavaScript Style Guide等。

#### Airbnb JavaScript Style Guide
建议在初步能写点成就代码，基本熟悉js语言使用后，即尽早开始记住编写语法规范要求。以下是Airbnb的js规范，了解即可，不用背下来，再下面会提到用工具可以进行自动纠错提醒。

[Airbnb JavaScript Style Guide](https://github.com/yuche/javascript)

#### ESLint
eslint是一个工具，可用于多种开发语言中。它的作用就是根据你指定的规则运行语法验证，告诉你哪个地方的代码不符合你指定的语法规则。

eslint 的规则很多，可不需要都背下来，需要的时候去查就行了，[查询地址](http://eslint.cn/docs/user-guide/configuring)

##### 安装 eslint

`npm i eslint -g` or `npm i eslint -D`

##### 配置所需的规则
eslint只是帮你「验证」，但是用哪个「规则」得你告诉它，怎么告诉它呢？初始化一下，在命令行执行：
`eslint --init`(如果不行，把eslint安装成全局的 `npm i eslint -g`)

执行 `eslint --init` 会出现选项，可以这样选：
```
1. ? How would you like to configure ESLint?
> Use a popular style guide

2. ? Which style guide do you want to follow?
> Airbnb

3. ? Do you use React?
> N

4. ? What format do you want your config file to be in?
> JSON

5. ? Would you like to install them now with npm?
> y
```

初始化完后，执行 `./node_modules/.bin/eslint api/` 看看效果
为了以后方便执行，在package.json里加入一段脚本
```
  "scripts": {
    "lintapi": "./node_modules/.bin/eslint api/"
  },
```

以后只要执行 `npm run lintapi` 即可

#### 样例代码
[样例](https://github.com/timnity/Express-Scaffold/commit/00f16efba18f2adba3995c7ea320c64d642f2add)
