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

  !function (t, e) {
    "object" == typeof exports && true ? exports = e(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], e) : t.dayjs_locale_sq = e(t.dayjs);
  }(exports, function (t) {
    "use strict";

    t = t && t.hasOwnProperty("default") ? t.default : t;
    var e = {
      name: "sq",
      weekdays: "E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë".split("_"),
      months: "Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split("_"),
      weekStart: 1,
      weekdaysShort: "Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"),
      monthsShort: "Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"),
      weekdaysMin: "D_H_Ma_Më_E_P_Sh".split("_"),
      ordinal: function (t) {
        return t;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "në %s",
        past: "%s më parë",
        s: "disa sekonda",
        m: "një minutë",
        mm: "%d minuta",
        h: "një orë",
        hh: "%d orë",
        d: "një ditë",
        dd: "%d ditë",
        M: "një muaj",
        MM: "%d muaj",
        y: "një vit",
        yy: "%d vite"
      }
    };
    return t.locale(e, null, !0), e;
  });
  return exports;
}