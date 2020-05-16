import { dew as _numeralDewDew } from "../numeral.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  // numeral.js locale configuration
  // locale : thai (th)
  // author : Sathit Jittanupat : https://github.com/jojosati
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['../numeral'], factory);
    } else if (exports) {
      factory(_numeralDewDew());
    } else {
      factory(global.numeral);
    }
  })(exports, function (numeral) {
    numeral.register('locale', 'th', {
      delimiters: {
        thousands: ',',
        decimal: '.'
      },
      abbreviations: {
        thousand: 'พัน',
        million: 'ล้าน',
        billion: 'พันล้าน',
        trillion: 'ล้านล้าน'
      },
      ordinal: function (number) {
        return '.';
      },
      currency: {
        symbol: '฿'
      }
    });
  });

  return exports;
}