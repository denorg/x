var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (t, s) {
    "object" == typeof exports && true ? exports = s() : "function" == typeof define && define.amd ? define(s) : t.dayjs_plugin_duration = s();
  }(exports, function () {
    "use strict";

    var t,
        s,
        n = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,
        i = {
      years: 31536e6,
      months: 2592e6,
      days: 864e5,
      hours: 36e5,
      minutes: 6e4,
      seconds: 1e3,
      weeks: 6048e5
    },
        e = function (t) {
      return t instanceof u;
    },
        r = function (t, s, n) {
      return new u(t, n, s.$l);
    },
        o = function (t) {
      return s.p(t) + "s";
    },
        u = function () {
      function s(t, s, e) {
        var u = this || _global;
        if ((this || _global).$d = {}, (this || _global).$l = e || "en", s) return r(t * i[o(s)], this || _global);
        if ("number" == typeof t) return (this || _global).$ms = t, this.parseFromMilliseconds(), this || _global;
        if ("object" == typeof t) return Object.keys(t).forEach(function (s) {
          u.$d[o(s)] = t[s];
        }), this.calMilliseconds(), this || _global;

        if ("string" == typeof t) {
          var h = t.match(n);
          if (h) return (this || _global).$d.years = h[2], (this || _global).$d.months = h[3], (this || _global).$d.days = h[5], (this || _global).$d.hours = h[6], (this || _global).$d.minutes = h[7], (this || _global).$d.seconds = h[8], this.calMilliseconds(), this || _global;
        }

        return this || _global;
      }

      var u = s.prototype;
      return u.calMilliseconds = function () {
        var t = this || _global;
        (this || _global).$ms = Object.keys((this || _global).$d).reduce(function (s, n) {
          return s + (t.$d[n] || 0) * (i[n] || 1);
        }, 0);
      }, u.parseFromMilliseconds = function () {
        var t = (this || _global).$ms;
        (this || _global).$d.years = Math.floor(t / 31536e6), t %= 31536e6, (this || _global).$d.months = Math.floor(t / 2592e6), t %= 2592e6, (this || _global).$d.days = Math.floor(t / 864e5), t %= 864e5, (this || _global).$d.hours = Math.floor(t / 36e5), t %= 36e5, (this || _global).$d.minutes = Math.floor(t / 6e4), t %= 6e4, (this || _global).$d.seconds = t / 1e3;
      }, u.toISOString = function () {
        var t = (this || _global).$d.years ? (this || _global).$d.years + "Y" : "",
            s = (this || _global).$d.months ? (this || _global).$d.months + "M" : "",
            n = (this || _global).$d.days || 0;
        (this || _global).$d.weeks && (n += 7 * (this || _global).$d.weeks);
        var i = n ? n + "D" : "",
            e = (this || _global).$d.hours ? (this || _global).$d.hours + "H" : "",
            r = (this || _global).$d.minutes ? (this || _global).$d.minutes + "M" : "",
            o = (this || _global).$d.seconds || 0;
        (this || _global).$d.milliseconds && (o += (this || _global).$d.milliseconds / 1e3);
        var u = o ? o + "S" : "",
            h = "P" + t + s + i + (e || s || u ? "T" : "") + e + r + u;
        return "P" === h ? "P0D" : h;
      }, u.toJSON = function () {
        return this.toISOString();
      }, u.as = function (t) {
        return (this || _global).$ms / (i[o(t)] || 1);
      }, u.get = function (t) {
        var s = (this || _global).$ms,
            n = o(t);
        return "milliseconds" === n ? s %= 1e3 : s = Math.floor(s / i[n]), s;
      }, u.add = function (t, s, n) {
        var u;
        return u = s ? t * i[o(s)] : e(t) ? t.$ms : r(t, this || _global).$ms, r((this || _global).$ms + u * (n ? -1 : 1), this || _global);
      }, u.subtract = function (t, s) {
        return this.add(t, s, !0);
      }, u.locale = function (t) {
        var s = this.clone();
        return s.$l = t, s;
      }, u.clone = function () {
        return r((this || _global).$ms, this || _global);
      }, u.humanize = function (s) {
        return t().add((this || _global).$ms, "ms").locale((this || _global).$l).fromNow(!s);
      }, u.milliseconds = function () {
        return this.get("milliseconds");
      }, u.asMilliseconds = function () {
        return this.as("milliseconds");
      }, u.seconds = function () {
        return this.get("seconds");
      }, u.asSeconds = function () {
        return this.as("seconds");
      }, u.minutes = function () {
        return this.get("minutes");
      }, u.asMinutes = function () {
        return this.as("minutes");
      }, u.hours = function () {
        return this.get("hours");
      }, u.asHours = function () {
        return this.as("hours");
      }, u.days = function () {
        return this.get("days");
      }, u.asDays = function () {
        return this.as("days");
      }, u.weeks = function () {
        return this.get("weeks");
      }, u.asWeeks = function () {
        return this.as("weeks");
      }, u.months = function () {
        return this.get("months");
      }, u.asMonths = function () {
        return this.as("months");
      }, u.years = function () {
        return this.get("years");
      }, u.asYears = function () {
        return this.as("years");
      }, s;
    }();

    return function (n, i, o) {
      t = o, s = o().$utils(), o.duration = function (t, s) {
        return r(t, {}, s);
      }, o.isDuration = e;
    };
  });
  return exports;
}