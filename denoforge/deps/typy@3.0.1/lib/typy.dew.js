import { dew as _utilDewDew } from "./util.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  Object.defineProperty(exports, '__esModule', {
    value: !0
  });

  var _typeof = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function (a) {
    return typeof a;
  } : function (a) {
    return a && 'function' == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? 'symbol' : typeof a;
  },
      _createClass = function () {
    function a(a, b) {
      for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, c.configurable = !0, 'value' in c && (c.writable = !0), Object.defineProperty(a, c.key, c);
    }

    return function (b, c, d) {
      return c && a(b.prototype, c), d && a(b, d), b;
    };
  }(),
      _util = _utilDewDew();

  function _classCallCheck(a, b) {
    if (!(a instanceof b)) throw new TypeError('Cannot call a class as a function');
  }

  var Typy = function () {
    function a() {
      var b = this;
      _classCallCheck(this, a), this.t = function (a, c) {
        if (b.input = a, b.schemaCheck = null, c) if ('string' == typeof c) b.input = (0, _util.getNestedObject)(b.input, c);else {
          var d = (0, _util.convertSchemaAndGetMatch)(b.input, c);
          -1 === d ? (b.schemaCheck = !1, b.input = a) : (b.schemaCheck = !0, b.input = d);
        }
        return b;
      };
    }

    return _createClass(a, [{
      key: 'isValid',
      get: function get() {
        return null !== this.schemaCheck && !0 === this.schemaCheck && null !== this.input && void 0 !== this.input;
      }
    }, {
      key: 'isDefined',
      get: function get() {
        return 'undefined' != typeof this.input;
      }
    }, {
      key: 'isUndefined',
      get: function get() {
        return 'undefined' == typeof this.input;
      }
    }, {
      key: 'isNull',
      get: function get() {
        return null === this.input && 'object' === _typeof(this.input);
      }
    }, {
      key: 'isNullOrUndefined',
      get: function get() {
        return !!(this.isNull || this.isUndefined);
      }
    }, {
      key: 'isBoolean',
      get: function get() {
        return _typeof(this.input) === _typeof(!0);
      }
    }, {
      key: 'isTrue',
      get: function get() {
        return !0 === this.input;
      }
    }, {
      key: 'isFalse',
      get: function get() {
        return !1 === this.input;
      }
    }, {
      key: 'isTruthy',
      get: function get() {
        return !!this.input;
      }
    }, {
      key: 'isFalsy',
      get: function get() {
        return !this.input;
      }
    }, {
      key: 'isObject',
      get: function get() {
        return 'object' === _typeof(this.input) && this.input === Object(this.input) && '[object Array]' !== Object.prototype.toString.call(this.input);
      }
    }, {
      key: 'isEmptyObject',
      get: function get() {
        return !!(this.isObject && 0 === Object.keys(this.input).length);
      }
    }, {
      key: 'isString',
      get: function get() {
        return 'string' == typeof this.input;
      }
    }, {
      key: 'isEmptyString',
      get: function get() {
        return !!(this.isString && 0 === this.input.length);
      }
    }, {
      key: 'isNumber',
      get: function get() {
        return !!Number.isFinite(this.input);
      }
    }, {
      key: 'isArray',
      get: function get() {
        return !!Array.isArray(this.input);
      }
    }, {
      key: 'isEmptyArray',
      get: function get() {
        return !!(this.isArray && 0 === this.input.length);
      }
    }, {
      key: 'isFunction',
      get: function get() {
        return 'function' == typeof this.input;
      }
    }, {
      key: 'safeObject',
      get: function get() {
        return this.input;
      }
    }, {
      key: 'safeString',
      get: function get() {
        return this.isString ? this.input : '';
      }
    }, {
      key: 'safeNumber',
      get: function get() {
        return this.isNumber ? this.input : 0;
      }
    }, {
      key: 'safeBoolean',
      get: function get() {
        return !!this.isBoolean && this.input;
      }
    }, {
      key: 'safeFunction',
      get: function get() {
        return this.isFunction ? this.input : function () {};
      }
    }]), a;
  }();

  Typy.Schema = {
    Number: 1,
    String: 'typy',
    Boolean: !0,
    Null: null,
    Undefined: void 0,
    Array: [],
    Function: function Function() {}
  }, exports.default = Typy, exports = exports['default'];
  return exports;
}