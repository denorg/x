import { dew as _numeralDewDew } from "../numeral.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  // numeral.js locale configuration
  // locale : slovenian (sl)
  // author : Boštjan Pišler : https://github.com/BostjanPisler
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['../numeral'], factory);
    } else if (exports) {
      factory(_numeralDewDew());
    } else {
      factory(global.numeral);
    }
  })(exports, function (numeral) {
    numeral.register('locale', 'sl', {
      delimiters: {
        thousands: '.',
        decimal: ','
      },
      abbreviations: {
        thousand: 'k',
        million: 'mio',
        billion: 'mrd',
        trillion: 'trilijon'
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