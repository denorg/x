import _module from "module";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  var _nodeRequire = function () {
    var Module = _module.Module;

    if (Module) {
      var m = new Module("");
      m.filename = import.meta.url.substr(7 + (Module._nodeModulePaths("/")[0].length > 13));
      m.paths = Module._nodeModulePaths(m.filename.substr(0, m.filename.lastIndexOf("/")));
      return m.require.bind(m);
    } else {
      return function _nodeRequire(id) {
        var e = new Error("Cannot find module '" + id + "'");
        e.code = "MODULE_NOT_FOUND";
        throw e;
      };
    }
  }();

  !function (e, _) {
    "object" == typeof exports && true ? exports = _(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], _) : e.dayjs_locale_ar = _(e.dayjs);
  }(exports, function (e) {
    "use strict";

    e = e && e.hasOwnProperty("default") ? e.default : e;

    var _ = "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
        t = {
      name: "ar",
      weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
      weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
      weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
      months: _,
      monthsShort: _,
      weekStart: 6,
      relativeTime: {
        future: "بعد %s",
        past: "منذ %s",
        s: "ثانية واحدة",
        m: "دقيقة واحدة",
        mm: "%d دقائق",
        h: "ساعة واحدة",
        hh: "%d ساعات",
        d: "يوم واحد",
        dd: "%d أيام",
        M: "شهر واحد",
        MM: "%d أشهر",
        y: "عام واحد",
        yy: "%d أعوام"
      },
      ordinal: function (e) {
        return e;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "D/‏M/‏YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      }
    };

    return e.locale(t, null, !0), t;
  });
  return exports;
}