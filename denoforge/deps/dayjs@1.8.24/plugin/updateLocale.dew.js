var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (e, n) {
    "object" == typeof exports && true ? exports = n() : "function" == typeof define && define.amd ? define(n) : e.dayjs_plugin_updateLocale = n();
  }(exports, function () {
    "use strict";

    return function (e, n, t) {
      t.updateLocale = function (e, n) {
        var o = t.Ls[e];
        if (o) return (n ? Object.keys(n) : []).forEach(function (e) {
          o[e] = n[e];
        }), o;
      };
    };
  });
  return exports;
}