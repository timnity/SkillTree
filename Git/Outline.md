Git 是一个分布式版本控制软件，最初由Linux系统创始人林纳斯·托瓦兹(Linus Torvalds)创作，于2005年以GPL发布。最初目的是为更好地管理Linux内核开发而设计。现在它已是使用最广泛的成熟的版本控制系统。

##### Git的命令有很多，但是全部用命令行的方式，对新人来说门槛较高。平时使用可以以带界面(GUI)的工具，如SourceTree、Tower、Github App为主，以下列出常用的Git命令：

```
1. git init —— 初始化git项目
2. git status —— 查看当前状态
3. git add —— 增加文件
4. git commit -m "your commit messages" —— 提交
5. git diff —— 查看区别
6. git remote add origin
7. git push origin master
8. git clone —— clone项目到本地
9. git branch —— 创建分支
10. git checkout —— 切换分支
11. git branch -d —— 删除文字
12. git merge —— 合并分支
```

完整的 Git 命令如下：[Git 命令大全](https://github.com/shfshanyue/cheat-sheets/blob/master/docs/git.md)

---

#### 团队通过Git协作开发的一般流程
1. 技术主管在git服务上新建一个项目库，设置好组员的权限（Master、Developer、Reader）
2. 项目库地址类似：https://github.com/groupname/TestProject.git
3. 组员把项目 Clone 到本地。此时所有人拉下来的项目库的分支是master主分支。
4. 组员在Master主分支的基础上新建自己的分支，类似： dev/lisi，可以按人划分支，可以按功能分支，小型项目可以全部用一个开发分支。
5. 组员在各自的分支上写代码，功能完成后，提交代码，并告知技术主管可以合并
6. 技术主管review代码，然后把代码合并到 master 主分支上。

前提：
1. 模块划分要清晰，一人或两人一组，负责开发单个功能块
2. 技术主管才有权限合并 master 分支，合并前可以充分 Review 代码。
3. master 主分支确保合并要解决一定问题，多一个少一个空格不要提交。

---

#### 常用 Git 图形客户端：
##### 1. SourceTree [下载地址](https://www.sourcetreeapp.com/)

SourceTree客户端在Mac系统上运行良好，在对 brance 分支的显示上比较友好，常用操作显眼，操作难度较低。但在windows系统上，稍微有些容易Crash(早期版本)

![SourceTree](https://www.sourcetreeapp.com/dam/jcr:580c367b-c240-453d-aa18-c7ced44324f9/hero-mac-screenshot.png?cdnVersion=jx)

##### 2. Tower

Tower 还算好用，缺点是小贵。[官网](https://www.git-tower.com)

