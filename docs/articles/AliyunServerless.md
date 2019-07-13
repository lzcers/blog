---
Title: Aliyun Serverless 体验
tags: 编程
publishDate: 2019/7/13 16:33:40
---

VS Code 阿里云函数计算的插件 **Aliyun Serverless VSCode Extension**，它能让你在 VS Code 上做函数计算的开发，关于函数计算，或者说 **Serverless** 的概念就不多说了，对于前端来说它算的上是某种革命性的技术。全栈工程的门槛将进一步降低，我们写后端服务仅需要编写相关的函数即可，调用按时间或是次数收费，开发者不需要关系服务器的搭建，环境安装与配置等一堆依赖问题，只需要专注于函数编写即可。

## 安装踩坑之旅

在 VS Code 上装好插件后开始 Coding，如果需要本地调试则需要安装  

`npm install @alicloud/fun -g`

这个好搞定，关键是 docker 的安装，在 Window 上就必然是踩坑之旅了，首先，docker 依赖底层的 linux 内核提供的能力，在 Windows 上跑 docker 是需要 **Hyper-V** 虚拟机的，而我本机的 **Windows 10 家庭高级版** 并不能使用该功能。

1. 想办法把电脑升级到 Win10 专业版本后，启用 Hyper-V，把 Docker 装上。

你以为这就结束了？ Docker 是一个在墙外的东西，启动时安装各种依赖的速度贼慢，因此要配置镜像，好在阿里云提供了镜像服务。

2. 开通阿里云的容器镜像加速服务，并配置到 docker 里

以为就这么简单？No ！接下来最坑的来了，你开始启动本地运行后会提示你没有 Shared Drive，需要在 docker 里设置。以为只是点下勾勾的事，结果你打开 `Seeting Drives -> Shared Drives` 勾上共享的磁盘，点击 Apply 后发现，怎么勾勾又取消了？不信邪再勾选 Apply 依旧如此，坑来了，现实祭出百度，找到一个解决方案。

3. 在组策略管理中，设置网络访问: 本地帐户的共享和安全模型为经典模式。

经尝试无效，百度上翻来覆去都是转载的这个方案，真是辣鸡，祭出 bing 找找英文文档，发现 Github issue 内也有许多人反馈这个问题。找到了另一个解决方案。

4. 尝试给 Window 新增一个管理员权限账户，用该账户来 shared Drive。

经尝试依旧无效，最终解决办法。

5. 在 docker 设置中找到 `Rest`，选择 `Rest to factory defaults` 。

WTF ！ 这就行了？什么鬼，差不多一下午时间浪费在这上面，终于在本地把函数计算的例子跑起来看到了 Hello World。

