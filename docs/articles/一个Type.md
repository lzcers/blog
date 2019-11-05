---
Title: 一个 Type
Tags: 前端
PublishDate: 2019/10/3 0:22:14
---



有这样一个函数，我需要用 TypeScript 写出其类型，在写之前我自以为是我是懂 TypeScript 的，在这之后我深感自己一无所知，真是图样图森破。

简单来说，我有这样一个函数，熟悉的一看知道是 G6 的图形行为定义。

```TypeScript
const behavior:Behavior = {
    getEvents: () => {
        return {
            'edge:mouseenter': 'setAllItemStates',
            'node:click': 'onClick',
        }
    }
    // 期望能根据 gegtEvents 的返回值来约束 Behavior 内要有
    // setAllItemStates、onClick 函数，且其类型为 (e: Event) => void
}
```

经过一番艰难战斗我写出来的


```typescript
// 行为的 event 参数，类型暂时写作 string
type E = string
type getValuesType<T> = T[keyof T]
// 拿到函数的返回值，并取返回值的value的  T[P in keyof T]
type getReturn<T extends () => object> =  T extends () => infer R ? getValuesType<R> : never
type BehaviorFunc<F extends () => object> = Record<getReturn<F>, (e: E) => void>
    
type Prettify<T> = T extends infer U ? { [K in keyof U]: U[K] } : never

type Behavior<T extends () => any> =  Prettify<{ getEvents: () => any} & BehaviorFunc<T>>

const getEvents = () => {
    return {
        'edge:mouseenter': 'setAllItemStates',
    } as const; // 要推导出字面值类型
}

// 必须将 getEvents 函数的类型当做泛型参数传入
const test: Behavior<typeof getEvents> = {
     getEvents,
     setAllItemStates() {

     }
}
```

么得办法，还是需要用到泛型参数，为了推导出字面量还要用 `as const`，最后结论就是学点 TypeScript 有益于开发大脑，往常写 JS  一把梭从来不考虑类型，跑通纯靠缘分，用了 TS 之后写代码首先会把约束想清楚，这种思想上的改变确实是有益的。

而且类型系统不仅仅是类型标注那么简单，事实上 TS 的类型系统是图灵完备的，我们甚至可以用它来定义自然数然后写素数筛选的代码，在类型层面进行编程真的很硬核了。