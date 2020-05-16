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

  test('numeric short args', function (t) {
    t.plan(2);
    t.deepEqual(parse(['-n123']), {
      n: 123,
      _: []
    });
    t.deepEqual(parse(['-123', '456']), {
      1: true,
      2: true,
      3: 456,
      _: []
    });
  });
  test('short', function (t) {
    t.deepEqual(parse(['-b']), {
      b: true,
      _: []
    }, 'short boolean');
    t.deepEqual(parse(['foo', 'bar', 'baz']), {
      _: ['foo', 'bar', 'baz']
    }, 'bare');
    t.deepEqual(parse(['-cats']), {
      c: true,
      a: true,
      t: true,
      s: true,
      _: []
    }, 'group');
    t.deepEqual(parse(['-cats', 'meow']), {
      c: true,
      a: true,
      t: true,
      s: 'meow',
      _: []
    }, 'short group next');
    t.deepEqual(parse(['-h', 'localhost']), {
      h: 'localhost',
      _: []
    }, 'short capture');
    t.deepEqual(parse(['-h', 'localhost', '-p', '555']), {
      h: 'localhost',
      p: 555,
      _: []
    }, 'short captures');
    t.end();
  });
  test('mixed short bool and capture', function (t) {
    t.same(parse(['-h', 'localhost', '-fp', '555', 'script.js']), {
      f: true,
      p: 555,
      h: 'localhost',
      _: ['script.js']
    });
    t.end();
  });
  test('short and long', function (t) {
    t.deepEqual(parse(['-h', 'localhost', '-fp', '555', 'script.js']), {
      f: true,
      p: 555,
      h: 'localhost',
      _: ['script.js']
    });
    t.end();
  });
  return exports;
}