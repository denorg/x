var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (t, e) {
    "object" == typeof exports && true ? exports = e() : "function" == typeof define && define.amd ? define(e) : t.dayjs_plugin_toObject = e();
  }(exports, function () {
    "use strict";

    return function (t, e) {
      e.prototype.toObject = function () {
        return {
          years: (this || _global).$y,
          months: (this || _global).$M,
          date: (this || _global).$D,
          hours: (this || _global).$H,
          minutes: (this || _global).$m,
          seconds: (this || _global).$s,
          milliseconds: (this || _global).$ms
        };
      };
    };
  });
  return exports;
}