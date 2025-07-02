# emitter

## 简介
Event emitter,本软件是移植开源软件 [emitter](https://github.com/socketio/emitter) 源码在OpenHarmony上进行功能适配，在OpenHarmony上已支持原库的功能。
移植参考教程文档[第三方开源js库移植适配指南](https://blog.csdn.net/yyz_1987/article/details/136037394).

It's simpler and more lightweight, and it works in any JavaScript environment, not just Node.js. It also provides mixin functionality to add event handling to existing objects without needing inheritance.
## 下载安装
```shell
ohpm  install @yyz116/emitter 
```
OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)
## 使用说明
1. 引入依赖
 ```
import {Emitter}  from "@yyz116/emitter"
 ```
2. 使用举例
```ts
import {Emitter}  from "@yyz116/emitter"

var emitter = new Emitter;
emitter.on('someEvent', function(arg1, arg2){
  console.log('listener1', arg1, arg2);
})
emitter.emit('someEvent', 'csdn.net/qq8864', 1991);

```
3. 注意事项 在ets中使用的是es6的模块使用规范，使用import而不是require。

以下是原库的介绍内容，注意在harmonyos中原库的部分用法有区别，比如require的模块化用法不能用在鸿蒙中。

# `@socket.io/component-emitter`

  Event emitter component.

## Installation

```
$ npm i @socket.io/component-emitter
```

## API

### Emitter(obj)

  The `Emitter` may also be used as a mixin. For example
  a "plain" object may become an emitter, or you may
  extend an existing prototype.

  As an `Emitter` instance:

```js
import { Emitter } from '@socket.io/component-emitter';

var emitter = new Emitter;
emitter.emit('something');
```

  As a mixin:

```js
import { Emitter } from '@socket.io/component-emitter';

var user = { name: 'tobi' };
Emitter(user);

user.emit('im a user');
```

  As a prototype mixin:

```js
import { Emitter } from '@socket.io/component-emitter';

Emitter(User.prototype);
```

### Emitter#on(event, fn)

  Register an `event` handler `fn`.

### Emitter#once(event, fn)

  Register a single-shot `event` handler `fn`,
  removed immediately after it is invoked the
  first time.

### Emitter#off(event, fn)

  * Pass `event` and `fn` to remove a listener.
  * Pass `event` to remove all listeners on that event.
  * Pass nothing to remove all listeners on all events.

### Emitter#emit(event, ...)

  Emit an `event` with variable option args.

### Emitter#listeners(event)

  Return an array of callbacks, or an empty array.

### Emitter#hasListeners(event)

  Check if this emitter has `event` handlers.

## License

MIT
