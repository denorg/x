import { dew as _arrayMapDewDew } from "./_arrayMap.dew.js";
import { dew as _baseIterateeDewDew } from "./_baseIteratee.dew.js";
import { dew as _baseMapDewDew } from "./_baseMap.dew.js";
import { dew as _baseSortByDewDew } from "./_baseSortBy.dew.js";
import { dew as _baseUnaryDewDew } from "./_baseUnary.dew.js";
import { dew as _compareMultipleDewDew } from "./_compareMultiple.dew.js";
import { dew as _identityDewDew } from "./identity.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  var arrayMap = _arrayMapDewDew(),
      baseIteratee = _baseIterateeDewDew(),
      baseMap = _baseMapDewDew(),
      baseSortBy = _baseSortByDewDew(),
      baseUnary = _baseUnaryDewDew(),
      compareMultiple = _compareMultipleDewDew(),
      identity = _identityDewDew();
  /**
   * The base implementation of `_.orderBy` without param guards.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
   * @param {string[]} orders The sort orders of `iteratees`.
   * @returns {Array} Returns the new sorted array.
   */


  function baseOrderBy(collection, iteratees, orders) {
    var index = -1;
    iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(baseIteratee));
    var result = baseMap(collection, function (value, key, collection) {
      var criteria = arrayMap(iteratees, function (iteratee) {
        return iteratee(value);
      });
      return {
        'criteria': criteria,
        'index': ++index,
        'value': value
      };
    });
    return baseSortBy(result, function (object, other) {
      return compareMultiple(object, other, orders);
    });
  }

  exports = baseOrderBy;
  return exports;
}