var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (t, e) {
    "object" == typeof exports && true ? exports = e() : "function" == typeof define && define.amd ? define(e) : t.dayjs_plugin_isYesterday = e();
  }(exports, function () {
    "use strict";

    return function (t, e, n) {
      e.prototype.isYesterday = function () {
        var t = n().subtract(1, "day");
        return this.format("YYYY-MM-DD") === t.format("YYYY-MM-DD");
      };
    };
  });
  return exports;
}