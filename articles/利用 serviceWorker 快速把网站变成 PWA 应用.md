---
Title: 利用 serviceWorker 快速把网站变成 PWA 应用 
Tags: 前端 | 编程 
PublishDate: 2017/12/17 20:16:06 
---

## 什么是 PWA ？
PWA（Progressive Web Apps）是 Google 提出的用前沿的 Web 技术为网页提供 App 般使用体验的一系列方案。

## 它是如何做到的？
PWA 主要利用了 service Worker 和 caches API，通过两项技术就可以将 Web App 的所有请求劫持并缓存下来，你可以自由的编写策略去决定是否从后端加载数据，相比原生 App 更新后每次都要重新打包，这就更“一颗赛艇”了。再部署了 Service Worker 后，只需要再配置 manifest.json 文件即可，该文件描述了应用被安装后的图标已经应用名等信息。
```
<link rel="manifest" href="/static/manifest.json">
```
在支持 PWA 的浏览器上，打开页面时会提示是否将该页面安装至桌面，安装后，就能获得和原生 App 近乎一直的体验了，关于 PWA 的支持度可以看[**这里**](https://ispwaready.toxicjohann.com/?from=groupmessage)。

## 如何快速部署？
#### Service Worker
显然，自己写 Service Worker 和缓存策略逻辑有点麻烦，简单点，我们通过 Webpack 的 sw-precache-webpack-plugin 插件来自动添加 Service Worker，并配置缓存策略，具体配置参考[**这里**](https://github.com/goldhand/sw-precache-webpack-plugin)。
#### manifest.json
关于 manifest.json 的配置可以参考这里[**这里**]。(https://lavas.baidu.com/doc/engage-retain-users/add-to-home-screen/introduction)

**这一切的前提是，你的站点部署了 HTTPS。**
    