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
    "object" == typeof exports && true ? exports = s(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], s) : e.dayjs_locale_ca = s(e.dayjs);
  }(exports, function (e) {
    "use strict";

    e = e && e.hasOwnProperty("default") ? e.default : e;
    var s = {
      name: "ca",
      weekdays: "Diumenge_Dilluns_Dimarts_Dimecres_Dijous_Divendres_Dissabte".split("_"),
      weekdaysShort: "Dg._Dl._Dt._Dc._Dj._Dv._Ds.".split("_"),
      weekdaysMin: "Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"),
      months: "Gener_Febrer_Març_Abril_Maig_Juny_Juliol_Agost_Setembre_Octubre_Novembre_Desembre".split("_"),
      monthsShort: "Gen._Febr._Març_Abr._Maig_Juny_Jul._Ag._Set._Oct._Nov._Des.".split("_"),
      weekStart: 1,
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM [de] YYYY",
        LLL: "D MMMM [de] YYYY [a les] H:mm",
        LLLL: "dddd D MMMM [de] YYYY [a les] H:mm",
        ll: "D MMM YYYY",
        lll: "D MMM YYYY, H:mm",
        llll: "ddd D MMM YYYY, H:mm"
      },
      relativeTime: {
        future: "d'aquí %s",
        past: "fa %s",
        s: "uns segons",
        m: "un minut",
        mm: "%d minuts",
        h: "una hora",
        hh: "%d hores",
        d: "un dia",
        dd: "%d dies",
        M: "un mes",
        MM: "%d mesos",
        y: "un any",
        yy: "%d anys"
      },
      ordinal: function (e) {
        return e + "º";
      }
    };
    return e.locale(s, null, !0), s;
  });
  return exports;
}