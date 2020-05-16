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

  !function (e, t) {
    "object" == typeof exports && true ? exports = t(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], t) : e.dayjs_locale_tet = t(e.dayjs);
  }(exports, function (e) {
    "use strict";

    e = e && e.hasOwnProperty("default") ? e.default : e;
    var t = {
      name: "tet",
      weekdays: "Domingu_Segunda_Tersa_Kuarta_Kinta_Sesta_Sabadu".split("_"),
      months: "Janeiru_Fevereiru_Marsu_Abril_Maiu_Juñu_Jullu_Agustu_Setembru_Outubru_Novembru_Dezembru".split("_"),
      weekStart: 1,
      weekdaysShort: "Dom_Seg_Ters_Kua_Kint_Sest_Sab".split("_"),
      monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
      weekdaysMin: "Do_Seg_Te_Ku_Ki_Ses_Sa".split("_"),
      ordinal: function (e) {
        return e;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "iha %s",
        past: "%s liuba",
        s: "minutu balun",
        m: "minutu ida",
        mm: "minutu %d",
        h: "oras ida",
        hh: "oras %d",
        d: "loron ida",
        dd: "loron %d",
        M: "fulan ida",
        MM: "fulan %d",
        y: "tinan ida",
        yy: "tinan %d"
      }
    };
    return e.locale(t, null, !0), t;
  });
  return exports;
}