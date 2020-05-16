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
    "object" == typeof exports && true ? exports = o(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], o) : e.dayjs_locale_es_do = o(e.dayjs);
  }(exports, function (e) {
    "use strict";

    e = e && e.hasOwnProperty("default") ? e.default : e;
    var o = {
      name: "es-do",
      weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
      weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
      weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
      months: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),
      monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
      weekStart: 1,
      relativeTime: {
        future: "en %s",
        past: "hace %s",
        s: "unos segundos",
        m: "un minuto",
        mm: "%d minutos",
        h: "una hora",
        hh: "%d horas",
        d: "un día",
        dd: "%d días",
        M: "un mes",
        MM: "%d meses",
        y: "un año",
        yy: "%d años"
      },
      ordinal: function (e) {
        return e + "º";
      },
      formats: {
        LT: "h:mm A",
        LTS: "h:mm:ss A",
        L: "DD/MM/YYYY",
        LL: "D [de] MMMM [de] YYYY",
        LLL: "D [de] MMMM [de] YYYY h:mm A",
        LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A"
      }
    };
    return e.locale(o, null, !0), o;
  });
  return exports;
}