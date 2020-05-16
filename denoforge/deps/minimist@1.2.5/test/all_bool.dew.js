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

  test('flag boolean true (default all --args to boolean)', function (t) {
    var argv = parse(['moo', '--honk', 'cow'], {
      boolean: true
    });
    t.deepEqual(argv, {
      honk: true,
      _: ['moo', 'cow']
    });
    t.deepEqual(typeof argv.honk, 'boolean');
    t.end();
  });
  test('flag boolean true only affects double hyphen arguments without equals signs', function (t) {
    var argv = parse(['moo', '--honk', 'cow', '-p', '55', '--tacos=good'], {
      boolean: true
    });
    t.deepEqual(argv, {
      honk: true,
      tacos: 'good',
      p: 55,
      _: ['moo', 'cow']
    });
    t.deepEqual(typeof argv.honk, 'boolean');
    t.end();
  });
  return exports;
}