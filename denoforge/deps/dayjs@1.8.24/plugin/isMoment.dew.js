var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (e, n) {
    "object" == typeof exports && true ? exports = n() : "function" == typeof define && define.amd ? define(n) : e.dayjs_plugin_isMoment = n();
  }(exports, function () {
    "use strict";

    return function (e, n, t) {
      t.isMoment = function (e) {
        return t.isDayjs(e);
      };
    };
  });
  return exports;
}