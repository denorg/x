var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (o, t) {
    "object" == typeof exports && true ? exports = t() : "function" == typeof define && define.amd ? define(t) : o.dayjs_plugin_isTomorrow = t();
  }(exports, function () {
    "use strict";

    return function (o, t, e) {
      t.prototype.isTomorrow = function () {
        var o = e().add(1, "day");
        return this.format("YYYY-MM-DD") === o.format("YYYY-MM-DD");
      };
    };
  });
  return exports;
}