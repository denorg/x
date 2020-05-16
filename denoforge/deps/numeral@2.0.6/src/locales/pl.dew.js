import { dew as _numeralDewDew } from "../numeral.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  // numeral.js locale configuration
  // locale : polish (pl)
  // author : Dominik Bulaj : https://github.com/dominikbulaj
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['../numeral'], factory);
    } else if (exports) {
      factory(_numeralDewDew());
    } else {
      factory(global.numeral);
    }
  })(exports, function (numeral) {
    numeral.register('locale', 'pl', {
      delimiters: {
        thousands: ' ',
        decimal: ','
      },
      abbreviations: {
        thousand: 'tys.',
        million: 'mln',
        billion: 'mld',
        trillion: 'bln'
      },
      ordinal: function (number) {
        return '.';
      },
      currency: {
        symbol: 'PLN'
      }
    });
  });

  return exports;
}