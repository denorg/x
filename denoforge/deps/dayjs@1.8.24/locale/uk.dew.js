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
    "object" == typeof exports && true ? exports = e(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], e) : _.dayjs_locale_uk = e(_.dayjs);
  }(exports, function (_) {
    "use strict";

    function e(_, e, t) {
      var s, d;
      return "m" === t ? e ? "хвилина" : "хвилину" : "h" === t ? e ? "година" : "годину" : _ + " " + (s = +_, d = {
        ss: e ? "секунда_секунди_секунд" : "секунду_секунди_секунд",
        mm: e ? "хвилина_хвилини_хвилин" : "хвилину_хвилини_хвилин",
        hh: e ? "година_години_годин" : "годину_години_годин",
        dd: "день_дні_днів",
        MM: "місяць_місяці_місяців",
        yy: "рік_роки_років"
      }[t].split("_"), s % 10 == 1 && s % 100 != 11 ? d[0] : s % 10 >= 2 && s % 10 <= 4 && (s % 100 < 10 || s % 100 >= 20) ? d[1] : d[2]);
    }

    _ = _ && _.hasOwnProperty("default") ? _.default : _;
    var t = {
      name: "uk",
      weekdays: "неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"),
      weekdaysShort: "ндл_пнд_втр_срд_чтв_птн_сбт".split("_"),
      weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
      months: "січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_"),
      monthsShort: "сiч_лют_бер_квiт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"),
      weekStart: 1,
      relativeTime: {
        future: "за %s",
        past: "%s тому",
        s: "декілька секунд",
        m: e,
        mm: e,
        h: e,
        hh: e,
        d: "день",
        dd: e,
        M: "місяць",
        MM: e,
        y: "рік",
        yy: e
      },
      ordinal: function (_) {
        return _;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY р.",
        LLL: "D MMMM YYYY р., HH:mm",
        LLLL: "dddd, D MMMM YYYY р., HH:mm"
      }
    };
    return _.locale(t, null, !0), t;
  });
  return exports;
}