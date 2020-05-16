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

  test('proto pollution', function (t) {
    var argv = parse(['--__proto__.x', '123']);
    t.equal({}.x, undefined);
    t.equal(argv.__proto__.x, undefined);
    t.equal(argv.x, undefined);
    t.end();
  });
  test('proto pollution (array)', function (t) {
    var argv = parse(['--x', '4', '--x', '5', '--x.__proto__.z', '789']);
    t.equal({}.z, undefined);
    t.deepEqual(argv.x, [4, 5]);
    t.equal(argv.x.z, undefined);
    t.equal(argv.x.__proto__.z, undefined);
    t.end();
  });
  test('proto pollution (number)', function (t) {
    var argv = parse(['--x', '5', '--x.__proto__.z', '100']);
    t.equal({}.z, undefined);
    t.equal(4 .z, undefined);
    t.equal(argv.x, 5);
    t.equal(argv.x.z, undefined);
    t.end();
  });
  test('proto pollution (string)', function (t) {
    var argv = parse(['--x', 'abc', '--x.__proto__.z', 'def']);
    t.equal({}.z, undefined);
    t.equal('...'.z, undefined);
    t.equal(argv.x, 'abc');
    t.equal(argv.x.z, undefined);
    t.end();
  });
  test('proto pollution (constructor)', function (t) {
    var argv = parse(['--constructor.prototype.y', '123']);
    t.equal({}.y, undefined);
    t.equal(argv.y, undefined);
    t.end();
  });
  return exports;
}