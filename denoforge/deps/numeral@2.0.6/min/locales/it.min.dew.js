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

  !function (a, b) {
    "function" == typeof define && define.amd ? define(["../numeral"], b) : b(exports ? _nodeRequire("../numeral") : a.numeral);
  }(exports, function (a) {
    a.register("locale", "it", {
      delimiters: {
        thousands: ".",
        decimal: ","
      },
      abbreviations: {
        thousand: "mila",
        million: "mil",
        billion: "b",
        trillion: "t"
      },
      ordinal: function (a) {
        return "º";
      },
      currency: {
        symbol: "€"
      }
    });
  });
  return exports;
}