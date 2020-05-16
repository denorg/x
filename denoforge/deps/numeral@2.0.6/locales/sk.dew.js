import { dew as _numeralDewDew } from "../numeral.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  // numeral.js locale configuration
  // locale : slovak (sk)
  // author : Ahmed Al Hafoudh : http://www.freevision.sk
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['../numeral'], factory);
    } else if (exports) {
      factory(_numeralDewDew());
    } else {
      factory(global.numeral);
    }
  })(exports, function (numeral) {
    numeral.register('locale', 'sk', {
      delimiters: {
        thousands: ' ',
        decimal: ','
      },
      abbreviations: {
        thousand: 'tis.',
        million: 'mil.',
        billion: 'b',
        trillion: 't'
      },
      ordinal: function () {
        return '.';
      },
      currency: {
        symbol: '€'
      }
    });
  });

  return exports;
}