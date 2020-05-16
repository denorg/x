var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (t, e) {
    "object" == typeof exports && true ? exports = e() : "function" == typeof define && define.amd ? define(e) : t.dayjs_plugin_buddhistEra = e();
  }(exports, function () {
    "use strict";

    return function (t, e) {
      var n = e.prototype,
          i = n.format;

      n.format = function (t) {
        var e = this || _global,
            n = (t || "YYYY-MM-DDTHH:mm:ssZ").replace(/(\[[^\]]+])|BBBB|BB/g, function (t, n) {
          var i,
              o = String(e.$y + 543),
              r = "BB" === t ? [o.slice(-2), 2] : [o, 4];
          return n || (i = e.$utils()).s.apply(i, r.concat(["0"]));
        });
        return i.bind(this || _global)(n);
      };
    };
  });
  return exports;
}