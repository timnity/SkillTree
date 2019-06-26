### Redis 用来干嘛的？
Redis 是一种内存数据(in-memory)的架构，可以被当做一个「键值数据库」(key-value database)，等同于网页中的cookie、localStorage等。它完全是开源免费的，遵守的是BSD使用协议，Redis相对其他key-value缓存产品有如下特点：

- 支持数据持久化，可以将内存中的数据保存到磁盘，重启可再次加载使用。
- key-value存储不止是String，还包括list、set、zset、hash等数据结构。
- 支持数据容灾备份，即主从（master - slave）模式的数据灾备。

#### Redis优势：
- 性能极高 —— 读取速度 110000 次/秒，写速度 81000 次/秒。
- 数据类型丰富 —— String, List, Hash, Set, Orderd Set等等
- 原子性 —— 所有操作是原子性的
- 丰富的特性 —— publish/subscribe，通知，key过期等特性

#### Redis 的安装
具体安装本文不讲了，网上资料很多。主要把篇幅集中在使用上。

---

### Redis 基础

#### Redis 数据类型
String（字符串）、hash（哈希）、list（列表）、set（集合）、zset（sorted set 有序集合）

String 是redis最基本数据类型，是二进制安全的，意思是可以包含任何数据，比如jpg图片二进制数据。String 一个键最大能存储 512 MB。

hash 是一个键值对集合，其实是一个string类型的键值映射表，hash特别适合用于存储对象。每个 hash 可以存储 2 的 32-1 次方键值对（40多亿）

list 是一个字符串列表，列表最多存储 2 的 32-1 次方元素。

Set 是string类型的无序集合。

zset 是string类型元素的有序集合，且不允许重复。

---

#### Redis 在 Nodejs 上的使用

大部分教程都是使用 node redis 包来进行连接：
```
var redis = require('redis')
var redisClient = redis.createClient(port, ip, {})
```

但我们团队更喜欢用「ioredis」包来进行操作。原因是「redis」包更新很慢，而且所有操作需要代码实现，而「ioredis」封装了基本操作，除非复杂操作需要自己代码实现外，基本的读写、过期设置等都有比较好的封装。
