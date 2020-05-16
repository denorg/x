import { dew as _indexDewDew } from "../index.dew.js";
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

  var parse = _indexDewDew();

  var test = _nodeRequire('tape');

  test('dotted alias', function (t) {
    var argv = parse(['--a.b', '22'], {
      default: {
        'a.b': 11
      },
      alias: {
        'a.b': 'aa.bb'
      }
    });
    t.equal(argv.a.b, 22);
    t.equal(argv.aa.bb, 22);
    t.end();
  });
  test('dotted default', function (t) {
    var argv = parse('', {
      default: {
        'a.b': 11
      },
      alias: {
        'a.b': 'aa.bb'
      }
    });
    t.equal(argv.a.b, 11);
    t.equal(argv.aa.bb, 11);
    t.end();
  });
  test('dotted default with no alias', function (t) {
    var argv = parse('', {
      default: {
        'a.b': 11
      }
    });
    t.equal(argv.a.b, 11);
    t.end();
  });
  return exports;
}