import { dew as _numeralDewDew } from "../../numeral.dew.js";
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

  // Node
  if (exports) {
    var numeral = _numeralDewDew();

    var expect = _nodeRequire('chai').expect;
  }

  describe('Ordinal', function () {
    after(function () {
      numeral.reset();
    });
    it('should format to an ordinal', function () {
      var tests = [[1, '0o', '1st'], [52, '0 o', '52 nd'], [23, '0o', '23rd'], [100, '0o', '100th'], [1234, '0,0o', '1,234th']],
          i,
          n,
          output;

      for (i = 0; i < tests.length; i++) {
        n = numeral(tests[i][0]);
        output = n.format(tests[i][1]);
        expect(output).to.equal(tests[i][2]);
        expect(typeof output).to.equal('string');
      }
    });
    it('should unformat to an ordinal', function () {
      var tests = [['1st', 1], ['52 nd', 52], ['23rd', 23], ['100th', 100], ['1,234th', 1234]],
          i;

      for (i = 0; i < tests.length; i++) {
        expect(numeral(tests[i][0]).value()).to.equal(tests[i][1]);
      }
    });
  });
  return exports;
}