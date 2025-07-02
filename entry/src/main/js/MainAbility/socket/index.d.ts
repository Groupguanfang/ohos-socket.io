//#region oh_modules/.ohpm/@yyz116+emitter@1.0.2/oh_modules/@yyz116/emitter/src/main/js/index.d.ts
/**
 * An events map is an interface that maps event names to their value, which
 * represents the type of the `on` listener.
 */
interface EventsMap {
  [event: string]: any;
}

/**
 * The default events map, used if no EventsMap is given. Using this EventsMap
 * is equivalent to accepting all event names, and any data.
 */
interface DefaultEventsMap {
  [event: string]: (...args: any[]) => void;
}

/**
 * Returns a union type containing all the keys of an event map.
 */
type EventNames<Map extends EventsMap> = keyof Map & (string | symbol);

/** The tuple type representing the parameters of an event listener */
type EventParams<Map extends EventsMap, Ev extends EventNames<Map>> = Parameters<Map[Ev]>;

/**
 * The event names that are either in ReservedEvents or in UserEvents
 */
type ReservedOrUserEventNames<ReservedEventsMap extends EventsMap, UserEvents extends EventsMap> = EventNames<ReservedEventsMap> | EventNames<UserEvents>;

/**
 * Type of a listener of a user event or a reserved event. If `Ev` is in
 * `ReservedEvents`, the reserved event listener is returned.
 */
type ReservedOrUserListener<ReservedEvents extends EventsMap, UserEvents extends EventsMap, Ev extends ReservedOrUserEventNames<ReservedEvents, UserEvents>> = FallbackToUntypedListener<Ev extends EventNames<ReservedEvents> ? ReservedEvents[Ev] : Ev extends EventNames<UserEvents> ? UserEvents[Ev] : never>;

/**
 * Returns an untyped listener type if `T` is `never`; otherwise, returns `T`.
 *
 * This is a hack to mitigate https://github.com/socketio/socket.io/issues/3833.
 * Needed because of https://github.com/microsoft/TypeScript/issues/41778
 */
type FallbackToUntypedListener<T> = [T] extends [never] ? (...args: any[]) => void | Promise<void> : T;

/**
 * Strictly typed version of an `EventEmitter`. A `TypedEventEmitter` takes type
 * parameters for mappings of event names to event data types, and strictly
 * types method calls to the `EventEmitter` according to these event maps.
 *
 * @typeParam ListenEvents - `EventsMap` of user-defined events that can be
 * listened to with `on` or `once`
 * @typeParam EmitEvents - `EventsMap` of user-defined events that can be
 * emitted with `emit`
 * @typeParam ReservedEvents - `EventsMap` of reserved events, that can be
 * emitted by socket.io with `emitReserved`, and can be listened to with
 * `listen`.
 */
declare class Emitter<ListenEvents extends EventsMap, EmitEvents extends EventsMap, ReservedEvents extends EventsMap = {}> {
  /**
   * Adds the `listener` function as an event listener for `ev`.
   *
   * @param ev Name of the event
   * @param listener Callback function
   */
  on<Ev extends ReservedOrUserEventNames<ReservedEvents, ListenEvents>>(ev: Ev, listener: ReservedOrUserListener<ReservedEvents, ListenEvents, Ev>): this;

  /**
   * Adds a one-time `listener` function as an event listener for `ev`.
   *
   * @param ev Name of the event
   * @param listener Callback function
   */
  once<Ev extends ReservedOrUserEventNames<ReservedEvents, ListenEvents>>(ev: Ev, listener: ReservedOrUserListener<ReservedEvents, ListenEvents, Ev>): this;

  /**
   * Removes the `listener` function as an event listener for `ev`.
   *
   * @param ev Name of the event
   * @param listener Callback function
   */
  off<Ev extends ReservedOrUserEventNames<ReservedEvents, ListenEvents>>(ev?: Ev, listener?: ReservedOrUserListener<ReservedEvents, ListenEvents, Ev>): this;

  /**
   * Emits an event.
   *
   * @param ev Name of the event
   * @param args Values to send to listeners of this event
   */
  emit<Ev extends EventNames<EmitEvents>>(ev: Ev, ...args: EventParams<EmitEvents, Ev>): this;

  /**
   * Emits a reserved event.
   *
   * This method is `protected`, so that only a class extending
   * `StrictEventEmitter` can emit its own reserved events.
   *
   * @param ev Reserved event name
   * @param args Arguments to emit along with the event
   */
  protected _emitReserved<Ev extends EventNames<ReservedEvents>>(ev: Ev, ...args: EventParams<ReservedEvents, Ev>): this;

  /**
   * Returns the listeners listening to an event.
   *
   * @param event Event name
   * @returns Array of listeners subscribed to `event`
   */
  listeners<Ev extends ReservedOrUserEventNames<ReservedEvents, ListenEvents>>(event: Ev): ReservedOrUserListener<ReservedEvents, ListenEvents, Ev>[];

