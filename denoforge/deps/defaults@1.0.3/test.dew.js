import { dew as _indexDewDew } from "./index.dew.js";
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

  var defaults = _indexDewDew(),
      test = _nodeRequire('tap').test;

  test("ensure options is an object", function (t) {
    var options = defaults(false, {
      a: true
    });
    t.ok(options.a);
    t.end();
  });
  test("ensure defaults override keys", function (t) {
    var result = defaults({}, {
      a: false,
      b: true
    });
    t.ok(result.b, 'b merges over undefined');
    t.equal(result.a, false, 'a merges over undefined');
    t.end();
  });
  test("ensure defined keys are not overwritten", function (t) {
    var result = defaults({
      b: false
    }, {
      a: false,
      b: true
    });
    t.equal(result.b, false, 'b not merged');
    t.equal(result.a, false, 'a merges over undefined');
    t.end();
  });
  test("ensure defaults clone nested objects", function (t) {
    var d = {
      a: [1, 2, 3],
      b: {
        hello: 'world'
      }
    };
    var result = defaults({}, d);
    t.equal(result.a.length, 3, 'objects should be clones');
    t.ok(result.a !== d.a, 'objects should be clones');
    t.equal(Object.keys(result.b).length, 1, 'objects should be clones');
    t.ok(result.b !== d.b, 'objects should be clones');
    t.end();
  });
  return exports;
}