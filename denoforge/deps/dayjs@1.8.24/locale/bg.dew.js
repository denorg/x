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
    "object" == typeof exports && true ? exports = e(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], e) : _.dayjs_locale_bg = e(_.dayjs);
  }(exports, function (_) {
    "use strict";

    _ = _ && _.hasOwnProperty("default") ? _.default : _;
    var e = {
      name: "bg",
      weekdays: "Неделя_Понеделник_Вторник_Сряда_Четвъртък_Петък_Събота".split("_"),
      weekdaysShort: "нед_пон_вто_сря_чет_пет_съб".split("_"),
      weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
      months: "Януари_Февруари_Март_Април_Май_Юни_Юли_Август_Септември_Октомври_Ноември_Декември".split("_"),
      monthsShort: "Янр_Фев_Мар_Апр_Май_Юни_Юли_Авг_Сеп_Окт_Ное_Дек".split("_"),
      weekStart: 1,
      ordinal: function (_) {
        return _ + ".";
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "D.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY H:mm",
        LLLL: "dddd, D MMMM YYYY H:mm"
      },
      relativeTime: {
        future: "след %s",
        past: "преди %s",
        s: "няколко секунди",
        m: "минута",
        mm: "%d минути",
        h: "час",
        hh: "%d часа",
        d: "ден",
        dd: "%d дни",
        M: "месец",
        MM: "%d месеца",
        y: "година",
        yy: "%d години"
      }
    };
    return _.locale(e, null, !0), e;
  });
  return exports;
}