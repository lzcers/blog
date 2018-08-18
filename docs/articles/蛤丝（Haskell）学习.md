---
Title: 蛤丝（Haskell）学习
Tags: 编程
PublishDate: 2018/6/19 23:42
---

知乎上关注的很多前端大佬都是函数式编程玩的贼 6 的那种，动不动就贴 Haskell 代码，就想学习下蛤丝（Haskell）语言，增长点姿势，尽管之前玩 Lisp 有一点点函数式编程的体验，但是 Haskell 的类型和惰性求值还是要感受下的。

从 [Haskell 趣学指南](http://fleurer.github.io/lyah/) 开始，不得不说，语法糖真是好吃啊，代码还能这样写。

```haskell
quicksort :: (Ord a) => [a] -> [a]   
quicksort [] = []   
quicksort (x:xs) =   
  let smallerSorted = quicksort [a | a <- xs, a <= x]  
       biggerSorted = quicksort [a | a <- xs, a > x]   
  in smallerSorted ++ [x] ++ biggerSorted
```

上一段 Haskell 的快排算法，卧槽，还能这么写，` [a | a <- xs, a <= x] ` 像数学一样定义作用域，在 List 里直接做过滤和取值，Cool !， 写过 python 肯定知道列表推导，相比而言这个简直强太多了，还能在 List 里做模式匹配。

JS 不是也能函数式编程嘛，翻一下

```javascript
function quickSort(arr) {
    if (arr.length == 0) return []
    let i = arr[0]
    const smallerSorted = quickSort(arr.slice(1).filter(e => e <= i))
    const biggerSorted = quickSort(arr.slice(1).filter(e => e > i))
    return [].concat(smallerSorted, i, biggerSorted)
}
```

加上类型签名，代码行数好像差不多？？不过字符数量少呀。

**fold**

`Foldable t => (b -> a -> b) -> b -> t a -> b`

一个fold取一个二元函数，一个初始值（我喜欢管它叫累加值）和一个需要fold（折叠）的list。这个二元函数有两个参数，即累加值和list的首项（或尾项），返回值是新的累加值。 

看样子好像 JS 里的 reduce，fold 有两种折叠方式 foldl, foldr 对应 JS 里`Array.prototype.reduce()` ，`Array.prototype.reduceRight()`。

fold 可以将一个 List 规约到一个任意类型的值，它可以是一个 Number, 也可以是 Bool，因此同样可以规约到一个 List，因此 map 也可以用 fold 来实现。

```haskell
map' :: (a -> b) -> [a] -> [b]   
map' f xs = foldr (\x acc -> f x : acc) [] xs
```

换成 JS 可以这样写

```javascript
const map = (f, arr) => arr.reduce((pre, cur) => pre.concat(f(cur)), [])
```



fold 是一个很强的抽象，这样一个抽象有哪些性质呢？fold 有 foldl，foldr 两种，而无论从哪个方向进行规约都是不改变最终结果的，因为它满足结合律，计算顺序不影响结果，因而使得并行计算成为可能。

在函数式编程里面经常会有通过函数的组合来达到目的，比如说用于大规模数据并行运算的 *MapReduce* 模型就是一种函数组合的思想，MapReduce 实际上就是 map 函数与 fold 函数的组合，关于这个组合有一个有趣的定理，通常我们做 MapReduce  组合操作时候会生成一个中间数组，即 map 的结果，在此上做 Reduce 规约操作，而这个 map 中间过程是可以消去的。

**折叠映射融合定理**

> foldr f e . map g = foldr (λ x y → f (g x) y) e 
>
> 即一个 foldr map 组合操作可以融合为一个 foldr 操作，这过程不会生成中间结果

举 JS 例子来说

`[1, 2, 3, 4].map(i => i + 1).reduce((pre, cur) => pre + cur)`

等价于

`[1, 2, 3, 4].reduce((pre, cur) => pre + cur + 1, 0)`

同样的，两个 map 组合操作也可以融合成一个 

> map f . map g = map (f . g)

 这些一眼看上去好似编码技巧，其背后其实是有数学理论支撑的，这就是函数式编程的有趣的地方，我们可以对程序的计算过程做抽象，并讨论其性质。