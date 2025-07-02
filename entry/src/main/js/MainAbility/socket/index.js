import webSocket from "@ohos.net.webSocket";

//#region rolldown:runtime
var __defProp = Object.defineProperty;
var __export = (target, all) => {
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
};

//#endregion
//#region oh_modules/.ohpm/@yyz116+engine.io-parser@1.0.1/oh_modules/@yyz116/engine.io-parser/src/main/js/commons.ts
const PACKET_TYPES = Object.create(null);
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
const PACKET_TYPES_REVERSE = Object.create(null);
Object.keys(PACKET_TYPES).forEach((key) => {
	PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
const ERROR_PACKET = {
	type: "error",
	data: "parser error"
};

//#endregion
//#region oh_modules/.ohpm/@yyz116+engine.io-parser@1.0.1/oh_modules/@yyz116/engine.io-parser/src/main/js/contrib/base64-arraybuffer.ts
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const lookup$1 = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
for (let i$1 = 0; i$1 < 64; i$1++) lookup$1[chars.charCodeAt(i$1)] = i$1;
const encode$2 = (arraybuffer) => {
	let bytes = new Uint8Array(arraybuffer), i$1, len = bytes.length, base64 = "";
	for (i$1 = 0; i$1 < len; i$1 += 3) {
		base64 += chars[bytes[i$1] >> 2];
		base64 += chars[(bytes[i$1] & 3) << 4 | bytes[i$1 + 1] >> 4];
		base64 += chars[(bytes[i$1 + 1] & 15) << 2 | bytes[i$1 + 2] >> 6];
		base64 += chars[bytes[i$1 + 2] & 63];
	}
	if (len % 3 === 2) base64 = base64.substring(0, base64.length - 1) + "=";
	else if (len % 3 === 1) base64 = base64.substring(0, base64.length - 2) + "==";
	return base64;
};

//#endregion
//#region oh_modules/.ohpm/@yyz116+engine.io-parser@1.0.1/oh_modules/@yyz116/engine.io-parser/src/main/js/encodePacket.ts
const encodePacket = ({ type, data }, supportsBinary, callback) => {
	if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) return callback(supportsBinary ? data : "b" + encode$2(toBuffer(data, true)));
	return callback(PACKET_TYPES[type] + (data || ""));
};
const toBuffer = (data, forceBufferConversion) => {
	if (data instanceof Uint8Array && !forceBufferConversion) return data;
	else if (data instanceof ArrayBuffer) {
		let uint8Array = new Uint8Array(data);
		return uint8Array;
	}
};

//#endregion
//#region oh_modules/.ohpm/@yyz116+engine.io-parser@1.0.1/oh_modules/@yyz116/engine.io-parser/src/main/js/decodePacket.ts
const decodePacket = (encodedPacket, binaryType) => {
	if (typeof encodedPacket !== "string") return {
		type: "message",
		data: mapBinary(encodedPacket, binaryType)
	};
	const type = encodedPacket.charAt(0);
	if (type === "b") return ERROR_PACKET;
	if (!PACKET_TYPES_REVERSE[type]) return ERROR_PACKET;
	return encodedPacket.length > 1 ? {
		type: PACKET_TYPES_REVERSE[type],
		data: encodedPacket.substring(1)
	} : { type: PACKET_TYPES_REVERSE[type] };
};
const mapBinary = (data, binaryType) => {
	switch (binaryType) {
		case "arraybuffer": if (data instanceof ArrayBuffer) return data;
		case "nodebuffer":
		default: return data;
	}
};

//#endregion
//#region oh_modules/.ohpm/@yyz116+engine.io-parser@1.0.1/oh_modules/@yyz116/engine.io-parser/src/main/js/index.ts
const SEPARATOR = String.fromCharCode(30);
const protocol$2 = 4;

//#endregion
//#region oh_modules/.ohpm/@yyz116+emitter@1.0.2/oh_modules/@yyz116/emitter/src/main/js/index.js
/**

* Initialize a new `Emitter`.

*

* @api public

*/
function Emitter(obj) {
	if (obj) return mixin(obj);
}
/**

* Mixin the emitter properties.

*

* @param {Object} obj

* @return {Object}

* @api private

*/
function mixin(obj) {
	for (var key in Emitter.prototype) obj[key] = Emitter.prototype[key];
	return obj;
}
/**

* Listen on the given `event` with `fn`.

*

* @param {String} event

* @param {Function} fn

* @return {Emitter}

* @api public

*/
Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
	this._callbacks = this._callbacks || {};
	(this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
	return this;
};
/**

* Adds an `event` listener that will be invoked a single

* time then automatically removed.

*

* @param {String} event

* @param {Function} fn

* @return {Emitter}

* @api public

*/
Emitter.prototype.once = function(event, fn) {
	function on$1() {
		this.off(event, on$1);
		fn.apply(this, arguments);
	}
	on$1.fn = fn;
	this.on(event, on$1);
	return this;
};
/**

* Remove the given callback for `event` or all

* registered callbacks.

*

* @param {String} event

* @param {Function} fn

* @return {Emitter}

* @api public

*/
Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
	this._callbacks = this._callbacks || {};
	if (0 == arguments.length) {
		this._callbacks = {};
		return this;
	}
	var callbacks = this._callbacks["$" + event];
	if (!callbacks) return this;
	if (1 == arguments.length) {
		delete this._callbacks["$" + event];
		return this;
	}
	var cb;
	for (var i$1 = 0; i$1 < callbacks.length; i$1++) {
		cb = callbacks[i$1];
		if (cb === fn || cb.fn === fn) {
			callbacks.splice(i$1, 1);
			break;
		}
	}
	if (callbacks.length === 0) delete this._callbacks["$" + event];
	return this;
};
/**

* Emit `event` with the given args.

*

* @param {String} event

* @param {Mixed} ...

* @return {Emitter}

*/
Emitter.prototype.emit = function(event) {
	this._callbacks = this._callbacks || {};
	var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
	for (var i$1 = 1; i$1 < arguments.length; i$1++) args[i$1 - 1] = arguments[i$1];
	if (callbacks) {
		callbacks = callbacks.slice(0);
		for (var i$1 = 0, len = callbacks.length; i$1 < len; ++i$1) callbacks[i$1].apply(this, args);
	}
	return this;
};
Emitter.prototype._emitReserved = Emitter.prototype.emit;
/**

* Return array of callbacks for `event`.

*

* @param {String} event

* @return {Array}

* @api public

*/
Emitter.prototype.listeners = function(event) {
	this._callbacks = this._callbacks || {};
	return this._callbacks["$" + event] || [];
};
/**

* Check if this emitter has `event` handlers.

*

* @param {String} event

* @return {Boolean}

* @api public

*/
Emitter.prototype.hasListeners = function(event) {
	return !!this.listeners(event).length;
};

//#endregion
//#region oh_modules/.ohpm/@yyz116+engine.io-client@1.0.2/oh_modules/@yyz116/engine.io-client/src/main/js/globalThis.ts
const globalThisShim = (() => {
	return Function("return this")();
})();

//#endregion
//#region oh_modules/.ohpm/@yyz116+engine.io-client@1.0.2/oh_modules/@yyz116/engine.io-client/src/main/js/util.ts
function pick(obj, ...attr) {
	return attr.reduce((acc, k) => {
		if (obj.hasOwnProperty(k)) acc[k] = obj[k];
		return acc;
	}, {});
}
const NATIVE_SET_TIMEOUT = globalThisShim.setTimeout;
const NATIVE_CLEAR_TIMEOUT = globalThisShim.clearTimeout;
function installTimerFunctions(obj, opts) {
	if (opts.useNativeTimers) {
		obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim);
		obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim);
	} else {
		obj.setTimeoutFn = globalThisShim.setTimeout.bind(globalThisShim);
		obj.clearTimeoutFn = globalThisShim.clearTimeout.bind(globalThisShim);
	}
}
const BASE64_OVERHEAD = 1.33;
function byteLength(obj) {
	if (typeof obj === "string") return utf8Length(obj);
	return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
}
function utf8Length(str) {
	let c = 0, length$1 = 0;
	for (let i$1 = 0, l = str.length; i$1 < l; i$1++) {
		c = str.charCodeAt(i$1);
		if (c < 128) length$1 += 1;
		else if (c < 2048) length$1 += 2;
		else if (c < 55296 || c >= 57344) length$1 += 3;
		else {
			i$1++;
			length$1 += 4;
		}
	}
	return length$1;
}

