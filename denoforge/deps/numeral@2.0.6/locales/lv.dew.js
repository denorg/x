import { dew as _numeralDewDew } from "../numeral.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  // numeral.js locale configuration
  // locale : Latvian (lv)
  // author : Lauris Bukšis-Haberkorns : https://github.com/Lafriks
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['../numeral'], factory);
    } else if (exports) {
      factory(_numeralDewDew());
    } else {
      factory(global.numeral);
    }
  })(exports, function (numeral) {
    numeral.register('locale', 'lv', {
      delimiters: {
        thousands: ' ',
        decimal: ','
      },
      abbreviations: {
        thousand: ' tūkst.',
        million: ' milj.',
        billion: ' mljrd.',
        trillion: ' trilj.'
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