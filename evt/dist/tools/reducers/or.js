"use strict";
exports.__esModule = true;
var reduceify_1 = require("./reduceify");
function arrOr(arr, conditions) {
    return !!conditions.find(function (condition) { return condition(arr); });
}
exports.arrOr = arrOr;
function or(conditions) {
    return reduceify_1.toReduceArguments(arrOr, conditions);
}
exports.or = or;
//# sourceMappingURL=or.js.map