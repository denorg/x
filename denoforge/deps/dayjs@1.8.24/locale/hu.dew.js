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

  !function (e, s) {
    "object" == typeof exports && true ? exports = s(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], s) : e.dayjs_locale_hu = s(e.dayjs);
  }(exports, function (e) {
    "use strict";

    e = e && e.hasOwnProperty("default") ? e.default : e;
    var s = {
      name: "hu",
      weekdays: "vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),
      weekdaysShort: "vas_hét_kedd_sze_csüt_pén_szo".split("_"),
      weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"),
      months: "január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),
      monthsShort: "jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),
      ordinal: function (e) {
        return e + ".";
      },
      weekStart: 1,
      relativeTime: {
        future: "%s múlva",
        past: "%s",
        s: "néhány másodperc",
        m: "egy perc",
        mm: "%d perc",
        h: "egy óra",
        hh: "%d óra",
        d: "egy nap",
        dd: "%d nap",
        M: "egy hónap",
        MM: "%d hónap",
        y: "egy éve",
        yy: "%d év"
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "YYYY.MM.DD.",
        LL: "YYYY. MMMM D.",
        LLL: "YYYY. MMMM D. H:mm",
        LLLL: "YYYY. MMMM D., dddd H:mm"
      }
    };
    return e.locale(s, null, !0), s;
  });
  return exports;
}