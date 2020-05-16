var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (t, i) {
    "object" == typeof exports && true ? exports = i() : "function" == typeof define && define.amd ? define(i) : t.dayjs_plugin_utc = i();
  }(exports, function () {
    "use strict";

    return function (t, i, e) {
      var s = new Date().getTimezoneOffset(),
          n = i.prototype;
      e.utc = function (t, e) {
        return new i({
          date: t,
          utc: !0,
          format: e
        });
      }, n.utc = function () {
        return e(this.toDate(), {
          locale: (this || _global).$L,
          utc: !0
        });
      }, n.local = function () {
        return e(this.toDate(), {
          locale: (this || _global).$L,
          utc: !1
        });
      };
      var u = n.parse;

      n.parse = function (t) {
        t.utc && ((this || _global).$u = !0), this.$utils().u(t.$offset) || ((this || _global).$offset = t.$offset), u.call(this || _global, t);
      };

      var o = n.init;

      n.init = function () {
        if ((this || _global).$u) {
          var t = (this || _global).$d;
          (this || _global).$y = t.getUTCFullYear(), (this || _global).$M = t.getUTCMonth(), (this || _global).$D = t.getUTCDate(), (this || _global).$W = t.getUTCDay(), (this || _global).$H = t.getUTCHours(), (this || _global).$m = t.getUTCMinutes(), (this || _global).$s = t.getUTCSeconds(), (this || _global).$ms = t.getUTCMilliseconds();
        } else o.call(this || _global);
      };

      var f = n.utcOffset;

      n.utcOffset = function (t) {
        var i = this.$utils().u;
        if (i(t)) return (this || _global).$u ? 0 : i((this || _global).$offset) ? f.call(this || _global) : (this || _global).$offset;
        var e,
            n = Math.abs(t) <= 16 ? 60 * t : t;
        return 0 !== t ? (e = this.local().add(n + s, "minute")).$offset = n : e = this.utc(), e;
      };

      var r = n.format;
      n.format = function (t) {
        var i = t || ((this || _global).$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
        return r.call(this || _global, i);
      }, n.valueOf = function () {
        var t = this.$utils().u((this || _global).$offset) ? 0 : (this || _global).$offset + s;
        return (this || _global).$d.valueOf() - 6e4 * t;
      }, n.isUTC = function () {
        return !!(this || _global).$u;
      }, n.toISOString = function () {
        return this.toDate().toISOString();
      }, n.toString = function () {
        return this.toDate().toUTCString();
      };
    };
  });
  return exports;
}