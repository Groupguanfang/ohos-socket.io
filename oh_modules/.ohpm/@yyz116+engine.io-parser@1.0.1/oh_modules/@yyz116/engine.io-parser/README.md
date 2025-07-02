# engine.io-parser

## 简介
engine.io-parser,本软件是移植开源软件 [engine.io-parser](https://github.com/socketio/engine.io-parser) 源码在OpenHarmony上进行功能适配，在OpenHarmony上已支持原库的大部分功能。
移植参考教程文档[第三方开源js库移植适配指南](https://blog.csdn.net/yyz_1987/article/details/136037394).

This is the JavaScript parser for the engine.io protocol encoding,
shared by both
[engine.io-client](https://github.com/socketio/engine.io-client) and
[engine.io](https://github.com/socketio/engine.io).

## 下载安装
```shell
ohpm  install @yyz116/engine.io-parser
```
OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)
## 使用说明
1. 引入依赖
 ```
import * as parser  from "@yyz116/engine.io-parser"
 ```
2. 使用举例
```ts
import * as parser  from "@yyz116/engine.io-parser"

const testBuffer = new Int8Array(10);
for (let i = 0; i < testBuffer.length; i++) testBuffer[i] = i;

const packets = [{ type: "message", data: testBuffer.buffer }, { type: "message", data: "hello" }];

parser.encodePayload(packets, encoded => {
  parser.decodePayload(encoded,
    "arraybuffer");
});

const packet: parser.Packet = { type: "message", data: "test" };
parser.encodePacket(packet, true, (encodedPacket) => {
  console.log(encodedPacket.toString())
})

let out = parser.decodePacket("")
console.log(out.type)
console.log(out.data.toString())

```
3. 注意事项 在ets中使用的是es6的模块使用规范，使用import而不是require。

以下是原库的介绍内容，注意在harmonyos中原库的部分用法有区别。

# engine.io-parser

[![Build Status](https://github.com/socketio/engine.io-parser/workflows/CI/badge.svg?branch=main)](https://github.com/socketio/engine.io-parser/actions)
[![NPM version](https://badge.fury.io/js/engine.io-parser.svg)](https://npmjs.com/package/engine.io-parser)

This is the JavaScript parser for the engine.io protocol encoding,
shared by both
[engine.io-client](https://github.com/socketio/engine.io-client) and
[engine.io](https://github.com/socketio/engine.io).

## How to use

### Standalone

The parser can encode/decode packets, payloads, and payloads as binary
with the following methods: `encodePacket`, `decodePacket`, `encodePayload`,
`decodePayload`.

Example:

```js
const parser = require("engine.io-parser");
const data = Buffer.from([ 1, 2, 3, 4 ]);

parser.encodePacket({ type: "message", data }, encoded => {
  const decodedData = parser.decodePacket(encoded); // decodedData === data
});
```

### With browserify

Engine.IO Parser is a commonjs module, which means you can include it by using
`require` on the browser and package using [browserify](http://browserify.org/):

1. install the parser package

    ```shell
    npm install engine.io-parser
    ```

1. write your app code

    ```js
    const parser = require("engine.io-parser");

    const testBuffer = new Int8Array(10);
    for (let i = 0; i < testBuffer.length; i++) testBuffer[i] = i;

    const packets = [{ type: "message", data: testBuffer.buffer }, { type: "message", data: "hello" }];

    parser.encodePayload(packets, encoded => {
      parser.decodePayload(encoded,
        (packet, index, total) => {
          const isLast = index + 1 == total;
          if (!isLast) {
            const buffer = new Int8Array(packet.data); // testBuffer
          } else {
            const message = packet.data; // "hello"
          }
        });
    });
    ```

1. build your app bundle

    ```bash
    $ browserify app.js > bundle.js
    ```

1. include on your page

    ```html
    <script src="/path/to/bundle.js"></script>
    ```

## Features

- Runs on browser and node.js seamlessly
- Runs inside HTML5 WebWorker
- Can encode and decode packets
  - Encodes from/to ArrayBuffer or Blob when in browser, and Buffer or ArrayBuffer in Node

## API

Note: `cb(type)` means the type is a callback function that contains a parameter of type `type` when called.

### Node

- `encodePacket`
    - Encodes a packet.
    - **Parameters**
      - `Object`: the packet to encode, has `type` and `data`.
        - `data`: can be a `String`, `Number`, `Buffer`, `ArrayBuffer`
      - `Boolean`: binary support
      - `Function`: callback, returns the encoded packet (`cb(String)`)
- `decodePacket`
    - Decodes a packet. Data also available as an ArrayBuffer if requested.
    - Returns data as `String` or (`Blob` on browser, `ArrayBuffer` on Node)
    - **Parameters**
      - `String` | `ArrayBuffer`: the packet to decode, has `type` and `data`
      - `String`: optional, the binary type

- `encodePayload`
    - Encodes multiple messages (payload).
    - If any contents are binary, they will be encoded as base64 strings. Base64
      encoded strings are marked with a b before the length specifier
    - **Parameters**
      - `Array`: an array of packets
      - `Function`: callback, returns the encoded payload (`cb(String)`)
- `decodePayload`
    - Decodes data when a payload is maybe expected. Possible binary contents are
      decoded from their base64 representation.
    - **Parameters**
      - `String`: the payload
      - `Function`: callback, returns (cb(`Object`: packet, `Number`:packet index, `Number`:packet total))

## Tests

Standalone tests can be run with `npm test` which will run the node.js tests.

Browser tests are run using [zuul](https://github.com/defunctzombie/zuul).
(You must have zuul setup with a saucelabs account.)

You can run the tests locally using the following command:

```
npm run test:browser
```

## Support

The support channels for `engine.io-parser` are the same as `socket.io`:
  - irc.freenode.net **#socket.io**
  - [Github Discussions](https://github.com/socketio/socket.io/discussions)
  - [Website](https://socket.io)

## Development

To contribute patches, run tests or benchmarks, make sure to clone the
repository:

```bash
git clone git://github.com/socketio/engine.io-parser.git
```

Then:

```bash
cd engine.io-parser
npm ci
```

See the `Tests` section above for how to run tests before submitting any patches.

## License

MIT
