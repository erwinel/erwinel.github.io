var sys;
(function (sys) {
    sys.whitespaceRe = /[\s\r\n]+/g;
    sys.isTrueRe = /^(t(rue)?|y(es)?|1)$/g;
    sys.isFalseRe = /^(f(alse)?|no?|o)$/g;
    sys.trueFalseRe = /^((t(?:rue)?|y(?:es)?|1)|(f(?:alse)?|no?|0))$/g;
    const urlParseRe = /^(([^@:/?#]*):(?:\/\/((?:([^@:/?#]*)(?::([^@:/?#]*))?@)?([^:/?#]*)(?::(\d+(?=[:/?#]|$)))?))?)?(([:/]+(?=(?:[^?#:/]+[:/]*)?(?:\?|\#|$))|[:/]*[^:/?#]+(?=[:/]+[^?#])(?:[:/]+[^:/?#]+(?=[:/]+[^?#]))*)?[:/]*((\.*(?:\.[^.:/?#]*(?=\.)|[^.:/?#]+)*)(?:\.([^.:/?#]*))?)[:/]*)(?:\?([^#]*))?(?:\#(.*))?$/;
    const trimRightRe = /^((\s*\S+)(\s+\S+)*)\s*$/;
    const trimLeftRe = /^\s*(\S.*)$/;
    const identifierRe = /^[a-z_][a-z\d]*$/i;
    const falseStringRe = /^(f(alse)?|no?|0+(\.0+)?)([^\w-]|$)/i;
    const numberStringRe = /^\d+(\.\d+)$/i;
    /**
     * Determines if a value is null or undefined.
     * @param {*} value Value to test.
     * @returns {boolean} true if value was null or undefined; otherwise, false.
     */
    function isNil(value) { return typeof (value) === 'undefined' || value === null; }
    sys.isNil = isNil;
    function isNilOrEmpty(value) {
        return (typeof (value) !== 'string' && (typeof (value) != 'object' || value === null || !Array.isArray(value))) || value.length == 0;
    }
    sys.isNilOrEmpty = isNilOrEmpty;
    function isNilOrWhiteSpace(value) { return typeof (value) !== 'string' || value.trim().length == 0; }
    sys.isNilOrWhiteSpace = isNilOrWhiteSpace;
    function notNil(obj) { return typeof (obj) !== 'undefined' && obj != null; }
    sys.notNil = notNil;
    function notNilOrEmpty(value) {
        return (typeof (value) == 'string' || (typeof (value) == 'object' && value != null && Array.isArray(value))) && value.length > 0;
    }
    sys.notNilOrEmpty = notNilOrEmpty;
    function notNilOrWhiteSpace(value) { return typeof (value) == 'string' && value.trim().length > 0; }
    sys.notNilOrWhiteSpace = notNilOrWhiteSpace;
    function isNumber(value) { return typeof (value) === "number" && !isNaN(value); }
    sys.isNumber = isNumber;
    /**
     * Determines if value's type is an object.
     * @param {*} value Value to test.
     * @param {boolean} [noArray=false] If value is an array, return false.
     * @returns {boolean} true if value was null or undefined; otherwise, false.
     */
    function isObject(value, noArray) { return (typeof (value) == "object" && value !== null && !(noArray && Array.isArray(value))); }
    sys.isObject = isObject;
    /**
     * Determines if a String represents a valid identifier name.
     * @param {string} text String to test.
     * @returns {boolean} true if value was a valid identifier name; otherwise, false.
     */
    function isValidIdentifierName(text) { return typeof (text) == "string" && identifierRe.test(text); }
    sys.isValidIdentifierName = isValidIdentifierName;
    function asNotNil(value, opt, trim) {
        if (typeof (value) === "undefined" || value === null)
            return (typeof (opt) !== 'undefined') ? opt : '';
        if (typeof (value) !== 'string')
            return value;
        return ((typeof (opt) === "boolean") ? opt : trim === true) ? value.trim() : value;
    }
    sys.asNotNil = asNotNil;
    function stringFormat(format, ...args) { return format.replace(/\{(\d+)\}/g, (subString, g) => args[parseInt(g)]); }
    sys.stringFormat = stringFormat;
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
    sys.asString = asString;
    function subStringBefore(source, search, nilIfNoMatch = false, caseSensitive = false) {
        if (!isNilOrEmpty(source)) {
            if (typeof (search) === "string") {
                if (search.length > 0) {
                    let i = (caseSensitive) ? source.indexOf(search) : source.toLowerCase().indexOf(search.toLowerCase());
                    if (i > -1)
                        return source.substr(0, i);
                }
            }
            else if (notNil(search)) {
                let match = search.exec(source);
                if (!isNilOrEmpty(match))
                    return source.substr(0, match.index);
            }
        }
        if (!nilIfNoMatch)
            return source;
    }
    sys.subStringBefore = subStringBefore;
    function subStringAfter(source, search, nilIfNoMatch = false, caseSensitive = false) {
        if (!isNilOrEmpty(source)) {
            if (typeof (search) === "string") {
                if (search.length > 0) {
                    let i = (caseSensitive) ? source.indexOf(search) : source.toLowerCase().indexOf(search.toLowerCase());
                    if (i > -1)
                        return source.substr(i + search.length);
                }
            }
            else if (notNil(search)) {
                let match = search.exec(source);
                if (!isNilOrEmpty(match))
                    return source.substr(match.index + match[0].length);
            }
        }
        if (!nilIfNoMatch)
            return source;
    }
    sys.subStringAfter = subStringAfter;
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
            else if (notNil(spec)) {
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
    sys.splitAt = splitAt;
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
    sys.asFloat = asFloat;
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
    sys.asInt = asInt;
    /**
     * Trims trailing whitespace from text.
     * @param {string} text Text to trim.
     * @returns {string} Text with trailing whitespace removed.
     */
    function trimRight(text) {
        var m = trimRightRe.exec(asString(text));
        return (isNil(m)) ? "" : m[1];
    }
    sys.trimRight = trimRight;
    /**
     * Trims leading whitespace from text.
     * @param {string} text Text to trim.
     * @returns {string} Text with leading whitespace removed.
     */
    function trimLeft(text) {
        var m = trimLeftRe.exec(asString(text));
        return (isNil(m)) ? "" : m[1];
    }
    sys.trimLeft = trimLeft;
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
    sys.asBoolean = asBoolean;
    function notString(value) { return typeof (value) !== 'string'; }
    sys.notString = notString;
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
    sys.asNotWhitespaceOrUndefined = asNotWhitespaceOrUndefined;
    function asDefinedOrNull(value) { return (typeof (value) === undefined) ? null : value; }
    sys.asDefinedOrNull = asDefinedOrNull;
    function asUndefinedIfNull(value) {
        if (typeof (value) !== undefined && value !== null)
            return value;
    }
    sys.asUndefinedIfNull = asUndefinedIfNull;
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
    sys.asNotEmptyOrNull = asNotEmptyOrNull;
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
    sys.asNotWhitespaceOrNull = asNotWhitespaceOrNull;
    function asNotEmptyOrUndefined(value, trim) {
        if (typeof (value) !== 'undefined' && value !== null && value.length > 0)
            return (trim === true && typeof (value) === 'string') ? value.trim() : value;
    }
    sys.asNotEmptyOrUndefined = asNotEmptyOrUndefined;
    function isError(value) {
        return typeof (value) == 'object' && value !== null && typeof (value.message) == 'string' && typeof (value.name) == 'string' &&
            (typeof (value.stack) == 'undefined' || value.stack === null || typeof (value.stack) == 'string');
    }
    sys.isError = isError;
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
    sys.compareStrings = compareStrings;
    function isIterable(value) {
        if (typeof (value) !== 'object' || value == null)
            return false;
        if (Array.isArray(value))
            return true;
        let fn = value[Symbol.iterator];
        return (typeof (fn) === 'function');
    }
    sys.isIterable = isIterable;
    function asIterable(source, allowNull = false) {
        if (typeof (source) === 'undefined')
            return [];
        if (source === null)
            return (allowNull) ? [null] : [];
        return (Array.isArray(source)) ? source : ((isIterable(source)) ? source : [source]);
    }
    sys.asIterable = asIterable;
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
    sys.asArray = asArray;
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
    sys.skipFirst = skipFirst;
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
    sys.skipLast = skipLast;
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
    sys.takeFirst = takeFirst;
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
    sys.takeLast = takeLast;
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
    sys.filter = filter;
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
    sys.first = first;
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
    sys.indexOf = indexOf;
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
    sys.last = last;
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
    sys.join = join;
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
    sys.reverse = reverse;
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
    sys.indexOfAny = indexOfAny;
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
    sys.map = map;
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
    sys.every = every;
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
    sys.some = some;
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
    sys.forEach = forEach;
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
    sys.reduce = reduce;
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
    sys.unique = unique;
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
    sys.areSequencesEqual = areSequencesEqual;
    function isEventPropagationStoppedFunc(event) {
        return typeof event === "object" && event !== null && typeof event.isPropagationStopped === "function" && event.isPropagationStopped();
    }
    sys.isEventPropagationStoppedFunc = isEventPropagationStoppedFunc;
    function preventEventDefault(event, stopPropogation) {
        if (typeof event !== "object" || event === null)
            return;
        if (!event.defaultPrevented)
            event.preventDefault();
        if (stopPropogation === true && !isEventPropagationStoppedFunc(event))
            event.stopPropagation();
    }
    sys.preventEventDefault = preventEventDefault;
    function stopEventPropagation(event, preventDefault) {
        if (typeof event !== "object" || event === null)
            return;
        if (!isEventPropagationStoppedFunc(event))
            event.stopPropagation();
        if (preventDefault === true && !event.defaultPrevented)
            event.preventDefault();
    }
    sys.stopEventPropagation = stopEventPropagation;
    function makeDirectoryUrl(url) {
        if (typeof url === "string") {
            let u;
            try {
                u = new URL(url);
            }
            catch (_a) {
                u = null;
            }
            if (typeof u === "object" && u !== null)
                url = u;
            else {
                try {
                    u = new URL(url, "http://tempuri.org");
                }
                catch (_b) {
                    u = null;
                }
                if (typeof u === "object" && u !== null)
                    return (u.pathname.endsWith('/')) ? u.pathname : u.pathname + "/";
                let index = url.indexOf('#');
                if (index > -1)
                    url = url.substr(0, index);
                index = url.indexOf('?');
                if (index > -1)
                    url = url.substr(0, index);
                return (url.endsWith('/')) ? url : url + '/';
            }
        }
        else if (typeof url !== "object" || url === null)
            return "/";
        if ((typeof url.hash !== "string" || url.hash.length == 0) && (typeof url.search !== "string" || url.search.length == 0) && url.pathname.endsWith('/'))
            return url;
        url = new URL(url.href);
        url.hash = url.search = '';
        if (!url.pathname.endsWith('/'))
            url.pathname += '/';
        return url;
    }
    sys.makeDirectoryUrl = makeDirectoryUrl;
    /**
     * Represents status HTTP response status codes.
     *
     * @enum
     * @description These were derrived from the following authoritative source: {@link https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html}.
     */
    let HttpResponseStatusCode;
    (function (HttpResponseStatusCode) {
        /**
         * The client SHOULD continue with its request.
         *
         * @member HttpResponseStatusCode
         * @description This interim response is used to inform the client that the initial part of the request has been received and has not yet been rejected by the server. The client SHOULD continue by sending the remainder of the request or, if the request has already been completed, ignore this response.
         */
        HttpResponseStatusCode[HttpResponseStatusCode["continue"] = 100] = "continue";
        /**
         * The server understands and is willing to comply with the client's request for a change in the application protocol.
         *
         * @member HttpResponseStatusCode
         * @description The server understands and is willing to comply with the client's request, via the Upgrade Message Header field, for a change in the application protocol being used on this connection. The server will switch protocols to those defined by the response's Upgrade header field immediately after the empty line which terminates the 101 response.
         */
        HttpResponseStatusCode[HttpResponseStatusCode["switchingProtocols"] = 101] = "switchingProtocols";
        /**
         * The request has succeeded.
         *
         * @member HttpResponseStatusCode
         */
        HttpResponseStatusCode[HttpResponseStatusCode["ok"] = 200] = "ok";
        /**
         * The request has been fulfilled and resulted in a new resource being created.
         *
         * @member HttpResponseStatusCode
         * @description The newly created resource can be referenced by the URI(s) returned in the entity of the response, with the most specific URI for the resource given by a Location header field. The response SHOULD include an entity containing a list of resource characteristics and location(s) from which the user or user agent can choose the one most appropriate. The entity format is specified by the media type given in the Content-Type header field.
         */
        HttpResponseStatusCode[HttpResponseStatusCode["created"] = 201] = "created";
        /**
         * The request has been accepted for processing, but the processing has not been completed.
         *
         * @member HttpResponseStatusCode
         * @description The request might or might not eventually be acted upon, as it might be disallowed when processing actually takes place. There is no facility for re-sending a status code from an asynchronous operation such as this.
         */
        HttpResponseStatusCode[HttpResponseStatusCode["accepted"] = 202] = "accepted";
        /**
         * The returned metainformation in the entity-header is not the definitive set as available from the origin server, but is gathered from a local or a third-party copy
         *
         * @member HttpResponseStatusCode
         * @description
         */
        HttpResponseStatusCode[HttpResponseStatusCode["nonAuthoritativeInformation"] = 203] = "nonAuthoritativeInformation";
        /**
         * The server has fulfilled the request but does not need to return an entity-body, and might want to return updated metainformation.
         *
         * @member HttpResponseStatusCode
         * @description The response MAY include new or updated metainformation in the form of entity-headers, which if present SHOULD be associated with the requested variant.
         */
        HttpResponseStatusCode[HttpResponseStatusCode["noContent"] = 204] = "noContent";
        /**
         * The server has fulfilled the request and the user agent SHOULD reset the document view which caused the request to be sent.
         *
         * @member HttpResponseStatusCode
         */
        HttpResponseStatusCode[HttpResponseStatusCode["resetContent"] = 205] = "resetContent";
        /**
         * The server has fulfilled the partial GET request for the resource.
         *
         * @member HttpResponseStatusCode
         */
        HttpResponseStatusCode[HttpResponseStatusCode["partialContent"] = 206] = "partialContent";
        /**
         * Multiple resources correspond to the request.
         *
         * @member HttpResponseStatusCode
         * @description  The requested resource corresponds to any one of a set of representations, each with its own specific location, and agent- driven negotiation information (section 12) is being provided so that the user (or user agent) can select a preferred representation and redirect its request to that location.
         */
        HttpResponseStatusCode[HttpResponseStatusCode["multipleChoices"] = 300] = "multipleChoices";
        /**
         * The requested resource is permanently located at another URI, usually provided in the Location response field.
         *
         * @member HttpResponseStatusCode
         * @description The requested resource has been assigned a new permanent URI and any future references to this resource SHOULD use one of the returned URIs. Clients with link editing capabilities ought to automatically re-link references to the Request-URI to one or more of the new references returned by the server, where possible.
         */
        HttpResponseStatusCode[HttpResponseStatusCode["movedPermanently"] = 301] = "movedPermanently";
        /**
         * The requested resource is temporarily located at another URI, usually provided in the Location response field.
         *
         * @member HttpResponseStatusCode
         * @description The requested resource resides temporarily under a different URI. Since the redirection might be altered on occasion, the client SHOULD continue to use the Request-URI for future requests. This response is only cacheable if indicated by a Cache-Control or Expires header field.
         */
        HttpResponseStatusCode[HttpResponseStatusCode["found"] = 302] = "found";
        /**
         * The response to the request can be found under a different URI, usually provided in the Location response field.
         *
         * @member HttpResponseStatusCode
         * @description The response to the request can be found under a different URI and SHOULD be retrieved using a GET method on that resource. This method exists primarily to allow the output of a POST-activated script to redirect the user agent to a selected resource. The new URI is not a substitute reference for the originally requested resource.
         */
        HttpResponseStatusCode[HttpResponseStatusCode["seeOther"] = 303] = "seeOther";
        /**
         * The requested resource has not been modified.
         *
         * @member HttpResponseStatusCode
         * @description This response code usually results from a conditional request; otherwise, the server should not send this response.
         */
        HttpResponseStatusCode[HttpResponseStatusCode["notModified"] = 304] = "notModified";
        /**
         * The requested resource MUST be accessed through the proxy given by the Location field.
         *
         * @member HttpResponseStatusCode
         */
        HttpResponseStatusCode[HttpResponseStatusCode["useProxy"] = 305] = "useProxy";
        /**
         * (unused redirection response code)
         *
         * @member HttpResponseStatusCode
         * @description This status code was used in a previous version of the specification, is no longer used, and the code is reserved.
         */
        HttpResponseStatusCode[HttpResponseStatusCode["unusedRedirection"] = 306] = "unusedRedirection";
        /**
         * The requested resource resides temporarily under a different URI.
         *
         * @member HttpResponseStatusCode
         * @description Since the redirection MAY be altered on occasion, the client SHOULD continue to use the Request-URI for future requests. This response is only cacheable if indicated by a Cache-Control or Expires header field.
         */
        HttpResponseStatusCode[HttpResponseStatusCode["temporaryRedirect"] = 307] = "temporaryRedirect";
        /**
         * The request could not be understood by the server due to malformed syntax.
         *
         * @member HttpResponseStatusCode
         */
        HttpResponseStatusCode[HttpResponseStatusCode["badRequest"] = 400] = "badRequest";
        /**
         * The request requires user authentication.
         *
         * @member HttpResponseStatusCode
         * @description The response MUST include a WWW-Authenticate header field (section 14.47) containing a challenge applicable to the requested resource. The client MAY repeat the request with a suitable Authorization header field (section 14.8). If the request already included Authorization credentials, then the 401 response indicates that authorization has been refused for those credentials.
         */
        HttpResponseStatusCode[HttpResponseStatusCode["unauthorized"] = 401] = "unauthorized";
        /**
         * This code is reserved for future use.
         *
         * @member HttpResponseStatusCode
         */
        HttpResponseStatusCode[HttpResponseStatusCode["paymentRequired"] = 402] = "paymentRequired";
        /**
         * The server understood the request, but is refusing to fulfill it.
         *
         * @member HttpResponseStatusCode
         * @description Authorization will not help and the request SHOULD NOT be repeated.
         */
        HttpResponseStatusCode[HttpResponseStatusCode["forbidden"] = 403] = "forbidden";
        /**
         * The server has not found anything matching the Request-URI.
         *
         * @member HttpResponseStatusCode
         */
        HttpResponseStatusCode[HttpResponseStatusCode["notFound"] = 404] = "notFound";
        /**
         * The method specified in the Request-Line is not allowed for the resource identified by the Request-URI.
         *
         * @member HttpResponseStatusCode
         * @description The response will include an Allow header containing a list of valid methods for the requested resource.
         */
        HttpResponseStatusCode[HttpResponseStatusCode["methodNotAllowed"] = 405] = "methodNotAllowed";
        /**
         * The resource identified by the request is only capable of generating response entities which have content characteristics not acceptable according to the accept headers sent in the request.
         *
         * @member HttpResponseStatusCode
         */
        HttpResponseStatusCode[HttpResponseStatusCode["notAcceptable"] = 406] = "notAcceptable";
        /**
         * This code is similar to 401 (Unauthorized), but indicates that the client must first authenticate itself with the proxy.
         *
         * @member HttpResponseStatusCode
         * @description The proxy will return a Proxy-Authenticate header field containing a challenge applicable to the proxy for the requested resource. The client MAY repeat the request with a suitable Proxy-Authorization header field.
         */
        HttpResponseStatusCode[HttpResponseStatusCode["proxyAuthenticationRequired"] = 407] = "proxyAuthenticationRequired";
        /**
         * The client did not produce a request within the time that the server was prepared to wait.
         *
         * @member HttpResponseStatusCode
         */
        HttpResponseStatusCode[HttpResponseStatusCode["requestTimeout"] = 408] = "requestTimeout";
        /**
         * The request could not be completed due to a conflict with the current state of the resource.
         *
         * @member HttpResponseStatusCode
         */
        HttpResponseStatusCode[HttpResponseStatusCode["conflict"] = 409] = "conflict";
        /**
         * The requested resource is no longer available at the server and no forwarding address is known.
         *
         * @member HttpResponseStatusCode
         */
        HttpResponseStatusCode[HttpResponseStatusCode["gone"] = 410] = "gone";
        /**
         * The server refuses to accept the request without a defined Content-Length.
         *
         * @member HttpResponseStatusCode
         */
        HttpResponseStatusCode[HttpResponseStatusCode["lengthRequired"] = 411] = "lengthRequired";
        /**
         * The precondition given in one or more of the request-header fields evaluated to false when it was tested on the server.
         *
         * @member HttpResponseStatusCode
         */
        HttpResponseStatusCode[HttpResponseStatusCode["preconditionFailed"] = 412] = "preconditionFailed";
        /**
         * The server is refusing to process a request because the request entity is larger than the server is willing or able to process.
         *
         * @member HttpResponseStatusCode
         * @description The server MAY close the connection to prevent the client from continuing the request.
         */
        HttpResponseStatusCode[HttpResponseStatusCode["requestEntityTooLarge"] = 413] = "requestEntityTooLarge";
        /**
         * The server is refusing to service the request because the Request-URI is longer than the server is willing to interpret.
         *
         * @member HttpResponseStatusCode
         */
        HttpResponseStatusCode[HttpResponseStatusCode["requestUriTooLong"] = 414] = "requestUriTooLong";
        /**
         * The server is refusing to service the request because the entity of the request is in a format not supported by the requested resource for the requested method.
         *
         * @member HttpResponseStatusCode
         */
        HttpResponseStatusCode[HttpResponseStatusCode["unsupportedMediaType"] = 415] = "unsupportedMediaType";
        /**
         * Range specified in request not viable.
         *
         * @member HttpResponseStatusCode
         * @description Request included a Range request-header field, and none of the range-specifier values in this field overlap the current extent of the selected resource, and the request did not include an If-Range request-header field.
         */
        HttpResponseStatusCode[HttpResponseStatusCode["requestedRangeNotSatisfiable"] = 416] = "requestedRangeNotSatisfiable";
        /**
         * The expectation given in an Expect request-header field could not be met.
         *
         * @member HttpResponseStatusCode
         * @description The expectation given in an Expect request-header field could not be met by this server, or, if the server is a proxy, the server has unambiguous evidence that the request could not be met by the next-hop server.
         */
        HttpResponseStatusCode[HttpResponseStatusCode["expectationFailed"] = 417] = "expectationFailed";
        /**
         * The server encountered an unexpected condition which prevented it from fulfilling the request.
         *
         * @member HttpResponseStatusCode
         */
        HttpResponseStatusCode[HttpResponseStatusCode["internalServerError"] = 500] = "internalServerError";
        /**
         * The server does not support the functionality required to fulfill the request.
         *
         * @member HttpResponseStatusCode
         */
        HttpResponseStatusCode[HttpResponseStatusCode["notImplemented"] = 501] = "notImplemented";
        /**
         * The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request.
         *
         * @member HttpResponseStatusCode
         */
        HttpResponseStatusCode[HttpResponseStatusCode["badGateway"] = 502] = "badGateway";
        /**
         * The server is currently unable to handle the request due to a temporary overloading or maintenance of the server.
         *
         * @member HttpResponseStatusCode
         */
        HttpResponseStatusCode[HttpResponseStatusCode["serviceUnavailable"] = 503] = "serviceUnavailable";
        /**
         * The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.
         *
         * @member HttpResponseStatusCode
         * @description The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server specified by the URI (e.g. HTTP, FTP, LDAP) or some other auxiliary server (e.g. DNS) it needed to access in attempting to complete the request.
         */
        HttpResponseStatusCode[HttpResponseStatusCode["gatewayTimeout"] = 504] = "gatewayTimeout";
        /**
         * The server does not support, or refuses to support, the HTTP protocol version that was used in the request message.
         *
         * @member HttpResponseStatusCode
         */
        HttpResponseStatusCode[HttpResponseStatusCode["httpVersionNotSupported"] = 505] = "httpVersionNotSupported";
    })(HttpResponseStatusCode = sys.HttpResponseStatusCode || (sys.HttpResponseStatusCode = {}));
    let HttpResponseStatusClass;
    (function (HttpResponseStatusClass) {
        HttpResponseStatusClass[HttpResponseStatusClass["informational"] = 1] = "informational";
        HttpResponseStatusClass[HttpResponseStatusClass["successful"] = 2] = "successful";
        HttpResponseStatusClass[HttpResponseStatusClass["redirect"] = 3] = "redirect";
        HttpResponseStatusClass[HttpResponseStatusClass["clientError"] = 4] = "clientError";
        HttpResponseStatusClass[HttpResponseStatusClass["serverError"] = 5] = "serverError";
        HttpResponseStatusClass[HttpResponseStatusClass["NOT_NUMBER"] = -1] = "NOT_NUMBER";
        HttpResponseStatusClass[HttpResponseStatusClass["OUT_OF_RANGE"] = -2] = "OUT_OF_RANGE";
    })(HttpResponseStatusClass = sys.HttpResponseStatusClass || (sys.HttpResponseStatusClass = {}));
    let HttpResponseStatusRanges;
    (function (HttpResponseStatusRanges) {
        HttpResponseStatusRanges[HttpResponseStatusRanges["MINRANGE"] = 100] = "MINRANGE";
        HttpResponseStatusRanges[HttpResponseStatusRanges["MINRANGE_INFORMATIONAL"] = 100] = "MINRANGE_INFORMATIONAL";
        HttpResponseStatusRanges[HttpResponseStatusRanges["MAXVALUE_INFORMATIONAL_EXCL"] = 102] = "MAXVALUE_INFORMATIONAL_EXCL";
        HttpResponseStatusRanges[HttpResponseStatusRanges["MAXRANGE_INFORMATIONAL_EXCL"] = 200] = "MAXRANGE_INFORMATIONAL_EXCL";
        HttpResponseStatusRanges[HttpResponseStatusRanges["MINRANGE_SUCCESSFUL"] = 200] = "MINRANGE_SUCCESSFUL";
        HttpResponseStatusRanges[HttpResponseStatusRanges["MAXVALUE_SUCCESSFUL_EXCL"] = 207] = "MAXVALUE_SUCCESSFUL_EXCL";
        HttpResponseStatusRanges[HttpResponseStatusRanges["MAXRANGE_SUCCESSFUL_EXCL"] = 300] = "MAXRANGE_SUCCESSFUL_EXCL";
        HttpResponseStatusRanges[HttpResponseStatusRanges["MINRANGE_REDIRECT"] = 300] = "MINRANGE_REDIRECT";
        HttpResponseStatusRanges[HttpResponseStatusRanges["MAXVALUE_REDIRECT_EXCL"] = 308] = "MAXVALUE_REDIRECT_EXCL";
        HttpResponseStatusRanges[HttpResponseStatusRanges["MAXRANGE_REDIRECT_EXCL"] = 400] = "MAXRANGE_REDIRECT_EXCL";
        HttpResponseStatusRanges[HttpResponseStatusRanges["MINRANGE_CLIENT_ERROR"] = 400] = "MINRANGE_CLIENT_ERROR";
        HttpResponseStatusRanges[HttpResponseStatusRanges["MAXVALUE_CLIENT_ERROR_EXCL"] = 418] = "MAXVALUE_CLIENT_ERROR_EXCL";
        HttpResponseStatusRanges[HttpResponseStatusRanges["MAXRANGE_CLIENT_ERROR_EXCL"] = 500] = "MAXRANGE_CLIENT_ERROR_EXCL";
        HttpResponseStatusRanges[HttpResponseStatusRanges["MINRANGE_SERVER_ERROR"] = 500] = "MINRANGE_SERVER_ERROR";
        HttpResponseStatusRanges[HttpResponseStatusRanges["MAXVALUE_SERVER_ERROR_EXCL"] = 506] = "MAXVALUE_SERVER_ERROR_EXCL";
        HttpResponseStatusRanges[HttpResponseStatusRanges["MAXRANGE_SERVER_ERROR_EXCL"] = 600] = "MAXRANGE_SERVER_ERROR_EXCL";
        HttpResponseStatusRanges[HttpResponseStatusRanges["MAXRANGE_EXCL"] = 600] = "MAXRANGE_EXCL";
    })(HttpResponseStatusRanges || (HttpResponseStatusRanges = {}));
    function __toHttpResponseStatusValueInRange(response) {
        if (response >= HttpResponseStatusRanges.MINRANGE && response < HttpResponseStatusRanges.MAXRANGE_EXCL)
            return Math.floor(response);
    }
    function __toHttpResponseStatusCode(response) {
        if (!isNaN(response) && response >= HttpResponseStatusRanges.MINRANGE_INFORMATIONAL) {
            if (response < HttpResponseStatusRanges.MAXRANGE_INFORMATIONAL_EXCL)
                return Math.floor(response);
            if (response >= HttpResponseStatusRanges.MINRANGE_SUCCESSFUL) {
                if (response < HttpResponseStatusRanges.MAXVALUE_SUCCESSFUL_EXCL)
                    return Math.floor(response);
                if (response >= HttpResponseStatusRanges.MINRANGE_REDIRECT) {
                    if (response < HttpResponseStatusRanges.MAXVALUE_REDIRECT_EXCL)
                        return Math.floor(response);
                    if ((response >= HttpResponseStatusRanges.MINRANGE_SERVER_ERROR) ? response < HttpResponseStatusRanges.MAXVALUE_SERVER_ERROR_EXCL :
                        response >= HttpResponseStatusRanges.MINRANGE_CLIENT_ERROR && response < HttpResponseStatusRanges.MAXVALUE_CLIENT_ERROR_EXCL)
                        return Math.floor(response);
                }
            }
        }
    }
    function toHttpResponseStatusClass(response) {
        if (typeof response == "number") {
            if (isNaN(response))
                return HttpResponseStatusClass.NOT_NUMBER;
            response = __toHttpResponseStatusValueInRange(response);
        }
        else if (typeof response === "object" && response !== null && typeof response.status === "number") {
            if (isNaN(response.status))
                return HttpResponseStatusClass.NOT_NUMBER;
            response = __toHttpResponseStatusValueInRange(response.status);
        }
        else
            return HttpResponseStatusClass.NOT_NUMBER;
        return (typeof response === "number") ? Math.floor(response / 100.0) : HttpResponseStatusClass.OUT_OF_RANGE;
    }
    sys.toHttpResponseStatusClass = toHttpResponseStatusClass;
    function toHttpResponseStatusCode(response) {
        if (typeof response == "number") {
            if (!isNaN(response))
                return __toHttpResponseStatusCode(response);
        }
        else if (typeof response === "object" && response !== null && typeof response.status === "number") {
            if (isNaN(response.status))
                return __toHttpResponseStatusCode(response.status);
        }
    }
    sys.toHttpResponseStatusCode = toHttpResponseStatusCode;
    function toHttpResponseStatusMessage(response) {
        if (typeof response == "number") {
            if (isNaN(response))
                return "#NaN";
        }
        else if (typeof response === "object" && response !== null) {
            if (typeof response.statusText === "string" && response.statusText.trim().length > 0)
                return response.statusText;
            if (typeof response.status !== "number")
                return "#Err";
            if (isNaN(response.status))
                return "#NaN";
            response = response.status;
        }
        else
            return "#Err";
        switch (Math.floor(response)) {
            case HttpResponseStatusCode.continue:
                return "Continue";
            case HttpResponseStatusCode.switchingProtocols:
                return "Switching Protocols";
            case HttpResponseStatusCode.ok:
                return "OK";
            case HttpResponseStatusCode.created:
                return "Created";
            case HttpResponseStatusCode.accepted:
                return "accepted";
            case HttpResponseStatusCode.nonAuthoritativeInformation:
                return "Non-Authoritative Information";
            case HttpResponseStatusCode.noContent:
                return "No Content";
            case HttpResponseStatusCode.resetContent:
                return "Reset Content";
            case HttpResponseStatusCode.partialContent:
                return "Partial Content";
            case HttpResponseStatusCode.multipleChoices:
                return "Multiple Choices";
            case HttpResponseStatusCode.movedPermanently:
                return "Moved Permanently";
            case HttpResponseStatusCode.found:
                return "Found";
            case HttpResponseStatusCode.seeOther:
                return "See Other";
            case HttpResponseStatusCode.notModified:
                return "Not Modified";
            case HttpResponseStatusCode.useProxy:
                return "Use Proxy";
            case HttpResponseStatusCode.unusedRedirection:
                return "Unused";
            case HttpResponseStatusCode.temporaryRedirect:
                return "Temporary Redirect";
            case HttpResponseStatusCode.badRequest:
                return "Bad Request";
            case HttpResponseStatusCode.unauthorized:
                return "Unauthorized";
            case HttpResponseStatusCode.paymentRequired:
                return "Payment Required";
            case HttpResponseStatusCode.forbidden:
                return "Forbidden";
            case HttpResponseStatusCode.notFound:
                return "Not Found";
            case HttpResponseStatusCode.methodNotAllowed:
                return "Method Not Allowed";
            case HttpResponseStatusCode.notAcceptable:
                return "Not Acceptable";
            case HttpResponseStatusCode.proxyAuthenticationRequired:
                return "Proxy Authentication Required";
            case HttpResponseStatusCode.requestTimeout:
                return "Request Timeout";
            case HttpResponseStatusCode.conflict:
                return "Conflict";
            case HttpResponseStatusCode.gone:
                return "Gone";
            case HttpResponseStatusCode.lengthRequired:
                return "Length Required";
            case HttpResponseStatusCode.preconditionFailed:
                return "Precondition Failed";
            case HttpResponseStatusCode.requestEntityTooLarge:
                return "Request Entity Too Large";
            case HttpResponseStatusCode.requestUriTooLong:
                return "Request Uri Too Long";
            case HttpResponseStatusCode.unsupportedMediaType:
                return "Unsupported Media Type";
            case HttpResponseStatusCode.requestedRangeNotSatisfiable:
                return "Requested Range Not Satisfiable";
            case HttpResponseStatusCode.expectationFailed:
                return "Expectation Failed";
            case HttpResponseStatusCode.internalServerError:
                return "Internal Server Error";
            case HttpResponseStatusCode.notImplemented:
                return "Not Implemented";
            case HttpResponseStatusCode.badGateway:
                return "Bad Gateway";
            case HttpResponseStatusCode.serviceUnavailable:
                return "Service Unavailable";
            case HttpResponseStatusCode.gatewayTimeout:
                return "Gateway Timeout";
            case HttpResponseStatusCode.httpVersionNotSupported:
                return "Http Version Not Supported";
        }
        if (response >= HttpResponseStatusRanges.MINRANGE_INFORMATIONAL) {
            if (response < HttpResponseStatusRanges.MAXRANGE_INFORMATIONAL_EXCL)
                return "Informational";
            if (response < HttpResponseStatusRanges.MAXVALUE_SUCCESSFUL_EXCL)
                return "Success";
            if (response < HttpResponseStatusRanges.MAXVALUE_REDIRECT_EXCL)
                return "Redirect";
            if (response < HttpResponseStatusRanges.MAXRANGE_CLIENT_ERROR_EXCL)
                return "Client Error";
            if (response < HttpResponseStatusRanges.MAXRANGE_SERVER_ERROR_EXCL)
                return "Server Error";
        }
        return "Unknown";
    }
    sys.toHttpResponseStatusMessage = toHttpResponseStatusMessage;
    /**
     * Indicates whether the response is provisional, consisting only of the Status-Line and optional headers, and is terminated by an empty line.
     *
     * @param {number | ng.IHttpPromiseCallbackArg<any>} response - The response code or response object.
     * @returns {boolean} True if the response is provisional; otherwise, false.
     */
    function isInformationalHttpResponse(response) {
        return (typeof response === "number" || (typeof response == "object" && response !== null && typeof (response = response.status) === "number")) && !isNaN(response) &&
            response >= HttpResponseStatusRanges.MINRANGE_INFORMATIONAL && response < HttpResponseStatusRanges.MAXRANGE_INFORMATIONAL_EXCL;
    }
    sys.isInformationalHttpResponse = isInformationalHttpResponse;
    /**
     * Indicates whether the client's request was successfully received, understood, and accepted.
     *
     * @param {number | ng.IHttpPromiseCallbackArg<any>} response - The response code or response object.
     * @returns {boolean} True if the client's request was successful; otherwise, false.
     */
    function isSuccessfulHttpResponse(response) {
        return (typeof response === "number" || (typeof response == "object" && response !== null && typeof (response = response.status) === "number")) && !isNaN(response) &&
            response >= HttpResponseStatusRanges.MINRANGE_SUCCESSFUL && response < HttpResponseStatusRanges.MAXRANGE_SUCCESSFUL_EXCL;
    }
    sys.isSuccessfulHttpResponse = isSuccessfulHttpResponse;
    /**
     * Indicates whether further action needs to be taken by the user agent in order to fulfill the request.
     *
     * @param {number | ng.IHttpPromiseCallbackArg<any>} response - The response code or response object.
     * @returns {boolean} True if further action needs to be taken by the user agent in order to fulfill the request; otherwise, false.
     */
    function isRedirectionHttpResponse(response) {
        return (typeof response === "number" || (typeof response == "object" && response !== null && typeof (response = response.status) === "number")) && !isNaN(response) &&
            response >= HttpResponseStatusRanges.MINRANGE_REDIRECT && response < HttpResponseStatusRanges.MAXRANGE_REDIRECT_EXCL;
    }
    sys.isRedirectionHttpResponse = isRedirectionHttpResponse;
    /**
     * Indicates whether there was an error in the client request.
     *
     * @param {number | ng.IHttpPromiseCallbackArg<any>} response - The response code or response object.
     * @returns {boolean} True if there was an error in the client request; otherwise, false.
     */
    function isClientErrorHttpResponse(response) {
        return (typeof response === "number" || (typeof response == "object" && response !== null && typeof (response = response.status) === "number")) && !isNaN(response) &&
            response >= HttpResponseStatusRanges.MINRANGE_CLIENT_ERROR && response < HttpResponseStatusRanges.MAXRANGE_CLIENT_ERROR_EXCL;
    }
    sys.isClientErrorHttpResponse = isClientErrorHttpResponse;
    /**
     * Indicates whether the server encountered an unexpected condition which prevented it from fulfilling the request.
     *
     * @param {number | ng.IHttpPromiseCallbackArg<any>} response - The response code or response object.
     * @returns {boolean} True if the server encountered an unexpected condition which prevented it from fulfilling the request; otherwise, false.
     */
    function isServerErrorHttpResponse(response) {
        return (typeof response === "number" || (typeof response == "object" && response !== null && typeof (response = response.status) === "number")) && !isNaN(response) &&
            response >= HttpResponseStatusRanges.MINRANGE_SERVER_ERROR && response < HttpResponseStatusRanges.MAXRANGE_SERVER_ERROR_EXCL;
    }
    sys.isServerErrorHttpResponse = isServerErrorHttpResponse;
    function logResponse(response, logService, messageOrForce, force) {
        if (((arguments.length > 3) ? force : messageOrForce) !== true && isSuccessfulHttpResponse(response))
            return;
        let outputObj = {};
        if (typeof messageOrForce === "string")
            outputObj.message = messageOrForce;
        if (typeof response === "number") {
            outputObj.statusCode = response;
            outputObj.status = toHttpResponseStatusMessage(response);
        }
        else {
            if (typeof response !== "object" || response === null)
                return;
            outputObj.statusCode = (typeof response.status !== "number") ? NaN : response.status;
            outputObj.status = toHttpResponseStatusMessage(response);
            if (typeof response.headers === "object" && response.headers !== null)
                outputObj.headers = response.headers;
        }
        if (toHttpResponseStatusCode(outputObj.statusCode) === HttpResponseStatusCode.noContent)
            logService.warn(angular.toJson(outputObj));
        else if (isSuccessfulHttpResponse(outputObj.statusCode) || isInformationalHttpResponse(outputObj.statusCode))
            logService.info(angular.toJson(outputObj));
        else
            logService.error(angular.toJson(outputObj));
    }
    sys.logResponse = logResponse;
    sys.uriParseRegex_beforeQuery = /^(([^\\\/@:]*)(:[\\\/]{0,2})((?=[^\\\/@:]*(?::[^\\\/@:]*)?@)([^\\\/@:]*)(:[^\\\/@:]*)?@)?([^\\\/@:]*)(?:(?=:\d*(?:[\\\/:]|$)):(\d*))?(?=[\\\/:]|$))?(.+)?$/;
    sys.uriParseRegex = /^(([^\\\/@:\?#]*)(:[\\\/]{0,2})((?=[^\\\/@:\?#]*(?::[^\\\/@:\?#]*)?@)([^\\\/@:\?#]*)(:[^\\\/@:\?#]*)?@)?([^\\\/@:\?#]*)(?:(?=:\d*(?:[\\\/:]|$)):(\d*))?(?=[\\\/:]|$))?([^\?#]+)?(\?([^#]+)?)?(#(.+)?)?$/;
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
    })(uriParseGroup = sys.uriParseGroup || (sys.uriParseGroup = {}));
    function parseUriString(source) {
        if (isNilOrEmpty(source))
            return { source: source, path: source };
        let match = sys.uriParseRegex.exec(source);
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
            if (notNil(match[uriParseGroup.origin])) {
                let name = (isNil(match[uriParseGroup.hostname])) ? '' : match[uriParseGroup.hostname];
                result.origin = {
                    value: match[uriParseGroup.origin],
                    scheme: {
                        name: match[uriParseGroup.schemeName],
                        separator: match[uriParseGroup.schemeSeparator]
                    },
                    host: { value: name, name: name }
                };
                if (notNil(match[uriParseGroup.userInfo])) {
                    result.origin.userInfo = { value: match[uriParseGroup.userInfo], name: (isNil(match[uriParseGroup.username])) ? '' : match[uriParseGroup.username] };
                    if (notNil(match[uriParseGroup.password]))
                        result.origin.userInfo.password = match[uriParseGroup.password].substr(1);
                }
                if (notNil(match[uriParseGroup.portnumber])) {
                    result.origin.host.value += match[uriParseGroup.portnumber];
                    result.origin.host.portnumber = match[uriParseGroup.portnumber].substr(1);
                }
            }
            result.path = (isNil(match[uriParseGroup.path])) ? '' : match[uriParseGroup.path];
            if (notNil(match[uriParseGroup.search]))
                result.queryString = (isNil(match[uriParseGroup.queryString])) ? '' : match[uriParseGroup.queryString];
            if (notNil(match[uriParseGroup.hash]))
                result.fragment = (isNil(match[uriParseGroup.fragment])) ? '' : match[uriParseGroup.fragment];
        }
        return result;
    }
    sys.parseUriString = parseUriString;
    const classNameRe = /^\[object\s(.*)\]$/;
    function getAllClassNames(obj) {
        let t = jQuery.type(obj);
        let n;
        let l;
        switch (t) {
            case "array":
                n = obj[Symbol.toStringTag];
                if (notNilOrEmpty(n) && n.toLowerCase() !== "object")
                    t = n;
                else
                    t = "Array";
                break;
            case "date":
                n = obj[Symbol.toStringTag];
                if (notNilOrEmpty(n) && n.toLowerCase() !== "object")
                    t = n;
                else
                    t = "Date";
                break;
            case "error":
                n = obj[Symbol.toStringTag];
                if (notNilOrEmpty(n) && n.toLowerCase() !== "object")
                    t = n;
                else
                    t = "Error";
                break;
            case "regexp":
                n = obj[Symbol.toStringTag];
                if (notNilOrEmpty(n) && n.toLowerCase() !== "object")
                    t = n;
                else
                    t = "RegExp";
                break;
            case "object":
                n = obj[Symbol.toStringTag];
                if (notNilOrEmpty(n))
                    t = n;
                else {
                    let m = Object.prototype.toString.call(obj).match(classNameRe);
                    if (notNilOrEmpty(m))
                        t = m[1];
                }
                break;
            default:
                return [t];
        }
        obj = Object.getPrototypeOf(obj);
        if (isNil(obj))
            return [t];
        let r = getAllClassNames(obj).filter((value) => value !== t);
        if (r.length == 0)
            return [t];
        if (t === "object")
            r.push(t);
        else
            r.unshift(t);
        return r;
    }
    sys.getAllClassNames = getAllClassNames;
    function getClassName(obj) {
        let t = jQuery.type(obj);
        let n;
        let l;
        switch (t) {
            case "array":
                n = obj[Symbol.toStringTag];
                if (notNilOrEmpty(n) && (l = n.toLowerCase()) !== "array" && l !== "object")
                    return n;
                t = "Array";
                break;
            case "date":
                n = obj[Symbol.toStringTag];
                if (notNilOrEmpty(n) && (l = n.toLowerCase()) !== "date" && l !== "object")
                    return n;
                t = "Date";
                break;
            case "error":
                n = obj[Symbol.toStringTag];
                if (notNilOrEmpty(n) && (l = n.toLowerCase()) !== "error" && l !== "object")
                    return n;
                t = "Error";
                break;
            case "regexp":
                n = obj[Symbol.toStringTag];
                if (notNilOrEmpty(n) && (l = n.toLowerCase()) !== "regexp" && l !== "object")
                    return n;
                t = "RegExp";
                break;
            case "object":
                n = obj[Symbol.toStringTag];
                if (notNilOrEmpty(n)) {
                    if (n.toLowerCase() !== "object")
                        return n;
                    t = (obj instanceof jQuery) ? "jQuery" : n;
                }
                else {
                    let m = Object.prototype.toString.call(obj).match(classNameRe);
                    if (notNilOrEmpty(m)) {
                        if (m[1].toLowerCase() !== "object")
                            return m[1];
                        if (obj instanceof jQuery)
                            t = "jQuery";
                    }
                    else if (obj instanceof jQuery)
                        t = "jQuery";
                }
                break;
            default:
                return t;
        }
        obj = Object.getPrototypeOf(obj);
        if (isNil(obj))
            return t;
        n = getClassName(obj);
        return (n.toLowerCase() === "object") ? t : n;
    }
    sys.getClassName = getClassName;
})(sys || (sys = {}));
//# sourceMappingURL=sys.js.map