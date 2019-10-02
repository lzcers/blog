---
Title: JS 学习补遗
Tags: 前端
PublishDate: 2018/8/13 0:40:49
---

## Promise

### Promise.prototype.finally()

通常我们知道 JS 里 Promise 的实例方法有 `then、catch` ES2018 还引入 `finally`，这意味着 Promise 的状态无论如何，该方法都会调用，通常用于善后处理，比如文件打开完事后关闭，它和`catch`一样，都是 `then`的一个特例，最新还有一个 `Promise.try()` 提案，用于统一处理异步与同步异常。

### Promise.race()

我知道有 `Promise.all()`可以将多个 Promise 包装成一个新的实例，在所有 Promise 实例 `fulfilled` 后该实例才 `fulfilled` 。但还有一个 `Promise.race()` 同样可以包装多个 Promise 实例，但只要其中任意一个实例率先 `fulfilled`，该新实例状态就会 `fulfilled`，并接收率先`fulfilled`实例的返回值，这不是新的方法，也许以前看过，但因为没有应用场景被遗忘了，对于同一个数据有两个接口可用，使用最快响应的接口数据，这样的场景下可以考虑该方法。

```javascript
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('p1'), 1100)
})
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('p2'), 500)
})

Promise.race([p1, p2]).then(res => console.log(res)) // p2
```

## Generator

直接用上了 `async/await`，对`Generator`仅停留在了解的层面，但是最近写业务代码似乎想起来可以用这玩意啊，

通常我们的业务系统根据 Use Case 拆分成了一系列服务，这意味着开发一个场景的功能需要调用多个异步请求服务，尽管我们用 `Promise` 和 `async/await`解决了多个异步调用下的回调地狱问题，但我期望能有这样一个函数，它代表着某一个 Use Case 的抽象，每次调用喂一部分参数，全部喂完后就给我结果。

比如说我们业务有这样一个复杂地查询场景，查询一份报告需要这样几步，每步都涉及服务调用。

1 登陆校验 -> 2 实名认证校验 -> 3 根据查询类型申请一个表单 ID -> 4 根据查询类型提供一份表单信息附带表单ID 

-> 5 校验表单信息 ->  6 授权认证，填写授权表单 7 -> 查询结果

几乎每个步骤都对应有异步服务调用，而这仅仅是一个查询功能，能不能把这一坨东西包装起来，实现我上面所说的那种抽象？OOP 当然可以，还有一个就是`Generator函数`，`Generator`可以看成一个状态机，他返回一个可遍历的对象，内部执行途中可以用`yield`交出控制权，调用者可以用 `next`恢复执行，并传入参数。

```js
async function* getReport(userState) {
    const loginFlag = await isLogin(userState)
    // 一些判断，判断是否可以进行下一步操作
    // 没问题就把这步操作的结果 yield 出去，准备接收下一步操作需要的数据
    const authForm = yield loginFlag 
    const authResult = await auth(authForm)
    const queryForm = yield authResult
  	const result = await nextStepAction
    const nextStepData = yield result
    ....
    return finallyResult
}
const report = getReport(userSate)
report.next()
report.next(authForm)
report.next(queryForm)
....
```

于是，结合 `async` 这坨代码就可以这么写了，我们可以拿到 getReport 每次 next 后的状态来判断是否继续做下面的异步操作，并在接下来的流程中从界面获取用户输入继续调用。

整个查询过程不过是根据上一个服务的结果然后调用下一个服务以及一些中间状态判断而已，使用 `gen.throw()` 还可以往 `Generator`内部输入错误，让 `Generator`内部的`try/cath`捕捉，也可以用 `gen.return()`让`Generator`终止。

抛开 `async/await`考虑这个函数内部诸多的异步操作，显然，我们每次都可以 `yield`一个 `Promise`，这里我们手动控制了 generator 执行，如果我们实现一个**自动控制 gennerator 的执行器**那就可以实现 `async/await`的效果，这就是 co 库的原理，在早期 Koa 里还没有 `async/await` 就是这么做的。

```javascript
function* gen() {
    let a = yield promise1
    let b = yield promise2
    let c = yield promise3
    ...
}
// 考虑手动执行上面的代码
let g = gen()
// g.next().value.then(res => g.next(res).value.then(res => g.next(res) ....))
// 这种模式可以抽象为一个递归函数
function next(data) {
    let result = g.next(data)
    if (result.done) return result.value
    result.value.then(res => next(res))
}
next()
// 如果 yield 的不是 Promise 对象，那就需要用封装成 Tunk 函数
// 将其替换成一个只接受回调函数作为参数的单参数函数
```