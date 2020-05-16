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
    "object" == typeof exports && true ? exports = e(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], e) : _.dayjs_locale_ja = e(_.dayjs);
  }(exports, function (_) {
    "use strict";

    _ = _ && _.hasOwnProperty("default") ? _.default : _;
    var e = {
      name: "ja",
      weekdays: "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),
      weekdaysShort: "日_月_火_水_木_金_土".split("_"),
      weekdaysMin: "日_月_火_水_木_金_土".split("_"),
      months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
      monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
      ordinal: function (_) {
        return _ + "日";
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY/MM/DD",
        LL: "YYYY年M月D日",
        LLL: "YYYY年M月D日 HH:mm",
        LLLL: "YYYY年M月D日 dddd HH:mm",
        l: "YYYY/MM/DD",
        ll: "YYYY年M月D日",
        lll: "YYYY年M月D日 HH:mm",
        llll: "YYYY年M月D日(ddd) HH:mm"
      },
      meridiem: function (_) {
        return _ < 12 ? "午前" : "午後";
      },
      relativeTime: {
        future: "%s後",
        past: "%s前",
        s: "数秒",
        m: "1分",
        mm: "%d分",
        h: "1時間",
        hh: "%d時間",
        d: "1日",
        dd: "%d日",
        M: "1ヶ月",
        MM: "%dヶ月",
        y: "1年",
        yy: "%d年"
      }
    };
    return _.locale(e, null, !0), e;
  });
  return exports;
}