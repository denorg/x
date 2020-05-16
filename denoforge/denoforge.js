import Table from './deps/easy-table@1.1.0/table.js';
import moment from './deps/dayjs@1.8.24/esm/index.js';
import typy from './deps/typy@3.0.1/lib.js';
var t = typy.t;
import JSON5 from './deps/json5@2.1.0/dist.js';
import PapaParse from './deps/papaparse@5.1.0/papaparse.js';
import customParseFormat from './deps/dayjs@1.8.24/esm/plugin/customParseFormat/index.js';
import numeral from './deps/numeral@2.0.6/numeral.js';


/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

//
// An iterator that returns no values.
//
var EmptyIterator = /** @class */ (function () {
    function EmptyIterator() {
    }
    EmptyIterator.prototype.next = function () {
        return {
            done: true,
            value: null
        };
    };
    return EmptyIterator;
}());

//
var EmptyIterable = /** @class */ (function () {
    function EmptyIterable() {
    }
    EmptyIterable.prototype[Symbol.iterator] = function () {
        return new EmptyIterator();
    };
    return EmptyIterable;
}());

//
// An iterator that simply counts up from zero.
// This creates the default index in Data-Forge.
//
var CountIterator = /** @class */ (function () {
    function CountIterator() {
        this.index = 0;
    }
    CountIterator.prototype.next = function () {
        return {
            done: false,
            value: this.index++
        };
    };
    return CountIterator;
}());

//
var CountIterable = /** @class */ (function () {
    function CountIterable() {
    }
    CountIterable.prototype[Symbol.iterator] = function () {
        return new CountIterator();
    };
    return CountIterable;
}());

