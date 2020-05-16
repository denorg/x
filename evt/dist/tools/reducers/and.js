"use strict";
exports.__esModule = true;
var reduceify_1 = require("./reduceify");
function arrAnd(arr, conditions) {
    return !conditions.find(function (condition) { return !condition(arr); });
}
exports.arrAnd = arrAnd;
function and(conditions) {
    return reduceify_1.toReduceArguments(arrAnd, conditions);
}
exports.and = and;
//# sourceMappingURL=and.js.map