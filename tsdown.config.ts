import path from 'node:path'

export default {
  entry: './oh_modules/@yyz116/socket.io-client/src/main/js/index.ts',
  outDir: './entry/src/main/js/MainAbility/socket',
  alias: {
    '@yyz116/socket.io-parser': path.resolve('./oh_modules/.ohpm/@yyz116+socket.io-parser@1.0.2/oh_modules/@yyz116/socket.io-parser/index.ts'),
    '@yyz116/emitter': path.resolve('./oh_modules/.ohpm/@yyz116+emitter@1.0.2/oh_modules/@yyz116/emitter/index.js'),
    '@yyz116/debug': path.resolve('./oh_modules/.ohpm/@yyz116+debug@1.0.1/oh_modules/@yyz116/debug/index.js'),
    '@yyz116/engine.io-client': path.resolve('./oh_modules/.ohpm/@yyz116+engine.io-client@1.0.2/oh_modules/@yyz116/engine.io-client/index.ts'),
    '@yyz116/engine.io-parser': path.resolve('./oh_modules/.ohpm/@yyz116+engine.io-parser@1.0.1/oh_modules/@yyz116/engine.io-parser/index.ts')
  },
  dts: true,
  external: ['@ohos.net.webSocket'],
  format: 'es'
}