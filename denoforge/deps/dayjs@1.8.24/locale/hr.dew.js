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

  !function (e, a) {
    "object" == typeof exports && true ? exports = a(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], a) : e.dayjs_locale_hr = a(e.dayjs);
  }(exports, function (e) {
    "use strict";

    e = e && e.hasOwnProperty("default") ? e.default : e;
    var a = {
      name: "hr",
      weekdays: "Nedjelja_Ponedjeljak_Utorak_Srijeda_Četvrtak_Petak_Subota".split("_"),
      weekdaysShort: "Ned._Pon._Uto._Sri._Čet._Pet._Sub.".split("_"),
      weekdaysMin: "Ne_Po_Ut_Sr_Če_Pe_Su".split("_"),
      months: "Siječanj_Veljača_Ožujak_Travanj_Svibanj_Lipanj_Srpanj_Kolovoz_Rujan_Listopad_Studeni_Prosinac".split("_"),
      monthsShort: "Sij._Velj._Ožu._Tra._Svi._Lip._Srp._Kol._Ruj._Lis._Stu._Pro.".split("_"),
      weekStart: 1,
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd, D. MMMM YYYY H:mm"
      },
      relativeTime: {
        future: "za %s",
        past: "prije %s",
        s: "sekunda",
        m: "minuta",
        mm: "%d minuta",
        h: "sat",
        hh: "%d sati",
        d: "dan",
        dd: "%d dana",
        M: "mjesec",
        MM: "%d mjeseci",
        y: "godina",
        yy: "%d godine"
      },
      ordinal: function (e) {
        return e + ".";
      }
    };
    return e.locale(a, null, !0), a;
  });
  return exports;
}