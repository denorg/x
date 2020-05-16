var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (e, n) {
    "object" == typeof exports && true ? exports = n() : "function" == typeof define && define.amd ? define(n) : e.dayjs_plugin_isoWeeksInYear = n();
  }(exports, function () {
    "use strict";

    return function (e, n) {
      n.prototype.isoWeeksInYear = function () {
        var e = this.isLeapYear(),
            n = this.endOf("y").day();
        return 4 === n || e && 5 === n ? 53 : 52;
      };
    };
  });
  return exports;
}