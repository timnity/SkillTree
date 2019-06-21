#### 什么是加密
网络传输为了通讯安全，加密解密是个绕不过去的技术难点。我们常听到 `base64`、`md5`、`sha256`等名词，这些可以把明文转换成一定的字符串。

比如：
```
123456 ——> base64 ——> MTIzNDU2
123456 ——> md5 ——> E10ADC3949BA59ABBE56E057F20F883E
```
但这还不是加密

#### `没有密钥的算法都不叫加密`

    编码（Encoding）是把字符集中的字符编码为指定集合中某一对象（例如：比特模式、自然数序列、8位字节或者电脉冲），以便文本在计算机中存储和通过通信网络的传递的方法，常见的例子包括将拉丁字母表编码成摩尔斯电码和ASCII。base64只是一种编码方式。

    杂凑（Hashing）是电脑科学中一种对资料的处理方法，通过某种特定的函数/算法（称为杂凑函数/算法）将要检索的项与用来检索的索引（称为杂凑，或者杂凑值）关联起来，生成一种便于搜索的资料结构（称为杂凑表）。杂凑算法常被用来保护存在资料库中的密码字符串，由于杂凑算法所计算出来的杂凑值具有不可逆（无法逆向演算回原本的数值）的性质，因此可有效的保护密码。常用的杂凑算法包括md5, sha1, sha256等。

    加密（Encryption）是将明文信息改变为难以读取的密文内容，使之不可读的过程。只有拥有解密方法的对象，经由解密过程，才能将密文还原为正常可读的内容。加密分为对称加密和非对称加密，对称加密的常用算法包括DES, AES等，非对称加密算法包括RSA，椭圆曲线算法等。

在古典加密算法当中，加密算法和密钥都是不能公开的，一旦泄露就有被破解的风险，我们可以用词频推算等方法获知明文。1972年美国IBM公司研制的`DES算法(Data Encryption Standard)`是人类历史上第一个公开加密算法但不公开密钥的加密方法，后来成为美国军方和政府机构的标准加密算法。2002年升级成为`AES算法(Advanced Encryption Standard)`。


##### 以下加解密字符串校验可通过 [在线 AES 加密解密](http://tool.chacuo.net/cryptaes) 来校验


#### AES-ECB 加解密

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

    pkcs 的全称是 Public Key Cryptography Standards（公钥加密标准），在这里我们是用它们来做填充，而 5 是 7 的一个子集。pkcs5 是 8 字节固定的，而 pcks7 可以是 1~255 任意字节。

#### AES-CBC 加解密

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

