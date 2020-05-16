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

  var test = _nodeRequire('tape');

  var parse = _indexDewDew();

  test('boolean default true', function (t) {
    var argv = parse([], {
      boolean: 'sometrue',
      default: {
        sometrue: true
      }
    });
    t.equal(argv.sometrue, true);
    t.end();
  });
  test('boolean default false', function (t) {
    var argv = parse([], {
      boolean: 'somefalse',
      default: {
        somefalse: false
      }
    });
    t.equal(argv.somefalse, false);
    t.end();
  });
  test('boolean default to null', function (t) {
    var argv = parse([], {
      boolean: 'maybe',
      default: {
        maybe: null
      }
    });
    t.equal(argv.maybe, null);
    var argv = parse(['--maybe'], {
      boolean: 'maybe',
      default: {
        maybe: null
      }
    });
    t.equal(argv.maybe, true);
    t.end();
  });
  return exports;
}