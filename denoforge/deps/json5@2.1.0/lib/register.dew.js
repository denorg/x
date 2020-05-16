import _fs from "fs";
import { dew as _indexDewDew } from "json5/lib/index.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  const fs = _fs;

  const JSON5 = _indexDewDew(); // eslint-disable-next-line node/no-deprecated-api


  ({})['.json5'] = function (module, filename) {
    const content = fs.readFileSync(filename, 'utf8');

    try {
      module.exports = JSON5.parse(content);
    } catch (err) {
      err.message = filename + ': ' + err.message;
      throw err;
    }
  };

  return exports;
}