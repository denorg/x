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
    "object" == typeof exports && true ? exports = e(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], e) : _.dayjs_locale_sr_cyrl = e(_.dayjs);
  }(exports, function (_) {
    "use strict";

    _ = _ && _.hasOwnProperty("default") ? _.default : _;
    var e = {
      name: "sr-cyrl",
      weekdays: "Недеља_Понедељак_Уторак_Среда_Четвртак_Петак_Субота".split("_"),
      weekdaysShort: "Нед._Пон._Уто._Сре._Чет._Пет._Суб.".split("_"),
      weekdaysMin: "не_по_ут_ср_че_пе_су".split("_"),
      months: "Јануар_Фебруар_Март_Април_Мај_Јун_Јул_Август_Септембар_Октобар_Новембар_Децембар".split("_"),
      monthsShort: "Јан._Феб._Мар._Апр._Мај_Јун_Јул_Авг._Сеп._Окт._Нов._Дец.".split("_"),
      weekStart: 1,
      relativeTime: {
        future: "за %s",
        past: "пре %s",
        s: "секунда",
        m: "минут",
        mm: "%d минута",
        h: "сат",
        hh: "%d сати",
        d: "дан",
        dd: "%d дана",
        M: "месец",
        MM: "%d месеци",
        y: "година",
        yy: "%d године"
      },
      ordinal: function (_) {
        return _ + ".";
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
    return _.locale(e, null, !0), e;
  });
  return exports;
}