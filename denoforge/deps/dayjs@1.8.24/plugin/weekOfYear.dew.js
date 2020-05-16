var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (e, t) {
    "object" == typeof exports && true ? exports = t() : "function" == typeof define && define.amd ? define(t) : e.dayjs_plugin_weekOfYear = t();
  }(exports, function () {
    "use strict";

    var e = "week",
        t = "year";
    return function (i, n) {
      var r = n.prototype;
      r.week = function (i) {
        if (void 0 === i && (i = null), null !== i) return this.add(7 * (i - this.week()), "day");
        var n = this.$locale().yearStart || 1;

        if (11 === this.month() && this.date() > 25) {
          var r = this.startOf(t).add(1, t).date(n),
              f = this.endOf(e);
          if (r.isBefore(f)) return 1;
        }

        var s = this.startOf(t).date(n).startOf(e).subtract(1, "millisecond"),
            a = this.diff(s, e, !0);
        return a < 0 ? this.startOf("week").week() : Math.ceil(a);
      }, r.weeks = function (e) {
        return void 0 === e && (e = null), this.week(e);
      };
    };
  });
  return exports;
}