var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (t, n) {
    "object" == typeof exports && true ? exports = n() : "function" == typeof define && define.amd ? define(n) : t.dayjs_plugin_badMutable = n();
  }(exports, function () {
    "use strict";

    return function (t, n) {
      var i = n.prototype;
      i.$g = function (t, n, i) {
        return this.$utils().u(t) ? (this || _global)[n] : this.$set(i, t);
      }, i.set = function (t, n) {
        return this.$set(t, n);
      };
      var e = i.startOf;

      i.startOf = function (t, n) {
        return (this || _global).$d = e.bind(this || _global)(t, n).toDate(), this.init(), this || _global;
      };

      var s = i.add;

      i.add = function (t, n) {
        return (this || _global).$d = s.bind(this || _global)(t, n).toDate(), this.init(), this || _global;
      };

      var r = i.locale;

      i.locale = function (t, n) {
        return t ? ((this || _global).$L = r.bind(this || _global)(t, n).$L, this || _global) : (this || _global).$L;
      };

      var o = i.daysInMonth;

      i.daysInMonth = function () {
        return o.bind(this.clone())();
      };

      var u = i.isSame;

      i.isSame = function (t, n) {
        return u.bind(this.clone())(t, n);
      };

      var f = i.isBefore;

      i.isBefore = function (t, n) {
        return f.bind(this.clone())(t, n);
      };

      var d = i.isAfter;

      i.isAfter = function (t, n) {
        return d.bind(this.clone())(t, n);
      };
    };
  });
  return exports;
}