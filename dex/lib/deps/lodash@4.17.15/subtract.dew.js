import { dew as _createMathOperationDewDew } from "./_createMathOperation.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  var createMathOperation = _createMathOperationDewDew();
  /**
   * Subtract two numbers.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Math
   * @param {number} minuend The first number in a subtraction.
   * @param {number} subtrahend The second number in a subtraction.
   * @returns {number} Returns the difference.
   * @example
   *
   * _.subtract(6, 4);
   * // => 2
   */


  var subtract = createMathOperation(function (minuend, subtrahend) {
    return minuend - subtrahend;
  }, 0);
  exports = subtract;
  return exports;
}