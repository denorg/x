import { dew as _parseDewDew } from "./parse.dew.js";
import { dew as _stringifyDewDew } from "./stringify.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  const parse = _parseDewDew();

  const stringify = _stringifyDewDew();

  const JSON5 = {
    parse,
    stringify
  };
  exports = JSON5;
  return exports;
}