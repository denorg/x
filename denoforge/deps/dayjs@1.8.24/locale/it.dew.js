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
    "object" == typeof exports && true ? exports = o(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], o) : e.dayjs_locale_it = o(e.dayjs);
  }(exports, function (e) {
    "use strict";

    e = e && e.hasOwnProperty("default") ? e.default : e;
    var o = {
      name: "it",
      weekdays: "domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato".split("_"),
      weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"),
      weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"),
      months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),
      weekStart: 1,
      monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "tra %s",
        past: "%s fa",
        s: "qualche secondo",
        m: "un minuto",
        mm: "%d minuti",
        h: "un' ora",
        hh: "%d ore",
        d: "un giorno",
        dd: "%d giorni",
        M: "un mese",
        MM: "%d mesi",
        y: "un anno",
        yy: "%d anni"
      },
      ordinal: function (e) {
        return e + "º";
      }
    };
    return e.locale(o, null, !0), o;
  });
  return exports;
}