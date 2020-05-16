import { dew as _numeralDewDew } from "../../numeral.dew.js";
import { dew as _localesDewDew } from "../../locales.dew.js";
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

    var locales = _localesDewDew();

    var expect = _nodeRequire('chai').expect;
  }

  describe('Locale: de', function () {
    before(function () {
      numeral.locale('de');
    });
    after(function () {
      numeral.reset();
    });
    describe('Number', function () {
      it('should format a number', function () {
        var tests = [[10000, '0,0.0000', '10 000,0000'], [10000.23, '0,0', '10 000'], [-10000, '0,0.0', '-10 000,0'], [10000.1234, '0.000', '10000,123'], [-10000, '(0,0.0000)', '(10 000,0000)'], [-0.23, '.00', '-,23'], [-0.23, '(.00)', '(,23)'], [0.23, '0.00000', '0,23000'], [1230974, '0.0a', '1,2m'], [1460, '0a', '1k'], [-104000, '0a', '-104k'], [1, '0o', '1.'], [52, '0o', '52.'], [23, '0o', '23.'], [100, '0o', '100.'], [1, '0[.]0', '1']];

        for (var i = 0; i < tests.length; i++) {
          expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
        }
      });
    });
    describe('Currency', function () {
      it('should format a currency', function () {
        var tests = [[1000.234, '$0,0.00', '€1 000,23'], [-1000.234, '($0,0)', '(€1 000)'], [-1000.234, '$0.00', '-€1000,23'], [1230974, '($0.00a)', '€1,23m']];

        for (var i = 0; i < tests.length; i++) {
          expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
        }
      });
    });
    describe('Percentages', function () {
      it('should format a percentages', function () {
        var tests = [[1, '0%', '100%'], [0.974878234, '0.000%', '97,488%'], [-0.43, '0%', '-43%'], [0.43, '(0.000%)', '43,000%']];

        for (var i = 0; i < tests.length; i++) {
          expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
        }
      });
    });
    describe('Unformat', function () {
      it('should unformat', function () {
        var tests = [['10 000,123', 10000.123], ['(0,12345)', -0.12345], ['(€1,23m)', -1230000], ['10k', 10000], ['-10k', -10000], ['23.', 23], ['€10 000,00', 10000], ['-76%', -0.76], ['2:23:57', 8637]];

        for (var i = 0; i < tests.length; i++) {
          expect(numeral(tests[i][0]).value()).to.equal(tests[i][1]);
        }
      });
    });
  });
  return exports;
}