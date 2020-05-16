"use strict";
exports.__esModule = true;
var reduceify_1 = require("./reduceify");
function arrIncludes(arr, e) {
    return arr.indexOf(e) >= 0;
}
exports.arrIncludes = arrIncludes;
function includes(e) {
    return reduceify_1.toReduceArguments(arrIncludes, e);
}
exports.includes = includes;
//# sourceMappingURL=includes.js.map