  /**
   * Returns true if there is a listener for this event.
   *
   * @param event Event name
   * @returns boolean
   */
  hasListeners<Ev extends ReservedOrUserEventNames<ReservedEvents, ListenEvents>>(event: Ev): boolean;

  /**
   * Removes the `listener` function as an event listener for `ev`.
   *
   * @param ev Name of the event
   * @param listener Callback function
   */
  removeListener<Ev extends ReservedOrUserEventNames<ReservedEvents, ListenEvents>>(ev?: Ev, listener?: ReservedOrUserListener<ReservedEvents, ListenEvents, Ev>): this;

  /**
   * Removes all `listener` function as an event listener for `ev`.
   *
   * @param ev Name of the event
   */
  removeAllListeners<Ev extends ReservedOrUserEventNames<ReservedEvents, ListenEvents>>(ev?: Ev): this;
}
//#endregion
//#region oh_modules/.ohpm/@yyz116+engine.io-parser@1.0.1/oh_modules/@yyz116/engine.io-parser/src/main/js/commons.d.ts
type RawData = ArrayBufferLike | ArrayBuffer | ArrayBufferView | string;
interface Packet$1 {
  type: string;
  options?: {
    compress: boolean;
  };
  data?: RawData;
}
type BinaryType = "nodebuffer" | "arraybuffer" | "blob";
//#endregion
//#region oh_modules/.ohpm/@yyz116+engine.io-client@1.0.2/oh_modules/@yyz116/engine.io-client/src/main/js/transport.d.ts
declare class TransportError extends Error {
  readonly description: any;
  readonly context: any;
  readonly type = "TransportError";
  constructor(reason: string, description: any, context: any);
}
interface CloseDetails {
  description: string;
  context?: unknown;
}
interface TransportReservedEvents {
  open: () => void;
  error: (err: TransportError) => void;
  packet: (packet: Packet$1) => void;
  close: (details?: CloseDetails) => void;
  poll: () => void;
  pollComplete: () => void;
  drain: () => void;
}
type TransportState = "opening" | "open" | "closed" | "pausing" | "paused";
declare abstract class Transport extends Emitter<Record<never, never>, Record<never, never>, TransportReservedEvents> {
  query: Record<string, string>;
  writable: boolean;
  protected opts: SocketOptions$1;
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
  constructor(opts: any);
  /**
   * Emits an error.
   *
   * @param {String} reason
   * @param description
   * @param context - the error context
   * @return {Transport} for chaining
   * @protected
   */
  protected onError(reason: string, description: any, context?: any): this;
  /**
   * Opens the transport.
   */
  open(): this;
  /**
   * Closes the transport.
   */
  close(): this;
  /**
   * Sends multiple packets.
   *
   * @param {Array} packets
   */
  send(packets: any): void;
  /**
   * Called upon open
   *
   * @protected
   */
  protected onOpen(): void;
  /**
   * Called with data.
   *
   * @param {String} data
   * @protected
   */
  protected onData(data: RawData): void;
  /**
   * Called with a decoded packet.
   *
   * @protected
   */
  protected onPacket(packet: Packet$1): void;
  /**
   * Called upon close.
   *
   * @protected
   */
  protected onClose(details?: CloseDetails): void;
  /**
   * The name of the transport
   */
  abstract get name(): string;
  /**
   * Pauses the transport, in order not to lose packets during an upgrade.
   *
   * @param onPause
   */
  pause(onPause: () => void): void;
  protected createUri(schema: string, query?: Record<string, unknown>): string;
  private _hostname;
  private _port;
  private _query;
  protected abstract doOpen(): any;
  protected abstract doClose(): any;
  protected abstract write(packets: Packet$1[]): any;
}
//#endregion
//#region oh_modules/.ohpm/@yyz116+engine.io-client@1.0.2/oh_modules/@yyz116/engine.io-client/src/main/js/socket.d.ts
interface SocketOptions$1 {
  /**
   * The host that we're connecting to. Set from the URI passed when connecting
   */
  host: string;
  /**
   * The hostname for our connection. Set from the URI passed when connecting
   */
  hostname: string;
  /**
   * If this is a secure connection. Set from the URI passed when connecting
   */
  secure: boolean;
  /**
   * The port for our connection. Set from the URI passed when connecting
   */
  port: string | number;
  /**
   * Any query parameters in our uri. Set from the URI passed when connecting
   */
  query: {
    [key: string]: any;
  };
  /**
   * `http.Agent` to use, defaults to `false` (NodeJS only)
   *
   * Note: the type should be "undefined | http.Agent | https.Agent | false", but this would break browser-only clients.
   *
   * @see https://nodejs.org/api/http.html#httprequestoptions-callback
   */
  agent: string | boolean;
  /**
   * Whether the client should try to upgrade the transport from
   * long-polling to something better.
   * @default true
   */
  upgrade: boolean;
  /**
   * Forces base 64 encoding for polling transport even when XHR2
   * responseType is available and WebSocket even if the used standard
   * supports binary.
   */
  forceBase64: boolean;
  /**
   * The param name to use as our timestamp key
   * @default 't'
   */
  timestampParam: string;
  /**
   * Whether to add the timestamp with each transport request. Note: this
   * is ignored if the browser is IE or Android, in which case requests
   * are always stamped
   * @default false
   */
  timestampRequests: boolean;
  /**
   * A list of transports to try (in order). Engine.io always attempts to
   * connect directly with the first one, provided the feature detection test
   * for it passes.
   *
   * @default ['polling','websocket', 'webtransport']
   */
  transports: string[];
  /**
   * If true and if the previous websocket connection to the server succeeded,
   * the connection attempt will bypass the normal upgrade process and will
   * initially try websocket. A connection attempt following a transport error
   * will use the normal upgrade process. It is recommended you turn this on
   * only when using SSL/TLS connections, or if you know that your network does
   * not block websockets.
   * @default false
   */
  rememberUpgrade: boolean;
  /**
   * Are we only interested in transports that support binary?
   */
  onlyBinaryUpgrades: boolean;
  /**
   * Timeout for xhr-polling requests in milliseconds (0) (only for polling transport)
   */
  requestTimeout: number;
  /**
   * Transport options for Node.js client (headers etc)
   */
  transportOptions: Object;
  /**
   * (SSL) Certificate, Private key and CA certificates to use for SSL.
   * Can be used in Node.js client environment to manually specify
   * certificate information.
   */
  pfx: string;
  /**
   * (SSL) Private key to use for SSL. Can be used in Node.js client
   * environment to manually specify certificate information.
   */
  key: string;
  /**
   * (SSL) A string or passphrase for the private key or pfx. Can be
   * used in Node.js client environment to manually specify certificate
   * information.
   */
  passphrase: string;
  /**
   * (SSL) Public x509 certificate to use. Can be used in Node.js client
   * environment to manually specify certificate information.
   */
  cert: string;
  /**
   * (SSL) An authority certificate or array of authority certificates to
   * check the remote host against.. Can be used in Node.js client
   * environment to manually specify certificate information.
   */
  ca: string | string[];
  /**
   * (SSL) A string describing the ciphers to use or exclude. Consult the
   * [cipher format list]
   * (http://www.openssl.org/docs/apps/ciphers.html#CIPHER_LIST_FORMAT) for
   * details on the format.. Can be used in Node.js client environment to
   * manually specify certificate information.
   */
  ciphers: string;
  /**
   * (SSL) If true, the server certificate is verified against the list of
   * supplied CAs. An 'error' event is emitted if verification fails.
   * Verification happens at the connection level, before the HTTP request
   * is sent. Can be used in Node.js client environment to manually specify
   * certificate information.
   */
  rejectUnauthorized: boolean;
  /**
   * Headers that will be passed for each request to the server (via xhr-polling and via websockets).
   * These values then can be used during handshake or for special proxies.
   */
  extraHeaders?: {
    [header: string]: string;
  };
  /**
   * Whether to include credentials (cookies, authorization headers, TLS
   * client certificates, etc.) with cross-origin XHR polling requests
   * @default false
   */
  withCredentials: boolean;
  /**
   * Whether to automatically close the connection whenever the beforeunload event is received.
   * @default false
   */
  closeOnBeforeunload: boolean;
  /**
   * Whether to always use the native timeouts. This allows the client to
   * reconnect when the native timeout functions are overridden, such as when
   * mock clocks are installed.
   * @default false
   */
  useNativeTimers: boolean;
  /**
   * weather we should unref the reconnect timer when it is
   * create automatically
   * @default false
   */
  autoUnref: boolean;
  /**
   * parameters of the WebSocket permessage-deflate extension (see ws module api docs). Set to false to disable.
   * @default false
   */
  perMessageDeflate: {
    threshold: number;
  };
  /**
   * The path to get our client file from, in the case of the server
   * serving it
   * @default '/engine.io'
   */
  path: string;
  /**
   * Whether we should add a trailing slash to the request path.
   * @default true
   */
  addTrailingSlash: boolean;
  /**
   * Either a single protocol string or an array of protocol strings. These strings are used to indicate sub-protocols,
   * so that a single server can implement multiple WebSocket sub-protocols (for example, you might want one server to
   * be able to handle different types of interactions depending on the specified protocol)
   * @default []
   */
  protocols: string | string[];
}
interface HandshakeData {
  sid: string;
  upgrades: string[];
  pingInterval: number;
  pingTimeout: number;
  maxPayload: number;
}
interface SocketReservedEvents$1 {
  open: () => void;
  handshake: (data: HandshakeData) => void;
  packet: (packet: Packet$1) => void;
  packetCreate: (packet: Packet$1) => void;
  data: (data: any) => void;
  message: (data: any) => void;
  drain: () => void;
  flush: () => void;
  heartbeat: () => void;
  ping: () => void;
  pong: () => void;
  error: (err: string | Error) => void;
  upgrading: (transport: any) => void;
  upgrade: (transport: any) => void;
  upgradeError: (err: Error) => void;
  close: (reason: string, description?: CloseDetails | Error) => void;
}
type SocketState = "opening" | "open" | "closing" | "closed";
declare class Socket$1 extends Emitter<Record<never, never>, Record<never, never>, SocketReservedEvents$1> {
  id: string;
  transport: Transport;
  binaryType: BinaryType;
  readyState: SocketState;
  writeBuffer: Packet$1[];
  private prevBufferLen;
  private upgrades;
  private pingInterval;
  private pingTimeout;
  private pingTimeoutTimer;
  private setTimeoutFn;
  private clearTimeoutFn;
  private readonly beforeunloadEventListener;
  private readonly offlineEventListener;
  private upgrading;
  private maxPayload?;
  private readonly opts;
  private readonly secure;
  private readonly hostname;
  private readonly port;
  private readonly transports;
  static priorWebsocketSuccess: boolean;
  static protocol: any;
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(uri: any, opts?: Partial<SocketOptions$1>);
  /**
   * Creates transport of the given type.
   *
   * @param {String} name - transport name
   * @return {Transport}
   * @private
   */
  private createTransport;
  /**
   * Initializes transport to use and starts probe.
   *
   * @private
   */
  private open;
  /**
   * Sets the current transport. Disables the existing one (if any).
   *
   * @private
   */
  private setTransport;
  /**
   * Probes a transport.
   *
   * @param {String} name - transport name
   * @private
   */
  private probe;
  /**
   * Called when connection is deemed open.
   *
   * @private
   */
  private onOpen;
  /**
   * Handles a packet.
   *
   * @private
   */
  private onPacket;
  /**
   * Called upon handshake completion.
   *
   * @param {Object} data - handshake obj
   * @private
   */
  private onHandshake;
  /**
   * Sets and resets ping timeout timer based on server pings.
   *
   * @private
   */
  private resetPingTimeout;
  /**
   * Called on `drain` event
   *
   * @private
   */
  private onDrain;
  /**
   * Flush write buffers.
   *
   * @private
   */
  private flush;
  /**
   * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
   * long-polling)
   *
   * @private
   */
  private getWritablePackets;
  /**
   * Sends a message.
   *
   * @param {String} msg - message.
   * @param {Object} options.
   * @param {Function} callback function.
   * @return {Socket} for chaining.
   */
  write(msg: RawData, options?: any, fn?: any): this;
  send(msg: RawData, options?: any, fn?: any): this;
  /**
   * Sends a packet.
   *
   * @param {String} type: packet type.
   * @param {String} data.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @private
   */
  private sendPacket;
  /**
   * Closes the connection.
   */
  close(): this;
  /**
   * Called upon transport error
   *
   * @private
   */
  private onError;
  /**
   * Called upon transport close.
   *
   * @private
   */
  private onClose;
  /**
   * Filters upgrades, returning only those matching client transports.
   *
   * @param {Array} upgrades - server upgrades
   * @private
   */
  private filterUpgrades;
}
//#endregion
//#region oh_modules/.ohpm/@yyz116+socket.io-parser@1.0.2/oh_modules/@yyz116/socket.io-parser/src/main/js/index.d.ts
/**
 * Protocol version.
 *
 * @public
 */
