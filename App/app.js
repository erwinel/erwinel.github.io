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
    app.ScopeEvent_OpenMainModalPopupDialog = 'OpenMainModalPopupDialog';
    app.ScopeEvent_CloseMainModalPopupDialog = 'CloseMainModalPopupDialog';
    app.ScopeEvent_ShowSetupParametersDialog = 'showSetupParameterDefinitionsControllerDialog';
    app.ScopeEvent_HideSetupParametersDialog = 'hideSetupParameterDefinitionsControllerDialog';
    app.ScopeEvent_SetupParameterSettingsChanged = "SetupParameterSettingsChanged";
    app.StorageKey_SetupParameterSettings = "setupParameterSettings";
    const DefaultURL_ServiceNow = "https://inscomscd.service-now.com";
    const DefaultURL_GitRepositoryBase = "https://github.com/erwinel";
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
    function subStringBefore(source, search, nilIfNoMatch = false, caseSensitive = false) {
        if (!isNilOrEmpty(source)) {
            if (typeof (search) === "string") {
                if (search.length > 0) {
                    let i = (caseSensitive) ? source.indexOf(search) : source.toLowerCase().indexOf(search.toLowerCase());
                    if (i > -1)
                        return source.substr(0, i);
                }
            }
            else if (!isNil(search)) {
                let match = search.exec(source);
                if (!isNilOrEmpty(match))
                    return source.substr(0, match.index);
            }
        }
        if (!nilIfNoMatch)
            return source;
    }
    app.subStringBefore = subStringBefore;
    function subStringAfter(source, search, nilIfNoMatch = false, caseSensitive = false) {
        if (!isNilOrEmpty(source)) {
            if (typeof (search) === "string") {
                if (search.length > 0) {
                    let i = (caseSensitive) ? source.indexOf(search) : source.toLowerCase().indexOf(search.toLowerCase());
                    if (i > -1)
                        return source.substr(i + search.length);
                }
            }
            else if (!isNil(search)) {
                let match = search.exec(source);
                if (!isNilOrEmpty(match))
                    return source.substr(match.index + match[0].length);
            }
        }
        if (!nilIfNoMatch)
            return source;
    }
    app.subStringAfter = subStringAfter;
    function splitAt(source, spec, opt = false) {
        if (!isNilOrEmpty(source)) {
            if (typeof (spec) === "number") {
                if (!isNaN(spec) && spec > -1 && spec < source.length)
                    return [source.substr(0, spec), source.substr(spec)];
            }
            else if (typeof (spec) === "string") {
                if (spec.length > 0) {
                    let i = (opt) ? source.indexOf(spec) : source.toLowerCase().indexOf(spec.toLowerCase());
                    if (i > -1)
                        return [source.substr(0, i), source.substr(i)];
                }
            }
            else if (!isNil(spec)) {
                let match = spec.exec(source);
                if (!isNilOrEmpty(match)) {
                    if (opt)
                        return [source.substr(0, match.index), match[0], source.substr(match.index + match[0].length)];
                    return [source.substr(0, match.index), source.substr(match.index + match[0].length)];
                }
            }
        }
        return [source];
    }
    app.splitAt = splitAt;
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
    app.uriParseRegex_beforeQuery = /^(([^\\\/@:]*)(:[\\\/]{0,2})((?=[^\\\/@:]*(?::[^\\\/@:]*)?@)([^\\\/@:]*)(:[^\\\/@:]*)?@)?([^\\\/@:]*)(?:(?=:\d*(?:[\\\/:]|$)):(\d*))?(?=[\\\/:]|$))?(.+)?$/;
    app.uriParseRegex = /^(([^\\\/@:\?#]*)(:[\\\/]{0,2})((?=[^\\\/@:\?#]*(?::[^\\\/@:\?#]*)?@)([^\\\/@:\?#]*)(:[^\\\/@:\?#]*)?@)?([^\\\/@:\?#]*)(?:(?=:\d*(?:[\\\/:]|$)):(\d*))?(?=[\\\/:]|$))?([^\?#]+)?(\?([^#]+)?)?(#(.+)?)?$/;
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
        uriParseGroup[uriParseGroup["search"] = 10] = "search";
        uriParseGroup[uriParseGroup["queryString"] = 11] = "queryString";
        uriParseGroup[uriParseGroup["hash"] = 12] = "hash";
        uriParseGroup[uriParseGroup["fragment"] = 13] = "fragment";
    })(uriParseGroup = app.uriParseGroup || (app.uriParseGroup = {}));
    function parseUriString(source) {
        if (isNilOrEmpty(source))
            return { source: source, path: source };
        let match = app.uriParseRegex.exec(source);
        let result;
        if (isNilOrEmpty(match)) {
            result = { source: source, path: source };
            let i = source.indexOf('#');
            if (i > -1) {
                result.fragment = source.substr(i + 1);
                result.source = source = source.substr(0, i);
            }
            i = source.indexOf('?');
            if (i > -1) {
                result.queryString = source.substr(i + 1);
                result.source = source.substr(0, i);
            }
        }
        else {
            result = { source: source, path: (isNil(match[uriParseGroup.path])) ? '' : match[uriParseGroup.path] };
            if (!isNil(match[uriParseGroup.origin])) {
                let name = (isNil(match[uriParseGroup.hostname])) ? '' : match[uriParseGroup.hostname];
                result.origin = {
                    value: match[uriParseGroup.origin],
                    scheme: {
                        name: match[uriParseGroup.schemeName],
                        separator: match[uriParseGroup.schemeSeparator]
                    },
                    host: { value: name, name: name }
                };
                if (!isNil(match[uriParseGroup.userInfo])) {
                    result.origin.userInfo = { value: match[uriParseGroup.userInfo], name: (isNil(match[uriParseGroup.username])) ? '' : match[uriParseGroup.username] };
                    if (!isNil(match[uriParseGroup.password]))
                        result.origin.userInfo.password = match[uriParseGroup.password].substr(1);
                }
                if (!isNil(match[uriParseGroup.portnumber])) {
                    result.origin.host.value += match[uriParseGroup.portnumber];
                    result.origin.host.portnumber = match[uriParseGroup.portnumber].substr(1);
                }
            }
            result.path = (isNil(match[uriParseGroup.path])) ? '' : match[uriParseGroup.path];
            if (!isNil(match[uriParseGroup.search]))
                result.queryString = (isNil(match[uriParseGroup.queryString])) ? '' : match[uriParseGroup.queryString];
            if (!isNil(match[uriParseGroup.hash]))
                result.fragment = (isNil(match[uriParseGroup.fragment])) ? '' : match[uriParseGroup.fragment];
        }
        return result;
    }
    app.parseUriString = parseUriString;
    function initializePageNavigationScope(parentScope, location, http) {
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
    // #region Directives
    app.MainModule.directive("mainAppPageHead", () => {
        return {
            restrict: "E",
            scope: true,
            templateUrl: 'Template/mainAppPageHead.htm'
        };
    });
    class MainController {
        constructor($scope, $location, $http, settings) {
            this.$scope = $scope;
            this.$location = $location;
            this.$http = $http;
            $scope.serviceNowUrl = settings.serviceNowUrl;
            $scope.gitRepositoryBaseUrl = settings.gitRepositoryBaseUrl;
            settings.onChanged($scope, (event, value) => {
                $scope.serviceNowUrl = value.serviceNowUrl;
                $scope.gitRepositoryBaseUrl = value.gitRepositoryBaseUrl;
            });
            initializePageNavigationScope($scope, $location, $http);
            $scope.showSetupParametersEditDialog = () => {
                setupParameterDefinitionsController.show($scope);
            };
        }
        $doCheck() { }
        showSetupParametersEditDialog() { setupParameterDefinitionsController.show(this.$scope); }
        hideSetupParametersEditDialog() { setupParameterDefinitionsController.hide(this.$scope); }
        showModalDialogMessage(message, type = 'info', title) { mainModalPopupDialogController.show(this.$scope, message, type, title); }
        hideModalDialogMessage() { mainModalPopupDialogController.hide(this.$scope); }
    }
    app.MainModule.controller("MainController", ['$scope', "$location", "$http", "setupParameterSettings", MainController]);
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
    class mainModalPopupDialogController extends MainControllerChild {
        constructor($scope, $rootScope) {
            super($scope);
            $scope.title = '';
            $scope.message = '';
            $scope.bodyClass = '';
            $scope.close = () => { $('#mainModalPopupDialog').modal('hide'); };
            $rootScope.$on(app.ScopeEvent_OpenMainModalPopupDialog, (event, message, type, title) => {
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
            $rootScope.$on(app.ScopeEvent_CloseMainModalPopupDialog, (event) => { $('#mainModalPopupDialog').modal('hide'); });
        }
        static show($scope, message, type, title) {
            $scope.$broadcast(app.ScopeEvent_OpenMainModalPopupDialog, message, type, title);
        }
        static hide($scope) {
            $scope.$broadcast(app.ScopeEvent_CloseMainModalPopupDialog);
        }
    }
    app.mainModalPopupDialogController = mainModalPopupDialogController;
    app.MainModule.controller("mainModalPopupDialogController", ['$scope', '$rootScope', mainModalPopupDialogController]);
    // #endregion
    // #region Session Storage Service
    class SessionStorageEntryEnumerator {
        constructor(_window, _keys) {
            this._window = _window;
            this._keys = _keys;
            this._index = 0;
        }
        [Symbol.iterator]() { return this; }
        next() {
            if (this._window.sessionStorage.length !== this._keys.length)
                this._index = this._keys.length;
            else if (this._index < this._keys.length) {
                try {
                    let key = this._keys[this._index];
                    let value = this._window.sessionStorage.getItem(key);
                    if (!isNil(value))
                        return { done: false, value: [key, value] };
                    this._index = this._keys.length;
                }
                catch (_a) {
                    this._index = this._keys.length;
                }
            }
            return { done: true, value: undefined };
        }
    }
    class SessionStorageValueEnumerator {
        constructor(_window, _keys) {
            this._window = _window;
            this._keys = _keys;
            this._index = 0;
        }
        [Symbol.iterator]() { return this; }
        next() {
            if (this._window.sessionStorage.length !== this._keys.length)
                this._index = this._keys.length;
            else if (this._index < this._keys.length) {
                try {
                    let value = this._window.sessionStorage.getItem(this._keys[this._index]);
                    if (!isNil(value))
                        return { done: false, value: value };
                    this._index = this._keys.length;
                }
                catch (_a) {
                    this._index = this._keys.length;
                }
            }
            return { done: true, value: undefined };
        }
    }
    class SessionStorageService {
        constructor($window) {
            this.$window = $window;
            this[Symbol.toStringTag] = 'SessionStorageService';
            this.check(true);
        }
        get size() { return this.$window.sessionStorage.length; }
        check(forceRefresh = false) {
            if (!forceRefresh && this.$window.sessionStorage.length == this._allKeys.length)
                return;
            this._allKeys = [];
            this._parsedKeys = [];
            this._parsedObjects = [];
            for (let i = 0; i < this.$window.sessionStorage.length; i++)
                this._allKeys.push(this.$window.sessionStorage.key(i));
        }
        clear() {
            this.$window.sessionStorage.clear();
            this._allKeys = [];
            this._parsedKeys = [];
            this._parsedObjects = [];
        }
        delete(key) {
            this.check();
            this.$window.sessionStorage.removeItem(key);
            let i = this._parsedKeys.indexOf(key);
            if (i < 0)
                return false;
            if (i == 0) {
                this._parsedKeys.shift();
                this._parsedObjects.shift();
            }
            else if (i == (this._parsedKeys.length - 1)) {
                this._parsedKeys.pop();
                this._parsedObjects.pop();
            }
            else {
                this._parsedKeys.splice(i, 1);
                this._parsedObjects.splice(i, 1);
            }
        }
        entries() { return new SessionStorageEntryEnumerator(this.$window, this._allKeys); }
        [Symbol.iterator]() { return this.entries(); }
        forEach(callbackfn, thisArg) {
            this.check();
            if (typeof (thisArg) === "undefined")
                this._allKeys.forEach((key, index) => {
                    if (index < this._allKeys.length && this._allKeys[index] === key) {
                        let value;
                        try {
                            value = this.$window.sessionStorage.getItem(key);
                        }
                        catch ( /* okay to ignore */_a) { /* okay to ignore */ }
                        if (!isNil(value))
                            callbackfn(value, key, this);
                    }
                }, this);
            else
                this._allKeys.forEach((key, index) => {
                    if (index < this._allKeys.length && this._allKeys[index] === key) {
                        let value;
                        try {
                            value = this.$window.sessionStorage.getItem(key);
                        }
                        catch ( /* okay to ignore */_a) { /* okay to ignore */ }
                        if (!isNil(value))
                            callbackfn.call(thisArg, value, key, this);
                    }
                }, this);
        }
        get(key) {
            this.check();
            try {
                if (this._allKeys.indexOf(key) > -1)
                    return this.$window.sessionStorage.getItem(key);
            }
            catch ( /* okay to ignore */_a) { /* okay to ignore */ }
            return null;
        }
        getKeys() {
            this.check();
            return Array.from(this._allKeys);
        }
        getObject(key) {
            this.check();
            let i = this._parsedKeys.indexOf(key);
            if (i > -1)
                return this._parsedObjects[i];
            try {
                let json = this.$window.sessionStorage.getItem(key);
                if (!app.isNilOrEmpty(json)) {
                    let result;
                    if (json !== "undefined")
                        result = (ng.fromJson(json));
                    this._parsedKeys.push(key);
                    this._parsedObjects.push(result);
                    return result;
                }
            }
            catch (_a) { }
        }
        has(key) {
            this.check();
            return this._allKeys.indexOf(key) > -1;
        }
        keys() {
            this.check();
            return Array.from(this._allKeys).values();
        }
        set(key, value) {
            try {
                if (isNil(value))
                    this.$window.sessionStorage.removeItem(key);
                else
                    this.$window.sessionStorage.setItem(key, value);
                let i = this._parsedKeys.indexOf(key);
                if (i == 0) {
                    this._parsedKeys.shift();
                    this._parsedObjects.shift();
                }
                else if (i == (this._parsedKeys.length - 1)) {
                    this._parsedKeys.pop();
                    this._parsedObjects.pop();
                }
                else if (i < this._parsedKeys.length) {
                    this._parsedKeys.splice(i, 1);
                    this._parsedObjects.splice(i, 1);
                }
            }
            catch (e) {
                return e;
            }
        }
        setObject(key, value) {
            try {
                if (typeof (value) === "undefined")
                    this.$window.sessionStorage.setItem(key, "undefined");
                else
                    this.$window.sessionStorage.setItem(key, ng.toJson(value, false));
                let i = this._parsedKeys.indexOf(key);
                if (i < 0) {
                    this._parsedKeys.push(key);
                    this._parsedObjects.push(value);
                }
                else
                    this._parsedObjects[i] = value;
            }
            catch (e) {
                return e;
            }
        }
        values() { return new SessionStorageValueEnumerator(this.$window, this._allKeys); }
    }
    app.SessionStorageService = SessionStorageService;
    app.MainModule.service("SessionStorageService", ["$window", SessionStorageService]);
    // #endregion
    // #region SetupParameters
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
    class setupParameterDefinitionsController extends MainControllerChild {
        constructor($scope, _settings) {
            super($scope);
            this._settings = _settings;
            $scope.serviceNowUrlField = ($scope.$new());
            $scope.serviceNowUrlField.original = $scope.serviceNowUrlField.text = $scope.serviceNowUrlField.lastValidated = _settings.serviceNowUrl;
            $scope.serviceNowUrlField.validationMessage = '';
            $scope.serviceNowUrlField.validationClass = ['form-control', cssValidationClass.isValid];
            $scope.serviceNowUrlField.messageClass = ['invalid-feedback'];
            $scope.serviceNowUrlField.isValid = true;
            $scope.gitRepositoryBaseUrlField = ($scope.$new());
            $scope.gitRepositoryBaseUrlField.original = $scope.gitRepositoryBaseUrlField.text = $scope.gitRepositoryBaseUrlField.lastValidated = _settings.gitRepositoryBaseUrl;
            $scope.gitRepositoryBaseUrlField.validationMessage = '';
            $scope.gitRepositoryBaseUrlField.validationClass = ['form-control', cssValidationClass.isValid];
            $scope.gitRepositoryBaseUrlField.messageClass = ['invalid-feedback'];
            $scope.gitRepositoryBaseUrlField.isValid = true;
            $scope.message = '';
            $scope.bodyClass = '';
            $scope.close = () => { $('#setupParametersDialog').modal('hide'); };
            $scope.cancel = () => {
                $scope.serviceNowUrlField.text = $scope.serviceNowUrlField.lastValidated = $scope.serviceNowUrlField.original;
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
                $scope.serviceNowUrlField.original = $scope.serviceNowUrlField.text = $scope.serviceNowUrlField.lastValidated = $scope.serviceNowUrlField.text = subStringBefore(subStringBefore($scope.serviceNowUrlField.text, '#'), '?');
                $scope.serviceNowUrlField.validationMessage = '';
                $scope.serviceNowUrlField.validationClass = ['form-control', cssValidationClass.isValid];
                $scope.serviceNowUrlField.messageClass = ['invalid-feedback'];
                $scope.gitRepositoryBaseUrlField.original = $scope.gitRepositoryBaseUrlField.text = $scope.gitRepositoryBaseUrlField.lastValidated = $scope.gitRepositoryBaseUrlField.text = subStringBefore(subStringBefore($scope.gitRepositoryBaseUrlField.text, '#'), '?');
                $scope.gitRepositoryBaseUrlField.validationMessage = '';
                $scope.gitRepositoryBaseUrlField.validationClass = ['form-control', cssValidationClass.isValid];
                $scope.gitRepositoryBaseUrlField.messageClass = ['invalid-feedback'];
                $('#setupParametersDialog').modal('hide');
                this._settings.serviceNowUrl = $scope.serviceNowUrlField.original;
                this._settings.gitRepositoryBaseUrl = $scope.gitRepositoryBaseUrlField.original;
            };
            $scope.$on(app.ScopeEvent_ShowSetupParametersDialog, (event) => {
                $('#setupParametersDialog').modal('show');
            });
            $scope.$on(app.ScopeEvent_HideSetupParametersDialog, (event) => {
                $('#setupParametersDialog').modal('hide');
            });
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
        static show($scope) {
            $scope.$broadcast(app.ScopeEvent_ShowSetupParametersDialog);
        }
        static hide($scope) {
            $scope.$broadcast(app.ScopeEvent_HideSetupParametersDialog);
        }
    }
    app.setupParameterDefinitionsController = setupParameterDefinitionsController;
    app.MainModule.controller("setupParameterDefinitionsController", ['$scope', 'setupParameterSettings', setupParameterDefinitionsController]);
    class setupParameterSettings {
        constructor($rootScope, _sessionStorage, $http) {
            this.$rootScope = $rootScope;
            this._sessionStorage = _sessionStorage;
            this._settings = _sessionStorage.getObject("setupParameterSettings");
            if (isNil(this._settings))
                this._settings = { serviceNowUrl: DefaultURL_ServiceNow, gitRepositoryBaseUrl: DefaultURL_GitRepositoryBase };
            else {
                if (isNilOrWhiteSpace(this._settings.serviceNowUrl))
                    this._settings.serviceNowUrl = DefaultURL_ServiceNow;
                if (isNilOrWhiteSpace(this._settings.gitRepositoryBaseUrl))
                    this._settings.gitRepositoryBaseUrl = DefaultURL_GitRepositoryBase;
            }
            $http.get("./defaults.json").then((nav) => {
                if (isNil(nav.data))
                    return;
                if (isNil(nav.data.serviceNowUrl) || this._settings.serviceNowUrl === nav.data.serviceNowUrl) {
                    if (isNil(nav.data.serviceNowUrl) || this._settings.serviceNowUrl === nav.data.serviceNowUrl)
                        return;
                    this._settings.gitRepositoryBaseUrl = nav.data.gitRepositoryBaseUrl;
                }
                else {
                    this._settings.serviceNowUrl = nav.data.serviceNowUrl;
                    if (!isNil(nav.data.serviceNowUrl) && this._settings.serviceNowUrl !== nav.data.serviceNowUrl)
                        this._settings.gitRepositoryBaseUrl = nav.data.gitRepositoryBaseUrl;
                }
                this._sessionStorage.setObject(app.StorageKey_SetupParameterSettings, this._settings);
                this.raiseUpdated();
            });
        }
        get serviceNowUrl() { return this._settings.serviceNowUrl; }
        set serviceNowUrl(value) {
            if (value === this._settings.serviceNowUrl)
                return;
            if (isNilOrWhiteSpace(value))
                throw new Error("URL cannot be empty.");
            let parsedUrl = parseUriString(value);
            if (isNil(parsedUrl.origin))
                throw new Error("URL cannot be relative.");
            if (!(isNil(parsedUrl.queryString) && isNil(parsedUrl.fragment) && parsedUrl.path.length == 0)) {
                if (value === parsedUrl.origin.value)
                    return;
                this._settings.serviceNowUrl = parsedUrl.origin.value;
            }
            else
                this._settings.serviceNowUrl = value;
            this._sessionStorage.setObject(app.StorageKey_SetupParameterSettings, this._settings);
            this.raiseUpdated();
        }
        get gitRepositoryBaseUrl() { return this._settings.gitRepositoryBaseUrl; }
        set gitRepositoryBaseUrl(value) {
            if (value === this._settings.gitRepositoryBaseUrl)
                return;
            if (isNilOrWhiteSpace(value))
                throw new Error("URL cannot be empty.");
            let parsedUrl = parseUriString(value);
            if (isNil(parsedUrl.origin))
                throw new Error("URL cannot be relative.");
            if (!(isNil(parsedUrl.queryString) && isNil(parsedUrl.fragment))) {
                value = parsedUrl.origin.value + parsedUrl.path;
                if (value === this._settings.gitRepositoryBaseUrl)
                    return;
            }
            this._settings.gitRepositoryBaseUrl = value;
            this._sessionStorage.setObject(app.StorageKey_SetupParameterSettings, this._settings);
            this.raiseUpdated();
        }
        raiseUpdated() {
            this.$rootScope.$emit(app.ScopeEvent_SetupParameterSettingsChanged, {
                serviceNowUrl: this._settings.serviceNowUrl,
                gitRepositoryBaseUrl: this._settings.gitRepositoryBaseUrl
            });
        }
        onChanged(scope, handler) { scope.$on(app.ScopeEvent_SetupParameterSettingsChanged, handler); }
    }
    app.MainModule.factory("setupParameterSettings", ["$rootScope", "SessionStorageService", "$http", setupParameterSettings]);
    // #endregion
    /**
     * Options for the relative icon URL of collapsible items.
     *
     * @enum {string}
     */
    let CollapsibleIconUrl;
    (function (CollapsibleIconUrl) {
        CollapsibleIconUrl["collapse"] = "images/collapse.svg";
        CollapsibleIconUrl["expand"] = "images/expand.svg";
    })(CollapsibleIconUrl = app.CollapsibleIconUrl || (app.CollapsibleIconUrl = {}));
    /**
     * Options for the verb name of collapsible items.
     *
     * @enum {string}
     */
    let CollapsibleActionVerb;
    (function (CollapsibleActionVerb) {
        CollapsibleActionVerb["collapse"] = "Collapse";
        CollapsibleActionVerb["expand"] = "Expand";
    })(CollapsibleActionVerb = app.CollapsibleActionVerb || (app.CollapsibleActionVerb = {}));
    function isRootCardContainerScope(scope) { return typeof (scope.parentCard) === 'undefined'; }
    ;
    class CardContainerController extends MainControllerChild {
        constructor($scope) {
            super($scope);
            this.$scope = $scope;
            $scope.parent = undefined;
            $scope.cardNumber = undefined;
            $scope.collapsibleCards = [];
            $scope.currentSelectedCardIndex = -1;
            let controller = this;
            $scope.selectCard = (index) => { controller.selectCard($scope, index); };
            $scope.addCard = (card, attributes) => { controller._addCard($scope, card, attributes); };
        }
        selectCard(scope, index) {
            if (scope.currentSelectedCardIndex === index)
                return;
            for (let i = 0; i < scope.collapsibleCards.length; i++) {
                if (i == index)
                    this.showCard(scope.collapsibleCards[i]);
                else {
                    scope.collapsibleCards[i].shouldExpand = false;
                    this.hideCard(scope.collapsibleCards[i]);
                }
            }
        }
        hideCard(card) {
            card.isExpanded = false;
            card.cardIconUrl = CollapsibleIconUrl.expand;
            card.cardActionVerb = CollapsibleActionVerb.expand;
            for (let i = 0; i < card.collapsibleCards.length; i++) {
                if (card.collapsibleCards[i].isExpanded)
                    this.hideCard(card.collapsibleCards[i]);
            }
        }
        showCard(card) {
            card.isExpanded = card.shouldExpand = true;
            card.cardIconUrl = CollapsibleIconUrl.collapse;
            card.cardActionVerb = CollapsibleActionVerb.collapse;
            for (let i = 0; i < card.collapsibleCards.length; i++) {
                if (card.collapsibleCards[i].shouldExpand)
                    this.showCard(card.collapsibleCards[i]);
            }
        }
        _addCard(parentScope, cardScope, attributes) {
            let index = parentScope.collapsibleCards.length;
            cardScope.parentCard = parentScope;
            cardScope.cardNumber = index + 1;
            cardScope.cardHeadingText = attributes.headingText;
            cardScope.collapsibleCards = [];
            cardScope.currentSelectedCardIndex = -1;
            let controller = this;
            cardScope.addCard = (card, attributes) => { controller._addCard(cardScope, card, attributes); };
            cardScope.toggleCurrentCard = () => { controller.selectCard(parentScope, (cardScope.isExpanded) ? -1 : index); };
            if (index == 0) {
                cardScope.isExpanded = true;
                cardScope.cardIconUrl = CollapsibleIconUrl.collapse;
                cardScope.cardActionVerb = CollapsibleActionVerb.collapse;
                parentScope.currentSelectedCardIndex = 0;
            }
            else {
                cardScope.isExpanded = false;
                cardScope.cardIconUrl = CollapsibleIconUrl.expand;
                cardScope.cardActionVerb = CollapsibleActionVerb.expand;
            }
        }
        addCard(scope, attributes) {
            if (isNil(scope.collapsibleCards)) {
                let parentScope = (scope.$parent.$new());
                parentScope.collapsibleCards = [];
                parentScope.currentSelectedCardIndex = -1;
                parentScope.parentCard = undefined;
                parentScope.cardNumber = undefined;
                this._addCard(parentScope, scope, attributes);
            }
            else
                this._addCard((isNil(scope.parentCard)) ? this.$scope : scope.parentCard, scope, attributes);
        }
    }
    app.MainModule.directive("collapsibleCardContainer", () => {
        return {
            restrict: "E",
            scope: true,
            transclude: true,
            controller: ['$scope', CardContainerController],
            template: ''
        };
    });
    app.MainModule.directive("collapsibleCardL0", () => {
        return {
            require: "^^collapsibleCardContainer",
            restrict: "E",
            scope: true,
            transclude: true,
            templateUrl: "Templates/collapsibleCardL0.htm",
            link: (scope, element, attributes, controller) => {
                controller.addCard(scope, attributes);
            }
        };
    });
    app.MainModule.directive("collapsibleCardL1", () => {
        return {
            require: "^^collapsibleCardContainer",
            restrict: "E",
            scope: true,
            transclude: true,
            templateUrl: "Templates/collapsibleCardL1.htm",
            link: (scope, element, attributes, controller) => {
                controller.addCard(scope, attributes);
            }
        };
    });
    app.MainModule.directive("collapsibleCardL2", () => {
        return {
            require: "^^collapsibleCardContainer",
            restrict: "E",
            scope: true,
            transclude: true,
            templateUrl: "Templates/collapsibleCardL2.htm",
            link: (scope, element, attributes, controller) => {
                controller.addCard(scope, attributes);
            }
        };
    });
    app.MainModule.directive("collapsibleCardL3", () => {
        return {
            require: "^^collapsibleCardContainer",
            restrict: "E",
            scope: true,
            transclude: true,
            templateUrl: "Templates/collapsibleCardL3.htm",
            link: (scope, element, attributes, controller) => {
                controller.addCard(scope, attributes);
            }
        };
    });
    // #endregion
})(app || (app = {}));
