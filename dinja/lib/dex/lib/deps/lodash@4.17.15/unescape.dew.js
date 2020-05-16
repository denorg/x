import { dew as _toStringDewDew } from "./toString.dew.js";
import { dew as _unescapeHtmlCharDewDew } from "./_unescapeHtmlChar.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  var toString = _toStringDewDew(),
      unescapeHtmlChar = _unescapeHtmlCharDewDew();
  /** Used to match HTML entities and HTML characters. */


  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
      reHasEscapedHtml = RegExp(reEscapedHtml.source);
  /**
   * The inverse of `_.escape`; this method converts the HTML entities
   * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to
   * their corresponding characters.
   *
   * **Note:** No other HTML entities are unescaped. To unescape additional
   * HTML entities use a third-party library like [_he_](https://mths.be/he).
   *
   * @static
   * @memberOf _
   * @since 0.6.0
   * @category String
   * @param {string} [string=''] The string to unescape.
   * @returns {string} Returns the unescaped string.
   * @example
   *
   * _.unescape('fred, barney, &amp; pebbles');
   * // => 'fred, barney, & pebbles'
   */

  function unescape(string) {
    string = toString(string);
    return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
  }

  exports = unescape;
  return exports;
}