//
var MultiIterator = /** @class */ (function () {
    function MultiIterator(iterators) {
        this.iterators = iterators;
    }
    MultiIterator.prototype.next = function () {
        if (this.iterators.length === 0) {
            return {
                done: true,
                value: [],
            };
        }
        var multiResult = [];
        try {
            for (var _a = __values(this.iterators), _b = _a.next(); !_b.done; _b = _a.next()) {
                var iterator = _b.value;
                var result = iterator.next();
                if (result.done) {
                    return {
                        done: true,
                        value: [],
                    };
                }
                multiResult.push(result.value);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return {
            done: false,
            value: multiResult
        };
        var e_1, _c;
    };
    return MultiIterator;
}());

//
var MultiIterable = /** @class */ (function () {
    function MultiIterable(iterables) {
        this.iterables = iterables;
    }
    MultiIterable.prototype[Symbol.iterator] = function () {
        var iterators = [];
        try {
            for (var _a = __values(this.iterables), _b = _a.next(); !_b.done; _b = _a.next()) {
                var iterable = _b.value;
                iterators.push(iterable[Symbol.iterator]());
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return new MultiIterator(iterators);
        var e_1, _c;
    };
    return MultiIterable;
}());

//
// An iterator that applies a selector function to each item.
//
var SelectIterator = /** @class */ (function () {
    function SelectIterator(iterator, selector) {
        this.index = 0;
        this.iterator = iterator;
        this.selector = selector;
    }
    SelectIterator.prototype.next = function () {
        var result = this.iterator.next();
        if (result.done) {
            // https://github.com/Microsoft/TypeScript/issues/8938
            return { done: true }; // <= explicit cast here!;
        }
        return {
            done: false,
            value: this.selector(result.value, this.index++)
        };
    };
    return SelectIterator;
}());

//
var SelectIterable = /** @class */ (function () {
    function SelectIterable(iterable, selector) {
        this.iterable = iterable;
        this.selector = selector;
    }
    SelectIterable.prototype[Symbol.iterator] = function () {
        var iterator = this.iterable[Symbol.iterator]();
        return new SelectIterator(iterator, this.selector);
    };
    return SelectIterable;
}());

//
// An iterator that applies a selector function to each item.
//
var SelectManyIterator = /** @class */ (function () {
    function SelectManyIterator(iterator, selector) {
        this.index = 0;
        this.iterator = iterator;
        this.selector = selector;
        this.outputIterator = null;
    }
    SelectManyIterator.prototype.next = function () {
        while (true) {
            if (this.outputIterator === null) {
                var result = this.iterator.next();
                if (result.done) {
                    // https://github.com/Microsoft/TypeScript/issues/8938
                    return { done: true }; // <= explicit cast here!;
                }
                var outputIterable = this.selector(result.value, this.index++);
                this.outputIterator = outputIterable[Symbol.iterator]();
            }
            var outputResult = this.outputIterator.next();
            if (outputResult.done) {
                this.outputIterator = null;
                continue;
            }
            else {
                return outputResult;
            }
        }
    };
    return SelectManyIterator;
}());

//
var SelectManyIterable = /** @class */ (function () {
    function SelectManyIterable(iterable, selector) {
        this.iterable = iterable;
        this.selector = selector;
    }
    SelectManyIterable.prototype[Symbol.iterator] = function () {
        var iterator = this.iterable[Symbol.iterator]();
        return new SelectManyIterator(iterator, this.selector);
    };
    return SelectManyIterable;
}());

//
// An iterator that a sequence of elements while a predicate function returns true.
//
var TakeIterator = /** @class */ (function () {
    function TakeIterator(childIterator, numElements) {
        this.childIterator = childIterator;
        this.numElements = numElements;
    }
    TakeIterator.prototype.next = function () {
        if (this.numElements <= 0) {
            // https://github.com/Microsoft/TypeScript/issues/8938
            return { done: true }; // <= explicit cast here!;
        }
        --this.numElements;
        return this.childIterator.next();
    };
    return TakeIterator;
}());

//
var TakeIterable = /** @class */ (function () {
    function TakeIterable(childIterable, numElements) {
        this.childIterable = childIterable;
        this.numElements = numElements;
    }
    TakeIterable.prototype[Symbol.iterator] = function () {
        var childIterator = this.childIterable[Symbol.iterator]();
        return new TakeIterator(childIterator, this.numElements);
    };
    return TakeIterable;
}());

//
// An iterator that takes a sequence of elements while a predicate function returns true.
//
var TakeWhileIterator = /** @class */ (function () {
    function TakeWhileIterator(childIterator, predicate) {
        this.done = false;
        this.childIterator = childIterator;
        this.predicate = predicate;
    }
    TakeWhileIterator.prototype.next = function () {
        if (!this.done) {
            var result = this.childIterator.next();
            if (result.done) {
                this.done = true;
            }
            else if (this.predicate(result.value)) {
                return result;
            }
            else {
                this.done = true;
            }
        }
        // https://github.com/Microsoft/TypeScript/issues/8938
        return { done: true }; // <= explicit cast here!;
    };
    return TakeWhileIterator;
}());

//
var TakeWhileIterable = /** @class */ (function () {
    function TakeWhileIterable(childIterable, predicate) {
        this.childIterable = childIterable;
        this.predicate = predicate;
    }
    TakeWhileIterable.prototype[Symbol.iterator] = function () {
        var childIterator = this.childIterable[Symbol.iterator]();
        return new TakeWhileIterator(childIterator, this.predicate);
    };
    return TakeWhileIterable;
}());

//
// An iterator that takes elements from a child iterator based on a predicate function.
//
var WhereIterator = /** @class */ (function () {
    function WhereIterator(childIterator, predicate) {
        this.childIterator = childIterator;
        this.predicate = predicate;
    }
    WhereIterator.prototype.next = function () {
        while (true) {
            var result = this.childIterator.next();
            if (result.done) {
                return result;
            }
            if (this.predicate(result.value)) {
                // It matches the predicate.
                return result;
            }
        }
    };
    return WhereIterator;
}());

//
var WhereIterable = /** @class */ (function () {
    function WhereIterable(childIterable, predicate) {
        this.childIterable = childIterable;
        this.predicate = predicate;
    }
    WhereIterable.prototype[Symbol.iterator] = function () {
        var childIterator = this.childIterable[Symbol.iterator]();
        return new WhereIterator(childIterator, this.predicate);
    };
    return WhereIterable;
}());

//
// An iterator that concatenates multiple iterables.
//
var ConcatIterator = /** @class */ (function () {
    function ConcatIterator(iterables) {
        this.curIterator = null;
        this.iterables = iterables;
        this.iterator = iterables[Symbol.iterator]();
        this.moveToNextIterable();
    }
    //
    // Move onto the next iterable.
    //
    ConcatIterator.prototype.moveToNextIterable = function () {
        var nextIterable = this.iterator.next();
        if (nextIterable.done) {
            this.curIterator = null;
        }
        else {
            this.curIterator = nextIterable.value[Symbol.iterator]();
        }
    };
    ConcatIterator.prototype.next = function () {
        while (true) {
            if (this.curIterator == null) {
                // Finished iterating all sub-iterators.
                // https://github.com/Microsoft/TypeScript/issues/8938
                return { done: true }; // <= explicit cast here!;
            }
            var result = this.curIterator.next();
            if (!result.done) {
                return result; // Found a valid result from the current iterable.    
            }
            // Find the next non empty iterable.
            this.moveToNextIterable();
        }
    };
    return ConcatIterator;
}());

//
var ConcatIterable = /** @class */ (function () {
    function ConcatIterable(iterables) {
        this.iterables = iterables;
    }
    ConcatIterable.prototype[Symbol.iterator] = function () {
        return new ConcatIterator(this.iterables);
    };
    return ConcatIterable;
}());

//
var SeriesWindowIterator = /** @class */ (function () {
    function SeriesWindowIterator(iterable, period, whichIndex) {
        this.iterable = iterable;
        this.period = period;
        this.whichIndex = whichIndex;
    }
    SeriesWindowIterator.prototype.next = function () {
        if (!this.iterator) {
            this.iterator = this.iterable[Symbol.iterator]();
        }
        var curWindow = [];
        for (var i = 0; i < this.period; ++i) {
            var curPos = this.iterator.next();
            if (curPos.done) {
                // Underlying iterator is finished.
                break;
            }
            curWindow.push(curPos.value);
        }
        if (curWindow.length === 0) {
            // Underlying iterator doesn't have required number of elements.
            return { done: true };
        }
        var window = new Series({
            pairs: curWindow
        });
        return {
            //TODO: The way the index is figured out could have much better performance.
            value: [this.whichIndex === WhichIndex.Start ? window.getIndex().first() : window.getIndex().last(), window],
            done: false,
        };
    };
    return SeriesWindowIterator;
}());

//
var SeriesWindowIterable = /** @class */ (function () {
    function SeriesWindowIterable(iterable, period, whichIndex) {
        this.iterable = iterable;
        this.period = period;
        this.whichIndex = whichIndex;
    }
    SeriesWindowIterable.prototype[Symbol.iterator] = function () {
        return new SeriesWindowIterator(this.iterable, this.period, this.whichIndex);
    };
    return SeriesWindowIterable;
}());

//
// An iterator that iterates the elements of an array.
//
var ArrayIterator = /** @class */ (function () {
    function ArrayIterator(arr) {
        this.index = 0;
        this.arr = arr;
    }
    ArrayIterator.prototype.next = function () {
        if (this.index < this.arr.length) {
            return {
                done: false,
                value: this.arr[this.index++],
            };
        }
        else {
            // https://github.com/Microsoft/TypeScript/issues/8938
            return { done: true }; // <= explicit cast here!;
        }
    };
    return ArrayIterator;
}());

//
var ReverseIterable = /** @class */ (function () {
    function ReverseIterable(iterable) {
        this.iterable = iterable;
    }
    ReverseIterable.prototype[Symbol.iterator] = function () {
        var working = [];
        try {
            for (var _a = __values(this.iterable), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                working.push(value);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        working.reverse();
        return new ArrayIterator(working);
        var e_1, _c;
    };
    return ReverseIterable;
}());

var ZipIterator = /** @class */ (function () {
    function ZipIterator(iterables, zipper) {
        this.iterators = iterables.map(function (iterable) { return iterable[Symbol.iterator](); });
        this.zipper = zipper;
    }
    ZipIterator.prototype.next = function () {
        var results = this.iterators.map(function (iterator) { return iterator.next(); });
        try {
            for (var results_1 = __values(results), results_1_1 = results_1.next(); !results_1_1.done; results_1_1 = results_1.next()) {
                var result = results_1_1.value;
                if (result.done) {
                    // If any are done we are all done.
                    // https://github.com/Microsoft/TypeScript/issues/8938
                    return { done: true }; // <= explicit cast here!;                
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (results_1_1 && !results_1_1.done && (_a = results_1.return)) _a.call(results_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var zippedValues = results.map(function (result) { return result.value; });
        var zipperInput = new Series(zippedValues);
        return {
            done: false,
            value: this.zipper(zipperInput)
        };
        var e_1, _a;
    };
    return ZipIterator;
}());

//
var ZipIterable = /** @class */ (function () {
    function ZipIterable(iterables, zipper) {
        this.iterables = iterables;
        this.zipper = zipper;
    }
    ZipIterable.prototype[Symbol.iterator] = function () {
        return new ZipIterator(this.iterables, this.zipper);
    };
    return ZipIterable;
}());

//
// An iterator that iterates the only distinct elements of another iterable.
//
var DistinctIterator = /** @class */ (function () {
    function DistinctIterator(iterable, selector) {
        this.valuesAlreadySeen = new Set();
        this.iterator = iterable[Symbol.iterator]();
        this.selector = selector;
    }
    DistinctIterator.prototype.next = function () {
        while (true) {
            var result = this.iterator.next();
            if (result.done) {
                return { done: true };
            }
            var potentialOutput = void 0;
            if (this.selector) {
                potentialOutput = this.selector(result.value);
            }
            else {
                potentialOutput = result.value;
            }
            if (this.valuesAlreadySeen.has(potentialOutput)) {
                // Already seen this value.
                // Skip it and continue to next item.
                continue;
            }
            this.valuesAlreadySeen.add(potentialOutput);
            return {
                done: false,
                value: result.value,
            };
        }
    };
    return DistinctIterator;
}());

//
var DistinctIterable = /** @class */ (function () {
    function DistinctIterable(iterable, selector) {
        this.iterable = iterable;
        this.selector = selector;
    }
    DistinctIterable.prototype[Symbol.iterator] = function () {
        return new DistinctIterator(this.iterable, this.selector);
    };
    return DistinctIterable;
}());

//
var SeriesRollingWindowIterator = /** @class */ (function () {
    function SeriesRollingWindowIterator(iterable, period, whichIndex) {
        this.iterable = iterable;
        this.period = period;
        this.whichIndex = whichIndex;
    }
    SeriesRollingWindowIterator.prototype.next = function () {
        if (!this.curWindow) {
            this.curWindow = [];
            this.iterator = this.iterable[Symbol.iterator]();
            for (var i = 0; i < this.period; ++i) {
                var curPos = this.iterator.next();
                if (curPos.done) {
                    // Underlying iterator doesn't have required number of elements.
                    return { done: true };
                }
                this.curWindow.push(curPos.value);
            }
        }
        else {
            this.curWindow.shift(); // Remove first item from window.
            var curPos = this.iterator.next();
            if (curPos.done) {
                // Underlying iterator doesn't have enough elements left.
                return { done: true };
            }
            this.curWindow.push(curPos.value); // Add next item to window.
        }
        var window = new Series({
            pairs: this.curWindow
        });
        return {
            //TODO: The way the index is figured out could have much better performance.
            value: [this.whichIndex === WhichIndex.Start ? window.getIndex().first() : window.getIndex().last(), window],
            done: false,
        };
    };
    return SeriesRollingWindowIterator;
}());

//
var SeriesRollingWindowIterable = /** @class */ (function () {
    function SeriesRollingWindowIterable(iterable, period, whichIndex) {
        this.iterable = iterable;
        this.period = period;
        this.whichIndex = whichIndex;
    }
    SeriesRollingWindowIterable.prototype[Symbol.iterator] = function () {
        return new SeriesRollingWindowIterator(this.iterable, this.period, this.whichIndex);
    };
    return SeriesRollingWindowIterable;
}());

//
var SeriesVariableWindowIterator = /** @class */ (function () {
    function SeriesVariableWindowIterator(iterable, comparer) {
        this.iterator = iterable[Symbol.iterator]();
        this.nextValue = this.iterator.next();
        this.comparer = comparer;
    }
    SeriesVariableWindowIterator.prototype.next = function () {
        if (this.nextValue.done) {
            // Nothing more to read.
            // https://github.com/Microsoft/TypeScript/issues/8938
            return { done: true }; // <= explicit cast here!;
        }
        var pairs = [
            this.nextValue.value,
        ];
        var prevValue = this.nextValue.value;
        // Pull values until there is one that doesn't compare.
        while (true) {
            this.nextValue = this.iterator.next();
            if (this.nextValue.done) {
                break; // No more values.
            }
            if (!this.comparer(prevValue[1], this.nextValue.value[1])) {
                prevValue = this.nextValue.value;
                break; // Doesn't compare. Start a new window.
            }
            pairs.push(this.nextValue.value);
            prevValue = this.nextValue.value;
        }
        var window = new Series({
            pairs: pairs,
        });
        return {
            value: window,
            done: false,
        };
    };
    return SeriesVariableWindowIterator;
}());

//
var SeriesVariableWindowIterable = /** @class */ (function () {
    function SeriesVariableWindowIterable(iterable, comparer) {
        this.iterable = iterable;
        this.comparer = comparer;
    }
    SeriesVariableWindowIterable.prototype[Symbol.iterator] = function () {
        return new SeriesVariableWindowIterator(this.iterable, this.comparer);
    };
    return SeriesVariableWindowIterable;
}());

//
var Direction;
(function (Direction) {
    Direction[Direction["Ascending"] = 0] = "Ascending";
    Direction[Direction["Descending"] = 1] = "Descending";
})(Direction || (Direction = {}));
var SortOperation = /** @class */ (function () {
    function SortOperation(values, sortSpec) {
        this.values = values;
        this.sortSpec = sortSpec;
        this.keys = [];
    }
    SortOperation.prototype.genKeys = function () {
        if (this.keys.length > 0) {
            // Already cached.
            return;
        }
        var index = 0;
        try {
            for (var _a = __values(this.values), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                this.keys.push(this.sortSpec.selector(value, index));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    };
    SortOperation.prototype.compare = function (indexA, indexB) {
        this.genKeys();
        var keyA = this.keys[indexA];
        var keyB = this.keys[indexB];
        var comparison = -1;
        if (keyA === keyB) {
            comparison = 0;
        }
        else if (keyA > keyB) {
            comparison = 1;
        }
        return (this.sortSpec.direction === Direction.Descending) ? -comparison : comparison;
    };
    return SortOperation;
}());
var OrderedIterable = /** @class */ (function () {
    function OrderedIterable(iterable, sortSpec) {
        this.iterable = iterable;
        this.sortSpec = sortSpec;
    }
    OrderedIterable.prototype[Symbol.iterator] = function () {
        var indexes = [];
        var values = [];
        var index = 0;
        try {
            for (var _a = __values(this.iterable), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                indexes.push(index);
                values.push(value);
                ++index;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var sortOperations = [];
        try {
            for (var _d = __values(this.sortSpec), _e = _d.next(); !_e.done; _e = _d.next()) {
                var sortSpec = _e.value;
                sortOperations.push(new SortOperation(values, sortSpec));
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
            }
            finally { if (e_3) throw e_3.error; }
        }
        sortOperations[0].genKeys();
        indexes.sort(function (indexA, indexB) {
            try {
                for (var sortOperations_1 = __values(sortOperations), sortOperations_1_1 = sortOperations_1.next(); !sortOperations_1_1.done; sortOperations_1_1 = sortOperations_1.next()) {
                    var sortOperation = sortOperations_1_1.value;
                    var comparison = sortOperation.compare(indexA, indexB);
                    if (comparison !== 0) {
                        return comparison;
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (sortOperations_1_1 && !sortOperations_1_1.done && (_a = sortOperations_1.return)) _a.call(sortOperations_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return 0;
            var e_4, _a;
        });
        var sortedValues = [];
        try {
            for (var indexes_1 = __values(indexes), indexes_1_1 = indexes_1.next(); !indexes_1_1.done; indexes_1_1 = indexes_1.next()) {
                var index_1 = indexes_1_1.value;
                sortedValues.push(values[index_1]);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (indexes_1_1 && !indexes_1_1.done && (_g = indexes_1.return)) _g.call(indexes_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return new ArrayIterator(sortedValues);
        var e_2, _c, e_3, _f, e_5, _g;
    };
    return OrderedIterable;
}());

//
// An iterator to extact an element from an array.
//
var ExtractElementIterator = /** @class */ (function () {
    function ExtractElementIterator(iterator, extractIndex) {
        this.iterator = iterator;
        this.extractIndex = extractIndex;
    }
    ExtractElementIterator.prototype.next = function () {
        var result = this.iterator.next();
        if (result.done) {
            return result;
        }
        else {
            return {
                done: false,
                value: result.value[this.extractIndex]
            };
        }
    };
    return ExtractElementIterator;
}());

//
var ExtractElementIterable = /** @class */ (function () {
    function ExtractElementIterable(arrayIterable, extractIndex) {
        this.arrayIterable = arrayIterable;
        this.extractIndex = extractIndex;
    }
    ExtractElementIterable.prototype[Symbol.iterator] = function () {
        var arrayIterator = this.arrayIterable[Symbol.iterator]();
        return new ExtractElementIterator(arrayIterator, this.extractIndex);
    };
    return ExtractElementIterable;
}());

//
// An iterator that skips a number of values.
//
var SkipIterator = /** @class */ (function () {
    function SkipIterator(iterator, numValues) {
        this.iterator = iterator;
        this.numValues = numValues;
    }
    SkipIterator.prototype.next = function () {
        while (--this.numValues >= 0) {
            var result = this.iterator.next();
            if (result.done) {
                return result;
            }
        }
        return this.iterator.next();
    };
    return SkipIterator;
}());

//
var SkipIterable = /** @class */ (function () {
    function SkipIterable(iterable, numValues) {
        this.iterable = iterable;
        this.numValues = numValues;
    }
    SkipIterable.prototype[Symbol.iterator] = function () {
        var iterator = this.iterable[Symbol.iterator]();
        return new SkipIterator(iterator, this.numValues);
    };
    return SkipIterable;
}());

//
// An iterator that skips a sequence of elements while a predicate function returns true.
//
var SkipWhileIterator = /** @class */ (function () {
    function SkipWhileIterator(childIterator, predicate) {
        this.doneSkipping = false;
        this.childIterator = childIterator;
        this.predicate = predicate;
    }
    SkipWhileIterator.prototype.next = function () {
        while (true) {
            var result = this.childIterator.next();
            if (result.done) {
                return result; // Done.
            }
            if (!this.doneSkipping && this.predicate(result.value)) {
                continue; // Skip it.
            }
            // It matches, stop skipping.
            this.doneSkipping = true;
            return result;
        }
    };
    return SkipWhileIterator;
}());

//
var SkipWhileIterable = /** @class */ (function () {
    function SkipWhileIterable(childIterable, predicate) {
        this.childIterable = childIterable;
        this.predicate = predicate;
    }
    SkipWhileIterable.prototype[Symbol.iterator] = function () {
        var childIterator = this.childIterable[Symbol.iterator]();
        return new SkipWhileIterator(childIterator, this.predicate);
    };
    return SkipWhileIterable;
}());

//
var DataFrameWindowIterator = /** @class */ (function () {
    function DataFrameWindowIterator(columnNames, iterable, period) {
        this.columnNames = columnNames;
        this.iterable = iterable;
        this.period = period;
    }
    DataFrameWindowIterator.prototype.next = function () {
        if (!this.iterator) {
            this.iterator = this.iterable[Symbol.iterator]();
        }
        var curWindow = [];
        for (var i = 0; i < this.period; ++i) {
            var curPos = this.iterator.next();
            if (curPos.done) {
                // Underlying iterator is finished.
                break;
            }
            curWindow.push(curPos.value);
        }
        if (curWindow.length === 0) {
            // Underlying iterator doesn't have required number of elements.
            return { done: true };
        }
        var window = new DataFrame({
            columnNames: this.columnNames,
            pairs: curWindow
        });
        return {
            value: window,
            done: false,
        };
    };
    return DataFrameWindowIterator;
}());

//
var DataFrameWindowIterable = /** @class */ (function () {
    function DataFrameWindowIterable(columnNames, iterable, period) {
        this.columnNames = columnNames;
        this.iterable = iterable;
        this.period = period;
    }
    DataFrameWindowIterable.prototype[Symbol.iterator] = function () {
        return new DataFrameWindowIterator(this.columnNames, this.iterable, this.period);
    };
    return DataFrameWindowIterable;
}());

//
// An iterator that iterates the rows of a CSV file.
//
var CsvRowsIterator = /** @class */ (function () {
    function CsvRowsIterator(columnNames, rowsIterable) {
        this.index = 0;
        this.columnNames = Array.from(columnNames);
        this.rowsIterator = rowsIterable[Symbol.iterator]();
    }
    CsvRowsIterator.prototype.next = function () {
        var result = this.rowsIterator.next();
        if (result.done) {
            // https://github.com/Microsoft/TypeScript/issues/8938
            return { done: true }; // <= explicit cast here!;
        }
        var row = result.value;
        var value = {};
        for (var cellIndex = 0; cellIndex < this.columnNames.length; ++cellIndex) {
            var columnName = this.columnNames[cellIndex];
            value[columnName] = row[cellIndex];
        }
        return {
            done: false,
            value: value,
        };
    };
    return CsvRowsIterator;
}());

//
var CsvRowsIterable = /** @class */ (function () {
    function CsvRowsIterable(columnNames, rows) {
        this.columnNames = columnNames;
        this.rows = rows;
    }
    CsvRowsIterable.prototype[Symbol.iterator] = function () {
        return new CsvRowsIterator(this.columnNames, this.rows);
    };
    return CsvRowsIterable;
}());

//
var DataFrameRollingWindowIterator = /** @class */ (function () {
    function DataFrameRollingWindowIterator(columnNames, iterable, period) {
        this.columnNames = columnNames;
        this.iterable = iterable;
        this.period = period;
    }
    DataFrameRollingWindowIterator.prototype.next = function () {
        if (!this.curWindow) {
            this.curWindow = [];
            this.iterator = this.iterable[Symbol.iterator]();
            for (var i = 0; i < this.period; ++i) {
                var curPos = this.iterator.next();
                if (curPos.done) {
                    // Underlying iterator doesn't have required number of elements.
                    return { done: true };
                }
                this.curWindow.push(curPos.value);
            }
        }
        else {
            this.curWindow.shift(); // Remove first item from window.
            var curPos = this.iterator.next();
            if (curPos.done) {
                // Underlying iterator doesn't have enough elements left.
                return { done: true };
            }
            this.curWindow.push(curPos.value); // Add next item to window.
        }
        var window = new DataFrame({
            columnNames: this.columnNames,
            pairs: this.curWindow
        });
        return {
            value: window,
            done: false,
        };
    };
    return DataFrameRollingWindowIterator;
}());

//
var DataFrameRollingWindowIterable = /** @class */ (function () {
    function DataFrameRollingWindowIterable(columnNames, iterable, period) {
        this.columnNames = columnNames;
        this.iterable = iterable;
        this.period = period;
    }
    DataFrameRollingWindowIterable.prototype[Symbol.iterator] = function () {
        return new DataFrameRollingWindowIterator(this.columnNames, this.iterable, this.period);
    };
    return DataFrameRollingWindowIterable;
}());

//
var DataFrameVariableWindowIterator = /** @class */ (function () {
    function DataFrameVariableWindowIterator(columnNames, iterable, comparer) {
        this.columnNames = columnNames;
        this.iterator = iterable[Symbol.iterator]();
        this.nextValue = this.iterator.next();
        this.comparer = comparer;
    }
    DataFrameVariableWindowIterator.prototype.next = function () {
        if (this.nextValue.done) {
            // Nothing more to read.
            // https://github.com/Microsoft/TypeScript/issues/8938
            return { done: true }; // <= explicit cast here!;
        }
        var pairs = [
            this.nextValue.value,
        ];
        var prevValue = this.nextValue.value;
        // Pull values until there is one that doesn't compare.
        while (true) {
            this.nextValue = this.iterator.next();
            if (this.nextValue.done) {
                break; // No more values.
            }
            if (!this.comparer(prevValue[1], this.nextValue.value[1])) {
                prevValue = this.nextValue.value;
                break; // Doesn't compare. Start a new window.
            }
            pairs.push(this.nextValue.value);
            prevValue = this.nextValue.value;
        }
        var window = new DataFrame({
            columnNames: this.columnNames,
            pairs: pairs,
        });
        return {
            value: window,
            done: false,
        };
    };
    return DataFrameVariableWindowIterator;
}());

//
var DataFrameVariableWindowIterable = /** @class */ (function () {
    function DataFrameVariableWindowIterable(columnNames, iterable, comparer) {
        this.columnNames = columnNames;
        this.iterable = iterable;
        this.comparer = comparer;
    }
    DataFrameVariableWindowIterable.prototype[Symbol.iterator] = function () {
        return new DataFrameVariableWindowIterator(this.columnNames, this.iterable, this.comparer);
    };
    return DataFrameVariableWindowIterable;
}());

//
var ColumnNamesIterator = /** @class */ (function () {
    function ColumnNamesIterator(values, considerAllRows) {
        this.columnNamesIterator = null;
        this.values = values;
        this.considerAllRows = considerAllRows;
    }
    ColumnNamesIterator.prototype.next = function () {
        if (this.columnNamesIterator === null) {
            if (this.considerAllRows) {
                var combinedFields = {};
                try {
                    // Check all items.
                    for (var _a = __values(this.values), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var value = _b.value;
                        try {
                            for (var _c = __values(Object.keys(value)), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var fieldName = _d.value;
                                combinedFields[fieldName] = true;
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_e = _c.return)) _e.call(_c);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                this.columnNamesIterator = new ArrayIterator(Object.keys(combinedFields));
            }
            else {
                // Just check the first item.
                var valuesIterator = this.values[Symbol.iterator]();
                var firstResult = valuesIterator.next();
                if (firstResult.done) {
                    return {
                        done: true,
                        value: "",
                    };
                }
                this.columnNamesIterator = new ArrayIterator(Object.keys(firstResult.value));
            }
        }
        return this.columnNamesIterator.next();
        var e_2, _f, e_1, _e;
    };
    return ColumnNamesIterator;
}());

//
var ColumnNamesIterable = /** @class */ (function () {
    function ColumnNamesIterable(values, considerAllRows) {
        this.values = values;
        this.considerAllRows = considerAllRows;
    }
    ColumnNamesIterable.prototype[Symbol.iterator] = function () {
        return new ColumnNamesIterator(this.values, this.considerAllRows);
    };
    return ColumnNamesIterable;
}());

//
// Helper function to only return distinct items.
//
function makeDistinct(items, selector) {
    var set = {};
    var output = [];
    try {
        for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
            var item = items_1_1.value;
            var key = selector && selector(item) || item;
            if (!set[key]) {
                // Haven't yet seen this key.
                set[key] = true;
                output.push(item);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return output;
    var e_1, _a;
}
//
// Helper function to map an array of objects.
//
function toMap(items, keySelector, valueSelector) {
    var output = {};
    try {
        for (var items_2 = __values(items), items_2_1 = items_2.next(); !items_2_1.done; items_2_1 = items_2.next()) {
            var item = items_2_1.value;
            var key = keySelector(item);
            output[key] = valueSelector(item);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (items_2_1 && !items_2_1.done && (_a = items_2.return)) _a.call(items_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return output;
    var e_2, _a;
}
//
// Helper function to map an array of objects.
//
function toMap2(items, keySelector, valueSelector) {
    var output = new Map();
    try {
        for (var items_3 = __values(items), items_3_1 = items_3.next(); !items_3_1.done; items_3_1 = items_3.next()) {
            var item = items_3_1.value;
            output.set(keySelector(item), valueSelector(item));
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (items_3_1 && !items_3_1.done && (_a = items_3.return)) _a.call(items_3);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return output;
    var e_3, _a;
}
//
// Determine the type of a value.
//
function determineType(value) {
    if (value === undefined) {
        return "undefined";
    }
    else if (isNumber(value)) {
        return "number";
    }
    else if (isString(value)) {
        return "string";
    }
    else if (value instanceof Date) {
        return "date";
    }
    else if (isBoolean(value)) {
        return "boolean";
    }
    else {
        return "unsupported";
    }
}
function isObject(v) {
    return t(v).isObject && !isDate(v);
}
function isFunction(v) {
    return t(v).isFunction;
}
function isString(v) {
    return t(v).isString;
}
function isDate(v) {
    return Object.prototype.toString.call(v) === "[object Date]";
}
function isBoolean(v) {
    return t(v).isBoolean;
}
function isNumber(v) {
    return t(v).isNumber;
}
function isArray(v) {
    return t(v).isArray;
}
function isUndefined(v) {
    return v === undefined;
}

/**
 * Class that represents a dataframe.
 * A dataframe contains an indexed sequence of data records.
 * Think of it as a spreadsheet or CSV file in memory.
 *
 * Each data record contains multiple named fields, the value of each field represents one row in a column of data.
 * Each column of data is a named {@link Series}.
 * You think of a dataframe a collection of named data series.
 *
 * @typeparam IndexT The type to use for the index.
 * @typeparam ValueT The type to use for each row/data record.
 */
var DataFrame = /** @class */ (function () {
    /**
     * Create a dataframe.
     *
     * @param config This can be an array, a configuration object or a function that lazily produces a configuration object.
     *
     * It can be an array that specifies the data records that the dataframe contains.
     *
     * It can be a {@link IDataFrameConfig} that defines the data and configuration of the dataframe.
     *
     * Or it can be a function that lazily produces a {@link IDataFrameConfig}.
     *
     * @example
     * <pre>
     *
     * const df = new DataFrame();
     * </pre>
     *
     * @example
     * <pre>
     *
     * const df = new DataFrame([ { A: 10 }, { A: 20 }, { A: 30 }, { A: 40 }]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const df = new DataFrame({ index: [1, 2, 3, 4], values: [ { A: 10 }, { A: 20 }, { A: 30 }, { A: 40 }] });
     * </pre>
     *
     * @example
     * <pre>
     *
     * const lazyInit = () => ({ index: [1, 2, 3, 4], values: [ { A: 10 }, { A: 20 }, { A: 30 }, { A: 40 }] });
     * const df = new DataFrame(lazyInit);
     * </pre>
     */
    function DataFrame(config) {
        //
        // Function to lazy evaluate the configuration of the dataframe.
        //
        this.configFn = null;
        //
        // The content of the dataframe.
        // When this is null it means the dataframe is yet to be lazy initialised.
        //
        this.content = null;
        if (config) {
            if (isFunction(config)) {
                this.configFn = config;
            }
            else if (isArray(config) ||
                isFunction(config[Symbol.iterator])) {
                this.content = DataFrame.initFromArray(config);
            }
            else {
                this.content = DataFrame.initFromConfig(config);
            }
        }
        else {
            this.content = DataFrame.initEmpty();
        }
    }
    //
    // Initialise dataframe content from an iterable of values.
    //
    DataFrame.initFromArray = function (arr) {
        var firstResult = arr[Symbol.iterator]().next();
        var columnNames = !firstResult.done ? Object.keys(firstResult.value) : [];
        return {
            index: DataFrame.defaultCountIterable,
            values: arr,
            pairs: new MultiIterable([DataFrame.defaultCountIterable, arr]),
            isBaked: true,
            columnNames: columnNames,
        };
    };
    //
    // Initialise an empty dataframe.
    //
    DataFrame.initEmpty = function () {
        return {
            index: DataFrame.defaultEmptyIterable,
            values: DataFrame.defaultEmptyIterable,
            pairs: DataFrame.defaultEmptyIterable,
            isBaked: true,
            columnNames: [],
        };
    };
    //
    // Initialise dataframe column names.
    //
    DataFrame.initColumnNames = function (inputColumnNames) {
        var outputColumnNames = [];
        var columnNamesMap = {};
        try {
            // Search for duplicate column names.
            for (var inputColumnNames_1 = __values(inputColumnNames), inputColumnNames_1_1 = inputColumnNames_1.next(); !inputColumnNames_1_1.done; inputColumnNames_1_1 = inputColumnNames_1.next()) {
                var columnName = inputColumnNames_1_1.value;
                var columnNameLwr = columnName.toLowerCase();
                if (columnNamesMap[columnNameLwr] === undefined) {
                    columnNamesMap[columnNameLwr] = 1;
                }
                else {
                    columnNamesMap[columnNameLwr] += 1;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (inputColumnNames_1_1 && !inputColumnNames_1_1.done && (_a = inputColumnNames_1.return)) _a.call(inputColumnNames_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var columnNoMap = {};
        try {
            for (var inputColumnNames_2 = __values(inputColumnNames), inputColumnNames_2_1 = inputColumnNames_2.next(); !inputColumnNames_2_1.done; inputColumnNames_2_1 = inputColumnNames_2.next()) {
                var columnName = inputColumnNames_2_1.value;
                var columnNameLwr = columnName.toLowerCase();
                if (columnNamesMap[columnNameLwr] > 1) {
                    var curColumnNo = 1;
                    // There are duplicates of this column.
                    if (columnNoMap[columnNameLwr] !== undefined) {
                        curColumnNo = columnNoMap[columnNameLwr];
                    }
                    outputColumnNames.push(columnName + "." + curColumnNo);
                    columnNoMap[columnNameLwr] = curColumnNo + 1;
                }
                else {
                    // No duplicates.
                    outputColumnNames.push(columnName);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (inputColumnNames_2_1 && !inputColumnNames_2_1.done && (_b = inputColumnNames_2.return)) _b.call(inputColumnNames_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return outputColumnNames;
        var e_1, _a, e_2, _b;
    };
    //
    // Check that a value is an interable.
    //
    DataFrame.checkIterable = function (input, fieldName) {
        if (isArray(input)) ;
        else if (isFunction(input[Symbol.iterator])) ;
        else {
            // Not ok
            throw new Error("Expected '" + fieldName + "' field of DataFrame config object to be an array of values or an iterable of values.");
        }
    };
    //
    // Initialise dataframe content from a config object.
    //
    DataFrame.initFromConfig = function (config) {
        var index;
        var values;
        var pairs;
        var isBaked = false;
        var columnNames;
        if (config.pairs) {
            DataFrame.checkIterable(config.pairs, "pairs");
            pairs = config.pairs;
        }
        if (config.columns) {
            var columnsConfig = config.columns;
            if (isArray(columnsConfig) ||
                isFunction(columnsConfig[Symbol.iterator])) {
                var iterableColumnsConfig = columnsConfig;
                columnNames = Array.from(iterableColumnsConfig).map(function (column) { return column.name; });
                columnsConfig = toMap(iterableColumnsConfig, function (column) { return column.name; }, function (column) { return column.series; });
            }
            else {
                if (!isObject(columnsConfig))
                    throw new Error("Expected 'columns' member of 'config' parameter to DataFrame constructor to be an object with fields that define columns.");
                columnNames = Object.keys(columnsConfig);
            }
            var columnIterables = [];
            try {
                for (var columnNames_1 = __values(columnNames), columnNames_1_1 = columnNames_1.next(); !columnNames_1_1.done; columnNames_1_1 = columnNames_1.next()) {
                    var columnName = columnNames_1_1.value;
                    DataFrame.checkIterable(columnsConfig[columnName], columnName);
                    columnIterables.push(columnsConfig[columnName]);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (columnNames_1_1 && !columnNames_1_1.done && (_a = columnNames_1.return)) _a.call(columnNames_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            values = new CsvRowsIterable(columnNames, new MultiIterable(columnIterables));
        }
        else {
            if (config.columnNames) {
                columnNames = this.initColumnNames(config.columnNames);
            }
            if (config.rows) {
                if (!config.columnNames) {
                    columnNames = new SelectIterable(new CountIterable(), function (c) { return "Column." + c.toString(); });
                }
                DataFrame.checkIterable(config.rows, 'rows');
                values = new CsvRowsIterable(columnNames, config.rows); // Convert data from rows to columns.
            }
            else if (config.values) {
                DataFrame.checkIterable(config.values, 'values');
                values = config.values;
                if (!config.columnNames) {
                    columnNames = new ColumnNamesIterable(values, config.considerAllRows || false);
                }
            }
            else if (pairs) {
                values = new ExtractElementIterable(pairs, 1);
                if (!config.columnNames) {
                    columnNames = new ColumnNamesIterable(values, config.considerAllRows || false);
                }
            }
            else {
                values = DataFrame.defaultEmptyIterable;
                if (!config.columnNames) {
                    columnNames = DataFrame.defaultEmptyIterable;
                }
            }
        }
        if (config.index) {
            DataFrame.checkIterable(config.index, 'index');
            index = config.index;
        }
        else if (pairs) {
            index = new ExtractElementIterable(pairs, 0);
        }
        else {
            index = DataFrame.defaultCountIterable;
        }
        if (!pairs) {
            pairs = new MultiIterable([index, values]);
        }
        if (config.baked !== undefined) {
            isBaked = config.baked;
        }
        return {
            index: index,
            values: values,
            pairs: pairs,
            isBaked: isBaked,
            columnNames: columnNames,
        };
        var e_3, _a;
    };
    //
    // Ensure the dataframe content has been initialised.
    //
    DataFrame.prototype.lazyInit = function () {
        if (this.content === null && this.configFn !== null) {
            this.content = DataFrame.initFromConfig(this.configFn());
        }
    };
    //
    // Ensure the dataframe content is lazy initalised and return it.
    //
    DataFrame.prototype.getContent = function () {
        this.lazyInit();
        return this.content;
    };
    /**
     * Get an iterator to enumerate the rows of the dataframe.
     * Enumerating the iterator forces lazy evaluation to complete.
     * This function is automatically called by `for...of`.
     *
     * @return An iterator for the dataframe.
     *
     * @example
     * <pre>
     *
     * for (const row of df) {
     *     // ... do something with the row ...
     * }
     * </pre>
     */
    DataFrame.prototype[Symbol.iterator] = function () {
        return this.getContent().values[Symbol.iterator]();
    };
    /**
     * Get the names of the columns in the dataframe.
     *
     * @return Returns an array of the column names in the dataframe.
     *
     * @example
     * <pre>
     *
     * console.log(df.getColumnNames());
     * </pre>
     */
    DataFrame.prototype.getColumnNames = function () {
        return Array.from(this.getContent().columnNames);
    };
    /**
     * Retreive the collection of all columns in the dataframe.
     *
     * @return Returns a {@link Series} containing the names of the columns in the dataframe.
     *
     * @example
     * <pre>
     *
     * for (const column in df.getColummns()) {
     *      console.log("Column name: ");
     *      console.log(column.name);
     *
     *      console.log("Data:");
     *      console.log(column.series.toArray());
     * }
     * </pre>
     */
    DataFrame.prototype.getColumns = function () {
        var _this = this;
        return new Series(function () {
            var columnNames = _this.getColumnNames();
            return {
                values: columnNames.map(function (columnName) {
                    var series = _this.getSeries(columnName).skipWhile(function (value) { return value === undefined || value === null; });
                    var firstValue = series.any() ? series.first() : undefined;
                    return {
                        name: columnName,
                        type: determineType(firstValue),
                        series: series,
                    };
                }),
            };
        });
    };
    /**
     * Cast the value of the dataframe to a new type.
     * This operation has no effect but to retype the value that the dataframe contains.
     *
     * @return The same dataframe, but with the type changed.
     *
     * @example
     * <pre>
     *
     * const castDf = df.cast<SomeOtherType>();
     * </pre>
     */
    DataFrame.prototype.cast = function () {
        return this;
    };
    /**
     * Get the index for the dataframe.
     *
     * @return The {@link Index} for the dataframe.
     *
     * @example
     * <pre>
     *
     * const index = df.getIndex();
     * </pre>
     */
    DataFrame.prototype.getIndex = function () {
        var _this = this;
        return new Index(function () { return ({ values: _this.getContent().index }); });
    };
    /**
     * Set a named column as the {@link Index} of the dataframe.
     *
     * @param columnName Name of the column to use as the new {@link Index} of the returned dataframe.
     *
     * @return Returns a new dataframe with the values of the specified column as the new {@link Index}.
     *
     * @example
     * <pre>
     *
     * const indexedDf = df.setIndex("SomeColumn");
     * </pre>
     */
    DataFrame.prototype.setIndex = function (columnName) {
        if (!isString(columnName))
            throw new Error("Expected 'columnName' parameter to 'DataFrame.setIndex' to be a string that specifies the name of the column to set as the index for the dataframe.");
        return this.withIndex(this.getSeries(columnName));
    };
    /**
     * Apply a new {@link Index} to the dataframe.
     *
     * @param newIndex The new array or iterable to be the new {@link Index} of the dataframe. Can also be a selector to choose the {@link Index} for each row in the dataframe.
     *
     * @return Returns a new dataframe or dataframe with the specified {@link Index} attached.
     *
     * @example
     * <pre>
     *
     * const indexedDf = df.withIndex([10, 20, 30]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const indexedDf = df.withIndex(df.getSeries("SomeColumn"));
     * </pre>
     *
     * @example
     * <pre>
     *
     * const indexedDf = df.withIndex(row => row.SomeColumn);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const indexedDf = df.withIndex(row => row.SomeColumn + 20);
     * </pre>
     */
    DataFrame.prototype.withIndex = function (newIndex) {
        var _this = this;
        if (isFunction(newIndex)) {
            return new DataFrame(function () {
                var content = _this.getContent();
                return {
                    columnNames: content.columnNames,
                    values: content.values,
                    index: _this.deflate(newIndex),
                };
            });
        }
        else {
            DataFrame.checkIterable(newIndex, 'newIndex');
            return new DataFrame(function () {
                var content = _this.getContent();
                return {
                    columnNames: content.columnNames,
                    values: content.values,
                    index: newIndex,
                };
            });
        }
    };
    /**
     * Resets the {@link Index} of the dataframe back to the default zero-based sequential integer index.
     *
     * @return Returns a new dataframe with the {@link Index} reset to the default zero-based index.
     *
     * @example
     * <pre>
     *
     * const dfWithResetIndex = df.resetIndex();
     * </pre>
     */
    DataFrame.prototype.resetIndex = function () {
        var _this = this;
        return new DataFrame(function () {
            var content = _this.getContent();
            return {
                columnNames: content.columnNames,
                values: content.values,
            };
        });
    };
    /**
     * Extract a {@link Series} from a named column in the dataframe.
     *
     * @param columnName Specifies the name of the column that contains the {@link Series} to retreive.
     *
     * @return Returns the {@link Series} extracted from the named column in the dataframe.
     *
     * @example
     * <pre>
     *
     * const series = df.getSeries("SomeColumn");
     * </pre>
     */
    DataFrame.prototype.getSeries = function (columnName) {
        var _this = this;
        if (!isString(columnName))
            throw new Error("Expected 'columnName' parameter to 'DataFrame.getSeries' function to be a string that specifies the name of the column to retreive.");
        return new Series(function () { return ({
            values: new SelectIterable(_this.getContent().values, function (row) { return row[columnName]; }),
            index: _this.getContent().index,
        }); });
    };
    /**
     * Determine if the dataframe contains a {@link Series} the specified named column.
     *
     * @param columnName Name of the column to check for.
     *
     * @return Returns true if the dataframe contains the requested {@link Series}, otherwise returns false.
     *
     * @example
     * <pre>
     *
     * if (df.hasSeries("SomeColumn")) {
     *      // ... the dataframe contains a series with the specified column name ...
     * }
     * </pre>
     */
    DataFrame.prototype.hasSeries = function (columnName) {
        var columnNameLwr = columnName.toLowerCase();
        try {
            for (var _a = __values(this.getColumnNames()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var existingColumnName = _b.value;
                if (existingColumnName.toLowerCase() === columnNameLwr) {
                    return true;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return false;
        var e_4, _c;
    };
    /**
     * Verify the existence of a name column and extracts the {@link Series} for it.
     * Throws an exception if the requested column doesn't exist.
     *
     * @param columnName Name of the column to extract.
     *
     * @return Returns the {@link Series} for the column if it exists, otherwise it throws an exception.
     *
     * @example
     * <pre>
     *
     * try {
     *      const series = df.expectSeries("SomeColumn");
     *      // ... do something with the series ...
     * }
     * catch (err) {
     *      // ... the dataframe doesn't contain the column "SomeColumn" ...
     * }
     * </pre>
     */
    DataFrame.prototype.expectSeries = function (columnName) {
        if (!this.hasSeries(columnName)) {
            throw new Error("Expected dataframe to contain series with column name: '" + columnName + "'.");
        }
        return this.getSeries(columnName);
    };
    /**
     * Create a new dataframe with a replaced or additional column specified by the passed-in series.
     *
     * @param columnNameOrSpec The name of the column to add or replace or a {@link IColumnGenSpec} that defines the columns to add.
     * @param [series] When columnNameOrSpec is a string that identifies the column to add, this specifies the {@link Series} to add to the dataframe or a function that produces a series (given a dataframe).
     *
     * @return Returns a new dataframe replacing or adding a particular named column.
     *
     * @example
     * <pre>
     *
     * const modifiedDf = df.withSeries("ANewColumn", new Series([1, 2, 3]));
     * </pre>
     *
     * @example
     * <pre>
     *
     * const modifiedDf = df.withSeries("ANewColumn", df =>
     *      df.getSeries("SourceData").select(aTransformation)
     * );
     * </pre>
     *
     * @example
     * <pre>
     *
     * const modifiedDf = df.withSeries({
     *      ANewColumn: new Series([1, 2, 3]),
     *      SomeOtherColumn: new Series([10, 20, 30])
     * });
     * <pre>
     *
     * @example
     * <pre>
     *
     * const modifiedDf = df.withSeries({
     *      ANewColumn: df => df.getSeries("SourceData").select(aTransformation))
     * });
     * <pre>
     */
    DataFrame.prototype.withSeries = function (columnNameOrSpec, series) {
        var _this = this;
        if (!isObject(columnNameOrSpec)) {
            if (!isString(columnNameOrSpec))
                throw new Error("Expected 'columnNameOrSpec' parameter to 'DataFrame.withSeries' function to be a string that specifies the column to set or replace.");
            if (!isFunction(series)) {
                if (!isObject(series))
                    throw new Error("Expected 'series' parameter to 'DataFrame.withSeries' to be a Series object or a function that takes a dataframe and produces a Series.");
            }
        }
        else {
            if (!isUndefined(series))
                throw new Error("Expected 'series' parameter to 'DataFrame.withSeries' to not be set when 'columnNameOrSpec is an object.");
        }
        if (isObject(columnNameOrSpec)) {
            var columnSpec = columnNameOrSpec;
            var columnNames = Object.keys(columnSpec);
            var workingDataFrame = this;
            try {
                for (var columnNames_2 = __values(columnNames), columnNames_2_1 = columnNames_2.next(); !columnNames_2_1.done; columnNames_2_1 = columnNames_2.next()) {
                    var columnName_1 = columnNames_2_1.value;
                    workingDataFrame = workingDataFrame.withSeries(columnName_1, columnSpec[columnName_1]);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (columnNames_2_1 && !columnNames_2_1.done && (_a = columnNames_2.return)) _a.call(columnNames_2);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return workingDataFrame.cast();
        }
        var columnName = columnNameOrSpec;
        if (this.none()) { // We have an empty data frame.
            var importSeries = void 0;
            if (isFunction(series)) {
                importSeries = series(this);
            }
            else {
                importSeries = series;
            }
            return importSeries.inflate(function (value) {
                var row = {};
                row[columnName] = value;
                return row;
            })
                .cast();
        }
        return new DataFrame(function () {
            var importSeries;
            if (isFunction(series)) {
                importSeries = series(_this);
            }
            else {
                importSeries = series;
            }
            var seriesValueMap = toMap2(importSeries.toPairs(), function (pair) { return pair[0]; }, function (pair) { return pair[1]; });
            var newColumnNames = makeDistinct(_this.getColumnNames().concat([columnName]));
            return {
                columnNames: newColumnNames,
                index: _this.getContent().index,
                pairs: new SelectIterable(_this.getContent().pairs, function (pair) {
                    var index = pair[0];
                    var value = pair[1];
                    var modified = Object.assign({}, value);
                    modified[columnName] = seriesValueMap.get(index);
                    return [
                        index,
                        modified
                    ];
                }),
            };
        });
        var e_5, _a;
    };
    /**
     * Merge multiple dataframes into a single dataframe.
     * Rows are merged by indexed.
     * Same named columns in subsequent dataframes override columns earlier dataframes.
     *
     * @param dataFrames An array or series of dataframes to merge.
     *
     * @returns The merged data frame.
     *
     * @example
     * <pre>
     *
     * const mergedDF = DataFrame.merge([df1, df2, etc]);
     * </pre>
     */
    DataFrame.merge = function (dataFrames) {
        var rowMap = new Map();
        try {
            for (var dataFrames_1 = __values(dataFrames), dataFrames_1_1 = dataFrames_1.next(); !dataFrames_1_1.done; dataFrames_1_1 = dataFrames_1.next()) {
                var dataFrame = dataFrames_1_1.value;
                try {
                    for (var _a = __values(dataFrame.toPairs()), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var pair = _b.value;
                        var index = pair[0];
                        if (!rowMap.has(index)) {
                            var clone = Object.assign({}, pair[1]);
                            rowMap.set(index, clone);
                        }
                        else {
                            rowMap.set(index, Object.assign(rowMap.get(index), pair[1]));
                        }
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (dataFrames_1_1 && !dataFrames_1_1.done && (_d = dataFrames_1.return)) _d.call(dataFrames_1);
            }
            finally { if (e_7) throw e_7.error; }
        }
        var allColumnNames = Array.from(dataFrames)
            .map(function (dataFrame) { return dataFrame.getColumnNames(); })
            .reduce(function (prev, next) { return prev.concat(next); }, []);
        var newColumnNames = makeDistinct(allColumnNames);
        var mergedPairs = Array.from(rowMap.keys()).map(function (index) { return [index, rowMap.get(index)]; });
        mergedPairs.sort(function (a, b) {
            if (a[0] === b[0]) {
                return 0;
            }
            else if (a[0] > b[0]) {
                return 1;
            }
            else {
                return -1;
            }
        });
        return new DataFrame({
            columnNames: newColumnNames,
            pairs: mergedPairs,
        });
        var e_7, _d, e_6, _c;
    };
    /**
     * Merge one or more dataframes into this dataframe.
     * Rows are merged by indexed.
     * Same named columns in subsequent dataframes override columns in earlier dataframes.
     *
     * @param otherDataFrames... One or more dataframes to merge into this dataframe.
     *
     * @returns The merged data frame.
     *
     * @example
     * <pre>
     *
     * const mergedDF = df1.merge(df2);
     * </pre>
     *
     * <pre>
     *
     * const mergedDF = df1.merge(df2, df3, etc);
     * </pre>
     */
    DataFrame.prototype.merge = function () {
        var otherDataFrames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            otherDataFrames[_i] = arguments[_i];
        }
        return DataFrame.merge([this].concat(otherDataFrames));
    };
    /**
     * Add a series to the dataframe, but only if it doesn't already exist.
     *
     * @param columnNameOrSpec The name of the series to add or a {@link IColumnGenSpec} that specifies the columns to add.
     * @param [series] If columnNameOrSpec is a string that specifies the name of the series to add, this specifies the actual {@link Series} to add or a selector that generates the series given the dataframe.
     *
     * @return Returns a new dataframe with the specified series added, if the series didn't already exist. Otherwise if the requested series already exists the same dataframe is returned.
     *
     * @example
     * <pre>
     *
     * const updatedDf = df.ensureSeries("ANewColumn", new Series([1, 2, 3]));
     * </pre>
     *
     * @example
     * <pre>
     *
     * const updatedDf = df.ensureSeries("ANewColumn", df =>
     *      df.getSeries("AnExistingSeries").select(aTransformation)
     * );
     * </pre>
     *
     * @example
     * <pre>
     *
     * const modifiedDf = df.ensureSeries({
     *      ANewColumn: new Series([1, 2, 3]),
     *      SomeOtherColumn: new Series([10, 20, 30])
     * });
     * <pre>
     *
     * @example
     * <pre>
     *
     * const modifiedDf = df.ensureSeries({
     *      ANewColumn: df => df.getSeries("SourceData").select(aTransformation))
     * });
     * <pre>
     */
    DataFrame.prototype.ensureSeries = function (columnNameOrSpec, series) {
        if (!isObject(columnNameOrSpec)) {
            if (!isString(columnNameOrSpec))
                throw new Error("Expected 'columnNameOrSpec' parameter to 'DataFrame.ensureSeries' function to be a string that specifies the column to set or replace.");
            if (!isFunction(series)) {
                if (!isObject(series))
                    throw new Error("Expected 'series' parameter to 'DataFrame.ensureSeries' to be a Series object or a function that takes a dataframe and produces a Series.");
            }
        }
        else {
            if (!isUndefined(series))
                throw new Error("Expected 'series' parameter to 'DataFrame.ensureSeries' to not be set when 'columnNameOrSpec is an object.");
        }
        if (isObject(columnNameOrSpec)) {
            var columnSpec = columnNameOrSpec;
            var columnNames = Object.keys(columnNameOrSpec);
            var workingDataFrame = this;
            try {
                for (var columnNames_3 = __values(columnNames), columnNames_3_1 = columnNames_3.next(); !columnNames_3_1.done; columnNames_3_1 = columnNames_3.next()) {
                    var columnName_2 = columnNames_3_1.value;
                    workingDataFrame = workingDataFrame.ensureSeries(columnName_2, columnSpec[columnName_2]);
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (columnNames_3_1 && !columnNames_3_1.done && (_a = columnNames_3.return)) _a.call(columnNames_3);
                }
                finally { if (e_8) throw e_8.error; }
            }
            return workingDataFrame;
        }
        var columnName = columnNameOrSpec;
        if (this.hasSeries(columnName)) {
            return this; // Already have the series.
        }
        else {
            return this.withSeries(columnName, series);
        }
        var e_8, _a;
    };
    /**
     * Create a new dataframe with just a subset of columns.
     *
     * @param columnNames Array of column names to include in the new dataframe.
     *
     * @return Returns a dataframe with a subset of columns from the original dataframe.
     *
     * @example
     * <pre>
     * const subsetDf = df.subset(["ColumnA", "ColumnB"]);
     * </pre>
     */
    DataFrame.prototype.subset = function (columnNames) {
        var _this = this;
        if (!isArray(columnNames))
            throw new Error("Expected 'columnNames' parameter to 'DataFrame.subset' to be an array of column names to keep.");
        return new DataFrame(function () {
            var content = _this.getContent();
            return {
                columnNames: columnNames,
                index: content.index,
                values: new SelectIterable(content.values, function (value) {
                    var output = {};
                    try {
                        for (var columnNames_4 = __values(columnNames), columnNames_4_1 = columnNames_4.next(); !columnNames_4_1.done; columnNames_4_1 = columnNames_4.next()) {
                            var columnName = columnNames_4_1.value;
                            output[columnName] = value[columnName];
                        }
                    }
                    catch (e_9_1) { e_9 = { error: e_9_1 }; }
                    finally {
                        try {
                            if (columnNames_4_1 && !columnNames_4_1.done && (_a = columnNames_4.return)) _a.call(columnNames_4);
                        }
                        finally { if (e_9) throw e_9.error; }
                    }
                    return output;
                    var e_9, _a;
                }),
                pairs: new SelectIterable(content.pairs, function (pair) {
                    var output = {};
                    var value = pair[1];
                    try {
                        for (var columnNames_5 = __values(columnNames), columnNames_5_1 = columnNames_5.next(); !columnNames_5_1.done; columnNames_5_1 = columnNames_5.next()) {
                            var columnName = columnNames_5_1.value;
                            output[columnName] = value[columnName];
                        }
                    }
                    catch (e_10_1) { e_10 = { error: e_10_1 }; }
                    finally {
                        try {
                            if (columnNames_5_1 && !columnNames_5_1.done && (_a = columnNames_5.return)) _a.call(columnNames_5);
                        }
                        finally { if (e_10) throw e_10.error; }
                    }
                    return [pair[0], output];
                    var e_10, _a;
                }),
            };
        });
    };
    /**
     * Create a new dataframe with the requested column or columns dropped.
     *
     * @param columnOrColumns Specifies the column name (a string) or columns (array of strings) to drop.
     *
     * @return Returns a new dataframe with a particular named column or columns removed.
     *
     * @example
     * <pre>
     * const modifiedDf = df.dropSeries("SomeColumn");
     * </pre>
     *
     * @example
     * <pre>
     * const modifiedDf = df.dropSeries(["ColumnA", "ColumnB"]);
     * </pre>
     */
    DataFrame.prototype.dropSeries = function (columnOrColumns) {
        var _this = this;
        if (!isArray(columnOrColumns)) {
            if (!isString(columnOrColumns))
                throw new Error("'DataFrame.dropSeries' expected either a string or an array or strings.");
            columnOrColumns = [columnOrColumns]; // Convert to array for coding convenience.
        }
        return new DataFrame(function () {
            var content = _this.getContent();
            var newColumnNames = [];
            try {
                for (var _a = __values(content.columnNames), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var columnName = _b.value;
                    if (columnOrColumns.indexOf(columnName) === -1) {
                        newColumnNames.push(columnName); // This column is not being dropped.
                    }
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_11) throw e_11.error; }
            }
            return {
                columnNames: newColumnNames,
                index: content.index,
                values: new SelectIterable(content.values, function (value) {
                    var clone = Object.assign({}, value);
                    try {
                        for (var columnOrColumns_1 = __values(columnOrColumns), columnOrColumns_1_1 = columnOrColumns_1.next(); !columnOrColumns_1_1.done; columnOrColumns_1_1 = columnOrColumns_1.next()) {
                            var droppedColumnName = columnOrColumns_1_1.value;
                            delete clone[droppedColumnName];
                        }
                    }
                    catch (e_12_1) { e_12 = { error: e_12_1 }; }
                    finally {
                        try {
                            if (columnOrColumns_1_1 && !columnOrColumns_1_1.done && (_a = columnOrColumns_1.return)) _a.call(columnOrColumns_1);
                        }
                        finally { if (e_12) throw e_12.error; }
                    }
                    return clone;
                    var e_12, _a;
                }),
                pairs: new SelectIterable(content.pairs, function (pair) {
                    var clone = Object.assign({}, pair[1]);
                    try {
                        for (var columnOrColumns_2 = __values(columnOrColumns), columnOrColumns_2_1 = columnOrColumns_2.next(); !columnOrColumns_2_1.done; columnOrColumns_2_1 = columnOrColumns_2.next()) {
                            var droppedColumnName = columnOrColumns_2_1.value;
                            delete clone[droppedColumnName];
                        }
                    }
                    catch (e_13_1) { e_13 = { error: e_13_1 }; }
                    finally {
                        try {
                            if (columnOrColumns_2_1 && !columnOrColumns_2_1.done && (_a = columnOrColumns_2.return)) _a.call(columnOrColumns_2);
                        }
                        finally { if (e_13) throw e_13.error; }
                    }
                    return [pair[0], clone];
                    var e_13, _a;
                }),
            };
            var e_11, _c;
        });
    };
    /**
     * Create a new dataframe with columns reordered.
     * New column names create new columns (with undefined values), omitting existing column names causes those columns to be dropped.
     *
     * @param columnNames Specifies the new order for columns.
     *
     * @return Returns a new dataframe with columns reodered according to the order of the array of column names that is passed in.
     *
     * @example
     * <pre>
     * const reorderedDf = df.reorderSeries(["FirstColumn", "SecondColumn", "etc"]);
     * </pre>
     */
    DataFrame.prototype.reorderSeries = function (columnNames) {
        var _this = this;
        if (!isArray(columnNames))
            throw new Error("Expected parameter 'columnNames' to 'DataFrame.reorderSeries' to be an array with column names.");
        try {
            for (var columnNames_6 = __values(columnNames), columnNames_6_1 = columnNames_6.next(); !columnNames_6_1.done; columnNames_6_1 = columnNames_6.next()) {
                var columnName = columnNames_6_1.value;
                if (!isString(columnName))
                    throw new Error("Expected parameter 'columnNames' to 'DataFrame.reorderSeries' to be an array with column names.");
            }
        }
        catch (e_14_1) { e_14 = { error: e_14_1 }; }
        finally {
            try {
                if (columnNames_6_1 && !columnNames_6_1.done && (_a = columnNames_6.return)) _a.call(columnNames_6);
            }
            finally { if (e_14) throw e_14.error; }
        }
        return new DataFrame(function () {
            var content = _this.getContent();
            return {
                columnNames: columnNames,
                index: content.index,
                values: new SelectIterable(content.values, function (value) {
                    var output = {};
                    try {
                        for (var columnNames_7 = __values(columnNames), columnNames_7_1 = columnNames_7.next(); !columnNames_7_1.done; columnNames_7_1 = columnNames_7.next()) {
                            var columnName = columnNames_7_1.value;
                            output[columnName] = value[columnName];
                        }
                    }
                    catch (e_15_1) { e_15 = { error: e_15_1 }; }
                    finally {
                        try {
                            if (columnNames_7_1 && !columnNames_7_1.done && (_a = columnNames_7.return)) _a.call(columnNames_7);
                        }
                        finally { if (e_15) throw e_15.error; }
                    }
                    return output;
                    var e_15, _a;
                }),
                pairs: new SelectIterable(content.pairs, function (pair) {
                    var value = pair[1];
                    var output = {};
                    try {
                        for (var columnNames_8 = __values(columnNames), columnNames_8_1 = columnNames_8.next(); !columnNames_8_1.done; columnNames_8_1 = columnNames_8.next()) {
                            var columnName = columnNames_8_1.value;
                            output[columnName] = value[columnName];
                        }
                    }
                    catch (e_16_1) { e_16 = { error: e_16_1 }; }
                    finally {
                        try {
                            if (columnNames_8_1 && !columnNames_8_1.done && (_a = columnNames_8.return)) _a.call(columnNames_8);
                        }
                        finally { if (e_16) throw e_16.error; }
                    }
                    return [pair[0], output];
                    var e_16, _a;
                }),
            };
        });
        var e_14, _a;
    };
    /**
     * Bring the column(s) with specified name(s) to the front of the column order, making it (or them) the first column(s) in the output dataframe.
     *
     * @param columnOrColumns Specifies the column or columns to bring to the front.
     *
     * @return Returns a new dataframe with 1 or more columns bought to the front of the column ordering.
     *
     * @example
     * <pre>
     * const modifiedDf = df.bringToFront("NewFirstColumn");
     * </pre>
     *
     * @example
     * <pre>
     * const modifiedDf = df.bringToFront(["NewFirstColumn", "NewSecondColumn"]);
     * </pre>
     */
    DataFrame.prototype.bringToFront = function (columnOrColumns) {
        var _this = this;
        if (isArray(columnOrColumns)) {
            try {
                for (var columnOrColumns_3 = __values(columnOrColumns), columnOrColumns_3_1 = columnOrColumns_3.next(); !columnOrColumns_3_1.done; columnOrColumns_3_1 = columnOrColumns_3.next()) {
                    var columnName = columnOrColumns_3_1.value;
                    if (!isString(columnName)) {
                        throw new Error("Expect 'columnOrColumns' parameter to 'DataFrame.bringToFront' function to specify a column or columns via a string or an array of strings.");
                    }
                }
            }
            catch (e_17_1) { e_17 = { error: e_17_1 }; }
            finally {
                try {
                    if (columnOrColumns_3_1 && !columnOrColumns_3_1.done && (_a = columnOrColumns_3.return)) _a.call(columnOrColumns_3);
                }
                finally { if (e_17) throw e_17.error; }
            }
        }
        else {
            if (!isString(columnOrColumns)) {
                throw new Error("Expect 'columnOrColumns' parameter to 'DataFrame.bringToFront' function to specify a column or columns via a string or an array of strings.");
            }
            columnOrColumns = [columnOrColumns]; // Convert to array for coding convenience.
        }
        return new DataFrame(function () {
            var content = _this.getContent();
            var existingColumns = Array.from(content.columnNames);
            var columnsToMove = [];
            try {
                for (var columnOrColumns_4 = __values(columnOrColumns), columnOrColumns_4_1 = columnOrColumns_4.next(); !columnOrColumns_4_1.done; columnOrColumns_4_1 = columnOrColumns_4.next()) {
                    var columnToMove = columnOrColumns_4_1.value;
                    if (existingColumns.indexOf(columnToMove) !== -1) {
                        // The request column actually exists, so we will move it.
                        columnsToMove.push(columnToMove);
                    }
                }
            }
            catch (e_18_1) { e_18 = { error: e_18_1 }; }
            finally {
                try {
                    if (columnOrColumns_4_1 && !columnOrColumns_4_1.done && (_a = columnOrColumns_4.return)) _a.call(columnOrColumns_4);
                }
                finally { if (e_18) throw e_18.error; }
            }
            var untouchedColumnNames = [];
            try {
                for (var existingColumns_1 = __values(existingColumns), existingColumns_1_1 = existingColumns_1.next(); !existingColumns_1_1.done; existingColumns_1_1 = existingColumns_1.next()) {
                    var existingColumnName = existingColumns_1_1.value;
                    if (columnOrColumns.indexOf(existingColumnName) === -1) {
                        untouchedColumnNames.push(existingColumnName);
                    }
                }
            }
            catch (e_19_1) { e_19 = { error: e_19_1 }; }
            finally {
                try {
                    if (existingColumns_1_1 && !existingColumns_1_1.done && (_b = existingColumns_1.return)) _b.call(existingColumns_1);
                }
                finally { if (e_19) throw e_19.error; }
            }
            return {
                columnNames: columnsToMove.concat(untouchedColumnNames),
                index: content.index,
                values: content.values,
                pairs: content.pairs,
            };
            var e_18, _a, e_19, _b;
        });
        var e_17, _a;
    };
    /**
     * Bring the column(s) with specified name(s) to the back of the column order, making it (or them) the last column(s) in the output dataframe.
     *
     * @param columnOrColumns Specifies the column or columns to bring to the back.
     *
     * @return Returns a new dataframe with 1 or more columns bought to the back of the column ordering.
     *
     * @example
     * <pre>
     * const modifiedDf = df.bringToBack("NewLastColumn");
     * </pre>
     *
     * @example
     * <pre>
     * const modifiedDf = df.bringToBack(["NewSecondLastCollumn, ""NewLastColumn"]);
     * </pre>
     */
    DataFrame.prototype.bringToBack = function (columnOrColumns) {
        var _this = this;
        if (isArray(columnOrColumns)) {
            try {
                for (var columnOrColumns_5 = __values(columnOrColumns), columnOrColumns_5_1 = columnOrColumns_5.next(); !columnOrColumns_5_1.done; columnOrColumns_5_1 = columnOrColumns_5.next()) {
                    var columnName = columnOrColumns_5_1.value;
                    if (!isString(columnName)) {
                        throw new Error("Expect 'columnOrColumns' parameter to 'DataFrame.bringToBack' function to specify a column or columns via a string or an array of strings.");
                    }
                }
            }
            catch (e_20_1) { e_20 = { error: e_20_1 }; }
            finally {
                try {
                    if (columnOrColumns_5_1 && !columnOrColumns_5_1.done && (_a = columnOrColumns_5.return)) _a.call(columnOrColumns_5);
                }
                finally { if (e_20) throw e_20.error; }
            }
        }
        else {
            if (!isString(columnOrColumns)) {
                throw new Error("Expect 'columnOrColumns' parameter to 'DataFrame.bringToBack' function to specify a column or columns via a string or an array of strings.");
            }
            columnOrColumns = [columnOrColumns]; // Convert to array for coding convenience.
        }
        return new DataFrame(function () {
            var content = _this.getContent();
            var existingColumns = Array.from(content.columnNames);
            var columnsToMove = [];
            try {
                for (var columnOrColumns_6 = __values(columnOrColumns), columnOrColumns_6_1 = columnOrColumns_6.next(); !columnOrColumns_6_1.done; columnOrColumns_6_1 = columnOrColumns_6.next()) {
                    var columnToMove = columnOrColumns_6_1.value;
                    if (existingColumns.indexOf(columnToMove) !== -1) {
                        // The request column actually exists, so we will move it.
                        columnsToMove.push(columnToMove);
                    }
                }
            }
            catch (e_21_1) { e_21 = { error: e_21_1 }; }
            finally {
                try {
                    if (columnOrColumns_6_1 && !columnOrColumns_6_1.done && (_a = columnOrColumns_6.return)) _a.call(columnOrColumns_6);
                }
                finally { if (e_21) throw e_21.error; }
            }
            var untouchedColumnNames = [];
            try {
                for (var existingColumns_2 = __values(existingColumns), existingColumns_2_1 = existingColumns_2.next(); !existingColumns_2_1.done; existingColumns_2_1 = existingColumns_2.next()) {
                    var existingColumnName = existingColumns_2_1.value;
                    if (columnOrColumns.indexOf(existingColumnName) === -1) {
                        untouchedColumnNames.push(existingColumnName);
                    }
                }
            }
            catch (e_22_1) { e_22 = { error: e_22_1 }; }
            finally {
                try {
                    if (existingColumns_2_1 && !existingColumns_2_1.done && (_b = existingColumns_2.return)) _b.call(existingColumns_2);
                }
                finally { if (e_22) throw e_22.error; }
            }
            return {
                columnNames: untouchedColumnNames.concat(columnsToMove),
                index: content.index,
                values: content.values,
                pairs: content.pairs,
            };
            var e_21, _a, e_22, _b;
        });
        var e_20, _a;
    };
    /**
     * Create a new dataframe with 1 or more columns renamed.
     *
     * @param newColumnNames A column rename spec - a JavaScript hash that maps existing column names to new column names.
     *
     * @return Returns a new dataframe with specified columns renamed.
     *
     * @example
     * <pre>
     *
     * const renamedDf = df.renameSeries({ OldColumnName, NewColumnName });
     * </pre>
     *
     * @example
     * <pre>
     *
     * const renamedDf = df.renameSeries({
     *      Column1: ColumnA,
     *      Column2: ColumnB
     * });
     * </pre>
     */
    DataFrame.prototype.renameSeries = function (newColumnNames) {
        var _this = this;
        if (!isObject(newColumnNames))
            throw new Error("Expected parameter 'newColumnNames' to 'DataFrame.renameSeries' to be an array with column names.");
        var existingColumnsToRename = Object.keys(newColumnNames);
        try {
            for (var existingColumnsToRename_1 = __values(existingColumnsToRename), existingColumnsToRename_1_1 = existingColumnsToRename_1.next(); !existingColumnsToRename_1_1.done; existingColumnsToRename_1_1 = existingColumnsToRename_1.next()) {
                var existingColumnName = existingColumnsToRename_1_1.value;
                if (!isString(existingColumnName))
                    throw new Error("Expected existing column name '" + existingColumnName + "' of 'newColumnNames' parameter to 'DataFrame.renameSeries' to be a string.");
                if (!isString(newColumnNames[existingColumnName]))
                    throw new Error("Expected new column name '" + newColumnNames[existingColumnName] + "' for existing column '" + existingColumnName + "' of 'newColumnNames' parameter to 'DataFrame.renameSeries' to be a string.");
            }
        }
        catch (e_23_1) { e_23 = { error: e_23_1 }; }
        finally {
            try {
                if (existingColumnsToRename_1_1 && !existingColumnsToRename_1_1.done && (_a = existingColumnsToRename_1.return)) _a.call(existingColumnsToRename_1);
            }
            finally { if (e_23) throw e_23.error; }
        }
        return new DataFrame(function () {
            var content = _this.getContent();
            var renamedColumns = [];
            try {
                for (var _a = __values(content.columnNames), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var existingColumnName = _b.value;
                    var columnIndex = existingColumnsToRename.indexOf(existingColumnName);
                    if (columnIndex === -1) {
                        renamedColumns.push(existingColumnName); // This column is not renamed.                    
                    }
                    else {
                        renamedColumns.push(newColumnNames[existingColumnName]); // This column is renamed.
                    }
                }
            }
            catch (e_24_1) { e_24 = { error: e_24_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_24) throw e_24.error; }
            }
            //
            // Remap each row of the data frame to the new column names.
            //
            function remapValue(value) {
                var clone = Object.assign({}, value);
                try {
                    for (var existingColumnsToRename_2 = __values(existingColumnsToRename), existingColumnsToRename_2_1 = existingColumnsToRename_2.next(); !existingColumnsToRename_2_1.done; existingColumnsToRename_2_1 = existingColumnsToRename_2.next()) {
                        var existingColumName = existingColumnsToRename_2_1.value;
                        clone[newColumnNames[existingColumName]] = clone[existingColumName];
                        delete clone[existingColumName];
                    }
                }
                catch (e_25_1) { e_25 = { error: e_25_1 }; }
                finally {
                    try {
                        if (existingColumnsToRename_2_1 && !existingColumnsToRename_2_1.done && (_a = existingColumnsToRename_2.return)) _a.call(existingColumnsToRename_2);
                    }
                    finally { if (e_25) throw e_25.error; }
                }
                return clone;
                var e_25, _a;
            }
            return {
                columnNames: renamedColumns,
                index: content.index,
                values: new SelectIterable(content.values, remapValue),
                pairs: new SelectIterable(content.pairs, function (pair) {
                    return [pair[0], remapValue(pair[1])];
                }),
            };
            var e_24, _c;
        });
        var e_23, _a;
    };
    /**
    * Extract values from the dataframe as an array.
    * This forces lazy evaluation to complete.
    *
    * @return Returns an array of the values contained within the dataframe.
    *
    * @example
    * <pre>
    * const values = df.toArray();
    * </pre>
    */
    DataFrame.prototype.toArray = function () {
        var values = [];
        try {
            for (var _a = __values(this.getContent().values), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                if (value !== undefined && value !== null) {
                    values.push(value);
                }
            }
        }
        catch (e_26_1) { e_26 = { error: e_26_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_26) throw e_26.error; }
        }
        return values;
        var e_26, _c;
    };
    /**
     * Retreive the index and values pairs from the dataframe as an array.
     * Each pair is [index, value].
     * This forces lazy evaluation to complete.
     *
     * @return Returns an array of pairs that contains the dataframe content. Each pair is a two element array that contains an index and a value.
     *
     * @example
     * <pre>
     * const pairs = df.toPairs();
     * </pre>
     */
    DataFrame.prototype.toPairs = function () {
        var pairs = [];
        try {
            for (var _a = __values(this.getContent().pairs), _b = _a.next(); !_b.done; _b = _a.next()) {
                var pair = _b.value;
                if (pair[1] != undefined && pair[1] !== null) {
                    pairs.push(pair);
                }
            }
        }
        catch (e_27_1) { e_27 = { error: e_27_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_27) throw e_27.error; }
        }
        return pairs;
        var e_27, _c;
    };
    /**
     * Convert the dataframe to a JavaScript object.
     *
     * @param keySelector Function that selects keys for the resulting object.
     * @param valueSelector Function that selects values for the resulting object.
     *
     * @return Returns a JavaScript object generated from the dataframe by applying the key and value selector functions.
     *
     * @example
     * <pre>
     *
     * const someObject = df.toObject(
     *      row => row.SomeColumn, // Specify the column to use for fields in the object.
     *      row => row.SomeOtherColumn // Specifi the column to use as the value for each field.
     * );
     * </pre>
     */
    DataFrame.prototype.toObject = function (keySelector, valueSelector) {
        if (!isFunction(keySelector))
            throw new Error("Expected 'keySelector' parameter to DataFrame.toObject to be a function.");
        if (!isFunction(valueSelector))
            throw new Error("Expected 'valueSelector' parameter to DataFrame.toObject to be a function.");
        return toMap(this, keySelector, valueSelector);
    };
    /**
     * Bake the data frame to an array of rows were each rows is an array of values in column order.
     *
     * @return Returns an array of rows. Each row is an array of values in column order.
     *
     * @example
     * <pre>
     * const rows = df.toRows();
     * </pre>
     */
    DataFrame.prototype.toRows = function () {
        var columnNames = this.getColumnNames();
        var rows = [];
        try {
            for (var _a = __values(this.getContent().values), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                var row = [];
                for (var columnIndex = 0; columnIndex < columnNames.length; ++columnIndex) {
                    row.push(value[columnNames[columnIndex]]);
                }
                rows.push(row);
            }
        }
        catch (e_28_1) { e_28 = { error: e_28_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_28) throw e_28.error; }
        }
        return rows;
        var e_28, _c;
    };
    /**
     * Generates a new dataframe by repeatedly calling a selector function on each row in the original dataframe.
     *
     * @param selector Selector function that transforms each row to create the new dataframe.
     *
     * @return Returns a new dataframe that has been transformed by the selector function.
     *
     * @example
     * <pre>
     *
     * function transformRow (inputRow) {
     *      const outputRow = {
     *          // ... construct output row derived from input row ...
     *      };
     *
     *      return outputRow;
     * }
     *
     * const modifiedDf = df.select(row => transformRow(row));
     * </pre>
     */
    DataFrame.prototype.select = function (selector) {
        var _this = this;
        if (!isFunction(selector))
            throw new Error("Expected 'selector' parameter to 'DataFrame.select' function to be a function.");
        return new DataFrame(function () {
            var content = _this.getContent();
            return {
                values: new SelectIterable(content.values, selector),
                index: content.index,
            };
        });
    };
    /**
     * Generates a new dataframe by repeatedly calling a selector function on each row in the original dataframe.
     *
     * In this case the selector function produces a collection of output rows that are flattened to create the new dataframe.
     *
     * @param selector Selector function that transforms each row into a collection of output rows.
     *
     * @return  Returns a new dataframe with rows that have been produced by the selector function.
     *
     * @example
     * <pre>
     *
     * function produceOutputRows (inputRow) {
     *      const outputRows = [];
     *      while (someCondition) {     *
     *          // ... generate zero or more output rows ...
     *          outputRows.push(... some generated row ...);
     *      }
     *      return outputRows;
     * }
     *
     * const modifiedDf = df.selectMany(row => produceOutputRows(row));
     * </pre>
     */
    DataFrame.prototype.selectMany = function (selector) {
        var _this = this;
        if (!isFunction(selector))
            throw new Error("Expected 'selector' parameter to 'DataFrame.selectMany' to be a function.");
        return new DataFrame(function () { return ({
            pairs: new SelectManyIterable(_this.getContent().pairs, function (pair, index) {
                var outputPairs = [];
                try {
                    for (var _a = __values(selector(pair[1], index)), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var transformed = _b.value;
                        outputPairs.push([
                            pair[0],
                            transformed
                        ]);
                    }
                }
                catch (e_29_1) { e_29 = { error: e_29_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_29) throw e_29.error; }
                }
                return outputPairs;
                var e_29, _c;
            })
        }); });
    };
    /**
     * Transform one or more columns.
     *
     * This is equivalent to extracting a {@link Series} with {@link getSeries}, then transforming it with {@link Series.select},
     * and finally plugging it back in as the same column using {@link withSeries}.
     *
     * @param columnSelectors Object with field names for each column to be transformed. Each field specifies a selector function that transforms that column.
     *
     * @return Returns a new dataframe with 1 or more columns transformed.
     *
     * @example
     * <pre>
     *
     * const modifiedDf = df.transformSeries({
     *      AColumnToTransform: columnValue => transformRow(columnValue)
     * });
     * </pre>
     *
     * @example
     * <pre>
     *
     * const modifiedDf = df.transformSeries({
     *      ColumnA: columnValue => transformColumnA(columnValue),
     *      ColumnB: columnValue => transformColumnB(columnValue)
     * });
     * </pre>
     */
    DataFrame.prototype.transformSeries = function (columnSelectors) {
        if (!isObject(columnSelectors))
            throw new Error("Expected 'columnSelectors' parameter of 'DataFrame.transformSeries' function to be an object. Field names should specify columns to transform. Field values should be selector functions that specify the transformation for each column.");
        var working = this;
        try {
            for (var _a = __values(Object.keys(columnSelectors)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var columnName = _b.value;
                if (working.hasSeries(columnName)) {
                    working = working.withSeries(columnName, working.getSeries(columnName)
                        .select(columnSelectors[columnName]));
                }
            }
        }
        catch (e_30_1) { e_30 = { error: e_30_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_30) throw e_30.error; }
        }
        return working;
        var e_30, _c;
    };
    /**
     * Generate new columns based on existing rows.
     *
     * This is equivalent to calling {@link select} to transform the original dataframe to a new dataframe with different column,
     * then using {@link withSeries} to merge each the of both the new and original dataframes.
     *
     * @param generator Generator function that transforms each row to produce 1 or more new columns.
     * Or use a column spec that has fields for each column, the fields specify a generate function that produces the value for each new column.
     *
     * @return Returns a new dataframe with 1 or more new columns.
     *
     * @example
     * <pre>
     *
     * function produceNewColumns (inputRow) {
     *      const newColumns = {
     *          // ... specify new columns and their values based on the input row ...
     *      };
     *
     *      return newColumns;
     * };
     *
     * const dfWithNewSeries = df.generateSeries(row => produceNewColumns(row));
     * </pre>
     *
     * @example
     * <pre>
     *
     * const dfWithNewSeries = df.generateSeries({
     *      NewColumnA: row => produceNewColumnA(row),
     *      NewColumnB: row => produceNewColumnB(row),
     * })
     * </pre>
     */
    DataFrame.prototype.generateSeries = function (generator) {
        if (!isObject(generator)) {
            if (!isFunction(generator)) {
                throw new Error("Expected 'generator' parameter to 'DataFrame.generateSeries' function to be a function or an object.");
            }
            var selector = generator;
            var newColumns = this.select(selector) // Build a new dataframe.
                .bake(); //TODO: Bake should be needed here, but it causes problems if not.
            var newColumnNames = newColumns.getColumnNames();
            var working = this;
            try {
                //TODO: There must be a cheaper implementation!
                for (var newColumnNames_1 = __values(newColumnNames), newColumnNames_1_1 = newColumnNames_1.next(); !newColumnNames_1_1.done; newColumnNames_1_1 = newColumnNames_1.next()) {
                    var newColumnName = newColumnNames_1_1.value;
                    working = working.withSeries(newColumnName, newColumns.getSeries(newColumnName));
                }
            }
            catch (e_31_1) { e_31 = { error: e_31_1 }; }
            finally {
                try {
                    if (newColumnNames_1_1 && !newColumnNames_1_1.done && (_a = newColumnNames_1.return)) _a.call(newColumnNames_1);
                }
                finally { if (e_31) throw e_31.error; }
            }
            return working;
        }
        else {
            var columnTransformSpec = generator;
            var newColumnNames = Object.keys(columnTransformSpec);
            var working = this;
            try {
                for (var newColumnNames_2 = __values(newColumnNames), newColumnNames_2_1 = newColumnNames_2.next(); !newColumnNames_2_1.done; newColumnNames_2_1 = newColumnNames_2.next()) {
                    var newColumnName = newColumnNames_2_1.value;
                    working = working.withSeries(newColumnName, working.select(columnTransformSpec[newColumnName]).deflate());
                }
            }
            catch (e_32_1) { e_32 = { error: e_32_1 }; }
            finally {
                try {
                    if (newColumnNames_2_1 && !newColumnNames_2_1.done && (_b = newColumnNames_2.return)) _b.call(newColumnNames_2);
                }
                finally { if (e_32) throw e_32.error; }
            }
            return working;
        }
        var e_31, _a, e_32, _b;
    };
    /**
     * Converts (deflates) a dataframe to a {@link Series}.
     *
     * @param [selector] Optional selector function that transforms each row to produce the series.
     *
     * @return Returns a series that was created from the deflated from  the original dataframe.
     *
     * @example
     * <pre>
     *
     * const series = df.deflate(); // Deflate to a series of object.
     * </pre>
     *
     * @example
     * <pre>
     *
     * const series = df.deflate(row => row.SomeColumn); // Extract a particular column.
     * </pre>
     */
    DataFrame.prototype.deflate = function (selector) {
        var _this = this;
        if (selector) {
            if (!isFunction(selector))
                throw new Error("Expected 'selector' parameter to 'DataFrame.deflate' function to be a selector function.");
        }
        return new Series(function () {
            var content = _this.getContent();
            if (selector) {
                return {
                    index: content.index,
                    values: new SelectIterable(content.values, selector),
                    pairs: new SelectIterable(content.pairs, function (pair, index) {
                        return [
                            pair[0],
                            selector(pair[1], index)
                        ];
                    }),
                };
            }
            else {
                return {
                    index: content.index,
                    values: content.values,
                    pairs: content.pairs,
                };
            }
        });
    };
    /**
     * Inflate a named {@link Series} in the dataframe to 1 or more new series in the new dataframe.
     *
     * This is the equivalent of extracting the series using {@link getSeries}, transforming them with {@link Series.select}
     * and then running {@link Series.inflate} to create a new dataframe, then merging each column of the new dataframe
     *  into the original dataframe using {@link withSeries}.
     *
     * @param columnName Name of the series to inflate.
     * @param [selector] Optional selector function that transforms each value in the column to new columns. If not specified it is expected that each value in the column is an object whose fields define the new column names.
     *
     * @return Returns a new dataframe with a column inflated to 1 or more new columns.
     *
     * @example
     * <pre>
     *
     * function newColumnGenerator (row) {
     *      const newColumns = {
     *          // ... create 1 field per new column ...
     *      };
     *
     *      return row;
     * }
     *
     * const dfWithNewSeries = df.inflateSeries("SomeColumn", newColumnGenerator);
     * </pre>
     */
    DataFrame.prototype.inflateSeries = function (columnName, selector) {
        if (!isString(columnName))
            throw new Error("Expected 'columnName' parameter to 'DataFrame.inflateSeries' to be a string that is the name of the column to inflate.");
        if (selector) {
            if (!isFunction(selector))
                throw new Error("Expected optional 'selector' parameter to 'DataFrame.inflateSeries' to be a selector function, if it is specified.");
        }
        return this.zip(this.getSeries(columnName).inflate(selector), function (row1, row2) { return Object.assign({}, row1, row2); } //todo: this be should zip's default operation.
        );
    };
    /**
     * Partition a dataframe into a {@link Series} of *data windows*.
     * Each value in the new series is a rolling chunk of data from the original dataframe.
     *
     * @param period The number of data rows to include in each data window.
     *
     * @return Returns a new series, each value of which is a chunk of the original dataframe.
     *
     * @example
     * <pre>
     *
     * const windows = df.window(2); // Get values in pairs.
     * const pctIncrease = windows.select(pair => (pair.last() - pair.first()) / pair.first());
     * console.log(pctIncrease.toString());
     * </pre>
     *
     * @example
     * <pre>
     *
     * const salesDf = ... // Daily sales data.
     * const weeklySales = salesDf.window(7); // Partition up into weekly data sets.
     * console.log(weeklySales.toString());
     * </pre>
     */
    DataFrame.prototype.window = function (period) {
        var _this = this;
        if (!isNumber(period))
            throw new Error("Expected 'period' parameter to 'DataFrame.window' to be a number.");
        return new Series(function () {
            var content = _this.getContent();
            return {
                values: new DataFrameWindowIterable(content.columnNames, content.pairs, period)
            };
        });
    };
    /**
     * Partition a dataframe into a {@link Series} of *rolling data windows*.
     * Each value in the new series is a rolling chunk of data from the original dataframe.
     *
     * @param period The number of data rows to include in each data window.
     *
     * @return Returns a new series, each value of which is a rolling chunk of the original dataframe.
     *
     * @example
     * <pre>
     *
     * const salesDf = ... // Daily sales data.
     * const rollingWeeklySales = salesDf.rollingWindow(7); // Get rolling window over weekly sales data.
     * console.log(rollingWeeklySales.toString());
     * </pre>
     */
    DataFrame.prototype.rollingWindow = function (period) {
        var _this = this;
        if (!isNumber(period))
            throw new Error("Expected 'period' parameter to 'DataFrame.rollingWindow' to be a number.");
        return new Series(function () {
            var content = _this.getContent();
            return {
                values: new DataFrameRollingWindowIterable(content.columnNames, content.pairs, period)
            };
        });
    };
    /**
     * Partition a dataframe into a {@link Series} of variable-length *data windows*
     * where the divisions between the data chunks are
     * defined by a user-provided *comparer* function.
     *
     * @param comparer Function that compares two adjacent data rows and returns true if they should be in the same window.
     *
     * @return Returns a new series, each value of which is a chunk of data from the original dataframe.
     *
     * @example
     * <pre>
     *
     * function rowComparer (rowA, rowB) {
     *      if (... rowA should be in the same data window as rowB ...) {
     *          return true;
     *      }
     *      else {
     *          return false;
     *      }
     * };
     *
     * const variableWindows = df.variableWindow(rowComparer);
     */
    DataFrame.prototype.variableWindow = function (comparer) {
        var _this = this;
        if (!isFunction(comparer))
            throw new Error("Expected 'comparer' parameter to 'DataFrame.variableWindow' to be a function.");
        return new Series(function () {
            var content = _this.getContent();
            return {
                values: new DataFrameVariableWindowIterable(content.columnNames, content.pairs, comparer)
            };
        });
    };
    /**
     * Eliminates adjacent duplicate rows.
     *
     * For each group of adjacent rows that are equivalent only returns the last index/row for the group,
     * thus ajacent equivalent rows are collapsed down to the last row.
     *
     * @param [selector] Optional selector function to determine the value used to compare for equivalence.
     *
     * @return Returns a new dataframe with groups of adjacent duplicate rows collapsed to a single row per group.
     *
     * @example
     * <pre>
     *
     * const dfWithDuplicateRowsRemoved = df.sequentialDistinct(row => row.ColumnA);
     * </pre>
     */
    DataFrame.prototype.sequentialDistinct = function (selector) {
        if (selector) {
            if (!isFunction(selector))
                throw new Error("Expected 'selector' parameter to 'DataFrame.sequentialDistinct' to be a selector function that determines the value to compare for duplicates.");
        }
        else {
            selector = function (value) { return value; };
        }
        return this.variableWindow(function (a, b) { return selector(a) === selector(b); })
            .select(function (window) {
            return [window.getIndex().first(), window.first()];
        })
            .withIndex(function (pair) { return pair[0]; })
            .inflate(function (pair) { return pair[1]; }); //TODO: Should this be select?
    };
    /**
     * Aggregate the rows in the dataframe to a single result.
     *
     * @param [seed] Optional seed value for producing the aggregation.
     * @param selector Function that takes the seed and then each row in the dataframe and produces the aggregated value.
     *
     * @return Returns a new value that has been aggregated from the dataframe using the 'selector' function.
     *
     * @example
     * <pre>
     *
     * const dailySalesDf = ... daily sales figures for the past month ...
     * const totalSalesForthisMonth = dailySalesDf.aggregate(
     *      0, // Seed - the starting value.
     *      (accumulator, row) => accumulator + row.SalesAmount // Aggregation function.
     * );
     * </pre>
     *
     * @example
     * <pre>
     *
     * const totalSalesAllTime = 500; // We'll seed the aggregation with this value.
     * const dailySalesDf = ... daily sales figures for the past month ...
     * const updatedTotalSalesAllTime = dailySalesDf.aggregate(
     *      totalSalesAllTime,
     *      (accumulator, row) => accumulator + row.SalesAmount
     * );
     * </pre>
     *
     * @example
     * <pre>
     *
     * var salesDataSummary = salesDataDf.aggregate({
     *      TotalSales: df => df.count(),
     *      AveragePrice: df => df.deflate(row => row.Price).average(),
     *      TotalRevenue: df => df.deflate(row => row.Revenue).sum(),
     * });
     * </pre>
    */
    DataFrame.prototype.aggregate = function (seedOrSelector, selector) {
        var _this = this;
        if (isFunction(seedOrSelector) && !selector) {
            return this.skip(1).aggregate(this.first(), seedOrSelector);
        }
        else if (selector) {
            if (!isFunction(selector))
                throw new Error("Expected 'selector' parameter to aggregate to be a function.");
            var accum = seedOrSelector;
            try {
                for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var value = _b.value;
                    accum = selector(accum, value);
                }
            }
            catch (e_33_1) { e_33 = { error: e_33_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_33) throw e_33.error; }
            }
            return accum;
        }
        else {
            //
            //TODO:
            // This approach is fairly limited because I can't provide a seed.
            // Consider removing this and replacing it with a 'summarize' function.
            //
            if (!isObject(seedOrSelector))
                throw new Error("Expected 'seed' parameter to aggregate to be an object.");
            var columnAggregateSpec_1 = seedOrSelector;
            var columnNames = Object.keys(columnAggregateSpec_1);
            var aggregatedColumns = columnNames.map(function (columnName) {
                var columnSelector = columnAggregateSpec_1[columnName];
                if (!isFunction(columnSelector))
                    throw new Error("Expected column/selector pairs in 'seed' parameter to aggregate.");
                return [columnName, _this.getSeries(columnName).aggregate(columnSelector)];
            });
            return toMap(aggregatedColumns, function (pair) { return pair[0]; }, function (pair) { return pair[1]; });
        }
        var e_33, _c;
    };
    /**
     * Skip a number of rows in the dataframe.
     *
     * @param numValues Number of rows to skip.
     *
     * @return Returns a new dataframe with the specified number of rows skipped.
     *
     * @example
     * <pre>
     *
     * const dfWithRowsSkipped = df.skip(10); // Skip 10 rows in the original dataframe.
     * </pre>
     */
    DataFrame.prototype.skip = function (numValues) {
        var _this = this;
        if (!isNumber(numValues))
            throw new Error("Expected 'numValues' parameter to 'DataFrame.skip' to be a number.");
        return new DataFrame(function () {
            var content = _this.getContent();
            return {
                columnNames: content.columnNames,
                values: new SkipIterable(content.values, numValues),
                index: new SkipIterable(content.index, numValues),
                pairs: new SkipIterable(content.pairs, numValues),
            };
        });
    };
    /**
     * Skips rows in the dataframe while a condition evaluates to true or truthy.
     *
     * @param predicate Returns true/truthy to continue to skip rows in the original dataframe.
     *
     * @return Returns a new dataframe with all initial sequential rows removed while the predicate returned true/truthy.
     *
     * @example
     * <pre>
     *
     * const dfWithRowsSkipped = df.skipWhile(row => row.CustomerName === "Fred"); // Skip initial customers named Fred.
     * </pre>
     */
    DataFrame.prototype.skipWhile = function (predicate) {
        var _this = this;
        if (!isFunction(predicate))
            throw new Error("Expected 'predicate' parameter to 'DataFrame.skipWhile' function to be a predicate function that returns true/false.");
        return new DataFrame(function () {
            var content = _this.getContent();
            return {
                columnNames: content.columnNames,
                values: new SkipWhileIterable(content.values, predicate),
                pairs: new SkipWhileIterable(content.pairs, function (pair) { return predicate(pair[1]); }),
            };
        });
    };
    /**
     * Skips rows in the dataframe untils a condition evaluates to true or truthy.
     *
     * @param predicate Return true/truthy to stop skipping rows in the original dataframe.
     *
     * @return Returns a new dataframe with all initial sequential rows removed until the predicate returned true/truthy.
     *
     * @example
     * <pre>
     *
     * const dfWithRowsSkipped = df.skipUntil(row => row.CustomerName === "Fred"); // Skip initial customers until we find Fred.
     * </pre>
     */
    DataFrame.prototype.skipUntil = function (predicate) {
        if (!isFunction(predicate))
            throw new Error("Expected 'predicate' parameter to 'DataFrame.skipUntil' function to be a predicate function that returns true/false.");
        return this.skipWhile(function (value) { return !predicate(value); });
    };
    /**
     * Take a number of rows from the dataframe.
     *
     * @param numValues Number of rows to take.
     *
     * @return Returns a new dataframe with only the specified number of rows taken from the original dataframe.
     *
     * @example
     * <pre>
     *
     * const dfWithRowsTaken = df.take(15); // Take only the first 15 rows from the original dataframe.
     * </pre>
     */
    DataFrame.prototype.take = function (numRows) {
        var _this = this;
        if (!isNumber(numRows))
            throw new Error("Expected 'numRows' parameter to 'DataFrame.take' function to be a number.");
        return new DataFrame(function () {
            var content = _this.getContent();
            return {
                columnNames: content.columnNames,
                index: new TakeIterable(content.index, numRows),
                values: new TakeIterable(content.values, numRows),
                pairs: new TakeIterable(content.pairs, numRows)
            };
        });
    };
    /**
     * Takes rows from the dataframe while a condition evaluates to true or truthy.
     *
     * @param predicate Returns true/truthy to continue to take rows from the original dataframe.
     *
     * @return Returns a new dataframe with only the initial sequential rows that were taken while the predicate returned true/truthy.
     *
     * @example
     * <pre>
     *
     * const dfWithRowsTaken = df.takeWhile(row => row.CustomerName === "Fred"); // Take only initial customers named Fred.
     * </pre>
     */
    DataFrame.prototype.takeWhile = function (predicate) {
        var _this = this;
        if (!isFunction(predicate))
            throw new Error("Expected 'predicate' parameter to 'DataFrame.takeWhile' function to be a predicate function that returns true/false.");
        return new DataFrame(function () {
            var content = _this.getContent();
            return {
                columnNames: content.columnNames,
                values: new TakeWhileIterable(content.values, predicate),
                pairs: new TakeWhileIterable(content.pairs, function (pair) { return predicate(pair[1]); })
            };
        });
    };
    /**
     * Takes rows from the dataframe untils a condition evaluates to true or truthy.
     *
     * @param predicate Return true/truthy to stop taking rows in the original dataframe.
     *
     * @return Returns a new dataframe with only the initial sequential rows taken until the predicate returned true/truthy.
     *
     * @example
     * <pre>
     *
     * const dfWithRowsTaken = df.takeUntil(row => row.CustomerName === "Fred"); // Take all initial customers until we find Fred.
     * </pre>
     */
    DataFrame.prototype.takeUntil = function (predicate) {
        if (!isFunction(predicate))
            throw new Error("Expected 'predicate' parameter to 'DataFrame.takeUntil' function to be a predicate function that returns true/false.");
        return this.takeWhile(function (value) { return !predicate(value); });
    };
    /**
     * Count the number of rows in the dataframe
     *
     * @return Returns the count of all rows.
     *
     * @example
     * <pre>
     *
     * const numRows = df.count();
     * </pre>
     */
    DataFrame.prototype.count = function () {
        var total = 0;
        try {
            for (var _a = __values(this.getContent().values), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                ++total;
            }
        }
        catch (e_34_1) { e_34 = { error: e_34_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_34) throw e_34.error; }
        }
        return total;
        var e_34, _c;
    };
    /**
     * Get the first row of the dataframe.
     *
     * @return Returns the first row of the dataframe.
     *
     * @example
     * <pre>
     *
     * const firstRow = df.first();
     * </pre>
     */
    DataFrame.prototype.first = function () {
        try {
            for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                return value; // Only need the first value.
            }
        }
        catch (e_35_1) { e_35 = { error: e_35_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_35) throw e_35.error; }
        }
        throw new Error("DataFrame.first: No values in DataFrame.");
        var e_35, _c;
    };
    /**
     * Get the last row of the dataframe.
     *
     * @return Returns the last row of the dataframe.
     *
     * @example
     * <pre>
     *
     * const lastRow = df.last();
     * </pre>
     */
    DataFrame.prototype.last = function () {
        var lastValue = null;
        try {
            for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                lastValue = value; // Throw away all values until we get to the last one.
            }
        }
        catch (e_36_1) { e_36 = { error: e_36_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_36) throw e_36.error; }
        }
        if (lastValue === null) {
            throw new Error("DataFrame.last: No values in DataFrame.");
        }
        return lastValue;
        var e_36, _c;
    };
    /**
     * Get the row, if there is one, with the specified index.
     *
     * @param index Index to for which to retreive the row.
     *
     * @return Returns the row from the specified index in the dataframe or undefined if there is no such index in the present in the dataframe.
     *
     * @example
     * <pre>
     *
     * const row = df.at(5); // Get the row at index 5 (with a default 0-based index).
     * </pre>
     *
     * @example
     * <pre>
     *
     * const date = ... some date ...
     * // Retreive the row with specified date from a time-series dataframe (assuming date indexed has been applied).
     * const row = df.at(date);
     * </pre>
     */
    DataFrame.prototype.at = function (index) {
        if (this.none()) {
            return undefined;
        }
        try {
            //
            // This is pretty expensive.
            // A specialised index could improve this.
            //
            for (var _a = __values(this.getContent().pairs), _b = _a.next(); !_b.done; _b = _a.next()) {
                var pair = _b.value;
                if (pair[0] === index) {
                    return pair[1];
                }
            }
        }
        catch (e_37_1) { e_37 = { error: e_37_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_37) throw e_37.error; }
        }
        return undefined;
        var e_37, _c;
    };
    /**
     * Get X rows from the start of the dataframe.
     * Pass in a negative value to get all rows at the head except for X rows at the tail.
     *
     * @param numValues Number of rows to take.
     *
     * @return Returns a new dataframe that has only the specified number of rows taken from the start of the original dataframe.
     *
     * @examples
     * <pre>
     *
     * const sample = df.head(10); // Take a sample of 10 rows from the start of the dataframe.
     * </pre>
     */
    DataFrame.prototype.head = function (numValues) {
        if (!isNumber(numValues))
            throw new Error("Expected 'numValues' parameter to 'DataFrame.head' function to be a number.");
        if (numValues === 0) {
            return new DataFrame(); // Empty dataframe.
        }
        var toTake = numValues < 0 ? this.count() - Math.abs(numValues) : numValues;
        return this.take(toTake);
    };
    /**
     * Get X rows from the end of the dataframe.
     * Pass in a negative value to get all rows at the tail except X rows at the head.
     *
     * @param numValues Number of rows to take.
     *
     * @return Returns a new dataframe that has only the specified number of rows taken from the end of the original dataframe.
     *
     * @examples
     * <pre>
     *
     * const sample = df.tail(12); // Take a sample of 12 rows from the end of the dataframe.
     * </pre>
     */
    DataFrame.prototype.tail = function (numValues) {
        if (!isNumber(numValues))
            throw new Error("Expected 'numValues' parameter to 'DataFrame.tail' function to be a number.");
        if (numValues === 0) {
            return new DataFrame(); // Empty dataframe.
        }
        var toSkip = numValues > 0 ? this.count() - numValues : Math.abs(numValues);
        return this.skip(toSkip);
    };
    /**
     * Filter the dataframe using user-defined predicate function.
     *
     * @param predicate Predicte function to filter rows from the dataframe. Returns true/truthy to keep rows, or false/falsy to omit rows.
     *
     * @return Returns a new dataframe containing only the rows from the original dataframe that matched the predicate.
     *
     * @example
     * <pre>
     *
     * const filteredDf = df.where(row => row.CustomerName === "Fred"); // Filter so we only have customers named Fred.
     * </pre>
     */
    DataFrame.prototype.where = function (predicate) {
        var _this = this;
        if (!isFunction(predicate))
            throw new Error("Expected 'predicate' parameter to 'DataFrame.where' function to be a function.");
        return new DataFrame(function () {
            var content = _this.getContent();
            return {
                columnNames: content.columnNames,
                values: new WhereIterable(content.values, predicate),
                pairs: new WhereIterable(content.pairs, function (pair) { return predicate(pair[1]); })
            };
        });
    };
    /**
     * Invoke a callback function for each row in the dataframe.
     *
     * @param callback The calback function to invoke for each row.
     *
     * @return Returns the original dataframe with no modifications.
     *
     * @example
     * <pre>
     *
     * df.forEach(row => {
     *      // ... do something with the row ...
     * });
     * </pre>
     */
    DataFrame.prototype.forEach = function (callback) {
        if (!isFunction(callback))
            throw new Error("Expected 'callback' parameter to 'DataFrame.forEach' to be a function.");
        var index = 0;
        try {
            for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                callback(value, index++);
            }
        }
        catch (e_38_1) { e_38 = { error: e_38_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_38) throw e_38.error; }
        }
        return this;
        var e_38, _c;
    };
    /**
     * Evaluates a predicate function for every row in the dataframe to determine
     * if some condition is true/truthy for **all** rows in the dataframe.
     *
     * @param predicate Predicate function that receives each row. It should returns true/truthy for a match, otherwise false/falsy.
     *
     * @return Returns true if the predicate has returned true or truthy for every row in the dataframe, otherwise returns false. Returns false for an empty dataframe.
     *
     * @example
     * <pre>
     *
     * const everyoneIsNamedFred = df.all(row => row.CustomerName === "Fred"); // Check if all customers are named Fred.
     * </pre>
     */
    DataFrame.prototype.all = function (predicate) {
        if (!isFunction(predicate))
            throw new Error("Expected 'predicate' parameter to 'DataFrame.all' to be a function.");
        var count = 0;
        try {
            for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                if (!predicate(value)) {
                    return false;
                }
                ++count;
            }
        }
        catch (e_39_1) { e_39 = { error: e_39_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_39) throw e_39.error; }
        }
        return count > 0;
        var e_39, _c;
    };
    /**
     * Evaluates a predicate function for every row in the dataframe to determine
     * if some condition is true/truthy for **any** of rows in the dataframe.
     *
     * If no predicate is specified then it simply checks if the dataframe contains more than zero rows.
     *
     * @param [predicate] Optional predicate function that receives each row. It should return true/truthy for a match, otherwise false/falsy.
     *
     * @return Returns true if the predicate has returned truthy for any row in the dataframe, otherwise returns false.
     * If no predicate is passed it returns true if the dataframe contains any rows at all.
     * Returns false for an empty dataframe.
     *
     * @example
     * <pre>
     *
     * const anyFreds = df.any(row => row.CustomerName === "Fred"); // Do we have any customers named Fred?
     * </pre>
     *
     * @example
     * <pre>
     *
     * const anyCustomers = df.any(); // Do we have any customers at all?
     * </pre>
     */
    DataFrame.prototype.any = function (predicate) {
        if (predicate) {
            if (!isFunction(predicate))
                throw new Error("Expected optional 'predicate' parameter to 'DataFrame.any' to be a function.");
        }
        if (predicate) {
            try {
                // Use the predicate to check each value.
                for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var value = _b.value;
                    if (predicate(value)) {
                        return true;
                    }
                }
            }
            catch (e_40_1) { e_40 = { error: e_40_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_40) throw e_40.error; }
            }
        }
        else {
            // Just check if there is at least one item.
            var iterator = this[Symbol.iterator]();
            return !iterator.next().done;
        }
        return false; // Nothing passed.
        var e_40, _c;
    };
    /**
     * Evaluates a predicate function for every row in the dataframe to determine
     * if some condition is true/truthy for **none** of rows in the dataframe.
     *
     * If no predicate is specified then it simply checks if the dataframe contains zero rows.
     *
     * @param [predicate] Optional predicate function that receives each row. It should return true/truthy for a match, otherwise false/falsy.
     *
     * @return Returns true if the predicate has returned truthy for zero rows in the dataframe, otherwise returns false. Returns false for an empty dataframe.
     *
     * @example
     * <pre>
     *
     * const noFreds = df.none(row => row.CustomerName === "Fred"); // Do we have zero customers named Fred?
     * </pre>
     *
     * @example
     * <pre>
     *
     * const noCustomers = df.none(); // Do we have zero customers?
     * </pre>
     */
    DataFrame.prototype.none = function (predicate) {
        if (predicate) {
            if (!isFunction(predicate))
                throw new Error("Expected 'predicate' parameter to 'DataFrame.none' to be a function.");
        }
        if (predicate) {
            try {
                // Use the predicate to check each value.
                for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var value = _b.value;
                    if (predicate(value)) {
                        return false;
                    }
                }
            }
            catch (e_41_1) { e_41 = { error: e_41_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_41) throw e_41.error; }
            }
        }
        else {
            // Just check if empty.
            var iterator = this[Symbol.iterator]();
            return iterator.next().done;
        }
        return true; // Nothing failed the predicate.
        var e_41, _c;
    };
    //TODO: Improve this example (and subsequent examples, they look like series setup rather than dataframe)..
    /**
     * Gets a new dataframe containing all rows starting at or after the specified index value.
     *
     * @param indexValue The index value at which to start the new dataframe.
     *
     * @return Returns a new dataframe containing all rows starting at or after the specified index value.
     *
     * @example
     * <pre>
     *
     * const df = new DataFrame({
     *      index: [0, 1, 2, 3], // This is the default index.
     *      values: [10, 20, 30, 40],
     * });
     *
     * const lastHalf = df.startAt(2);
     * expect(lastHalf.toArray()).to.eql([30, 40]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const timeSeriesDf = ... a dataframe indexed by date/time ...
     *
     * // Get all rows starting at (or after) a particular date.
     * const result = timeSeriesDf.startAt(new Date(2016, 5, 4));
     * </pre>
     */
    DataFrame.prototype.startAt = function (indexValue) {
        var _this = this;
        return new DataFrame(function () {
            var content = _this.getContent();
            var lessThan = _this.getIndex().getLessThan();
            return {
                columnNames: content.columnNames,
                index: new SkipWhileIterable(content.index, function (index) { return lessThan(index, indexValue); }),
                pairs: new SkipWhileIterable(content.pairs, function (pair) { return lessThan(pair[0], indexValue); }),
            };
        });
    };
    /**
     * Gets a new dataframe containing all rows up until and including the specified index value (inclusive).
     *
     * @param indexValue The index value at which to end the new dataframe.
     *
     * @return Returns a new dataframe containing all rows up until and including the specified index value.
     *
     * @example
     * <pre>
     *
     * const df = new DataFrame({
     *      index: [0, 1, 2, 3], // This is the default index.
     *      values: [10, 20, 30, 40],
     * });
     *
     * const firstHalf = df.endAt(1);
     * expect(firstHalf.toArray()).to.eql([10, 20]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const timeSeriesDf = ... a dataframe indexed by date/time ...
     *
     * // Get all rows ending at a particular date.
     * const result = timeSeriesDf.endAt(new Date(2016, 5, 4));
     * </pre>
     */
    DataFrame.prototype.endAt = function (indexValue) {
        var _this = this;
        return new DataFrame(function () {
            var content = _this.getContent();
            var lessThanOrEqualTo = _this.getIndex().getLessThanOrEqualTo();
            return {
                columnNames: content.columnNames,
                index: new TakeWhileIterable(content.index, function (index) { return lessThanOrEqualTo(index, indexValue); }),
                pairs: new TakeWhileIterable(content.pairs, function (pair) { return lessThanOrEqualTo(pair[0], indexValue); }),
            };
        });
    };
    /**
     * Gets a new dataframe containing all rows up to the specified index value (exclusive).
     *
     * @param indexValue The index value at which to end the new dataframe.
     *
     * @return Returns a new dataframe containing all rows up to (but not including) the specified index value.
     *
     * @example
     * <pre>
     *
     * const df = new DataFrame({
     *      index: [0, 1, 2, 3], // This is the default index.
     *      values: [10, 20, 30, 40],
     * });
     *
     * const firstHalf = df.before(2);
     * expect(firstHalf.toArray()).to.eql([10, 20]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const timeSeriesDf = ... a dataframe indexed by date/time ...
     *
     * // Get all rows before the specified date.
     * const result = timeSeriesDf.before(new Date(2016, 5, 4));
     * </pre>
     */
    DataFrame.prototype.before = function (indexValue) {
        var _this = this;
        return new DataFrame(function () {
            var content = _this.getContent();
            var lessThan = _this.getIndex().getLessThan();
            return {
                columnNames: content.columnNames,
                index: new TakeWhileIterable(content.index, function (index) { return lessThan(index, indexValue); }),
                pairs: new TakeWhileIterable(content.pairs, function (pair) { return lessThan(pair[0], indexValue); }),
            };
        });
    };
    /**
     * Gets a new dataframe containing all rows after the specified index value (exclusive).
     *
     * @param indexValue The index value after which to start the new dataframe.
     *
     * @return Returns a new dataframe containing all rows after the specified index value.
     *
     * @example
     * <pre>
     *
     * const df = new DataFrame({
     *      index: [0, 1, 2, 3], // This is the default index.
     *      values: [10, 20, 30, 40],
     * });
     *
     * const lastHalf = df.before(1);
     * expect(lastHalf.toArray()).to.eql([30, 40]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const timeSeriesDf = ... a dataframe indexed by date/time ...
     *
     * // Get all rows after the specified date.
     * const result = timeSeriesDf.after(new Date(2016, 5, 4));
     * </pre>
     */
    DataFrame.prototype.after = function (indexValue) {
        var _this = this;
        return new DataFrame(function () {
            var content = _this.getContent();
            var lessThanOrEqualTo = _this.getIndex().getLessThanOrEqualTo();
            return {
                columnNames: content.columnNames,
                index: new SkipWhileIterable(content.index, function (index) { return lessThanOrEqualTo(index, indexValue); }),
                pairs: new SkipWhileIterable(content.pairs, function (pair) { return lessThanOrEqualTo(pair[0], indexValue); }),
            };
        });
    };
    /**
     * Gets a new dataframe containing all rows between the specified index values (inclusive).
     *
     * @param startIndexValue The index at which to start the new dataframe.
     * @param endIndexValue The index at which to end the new dataframe.
     *
     * @return Returns a new dataframe containing all values between the specified index values (inclusive).
     *
     * @example
     * <pre>
     *
     * const df = new DataFrame({
     *      index: [0, 1, 2, 3, 4, 6], // This is the default index.
     *      values: [10, 20, 30, 40, 50, 60],
     * });
     *
     * const middleSection = df.between(1, 4);
     * expect(middleSection.toArray()).to.eql([20, 30, 40, 50]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const timeSeriesDf = ... a dataframe indexed by date/time ...
     *
     * // Get all rows between the start and end dates (inclusive).
     * const result = timeSeriesDf.after(new Date(2016, 5, 4), new Date(2016, 5, 22));
     * </pre>
     */
    DataFrame.prototype.between = function (startIndexValue, endIndexValue) {
        return this.startAt(startIndexValue).endAt(endIndexValue);
    };
    /**
     * Format the dataframe for display as a string.
     * This forces lazy evaluation to complete.
     *
     * @return Generates and returns a string representation of the dataframe.
     *
     * @example
     * <pre>
     *
     * console.log(df.toString());
     * </pre>
     */
    DataFrame.prototype.toString = function () {
        var columnNames = this.getColumnNames();
        var header = ["__index__"].concat(columnNames);
        var table = new Table();
        try {
            //TODO: for (const pair of this.asPairs()) {
            for (var _a = __values(this.toPairs()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var pair = _b.value;
                var index = pair[0];
                var value = pair[1];
                table.cell(header[0], index);
                for (var columnIndex = 0; columnIndex < columnNames.length; ++columnIndex) {
                    var columnName = columnNames[columnIndex];
                    table.cell(header[columnIndex + 1], value[columnName]);
                }
                table.newRow();
            }
        }
        catch (e_42_1) { e_42 = { error: e_42_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_42) throw e_42.error; }
        }
        return table.toString();
        var e_42, _c;
    };
    /**
     * Parse a column with string values and convert it to a column with int values.
     *
     * @param columnNameOrNames Specifies the column name or array of column names to parse.
     *
     * @return Returns a new dataframe with values of particular named column(s) parsed from strings to ints.
     *
     * @example
     * <pre>
     *
     * const parsed = df.parseInts("MyIntColumn");
     * </pre>
     *
     * @example
     * <pre>
     *
     * const parsed = df.parseInts(["MyIntColumnA", "MyIntColumnA"]);
     * </pre>
     */
    DataFrame.prototype.parseInts = function (columnNameOrNames) {
        if (isArray(columnNameOrNames)) {
            var working = this;
            try {
                for (var columnNameOrNames_1 = __values(columnNameOrNames), columnNameOrNames_1_1 = columnNameOrNames_1.next(); !columnNameOrNames_1_1.done; columnNameOrNames_1_1 = columnNameOrNames_1.next()) {
                    var columnName = columnNameOrNames_1_1.value;
                    working = working.parseInts(columnName);
                }
            }
            catch (e_43_1) { e_43 = { error: e_43_1 }; }
            finally {
                try {
                    if (columnNameOrNames_1_1 && !columnNameOrNames_1_1.done && (_a = columnNameOrNames_1.return)) _a.call(columnNameOrNames_1);
                }
                finally { if (e_43) throw e_43.error; }
            }
            return working;
        }
        else {
            return this.withSeries(columnNameOrNames, this.getSeries(columnNameOrNames).parseInts());
        }
        var e_43, _a;
    };
    /**
     * Parse a column with string values and convert it to a column with float values.
     *
     * @param columnNameOrNames Specifies the column name or array of column names to parse.
     *
     * @return Returns a new dataframe with values of particular named column(s) parsed from strings to floats.
     *
     * @example
     * <pre>
     *
     * const parsed = df.parseFloats("MyFloatColumn");
     * </pre>
     *
     * @example
     * <pre>
     *
     * const parsed = df.parseFloats(["MyFloatColumnA", "MyFloatColumnA"]);
     * </pre>
     */
    DataFrame.prototype.parseFloats = function (columnNameOrNames) {
        if (isArray(columnNameOrNames)) {
            var working = this;
            try {
                for (var columnNameOrNames_2 = __values(columnNameOrNames), columnNameOrNames_2_1 = columnNameOrNames_2.next(); !columnNameOrNames_2_1.done; columnNameOrNames_2_1 = columnNameOrNames_2.next()) {
                    var columnName = columnNameOrNames_2_1.value;
                    working = working.parseFloats(columnName);
                }
            }
            catch (e_44_1) { e_44 = { error: e_44_1 }; }
            finally {
                try {
                    if (columnNameOrNames_2_1 && !columnNameOrNames_2_1.done && (_a = columnNameOrNames_2.return)) _a.call(columnNameOrNames_2);
                }
                finally { if (e_44) throw e_44.error; }
            }
            return working;
        }
        else {
            return this.withSeries(columnNameOrNames, this.getSeries(columnNameOrNames).parseFloats());
        }
        var e_44, _a;
    };
    /**
     * Parse a column with string values and convert it to a column with date values.
     *
     * @param columnNameOrNames Specifies the column name or array of column names to parse.
     * @param [formatString] Optional formatting string for dates.
     *
     * Moment is used for date parsing.
     * https://momentjs.com
     *
     * @return Returns a new dataframe with values of particular named column(s) parsed from strings to dates.
     *
     * @example
     * <pre>
     *
     * const parsed = df.parseDates("MyDateColumn");
     * </pre>
     *
     * @example
     * <pre>
     *
     * const parsed = df.parseDates(["MyDateColumnA", "MyDateColumnA"]);
     * </pre>
     */
    DataFrame.prototype.parseDates = function (columnNameOrNames, formatString) {
        if (formatString) {
            if (!isString(formatString))
                throw new Error("Expected optional 'formatString' parameter to 'DataFrame.parseDates' to be a string (if specified).");
        }
        if (isArray(columnNameOrNames)) {
            var working = this;
            try {
                for (var columnNameOrNames_3 = __values(columnNameOrNames), columnNameOrNames_3_1 = columnNameOrNames_3.next(); !columnNameOrNames_3_1.done; columnNameOrNames_3_1 = columnNameOrNames_3.next()) {
                    var columnName = columnNameOrNames_3_1.value;
                    working = working.parseDates(columnName, formatString);
                }
            }
            catch (e_45_1) { e_45 = { error: e_45_1 }; }
            finally {
                try {
                    if (columnNameOrNames_3_1 && !columnNameOrNames_3_1.done && (_a = columnNameOrNames_3.return)) _a.call(columnNameOrNames_3);
                }
                finally { if (e_45) throw e_45.error; }
            }
            return working;
        }
        else {
            return this.withSeries(columnNameOrNames, this.getSeries(columnNameOrNames).parseDates(formatString));
        }
        var e_45, _a;
    };
    /**
     * Convert a column of values of different types to a column of string values.
     *
     * @param columnNames Specifies the column name or array of column names to convert to strings. Can also be a format spec that specifies which columns to convert and what their format should be.
     * @param [formatString] Optional formatting string for dates.
     *
     * Numeral.js is used for number formatting.
     * http://numeraljs.com/
     *
     * Moment is used for date formatting.
     * https://momentjs.com/docs/#/parsing/string-format/
     *
     * @return Returns a new dataframe with a particular named column converted from values to strings.
     *
     * @example
     * <pre>
     *
     * const result = df.toStrings("MyDateColumn", "YYYY-MM-DD");
     * </pre>
     *
     * @example
     * <pre>
     *
     * const result = df.toStrings("MyFloatColumn", "0.00");
     * </pre>
     */
    DataFrame.prototype.toStrings = function (columnNames, formatString) {
        if (isObject(columnNames)) {
            try {
                for (var _a = __values(Object.keys(columnNames)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var columnName = _b.value;
                    if (!isString(columnNames[columnName]))
                        throw new Error("Expected values of 'columnNames' parameter to be strings when a format spec is passed in.");
                }
            }
            catch (e_46_1) { e_46 = { error: e_46_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_46) throw e_46.error; }
            }
            if (!isUndefined(formatString))
                throw new Error("Optional 'formatString' parameter to 'DataFrame.toStrings' should not be set when passing in a format spec.");
        }
        else {
            if (!isArray(columnNames)) {
                if (!isString(columnNames))
                    throw new Error("Expected 'columnNames' parameter to 'DataFrame.toStrings' to be a string, array of strings or format spec that specifes which columns should be converted to strings.");
            }
            if (formatString) {
                if (!isString(formatString))
                    throw new Error("Expected optional 'formatString' parameter to 'DataFrame.toStrings' to be a string (if specified).");
            }
        }
        if (isObject(columnNames)) {
            var working = this;
            try {
                for (var _d = __values(Object.keys(columnNames)), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var columnName = _e.value;
                    working = working.toStrings(columnName, formatString);
                }
            }
            catch (e_47_1) { e_47 = { error: e_47_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
                }
                finally { if (e_47) throw e_47.error; }
            }
            return working;
        }
        else if (isArray(columnNames)) {
            var working = this;
            try {
                for (var columnNames_9 = __values(columnNames), columnNames_9_1 = columnNames_9.next(); !columnNames_9_1.done; columnNames_9_1 = columnNames_9.next()) {
                    var columnName = columnNames_9_1.value;
                    var columnFormatString = columnNames[columnName];
                    working = working.toStrings(columnName, columnFormatString);
                }
            }
            catch (e_48_1) { e_48 = { error: e_48_1 }; }
            finally {
                try {
                    if (columnNames_9_1 && !columnNames_9_1.done && (_g = columnNames_9.return)) _g.call(columnNames_9);
                }
                finally { if (e_48) throw e_48.error; }
            }
            return working;
        }
        else {
            var singleColumnName = columnNames;
            return this.withSeries(singleColumnName, this.getSeries(singleColumnName).toStrings(formatString));
        }
        var e_46, _c, e_47, _f, e_48, _g;
    };
    /**
     * Produces a new dataframe with all string values truncated to the requested maximum length.
     *
     * @param maxLength The maximum length of the string values after truncation.
     *
     * @return Returns a new dataframe with all strings truncated to the specified maximum length.
     *
     * @example
     * <pre>
     *
     * // Truncate all string columns to 100 characters maximum.
     * const truncatedDf = df.truncateString(100);
     * </pre>
     */
    DataFrame.prototype.truncateStrings = function (maxLength) {
        if (!isNumber(maxLength))
            throw new Error("Expected 'maxLength' parameter to 'truncateStrings' to be an integer.");
        return this.select(function (row) {
            var output = {};
            try {
                for (var _a = __values(Object.keys(row)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var key = _b.value;
                    var value = row[key];
                    if (isString(value)) {
                        output[key] = value.substring(0, maxLength);
                    }
                    else {
                        output[key] = value;
                    }
                }
            }
            catch (e_49_1) { e_49 = { error: e_49_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_49) throw e_49.error; }
            }
            return output;
            var e_49, _c;
        });
    };
    /**
     * Produces a new dataframe with all number values rounded to the specified number of places.
     *
     * @param [numDecimalPlaces] The number of decimal places, defaults to 2.
     *
     * @returns Returns a new dataframe with all number values rounded to the specified number of places.
     *
     * @example
     * <pre>
     *
     * const df = ... your data frame ...
     * const rounded = df.round(); // Round numbers to two decimal places.
     * </pre>
     *
     * @example
     * <pre>
     *
     * const df = ... your data frame ...
     * const rounded = df.round(3); // Round numbers to three decimal places.
     * </pre>
     */
    DataFrame.prototype.round = function (numDecimalPlaces) {
        if (numDecimalPlaces !== undefined) {
            if (!isNumber(numDecimalPlaces)) {
                throw new Error("Expected 'numDecimalPlaces' parameter to 'DataFrame.round' to be a number.");
            }
        }
        else {
            numDecimalPlaces = 2; // Default to two decimal places.
        }
        return this.select(function (row) {
            var output = {};
            try {
                for (var _a = __values(Object.keys(row)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var key = _b.value;
                    var value = row[key];
                    if (isNumber(value)) {
                        output[key] = parseFloat(value.toFixed(numDecimalPlaces));
                    }
                    else {
                        output[key] = value;
                    }
                }
            }
            catch (e_50_1) { e_50 = { error: e_50_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_50) throw e_50.error; }
            }
            return output;
            var e_50, _c;
        });
    };
    /**
     * Forces lazy evaluation to complete and 'bakes' the dataframe into memory.
     *
     * @return Returns a dataframe that has been 'baked', all lazy evaluation has completed.
     *
     * @example
     * <pre>
     *
     * const baked = df.bake();
     * </pre>
     */
    DataFrame.prototype.bake = function () {
        if (this.getContent().isBaked) {
            // Already baked.
            return this;
        }
        return new DataFrame({
            columnNames: this.getColumnNames(),
            values: this.toArray(),
            pairs: this.toPairs(),
            baked: true,
        });
    };
    /**
     * Gets a new dataframe in reverse order.
     *
     * @return Returns a new dataframe that is the reverse of the input.
     *
     * @example
     * <pre>
     *
     * const reversedDf = df.reverse();
     * </pre>
     */
    DataFrame.prototype.reverse = function () {
        var _this = this;
        return new DataFrame(function () {
            var content = _this.getContent();
            return {
                columnNames: content.columnNames,
                values: new ReverseIterable(content.values),
                index: new ReverseIterable(content.index),
                pairs: new ReverseIterable(content.pairs)
            };
        });
    };
    /**
     * Returns only the set of rows in the dataframe that are distinct according to some criteria.
     * This can be used to remove duplicate rows from the dataframe.
     *
     * @param selector User-defined selector function that specifies the criteria used to make comparisons for duplicate rows.
     *
     * @return Returns a dataframe containing only unique values as determined by the 'selector' function.
     *
     * @example
     * <pre>
     *
     * // Remove duplicate rows by customer id. Will return only a single row per customer.
     * const distinctCustomers = salesDf.distinct(sale => sale.CustomerId);
     * </pre>
     */
    DataFrame.prototype.distinct = function (selector) {
        var _this = this;
        return new DataFrame(function () {
            var content = _this.getContent();
            return {
                columnNames: content.columnNames,
                values: new DistinctIterable(content.values, selector),
                pairs: new DistinctIterable(content.pairs, function (pair) { return selector && selector(pair[1]) || pair[1]; })
            };
        });
    };
    /**
     * Collects rows in the dataframe into a series of groups according to the user-defined selector function that defines the group for each row.
     *
     * @param selector User-defined selector function that defines the value to group by.
     *
     * @return Returns a {@link Series} of groups. Each group is a dataframe with values that have been grouped by the 'selector' function.
     *
     * @example
     * <pre>
     *
     * const salesDf = ... product sales ...
     * const salesByProduct = salesDf.groupBy(sale => sale.ProductId);
     * for (const productSalesGroup of salesByProduct) {
     *      // ... do something with each product group ...
     *      const productId = productSalesGroup.first().ProductId;
     *      const totalSalesForProduct = productSalesGroup.deflate(sale => sale.Amount).sum();
     *      console.log(totalSalesForProduct);
     * }
     * </pre>
     */
    DataFrame.prototype.groupBy = function (selector) {
        var _this = this;
        if (!isFunction(selector))
            throw new Error("Expected 'selector' parameter to 'DataFrame.groupBy' to be a selector function that determines the value to group the series by.");
        return new Series(function () {
            var groups = []; // Each group, in order of discovery.
            var groupMap = {}; // Group map, records groups by key.
            var valueIndex = 0;
            try {
                for (var _a = __values(_this.getContent().pairs), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var pair = _b.value;
                    var groupKey = selector(pair[1], valueIndex);
                    ++valueIndex;
                    var existingGroup = groupMap[groupKey];
                    if (existingGroup) {
                        existingGroup.push(pair);
                    }
                    else {
                        var newGroup = [];
                        newGroup.push(pair);
                        groups.push(newGroup);
                        groupMap[groupKey] = newGroup;
                    }
                }
            }
            catch (e_51_1) { e_51 = { error: e_51_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_51) throw e_51.error; }
            }
            return {
                values: groups.map(function (group) { return new DataFrame({ pairs: group }); })
            };
            var e_51, _c;
        });
    };
    /**
     * Collects rows in the dataframe into a series of groups according to a user-defined selector function that identifies adjacent rows that should be in the same group.
     *
     * @param selector Optional selector that defines the value to group by.
     *
     * @return Returns a {@link Series} of groups. Each group is a dataframe with values that have been grouped by the 'selector' function.
     *
     * @example
     * <pre>
     *
     * // Some ultra simple stock trading strategy backtesting...
     * const dailyStockPriceDf = ... daily stock price for a company ...
     * const priceGroups  = dailyStockPriceDf.groupBy(day => day.close > day.movingAverage);
     * for (const priceGroup of priceGroups) {
     *      // ... do something with each stock price group ...
     *
     *      const firstDay = priceGroup.first();
     *      if (firstDay.close > movingAverage) {
     *          // This group of days has the stock price above its moving average.
     *          // ... maybe enter a long trade here ...
     *      }
     *      else {
     *          // This group of days has the stock price below its moving average.
     *          // ... maybe enter a short trade here ...
     *      }
     * }
     * </pre>
     */
    DataFrame.prototype.groupSequentialBy = function (selector) {
        if (selector) {
            if (!isFunction(selector))
                throw new Error("Expected 'selector' parameter to 'DataFrame.groupSequentialBy' to be a selector function that determines the value to group the series by.");
        }
        else {
            selector = function (value) { return value; };
        }
        return this.variableWindow(function (a, b) { return selector(a) === selector(b); });
    };
    /**
     * Concatenate multiple dataframes into a single dataframe.
     *
     * @param dataframes Array of dataframes to concatenate.
     *
     * @return Returns a single dataframe concatenated from multiple input dataframes.
     *
     * @example
     * <pre>
     *
     * const df1 = ...
     * const df2 = ...
     * const df3 = ...
     * const concatenatedDf = DataFrame.concat([df1, df2, df3]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const dfs = [... array of dataframes...];
     * const concatenatedDf = DataFrame.concat(dfs);
     * </pre>
     */
    DataFrame.concat = function (dataframes) {
        if (!isArray(dataframes))
            throw new Error("Expected 'dataframes' parameter to 'DataFrame.concat' to be an array of dataframes.");
        return new DataFrame(function () {
            var upcast = dataframes; // Upcast so that we can access private index, values and pairs.
            var contents = upcast.map(function (dataframe) { return dataframe.getContent(); });
            var columnNames = [];
            try {
                for (var contents_1 = __values(contents), contents_1_1 = contents_1.next(); !contents_1_1.done; contents_1_1 = contents_1.next()) {
                    var content = contents_1_1.value;
                    try {
                        for (var _a = __values(content.columnNames), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var columnName = _b.value;
                            columnNames.push(columnName);
                        }
                    }
                    catch (e_52_1) { e_52 = { error: e_52_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_52) throw e_52.error; }
                    }
                }
            }
            catch (e_53_1) { e_53 = { error: e_53_1 }; }
            finally {
                try {
                    if (contents_1_1 && !contents_1_1.done && (_d = contents_1.return)) _d.call(contents_1);
                }
                finally { if (e_53) throw e_53.error; }
            }
            columnNames = makeDistinct(columnNames);
            return {
                columnNames: columnNames,
                values: new ConcatIterable(contents.map(function (content) { return content.values; })),
                pairs: new ConcatIterable(contents.map(function (content) { return content.pairs; })),
            };
            var e_53, _d, e_52, _c;
        });
    };
    /**
     * Concatenate multiple other dataframes onto this dataframe.
     *
     * @param dataframes Multiple arguments. Each can be either a dataframe or an array of dataframes.
     *
     * @return Returns a single dataframes concatenated from multiple input dataframes.
     *
     * @example
     * <pre>
     *
     * const concatenatedDf = dfA.concat(dfB);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const concatenatedDf = dfA.concat(dfB, dfC);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const concatenatedDf = dfA.concat([dfB, dfC]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const concatenatedDf = dfA.concat(dfB, [dfC, dfD]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const otherDfs = [... array of dataframes...];
     * const concatenatedDf = dfA.concat(otherDfs);
     * </pre>
     */
    DataFrame.prototype.concat = function () {
        var dataframes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            dataframes[_i] = arguments[_i];
        }
        var concatInput = [this];
        try {
            for (var dataframes_1 = __values(dataframes), dataframes_1_1 = dataframes_1.next(); !dataframes_1_1.done; dataframes_1_1 = dataframes_1.next()) {
                var input = dataframes_1_1.value;
                if (isArray(input)) {
                    try {
                        for (var input_1 = __values(input), input_1_1 = input_1.next(); !input_1_1.done; input_1_1 = input_1.next()) {
                            var subInput = input_1_1.value;
                            concatInput.push(subInput);
                        }
                    }
                    catch (e_54_1) { e_54 = { error: e_54_1 }; }
                    finally {
                        try {
                            if (input_1_1 && !input_1_1.done && (_a = input_1.return)) _a.call(input_1);
                        }
                        finally { if (e_54) throw e_54.error; }
                    }
                }
                else {
                    concatInput.push(input);
                }
            }
        }
        catch (e_55_1) { e_55 = { error: e_55_1 }; }
        finally {
            try {
                if (dataframes_1_1 && !dataframes_1_1.done && (_b = dataframes_1.return)) _b.call(dataframes_1);
            }
            finally { if (e_55) throw e_55.error; }
        }
        return DataFrame.concat(concatInput);
        var e_55, _b, e_54, _a;
    };
    /**
    * Zip (or merge) together multiple dataframes to create a new dataframe.
    * Preserves the index of the first dataframe.
    *
    * @param input An iterable of datafames to be zipped.
    * @param zipper User-defined zipper function that merges rows. It produces rows for the new dataframe based-on rows from the input dataframes.
    *
    * @return Returns a single dataframe zipped (or merged) from multiple input dataframes.
    *
    * @example
    * <pre>
    *
    * function produceNewRow (inputRows) {
    *       const outputRow = {
    *           // Produce output row based on the contents of the input rows.
    *       };
    *       return outputRow;
    * }
    *
    * const inputDfs = [... array of input dataframes ...];
    * const zippedDf = DataFrame.zip(inputDfs, produceNewRow);
    *
    * </pre>
    *
    * @example
    * <pre>
    *
    * function produceNewRow (inputRows) {
    *       const outputRow = {
    *           // Produce output row based on the contents of the input rows.
    *       };
    *       return outputRow;
    * }
    *
    * const dfA = new DataFrame([ { Value: 10 }, { Value: 20 }, { Value: 30 }]);
    * const dfB = new DataFrame([ { Value: 100 }, { Value: 200 }, { Value: 300 }]);
    * const zippedDf = DataFrame.zip([dfA, dfB], produceNewRow);
    * </pre>
    */
    DataFrame.zip = function (dataframes, zipper) {
        var input = Array.from(dataframes);
        if (input.length === 0) {
            return new DataFrame();
        }
        var firstSeries = input[0];
        if (firstSeries.none()) {
            return new DataFrame();
        }
        return new DataFrame(function () {
            var firstSeriesUpCast = firstSeries;
            var upcast = input; // Upcast so that we can access private index, values and pairs.
            return {
                index: firstSeriesUpCast.getContent().index,
                values: new ZipIterable(upcast.map(function (s) { return s.getContent().values; }), zipper),
            };
        });
    };
    DataFrame.prototype.zip = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var selector = args[args.length - 1];
        var input = [this].concat(args.slice(0, args.length - 1));
        return DataFrame.zip(input, function (values) { return selector.apply(void 0, __spread(values)); });
    };
    /**
     * Sorts the dataframe in ascending order by a value defined by the user-defined selector function.
     *
     * @param selector User-defined selector function that selects the value to sort by.
     *
     * @return Returns a new dataframe that has been ordered accorrding to the value chosen by the selector function.
     *
     * @example
     * <pre>
     *
     * // Order sales by amount from least to most.
     * const orderedDf = salesDf.orderBy(sale => sale.Amount);
     * </pre>
     */
    DataFrame.prototype.orderBy = function (selector) {
        var content = this.getContent();
        return new OrderedDataFrame({
            columnNames: content.columnNames,
            values: content.values,
            pairs: content.pairs,
            selector: selector,
            direction: Direction.Ascending,
            parent: null,
        });
    };
    /**
     * Sorts the dataframe in descending order by a value defined by the user-defined selector function.
     *
     * @param selector User-defined selector function that selects the value to sort by.
     *
     * @return Returns a new dataframe that has been ordered accorrding to the value chosen by the selector function.
     *
     * @example
     * <pre>
     *
     * // Order sales by amount from most to least
     * const orderedDf = salesDf.orderByDescending(sale => sale.Amount);
     * </pre>
     */
    DataFrame.prototype.orderByDescending = function (selector) {
        var content = this.getContent();
        return new OrderedDataFrame({
            columnNames: content.columnNames,
            values: content.values,
            pairs: content.pairs,
            selector: selector,
            direction: Direction.Descending,
            parent: null,
        });
    };
    /**
     * Creates a new dataframe by merging two input dataframes.
     * The resulting dataframe contains the union of rows from the two input dataframes.
     * These are the unique combination of rows in both dataframe.
     * This is basically a concatenation and then elimination of duplicates.
     *
     * @param other The other dataframes to merge.
     * @param [selector] Optional user-defined selector function that selects the value to compare to detemrine distinctness.
     *
     * @return Returns the union of the two dataframes.
     *
     * @example
     * <pre>
     *
     * const dfA = ...
     * const dfB = ...
     * const merged = dfA.union(dfB);
     * </pre>
     *
     * @example
     * <pre>
     *
     * // Merge two sets of customer records that may contain the same
     * // customer record in each set. This is basically a concatenation
     * // of the dataframes and then an elimination of any duplicate records
     * // that result.
     * const customerRecordsA = ...
     * const customerRecordsB = ...
     * const mergedCustomerRecords = customerRecordsA.union(
     *      customerRecordsB,
     *      customerRecord => customerRecord.CustomerId
     * );
     * </pre>
     *
     *
     * @example
     * <pre>
     *
     * // Note that you can achieve the exact same result as the previous
     * // example by doing a {@link DataFrame.concat) and {@link DataFrame.distinct}
     * // of the dataframes and then an elimination of any duplicate records
     * // that result.
     * const customerRecordsA = ...
     * const customerRecordsB = ...
     * const mergedCustomerRecords = customerRecordsA
     *      .concat(customerRecordsB)
     *      .distinct(customerRecord => customerRecord.CustomerId);
     * </pre>
     *
     */
    DataFrame.prototype.union = function (other, selector) {
        if (selector) {
            if (!isFunction(selector))
                throw new Error("Expected optional 'selector' parameter to 'DataFrame.union' to be a selector function.");
        }
        return this.concat(other).distinct(selector);
    };
    /**
     * Creates a new dataframe by merging two input dataframes.
     * The resulting dataframe contains the intersection of rows from the two input dataframes.
     * These are only the rows that appear in both dataframes.
     *
     * @param inner The inner dataframe to merge (the dataframe you call the function on is the 'outer' dataframe).
     * @param [outerSelector] Optional user-defined selector function that selects the key from the outer dataframe that is used to match the two dataframes.
     * @param [innerSelector] Optional user-defined selector function that selects the key from the inner dataframe that is used to match the two dataframes.
     *
     * @return Returns a new dataframe that contains the intersection of rows from the two input dataframes.
     *
     * @example
     * <pre>
     *
     * const dfA = ...
     * const dfB = ...
     * const mergedDf = dfA.intersection(dfB);
     * </pre>
     *
     * @example
     * <pre>
     *
     * // Merge two sets of customer records to find only the
     * // customers that appears in both.
     * const customerRecordsA = ...
     * const customerRecordsB = ...
     * const intersectionOfCustomerRecords = customerRecordsA.intersection(
     *      customerRecordsB,
     *      customerRecord => customerRecord.CustomerId
     * );
     * </pre>
     * */
    DataFrame.prototype.intersection = function (inner, outerSelector, innerSelector) {
        if (outerSelector) {
            if (!isFunction(outerSelector))
                throw new Error("Expected optional 'outerSelector' parameter to 'DataFrame.intersection' to be a function.");
        }
        else {
            outerSelector = function (value) { return value; };
        }
        if (innerSelector) {
            if (!isFunction(innerSelector))
                throw new Error("Expected optional 'innerSelector' parameter to 'DataFrame.intersection' to be a function.");
        }
        else {
            innerSelector = function (value) { return value; };
        }
        var outer = this;
        return outer.where(function (outerValue) {
            var outerKey = outerSelector(outerValue);
            return inner
                .where(function (innerValue) { return outerKey === innerSelector(innerValue); })
                .any();
        });
    };
    /**
     * Creates a new dataframe by merging two input dataframes.
     * The resulting dataframe contains only the rows from the 1st dataframe that don't appear in the 2nd dataframe.
     * This is essentially subtracting the rows from the 2nd dataframe from the 1st and creating a new dataframe with the remaining rows.
     *
     * @param inner The inner dataframe to merge (the dataframe you call the function on is the 'outer' dataframe).
     * @param [outerSelector] Optional user-defined selector function that selects the key from the outer dataframe that is used to match the two dataframes.
     * @param [innerSelector] Optional user-defined selector function that selects the key from the inner dataframe that is used to match the two dataframes.
     *
     * @return Returns a new dataframe that contains only the rows from the 1st dataframe that don't appear in the 2nd dataframe.
     *
     * @example
     * <pre>
     *
     * const dfA = ...
     * const dfB = ...
     * const remainingDf = dfA.except(dfB);
     * </pre>
     *
     * @example
     * <pre>
     *
     * // Find the list of customers haven't bought anything recently.
     * const allCustomers = ... list of all customers ...
     * const recentCustomers = ... list of customers who have purchased recently ...
     * const remainingCustomers = allCustomers.except(
     *      recentCustomers,
     *      customerRecord => customerRecord.CustomerId
     * );
     * </pre>
     */
    DataFrame.prototype.except = function (inner, outerSelector, innerSelector) {
        if (outerSelector) {
            if (!isFunction(outerSelector))
                throw new Error("Expected optional 'outerSelector' parameter to 'DataFrame.except' to be a function.");
        }
        else {
            outerSelector = function (value) { return value; };
        }
        if (innerSelector) {
            if (!isFunction(innerSelector))
                throw new Error("Expected optional 'innerSelector' parameter to 'DataFrame.except' to be a function.");
        }
        else {
            innerSelector = function (value) { return value; };
        }
        var outer = this;
        return outer.where(function (outerValue) {
            var outerKey = outerSelector(outerValue);
            return inner
                .where(function (innerValue) { return outerKey === innerSelector(innerValue); })
                .none();
        });
    };
    /**
      * Creates a new dataframe by merging two input dataframes.
      * The resulting dataframe contains only those rows that have matching keys in both input dataframes.
      *
      * @param inner The 'inner' dataframe to join (the dataframe you are callling the function on is the 'outer' dataframe).
      * @param outerKeySelector User-defined selector function that chooses the join key from the outer dataframe.
      * @param innerKeySelector User-defined selector function that chooses the join key from the inner dataframe.
      * @param resultSelector User-defined function that merges outer and inner values.
      *
      * @return Returns the new merged dataframe.
      *
      * @example
      * <pre>
      *
      * // Join together two sets of customers to find those
      * // that have bought both product A and product B.
      * const customerWhoBoughtProductA = ...
      * const customerWhoBoughtProductB = ...
      * const customersWhoBoughtBothProductsDf = customerWhoBoughtProductA.join(
      *          customerWhoBoughtProductB,
      *          customerA => customerA.CustomerId, // Join key.
      *          customerB => customerB.CustomerId, // Join key.
      *          (customerA, customerB) => {
      *              return {
      *                  // ... merge the results ...
      *              };
      *          }
      *      );
      * </pre>
      */
    DataFrame.prototype.join = function (inner, outerKeySelector, innerKeySelector, resultSelector) {
        if (!isFunction(outerKeySelector))
            throw new Error("Expected 'outerKeySelector' parameter of 'DataFrame.join' to be a selector function.");
        if (!isFunction(innerKeySelector))
            throw new Error("Expected 'innerKeySelector' parameter of 'DataFrame.join' to be a selector function.");
        if (!isFunction(resultSelector))
            throw new Error("Expected 'resultSelector' parameter of 'DataFrame.join' to be a selector function.");
        var outer = this;
        return new DataFrame(function () {
            var innerMap = inner
                .groupBy(innerKeySelector)
                .toObject(function (group) { return innerKeySelector(group.first()); }, function (group) { return group; });
            var outerContent = outer.getContent();
            var output = [];
            try {
                for (var outer_1 = __values(outer), outer_1_1 = outer_1.next(); !outer_1_1.done; outer_1_1 = outer_1.next()) {
                    var outerValue = outer_1_1.value;
                    var outerKey = outerKeySelector(outerValue);
                    var innerGroup = innerMap[outerKey];
                    if (innerGroup) {
                        try {
                            for (var innerGroup_1 = __values(innerGroup), innerGroup_1_1 = innerGroup_1.next(); !innerGroup_1_1.done; innerGroup_1_1 = innerGroup_1.next()) {
                                var innerValue = innerGroup_1_1.value;
                                output.push(resultSelector(outerValue, innerValue));
                            }
                        }
                        catch (e_56_1) { e_56 = { error: e_56_1 }; }
                        finally {
                            try {
                                if (innerGroup_1_1 && !innerGroup_1_1.done && (_a = innerGroup_1.return)) _a.call(innerGroup_1);
                            }
                            finally { if (e_56) throw e_56.error; }
                        }
                    }
                }
            }
            catch (e_57_1) { e_57 = { error: e_57_1 }; }
            finally {
                try {
                    if (outer_1_1 && !outer_1_1.done && (_b = outer_1.return)) _b.call(outer_1);
                }
                finally { if (e_57) throw e_57.error; }
            }
            return {
                values: output
            };
            var e_57, _b, e_56, _a;
        });
    };
    /**
     * Creates a new dataframe by merging two input dataframes.
     * The resulting dataframe contains only those rows that are only present in one or the other of the dataframes, not both.
     *
     * @param inner The 'inner' dataframe to join (the dataframe you are callling the function on is the 'outer' dataframe).
     * @param outerKeySelector User-defined selector function that chooses the join key from the outer dataframe.
     * @param innerKeySelector User-defined selector function that chooses the join key from the inner dataframe.
     * @param resultSelector User-defined function that merges outer and inner values.
     *
     * Implementation from here:
     *
     * 	http://blogs.geniuscode.net/RyanDHatch/?p=116
     *
     * @return Returns the new merged dataframe.
     *
     * @example
     * <pre>
     *
     * // Join together two sets of customers to find those
     * // that have bought either product A or product B, not not both.
     * const customerWhoBoughtProductA = ...
     * const customerWhoBoughtProductB = ...
     * const customersWhoBoughtEitherProductButNotBothDf = customerWhoBoughtProductA.joinOuter(
     *          customerWhoBoughtProductB,
     *          customerA => customerA.CustomerId, // Join key.
     *          customerB => customerB.CustomerId, // Join key.
     *          (customerA, customerB) => {
     *              return {
     *                  // ... merge the results ...
     *              };
     *          }
     *      );
     * </pre>
     */
    DataFrame.prototype.joinOuter = function (inner, outerKeySelector, innerKeySelector, resultSelector) {
        if (!isFunction(outerKeySelector))
            throw new Error("Expected 'outerKeySelector' parameter of 'DataFrame.joinOuter' to be a selector function.");
        if (!isFunction(innerKeySelector))
            throw new Error("Expected 'innerKeySelector' parameter of 'DataFrame.joinOuter' to be a selector function.");
        if (!isFunction(resultSelector))
            throw new Error("Expected 'resultSelector' parameter of 'DataFrame.joinOuter' to be a selector function.");
        // Get the results in the outer that are not in the inner.
        var outer = this;
        var outerResult = outer.except(inner, outerKeySelector, innerKeySelector)
            .select(function (outer) { return resultSelector(outer, null); })
            .resetIndex();
        // Get the results in the inner that are not in the outer.
        var innerResult = inner.except(outer, innerKeySelector, outerKeySelector)
            .select(function (inner) { return resultSelector(null, inner); })
            .resetIndex();
        // Get the intersection of results between inner and outer.
        var intersectionResults = outer.join(inner, outerKeySelector, innerKeySelector, resultSelector);
        return outerResult
            .concat(intersectionResults)
            .concat(innerResult)
            .resetIndex();
    };
    /**
     * Creates a new dataframe by merging two input dataframes.
     * The resulting dataframe contains only those rows that present either in both dataframes or only in the outer (left) dataframe.
     *
     * @param inner The 'inner' dataframe to join (the dataframe you are callling the function on is the 'outer' dataframe).
     * @param outerKeySelector User-defined selector function that chooses the join key from the outer dataframe.
     * @param innerKeySelector User-defined selector function that chooses the join key from the inner dataframe.
     * @param resultSelector User-defined function that merges outer and inner values.
     *
     * Implementation from here:
     *
     * 	http://blogs.geniuscode.net/RyanDHatch/?p=116
     *
     * @return Returns the new merged dataframe.
     *
     * @example
     * <pre>
     *
     * // Join together two sets of customers to find those
     * // that have bought either just product A or both product A and product B.
     * const customerWhoBoughtProductA = ...
     * const customerWhoBoughtProductB = ...
     * const boughtJustAorAandB = customerWhoBoughtProductA.joinOuterLeft(
     *          customerWhoBoughtProductB,
     *          customerA => customerA.CustomerId, // Join key.
     *          customerB => customerB.CustomerId, // Join key.
     *          (customerA, customerB) => {
     *              return {
     *                  // ... merge the results ...
     *              };
     *          }
     *      );
     * </pre>
     */
    DataFrame.prototype.joinOuterLeft = function (inner, outerKeySelector, innerKeySelector, resultSelector) {
        if (!isFunction(outerKeySelector))
            throw new Error("Expected 'outerKeySelector' parameter of 'DataFrame.joinOuterLeft' to be a selector function.");
        if (!isFunction(innerKeySelector))
            throw new Error("Expected 'innerKeySelector' parameter of 'DataFrame.joinOuterLeft' to be a selector function.");
        if (!isFunction(resultSelector))
            throw new Error("Expected 'resultSelector' parameter of 'DataFrame.joinOuterLeft' to be a selector function.");
        // Get the results in the outer that are not in the inner.
        var outer = this;
        var outerResult = outer.except(inner, outerKeySelector, innerKeySelector)
            .select(function (outer) { return resultSelector(outer, null); })
            .resetIndex();
        // Get the intersection of results between inner and outer.
        var intersectionResults = outer.join(inner, outerKeySelector, innerKeySelector, resultSelector);
        return outerResult
            .concat(intersectionResults)
            .resetIndex();
    };
    /**
     * Creates a new dataframe by merging two input dataframes.
     * The resulting dataframe contains only those rows that present either in both dataframes or only in the inner (right) dataframe.
     *
     * @param inner The 'inner' dataframe to join (the dataframe you are callling the function on is the 'outer' dataframe).
     * @param outerKeySelector User-defined selector function that chooses the join key from the outer dataframe.
     * @param innerKeySelector User-defined selector function that chooses the join key from the inner dataframe.
     * @param resultSelector User-defined function that merges outer and inner values.
     *
     * Implementation from here:
     *
     * 	http://blogs.geniuscode.net/RyanDHatch/?p=116
     *
     * @return Returns the new merged dataframe.
     *
     * @example
     * <pre>
     *
     * // Join together two sets of customers to find those
     * // that have bought either just product B or both product A and product B.
     * const customerWhoBoughtProductA = ...
     * const customerWhoBoughtProductB = ...
     * const boughtJustAorAandB = customerWhoBoughtProductA.joinOuterRight(
     *          customerWhoBoughtProductB,
     *          customerA => customerA.CustomerId, // Join key.
     *          customerB => customerB.CustomerId, // Join key.
     *          (customerA, customerB) => {
     *              return {
     *                  // ... merge the results ...
     *              };
     *          }
     *      );
     * </pre>
     */
    DataFrame.prototype.joinOuterRight = function (inner, outerKeySelector, innerKeySelector, resultSelector) {
        if (!isFunction(outerKeySelector))
            throw new Error("Expected 'outerKeySelector' parameter of 'DataFrame.joinOuterRight' to be a selector function.");
        if (!isFunction(innerKeySelector))
            throw new Error("Expected 'innerKeySelector' parameter of 'DataFrame.joinOuterRight' to be a selector function.");
        if (!isFunction(resultSelector))
            throw new Error("Expected 'resultSelector' parameter of 'DataFrame.joinOuterRight' to be a selector function.");
        // Get the results in the inner that are not in the outer.
        var outer = this;
        var innerResult = inner.except(outer, innerKeySelector, outerKeySelector)
            .select(function (inner) { return resultSelector(null, inner); })
            .resetIndex();
        // Get the intersection of results between inner and outer.
        var intersectionResults = outer.join(inner, outerKeySelector, innerKeySelector, resultSelector);
        return intersectionResults
            .concat(innerResult)
            .resetIndex();
    };
    /**
     * Produces a summary of dataframe. A bit like the 'aggregate' function but much simpler.
     *
     * @param [spec] Optional parameter that specifies which columns to aggregate and how to aggregate them. Leave this out to produce a default summary of all columns.
     *
     * @returns A object with fields that summary the values in the dataframe.
     *
     * @example
     * <pre>
     *
     * const summary = df.summarize();
     * console.log(summary);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const summary = df.summarize({ // Summarize using pre-defined functions.
     *      Column1: Series.sum,
     *      Column2: Series.average,
     *      Column3: Series.count,
     * });
     * console.log(summary);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const summary = df.summarize({ // Summarize using custom functions.
     *      Column1: series => series.sum(),
     *      Column2: series => series.std(),
     *      ColumnN: whateverFunctionYouWant,
     * });
     * console.log(summary);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const summary = df.summarize({ // Multiple output fields per column.
     *      Column1: {
     *          OutputField1: Series.sum,
     *          OutputField2: Series.average,
     *      },
     *      Column2: {
     *          OutputField3: series => series.sum(),
     *          OutputFieldN: whateverFunctionYouWant,
     *      },
     * });
     * console.log(summary);
     * </pre>
     */
    DataFrame.prototype.summarize = function (spec) {
        if (spec && !isObject(spec)) {
            throw new Error("Expected 'spec' parameter to 'DataFrame.summarize' to be an object that specifies how to summarize the dataframe.");
        }
        if (!spec) {
            spec = {};
            try {
                for (var _a = __values(this.getColumnNames()), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var columnName = _b.value;
                    var columnSpec = {};
                    columnSpec[columnName + "_sum"] = Series.sum;
                    columnSpec[columnName + "_average"] = Series.average;
                    columnSpec[columnName + "_count"] = Series.count;
                    spec[columnName] = columnSpec;
                }
            }
            catch (e_58_1) { e_58 = { error: e_58_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_58) throw e_58.error; }
            }
        }
        try {
            for (var _d = __values(Object.keys(spec)), _e = _d.next(); !_e.done; _e = _d.next()) {
                var inputColumnName = _e.value;
                var inputSpec = spec[inputColumnName];
                if (isFunction(inputSpec)) {
                    spec[inputColumnName] = {}; // Expand the spec.
                    spec[inputColumnName][inputColumnName] = inputSpec;
                }
            }
        }
        catch (e_59_1) { e_59 = { error: e_59_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
            }
            finally { if (e_59) throw e_59.error; }
        }
        var inputColumnNames = Object.keys(spec);
        var outputFieldsMap = toMap(inputColumnNames, function (valueColumnName) { return valueColumnName; }, function (inputColumnName) { return Object.keys(spec[inputColumnName]); });
        var output = {};
        try {
            for (var inputColumnNames_3 = __values(inputColumnNames), inputColumnNames_3_1 = inputColumnNames_3.next(); !inputColumnNames_3_1.done; inputColumnNames_3_1 = inputColumnNames_3.next()) {
                var inputColumnName = inputColumnNames_3_1.value;
                var outputFieldNames = outputFieldsMap[inputColumnName];
                try {
                    for (var outputFieldNames_1 = __values(outputFieldNames), outputFieldNames_1_1 = outputFieldNames_1.next(); !outputFieldNames_1_1.done; outputFieldNames_1_1 = outputFieldNames_1.next()) {
                        var outputFieldName = outputFieldNames_1_1.value;
                        var aggregatorFn = spec[inputColumnName][outputFieldName];
                        output[outputFieldName] = aggregatorFn(this.getSeries(inputColumnName));
                    }
                }
                catch (e_60_1) { e_60 = { error: e_60_1 }; }
                finally {
                    try {
                        if (outputFieldNames_1_1 && !outputFieldNames_1_1.done && (_g = outputFieldNames_1.return)) _g.call(outputFieldNames_1);
                    }
                    finally { if (e_60) throw e_60.error; }
                }
            }
        }
        catch (e_61_1) { e_61 = { error: e_61_1 }; }
        finally {
            try {
                if (inputColumnNames_3_1 && !inputColumnNames_3_1.done && (_h = inputColumnNames_3.return)) _h.call(inputColumnNames_3);
            }
            finally { if (e_61) throw e_61.error; }
        }
        return output;
        var e_58, _c, e_59, _f, e_61, _h, e_60, _g;
    };
    /**
     * Reshape (or pivot) a dataframe based on column values.
     * This is a powerful function that combines grouping, aggregation and sorting.
     *
     * @param columnOrColumns Column name whose values make the new DataFrame's columns.
     * @param valueColumnNameOrSpec Column name or column spec that defines the columns whose values should be aggregated.
     * @param [aggregator] Optional function used to aggregate pivotted vales.
     *
     * @return Returns a new dataframe that has been pivoted based on a particular column's values.
     *
     * @example
     * <pre>
     *
     * // Simplest example.
     * // Group by the values in 'PivotColumn'.
     * // The unique set of values in 'PivotColumn' becomes the columns in the resulting dataframe.
     * // The column 'ValueColumn' is aggregated for each group and this becomes the
     * // values in the new output column.
     * const pivottedDf = df.pivot("PivotColumn", "ValueColumn", values => values.average());
     * </pre>
     *
     * @example
     * <pre>
     *
     * // Multiple input column example.
     * // Similar to the previous example except now we are aggregating multiple input columns.
     * // Each group has the average computed for 'ValueColumnA' and the sum for 'ValueColumnB'.
     * const pivottedDf = df.pivot("PivotColumn", {
     *      ValueColumnA: aValues => aValues.average(),
     *      ValueColumnB:  bValues => bValues.sum(),
     * });
     * </pre>
     *
     * @example
     * <pre>
     *
     * // Multiple output column example.
     * // Similar to the previous example except now we are doing multiple aggregations for each input column.
     * // The example produces an output dataframe with columns OutputColumnA, B, C and D.
     * // OutputColumnA/B are the sum and average of ValueColumnA across each group as defined by PivotColumn.
     * // OutputColumnC/D are the sum and average of ValueColumnB across each group as defined by PivotColumn.
     * const pivottedDf = df.pivot("PivotColumn", {
     *      ValueColumnA: {
     *          OutputColumnA: aValues => aValues.sum(),
     *          OutputColumnB: aValues => aValues.average(),
     *      },
     *      ValueColumnB: {
     *          OutputColumnC: bValues => bValues.sum(),
     *          OutputColumnD: bValues => bValues.average(),
     *      },
     * });
     * </pre>
     *
     * @example
     * <pre>
     *
     * // Full multi-column example.
     * // Similar to the previous example now we are pivotting on multiple columns.
     * // We now group by the 'PivotColumnA' and then by 'PivotColumnB', effectively creating a
     * // multi-level group.
     * const pivottedDf = df.pivot(["PivotColumnA", "PivotColumnB" ], {
     *      ValueColumnA: aValues => aValues.average(),
     *      ValueColumnB:  bValues => bValues.sum(),
     * });
     * </pre>
     *
     * @example
     * <pre>
     *
     * // To help understand the pivot function, let's look at what it does internally.
     * // Take the simplest example:
     * const pivottedDf = df.pivot("PivotColumn", "ValueColumn", values => values.average());
     *
     * // If we expand out the internals of the pivot function, it will look something like this:
     * const pivottedDf = df.groupBy(row => row.PivotColumn)
     *          .select(group => ({
     *              PivotColumn: group.deflate(row => row.ValueColumn).average()
     *          }))
     *          .orderBy(row  => row.PivotColumn);
     *
     * // You can see that pivoting a dataframe is the same as grouping, aggregating and sorting it.
     * // Does pivoting seem simpler now?
     *
     * // It gets more complicated than that of course, because the pivot function supports multi-level nested
     * // grouping and aggregation of multiple columns. So a full expansion of the pivot function is rather complex.
     * </pre>
     */
    DataFrame.prototype.pivot = function (columnOrColumns, valueColumnNameOrSpec, aggregator) {
        var columnNames;
        if (isString(columnOrColumns)) {
            columnNames = [columnOrColumns];
        }
        else {
            if (!isArray(columnOrColumns))
                throw new Error("Expected 'columnOrColumns' parameter to 'DataFrame.pivot' to be a string or an array of strings that identifies the column(s) whose values make the new DataFrame's columns.");
            columnNames = Array.from(columnOrColumns);
            if (columnNames.length === 0)
                throw new Error("Expected 'columnOrColumns' parameter to 'DataFrame.pivot' to contain at least one string.");
            try {
                for (var columnNames_10 = __values(columnNames), columnNames_10_1 = columnNames_10.next(); !columnNames_10_1.done; columnNames_10_1 = columnNames_10.next()) {
                    var columnName = columnNames_10_1.value;
                    if (!isString(columnName))
                        throw new Error("Expected 'columnOrColumns' parameter to 'DataFrame.pivot' to be an array of strings, each string identifies a column in the DataFrame on which to pivot.");
                }
            }
            catch (e_62_1) { e_62 = { error: e_62_1 }; }
            finally {
                try {
                    if (columnNames_10_1 && !columnNames_10_1.done && (_a = columnNames_10.return)) _a.call(columnNames_10);
                }
                finally { if (e_62) throw e_62.error; }
            }
        }
        var aggSpec;
        if (!isObject(valueColumnNameOrSpec)) {
            if (!isString(valueColumnNameOrSpec))
                throw new Error("Expected 'value' parameter to 'DataFrame.pivot' to be a string that identifies the column whose values to aggregate or a column spec that defines which column contains the value ot aggregate and the ways to aggregate that value.");
            if (!isFunction(aggregator))
                throw new Error("Expected 'aggregator' parameter to 'DataFrame.pivot' to be a function to aggegrate pivoted values.");
            var aggColumnName = valueColumnNameOrSpec;
            var outputSpec = {};
            outputSpec[aggColumnName] = aggregator;
            aggSpec = {};
            aggSpec[aggColumnName] = outputSpec;
        }
        else {
            aggSpec = valueColumnNameOrSpec;
            try {
                for (var _b = __values(Object.keys(aggSpec)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var inputColumnName = _c.value;
                    var columnAggSpec = aggSpec[inputColumnName];
                    if (isFunction(columnAggSpec)) {
                        aggSpec[inputColumnName] = {}; // Expand the pivot spec.
                        aggSpec[inputColumnName][inputColumnName] = columnAggSpec;
                    }
                }
            }
            catch (e_63_1) { e_63 = { error: e_63_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                }
                finally { if (e_63) throw e_63.error; }
            }
        }
        var firstColumnName = columnNames[0];
        var working = this.groupBy(function (row) { return row[firstColumnName]; })
            .select(function (group) {
            var output = {};
            output[firstColumnName] = group.first()[firstColumnName];
            output.src = group;
            return output;
        });
        var _loop_1 = function (columnNameIndex) {
            var nextColumnName = columnNames[columnNameIndex];
            working = working.selectMany(function (parentGroup) {
                var src = parentGroup.src;
                return src.groupBy(function (row) { return row[nextColumnName]; })
                    .select(function (subGroup) {
                    var output = Object.assign({}, parentGroup);
                    output[nextColumnName] = subGroup.first()[nextColumnName];
                    output.src = subGroup;
                    return output;
                });
            });
        };
        for (var columnNameIndex = 1; columnNameIndex < columnNames.length; ++columnNameIndex) {
            _loop_1(columnNameIndex);
        }
        var valueColumnNames = Object.keys(aggSpec);
        var outputColumnsMap = toMap(valueColumnNames, function (valueColumnName) { return valueColumnName; }, function (valueColumnName) { return Object.keys(aggSpec[valueColumnName]); });
        var pivotted = working.inflate(function (row) {
            var _loop_2 = function (valueColumnName) {
                var outputColumnNames = outputColumnsMap[valueColumnName];
                try {
                    for (var outputColumnNames_1 = __values(outputColumnNames), outputColumnNames_1_1 = outputColumnNames_1.next(); !outputColumnNames_1_1.done; outputColumnNames_1_1 = outputColumnNames_1.next()) {
                        var outputColumName = outputColumnNames_1_1.value;
                        var aggregatorFn = aggSpec[valueColumnName][outputColumName];
                        row[outputColumName] = aggregatorFn(row.src.deflate(function (srcRow) { return srcRow[valueColumnName]; }));
                    }
                }
                catch (e_64_1) { e_64 = { error: e_64_1 }; }
                finally {
                    try {
                        if (outputColumnNames_1_1 && !outputColumnNames_1_1.done && (_a = outputColumnNames_1.return)) _a.call(outputColumnNames_1);
                    }
                    finally { if (e_64) throw e_64.error; }
                }
                var e_64, _a;
            };
            try {
                for (var valueColumnNames_1 = __values(valueColumnNames), valueColumnNames_1_1 = valueColumnNames_1.next(); !valueColumnNames_1_1.done; valueColumnNames_1_1 = valueColumnNames_1.next()) {
                    var valueColumnName = valueColumnNames_1_1.value;
                    _loop_2(valueColumnName);
                }
            }
            catch (e_65_1) { e_65 = { error: e_65_1 }; }
            finally {
                try {
                    if (valueColumnNames_1_1 && !valueColumnNames_1_1.done && (_a = valueColumnNames_1.return)) _a.call(valueColumnNames_1);
                }
                finally { if (e_65) throw e_65.error; }
            }
            delete row.src;
            return row;
            var e_65, _a;
        });
        var ordered = pivotted.orderBy(function (row) { return row[firstColumnName]; });
        var _loop_3 = function (columnNameIndex) {
            var nextColumnName = columnNames[columnNameIndex];
            ordered = ordered.thenBy(function (row) { return row[nextColumnName]; });
        };
        for (var columnNameIndex = 1; columnNameIndex < columnNames.length; ++columnNameIndex) {
            _loop_3(columnNameIndex);
        }
        return ordered;
        var e_62, _a, e_63, _d;
    };
    /**
     * Insert a pair at the start of the dataframe.
     * Doesn't modify the original dataframe! The returned dataframe is entirely new and contains rows from the original dataframe plus the inserted pair.
     *
     * @param pair The pair to insert.
     *
     * @return Returns a new dataframe with the specified pair inserted.
     *
     * @example
     * <pre>
     *
     * const newIndex = ... index of the new row ...
     * const newRow = ... the new data row to insert ...
     * const insertedDf = df.insertPair([newIndex, newRows]);
     * </pre>
     */
    DataFrame.prototype.insertPair = function (pair) {
        if (!isArray(pair))
            throw new Error("Expected 'pair' parameter to 'DataFrame.insertPair' to be an array.");
        if (pair.length !== 2)
            throw new Error("Expected 'pair' parameter to 'DataFrame.insertPair' to be an array with two elements. The first element is the index, the second is the value.");
        return (new DataFrame({ pairs: [pair] })).concat(this);
    };
    /**
     * Append a pair to the end of a dataframe.
     * Doesn't modify the original dataframe! The returned dataframe is entirely new and contains rows from the original dataframe plus the appended pair.
     *
     * @param pair - The pair to append.
     *
     * @return Returns a new dataframe with the specified pair appended.
     *
     * @example
     * <pre>
     *
     * const newIndex = ... index of the new row ...
     * const newRow = ... the new data row to append ...
     * const appendedDf = df.appendPair([newIndex, newRows]);
     * </pre>
     */
    DataFrame.prototype.appendPair = function (pair) {
        if (!isArray(pair))
            throw new Error("Expected 'pair' parameter to 'DataFrame.appendPair' to be an array.");
        if (pair.length !== 2)
            throw new Error("Expected 'pair' parameter to 'DataFrame.appendPair' to be an array with two elements. The first element is the index, the second is the value.");
        return this.concat(new DataFrame({ pairs: [pair] }));
    };
    /**
     * Fill gaps in a dataframe.
     *
     * @param comparer User-defined comparer function that is passed pairA and pairB, two consecutive rows, return truthy if there is a gap between the rows, or falsey if there is no gap.
     * @param generator User-defined generator function that is passed pairA and pairB, two consecutive rows, returns an array of pairs that fills the gap between the rows.
     *
     * @return Returns a new dataframe with gaps filled in.
     *
     * @example
     * <pre>
     *
     *   var sequenceWithGaps = ...
     *
     *  // Predicate that determines if there is a gap.
     *  var gapExists = (pairA, pairB) => {
     *      // Returns true if there is a gap.
     *      return true;
     *  };
     *
     *  // Generator function that produces new rows to fill the game.
     *  var gapFiller = (pairA, pairB) => {
     *      // Create an array of index, value pairs that fill the gaps between pairA and pairB.
     *      return [
     *          newPair1,
     *          newPair2,
     *          newPair3,
     *      ];
     *  };
     *
     *  var sequenceWithoutGaps = sequenceWithGaps.fillGaps(gapExists, gapFiller);
     * </pre>
     */
    DataFrame.prototype.fillGaps = function (comparer, generator) {
        if (!isFunction(comparer))
            throw new Error("Expected 'comparer' parameter to 'DataFrame.fillGaps' to be a comparer function that compares two values and returns a boolean.");
        if (!isFunction(generator))
            throw new Error("Expected 'generator' parameter to 'DataFrame.fillGaps' to be a generator function that takes two values and returns an array of generated pairs to span the gap.");
        return this.rollingWindow(2)
            .selectMany(function (window) {
            var pairs = window.toPairs();
            var pairA = pairs[0];
            var pairB = pairs[1];
            if (!comparer(pairA, pairB)) {
                return [pairA];
            }
            var generatedRows = generator(pairA, pairB);
            if (!isArray(generatedRows))
                throw new Error("Expected return from 'generator' parameter to 'DataFrame.fillGaps' to be an array of pairs, instead got a " + typeof (generatedRows));
            return [pairA].concat(generatedRows);
        })
            .withIndex(function (pair) { return pair[0]; })
            .inflate(function (pair) { return pair[1]; })
            .concat(this.tail(1));
    };
    /**
     * Returns the specified default dataframe if the dataframe is empty.
     *
     * @param defaultDataFrame Default dataframe to return if the dataframe is empty.
     *
     * @return Returns 'defaultDataFrame' if the dataframe is empty.
     *
     * @example
     * <pre>
     *
     * const emptyDataFrame = new DataFrame();
     * const defaultDataFrame = new DataFrame([ { A: 1 }, { A: 2 }, { A: 3 } ]);
     * expect(emptyDataFrame.defaultIfEmpty(defaultDataFrame)).to.eql(defaultDataFrame);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const nonEmptyDataFrame = new DataFrame([ { A: 100 }]);
     * const defaultDataFrame = new DataFrame([ { A: 1 }, { A: 2 }, { A: 3 } ]);
     * expect(nonEmptyDataFrame.defaultIfEmpty(defaultDataFrame)).to.eql(nonEmptyDataFrame);
     * </pre>
     */
    DataFrame.prototype.defaultIfEmpty = function (defaultDataFrame) {
        if (this.none()) {
            if (defaultDataFrame instanceof DataFrame) {
                return defaultDataFrame;
            }
            else if (isArray(defaultDataFrame)) {
                return new DataFrame(defaultDataFrame);
            }
            else {
                throw new Error("Expected 'defaultSequence' parameter to 'DataFrame.defaultIfEmpty' to be an array or a series.");
            }
        }
        else {
            return this;
        }
    };
    /**
     * Detect the the frequency of the types of the values in the dataframe.
     * This is a good way to understand the shape of your data.
     *
     * @return Returns a dataframe with rows that confirm to {@link ITypeFrequency} that describes the data types contained in the original dataframe.
     *
     * @example
     * <pre>
     *
     * const df = dataForge.readFileSync("./my-data.json").parseJSON();
     * const dataTypes = df.detectTypes();
     * console.log(dataTypes.toString());
     * </pre>
     */
    DataFrame.prototype.detectTypes = function () {
        var _this = this;
        return new DataFrame(function () {
            var typeFrequencies = _this.getColumns()
                .selectMany(function (column) {
                return column.series.detectTypes()
                    .select(function (typeFrequency) {
                    var output = Object.assign({}, typeFrequency);
                    output.Column = column.name;
                    return output;
                });
            });
            return {
                columnNames: ["Type", "Frequency", "Column"],
                values: typeFrequencies,
            };
        });
    };
    /**
     * Detect the frequency of the values in the dataframe.
     * This is a good way to understand the shape of your data.
     *
     * @return Returns a dataframe with rows that conform to {@link IValueFrequency} that describes the values contained in the dataframe.
     *
     * @example
     * <pre>
     *
     * const df = dataForge.readFileSync("./my-data.json").parseJSON();
     * const dataValues = df.detectedValues();
     * console.log(dataValues.toString());
     * </pre>
     */
    DataFrame.prototype.detectValues = function () {
        var _this = this;
        return new DataFrame(function () {
            var valueFrequencies = _this.getColumns()
                .selectMany(function (column) {
                return column.series.detectValues()
                    .select(function (valueFrequency) {
                    var output = Object.assign({}, valueFrequency);
                    output.Column = column.name;
                    return output;
                });
            });
            return {
                columnNames: ["Value", "Frequency", "Column"],
                values: valueFrequencies,
            };
        });
    };
    /**
     * Serialize the dataframe to the JSON data format.
     *
     * @return Returns a string in the JSON data format that represents the dataframe.
     *
     * @example
     * <pre>
     *
     * const jsonData = df.toJSON();
     * console.log(jsonData);
     * </pre>
     */
    DataFrame.prototype.toJSON = function () {
        return JSON.stringify(this.toArray(), null, 4);
    };
    /**
     * Serialize the dataframe to the JSON5 data format.
     *
     * @return Returns a string in the JSON5 data format that represents the dataframe.
     *
     * @example
     * <pre>
     *
     * const jsonData = df.toJSON5();
     * console.log(jsonData);
     * </pre>
     */
    DataFrame.prototype.toJSON5 = function () {
        return JSON5.stringify(this.toArray(), null, 4);
    };
    /**
     * Serialize the dataframe to the CSV data format.
     *
     * @return Returns a string in the CSV data format that represents the dataframe.
     *
     * @example
     * <pre>
     *
     * const csvData = df.toCSV();
     * console.log(csvData);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const csvData = df.toCSV({ header: false });
     * console.log(csvData);
     * </pre>
     */
    DataFrame.prototype.toCSV = function (options) {
        var headerLine = options === undefined || options.header === undefined || options.header
            ? [this.getColumnNames()]
            : [];
        var rows = headerLine.concat(this.toRows());
        return PapaParse.unparse(rows, options);
    };
    /**
     * Serialize the dataframe to HTML.
     *
     * @return Returns a string in HTML format that represents the dataframe.
     */
    DataFrame.prototype.toHTML = function () {
        var columNames = this.getColumnNames();
        var header = columNames.map(function (columnName) { return "            <th>" + columnName + "</th>"; }).join("\n");
        var pairs = this.toPairs();
        return '<table border="1" class="dataframe">\n' +
            '    <thead>\n' +
            '        <tr style="text-align: right;">\n' +
            '            <th></th>\n' +
            header +
            '\n' +
            '       </tr>\n' +
            '    </thead>\n' +
            '    <tbody>\n' +
            pairs.map(function (pair) {
                var index = pair[0];
                var value = pair[1];
                return '        <tr>\n' +
                    '            <th>' + index + '</th>\n' +
                    columNames.map(function (columName) {
                        return '            <td>' + value[columName] + '</td>';
                    })
                        .join('\n') +
                    '\n' +
                    '        </tr>';
            })
                .join('\n') +
            '\n' +
            '    </tbody>\n' +
            '</table>';
    };
    /**
     * Serialize the dataframe to an ordinary JavaScript data structure.
     * The resulting data structure is suitable for further serialization to JSON and can be used to
     * transmit a DataFrame and its internal structure over the wire.
     * Use the {@link deserialize} function to later reconstitute the serialized dataframe.
     *
     * @return Returns a JavaScript data structure conforming to {@link ISerializedDataFrame} that represents the dataframe and its internal structure.
     *
     * @example
     * <pre>
     *
     * const jsDataStructure = df.serialize();
     * const jsonData = JSON.stringify(jsDataStructure);
     * console.log(jsonData);
     * const deserializedJsDataStructure = JSON.parse(jsonData);
     * const deserializedDf = DataFrame.deserialize(deserializedJsDataStructure); // Reconsituted.
     * </pre>
     */
    DataFrame.prototype.serialize = function () {
        var rows = this.toArray(); // Bake the dataframe to an array.
        var index = this.getIndex(); // Extract the index.
        var indexValues = index.head(rows.length).toArray();
        var columns = this.getColumns();
        var serializedColumns = toMap(columns, function (column) { return column.name; }, function (column) { return column.type; });
        var indexType = index.getType();
        if (indexType === "date") {
            indexValues = indexValues.map(function (index) { return moment(index).toISOString(); }); // Manually serialize date value, they aren't supported directly by JSON.
        }
        var cloned = false;
        try {
            // Serialize date values.
            for (var columns_1 = __values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                var column = columns_1_1.value;
                if (column.type === "date") {
                    if (!cloned) {
                        rows = rows.map(function (row) { return Object.assign({}, row); }); // Clone so we don't modify any original data.
                        cloned = true;
                    }
                    try {
                        for (var rows_1 = __values(rows), rows_1_1 = rows_1.next(); !rows_1_1.done; rows_1_1 = rows_1.next()) {
                            var row = rows_1_1.value;
                            row[column.name] = moment(row[column.name]).toISOString(); // Manually serialize date value.
                        }
                    }
                    catch (e_66_1) { e_66 = { error: e_66_1 }; }
                    finally {
                        try {
                            if (rows_1_1 && !rows_1_1.done && (_a = rows_1.return)) _a.call(rows_1);
                        }
                        finally { if (e_66) throw e_66.error; }
                    }
                }
            }
        }
        catch (e_67_1) { e_67 = { error: e_67_1 }; }
        finally {
            try {
                if (columns_1_1 && !columns_1_1.done && (_b = columns_1.return)) _b.call(columns_1);
            }
            finally { if (e_67) throw e_67.error; }
        }
        return {
            columnOrder: this.getColumnNames(),
            columns: serializedColumns,
            index: {
                type: indexType,
                values: indexValues,
            },
            values: rows,
        };
        var e_67, _b, e_66, _a;
    };
    /**
     * Deserialize the dataframe from an ordinary JavaScript data structure.
     * Can reconstitute a dataframe that previously serialized with the {@link serialize} function.
     * This can rebuilds the dataframe with the exact same internal structure after it has been transmitted over the wire.
     *
     * @param input The serialize JavaScript data structure for the dataframe.
     *
     * @return Returns the deserialized/reconstituted dataframe.
     *
     * @example
     * <pre>
     *
     * const jsDataStructure = df.serialize();
     * const jsonData = JSON.stringify(jsDataStructure);
     * console.log(jsonData);
     * const deserializedJsDataStructure = JSON.parse(jsonData);
     * const deserializedDf = DataFrame.deserialize(deserializedJsDataStructure); // Reconsituted.
     * </pre>
     */
    DataFrame.deserialize = function (input) {
        var indexValues = input.index && input.index.values || [];
        var rows = input.values && input.values || [];
        var cloned = false;
        // Deserialize dates.
        if (input.columns) {
            try {
                for (var _a = __values(Object.keys(input.columns)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var columnName = _b.value;
                    if (input.columns[columnName] !== "date") {
                        continue; // No need to process other types, they are natively supported by JSON.
                    }
                    if (!cloned) {
                        rows = rows.map(function (row) { return Object.assign({}, row); }); // Clone so we don't modify any original data.
                        cloned = true;
                    }
                    try {
                        for (var rows_2 = __values(rows), rows_2_1 = rows_2.next(); !rows_2_1.done; rows_2_1 = rows_2.next()) {
                            var row = rows_2_1.value;
                            row[columnName] = moment(row[columnName]).toDate(); // Manually deserialize data value.
                        }
                    }
                    catch (e_68_1) { e_68 = { error: e_68_1 }; }
                    finally {
                        try {
                            if (rows_2_1 && !rows_2_1.done && (_c = rows_2.return)) _c.call(rows_2);
                        }
                        finally { if (e_68) throw e_68.error; }
                    }
                }
            }
            catch (e_69_1) { e_69 = { error: e_69_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                }
                finally { if (e_69) throw e_69.error; }
            }
        }
        if (input.index && input.index.type === "date") {
            indexValues = indexValues.map(function (value) { return moment(value).toDate(); }); // Manually deserialize data value.
        }
        return new DataFrame({
            columnNames: input.columnOrder || [],
            index: indexValues,
            values: rows,
        });
        var e_69, _d, e_68, _c;
    };
    /***
     * Allows the dataframe to be queried to confirm that it is actually a dataframe.
     * Used from JavaScript to tell the difference between a Series and a DataFrame.
     *
     * @return Returns the string "dataframe".
     */
    DataFrame.prototype.getTypeCode = function () {
        return "dataframe";
    };
    DataFrame.defaultCountIterable = new CountIterable();
    DataFrame.defaultEmptyIterable = new EmptyIterable();
    return DataFrame;
}());
/**
 * @hidden
 * Represents a dataframe that has been sorted.
 */
var OrderedDataFrame = /** @class */ (function (_super) {
    __extends(OrderedDataFrame, _super);
    function OrderedDataFrame(config) {
        var _this = this;
        var valueSortSpecs = [];
        var pairSortSpecs = [];
        var sortLevel = 0;
        var parent = config.parent;
        var parents = [];
        while (parent !== null) {
            parents.push(parent);
            parent = parent.config.parent;
        }
        parents.reverse();
        try {
            for (var parents_1 = __values(parents), parents_1_1 = parents_1.next(); !parents_1_1.done; parents_1_1 = parents_1.next()) {
                var parent_1 = parents_1_1.value;
                var parentConfig = parent_1.config;
                valueSortSpecs.push(OrderedDataFrame.makeSortSpec(sortLevel, parentConfig.selector, parentConfig.direction));
                pairSortSpecs.push(OrderedDataFrame.makeSortSpec(sortLevel, OrderedDataFrame.makePairsSelector(parentConfig.selector), parentConfig.direction));
                ++sortLevel;
            }
        }
        catch (e_70_1) { e_70 = { error: e_70_1 }; }
        finally {
            try {
                if (parents_1_1 && !parents_1_1.done && (_a = parents_1.return)) _a.call(parents_1);
            }
            finally { if (e_70) throw e_70.error; }
        }
        valueSortSpecs.push(OrderedDataFrame.makeSortSpec(sortLevel, config.selector, config.direction));
        pairSortSpecs.push(OrderedDataFrame.makeSortSpec(sortLevel, OrderedDataFrame.makePairsSelector(config.selector), config.direction));
        _this = _super.call(this, {
            columnNames: config.columnNames,
            values: new OrderedIterable(config.values, valueSortSpecs),
            pairs: new OrderedIterable(config.pairs, pairSortSpecs)
        }) || this;
        _this.config = config;
        return _this;
        var e_70, _a;
    }
    //
    // Helper function to create a sort spec.
    //
    OrderedDataFrame.makeSortSpec = function (sortLevel, selector, direction) {
        return { sortLevel: sortLevel, selector: selector, direction: direction };
    };
    //
    // Helper function to make a sort selector for pairs, this captures the parent correct when generating the closure.
    //
    OrderedDataFrame.makePairsSelector = function (selector) {
        return function (pair, index) { return selector(pair[1], index); };
    };
    /**
     * Applys additional sorting (ascending) to an already sorted dataframe.
     *
     * @param selector User-defined selector that selects the additional value to sort by.
     *
     * @return Returns a new dataframe has been additionally sorted by the value chosen by the selector function.
     *
     * @example
     * <pre>
     *
     * // Order sales by salesperson and then by amount (from least to most).
     * const orderedDf = salesDf.orderBy(sale => sale.SalesPerson).thenBy(sale => sale.Amount);
     * </pre>
     */
    OrderedDataFrame.prototype.thenBy = function (selector) {
        return new OrderedDataFrame({
            columnNames: this.config.columnNames,
            values: this.config.values,
            pairs: this.config.pairs,
            selector: selector,
            direction: Direction.Ascending,
            parent: this,
        });
    };
    /**
     * Applys additional sorting (descending) to an already sorted dataframe.
     *
     * @param selector User-defined selector that selects the additional value to sort by.
     *
     * @return Returns a new dataframe has been additionally sorted by the value chosen by the selector function.
     *
     * @example
     * <pre>
     *
     * // Order sales by salesperson and then by amount (from most to least).
     * const orderedDf = salesDf.orderBy(sale => sale.SalesPerson).thenByDescending(sale => sale.Amount);
     * </pre>
     */
    OrderedDataFrame.prototype.thenByDescending = function (selector) {
        return new OrderedDataFrame({
            columnNames: this.config.columnNames,
            values: this.config.values,
            pairs: this.config.pairs,
            selector: selector,
            direction: Direction.Descending,
            parent: this,
        });
    };
    return OrderedDataFrame;
}(DataFrame));

moment.extend(customParseFormat);
/**
 * Specifies where from a data window the index is pulled from: the start of the window, the end or from the middle.
 */
var WhichIndex;
(function (WhichIndex) {
    WhichIndex["Start"] = "start";
    WhichIndex["End"] = "end";
})(WhichIndex || (WhichIndex = {}));
/**
 * Class that represents a series containing a sequence of indexed values.
 */
var Series = /** @class */ (function () {
    /**
     * Create a series.
     *
     * @param config This can be an array, a configuration object or a function that lazily produces a configuration object.
     *
     * It can be an array that specifies the values that the series contains.
     *
     * It can be a {@link ISeriesConfig} that defines the values and configuration of the series.
     *
     * Or it can be a function that lazily produces a {@link ISeriesConfig}.
     *
     * @example
     * <pre>
     *
     * const series = new Series();
     * </pre>
     *
     * @example
     * <pre>
     *
     * const series = new Series([10, 20, 30, 40]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const series = new Series({ index: [1, 2, 3, 4], values: [10, 20, 30, 40]});
     * </pre>
     *
     * @example
     * <pre>
     *
     * const lazyInit = () => ({ index: [1, 2, 3, 4], values: [10, 20, 30, 40] });
     * const series = new Series(lazyInit);
     * </pre>
     */
    function Series(config) {
        //
        // Function to lazy evaluate the configuration of the series.
        //
        this.configFn = null;
        //
        // The content of the series.
        // When this is null it means the series is yet to be lazy initialised.
        //
        this.content = null;
        if (config) {
            if (isFunction(config)) {
                this.configFn = config;
            }
            else if (isArray(config) ||
                isFunction(config[Symbol.iterator])) {
                this.content = Series.initFromArray(config);
            }
            else {
                this.content = Series.initFromConfig(config);
            }
        }
        else {
            this.content = Series.initEmpty();
        }
    }
    //
    // Initialise series content from an array of values.
    //
    Series.initFromArray = function (arr) {
        return {
            index: Series.defaultCountIterable,
            values: arr,
            pairs: new MultiIterable([Series.defaultCountIterable, arr]),
            isBaked: true,
        };
    };
    //
    // Initialise an empty series.
    //
    Series.initEmpty = function () {
        return {
            index: Series.defaultEmptyIterable,
            values: Series.defaultEmptyIterable,
            pairs: Series.defaultEmptyIterable,
            isBaked: true,
        };
    };
    //
    // Check that a value is an interable.
    //
    Series.checkIterable = function (input, fieldName) {
        if (isArray(input)) ;
        else if (isFunction(input[Symbol.iterator])) ;
        else {
            // Not ok
            throw new Error("Expected '" + fieldName + "' field of Series config object to be an array of values or an iterable of values.");
        }
    };
    //
    // Initialise series content from a config object.
    //
    Series.initFromConfig = function (config) {
        var index;
        var values;
        var pairs;
        var isBaked = false;
        if (config.pairs) {
            Series.checkIterable(config.pairs, "pairs");
            pairs = config.pairs;
        }
        if (config.index) {
            Series.checkIterable(config.index, "index");
            index = config.index;
        }
        else if (pairs) {
            index = new ExtractElementIterable(pairs, 0);
        }
        else {
            index = Series.defaultCountIterable;
        }
        if (config.values) {
            Series.checkIterable(config.values, "values");
            values = config.values;
        }
        else if (pairs) {
            values = new ExtractElementIterable(pairs, 1);
        }
        else {
            values = Series.defaultEmptyIterable;
        }
        if (!pairs) {
            pairs = new MultiIterable([index, values]);
        }
        if (config.baked !== undefined) {
            isBaked = config.baked;
        }
        return {
            index: index,
            values: values,
            pairs: pairs,
            isBaked: isBaked,
        };
    };
    //
    // Ensure the series content has been initialised.
    //
    Series.prototype.lazyInit = function () {
        if (this.content === null && this.configFn !== null) {
            this.content = Series.initFromConfig(this.configFn());
        }
    };
    //
    // Ensure the series content is lazy initalised and return it.
    //
    Series.prototype.getContent = function () {
        this.lazyInit();
        return this.content;
    };
    /**
     * Get an iterator to enumerate the values of the series.
     * Enumerating the iterator forces lazy evaluation to complete.
     * This function is automatically called by `for...of`.
     *
     * @return An iterator for the series.
     *
     * @example
     * <pre>
     *
     * for (const value of series) {
     *     // ... do something with the value ...
     * }
     * </pre>
     */
    Series.prototype[Symbol.iterator] = function () {
        return this.getContent().values[Symbol.iterator]();
    };
    /**
     * Cast the value of the series to a new type.
     * This operation has no effect but to retype the values that the series contains.
     *
     * @return The same series, but with the type changed.
     *
     * @example
     * <pre>
     *
     * const castSeries = series.cast<SomeOtherType>();
     * </pre>
     */
    Series.prototype.cast = function () {
        return this;
    };
    /**
     * Get the index for the series.
     *
     * @return The {@link Index} for the series.
     *
     * @example
     * <pre>
     *
     * const index = series.getIndex();
     * </pre>
     */
    Series.prototype.getIndex = function () {
        var _this = this;
        return new Index(function () { return ({ values: _this.getContent().index }); });
    };
    /**
     * Apply a new {@link Index} to the series.
     *
     * @param newIndex The new array or iterable to be the new {@link Index} of the series. Can also be a selector to choose the {@link Index} for each value in the series.
     *
     * @return Returns a new series with the specified {@link Index} attached.
     *
     * @example
     * <pre>
     *
     * const indexedSeries = series.withIndex([10, 20, 30]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const indexedSeries = series.withIndex(someOtherSeries);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const indexedSeries = series.withIndex(value => computeIndexFromValue(value));
     * </pre>
     *
     * @example
     * <pre>
     *
     * const indexedSeries = series.withIndex(value => value + 20);
     * </pre>
     */
    Series.prototype.withIndex = function (newIndex) {
        var _this = this;
        if (isFunction(newIndex)) {
            return new Series(function () { return ({
                values: _this.getContent().values,
                index: _this.select(newIndex),
            }); });
        }
        else {
            Series.checkIterable(newIndex, 'newIndex');
            return new Series(function () { return ({
                values: _this.getContent().values,
                index: newIndex,
            }); });
        }
    };
    /**
     * Resets the {@link Index} of the series back to the default zero-based sequential integer index.
     *
     * @return Returns a new series with the {@link Index} reset to the default zero-based index.
     *
     * @example
     * <pre>
     *
     * const seriesWithResetIndex = series.resetIndex();
     * </pre>
     */
    Series.prototype.resetIndex = function () {
        var _this = this;
        return new Series(function () { return ({
            values: _this.getContent().values // Just strip the index.
        }); });
    };
    /**
     * Merge multiple series into a single series.
     * Values are merged by index.
     * Values at each index are combined into arrays in the resulting series.
     *
     * @param series An array or series of series to merge.
     *
     * @returns The merged series.
     *
     * @example
     * <pre>
     *
     * const mergedSeries = Series.merge([series1, series2, etc]);
     * </pre>
     */
    Series.merge = function (series) {
        var rowMap = new Map();
        var numSeries = Array.from(series).length; //TODO: Be nice not to have to do this.
        var seriesIndex = 0;
        try {
            for (var series_1 = __values(series), series_1_1 = series_1.next(); !series_1_1.done; series_1_1 = series_1.next()) {
                var workingSeries = series_1_1.value;
                try {
                    for (var _a = __values(workingSeries.toPairs()), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var pair = _b.value;
                        var index = pair[0];
                        if (!rowMap.has(index)) {
                            rowMap.set(index, new Array(numSeries));
                        }
                        rowMap.get(index)[seriesIndex] = pair[1];
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                ++seriesIndex;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (series_1_1 && !series_1_1.done && (_d = series_1.return)) _d.call(series_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var mergedPairs = Array.from(rowMap.keys())
            .map(function (index) { return [index, rowMap.get(index)]; });
        mergedPairs.sort(function (a, b) {
            if (a[0] === b[0]) {
                return 0;
            }
            else if (a[0] > b[0]) {
                return 1;
            }
            else {
                return -1;
            }
        });
        return new Series({
            pairs: mergedPairs,
        });
        var e_2, _d, e_1, _c;
    };
    /**
      * Merge one or more series into this series.
      * Values are merged by index.
      * Values at each index are combined into arrays in the resulting series.
      *
      * @param series... One or more other series to merge into the series.
      *
      * @returns The merged series.
      *
      * @example
      * <pre>
      *
      * const mergedSeries = series1.merge(series2);
      * </pre>
      *
      * <pre>
      *
      * const mergedSeries = series1.merge(series2, series3, etc);
      * </pre>
      */
    Series.prototype.merge = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return Series.merge([this].concat(args));
    };
    /**
    * Extract values from the series as an array.
    * This forces lazy evaluation to complete.
    *
    * @return Returns an array of the values contained within the series.
    *
    * @example
    * <pre>
    * const values = series.toArray();
    * </pre>
    */
    Series.prototype.toArray = function () {
        var values = [];
        try {
            for (var _a = __values(this.getContent().values), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                if (value !== undefined && value !== null) {
                    values.push(value);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return values;
        var e_3, _c;
    };
    /**
     * Retreive the index, values pairs from the series as an array.
     * Each pair is [index, value].
     * This forces lazy evaluation to complete.
     *
     * @return Returns an array of pairs that contains the series values. Each pair is a two element array that contains an index and a value.
     *
     * @example
     * <pre>
     * const pairs = series.toPairs();
     * </pre>
     */
    Series.prototype.toPairs = function () {
        var pairs = [];
        try {
            for (var _a = __values(this.getContent().pairs), _b = _a.next(); !_b.done; _b = _a.next()) {
                var pair = _b.value;
                if (pair[1] !== undefined && pair[1] !== null) {
                    pairs.push(pair);
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return pairs;
        var e_4, _c;
    };
    /**
     * Convert the series to a JavaScript object.
     *
     * @param keySelector User-defined selector function that selects keys for the resulting object.
     * @param valueSelector User-defined selector function that selects values for the resulting object.
     *
     * @return Returns a JavaScript object generated from the series by applying the key and value selector functions.
     *
     * @example
     * <pre>
     *
     * const someObject = series.toObject(
     *      value => value, // Specify the value to use for field names in the output object.
     *      value => value // Specify the value to use as the value for each field.
     * );
     * </pre>
     */
    Series.prototype.toObject = function (keySelector, valueSelector) {
        if (!isFunction(keySelector))
            throw new Error("Expected 'keySelector' parameter to Series.toObject to be a function.");
        if (!isFunction(valueSelector))
            throw new Error("Expected 'valueSelector' parameter to Series.toObject to be a function.");
        return toMap(this, keySelector, valueSelector);
    };
    /**
     * Generates a new series by repeatedly calling a user-defined selector function on each value in the original series.
     *
     * @param selector A user-defined selector function that transforms each row to create the new dataframe.
     *
     * @return Returns a new series with each value transformed by the selector function.
     *
     * @example
     * <pre>
     *
     * function transformValue (inputValue) {
     *      const outputValue = {
     *          // ... construct output value derived from input value ...
     *      };
     *
     *      return outputValue;
     * }
     *
     * const transformedSeries = series.select(value => transformValue(value));
     * </pre>
     */
    Series.prototype.select = function (selector) {
        var _this = this;
        if (!isFunction(selector))
            throw new Error("Expected 'selector' parameter to 'Series.select' function to be a function.");
        return new Series(function () { return ({
            values: new SelectIterable(_this.getContent().values, selector),
            index: _this.getContent().index,
        }); });
    };
    /**
     * Generates a new series by repeatedly calling a user-defined selector function on each row in the original series.
     *
     * Similar to the {@link select} function, but in this case the selector function produces a collection of output values that are flattened and merged to create the new series.
     *
     * @param selector A user-defined selector function that transforms each value into a collection of output values.
     *
     * @return Returns a new series where each value has been transformed into 0 or more new values by the selector function.
     *
     * @example
     * <pre>
     *
     * function produceOutputValues (inputValue) {
     *      const outputValues = [];
     *      while (someCondition) {
     *          // ... generate zero or more output values ...
     *          outputValues.push(... some generated value ...);
     *      }
     *      return outputValues;
     * }
     *
     * const modifiedSeries = series.selectMany(value => produceOutputValues(value));
     * </pre>
     */
    Series.prototype.selectMany = function (selector) {
        var _this = this;
        if (!isFunction(selector))
            throw new Error("Expected 'selector' parameter to 'Series.selectMany' to be a function.");
        return new Series(function () { return ({
            pairs: new SelectManyIterable(_this.getContent().pairs, function (pair, index) {
                var outputPairs = [];
                try {
                    for (var _a = __values(selector(pair[1], index)), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var transformed = _b.value;
                        outputPairs.push([
                            pair[0],
                            transformed
                        ]);
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                return outputPairs;
                var e_5, _c;
            })
        }); });
    };
    /**
     * Partition a series into a {@link Series} of *data windows*.
     * Each value in the new series is a chunk of data from the original series.
     *
     * @param period The number of values to include in each data window.
     * @param [whichIndex] Sets which side of the window the index comes from: start or end. Can be "start" or "end", defaults to "end".
     *
     * @return Returns a new series, each value of which is a chunk (data window) of the original series.
     *
     * @example
     * <pre>
     *
     * const windows = series.window(2); // Get values in pairs.
     * const pctIncrease = windows.select(pair => (pair.last() - pair.first()) / pair.first());
     * console.log(pctIncrease.toString());
     * </pre>
     *
     * @example
     * <pre>
     *
     * const salesDf = ... // Daily sales data.
     * const weeklySales = salesDf.window(7); // Partition up into weekly data sets.
     * console.log(weeklySales.toString());
     * </pre>
     */
    Series.prototype.window = function (period, whichIndex) {
        var _this = this;
        if (!isNumber(period))
            throw new Error("Expected 'period' parameter to 'Series.window' to be a number.");
        return new Series(function () { return ({
            pairs: new SeriesWindowIterable(_this.getContent().pairs, period, whichIndex || WhichIndex.End),
        }); });
    };
    /**
     * Partition a series into a new series of *rolling data windows*.
     * Each value in the new series is a rolling chunk of data from the original series.
     *
     * @param period The number of data values to include in each data window.
     * @param [whichIndex] Sets which side of the window the index comes from: start or end. Can be "start" or "end", defaults to "end".
     *
     * @return Returns a new series, each value of which is a rolling chunk of the original series.
     *
     * @example
     * <pre>
     *
     * const salesData = ... // Daily sales data.
     * const rollingWeeklySales = salesData.rollingWindow(7); // Get rolling window over weekly sales data.
     * console.log(rollingWeeklySales.toString());
     * </pre>
     */
    Series.prototype.rollingWindow = function (period, whichIndex) {
        var _this = this;
        if (!isNumber(period))
            throw new Error("Expected 'period' parameter to 'Series.rollingWindow' to be a number.");
        return new Series(function () { return ({
            pairs: new SeriesRollingWindowIterable(_this.getContent().pairs, period, whichIndex || WhichIndex.End),
        }); });
    };
    /**
     * Partition a series into a new series of variable-length *data windows*
     * where the divisions between the data chunks are
     * defined by a user-provided *comparer* function.
     *
     * @param comparer Function that compares two adjacent data values and returns true if they should be in the same window.
     *
     * @return Returns a new series, each value of which is a chunk of data from the original series.
     *
     * @example
     * <pre>
     *
     * function rowComparer (valueA, valueB) {
     *      if (... valueA should be in the same data window as valueB ...) {
     *          return true;
     *      }
     *      else {
     *          return false;
     *      }
     * };
     *
     * const variableWindows = series.variableWindow(rowComparer);
     */
    Series.prototype.variableWindow = function (comparer) {
        var _this = this;
        if (!isFunction(comparer))
            throw new Error("Expected 'comparer' parameter to 'Series.variableWindow' to be a function.");
        return new Series(function () { return ({
            values: new SeriesVariableWindowIterable(_this.getContent().pairs, comparer)
        }); });
    };
    /**
     * Eliminates adjacent duplicate values.
     *
     * For each group of adjacent values that are equivalent only returns the last index/row for the group,
     * thus ajacent equivalent values are collapsed down to the last value.
     *
     * @param [selector] Optional selector function to determine the value used to compare for equivalence.
     *
     * @return Returns a new series with groups of adjacent duplicate vlaues collapsed to a single value per group.
     *
     * @example
     * <pre>
     *
     * const seriesWithDuplicateRowsRemoved = series.sequentialDistinct(value => value);
     *
     * // Or
     * const seriesWithDuplicateRowsRemoved = series.sequentialDistinct(value => value.someNestedField);
     * </pre>
     */
    Series.prototype.sequentialDistinct = function (selector) {
        if (selector) {
            if (!isFunction(selector))
                throw new Error("Expected 'selector' parameter to 'Series.sequentialDistinct' to be a selector function that determines the value to compare for duplicates.");
        }
        else {
            selector = function (value) { return value; };
        }
        return this.variableWindow(function (a, b) { return selector(a) === selector(b); })
            .select(function (window) {
            return [window.getIndex().first(), window.first()];
        })
            .withIndex(function (pair) { return pair[0]; })
            .select(function (pair) { return pair[1]; });
    };
    /**
     * Aggregate the values in the series to a single result.
     *
     * @param [seed] Optional seed value for producing the aggregation.
     * @param selector Function that takes the seed and then each value in the series and produces the aggregated value.
     *
     * @return Returns a new value that has been aggregated from the series using the 'selector' function.
     *
     * @example
     * <pre>
     *
     * const dailySales = ... daily sales figures for the past month ...
     * const totalSalesForthisMonth = dailySales.aggregate(
     *      0, // Seed - the starting value.
     *      (accumulator, salesAmount) => accumulator + salesAmount // Aggregation function.
     * );
     * </pre>
     *
     * @example
     * <pre>
     *
     * const totalSalesAllTime = 500; // We'll seed the aggregation with this value.
     * const dailySales = ... daily sales figures for the past month ...
     * const updatedTotalSalesAllTime = dailySales.aggregate(
     *      totalSalesAllTime,
     *      (accumulator, salesAmount) => accumulator + salesAmount
     * );
     * </pre>
     *
     * @example
     * <pre>
     *
     * var salesDataSummary = salesData.aggregate({
     *      TotalSales: series => series.count(),
     *      AveragePrice: series => series.average(),
     *      TotalRevenue: series => series.sum(),
     * });
     * </pre>
    */
    Series.prototype.aggregate = function (seedOrSelector, selector) {
        if (isFunction(seedOrSelector) && !selector) {
            return this.skip(1).aggregate(this.first(), seedOrSelector);
        }
        else {
            if (!isFunction(selector))
                throw new Error("Expected 'selector' parameter to aggregate to be a function.");
            var accum = seedOrSelector;
            try {
                for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var value = _b.value;
                    accum = selector(accum, value);
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_6) throw e_6.error; }
            }
            return accum;
        }
        var e_6, _c;
    };
    /**
     * Compute the absolute range of values in each period.
     * The range for each period is the absolute difference between largest (max) and smallest (min) values in that period.
     *
     * @param period - Period for computing the range.
     *
     * @returns Returns a new series where each value indicates the absolute range of values for each period in the original series.
     *
     * @example
     * <pre>
     *
     * const closingPrice = ... series of closing prices for a particular stock ...
     * const volatility = closingPrice.amountRange(5);
     * </pre>
     */
    Series.prototype.amountRange = function (period, whichIndex) {
        return this // Have to assume this is a number series.
            .rollingWindow(period, whichIndex)
            .select(function (window) { return window.max() - window.min(); });
    };
    /**
     * Compute the range of values in each period in proportion to the latest value.
     * The range for each period is the absolute difference between largest (max) and smallest (min) values in that period.
     * Proportions are expressed as 0-1 values.
     *
     * @param period - Period for computing the range.
     *
     * @returns Returns a new series where each value indicates the proportion change from the previous number value in the original series.
     *
     * @returns Returns a new series where each value indicates the proportionate range of values for each period in the original series.
     *
     * @example
     * <pre>
     *
     * const closingPrice = ... series of closing prices for a particular stock ...
     * const proportionVolatility = closingPrice.proportionRange(5);
     * </pre>
     */
    Series.prototype.proportionRange = function (period, whichIndex) {
        return this // Have to assume this is a number series.
            .rollingWindow(period, whichIndex)
            .select(function (window) { return (window.max() - window.min()) / window.last(); });
    };
    /**
     * Compute the range of values in each period in proportion to the latest value.
     * The range for each period is the absolute difference between largest (max) and smallest (min) values in that period.
     * Proportions are expressed as 0-1 values.
     *
     * @param period - Period for computing the range.
     *
     * @returns Returns a new series where each value indicates the proportion change from the previous number value in the original series.
     *
     * @returns Returns a new series where each value indicates the proportionate range of values for each period in the original series.
     *
     * @example
     * <pre>
     *
     * const closingPrice = ... series of closing prices for a particular stock ...
     * const percentVolatility = closingPrice.percentRange(5);
     * </pre>
     */
    Series.prototype.percentRange = function (period, whichIndex) {
        return this.proportionRange(period, whichIndex).select(function (v) { return v * 100; });
    };
    /**
     * Compute the amount of change between pairs or sets of values in the series.
     *
     * @param [period] Optional period for computing the change - defaults to 2.
     *
     * @returns Returns a new series where each value indicates the amount of change from the previous number value in the original series.
     *
     * @example
     * <pre>
     *
     * const saleFigures = ... running series of daily sales figures ...
     * const amountChanged = salesFigures.amountChanged(); // Amount that sales has changed, day to day.
     * </pre>
     * @example
     * <pre>
     *
     * const saleFigures = ... running series of daily sales figures ...
     * const amountChanged = salesFigures.amountChanged(7); // Amount that sales has changed, week to week.
     * </pre>
     */
    Series.prototype.amountChange = function (period, whichIndex) {
        return this // Have to assume this is a number series.
            .rollingWindow(period === undefined ? 2 : period, whichIndex)
            .select(function (window) { return window.last() - window.first(); });
    };
    /**
     * Compute the proportion change between pairs or sets of values in the series.
     * Proportions are expressed as 0-1 values.
     *
     * @param [period] Optional period for computing the proportion - defaults to 2.
     *
     * @returns Returns a new series where each value indicates the proportion change from the previous number value in the original series.
     *
     * @example
     * <pre>
     *
     * const saleFigures = ... running series of daily sales figures ...
     * const proportionChanged = salesFigures.amountChanged(); // Proportion that sales has changed, day to day.
     * </pre>
     * @example
     * <pre>
     *
     * const saleFigures = ... running series of daily sales figures ...
     * const proportionChanged = salesFigures.amountChanged(7); // Proportion that sales has changed, week to week.
     * </pre>
     */
    Series.prototype.proportionChange = function (period, whichIndex) {
        return this // Have to assume this is a number series.
            .rollingWindow(period === undefined ? 2 : period, whichIndex)
            .select(function (window) { return (window.last() - window.first()) / window.first(); });
    };
    /**
     * Compute the percentage change between pairs or sets of values in the series.
     * Percentages are expressed as 0-100 values.
     *
     * @param [period] Optional period for computing the percentage - defaults to 2.
     *
     * @returns Returns a new series where each value indicates the percent change from the previous number value in the original series.
     *
     * @example
     * <pre>
     *
     * const saleFigures = ... running series of daily sales figures ...
     * const percentChanged = salesFigures.amountChanged(); // Percent that sales has changed, day to day.
     * </pre>
     * @example
     * <pre>
     *
     * const saleFigures = ... running series of daily sales figures ...
     * const percentChanged = salesFigures.amountChanged(7); // Percent that sales has changed, week to week.
     * </pre>
     */
    Series.prototype.percentChange = function (period, whichIndex) {
        return this.proportionChange(period, whichIndex).select(function (v) { return v * 100; });
    };
    /**
     * For each period, compute the proportion of values that are less than the last value in the period.
     * Proportions are expressed as 0-1 values.
     *
     * @param [period] Optional period for computing the proportion rank - defaults to 2.
     *
     * @returns Returns a new series where each value indicates the proportion rank value for that period.
     *
     * @example
     * <pre>
     *
     * const proportionRank = series.proportionRank();
     * </pre>
     * @example
     * <pre>
     *
     * const proportionRank = series.proportionRank(100);
     * </pre>
     */
    Series.prototype.proportionRank = function (period) {
        if (period === undefined) {
            period = 2;
        }
        if (!isNumber(period)) {
            throw new Error("Expected 'period' parameter to 'Series.proportionRank' to be a number that specifies the time period for the ranking.");
        }
        return this.rollingWindow(period + 1) // +1 to account for the last value being used.
            .select(function (window) {
            var latestValue = window.last();
            var numLowerValues = window.head(-1).where(function (prevMomentum) { return prevMomentum < latestValue; }).count();
            var proportionRank = numLowerValues / period;
            return proportionRank;
        });
    };
    /**
     * For each period, compute the percent of values that are less than the last value in the period.
     * Percent are expressed as 0-100 values.
     *
     * @param [period] Optional period for computing the percent rank - defaults to 2.
     *
     * @returns Returns a new series where each value indicates the percent rank value for that period.
     *
     * @example
     * <pre>
     *
     * const percentRank = series.percentRank();
     * </pre>
     * @example
     * <pre>
     *
     * const percentRank = series.percentRank(100);
     * </pre>
     */
    Series.prototype.percentRank = function (period) {
        if (period === undefined) {
            period = 2;
        }
        if (!isNumber(period)) {
            throw new Error("Expected 'period' parameter to 'Series.percentRank' to be a number that specifies the time period for the ranking.");
        }
        return this.proportionRank(period).select(function (proportion) { return proportion * 100; });
    };
    /**
     * Skip a number of values in the series.
     *
     * @param numValues Number of values to skip.
     *
     * @return Returns a new series with the specified number of values skipped.
     *
     * @example
     * <pre>
     *
     * const seriesWithRowsSkipped = series.skip(10); // Skip 10 rows in the original series.
     * </pre>
     */
    Series.prototype.skip = function (numValues) {
        var _this = this;
        return new Series(function () { return ({
            values: new SkipIterable(_this.getContent().values, numValues),
            index: new SkipIterable(_this.getContent().index, numValues),
            pairs: new SkipIterable(_this.getContent().pairs, numValues),
        }); });
    };
    /**
     * Skips values in the series while a condition evaluates to true or truthy.
     *
     * @param predicate Returns true/truthy to continue to skip values in the original series.
     *
     * @return Returns a new series with all initial sequential values removed while the predicate returned true/truthy.
     *
     * @example
     * <pre>
     *
     * const seriesWithRowsSkipped = series.skipWhile(salesFigure => salesFigure > 100); // Skip initial sales figure that are less than 100.
     * </pre>
     */
    Series.prototype.skipWhile = function (predicate) {
        var _this = this;
        if (!isFunction(predicate))
            throw new Error("Expected 'predicate' parameter to 'Series.skipWhile' function to be a predicate function that returns true/false.");
        return new Series(function () { return ({
            values: new SkipWhileIterable(_this.getContent().values, predicate),
            pairs: new SkipWhileIterable(_this.getContent().pairs, function (pair) { return predicate(pair[1]); }),
        }); });
    };
    /**
     * Skips values in the series untils a condition evaluates to true or truthy.
     *
     * @param predicate Return true/truthy to stop skipping values in the original series.
     *
     * @return Returns a new series with all initial sequential values removed until the predicate returned true/truthy.
     *
     * @example
     * <pre>
     *
     * const seriesWithRowsSkipped = series.skipUntil(salesFigure => salesFigure > 100); // Skip initial sales figures unitl we see one greater than 100.
     * </pre>
     */
    Series.prototype.skipUntil = function (predicate) {
        if (!isFunction(predicate))
            throw new Error("Expected 'predicate' parameter to 'Series.skipUntil' function to be a predicate function that returns true/false.");
        return this.skipWhile(function (value) { return !predicate(value); });
    };
    /**
     * Take a number of  values from the series.
     *
     * @param numValues Number of values to take.
     *
     * @return Returns a new series with only the specified number of values taken from the original series.
     *
     * @example
     * <pre>
     *
     * const seriesWithRowsTaken = series.take(15); // Take only the first 15 values from the original series.
     * </pre>
     */
    Series.prototype.take = function (numRows) {
        var _this = this;
        if (!isNumber(numRows))
            throw new Error("Expected 'numRows' parameter to 'Series.take' function to be a number.");
        return new Series(function () { return ({
            index: new TakeIterable(_this.getContent().index, numRows),
            values: new TakeIterable(_this.getContent().values, numRows),
            pairs: new TakeIterable(_this.getContent().pairs, numRows)
        }); });
    };
    /**
     * Takes values from the series while a condition evaluates to true or truthy.
     *
     * @param predicate Returns true/truthy to continue to take values from the original series.
     *
     * @return Returns a new series with only the initial sequential values that were taken while the predicate returned true/truthy.
     *
     * @example
     * <pre>
     *
     * const seriesWithRowsTaken = series.takeWhile(salesFigure => salesFigure > 100); // Take only initial sales figures that are greater than 100.
     * </pre>
     */
    Series.prototype.takeWhile = function (predicate) {
        var _this = this;
        if (!isFunction(predicate))
            throw new Error("Expected 'predicate' parameter to 'Series.takeWhile' function to be a predicate function that returns true/false.");
        return new Series(function () { return ({
            values: new TakeWhileIterable(_this.getContent().values, predicate),
            pairs: new TakeWhileIterable(_this.getContent().pairs, function (pair) { return predicate(pair[1]); })
        }); });
    };
    /**
     * Takes values from the series until a condition evaluates to true or truthy.
     *
     * @param predicate Return true/truthy to stop taking values in the original series.
     *
     * @return Returns a new series with only the initial sequential values taken until the predicate returned true/truthy.
     *
     * @example
     * <pre>
     *
     * const seriesWithRowsTaken = series.takeUntil(salesFigure => salesFigure > 100); // Take all initial sales figures until we see one that is greater than 100.
     * </pre>
     */
    Series.prototype.takeUntil = function (predicate) {
        if (!isFunction(predicate))
            throw new Error("Expected 'predicate' parameter to 'Series.takeUntil' function to be a predicate function that returns true/false.");
        return this.takeWhile(function (value) { return !predicate(value); });
    };
    /**
     * Static version of the count function for use with summarize and pivot functions.
     *
     * @param series Input series to be counted.
     *
     * @returns Returns the count of values in the series.
     *
     * @example
     * <pre>
     *
     * const summary = dataFrame.summarize({
     *      ColumnToBeCounted: Series.count,
     * });
     * </pre>
     */
    Series.count = function (series) {
        return series.count();
    };
    /**
     * Count the number of values in the seriese
     *
     * @return Returns the count of all values.
     *
     * @example
     * <pre>
     *
     * const numValues = series.count();
     * </pre>
     */
    Series.prototype.count = function () {
        var total = 0;
        try {
            for (var _a = __values(this.getContent().values), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                ++total;
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return total;
        var e_7, _c;
    };
    /**
     * Get the first value of the series.
     *
     * @return Returns the first value of the series.
     *
     * @example
     * <pre>
     *
     * const firstValue = series.first();
     * </pre>
     */
    Series.prototype.first = function () {
        try {
            for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                return value; // Only need the first value.
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_8) throw e_8.error; }
        }
        throw new Error("Series.first: No values in Series.");
        var e_8, _c;
    };
    /**
     * Get the last value of the series.
     *
     * @return Returns the last value of the series.
     *
     * @example
     * <pre>
     *
     * const lastValue = series.last();
     * </pre>
     */
    Series.prototype.last = function () {
        var lastValue = null;
        try {
            for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                lastValue = value; // Throw away all values until we get to the last one.
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_9) throw e_9.error; }
        }
        if (lastValue === null) {
            throw new Error("Series.last: No values in Series.");
        }
        return lastValue;
        var e_9, _c;
    };
    /**
     * Get the value, if there is one, with the specified index.
     *
     * @param index Index to for which to retreive the value.
     *
     * @return Returns the value from the specified index in the series or undefined if there is no such index in the present in the series.
     *
     * @example
     * <pre>
     *
     * const value = series.at(5); // Get the value at index 5 (with a default 0-based index).
     * </pre>
     *
     * @example
     * <pre>
     *
     * const date = ... some date ...
     * // Retreive the value with specified date from a time-series (assuming date indexed has been applied).
     * const value = series.at(date);
     * </pre>
     */
    Series.prototype.at = function (index) {
        if (this.none()) {
            return undefined;
        }
        try {
            //
            // This is pretty expensive.
            // A specialised index could improve this.
            //
            for (var _a = __values(this.getContent().pairs), _b = _a.next(); !_b.done; _b = _a.next()) {
                var pair = _b.value;
                if (pair[0] === index) {
                    return pair[1];
                }
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_10) throw e_10.error; }
        }
        return undefined;
        var e_10, _c;
    };
    /**
     * Get X value from the start of the series.
     * Pass in a negative value to get all values at the head except for X values at the tail.
     *
     * @param numValues Number of values to take.
     *
     * @return Returns a new series that has only the specified number of values taken from the start of the original series.
     *
     * @examples
     * <pre>
     *
     * const sample = series.head(10); // Take a sample of 10 values from the start of the series.
     * </pre>
     */
    Series.prototype.head = function (numValues) {
        if (!isNumber(numValues))
            throw new Error("Expected 'numValues' parameter to 'Series.head' function to be a number.");
        if (numValues === 0) {
            return new Series(); // Empty series.
        }
        var toTake = numValues < 0 ? this.count() - Math.abs(numValues) : numValues;
        return this.take(toTake);
    };
    /**
     * Get X values from the end of the series.
     * Pass in a negative value to get all values at the tail except X values at the head.
     *
     * @param numValues Number of values to take.
     *
     * @return Returns a new series that has only the specified number of values taken from the end of the original series.
     *
     * @examples
     * <pre>
     *
     * const sample = series.tail(12); // Take a sample of 12 values from the end of the series.
     * </pre>
     */
    Series.prototype.tail = function (numValues) {
        if (!isNumber(numValues))
            throw new Error("Expected 'numValues' parameter to 'Series.tail' function to be a number.");
        if (numValues === 0) {
            return new Series(); // Empty series.
        }
        var toSkip = numValues > 0 ? this.count() - numValues : Math.abs(numValues);
        return this.skip(toSkip);
    };
    /**
     * Filter the series using user-defined predicate function.
     *
     * @param predicate Predicte function to filter values from the series. Returns true/truthy to keep values, or false/falsy to omit values.
     *
     * @return Returns a new series containing only the values from the original series that matched the predicate.
     *
     * @example
     * <pre>
     *
     * const filtered = series.where(salesFigure => salesFigure > 100); // Filter so we only have sales figures greater than 100.
     * </pre>
     */
    Series.prototype.where = function (predicate) {
        var _this = this;
        if (!isFunction(predicate))
            throw new Error("Expected 'predicate' parameter to 'Series.where' function to be a function.");
        return new Series(function () { return ({
            values: new WhereIterable(_this.getContent().values, predicate),
            pairs: new WhereIterable(_this.getContent().pairs, function (pair) { return predicate(pair[1]); })
        }); });
    };
    /**
     * Invoke a callback function for each value in the series.
     *
     * @param callback The calback function to invoke for each value.
     *
     * @return Returns the original series with no modifications.
     *
     * @example
     * <pre>
     *
     * series.forEach(value => {
     *      // ... do something with the value ...
     * });
     * </pre>
     */
    Series.prototype.forEach = function (callback) {
        if (!isFunction(callback))
            throw new Error("Expected 'callback' parameter to 'Series.forEach' to be a function.");
        var index = 0;
        try {
            for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                callback(value, index++);
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_11) throw e_11.error; }
        }
        return this;
        var e_11, _c;
    };
    /**
     * Evaluates a predicate function for every value in the series to determine
     * if some condition is true/truthy for **all** values in the series.
     *
     * @param predicate Predicate function that receives each value. It should returns true/truthy for a match, otherwise false/falsy.
     *
     * @return Returns true if the predicate has returned true or truthy for every value in the series, otherwise returns false. Returns false for an empty series.
     *
     * @example
     * <pre>
     *
     * const result = series.all(salesFigure => salesFigure > 100); // Returns true if all sales figures are greater than 100.
     * </pre>
     */
    Series.prototype.all = function (predicate) {
        if (!isFunction(predicate))
            throw new Error("Expected 'predicate' parameter to 'Series.all' to be a function.");
        var count = 0;
        try {
            for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                if (!predicate(value)) {
                    return false;
                }
                ++count;
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_12) throw e_12.error; }
        }
        return count > 0;
        var e_12, _c;
    };
    /**
     * Evaluates a predicate function for every value in the series to determine
     * if some condition is true/truthy for **any** of values in the series.
     *
     * If no predicate is specified then it simply checks if the series contains more than zero values.
     *
     * @param [predicate] Optional predicate function that receives each value. It should return true/truthy for a match, otherwise false/falsy.
     *
     * @return Returns true if the predicate has returned truthy for any value in the series, otherwise returns false.
     * If no predicate is passed it returns true if the series contains any values at all.
     * Returns false for an empty series.
     *
     * @example
     * <pre>
     *
     * const result = series.any(salesFigure => salesFigure > 100); // Do we have any sales figures greater than 100?
     * </pre>
     *
     * @example
     * <pre>
     *
     * const result = series.any(); // Do we have any sales figures at all?
     * </pre>
     */
    Series.prototype.any = function (predicate) {
        if (predicate) {
            if (!isFunction(predicate))
                throw new Error("Expected 'predicate' parameter to 'Series.any' to be a function.");
        }
        if (predicate) {
            try {
                // Use the predicate to check each value.
                for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var value = _b.value;
                    if (predicate(value)) {
                        return true;
                    }
                }
            }
            catch (e_13_1) { e_13 = { error: e_13_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_13) throw e_13.error; }
            }
        }
        else {
            // Just check if there is at least one item.
            var iterator = this[Symbol.iterator]();
            return !iterator.next().done;
        }
        return false; // Nothing passed.
        var e_13, _c;
    };
    /**
     * Evaluates a predicate function for every value in the series to determine
     * if some condition is true/truthy for **none** of values in the series.
     *
     * If no predicate is specified then it simply checks if the series contains zero values.
     *
     * @param [predicate] Optional predicate function that receives each value. It should return true/truthy for a match, otherwise false/falsy.
     *
     * @return Returns true if the predicate has returned truthy for zero values in the series, otherwise returns false. Returns false for an empty series.
     *
     * @example
     * <pre>
     *
     * const result = series.none(salesFigure => salesFigure > 100); // Do we have zero sales figures greater than 100?
     * </pre>
     *
     * @example
     * <pre>
     *
     * const result = series.none(); // Do we have zero sales figures?
     * </pre>
     */
    Series.prototype.none = function (predicate) {
        if (predicate) {
            if (!isFunction(predicate))
                throw new Error("Expected 'predicate' parameter to 'Series.none' to be a function.");
        }
        if (predicate) {
            try {
                // Use the predicate to check each value.
                for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var value = _b.value;
                    if (predicate(value)) {
                        return false;
                    }
                }
            }
            catch (e_14_1) { e_14 = { error: e_14_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_14) throw e_14.error; }
            }
        }
        else {
            // Just check if empty.
            var iterator = this[Symbol.iterator]();
            return iterator.next().done;
        }
        return true; // Nothing failed the predicate.
        var e_14, _c;
    };
    /**
     * Gets a new series containing all values starting at or after the specified index value.
     *
     * @param indexValue The index value at which to start the new series.
     *
     * @return Returns a new series containing all values starting at or after the specified index value.
     *
     * @example
     * <pre>
     *
     * const series = new Series({
     *      index: [0, 1, 2, 3], // This is the default index.
     *      values: [10, 20, 30, 40],
     * });
     *
     * const lastHalf = series.startAt(2);
     * expect(lastHalf.toArray()).to.eql([30, 40]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const timeSeries = ... a series indexed by date/time ...
     *
     * // Get all values starting at (or after) a particular date.
     * const result = timeSeries.startAt(new Date(2016, 5, 4));
     * </pre>
     */
    Series.prototype.startAt = function (indexValue) {
        var _this = this;
        return new Series(function () {
            var lessThan = _this.getIndex().getLessThan();
            return {
                index: new SkipWhileIterable(_this.getContent().index, function (index) { return lessThan(index, indexValue); }),
                pairs: new SkipWhileIterable(_this.getContent().pairs, function (pair) { return lessThan(pair[0], indexValue); }),
            };
        });
    };
    /**
     * Gets a new series containing all values up until and including the specified index value (inclusive).
     *
     * @param indexValue The index value at which to end the new series.
     *
     * @return Returns a new series containing all values up until and including the specified index value.
     *
     * @example
     * <pre>
     *
     * const series = new Series({
     *      index: [0, 1, 2, 3], // This is the default index.
     *      values: [10, 20, 30, 40],
     * });
     *
     * const firstHalf = series.endAt(1);
     * expect(firstHalf.toArray()).to.eql([10, 20]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const timeSeries = ... a series indexed by date/time ...
     *
     * // Get all values ending at a particular date.
     * const result = timeSeries.endAt(new Date(2016, 5, 4));
     * </pre>
     */
    Series.prototype.endAt = function (indexValue) {
        var _this = this;
        return new Series(function () {
            var lessThanOrEqualTo = _this.getIndex().getLessThanOrEqualTo();
            return {
                index: new TakeWhileIterable(_this.getContent().index, function (index) { return lessThanOrEqualTo(index, indexValue); }),
                pairs: new TakeWhileIterable(_this.getContent().pairs, function (pair) { return lessThanOrEqualTo(pair[0], indexValue); }),
            };
        });
    };
    /**
     * Gets a new series containing all values up to the specified index value (exclusive).
     *
     * @param indexValue The index value at which to end the new series.
     *
     * @return Returns a new series containing all values up to (but not including) the specified index value.
     *
     * @example
     * <pre>
     *
     * const series = new Series({
     *      index: [0, 1, 2, 3], // This is the default index.
     *      values: [10, 20, 30, 40],
     * });
     *
     * const firstHalf = series.before(2);
     * expect(firstHalf.toArray()).to.eql([10, 20]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const timeSeries = ... a series indexed by date/time ...
     *
     * // Get all values before the specified date.
     * const result = timeSeries.before(new Date(2016, 5, 4));
     * </pre>
     */
    Series.prototype.before = function (indexValue) {
        var _this = this;
        return new Series(function () {
            var lessThan = _this.getIndex().getLessThan();
            return {
                index: new TakeWhileIterable(_this.getContent().index, function (index) { return lessThan(index, indexValue); }),
                pairs: new TakeWhileIterable(_this.getContent().pairs, function (pair) { return lessThan(pair[0], indexValue); }),
            };
        });
    };
    /**
     * Gets a new series containing all values after the specified index value (exclusive).
     *
     * @param indexValue The index value after which to start the new series.
     *
     * @return Returns a new series containing all values after the specified index value.
     *
     * @example
     * <pre>
     *
     * const series = new Series({
     *      index: [0, 1, 2, 3], // This is the default index.
     *      values: [10, 20, 30, 40],
     * });
     *
     * const lastHalf = df.before(1);
     * expect(lastHalf.toArray()).to.eql([30, 40]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const timeSerie = ... a series indexed by date/time ...
     *
     * // Get all values after the specified date.
     * const result = timeSeries.after(new Date(2016, 5, 4));
     * </pre>
     */
    Series.prototype.after = function (indexValue) {
        var _this = this;
        return new Series(function () {
            var lessThanOrEqualTo = _this.getIndex().getLessThanOrEqualTo();
            return {
                index: new SkipWhileIterable(_this.getContent().index, function (index) { return lessThanOrEqualTo(index, indexValue); }),
                pairs: new SkipWhileIterable(_this.getContent().pairs, function (pair) { return lessThanOrEqualTo(pair[0], indexValue); }),
            };
        });
    };
    /**
     * Gets a new series containing all values between the specified index values (inclusive).
     *
     * @param startIndexValue The index at which to start the new series.
     * @param endIndexValue The index at which to end the new series.
     *
     * @return Returns a new series containing all values between the specified index values (inclusive).
     *
     * @example
     * <pre>
     *
     * const series = new Series({
     *      index: [0, 1, 2, 3, 4, 6], // This is the default index.
     *      values: [10, 20, 30, 40, 50, 60],
     * });
     *
     * const middleSection = series.between(1, 4);
     * expect(middleSection.toArray()).to.eql([20, 30, 40, 50]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const timeSeries = ... a series indexed by date/time ...
     *
     * // Get all values between the start and end dates (inclusive).
     * const result = timeSeries.after(new Date(2016, 5, 4), new Date(2016, 5, 22));
     * </pre>
     */
    Series.prototype.between = function (startIndexValue, endIndexValue) {
        return this.startAt(startIndexValue).endAt(endIndexValue);
    };
    /**
     * Format the series for display as a string.
     * This forces lazy evaluation to complete.
     *
     * @return Generates and returns a string representation of the series.
     *
     * @example
     * <pre>
     *
     * console.log(series.toString());
     * </pre>
     */
    Series.prototype.toString = function () {
        var header = ["__index__", "__value__"];
        var rows = this.toPairs();
        var table = new Table();
        for (var rowIndex = 0; rowIndex < rows.length; ++rowIndex) {
            var row = rows[rowIndex];
            for (var cellIndex = 0; cellIndex < row.length; ++cellIndex) {
                var cell = row[cellIndex];
                table.cell(header[cellIndex], cell);
            }
            table.newRow();
        }
        return table.toString();
    };
    //
    // Helper function to parse a string to an int.
    //
    Series.parseInt = function (value, valueIndex) {
        if (value === undefined || value === null) {
            return undefined;
        }
        else {
            if (!isString(value)) {
                throw new Error("Called Series.parseInts, expected all values in the series to be strings, instead found a '" + typeof (value) + "' at index " + valueIndex);
            }
            if (value.length === 0) {
                return undefined;
            }
            return parseInt(value);
        }
    };
    /**
     * Parse a series with string values and convert it to a series with int values.
     *
     * @return Returns a new series with values parsed from strings to ints.
     *
     * @example
     * <pre>
     *
     * const parsed = series.parseInts();
     * </pre>
     */
    Series.prototype.parseInts = function () {
        return this.select(Series.parseInt);
    };
    //
    // Helper function to parse a string to a float.
    //
    Series.parseFloat = function (value, valueIndex) {
        if (value === undefined || value === null) {
            return undefined;
        }
        else {
            if (!isString(value))
                throw new Error("Called Series.parseFloats, expected all values in the series to be strings, instead found a '" + typeof (value) + "' at index " + valueIndex);
            if (value.length === 0) {
                return undefined;
            }
            return parseFloat(value);
        }
    };
    /**
     * Parse a series with string values and convert it to a series with float values.
     *
     * @return Returns a new series with values parsed from strings to floats.
     *
     * @example
     * <pre>
     *
     * const parsed = series.parseFloats();
     * </pre>
     */
    Series.prototype.parseFloats = function () {
        return this.select(Series.parseFloat);
    };
    //
    // Helper function to parse a string to a date.
    //
    Series.parseDate = function (value, valueIndex, formatString) {
        if (value === undefined || value === null) {
            return undefined;
        }
        else {
            if (!isString(value))
                throw new Error("Called Series.parseDates, expected all values in the series to be strings, instead found a '" + typeof (value) + "' at index " + valueIndex);
            if (value.length === 0) {
                return undefined;
            }
            return moment(value, formatString).toDate();
        }
    };
    /**
     * Parse a series with string values and convert it to a series with date values.
     *
     * @param [formatString] Optional formatting string for dates.
     *
     * Moment is used for date parsing.
     * https://momentjs.com
     *
     * @return Returns a new series with values parsed from strings to dates.
     *
     * @example
     * <pre>
     *
     * const parsed = series.parseDates();
     * </pre>
     */
    Series.prototype.parseDates = function (formatString) {
        if (formatString) {
            if (!isString(formatString))
                throw new Error("Expected optional 'formatString' parameter to Series.parseDates to be a string (if specified).");
        }
        return this.select(function (value, valueIndex) { return Series.parseDate(value, valueIndex, formatString); });
    };
    //
    // Helper function to convert a value to a string.
    //
    Series.toString = function (value, formatString) {
        if (value === undefined) {
            return undefined;
        }
        else if (value === null) {
            return null;
        }
        else if (formatString && isDate(value)) {
            return moment(value).format(formatString);
        }
        else if (formatString && isNumber(value)) {
            return numeral(value).format(formatString);
        }
        else {
            return value.toString();
        }
    };
    /**
     * Convert a series of values of different types to a series containing string values.
     *
     * @param [formatString] Optional formatting string for dates.
     *
     * Numeral.js is used for number formatting.
     * http://numeraljs.com/
     *
     * Moment is used for date formatting.
     * https://momentjs.com/docs/#/parsing/string-format/
     *
     * @return Returns a new series values converted from values to strings.
     *
     * @example
     * <pre>
     *
     * const result = series.toStrings("YYYY-MM-DD");
     * </pre>
     *
     * @example
     * <pre>
     *
     * const result = series.toStrings("0.00");
     * </pre>
     */
    Series.prototype.toStrings = function (formatString) {
        if (formatString) {
            if (!isString(formatString))
                throw new Error("Expected optional 'formatString' parameter to Series.toStrings to be a string (if specified).");
        }
        return this.select(function (value) { return Series.toString(value, formatString); });
    };
    /**
     * Forces lazy evaluation to complete and 'bakes' the series into memory.
     *
     * @return Returns a series that has been 'baked', all lazy evaluation has completed.
     *
     * @example
     * <pre>
     *
     * const baked = series.bake();
     * </pre>
     */
    Series.prototype.bake = function () {
        if (this.getContent().isBaked) {
            // Already baked.
            return this;
        }
        return new Series({
            values: this.toArray(),
            pairs: this.toPairs(),
            baked: true,
        });
    };
    /**
     * Converts (inflates) a series to a {@link DataFrame}.
     *
     * @param [selector] Optional user-defined selector function that transforms each value to produce the dataframe.
     *
     * @returns Returns a dataframe that was created from the original series.
     *
     * @example
     * <pre>
     *
     * const dataframe = series.inflate(); // Inflate a series of objects to a dataframe.
     * </pre>
     *
     * @example
     * <pre>
     *
     * const dataframe = series.inflate(value => { AColumn:  value }); // Produces a dataframe with 1 column from a series of values.
     * </pre>
     *
     * @example
     * <pre>
     *
     * const dataframe = series.inflate(value => { AColumn:  value.NestedValue }); // Extract a nested value and produce a dataframe from it.
     * </pre>
     */
    Series.prototype.inflate = function (selector) {
        var _this = this;
        if (selector) {
            if (!isFunction(selector))
                throw new Error("Expected 'selector' parameter to Series.inflate to be a selector function.");
            return new DataFrame(function () {
                var content = _this.getContent();
                return {
                    values: new SelectIterable(content.values, selector),
                    index: content.index,
                    pairs: new SelectIterable(content.pairs, function (pair, index) { return [pair[0], selector(pair[1], index)]; }),
                };
            });
        }
        else {
            return new DataFrame(function () {
                var content = _this.getContent();
                return {
                    values: content.values,
                    index: content.index,
                    pairs: content.pairs,
                };
            });
        }
    };
    /**
     * Static version of the sum function for use with summarize and pivot functions.
     *
     * @param series Input series to be summed.
     *
     * @returns Returns the sum of the number values in the series.
     *
     * @example
     * <pre>
     *
     * const summary = dataFrame.summarize({
     *      ColumnToBeSummed: Series.sum,
     * });
     * </pre>
     */
    Series.sum = function (series) {
        return series.sum();
    };
    /**
     * Sum the values in a series and returns the result.
     *
     * @returns Returns the sum of the number values in the series.
     *
     * @example
     * <pre>
     *
     * const totalSales = salesFigures.sum();
     * </pre>
     */
    Series.prototype.sum = function () {
        if (this.none()) {
            return 0;
        }
        var numberSeries = this; // Have to assume we are working with a number series here.
        return numberSeries.aggregate(function (prev, value) { return prev + value; });
    };
    /**
     * Static version of the average function for use with summarize and pivot functions.
     *
     * @param series Input series to be averaged.
     *
     * @returns Returns the average of the number values in the series.
     *
     * @example
     * <pre>
     *
     * const summary = dataFrame.summarize({
     *      ColumnToBeAveraged: Series.average,
     * });
     * </pre>
     */
    Series.average = function (series) {
        return series.average();
    };
    /**
     * Average the values in a series and returns the result
     *
     * @returns Returns the average of the number values in the series.
     *
     * @example
     * <pre>
     *
     * const averageSales = salesFigures.average();
     * </pre>
     */
    Series.prototype.average = function () {
        var count = this.count();
        if (count > 0) {
            return this.sum() / count;
        }
        else {
            return 0;
        }
    };
    /**
     * Static version of the median function for use with summarize and pivot functions.
     *
     * @param series Input series to find the median of.
     *
     * @returns Returns the median of the number values in the series.
     *
     * @example
     * <pre>
     *
     * const summary = dataFrame.summarize({
     *      InputColumn: Series.median,
     * });
     * </pre>
     */
    Series.median = function (series) {
        return series.median();
    };
    /**
     * Get the median value in the series.
     * Note that this sorts the series, which can be expensive.
     *
     * @returns Returns the median of the values in the series.
     *
     * @example
     * <pre>
     *
     * const medianSales = salesFigures.median();
     * </pre>
     */
    Series.prototype.median = function () {
        //
        // From here: http://stackoverflow.com/questions/5275115/add-a-median-method-to-a-list
        //
        var numberSeries = this; // Have to assume we are working with a number series here.
        var count = numberSeries.count();
        if (count === 0) {
            return 0;
        }
        var ordered = numberSeries.orderBy(function (value) { return value; }).toArray();
        if ((count % 2) == 0) {
            // Even.
            var a = ordered[count / 2 - 1];
            var b = ordered[count / 2];
            return (a + b) / 2;
        }
        // Odd
        return ordered[Math.floor(count / 2)];
    };
    /**
     * Static version of the standard deviation function for use with summarize and pivot functions.
     *
     * @param series Input series to find the standard deviation of.
     *
     * @returns Returns the standard deviation of the values in the series.
     *
     * @example
     * <pre>
     *
     * const summary = dataFrame.summarize({
     *      InputColumn: Series.std,
     * });
     * </pre>
     */
    Series.std = function (series) {
        return series.std();
    };
    /**
     * Get the standard deviation of number values in the series.
     *
     * @returns Returns the standard deviation of the values in the series.
     *
     * @example
     * <pre>
     *
     * const salesStdDev = salesFigures.std();
     * </pre>
     */
    Series.prototype.std = function () {
        // Have to assume we are working with a number series here.
        // Bake so we don't evaluate multiple times.
        // TODO: Caching can help here.
        var numberSeries = this.bake();
        var valueCount = numberSeries.count();
        if (valueCount === 0) {
            return 0;
        }
        // https://en.wikipedia.org/wiki/Standard_deviation
        var mean = numberSeries.average();
        var sumOfSquaredDiffs = numberSeries
            .select(function (value) {
            var diffFromMean = value - mean;
            return diffFromMean * diffFromMean;
        })
            .sum();
        return Math.sqrt(sumOfSquaredDiffs / valueCount);
    };
    /**
     * Static version of the min function for use with summarize and pivot functions.
     *
     * @param series Input series to find the minimum of.
     *
     * @returns Returns the minimum of number values in the series.
     *
     * @example
     * <pre>
     *
     * const summary = dataFrame.summarize({
     *      Column: Series.min,
     * });
     * </pre>
     */
    Series.min = function (series) {
        return series.min();
    };
    /**
     * Get the min value in the series.
     *
     * @returns Returns the minimum of the number values in the series.
     *
     * @example
     * <pre>
     *
     * const minSales = salesFigures.min();
     * </pre>
     */
    Series.prototype.min = function () {
        var numberSeries = this; // Have to assume we are working with a number series here.
        return numberSeries.aggregate(function (prev, value) { return Math.min(prev, value); });
    };
    /**
     * Static version of the max function for use with summarize and pivot functions.
     *
     * @param series Input series to find the maximum of.
     *
     * @returns Returns the maximum of number values in the series.
     *
     * @example
     * <pre>
     *
     * const summary = dataFrame.summarize({
     *      Column: Series.max,
     * });
     * </pre>
     */
    Series.max = function (series) {
        return series.max();
    };
    /**
     * Get the max value in the series.
     *
     * @returns Returns the maximum of the number values in the series.
     *
     * @example
     * <pre>
     *
     * const maxSales = salesFigures.max();
     * </pre>
     */
    Series.prototype.max = function () {
        var numberSeries = this; // Have to assume we are working with a number series here.
        return numberSeries.aggregate(function (prev, value) { return Math.max(prev, value); });
    };
    /**
     * Invert the sign of every number value in the series.
     * This assumes that the input series contains numbers.
     *
     * @returns Returns a new series with all number values inverted.
     *
     * @example
     * <pre>
     *
     * const inverted = series.invert();
     * </pre>
     */
    Series.prototype.invert = function () {
        var inputSeries = this;
        return inputSeries.select(function (value) { return -value; });
    };
    /**
     * Counts the number of sequential values where the predicate evaluates to truthy.
     * Outputs 0 for values when the predicate evaluates to falsy.
     *
     * @param predicate User-defined function. Should evaluate to truthy to activate the counter or falsy to deactivate it.
     *
     * @returns Returns a new series that counts up the number of sequential values where the predicate evaluates to truthy. 0 values appear when the prediate evaluates to falsy.
     *
     * @example
     * <pre>
     *
     * const series = new Series([ 1, 10, 3, 15, 8, 5 ]);
     * const counted = series.counter(value => value >= 3);
     * console.log(counted.toString());
     * </pre>
     */
    Series.prototype.counter = function (predicate) {
        return this.groupSequentialBy(predicate)
            .selectMany(function (group, i) {
            if (predicate(group.first())) {
                // This group matches the predicate.
                return range(1, group.count())
                    .withIndex(group.getIndex())
                    .toPairs(); //TODO: selectMany wipes the index. It needs to respect it!
            }
            else {
                // This group doesn't match the predicate.
                return replicate(0, group.count())
                    .withIndex(group.getIndex())
                    .toPairs(); //TODO: selectMany wipes the index. It needs to respect it!
            }
        })
            .withIndex(function (pair) { return pair[0]; })
            .select(function (pair) { return pair[1]; });
    };
    /**
     * Gets a new series in reverse order.
     *
     * @return Returns a new series that is the reverse of the original.
     *
     * @example
     * <pre>
     *
     * const reversed = series.reverse();
     * </pre>
     */
    Series.prototype.reverse = function () {
        var _this = this;
        return new Series(function () { return ({
            values: new ReverseIterable(_this.getContent().values),
            index: new ReverseIterable(_this.getContent().index),
            pairs: new ReverseIterable(_this.getContent().pairs)
        }); });
    };
    /**
     * Returns only the set of values in the series that are distinct.
     * Provide a user-defined selector to specify criteria for determining the distinctness.
     * This can be used to remove duplicate values from the series.
     *
     * @param [selector] Optional user-defined selector function that specifies the criteria used to make comparisons for duplicate values.
     *
     * @return Returns a series containing only unique values in the series.
     *
     * @example
     * <pre>
     *
     * const uniqueValues = series.distinct(); // Get only non-duplicated value in the series.
     * </pre>
     *
     * @example
     * <pre>
     *
     * const bucketedValues = series.distinct(value => Math.floor(value / 10)); // Lump values into buckets of 10.
     * </pre>
     */
    Series.prototype.distinct = function (selector) {
        var _this = this;
        return new Series(function () { return ({
            values: new DistinctIterable(_this.getContent().values, selector),
            pairs: new DistinctIterable(_this.getContent().pairs, function (pair) { return selector && selector(pair[1]) || pair[1]; })
        }); });
    };
    /**
     * Collects values in the series into a new series of groups according to a user-defined selector function.
     *
     * @param selector User-defined selector function that specifies the criteriay to group by.
     *
     * @return Returns a new series of groups. Each group is a series with values that have been grouped by the 'selector' function.
     *
     * @example
     * <pre>
     *
     * const sales = ... product sales ...
     * const salesByProduct = sales.groupBy(sale => sale.ProductId);
     * for (const productSalesGroup of salesByProduct) {
     *      // ... do something with each product group ...
     *      const productId = productSalesGroup.first().ProductId;
     *      const totalSalesForProduct = productSalesGroup.deflate(sale => sale.Amount).sum();
     *      console.log(totalSalesForProduct);
     * }
     * </pre>
     */
    Series.prototype.groupBy = function (selector) {
        var _this = this;
        if (!isFunction(selector))
            throw new Error("Expected 'selector' parameter to 'Series.groupBy' to be a selector function that determines the value to group the series by.");
        return new Series(function () {
            var groups = []; // Each group, in order of discovery.
            var groupMap = {}; // Group map, records groups by key.
            var valueIndex = 0;
            try {
                for (var _a = __values(_this.getContent().pairs), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var pair = _b.value;
                    var groupKey = selector(pair[1], valueIndex);
                    ++valueIndex;
                    var existingGroup = groupMap[groupKey];
                    if (existingGroup) {
                        existingGroup.push(pair);
                    }
                    else {
                        var newGroup = [];
                        newGroup.push(pair);
                        groups.push(newGroup);
                        groupMap[groupKey] = newGroup;
                    }
                }
            }
            catch (e_15_1) { e_15 = { error: e_15_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_15) throw e_15.error; }
            }
            return {
                values: groups.map(function (group) { return new Series({ pairs: group }); })
            };
            var e_15, _c;
        });
    };
    /**
     * Collects values in the series into a new series of groups based on if the values are the same or according to a user-defined selector function.
     *
     * @param [selector] Optional selector that specifies the criteria for grouping.
     *
     * @return Returns a new series of groups. Each group is a series with values that are the same or have been grouped by the 'selector' function.
     *
     * @example
     * <pre>
     *
     * // Some ultra simple stock trading strategy backtesting...
     * const dailyStockPrice = ... daily stock price for a company ...
     * const priceGroups  = dailyStockPrice.groupBy(day => day.close > day.movingAverage);
     * for (const priceGroup of priceGroups) {
     *      // ... do something with each stock price group ...
     *
     *      const firstDay = priceGroup.first();
     *      if (firstDay.close > movingAverage) {
     *          // This group of days has the stock price above its moving average.
     *          // ... maybe enter a long trade here ...
     *      }
     *      else {
     *          // This group of days has the stock price below its moving average.
     *          // ... maybe enter a short trade here ...
     *      }
     * }
     * </pre>
     */
    Series.prototype.groupSequentialBy = function (selector) {
        if (selector) {
            if (!isFunction(selector))
                throw new Error("Expected 'selector' parameter to 'Series.groupSequentialBy' to be a selector function that determines the value to group the series by.");
        }
        else {
            selector = function (value) { return value; };
        }
        return this.variableWindow(function (a, b) { return selector(a) === selector(b); });
    };
    /**
     * Concatenate multiple series into a single series.
     *
     * @param series - Array of series to concatenate.
     *
     * @returns Returns a single series concatenated from multiple input series.
     */
    Series.concat = function (series) {
        if (!isArray(series))
            throw new Error("Expected 'series' parameter to 'Series.concat' to be an array of series.");
        return new Series(function () {
            var upcast = series; // Upcast so that we can access private index, values and pairs.
            var contents = upcast.map(function (series) { return series.getContent(); });
            return {
                values: new ConcatIterable(contents.map(function (content) { return content.values; })),
                pairs: new ConcatIterable(contents.map(function (content) { return content.pairs; })),
            };
        });
    };
    /**
     * Concatenate multiple other series onto this series.
     *
     * @param series Multiple arguments. Each can be either a series or an array of series.
     *
     * @return Returns a single series concatenated from multiple input series.
     *
     * @example
     * <pre>
     *
     * const concatenated = a.concat(b);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const concatenated = a.concat(b, c);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const concatenated = a.concat([b, c]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const concatenated = a.concat(b, [c, d]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const otherSeries = [... array of series...];
     * const concatenated = a.concat(otherSeries);
     * </pre>
     */
    Series.prototype.concat = function () {
        var series = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            series[_i] = arguments[_i];
        }
        var concatInput = [this];
        try {
            for (var series_2 = __values(series), series_2_1 = series_2.next(); !series_2_1.done; series_2_1 = series_2.next()) {
                var input = series_2_1.value;
                if (isArray(input)) {
                    try {
                        for (var input_1 = __values(input), input_1_1 = input_1.next(); !input_1_1.done; input_1_1 = input_1.next()) {
                            var subInput = input_1_1.value;
                            concatInput.push(subInput);
                        }
                    }
                    catch (e_16_1) { e_16 = { error: e_16_1 }; }
                    finally {
                        try {
                            if (input_1_1 && !input_1_1.done && (_a = input_1.return)) _a.call(input_1);
                        }
                        finally { if (e_16) throw e_16.error; }
                    }
                }
                else {
                    concatInput.push(input);
                }
            }
        }
        catch (e_17_1) { e_17 = { error: e_17_1 }; }
        finally {
            try {
                if (series_2_1 && !series_2_1.done && (_b = series_2.return)) _b.call(series_2);
            }
            finally { if (e_17) throw e_17.error; }
        }
        return Series.concat(concatInput);
        var e_17, _b, e_16, _a;
    };
    /**
    * Zip together multiple series to create a new series.
    * Preserves the index of the first series.
    *
    * @param series - An iterable of series to be zipped.
    * @param zipper - Selector function that produces a new series based on the input series.
    *
    * @returns Returns a single series zipped from multiple input series.
    */
    Series.zip = function (series, zipper) {
        var input = Array.from(series);
        if (input.length === 0) {
            return new Series();
        }
        var firstSeries = input[0];
        if (firstSeries.none()) {
            return new Series();
        }
        return new Series(function () {
            var firstSeriesUpCast = firstSeries;
            var upcast = input; // Upcast so that we can access private index, values and pairs.
            return {
                index: firstSeriesUpCast.getContent().index,
                values: new ZipIterable(upcast.map(function (s) { return s.getContent().values; }), zipper),
            };
        });
    };
    Series.prototype.zip = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var selector = args[args.length - 1];
        var input = [this].concat(args.slice(0, args.length - 1));
        return Series.zip(input, function (values) { return selector.apply(void 0, __spread(values)); });
    };
    /**
     * Sorts the series in ascending order by a value defined by the user-defined selector function.
     *
     * @param selector User-defined selector function that selects the value to sort by.
     *
     * @return Returns a new series that has been ordered accorrding to the value chosen by the selector function.
     *
     * @example
     * <pre>
     *
     * const orderedSeries = series.orderBy(value => value);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const orderedSeries = series.orderBy(value => value.NestedValue);
     * </pre>
     */
    Series.prototype.orderBy = function (selector) {
        var content = this.getContent();
        return new OrderedSeries({
            values: content.values,
            pairs: content.pairs,
            selector: selector,
            direction: Direction.Ascending,
            parent: null,
        });
    };
    /**
     * Sorts the series in descending order by a value defined by the user-defined selector function.
     *
     * @param selector User-defined selector function that selects the value to sort by.
     *
     * @return Returns a new series that has been ordered accorrding to the value chosen by the selector function.
     *
     * @example
     * <pre>
     *
     * const orderedSeries = series.orderByDescending(value => value);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const orderedSeries = series.orderByDescending(value => value.NestedValue);
     * </pre>
     */
    Series.prototype.orderByDescending = function (selector) {
        var content = this.getContent();
        return new OrderedSeries({
            values: content.values,
            pairs: content.pairs,
            selector: selector,
            direction: Direction.Descending,
            parent: null,
        });
    };
    /**
     * Creates a new series by merging two input dataframes.
     * The resulting series contains the union of value from the two input series.
     * These are the unique combination of values in both series.
     * This is basically a concatenation and then elimination of duplicates.
     *
     * @param other The other series to merge.
     * @param [selector] Optional user-defined selector function that selects the value to compare to determine distinctness.
     *
     * @return Returns the union of the two series.
     *
     * @example
     * <pre>
     *
     * const seriesA = ...
     * const seriesB = ...
     * const merged = seriesA.union(seriesB);
     * </pre>
     *
     * @example
     * <pre>
     *
     * // Merge two sets of customer records that may contain the same
     * // customer record in each set. This is basically a concatenation
     * // of the series and then an elimination of any duplicate records
     * // that result.
     * const customerRecordsA = ...
     * const customerRecordsB = ...
     * const mergedCustomerRecords = customerRecordsA.union(
     *      customerRecordsB,
     *      customerRecord => customerRecord.CustomerId
     * );
     * </pre>
     *
     *
     * @example
     * <pre>
     *
     * // Note that you can achieve the exact same result as the previous
     * // example by doing a {@link Series.concat) and {@link Series.distinct}
     * // of the input series and then an elimination of any duplicate records
     * // that result.
     * const customerRecordsA = ...
     * const customerRecordsB = ...
     * const mergedCustomerRecords = customerRecordsA
     *      .concat(customerRecordsB)
     *      .distinct(customerRecord => customerRecord.CustomerId);
     * </pre>
     *
     */
    Series.prototype.union = function (other, selector) {
        if (selector) {
            if (!isFunction(selector))
                throw new Error("Expected optional 'selector' parameter to 'Series.union' to be a selector function.");
        }
        return this.concat(other).distinct(selector);
    };
    /**
     * Creates a new series by merging two input series.
     * The resulting series contains the intersection of values from the two input series.
     * These are only the values that appear in both series.
     *
     * @param inner The inner series to merge (the series you call the function on is the 'outer' series).
     * @param [outerSelector] Optional user-defined selector function that selects the key from the outer series that is used to match the two series.
     * @param [innerSelector] Optional user-defined selector function that selects the key from the inner series that is used to match the two series.
     *
     * @return Returns a new series that contains the intersection of values from the two input series.
     *
     * @example
     * <pre>
     *
     * const seriesA = ...
     * const seriesB = ...
     * const mergedDf = seriesA.intersection(seriesB);
     * </pre>
     *
     * @example
     * <pre>
     *
     * // Merge two sets of customer records to find only the
     * // customers that appears in both.
     * const customerRecordsA = ...
     * const customerRecordsB = ...
     * const intersectionOfCustomerRecords = customerRecordsA.intersection(
     *      customerRecordsB,
     *      customerRecord => customerRecord.CustomerId
     * );
     * </pre>
     */
    Series.prototype.intersection = function (inner, outerSelector, innerSelector) {
        if (outerSelector) {
            if (!isFunction(outerSelector))
                throw new Error("Expected optional 'outerSelector' parameter to 'Series.intersection' to be a function.");
        }
        else {
            outerSelector = function (value) { return value; };
        }
        if (innerSelector) {
            if (!isFunction(innerSelector))
                throw new Error("Expected optional 'innerSelector' parameter to 'Series.intersection' to be a function.");
        }
        else {
            innerSelector = function (value) { return value; };
        }
        var outer = this;
        return outer.where(function (outerValue) {
            var outerKey = outerSelector(outerValue);
            return inner
                .where(function (innerValue) { return outerKey === innerSelector(innerValue); })
                .any();
        });
    };
    /**
     * Creates a new series by merging two input series.
     * The resulting series contains only the values from the 1st series that don't appear in the 2nd series.
     * This is essentially subtracting the values from the 2nd series from the 1st and creating a new series with the remaining values.
     *
     * @param inner The inner series to merge (the series you call the function on is the 'outer' series).
     * @param [outerSelector] Optional user-defined selector function that selects the key from the outer series that is used to match the two series.
     * @param [innerSelector] Optional user-defined selector function that selects the key from the inner series that is used to match the two series.
     *
     * @return Returns a new series that contains only the values from the 1st series that don't appear in the 2nd series.
     *
     * @example
     * <pre>
     *
     * const seriesA = ...
     * const seriesB = ...
     * const remainingDf = seriesA.except(seriesB);
     * </pre>
     *
     * @example
     * <pre>
     *
     * // Find the list of customers haven't bought anything recently.
     * const allCustomers = ... list of all customers ...
     * const recentCustomers = ... list of customers who have purchased recently ...
     * const remainingCustomers = allCustomers.except(
     *      recentCustomers,
     *      customerRecord => customerRecord.CustomerId
     * );
     * </pre>
     */
    Series.prototype.except = function (inner, outerSelector, innerSelector) {
        if (outerSelector) {
            if (!isFunction(outerSelector))
                throw new Error("Expected optional 'outerSelector' parameter to 'Series.except' to be a function.");
        }
        else {
            outerSelector = function (value) { return value; };
        }
        if (innerSelector) {
            if (!isFunction(innerSelector))
                throw new Error("Expected optional 'innerSelector' parameter to 'Series.except' to be a function.");
        }
        else {
            innerSelector = function (value) { return value; };
        }
        var outer = this;
        return outer.where(function (outerValue) {
            var outerKey = outerSelector(outerValue);
            return inner
                .where(function (innerValue) { return outerKey === innerSelector(innerValue); })
                .none();
        });
    };
    /**
      * Creates a new series by merging two input series.
      * The resulting dataframe contains only those value that have matching keys in both input series.
      *
      * @param inner The 'inner' series to join (the series you are callling the function on is the 'outer' series).
      * @param outerKeySelector User-defined selector function that chooses the join key from the outer series.
      * @param innerKeySelector User-defined selector function that chooses the join key from the inner series.
      * @param resultSelector User-defined function that merges outer and inner values.
      *
      * @return Returns the new merged series.
      *
      * @example
      * <pre>
      *
      * // Join together two sets of customers to find those
      * // that have bought both product A and product B.
      * const customerWhoBoughtProductA = ...
      * const customerWhoBoughtProductB = ...
      * const customersWhoBoughtBothProductsDf = customerWhoBoughtProductA.join(
      *          customerWhoBoughtProductB,
      *          customerA => customerA.CustomerId, // Join key.
      *          customerB => customerB.CustomerId, // Join key.
      *          (customerA, customerB) => {
      *              return {
      *                  // ... merge the results ...
      *              };
      *          }
      *      );
      * </pre>
      */
    Series.prototype.join = function (inner, outerKeySelector, innerKeySelector, resultSelector) {
        if (!isFunction(outerKeySelector))
            throw new Error("Expected 'outerKeySelector' parameter of 'Series.join' to be a selector function.");
        if (!isFunction(innerKeySelector))
            throw new Error("Expected 'innerKeySelector' parameter of 'Series.join' to be a selector function.");
        if (!isFunction(resultSelector))
            throw new Error("Expected 'resultSelector' parameter of 'Series.join' to be a selector function.");
        var outer = this;
        return new Series(function () {
            var innerMap = inner
                .groupBy(innerKeySelector)
                .toObject(function (group) { return innerKeySelector(group.first()); }, function (group) { return group; });
            var outerContent = outer.getContent();
            var output = [];
            try {
                for (var outer_1 = __values(outer), outer_1_1 = outer_1.next(); !outer_1_1.done; outer_1_1 = outer_1.next()) {
                    var outerValue = outer_1_1.value;
                    var outerKey = outerKeySelector(outerValue);
                    var innerGroup = innerMap[outerKey];
                    if (innerGroup) {
                        try {
                            for (var innerGroup_1 = __values(innerGroup), innerGroup_1_1 = innerGroup_1.next(); !innerGroup_1_1.done; innerGroup_1_1 = innerGroup_1.next()) {
                                var innerValue = innerGroup_1_1.value;
                                output.push(resultSelector(outerValue, innerValue));
                            }
                        }
                        catch (e_18_1) { e_18 = { error: e_18_1 }; }
                        finally {
                            try {
                                if (innerGroup_1_1 && !innerGroup_1_1.done && (_a = innerGroup_1.return)) _a.call(innerGroup_1);
                            }
                            finally { if (e_18) throw e_18.error; }
                        }
                    }
                }
            }
            catch (e_19_1) { e_19 = { error: e_19_1 }; }
            finally {
                try {
                    if (outer_1_1 && !outer_1_1.done && (_b = outer_1.return)) _b.call(outer_1);
                }
                finally { if (e_19) throw e_19.error; }
            }
            return {
                values: output
            };
            var e_19, _b, e_18, _a;
        });
    };
    /**
     * Creates a new series by merging two input series.
     * The resulting series contains only those values that are only present in one or the other of the series, not both.
     *
     * @param inner The 'inner' series to join (the series you are callling the function on is the 'outer' series).
     * @param outerKeySelector User-defined selector function that chooses the join key from the outer series.
     * @param innerKeySelector User-defined selector function that chooses the join key from the inner series.
     * @param resultSelector User-defined function that merges outer and inner values.
     *
     * Implementation from here:
     *
     * 	http://blogs.geniuscode.net/RyanDHatch/?p=116
     *
     * @return Returns the new merged series.
     *
     * @example
     * <pre>
     *
     * // Join together two sets of customers to find those
     * // that have bought either product A or product B, not not both.
     * const customerWhoBoughtProductA = ...
     * const customerWhoBoughtProductB = ...
     * const customersWhoBoughtEitherProductButNotBothDf = customerWhoBoughtProductA.joinOuter(
     *          customerWhoBoughtProductB,
     *          customerA => customerA.CustomerId, // Join key.
     *          customerB => customerB.CustomerId, // Join key.
     *          (customerA, customerB) => {
     *              return {
     *                  // ... merge the results ...
     *              };
     *          }
     *      );
     * </pre>
     */
    Series.prototype.joinOuter = function (inner, outerKeySelector, innerKeySelector, resultSelector) {
        if (!isFunction(outerKeySelector))
            throw new Error("Expected 'outerKeySelector' parameter of 'Series.joinOuter' to be a selector function.");
        if (!isFunction(innerKeySelector))
            throw new Error("Expected 'innerKeySelector' parameter of 'Series.joinOuter' to be a selector function.");
        if (!isFunction(resultSelector))
            throw new Error("Expected 'resultSelector' parameter of 'Series.joinOuter' to be a selector function.");
        // Get the results in the outer that are not in the inner.
        var outer = this;
        var outerResult = outer.except(inner, outerKeySelector, innerKeySelector)
            .select(function (outer) { return resultSelector(outer, null); })
            .resetIndex();
        // Get the results in the inner that are not in the outer.
        var innerResult = inner.except(outer, innerKeySelector, outerKeySelector)
            .select(function (inner) { return resultSelector(null, inner); })
            .resetIndex();
        // Get the intersection of results between inner and outer.
        var intersectionResults = outer.join(inner, outerKeySelector, innerKeySelector, resultSelector);
        return outerResult
            .concat(intersectionResults)
            .concat(innerResult)
            .resetIndex();
    };
    /**
     * Creates a new series by merging two input series.
     * The resulting series contains only those values that are present either in both series or only in the outer (left) series.
     *
     * @param inner The 'inner' series to join (the series you are callling the function on is the 'outer' series).
     * @param outerKeySelector User-defined selector function that chooses the join key from the outer series.
     * @param innerKeySelector User-defined selector function that chooses the join key from the inner series.
     * @param resultSelector User-defined function that merges outer and inner values.
     *
     * Implementation from here:
     *
     * 	http://blogs.geniuscode.net/RyanDHatch/?p=116
     *
     * @return Returns the new merged series.
     *
     * @example
     * <pre>
     *
     * // Join together two sets of customers to find those
     * // that have bought either just product A or both product A and product B.
     * const customerWhoBoughtProductA = ...
     * const customerWhoBoughtProductB = ...
     * const boughtJustAorAandB = customerWhoBoughtProductA.joinOuterLeft(
     *          customerWhoBoughtProductB,
     *          customerA => customerA.CustomerId, // Join key.
     *          customerB => customerB.CustomerId, // Join key.
     *          (customerA, customerB) => {
     *              return {
     *                  // ... merge the results ...
     *              };
     *          }
     *      );
     * </pre>
     */
    Series.prototype.joinOuterLeft = function (inner, outerKeySelector, innerKeySelector, resultSelector) {
        if (!isFunction(outerKeySelector))
            throw new Error("Expected 'outerKeySelector' parameter of 'Series.joinOuterLeft' to be a selector function.");
        if (!isFunction(innerKeySelector))
            throw new Error("Expected 'innerKeySelector' parameter of 'Series.joinOuterLeft' to be a selector function.");
        if (!isFunction(resultSelector))
            throw new Error("Expected 'resultSelector' parameter of 'Series.joinOuterLeft' to be a selector function.");
        // Get the results in the outer that are not in the inner.
        var outer = this;
        var outerResult = outer.except(inner, outerKeySelector, innerKeySelector)
            .select(function (outer) { return resultSelector(outer, null); })
            .resetIndex();
        // Get the intersection of results between inner and outer.
        var intersectionResults = outer.join(inner, outerKeySelector, innerKeySelector, resultSelector);
        return outerResult
            .concat(intersectionResults)
            .resetIndex();
    };
    /**
     * Creates a new series by merging two input series.
     * The resulting series contains only those values that are present either in both series or only in the inner (right) series.
     *
     * @param inner The 'inner' series to join (the series you are callling the function on is the 'outer' series).
     * @param outerKeySelector User-defined selector function that chooses the join key from the outer series.
     * @param innerKeySelector User-defined selector function that chooses the join key from the inner series.
     * @param resultSelector User-defined function that merges outer and inner values.
     *
     * Implementation from here:
     *
     * 	http://blogs.geniuscode.net/RyanDHatch/?p=116
     *
     * @return Returns the new merged series.
     *
     * @example
     * <pre>
     *
     * // Join together two sets of customers to find those
     * // that have bought either just product B or both product A and product B.
     * const customerWhoBoughtProductA = ...
     * const customerWhoBoughtProductB = ...
     * const boughtJustAorAandB = customerWhoBoughtProductA.joinOuterRight(
     *          customerWhoBoughtProductB,
     *          customerA => customerA.CustomerId, // Join key.
     *          customerB => customerB.CustomerId, // Join key.
     *          (customerA, customerB) => {
     *              return {
     *                  // ... merge the results ...
     *              };
     *          }
     *      );
     * </pre>
     */
    Series.prototype.joinOuterRight = function (inner, outerKeySelector, innerKeySelector, resultSelector) {
        if (!isFunction(outerKeySelector))
            throw new Error("Expected 'outerKeySelector' parameter of 'Series.joinOuterRight' to be a selector function.");
        if (!isFunction(innerKeySelector))
            throw new Error("Expected 'innerKeySelector' parameter of 'Series.joinOuterRight' to be a selector function.");
        if (!isFunction(resultSelector))
            throw new Error("Expected 'resultSelector' parameter of 'Series.joinOuterRight' to be a selector function.");
        // Get the results in the inner that are not in the outer.
        var outer = this;
        var innerResult = inner.except(outer, innerKeySelector, outerKeySelector)
            .select(function (inner) { return resultSelector(null, inner); })
            .resetIndex();
        // Get the intersection of results between inner and outer.
        var intersectionResults = outer.join(inner, outerKeySelector, innerKeySelector, resultSelector);
        return intersectionResults
            .concat(innerResult)
            .resetIndex();
    };
    /**
     * Produces a new series with all string values truncated to the requested maximum length.
     *
     * @param maxLength - The maximum length of the string values after truncation.
     *
     * @returns Returns a new series with strings that are truncated to the specified maximum length.
     *
     * @example
     * <pre>
     *
     * const truncated = series.truncateStrings(10); // Truncate all string values to max length of 10 characters.
     * </pre>
     */
    Series.prototype.truncateStrings = function (maxLength) {
        if (!isNumber(maxLength)) {
            throw new Error("Expected 'maxLength' parameter to 'Series.truncateStrings' to be a number.");
        }
        return this.select(function (value) {
            if (isString(value)) {
                if (value.length > maxLength) {
                    return value.substring(0, maxLength);
                }
            }
            return value;
        });
    };
    /**
     * Produces a new series with all number values rounded to the specified number of places.
     *
     * @param [numDecimalPlaces] The number of decimal places, defaults to 2.
     *
     * @returns Returns a new series with all number values rounded to the specified number of places.
     *
     * @example
     * <pre>
     *
     * const series = ... your data series ...
     * const rounded = series.round(); // Round numbers to two decimal places.
     * </pre>
     *
     * @example
     * <pre>
     *
     * const series = ... your data series ...
     * const rounded = series.round(3); // Round numbers to three decimal places.
     * </pre>
     */
    Series.prototype.round = function (numDecimalPlaces) {
        if (numDecimalPlaces !== undefined) {
            if (!isNumber(numDecimalPlaces)) {
                throw new Error("Expected 'numDecimalPlaces' parameter to 'Series.round' to be a number.");
            }
        }
        else {
            numDecimalPlaces = 2; // Default to two decimal places.
        }
        return this.select(function (value) {
            if (isNumber(value)) {
                return parseFloat(value.toFixed(numDecimalPlaces));
            }
            return value;
        });
    };
    /**
     * Insert a pair at the start of the series.
     * Doesn't modify the original series! The returned series is entirely new and contains values from the original series plus the inserted pair.
     *
     * @param pair The index/value pair to insert.
     *
     * @return Returns a new series with the specified pair inserted.
     *
     * @example
     * <pre>
     *
     * const newIndex = ... index of the new row ...
     * const newRow = ... the new data row to insert ...
     * const insertedSeries = series.insertPair([newIndex, newRows]);
     * </pre>
     */
    Series.prototype.insertPair = function (pair) {
        if (!isArray(pair))
            throw new Error("Expected 'pair' parameter to 'Series.insertPair' to be an array.");
        if (pair.length !== 2)
            throw new Error("Expected 'pair' parameter to 'Series.insertPair' to be an array with two elements. The first element is the index, the second is the value.");
        return (new Series({ pairs: [pair] })).concat(this);
    };
    /**
     * Append a pair to the end of a series.
     * Doesn't modify the original series! The returned series is entirely new and contains values from the original series plus the appended pair.
     *
     * @param pair The index/value pair to append.
     *
     * @return Returns a new series with the specified pair appended.
     *
     * @example
     * <pre>
     *
     * const newIndex = ... index of the new row ...
     * const newRow = ... the new data row to append ...
     * const appendedSeries = series.appendPair([newIndex, newRows]);
     * </pre>
     */
    Series.prototype.appendPair = function (pair) {
        if (!isArray(pair))
            throw new Error("Expected 'pair' parameter to 'Series.appendPair' to be an array.");
        if (pair.length !== 2)
            throw new Error("Expected 'pair' parameter to 'Series.appendPair' to be an array with two elements. The first element is the index, the second is the value.");
        return this.concat(new Series({ pairs: [pair] }));
    };
    /**
     * Fill gaps in a series.
     *
     * @param comparer User-defined comparer function that is passed pairA and pairB, two consecutive values, return truthy if there is a gap between the value, or falsey if there is no gap.
     * @param generator User-defined generator function that is passed pairA and pairB, two consecutive values, returns an array of pairs that fills the gap between the values.
     *
     * @return Returns a new series with gaps filled in.
     *
     * @example
     * <pre>
     *
     *   var sequenceWithGaps = ...
     *
     *  // Predicate that determines if there is a gap.
     *  var gapExists = (pairA, pairB) => {
     *      // Returns true if there is a gap.
     *      return true;
     *  };
     *
     *  // Generator function that produces new rows to fill the game.
     *  var gapFiller = (pairA, pairB) => {
     *      // Create an array of index, value pairs that fill the gaps between pairA and pairB.
     *      return [
     *          newPair1,
     *          newPair2,
     *          newPair3,
     *      ];
     *  };
     *
     *  var sequenceWithoutGaps = sequenceWithGaps.fillGaps(gapExists, gapFiller);
     * </pre>
     */
    Series.prototype.fillGaps = function (comparer, generator) {
        if (!isFunction(comparer))
            throw new Error("Expected 'comparer' parameter to 'Series.fillGaps' to be a comparer function that compares two values and returns a boolean.");
        if (!isFunction(generator))
            throw new Error("Expected 'generator' parameter to 'Series.fillGaps' to be a generator function that takes two values and returns an array of generated pairs to span the gap.");
        return this.rollingWindow(2)
            .selectMany(function (window) {
            var pairs = window.toPairs();
            var pairA = pairs[0];
            var pairB = pairs[1];
            if (!comparer(pairA, pairB)) {
                return [pairA];
            }
            var generatedRows = generator(pairA, pairB);
            if (!isArray(generatedRows))
                throw new Error("Expected return from 'generator' parameter to 'Series.fillGaps' to be an array of pairs, instead got a " + typeof (generatedRows));
            return [pairA].concat(generatedRows);
        })
            .withIndex(function (pair) { return pair[0]; })
            .select(function (pair) { return pair[1]; })
            .concat(this.tail(1));
    };
    /**
     * Returns the specified default series if the input series is empty.
     *
     * @param defaultSequence Default series to return if the input series is empty.
     *
     * @return Returns 'defaultSequence' if the input series is empty.
     *
     * @example
     * <pre>
     *
     * const emptySeries = new Series();
     * const defaultSeries = new Series([ 1, 2, 3 ]);
     * expect(emptyDataFrame.defaultIfEmpty(defaultSeries)).to.eql(defaultSeries);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const nonEmptySeries = new Series([ 100 ]);
     * const defaultSeries = new Series([ 1, 2, 3 ]);
     * expect(nonEmptySeries.defaultIfEmpty(defaultSeries)).to.eql(nonEmptySeries);
     * </pre>
     */
    Series.prototype.defaultIfEmpty = function (defaultSequence) {
        if (this.none()) {
            if (defaultSequence instanceof Series) {
                return defaultSequence;
            }
            else if (isArray(defaultSequence)) {
                return new Series(defaultSequence);
            }
            else {
                throw new Error("Expected 'defaultSequence' parameter to 'Series.defaultIfEmpty' to be an array or a series.");
            }
        }
        else {
            return this;
        }
    };
    /**
     * Detect the the frequency of the types of the values in the series.
     * This is a good way to understand the shape of your data.
     *
     * @return Returns a {@link DataFrame} with rows that confirm to {@link ITypeFrequency} that describes the data types contained in the original series.
     *
     * @example
     * <pre>
     *
     * const dataTypes = series.detectTypes();
     * console.log(dataTypes.toString());
     * </pre>
     */
    Series.prototype.detectTypes = function () {
        var _this = this;
        return new DataFrame(function () {
            var totalValues = _this.count();
            var typeFrequencies = _this.select(function (value) {
                var valueType = typeof (value);
                if (valueType === "object") {
                    if (isDate(value)) {
                        valueType = "date";
                    }
                }
                return valueType;
            })
                .aggregate({}, function (accumulated, valueType) {
                var typeInfo = accumulated[valueType];
                if (!typeInfo) {
                    typeInfo = {
                        count: 0
                    };
                    accumulated[valueType] = typeInfo;
                }
                ++typeInfo.count;
                return accumulated;
            });
            return {
                columnNames: ["Type", "Frequency"],
                rows: Object.keys(typeFrequencies)
                    .map(function (valueType) {
                    return [
                        valueType,
                        (typeFrequencies[valueType].count / totalValues) * 100
                    ];
                })
            };
        });
    };
    /**
     * Detect the frequency of the values in the series.
     * This is a good way to understand the shape of your data.
     *
     * @return Returns a {@link DataFrame} with rows that conform to {@link IValueFrequency} that describes the values contained in the original series.
     *
     * @example
     * <pre>
     *
     * const dataValues = series.detectValues();
     * console.log(dataValues.toString());
     * </pre>
     */
    Series.prototype.detectValues = function () {
        var _this = this;
        return new DataFrame(function () {
            var totalValues = _this.count();
            var valueFrequencies = _this.aggregate(new Map(), function (accumulated, value) {
                var valueInfo = accumulated.get(value);
                if (!valueInfo) {
                    valueInfo = {
                        count: 0,
                        value: value,
                    };
                    accumulated.set(value, valueInfo);
                }
                ++valueInfo.count;
                return accumulated;
            });
            return {
                columnNames: ["Value", "Frequency"],
                rows: Array.from(valueFrequencies.keys())
                    .map(function (value) {
                    var valueInfo = valueFrequencies.get(value);
                    return [
                        valueInfo.value,
                        (valueInfo.count / totalValues) * 100
                    ];
                }),
            };
        });
    };
    /**
     * Organise all values in the series into the specified number of buckets.
     * Assumes that the series is a series of numbers.
     *
     * @param numBuckets - The number of buckets to create.
     *
     * @returns Returns a dataframe containing bucketed values. The input values are divided up into these buckets.
     *
     * @example
     * <pre>
     *
     * const buckets = series.bucket(20); // Distribute values into 20 evenly spaced buckets.
     * console.log(buckets.toString());
     * </pre>
     */
    Series.prototype.bucket = function (numBuckets) {
        if (!isNumber(numBuckets)) {
            throw new Error("Expected 'numBuckets' parameter to 'Series.bucket' to be a number.");
        }
        if (this.none()) {
            return new DataFrame();
        }
        var numberSeries = this;
        var min = numberSeries.min();
        var max = numberSeries.max();
        var range = max - min;
        var width = range / (numBuckets - 1);
        return numberSeries.select(function (v) {
            var bucket = Math.floor((v - min) / width);
            var bucketMin = (bucket * width) + min;
            return {
                Value: v,
                Bucket: bucket,
                Min: bucketMin,
                Mid: bucketMin + (width * 0.5),
                Max: bucketMin + width,
            };
        })
            .inflate();
    };
    /***
     * Allows the series to be queried to confirm that it is actually a series.
     * Used from JavaScript to tell the difference between a Series and a DataFrame.
     *
     * @return Returns the string "series".
     */
    Series.prototype.getTypeCode = function () {
        return "series";
    };
    Series.defaultCountIterable = new CountIterable();
    Series.defaultEmptyIterable = new EmptyIterable();
    return Series;
}());
/**
 * @hidden
 * A series that has been ordered.
 */
var OrderedSeries = /** @class */ (function (_super) {
    __extends(OrderedSeries, _super);
    function OrderedSeries(config) {
        var _this = this;
        var valueSortSpecs = [];
        var pairSortSpecs = [];
        var sortLevel = 0;
        var parent = config.parent;
        while (parent !== null) {
            var parentConfig = parent.config;
            valueSortSpecs.push(OrderedSeries.makeSortSpec(sortLevel, parentConfig.selector, parentConfig.direction));
            pairSortSpecs.push(OrderedSeries.makeSortSpec(sortLevel, OrderedSeries.makePairsSelector(parentConfig.selector), parentConfig.direction));
            ++sortLevel;
            parent = parentConfig.parent;
        }
        valueSortSpecs.push(OrderedSeries.makeSortSpec(sortLevel, config.selector, config.direction));
        pairSortSpecs.push(OrderedSeries.makeSortSpec(sortLevel, OrderedSeries.makePairsSelector(config.selector), config.direction));
        _this = _super.call(this, {
            values: new OrderedIterable(config.values, valueSortSpecs),
            pairs: new OrderedIterable(config.pairs, pairSortSpecs)
        }) || this;
        _this.config = config;
        return _this;
    }
    //
    // Helper function to create a sort spec.
    //
    OrderedSeries.makeSortSpec = function (sortLevel, selector, direction) {
        return { sortLevel: sortLevel, selector: selector, direction: direction };
    };
    //
    // Helper function to make a sort selector for pairs, this captures the parent correct when generating the closure.
    //
    OrderedSeries.makePairsSelector = function (selector) {
        return function (pair, index) { return selector(pair[1], index); };
    };
    /**
     * Applys additional sorting (ascending) to an already sorted series.
     *
     * @param selector User-defined selector that selects the additional value to sort by.
     *
     * @return Returns a new series has been additionally sorted by the value chosen by the selector function.
     *
     * @example
     * <pre>
     *
     * // Order sales by salesperson and then by amount (from least to most).
     * const ordered = sales.orderBy(sale => sale.SalesPerson).thenBy(sale => sale.Amount);
     * </pre>
     */
    OrderedSeries.prototype.thenBy = function (selector) {
        return new OrderedSeries({
            values: this.config.values,
            pairs: this.config.pairs,
            selector: selector,
            direction: Direction.Ascending,
            parent: this,
        });
    };
    /**
     * Applys additional sorting (descending) to an already sorted series.
     *
     * @param selector User-defined selector that selects the additional value to sort by.
     *
     * @return Returns a new series has been additionally sorted by the value chosen by the selector function.
     *
     * @example
     * <pre>
     *
     * // Order sales by salesperson and then by amount (from most to least).
     * const ordered = sales.orderBy(sale => sale.SalesPerson).thenByDescending(sale => sale.Amount);
     * </pre>
     */
    OrderedSeries.prototype.thenByDescending = function (selector) {
        return new OrderedSeries({
            values: this.config.values,
            pairs: this.config.pairs,
            selector: selector,
            direction: Direction.Descending,
            parent: this
        });
    };
    return OrderedSeries;
}(Series));

/**
 * Class that represents an index for a Series.
 */
var Index = /** @class */ (function (_super) {
    __extends(Index, _super);
    function Index(config) {
        return _super.call(this, config) || this;
    }
    /**
     * Get the type of the index.
     *
     * @returns Returns a string that specifies the type of the index.
     */
    Index.prototype.getType = function () {
        if (!this._type) {
            //
            // Detect the type.
            //
            if (this.any()) {
                this._type = determineType(this.first());
            }
            else {
                this._type = 'empty';
            }
        }
        return this._type;
    };
    /**
     * Get the less than operation for the index.
     *
     * @returns Returns a function that can be used to compare a value against an index value.
     */
    Index.prototype.getLessThan = function () {
        switch (this.getType()) {
            case "date":
                return function (d1, d2) { return moment(d1).isBefore(d2); };
            case "string":
            case "number":
                return function (v1, v2) { return v1 < v2; };
            case "empty":
                return function () { return true; }; // Series is empty, so this makes no difference.
            default:
                throw new Error("No less than operation available for type: " + this.getType());
        }
    };
    /**
     * Get the less than or equal to operation for the index.
     *
     * @returns Returns a function that can be used to compare a value against an index value.
     */
    Index.prototype.getLessThanOrEqualTo = function () {
        var _this = this;
        return function (v1, v2) { return !_this.getGreaterThan()(v1, v2); }; //TODO: Should expand  this out.
    };
    /**
     * Get the greater than operation for the index.
     *
     * @returns Returns a function that can be used to compare a value against an index value.
     */
    Index.prototype.getGreaterThan = function () {
        switch (this.getType()) {
            case "date":
                return function (d1, d2) { return moment(d1).isAfter(d2); };
            case "string":
            case "number":
                return function (v1, v2) { return v1 > v2; };
            case "empty":
                return function () { return true; }; // Series is empty, so this makes no difference.
            default:
                throw new Error("No greater than operation available for type: " + this.getType());
        }
    };
    return Index;
}(Series));

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var isBuffer = function isBuffer(arg) {
  return arg instanceof Buffer;
};

var inherits_browser = createCommonjsModule(function (module) {
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}
});

var inherits = createCommonjsModule(function (module) {
try {
  var util$1 = util;
  if (typeof util$1.inherits !== 'function') throw '';
  module.exports = util$1.inherits;
} catch (e) {
  module.exports = inherits_browser;
}
});

var util = createCommonjsModule(function (module, exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var length = output.reduce(function(prev, cur) {
    if (cur.indexOf('\n') >= 0) ;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = inherits;

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
};

exports.promisify.custom = kCustomPromisifiedSymbol;

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb, null, ret); },
            function(rej) { process.nextTick(callbackifyOnRejected, rej, cb); });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;
});
var util_1 = util.format;
var util_2 = util.deprecate;
var util_3 = util.debuglog;
var util_4 = util.inspect;
var util_5 = util.isArray;
var util_6 = util.isBoolean;
var util_7 = util.isNull;
var util_8 = util.isNullOrUndefined;
var util_9 = util.isNumber;
var util_10 = util.isString;
var util_11 = util.isSymbol;
var util_12 = util.isUndefined;
var util_13 = util.isRegExp;
var util_14 = util.isObject;
var util_15 = util.isDate;
var util_16 = util.isError;
var util_17 = util.isFunction;
var util_18 = util.isPrimitive;
var util_19 = util.isBuffer;
var util_20 = util.log;
var util_21 = util.inherits;
var util_22 = util._extend;
var util_23 = util.promisify;
var util_24 = util.callbackify;

moment.extend(customParseFormat);
/**
 * Convert a regular JavaScript obejct to a dataframe.
 * Each row in the dataframe represents a field from the object.
 *
 * @param obj - The JavaScript object to convert to a dataframe.
 *
 * @returns Returns a dataframe that lists the fields in the pass-in object.
 */
function fromObject(obj) {
    return new DataFrame(Object.keys(obj)
        .map(function (fieldName) { return ({
        Field: fieldName,
        Value: obj[fieldName],
    }); }));
}
/**
 * Deserialize a dataframe from a JSON text string.
 *
 * @param jsonTextString The JSON text to deserialize.
 *
 * @returns Returns a dataframe that has been deserialized from the JSON data.
 */
function fromJSON(jsonTextString) {
    if (!isString(jsonTextString))
        throw new Error("Expected 'jsonTextString' parameter to 'dataForge.fromJSON' to be a string containing data encoded in the JSON format.");
    return new DataFrame({
        values: JSON.parse(jsonTextString)
    });
}
/**
 * Deserialize a dataframe from a JSON5 text string.
 *
 * @param jsonTextString The JSON5 text to deserialize.
 *
 * @returns Returns a dataframe that has been deserialized from the JSON data.
 */
function fromJSON5(jsonTextString) {
    if (!isString(jsonTextString))
        throw new Error("Expected 'jsonTextString' parameter to 'dataForge.fromJSON5' to be a string containing data encoded in the JSON5 format.");
    return new DataFrame({
        values: JSON5.parse(jsonTextString)
    });
}
/**
 * Deserialize a DataFrame from a CSV text string.
 *
 * @param csvTextString The CSV text to deserialize.
 * @param [config] Optional configuration options for parsing the CSV data.
 *
 * @returns Returns a dataframe that has been deserialized from the CSV data.
 */
function fromCSV(csvTextString, config) {
    if (!isString(csvTextString))
        throw new Error("Expected 'csvTextString' parameter to 'dataForge.fromCSV' to be a string containing data encoded in the CSV format.");
    if (config) {
        if (!isObject(config))
            throw new Error("Expected 'config' parameter to 'dataForge.fromCSV' to be an object with CSV parsing configuration options.");
        if (config.columnNames) {
            if (!util_17(config.columnNames[Symbol.iterator])) {
                if (!isArray(config.columnNames))
                    throw new Error("Expect 'columnNames' field of 'config' parameter to DataForge.fromCSV to be an array or iterable of strings that specifies column names.");
            }
            try {
                for (var _a = __values(config.columnNames), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var columnName = _b.value;
                    if (!isString(columnName))
                        throw new Error("Expect 'columnNames' field of 'config' parameter to DataForge.fromCSV to be an array of strings that specify column names.");
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (config.skipEmptyLines === undefined) {
            config = Object.assign({}, config); // Clone the config. Don't want to modify the original.
            config.skipEmptyLines = true;
        }
    }
    else {
        config = {
            skipEmptyLines: true,
        };
    }
    var parsed = PapaParse.parse(csvTextString, config);
    var rows = parsed.data;
    if (rows.length === 0) {
        return new DataFrame();
    }
    var columnNames;
    rows = rows.map(function (row) {
        return row.map(function (cell) { return isString(cell) ? cell.trim() : cell; }); // Trim each cell that is still a string.
    });
    if (config && config.columnNames) {
        columnNames = config.columnNames;
    }
    else {
        columnNames = rows.shift();
    }
    return new DataFrame({
        rows: rows,
        columnNames: columnNames,
    });
    var e_1, _c;
}
var concat = Series.concat;
var zip = Series.zip;
/**
 * Generate a series from a range of numbers.
 *
 * @param start - The value of the first number in the range.
 * @param count - The number of sequential values in the range.
 *
 * @returns Returns a series with a sequence of generated values. The series contains 'count' values beginning at 'start'.
 */
function range(start, count) {
    if (!isNumber(start))
        throw new Error("Expect 'start' parameter to 'dataForge.range' function to be a number.");
    if (!isNumber(count))
        throw new Error("Expect 'count' parameter to 'dataForge.range' function to be a number.");
    var values = [];
    for (var valueIndex = 0; valueIndex < count; ++valueIndex) {
        values.push(start + valueIndex);
    }
    return new Series(values);
}
/**
 * Replicate a particular value N times to create a series.
 *
 * @param value The value to replicate.
 * @param count The number of times to replicate the value.
 *
 * @returns Returns a new series that contains N copies of the value.
 */
function replicate(value, count) {
    var values = [];
    for (var i = 0; i < count; ++i) {
        values.push(value);
    }
    return new Series(values);
}
/**
 * Generate a data-frame containing a matrix of values.
 *
 * @param numColumns - The number of columns in the data-frame.
 * @param numRows - The number of rows in the data-frame.
 * @param start - The starting value.
 * @param increment - The value to increment by for each new value.
 *
 * @returns Returns a dataframe that contains a matrix of generated values.
 */
function matrix(numColumns, numRows, start, increment) {
    if (!isNumber(numColumns))
        throw new Error("Expect 'numColumns' parameter to 'dataForge.matrix' function to be a number.");
    if (!isNumber(numRows))
        throw new Error("Expect 'numRows' parameter to 'dataForge.matrix' function to be a number.");
    if (!isNumber(start))
        throw new Error("Expect 'start' parameter to 'dataForge.matrix' function to be a number.");
    if (!isNumber(increment))
        throw new Error("Expect 'increment' parameter to 'dataForge.matrix' function to be a number.");
    var rows = [];
    var columnNames = [];
    var nextValue = start;
    for (var colIndex = 0; colIndex < numColumns; ++colIndex) {
        columnNames.push((colIndex + 1).toString());
    }
    for (var rowIndex = 0; rowIndex < numRows; ++rowIndex) {
        var row = [];
        for (var colIndex = 0; colIndex < numColumns; ++colIndex) {
            row.push(nextValue + (colIndex * increment));
        }
        nextValue += numColumns * increment;
        rows.push(row);
    }
    return new DataFrame({
        columnNames: columnNames,
        rows: rows,
    });
}

export { DataFrame, Index, Series, concat as concatSeries, fromCSV, fromJSON, fromJSON5, fromObject, matrix, range, replicate, zip as zipSeries };

