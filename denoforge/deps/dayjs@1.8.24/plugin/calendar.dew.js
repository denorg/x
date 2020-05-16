var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (e, t) {
    "object" == typeof exports && true ? exports = t() : "function" == typeof define && define.amd ? define(t) : e.dayjs_plugin_calendar = t();
  }(exports, function () {
    "use strict";

    return function (e, t, a) {
      var n = "h:mm A",
          d = {
        lastDay: "[Yesterday at] " + n,
        sameDay: "[Today at] " + n,
        nextDay: "[Tomorrow at] " + n,
        nextWeek: "dddd [at] " + n,
        lastWeek: "[Last] dddd [at] " + n,
        sameElse: "MM/DD/YYYY"
      };

      t.prototype.calendar = function (e, t) {
        var n = t || this.$locale().calendar || d,
            s = a(e || void 0).startOf("d"),
            o = this.diff(s, "d", !0),
            i = o < -6 ? "sameElse" : o < -1 ? "lastWeek" : o < 0 ? "lastDay" : o < 1 ? "sameDay" : o < 2 ? "nextDay" : o < 7 ? "nextWeek" : "sameElse",
            f = n[i] || d[i];
        return "function" == typeof f ? f.call(this || _global, a()) : this.format(f);
      };
    };
  });
  return exports;
}