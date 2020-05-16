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

  !function (a, e) {
    "object" == typeof exports && true ? exports = e(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], e) : a.dayjs_locale_se = e(a.dayjs);
  }(exports, function (a) {
    "use strict";

    a = a && a.hasOwnProperty("default") ? a.default : a;
    var e = {
      name: "se",
      weekdays: "sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat".split("_"),
      months: "ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu".split("_"),
      weekStart: 1,
      weekdaysShort: "sotn_vuos_maŋ_gask_duor_bear_láv".split("_"),
      monthsShort: "ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov".split("_"),
      weekdaysMin: "s_v_m_g_d_b_L".split("_"),
      ordinal: function (a) {
        return a;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "MMMM D. [b.] YYYY",
        LLL: "MMMM D. [b.] YYYY [ti.] HH:mm",
        LLLL: "dddd, MMMM D. [b.] YYYY [ti.] HH:mm"
      },
      relativeTime: {
        future: "%s geažes",
        past: "maŋit %s",
        s: "moadde sekunddat",
        m: "okta minuhta",
        mm: "%d minuhtat",
        h: "okta diimmu",
        hh: "%d diimmut",
        d: "okta beaivi",
        dd: "%d beaivvit",
        M: "okta mánnu",
        MM: "%d mánut",
        y: "okta jahki",
        yy: "%d jagit"
      }
    };
    return a.locale(e, null, !0), e;
  });
  return exports;
}