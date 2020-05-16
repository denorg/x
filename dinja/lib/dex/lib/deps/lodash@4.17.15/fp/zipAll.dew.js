import { dew as _convertDewDew } from "./convert.dew.js";
import { dew as _zipDewDew } from "../zip.dew.js";
import { dew as _placeholderDewDew } from "./placeholder.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  var convert = _convertDewDew(),
      func = convert('zipAll', _zipDewDew());

  func.placeholder = _placeholderDewDew();
  exports = func;
  return exports;
}