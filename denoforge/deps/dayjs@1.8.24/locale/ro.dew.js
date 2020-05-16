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

  !function (e, i) {
    "object" == typeof exports && true ? exports = i(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], i) : e.dayjs_locale_ro = i(e.dayjs);
  }(exports, function (e) {
    "use strict";

    e = e && e.hasOwnProperty("default") ? e.default : e;
    var i = {
      name: "ro",
      weekdays: "Duminică_Luni_Marți_Miercuri_Joi_Vineri_Sâmbătă".split("_"),
      weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),
      weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),
      months: "Ianuarie_Februarie_Martie_Aprilie_Mai_Iunie_Iulie_August_Septembrie_Octombrie_Noiembrie_Decembrie".split("_"),
      monthsShort: "Ian._Febr._Mart._Apr._Mai_Iun._Iul._Aug._Sept._Oct._Nov._Dec.".split("_"),
      weekStart: 1,
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY H:mm",
        LLLL: "dddd, D MMMM YYYY H:mm"
      },
      relativeTime: {
        future: "peste %s",
        past: "acum %s",
        s: "câteva secunde",
        m: "un minut",
        mm: "%d minute",
        h: "o oră",
        hh: "%d ore",
        d: "o zi",
        dd: "%d zile",
        M: "o lună",
        MM: "%d luni",
        y: "un an",
        yy: "%d ani"
      },
      ordinal: function (e) {
        return e;
      }
    };
    return e.locale(i, null, !0), i;
  });
  return exports;
}