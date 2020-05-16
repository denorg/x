import _path from "path";
import _child_process from "child_process";
import _process from "process";
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

  var process = _process;

  var connect = _nodeRequire('connect');

  var serveStatic = _nodeRequire('serve-static');

  var open = _nodeRequire('open');

  var path = _path;
  var childProcess = _child_process;
  var server = connect().use(serveStatic(path.join(import.meta.url.startsWith('file:') ? decodeURI(import.meta.url.slice(0, import.meta.url.lastIndexOf('/')).slice(7 + (typeof process !== 'undefined' && process.platform === 'win32'))) : new URL(import.meta.url.slice(0, import.meta.url.lastIndexOf('/'))).pathname, '/..'))).listen(8071, function () {
    if (process.argv.indexOf('--mocha-headless-chrome') !== -1) {
      childProcess.spawn('node_modules/.bin/mocha-headless-chrome', ['-f', 'http://localhost:8071/tests/tests.html'], {
        stdio: 'inherit'
      }).on('exit', function (code) {
        server.close();
        process.exit(code); // eslint-disable-line no-process-exit
      });
    } else {
      open('http://localhost:8071/tests/tests.html');
      console.log('Serving tests...');
    }
  });
  return exports;
}