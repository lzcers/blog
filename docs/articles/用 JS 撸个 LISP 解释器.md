---
Title: 用 JS 撸个 LISP 解释器
PublishDate: 2018/6/3 21:45
Tags: 编程 | JS | 坑
---

一直想写个 LISP 解释器，为此啃 SICP、龙书、打印了 R5RS的规范文档，但是啃完这两本书实在太难了，咬牙坚持到了 SICP 四章，终于看到封面上那个 eval/ apply 循环的实现，这就是我入坑的动力啊，真要等到把书读完再去做，那估计这个愿望（坑）永远实现不了了，那就直接路撸起袖子上吧，哪怕做个玩具级别的。

为什么这么执着 LISP 解释器呢？因为程序员三大浪漫啊！抛开浪漫不谈，看 eval / apply 循环这个图难道不觉得很 Cool 吗？ 有没有一种阴阳太极图的感觉，学起来真有一种学魔法的感觉。Cool~

 ![](https://camo.githubusercontent.com/0328cc5987e0ade0ba05d452171c90cbe4f61c43/687474703a2f2f67726f7570732e637361696c2e6d69742e6564752f6d61632f636c61737365732f362e3030312f6162656c736f6e2d737573736d616e2d6c656374757265732f77697a6172642e6a7067)



事实上上实现一个 LISP 解释器并不难，为啥，因为这东西真的烂大街了，网上案例遍地都是，而且其语法足够简单，parser 起来不要太容易，并不需要你学会 DFA、NFA、LL，LR 这些分析算法才能做，直接强撸就是了，当然，会就更好了。

不知道怎么动手？网上找不到好的案例？

看这个Github 项目 [mal - Make a Lisp ](https://github.com/kanaka/mal)

56 种语言 56 种 lisp 实现，还附赠编写指南 [The Make-A-Lisp Process](https://github.com/kanaka/mal/blob/master/process/guide.md)

看不懂英文？这还有个翻译版的 [ The Make-A-Lisp Process 中文翻译 ](https://github.com/Windfarer/mal-zh#general-hints)

当然，还有某个在扯淡的大佬文章 [怎么写一个解释器](http://www.yinwang.org/blog-cn/2012/08/01/interpreter)

还有什么理由去拒绝尝试写一个 LISP 呢？

那就开坑吧，在这之前知道一个编译器编译过程种的各个步骤就最好了，简单来说就是

字符流 -> 词法分析 -> 符号流 ->语法分析 -> 抽象语法树(AST) -> 语义分析 -> 中间代码生成 -> 代码生成优化

大概就这样，对于 LISP 解释器来说，知道怎么搞到 AST 就好，得益于 LISP 的语法简洁和同像性（代码和数据结构一致），这个不要太简单，LISP 源码差不多就是 AST 了。

## 语法定义

开始之前还是正经点，用 BNF 定义 LISP 的语法，LISP 的语法太简单了，我们先用 BNF 定义一个 LISP 前缀表达式语法的计算器，然后再一步一步扩展吧。

```
<Program> -> <Expression>+
<Expression> -> <Number> | (<Operator> <Expression> <Expression>)
<Operator> -> + | - | * | /
<Digit> -> 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0
<Number> -> <Digit>+
```


## 词法分析

```javascript
function tokenizer(str) {
  // [\s,]* 匹配任意个数的空格或逗号，但不捕获
  // ~@|[\[\]{}()'`~^@] 捕获 ~@ 符号或 []{}()'`~^@ 中任意一个符号
  // "(?:\\.|[^\\"])*" 捕获双引号中的内容，如果中间出现带反斜杠的双引号, 则包含在内
  // ;.* 捕获注释
  // [^\s\[\]{}('"`,;)]* 捕获所有特殊字符的字符串
  let tokens = []
  const regex = /[\s,]*(~@|[\[\]{}()'`~^@]|"(?:\\.|[^\\"])*"|;.*|[^\s\[\]{}('"`,;)]*)/g
  // 使用带有 /g 参数的正则表达式时，可对同一个字符串多次调用 exec 方法，
  // 每次调用都会更新 lastIndex (下一次匹配开始的位置)
  while ((match = regex.exec(str)[1]) != '') {
    // 注释忽略不处理
    if (match[0] === ';') continue
    tokens.push(match)
  }
  return tokens
}
```

词法分析直接上正则就是了，不用手写 NFA 啦， 上面那正则来自 mal 给出，实际上也不用这么复杂，我们可以用更简单的方法，直接用空格符分割 token 就是了，不过为了健壮性还是用上面那个正则吧。

```javascript
'(+ 1 2 3)'.replace(/(/g, ' ( ').replace(/)/g, ' ) ').trim().split(' ')
```



## Parser Combinator

关于 Parser， 我知道对于 lisp 来说很简单，手写递归下降分析就是，But，我想玩点不一样的，既然是用 JavaScript 来实现，那当然要发挥 JS 函数式编程的特性啦，用解析器组合子吧（Parser Combinator）

关于 Parser Combinator 参考装配脑袋（施凡）在infoQ 上的演讲[《Parser组合子——从玩具到专业工具》](http://www.infoq.com/cn/presentations/parser-from-toys-to-professional-tools/)，可惜这位大佬已经不在了。 R.I.P.

考虑之前定义语法用到的 BNF 原语，差不多就是*选择*、*拼接*、*重复*、*递归*，实际上仅仅是选择、拼接、重复就能定义所有的正则语言，再加上递归就能构造所有的 CFG（上下文无关文法）。

Parser Combinator 是啥，parser combinator 就是一个高阶函数。

开搞：

```javascript
// 首先定义 Parser, 它是一个接受 tokens 返回 Result 的函数
// Parser := Tokens => Result | null
// tokens 就定义为数组好了 
// Tokens := Array 
// Result 是一个数组，第一个元素是解析结果数组，第二元素是剩下的tokens, 如果为 null 则为解析失败
// 然后我们来定义第一个 parser
// 这个 parser 对任何一个 token 都解析成功，并吃掉它，相当于 G -> ε
const Successed = tokens => [[tokens[0]], tokens.slice(1)]

// 一个高阶函数，用于创建标识符解析器， 比如说 Ｇ　-> s 解析 s 终结符
const ID = id => tokens => tokens[0] === id ? [[tokens[0]], tokens.slice(1)] : null

// 只要有一个解析器解析成功就是解析成功, 相当文法中的 | 符号，比如 G -> A | B | C
const OR = (...parsers) => tokens => {
  for (const p of parsers) {
    const result = p(tokens)
    if (result) return result
  }
  return null
}

// 只有全部解析器都解析成功才成功， 相当于文法的连接
// 比如对于文法 G -> A B C 
// 只有 A B C 都解析成功, G 才解析成功
const SEQ = (...parsers) => tokens => {
  let result = []
  let rest = tokens
  for (const p of parsers) {
    const r = p(rest)
    if (r) {
      result = result.concat(r[0])
      rest = r[1]
    } else return null
  }
  return [result, rest]
}
// 对 tokens 使用一个 parser 解析任意次，直到解析失败，将结果返回，max 设置为 -1 相当于正则里的 *
const REP = (parser, max) => tokens => {
  let count = 0;
  let result = []
  let rest = tokens
  while(count >= max) {
    const r = parser(rest)
    if (r) { 
      result = result.concat(r[0])
      rest = r[1]
      count++
    } else break
  }
  return [result, rest]
}

// OK，有了这些文法我们就来解析 <Expression> -> <Number> | (<Operator> <Numbers> <Numbers>+) 试试
const Numbers = tokens => /\d/g.test(tokens[0]) ? [[tokens[0]], tokens.slice(1)] : null
const Opreator = OR(ID('+'), ID('-'), ID('*'), ID('/'))
const Expression = tokens => (OR(Numbers, SEQ(ID('('), Opreator, Numbers, Numbers, REP(Numbers, -1), ID(')'))))(tokens)

Expression(tokenizer('(+ 1 2 3 4 5)'))
// (8) ["(", "+", "1", "2", "3", "4", "5", ")"] 没毛病
```

// 先挖坑，后面接着写