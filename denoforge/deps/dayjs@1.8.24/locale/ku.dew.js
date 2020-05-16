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

  !function (_, e) {
    "object" == typeof exports && true ? exports = e(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], e) : _.dayjs_locale_ku = e(_.dayjs);
  }(exports, function (_) {
    "use strict";

    _ = _ && _.hasOwnProperty("default") ? _.default : _;
    var e = {
      name: "ku",
      weekdays: "یه‌كشه‌ممه‌_دووشه‌ممه‌_سێشه‌ممه‌_چوارشه‌ممه‌_پێنجشه‌ممه‌_هه‌ینی_شه‌ممه‌".split("_"),
      months: "کانونی دووەم_شوبات_ئازار_نیسان_ئایار_حوزەیران_تەمموز_ئاب_ئەیلوول_تشرینی یەكەم_تشرینی دووەم_كانونی یەکەم".split("_"),
      weekStart: 6,
      weekdaysShort: "یه‌كشه‌م_دووشه‌م_سێشه‌م_چوارشه‌م_پێنجشه‌م_هه‌ینی_شه‌ممه‌".split("_"),
      monthsShort: "کانونی دووەم_شوبات_ئازار_نیسان_ئایار_حوزەیران_تەمموز_ئاب_ئەیلوول_تشرینی یەكەم_تشرینی دووەم_كانونی یەکەم".split("_"),
      weekdaysMin: "ی_د_س_چ_پ_ه_ش".split("_"),
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
        future: "له‌ %s",
        past: "%s",
        s: "چه‌ند چركه‌یه‌ك",
        m: "یه‌ك خوله‌ك",
        mm: "%d خوله‌ك",
        h: "یه‌ك كاتژمێر",
        hh: "%d كاتژمێر",
        d: "یه‌ك ڕۆژ",
        dd: "%d ڕۆژ",
        M: "یه‌ك مانگ",
        MM: "%d مانگ",
        y: "یه‌ك ساڵ",
        yy: "%d ساڵ"
      }
    };
    return _.locale(e, null, !0), e;
  });
  return exports;
}