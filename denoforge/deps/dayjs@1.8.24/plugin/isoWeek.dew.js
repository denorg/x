var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (e, t) {
    "object" == typeof exports && true ? exports = t() : "function" == typeof define && define.amd ? define(t) : e.dayjs_plugin_isoWeek = t();
  }(exports, function () {
    "use strict";

    var e = "day";
    return function (t, i, s) {
      var a = function (t) {
        return t.add(4 - t.isoWeekday(), e);
      },
          d = i.prototype;

      d.isoWeekYear = function () {
        return a(this || _global).year();
      }, d.isoWeek = function (t) {
        if (!this.$utils().u(t)) return this.add(7 * (t - this.isoWeek()), e);
        var i,
            d,
            n,
            r = a(this || _global),
            o = (i = this.isoWeekYear(), d = s().year(i).startOf("year"), n = 4 - d.isoWeekday(), d.isoWeekday() > 4 && (n += 7), d.add(n, e));
        return r.diff(o, "week") + 1;
      }, d.isoWeekday = function (e) {
        return this.$utils().u(e) ? this.day() || 7 : this.day(this.day() % 7 ? e : e - 7);
      };
      var n = d.startOf;

      d.startOf = function (e, t) {
        var i = this.$utils(),
            s = !!i.u(t) || t;
        return "isoweek" === i.p(e) ? s ? this.date(this.date() - (this.isoWeekday() - 1)).startOf("day") : this.date(this.date() - 1 - (this.isoWeekday() - 1) + 7).endOf("day") : n.bind(this || _global)(e, t);
      };
    };
  });
  return exports;
}