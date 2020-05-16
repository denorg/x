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

  !function (e, t) {
    "object" == typeof exports && true ? exports = t(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], t) : e.dayjs_locale_sr = t(e.dayjs);
  }(exports, function (e) {
    "use strict";

    e = e && e.hasOwnProperty("default") ? e.default : e;
    var t = {
      name: "sr",
      weekdays: "Nedelja_Ponedeljak_Utorak_Sreda_Četvrtak_Petak_Subota".split("_"),
      weekdaysShort: "Ned._Pon._Uto._Sre._Čet._Pet._Sub.".split("_"),
      weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
      months: "Januar_Februar_Mart_April_Maj_Jun_Jul_Avgust_Septembar_Oktobar_Novembar_Decembar".split("_"),
      monthsShort: "Jan._Feb._Mar._Apr._Maj_Jun_Jul_Avg._Sep._Okt._Nov._Dec.".split("_"),
      weekStart: 1,
      relativeTime: {
        future: "za %s",
        past: "pre %s",
        s: "sekunda",
        m: "minut",
        mm: "%d minuta",
        h: "sat",
        hh: "%d sati",
        d: "dan",
        dd: "%d dana",
        M: "mesec",
        MM: "%d meseci",
        y: "godina",
        yy: "%d godine"
      },
      ordinal: function (e) {
        return e + ".";
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd, D. MMMM YYYY H:mm"
      }
    };
    return e.locale(t, null, !0), t;
  });
  return exports;
}