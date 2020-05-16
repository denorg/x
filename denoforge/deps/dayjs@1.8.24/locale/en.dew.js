var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (e, n) {
    "object" == typeof exports && true ? exports = n() : "function" == typeof define && define.amd ? define(n) : e.dayjs_locale_en = n();
  }(exports, function () {
    "use strict";

    return {
      name: "en",
      weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
    };
  });
  return exports;
}