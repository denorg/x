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

  !function (a, i) {
    "object" == typeof exports && true ? exports = i(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], i) : a.dayjs_locale_ga = i(a.dayjs);
  }(exports, function (a) {
    "use strict";

    a = a && a.hasOwnProperty("default") ? a.default : a;
    var i = {
      name: "ga",
      weekdays: "Dé Domhnaigh_Dé Luain_Dé Máirt_Dé Céadaoin_Déardaoin_Dé hAoine_Dé Satharn".split("_"),
      months: "Eanáir_Feabhra_Márta_Aibreán_Bealtaine_Méitheamh_Iúil_Lúnasa_Meán Fómhair_Deaireadh Fómhair_Samhain_Nollaig".split("_"),
      weekStart: 1,
      weekdaysShort: "Dom_Lua_Mái_Céa_Déa_hAo_Sat".split("_"),
      monthsShort: "Eaná_Feab_Márt_Aibr_Beal_Méit_Iúil_Lúna_Meán_Deai_Samh_Noll".split("_"),
      weekdaysMin: "Do_Lu_Má_Ce_Dé_hA_Sa".split("_"),
      ordinal: function (a) {
        return a;
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
        future: "i %s",
        past: "%s ó shin",
        s: "cúpla soicind",
        m: "nóiméad",
        mm: "%d nóiméad",
        h: "uair an chloig",
        hh: "%d uair an chloig",
        d: "lá",
        dd: "%d lá",
        M: "mí",
        MM: "%d mí",
        y: "bliain",
        yy: "%d bliain"
      }
    };
    return a.locale(i, null, !0), i;
  });
  return exports;
}