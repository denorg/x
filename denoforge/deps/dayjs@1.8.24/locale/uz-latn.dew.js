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

  !function (a, e) {
    "object" == typeof exports && true ? exports = e(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], e) : a.dayjs_locale_uz_latn = e(a.dayjs);
  }(exports, function (a) {
    "use strict";

    a = a && a.hasOwnProperty("default") ? a.default : a;
    var e = {
      name: "uz-latn",
      weekdays: "Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba".split("_"),
      months: "Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr".split("_"),
      weekStart: 1,
      weekdaysShort: "Yak_Dush_Sesh_Chor_Pay_Jum_Shan".split("_"),
      monthsShort: "Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek".split("_"),
      weekdaysMin: "Ya_Du_Se_Cho_Pa_Ju_Sha".split("_"),
      ordinal: function (a) {
        return a;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "D MMMM YYYY, dddd HH:mm"
      },
      relativeTime: {
        future: "Yaqin %s ichida",
        past: "Bir necha %s oldin",
        s: "soniya",
        m: "bir daqiqa",
        mm: "%d daqiqa",
        h: "bir soat",
        hh: "%d soat",
        d: "bir kun",
        dd: "%d kun",
        M: "bir oy",
        MM: "%d oy",
        y: "bir yil",
        yy: "%d yil"
      }
    };
    return a.locale(e, null, !0), e;
  });
  return exports;
}