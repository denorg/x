import { dew as _createRelationalOperationDewDew } from "./_createRelationalOperation.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  var createRelationalOperation = _createRelationalOperationDewDew();
  /**
   * Checks if `value` is less than or equal to `other`.
   *
   * @static
   * @memberOf _
   * @since 3.9.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if `value` is less than or equal to
   *  `other`, else `false`.
   * @see _.gte
   * @example
   *
   * _.lte(1, 3);
   * // => true
   *
   * _.lte(3, 3);
   * // => true
   *
   * _.lte(3, 1);
   * // => false
   */


  var lte = createRelationalOperation(function (value, other) {
    return value <= other;
  });
  exports = lte;
  return exports;
}