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

  test('long opts', function (t) {
    t.deepEqual(parse(['--bool']), {
      bool: true,
      _: []
    }, 'long boolean');
    t.deepEqual(parse(['--pow', 'xixxle']), {
      pow: 'xixxle',
      _: []
    }, 'long capture sp');
    t.deepEqual(parse(['--pow=xixxle']), {
      pow: 'xixxle',
      _: []
    }, 'long capture eq');
    t.deepEqual(parse(['--host', 'localhost', '--port', '555']), {
      host: 'localhost',
      port: 555,
      _: []
    }, 'long captures sp');
    t.deepEqual(parse(['--host=localhost', '--port=555']), {
      host: 'localhost',
      port: 555,
      _: []
    }, 'long captures eq');
    t.end();
  });
  return exports;
}