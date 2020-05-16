import { dew as _indexDewDew } from "../index.dew.js";
import _process from "process";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  var process = _process;

  var argv = _indexDewDew()(process.argv.slice(2));

  console.log(argv);
  return exports;
}