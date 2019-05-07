let urlParseRe: RegExp = /^(([^@:/?#]*):(?:\/\/((?:([^@:/?#]*)(?::([^@:/?#]*))?@)?([^:/?#]*)(?::(\d+(?=[:/?#]|$)))?))?)?(([:/]+(?=(?:[^?#:/]+[:/]*)?(?:\?|\#|$))|[:/]*[^:/?#]+(?=[:/]+[^?#])(?:[:/]+[^:/?#]+(?=[:/]+[^?#]))*)?[:/]*((\.*(?:\.[^.:/?#]*(?=\.)|[^.:/?#]+)*)(?:\.([^.:/?#]*))?)[:/]*)(?:\?([^#]*))?(?:\#(.*))?$/;
let trimRightRe: RegExp = /^((\s*\S+)(\s+\S+)*)\s*$/;
let trimLeftRe: RegExp = /^\s*(\S.*)$/;
let identifierRe: RegExp = /^[a-z_][a-z\d]*$/i;
let falseStringRe: RegExp = /^(f(alse)?|no?|0+(\.0+)?)([^\w-]|$)/i;

/**
 * Determines if a value is null or undefined.
 * @param {*} value Value to test.
 * @returns {boolean} true if value was null or undefined; otherwise, false.
 */
export function isNil(value: any | null | undefined): value is null | undefined { return typeof (value) === 'undefined' || value === null; }

/**
 * Determines if value's type is an object.
 * @param {*} value Value to test.
 * @param {boolean} [noArray=false] If value is an array, return false.
 * @returns {boolean} true if value was null or undefined; otherwise, false.
 */
export function isObject(value: any | null | undefined, noArray?: boolean): value is object { return (typeof (value) == "object" && value !== null && !(noArray && Array.isArray(value))); }

/**
 * Determines if a String represents a valid identifier name.
 * @param {string} text String to test.
 * @returns {boolean} true if value was a valid identifier name; otherwise, false.
 */
export function isValidIdentifierName(text: string): boolean { return typeof (text) == "string" && identifierRe.test(text); }

/**
 * Ensures that a value is a string, converting it if necessary.
 * @param {*} value Value to assert.
 * @param {string} defaultValue The default value to return if the value is null or undefined.
 * @returns {string} Input value converted to a string.
 */
export function asString(value: any | null | undefined, defaultValue: string);
/**
 * Ensures that a value is a string, converting it if necessary.
 * @param {*} value Value to assert.
 * @param {boolean} trim If true, then the resulting string will be trimmed.
 * @param {string} defaultValue The default value to return if the value is null or undefined.
 * @returns {string} Input value converted to a string.
 */
export function asString(value: any | null | undefined, trim: boolean, defaultValue: string);
/**
 * Ensures that a value is a string, converting it if necessary.
 * @param {*} value Value to assert.
 * @param {boolean} [trim=false] If true, then the resulting string will be trimmed.
 * @param {boolean} [allowNil=false] If true, and the input value is null or undefined, then the input value will be returned; otherwise, a null or undefined input value will cause an empty string to be returned.
 * @returns {string} Input value converted to a string.
 */
export function asString(value: any | null | undefined, trim?: boolean, allowNil?: boolean);
export function asString(value: any | null | undefined, trim: string | boolean = false, spec: string | boolean = false): string {
    if (isNil(value))
        return (typeof (trim) === 'string') ? trim : ((typeof (spec) === 'string') ? spec : ((spec) ? value : ""));
    if (typeof (value) != "string") {
        if (Array.isArray(value))
            value = value.join("\n");
        else {
            try { value = value.toString(); } catch (err) { /* okay to ignnore */ }
            if (isNil(value))
                return (typeof (trim) === 'string') ? trim : ((typeof (spec) === 'string') ? spec : ((spec) ? value : ""));
            if (typeof (value) != "string") {
                try {
                    value = Object.prototype.toString.call(value);
                    if (isNil(value))
                        return (typeof (trim) === 'string') ? trim : ((typeof (spec) === 'string') ? spec : ((spec) ? value : ""));
                }
                catch (err) {
                    try { value = value + ""; }
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

/**
 * Ensures that a value is a floating-point number, converting it if necessary.
 * @param value
 * @param defaultValue
 * @returns {string} Input value converted to a floating-point number.
 */
export function asFloat(value: any | null | undefined, defaultValue: number | null | undefined = NaN): number {
    if (typeof (value) === 'undefined' || value === null)
        return defaultValue;
    if (typeof (value) === 'number')
        return value;
    let n: number = parseFloat(value);
    if (isNaN(n))
        return defaultValue;
    return n;
}

/**
 * Ensures that a value is a whole number, converting it if necessary.
 * @param value
 * @param defaultValue
 * @returns {string} Input value converted to a whole number.
 */
export function asInt(value: any | null | undefined, defaultValue: number | null | undefined = NaN): number {
    if (typeof (value) === 'undefined' || value === null)
        return defaultValue;
    if (typeof (value) === 'number')
        return value;
    let n: number = parseInt(value);
    if (isNaN(n))
        return defaultValue;
    return n;
}

/**
 * Trims trailing whitespace from text.
 * @param {string} text Text to trim.
 * @returns {string} Text with trailing whitespace removed.
 */
export function trimRight(text: string): string {
    var m = trimRightRe.exec(asString(text));
    return (isNil(m)) ? "" : m[1];
}

/**
 * Trims leading whitespace from text.
 * @param {string} text Text to trim.
 * @returns {string} Text with leading whitespace removed.
 */
export function trimLeft(text: string): string {
    var m = trimLeftRe.exec(asString(text));
    return (isNil(m)) ? "" : m[1];
}

export function asBoolean(value: any | null | undefined, nilIsTrue: boolean = false): boolean {
    if (isNil(value))
        return (nilIsTrue == true);
    if (typeof (value) == "boolean")
        return value;
    if (typeof (value) == "object") {
        if (!Array.isArray(value)) {
            if (typeof (value.valueOf) == "function") {
                try { value = value.valueOf(); } catch (e) { }
                if (isNil(value))
                    return (nilIsTrue == true);
            }
            if (typeof (value) != "object" || !Array.isArray(value))
                value = [value];
            else if (value.length == 0)
                return false;
        } else if (value.length == 0)
            return false;
    } else
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
                    try { v = v.valueOf(); } catch (e) { }
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
    } else {
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
                    try { v = v.valueOf(); } catch (e) { }
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

export function notString(value: any | null | undefined): boolean { return typeof (value) !== 'string'; }

export function notNil(value: any | null | undefined): value is string { return typeof (value) === 'string'; }

export function notNilOrEmpty(value: any | null | undefined): value is string { return typeof (value) === 'string' && value.length > 0; }

export function isEmptyOrNotString(value: any | null | undefined): boolean { return typeof (value) !== 'string' || value.length == 0; }

export function asStringOrDefault(value: any | null | undefined, defaultValue: string): string { return (typeof (value) === 'string') ? value : defaultValue; }

export function asStringOrNull(value: any | null | undefined): string | null { return (typeof (value) === 'string') ? value : null; }

export function asStringOrUndefined(value: any | null | undefined): string | undefined { return (typeof (value) === 'string') ? value : undefined; }

export function compareStrings(a: any | null | undefined, b: any | null | undefined): number {
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

export function isIterable(value: any | null | undefined): value is { [Symbol.iterator](): Function } {
    if (typeof (value) !== 'object' || value == null)
        return false;
    if (Array.isArray(value))
        return true;
    let fn: any | null | undefined = value[Symbol.iterator];
    return (typeof (fn) === 'function');
}

export function asIterable<T>(source: T | T[] | Iterable<T> | null | undefined, allowNull: boolean = false): Iterable<T> {
    if (typeof (source) === 'undefined')
        return [];
    if (source === null)
        return (allowNull) ? [null] : [];
    return (Array.isArray(source)) ? source : ((isIterable(source)) ? <Iterable<T>>source : [<T>source]);
}

export function asArray<T>(source: T | T[] | Iterable<T> | null | undefined, allowNull: boolean = false): T[] {
    if (typeof (source) === 'undefined')
        return [];
    if (source === null)
        return (allowNull) ? [null] : [];
    if (Array.isArray(source))
        return source;
    if (isIterable(source)) {
        let iterator: Iterator<T>;
        let fn: Function = source[Symbol.iterator];
        try { iterator = fn(); } catch { /* okay to ignore */ }
        if (typeof (iterator) === 'object' && iterator !== null) {
            let result: T[] = [];
            try {
                let ir: IteratorResult<T> = iterator.next();
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
            } catch { /* okay to ignore */ }
            return result;
        }
    }
    return [<T>source];
}

export function skipFirst<T>(source: Iterable<T>, callbackfn: { (value: T, index: number, iterable: Iterable<T>): boolean }, thisArg?: any);
export function skipFirst<T>(source: Iterable<T>, count: number);
export function skipFirst<T>(source: Iterable<T>, spec: number | { (value: T, index: number, iterable: Iterable<T>): boolean }, thisArg?: any): T[] {
    let result: T[] = [];
    let iterator: Iterator<T> = source[Symbol.iterator]();
    let ir: IteratorResult<T> = iterator.next();
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
        let index: number = 0;
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

export function skipLast<T>(source: Iterable<T>, callbackfn: { (value: T, index: number, iterable: Iterable<T>): boolean }, thisArg?: any);
export function skipLast<T>(source: Iterable<T>, count: number);
export function skipLast<T>(source: Iterable<T>, spec: number | { (value: T, index: number, iterable: Iterable<T>): boolean }, thisArg?: any): T[] {
    let result: T[] = reverse(source);
    if (typeof (spec) === 'number') {
        while (result.length > 0 && spec-- > 0)
            result.shift();
    } else if (typeof (thisArg) === 'undefined') {
        while (result.length > 0 && spec(result[0], result.length - 1, source))
            result.shift();
    } else {
        while (result.length > 0 && spec.call(thisArg, result[0], result.length - 1, source))
            result.shift();
    }
    return result.reverse();
}

export function takeFirst<T>(source: Iterable<T>, callbackfn: { (value: T, index: number, iterable: Iterable<T>): boolean }, thisArg?: any);
export function takeFirst<T>(source: Iterable<T>, count: number);
export function takeFirst<T>(source: Iterable<T>, spec: number | { (value: T, index: number, iterable: Iterable<T>): boolean }, thisArg?: any): T[] {
    let result: T[] = [];
    let iterator: Iterator<T> = source[Symbol.iterator]();
    let ir: IteratorResult<T> = iterator.next();
    if (typeof (spec) === 'number')
        while (!ir.done && spec-- > 0) {
            result.push(ir.value);
            ir = iterator.next();
        }
    else {
        let index: number = 0;
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

export function takeLast<T>(source: Iterable<T>, callbackfn: { (value: T, index: number, iterable: Iterable<T>): boolean }, thisArg?: any);
export function takeLast<T>(source: Iterable<T>, count: number);
export function takeLast<T>(source: Iterable<T>, spec: number | { (value: T, index: number, iterable: Iterable<T>): boolean }, thisArg?: any): T[] {
    let result: T[] = reverse(source);
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

export function filter<T>(source: Iterable<T>, callbackfn: { (value: T, index: number, iterable: Iterable<T>): boolean }, thisArg?: any): T[] {
    let result: T[] = [];
    let iterator: Iterator<T> = source[Symbol.iterator]();
    let ir: IteratorResult<T> = iterator.next();
    let index: number = 0;
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

export function reverse<T>(source: Iterable<T>): T[] {
    let result: T[] = [];
    let iterator: Iterator<T> = source[Symbol.iterator]();
    let ir: IteratorResult<T> = iterator.next();
    let index: number = 0;
    while (!ir.done) {
        result.unshift(ir.value);
        ir = iterator.next();
    }
    return result;
}