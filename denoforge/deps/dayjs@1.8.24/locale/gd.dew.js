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

  !function (a, i) {
    "object" == typeof exports && true ? exports = i(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], i) : a.dayjs_locale_gd = i(a.dayjs);
  }(exports, function (a) {
    "use strict";

    a = a && a.hasOwnProperty("default") ? a.default : a;
    var i = {
      name: "gd",
      weekdays: "Didòmhnaich_Diluain_Dimàirt_Diciadain_Diardaoin_Dihaoine_Disathairne".split("_"),
      months: "Am Faoilleach_An Gearran_Am Màrt_An Giblean_An Cèitean_An t-Ògmhios_An t-Iuchar_An Lùnastal_An t-Sultain_An Dàmhair_An t-Samhain_An Dùbhlachd".split("_"),
      weekStart: 1,
      weekdaysShort: "Did_Dil_Dim_Dic_Dia_Dih_Dis".split("_"),
      monthsShort: "Faoi_Gear_Màrt_Gibl_Cèit_Ògmh_Iuch_Lùn_Sult_Dàmh_Samh_Dùbh".split("_"),
      weekdaysMin: "Dò_Lu_Mà_Ci_Ar_Ha_Sa".split("_"),
      ordinal: function (a) {
        return a;
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
        future: "ann an %s",
        past: "bho chionn %s",
        s: "beagan diogan",
        m: "mionaid",
        mm: "%d mionaidean",
        h: "uair",
        hh: "%d uairean",
        d: "latha",
        dd: "%d latha",
        M: "mìos",
        MM: "%d mìosan",
        y: "bliadhna",
        yy: "%d bliadhna"
      }
    };
    return a.locale(i, null, !0), i;
  });
  return exports;
}