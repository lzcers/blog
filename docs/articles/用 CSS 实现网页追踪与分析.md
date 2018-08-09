用 CSS 实现网页追踪与分析 ？ are you kidding me？ 
老实说刚看到 **[这篇文章](https://github.com/jbtronics/CrookedStyleSheets/blob/master/docs/README.zh.md)** 的时候我也有点吃惊，因为以前在的工作经历告诉我，要干这种事情得埋一堆 JS 代码，是一件苦差事。而用 CSS 来做确实是打破常规思维的想法，就像你从不会去想用面包当武器（然而确实有一种法式长棍面包风干后可以这么干），用 CSS 这样一门负责页面表现的语言去做追踪分析的事情着实要开很大脑洞了。

考虑到页面分析追踪其实质是检测页面上某些状态及变化，然后报告给后端，这样一想，CSS 确实具备这样的能力，比如检测链接的点击的 `active` 选择器等等，这点能够想到，但是如何将状态变化报告给服务端呢？ emmm？ajax? CSS 显然不具备这种能力，但是它能加载资源，Bingo！
简单来说就是通过一些特殊的选择器或者 CSS 的一些媒体查询等与语法还有 Hack 来判断状态，利用资源请求的跨域性向后端发信息。
``` css
#link2:active::after {
  content: url('track.php?action=link2_clicked');
}
```
没错，就是这样的脑洞，这里可以看到更多的 **[DEMO](http://crookedss.bplaced.net/)**!