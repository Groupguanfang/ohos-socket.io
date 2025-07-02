import { decodePacket } from "@yyz116/engine.io-parser";
import type { Packet, RawData } from "@yyz116/engine.io-parser";
import { Emitter } from "@yyz116/emitter";
import { installTimerFunctions } from "./util.js";
import debugModule from "@yyz116/debug"; // debug()
import { SocketOptions } from "./socket.js";
import { encode } from "./contrib/parseqs.js";

const debug = debugModule("engine.io-client:transport"); // debug()

export class TransportError extends Error {
  public readonly type = "TransportError";

  constructor(
    reason: string,
    readonly description: any,
    readonly context: any
  ) {
    super(reason);
  }
}

export interface CloseDetails {
  description: string;
  context?: unknown; // context should be typed as CloseEvent | XMLHttpRequest, but these types are not available on non-browser platforms
}

interface TransportReservedEvents {
  open: () => void;
  error: (err: TransportError) => void;
  packet: (packet: Packet) => void;
  close: (details?: CloseDetails) => void;
  poll: () => void;
  pollComplete: () => void;
  drain: () => void;
}

type TransportState = "opening" | "open" | "closed" | "pausing" | "paused";

export abstract class Transport extends Emitter<
  Record<never, never>,
  Record<never, never>,
  TransportReservedEvents
> {
  public query: Record<string, string>;
  public writable: boolean = false;

  protected opts: SocketOptions;
  protected supportsBinary: boolean;
  protected readyState: TransportState;
  protected socket: any;
  protected setTimeoutFn: typeof setTimeout;

  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(opts) {
    super();
    installTimerFunctions(this, opts);

    this.opts = opts;
    this.query = opts.query;
    this.socket = opts.socket;
  }

  /**
   * Emits an error.
   *
   * @param {String} reason
   * @param description
   * @param context - the error context
   * @return {Transport} for chaining
   * @protected
   */
  protected onError(reason: string, description: any, context?: any) {
    super._emitReserved(
      "error",
      new TransportError(reason, description, context)
    );
    return this;
  }

  /**
   * Opens the transport.
   */
  public open() {
    this.readyState = "opening";
    this.doOpen();

    return this;
  }

  /**
   * Closes the transport.
   */
  public close() {
    if (this.readyState === "opening" || this.readyState === "open") {
      this.doClose();
      this.onClose();
    }

    return this;
  }

  /**
   * Sends multiple packets.
   *
   * @param {Array} packets
   */
  public send(packets) {
    if (this.readyState === "open") {
      this.write(packets);
    } else {
      // this might happen if the transport was silently closed in the beforeunload event handler
      debug("transport is not open, discarding packets");
    }
  }

  /**
   * Called upon open
   *
   * @protected
   */
  protected onOpen() {
    this.readyState = "open";
    this.writable = true;
    super._emitReserved("open");
  }

  /**
   * Called with data.
   *
   * @param {String} data
   * @protected
   */
  protected onData(data: RawData) {
    const packet = decodePacket(data, this.socket.binaryType);
    this.onPacket(packet);
  }

  /**
   * Called with a decoded packet.
   *
   * @protected
   */
  protected onPacket(packet: Packet) {
    super._emitReserved("packet", packet);
  }

  /**
   * Called upon close.
   *
   * @protected
   */
  protected onClose(details?: CloseDetails) {
    this.readyState = "closed";
    super._emitReserved("close", details);
  }

  /**
   * The name of the transport
   */
  public abstract get name(): string;

  /**
   * Pauses the transport, in order not to lose packets during an upgrade.
   *
   * @param onPause
   */
  public pause(onPause: () => void) {}

  protected createUri(schema: string, query: Record<string, unknown> = {}) {
    return (
      schema +
      "://" +
      this._hostname() +
      this._port() +
      this.opts.path +
      this._query(query)
    );
  }

  private _hostname() {
    const hostname = this.opts.hostname;
    return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
  }

  private _port() {
    if (
      this.opts.port &&
      ((this.opts.secure && Number(this.opts.port !== 443)) ||
        (!this.opts.secure && Number(this.opts.port) !== 80))
    ) {
      return ":" + this.opts.port;
    } else {
      return "";
    }
  }

  private _query(query: Record<string, unknown>) {
    const encodedQuery = encode(query);
    return encodedQuery.length ? "?" + encodedQuery : "";
  }

  protected abstract doOpen();
  protected abstract doClose();
  protected abstract write(packets: Packet[]);
}
