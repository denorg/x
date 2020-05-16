import { dew as _typyDewDew } from "./typy.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  Object.defineProperty(exports, '__esModule', {
    value: !0
  }), exports.addCustomTypes = exports.Schema = exports.t = void 0;

  var _typy = _typyDewDew(),
      _typy2 = _interopRequireDefault(_typy);

  function _interopRequireDefault(a) {
    return a && a.__esModule ? a : {
      default: a
    };
  }

  var t = function (a, b) {
    return new _typy2.default().t(a, b);
  },
      Schema = _typy2.default.Schema,
      addCustomTypes = function (a) {
    if (t(a).isObject) Object.keys(a).forEach(function (b) {
      if (t(a[b]).isFunction) _typy2.default.prototype.__defineGetter__(b, function () {
        return a[b](this.input);
      });else throw new Error('validator ' + b + ' is not a function');
    });else throw new Error('validators must be key value pairs');
  };

  exports.default = t, exports.t = t, exports.Schema = Schema, exports.addCustomTypes = addCustomTypes;
  return exports;
}