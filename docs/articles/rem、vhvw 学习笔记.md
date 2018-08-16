---
Title: rem、vh](\articles\imgs\vw 学习笔记
Tags: 前端 
PublishDate: 2018](\articles\imgs\7](\articles\imgs\27 18:03:30
---

一直以来工作多是以 PC 端业务居多，很少涉及移动端，最近在一家互联网公司的工作内容却恰好相反，移动端居多，PC 端业务较少，适配这块用的是 flexible ，不满足于黑箱的便利性，适当整理了下这块的知识做了些笔记。

### rem

rem 是指相对根元素的 font-size，这个根元素通常是指 `<html>` 元素。根元素可以通过 `:root`伪类选择器来表示。

### vh](\articles\imgs\vw

`vh](\articles\imgs\vw` 是相对**视窗**的大小（视窗包括滚动条宽度），与 `%` 不同，百分比是相对宽高，相对谁是不确定的，通常是父元素，对于 `font-size` 属性，`%` 相对的是 `em`，`1vw ＝ 1](\articles\imgs\100th viewport width`等于 `window.innerWidth`的`1%`。

### rem 适配原理

移动端响应适配主要是通过查询设备宽度自动调整根元素大小来实现的，查询设备宽度可以使用 CSS 的媒体查询，但是不同分辨率的转换较为复杂，所以通常使用 JS 来做。

```javascript
](\articles\imgs\](\articles\imgs\ 获取设备宽度
const deviceWidth = document.documentElement.clientWidth
](\articles\imgs\](\articles\imgs\ 修改根元素大小
document.documentElement.style.fontSize = deviceWidth ](\articles\imgs\ remWidth + 'px'
```

`remWidth` 除多少都可以，通常以 750px 设计稿为基准，并约定在 750px 宽度下 1rem 等于 75px（方便计算），所以会这样计算根元素的大小  `deviceWidth ](\articles\imgs\ 10+ "px"`，如设备宽度变化，那么 rem 也跟着同比例缩放即可，设计稿上的元素尺寸可以使用 `rem = px ](\articles\imgs\ 75` 。

通常我们可以借助 webpack 的插件来完成 px to rem 的转换，也可以用 VS Code 的插件以及 CSS 预处理器的函数。

### vh](\articles\imgs\vw 适配原理

如果不考虑兼容性问题（实际上到了 2018 年也不用太顾虑了），我们可以用更直观的 vh](\articles\imgs\vw 方案，它不需要经过转换和计算即可实现自适应。对于 vh](\articles\imgs\vw 而言，`1vw ＝ 1](\articles\imgs\100th viewport width` ，简单直观，而且可以轻松搞定各种布局。

如果我们的设计稿是 `750px` 那么 `100vw = 750px`，`1vw = 7.5px` 相应的 px to vw](\articles\imgs\vh 转换也就很简单了。