//#endregion
//#region oh_modules/.ohpm/@yyz116+debug@1.0.1/oh_modules/@yyz116/debug/src/main/js/common.js
/**

* This is the common logic for both the Node.js and web browser

* implementations of `debug()`.

*/
function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.destroy = destroy;
	Object.keys(env).forEach((key) => {
		createDebug[key] = env[key];
	});
	/**
	
	* The currently active debug mode names, and names to skip.
	
	*/
	createDebug.names = [];
	createDebug.skips = [];
	/**
	
	* Map of special "%n" handling functions, for the debug "format" argument.
	
	*
	
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	
	*/
	createDebug.formatters = {};
	/**
	
	* Selects a color for a debug namespace
	
	* @param {String} namespace The namespace string for the debug instance to be colored
	
	* @return {Number|String} An ANSI color code for the given namespace
	
	* @api private
	
	*/
	function selectColor(namespace) {
		let hash = 0;
		for (let i$1 = 0; i$1 < namespace.length; i$1++) {
			hash = (hash << 5) - hash + namespace.charCodeAt(i$1);
			hash |= 0;
		}
		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;
	/**
	
	* Create a debugger with the given `namespace`.
	
	*
	
	* @param {String} namespace
	
	* @return {Function}
	
	* @api public
	
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;
		let namespacesCache;
		let enabledCache;
		function debug$8(...args) {
			if (!debug$8.enabled) return;
			const self = debug$8;
			const curr = Number(/* @__PURE__ */ new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;
			args[0] = createDebug.coerce(args[0]);
			if (typeof args[0] !== "string") args.unshift("%O");
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				if (match === "%%") return "%";
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === "function") {
					const val = args[index];
					match = formatter.call(self, val);
					args.splice(index, 1);
					index--;
				}
				return match;
			});
			createDebug.formatArgs.call(self, args);
			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}
		debug$8.namespace = namespace;
		debug$8.useColors = createDebug.useColors();
		debug$8.color = createDebug.selectColor(namespace);
		debug$8.extend = extend;
		debug$8.destroy = createDebug.destroy;
		debug$8.enable = createDebug.enable;
		Object.defineProperty(debug$8, "enabled", {
			enumerable: true,
			configurable: false,
			get: () => {
				if (enableOverride !== null) return enableOverride;
				if (namespacesCache !== createDebug.namespaces) {
					namespacesCache = createDebug.namespaces;
					enabledCache = createDebug.enabled(namespace);
				}
				return enabledCache;
			},
			set: (v) => {
				enableOverride = v;
			}
		});
		if (typeof createDebug.init === "function") createDebug.init(debug$8);
		return debug$8;
	}
	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}
	/**
	
	* Enables a debug mode by namespaces. This can include modes
	
	* separated by a colon and wildcards.
	
	*
	
	* @param {String} namespaces
	
	* @api public
	
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.namespaces = namespaces;
		createDebug.names = [];
		createDebug.skips = [];
		let i$1;
		const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
		const len = split.length;
		for (i$1 = 0; i$1 < len; i$1++) {
			if (!split[i$1]) continue;
			namespaces = split[i$1].replace(/\*/g, ".*?");
			if (namespaces[0] === "-") createDebug.skips.push(/* @__PURE__ */ new RegExp("^" + namespaces.slice(1) + "$"));
			else createDebug.names.push(/* @__PURE__ */ new RegExp("^" + namespaces + "$"));
		}
	}
	/**
	
	* Disable debug output.
	
	*
	
	* @return {String} namespaces
	
	* @api public
	
	*/
	function disable() {
		const namespaces = [...createDebug.names.map(toNamespace), ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)].join(",");
		createDebug.enable("");
		return namespaces;
	}
	/**
	
	* Returns true if the given mode name is enabled, false otherwise.
	
	*
	
	* @param {String} name
	
	* @return {Boolean}
	
	* @api public
	
	*/
	function enabled(name) {
		if (name[name.length - 1] === "*") return true;
		let i$1;
		let len;
		for (i$1 = 0, len = createDebug.skips.length; i$1 < len; i$1++) if (createDebug.skips[i$1].test(name)) return false;
		for (i$1 = 0, len = createDebug.names.length; i$1 < len; i$1++) if (createDebug.names[i$1].test(name)) return true;
		return false;
	}
	/**
	
	* Convert regexp to namespace
	
	*
	
	* @param {RegExp} regxep
	
	* @return {String} namespace
	
	* @api private
	
	*/
	function toNamespace(regexp) {
		return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
	}
	/**
	
	* Coerce `val`.
	
	*
	
	* @param {Mixed} val
	
	* @return {Mixed}
	
	* @api private
	
	*/
	function coerce(val) {
		if (val instanceof Error) return val.stack || val.message;
		return val;
	}
	/**
	
	* XXX DO NOT USE. This is a temporary stub function.
	
	* XXX It WILL be removed in the next major release.
	
	*/
	function destroy() {
		console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
	}
	createDebug.enable(createDebug.load());
	return createDebug;
}

//#endregion
//#region oh_modules/.ohpm/@yyz116+debug@1.0.1/oh_modules/@yyz116/debug/src/main/js/harmony.js
/**

* This is the harmonyos implementation of `debug()`.

*/
let exp = {};
exp.useColors = useColors;
exp.formatArgs = formatArgs;
exp.save = save;
exp.load = load;
exp.storage = function() {
	var data = {};
	return {
		setItem: function(key, item) {
			data[key] = item;
		},
		getItem: function(key) {
			return data[key];
		},
		removeItem: function(key) {
			delete data[key];
		}
	};
}();
exp.destroy = (() => {
	let warned = false;
	return () => {
		if (!warned) {
			warned = true;
			console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
		}
	};
})();
/**

* Invokes `console.debug()` when available.

* No-op when `console.debug` is not a "function".

* If `console.debug` is not available, falls back

* to `console.log`.

*

* @api public

*/
exp.log = console.log || (() => {});
/**

* Colors.

*/
exp.colors = [
	"#0000CC",
	"#0000FF",
	"#0033CC",
	"#0033FF",
	"#0066CC",
	"#0066FF",
	"#0099CC",
	"#0099FF",
	"#00CC00",
	"#00CC33",
	"#00CC66",
	"#00CC99",
	"#00CCCC",
	"#00CCFF",
	"#3300CC",
	"#3300FF",
	"#3333CC",
	"#3333FF",
	"#3366CC",
	"#3366FF",
	"#3399CC",
	"#3399FF",
	"#33CC00",
	"#33CC33",
	"#33CC66",
	"#33CC99",
	"#33CCCC",
	"#33CCFF",
	"#6600CC",
	"#6600FF",
	"#6633CC",
	"#6633FF",
	"#66CC00",
	"#66CC33",
	"#9900CC",
	"#9900FF",
	"#9933CC",
	"#9933FF",
	"#99CC00",
	"#99CC33",
	"#CC0000",
	"#CC0033",
	"#CC0066",
	"#CC0099",
	"#CC00CC",
	"#CC00FF",
	"#CC3300",
	"#CC3333",
	"#CC3366",
	"#CC3399",
	"#CC33CC",
	"#CC33FF",
	"#CC6600",
	"#CC6633",
	"#CC9900",
	"#CC9933",
	"#CCCC00",
	"#CCCC33",
	"#FF0000",
	"#FF0033",
	"#FF0066",
	"#FF0099",
	"#FF00CC",
	"#FF00FF",
	"#FF3300",
	"#FF3333",
	"#FF3366",
	"#FF3399",
	"#FF33CC",
	"#FF33FF",
	"#FF6600",
	"#FF6633",
	"#FF9900",
	"#FF9933",
	"#FFCC00",
	"#FFCC33"
];
/**

* Currently only WebKit-based Web Inspectors, Firefox >= v31,

* and the Firebug extension (any Firefox version) are known

* to support "%c" CSS customizations.

*

* TODO: add a `localStorage` variable to explicitly enable/disable colors

*/
function useColors() {
	return false;
}
/**

* Colorize log arguments if enabled.

*

* @api public

*/
function formatArgs(args) {
	args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ");
	if (!this.useColors) return;
	const c = "color: " + this.color;
	args.splice(1, 0, c, "color: inherit");
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, (match) => {
		if (match === "%%") return;
		index++;
		if (match === "%c") lastC = index;
	});
	args.splice(lastC, 0, c);
}
/**

* Save `namespaces`.

*

* @param {String} namespaces

* @api private

*/
function save(namespaces) {
	try {
		if (namespaces) exp.storage.setItem("debug", namespaces);
		else exp.storage.removeItem("debug");
	} catch (error) {}
}
/**

* Load `namespaces`.

*

* @return {String} returns the previously persisted debug modes

* @api private

*/
function load() {
	let r;
	try {
		r = exp.storage.getItem("debug");
	} catch (error) {}
	if (!r && typeof process !== "undefined" && "env" in process) r = process.env.DEBUG;
	return r;
}
var outs = setup(exp);
const { formatters } = outs;
/**

* Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.

*/
formatters.j = function(v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return "[UnexpectedJSONParseError]: " + error.message;
	}
};

//#endregion
//#region oh_modules/.ohpm/@yyz116+debug@1.0.1/oh_modules/@yyz116/debug/src/main/js/index.js
var js_default = outs;

//#endregion
//#region oh_modules/.ohpm/@yyz116+debug@1.0.1/oh_modules/@yyz116/debug/index.ts
var debug_default = js_default;

//#endregion
//#region oh_modules/.ohpm/@yyz116+engine.io-client@1.0.2/oh_modules/@yyz116/engine.io-client/src/main/js/contrib/parseqs.ts
/**

* Compiles a querystring

* Returns string representation of the object

*

* @param {Object}

* @api private

*/
function encode$1(obj) {
	let str = "";
	for (let i$1 in obj) if (obj.hasOwnProperty(i$1)) {
		if (str.length) str += "&";
		str += encodeURIComponent(i$1) + "=" + encodeURIComponent(obj[i$1]);
	}
	return str;
}
/**

* Parses a simple querystring into an object

*

* @param {String} qs

* @api private

*/
function decode(qs) {
	let qry = {};
	let pairs = qs.split("&");
	for (let i$1 = 0, l = pairs.length; i$1 < l; i$1++) {
		let pair = pairs[i$1].split("=");
		qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
	}
	return qry;
}

