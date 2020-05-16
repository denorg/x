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

  !function (e, r) {
    "object" == typeof exports && true ? exports = r(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], r) : e.dayjs_locale_fo = r(e.dayjs);
  }(exports, function (e) {
    "use strict";

    e = e && e.hasOwnProperty("default") ? e.default : e;
    var r = {
      name: "fo",
      weekdays: "sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur".split("_"),
      months: "januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember".split("_"),
      weekStart: 1,
      weekdaysShort: "sun_mán_týs_mik_hós_frí_ley".split("_"),
      monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
      weekdaysMin: "su_má_tý_mi_hó_fr_le".split("_"),
      ordinal: function (e) {
        return e;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D. MMMM, YYYY HH:mm"
      },
      relativeTime: {
        future: "um %s",
        past: "%s síðani",
        s: "fá sekund",
        m: "ein minuttur",
        mm: "%d minuttir",
        h: "ein tími",
        hh: "%d tímar",
        d: "ein dagur",
        dd: "%d dagar",
        M: "ein mánaður",
        MM: "%d mánaðir",
        y: "eitt ár",
        yy: "%d ár"
      }
    };
    return e.locale(r, null, !0), r;
  });
  return exports;
}