import { parse } from "@yyz116/engine.io-client";
import debugModule from "@yyz116/debug"; // debug()

const debug = debugModule("socket.io-client:url"); // debug()

type ParsedUrl = {
  source: string;
  protocol: string;
  authority: string;
  userInfo: string;
  user: string;
  password: string;
  host: string;
  port: string;
  relative: string;
  path: string;
  directory: string;
  file: string;
  query: string;
  anchor: string;
  pathNames: Array<string>;
  queryKey: { [key: string]: string };

  // Custom properties (not native to parseuri):
  id: string;
  href: string;
};

/**
 * URL parser.
 *
 * @param uri - url
 * @param path - the request path of the connection
 * @param loc - An object meant to mimic window.location.
 *        Defaults to a mock object if not provided.
 * @public
 */
export function url(
  uri: string | ParsedUrl,
  path: string = "",
  loc?: { protocol: string; host: string; port: string }
): ParsedUrl {
  let obj = uri as ParsedUrl;

  // default to a mock location object
  loc = loc || { protocol: "https:", host: "localhost", port: "80" };
  if (null == uri) uri = loc.protocol + "//" + loc.host;

  // relative path support
  if (typeof uri === "string") {
    if ("/" === uri.charAt(0)) {
      if ("/" === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }

    if (!/^(https?|wss?):\/\//.test(uri)) {
      if (loc) {
        uri = loc.protocol + "//" + uri;
      } else {
        uri = "https://" + uri;
      }
    }

    // parse
    obj = parse(uri) as ParsedUrl;
  }

  // make sure we treat `localhost:80` and `localhost` equally
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = "80";
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = "443";
    }
  }

  obj.path = obj.path || "/";

  const ipv6 = obj.host.indexOf(":") !== -1;
  const host = ipv6 ? "[" + obj.host + "]" : obj.host;

  // define unique id
  obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
  // define href
  obj.href =
    obj.protocol +
      "://" +
      host +
      (loc && loc.port === obj.port ? "" : ":" + obj.port);

  return obj;
}
