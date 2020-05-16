var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (e, t) {
    "object" == typeof exports && true ? exports = t() : "function" == typeof define && define.amd ? define(t) : e.dayjs_plugin_advancedFormat = t();
  }(exports, function () {
    "use strict";

    return function (e, t, r) {
      var n = t.prototype,
          o = n.format;
      r.en.ordinal = function (e) {
        var t = ["th", "st", "nd", "rd"],
            r = e % 100;
        return "[" + e + (t[(r - 20) % 10] || t[r] || t[0]) + "]";
      }, n.format = function (e) {
        var t = this || _global,
            r = this.$locale(),
            n = this.$utils(),
            a = (e || "YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|gggg|Do|X|x|k{1,2}|S/g, function (e) {
          switch (e) {
            case "Q":
              return Math.ceil((t.$M + 1) / 3);

            case "Do":
              return r.ordinal(t.$D);

            case "gggg":
              return t.weekYear();

            case "wo":
              return r.ordinal(t.week(), "W");

            case "w":
            case "ww":
              return n.s(t.week(), "w" === e ? 1 : 2, "0");

            case "k":
            case "kk":
              return n.s(String(0 === t.$H ? 24 : t.$H), "k" === e ? 1 : 2, "0");

            case "X":
              return Math.floor(t.$d.getTime() / 1e3);

            case "x":
              return t.$d.getTime();

            default:
              return e;
          }
        });
        return o.bind(this || _global)(a);
      };
    };
  });
  return exports;
}