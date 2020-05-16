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

  !function (e, n) {
    "object" == typeof exports && true ? exports = n(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], n) : e.dayjs_locale_jv = n(e.dayjs);
  }(exports, function (e) {
    "use strict";

    e = e && e.hasOwnProperty("default") ? e.default : e;
    var n = {
      name: "jv",
      weekdays: "Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"),
      months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split("_"),
      weekStart: 1,
      weekdaysShort: "Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"),
      monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"),
      weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"),
      ordinal: function (e) {
        return e;
      },
      formats: {
        LT: "HH.mm",
        LTS: "HH.mm.ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY [pukul] HH.mm",
        LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
      },
      relativeTime: {
        future: "wonten ing %s",
        past: "%s ingkang kepengker",
        s: "sawetawis detik",
        m: "setunggal menit",
        mm: "%d menit",
        h: "setunggal jam",
        hh: "%d jam",
        d: "sedinten",
        dd: "%d dinten",
        M: "sewulan",
        MM: "%d wulan",
        y: "setaun",
        yy: "%d taun"
      }
    };
    return e.locale(n, null, !0), n;
  });
  return exports;
}