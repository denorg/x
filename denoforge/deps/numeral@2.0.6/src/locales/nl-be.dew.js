import { dew as _numeralDewDew } from "../numeral.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  // numeral.js locale configuration
  // locale : dutch-belgium (nl-be)
  // author : Dieter Luypaert : https://github.com/moeriki
  // corrected : Olivier Godefroy : https://github.com/godefroyo
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['../numeral'], factory);
    } else if (exports) {
      factory(_numeralDewDew());
    } else {
      factory(global.numeral);
    }
  })(exports, function (numeral) {
    numeral.register('locale', 'nl-be', {
      delimiters: {
        thousands: ' ',
        decimal: ','
      },
      abbreviations: {
        thousand: 'k',
        million: ' mln',
        billion: ' mld',
        trillion: ' bln'
      },
      ordinal: function (number) {
        var remainder = number % 100;
        return number !== 0 && remainder <= 1 || remainder === 8 || remainder >= 20 ? 'ste' : 'de';
      },
      currency: {
        symbol: '€ '
      }
    });
  });

  return exports;
}