## 什么是加密
网络传输为了通讯安全，加密解密是个绕不过去的技术难点。我们常听到 `base64`、`md5`、`sha256`等名词，这些可以把明文转换成一定的字符串。

比如：
```
123456 ——> base64 ——> MTIzNDU2
123456 ——> md5 ——> E10ADC3949BA59ABBE56E057F20F883E
```
但这还不是加密

#### `没有密钥的算法都不叫加密`

    编码（Encoding）是把字符集中的字符编码为指定集合中某一对象
    （例如：比特模式、自然数序列、8位字节或者电脉冲），以便文本
    在计算机中存储和通过通信网络的传递的方法，常见的例子包括将
    拉丁字母表编码成摩尔斯电码和ASCII。base64只是一种编码方式。

    杂凑（Hashing）是电脑科学中一种对资料的处理方法，通过某种
    特定的函数/算法（称为杂凑函数/算法）将要检索的项与用来检索
    的索引（称为杂凑，或者杂凑值）关联起来，生成一种便于搜索的
    资料结构（称为杂凑表）。杂凑算法常被用来保护存在资料库中的
    密码字符串，由于杂凑算法所计算出来的杂凑值具有不可逆（无法
    逆向演算回原本的数值）的性质，因此可有效的保护密码。常用的
    杂凑算法包括md5, sha1, sha256等。

    加密（Encryption）是将明文信息改变为难以读取的密文内容，使
    之不可读的过程。只有拥有解密方法的对象，经由解密过程，才能
    将密文还原为正常可读的内容。加密分为对称加密和非对称加密，
    对称加密的常用算法包括DES,AES等，非对称加密算法包括RSA，椭
    圆曲线算法等。
    
在古典加密算法当中，加密算法和密钥都是不能公开的，一旦泄露就有被破解的风险，我们可以用词频推算等方法获知明文。1972年美国IBM公司研制的`DES算法(Data Encryption Standard)`是人类历史上第一个公开加密算法但不公开密钥的加密方法，后来成为美国军方和政府机构的标准加密算法。2002年升级成为`AES算法(Advanced Encryption Standard)`。


##### 以下加解密字符串校验可通过 [在线 AES 加密解密](http://tool.chacuo.net/cryptaes) 来校验


## AES-ECB 加解密

ECB(ee cc block)模式，是 AES 所有模式中最简单也最不被推荐的一种模式，它的固定明文对应的是固定密文，很容易被破解。此处以 ECB 模式入门作为了解 AES 加解密的练习。

注意几个参数：

1. **填充**：常用的是 `pkcs` 标准的 `pkcs7padding`。
2. **数据块**：选择 `128` 位，原因是 Java 端解密算法只支持 `AES128`。
3. **密钥**：随意填一个，不同项目建议用不同的密钥。
4. **偏移量**：ECB 模式没有偏移量。

