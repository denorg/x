var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  /**
   * The base implementation of `_.conformsTo` which accepts `props` to check.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @param {Object} source The object of property predicates to conform to.
   * @returns {boolean} Returns `true` if `object` conforms, else `false`.
   */
  function baseConformsTo(object, source, props) {
    var length = props.length;

    if (object == null) {
      return !length;
    }

    object = Object(object);

    while (length--) {
      var key = props[length],
          predicate = source[key],
          value = object[key];

      if (value === undefined && !(key in object) || !predicate(value)) {
        return false;
      }
    }

    return true;
  }

  exports = baseConformsTo;
  return exports;
}