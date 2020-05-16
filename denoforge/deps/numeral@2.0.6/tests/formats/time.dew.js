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

  describe('Time', function () {
    after(function () {
      numeral.reset();
    });
    it('should format to time', function () {
      var tests = [[0, '00:00:00', '0:00:00'], [null, '00:00:00', '0:00:00'], [25, '00:00:00', '0:00:25'], [238, '00:00:00', '0:03:58'], [63846, '00:00:00', '17:44:06']],
          i;

      for (i = 0; i < tests.length; i++) {
        expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
      }
    });
    it('should unformat to time', function () {
      var tests = [['0:00:00', 0], ['0:00:25', 25], ['0:03:58', 238], ['17:44:06', 63846]],
          i;

      for (i = 0; i < tests.length; i++) {
        expect(numeral(tests[i][0]).value()).to.equal(tests[i][1]);
      }
    });
  });
  return exports;
}