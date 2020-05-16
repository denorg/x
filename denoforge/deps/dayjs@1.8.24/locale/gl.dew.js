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

  !function (e, o) {
    "object" == typeof exports && true ? exports = o(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], o) : e.dayjs_locale_gl = o(e.dayjs);
  }(exports, function (e) {
    "use strict";

    e = e && e.hasOwnProperty("default") ? e.default : e;
    var o = {
      name: "gl",
      weekdays: "domingo_luns_martes_mércores_xoves_venres_sábado".split("_"),
      months: "xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro".split("_"),
      weekStart: 1,
      weekdaysShort: "dom._lun._mar._mér._xov._ven._sáb.".split("_"),
      monthsShort: "xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.".split("_"),
      weekdaysMin: "do_lu_ma_mé_xo_ve_sá".split("_"),
      ordinal: function (e) {
        return e;
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D [de] MMMM [de] YYYY",
        LLL: "D [de] MMMM [de] YYYY H:mm",
        LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
      }
    };
    return e.locale(o, null, !0), o;
  });
  return exports;
}