import { dew as _numeralDewDew } from "../numeral.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  // numeral.js format configuration
  // format : percentage
  // author : Adam Draper : https://github.com/adamwdraper
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['../numeral'], factory);
    } else if (exports) {
      factory(_numeralDewDew());
    } else {
      factory(global.numeral);
    }
  })(exports, function (numeral) {
    numeral.register('format', 'percentage', {
      regexps: {
        format: /(%)/,
        unformat: /(%)/
      },
      format: function (value, format, roundingFunction) {
        var space = numeral._.includes(format, ' %') ? ' ' : '',
            output;

        if (numeral.options.scalePercentBy100) {
          value = value * 100;
        } // check for space before %


        format = format.replace(/\s?\%/, '');
        output = numeral._.numberToFormat(value, format, roundingFunction);

        if (numeral._.includes(output, ')')) {
          output = output.split('');
          output.splice(-1, 0, space + '%');
          output = output.join('');
        } else {
          output = output + space + '%';
        }

        return output;
      },
      unformat: function (string) {
        var number = numeral._.stringToNumber(string);

        if (numeral.options.scalePercentBy100) {
          return number * 0.01;
        }

        return number;
      }
    });
  });

  return exports;
}