var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  var _typeof = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function (a) {
    return typeof a;
  } : function (a) {
    return a && 'function' == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? 'symbol' : typeof a;
  },
      _arguments = arguments,
      getNestedObject = function (a, b) {
    if (!(1 < _arguments.length && 'string' != typeof b)) {
      if ('undefined' != typeof a && 'string' == typeof b) {
        var c = /[.\[\]'"]/g,
            d = b.split(c).filter(function (a) {
          return '' !== a;
        });
        a = d.reduce(function (a, b) {
          return a && 'undefined' !== a[b] ? a[b] : void 0;
        }, a);
      }

      return a;
    }
  },
      buildSchema = function (a) {
    if ('[object Array]' === Object.prototype.toString.call(a)) a.forEach(function (a) {
      return buildSchema(a);
    });else if ('[object Object]' === Object.prototype.toString.call(a)) Object.keys(a).forEach(function (b) {
      return buildSchema(a[b]);
    });else return 'undefined' == typeof a ? 'undefined' : _typeof(a);
    return a;
  },
      getSchemaMatch = function (a, b) {
    var c = !1;

    if ('[object Array]' === Object.prototype.toString.call(a)) {
      if (b.length) for (var d = 0; d < a.length; d += 1) {
        if (!getSchemaMatch(a[d], b[d])) {
          c = !1;
          break;
        }

        c = !0;
      } else return !0;
    } else if ('[object Object]' === Object.prototype.toString.call(a)) for (var e in a) {
      if (!getSchemaMatch(a[e], b[e])) {
        c = !1;
        break;
      }

      c = !0;
    } else return ('undefined' == typeof b ? 'undefined' : _typeof(b)) === ('undefined' == typeof a ? 'undefined' : _typeof(a));

    return c;
  },
      convertSchemaAndGetMatch = function (a, b) {
    var c = buildSchema(b);
    return getSchemaMatch(a, c) ? a : -1;
  };

  exports = {
    getNestedObject: getNestedObject,
    buildSchema: buildSchema,
    getSchemaMatch: getSchemaMatch,
    convertSchemaAndGetMatch: convertSchemaAndGetMatch
  };
  return exports;
}