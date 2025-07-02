# Socket.io for OpenHarmony Lite Wearable

这个仓库使用rolldown将[@yyz116/socket.io-client](https://ohpm.openharmony.cn/#/cn/detail/@yyz116%2Fsocket.io-client)
二次打包成一个独立的`index.js`/`index.d.ts`文件，以供OpenHarmony Lite Wearable环境下，直接拷贝即可导入使用。

## 何处下载？

- index.js: [entry/src/main/js/MainAbility/socket/index.js](entry/src/main/js/MainAbility/socket/index.js)
- index.d.ts: [entry/src/main/js/MainAbility/socket/index.d.ts](entry/src/main/js/MainAbility/socket/index.d.ts)

将两个文件以同一名称放在同一目录下，即可在deveco studio中享有完整的类型提示。
