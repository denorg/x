import { dew as _baseRandomDewDew } from "./_baseRandom.dew.js";
import { dew as _isIterateeCallDewDew } from "./_isIterateeCall.dew.js";
import { dew as _toFiniteDewDew } from "./toFinite.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  var baseRandom = _baseRandomDewDew(),
      isIterateeCall = _isIterateeCallDewDew(),
      toFinite = _toFiniteDewDew();
  /** Built-in method references without a dependency on `root`. */


  var freeParseFloat = parseFloat;
  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeMin = Math.min,
      nativeRandom = Math.random;
  /**
   * Produces a random number between the inclusive `lower` and `upper` bounds.
   * If only one argument is provided a number between `0` and the given number
   * is returned. If `floating` is `true`, or either `lower` or `upper` are
   * floats, a floating-point number is returned instead of an integer.
   *
   * **Note:** JavaScript follows the IEEE-754 standard for resolving
   * floating-point values which can produce unexpected results.
   *
   * @static
   * @memberOf _
   * @since 0.7.0
   * @category Number
   * @param {number} [lower=0] The lower bound.
   * @param {number} [upper=1] The upper bound.
   * @param {boolean} [floating] Specify returning a floating-point number.
   * @returns {number} Returns the random number.
   * @example
   *
   * _.random(0, 5);
   * // => an integer between 0 and 5
   *
   * _.random(5);
   * // => also an integer between 0 and 5
   *
   * _.random(5, true);
   * // => a floating-point number between 0 and 5
   *
   * _.random(1.2, 5.2);
   * // => a floating-point number between 1.2 and 5.2
   */

  function random(lower, upper, floating) {
    if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
      upper = floating = undefined;
    }

    if (floating === undefined) {
      if (typeof upper == 'boolean') {
        floating = upper;
        upper = undefined;
      } else if (typeof lower == 'boolean') {
        floating = lower;
        lower = undefined;
      }
    }

    if (lower === undefined && upper === undefined) {
      lower = 0;
      upper = 1;
    } else {
      lower = toFinite(lower);

      if (upper === undefined) {
        upper = lower;
        lower = 0;
      } else {
        upper = toFinite(upper);
      }
    }

    if (lower > upper) {
      var temp = lower;
      lower = upper;
      upper = temp;
    }

    if (floating || lower % 1 || upper % 1) {
      var rand = nativeRandom();
      return nativeMin(lower + rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1))), upper);
    }

    return baseRandom(lower, upper);
  }

  exports = random;
  return exports;
}