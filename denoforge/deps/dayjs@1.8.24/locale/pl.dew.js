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
    "object" == typeof exports && true ? exports = t(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], t) : e.dayjs_locale_pl = t(e.dayjs);
  }(exports, function (e) {
    "use strict";

    function t(e) {
      return e % 10 < 5 && e % 10 > 1 && ~~(e / 10) % 10 != 1;
    }

    function i(e, i, r) {
      var n = e + " ";

      switch (r) {
        case "m":
          return i ? "minuta" : "minutę";

        case "mm":
          return n + (t(e) ? "minuty" : "minut");

        case "h":
          return i ? "godzina" : "godzinę";

        case "hh":
          return n + (t(e) ? "godziny" : "godzin");

        case "MM":
          return n + (t(e) ? "miesiące" : "miesięcy");

        case "yy":
          return n + (t(e) ? "lata" : "lat");
      }
    }

    e = e && e.hasOwnProperty("default") ? e.default : e;
    var r = {
      name: "pl",
      weekdays: "Niedziela_Poniedziałek_Wtorek_Środa_Czwartek_Piątek_Sobota".split("_"),
      weekdaysShort: "Ndz_Pon_Wt_Śr_Czw_Pt_Sob".split("_"),
      weekdaysMin: "Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"),
      months: "Styczeń_Luty_Marzec_Kwiecień_Maj_Czerwiec_Lipiec_Sierpień_Wrzesień_Październik_Listopad_Grudzień".split("_"),
      monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),
      ordinal: function (e) {
        return e + ".";
      },
      weekStart: 1,
      relativeTime: {
        future: "za %s",
        past: "%s temu",
        s: "kilka sekund",
        m: i,
        mm: i,
        h: i,
        hh: i,
        d: "1 dzień",
        dd: "%d dni",
        M: "miesiąc",
        MM: i,
        y: "rok",
        yy: i
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      }
    };
    return e.locale(r, null, !0), r;
  });
  return exports;
}