var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (t, e) {
    "object" == typeof exports && true ? exports = e() : "function" == typeof define && define.amd ? define(e) : t.dayjs_plugin_toArray = e();
  }(exports, function () {
    "use strict";

    return function (t, e) {
      e.prototype.toArray = function () {
        return [(this || _global).$y, (this || _global).$M, (this || _global).$D, (this || _global).$H, (this || _global).$m, (this || _global).$s, (this || _global).$ms];
      };
    };
  });
  return exports;
}