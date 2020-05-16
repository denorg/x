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
    "object" == typeof exports && true ? exports = a(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], a) : e.dayjs_locale_sv = a(e.dayjs);
  }(exports, function (e) {
    "use strict";

    e = e && e.hasOwnProperty("default") ? e.default : e;
    var a = {
      name: "sv",
      weekdays: "söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),
      weekdaysShort: "sön_mån_tis_ons_tor_fre_lör".split("_"),
      weekdaysMin: "sö_må_ti_on_to_fr_lö".split("_"),
      months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
      monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
      weekStart: 1,
      ordinal: function (e) {
        var a = e % 10;
        return "[" + e + (1 === a || 2 === a ? "a" : "e") + "]";
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY-MM-DD",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY [kl.] HH:mm",
        LLLL: "dddd D MMMM YYYY [kl.] HH:mm",
        lll: "D MMM YYYY HH:mm",
        llll: "ddd D MMM YYYY HH:mm"
      },
      relativeTime: {
        future: "om %s",
        past: "för %s sedan",
        s: "några sekunder",
        m: "en minut",
        mm: "%d minuter",
        h: "en timme",
        hh: "%d timmar",
        d: "en dag",
        dd: "%d dagar",
        M: "en månad",
        MM: "%d månader",
        y: "ett år",
        yy: "%d år"
      }
    };
    return e.locale(a, null, !0), a;
  });
  return exports;
}