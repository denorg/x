import { dew as _numeralDewDew } from "../numeral.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  // numeral.js locale configuration
  // locale : italian Italy (it)
  // author : Giacomo Trombi : http://cinquepunti.it
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['../numeral'], factory);
    } else if (exports) {
      factory(_numeralDewDew());
    } else {
      factory(global.numeral);
    }
  })(exports, function (numeral) {
    numeral.register('locale', 'it', {
      delimiters: {
        thousands: '.',
        decimal: ','
      },
      abbreviations: {
        thousand: 'mila',
        million: 'mil',
        billion: 'b',
        trillion: 't'
      },
      ordinal: function (number) {
        return 'º';
      },
      currency: {
        symbol: '€'
      }
    });
  });

  return exports;
}