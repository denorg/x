import { dew as _numeralDewDew } from "../numeral.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  // numeral.js locale configuration
  // locale : japanese
  // author : teppeis : https://github.com/teppeis
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['../numeral'], factory);
    } else if (exports) {
      factory(_numeralDewDew());
    } else {
      factory(global.numeral);
    }
  })(exports, function (numeral) {
    numeral.register('locale', 'ja', {
      delimiters: {
        thousands: ',',
        decimal: '.'
      },
      abbreviations: {
        thousand: '千',
        million: '百万',
        billion: '十億',
        trillion: '兆'
      },
      ordinal: function (number) {
        return '.';
      },
      currency: {
        symbol: '¥'
      }
    });
  });

  return exports;
}