##### AES-ECB 的 JavaScript 端加密
JavaScript 的加密库选择是个难点，[aes-js](https://github.com/ricmoo/aes-js) 这个库不支持 `RSA` 算法，[Web Crypto API]是浏览器自带的加密 API 库，原生支持 `AES` 和 `RSA`，但它的 `RSA` 和 `Java` 的还不兼容。所以选择 [node-forge](https://github.com/digitalbazaar/forge/)。

[AES-ECB 加解密样例代码](https://github.com/timnity/CryptoExample/blob/master/1.AES-ECB/AES-ECB.js)

##### AES-ECB 的 Java 端解密
```
try {
    Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
    cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec("这里是16字节密钥".getBytes(), "AES"));
    String plaintext = new String(cipher.doFinal(Base64.getDecoder().decode("这里是明文".getBytes())), "UTF-8");
    System.out.println(plaintext);
} catch (Exception e) {
    System.out.println("解密出错：" + e.toString());
}
```
注意，这里用到的是 `PKCS5Padding`，而 `forge` 的 AES-ECB 是默认 `pkcs7padding`。这是因为……Java 端的工程师命名错误……实际实现的是 pkcs7
，所以在 Java 端用 5 就对了。

    pkcs 的全称是 Public Key Cryptography Standards（公钥加密标准），
    在这里我们是用它们来做填充，而 5 是 7 的一个子集。pkcs5 是 8 字节固定的，
    而 pcks7 可以是 1~255 任意字节。

## AES-CBC 加解密

CBC 相对 ECB 安全一些。主要是因为 CBC 可以多传入一个偏移量。

```
const cipher = forge.cipher.createCipher('AES-CBC', key);
cipher.start({iv: iv});
cipher.update(input);
cipher.finish();
```
这里的 iv 就是一个偏移量。input 就是需要加密的 password 等内容。

[AES-CBC 加解密样例代码](https://github.com/timnity/CryptoExample/blob/master/2.AES-CBC/AES-CBC.js)

##### AES-ECB 的 Java 端解密
```
try {
    Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
    cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec("这里是16字节密钥".getBytes(), "AES"), new IvParameterSpec("这里是16字节偏移量".getBytes()));
    String plaintext = new String(cipher.doFinal(Base64.getDecoder().decode("这里是明文".getBytes())), "UTF-8");
    System.out.println(plaintext);
} catch (Exception e) {
    System.out.println("解密出错：" + e.toString());
}
```
跟 ECB 解密时几乎一样，只是增加了一个 `IvParameterSpec`，用来生成 iv。

# RSA
AES 的加解密是非常不安全的，因为我们把加密用的密钥和`iv`偏移量参数都暴露在了前端，为此我们需要一种更加安全的加密方法 **`RSA`**，因为 RSA 是非对称加密，即使我们把加密用的公钥完全暴露在前端也不必担心，别人即使截获了我们的密文，但是只要没有私钥，就无法解出明文。

##### 生成密钥对
要用 RSA 加密，首先我们需要生成一对数字钥匙：公钥和私钥。

    由于从私钥是可以导出公钥的，而从公钥导不出来，所以一定要保存好私钥，不要泄露。

    生成 RSA 密钥常用命令是两个：ssh-keygen 和 openssl

##### 密钥对的类型格式
同样都是密钥，但格式就有：

`X.509、PKCS#1、PKCS#5、PKCS#7、PKCS#8、PKCS#10、PKCS#12、ASN.1` 等等很多种，未来可能有更多。

而这里有一个容易让人头晕的地方，就是各语言、各第三方库对格式的支持不一样……，比如 Java 只支持 PKCS#8，而 JavaScript 的大部分第三方库，只支持 PKCS#1，所幸几个格式之间是可以用命令互相转的，由于格式转来转去的，而大部分教程只是丢个命令，经常弄得人很晕，这个坑我就掉了很久。

---
### `ssh-keygen` 生成公私钥

使用 **[ssh-keygen](https://www.ssh.com/ssh/keygen/)** 命令可以生成公私钥：
```
// 默认生成 rsa rfc4716 格式的密钥文件，字节长度默认 2048，要输入两次密码
ssh-keygen -f keyname -C "test key"

// 默认生成 rsa rfc4716 格式的密钥文件，字节长度默认 2048，密码设置为空，不会要你输入两次密码
ssh-keygen -f keyname -C "test key" -P ""

// 等价于上面一条命令
ssh-keygen -f keyname -C "test key" -P "" -t rsa

// 注意：不要尝试去对比密钥文件，同一个命令每次生成出来的内容都是不一样的。

/* 
-t 参数可用的类型有 rsa、dsa、ecdsa、ed25519 
RSA：广泛受到技术支持，十分安全，长度在 1024 ~ 4096 字节(bits)，长度可调(如，使用 -b 1024)。
DSA：生命期很短，已经不建议使用，会造成私钥泄露。
ECDSA：DSA 的加强版，很多库或服务器都不支持，据说还是没避免泄露可能，坑还多。DSA 和 ECDSA 唯一的优点就是 key 文件比较小。
ED25519：更新的加密类型，避免了 DSA 和 ECDSA 的弊端，拥有数学上最强算法，但太新，也是支持还不足。
*/
```

命令执行后会在当前文件夹下产生 **`keyname`** 和 **`keyname.pub`** 文件，其中 pub 文件就是公钥，另一个是私钥。一般情况下把这里生成的公钥直接放到 SSH 服务器上就可以做 ssh 登录的身份校验，但是 **`ssh-keygen 生成的默认是 rfc4716 格式，而不是 pcks#1 格式，所以后面要做个转换`**

生成公钥后再执行以下命令：
```
// 生成 PKCS1（RSA）
ssh-keygen -f keyname.pub -e -m PEM

// 另给一个生成 PKCS8（RSA）样例
ssh-keygen -f keyname.pub -e -m PKCS8
```
在终端会打印出
```
-----BEGIN RSA PUBLIC KEY-----
...
-----END RSA PUBLIC KEY-----
```
且用同一个公钥文件生成出来的 PKCS#1 内容都是一样的，可以用于校验。

**`注意这段是打印在终端上的，不会生成新的文件，可以新建一个 pem 文件把内容复制过去就有了一个新的pkcs1格式的公钥，公钥文件扩展名常命名为 *.pem`，假设我们这里得到了一个 ssh_pubkey.pem**

---

### `openssl` 生成公私钥

openssl 命令直接生成的就是 `pkcs1` 格式的 pem 文件，不过它是先生成私钥，再从私钥生成公钥，是两条命令
```
// 先生成 PKCS1 私钥
openssl genrsa -out private_key.pem 2048

// 再生成公钥
openssl rsa -in private_key.pem -pubout -out public_key.pem

```

下面一连串命令是各种转换，注意别晕了：
```
// PKCS1 私钥 转换为 PKCS8 私钥
openssl pkcs8 -in private_key.pem -topk8 -out private_key_p8.pem -nocrypt
// -nocrypt 参数去掉，生成的 pkcs8 文件要输入密码


// PKCS8 私钥 转换为 PKCS1 私钥
openssl rsa -in private_key_p8.pem -out private_key_p1.pem
// 用 private_key_p1.pem 和 private_key.pem 对比一下，内容是一样的
// 用加密的 pkcs8 生成的 pkcs1 也是一样的


// 尝试从 PKCS1 公钥转成 PKCS8 公钥
openssl pkcs8 -in public_key.pem -topk8 -out public_key_pkcs8.pem -nocrypt
// 不成功，该命令只能转私钥，公钥不能直接转


// 从 PKCS8 私钥分别生成对应的公钥(PKCS1的生成前面已经做过了)
openssl rsa -in private_key_p8.pem -pubout -out public_key_p8.pem
// 把 public_key.pem 和 public_key_p8.pem 做对比，内容一样。
/**
 * 也就是说无论从 pkcs1 私钥还是 pkcs8 私钥生成的公钥内容都是一样。
 * 即无论 private key 是 p1 还是 p8，生成的 public key 都是 p8。
 * p8 的 public key 开头是「-----BEGIN PUBLIC KEY-----」
 * 而 p1 public key 的开头是「-----BEGIN RSA PUBLIC KEY-----」
 */


// p8 公钥转 p1 公钥
openssl rsa -pubin -in public_key.pem -RSAPublicKey_out
// 注意这段是打印在终端上的，不会生成文件。

// p1 公钥转 p8 公钥
openssl rsa -RSAPublicKey_in -in public_key_p1.pem -pubout
// 注意这段是打印在终端上的，不会生成文件。


```
转换可参考的文献：
1. [p1-p8-x.509 CSR side note](https://blog.ndpar.com/2017/04/17/p1-p8/)
2. [openssl RSA密钥格式PKCS1和PKCS8相互转换](https://www.cnblogs.com/cocoajin/p/10510574.html)
 

### 总结
    RSA 密钥生成，使用 openssl 命令是最方便的，而且 p1 和 p8 可以各种互相转换使用。