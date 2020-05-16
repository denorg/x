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

  describe('Percentage', function () {
    after(function () {
      numeral.reset();
    });
    it('should format to percentages with 100 upscale default', function () {
      var tests = [[0, '0%', '0%'], [null, '0 %', '0 %'], [1, '0%', '100%'], [0.974878234, '0.000%', '97.488%'], [-0.43, '0 %', '-43 %'], [0.43, '(0.00[0]%)', '43.00%']],
          i;

      for (i = 0; i < tests.length; i++) {
        expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
      }
    });
    it('should unformat to percentages with 100 downscale default', function () {
      var tests = [['0%', 0], ['100%', 1], ['97.488%', 0.97488], ['-43 %', -0.43], ['43.00%', 0.43]],
          i;

      for (i = 0; i < tests.length; i++) {
        expect(numeral(tests[i][0]).value()).to.equal(tests[i][1]);
      }
    });
    it('should format to percentages with 100 upscale enforced', function () {
      var tests = [[0, '0%', '0%'], [null, '0 %', '0 %'], [1, '0%', '100%'], [0.974878234, '0.000%', '97.488%'], [-0.43, '0 %', '-43 %'], [0.43, '(0.00[0]%)', '43.00%']],
          i;

      for (i = 0; i < tests.length; i++) {
        numeral.options.scalePercentBy100 = true;
        expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
      }
    });
    it('should unformat to percentages with 100 downscale enforced', function () {
      var tests = [['0%', 0], ['100%', 1], ['97.488%', 0.97488], ['-43 %', -0.43], ['43.00%', 0.43]],
          i;

      for (i = 0; i < tests.length; i++) {
        numeral.options.scalePercentBy100 = true;
        expect(numeral(tests[i][0]).value()).to.equal(tests[i][1]);
      }
    });
    it('should format to percentages without 100 upscale', function () {
      var tests = [[0, '0%', '0%'], [null, '0 %', '0 %'], [1, '0%', '1%'], [97.4878234, '0.000%', '97.488%'], [-43.0, '0 %', '-43 %'], [43.0, '(0.00[0]%)', '43.00%']],
          i;

      for (i = 0; i < tests.length; i++) {
        numeral.options.scalePercentBy100 = false;
        expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
      }
    });
    it('should unformat to percentages without 100 downscale', function () {
      var tests = [['0%', 0], ['100%', 100.0], ['97.488%', 97.488], ['-43 %', -43.0], ['43.00%', 43.0]],
          i;

      for (i = 0; i < tests.length; i++) {
        numeral.options.scalePercentBy100 = false;
        expect(numeral(tests[i][0]).value()).to.equal(tests[i][1]);
      }
    });
  });
  return exports;
}