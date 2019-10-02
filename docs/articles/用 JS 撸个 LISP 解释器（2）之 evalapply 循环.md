---
Title: 用 JS 撸个 LISP 解释器（2）之 eval/apply 循环
Tags: 编程 | JS | 坑
PublishDate: 2018/6/8 19:53
---

接之前的坑，也许在真正开始写一个解释器之前，需要对解释器是什么做出解释才能继续。

**解释器是什么？**

解释器是一个在**特定上下文环境**中**求解表达式值**的过程。

这个上下文环境包含原子符号和复杂符号，对表达式的求解过程就是将其逐步分解为原子符号的递归过程，这个过程就是 eval 函数，某种意义上 CPU 就是一个指令集的解释器。

上篇中实现一个一个 tokenizer，并简单介绍了 Parser Combinator 的概念，接下来我将在此之上进一步用 Parser Combinator 实现 AST（抽象语法树） 的生成。

```javascript
// 一个高阶函数，用于创建标识符解析器， 比如说 Ｇ　-> s 解析 s 终结符
const ID = id => tokens => tokens[0] === id ? [{type: 'identifier', value: tokens[0]}, tokens.slice(1)] : null

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
const REP = (parser, max = -1) => tokens => {
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
```

和之前相比，我们的 parser 返回的不在是一个字符串，而是一个 AST 中的节点对象了，这里对象仅具备类型和值两个属性，如果有必要的话也可以机上行列号等内容为接下来语义分析过程提供更好的信息和报错提示。

用上面定义的这些原子来定义更复杂语法，以实现一个表达式计算器为例

```javascript
const NUM = tokens => /\d/g.test(tokens[0]) ? [{type: 'number', value: Number(tokens[0])}, tokens.slice(1)] : null
const BOOL = tokens => {
  const t = ID('#t')(tokens)
  const f = ID('#f')(tokens)
  return t ? [{type: 'bool', value: true}, t[1]] : f ? [{type: 'bool', value: false}, f[1]] : null
}
const STR = tokens => {
  const r = /^"(.*)"$/g.exec(tokens[0])
  if (r) return [{type: 'string', value: r[1]}, tokens.slice(1)]
  return null
}
// lisp 语法定义, 参考 R5RS
// <SELFEVAL> -> <BOOL> | <STR> | <NUM>
const SELFEVAL = tokens => {
  const r = OR(BOOL, STR, NUM)(tokens)
  if (r) r[0].type = 'selfeval'
  return r
}
// <VAR> -> <any <identifier> that is not also a <syntactic keyword>>
const VAR = tokens => { 
  const OPERATOR = OR(ID('+'), ID('-'), ID('*'), ID('/'))
  const r = OR(OPERATOR)(tokens)
  if (r) r[0].type = 'var'
  return r
}
// <LITERAL> -> <SELFEVAL>
const LITERAL = SELFEVAL
// <OPERATOR> -> EXP
const OPERATOR = tokens => EXP(tokens)
// <PRODCALL> -> (<OPERATOR> <EXP>*）
const PRODCALL = tokens => {
  const r = SEQ(ID('('), OPERATOR, REP(EXP), ID(')'))(tokens)
  // 去掉 () 
  return r ? [{type: 'procedurecall', value: r[0].slice(1, -1)}, r[1]] : null
}
// <EXP> -> <VAR> | <LITERAL> | PRODCALL
const EXP = tokens => OR(VAR, LITERAL, PRODCALL)(tokens)
```

接下来是最重要的 eval 函数了

```javascript
// 定义环境
const baseProcedure = {
  '+': args => args.reduce((pre, cur) => cur + pre),
  '-': args => args.reduce((pre, cur) => cur - pre),
  '*': args => args.reduce((pre, cur) => cur * pre),
  '/': args => args.reduce((pre, cur) => pre / cur),  
}
const env = {
  ...baseProcedure
}

function eval(exp, env) {
  switch(exp.type) {
    case 'selfeval':
      return exp.value
    case 'var':
      const v = env[exp.value]
      if (!v) throw 'what the fuck?'
      return v
    case 'procedurecall':
      return apply(eval(exp.value[0], env), exp.value.slice(1).map(e => eval(e, env)))
      break
    default:
      throw 'what the fuck?'
  }
}
```

eval 函数对表达式进行递归的分解，对于分解为 **Procedure Call** 的表达式调用 apply 函数求值，apply 先简单实现为一个过程调用。

```javascript
function apply(procedurecall, args) {
  return procedurecall(args)
}
function repl(str) {
  const tokens = tokenizer(str)
  const AST = EXP(tokens)
  if (AST) console.log(eval(AST[0], env))
}
```

尝试下数学运算：

```lisp
; 简单点的运算
repl('(+ 1 2 3)')
// 6
repl('(* 4 3 3)')
// 36
repl('(- 4 2 1)')
// 1
repl('(/ 4 2)')
// 2
repl('(/ 8 2 2 2)')
// 1
; 嵌套表达式计算
repl('(+ (+ 1 2) (+ 2 3))')
// 8
repl('(+ 1 2 3 (+ 1 (+ 2 3)))')
// 12
repl('(* 2 (+ 1 2 3 (+ 1 (+ 2 3))))')
// 24
repl('(/ 2 0)')
// Infinity
```

就这样，一个简单的S-表达式计算器就搞定了，但是离一个真正的编程语言还有一定距离。

我们还需要这些特性：

- 变量绑定
- 函数声明与调用
- 闭包

这个坑就留在后吧