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
    "object" == typeof exports && true ? exports = e(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], e) : _.dayjs_locale_ne = e(_.dayjs);
  }(exports, function (_) {
    "use strict";

    _ = _ && _.hasOwnProperty("default") ? _.default : _;
    var e = {
      name: "ne",
      weekdays: "आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार".split("_"),
      weekdaysShort: "आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.".split("_"),
      weekdaysMin: "आ._सो._मं._बु._बि._शु._श.".split("_"),
      months: "जनवरी_फेब्रुवरी_मार्च_अप्रिल_मे_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर".split("_"),
      monthsShort: "जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.".split("_"),
      relativeTime: {
        future: "%s पछि",
        past: "%s अघि",
        s: "सेकेन्ड",
        m: "एक मिनेट",
        mm: "%d मिनेट",
        h: "घन्टा",
        hh: "%d घन्टा",
        d: "एक दिन",
        dd: "%d दिन",
        M: "एक महिना",
        MM: "%d महिना",
        y: "एक वर्ष",
        yy: "%d वर्ष"
      },
      ordinal: function (_) {
        return ("" + _).replace(/\d/g, function (_) {
          return "०१२३४५६७८९"[_];
        });
      },
      formats: {
        LT: "Aको h:mm बजे",
        LTS: "Aको h:mm:ss बजे",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY, Aको h:mm बजे",
        LLLL: "dddd, D MMMM YYYY, Aको h:mm बजे"
      }
    };
    return _.locale(e, null, !0), e;
  });
  return exports;
}