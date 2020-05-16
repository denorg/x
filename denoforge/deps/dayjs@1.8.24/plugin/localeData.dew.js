var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  !function (n, t) {
    "object" == typeof exports && true ? exports = t() : "function" == typeof define && define.amd ? define(t) : n.dayjs_plugin_localeData = t();
  }(exports, function () {
    "use strict";

    return function (n, t, e) {
      var r = function (n, t, e, r) {
        var o = n.name ? n : n.$locale();
        return o[t] ? o[t] : o[e].map(function (n) {
          return n.substr(0, r);
        });
      },
          o = function () {
        return e.Ls[e.locale()];
      };

      t.prototype.localeData = function () {
        return function () {
          var n = this || _global;
          return {
            months: function (t) {
              return t ? t.format("MMMM") : r(n, "months");
            },
            monthsShort: function (t) {
              return t ? t.format("MMM") : r(n, "monthsShort", "months", 3);
            },
            firstDayOfWeek: function () {
              return n.$locale().weekStart || 0;
            },
            weekdaysMin: function (t) {
              return t ? t.format("dd") : r(n, "weekdaysMin", "weekdays", 2);
            },
            weekdaysShort: function (t) {
              return t ? t.format("ddd") : r(n, "weekdaysShort", "weekdays", 3);
            },
            longDateFormat: function (t) {
              return n.$locale().formats[t];
            }
          };
        }.bind(this || _global)();
      }, e.localeData = function () {
        var n = o();
        return {
          firstDayOfWeek: function () {
            return n.weekStart || 0;
          },
          weekdays: function () {
            return e.weekdays();
          },
          weekdaysShort: function () {
            return e.weekdaysShort();
          },
          weekdaysMin: function () {
            return e.weekdaysMin();
          },
          months: function () {
            return e.months();
          },
          monthsShort: function () {
            return e.monthsShort();
          }
        };
      }, e.months = function () {
        return o().months;
      }, e.monthsShort = function () {
        return r(o(), "monthsShort", "months", 3);
      }, e.weekdays = function () {
        return o().weekdays;
      }, e.weekdaysShort = function () {
        return r(o(), "weekdaysShort", "weekdays", 3);
      }, e.weekdaysMin = function () {
        return r(o(), "weekdaysMin", "weekdays", 2);
      };
    };
  });
  return exports;
}