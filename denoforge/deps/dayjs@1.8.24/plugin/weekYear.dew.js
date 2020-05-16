var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (e, t) {
    "object" == typeof exports && true ? exports = t() : "function" == typeof define && define.amd ? define(t) : e.dayjs_plugin_weekYear = t();
  }(exports, function () {
    "use strict";

    return function (e, t) {
      t.prototype.weekYear = function () {
        var e = this.month(),
            t = this.week(),
            n = this.year();
        return 1 === t && 11 === e ? n + 1 : n;
      };
    };
  });
  return exports;
}