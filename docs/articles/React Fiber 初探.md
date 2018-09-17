---
Title: React Fiber 初探
Tags: 前端
PublishDate: 2018/8/18 23:47
---

## 为什么要有 React Fiber

尽管 React 有非常优秀的  Vitural DOM Diff 算法，但是对于一个复杂的页面而言，React 的调度策略 Stack Reconcile 会深度优先遍历所有的 Vitural DOM 并 Diff 计算完成后才会将主线程释放，这个期间用户与浏览器的任何交互都是得不到反馈的，表现出的样子就是浏览器僵死，只有任务结束后才得到响应，函数的调用栈就像下面这个样子。

![img](\articles\imgs\fiber2.jpg) 

怎么才能使用户察觉不出卡顿？控制渲染绘制时间小于 **16.6ms**。

为什么是 16.6ms？一般用户的显示器都是 60Hz 的刷新率，那意味着每帧的绘制时间只有 1000ms / 60 ~ 16.6ms，一但渲染时间超过这个时间，用户就能察觉到卡顿，当然，这里的 16.6ms 是对于动画而言的，通常页面并不会变化如此频繁，如果你用 JS 写动画就要考虑这点了。

因此，我们不能让 Vitural DOM 这样相对耗时复杂任务长期占据主线程堵塞渲染，在不考虑突破浏览器单线程模型的情况下，**我们只能将这个耗时的长任务分片处理**，这就是 React Fiber 做的，在此之后函数的调用栈就长这样了。

![img](\articles\imgs\fiber1.jpg) 

**那若是用多线程呢？** 应用 Web Worker，我们可以把一些耗时的任务放入 Web Worker 中去处理，而且也不会堵塞渲染，它不正是做这种事情嘛。

确实如此，Web Worker 适用于处理一些计算量大的任务，并且不会堵塞主线程，但是！将计算机结果传递给主线程是有通信开销的，当 DOM 少的时候使用 Web Worker 的收益可能是负数的，关于这点可以看[React Worker Dom](http://web-perf.github.io/react-worker-dom/)。

## React Fiber 怎么做的？

在这之前说一个比较熟悉的函数**requestAnimationFrame**，以往我们可能通过 setTimeout 来写动画，而使用 requestAnimationFrame 时浏览器会在每次重绘前执行它注册的回调函数，这个执行频率通常是每秒 60 次，也就是浏览器和屏幕的刷新率。那么问题来了，如何将耗时的任务分片，Fiber 是怎么做到？

从名字是上我们得知，Fiber 意思是纤程，WTF？进程、线程、协程已经够多了，怎么又冒出个纤程，这是啥？它和协程的区别与雷猴与你好一样。同样是在用户态实现的，内核对此一无所知，调度由程序自己控制。

先不研究 React Fiber 是如何将这些**任务分片与调度**的，这是一个非常复杂的活（Fiber 复杂的数据解构与算法），假设任务已经分片了，这些任务排在哪？

答案是[ **requestIdleCallback**](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)

> **window.requestIdleCallback()**会在浏览器空闲时期依次调用函数， 这就可以让开发者在主事件循环中执行后台或低优先级的任务，而且不会对像动画和用户交互这样延迟触发而且关键的事件产生影响。函数一般会按先进先调用的顺序执行，除非函数在浏览器调用它之前就到了它的超时时间。 

我们知道浏览器的绘制是按帧来的，通常一帧约16ms，只要维持在每秒 30 - 60 帧就不会影响用户体验，而每一帧的绘制期间会有一小段间隔时间，称之为**空闲期（idle Period）**，如上面所说，我们可以把一些低优先级的任务的任务放在这个期间处理，这种就不会影响用户交互与动画，相反高优先级的任务就丢给 `requestAnimationFrame`处理。（在 Chrome Dev Tools 的 Performance 中可以看到 Frame 相关的信息）

![frame](\articles\imgs\frame.png) 

```javascript
const handle = window.requestIdleCallback(callback[, options])
```

如果我们使用 `requestIdleCallback` 注册了回调函数，但是浏览器压根没有空闲期咋办，可以根据它的第二个参数来配置强制执行时间。`options`参数值被指定为正数时，当做浏览器调用 callback 的最后期限，它的单位是毫秒。 

也就是说`requestIdleCallback(callback, 5000)`，若 5000ms 内没有空闲期，callback 就会被强制执行，此时就和 setTimeout 一样了。`requestIdleCallback `利用的是帧尾的空闲时间，在这之前所有的 rAF、Layout、Paint 已经准备好了，所以在这里面不推荐放 DOM 操作以及时间不可预测的操作，在这里面做 DOM 操作会导致 Layout 计算失效拉长整个帧的耗时。

`callback`函数接收两个参数：

> - `timeRemaining：` 一个返回[`DOMHighResTimeStamp`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMHighResTimeStamp)的函数的引用。
> - `didTimeout：` 布尔型，如果 `callback` 在空闲时间被客户端执行，它的值为 false，其他情况它的值为 true (例如：`options 中给了超时时间，并且在超时过期时仍没有足够的空闲时间`)。

根据 `timeRemaining`我们可以拿到该帧剩余可用时间，因而在这期间我们可以反复的执行任务，直到检测到剩余时间为零时交出执行权，并把没做完的任务放到下一个空闲期去，避免长时间执行堵塞 UI 渲染从而掉帧，实际上React为了照顾绝大多数的浏览器，自己实现了requestIdleCallback。 

再回到上面那个**任务分片与调度**的问题，首先，怎么对任务分片？在 React Fiber 之前，视图的 Diff 与更新是一气呵成不间断做完的，既然要分片，那就需要拆开这个过程，把 Diff 阶段和更新阶段分开。

在 Diff 阶段主要是做递归遍历比较的计算，这部分理论上是可以拆分的，如果是树的 DFS 递归调用，那就不能拆咯，所以势必得改变数据结构设计新的调度算法，从递归改为循环。

**打住**

打住！打住！我还没做好深入研究的准备，毕竟日常工作还是 Vue，剩下更多细节深挖就要研读源码了，写这篇文章起初只是看到一篇讲 React 性能优化的文章，想做一点总结，没想到深挖起来水这么深的。