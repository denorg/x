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

  !function (_, e) {
    "object" == typeof exports && true ? exports = e(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], e) : _.dayjs_locale_ar_tn = e(_.dayjs);
  }(exports, function (_) {
    "use strict";

    _ = _ && _.hasOwnProperty("default") ? _.default : _;
    var e = {
      name: "ar-tn",
      weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
      months: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
      weekStart: 1,
      weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
      monthsShort: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
      weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
      ordinal: function (_) {
        return _;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "في %s",
        past: "منذ %s",
        s: "ثوان",
        m: "دقيقة",
        mm: "%d دقائق",
        h: "ساعة",
        hh: "%d ساعات",
        d: "يوم",
        dd: "%d أيام",
        M: "شهر",
        MM: "%d أشهر",
        y: "سنة",
        yy: "%d سنوات"
      }
    };
    return _.locale(e, null, !0), e;
  });
  return exports;
}