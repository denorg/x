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
    "object" == typeof exports && true ? exports = e(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], e) : _.dayjs_locale_cv = e(_.dayjs);
  }(exports, function (_) {
    "use strict";

    _ = _ && _.hasOwnProperty("default") ? _.default : _;
    var e = {
      name: "cv",
      weekdays: "вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун".split("_"),
      months: "кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав".split("_"),
      weekStart: 1,
      weekdaysShort: "выр_тун_ытл_юн_кӗҫ_эрн_шӑм".split("_"),
      monthsShort: "кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш".split("_"),
      weekdaysMin: "вр_тн_ыт_юн_кҫ_эр_шм".split("_"),
      ordinal: function (_) {
        return _;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD-MM-YYYY",
        LL: "YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]",
        LLL: "YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm",
        LLLL: "dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm"
      }
    };
    return _.locale(e, null, !0), e;
  });
  return exports;
}