//#endregion
//#region oh_modules/.ohpm/@yyz116+engine.io-client@1.0.2/oh_modules/@yyz116/engine.io-client/src/main/js/transport.ts
const debug$7 = debug_default("engine.io-client:transport");
var TransportError = class extends Error {
	type = "TransportError";
	constructor(reason, description, context) {
		super(reason);
		this.description = description;
		this.context = context;
	}
};
var Transport = class extends Emitter {
	query;
	writable = false;
	opts;
	supportsBinary;
	readyState;
	socket;
	setTimeoutFn;
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
	onError(reason, description, context) {
		super._emitReserved("error", new TransportError(reason, description, context));
		return this;
	}
	/**
	
	* Opens the transport.
	
	*/
	open() {
		this.readyState = "opening";
		this.doOpen();
		return this;
	}
	/**
	
	* Closes the transport.
	
	*/
	close() {
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
	send(packets) {
		if (this.readyState === "open") this.write(packets);
		else debug$7("transport is not open, discarding packets");
	}
	/**
	
	* Called upon open
	
	*
	
	* @protected
	
	*/
	onOpen() {
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
	onData(data) {
		const packet = decodePacket(data, this.socket.binaryType);
		this.onPacket(packet);
	}
	/**
	
	* Called with a decoded packet.
	
	*
	
	* @protected
	
	*/
	onPacket(packet) {
		super._emitReserved("packet", packet);
	}
	/**
	
	* Called upon close.
	
	*
	
	* @protected
	
	*/
	onClose(details) {
		this.readyState = "closed";
		super._emitReserved("close", details);
	}
	/**
	
	* Pauses the transport, in order not to lose packets during an upgrade.
	
	*
	
	* @param onPause
	
	*/
	pause(onPause) {}
	createUri(schema, query = {}) {
		return schema + "://" + this._hostname() + this._port() + this.opts.path + this._query(query);
	}
	_hostname() {
		const hostname = this.opts.hostname;
		return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
	}
	_port() {
		if (this.opts.port && (this.opts.secure && Number(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80)) return ":" + this.opts.port;
		else return "";
	}
	_query(query) {
		const encodedQuery = encode$1(query);
		return encodedQuery.length ? "?" + encodedQuery : "";
	}
};

//#endregion
//#region oh_modules/.ohpm/@yyz116+engine.io-client@1.0.2/oh_modules/@yyz116/engine.io-client/src/main/js/contrib/yeast.ts
const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), length = 64, map = {};
let seed = 0, i = 0, prev;
/**

* Return a string representing the specified number.

*

* @param {Number} num The number to convert.

* @returns {String} The string representation of the number.

* @api public

*/
function encode(num) {
	let encoded = "";
	do {
		encoded = alphabet[num % length] + encoded;
		num = Math.floor(num / length);
	} while (num > 0);
	return encoded;
}
/**

* Yeast: A tiny growing id generator.

*

* @returns {String} A unique id.

* @api public

*/
function yeast() {
	const now = encode(+/* @__PURE__ */ new Date());
	if (now !== prev) return seed = 0, prev = now;
	return now + "." + encode(seed++);
}
for (; i < length; i++) map[alphabet[i]] = i;

//#endregion
//#region oh_modules/.ohpm/@yyz116+engine.io-client@1.0.2/oh_modules/@yyz116/engine.io-client/src/main/js/transports/websocket-constructor.ts
const WebSocket = webSocket.createWebSocket();
const usingBrowserWebSocket = false;
const defaultBinaryType = "arraybuffer";
const nextTick = (() => {
	const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
	if (isPromiseAvailable) return (cb) => Promise.resolve().then(cb);
	else return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
})();

//#endregion
//#region oh_modules/.ohpm/@yyz116+engine.io-client@1.0.2/oh_modules/@yyz116/engine.io-client/src/main/js/transports/websocket.ts
const debug$6 = debug_default("engine.io-client:websocket");
var WS = class extends Transport {
	ws = WebSocket;
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
		if (!this.check()) return;
		const uri = this.uri();
		const protocols = this.opts.protocols;
		const opts = pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
		if (this.opts.extraHeaders) opts.headers = this.opts.extraHeaders;
		this.addEventListeners();
		try {
			this.ws.connect(uri, (err, value) => {
				if (!err) debug$6("Connected successfully");
				else debug$6("Connection failed. Err:" + JSON.stringify(err));
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
	addEventListeners() {
		this.ws.on("open", (err, value) => {
			if (err) debug$6("error:" + JSON.stringify(err));
			debug$6("on open, status:" + JSON.stringify(value));
			this.onOpen();
		});
		this.ws.on("message", (err, value) => {
			debug$6("on message, message:" + value);
			this.onData(value);
		});
		this.ws.on("close", (err, value) => {
			debug$6("on close, code is " + value.code + ", reason is " + value.reason);
			this.onClose({
				description: "websocket connection closed",
				context: value
			});
		});
		this.ws.on("error", (err) => {
			debug$6("on error, error:" + JSON.stringify(err));
			this.onError("websocket error", err);
		});
	}
	write(packets) {
		this.writable = false;
		for (let i$1 = 0; i$1 < packets.length; i$1++) {
			const packet = packets[i$1];
			const lastPacket = i$1 === packets.length - 1;
			encodePacket(packet, this.supportsBinary, (data) => {
				const opts = {};
				if (!usingBrowserWebSocket) {
					if (packet.options) opts.compress = packet.options.compress;
					if (this.opts.perMessageDeflate) {
						const len = "string" === typeof data ? Buffer.byteLength(data) : data.length;
						if (len < this.opts.perMessageDeflate.threshold) opts.compress = false;
					}
				}
				try {
					this.ws.send(data, (err, value) => {
						if (!err) debug$6("Message sent successfully");
						else debug$6("Failed to send the message. Err:" + JSON.stringify(err));
					});
				} catch (e) {
					debug$6("websocket closed before onClose event");
				}
				if (lastPacket) nextTick(() => {
					this.writable = true;
					this._emitReserved("drain");
				}, this.setTimeoutFn);
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
	uri() {
		const schema = this.opts.secure ? "wss" : "ws";
		const query = this.query || {};
		if (this.opts.timestampRequests) query[this.opts.timestampParam] = yeast();
		if (!this.supportsBinary) query.b64 = 1;
		return this.createUri(schema, query);
	}
	/**
	
	* Feature detection for WebSocket.
	
	*
	
	* @return {Boolean} whether this transport is available.
	
	* @private
	
	*/
	check() {
		return !!WebSocket;
	}
};

//#endregion
//#region oh_modules/.ohpm/@yyz116+engine.io-client@1.0.2/oh_modules/@yyz116/engine.io-client/src/main/js/transports/index.ts
const transports = { websocket: WS };

//#endregion
//#region oh_modules/.ohpm/@yyz116+engine.io-client@1.0.2/oh_modules/@yyz116/engine.io-client/src/main/js/contrib/parseuri.ts
/**

* Parses a URI

*

* Note: we could also have used the built-in URL object, but it isn't supported on all platforms.

*

* See:

* - https://developer.mozilla.org/en-US/docs/Web/API/URL

* - https://caniuse.com/url

* - https://www.rfc-editor.org/rfc/rfc3986#appendix-B

*

* History of the parse() method:

* - first commit: https://github.com/socketio/socket.io-client/commit/4ee1d5d94b3906a9c052b459f1a818b15f38f91c

* - export into its own module: https://github.com/socketio/engine.io-client/commit/de2c561e4564efeb78f1bdb1ba39ef81b2822cb3

* - reimport: https://github.com/socketio/engine.io-client/commit/df32277c3f6d622eec5ed09f493cae3f3391d242

*

* @author Steven Levithan <stevenlevithan.com> (MIT license)

* @api private

*/
const re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
const parts = [
	"source",
	"protocol",
	"authority",
	"userInfo",
	"user",
	"password",
	"host",
	"port",
	"relative",
	"path",
	"directory",
	"file",
	"query",
	"anchor"
];
function parse(str) {
	if (str.length > 2e3) throw "URI too long";
	const src = str, b = str.indexOf("["), e = str.indexOf("]");
	if (b != -1 && e != -1) str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length);
	let m = re.exec(str || ""), uri = {}, i$1 = 14;
	while (i$1--) uri[parts[i$1]] = m[i$1] || "";
	if (b != -1 && e != -1) {
		uri.source = src;
		uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
		uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
		uri.ipv6uri = true;
	}
	uri.pathNames = pathNames(uri, uri["path"]);
	uri.queryKey = queryKey(uri, uri["query"]);
	return uri;
}
function pathNames(obj, path) {
	const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
	if (path.slice(0, 1) == "/" || path.length === 0) names.splice(0, 1);
	if (path.slice(-1) == "/") names.splice(names.length - 1, 1);
	return names;
}
function queryKey(uri, query) {
	const data = {};
	query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
		if ($1) data[$1] = $2;
	});
	return data;
}

//#endregion
//#region oh_modules/.ohpm/@yyz116+engine.io-client@1.0.2/oh_modules/@yyz116/engine.io-client/src/main/js/socket.ts
const debug$5 = debug_default("engine.io-client:socket");
var Socket$1 = class Socket$1 extends Emitter {
	id;
	transport;
	binaryType = defaultBinaryType;
	readyState;
	writeBuffer = [];
	prevBufferLen;
	upgrades;
	pingInterval;
	pingTimeout;
	pingTimeoutTimer;
	setTimeoutFn;
	clearTimeoutFn;
	beforeunloadEventListener;
	offlineEventListener;
	upgrading;
	maxPayload;
	opts;
	secure;
	hostname;
	port;
	transports;
	static priorWebsocketSuccess;
	static protocol = protocol$2;
	/**
	
	* Socket constructor.
	
	*
	
	* @param {String|Object} uri - uri or options
	
	* @param {Object} opts - options
	
	*/
	constructor(uri, opts = {}) {
		super();
		if (uri && "object" === typeof uri) {
			opts = uri;
			uri = null;
		}
		if (uri) {
			uri = parse(uri);
			opts.hostname = uri.host;
			opts.secure = uri.protocol === "https" || uri.protocol === "wss";
			opts.port = uri.port;
			if (uri.query) opts.query = uri.query;
		} else if (opts.host) opts.hostname = parse(opts.host).host;
		installTimerFunctions(this, opts);
		this.secure = null != opts.secure ? opts.secure : false;
		if (opts.hostname && !opts.port) opts.port = this.secure ? "443" : "80";
		this.hostname = opts.hostname || "localhost";
		this.port = opts.port || (this.secure ? "443" : "80");
		this.transports = opts.transports || [
			"websocket",
			"polling",
			"webtransport"
		];
		this.writeBuffer = [];
		this.prevBufferLen = 0;
		this.opts = Object.assign({
			path: "/engine.io",
			agent: false,
			withCredentials: false,
			upgrade: true,
			timestampParam: "t",
			rememberUpgrade: false,
			addTrailingSlash: true,
			rejectUnauthorized: true,
			perMessageDeflate: { threshold: 1024 },
			transportOptions: {},
			closeOnBeforeunload: false
		}, opts);
		this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : "");
		if (typeof this.opts.query === "string") this.opts.query = decode(this.opts.query);
		this.id = null;
		this.upgrades = null;
		this.pingInterval = null;
		this.pingTimeout = null;
		this.pingTimeoutTimer = null;
		this.open();
	}
	/**
	
	* Creates transport of the given type.
	
	*
	
	* @param {String} name - transport name
	
	* @return {Transport}
	
	* @private
	
	*/
	createTransport(name) {
		debug$5("creating transport \"%s\"", name);
		const query = Object.assign({}, this.opts.query);
		query.EIO = protocol$2;
		query.transport = name;
		if (this.id) query.sid = this.id;
		const opts = Object.assign({}, this.opts, {
			query,
			socket: this,
			hostname: this.hostname,
			secure: this.secure,
			port: this.port
		}, this.opts.transportOptions[name]);
		debug$5("options: %j", opts);
		return new transports[name](opts);
	}
	/**
	
	* Initializes transport to use and starts probe.
	
	*
	
	* @private
	
	*/
	open() {
		let transport;
		if (this.opts.rememberUpgrade && Socket$1.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) transport = "websocket";
		else if (0 === this.transports.length) {
			this.setTimeoutFn(() => {
				this._emitReserved("error", "No transports available");
			}, 0);
			return;
		} else transport = this.transports[0];
		this.readyState = "opening";
		try {
			transport = this.createTransport(transport);
		} catch (e) {
			debug$5("error while creating transport: %s", e);
			this.transports.shift();
			this.open();
			return;
		}
		transport.open();
		this.setTransport(transport);
	}
	/**
	
	* Sets the current transport. Disables the existing one (if any).
	
	*
	
	* @private
	
	*/
	setTransport(transport) {
		debug$5("setting transport %s", transport.name);
		if (this.transport) {
			debug$5("clearing existing transport %s", this.transport.name);
			this.transport.removeAllListeners();
		}
		this.transport = transport;
		transport.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", (reason) => this.onClose("transport close", reason));
	}
	/**
	
	* Probes a transport.
	
	*
	
	* @param {String} name - transport name
	
	* @private
	
	*/
	probe(name) {
		debug$5("probing transport \"%s\"", name);
		let transport = this.createTransport(name);
		let failed = false;
		Socket$1.priorWebsocketSuccess = false;
		const onTransportOpen = () => {
			if (failed) return;
			debug$5("probe transport \"%s\" opened", name);
			transport.send([{
				type: "ping",
				data: "probe"
			}]);
			transport.once("packet", (msg) => {
				if (failed) return;
				if ("pong" === msg.type && "probe" === msg.data) {
					debug$5("probe transport \"%s\" pong", name);
					this.upgrading = true;
					this._emitReserved("upgrading", transport);
					if (!transport) return;
					Socket$1.priorWebsocketSuccess = "websocket" === transport.name;
					debug$5("pausing current transport \"%s\"", this.transport.name);
					this.transport.pause(() => {
						if (failed) return;
						if ("closed" === this.readyState) return;
						debug$5("changing transport and sending upgrade packet");
						cleanup();
						this.setTransport(transport);
						transport.send([{ type: "upgrade" }]);
						this._emitReserved("upgrade", transport);
						transport = null;
						this.upgrading = false;
						this.flush();
					});
				} else {
					debug$5("probe transport \"%s\" failed", name);
					const err = /* @__PURE__ */ new Error("probe error");
					err.transport = transport.name;
					this._emitReserved("upgradeError", err);
				}
			});
		};
		function freezeTransport() {
			if (failed) return;
			failed = true;
			cleanup();
			transport.close();
			transport = null;
		}
		const onerror = (err) => {
			const error = /* @__PURE__ */ new Error("probe error: " + err);
			error.transport = transport.name;
			freezeTransport();
			debug$5("probe transport \"%s\" failed because of error: %s", name, err);
			this._emitReserved("upgradeError", error);
		};
		function onTransportClose() {
			onerror("transport closed");
		}
		function onclose() {
			onerror("socket closed");
		}
		function onupgrade(to) {
			if (transport && to.name !== transport.name) {
				debug$5("\"%s\" works - aborting \"%s\"", to.name, transport.name);
				freezeTransport();
			}
		}
		const cleanup = () => {
			transport.removeListener("open", onTransportOpen);
			transport.removeListener("error", onerror);
			transport.removeListener("close", onTransportClose);
			this.off("close", onclose);
			this.off("upgrading", onupgrade);
		};
		transport.once("open", onTransportOpen);
		transport.once("error", onerror);
		transport.once("close", onTransportClose);
		this.once("close", onclose);
		this.once("upgrading", onupgrade);
		if (this.upgrades.indexOf("webtransport") !== -1 && name !== "webtransport") this.setTimeoutFn(() => {
			if (!failed) transport.open();
		}, 200);
		else transport.open();
	}
	/**
	
	* Called when connection is deemed open.
	
	*
	
	* @private
	
	*/
	onOpen() {
		debug$5("socket open");
		this.readyState = "open";
		Socket$1.priorWebsocketSuccess = "websocket" === this.transport.name;
		this._emitReserved("open");
		this.flush();
		if ("open" === this.readyState && this.opts.upgrade) {
			debug$5("starting upgrade probes");
			let i$1 = 0;
			const l = this.upgrades.length;
			for (; i$1 < l; i$1++) this.probe(this.upgrades[i$1]);
		}
	}
	/**
	
	* Handles a packet.
	
	*
	
	* @private
	
	*/
	onPacket(packet) {
		if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
			debug$5("socket receive: type \"%s\", data \"%s\"", packet.type, packet.data);
			this._emitReserved("packet", packet);
			this._emitReserved("heartbeat");
			this.resetPingTimeout();
			switch (packet.type) {
				case "open":
					this.onHandshake(JSON.parse(packet.data));
					break;
				case "ping":
					this.sendPacket("pong");
					this._emitReserved("ping");
					this._emitReserved("pong");
					break;
				case "error":
					const err = /* @__PURE__ */ new Error("server error");
					err.code = packet.data;
					this.onError(err);
					break;
				case "message":
					this._emitReserved("data", packet.data);
					this._emitReserved("message", packet.data);
					break;
			}
		} else debug$5("packet received with socket readyState \"%s\"", this.readyState);
	}
	/**
	
	* Called upon handshake completion.
	
	*
	
	* @param {Object} data - handshake obj
	
	* @private
	
	*/
	onHandshake(data) {
		this._emitReserved("handshake", data);
		this.id = data.sid;
		this.transport.query.sid = data.sid;
		this.upgrades = this.filterUpgrades(data.upgrades);
		this.pingInterval = data.pingInterval;
		this.pingTimeout = data.pingTimeout;
		this.maxPayload = data.maxPayload;
		this.onOpen();
		if ("closed" === this.readyState) return;
		this.resetPingTimeout();
	}
	/**
	
	* Sets and resets ping timeout timer based on server pings.
	
	*
	
	* @private
	
	*/
	resetPingTimeout() {
		this.clearTimeoutFn(this.pingTimeoutTimer);
		this.pingTimeoutTimer = this.setTimeoutFn(() => {
			this.onClose("ping timeout");
		}, this.pingInterval + this.pingTimeout);
		if (this.opts.autoUnref) this.pingTimeoutTimer = 0;
	}
	/**
	
	* Called on `drain` event
	
	*
	
	* @private
	
	*/
	onDrain() {
		this.writeBuffer.splice(0, this.prevBufferLen);
		this.prevBufferLen = 0;
		if (0 === this.writeBuffer.length) this._emitReserved("drain");
		else this.flush();
	}
	/**
	
	* Flush write buffers.
	
	*
	
	* @private
	
	*/
	flush() {
		if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
			const packets = this.getWritablePackets();
			debug$5("flushing %d packets in socket", packets.length);
			this.transport.send(packets);
			this.prevBufferLen = packets.length;
			this._emitReserved("flush");
		}
	}
	/**
	
	* Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
	
	* long-polling)
	
	*
	
	* @private
	
	*/
	getWritablePackets() {
		const shouldCheckPayloadSize = this.maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1;
		if (!shouldCheckPayloadSize) return this.writeBuffer;
		let payloadSize = 1;
		for (let i$1 = 0; i$1 < this.writeBuffer.length; i$1++) {
			const data = this.writeBuffer[i$1].data;
			if (data) payloadSize += byteLength(data);
			if (i$1 > 0 && payloadSize > this.maxPayload) {
				debug$5("only send %d out of %d packets", i$1, this.writeBuffer.length);
				return this.writeBuffer.slice(0, i$1);
			}
			payloadSize += 2;
		}
		debug$5("payload size is %d (max: %d)", payloadSize, this.maxPayload);
		return this.writeBuffer;
	}
	/**
	
	* Sends a message.
	
	*
	
	* @param {String} msg - message.
	
	* @param {Object} options.
	
	* @param {Function} callback function.
	
	* @return {Socket} for chaining.
	
	*/
	write(msg, options, fn) {
		this.sendPacket("message", msg, options, fn);
		return this;
	}
	send(msg, options, fn) {
		this.sendPacket("message", msg, options, fn);
		return this;
	}
	/**
	
	* Sends a packet.
	
	*
	
	* @param {String} type: packet type.
	
	* @param {String} data.
	
	* @param {Object} options.
	
	* @param {Function} fn - callback function.
	
	* @private
	
	*/
	sendPacket(type, data, options, fn) {
		if ("function" === typeof data) {
			fn = data;
			data = void 0;
		}
		if ("function" === typeof options) {
			fn = options;
			options = null;
		}
		if ("closing" === this.readyState || "closed" === this.readyState) return;
		options = options || {};
		options.compress = false !== options.compress;
		const packet = {
			type,
			data,
			options
		};
		this._emitReserved("packetCreate", packet);
		this.writeBuffer.push(packet);
		if (fn) this.once("flush", fn);
		this.flush();
	}
	/**
	
	* Closes the connection.
	
	*/
	close() {
		const close = () => {
			this.onClose("forced close");
			debug$5("socket closing - telling transport to close");
			this.transport.close();
		};
		const cleanupAndClose = () => {
			this.off("upgrade", cleanupAndClose);
			this.off("upgradeError", cleanupAndClose);
			close();
		};
		const waitForUpgrade = () => {
			this.once("upgrade", cleanupAndClose);
			this.once("upgradeError", cleanupAndClose);
		};
		if ("opening" === this.readyState || "open" === this.readyState) {
			this.readyState = "closing";
			if (this.writeBuffer.length) this.once("drain", () => {
				if (this.upgrading) waitForUpgrade();
				else close();
			});
			else if (this.upgrading) waitForUpgrade();
			else close();
		}
		return this;
	}
	/**
	
	* Called upon transport error
	
	*
	
	* @private
	
	*/
	onError(err) {
		debug$5("socket error %j", err);
		Socket$1.priorWebsocketSuccess = false;
		this._emitReserved("error", err);
		this.onClose("transport error", err);
	}
	/**
	
	* Called upon transport close.
	
	*
	
	* @private
	
	*/
	onClose(reason, description) {
		if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
			debug$5("socket close with reason: \"%s\"", reason);
			this.clearTimeoutFn(this.pingTimeoutTimer);
			this.transport.removeAllListeners("close");
			this.transport.close();
			this.transport.removeAllListeners();
			this.readyState = "closed";
			this.id = null;
			this._emitReserved("close", reason, description);
			this.writeBuffer = [];
			this.prevBufferLen = 0;
		}
	}
	/**
	
	* Filters upgrades, returning only those matching client transports.
	
	*
	
	* @param {Array} upgrades - server upgrades
	
	* @private
	
	*/
	filterUpgrades(upgrades) {
		const filteredUpgrades = [];
		let i$1 = 0;
		const j = upgrades.length;
		for (; i$1 < j; i$1++) if (~this.transports.indexOf(upgrades[i$1])) filteredUpgrades.push(upgrades[i$1]);
		return filteredUpgrades;
	}
};

//#endregion
//#region oh_modules/.ohpm/@yyz116+engine.io-client@1.0.2/oh_modules/@yyz116/engine.io-client/src/main/js/index.ts
const protocol$1 = Socket$1.protocol;

//#endregion
//#region oh_modules/.ohpm/@yyz116+socket.io-client@1.0.2/oh_modules/@yyz116/socket.io-client/src/main/js/url.ts
const debug$4 = debug_default("socket.io-client:url");
/**

* URL parser.

*

* @param uri - url

* @param path - the request path of the connection

* @param loc - An object meant to mimic window.location.

*        Defaults to a mock object if not provided.

* @public

*/
function url(uri, path = "", loc) {
	let obj = uri;
	loc = loc || {
		protocol: "https:",
		host: "localhost",
		port: "80"
	};
	if (null == uri) uri = loc.protocol + "//" + loc.host;
	if (typeof uri === "string") {
		if ("/" === uri.charAt(0)) if ("/" === uri.charAt(1)) uri = loc.protocol + uri;
		else uri = loc.host + uri;
		if (!/^(https?|wss?):\/\//.test(uri)) if (loc) uri = loc.protocol + "//" + uri;
		else uri = "https://" + uri;
		obj = parse(uri);
	}
	if (!obj.port) {
		if (/^(http|ws)$/.test(obj.protocol)) obj.port = "80";
		else if (/^(http|ws)s$/.test(obj.protocol)) obj.port = "443";
	}
	obj.path = obj.path || "/";
	const ipv6 = obj.host.indexOf(":") !== -1;
	const host = ipv6 ? "[" + obj.host + "]" : obj.host;
	obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
	obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
	return obj;
}

//#endregion
//#region oh_modules/.ohpm/@yyz116+socket.io-parser@1.0.2/oh_modules/@yyz116/socket.io-parser/src/main/js/is-binary.ts
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const isView = (obj) => {
	return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
};
/**
* Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
*
* @private
*/
function isBinary(obj) {
	return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj));
}
function hasBinary(obj, toJSON) {
	if (!obj || typeof obj !== "object") return false;
	if (Array.isArray(obj)) {
		for (let i$1 = 0, l = obj.length; i$1 < l; i$1++) if (hasBinary(obj[i$1])) return true;
		return false;
	}
	if (isBinary(obj)) return true;
	if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) return hasBinary(obj.toJSON(), true);
	for (const key in obj) if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) return true;
	return false;
}

