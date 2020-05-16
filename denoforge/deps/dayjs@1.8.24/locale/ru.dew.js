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

  !function (_, t) {
    "object" == typeof exports && true ? exports = t(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], t) : _.dayjs_locale_ru = t(_.dayjs);
  }(exports, function (_) {
    "use strict";

    _ = _ && _.hasOwnProperty("default") ? _.default : _;
    var t = "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_"),
        e = "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
        n = "янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split("_"),
        s = "янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split("_"),
        o = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;

    function r(_, t, e) {
      var n, s;
      return "m" === e ? t ? "минута" : "минуту" : _ + " " + (n = +_, s = {
        mm: t ? "минута_минуты_минут" : "минуту_минуты_минут",
        hh: "час_часа_часов",
        dd: "день_дня_дней",
        MM: "месяц_месяца_месяцев",
        yy: "год_года_лет"
      }[e].split("_"), n % 10 == 1 && n % 100 != 11 ? s[0] : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? s[1] : s[2]);
    }

    var d = {
      name: "ru",
      weekdays: "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
      weekdaysShort: "вск_пнд_втр_срд_чтв_птн_сбт".split("_"),
      weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"),
      months: function (_, n) {
        return o.test(n) ? t[_.month()] : e[_.month()];
      },
      monthsShort: function (_, t) {
        return o.test(t) ? n[_.month()] : s[_.month()];
      },
      weekStart: 1,
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY г.",
        LLL: "D MMMM YYYY г., H:mm",
        LLLL: "dddd, D MMMM YYYY г., H:mm"
      },
      relativeTime: {
        future: "через %s",
        past: "%s назад",
        s: "несколько секунд",
        m: r,
        mm: r,
        h: "час",
        hh: r,
        d: "день",
        dd: r,
        M: "месяц",
        MM: r,
        y: "год",
        yy: r
      },
      ordinal: function (_) {
        return _;
      }
    };
    return _.locale(d, null, !0), d;
  });
  return exports;
}