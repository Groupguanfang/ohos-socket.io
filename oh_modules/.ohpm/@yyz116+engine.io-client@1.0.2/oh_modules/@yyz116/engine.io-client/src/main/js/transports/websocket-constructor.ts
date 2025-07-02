import webSocket from '@ohos.net.webSocket';

export const WebSocket =  webSocket.createWebSocket();
export const usingBrowserWebSocket = false;
export const defaultBinaryType = "arraybuffer";
export const nextTick = (() => {
  const isPromiseAvailable =
    typeof Promise === "function" && typeof Promise.resolve === "function";
  if (isPromiseAvailable) {
    return (cb) => Promise.resolve().then(cb);
  } else {
    return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
  }
})();
