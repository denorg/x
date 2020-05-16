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
    "object" == typeof exports && true ? exports = e(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], e) : _.dayjs_locale_si = e(_.dayjs);
  }(exports, function (_) {
    "use strict";

    _ = _ && _.hasOwnProperty("default") ? _.default : _;
    var e = {
      name: "si",
      weekdays: "ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා".split("_"),
      months: "ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්".split("_"),
      weekdaysShort: "ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන".split("_"),
      monthsShort: "ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ".split("_"),
      weekdaysMin: "ඉ_ස_අ_බ_බ්‍ර_සි_සෙ".split("_"),
      ordinal: function (_) {
        return _;
      },
      formats: {
        LT: "a h:mm",
        LTS: "a h:mm:ss",
        L: "YYYY/MM/DD",
        LL: "YYYY MMMM D",
        LLL: "YYYY MMMM D, a h:mm",
        LLLL: "YYYY MMMM D [වැනි] dddd, a h:mm:ss"
      },
      relativeTime: {
        future: "%sකින්",
        past: "%sකට පෙර",
        s: "තත්පර කිහිපය",
        m: "මිනිත්තුව",
        mm: "මිනිත්තු %d",
        h: "පැය",
        hh: "පැය %d",
        d: "දිනය",
        dd: "දින %d",
        M: "මාසය",
        MM: "මාස %d",
        y: "වසර",
        yy: "වසර %d"
      }
    };
    return _.locale(e, null, !0), e;
  });
  return exports;
}