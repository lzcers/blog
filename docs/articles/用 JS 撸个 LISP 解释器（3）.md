


接上回，我们已经实现了一个基于 S 表达式的计算器，但还留下了这些坑

* 变量绑定
* 函数声明与调用
* 闭包

这几个特性对于一个编程语言而言是非常重要的，so...开始填坑吧

## 变量绑定

```
<BODY> -> <DEFINE>* EXP <EXP>* 
<BINDSPEC> -> (<VAR> <EXP>)
<LET> -> (let (<BINDSPEC>) <BODY>) | (let <VAR> (<BINDSPEC>) <BODY>)  
```

语法形式就从 Scheme R5RS 上抄好了，解析过程就不再另外写，基于 Parser Combinator ，在之前的例子上扩展就行，但是环境的定义有些改变，因为我们要实现词法作用域，现在我们的环境是由对象组成的数组。从下标 0 开始对应当前环境，1 对应外层环境，依次嵌套下去，就像 Express / KOA 的洋葱模型一样，从里到外。并实现了一个 lookup 方法用于在环境中寻找给定符号的值，这个查找过程可以类比于 javaScript 的作用域链查找。

```javascript
// 定义环境
const baseProcedure = {
  '+': args => args.reduce((pre, cur) => cur + pre),
  '-': args => args.reduce((pre, cur) => cur - pre),
  '*': args => args.reduce((pre, cur) => cur * pre),
  '/': args => args.reduce((pre, cur) => pre / cur),
}
const env = [
  baseProcedure
]
```

**那么 let 绑定变量值意味着什么呢？**

实际上 let 创造了一个新的环境，并将在该环境下对 body 部分进行求值。

```javascript
function letEval(exp, env) {
  const value = exp.value
  const frame = value.bindspecs.reduce((pre, cur) => {
    pre[cur.value[0].value] = eval(cur.value[1], env)
    return pre
  },{})
  // 处理另一种形式的 <LET> -> (let <VAR> <BINDSPEC> <BODY>) 
  // if (value.var) frame[value] = value.body
  // 返回最后一个表达式的值
  return value.body.value.map(e => eval(e, extEnv(frame, env))).pop()
}
```

这就是我们对 let 表达式的解释，将 let 的 bind 取出来创建一个 frame 作为最内层环境插入 env，然后求值即可。

实际上 let 表达式是一种派生表达式，`(let ((<var1> <exp1>)...(<varn> <expn>)) <body>)` 等价于 `((lambda (<var1> ...<varn>) <body>) <exp1>...<expn>)`。（SICP 第四章 4.6 题就是实现该转换）

接下来我们就来实现 lambda。

## lambda

语法定义： 

```
<FORMALS> -> (<VAR>*)
<LAMBDA> -> (lambda <FORMALS> <BODY>) 
```

```javascript
function makeProcedure(formals, body, env) {
  return {type: 'lambdacall', formals: formals, body: body, env: env}
}
```

lambda 实现这么简单？

就这么简单，我们什么也不用做，只是把 formals, body, 以及**定义时的环境**保存即可，和 let 类似， lambda 只是根据实参创建环境，并在该环境下求解 body 的值而已。

```javascript
function apply(procedurecall, args, env) {
  // 基本过程 
  if (typeof procedurecall == 'function') 
    return procedurecall(args)
  else if (procedurecall.type == 'lambdacall') {
    const formals = procedurecall.formals.value.map(e => e.value)
    const argments = formals.reduce((pre, cur, i) => {
      pre[cur] = args[i]
      return pre
    },{})
    // 动态作用域
    // return procedurecall.body.value.map(e => eval(e, [argments, ...env])).pop()
    // 词法作用域
    const lexEnv = [argments, ...procedurecall.env] 
    return procedurecall.body.value.map(e => eval(e, lexEnv)).pop()
  }
}
```

接下来有趣的一点来了，关于*词法作用域（lexical scoping ）*和*动态作用域（dynamic scoping）*的区别。

**举个例子**

```lisp
(let ((x 2))
	(let ((f (lambda (y) (* x y))))
		(let ((x 4))
			(f 3))))
```

上面对 (f 3) 的调用，我们仅传入了参数 y 的值，那么 x 就是该函数的*自由变量*，那么这个自由变量的值从哪来呢？当然是从环境中取，但是问题来了，环境中有 let (x 4) 也有 let (x 2)，那么究竟取谁的值？

有两种方案，一种取函数定义时环境的值，即 let (x 2) ，此时返回结果 6，这种从函数定义时环境中去取值的方案称为**词法作用域**。

另一种方案就是从运行时的环境取，即 let (x 4)，此时结果是 12，这种取法称之为**动态作用域。**

事实上，这两种方案都有方言实现，词法作用域就有典型的 Scheme， 动态作用域实现由 Emacs Lisp。

这里我使用了词法作用域，而要实现词法作用域最重要的一点就是创建一个**闭包结构**保存定义时的环境，然后我们在该作用域下去求值。

JavaScript 常见的问题就是，闭包是什么？**闭包就是函数体定义时的词法作用域，函数无论在什么位置运行都能访问它被定义时的作用域。**更多关于 JS 实现的书可以看《[*你不知道的JavaScript*](https://book.douban.com/subject/26351021/)》。

最后跑个简单的例子测试下

```lisp
// 作用域测试
repl('(let ((y 2)) ((lambda (x) (+ x y)) 1))')
// 3
// 词法作用域测试
repl(`(let ((x 2))
(let ((f (lambda (y) (* x y))))
  (let ((x 4))
    (f 3))))`)
// 6
// define 测试
repl('((lambda (x) (define y 1) (+ y 1)) 3)')
// 8
```

至此，一个玩具级别的 lisp 解释器就实现了，当然，他还有很多缺陷，比如

1. 语法错误提示
2. 一些必要的语法 if 、for、macor 等
3. 一些基础的数据结构，序对、列表、向量等

关于语法错误提示，我希望解释器能够报告出错的位置，因而我们的 tokenizer 因该在扫描文本的时候应该保存行列信息，但是问题又来了，因为文法解析采用了 Parser Combinator 实现，在解析过程中肯定会存在很多规则匹配失败，那么到底哪条规则匹配失败后应该报告错误呢？换句话说，如果解析过程中所有分支都报错了该汇报哪个分支的错误？

关于这个玩具解释器的代码看这里 [klisp](https://github.com/lzcers/klisp)，如标签所示这是个坑，写这些仅为了实践关于解释器的一些相关知识，我也不知道啥时候会填上这个坑...也许永远坑了。

如果时间允许的话可以参照 scheme R5RS  来实现，这份规范中文翻译版总共就 48 页，简洁而不简单。



