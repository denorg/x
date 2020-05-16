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
    "object" == typeof exports && true ? exports = e(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], e) : _.dayjs_locale_hi = e(_.dayjs);
  }(exports, function (_) {
    "use strict";

    _ = _ && _.hasOwnProperty("default") ? _.default : _;
    var e = {
      name: "hi",
      weekdays: "रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),
      months: "जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर".split("_"),
      weekdaysShort: "रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि".split("_"),
      monthsShort: "जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.".split("_"),
      weekdaysMin: "र_सो_मं_बु_गु_शु_श".split("_"),
      ordinal: function (_) {
        return _;
      },
      formats: {
        LT: "A h:mm बजे",
        LTS: "A h:mm:ss बजे",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY, A h:mm बजे",
        LLLL: "dddd, D MMMM YYYY, A h:mm बजे"
      },
      relativeTime: {
        future: "%s में",
        past: "%s पहले",
        s: "कुछ ही क्षण",
        m: "एक मिनट",
        mm: "%d मिनट",
        h: "एक घंटा",
        hh: "%d घंटे",
        d: "एक दिन",
        dd: "%d दिन",
        M: "एक महीने",
        MM: "%d महीने",
        y: "एक वर्ष",
        yy: "%d वर्ष"
      }
    };
    return _.locale(e, null, !0), e;
  });
  return exports;
}