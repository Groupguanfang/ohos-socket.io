# socket.io-parser

## 简介
socket.io-parser,本软件是移植开源软件 [socket.io-parser](https://github.com/socketio/engine.io-client) 源码在OpenHarmony上进行功能适配，在OpenHarmony上支持原库的websocket通信方式的功能。
移植参考教程文档[第三方开源js库移植适配指南](https://blog.csdn.net/yyz_1987/article/details/136037394).

A socket.io encoder and decoder written in JavaScript complying with version `5`
of [socket.io-protocol](https://github.com/socketio/socket.io-protocol).
Used by [socket.io](https://github.com/automattic/socket.io) and
[socket.io-client](https://github.com/automattic/socket.io-client).

Compatibility table:

| Parser version | Socket.IO server version | Protocol revision |
|----------------| ------------------------ | ----------------- |
| 3.x            | 1.x / 2.x                | 4                 |
| 4.x            | 3.x                      | 5                 |
## 下载安装
```shell
ohpm  install @yyz116/socket.io-parser
```
OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)
## 使用说明
1. 引入依赖
 ```
import * as parser from "@yyz116/socket.io-parser"
 ```
2. 使用举例
```ts
import * as parser from "@yyz116/socket.io-parser"

var encoder = new parser.Encoder();
var packet = {
  type: parser.PacketType.CONNECT_ERROR,
  data: 'test-packet',
  id: 13
};
let encodedPackets =encoder.encode(packet as parser.Packet);
var decoder = new parser.Decoder();
decoder.on('decoded', function(decodedPacket) {
    // decodedPacket.type == parser.EVENT
    // decodedPacket.data == 'test-packet'
    // decodedPacket.id == 13
  console.log(decodedPacket.data);
  });

for (var i = 0; i < encodedPackets.length; i++) {
  decoder.add(encodedPackets[i]);
}

```
3. 注意事项 在ets中使用的是es6的模块使用规范，使用import而不是require。

以下是原库的介绍内容，注意在harmonyos中原库的部分用法有区别，比如require的模块化用法不能用在鸿蒙中。

# socket.io-parser

[![Build Status](https://github.com/socketio/socket.io-parser/workflows/CI/badge.svg)](https://github.com/socketio/socket.io-parser/actions)
[![NPM version](https://badge.fury.io/js/socket.io-parser.svg)](http://badge.fury.io/js/socket.io-parser)

A socket.io encoder and decoder written in JavaScript complying with version `5`
of [socket.io-protocol](https://github.com/socketio/socket.io-protocol).
Used by [socket.io](https://github.com/automattic/socket.io) and
[socket.io-client](https://github.com/automattic/socket.io-client).

Compatibility table:

| Parser version | Socket.IO server version | Protocol revision |
|----------------| ------------------------ | ----------------- |
| 3.x            | 1.x / 2.x                | 4                 |
| 4.x            | 3.x                      | 5                 |


## Parser API

socket.io-parser is the reference implementation of socket.io-protocol. Read
the full API here:
[socket.io-protocol](https://github.com/learnboost/socket.io-protocol).

## Example Usage

### Encoding and decoding a packet

```js
var parser = require('socket.io-parser');
var encoder = new parser.Encoder();
var packet = {
  type: parser.EVENT,
  data: 'test-packet',
  id: 13
};
encoder.encode(packet, function(encodedPackets) {
  var decoder = new parser.Decoder();
  decoder.on('decoded', function(decodedPacket) {
    // decodedPacket.type == parser.EVENT
    // decodedPacket.data == 'test-packet'
    // decodedPacket.id == 13
  });

  for (var i = 0; i < encodedPackets.length; i++) {
    decoder.add(encodedPackets[i]);
  }
});
```

### Encoding and decoding a packet with binary data

```js
var parser = require('socket.io-parser');
var encoder = new parser.Encoder();
var packet = {
  type: parser.BINARY_EVENT,
  data: {i: new Buffer(1234), j: new Blob([new ArrayBuffer(2)])},
  id: 15
};
encoder.encode(packet, function(encodedPackets) {
  var decoder = new parser.Decoder();
  decoder.on('decoded', function(decodedPacket) {
    // decodedPacket.type == parser.BINARY_EVENT
    // Buffer.isBuffer(decodedPacket.data.i) == true
    // Buffer.isBuffer(decodedPacket.data.j) == true
    // decodedPacket.id == 15
  });

  for (var i = 0; i < encodedPackets.length; i++) {
    decoder.add(encodedPackets[i]);
  }
});
```
See the test suite for more examples of how socket.io-parser is used.


## License

MIT
