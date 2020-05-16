import { dew as _numeralDewDew } from "../numeral.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  // numeral.js locale configuration
  // locale : Hungarian (hu)
  // author : Peter Bakondy : https://github.com/pbakondy
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['../numeral'], factory);
    } else if (exports) {
      factory(_numeralDewDew());
    } else {
      factory(global.numeral);
    }
  })(exports, function (numeral) {
    numeral.register('locale', 'hu', {
      delimiters: {
        thousands: ' ',
        decimal: ','
      },
      abbreviations: {
        thousand: 'E',
        // ezer
        million: 'M',
        // millió
        billion: 'Mrd',
        // milliárd
        trillion: 'T' // trillió

      },
      ordinal: function (number) {
        return '.';
      },
      currency: {
        symbol: ' Ft'
      }
    });
  });

  return exports;
}