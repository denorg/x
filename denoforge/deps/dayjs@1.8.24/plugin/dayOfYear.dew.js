var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (t, e) {
    "object" == typeof exports && true ? exports = e() : "function" == typeof define && define.amd ? define(e) : t.dayjs_plugin_dayOfYear = e();
  }(exports, function () {
    "use strict";

    return function (t, e) {
      e.prototype.dayOfYear = function (t) {
        var e = Math.round((this.startOf("day") - this.startOf("year")) / 864e5) + 1;
        return null == t ? e : this.add(t - e, "day");
      };
    };
  });
  return exports;
}