declare const protocol: number;
declare enum PacketType {
  CONNECT = 0,
  DISCONNECT = 1,
  EVENT = 2,
  ACK = 3,
  CONNECT_ERROR = 4,
  BINARY_EVENT = 5,
  BINARY_ACK = 6,
}
interface Packet {
  type: PacketType;
  nsp: string;
  data?: any;
  id?: number;
  attachments?: number;
}
/**
 * A socket.io Encoder instance
 */
//#endregion
//#region oh_modules/.ohpm/@yyz116+socket.io-client@1.0.2/oh_modules/@yyz116/socket.io-client/src/main/js/socket.d.ts
type PrependTimeoutError<T extends any[]> = { [K in keyof T]: T[K] extends ((...args: infer Params) => infer Result) ? (err: Error, ...args: Params) => Result : T[K] };
/**
 * Utility type to decorate the acknowledgement callbacks with a timeout error.
 *
 * This is needed because the timeout() flag breaks the symmetry between the sender and the receiver:
 *
 * @example
 * interface Events {
 *   "my-event": (val: string) => void;
 * }
 *
 * socket.on("my-event", (cb) => {
 *   cb("123"); // one single argument here
 * });
 *
 * socket.timeout(1000).emit("my-event", (err, val) => {
 *   // two arguments there (the "err" argument is not properly typed)
 * });
 *
 */