//#endregion
//#region oh_modules/.ohpm/@yyz116+socket.io-parser@1.0.2/oh_modules/@yyz116/socket.io-parser/src/main/js/binary.ts
/**
* Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
*
* @param {Object} packet - socket.io event packet
* @return {Object} with deconstructed packet and list of buffers
* @public
*/
function deconstructPacket(packet) {
	const buffers = [];
	const packetData = packet.data;
	const pack = packet;
	pack.data = _deconstructPacket(packetData, buffers);
	pack.attachments = buffers.length;
	return {
		packet: pack,
		buffers
	};
}
function _deconstructPacket(data, buffers) {
	if (!data) return data;
	if (isBinary(data)) {
		const placeholder = {
			_placeholder: true,
			num: buffers.length
		};
		buffers.push(data);
		return placeholder;
	} else if (Array.isArray(data)) {
		const newData = new Array(data.length);
		for (let i$1 = 0; i$1 < data.length; i$1++) newData[i$1] = _deconstructPacket(data[i$1], buffers);
		return newData;
	} else if (typeof data === "object" && !(data instanceof Date)) {
		const newData = {};
		for (const key in data) if (Object.prototype.hasOwnProperty.call(data, key)) newData[key] = _deconstructPacket(data[key], buffers);
		return newData;
	}
	return data;
}
/**
* Reconstructs a binary packet from its placeholder packet and buffers
*
* @param {Object} packet - event packet with placeholders
* @param {Array} buffers - binary buffers to put in placeholder positions
* @return {Object} reconstructed packet
* @public
*/
function reconstructPacket(packet, buffers) {
	packet.data = _reconstructPacket(packet.data, buffers);
	delete packet.attachments;
	return packet;
}
function _reconstructPacket(data, buffers) {
	if (!data) return data;
	if (data && data._placeholder === true) {
		const isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
		if (isIndexValid) return buffers[data.num];
		else throw new Error("illegal attachments");
	} else if (Array.isArray(data)) for (let i$1 = 0; i$1 < data.length; i$1++) data[i$1] = _reconstructPacket(data[i$1], buffers);
	else if (typeof data === "object") {
		for (const key in data) if (Object.prototype.hasOwnProperty.call(data, key)) data[key] = _reconstructPacket(data[key], buffers);
	}
	return data;
}

