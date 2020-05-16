import { dew as _applyDewDew } from "./_apply.dew.js";
import { dew as _baseRestDewDew } from "./_baseRest.dew.js";
import { dew as _customDefaultsMergeDewDew } from "./_customDefaultsMerge.dew.js";
import { dew as _mergeWithDewDew } from "./mergeWith.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  var apply = _applyDewDew(),
      baseRest = _baseRestDewDew(),
      customDefaultsMerge = _customDefaultsMergeDewDew(),
      mergeWith = _mergeWithDewDew();
  /**
   * This method is like `_.defaults` except that it recursively assigns
   * default properties.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 3.10.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @see _.defaults
   * @example
   *
   * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
   * // => { 'a': { 'b': 2, 'c': 3 } }
   */


  var defaultsDeep = baseRest(function (args) {
    args.push(undefined, customDefaultsMerge);
    return apply(mergeWith, undefined, args);
  });
  exports = defaultsDeep;
  return exports;
}