
## Koa 洋葱模型

Koa 中间件使用洋葱模型的优势是可以非常方便的实现前置与后置处理逻辑，比如最简单的请求时间计算中间件，在 Koa 模型中就非常容易实现。

![](https://camo.githubusercontent.com/d80cf3b511ef4898bcde9a464de491fa15a50d06/68747470733a2f2f7261772e6769746875622e636f6d2f66656e676d6b322f6b6f612d67756964652f6d61737465722f6f6e696f6e2e706e67)

## compose 实现

在 Koa 中最重要的概念应该是中间件的洋葱模型，这个模型是通过 compose 函数来实现的，我们知道 Koa 中间件是一个函数（可以是异步函数）它接受 `context、next`两个参数，在 `context`里封装了`Request、Response`，并通过`next`来调用下一级中间件。

Koa 会根据中间的注册顺序依次调用，并将这个控制流通过 `next` 参数暴露给程序员，因而中间件的编写相当于手写 CPS 风格的代码，每当 next 被调用时就将控制传递给下一层中间件，当没有下一层中间件时再展开整个函数栈（如果中间件特别多，那应该会有问题，不过哪有那么多中间件啊），Koa 这种控制的传递很容易让人联想到 `generator`，实际上早期的 koa 就是这样实现的。

我们来实现一个简单的 compose 函数原型（实际上 Koa 源码的实现本来就很简单）：

```javascript
function compose(middlewares) {
    return function(context, next) {
        let index = -1
        function exec(i) {
            if (i == middlewares.length) return
            // 将 index 作为判断 next 重复调用的判断条件
            if (i <= index) throw 'next() 被多次调用!'
            index = i
            return middlewares[i](context, exec.bind(null, i + 1))
        }
        return exec(0)
    }
}
```

`compose` 接收一个中间件组成的数组，当有请求时依次按注册顺序调用这些中间件，并维持 `context` 的传递即可，但是这里按注册顺序依次调用的控制流是由程序员通过 `next` 控制的，`next` 就是**下一个中间件函数的抽象**，因而我们用一个闭包函数 `exec` 来实现，每次调用时传递下一个中间件函数的 index 即可。

```javascript
function f1(ctx, next) {
    console.log('1')
    next()
    console.log('xxx1')
}

function f2(ctx, next) {
    console.log('2')
    next()
    console.log('xxx2')
}

function f3(ctx, next) {
    console.log('3')
    next()
    console.log('xxx3')
}

compose([f1, f2, f3])({ name: 'ctx' })
// 1
// 2
// 3
// xxx3
// xxx2
// xxx1
```

但是这个实现有一个问题，如果考虑我们的中间件是一个异步函数(async function)，我需要支持 `await next()`这样的操作并且统一处理所有中间件的错误，为此我们要把所有的中间件执行结果用 `Promise` 包起来。（如果参数是 Promise 实例，那么`Promise.resolve`将不做任何修改、原封不动地返回这个实例 ）

```javascript
function exec(i) {
    if (i == middlewares.length) return Promise.resolve()
    // 将 index 作为判断 next 重复调用的判断条件
    if (i <= index) return Promise.reject(new Error('next 被多次调用!'))
    index = i
    try {   
        return Promise.resolve(middlewares[i](context, exec.bind(null, i + 1)))
    } catch( e) {
        return Promise.reject(e)
   	}
}
```

这样一来我们就实现了对异步函数的支持，照着这个思路我们已经做的和官方源码的实现差不多了。

参考：[koa-compose](https://github.com/koajs/compose/blob/master/index.js)