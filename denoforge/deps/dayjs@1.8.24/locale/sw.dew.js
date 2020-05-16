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
    "object" == typeof exports && true ? exports = e(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], e) : a.dayjs_locale_sw = e(a.dayjs);
  }(exports, function (a) {
    "use strict";

    a = a && a.hasOwnProperty("default") ? a.default : a;
    var e = {
      name: "sw",
      weekdays: "Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi".split("_"),
      weekdaysShort: "Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos".split("_"),
      weekdaysMin: "J2_J3_J4_J5_Al_Ij_J1".split("_"),
      months: "Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba".split("_"),
      monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des".split("_"),
      weekStart: 1,
      ordinal: function (a) {
        return a;
      },
      relativeTime: {
        future: "%s baadaye",
        past: "tokea %s",
        s: "hivi punde",
        m: "dakika moja",
        mm: "dakika %d",
        h: "saa limoja",
        hh: "masaa %d",
        d: "siku moja",
        dd: "masiku %d",
        M: "mwezi mmoja",
        MM: "miezi %d",
        y: "mwaka mmoja",
        yy: "miaka %d"
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      }
    };
    return a.locale(e, null, !0), e;
  });
  return exports;
}