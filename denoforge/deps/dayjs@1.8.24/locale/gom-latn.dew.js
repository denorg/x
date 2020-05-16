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

  !function (e, _) {
    "object" == typeof exports && true ? exports = _(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], _) : e.dayjs_locale_gom_latn = _(e.dayjs);
  }(exports, function (e) {
    "use strict";

    e = e && e.hasOwnProperty("default") ? e.default : e;
    var _ = {
      name: "gom-latn",
      weekdays: "Aitar_Somar_Mongllar_Budvar_Brestar_Sukrar_Son'var".split("_"),
      months: "Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr".split("_"),
      weekStart: 1,
      weekdaysShort: "Ait._Som._Mon._Bud._Bre._Suk._Son.".split("_"),
      monthsShort: "Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.".split("_"),
      weekdaysMin: "Ai_Sm_Mo_Bu_Br_Su_Sn".split("_"),
      ordinal: function (e) {
        return e;
      },
      formats: {
        LT: "A h:mm [vazta]",
        LTS: "A h:mm:ss [vazta]",
        L: "DD-MM-YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY A h:mm [vazta]",
        LLLL: "dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]",
        llll: "ddd, D MMM YYYY, A h:mm [vazta]"
      }
    };
    return e.locale(_, null, !0), _;
  });
  return exports;
}