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
    var b = {
      1: "'inci",
      5: "'inci",
      8: "'inci",
      70: "'inci",
      80: "'inci",
      2: "'nci",
      7: "'nci",
      20: "'nci",
      50: "'nci",
      3: "'üncü",
      4: "'üncü",
      100: "'üncü",
      6: "'ncı",
      9: "'uncu",
      10: "'uncu",
      30: "'uncu",
      60: "'ıncı",
      90: "'ıncı"
    };
    a.register("locale", "tr", {
      delimiters: {
        thousands: ".",
        decimal: ","
      },
      abbreviations: {
        thousand: "bin",
        million: "milyon",
        billion: "milyar",
        trillion: "trilyon"
      },
      ordinal: function (a) {
        if (0 === a) return "'ıncı";
        var c = a % 10,
            d = a % 100 - c,
            e = a >= 100 ? 100 : null;
        return b[c] || b[d] || b[e];
      },
      currency: {
        symbol: "₺"
      }
    });
  });
  return exports;
}