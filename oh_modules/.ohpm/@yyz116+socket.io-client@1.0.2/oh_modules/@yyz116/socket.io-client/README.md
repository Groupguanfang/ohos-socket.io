# socket.io-client

## 简介
socket.io-client,本软件是移植开源软件 [socket.io-client](https://github.com/socketio/socket.io-client) 源码在OpenHarmony上进行功能适配，在OpenHarmony上支持原库的websocket通信方式的功能。
移植参考教程文档[第三方开源js库移植适配指南](https://blog.csdn.net/yyz_1987/article/details/136037394).

The engine used in the Socket.IO JavaScript client, which manages the low-level transports such as HTTP long-polling, WebSocket and WebTransport.
This is the client for Engine.IO, the implementation of transport-based cross-browser/cross-device bi-directional communication layer for Socket.IO.
## 下载安装
```shell
ohpm  install @yyz116/socket.io-client 
```
OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)
## 使用说明
1. 引入依赖
 ```
import { Socket } from "@yyz116/socket.io-client"
 ```
2. 使用举例
```ts
import { Socket } from "@yyz116/socket.io-client"

```
3. 注意事项 在ets中使用的是es6的模块使用规范，使用import而不是require。

以下是原库的介绍内容，注意在harmonyos中原库的部分用法有区别，比如require的模块化用法不能用在鸿蒙中。

# socket.io-client

[![Build Status](https://github.com/socketio/socket.io-client/workflows/CI/badge.svg?branch=master)](https://github.com/socketio/socket.io-client/actions)
[![NPM version](https://badge.fury.io/js/socket.io-client.svg)](https://www.npmjs.com/package/socket.io-client)
![Downloads](http://img.shields.io/npm/dm/socket.io-client.svg?style=flat)
[![](http://slack.socket.io/badge.svg?)](http://slack.socket.io)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/socket.svg)](https://saucelabs.com/u/socket)

## Documentation

Please see the documentation [here](https://socket.io/docs/v4/client-initialization/).

The source code of the website can be found [here](https://github.com/socketio/socket.io-website). Contributions are welcome!

## Debug / logging

In order to see all the client debug output, run the following command on the browser console – including the desired scope – and reload your app page:

```
localStorage.debug = '*';
```

And then, filter by the scopes you're interested in. See also: https://socket.io/docs/v4/logging-and-debugging/

## License

[MIT](/LICENSE)