type DecorateAcknowledgements<E> = { [K in keyof E]: E[K] extends ((...args: infer Params) => infer Result) ? (...args: PrependTimeoutError<Params>) => Result : E[K] };
type Last<T extends any[]> = T extends [...infer H, infer L] ? L : any;
type AllButLast<T extends any[]> = T extends [...infer H, infer L] ? H : any[];
type FirstArg<T> = T extends ((arg: infer Param) => infer Result) ? Param : any;
interface SocketOptions {
  /**
   * the authentication payload sent when connecting to the Namespace
   */
  auth?: {
    [key: string]: any;
  } | ((cb: (data: object) => void) => void);
  /**
   * The maximum number of retries. Above the limit, the packet will be discarded.
   *
   * Using `Infinity` means the delivery guarantee is "at-least-once" (instead of "at-most-once" by default), but a
   * smaller value like 10 should be sufficient in practice.
   */
  retries?: number;
  /**
   * The default timeout in milliseconds used when waiting for an acknowledgement.
   */
  ackTimeout?: number;
}
type DisconnectDescription = Error | {
  description: string;
  context?: unknown;
};
interface SocketReservedEvents {
  connect: () => void;
  connect_error: (err: Error) => void;
  disconnect: (reason: Socket.DisconnectReason, description?: DisconnectDescription) => void;
}
/**
 * A Socket is the fundamental class for interacting with the server.
 *
 * A Socket belongs to a certain Namespace (by default /) and uses an underlying {@link Manager} to communicate.
 *
 * @example
 * const socket = io();
 *
 * socket.on("connect", () => {
 *   console.log("connected");
 * });
 *
 * // send an event to the server
 * socket.emit("foo", "bar");
 *
 * socket.on("foobar", () => {
 *   // an event was received from the server
 * });
 *
 * // upon disconnection
 * socket.on("disconnect", (reason) => {
 *   console.log(`disconnected due to ${reason}`);
 * });
 */
