import { dew as _unicodeDewDew } from "./unicode.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  const unicode = _unicodeDewDew();

  exports = {
    isSpaceSeparator(c) {
      return unicode.Space_Separator.test(c);
    },

    isIdStartChar(c) {
      return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c === '$' || c === '_' || unicode.ID_Start.test(c);
    },

    isIdContinueChar(c) {
      return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c >= '0' && c <= '9' || c === '$' || c === '_' || c === '\u200C' || c === '\u200D' || unicode.ID_Continue.test(c);
    },

    isDigit(c) {
      return /[0-9]/.test(c);
    },

    isHexDigit(c) {
      return /[0-9A-Fa-f]/.test(c);
    }

  };
  return exports;
}