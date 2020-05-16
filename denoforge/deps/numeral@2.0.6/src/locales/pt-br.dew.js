import { dew as _numeralDewDew } from "../numeral.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  // numeral.js locale configuration
  // locale : portuguese brazil (pt-br)
  // author : Ramiro Varandas Jr : https://github.com/ramirovjr
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['../numeral'], factory);
    } else if (exports) {
      factory(_numeralDewDew());
    } else {
      factory(global.numeral);
    }
  })(exports, function (numeral) {
    numeral.register('locale', 'pt-br', {
      delimiters: {
        thousands: '.',
        decimal: ','
      },
      abbreviations: {
        thousand: 'mil',
        million: 'milhões',
        billion: 'b',
        trillion: 't'
      },
      ordinal: function (number) {
        return 'º';
      },
      currency: {
        symbol: 'R$'
      }
    });
  });

  return exports;
}