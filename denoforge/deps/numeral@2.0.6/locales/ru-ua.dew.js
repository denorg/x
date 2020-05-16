import { dew as _numeralDewDew } from "../numeral.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  // numeral.js locale configuration
  // locale : Russian for the Ukraine (ru-ua)
  // author : Anatoli Papirovski : https://github.com/apapirovski
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['../numeral'], factory);
    } else if (exports) {
      factory(_numeralDewDew());
    } else {
      factory(global.numeral);
    }
  })(exports, function (numeral) {
    numeral.register('locale', 'ru-ua', {
      delimiters: {
        thousands: ' ',
        decimal: ','
      },
      abbreviations: {
        thousand: 'тыс.',
        million: 'млн',
        billion: 'b',
        trillion: 't'
      },
      ordinal: function () {
        // not ideal, but since in Russian it can taken on
        // different forms (masculine, feminine, neuter)
        // this is all we can do
        return '.';
      },
      currency: {
        symbol: '\u20B4'
      }
    });
  });

  return exports;
}