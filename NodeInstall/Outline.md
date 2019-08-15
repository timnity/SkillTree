
## 一、直接安装 NodeJS

一般情况下，可通过直接下载 NodeJS 的安装包进行安装。

##### NodeJS 安装包 [下载](https://nodejs.org/en/download/package-manager/)

优点是简单直接，缺点是没法安装多个版本的 node 环境，而通过下面「二」的方式，可以安装多个版本的node，而且可以随时切换。

PS：Windows系统用户老实直接装，下面的工具没有Windows版本的。

---

## 二、通过 NodeJS 版本管理工具进行多版本管理和安装

有两个管理工具 「NVM」 和 「N」，用于管理多个 node 版本，因个人常用 nvm，这里介绍 nvm 的安装和使用。

##### Linux 下安装 NVM 的三种方法(直接在命令行执行)
```
1. Mac系统下通过 homebrew 的 > brew install nvm
2. curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
3. wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```
三种方法都行，都能安装，记得去查一下最新版本,在[这里](https://github.com/creationix/nvm)


##### Windows 下安装 NVM
确实有安装包，但不太稳定，坑又多，别折腾了……


##### NVM 使用
 1. nvm -v 查看nvm的版本号并且确认是否安装成功（注意是nvm的版本，不是node的）
 2. nvm ls 查看本地安装了多少个node，版本各是多少
 3. nvm ls-remote 看 nvm 可以安装的 node 的全部版本（好长）
 4. nvm install v8.10.0 安装指定版本
 5. nvm alias default 8.10.0 指定默认使用某个版本
 6. nvm use 10.6.0 用另外一个指定的版本（前提是已装）
