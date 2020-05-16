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

  !function (o, e) {
    "object" == typeof exports && true ? exports = e(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], e) : o.dayjs_locale_eo = e(o.dayjs);
  }(exports, function (o) {
    "use strict";

    o = o && o.hasOwnProperty("default") ? o.default : o;
    var e = {
      name: "eo",
      weekdays: "dimanĉo_lundo_mardo_merkredo_ĵaŭdo_vendredo_sabato".split("_"),
      months: "januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split("_"),
      weekStart: 1,
      weekdaysShort: "dim_lun_mard_merk_ĵaŭ_ven_sab".split("_"),
      monthsShort: "jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec".split("_"),
      weekdaysMin: "di_lu_ma_me_ĵa_ve_sa".split("_"),
      ordinal: function (o) {
        return o;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY-MM-DD",
        LL: "D[-a de] MMMM, YYYY",
        LLL: "D[-a de] MMMM, YYYY HH:mm",
        LLLL: "dddd, [la] D[-a de] MMMM, YYYY HH:mm"
      },
      relativeTime: {
        future: "post %s",
        past: "antaŭ %s",
        s: "sekundoj",
        m: "minuto",
        mm: "%d minutoj",
        h: "horo",
        hh: "%d horoj",
        d: "tago",
        dd: "%d tagoj",
        M: "monato",
        MM: "%d monatoj",
        y: "jaro",
        yy: "%d jaroj"
      }
    };
    return o.locale(e, null, !0), e;
  });
  return exports;
}