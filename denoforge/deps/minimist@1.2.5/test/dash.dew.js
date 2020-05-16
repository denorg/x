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

  test('-', function (t) {
    t.plan(5);
    t.deepEqual(parse(['-n', '-']), {
      n: '-',
      _: []
    });
    t.deepEqual(parse(['-']), {
      _: ['-']
    });
    t.deepEqual(parse(['-f-']), {
      f: '-',
      _: []
    });
    t.deepEqual(parse(['-b', '-'], {
      boolean: 'b'
    }), {
      b: true,
      _: ['-']
    });
    t.deepEqual(parse(['-s', '-'], {
      string: 's'
    }), {
      s: '-',
      _: []
    });
  });
  test('-a -- b', function (t) {
    t.plan(3);
    t.deepEqual(parse(['-a', '--', 'b']), {
      a: true,
      _: ['b']
    });
    t.deepEqual(parse(['--a', '--', 'b']), {
      a: true,
      _: ['b']
    });
    t.deepEqual(parse(['--a', '--', 'b']), {
      a: true,
      _: ['b']
    });
  });
  test('move arguments after the -- into their own `--` array', function (t) {
    t.plan(1);
    t.deepEqual(parse(['--name', 'John', 'before', '--', 'after'], {
      '--': true
    }), {
      name: 'John',
      _: ['before'],
      '--': ['after']
    });
  });
  return exports;
}