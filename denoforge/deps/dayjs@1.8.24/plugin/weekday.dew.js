var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (e, t) {
    "object" == typeof exports && true ? exports = t() : "function" == typeof define && define.amd ? define(t) : e.dayjs_plugin_weekday = t();
  }(exports, function () {
    "use strict";

    return function (e, t) {
      t.prototype.weekday = function (e) {
        var t = this.$locale().weekStart || 0,
            n = (this || _global).$W,
            i = (n < t ? n + 7 : n) - t;
        return this.$utils().u(e) ? i : this.subtract(i, "day").add(e, "day");
      };
    };
  });
  return exports;
}