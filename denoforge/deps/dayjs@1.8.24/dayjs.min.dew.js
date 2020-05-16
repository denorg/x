var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (t, n) {
    "object" == typeof exports && true ? exports = n() : "function" == typeof define && define.amd ? define(n) : t.dayjs = n();
  }(exports, function () {
    "use strict";

    var t = "millisecond",
        n = "second",
        e = "minute",
        r = "hour",
        i = "day",
        s = "week",
        u = "month",
        o = "quarter",
        a = "year",
        h = /^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,
        f = /\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
        c = function (t, n, e) {
      var r = String(t);
      return !r || r.length >= n ? t : "" + Array(n + 1 - r.length).join(e) + t;
    },
        d = {
      s: c,
      z: function (t) {
        var n = -t.utcOffset(),
            e = Math.abs(n),
            r = Math.floor(e / 60),
            i = e % 60;
        return (n <= 0 ? "+" : "-") + c(r, 2, "0") + ":" + c(i, 2, "0");
      },
      m: function (t, n) {
        var e = 12 * (n.year() - t.year()) + (n.month() - t.month()),
            r = t.clone().add(e, u),
            i = n - r < 0,
            s = t.clone().add(e + (i ? -1 : 1), u);
        return Number(-(e + (n - r) / (i ? r - s : s - r)) || 0);
      },
      a: function (t) {
        return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
      },
      p: function (h) {
        return {
          M: u,
          y: a,
          w: s,
          d: i,
          D: "date",
          h: r,
          m: e,
          s: n,
          ms: t,
          Q: o
        }[h] || String(h || "").toLowerCase().replace(/s$/, "");
      },
      u: function (t) {
        return void 0 === t;
      }
    },
        $ = {
      name: "en",
      weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
    },
        l = "en",
        m = {};

    m[l] = $;

    var y = function (t) {
      return t instanceof v;
    },
        M = function (t, n, e) {
      var r;
      if (!t) return l;
      if ("string" == typeof t) m[t] && (r = t), n && (m[t] = n, r = t);else {
        var i = t.name;
        m[i] = t, r = i;
      }
      return !e && r && (l = r), r || !e && l;
    },
        g = function (t, n, e) {
      if (y(t)) return t.clone();
      var r = n ? "string" == typeof n ? {
        format: n,
        pl: e
      } : n : {};
      return r.date = t, new v(r);
    },
        D = d;

    D.l = M, D.i = y, D.w = function (t, n) {
      return g(t, {
        locale: n.$L,
        utc: n.$u,
        $offset: n.$offset
      });
    };

    var v = function () {
      function c(t) {
        (this || _global).$L = (this || _global).$L || M(t.locale, null, !0), this.parse(t);
      }

      var d = c.prototype;
      return d.parse = function (t) {
        (this || _global).$d = function (t) {
          var n = t.date,
              e = t.utc;
          if (null === n) return new Date(NaN);
          if (D.u(n)) return new Date();
          if (n instanceof Date) return new Date(n);

          if ("string" == typeof n && !/Z$/i.test(n)) {
            var r = n.match(h);
            if (r) return e ? new Date(Date.UTC(r[1], r[2] - 1, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, r[7] || 0)) : new Date(r[1], r[2] - 1, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, r[7] || 0);
          }

          return new Date(n);
        }(t), this.init();
      }, d.init = function () {
        var t = (this || _global).$d;
        (this || _global).$y = t.getFullYear(), (this || _global).$M = t.getMonth(), (this || _global).$D = t.getDate(), (this || _global).$W = t.getDay(), (this || _global).$H = t.getHours(), (this || _global).$m = t.getMinutes(), (this || _global).$s = t.getSeconds(), (this || _global).$ms = t.getMilliseconds();
      }, d.$utils = function () {
        return D;
      }, d.isValid = function () {
        return !("Invalid Date" === (this || _global).$d.toString());
      }, d.isSame = function (t, n) {
        var e = g(t);
        return this.startOf(n) <= e && e <= this.endOf(n);
      }, d.isAfter = function (t, n) {
        return g(t) < this.startOf(n);
      }, d.isBefore = function (t, n) {
        return this.endOf(n) < g(t);
      }, d.$g = function (t, n, e) {
        return D.u(t) ? (this || _global)[n] : this.set(e, t);
      }, d.year = function (t) {
        return this.$g(t, "$y", a);
      }, d.month = function (t) {
        return this.$g(t, "$M", u);
      }, d.day = function (t) {
        return this.$g(t, "$W", i);
      }, d.date = function (t) {
        return this.$g(t, "$D", "date");
      }, d.hour = function (t) {
        return this.$g(t, "$H", r);
      }, d.minute = function (t) {
        return this.$g(t, "$m", e);
      }, d.second = function (t) {
        return this.$g(t, "$s", n);
      }, d.millisecond = function (n) {
        return this.$g(n, "$ms", t);
      }, d.unix = function () {
        return Math.floor(this.valueOf() / 1e3);
      }, d.valueOf = function () {
        return (this || _global).$d.getTime();
      }, d.startOf = function (t, o) {
        var h = this || _global,
            f = !!D.u(o) || o,
            c = D.p(t),
            d = function (t, n) {
          var e = D.w(h.$u ? Date.UTC(h.$y, n, t) : new Date(h.$y, n, t), h);
          return f ? e : e.endOf(i);
        },
            $ = function (t, n) {
          return D.w(h.toDate()[t].apply(h.toDate(), (f ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(n)), h);
        },
            l = (this || _global).$W,
            m = (this || _global).$M,
            y = (this || _global).$D,
            M = "set" + ((this || _global).$u ? "UTC" : "");

        switch (c) {
          case a:
            return f ? d(1, 0) : d(31, 11);

          case u:
            return f ? d(1, m) : d(0, m + 1);

          case s:
            var g = this.$locale().weekStart || 0,
                v = (l < g ? l + 7 : l) - g;
            return d(f ? y - v : y + (6 - v), m);

          case i:
          case "date":
            return $(M + "Hours", 0);

          case r:
            return $(M + "Minutes", 1);

          case e:
            return $(M + "Seconds", 2);

          case n:
            return $(M + "Milliseconds", 3);

          default:
            return this.clone();
        }
      }, d.endOf = function (t) {
        return this.startOf(t, !1);
      }, d.$set = function (s, o) {
        var h,
            f = D.p(s),
            c = "set" + ((this || _global).$u ? "UTC" : ""),
            d = (h = {}, h[i] = c + "Date", h.date = c + "Date", h[u] = c + "Month", h[a] = c + "FullYear", h[r] = c + "Hours", h[e] = c + "Minutes", h[n] = c + "Seconds", h[t] = c + "Milliseconds", h)[f],
            $ = f === i ? (this || _global).$D + (o - (this || _global).$W) : o;

        if (f === u || f === a) {
          var l = this.clone().set("date", 1);
          l.$d[d]($), l.init(), (this || _global).$d = l.set("date", Math.min((this || _global).$D, l.daysInMonth())).toDate();
        } else d && (this || _global).$d[d]($);

        return this.init(), this || _global;
      }, d.set = function (t, n) {
        return this.clone().$set(t, n);
      }, d.get = function (t) {
        return this[D.p(t)]();
      }, d.add = function (t, o) {
        var h,
            f = this || _global;
        t = Number(t);

        var c = D.p(o),
            d = function (n) {
          var e = g(f);
          return D.w(e.date(e.date() + Math.round(n * t)), f);
        };

        if (c === u) return this.set(u, (this || _global).$M + t);
        if (c === a) return this.set(a, (this || _global).$y + t);
        if (c === i) return d(1);
        if (c === s) return d(7);
        var $ = (h = {}, h[e] = 6e4, h[r] = 36e5, h[n] = 1e3, h)[c] || 1,
            l = (this || _global).$d.getTime() + t * $;
        return D.w(l, this || _global);
      }, d.subtract = function (t, n) {
        return this.add(-1 * t, n);
      }, d.format = function (t) {
        var n = this || _global;
        if (!this.isValid()) return "Invalid Date";

        var e = t || "YYYY-MM-DDTHH:mm:ssZ",
            r = D.z(this || _global),
            i = this.$locale(),
            s = (this || _global).$H,
            u = (this || _global).$m,
            o = (this || _global).$M,
            a = i.weekdays,
            h = i.months,
            c = function (t, r, i, s) {
          return t && (t[r] || t(n, e)) || i[r].substr(0, s);
        },
            d = function (t) {
          return D.s(s % 12 || 12, t, "0");
        },
            $ = i.meridiem || function (t, n, e) {
          var r = t < 12 ? "AM" : "PM";
          return e ? r.toLowerCase() : r;
        },
            l = {
          YY: String((this || _global).$y).slice(-2),
          YYYY: (this || _global).$y,
          M: o + 1,
          MM: D.s(o + 1, 2, "0"),
          MMM: c(i.monthsShort, o, h, 3),
          MMMM: h[o] || h(this || _global, e),
          D: (this || _global).$D,
          DD: D.s((this || _global).$D, 2, "0"),
          d: String((this || _global).$W),
          dd: c(i.weekdaysMin, (this || _global).$W, a, 2),
          ddd: c(i.weekdaysShort, (this || _global).$W, a, 3),
          dddd: a[(this || _global).$W],
          H: String(s),
          HH: D.s(s, 2, "0"),
          h: d(1),
          hh: d(2),
          a: $(s, u, !0),
          A: $(s, u, !1),
          m: String(u),
          mm: D.s(u, 2, "0"),
          s: String((this || _global).$s),
          ss: D.s((this || _global).$s, 2, "0"),
          SSS: D.s((this || _global).$ms, 3, "0"),
          Z: r
        };

        return e.replace(f, function (t, n) {
          return n || l[t] || r.replace(":", "");
        });
      }, d.utcOffset = function () {
        return 15 * -Math.round((this || _global).$d.getTimezoneOffset() / 15);
      }, d.diff = function (t, h, f) {
        var c,
            d = D.p(h),
            $ = g(t),
            l = 6e4 * ($.utcOffset() - this.utcOffset()),
            m = (this || _global) - $,
            y = D.m(this || _global, $);
        return y = (c = {}, c[a] = y / 12, c[u] = y, c[o] = y / 3, c[s] = (m - l) / 6048e5, c[i] = (m - l) / 864e5, c[r] = m / 36e5, c[e] = m / 6e4, c[n] = m / 1e3, c)[d] || m, f ? y : D.a(y);
      }, d.daysInMonth = function () {
        return this.endOf(u).$D;
      }, d.$locale = function () {
        return m[(this || _global).$L];
      }, d.locale = function (t, n) {
        if (!t) return (this || _global).$L;
        var e = this.clone(),
            r = M(t, n, !0);
        return r && (e.$L = r), e;
      }, d.clone = function () {
        return D.w((this || _global).$d, this || _global);
      }, d.toDate = function () {
        return new Date(this.valueOf());
      }, d.toJSON = function () {
        return this.isValid() ? this.toISOString() : null;
      }, d.toISOString = function () {
        return (this || _global).$d.toISOString();
      }, d.toString = function () {
        return (this || _global).$d.toUTCString();
      }, c;
    }();

    return g.prototype = v.prototype, g.extend = function (t, n) {
      return t(n, v, g), g;
    }, g.locale = M, g.isDayjs = y, g.unix = function (t) {
      return g(1e3 * t);
    }, g.en = m[l], g.Ls = m, g;
  });
  return exports;
}