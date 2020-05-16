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
    "object" == typeof exports && true ? exports = e(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], e) : a.dayjs_locale_az = e(a.dayjs);
  }(exports, function (a) {
    "use strict";

    a = a && a.hasOwnProperty("default") ? a.default : a;
    var e = {
      name: "az",
      weekdays: "Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə".split("_"),
      weekdaysShort: "Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən".split("_"),
      weekdaysMin: "Bz_BE_ÇA_Çə_CA_Cü_Şə".split("_"),
      months: "yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"),
      monthsShort: "yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"),
      weekStart: 1,
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY г.",
        LLL: "D MMMM YYYY г., H:mm",
        LLLL: "dddd, D MMMM YYYY г., H:mm"
      },
      relativeTime: {
        future: "%s sonra",
        past: "%s əvvəl",
        s: "bir neçə saniyə",
        m: "bir dəqiqə",
        mm: "%d dəqiqə",
        h: "bir saat",
        hh: "%d saat",
        d: "bir gün",
        dd: "%d gün",
        M: "bir ay",
        MM: "%d ay",
        y: "bir il",
        yy: "%d il"
      },
      ordinal: function (a) {
        return a;
      }
    };
    return a.locale(e, null, !0), e;
  });
  return exports;
}