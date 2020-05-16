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

  !function (e, _) {
    "object" == typeof exports && true ? exports = _(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], _) : e.dayjs_locale_bs = _(e.dayjs);
  }(exports, function (e) {
    "use strict";

    e = e && e.hasOwnProperty("default") ? e.default : e;
    var _ = {
      name: "bs",
      weekdays: "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),
      months: "januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split("_"),
      weekStart: 1,
      weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"),
      monthsShort: "jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split("_"),
      weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
      ordinal: function (e) {
        return e;
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd, D. MMMM YYYY H:mm"
      }
    };
    return e.locale(_, null, !0), _;
  });
  return exports;
}