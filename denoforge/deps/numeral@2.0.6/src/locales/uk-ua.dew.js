import { dew as _numeralDewDew } from "../numeral.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  // numeral.js locale configuration
  // locale : Ukrainian for the Ukraine (uk-ua)
  // author : Michael Piefel : https://github.com/piefel (with help from Tetyana Kuzmenko)
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['../numeral'], factory);
    } else if (exports) {
      factory(_numeralDewDew());
    } else {
      factory(global.numeral);
    }
  })(exports, function (numeral) {
    numeral.register('locale', 'uk-ua', {
      delimiters: {
        thousands: ' ',
        decimal: ','
      },
      abbreviations: {
        thousand: 'тис.',
        million: 'млн',
        billion: 'млрд',
        trillion: 'блн'
      },
      ordinal: function () {
        // not ideal, but since in Ukrainian it can taken on
        // different forms (masculine, feminine, neuter)
        // this is all we can do
        return '';
      },
      currency: {
        symbol: '\u20B4'
      }
    });
  });

  return exports;
}