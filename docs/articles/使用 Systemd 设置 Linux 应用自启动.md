---
Title: 使用 Systemd 设置 Linux 应用自启动 
Tags: 编码 | Linux 
PublishDate: 2017/12/11 17:27:03 
---
博客有时候莫名其妙挂掉，看后台访问日志发现一堆类似 /myphpadmin 的路径请求，想来是批量扫描漏洞抓肉鸡的吧，我这小站纯当树洞和 Wiki 使用，价值又不大，随便攻击咯。只是每次重启服务器得把后端服务跑起来有点麻烦，于是稍微学习了下 Linux 下设置应用自启动的方法。

**有几种方法实现目的**
1. 配置 /etc/rc.d/rc.local 脚本 ，该脚本在引导过程的最后一步被执行
2. 添加脚本至 /etc/rc.d/init.d 子目录，适用于需要细致控制的启动需求
3. 设置 crontab 任务计划服务
4. 使用 systemd 注册服务

## 关于 Systemd
这是现代 Linux 发行版中的显著变化之一，或许也是最颇具争议的变化。 Systemd 是 Linux 内核启动的第一个程序，并且扮演多种角色，比如启动系统服务，处理登录，定时执行一些任务，其重要性不言而喻，并逐渐成为 Linux 的基础组件的一部分。

如何通过 Systemd 来注册一个服务呢？举个栗子
```
# /lib/systemd/system/supervisord.service
[Unit]
Description=Process Monitoring and Control Daemon
After=rc-local.service

[Service]
Type=forking
ExecStart=/usr/bin/supervisord -c /etc/supervisord/supervisord.conf
SysVStartPriority=99

[Install]
WantedBy=multi-user.target
```
这是一个开机自动启动 supervisord 的服务配置，嗯，就是博客 Go 后端的守护进程。
systemd 的核心概念是单元（Unit）它是一个存着关于服务（Service）、设备、挂载点、等信息的配置文件。

这里主要看 Service 的配置即可，ExecStart 设置了启动当前服务的命令，还有其他如 ExecStartPre 启动服务前执行的命令，ExecStartPost 启动服务后执行的命令，主要关注的是 ExecStart、ExecReload、ExecStop。
Type 属性设置了启动进程的方式， 默认 Type=simple 执行 ExecStart 指定的命令，启动主进程，这里配置的是
 Type=forking：以 fork 方式从父进程创建子进程，创建后父进程会立即退出。
写好这样一份配置文件后，输入下面命令：
> systemctl enable supervisord.service 
> systemctl is-enabled supervisord.service // 检查是否设置成功

看到成功提示即可。
    