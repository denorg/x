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
    "object" == typeof exports && true ? exports = _(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], _) : e.dayjs_locale_fr = _(e.dayjs);
  }(exports, function (e) {
    "use strict";

    e = e && e.hasOwnProperty("default") ? e.default : e;
    var _ = {
      name: "fr",
      weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
      weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
      weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
      months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
      monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
      weekStart: 1,
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "dans %s",
        past: "il y a %s",
        s: "quelques secondes",
        m: "une minute",
        mm: "%d minutes",
        h: "une heure",
        hh: "%d heures",
        d: "un jour",
        dd: "%d jours",
        M: "un mois",
        MM: "%d mois",
        y: "un an",
        yy: "%d ans"
      },
      ordinal: function (e) {
        return "" + e + (1 === e ? "er" : "");
      }
    };
    return e.locale(_, null, !0), _;
  });
  return exports;
}