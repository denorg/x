import { dew as _numeralDewDew } from "../numeral.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  // numeral.js locale configuration
  // locale : Estonian
  // author : Illimar Tambek : https://github.com/ragulka
  // Note: in Estonian, abbreviations are always separated from numbers with a space
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['../numeral'], factory);
    } else if (exports) {
      factory(_numeralDewDew());
    } else {
      factory(global.numeral);
    }
  })(exports, function (numeral) {
    numeral.register('locale', 'et', {
      delimiters: {
        thousands: ' ',
        decimal: ','
      },
      abbreviations: {
        thousand: ' tuh',
        million: ' mln',
        billion: ' mld',
        trillion: ' trl'
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