//#endregion
//#region oh_modules/.ohpm/@yyz116+socket.io-parser@1.0.2/oh_modules/@yyz116/socket.io-parser/src/main/js/index.ts
const debug$3 = debug_default("socket.io-parser");
/**
* These strings must not be used as event names, as they have a special meaning.
*/
const RESERVED_EVENTS$1 = [
	"connect",
	"connect_error",
	"disconnect",
	"disconnecting",
	"newListener",
	"removeListener"
];
/**
* Protocol version.
*
* @public
*/
const protocol = 5;
let PacketType = /* @__PURE__ */ function(PacketType$1) {
	PacketType$1[PacketType$1["CONNECT"] = 0] = "CONNECT";
	PacketType$1[PacketType$1["DISCONNECT"] = 1] = "DISCONNECT";
	PacketType$1[PacketType$1["EVENT"] = 2] = "EVENT";
	PacketType$1[PacketType$1["ACK"] = 3] = "ACK";
	PacketType$1[PacketType$1["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
	PacketType$1[PacketType$1["BINARY_EVENT"] = 5] = "BINARY_EVENT";
	PacketType$1[PacketType$1["BINARY_ACK"] = 6] = "BINARY_ACK";
	return PacketType$1;
}({});
/**
* A socket.io Encoder instance
*/
var Encoder = class {
	/**
	* Encoder constructor
	*
	* @param {function} replacer - custom replacer to pass down to JSON.parse
	*/
	constructor(replacer) {
		this.replacer = replacer;
	}
	/**
	* Encode a packet as a single string if non-binary, or as a
	* buffer sequence, depending on packet type.
	*
	* @param {Object} obj - packet object
	*/
	encode(obj) {
		debug$3("encoding packet %j", obj);
		if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
			if (hasBinary(obj)) return this.encodeAsBinary({
				type: obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
				nsp: obj.nsp,
				data: obj.data,
				id: obj.id
			});
		}
		return [this.encodeAsString(obj)];
	}
	/**
	* Encode packet as string.
	*/
	encodeAsString(obj) {
		let str = "" + obj.type;
		if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) str += obj.attachments + "-";
		if (obj.nsp && "/" !== obj.nsp) str += obj.nsp + ",";
		if (null != obj.id) str += obj.id;
		if (null != obj.data) str += JSON.stringify(obj.data, this.replacer);
		debug$3("encoded %j as %s", obj, str);
		return str;
	}
	/**
	* Encode packet as 'buffer sequence' by removing blobs, and
	* deconstructing packet into object with placeholders and
	* a list of buffers.
	*/
	encodeAsBinary(obj) {
		const deconstruction = deconstructPacket(obj);
		const pack = this.encodeAsString(deconstruction.packet);
		const buffers = deconstruction.buffers;
		buffers.unshift(pack);
		return buffers;
	}
};
/**
* A socket.io Decoder instance
*
* @return {Object} decoder
*/
var Decoder = class Decoder extends Emitter {
	reconstructor;
	/**
	* Decoder constructor
	*
	* @param {function} reviver - custom reviver to pass down to JSON.stringify
	*/
	constructor(reviver) {
		super();
		this.reviver = reviver;
	}
	/**
	* Decodes an encoded packet string into packet JSON.
	*
	* @param {String} obj - encoded packet
	*/
	add(obj) {
		let packet;
		if (typeof obj === "string") {
			if (this.reconstructor) throw new Error("got plaintext data when reconstructing a packet");
			packet = this.decodeString(obj);
			const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
			if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
				packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
				this.reconstructor = new BinaryReconstructor(packet);
				if (packet.attachments === 0) super._emitReserved("decoded", packet);
			} else super._emitReserved("decoded", packet);
		} else if (isBinary(obj) || obj.base64) if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
		else {
			packet = this.reconstructor.takeBinaryData(obj);
			if (packet) {
				this.reconstructor = null;
				super._emitReserved("decoded", packet);
			}
		}
		else throw new Error("Unknown type: " + obj);
	}
	/**
	* Decode a packet String (JSON data)
	*
	* @param {String} str
	* @return {Object} packet
	*/
	decodeString(str) {
		let i$1 = 0;
		const p = { type: Number(str.charAt(0)) };
		if (PacketType[p.type] === void 0) throw new Error("unknown packet type " + p.type);
		if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
			const start = i$1 + 1;
			while (str.charAt(++i$1) !== "-" && i$1 != str.length);
			const buf = str.substring(start, i$1);
			if (buf != Number(buf) || str.charAt(i$1) !== "-") throw new Error("Illegal attachments");
			p.attachments = Number(buf);
		}
		if ("/" === str.charAt(i$1 + 1)) {
			const start = i$1 + 1;
			while (++i$1) {
				const c = str.charAt(i$1);
				if ("," === c) break;
				if (i$1 === str.length) break;
			}
			p.nsp = str.substring(start, i$1);
		} else p.nsp = "/";
		const next = str.charAt(i$1 + 1);
		if ("" !== next && Number(next) == next) {
			const start = i$1 + 1;
			while (++i$1) {
				const c = str.charAt(i$1);
				if (null == c || Number(c) != c) {
					--i$1;
					break;
				}
				if (i$1 === str.length) break;
			}
			p.id = Number(str.substring(start, i$1 + 1));
		}
		if (str.charAt(++i$1)) {
			const payload = this.tryParse(str.substr(i$1));
			if (Decoder.isPayloadValid(p.type, payload)) p.data = payload;
			else throw new Error("invalid payload");
		}
		debug$3("decoded %s as %j", str, p);
		return p;
	}
	tryParse(str) {
		try {
			return JSON.parse(str, this.reviver);
		} catch (e) {
			return false;
		}
	}
	static isPayloadValid(type, payload) {
		switch (type) {
			case PacketType.CONNECT: return isObject(payload);
			case PacketType.DISCONNECT: return payload === void 0;
			case PacketType.CONNECT_ERROR: return typeof payload === "string" || isObject(payload);
			case PacketType.EVENT:
			case PacketType.BINARY_EVENT: return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS$1.indexOf(payload[0]) === -1);
			case PacketType.ACK:
			case PacketType.BINARY_ACK: return Array.isArray(payload);
		}
	}
	/**
	* Deallocates a parser's resources
	*/
	destroy() {
		if (this.reconstructor) {
			this.reconstructor.finishedReconstruction();
			this.reconstructor = null;
		}
	}
};
/**
* A manager of a binary event's 'buffer sequence'. Should
* be constructed whenever a packet of type BINARY_EVENT is
* decoded.
*
* @param {Object} packet
* @return {BinaryReconstructor} initialized reconstructor
*/
var BinaryReconstructor = class {
	reconPack;
	buffers = [];
	constructor(packet) {
		this.packet = packet;
		this.reconPack = packet;
	}
	/**
	* Method to be called when binary data received from connection
	* after a BINARY_EVENT packet.
	*
	* @param {Buffer | ArrayBuffer} binData - the raw binary data received
	* @return {null | Object} returns null if more binary data is expected or
	*   a reconstructed packet object if all buffers have been received.
	*/
	takeBinaryData(binData) {
		this.buffers.push(binData);
		if (this.buffers.length === this.reconPack.attachments) {
			const packet = reconstructPacket(this.reconPack, this.buffers);
			this.finishedReconstruction();
			return packet;
		}
		return null;
	}
	/**
	* Cleans up binary packet reconstruction variables.
	*/
	finishedReconstruction() {
		this.reconPack = null;
		this.buffers = [];
	}
};
const isInteger = Number.isInteger || function(value) {
	return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};
