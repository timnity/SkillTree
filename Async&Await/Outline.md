## Async 和 Await
Async 是「异步」的简写，而 Await 可以认为是 async await 的简写。async 是用于申明一个 function 是异步的，而 await 是等待一个异步方法执行完成。

有一个规定，await 只能出现在 async 语句中。

在 async 之前，js 的异步方式从最早的：回调(callback)，到 Promise 对象，再到 Generator 函数。

    async 跟 Generator 函数比较，有如下优势：
    1. 自带执行器，而 Generator 要靠 co 等执行器才行，async 自带在 ES7 里面。
    2. async 和 await 比起 Generator 的星号和 yield 语义更清晰。
    3. 更广的适用性。yield 命令后面只能是 Thunk 或 Promise 对象，而 await 命令后面，可以跟 Promise 对象和数字、字符串、布尔等原始类型值。


#### Async 返回的是什么？
普通的同步函数通过 `return` 的返回值返回我们想要的值，那么 async 返回的是什么呢？
```
async function testAsync() {
    return "hello async";
}

const result = testAsync();
console.log(result);
```
输出的是一个 `[Promise Object]`，是一个 promise 对象。如果在 async 中用 `return` 返回一个直接量，则 async 会通过 `Promise.resolve()` 封装成一个 Promise 对象。

由于 await 是要包含在 async 函数中的，那么像这个例子，在 async 函数之外，要显示 return 的内容，就可以使用 `then` 来处理了。
```
async function testAsync() {
    return "hello async";
}

testAsync().then(p => {
    console.log(result);  // 输出 hello async
})

```

    小结：await 可以接受 promise 和任何其它对象。当它接到普通对象时，不做处理。当它收到 promise
    对象的时候，它就阻塞后面的代码，等到 promise 对象 resolve，然后得到 resolve 的值，作为 await
    的运算结果。
    
    因为 await 只能放在 async 方法中，所以 await 不会造成真正的阻塞，async 内部所有的阻塞都被封装在一个
    Promise 对象中异步执行。
   
### 简单比较 Async 和 Promise 
```
function takeLongTime() {
    return new Promise(resolve => {
        setTimeout(() => resolve("long_time_value"), 2000);
    });
}

// Promise
takeLongTime().then(v => {
    console.log("got", v);
});


// Async
async function test() {
    const v = await takeLongTime();
    console.log(v);
}

test();

```
可以看出，Async 还比 Promise 多写了一些代码，差别并不明显。

### Async 的优势

#### 1、Async 的优势在处理多个 then 链，单个 then 对比看不出来。

```
function takeLongTime(n) {
    return new Promise(resolve => {
        setTimeout(() => resolve(n + 200), n);
    });
}

function step1(n) {
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}

function step2(n) {
    console.log(`step2 with ${n}`);
    return takeLongTime(n);
}

function step3(n) {
    console.log(`step3 with ${n}`);
    return takeLongTime(n);
}
```
##### Promise 的处理：
```
function doIt() {
    console.time("doIt");
    const time1 = 300;
    step1(time1)
        .then(time2 => step2(time2))
        .then(time3 => step3(time3))
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd("doIt");
        });
}

doIt();

// step1 with 300
// step2 with 500
// step3 with 700
// result is 900
// doIt: 1519.372ms
```

`doIt() 顺序执行了三个步骤，一共用了 300 + 500 + 700 = 1500 毫秒，和 console.time()/console.timeEnd() 计算的结果一致。`

##### Async 方式处理：

```
async function doIt() {
    console.time("doIt");
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time2);
    const result = await step3(time3);
    console.log(`result is ${result}`);
    console.timeEnd("doIt");
}

doIt();
```
async 的代码看上去清晰很多。

#### 2、Async 还有个更大的优势是在 then 链传参时

```
// 每一个步骤都需要之前每个步骤的结果，需要传参
function takeLongTime(n) {
    return new Promise(resolve => {
        setTimeout(() => resolve(n + 200), n);
    });
}

function step1(n) {
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}

function step2(m, n) {
    console.log(`step2 with ${m} and ${n}`);
    return takeLongTime(m + n);
}

function step3(k, m, n) {
    console.log(`step3 with ${k}, ${m} and ${n}`);
    return takeLongTime(k + m + n);
}
```

##### Async 写法：

```
async function doIt() {
    console.time("doIt");
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time1, time2);
    const result = await step3(time1, time2, time3);
    console.log(`result is ${result}`);
    console.timeEnd("doIt");
}

doIt();

// step1 with 300
// step2 with 800 = 300 + 500
// step3 with 1800 = 300 + 500 + 1000
// result is 2000
// doIt: 2916.154ms
```

##### 而用 Promise 的写法：

```
function doIt() {
    console.time("doIt");
    const time1 = 300;
    step1(time1)
        .then(time2 => {
            return step2(time1, time2)
                .then(time3 => [time1, time2, time3]);
        })
        .then(times => {
            const [time1, time2, time3] = times;
            return step3(time1, time2, time3);
        })
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd("doIt");
        });
}

doIt();
```

传参非常复杂和费解。

### 注意点
到此处理的 await 为了语义清晰，都是只考虑了 Promise 返回的是 resolve 的情况，而 Promise 还可能返回 rejected 啊。所以最好把 await 放到 try...catch 代码块中去。
```
async function myFunction() {
    try {
        await somethingThatReturnsAPromise();
    } catch (err) {
        console.log(err);
    }
}

// 另一种写法
async function myFunction() {
    await somethingThatReturnsAPromise().catch(function (err){
        console.log(err);
    });
}

// 匿名函数的写法
const makeRequest = async () => {
    try {
        // this parse may fail
        const data = JSON.parse(await getJSON());
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};
```

---
#### 参考：
- [Async/Await替代Promise的6个理由](https://blog.fundebug.com/2017/04/04/nodejs-async-await/)
- [边城《理解 JavaScript 的 async/await》](https://segmentfault.com/a/1190000007535316)
- [阮一峰《async 函数的含义和用法》](http://www.ruanyifeng.com/blog/2015/05/async.html)

