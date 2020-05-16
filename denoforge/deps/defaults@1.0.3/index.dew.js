import { dew as _indexDewDew } from "../clone@1.0.4/index.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  var clone = _indexDewDew();

  exports = function (options, defaults) {
    options = options || {};
    Object.keys(defaults).forEach(function (key) {
      if (typeof options[key] === 'undefined') {
        options[key] = clone(defaults[key]);
      }
    });
    return options;
  };

  return exports;
}
