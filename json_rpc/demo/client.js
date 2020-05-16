// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// A script preamble that provides the ability to load a single outfile
// TypeScript "bundle" where a main module is loaded which recursively
// instantiates all the other modules in the bundle.  This code is used to load
// bundles when creating snapshots, but is also used when emitting bundles from
// Deno cli.

// @ts-nocheck

/**
 * @type {(name: string, deps: ReadonlyArray<string>, factory: (...deps: any[]) => void) => void=}
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let define;

/**
 * @type {(mod: string) => any=}
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let instantiate;

/**
 * @callback Factory
 * @argument {...any[]} args
 * @returns {object | void}
 */

/**
 * @typedef ModuleMetaData
 * @property {ReadonlyArray<string>} dependencies
 * @property {(Factory | object)=} factory
 * @property {object} exports
 */

(function() {
  /**
   * @type {Map<string, ModuleMetaData>}
   */
  const modules = new Map();

  /**
   * Bundles in theory can support "dynamic" imports, but for internal bundles
   * we can't go outside to fetch any modules that haven't been statically
   * defined.
   * @param {string[]} deps
   * @param {(...deps: any[]) => void} resolve
   * @param {(err: any) => void} reject
   */
  const require = (deps, resolve, reject) => {
    try {
      if (deps.length !== 1) {
        throw new TypeError("Expected only a single module specifier.");
      }
      if (!modules.has(deps[0])) {
        throw new RangeError(`Module "${deps[0]}" not defined.`);
      }
      resolve(getExports(deps[0]));
    } catch (e) {
      if (reject) {
        reject(e);
      } else {
        throw e;
      }
    }
  };

  define = (id, dependencies, factory) => {
    if (modules.has(id)) {
      throw new RangeError(`Module "${id}" has already been defined.`);
    }
    modules.set(id, {
      dependencies,
      factory,
      exports: {}
    });
  };

  /**
   * @param {string} id
   * @returns {any}
   */
  function getExports(id) {
    const module = modules.get(id);
    if (!module) {
      // because `$deno$/ts_global.d.ts` looks like a real script, it doesn't
      // get erased from output as an import, but it doesn't get defined, so
      // we don't have a cache for it, so because this is an internal bundle
      // we can just safely return an empty object literal.
      return {};
    }
    if (!module.factory) {
      return module.exports;
    } else if (module.factory) {
      const { factory, exports } = module;
      delete module.factory;
      if (typeof factory === "function") {
        const dependencies = module.dependencies.map(id => {
          if (id === "require") {
            return require;
          } else if (id === "exports") {
            return exports;
          }
          return getExports(id);
        });
        factory(...dependencies);
      } else {
        Object.assign(exports, factory);
      }
      return exports;
    }
  }

  instantiate = dep => {
    define = undefined;
    const result = getExports(dep);
    // clean up, or otherwise these end up in the runtime environment
    instantiate = undefined;
    return result;
  };
})();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("mod", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const V = "2.0";
    function debug(msg, ...args) {
        console.debug(`[jsonrpc] ${msg}`, ...args);
    }
    function warn(msg, ...args) {
        console.warn(`[jsonrpc] ${msg}`, ...args);
    }
    function createErrorMessage(id, code, message, data) {
        let error = { code, message };
        if (data) {
            error.data = data;
        }
        return { id, error, jsonrpc: V };
    }
    function createResultMessage(id, result) {
        return { id, result, jsonrpc: V };
    }
    function createCallMessage(method, params, id) {
        let message = { method, params, jsonrpc: V };
        if (id) {
            message.id = id;
        }
        return message;
    }
    class JsonRpc {
        constructor(_io) {
            this._io = _io;
            this._interface = new Map();
            this._pendingPromises = new Map();
            _io.onData = (m) => this._onData(m);
        }
        expose(name, method) {
            this._interface.set(name, method);
        }
        async call(method, params) {
            let id = Math.random().toString();
            let message = createCallMessage(method, params, id);
            return new Promise((resolve, reject) => {
                this._pendingPromises.set(id, { resolve, reject });
                this._send(message);
            });
        }
        notify(method, params) {
            let message = createCallMessage(method, params);
            this._send(message);
        }
        _send(message) {
            const str = JSON.stringify(message);
            debug("sending", str);
            this._io.sendData(str);
        }
        _onData(str) {
            debug("received", str);
            let message;
            try {
                message = JSON.parse(str);
            }
            catch (e) {
                let reply = createErrorMessage(null, -32700, e.message);
                this._send(reply);
                return;
            }
            let reply;
            if (message instanceof Array) {
                let mapped = message.map(m => this._processMessage(m)).filter(m => m);
                reply = (mapped.length ? mapped : null);
            }
            else {
                reply = this._processMessage(message);
            }
            reply && this._send(reply);
        }
        _processMessage(message) {
            if ("method" in message) { // call
                const method = this._interface.get(message.method);
                if (!method) {
                    return (message.id ? createErrorMessage(message.id, -32601, "method not found") : null);
                }
                try {
                    const result = (message.params instanceof Array ? method(...message.params) : method(message.params));
                    return (message.id ? createResultMessage(message.id, result) : null);
                }
                catch (e) {
                    warn("caught", e);
                    return (message.id ? createErrorMessage(message.id, -32000, e.message) : null);
                }
            }
            else if (message.id) { // result/error
                let promise = this._pendingPromises.get(message.id);
                if (!promise) {
                    throw new Error(`Received a non-matching response id "${message.id}"`);
                }
                this._pendingPromises.delete(message.id);
                ("error" in message ? promise.reject(message.error) : promise.resolve(message.result));
            }
            else {
                throw new Error("Received a non-call non-id JSON-RPC message");
            }
            return null;
        }
    }
    exports.default = JsonRpc;
});
define("demo/client", ["require", "exports", "mod"], function (require, exports, mod_ts_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    mod_ts_1 = __importDefault(mod_ts_1);
    let ws = new WebSocket("ws://localhost:1234");
    ws.addEventListener("open", () => {
        let io = {
            onData(_s) { },
            sendData(s) { ws.send(s); }
        };
        ws.addEventListener("message", e => io.onData(e.data));
        let jsonrpc = new mod_ts_1.default(io);
        jsonrpc.expose("echo.notify", data => console.log("notify", data));
        setInterval(async () => {
            const method = (Math.random() < 0.5 ? "echo.all" : "echo.self");
            const data = { number: Math.random() };
            console.log("call", method, data);
            try {
                let result = await jsonrpc.call(method, data);
                console.log("result", result);
            }
            catch (e) {
                console.error(e);
            }
        }, 3000);
    });
});

instantiate("demo/client");

