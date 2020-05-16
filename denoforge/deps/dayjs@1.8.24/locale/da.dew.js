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
    "object" == typeof exports && true ? exports = t(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], t) : e.dayjs_locale_da = t(e.dayjs);
  }(exports, function (e) {
    "use strict";

    e = e && e.hasOwnProperty("default") ? e.default : e;
    var t = {
      name: "da",
      weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
      weekdaysShort: "søn._man._tirs._ons._tors._fre._lør.".split("_"),
      weekdaysMin: "sø._ma._ti._on._to._fr._lø.".split("_"),
      months: "januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),
      monthsShort: "jan._feb._mar._apr._maj_juni_juli_aug._sept._okt._nov._dec.".split("_"),
      weekStart: 1,
      ordinal: function (e) {
        return e + ".";
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY HH:mm",
        LLLL: "dddd [d.] D. MMMM YYYY [kl.] HH:mm"
      },
      relativeTime: {
        future: "om %s",
        past: "%s siden",
        s: "få sekunder",
        m: "et minut",
        mm: "%d minutter",
        h: "en time",
        hh: "%d timer",
        d: "en dag",
        dd: "%d dage",
        M: "en måned",
        MM: "%d måneder",
        y: "et år",
        yy: "%d år"
      }
    };
    return e.locale(t, null, !0), t;
  });
  return exports;
}