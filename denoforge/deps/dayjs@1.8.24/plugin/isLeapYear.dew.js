var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (e, t) {
    "object" == typeof exports && true ? exports = t() : "function" == typeof define && define.amd ? define(t) : e.dayjs_plugin_isLeapYear = t();
  }(exports, function () {
    "use strict";

    return function (e, t) {
      t.prototype.isLeapYear = function () {
        return (this || _global).$y % 4 == 0 && (this || _global).$y % 100 != 0 || (this || _global).$y % 400 == 0;
      };
    };
  });
  return exports;
}