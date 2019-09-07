---
Title: 当我说 Immutable 时在说什么？ 
Tags: 前端 | 编码
PublishDate: 2018/9/16 14:45
---

![fp](http://wx1.sinaimg.cn/large/007113CZgy1fvbdu2m0dnj30lc0aa3yq.jpg)

为什么在函数式中推崇 immutable？如我们所知，在 React 中，甚至整个前端都在推崇和拥抱函数式编程，而 immutable 似乎是实践函数式编程不可或缺的一部分，虽然我们已经有了 **const** 关键字，**Object.freeze()**，但遗憾的是 JavaScript 中的对象和数组等原生数据结构并非是 immutable 的。因此为了得到 immutable，工程师们就一言不合自己造起了轮子，如 **immutable.js、immer.js** 等。当然，最简单的实现 immutable 就是每次修改时深拷贝返回新的数据对象即可，但这么简单的搞法并不能在性能上令人满意。

**为什么需要 immutable？或者说为什么函数式编程需要 immutable？**

如果让我回答，那就是为了保证函数式编程的**纯洁（pure）**，这样的答案显然不会令人满意，强调 **Pure** 到底有什么意义？所谓的纯是这样的意思，**比如纯函数，它意味着相同的输入永远得到相同的输出，而且不会有任何可观察的副作用。**这个定义恐怕很多人都了解，但是到底有什么用呢？纯函数意味着这样一个事实，对于两个函数 A、B 而言，只要给定相同的输入都能获得同样的输出，那就意味着函数 A、B 是相等的，即两个函数的相等可以由外延相等确定，而不用关注函数的内涵，也就是说两个函数相等跟实现无关，这就带来了一些有意思的便利，如**函数记忆化**这样的编程技巧，因为无副作用且引用透明，因此能够**并行运行**（因为没有共享内存，不存在竟态，根本上保证线程的安全性），以及 get 接口所强调的**幂等性**，这些都是建立在**纯（Pure）**的基础上，它使得我们在分析和使用的时候可以抛开具体实现的束缚，一个函数是纯的，意味着我们可以用任何外延相等的函数来替换，纯函数的输入输出依赖清晰明确，因而更容易观察和分析，这是纯函数的意义。

再回过头来看待 immutable 数据对象，显而易见的，如果我们在纯函数中应用了可变数据对象，那么这种函数的纯洁是无法保证的，会不可避免地产生副作用，最常见地如数组的 **slice、splice** 两个方法，它们作用并没什么大的区别，但前者却是符合纯函数定义的，而 **splice** 会修改原对象。试想对于一个可变数据对象，因为副作用的存在，我们要想实现诸如时间回溯，撤销重做、高可测性是多么困难。

**immutable的优点是**并发下更安全，缺点也显而易见，大型对象每次深拷贝既浪费内存又慢，而 **mutable** 又是如此简单符合人的直觉，尽管并发下容易出现不可预料的问题，但是可以用锁等办法来解决啊，所以符合人类直觉的当然会更受人欢迎。

**那当我们谈论到 immutable.js 为 React 带去几倍性能提升是咋回事？不是又浪费内存又慢吗？** 

因为 React 拥抱了函数式编程，React 元素是不可变的，如果你要改变 **State** 对象的某个属性，你得把整个 **State** 都浅拷贝一次（通常用扩展运算符，会编译成 object.assign），在 React 中频繁操作 **State**，当对象特别大时就会慢啊。而通过简单的 **deep clone** 来实现 **immutable** 当然不行，immutable.js 中使用了**结构共享（Structural Sharing）**来避免频繁的深拷贝开销，即对象树中的节点改变时只修改受它影响的父节点，其它节点则共享。

再考虑在 React 中常见的优化措施，使用纯函数组件、PureComponent（自带浅比较）、在 shouldComponentUpdate 中做比较来**避免不必要的渲染**，因为重渲染时对一个嵌套很深的结构做 **deepCompare** 是非常耗性能的，而引入了 immutable.js 就能非常简单和低成本的判断数据是否发生变化。

**Immer.js**

**Immer.js** 的解决方案就更有意思了，作者就是搞 mobx 的那个，为了实现 immutable 我们不能对原状态做修改，因此为了基于原状态生成新的状态，我们肯定不可避免地要进行深拷贝了，如果我们能知道修改了哪些，那么其实就可以对未变化的数据使用浅拷贝，复用已存在的数据，减少内存开销，Immer.js 有意思地是通过 proxy 来实现了 immutable，简单来说就是在 currentState 上生成一个代理 draftState，然后再基于这个 draftState 生成 nextState，即 currentState -> DraftState -> nextState。与 immutable.js 完全自己造一套数据结构不同，immer.js 使用的是原生数据结构。

![Immer.js](https://github.com/mweststrate/immer/raw/master/images/hd/immer.png)

```javascript
// 使用栗子
const produce = require('immer')
const state = {
  flag: false,
}
const newState = produce(state, (draft) => {
  // 类似于 Vue 使用 Object.defineProperty 来代理对 Data 的访问，当然也可以用 Proxy 
  draft.flag = true
})
console.log(state.flag) // false
console.log(newState.flag) // true
```