function isObject(value) {
	return Object.prototype.toString.call(value) === "[object Object]";
}

//#endregion
//#region oh_modules/.ohpm/@yyz116+socket.io-parser@1.0.2/oh_modules/@yyz116/socket.io-parser/index.ts
var socket_exports = {};
__export(socket_exports, {
	Decoder: () => Decoder,
	Encoder: () => Encoder,
	PacketType: () => PacketType,
	protocol: () => protocol
});

//#endregion
//#region oh_modules/.ohpm/@yyz116+socket.io-client@1.0.2/oh_modules/@yyz116/socket.io-client/src/main/js/on.ts
function on(obj, ev, fn) {
	obj.on(ev, fn);
	return function subDestroy() {
		obj.off(ev, fn);
	};
}

//#endregion
//#region oh_modules/.ohpm/@yyz116+socket.io-client@1.0.2/oh_modules/@yyz116/socket.io-client/src/main/js/socket.ts
const debug$2 = debug_default("socket.io-client:socket");
/**

* Internal events.

* These events can't be emitted by the user.

*/
const RESERVED_EVENTS = Object.freeze({
	connect: 1,
	connect_error: 1,
	disconnect: 1,
	disconnecting: 1,
	newListener: 1,
	removeListener: 1
});
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
var Socket = class extends Emitter {
	io;
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
	id;
	/**
	
	* The session ID used for connection state recovery, which must not be shared (unlike {@link id}).
	
	*
	
	* @private
	
	*/
	_pid;
	/**
	
	* The offset of the last received packet, which will be sent upon reconnection to allow for the recovery of the connection state.
	
	*
	
	* @private
	
	*/
	_lastOffset;
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
	connected = false;
	/**
	
	* Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
	
	* be transmitted by the server.
	
	*/
	recovered = false;
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
	auth;
	/**
	
	* Buffer for packets received before the CONNECT packet
	
	*/
	receiveBuffer = [];
	/**
	
	* Buffer for packets that will be sent once the socket is connected
	
	*/
	sendBuffer = [];
	/**
	
	* The queue of packets to be sent with retry in case of failure.
	
	*
	
	* Packets are sent one by one, each waiting for the server acknowledgement, in order to guarantee the delivery order.
	
	* @private
	
	*/
	_queue = [];
	/**
	
	* A sequence to generate the ID of the {@link QueuedPacket}.
	
	* @private
	
	*/
	_queueSeq = 0;
	nsp;
	_opts;
	ids = 0;
	acks = {};
	flags = {};
	subs;
	_anyListeners;
	_anyOutgoingListeners;
	/**
	
	* `Socket` constructor.
	
	*/
	constructor(io, nsp, opts) {
		super();
		this.io = io;
		this.nsp = nsp;
		if (opts && opts.auth) this.auth = opts.auth;
		this._opts = Object.assign({}, opts);
		if (this.io._autoConnect) this.open();
	}
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
	get disconnected() {
		return !this.connected;
	}
	/**
	
	* Subscribe to open, close and packet events
	
	*
	
	* @private
	
	*/
	subEvents() {
		if (this.subs) return;
		const io = this.io;
		this.subs = [
			on(io, "open", this.onopen.bind(this)),
			on(io, "packet", this.onpacket.bind(this)),
			on(io, "error", this.onerror.bind(this)),
			on(io, "close", this.onclose.bind(this))
		];
	}
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
	get active() {
		return !!this.subs;
	}
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
	connect() {
		if (this.connected) return this;
		this.subEvents();
		if (!this.io["_reconnecting"]) this.io.open();
		if ("open" === this.io._readyState) this.onopen();
		return this;
	}
	/**
	
	* Alias for {@link connect()}.
	
	*/
	open() {
		return this.connect();
	}
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
	send(...args) {
		args.unshift("message");
		this.emit.apply(this, args);
		return this;
	}
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
	emit(ev, ...args) {
		if (RESERVED_EVENTS.hasOwnProperty(ev)) throw new Error("\"" + ev.toString() + "\" is a reserved event name");
		args.unshift(ev);
		if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
			this._addToQueue(args);
			return this;
		}
		const packet = {
			type: PacketType.EVENT,
			data: args
		};
		packet.options = {};
		packet.options.compress = this.flags.compress !== false;
		if ("function" === typeof args[args.length - 1]) {
			const id = this.ids++;
			debug$2("emitting packet with ack id %d", id);
			const ack = args.pop();
			this._registerAckCallback(id, ack);
			packet.id = id;
		}
		const isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
		const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
		if (discardPacket) debug$2("discard packet as the transport is not currently writable");
		else if (this.connected) {
			this.notifyOutgoingListeners(packet);
			this.packet(packet);
		} else this.sendBuffer.push(packet);
		this.flags = {};
		return this;
	}
	/**
	
	* @private
	
	*/
	_registerAckCallback(id, ack) {
		const timeout = this.flags.timeout ?? this._opts.ackTimeout;
		if (timeout === void 0) {
			this.acks[id] = ack;
			return;
		}
		const timer = this.io.setTimeoutFn(() => {
			delete this.acks[id];
			for (let i$1 = 0; i$1 < this.sendBuffer.length; i$1++) if (this.sendBuffer[i$1].id === id) {
				debug$2("removing packet with ack id %d from the buffer", id);
				this.sendBuffer.splice(i$1, 1);
			}
			debug$2("event with ack id %d has timed out after %d ms", id, timeout);
			ack.call(this, /* @__PURE__ */ new Error("operation has timed out"));
		}, timeout);
		this.acks[id] = (...args) => {
			this.io.clearTimeoutFn(timer);
			ack.apply(this, [null, ...args]);
		};
	}
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
	emitWithAck(ev, ...args) {
		const withErr = this.flags.timeout !== void 0 || this._opts.ackTimeout !== void 0;
		return new Promise((resolve, reject) => {
			args.push((arg1, arg2) => {
				if (withErr) return arg1 ? reject(arg1) : resolve(arg2);
				else return resolve(arg1);
			});
			this.emit(ev, ...args);
		});
	}
	/**
	
	* Add the packet to the queue.
	
	* @param args
	
	* @private
	
	*/
	_addToQueue(args) {
		let ack;
		if (typeof args[args.length - 1] === "function") ack = args.pop();
		const packet = {
			id: this._queueSeq++,
			tryCount: 0,
			pending: false,
			args,
			flags: Object.assign({ fromQueue: true }, this.flags)
		};
		args.push((err, ...responseArgs) => {
			if (packet !== this._queue[0]) return;
			const hasError = err !== null;
			if (hasError) {
				if (packet.tryCount > this._opts.retries) {
					debug$2("packet [%d] is discarded after %d tries", packet.id, packet.tryCount);
					this._queue.shift();
					if (ack) ack(err);
				}
			} else {
				debug$2("packet [%d] was successfully sent", packet.id);
				this._queue.shift();
				if (ack) ack(null, ...responseArgs);
			}
			packet.pending = false;
			return this._drainQueue();
		});
		this._queue.push(packet);
		this._drainQueue();
	}
	/**
	
	* Send the first packet of the queue, and wait for an acknowledgement from the server.
	
	* @param force - whether to resend a packet that has not been acknowledged yet
	
	*
	
	* @private
	
	*/
	_drainQueue(force = false) {
		debug$2("draining queue");
		if (!this.connected || this._queue.length === 0) return;
		const packet = this._queue[0];
		if (packet.pending && !force) {
			debug$2("packet [%d] has already been sent and is waiting for an ack", packet.id);
			return;
		}
		packet.pending = true;
		packet.tryCount++;
		debug$2("sending packet [%d] (try n°%d)", packet.id, packet.tryCount);
		this.flags = packet.flags;
		this.emit.apply(this, packet.args);
	}
	/**
	
	* Sends a packet.
	
	*
	
	* @param packet
	
	* @private
	
	*/
	packet(packet) {
		packet.nsp = this.nsp;
		this.io._packet(packet);
	}
	/**
	
	* Called upon engine `open`.
	
	*
	
	* @private
	
	*/
	onopen() {
		debug$2("transport is open - connecting");
		if (typeof this.auth == "function") this.auth((data) => {
			this._sendConnectPacket(data);
		});
		else this._sendConnectPacket(this.auth);
	}
	/**
	
	* Sends a CONNECT packet to initiate the Socket.IO session.
	
	*
	
	* @param data
	
	* @private
	
	*/
	_sendConnectPacket(data) {
		this.packet({
			type: PacketType.CONNECT,
			data: this._pid ? Object.assign({
				pid: this._pid,
				offset: this._lastOffset
			}, data) : data
		});
	}
	/**
	
	* Called upon engine or manager `error`.
	
	*
	
	* @param err
	
	* @private
	
	*/
	onerror(err) {
		if (!this.connected) this._emitReserved("connect_error", err);
	}
	/**
	
	* Called upon engine `close`.
	
	*
	
	* @param reason
	
	* @param description
	
	* @private
	
	*/
	onclose(reason, description) {
		debug$2("close (%s)", reason);
		this.connected = false;
		delete this.id;
		this._emitReserved("disconnect", reason, description);
	}
	/**
	
	* Called with socket packet.
	
	*
	
	* @param packet
	
	* @private
	
	*/
	onpacket(packet) {
		const sameNamespace = packet.nsp === this.nsp;
		if (!sameNamespace) return;
		switch (packet.type) {
			case PacketType.CONNECT:
				if (packet.data && packet.data.sid) this.onconnect(packet.data.sid, packet.data.pid);
				else this._emitReserved("connect_error", /* @__PURE__ */ new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
				break;
			case PacketType.EVENT:
			case PacketType.BINARY_EVENT:
				this.onevent(packet);
				break;
			case PacketType.ACK:
			case PacketType.BINARY_ACK:
				this.onack(packet);
				break;
			case PacketType.DISCONNECT:
				this.ondisconnect();
				break;
			case PacketType.CONNECT_ERROR:
				this.destroy();
				const err = new Error(packet.data.message);
				err.data = packet.data.data;
				this._emitReserved("connect_error", err);
				break;
		}
	}
	/**
	
	* Called upon a server event.
	
	*
	
	* @param packet
	
	* @private
	
	*/
	onevent(packet) {
		const args = packet.data || [];
		debug$2("emitting event %j", args);
		if (null != packet.id) {
			debug$2("attaching ack callback to event");
			args.push(this.ack(packet.id));
		}
		if (this.connected) this.emitEvent(args);
		else this.receiveBuffer.push(Object.freeze(args));
	}
	emitEvent(args) {
		if (this._anyListeners && this._anyListeners.length) {
			const listeners = this._anyListeners.slice();
			for (const listener of listeners) listener.apply(this, args);
		}
		super.emit.apply(this, args);
		if (this._pid && args.length && typeof args[args.length - 1] === "string") this._lastOffset = args[args.length - 1];
	}
	/**
	
	* Produces an ack callback to emit with an event.
	
	*
	
	* @private
	
	*/
	ack(id) {
		const self = this;
		let sent = false;
		return function(...args) {
			if (sent) return;
			sent = true;
			debug$2("sending ack %j", args);
			self.packet({
				type: PacketType.ACK,
				id,
				data: args
			});
		};
	}
	/**
	
	* Called upon a server acknowlegement.
	
	*
	
	* @param packet
	
	* @private
	
	*/
	onack(packet) {
		const ack = this.acks[packet.id];
		if ("function" === typeof ack) {
			debug$2("calling ack %s with %j", packet.id, packet.data);
			ack.apply(this, packet.data);
			delete this.acks[packet.id];
		} else debug$2("bad ack %s", packet.id);
	}
	/**
	
	* Called upon server connect.
	
	*
	
	* @private
	
	*/
	onconnect(id, pid) {
		debug$2("socket connected with id %s", id);
		this.id = id;
		this.recovered = pid && this._pid === pid;
		this._pid = pid;
		this.connected = true;
		this.emitBuffered();
		this._emitReserved("connect");
		this._drainQueue(true);
	}
	/**
	
	* Emit buffered events (received and emitted).
	
	*
	
	* @private
	
	*/
	emitBuffered() {
		this.receiveBuffer.forEach((args) => this.emitEvent(args));
		this.receiveBuffer = [];
		this.sendBuffer.forEach((packet) => {
			this.notifyOutgoingListeners(packet);
			this.packet(packet);
		});
		this.sendBuffer = [];
	}
	/**
	
	* Called upon server disconnect.
	
	*
	
	* @private
	
	*/
	ondisconnect() {
		debug$2("server disconnect (%s)", this.nsp);
		this.destroy();
		this.onclose("io server disconnect");
	}
	/**
	
	* Called upon forced client/server side disconnections,
	
	* this method ensures the manager stops tracking us and
	
	* that reconnections don't get triggered for this.
	
	*
	
	* @private
	
	*/
	destroy() {
		if (this.subs) {
			this.subs.forEach((subDestroy) => subDestroy());
			this.subs = void 0;
		}
		this.io["_destroy"](this);
	}
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
	disconnect() {
		if (this.connected) {
			debug$2("performing disconnect (%s)", this.nsp);
			this.packet({ type: PacketType.DISCONNECT });
		}
		this.destroy();
		if (this.connected) this.onclose("io client disconnect");
		return this;
	}
	/**
	
	* Alias for {@link disconnect()}.
	
	*
	
	* @return self
	
	*/
	close() {
		return this.disconnect();
	}
	/**
	
	* Sets the compress flag.
	
	*
	
	* @example
	
	* socket.compress(false).emit("hello");
	
	*
	
	* @param compress - if `true`, compresses the sending data
	
	* @return self
	
	*/
	compress(compress) {
		this.flags.compress = compress;
		return this;
	}
	/**
	
	* Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
	
	* ready to send messages.
	
	*
	
	* @example
	
	* socket.volatile.emit("hello"); // the server may or may not receive it
	
	*
	
	* @returns self
	
	*/
	get volatile() {
		this.flags.volatile = true;
		return this;
	}
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
	timeout(timeout) {
		this.flags.timeout = timeout;
		return this;
	}
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
	onAny(listener) {
		this._anyListeners = this._anyListeners || [];
		this._anyListeners.push(listener);
		return this;
	}
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
	prependAny(listener) {
		this._anyListeners = this._anyListeners || [];
		this._anyListeners.unshift(listener);
		return this;
	}
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
	offAny(listener) {
		if (!this._anyListeners) return this;
		if (listener) {
			const listeners = this._anyListeners;
			for (let i$1 = 0; i$1 < listeners.length; i$1++) if (listener === listeners[i$1]) {
				listeners.splice(i$1, 1);
				return this;
			}
		} else this._anyListeners = [];
		return this;
	}
	/**
	
	* Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
	
	* e.g. to remove listeners.
	
	*/
	listenersAny() {
		return this._anyListeners || [];
	}
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
	onAnyOutgoing(listener) {
		this._anyOutgoingListeners = this._anyOutgoingListeners || [];
		this._anyOutgoingListeners.push(listener);
		return this;
	}
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
	prependAnyOutgoing(listener) {
		this._anyOutgoingListeners = this._anyOutgoingListeners || [];
		this._anyOutgoingListeners.unshift(listener);
		return this;
	}
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
	offAnyOutgoing(listener) {
		if (!this._anyOutgoingListeners) return this;
		if (listener) {
			const listeners = this._anyOutgoingListeners;
			for (let i$1 = 0; i$1 < listeners.length; i$1++) if (listener === listeners[i$1]) {
				listeners.splice(i$1, 1);
				return this;
			}
		} else this._anyOutgoingListeners = [];
		return this;
	}
	/**
	
	* Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
	
	* e.g. to remove listeners.
	
	*/
	listenersAnyOutgoing() {
		return this._anyOutgoingListeners || [];
	}
	/**
	
	* Notify the listeners for each packet sent
	
	*
	
	* @param packet
	
	*
	
	* @private
	
	*/
	notifyOutgoingListeners(packet) {
		if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
			const listeners = this._anyOutgoingListeners.slice();
			for (const listener of listeners) listener.apply(this, packet.data);
		}
	}
};

