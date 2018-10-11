JSON Web Token (JWT) 是一个非常轻巧的传输规范，这个规范用于在「客户端」和「服务器端」之间安全地传递消息。

在 JWT 出现之前，业内主要通过 Cookie 和 Session 的方式在客户端和服务端之间传输和交换数据。

### JWT 规范的组成
非常简单，JWT 的组成就三个部分：头部、载荷、签名，翻成中文有点怪，英文是：Head、Payload、Signature

##### Head
用于描述基本信息，例如类型、signature所用算法等等。

##### Payload
载荷就是具体的传输内容，如从哪来、到哪去、什么时候过期、什么时候签发等等

```
{
    "iss": "Durian Team JWT",
    "iat": 1441595731,
    "exp": 1551998472,
    "aud": "192.168.0.99",
    "sub": "hertz@example.com"
    "from_user": "Lee",
    "target_user": "He"
}
```
- `iss`: 该JWT的签发者
- `iat`(issued at): 在什么时候签发的
- `exp`(expires): 什么时候过期，Unix时间戳
- `aud`: 接收JWT的地址
- `sub`: 该JWT所面向的用户

##### Signature
签名是使用一定算法，确保 Head+Payload 不被篡改，它把Base64编码过的Head和Payload，加上一个 secret（任意指定），变成自己独有的签名。注意：这个secret放在服务器端，不可泄露，泄露了就可以被拿来签发了。有人问了：那服务器泄露了secret怎么办，怎么办，你服务器都不攻下来了，谁还要你的secret，直接去拖库了。

### 编码、签名过程

##### 1. 把 Head 用 Base64 进行编码。
得到如：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`

##### 2. 把 Payload 用 Base64 进行编码。
得到如：`eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9`

##### 3. 把 Head 和 Payload 用 . 连起来, Head 在前
得到如：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9`

##### 4. 用 HS256 或 SHA-1 等算法将上面那串进行签名
得到如：`TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ`

##### 5. 把 Head.Payload.Signature 连起来
得到如：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ`

##### 注意：Base64只是一种「编码」，很容易可以逆算结果。
##### 这里一般有两个疑问：
1. 签名是干嘛的
2. Base64可逆，信息暴露问题怎么解决

##### 签名是干嘛的
防止 Head 和 Payload 被篡改的，因为如果Head或Payload被篡改，无论它怎么弄，最后的签名都不可能一致。（理论上还是有可能重复，但几率小到你孙子辈都不会碰上一次）

##### 信息暴露问题
是的，会暴露。所以不要在Payload里放上敏感信息，一般用于传输非敏感数据就够了。如果你把密码放进去了……人家只要反算一下Base64就能拿到啦。

### JWT的使用场景
JWT 用于向Web应用传递非敏感信息，如加好友啊，下订单啊，还经常用于用户权限认证、单点登陆等场景。