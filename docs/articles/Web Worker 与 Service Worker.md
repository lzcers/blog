---
Title: Web Worker 与 Service Worker 
Tags: 前端 | 编程 
PublishDate: 2017](\articles\imgs\12](\articles\imgs\16 21:09:35 
---

### Web Worker
众所周知，浏览器的 JavaScript 是单线程的运行的，但随着 Web 应用的日趋复杂，越来越多的计算任务被分配给了前端，单线程运行的 JavaScript 早已不堪重负，因此就如何将 JavaScript 从单线程的地狱中解放出来就成问题了，因此诞生了 Web Worker， 它是脱离主线程之外的，因此一些复杂耗时的活可以交给它来干，但是有一点就是它不能操作 DOM，因此需要通过 postMessage 方法将执行结果告诉主线程，主线程通过 onMessage 方法获取返回结果。

### Service Worker
上面说到 Web Worker 解放了 JavaScript 的主线程，但有一个缺点就是 Web Worker 只是一个临时工而已，如果要长期存在且听候差遣呢？于是乎 Service Worker 应运而生，Service Worker 在 Web Worker 的基础上加上了持久离线缓存能力。

#### 那么 Service Worker 到底用来干啥的呢？
Service Worker 有以下功能和特性：
* 一个独立的 worker 线程，独立于当前网页进程，有自己独立的 worker context。
* 一旦被 install，就永远存在，除非被 uninstall
* 需要的时候可以直接唤醒，不需要的时候自动睡眠（有效利用资源，此处有坑）
* 可编程拦截代理请求和返回，缓存文件，缓存的文件可以被网页进程取到（包括网络离线状态）
* 离线内容开发者可控
* 能向客户端推送消息
* 不能直接操作 DOM
* 出于安全的考虑，必须在 HTTPS 环境下才能工作
* 异步实现，内部大都是通过 Promise 实现

简单来说，它可以代理你的前端所有请求，通过它再结合 caches API 你可以把所有的静态资源，甚至网络请求的数据缓存起来，然后由你自己编写的策略来决定是否去从后端取。我们知道原生 App 应用之所以能够获得很好的体验，一部分原因是因为它在断网的情况下依旧能使用部分功能，它的资源都是和 App 安装包打包到一起的，不需要频繁从后端去取。

有了 Service Worker 后，我们也具备了获得原生 App 体验的可能性，事实上，当网页部署了 Service Worker 后，只需要再编写 manifest.json 文件的内容即可，这个文件描应用被安装后的图标、应用名的信息，配置之后，当你用 Chrome 浏览器，或者其他支持 PWA 的浏览器（国内许多大厂已经跟进了）访问网页时，会弹框提示是否将页面安装到桌面，在 Android 系统上，该应用和原生应用近乎一致，因此我们甚至可以用工具把网页打包成 App 给别人安装。

**当然，还有更多的可能性，既然 Service Worker 能劫持网页的所有请求，那意味着，我们可以在前端做负载均衡和反向代理，比如自动根据请求的 URL 去从不同的 CDN 上取资源，这样的想法已经有人在做了。**
    