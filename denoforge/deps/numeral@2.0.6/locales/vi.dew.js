import { dew as _numeralDewDew } from "../numeral.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  // numeral.js locale configuration
  // locale : vietnam (vi)
  // author : Harry Nguyen : https://github.com/thaihoa311
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['../numeral'], factory);
    } else if (exports) {
      factory(_numeralDewDew());
    } else {
      factory(global.numeral);
    }
  })(exports, function (numeral) {
    numeral.register('locale', 'vi', {
      delimiters: {
        thousands: '.',
        decimal: ','
      },
      abbreviations: {
        thousand: ' nghìn',
        million: ' triệu',
        billion: ' tỷ',
        trillion: ' nghìn tỷ'
      },
      ordinal: function () {
        return '.';
      },
      currency: {
        symbol: '₫'
      }
    });
  });

  return exports;
}