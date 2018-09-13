Git 是一个分布式版本控制软件，最初由Linux系统创始人林纳斯·托瓦兹(Linus Torvalds)创作，于2005年以GPL发布。最初目的是为更好地管理Linux内核开发而设计。现在它已是使用最广泛的成熟的版本控制系统。

##### Git的命令有很多，但是全部用命令行的方式，对新人来说门槛较高。以下列出常用的Git命令，日常中使用带界面(GUI)的 Git 工具即可。

```
1. git init
2. git status
3. git add
4. git commit -m "your commit messages"
5. git diff
6. git remote add origin
7. git push origin master
8. git clone
9. git branch
10. git checkout
11. git branch -d
12. git merge
```

完整的 Git 命令如下：[Git 命令大全](https://github.com/shfshanyue/cheat-sheets/blob/master/docs/git.md)

---

#### 团队通过Git协作开发的一般流程
1. 技术主管新建一个项目库，设置好组员的权限
2. 项目库地址类似：https://gitlab.com/groupname/TestProject.git
3. 组员把项目 Clone 到本地。
4. 组员在 Master 主分支上新建自己的分支，类似： dev/lisi
5. 组员在自己的分支上写代码，功能完成后，提交代码，并告知技术主管可以合并
6. 技术主管把代码合并到 master 主分支上。

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

Tower 是个人感觉最好用的 Git 客户端之一，唯一缺点就是小贵。[官网](https://www.git-tower.com)

![image](https://assets.git-tower.com/assets/product-media/mac/conflict-wizard/conflict-wizard_mac_cropped@1500w.mp4)

