import { dew as _createCompounderDewDew } from "./_createCompounder.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  var createCompounder = _createCompounderDewDew();
  /**
   * Converts `string` to
   * [snake case](https://en.wikipedia.org/wiki/Snake_case).
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to convert.
   * @returns {string} Returns the snake cased string.
   * @example
   *
   * _.snakeCase('Foo Bar');
   * // => 'foo_bar'
   *
   * _.snakeCase('fooBar');
   * // => 'foo_bar'
   *
   * _.snakeCase('--FOO-BAR--');
   * // => 'foo_bar'
   */


  var snakeCase = createCompounder(function (result, word, index) {
    return result + (index ? '_' : '') + word.toLowerCase();
  });
  exports = snakeCase;
  return exports;
}