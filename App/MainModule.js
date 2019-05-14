/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
var app;
(function (app) {
    /**
    * The main module for this app.
    *
    * @type {ng.IModule}
    */
    app.MainModule = angular.module("MainModule", []);
    let urlParseRe = /^(([^@:/?#]*):(?:\/\/((?:([^@:/?#]*)(?::([^@:/?#]*))?@)?([^:/?#]*)(?::(\d+(?=[:/?#]|$)))?))?)?(([:/]+(?=(?:[^?#:/]+[:/]*)?(?:\?|\#|$))|[:/]*[^:/?#]+(?=[:/]+[^?#])(?:[:/]+[^:/?#]+(?=[:/]+[^?#]))*)?[:/]*((\.*(?:\.[^.:/?#]*(?=\.)|[^.:/?#]+)*)(?:\.([^.:/?#]*))?)[:/]*)(?:\?([^#]*))?(?:\#(.*))?$/;
    let trimRightRe = /^((\s*\S+)(\s+\S+)*)\s*$/;
    let trimLeftRe = /^\s*(\S.*)$/;
    let identifierRe = /^[a-z_][a-z\d]*$/i;
    let falseStringRe = /^(f(alse)?|no?|0+(\.0+)?)([^\w-]|$)/i;
    let numberStringRe = /^\d+(\.\d+)$/i;
    // #region Utility functions
    /**
     * Determines if a value is null or undefined.
     * @param {*} value Value to test.
     * @returns {boolean} true if value was null or undefined; otherwise, false.
     */
    function isNil(value) { return typeof (value) === 'undefined' || value === null; }
    app.isNil = isNil;
    function isNilOrEmpty(value) {
        return (typeof (value) !== 'string' && (typeof (value) != 'object' || value === null || !Array.isArray(value))) || value.length == 0;
    }
    app.isNilOrEmpty = isNilOrEmpty;
    function isNilOrWhiteSpace(value) { return typeof (value) !== 'string' || value.trim().length == 0; }
    app.isNilOrWhiteSpace = isNilOrWhiteSpace;
    function notNil(obj) { return typeof (obj) !== 'undefined' && obj != null; }
    app.notNil = notNil;
    function notNilOrEmpty(value) {
        return (typeof (value) == 'string' || (typeof (value) == 'object' && value != null && Array.isArray(value))) && value.length > 0;
    }
    app.notNilOrEmpty = notNilOrEmpty;
    function notNilOrWhiteSpace(value) { return typeof (value) == 'string' && value.trim().length > 0; }
    app.notNilOrWhiteSpace = notNilOrWhiteSpace;
    /**
     * Determines if value's type is an object.
     * @param {*} value Value to test.
     * @param {boolean} [noArray=false] If value is an array, return false.
     * @returns {boolean} true if value was null or undefined; otherwise, false.
     */
    function isObject(value, noArray) { return (typeof (value) == "object" && value !== null && !(noArray && Array.isArray(value))); }
    app.isObject = isObject;
    /**
     * Determines if a String represents a valid identifier name.
     * @param {string} text String to test.
     * @returns {boolean} true if value was a valid identifier name; otherwise, false.
     */
    function isValidIdentifierName(text) { return typeof (text) == "string" && identifierRe.test(text); }
    app.isValidIdentifierName = isValidIdentifierName;
    function asNotNil(value, opt, trim) {
        if (typeof (value) === "undefined" || value === null)
            return (typeof (opt) !== 'undefined') ? opt : '';
        if (typeof (value) !== 'string')
            return value;
        return ((typeof (opt) === "boolean") ? opt : trim === true) ? value.trim() : value;
    }
    app.asNotNil = asNotNil;
    function asString(value, trim = false, spec = false) {
        if (isNil(value))
            return (typeof (trim) === 'string') ? trim : ((typeof (spec) === 'string') ? spec : ((spec) ? value : ""));
        if (typeof (value) != "string") {
            if (Array.isArray(value))
                value = value.join("\n");
            else {
                try {
                    value = value.toString();
                }
                catch (err) { /* okay to ignnore */ }
                if (isNil(value))
                    return (typeof (trim) === 'string') ? trim : ((typeof (spec) === 'string') ? spec : ((spec) ? value : ""));
                if (typeof (value) != "string") {
                    try {
                        value = Object.prototype.toString.call(value);
                        if (isNil(value))
                            return (typeof (trim) === 'string') ? trim : ((typeof (spec) === 'string') ? spec : ((spec) ? value : ""));
                    }
                    catch (err) {
                        try {
                            value = value + "";
                        }
                        catch (err) {
                            if (typeof (trim) === 'string')
                                return trim;
                            if (typeof (spec) === 'string')
                                return spec;
                            if (spec)
                                return;
                            return "";
                        }
                    }
                }
            }
        }
        if (typeof (trim) === 'boolean' && trim)
            return value.trim();
        return value;
    }
    app.asString = asString;
    function stringBefore(source, search) {
        let i = source.indexOf(search);
        return (i < 0) ? source : source.substr(0, i);
    }
    app.stringBefore = stringBefore;
    /**
     * Ensures that a value is a floating-point number, converting it if necessary.
     * @param value
     * @param defaultValue
     * @returns {string} Input value converted to a floating-point number.
     */
    function asFloat(value, defaultValue = NaN) {
        if (typeof (value) === 'undefined' || value === null)
            return defaultValue;
        if (typeof (value) === 'number')
            return value;
        let n = parseFloat(value);
        if (isNaN(n))
            return defaultValue;
        return n;
    }
    app.asFloat = asFloat;
    /**
     * Ensures that a value is a whole number, converting it if necessary.
     * @param value
     * @param defaultValue
     * @returns {string} Input value converted to a whole number.
     */
    function asInt(value, defaultValue = NaN) {
        if (typeof (value) === 'undefined' || value === null)
            return defaultValue;
        if (typeof (value) === 'number')
            return value;
        let n = parseInt(value);
        if (isNaN(n))
            return defaultValue;
        return n;
    }
    app.asInt = asInt;
    /**
     * Trims trailing whitespace from text.
     * @param {string} text Text to trim.
     * @returns {string} Text with trailing whitespace removed.
     */
    function trimRight(text) {
        var m = trimRightRe.exec(asString(text));
        return (isNil(m)) ? "" : m[1];
    }
    app.trimRight = trimRight;
    /**
     * Trims leading whitespace from text.
     * @param {string} text Text to trim.
     * @returns {string} Text with leading whitespace removed.
     */
    function trimLeft(text) {
        var m = trimLeftRe.exec(asString(text));
        return (isNil(m)) ? "" : m[1];
    }
    app.trimLeft = trimLeft;
    function asBoolean(value, nilIsTrue = false) {
        if (isNil(value))
            return (nilIsTrue == true);
        if (typeof (value) == "boolean")
            return value;
        if (typeof (value) == "object") {
            if (!Array.isArray(value)) {
                if (typeof (value.valueOf) == "function") {
                    try {
                        value = value.valueOf();
                    }
                    catch (e) { }
                    if (isNil(value))
                        return (nilIsTrue == true);
                }
                if (typeof (value) != "object" || !Array.isArray(value))
                    value = [value];
                else if (value.length == 0)
                    return false;
            }
            else if (value.length == 0)
                return false;
        }
        else
            value = [value];
        if (nilIsTrue) {
            for (var i = 0; i < value.length; i++) {
                var v = value[i];
                if (isNil(v))
                    return true;
                if (typeof (v) == "boolean") {
                    if (v)
                        return true;
                    continue;
                }
                if (typeof (v) != "string") {
                    if (typeof (v.valueOf) == "function") {
                        try {
                            v = v.valueOf();
                        }
                        catch (e) { }
                        if (isNil(v))
                            return true;
                        if (typeof (v) == "boolean") {
                            if (v)
                                return true;
                            continue;
                        }
                    }
                    if (typeof (v) != "string")
                        v = asString(v);
                }
                if (v.length == 0 || (v = v.trim()).length == 0 || !falseStringRe.test(v))
                    return true;
            }
        }
        else {
            for (var i = 0; i < value.length; i++) {
                var v = value[i];
                if (isNil(v))
                    continue;
                if (typeof (v) == "boolean") {
                    if (v)
                        return true;
                    continue;
                }
                if (typeof (v) != "string") {
                    if (typeof (v.valueOf) == "function") {
                        try {
                            v = v.valueOf();
                        }
                        catch (e) { }
                        if (isNil(v))
                            continue;
                        if (typeof (v) == "boolean") {
                            if (v)
                                return true;
                            continue;
                        }
                    }
                    if (typeof (v) != "string")
                        v = asString(v);
                }
                if (v.length > 0 && (v = v.trim()).length > 0 && !falseStringRe.test(v))
                    return true;
            }
        }
        return false;
    }
    app.asBoolean = asBoolean;
    function notString(value) { return typeof (value) !== 'string'; }
    app.notString = notString;
    function asNotWhitespaceOrUndefined(value, trim) {
        if (typeof (value) === 'string') {
            if (trim === true) {
                if ((value = value.trim()).length > 0)
                    return value;
            }
            else if (value.trim().length > 0)
                return value;
        }
    }
    app.asNotWhitespaceOrUndefined = asNotWhitespaceOrUndefined;
    function asDefinedOrNull(value) { return (typeof (value) === undefined) ? null : value; }
    app.asDefinedOrNull = asDefinedOrNull;
    function asUndefinedIfNull(value) {
        if (typeof (value) !== undefined && value !== null)
            return value;
    }
    app.asUndefinedIfNull = asUndefinedIfNull;
    function asNotEmptyOrNull(value, trim) {
        if (typeof (value) === 'string') {
            if (trim) {
                if ((value = value.trim()).length > 0)
                    return value;
            }
            else if (value.trim().length > 0)
                return value;
        }
        return null;
    }
    app.asNotEmptyOrNull = asNotEmptyOrNull;
    function asNotWhitespaceOrNull(value, trim) {
        if (typeof (value) === 'string') {
            if (trim === true) {
                if ((value = value.trim()).length > 0)
                    return value;
            }
            else if (value.trim().length > 0)
                return value;
        }
        return null;
    }
    app.asNotWhitespaceOrNull = asNotWhitespaceOrNull;
    function asNotEmptyOrUndefined(value, trim) {
        if (typeof (value) !== 'undefined' && value !== null && value.length > 0)
            return (trim === true && typeof (value) === 'string') ? value.trim() : value;
    }
    app.asNotEmptyOrUndefined = asNotEmptyOrUndefined;
    function isError(value) {
        return typeof (value) == 'object' && value !== null && typeof (value.message) == 'string' && typeof (value.name) == 'string' &&
            (typeof (value.stack) == 'undefined' || value.stack === null || typeof (value.stack) == 'string');
    }
    app.isError = isError;
    function compareStrings(a, b) {
        if (typeof (a) === 'undefined')
            return (typeof (b) === 'undefined') ? 0 : -1;
        if (typeof (b) === 'undefined')
            return 1;
        if (a === null)
            return (b === null) ? 0 : -1;
        if (b === null)
            return 1;
        if (typeof (a) !== 'string')
            return (typeof (b) !== 'string') ? compareStrings(a.toString(), b.toString()) : 1;
        if (typeof (b) !== 'string')
            return -1;
        if (a === b)
            return 0;
        let n = a.localeCompare(b, undefined, { sensitivity: 'accent', numeric: true });
        if (n != 0 || (n = a.localeCompare(b, undefined, { numeric: true })) != 0 || (n = a.localeCompare(b)) != 0)
            return n;
        return (a < b) ? -1 : 1;
    }
    app.compareStrings = compareStrings;
    function isIterable(value) {
        if (typeof (value) !== 'object' || value == null)
            return false;
        if (Array.isArray(value))
            return true;
        let fn = value[Symbol.iterator];
        return (typeof (fn) === 'function');
    }
    app.isIterable = isIterable;
    function asIterable(source, allowNull = false) {
        if (typeof (source) === 'undefined')
            return [];
        if (source === null)
            return (allowNull) ? [null] : [];
        return (Array.isArray(source)) ? source : ((isIterable(source)) ? source : [source]);
    }
    app.asIterable = asIterable;
    function asArray(source, allowNull = false) {
        if (typeof (source) === 'undefined')
            return [];
        if (source === null)
            return (allowNull) ? [null] : [];
        if (Array.isArray(source))
            return source;
        if (isIterable(source)) {
            let iterator;
            let fn = source[Symbol.iterator];
            try {
                iterator = fn();
            }
            catch ( /* okay to ignore */_a) { /* okay to ignore */ }
            if (typeof (iterator) === 'object' && iterator !== null) {
                let result = [];
                try {
                    let ir = iterator.next();
                    if (allowNull)
                        while (!ir.done) {
                            if (typeof (ir.value) !== 'undefined')
                                result.push(ir.value);
                            ir = iterator.next();
                        }
                    else
                        while (!ir.done) {
                            if (typeof (ir.value) !== 'undefined' && ir.value !== null)
                                result.push(ir.value);
                            ir = iterator.next();
                        }
                }
                catch ( /* okay to ignore */_b) { /* okay to ignore */ }
                return result;
            }
        }
        return [source];
    }
    app.asArray = asArray;
    function skipFirst(source, spec, thisArg) {
        let result = [];
        let iterator = source[Symbol.iterator]();
        let ir = iterator.next();
        if (typeof (spec) === 'number')
            while (!ir.done) {
                if (spec < 1) {
                    result.push(ir.value);
                    while (!(ir = iterator.next()).done)
                        result.push(ir.value);
                    break;
                }
                spec--;
                ir = iterator.next();
            }
        else {
            let index = 0;
            if (typeof (thisArg) === 'undefined')
                while (!ir.done) {
                    if (!spec(ir.value, index++, source)) {
                        result.push(ir.value);
                        while (!(ir = iterator.next()).done)
                            result.push(ir.value);
                        break;
                    }
                    ir = iterator.next();
                }
            else
                while (!ir.done) {
                    if (!spec.call(thisArg, ir.value, index++, source)) {
                        result.push(ir.value);
                        while (!(ir = iterator.next()).done)
                            result.push(ir.value);
                        break;
                    }
                    ir = iterator.next();
                }
        }
        return result;
    }
    app.skipFirst = skipFirst;
    function skipLast(source, spec, thisArg) {
        let result = reverse(source);
        if (typeof (spec) === 'number') {
            while (result.length > 0 && spec-- > 0)
                result.shift();
        }
        else if (typeof (thisArg) === 'undefined') {
            while (result.length > 0 && spec(result[0], result.length - 1, source))
                result.shift();
        }
        else {
            while (result.length > 0 && spec.call(thisArg, result[0], result.length - 1, source))
                result.shift();
        }
        return result.reverse();
    }
    app.skipLast = skipLast;
    function takeFirst(source, spec, thisArg) {
        let result = [];
        let iterator = source[Symbol.iterator]();
        let ir = iterator.next();
        if (typeof (spec) === 'number')
            while (!ir.done && spec-- > 0) {
                result.push(ir.value);
                ir = iterator.next();
            }
        else {
            let index = 0;
            if (typeof (thisArg) === 'undefined')
                while (!ir.done && spec(ir.value, index++, source)) {
                    result.push(ir.value);
                    ir = iterator.next();
                }
            else
                while (!ir.done && spec.call(thisArg, ir.value, index++, source)) {
                    result.push(ir.value);
                    ir = iterator.next();
                }
        }
        return result;
    }
    app.takeFirst = takeFirst;
    function takeLast(source, spec, thisArg) {
        let result = reverse(source);
        if (typeof (spec) === 'number')
            while (result.length > 0 && spec)
                result.pop();
        else if (typeof (thisArg) === 'undefined')
            while (result.length > 0 && spec(result[0], result.length - 1, source))
                result.shift();
        else
            while (result.length > 0 && spec.call(thisArg, result[0], result.length - 1, source))
                result.shift();
        return result.reverse();
    }
    app.takeLast = takeLast;
    function filter(source, callbackfn, thisArg) {
        let result = [];
        let iterator = source[Symbol.iterator]();
        let ir = iterator.next();
        let index = 0;
        if (typeof (thisArg) === 'undefined')
            while (!ir.done) {
                if (callbackfn(ir.value, index++, source))
                    result.push(ir.value);
                ir = iterator.next();
            }
        else
            while (!ir.done) {
                if (callbackfn.call(thisArg, ir.value, index++, source))
                    result.push(ir.value);
                ir = iterator.next();
            }
        return result;
    }
    app.filter = filter;
    function first(source, callbackfn, thisArg) {
        let iterator = source[Symbol.iterator]();
        let r = iterator.next();
        let index = 0;
        if (typeof (thisArg) !== 'undefined')
            while (!r.done) {
                if (callbackfn.call(thisArg, r.value, index++, source))
                    return r.value;
                r = iterator.next();
            }
        else
            while (!r.done) {
                if (callbackfn(r.value, index, source))
                    return r.value;
                r = iterator.next();
            }
    }
    app.first = first;
    function indexOf(source, callbackfn, thisArg) {
        let iterator = source[Symbol.iterator]();
        let r = iterator.next();
        let index = 0;
        if (typeof (thisArg) !== 'undefined')
            while (!r.done) {
                if (callbackfn.call(thisArg, r.value, index++, source))
                    return index;
                r = iterator.next();
            }
        else
            while (!r.done) {
                if (callbackfn(r.value, index, source))
                    return index;
                r = iterator.next();
            }
    }
    app.indexOf = indexOf;
    function last(source, callbackfn, thisArg) {
        let iterator = source[Symbol.iterator]();
        let r = iterator.next();
        let result;
        let index = 0;
        if (typeof (thisArg) !== 'undefined')
            while (!r.done) {
                if (callbackfn.call(thisArg, r.value, index++, source))
                    result = r.value;
                r = iterator.next();
            }
        else
            while (!r.done) {
                if (callbackfn(r.value, index++, source))
                    result = r.value;
                r = iterator.next();
            }
        return result;
    }
    app.last = last;
    function join(source, separator) {
        if (Array.isArray(source))
            return source.join(separator);
        let iterator = source[Symbol.iterator]();
        let r = iterator.next();
        let result = [];
        let index = 0;
        while (!r.done) {
            result.push(r.value);
            r = iterator.next();
        }
        return result.join(separator);
    }
    app.join = join;
    function reverse(source) {
        let result = [];
        let iterator = source[Symbol.iterator]();
        let ir = iterator.next();
        let index = 0;
        while (!ir.done) {
            result.unshift(ir.value);
            ir = iterator.next();
        }
        return result;
    }
    app.reverse = reverse;
    function indexOfAny(value, position, ...searchString) {
        let result;
        if (typeof (position) === 'number') {
            result = -1;
            searchString.forEach((s) => {
                if (s.length > 0) {
                    let i = value.indexOf(s, position);
                    if (i > -1 && (result < 0 || i < result))
                        result = i;
                }
            });
        }
        else {
            searchString.forEach((s) => {
                if (s.length > 0) {
                    let i = value.indexOf(s);
                    if (i > -1 && (result < 0 || i < result))
                        result = i;
                }
            });
        }
        return result;
    }
    app.indexOfAny = indexOfAny;
    function map(source, callbackfn, thisArg) {
        let iterator = source[Symbol.iterator]();
        let r = iterator.next();
        let result = [];
        let index = 0;
        if (typeof (thisArg) !== 'undefined')
            while (!r.done) {
                result.push(callbackfn.call(thisArg, r.value, index++, source));
                r = iterator.next();
            }
        else
            while (!r.done) {
                result.push(callbackfn(r.value, index++, source));
                r = iterator.next();
            }
        return result;
    }
    app.map = map;
    function every(source, callbackfn, thisArg) {
        let iterator = source[Symbol.iterator]();
        let r = iterator.next();
        let index = 0;
        if (typeof (thisArg) !== 'undefined')
            while (!r.done) {
                if (!callbackfn.call(thisArg, r.value, index++, source))
                    return false;
                r = iterator.next();
            }
        else
            while (!r.done) {
                if (!callbackfn(r.value, index++, source))
                    return false;
                r = iterator.next();
            }
        return true;
    }
    app.every = every;
    function some(source, callbackfn, thisArg) {
        let iterator = source[Symbol.iterator]();
        let r = iterator.next();
        let index = 0;
        if (typeof (thisArg) !== 'undefined')
            while (!r.done) {
                if (callbackfn.call(thisArg, r.value, index++, source))
                    return true;
                r = iterator.next();
            }
        else
            while (!r.done) {
                if (callbackfn(r.value, index++, source))
                    return true;
                r = iterator.next();
            }
        return true;
    }
    app.some = some;
    function forEach(source, callbackfn, thisArg) {
        let iterator = source[Symbol.iterator]();
        let r = iterator.next();
        let index = 0;
        if (typeof (thisArg) !== 'undefined')
            while (!r.done) {
                callbackfn.call(thisArg, r.value, index++, source);
                r = iterator.next();
            }
        else
            while (!r.done) {
                callbackfn(r.value, index++, source);
                r = iterator.next();
            }
    }
    app.forEach = forEach;
    function reduce(source, callbackfn, initialValue) {
        let iterator = source[Symbol.iterator]();
        let r = iterator.next();
        let result = initialValue;
        let index = 0;
        while (!r.done) {
            result = callbackfn(result, r.value, index++, source);
            r = iterator.next();
        }
        return result;
    }
    app.reduce = reduce;
    function unique(source, callbackfn, thisArg) {
        if (typeof (callbackfn) !== 'function')
            callbackfn = function (x, y) { return x === y; };
        let iterator = source[Symbol.iterator]();
        let r = iterator.next();
        let result = [];
        if (!r.done) {
            result.push(r.value);
            r = iterator.next();
            let index = 0;
            if (typeof (thisArg) !== 'undefined')
                while (!r.done) {
                    if (!result.some((value) => callbackfn.call(thisArg, r.value, value)))
                        result.push(r.value);
                    r = iterator.next();
                }
            else
                while (!r.done) {
                    if (!result.some((value) => callbackfn(r.value, value)))
                        result.push(r.value);
                    r = iterator.next();
                }
        }
        return result;
    }
    app.unique = unique;
    function areSequencesEqual(source, target, callbackfn, thisArg) {
        if (typeof (source) != typeof (target) || (Array.isArray(source) && Array.isArray(target) && source.length != target.length))
            return false;
        let iteratorX = source[Symbol.iterator]();
        let iteratorY = target[Symbol.iterator]();
        let resultX = iteratorX.next();
        let resultY = iteratorY.next();
        if (typeof (callbackfn) !== 'function')
            while (!resultX.done) {
                if (resultY.done || resultX.value !== resultY.value)
                    return false;
                resultX = iteratorX.next();
                resultY = iteratorY.next();
            }
        else if (typeof (thisArg) === 'undefined') {
            let index = -1;
            while (!resultX.done) {
                if (resultY.done || !callbackfn.call(thisArg, resultX.value, resultY.value, ++index))
                    return false;
                resultX = iteratorX.next();
                resultY = iteratorY.next();
            }
        }
        else {
            let index = -1;
            while (!resultX.done) {
                if (resultY.done || !callbackfn(resultX.value, resultY.value, ++index))
                    return false;
                resultX = iteratorX.next();
                resultY = iteratorY.next();
            }
        }
        return resultY.done;
    }
    app.areSequencesEqual = areSequencesEqual;
    // #endregion
    // #region URIBuilder
    let schemeParseRe = /^([^\\\/:@]*:)[\\\/]{0,2}/;
    let originStartValidateRe = /^[a-z][a-z\d_\-]+:(\/\/?)?[^\\]/;
    let portValidateRe = /^0*(6(5(5(3[0-5]?|[012]\d?|[4-9]?)|([0-4]\d?|[6-9])\d?)?|([0-4]\d?|[6-9])\d{0,2})?|([1-5]\d?|[7-9])\d{0,3})$/;
    let userInfoParseRe = /^([^\\\/:@]+)?(:([^\\\/:@]+)?)?@/;
    let hostAndPortParseRe = /^([^\\\/:]+)?(:(\d+)?)?/;
    class URIBuilder {
        constructor() {
            this._href = '';
            this._origin = '';
            this._protocol = '';
            this._username = undefined;
            this._password = undefined;
            this._host = '';
            this._hostname = '';
            this._port = undefined;
            this._pathname = '';
            this._pathSegments = undefined;
            this._search = undefined;
            this._searchParams = undefined;
            this._hash = '';
            this._isWellFormed = undefined;
            this._isAbsolute = false;
        }
        get isWellFormed() {
            if (typeof (this._isWellFormed) === 'boolean')
                return this._isWellFormed;
            if (this._origin.length > 0) {
                let m = originStartValidateRe.exec(this._origin);
                if (isNil(m) || (typeof (this._port) === 'string' && (this._port.length == 0 || this._hostname.length == 0 || !portValidateRe.test(this._port))) ||
                    (this._hostname.length > 0 && encodeURIComponent(this._hostname) !== this._hostname)) {
                    this._isWellFormed = false;
                    return false;
                }
                if (typeof (this._username) === 'string' || typeof (this._password) === 'string') {
                    if (this._hostname.length == 0) {
                        this._isWellFormed = false;
                        return false;
                    }
                    let i = this._origin.indexOf('@');
                    let userInfo = this._origin.substr(m[0].length, i - m[0].length);
                    if (typeof (this._password) === 'string') {
                        i = userInfo.indexOf(':');
                        let pw = userInfo.substr(i + 1);
                        if (pw.length > 0 && encodeURIComponent(this._password) !== userInfo.substr(i + 1)) {
                            this._isWellFormed = false;
                            return false;
                        }
                        userInfo = userInfo.substr(0, i);
                    }
                    if (typeof (this._username) === 'string' && userInfo.length > 0 && encodeURIComponent(this._username) !== userInfo) {
                        this._isWellFormed = false;
                        return false;
                    }
                }
            }
            this._isWellFormed = (this._search.length == 0 || this._search.split('&').filter((s) => {
                if (s.length == 0)
                    return true;
                let i = s.indexOf('=');
                if (i == 0)
                    return true;
                if (i > 0) {
                    if (i < s.length - 1) {
                        let v = s.substr(i + 1);
                        if (encodeURIComponent(decodeURIComponent(v)) != v)
                            return true;
                    }
                    s = s.substr(0, i);
                }
                return encodeURIComponent(decodeURIComponent(s)) != s;
            }).length == 0) && (this._hash.length == 0 || this._href.substr(this._href.indexOf('#') + 1) === encodeURI(this._hash.substr(1)));
            return this._isWellFormed;
        }
        get href() { return this._href; }
        set href(value) {
            value = asNotNil(value, '');
            if (value === this._href)
                return;
            this._href = value;
            this._isWellFormed = undefined;
            let i = value.indexOf('#');
            if (i < 0)
                this._hash = '';
            else {
                this._hash = decodeURI(value.substr(i));
                value = value.substr(0, i);
            }
            i = value.indexOf('?');
            if (i < 0)
                this._search = '';
            else {
                this._search = value.substr(i);
                value = value.substr(0, i);
            }
            let m = schemeParseRe.exec(value);
            if (isNil(m)) {
                this._origin = this._protocol = this._host = this._host = '';
                this._username = this._password = this._port = undefined;
                this._pathname = value;
                this._isAbsolute = false;
                return;
            }
            this._isAbsolute = true;
            this._protocol = m[1];
            this._origin = m[0];
            value = value.substr(m[0].length);
            m = userInfoParseRe.exec(value);
            if (!isNil(m)) {
                this._username = (isNil(m[1])) ? '' : m[1];
                this._password = (isNil(m[2])) ? undefined : ((isNil(m[3])) ? '' : m[3]);
                value = value.substr(m[0].length);
            }
            else
                this._username = this._password = undefined;
            m = hostAndPortParseRe.exec(value);
            if (isNil(m)) {
                this._host = this._hostname = '';
                this._port = undefined;
                this._pathname = value;
            }
            else {
                this._host = m[0];
                this._hostname = (isNil(m[1])) ? '' : m[1];
                this._port = (isNil(m[2])) ? undefined : ((isNil(m[3])) ? '' : m[3]);
                this._pathname = value.substr(m[0].length);
            }
        }
        get origin() { return this._origin; }
        set origin(value) {
            value = asNotNil(value, '');
            if (value === this._origin)
                return;
            if (value.length == 0) {
                this._isWellFormed = undefined;
                this._origin = this._protocol = this._host = this._host = '';
                this._username = this._password = this._port = undefined;
                this._isAbsolute = false;
                return;
            }
            if (value.indexOf('#') > -1)
                throw new Error("Origin cannot contain a fragment");
            if (value.indexOf('?') > -1)
                throw new Error("Origin cannot contain a query");
            let m = schemeParseRe.exec(value);
            if (isNil(m))
                throw new Error("Origin must contain a scheme if it is not empty");
            let protocol = m[1];
            let origin = m[0];
            value = value.substr(m[0].length);
            m = userInfoParseRe.exec(value);
            let username, password;
            if (!isNil(m)) {
                username = (isNil(m[1])) ? '' : m[1];
                password = (isNil(m[2])) ? undefined : ((isNil(m[3])) ? '' : m[3]);
                value = value.substr(m[0].length);
            }
            else
                username = password = undefined;
            m = hostAndPortParseRe.exec(value);
            if (isNil(m)) {
                if (value.length > 0)
                    throw new Error("Origin cannot contain path references");
                this._host = this._hostname = '';
                this._port = undefined;
            }
            else {
                if (value.length > m[0].length)
                    throw new Error("Origin cannot contain path references");
                this._host = m[0];
                this._hostname = (isNil(m[1])) ? '' : m[1];
                this._port = (isNil(m[2])) ? undefined : ((isNil(m[3])) ? '' : m[3]);
            }
            this._isWellFormed = undefined;
            this._isAbsolute = true;
            this._protocol = protocol;
            this._origin = origin;
            this._username = username;
            this._password = password;
        }
        get protocol() { return this._protocol; }
        set protocol(value) {
            value = asNotNil(value, '');
            if (value === this._protocol)
                return;
            let m;
            if (value.length > 0) {
                if (!value.endsWith(':'))
                    value += ':';
                if (value === this._protocol)
                    return;
                if (value.length > 1) {
                    m = schemeParseRe.exec(value);
                    if (isNil(m) || m[1].length != value.length)
                        throw new Error("Invalid protocol format");
                }
            }
            this._protocol = value;
            if (value.length === 0)
                this._origin = '';
            else {
                m = schemeParseRe.exec(this._origin);
                if (m[0].length > m[1].length)
                    this._origin = this._protocol + m[0].substr(m[1].length);
                else
                    this._origin = this._protocol;
                this._origin = this._protocol;
                if (typeof (this._username) === 'string')
                    this._origin += ((typeof (this._password) === 'string') ? encodeURIComponent(this._username) + ':' + encodeURIComponent(this._password) : encodeURIComponent(this._username)) + '@';
                else if (typeof (this._password) === 'string')
                    this._origin += ':' + encodeURIComponent(this._password) + '@';
                this._origin += this._hostname;
                if (typeof (this._port) === 'string')
                    this._origin += ':' + this._port;
            }
            this._href = this._origin + this._pathname + this._search + this._hash;
            this._isWellFormed = undefined;
        }
        rebuildHref() {
            if (this._origin.length > 0) {
                let m = schemeParseRe.exec(this._origin);
                if (m[0].length > m[1].length)
                    this._origin = this._protocol + m[0].substr(m[1].length);
                else
                    this._origin = this._protocol;
                this._origin = this._protocol;
                if (typeof (this._username) === 'string')
                    this._origin += ((typeof (this._password) === 'string') ? encodeURIComponent(this._username) + ':' + encodeURIComponent(this._password) : encodeURIComponent(this._username)) + '@';
                else if (typeof (this._password) === 'string')
                    this._origin += ':' + encodeURIComponent(this._password) + '@';
                this._origin += this._hostname;
                if (typeof (this._port) === 'string')
                    this._origin += ':' + this._port;
            }
            this._href = this._origin + this._pathname + this._search + this._hash;
            this._isWellFormed = undefined;
        }
        get username() { return this._username; }
        set username(value) {
            if (isNil(value)) {
                if (typeof (this._username) !== 'string')
                    return;
                this._username = undefined;
            }
            else {
                if (this._username === value)
                    return;
                this._username = value;
            }
            this.rebuildHref();
        }
        get password() { return this._password; }
        set password(value) {
            if (isNil(value)) {
                if (typeof (this._password) !== 'string')
                    return;
                this._password = undefined;
            }
            else {
                if (this._password === value)
                    return;
                this._password = value;
            }
            this.rebuildHref();
        }
        get host() { return this._host; }
        set host(value) {
            value = asNotNil(value, '');
            if (value === this._host)
                return;
            this._host = value;
            let i = this._host.indexOf(':');
            if (i < 0) {
                this._hostname = this._host;
                this._port = undefined;
            }
            else {
                this._hostname = this._host.substr(0, i);
                this._port = this._host.substr(i + 1);
            }
            this.rebuildHref();
        }
        get hostname() { return this._hostname; }
        set hostname(value) {
            value = asNotNil(value, '');
            if (value === this._hostname)
                return;
            this._hostname = value;
            this.rebuildHref();
        }
        get port() { return this._port; }
        set port(value) {
            if (isNil(value)) {
                if (typeof (this._port) !== 'string')
                    return;
                this._password = undefined;
            }
            else {
                if (this._port === value)
                    return;
                this._port = value;
            }
            this.rebuildHref();
        }
        get pathname() { return this._pathname; }
        set pathname(value) {
            value = asNotNil(value, '');
            if (value === this._pathname)
                return;
            if (value.length > 0 && this._isAbsolute && !(value.startsWith(':') || value.startsWith('/') || value.startsWith('\\')))
                value += '/' + value;
            this._pathname = value;
            this.rebuildHref();
        }
        get search() { return this._search; }
        set search(value) {
            value = asNotNil(value, '');
            if (value === this._search)
                return;
            if (value.indexOf('#') > -1)
                throw new Error("Search cannot contain a fragment");
            if (value.length > 0 && !value.startsWith('?'))
                value += '?' + value;
            this._search = value;
            this.rebuildHref();
        }
        get searchParams() { return this._searchParams; }
        get hash() { return this._hash; }
        set hash(value) {
            value = asNotNil(value, '');
            if (value === this._hash)
                return;
            if (value.length > 0 && !value.startsWith('#'))
                value += '#' + value;
            this._hash = value;
            this.rebuildHref();
        }
        toJSON() {
            throw new Error("Method not implemented.");
        }
    }
    function initializePageNavigationScope(parentScope, controller, location, http) {
        let scope = parentScope.pageNavigation = (parentScope.$new());
        scope.top = (scope.pageNavigation.$new());
        scope.top.items = [];
        scope.top.currentItemIndex = -1;
        scope.side = (scope.pageNavigation.$new());
        scope.side.items = [];
        scope.side.currentItemIndex = -1;
        http.get("./pageNavigation.json").then((nav) => {
            let pageName = location.path().split("/").reduce((previousValue, currentValue) => { return (currentValue.length > 0) ? currentValue : previousValue; }, "").toLowerCase();
            if (isNil(nav.data))
                alert("Failed to load navigation from ./pageNavigation.json. Reason (" + nav.status + "): " + nav.statusText);
            else if (typeof (nav.data.items) === 'undefined')
                alert("Failed to load navigation from ./pageNavigation.json. Reason: No items returned. Status: (" + nav.status + "): " + nav.statusText);
            else {
                nav.data.items.forEach((d, index) => {
                    let item = toNavItem(pageName, nav.data, scope.top, d);
                    if ((item.isCurrent || item.currentItemIndex > -1) && scope.top.currentItemIndex < 0)
                        scope.top.currentItemIndex = index;
                });
                if (scope.top.currentItemIndex > -1) {
                    let sideItem = scope.top.items[scope.top.currentItemIndex];
                    scope.side.items = sideItem.items;
                    scope.side.currentItemIndex = sideItem.currentItemIndex;
                    sideItem.items = [];
                    sideItem.currentItemIndex = -1;
                }
                let container = (scope.side.currentItemIndex < 0) ? scope.top : scope.side;
                let selectedItem = container.items[(container.currentItemIndex < 0) ? 0 : container.currentItemIndex];
                while (!selectedItem.isCurrent) {
                    if (selectedItem.currentItemIndex < 0)
                        break;
                    selectedItem = selectedItem.items[selectedItem.currentItemIndex];
                }
                scope.pageTitle = selectedItem.pageTitle;
            }
        }).catch((reason) => {
            if (!isNil(reason)) {
                if (typeof (reason) !== 'string') {
                    try {
                        alert("Failed to load navigation from ./pageNavigation.json. Reason: " + JSON.stringify(reason) + ".");
                    }
                    catch (_a) {
                        alert("Failed to load navigation from ./pageNavigation.json. Reason: " + reason + ".");
                    }
                }
                else if ((reason = reason.trim()).length > 0)
                    alert("Failed to load navigation from ./pageNavigation.json. Reason: " + reason);
            }
            alert("Failed to load navigation from ./pageNavigation.json. Reason: unknown.");
        });
    }
    function toNavItem(pageName, config, container, definition) {
        let item = (container.$new());
        item.linkTitle = definition.linkTitle;
        item.pageTitle = (isNilOrWhiteSpace(definition.pageTitle)) ? definition.linkTitle : definition.pageTitle;
        item.currentItemIndex = -1;
        if (pageName === definition.url) {
            item.href = '#';
            item.class = config.currentItemClass;
            item.isCurrent = true;
            item.onClick = () => { return false; };
        }
        else {
            item.isCurrent = false;
            item.href = definition.url;
            item.class = config.otherItemClass;
            item.onClick = () => { return true; };
        }
        item.items = [];
        if (!isNilOrEmpty(definition.items)) {
            definition.items.forEach((d, index) => {
                let childItem = toNavItem(pageName, config, item, d);
                if ((childItem.isCurrent || childItem.currentItemIndex > -1) && item.currentItemIndex < 0) {
                    item.currentItemIndex = index;
                    item.class = config.selectedItemClass;
                }
            });
        }
        container.items.push(item);
        return item;
    }
    // #endregion
    app.MainModule.directive("mainAppPageHead", () => {
        return {
            restrict: "E",
            scope: true,
            templateUrl: 'Template/mainAppPageHead.htm'
        };
    });
    class MainController {
        constructor($scope, $rootScope, $location, $http) {
            this.$scope = $scope;
            this.$location = $location;
            this.$http = $http;
            let settings = setupParameterDefinitionsController.getSettings();
            $scope.serviceNowUrl = settings.serviceNowUrl;
            $scope.gitRepositoryBaseUrl = settings.gitRepositoryBaseUrl;
            $rootScope.$on(app.BroadcastEvent_SetupParametersChanged, (event, values) => {
                $scope.serviceNowUrl = values.serviceNowUrl;
                $scope.gitRepositoryBaseUrl = values.gitRepositoryBaseUrl;
            });
            initializePageNavigationScope($scope, this, $location, $http);
            $scope.showSetupParametersEditDialog = () => { setupParameterDefinitionsController.show($scope); };
        }
        $doCheck() { }
        showSetupParametersEditDialog() { setupParameterDefinitionsController.show(this.$scope); }
        hideSetupParametersEditDialog() { setupParameterDefinitionsController.hide(this.$scope); }
        showModalDialogMessage(message, type = 'info', title) { mainModalPopupDialogController.show(this.$scope, message, type, title); }
        hideModalDialogMessage() { mainModalPopupDialogController.hide(this.$scope); }
    }
    app.MainModule.controller("MainController", ['$scope', '$rootScope', "$location", "$http", MainController]);
    class MainControllerChild {
        constructor($scope) {
            this.$scope = $scope;
        }
        $doCheck() { }
        showSetupParametersEditDialog() { setupParameterDefinitionsController.show(this.$scope); }
        hideSetupParametersEditDialog() { setupParameterDefinitionsController.hide(this.$scope); }
        showModalDialogMessage(message, type = 'info', title) { mainModalPopupDialogController.show(this.$scope, message, type, title); }
        hideModalDialogMessage() { mainModalPopupDialogController.hide(this.$scope); }
    }
    app.MainControllerChild = MainControllerChild;
    app.BroadcastEvent_OpenMainModalPopupDialog = 'OpenMainModalPopupDialog';
    app.BroadcastEvent_CloseMainModalPopupDialog = 'CloseMainModalPopupDialog';
    class mainModalPopupDialogController extends MainControllerChild {
        constructor($scope, $rootScope) {
            super($scope);
            $scope.title = '';
            $scope.message = '';
            $scope.bodyClass = '';
            $scope.close = () => { $('#mainModalPopupDialog').modal('hide'); };
            $rootScope.$on(app.BroadcastEvent_OpenMainModalPopupDialog, (event, message, type, title) => {
                if (isNilOrWhiteSpace(title)) {
                    switch (type) {
                        case 'warning':
                            $scope.title = 'Warning';
                            break;
                        case 'danger':
                            $scope.title = 'Critical';
                            break;
                        case 'success':
                            $scope.title = 'Success';
                            break;
                        default:
                            $scope.title = 'Notice';
                    }
                }
                else
                    $scope.title = title;
                $scope.bodyClass = 'modal-body alert alert-' + type;
                $scope.message = (isNil(message)) ? '' : message;
                $('#mainModalPopupDialog').modal('show');
            });
            $rootScope.$on(app.BroadcastEvent_CloseMainModalPopupDialog, (event) => { $('#mainModalPopupDialog').modal('hide'); });
        }
        static show($scope, message, type, title) {
            $scope.$emit(app.BroadcastEvent_OpenMainModalPopupDialog, message, type, title);
        }
        static hide($scope) {
            $scope.$emit(app.BroadcastEvent_CloseMainModalPopupDialog);
        }
    }
    app.mainModalPopupDialogController = mainModalPopupDialogController;
    app.MainModule.controller("mainModalPopupDialogController", ['$scope', '$rootScope', mainModalPopupDialogController]);
    // #endregion
    // #region SetupParameters
    app.uriParseRegex = /^(([^\\\/@:]*)(:[\\\/]{0,2})((?=[^\\\/@:]*(?::[^\\\/@:]*)?@)([^\\\/@:]*)(:[^\\\/@:]*)?@)?([^\\\/@:]*)(?:(?=:\d*(?:[\\\/:]|$)):(\d*))?(?=[\\\/:]|$))?(.+)?$/;
    let uriParseGroup;
    (function (uriParseGroup) {
        uriParseGroup[uriParseGroup["all"] = 0] = "all";
        uriParseGroup[uriParseGroup["origin"] = 1] = "origin";
        uriParseGroup[uriParseGroup["schemeName"] = 2] = "schemeName";
        uriParseGroup[uriParseGroup["schemeSeparator"] = 3] = "schemeSeparator";
        uriParseGroup[uriParseGroup["userInfo"] = 4] = "userInfo";
        uriParseGroup[uriParseGroup["username"] = 5] = "username";
        uriParseGroup[uriParseGroup["password"] = 6] = "password";
        uriParseGroup[uriParseGroup["hostname"] = 7] = "hostname";
        uriParseGroup[uriParseGroup["portnumber"] = 8] = "portnumber";
        uriParseGroup[uriParseGroup["path"] = 9] = "path";
    })(uriParseGroup = app.uriParseGroup || (app.uriParseGroup = {}));
    let cssValidationClass;
    (function (cssValidationClass) {
        cssValidationClass["isValid"] = "is-valid";
        cssValidationClass["isInvalid"] = "is-invalid";
    })(cssValidationClass = app.cssValidationClass || (app.cssValidationClass = {}));
    let cssFeedbackClass;
    (function (cssFeedbackClass) {
        cssFeedbackClass["isValid"] = "is-valid";
        cssFeedbackClass["isInvalid"] = "is-invalid";
    })(cssFeedbackClass = app.cssFeedbackClass || (app.cssFeedbackClass = {}));
    app.BroadcastEvent_SetupParametersChanged = 'setupParameterDefinitionsChanged';
    app.BroadcastEvent_ShowSetupParametersDialog = 'showSetupParameterDefinitionsControllerDialog';
    app.BroadcastEvent_HideSetupParametersDialog = 'hideSetupParameterDefinitionsControllerDialog';
    class setupParameterDefinitionsController extends MainControllerChild {
        constructor($scope, $rootScope) {
            super($scope);
            let settings = setupParameterDefinitionsController.getSettings();
            $scope.serviceNowUrlField = ($scope.$new());
            $scope.serviceNowUrlField.original = $scope.serviceNowUrlField.text = $scope.serviceNowUrlField.lastValidated = settings.serviceNowUrl;
            $scope.serviceNowUrlField.validationMessage = '';
            $scope.serviceNowUrlField.validationClass = ['form-control', cssValidationClass.isValid];
            $scope.serviceNowUrlField.messageClass = ['invalid-feedback'];
            $scope.serviceNowUrlField.isValid = true;
            $scope.gitRepositoryBaseUrlField = ($scope.$new());
            $scope.gitRepositoryBaseUrlField.original = $scope.gitRepositoryBaseUrlField.text = $scope.gitRepositoryBaseUrlField.lastValidated = settings.gitRepositoryBaseUrl;
            $scope.gitRepositoryBaseUrlField.validationMessage = '';
            $scope.gitRepositoryBaseUrlField.validationClass = ['form-control', cssValidationClass.isValid];
            $scope.gitRepositoryBaseUrlField.messageClass = ['invalid-feedback'];
            $scope.gitRepositoryBaseUrlField.isValid = true;
            $scope.message = '';
            $scope.bodyClass = '';
            $scope.close = () => { $('#setupParametersDialog').modal('hide'); };
            $scope.cancel = () => {
                $scope.serviceNowUrlField.text = $scope.gitRepositoryBaseUrlField.lastValidated = $scope.gitRepositoryBaseUrlField.original;
                $scope.serviceNowUrlField.validationMessage = '';
                $scope.serviceNowUrlField.validationClass = ['form-control', cssValidationClass.isValid];
                $scope.serviceNowUrlField.messageClass = ['invalid-feedback'];
                $scope.serviceNowUrlField.isValid = true;
                $scope.gitRepositoryBaseUrlField.text = $scope.gitRepositoryBaseUrlField.lastValidated = $scope.gitRepositoryBaseUrlField.original;
                $scope.gitRepositoryBaseUrlField.validationMessage = '';
                $scope.gitRepositoryBaseUrlField.validationClass = ['form-control', cssValidationClass.isValid];
                $scope.gitRepositoryBaseUrlField.isValid = true;
                $scope.gitRepositoryBaseUrlField.messageClass = ['invalid-feedback'];
                $('#setupParametersDialog').modal('hide');
            };
            $scope.accept = () => {
                this.$doCheck();
                if (!$scope.serviceNowUrlField.isValid) {
                    if (!$scope.gitRepositoryBaseUrlField.isValid)
                        alert("ServiceNow URL and GIT Repository Base URL are not valid.");
                    alert("ServiceNow URL is not valid.");
                    return;
                }
                if (!$scope.gitRepositoryBaseUrlField.isValid) {
                    alert("GIT Repository Base URL is not valid.");
                    return;
                }
                $scope.serviceNowUrlField.original = $scope.serviceNowUrlField.text = $scope.serviceNowUrlField.lastValidated = $scope.serviceNowUrlField.text = stringBefore(stringBefore($scope.serviceNowUrlField.text, '#'), '?');
                $scope.serviceNowUrlField.validationMessage = '';
                $scope.serviceNowUrlField.validationClass = ['form-control', cssValidationClass.isValid];
                $scope.serviceNowUrlField.messageClass = ['invalid-feedback'];
                $scope.gitRepositoryBaseUrlField.original = $scope.gitRepositoryBaseUrlField.text = $scope.gitRepositoryBaseUrlField.lastValidated = $scope.gitRepositoryBaseUrlField.text = stringBefore(stringBefore($scope.gitRepositoryBaseUrlField.text, '#'), '?');
                $scope.gitRepositoryBaseUrlField.validationMessage = '';
                $scope.gitRepositoryBaseUrlField.validationClass = ['form-control', cssValidationClass.isValid];
                $scope.gitRepositoryBaseUrlField.messageClass = ['invalid-feedback'];
                $('#setupParametersDialog').modal('hide');
                setupParameterDefinitionsController._settings = { serviceNowUrl: $scope.serviceNowUrlField.original, gitRepositoryBaseUrl: $scope.gitRepositoryBaseUrlField.original };
                localStorage.setItem("SetupParameterDefinitions", JSON.stringify(setupParameterDefinitionsController._settings));
                $rootScope.$broadcast(app.BroadcastEvent_SetupParametersChanged, setupParameterDefinitionsController._settings);
            };
            $rootScope.$on(app.BroadcastEvent_ShowSetupParametersDialog, (event) => {
                $('#setupParametersDialog').modal('show');
            });
            $rootScope.$on(app.BroadcastEvent_HideSetupParametersDialog, (event) => { $('#setupParametersDialog').modal('hide'); });
            $scope.$broadcast(app.BroadcastEvent_SetupParametersChanged, {
                serviceNowUrl: $scope.serviceNowUrlField.original,
                gitRepositoryBaseUrl: $scope.gitRepositoryBaseUrlField.original
            });
        }
        static getSettings() {
            let settings = setupParameterDefinitionsController._settings;
            if (isNil(settings)) {
                let s = asString(localStorage.getItem("SetupParameterDefinitions"), true);
                if (!isNilOrWhiteSpace(s))
                    try {
                        settings = (JSON.parse(s));
                    }
                    catch (_a) { }
                if (isNil(settings))
                    settings = {};
                if (isNilOrWhiteSpace(settings.serviceNowUrl))
                    settings.serviceNowUrl = 'https://inscomscd.service-now.com';
                if (isNilOrWhiteSpace(settings.gitRepositoryBaseUrl))
                    settings.gitRepositoryBaseUrl = 'https://github.com/erwinel';
                setupParameterDefinitionsController._settings = settings;
            }
            return settings;
        }
        $doCheck() {
            super.$doCheck();
            [this.$scope.serviceNowUrlField, this.$scope.gitRepositoryBaseUrlField].forEach((item) => {
                if (item.lastValidated === item.text)
                    return;
                let uri = asString(item.text, true, '');
                item.lastValidated = uri;
                if (uri.length === 0)
                    item.validationMessage = 'URL is required.';
                else {
                    let fragment = '', query = '';
                    let i = uri.indexOf('#');
                    if (i > -1) {
                        fragment = uri.substr(i);
                        uri = uri.substr(0, i);
                    }
                    i = uri.indexOf('?');
                    if (i > -1) {
                        fragment = uri.substr(i);
                        uri = uri.substr(0, i);
                    }
                    let match;
                    if (uri.length > 0)
                        match = app.uriParseRegex.exec(uri);
                    if (isNilOrEmpty(match))
                        item.validationMessage = 'Invalid URL.';
                    else if (isNilOrWhiteSpace(match[uriParseGroup.origin]))
                        item.validationMessage = 'URL cannot be relative.';
                    else if (isNilOrWhiteSpace(match[uriParseGroup.schemeName]) || isNilOrWhiteSpace(match[uriParseGroup.hostname]))
                        item.validationMessage = 'Invalid URL.';
                    else {
                        item.isValid = true;
                        if (query.length > 0)
                            item.validationMessage = 'URI query string will be ignored.';
                        else if (fragment.length > 0)
                            item.validationMessage = 'URI fragment (hash) will be ignored.';
                        else
                            return;
                        item.validationClass = ['form-control', cssValidationClass.isInvalid];
                        item.messageClass = ['invalid-feedback', 'text-warning'];
                        return;
                    }
                }
                item.isValid = false;
                item.validationClass = ['form-control', cssValidationClass.isInvalid];
                item.messageClass = ['invalid-feedback'];
            });
        }
        static show($scope) { $scope.$emit(app.BroadcastEvent_ShowSetupParametersDialog); }
        static hide($scope) { $scope.$emit(app.BroadcastEvent_HideSetupParametersDialog); }
    }
    app.setupParameterDefinitionsController = setupParameterDefinitionsController;
    app.MainModule.controller("setupParameterDefinitionsController", ['$scope', '$rootScope', setupParameterDefinitionsController]);
    // #endregion
})(app || (app = {}));
