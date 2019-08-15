# 连接并操作 Mysql 数据库
Sequelize ([官方](http://docs.sequelizejs.com/)) 是Nodejs中比较完整的 ORM 库，用于连接和操作数据库，作为Nodejs后端，它能起到很大的作用。

第一步简单看一下官网的例子，接下来就直接用代码说话

#### 第一步先建立跟数据库的连接
DBTest.js
```
const Sequelize = require('sequelize')

/**
 * 连接数据库的主要参数
 */
const conn = new Sequelize('dev', 'dev', 'dev', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  pool: {
    maxConnections: 50,
    maxIdleTime: 30
  },
  dialectOptions: {
    charset: 'utf8mb4'
  },
  timezone: '+08:00', // 使用中国时区
  operatorsAliases: false // 严格模式
})

```

#### 第二步测一下数据库是否连通
```
// 测试连接
conn.authenticate()
  .then(() => {
    console.log('数据库连接成功')
  }).catch((err) => {
    console.error('无法连接数据库', err)
  })
```

#### 第三步创建一个 Modle
Sequelize 会根据 modle 来操作数据库里的表，也就是 modle 是数据库表在代码层面的映射(实体)。
```
// 创建一个用户表Model
const User = conn.define('user', {
  userid: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
  loginname: { type: Sequelize.STRING, allowNull: false, comment: '登录名' },
  displayname: { type: Sequelize.STRING, allowNull: false, comment: '昵称' },
  gender: { type: Sequelize.ENUM, values: ['0', '1'], defaultValue: '1', comment: '0.女 1.男' },
}, {
  paranoid: true
})
```
其中
1. 下面通过 modle 生成的表，会自动生成上面的指定字段，并会生成 createdAt 和 updatedAt 字段
2. paranoid 是指软删除，删除记录时不会真的删掉，而是写入删除时间，查询的时候不会自动查出来。

#### 在数据库中创建 User 表
```
// ---------- 创建 User 表 ----------
User.sync({ force: true }).then(() => {
  console.log(`----- 创建 User 表成功 -----`)
}).catch((err) => {
  console.error(`----- User 表创建失败: ${err} -----`)
})
```

#### 在User表中插入几条数据 (C)
```
// 写入几条数据 Insert into...
User.create({ loginname: 'zhangsan', displayname: '张三', gender: '0' })
User.create({ loginname: 'lisi', displayname: '李四', gender: '0' })
User.create({ loginname: 'wangwu', displayname: '王五', gender: '0' })
```

#### 在User表中查数据出来 (R)
```
User.findAll()
  .then((user) => {
    console.log('----- user = ', user)
  })
```

#### 修改几条数据 (U)
```
// 修改数据
User.update(
  { displayname: '老王' },
  { where: { userid: 2 } }
)
```

#### 删除数据 (D)
```
// 删除数据
User.destroy({ where: { userid: 2 } })
```

这样就可以完成数据库最基本的 CRUD （Create, Read, Update, Delete），[样例代码](https://github.com/timnity/Express-Scaffold/blob/database/api/src/DBTest.js)

最后执行 `node ./api/src/DBTest.js` 即可