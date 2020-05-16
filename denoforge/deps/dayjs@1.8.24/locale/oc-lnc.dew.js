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

  !function (e, d) {
    "object" == typeof exports && true ? exports = d(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], d) : e.dayjs_locale_oc_lnc = d(e.dayjs);
  }(exports, function (e) {
    "use strict";

    e = e && e.hasOwnProperty("default") ? e.default : e;
    var d = {
      name: "oc-lnc",
      weekdays: "dimenge_diluns_dimars_dimècres_dijòus_divendres_dissabte".split("_"),
      weekdaysShort: "Dg_Dl_Dm_Dc_Dj_Dv_Ds".split("_"),
      weekdaysMin: "dg_dl_dm_dc_dj_dv_ds".split("_"),
      months: "genièr_febrièr_març_abrial_mai_junh_julhet_agost_setembre_octòbre_novembre_decembre".split("_"),
      monthsShort: "gen_feb_març_abr_mai_junh_julh_ago_set_oct_nov_dec".split("_"),
      weekStart: 1,
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM [de] YYYY",
        LLL: "D MMMM [de] YYYY [a] H:mm",
        LLLL: "dddd D MMMM [de] YYYY [a] H:mm"
      },
      relativeTime: {
        future: "d'aquí %s",
        past: "fa %s",
        s: "unas segondas",
        m: "una minuta",
        mm: "%d minutas",
        h: "una ora",
        hh: "%d oras",
        d: "un jorn",
        dd: "%d jorns",
        M: "un mes",
        MM: "%d meses",
        y: "un an",
        yy: "%d ans"
      },
      ordinal: function (e) {
        return e + "º";
      }
    };
    return e.locale(d, null, !0), d;
  });
  return exports;
}