declare class Socket<ListenEvents extends EventsMap = DefaultEventsMap, EmitEvents extends EventsMap = ListenEvents> extends Emitter<ListenEvents, EmitEvents, SocketReservedEvents> {
  readonly io: Manager<ListenEvents, EmitEvents>;
  /**
   * A unique identifier for the session. `undefined` when the socket is not connected.
   *
   * @example
   * const socket = io();
   *
   * console.log(socket.id); // undefined
   *
   * socket.on("connect", () => {
   *   console.log(socket.id); // "G5p5..."
   * });
   */
  id: string | undefined;
  /**
   * The session ID used for connection state recovery, which must not be shared (unlike {@link id}).
   *
   * @private
   */
  private _pid;
  /**
   * The offset of the last received packet, which will be sent upon reconnection to allow for the recovery of the connection state.
   *
   * @private
   */
  private _lastOffset;
  /**
   * Whether the socket is currently connected to the server.
   *
   * @example
   * const socket = io();
   *
   * socket.on("connect", () => {
   *   console.log(socket.connected); // true
   * });
   *
   * socket.on("disconnect", () => {
   *   console.log(socket.connected); // false
   * });
   */
  connected: boolean;
  /**
   * Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
   * be transmitted by the server.
   */
  recovered: boolean;
  /**
   * Credentials that are sent when accessing a namespace.
   *
   * @example
   * const socket = io({
   *   auth: {
   *     token: "abcd"
   *   }
   * });
   *
   * // or with a function
   * const socket = io({
   *   auth: (cb) => {
   *     cb({ token: localStorage.token })
   *   }
   * });
   */
  auth: {
    [key: string]: any;
  } | ((cb: (data: object) => void) => void);
  /**
   * Buffer for packets received before the CONNECT packet
   */
  receiveBuffer: Array<ReadonlyArray<any>>;
  /**
   * Buffer for packets that will be sent once the socket is connected
   */
  sendBuffer: Array<Packet>;
  /**
   * The queue of packets to be sent with retry in case of failure.
   *
   * Packets are sent one by one, each waiting for the server acknowledgement, in order to guarantee the delivery order.
   * @private
   */
  private _queue;
  /**
   * A sequence to generate the ID of the {@link QueuedPacket}.
   * @private
   */
  private _queueSeq;
  private readonly nsp;
  private readonly _opts;
  private ids;
  private acks;
  private flags;
  private subs?;
  private _anyListeners;
  private _anyOutgoingListeners;
  /**
   * `Socket` constructor.
   */
  constructor(io: Manager, nsp: string, opts?: Partial<SocketOptions>);
  /**
   * Whether the socket is currently disconnected
   *
   * @example
   * const socket = io();
   *
   * socket.on("connect", () => {
   *   console.log(socket.disconnected); // false
   * });
   *
   * socket.on("disconnect", () => {
   *   console.log(socket.disconnected); // true
   * });
   */
  get disconnected(): boolean;
  /**
   * Subscribe to open, close and packet events
   *
   * @private
   */
  private subEvents;
  /**
   * Whether the Socket will try to reconnect when its Manager connects or reconnects.
   *
   * @example
   * const socket = io();
   *
   * console.log(socket.active); // true
   *
   * socket.on("disconnect", (reason) => {
   *   if (reason === "io server disconnect") {
   *     // the disconnection was initiated by the server, you need to manually reconnect
   *     console.log(socket.active); // false
   *   }
   *   // else the socket will automatically try to reconnect
   *   console.log(socket.active); // true
   * });
   */
  get active(): boolean;
  /**
   * "Opens" the socket.
   *
   * @example
   * const socket = io({
   *   autoConnect: false
   * });
   *
   * socket.connect();
   */
  connect(): this;
  /**
   * Alias for {@link connect()}.
   */
  open(): this;
  /**
   * Sends a `message` event.
   *
   * This method mimics the WebSocket.send() method.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
   *
   * @example
   * socket.send("hello");
   *
   * // this is equivalent to
   * socket.emit("message", "hello");
   *
   * @return self
   */
  send(...args: any[]): this;
  /**
   * Override `emit`.
   * If the event is in `events`, it's emitted normally.
   *
   * @example
   * socket.emit("hello", "world");
   *
   * // all serializable datastructures are supported (no need to call JSON.stringify)
   * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
   *
   * // with an acknowledgement from the server
   * socket.emit("hello", "world", (val) => {
   *   // ...
   * });
   *
   * @return self
   */
  emit<Ev extends EventNames<EmitEvents>>(ev: Ev, ...args: EventParams<EmitEvents, Ev>): this;
  /**
   * @private
   */
  private _registerAckCallback;
  /**
   * Emits an event and waits for an acknowledgement
   *
   * @example
   * // without timeout
   * const response = await socket.emitWithAck("hello", "world");
   *
   * // with a specific timeout
   * try {
   *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
   * } catch (err) {
   *   // the server did not acknowledge the event in the given delay
   * }
   *
   * @return a Promise that will be fulfilled when the server acknowledges the event
   */
  emitWithAck<Ev extends EventNames<EmitEvents>>(ev: Ev, ...args: AllButLast<EventParams<EmitEvents, Ev>>): Promise<FirstArg<Last<EventParams<EmitEvents, Ev>>>>;
  /**
   * Add the packet to the queue.
   * @param args
   * @private
   */
  private _addToQueue;
  /**
   * Send the first packet of the queue, and wait for an acknowledgement from the server.
   * @param force - whether to resend a packet that has not been acknowledged yet
   *
   * @private
   */
  private _drainQueue;
  /**
   * Sends a packet.
   *
   * @param packet
   * @private
   */
  private packet;
  /**
   * Called upon engine `open`.
   *
   * @private
   */
  private onopen;
  /**
   * Sends a CONNECT packet to initiate the Socket.IO session.
   *
   * @param data
   * @private
   */
  private _sendConnectPacket;
  /**
   * Called upon engine or manager `error`.
   *
   * @param err
   * @private
   */
  private onerror;
  /**
   * Called upon engine `close`.
   *
   * @param reason
   * @param description
   * @private
   */
  private onclose;
  /**
   * Called with socket packet.
   *
   * @param packet
   * @private
   */
  private onpacket;
  /**
   * Called upon a server event.
   *
   * @param packet
   * @private
   */
  private onevent;
  private emitEvent;
  /**
   * Produces an ack callback to emit with an event.
   *
   * @private
   */
  private ack;
  /**
   * Called upon a server acknowlegement.
   *
   * @param packet
   * @private
   */
  private onack;
  /**
   * Called upon server connect.
   *
   * @private
   */
  private onconnect;
  /**
   * Emit buffered events (received and emitted).
   *
   * @private
   */
  private emitBuffered;
  /**
   * Called upon server disconnect.
   *
   * @private
   */
  private ondisconnect;
  /**
   * Called upon forced client/server side disconnections,
   * this method ensures the manager stops tracking us and
   * that reconnections don't get triggered for this.
   *
   * @private
   */
  private destroy;
  /**
   * Disconnects the socket manually. In that case, the socket will not try to reconnect.
   *
   * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
   *
   * @example
   * const socket = io();
   *
   * socket.on("disconnect", (reason) => {
   *   // console.log(reason); prints "io client disconnect"
   * });
   *
   * socket.disconnect();
   *
   * @return self
   */
  disconnect(): this;
  /**
   * Alias for {@link disconnect()}.
   *
   * @return self
   */
  close(): this;
  /**
   * Sets the compress flag.
   *
   * @example
   * socket.compress(false).emit("hello");
   *
   * @param compress - if `true`, compresses the sending data
   * @return self
   */
  compress(compress: boolean): this;
  /**
   * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
   * ready to send messages.
   *
   * @example
   * socket.volatile.emit("hello"); // the server may or may not receive it
   *
   * @returns self
   */
  get volatile(): this;
  /**
   * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
   * given number of milliseconds have elapsed without an acknowledgement from the server:
   *
   * @example
   * socket.timeout(5000).emit("my-event", (err) => {
   *   if (err) {
   *     // the server did not acknowledge the event in the given delay
   *   }
   * });
   *
   * @returns self
   */
  timeout(timeout: number): Socket<ListenEvents, DecorateAcknowledgements<EmitEvents>>;
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * @example
   * socket.onAny((event, ...args) => {
   *   console.log(`got ${event}`);
   * });
   *
   * @param listener
   */
  onAny(listener: (...args: any[]) => void): this;
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * @example
   * socket.prependAny((event, ...args) => {
   *   console.log(`got event ${event}`);
   * });
   *
   * @param listener
   */
  prependAny(listener: (...args: any[]) => void): this;
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`got event ${event}`);
   * }
   *
   * socket.onAny(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAny(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAny();
   *
   * @param listener
   */
  offAny(listener?: (...args: any[]) => void): this;
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAny(): ((...args: any[]) => void)[];
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.onAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  onAnyOutgoing(listener: (...args: any[]) => void): this;
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.prependAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  prependAnyOutgoing(listener: (...args: any[]) => void): this;
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`sent event ${event}`);
   * }
   *
   * socket.onAnyOutgoing(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAnyOutgoing(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAnyOutgoing();
   *
   * @param [listener] - the catch-all listener (optional)
   */
  offAnyOutgoing(listener?: (...args: any[]) => void): this;
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAnyOutgoing(): ((...args: any[]) => void)[];
  /**
   * Notify the listeners for each packet sent
   *
   * @param packet
   *
   * @private
   */
  private notifyOutgoingListeners;
}
declare namespace Socket {
  type DisconnectReason = "io server disconnect" | "io client disconnect" | "ping timeout" | "transport close" | "transport error" | "parse error";
}
//#endregion
//#region oh_modules/.ohpm/@yyz116+socket.io-client@1.0.2/oh_modules/@yyz116/socket.io-client/src/main/js/manager.d.ts
interface ManagerOptions extends SocketOptions$1 {
  /**
   * Should we force a new Manager for this connection?
   * @default false
   */
  forceNew: boolean;
  /**
   * Should we multiplex our connection (reuse existing Manager) ?
   * @default true
   */
  multiplex: boolean;
  /**
   * The path to get our client file from, in the case of the server
   * serving it
   * @default '/socket.io'
   */
  path: string;
  /**
   * Should we allow reconnections?
   * @default true
   */
  reconnection: boolean;
  /**
   * How many reconnection attempts should we try?
   * @default Infinity
   */
  reconnectionAttempts: number;
  /**
   * The time delay in milliseconds between reconnection attempts
   * @default 1000
   */
  reconnectionDelay: number;
  /**
   * The max time delay in milliseconds between reconnection attempts
   * @default 5000
   */
  reconnectionDelayMax: number;
  /**
   * Used in the exponential backoff jitter when reconnecting
   * @default 0.5
   */
  randomizationFactor: number;
  /**
   * The timeout in milliseconds for our connection attempt
   * @default 20000
   */
  timeout: number;
  /**
   * Should we automatically connect?
   * @default true
   */
  autoConnect: boolean;
  /**
   * the parser to use. Defaults to an instance of the Parser that ships with socket.io.
   */
  parser: any;
}
interface ManagerReservedEvents {
  open: () => void;
  error: (err: Error) => void;
  ping: () => void;
  packet: (packet: Packet) => void;
  close: (reason: string, description?: DisconnectDescription) => void;
  reconnect_failed: () => void;
  reconnect_attempt: (attempt: number) => void;
  reconnect_error: (err: Error) => void;
  reconnect: (attempt: number) => void;
}
declare class Manager<ListenEvents extends EventsMap = DefaultEventsMap, EmitEvents extends EventsMap = ListenEvents> extends Emitter<{}, {}, ManagerReservedEvents> {
  /**
   * The Engine.IO client instance
   *
   * @public
   */
  engine: Socket$1;
  /**
   * @private
   */
  _autoConnect: boolean;
  /**
   * @private
   */
  _readyState: "opening" | "open" | "closed";
  /**
   * @private
   */
  _reconnecting: boolean;
  private readonly uri;
  opts: Partial<ManagerOptions>;
  private nsps;
  private subs;
  private backoff;
  private setTimeoutFn;
  private clearTimeoutFn;
  private _reconnection;
  private _reconnectionAttempts;
  private _reconnectionDelay;
  private _randomizationFactor;
  private _reconnectionDelayMax;
  private _timeout;
  private encoder;
  private decoder;
  private skipReconnect;
  /**
   * `Manager` constructor.
   *
   * @param uri - engine instance or engine uri/opts
   * @param opts - options
   * @public
   */
  constructor(opts: Partial<ManagerOptions>);
  constructor(uri?: string, opts?: Partial<ManagerOptions>);
  constructor(uri?: string | Partial<ManagerOptions>, opts?: Partial<ManagerOptions>);
  /**
   * Sets the `reconnection` config.
   *
   * @param {Boolean} v - true/false if it should automatically reconnect
   * @return {Manager} self or value
   * @public
   */
  reconnection(v: boolean): this;
  reconnection(): boolean;
  reconnection(v?: boolean): this | boolean;
  /**
   * Sets the reconnection attempts config.
   *
   * @param {Number} v - max reconnection attempts before giving up
   * @return {Manager} self or value
   * @public
   */
  reconnectionAttempts(v: number): this;
  reconnectionAttempts(): number;
  reconnectionAttempts(v?: number): this | number;
  /**
   * Sets the delay between reconnections.
   *
   * @param {Number} v - delay
   * @return {Manager} self or value
   * @public
   */
  reconnectionDelay(v: number): this;
  reconnectionDelay(): number;
  reconnectionDelay(v?: number): this | number;
  /**
   * Sets the randomization factor
   *
   * @param v - the randomization factor
   * @return self or value
   * @public
   */
  randomizationFactor(v: number): this;
  randomizationFactor(): number;
  randomizationFactor(v?: number): this | number;
  /**
   * Sets the maximum delay between reconnections.
   *
   * @param v - delay
   * @return self or value
   * @public
   */
  reconnectionDelayMax(v: number): this;
  reconnectionDelayMax(): number;
  reconnectionDelayMax(v?: number): this | number;
  /**
   * Sets the connection timeout. `false` to disable
   *
   * @param v - connection timeout
   * @return self or value
   * @public
   */
  timeout(v: number | boolean): this;
  timeout(): number | boolean;
  timeout(v?: number | boolean): this | number | boolean;
  /**
   * Starts trying to reconnect if reconnection is enabled and we have not
   * started reconnecting yet
   *
   * @private
   */
  private maybeReconnectOnOpen;
  /**
   * Sets the current transport `socket`.
   *
   * @param {Function} fn - optional, callback
   * @return self
   * @public
   */
  open(fn?: (err?: Error) => void): this;
  /**
   * Alias for open()
   *
   * @return self
   * @public
   */
  connect(fn?: (err?: Error) => void): this;
  /**
   * Called upon transport open.
   *
   * @private
   */
  private onopen;
  /**
   * Called upon a ping.
   *
   * @private
   */
  private onping;
  /**
   * Called with data.
   *
   * @private
   */
  private ondata;
  /**
   * Called when parser fully decodes a packet.
   *
   * @private
   */
  private ondecoded;
  /**
   * Called upon socket error.
   *
   * @private
   */
  private onerror;
  /**
   * Creates a new socket for the given `nsp`.
   *
   * @return {Socket}
   * @public
   */
  socket(nsp: string, opts?: Partial<SocketOptions>): Socket;
  /**
   * Called upon a socket close.
   *
   * @param socket
   * @private
   */
  _destroy(socket: Socket): void;
  /**
   * Writes a packet.
   *
   * @param packet
   * @private
   */
  _packet(packet: Partial<Packet & {
    query: string;
    options: any;
  }>): void;
  /**
   * Clean up transport subscriptions and packet buffer.
   *
   * @private
   */
  private cleanup;
  /**
   * Close the current socket.
   *
   * @private
   */
  _close(): void;
  /**
   * Alias for close()
   *
   * @private
   */
  private disconnect;
  /**
   * Called upon engine close.
   *
   * @private
   */
  private onclose;
  /**
   * Attempt a reconnection.
   *
   * @private
   */
  private reconnect;
  /**
   * Called upon successful reconnect.
   *
   * @private
   */
  private onreconnect;
}
//#endregion
//#region oh_modules/.ohpm/@yyz116+socket.io-client@1.0.2/oh_modules/@yyz116/socket.io-client/src/main/js/index.d.ts
/**
 * Looks up an existing `Manager` for multiplexing.
 * If the user summons:
 *
 *   `io('http://localhost/a');`
 *   `io('http://localhost/b');`
 *
 * We reuse the existing instance based on same scheme/port/host,
 * and we initialize sockets for each namespace.
 *
 * @public
 */
declare function lookup(opts?: Partial<ManagerOptions & SocketOptions>): Socket;
declare function lookup(uri: string, opts?: Partial<ManagerOptions & SocketOptions>): Socket;
/**
 * Protocol version.
 *
 * @public
 */

//#endregion
export { Manager, ManagerOptions, Socket, SocketOptions, lookup as connect, lookup as default, lookup as io, protocol };