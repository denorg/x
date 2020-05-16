var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (t, n) {
    "object" == typeof exports && true ? exports = n() : "function" == typeof define && define.amd ? define(n) : t.dayjs_plugin_customParseFormat = n();
  }(exports, function () {
    "use strict";

    var t,
        n = /(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,
        e = /\d\d/,
        r = /\d\d?/,
        o = /\d*[^\s\d-:/.()]+/;

    var s = function (t) {
      return function (n) {
        (this || _global)[t] = +n;
      };
    },
        i = [/[+-]\d\d:?\d\d/, function (t) {
      var n, e;
      ((this || _global).zone || ((this || _global).zone = {})).offset = (n = t.match(/([+-]|\d\d)/g), 0 === (e = 60 * n[1] + +n[2]) ? 0 : "+" === n[0] ? -e : e);
    }],
        a = {
      A: [/[AP]M/, function (t) {
        (this || _global).afternoon = "PM" === t;
      }],
      a: [/[ap]m/, function (t) {
        (this || _global).afternoon = "pm" === t;
      }],
      S: [/\d/, function (t) {
        (this || _global).milliseconds = 100 * +t;
      }],
      SS: [e, function (t) {
        (this || _global).milliseconds = 10 * +t;
      }],
      SSS: [/\d{3}/, function (t) {
        (this || _global).milliseconds = +t;
      }],
      s: [r, s("seconds")],
      ss: [r, s("seconds")],
      m: [r, s("minutes")],
      mm: [r, s("minutes")],
      H: [r, s("hours")],
      h: [r, s("hours")],
      HH: [r, s("hours")],
      hh: [r, s("hours")],
      D: [r, s("day")],
      DD: [e, s("day")],
      Do: [o, function (n) {
        var e = t.ordinal,
            r = n.match(/\d+/);
        if ((this || _global).day = r[0], e) for (var o = 1; o <= 31; o += 1) e(o).replace(/\[|\]/g, "") === n && ((this || _global).day = o);
      }],
      M: [r, s("month")],
      MM: [e, s("month")],
      MMM: [o, function (n) {
        var e = t,
            r = e.months,
            o = e.monthsShort,
            s = o ? o.findIndex(function (t) {
          return t === n;
        }) : r.findIndex(function (t) {
          return t.substr(0, 3) === n;
        });
        if (s < 0) throw new Error();
        (this || _global).month = s + 1;
      }],
      MMMM: [o, function (n) {
        var e = t.months.indexOf(n);
        if (e < 0) throw new Error();
        (this || _global).month = e + 1;
      }],
      Y: [/[+-]?\d+/, s("year")],
      YY: [e, function (t) {
        t = +t, (this || _global).year = t + (t > 68 ? 1900 : 2e3);
      }],
      YYYY: [/\d{4}/, s("year")],
      Z: i,
      ZZ: i
    };

    var u = function (t, e, r) {
      try {
        var o = function (t) {
          for (var e = t.match(n), r = e.length, o = 0; o < r; o += 1) {
            var s = e[o],
                i = a[s],
                u = i && i[0],
                f = i && i[1];
            e[o] = f ? {
              regex: u,
              parser: f
            } : s.replace(/^\[|\]$/g, "");
          }

          return function (t) {
            for (var n = {}, o = 0, s = 0; o < r; o += 1) {
              var i = e[o];
              if ("string" == typeof i) s += i.length;else {
                var a = i.regex,
                    u = i.parser,
                    f = t.substr(s),
                    h = a.exec(f)[0];
                u.call(n, h), t = t.replace(h, "");
              }
            }

            return function (t) {
              var n = t.afternoon;

              if (void 0 !== n) {
                var e = t.hours;
                n ? e < 12 && (t.hours += 12) : 12 === e && (t.hours = 0), delete t.afternoon;
              }
            }(n), n;
          };
        }(e)(t),
            s = o.year,
            i = o.month,
            u = o.day,
            f = o.hours,
            h = o.minutes,
            d = o.seconds,
            c = o.milliseconds,
            m = o.zone;

        if (m) return new Date(Date.UTC(s, i - 1, u, f || 0, h || 0, d || 0, c || 0) + 60 * m.offset * 1e3);
        var l = new Date(),
            v = u || (s || i ? 1 : l.getDate()),
            p = s || l.getFullYear(),
            M = i > 0 ? i - 1 : l.getMonth(),
            y = f || 0,
            D = h || 0,
            Y = d || 0,
            g = c || 0;
        return r ? new Date(Date.UTC(p, M, v, y, D, Y, g)) : new Date(p, M, v, y, D, Y, g);
      } catch (t) {
        return new Date("");
      }
    };

    return function (n, e, r) {
      var o = e.prototype,
          s = o.parse;

      o.parse = function (n) {
        var e = n.date,
            o = n.format,
            i = n.pl,
            a = n.utc;
        (this || _global).$u = a, o ? (t = i ? r.Ls[i] : this.$locale(), (this || _global).$d = u(e, o, a), this.init(n), i && ((this || _global).$L = i)) : s.call(this || _global, n);
      };
    };
  });
  return exports;
}