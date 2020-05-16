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
define("src/interpreter", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Interpreter {
        constructor(description) {
            this.variables = [];
            this.actions = [];
            this.state = { sideEffects: [] };
            this.constraints = [];
            this.assert = (state, objective) => {
                return objective(state);
            };
            this.callEffect = (state, effect) => {
                const out = effect(state) ? effect(state) : state;
                return out;
            };
            this.callAction = (state, action) => {
                const callEffect = this.callEffect;
                const variables = Object.freeze(this.variables);
                const outState = action(variables, state);
                const sideEffects = outState.sideEffects;
                const afterEffects = sideEffects.reduce((s, eff) => callEffect(s, eff), outState);
                return afterEffects;
            };
            this.interpret = () => {
                const { assert, callAction } = this;
                const state = Object.freeze(this.state);
                const actions = this.actions;
                const constraints = this.constraints;
                const output = actions.reduce((s, a) => callAction(s, a), state);
                const assertions = constraints.map(obj => assert(output, obj));
                return [output, assertions];
            };
            const { variables, actions, initialState, constraints } = description;
            this.variables = variables;
            this.actions = actions;
            this.state = { ...this.state, ...initialState };
            this.constraints = constraints;
        }
    }
    exports.default = Interpreter;
});
define("mod", ["require", "exports", "src/interpreter"], function (require, exports, interpreter_ts_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    interpreter_ts_1 = __importDefault(interpreter_ts_1);
    exports.default = interpreter_ts_1.default;
});

const __rootExports = instantiate("mod");
export default __rootExports["default"];
