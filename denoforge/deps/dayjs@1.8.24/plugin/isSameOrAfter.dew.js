var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (e, t) {
    "object" == typeof exports && true ? exports = t() : "function" == typeof define && define.amd ? define(t) : e.dayjs_plugin_isSameOrAfter = t();
  }(exports, function () {
    "use strict";

    return function (e, t) {
      t.prototype.isSameOrAfter = function (e, t) {
        return this.isSame(e, t) || this.isAfter(e, t);
      };
    };
  });
  return exports;
}