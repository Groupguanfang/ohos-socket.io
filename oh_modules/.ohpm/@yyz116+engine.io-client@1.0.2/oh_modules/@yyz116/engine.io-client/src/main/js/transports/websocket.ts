import { Transport } from "../transport.js";
import { yeast } from "../contrib/yeast.js";
import { pick } from "../util.js";
import {
  nextTick,
  usingBrowserWebSocket,
  WebSocket,
} from "./websocket-constructor.js";
import debugModule from "@yyz116/debug"; // debug()
import { encodePacket } from "@yyz116/engine.io-parser";

const debug = debugModule("engine.io-client:websocket"); // debug()

// detect ReactNative environment
const isReactNative = false

export class WS extends Transport {
  private ws = WebSocket;

  /**
   * WebSocket transport constructor.
   *
   * @param {Object} opts - connection options
   * @protected
   */
  constructor(opts) {
    super(opts);

    this.supportsBinary = !opts.forceBase64;
  }

  get name() {
    return "websocket";
  }

   doOpen() {
    if (!this.check()) {
      // let probe timeout
      return;
    }

    const uri = this.uri();
    const protocols = this.opts.protocols;

    // React Native only supports the 'headers' option, and will print a warning if anything else is passed
    const opts = isReactNative
      ? {}
      : pick(
          this.opts,
          "agent",
          "perMessageDeflate",
          "pfx",
          "key",
          "passphrase",
          "cert",
          "ca",
          "ciphers",
          "rejectUnauthorized",
          "localAddress",
          "protocolVersion",
          "origin",
          "maxPayload",
          "family",
          "checkServerIdentity"
        );

    if (this.opts.extraHeaders) {
      opts.headers = this.opts.extraHeaders;
    }

    //this.ws.binaryType = this.socket.binaryType;
    this.addEventListeners();
    try {
      this.ws.connect(uri, (err, value) => {
        if (!err) {
          debug("Connected successfully");
        } else {
          debug("Connection failed. Err:" + JSON.stringify(err));
        }
      });
    } catch (err) {
      return this._emitReserved("error", err);
    }
  }

  /**
   * Adds event listeners to the socket
   *
   * @private
   */
  private addEventListeners() {

    this.ws.on('open', (err, value) => {
      if(err){
        debug("error:" + JSON.stringify(err));
      }
      debug("on open, status:" + JSON.stringify(value));
      this.onOpen();
    });
    this.ws.on('message', (err, value) => {
      debug("on message, message:" + value);
      this.onData(value);
    });
    this.ws.on('close', (err, value) => {
      debug("on close, code is " + value.code + ", reason is " + value.reason);
      this.onClose({
        description: "websocket connection closed",
        context: value,
      });
    });
    this.ws.on('error', (err) => {
      debug("on error, error:" + JSON.stringify(err));
      this.onError("websocket error", err);
    });
  }

   write(packets) {
    this.writable = false;

    // encodePacket efficient as it uses WS framing
    // no need for encodePayload
    for (let i = 0; i < packets.length; i++) {
      const packet = packets[i];
      const lastPacket = i === packets.length - 1;

      encodePacket(packet, this.supportsBinary, (data) => {
        // always create a new object (GH-437)
        const opts: { compress?: boolean } = {};
        if (!usingBrowserWebSocket) {
          if (packet.options) {
            opts.compress = packet.options.compress;
          }

          if (this.opts.perMessageDeflate) {
            const len =
              // @ts-ignore
              "string" === typeof data ? Buffer.byteLength(data) : data.length;
            if (len < this.opts.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        }

        // Sometimes the websocket has already been closed but the browser didn't
        // have a chance of informing us about it yet, in that case send will
        // throw an error
        try {
          this.ws.send(data as ArrayBuffer, (err, value) => {
            if (!err) {
              debug("Message sent successfully");
            } else {
              debug("Failed to send the message. Err:" + JSON.stringify(err));
            }
          });
        } catch (e) {
          debug("websocket closed before onClose event");
        }

        if (lastPacket) {
          // fake drain
          // defer to next tick to allow Socket to clear writeBuffer
          nextTick(() => {
            this.writable = true;
            this._emitReserved("drain");
          }, this.setTimeoutFn);
        }
      });
    }
  }

   doClose() {
    if (typeof this.ws !== "undefined") {
      this.ws.close();
      this.ws = null;
    }
  }

  /**
   * Generates uri for connection.
   *
   * @private
   */
  private uri() {
    const schema = this.opts.secure ? "wss" : "ws";
    const query: { b64?: number } = this.query || {};

    // append timestamp to URI
    if (this.opts.timestampRequests) {
      query[this.opts.timestampParam] = yeast();
    }

    // communicate binary support capabilities
    if (!this.supportsBinary) {
      query.b64 = 1;
    }

    return this.createUri(schema, query);
  }

  /**
   * Feature detection for WebSocket.
   *
   * @return {Boolean} whether this transport is available.
   * @private
   */
  private check() {
    return !!WebSocket;
  }
}
