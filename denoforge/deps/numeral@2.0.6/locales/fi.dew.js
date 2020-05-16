import { dew as _numeralDewDew } from "../numeral.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  // numeral.js locale configuration
  // locale : Finnish
  // author : Sami Saada : https://github.com/samitheberber
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['../numeral'], factory);
    } else if (exports) {
      factory(_numeralDewDew());
    } else {
      factory(global.numeral);
    }
  })(exports, function (numeral) {
    numeral.register('locale', 'fi', {
      delimiters: {
        thousands: ' ',
        decimal: ','
      },
      abbreviations: {
        thousand: 'k',
        million: 'M',
        billion: 'G',
        trillion: 'T'
      },
      ordinal: function (number) {
        return '.';
      },
      currency: {
        symbol: '€'
      }
    });
  });

  return exports;
}