import { dew as _registerDewDew } from "./register.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  // This file is for backward compatibility with v0.5.1.
  _registerDewDew();

  console.warn("'json5/require' is deprecated. Please use 'json5/register' instead.");
  return exports;
}