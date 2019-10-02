---
Title: 如何打印 Web 页面上指定区域的内容 
Tags: 编码 | 前端 
PublishDate: 2017/12/11 13:24:52 
---

准备把简历挂到网上，万一被HR姐姐或者大佬看中呢？如果被看中的话如何方便他们打印你的简历呢？做过一堆电子流应用首先想到的就是弄个打印按钮，然后触发`window.print()`方法即可，但只是简单调用这个方法的话，打印的将会是整个页面的内容， 这显然不是想要的。

于是稍加改动一下：
```
document.body.innerHTML = Element.innerHTML
window.print()
```
这下可以了，打印的时候直接把想要打印区域的内容覆盖 Body 即可，但这样点击打印按钮后，整个页面的就会改变，而我只是单纯想打印而已，能不能更友好点？

增加一个不占空间的 iframe 元素，然后触发打印的时候把要打印的内容塞进去即可。
```
<iframe id="printme" src="" width="0" height="0" frameborder="0">
</iframe>

let f = document.getElementById('printme')
  f.contentDocument.write(Element.innerHTML)
  f.contentDocument.close()
  f.contentWindow.print()
}
```
当然，如果有样式的话，也要把样式一同塞进去。
    