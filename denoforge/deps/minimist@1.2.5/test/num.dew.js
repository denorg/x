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

  test('nums', function (t) {
    var argv = parse(['-x', '1234', '-y', '5.67', '-z', '1e7', '-w', '10f', '--hex', '0xdeadbeef', '789']);
    t.deepEqual(argv, {
      x: 1234,
      y: 5.67,
      z: 1e7,
      w: '10f',
      hex: 0xdeadbeef,
      _: [789]
    });
    t.deepEqual(typeof argv.x, 'number');
    t.deepEqual(typeof argv.y, 'number');
    t.deepEqual(typeof argv.z, 'number');
    t.deepEqual(typeof argv.w, 'string');
    t.deepEqual(typeof argv.hex, 'number');
    t.deepEqual(typeof argv._[0], 'number');
    t.end();
  });
  test('already a number', function (t) {
    var argv = parse(['-x', 1234, 789]);
    t.deepEqual(argv, {
      x: 1234,
      _: [789]
    });
    t.deepEqual(typeof argv.x, 'number');
    t.deepEqual(typeof argv._[0], 'number');
    t.end();
  });
  return exports;
}