//#endregion
//#region oh_modules/.ohpm/@yyz116+socket.io-client@1.0.2/oh_modules/@yyz116/socket.io-client/src/main/js/contrib/backo2.ts
/**

* Initialize backoff timer with `opts`.

*

* - `min` initial timeout in milliseconds [100]

* - `max` max timeout [10000]

* - `jitter` [0]

* - `factor` [2]

*

* @param {Object} opts

* @api public

*/
function Backoff(opts) {
	opts = opts || {};
	this.ms = opts.min || 100;
	this.max = opts.max || 1e4;
	this.factor = opts.factor || 2;
	this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
	this.attempts = 0;
}
/**

* Return the backoff duration.

*

* @return {Number}

* @api public

*/
Backoff.prototype.duration = function() {
	var ms = this.ms * Math.pow(this.factor, this.attempts++);
	if (this.jitter) {
		var rand = Math.random();
		var deviation = Math.floor(rand * this.jitter * ms);
		ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
	}
	return Math.min(ms, this.max) | 0;
};
/**

* Reset the number of attempts.

*

* @api public

*/
Backoff.prototype.reset = function() {
	this.attempts = 0;
};
/**

* Set the minimum duration

*

* @api public

*/
Backoff.prototype.setMin = function(min) {
	this.ms = min;
};
/**

* Set the maximum duration

*

* @api public

*/
Backoff.prototype.setMax = function(max) {
	this.max = max;
};
/**

* Set the jitter

*

* @api public

*/
Backoff.prototype.setJitter = function(jitter) {
	this.jitter = jitter;
};

