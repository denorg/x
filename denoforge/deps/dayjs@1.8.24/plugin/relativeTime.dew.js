var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (r, t) {
    "object" == typeof exports && true ? exports = t() : "function" == typeof define && define.amd ? define(t) : r.dayjs_plugin_relativeTime = t();
  }(exports, function () {
    "use strict";

    return function (r, t, e) {
      r = r || {};
      var n = t.prototype;
      e.en.relativeTime = {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
      };

      var o = function (t, n, o, d) {
        for (var i, u, a, s = o.$locale().relativeTime, f = r.thresholds || [{
          l: "s",
          r: 44,
          d: "second"
        }, {
          l: "m",
          r: 89
        }, {
          l: "mm",
          r: 44,
          d: "minute"
        }, {
          l: "h",
          r: 89
        }, {
          l: "hh",
          r: 21,
          d: "hour"
        }, {
          l: "d",
          r: 35
        }, {
          l: "dd",
          r: 25,
          d: "day"
        }, {
          l: "M",
          r: 45
        }, {
          l: "MM",
          r: 10,
          d: "month"
        }, {
          l: "y",
          r: 17
        }, {
          l: "yy",
          d: "year"
        }], l = f.length, h = 0; h < l; h += 1) {
          var m = f[h];
          m.d && (i = d ? e(t).diff(o, m.d, !0) : o.diff(t, m.d, !0));
          var c = (r.rounding || Math.round)(Math.abs(i));

          if (a = i > 0, c <= m.r || !m.r) {
            c <= 1 && h > 0 && (m = f[h - 1]);
            var y = s[m.l];
            u = "string" == typeof y ? y.replace("%d", c) : y(c, n, m.l, a);
            break;
          }
        }

        return n ? u : (a ? s.future : s.past).replace("%s", u);
      };

      n.to = function (r, t) {
        return o(r, t, this || _global, !0);
      }, n.from = function (r, t) {
        return o(r, t, this || _global);
      };

      var d = function (r) {
        return r.$u ? e.utc() : e();
      };

      n.toNow = function (r) {
        return this.to(d(this || _global), r);
      }, n.fromNow = function (r) {
        return this.from(d(this || _global), r);
      };
    };
  });
  return exports;
}