var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  exports = {
    "extends": ["../.eslintrc.js"],
    "env": {
      "mocha": true
    },
    "rules": {}
  };
  return exports;
}