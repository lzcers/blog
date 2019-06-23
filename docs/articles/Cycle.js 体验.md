---
Title: Cycle.js 体验 
Tags: 前端 
PublishDate: 2018/3/25 20:38:26 
---

之前学习了流的概念，那么理所当然的会想到其应用，特别是在前端领域大规模应用函数式编程范式的情况下，果不其然，我发现了Cycle.js 这个框架，相比于 React ，Cycle.js 可谓是更加彻底的函数式了。
```javascript
function main(sources) {
  const sinks = {
    DOM: sources.DOM.select('input').events('click')
      .map(ev => ev.target.checked)
      .startWith(false)
      .map(toggled =>
        <div>
          <input type="checkbox" /> Toggle me
          <p>{toggled ? 'ON' : 'off'}</p>
        </div>
      )
  };
  return sinks;
}
const drivers = {
  DOM: makeDOMDriver('#app')
};
run(main, drivers);
```



<img src="http://cyclejs.cn/img/hci-inputs-outputs.svg" alt="HCI 输入 输出" width="500px">  



整个框架的核心是一个不到两百行代码的 run 函数。让我们思考这样一种人机交互模型，计算机接受用户的操作作为输入，并输出一个新的视图，人的眼睛作为感知器将计算机输出的视图作为输入，输出一个操作。

```javascript
computer(Input) => Output
Human(senses) => Actuator
```
在这个模型里，人与计算机互为观察者，二者都可以抽象为一个函数，而 run 的作用就是将这两个函数连接起来，这也就是 cycle.js 的由来。

run 的第二个参数实际上是一个 driver，用来执行 JS 代码的副作用，即那些影响外部世界到操作，比如将 Virtual DOM 渲染到真实屏幕，捕捉各种事件等。这两个函数通过*流（Stream）来相互通信。*

总的来说 Cycle.js 是一个非常值得思考的框架，我知道有不少框架应用了响应式编程和流的概念，而彻底基于这些概念而创造的 Cycle.js 则是一个大胆的尝试。

​    