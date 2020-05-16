var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (t, e) {
    "object" == typeof exports && true ? exports = e() : "function" == typeof define && define.amd ? define(e) : t.dayjs_plugin_isToday = e();
  }(exports, function () {
    "use strict";

    return function (t, e, o) {
      e.prototype.isToday = function () {
        var t = o();
        return this.format("YYYY-MM-DD") === t.format("YYYY-MM-DD");
      };
    };
  });
  return exports;
}