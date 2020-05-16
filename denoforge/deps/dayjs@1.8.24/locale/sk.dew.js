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
    "object" == typeof exports && true ? exports = t(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], t) : e.dayjs_locale_sk = t(e.dayjs);
  }(exports, function (e) {
    "use strict";

    function t(e) {
      return e > 1 && e < 5 && 1 != ~~(e / 10);
    }

    function r(e, r, n, a) {
      var s = e + " ";

      switch (n) {
        case "s":
          return r || a ? "pár sekúnd" : "pár sekundami";

        case "m":
          return r ? "minúta" : a ? "minútu" : "minútou";

        case "mm":
          return r || a ? s + (t(e) ? "minúty" : "minút") : s + "minútami";

        case "h":
          return r ? "hodina" : a ? "hodinu" : "hodinou";

        case "hh":
          return r || a ? s + (t(e) ? "hodiny" : "hodín") : s + "hodinami";

        case "d":
          return r || a ? "deň" : "dňom";

        case "dd":
          return r || a ? s + (t(e) ? "dni" : "dní") : s + "dňami";

        case "M":
          return r || a ? "mesiac" : "mesiacom";

        case "MM":
          return r || a ? s + (t(e) ? "mesiace" : "mesiacov") : s + "mesiacmi";

        case "y":
          return r || a ? "rok" : "rokom";

        case "yy":
          return r || a ? s + (t(e) ? "roky" : "rokov") : s + "rokmi";
      }
    }

    e = e && e.hasOwnProperty("default") ? e.default : e;
    var n = {
      name: "sk",
      weekdays: "nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),
      weekdaysShort: "ne_po_ut_st_št_pi_so".split("_"),
      weekdaysMin: "ne_po_ut_st_št_pi_so".split("_"),
      months: "január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_"),
      monthsShort: "jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_"),
      weekStart: 1,
      yearStart: 4,
      ordinal: function (e) {
        return e + ".";
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd D. MMMM YYYY H:mm",
        l: "D. M. YYYY"
      },
      relativeTime: {
        future: "za %s",
        past: "pred %s",
        s: r,
        m: r,
        mm: r,
        h: r,
        hh: r,
        d: r,
        dd: r,
        M: r,
        MM: r,
        y: r,
        yy: r
      }
    };
    return e.locale(n, null, !0), n;
  });
  return exports;
}