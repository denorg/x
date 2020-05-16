import { dew as _applyDewDew } from "./_apply.dew.js";
import { dew as _createCtorDewDew } from "./_createCtor.dew.js";
import { dew as _rootDewDew } from "./_root.dew.js";
var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  var apply = _applyDewDew(),
      createCtor = _createCtorDewDew(),
      root = _rootDewDew();
  /** Used to compose bitmasks for function metadata. */


  var WRAP_BIND_FLAG = 1;
  /**
   * Creates a function that wraps `func` to invoke it with the `this` binding
   * of `thisArg` and `partials` prepended to the arguments it receives.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} partials The arguments to prepend to those provided to
   *  the new function.
   * @returns {Function} Returns the new wrapped function.
   */

  function createPartial(func, bitmask, thisArg, partials) {
    var isBind = bitmask & WRAP_BIND_FLAG,
        Ctor = createCtor(func);

    function wrapper() {
      var argsIndex = -1,
          argsLength = arguments.length,
          leftIndex = -1,
          leftLength = partials.length,
          args = Array(leftLength + argsLength),
          fn = (this || _global) && (this || _global) !== root && (this || _global) instanceof wrapper ? Ctor : func;

      while (++leftIndex < leftLength) {
        args[leftIndex] = partials[leftIndex];
      }

      while (argsLength--) {
        args[leftIndex++] = arguments[++argsIndex];
      }

      return apply(fn, isBind ? thisArg : this || _global, args);
    }

    return wrapper;
  }

  exports = createPartial;
  return exports;
}