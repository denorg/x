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

  describe('BPS', function () {
    after(function () {
      numeral.reset();
    });
    it('should format to bps', function () {
      var tests = [[0, '0 BPS', '0 BPS'], [0.0001, '0 BPS', '1 BPS'], [.0056, '0 BPS', '56 BPS'], [.25, '0BPS', '2500BPS'], [.000001, '0.00 BPS', '0.01 BPS']],
          i;

      for (i = 0; i < tests.length; i++) {
        expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
      }
    });
    it('should unformat to number', function () {
      var tests = [['0 BPS', 0], ['1 BPS', 0.0001], ['56 BPS', .0056], ['2500BPS', .25], ['0.01 BPS', .000001]],
          i;

      for (i = 0; i < tests.length; i++) {
        expect(numeral(tests[i][0]).value()).to.equal(tests[i][1]);
      }
    });
  });
  return exports;
}