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

  describe('Currency', function () {
    after(function () {
      numeral.reset();
    });
    it('should format to currency', function () {
      var tests = [[0, '$0.00', '$0.00'], [null, '$0.00', '$0.00'], [0.99, '$0,0.00', '$0.99'], [1000.234, '$0,0.00', '$1,000.23'], [1001, '$ 0,0.[00]', '$ 1,001'], [1000.234, '0,0.00 $', '1,000.23 $'], [-1000.234, '0,0.00 $', '-1,000.23 $'], [-1000.234, '($0,0)', '($1,000)'], [-1000.234, '(0,0$)', '(1,000$)'], [-1000.234, '(0,0 $)', '(1,000 $)'], [-1000.234, '$0.00', '-$1000.23'], [-1000.234, '$ 0.00', '-$ 1000.23'], [1230974, '($0.00 a)', '$1.23 m'], [-1000.234, '$ (0,0)', '$ (1,000)'], [-1000.234, '$(0,0)', '$(1,000)'], [-1000.234, '$ (0,0.00)', '$ (1,000.23)'], [-1000.234, '$(0,0.00)', '$(1,000.23)'], [-1000.238, '$(0,0.00)', '$(1,000.24)'], [-1000.234, '$-0,0', '$-1,000'], [-1000.234, '$ -0,0', '$ -1,000'], [1000.234, '$ (0,0)', '$ 1,000'], [1000.234, '$(0,0)', '$1,000'], [1000.234, '$ (0,0.00)', '$ 1,000.23'], [1000.234, '$(0,0.00)', '$1,000.23'], [1000.238, '$(0,0.00)', '$1,000.24'], [1000.234, '$-0,0', '$1,000'], [1000.234, '$ -0,0', '$ 1,000']],
          i;

      for (i = 0; i < tests.length; i++) {
        expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
      }
    });
    it('should unformat to currency', function () {
      var tests = [['$0.00', 0], ['$0.99', 0.99], ['$1,000.23', 1000.23], ['1,000.23 $', 1000.23], ['($1,000)', -1000], ['-1,000$', -1000], ['$1.23 m', 1230000]],
          i;

      for (i = 0; i < tests.length; i++) {
        expect(numeral(tests[i][0]).value()).to.equal(tests[i][1]);
      }
    });
  });
  return exports;
}