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

  !function (_, d) {
    "object" == typeof exports && true ? exports = d(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], d) : _.dayjs_locale_x_pseudo = d(_.dayjs);
  }(exports, function (_) {
    "use strict";

    _ = _ && _.hasOwnProperty("default") ? _.default : _;
    var d = {
      name: "x-pseudo",
      weekdays: "S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý".split("_"),
      months: "J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér".split("_"),
      weekStart: 1,
      weekdaysShort: "S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát".split("_"),
      monthsShort: "J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc".split("_"),
      weekdaysMin: "S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá".split("_"),
      ordinal: function (_) {
        return _;
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
        future: "í~ñ %s",
        past: "%s á~gó",
        s: "á ~féw ~sécó~ñds",
        m: "á ~míñ~úté",
        mm: "%d m~íñú~tés",
        h: "á~ñ hó~úr",
        hh: "%d h~óúrs",
        d: "á ~dáý",
        dd: "%d d~áýs",
        M: "á ~móñ~th",
        MM: "%d m~óñt~hs",
        y: "á ~ýéár",
        yy: "%d ý~éárs"
      }
    };
    return _.locale(d, null, !0), d;
  });
  return exports;
}