//#endregion
//#region oh_modules/.ohpm/@yyz116+socket.io-client@1.0.2/oh_modules/@yyz116/socket.io-client/src/main/js/manager.ts
const debug$1 = debug_default("socket.io-client:manager");
var Manager = class extends Emitter {
	/**
	
	* The Engine.IO client instance
	
	*
	
	* @public
	
	*/
	engine;
	/**
	
	* @private
	
	*/
	_autoConnect;
	/**
	
	* @private
	
	*/
	_readyState;
	/**
	
	* @private
	
	*/
	_reconnecting;
	uri;
	opts;
	nsps = {};
	subs = [];
	backoff;
	setTimeoutFn;
	clearTimeoutFn;
	_reconnection;
	_reconnectionAttempts;
	_reconnectionDelay;
	_randomizationFactor;
	_reconnectionDelayMax;
	_timeout;
	encoder;
	decoder;
	skipReconnect;
	constructor(uri, opts) {
		super();
		if (uri && "object" === typeof uri) {
			opts = uri;
			uri = void 0;
		}
		opts = opts || {};
		opts.path = opts.path || "/socket.io";
		this.opts = opts;
		installTimerFunctions(this, opts);
		this.reconnection(opts.reconnection !== false);
		this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
		this.reconnectionDelay(opts.reconnectionDelay || 1e3);
		this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
		this.randomizationFactor(opts.randomizationFactor ?? .5);
		this.backoff = new Backoff({
			min: this.reconnectionDelay(),
			max: this.reconnectionDelayMax(),
			jitter: this.randomizationFactor()
		});
		this.timeout(null == opts.timeout ? 2e4 : opts.timeout);
		this._readyState = "closed";
		this.uri = uri;
		const _parser = opts.parser || socket_exports;
		this.encoder = new _parser.Encoder();
		this.decoder = new _parser.Decoder();
		this._autoConnect = opts.autoConnect !== false;
		if (this._autoConnect) this.open();
	}
	reconnection(v) {
		if (!arguments.length) return this._reconnection;
		this._reconnection = !!v;
		return this;
	}
	reconnectionAttempts(v) {
		if (v === void 0) return this._reconnectionAttempts;
		this._reconnectionAttempts = v;
		return this;
	}
	reconnectionDelay(v) {
		if (v === void 0) return this._reconnectionDelay;
		this._reconnectionDelay = v;
		this.backoff?.setMin(v);
		return this;
	}
	randomizationFactor(v) {
		if (v === void 0) return this._randomizationFactor;
		this._randomizationFactor = v;
		this.backoff?.setJitter(v);
		return this;
	}
	reconnectionDelayMax(v) {
		if (v === void 0) return this._reconnectionDelayMax;
		this._reconnectionDelayMax = v;
		this.backoff?.setMax(v);
		return this;
	}
	timeout(v) {
		if (!arguments.length) return this._timeout;
		this._timeout = v;
		return this;
	}
	/**
	
	* Starts trying to reconnect if reconnection is enabled and we have not
	
	* started reconnecting yet
	
	*
	
	* @private
	
	*/
	maybeReconnectOnOpen() {
		if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) this.reconnect();
	}
	/**
	
	* Sets the current transport `socket`.
	
	*
	
	* @param {Function} fn - optional, callback
	
	* @return self
	
	* @public
	
	*/
	open(fn) {
		debug$1("readyState %s", this._readyState);
		if (~this._readyState.indexOf("open")) return this;
		debug$1("opening %s", this.uri);
		this.engine = new Socket$1(this.uri, this.opts);
		const socket = this.engine;
		const self = this;
		this._readyState = "opening";
		this.skipReconnect = false;
		const openSubDestroy = on(socket, "open", function() {
			self.onopen();
			fn && fn();
		});
		const onError = (err) => {
			debug$1("error");
			this.cleanup();
			this._readyState = "closed";
			this._emitReserved("error", err);
			if (fn) fn(err);
			else this.maybeReconnectOnOpen();
		};
		const errorSub = on(socket, "error", onError);
		if (false !== this._timeout) {
			const timeout = this._timeout;
			debug$1("connect attempt will timeout after %d", timeout);
			const timer = this.setTimeoutFn(() => {
				debug$1("connect attempt timed out after %d", timeout);
				openSubDestroy();
				onError(/* @__PURE__ */ new Error("timeout"));
				socket.close();
			}, timeout);
			if (this.opts.autoUnref) {}
			this.subs.push(() => {
				this.clearTimeoutFn(timer);
			});
		}
		this.subs.push(openSubDestroy);
		this.subs.push(errorSub);
		return this;
	}
	/**
	
	* Alias for open()
	
	*
	
	* @return self
	
	* @public
	
	*/
	connect(fn) {
		return this.open(fn);
	}
	/**
	
	* Called upon transport open.
	
	*
	
	* @private
	
	*/
	onopen() {
		debug$1("open");
		this.cleanup();
		this._readyState = "open";
		this._emitReserved("open");
		const socket = this.engine;
		this.subs.push(on(socket, "ping", this.onping.bind(this)), on(socket, "data", this.ondata.bind(this)), on(socket, "error", this.onerror.bind(this)), on(socket, "close", this.onclose.bind(this)), on(this.decoder, "decoded", this.ondecoded.bind(this)));
	}
	/**
	
	* Called upon a ping.
	
	*
	
	* @private
	
	*/
	onping() {
		this._emitReserved("ping");
	}
	/**
	
	* Called with data.
	
	*
	
	* @private
	
	*/
	ondata(data) {
		try {
			this.decoder.add(data);
		} catch (e) {
			this.onclose("parse error", e);
		}
	}
	/**
	
	* Called when parser fully decodes a packet.
	
	*
	
	* @private
	
	*/
	ondecoded(packet) {
		nextTick(() => {
			this._emitReserved("packet", packet);
		}, this.setTimeoutFn);
	}
	/**
	
	* Called upon socket error.
	
	*
	
	* @private
	
	*/
	onerror(err) {
		debug$1("error", err);
		this._emitReserved("error", err);
	}
	/**
	
	* Creates a new socket for the given `nsp`.
	
	*
	
	* @return {Socket}
	
	* @public
	
	*/
	socket(nsp, opts) {
		let socket = this.nsps[nsp];
		if (!socket) {
			socket = new Socket(this, nsp, opts);
			this.nsps[nsp] = socket;
		} else if (this._autoConnect && !socket.active) socket.connect();
		return socket;
	}
	/**
	
	* Called upon a socket close.
	
	*
	
	* @param socket
	
	* @private
	
	*/
	_destroy(socket) {
		const nsps = Object.keys(this.nsps);
		for (const nsp of nsps) {
			const socket$1 = this.nsps[nsp];
			if (socket$1.active) {
				debug$1("socket %s is still active, skipping close", nsp);
				return;
			}
		}
		this._close();
	}
	/**
	
	* Writes a packet.
	
	*
	
	* @param packet
	
	* @private
	
	*/
	_packet(packet) {
		debug$1("writing packet %j", packet);
		const encodedPackets = this.encoder.encode(packet);
		for (let i$1 = 0; i$1 < encodedPackets.length; i$1++) this.engine.write(encodedPackets[i$1], packet.options);
	}
	/**
	
	* Clean up transport subscriptions and packet buffer.
	
	*
	
	* @private
	
	*/
	cleanup() {
		debug$1("cleanup");
		this.subs.forEach((subDestroy) => subDestroy());
		this.subs.length = 0;
		this.decoder.destroy();
	}
	/**
	
	* Close the current socket.
	
	*
	
	* @private
	
	*/
	_close() {
		debug$1("disconnect");
		this.skipReconnect = true;
		this._reconnecting = false;
		this.onclose("forced close");
		if (this.engine) this.engine.close();
	}
	/**
	
	* Alias for close()
	
	*
	
	* @private
	
	*/
	disconnect() {
		return this._close();
	}
	/**
	
	* Called upon engine close.
	
	*
	
	* @private
	
	*/
	onclose(reason, description) {
		debug$1("closed due to %s", reason);
		this.cleanup();
		this.backoff.reset();
		this._readyState = "closed";
		this._emitReserved("close", reason, description);
		if (this._reconnection && !this.skipReconnect) this.reconnect();
	}
	/**
	
	* Attempt a reconnection.
	
	*
	
	* @private
	
	*/
	reconnect() {
		if (this._reconnecting || this.skipReconnect) return this;
		const self = this;
		if (this.backoff.attempts >= this._reconnectionAttempts) {
			debug$1("reconnect failed");
			this.backoff.reset();
			this._emitReserved("reconnect_failed");
			this._reconnecting = false;
		} else {
			const delay = this.backoff.duration();
			debug$1("will wait %dms before reconnect attempt", delay);
			this._reconnecting = true;
			const timer = this.setTimeoutFn(() => {
				if (self.skipReconnect) return;
				debug$1("attempting reconnect");
				this._emitReserved("reconnect_attempt", self.backoff.attempts);
				if (self.skipReconnect) return;
				self.open((err) => {
					if (err) {
						debug$1("reconnect attempt error");
						self._reconnecting = false;
						self.reconnect();
						this._emitReserved("reconnect_error", err);
					} else {
						debug$1("reconnect success");
						self.onreconnect();
					}
				});
			}, delay);
			if (this.opts.autoUnref) {}
			this.subs.push(() => {
				this.clearTimeoutFn(timer);
			});
		}
	}
	/**
	
	* Called upon successful reconnect.
	
	*
	
	* @private
	
	*/
	onreconnect() {
		const attempt = this.backoff.attempts;
		this._reconnecting = false;
		this.backoff.reset();
		this._emitReserved("reconnect", attempt);
	}
};

//#endregion
//#region oh_modules/.ohpm/@yyz116+socket.io-client@1.0.2/oh_modules/@yyz116/socket.io-client/src/main/js/index.ts
const debug = debug_default("socket.io-client");
/**

* Managers cache.

*/
const cache = {};
function lookup(uri, opts) {
	if (typeof uri === "object") {
		opts = uri;
		uri = void 0;
	}
	opts = opts || {};
	const parsed = url(uri, opts.path || "/socket.io");
	const source = parsed.source;
	const id = parsed.id;
	const path = parsed.path;
	const sameNamespace = cache[id] && path in cache[id]["nsps"];
	const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
	let io;
	if (newConnection) {
		debug("ignoring socket cache for %s", source);
		io = new Manager(source, opts);
	} else {
		if (!cache[id]) {
			debug("new io instance for %s", source);
			cache[id] = new Manager(source, opts);
		}
		io = cache[id];
	}
	if (parsed.query && !opts.query) opts.query = parsed.queryKey;
	return io.socket(parsed.path, opts);
}
Object.assign(lookup, {
	Manager,
	Socket,
	io: lookup,
	connect: lookup
});

//#endregion
export { Manager, Socket, lookup as connect, lookup as default, lookup as io, protocol };