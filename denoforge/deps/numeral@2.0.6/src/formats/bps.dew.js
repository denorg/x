import { dew as _numeralDewDew } from "../numeral.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  // numeral.js format configuration
  // format : BPS
  // author : Jack Altiere : https://github.com/jaltiere
  // BPS format - http://www.investopedia.com/terms/b/basispoint.asp
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['../numeral'], factory);
    } else if (exports) {
      factory(_numeralDewDew());
    } else {
      factory(global.numeral);
    }
  })(exports, function (numeral) {
    numeral.register('format', 'bps', {
      regexps: {
        format: /(BPS)/,
        unformat: /(BPS)/
      },
      format: function (value, format, roundingFunction) {
        var space = numeral._.includes(format, ' BPS') ? ' ' : '',
            output;
        value = value * 10000; // check for space before BPS

        format = format.replace(/\s?BPS/, '');
        output = numeral._.numberToFormat(value, format, roundingFunction);

        if (numeral._.includes(output, ')')) {
          output = output.split('');
          output.splice(-1, 0, space + 'BPS');
          output = output.join('');
        } else {
          output = output + space + 'BPS';
        }

        return output;
      },
      unformat: function (string) {
        return +(numeral._.stringToNumber(string) * 0.0001).toFixed(15);
      }
    });
  });

  return exports;
}