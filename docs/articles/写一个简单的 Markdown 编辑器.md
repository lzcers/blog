---
Title: 写一个简单的 Markdown 编辑器 
Tags: 编码 
PublishDate: 2017](\articles\imgs\12](\articles\imgs\7 00:28:49 
---

### 准备工作
首先，我们要有一个敲文档的框框，就你了`<textarea>` 标签！
现在我们有了一个框框，然后我们需要 Duang 的一下把框框里的 MD 标记文本编译成 HTML 标签，如果能带上漂亮的样式就更好了，能支持 yaml 写点元数据就完美了，再多提点要求，能不能根据标题生成目录呢？

起手式准备好之后，首先解决第一个问题，把 MD 标记语法转 HTML 怎么整？ 前辈们告诉我们不要自己造轮子那是因为他们已经造过了，所以果断祭出 GitHub ，面向 GitHub 编程，于是我们找到了 **[marked.js](https:](\articles\imgs\](\articles\imgs\github.com](\articles\imgs\chjj](\articles\imgs\marked)** 。

Marked.JS ：
> A full-featured markdown parser and compiler, written in JavaScript. Built for speed.

这是一个 markdown 的解析编译器，你可以直接拿到编译后的 HTML 文本，最重要的是这个轮子提供了介入编译过程的接口，你也可以拿到解析后的 Tokens 自己搞些小动作。

### 变漂亮点
经过 marked.js 解析后，我们拿到了编译后的 HTML 文本，直接用当然可以，但是不够漂亮啊！所以聪明的你可以自己写些样式了，啥？ 想偷懒？当然，我们肯定有轮子的，依旧祭出神器，我就用了性冷淡的 **[github-markdown-css](https:](\articles\imgs\](\articles\imgs\github.com](\articles\imgs\sindresorhus](\articles\imgs\github-markdown-css)**，当然，还有更多选择。
### 搞点事情
#### 支持 YAML 写入元数据
同 Markdown 语法解析一样，YAML 同样也需要相应的解析器，这种轮子自己造是不明智的，硬要做那也没办法了，这里我们使用 **[js-yaml](https:](\articles\imgs\](\articles\imgs\github.com](\articles\imgs\nodeca](\articles\imgs\js-yaml)** 。
直接上码：
```typescript
](\articles\imgs\](\articles\imgs\ 添加元数据支持
function splitInput(str: string) {
	if (str.slice(0, 3) !== '---') return
	let matcher = ](\articles\imgs\\n(\.{3}|-{3})](\articles\imgs\g
	let metaEnd = matcher.exec(str)
	return metaEnd && [str.slice(0, metaEnd.index), str.slice(matcher.lastIndex)]
}
const mySplitInput = splitInput(src)
const markdown = mySplitInput ?  mySplitInput[1] : src
const meta = mySplitInput ? yaml.safeLoad(mySplitInput[0]) : null
```
简单利用正则把 --- 或 ... 开头结尾的内容抓出来，然后丢给 js-yaml，打完收工搞定，要怎么利用就自己看着办吧，除去这部分的内容，剩下的交给 marked.js 处理。
#### 代码高亮
markdown 虽然支持代码块，但是代码高亮能不能换点好看的样式呢？没问题，marked.js 能够介入编译过程，所以我们当然可以干预 code 块的编译，
```typescript
renderer.code = (code, lang) => {
  const highlightResult = highlight.highlightAuto(code).value;
  return `<pre><code class="lang-${lang}">${highlightResult}<](\articles\imgs\code><](\articles\imgs\pre>`
}
```
和上面一样处理，这里我们又用到了一个 **highlight.js** 库。

#### 根据标题生成TOC目录
```typescript
](\articles\imgs\](\articles\imgs\ 解析 Tokens 生成 TOC Tree
function parseTokensGenTOC(tokens: marked.TokensList) {
  const tocNodes: tocNode[] = tokens
  .filter(t => t.type == "heading")
  .map((e: any) => ({
    nodeID: e.text.replace(](\articles\imgs\<(?:.|\n)*?>](\articles\imgs\gm, '').toLowerCase().replace(](\articles\imgs\[\s\n\t]+](\articles\imgs\g, '-'),
    nodeLevel: e.depth, 
    childrenNode: []
  }))
  const rootNode: tocNode = {nodeID: "root", nodeLevel: 0, childrenNode: []}
  function createTOCTree(root: tocNode, node: tocNode) {
    let nextNode: tocNode | undefined
    for (let i of root.childrenNode) {
      if (node.nodeLevel > i.nodeLevel) nextNode = i
    }
    nextNode == undefined ? root.childrenNode.push(node) : createTOCTree(nextNode, node)
  }
  for (let n of tocNodes) {
    createTOCTree(rootNode, n)
  }
  return rootNode
}
const tokens = marked.lexer(markdown)
const tocTree = parseTokensGenTOC(tokens)
```

简单来说，通过 marked.js 拿到 tokens 然后根据 tokens 的信息生成一颗 TOC（Table Of Content） 树，目录的结构不正是树状的吗？拿到树结构后就可以自由方便的转换成 HTML 了。
这里转换的问题有点类似于根据二叉树的遍历序生成树，当然，生成的 Tokens 实际只隐含了一个遍历序，而仅一个遍历序是没法确定一棵树的，且这个目录也并非是一颗二叉树。因此我们要做一些预设，首先，marked.js 的解析应当是顺序解析的，所以 tokens 里的 heading token 肯定是顺序的，也就和字符串里出现的顺序一致，即我们拿到的第一个 heading token 就是文章中的第一个标题。
然后，我们生成的目录遵循这样的规则，一个 head token 就是一个节点，拿到下一个 head token 时， 如果他的 level 比当前节点大，则意味这是当前节点的子节点。
举例：当前节点是 `<h1> level 1 <](\articles\imgs\h1>`，则 下一个token 若为`<h2> level 2<](\articles\imgs\h2>`，则该节点是子节点，反之则为兄弟节点。
拿到 TOCTree 之后剩下就是解析成 HTML 了，以博客用的 VUE 框架为例，
```javascript 
<template>
<li class="toc-li">
  <a class="anchor" v-if="tocTree.nodeID != 'root'" @click="goAnchor(tocTree.nodeID)">{{ tocTree.nodeID }}<](\articles\imgs\a>
  <ol class="toc-ol" v-if="tocTree.childrenNode.length != 0">
    <md-toc v-for="n in tocTree.childrenNode" :tocTree="n" :key="n.nodeID"><](\articles\imgs\md-toc>
  <](\articles\imgs\ol>
<](\articles\imgs\li>
<](\articles\imgs\template>
export default Vue.extend({
  name: "md-toc",
  props: {
    tocTree: Object
  }
……
```
这里用到了 VUE 框架递归组件的特性。

**光生成目录还没完啊！**点击目录上的标题跳到指定位置不是理所当然的吗？怎么实现呢？ 有两种，一种是借住 hash query 和 id 属性，直接跳转，另一种就是 JS 手撸了，因为用了 Vue-Router 的 hash 模式，所以第一种就不方便使用，那就手写吧！
```typescript
goAnchor(selector: string) {
  const anchor: any = document.querySelector('#'+selector)
  ](\articles\imgs\](\articles\imgs\ 当前位置
  ](\articles\imgs\](\articles\imgs\ DTD是否存,会影响document.body.scrollTop 与 document.documentElement.scrollTop的取值
  let curPY = document.documentElement.scrollTop || document.body.scrollTop;
  ](\articles\imgs\](\articles\imgs\ 目标位置
  const targetPY = anchor.offsetTop
  ](\articles\imgs\](\articles\imgs\ 速率
  const rate = 4
  if (anchor != null) {
    const go = () => {
      curPY = curPY + (targetPY - curPY) ](\articles\imgs\ rate
      ](\articles\imgs\](\articles\imgs\ 临界判断
      if (targetPY - curPY < 1) {
          window.scrollTo(0,targetPY)
          return
      }
      window.scrollTo(0, curPY)
      requestAnimationFrame(go)
    }
    go()
  }
}
```
简单来说就是根据`document.querySelector('#'+selector)`找到 Element的offsetTop，然后 `window.scrollTo(0,targetPY)`划过去，当然，太突兀不行，所以还要做缓动处理，使用 `requestAnimationFrame` 使动画更顺畅。
OK，一个简单的 markdown 编辑器就撸出来了。

**等等，还没完！** 写 markdown 文档的时候肯定要左右对照吧？ 但是两边滚动条怎么一起滚动呢？ 
```javascript
](\articles\imgs\](\articles\imgs\ 让两边滚动条移动相同比例的距离
scroll(who: string ,e: any) {
  ](\articles\imgs\](\articles\imgs\ 防止两个滚动条相互调用
  if (who != this.tirgger || !this.editorModeFlag) {
    this.tirgger = who
    return
  }
  const [target, mdEditor, mdPreview] = [e.target, this.$refs.mdEditor, this.$refs.mdPreview]
  const otherScroll: any = target == mdEditor ? mdPreview : mdEditor
  ](\articles\imgs\](\articles\imgs\ 当前滚动条移动的比例
  let proporation = target.scrollTop ](\articles\imgs\ (target.scrollHeight - target.clientHeight)
  ](\articles\imgs\](\articles\imgs\ 另一条滚动条需要移动的距离
  otherScroll.scrollTop = (otherScroll.scrollHeight - otherScroll.clientHeight) * proporation
}
```
就这样，剩下还可以利用 localStorage 做一些功能，例如自动保存等……
    