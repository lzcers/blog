---
Title: 用JS 实现 Lisp 里的流 
Tags: 编程 
PublishDate: 2018](\articles\imgs\3](\articles\imgs\10 21:24:59 
---
在 Lisp 我们这样实现
``` lisp
(define-syntax-rule (delay exp) 
    (memo-proc (lambda () exp)))
(define-syntax-rule (cons-stream a b) 
  (cons a (delay b)))
(define (stream-car stream) (car stream))
(define (stream-cdr stream) (force (cdr stream)))
(define the-empty-stream '())
(define-syntax-rule (force delayed-object)
  (delayed-object))
(define (stream-null? stream)
  (if (equal? stream the-empty-stream)
      #t
      #f))
(define (stream-ref s n)
  (if (= n 0)
      (stream-car s)
      (stream-ref (stream-cdr s) (- n 1))))
```

在 JavaScript  这样子
``` javascript
const cons = (x, y) => [x, y]
const car = p => p[0]
const cdr = p => p[1]
const delay = (f, args) => _ => f.apply(this, args)
const force = f => f()
const consStream = (x, y, args) => cons(x, delay(y, args))
const streamCar = s => car(s)
const streamCdr = s => (force((cdr(s))))
const streamRef = (s, n) => n == 0 ? streamCar(s) : streamRef(streamCdr(s), --n)
](\articles\imgs\](\articles\imgs\ 定义自然数组成的流
const interStaringFrom = n => consStream(n, interStaringFrom, [++n])
const intNumber = interStaringFrom(1)
](\articles\imgs\](\articles\imgs\ 定义斐波拉契数列流
const fibgn = (a, b) => consStream(a, fibgn, [b, a + b])
const fibs = fibgn(0, 1)
](\articles\imgs\](\articles\imgs\ 取费波拉契数列 100项
streamRef(fibs, 100)
```

Scheme 使用的求值顺序是应用序，意味着函数的参数在调用时就会求值，所以 delay 是一个特殊形式，需要用宏来实现，否则就会陷入死循环。其中大部分代码都可以简单转写成 JS 的代码。但是在 JS 中没有宏这样的玩意咋办？ 简单点，我们可以曲线救国，对 consStream 的构造方法做一些修改，利用 `f.apply(this, args)` 来实现 delay，JavaScript中的迭代器和生成器也是一种类似思维的实现。

流能做啥？如果我们需要对真实世界的各种对象进行模拟该如何办，从计算机的角度考虑，理所当然就是考虑引入赋值，通过变量的修改来模拟对象状态随时间变化，引进赋值可以增强系统的模块化，把一个系统的某些状态封装到不同的对象中去，那是否有不采用赋值的方式，从而模拟对象状态变化的方法呢？流就是这样一种方法，它能提供相同的模块化能力，而且不必引入赋值，从函数的思路来看，我们可以将状态看作是时间的函数，s(t)，如果将注意力集中在状态身上，那么它就一个不断变化的值，但是从状态的变化的整个历史上来看，可将其视为一个整体，所以从整体上来看是不变的。

现在前端流行的 React 框架采用了函数式的思路，即 Render(State) => View，将视图看作是状态的计算结果，既然采用函数式范式，那么就要尽可能的使用不可变量，于是理所当然的使用了单向数据流的模式。采用这样的思路，所有的问题就落到了如何管理状态上，于是催生出了 Redux，Mobx 等状态管理库。回来流上来，如果单纯的考虑状态的改变是因为各种事件导致的，那么事件是否可以用一个事件流来抽象呢？答案是可以，于是就有了 redux-observable 基于 RxJS 5 的 Redux 中间件。

这些漂亮的抽象极大的简化了事件驱动编程的难度，同时也完美避开了赋值带来的副作用。总结而言，采用流这一抽象，我们可以避免赋值带来的副作用，同时获得不弱的模块化和抽象能力，将现实世界中各种对象的时序行为与与计算机里计算的时序行为解耦。

既然函数式编程和流这么好，那么为何一开始火的不是函数式编程呢？除了编程思想的不直观（函数式编程的思想是简单的，只是不直观），还有早期性能上的问题，事实上，函数式编程也并非万能药，他可能在处理某些特定的问题上非常有效（分布式、并行、高可测试性等），但是在另外一些场景下也并不十分适合。因而没有一个模型能解决所有问题，不要试图让世界去适应你的模型，而是要在恰当的时候用合适的模型去模拟世界，亦即不要手里握着锤子看什么都是钉子。比如在面对多进程同步的时候，对于采用流的函数式范式而言，就需要将多个进程的流进行合并，如果这些流是事件的抽象，那么依旧会出现事件交错导致的不确定性，而这种不确定性正是并发问题的本质。

那究竟该如何恰当的选择编程模型呢？
> 对象模型对世界的近似在于将其分割为独立的片段，函数式模型则不是沿着对象间的边界去做模块化，当“对象”之间不共享的状态远大于他们所共享的状态时，对象模型就特别好用。这种对象观点失效的地方就是量子力学，在那里，将物体看作地理的例子就会导致悖论和混乱，将对象观点与函数式观点合并可能与程序设计的关系不大，而是与基本的认识论有关的论题。 --- 《SICP》