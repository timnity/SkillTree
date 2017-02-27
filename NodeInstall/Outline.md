# Node Installtion / 安装 NodeJS

## NodeJS 安装包下载地址
[下载](https://nodejs.org/en/download/package-manager/)


## 开发界毕竟还是 Linux 占主导地位，相应地有两个管理工具 NVM 和 N，用于管理多个node版本，当前常用NVM。

### 安装 NVM
1. brew install nvm
2. curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
3. wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash

 #### NVM 使用
 1. nvm -v 看下版本号并且确认是否安装成功。
 2. nvm ls 看本地安装的node版本(当然什么也没有咯)
 3. nvm ls-remote 看 nvm 可以安装的 node 的全部版本号
 4. nvm install v6.10.0 安装指定版本
 5. nvm alias default 6.10.0 指定默认使用某个版本
 6. nvm usee 7.6.0 用另外一个指定的版本
