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
    "object" == typeof exports && true ? exports = a(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], a) : e.dayjs_locale_nl = a(e.dayjs);
  }(exports, function (e) {
    "use strict";

    e = e && e.hasOwnProperty("default") ? e.default : e;
    var a = {
      name: "nl",
      weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
      weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
      weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"),
      months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
      monthsShort: "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),
      ordinal: function (e) {
        return e + ".";
      },
      weekStart: 1,
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD-MM-YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "over %s",
        past: "%s geleden",
        s: "een paar seconden",
        m: "een minuut",
        mm: "%d minuten",
        h: "een uur",
        hh: "%d uur",
        d: "een dag",
        dd: "%d dagen",
        M: "een maand",
        MM: "%d maanden",
        y: "een jaar",
        yy: "%d jaar"
      }
    };
    return e.locale(a, null, !0), a;
  });
  return exports;
}