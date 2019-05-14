/**
 * Determines if a value is null or undefined.
 * @param {*} value Value to test.
 * @returns {boolean} true if value was null or undefined; otherwise, false.
 */
export declare function isNil(value: any | null | undefined): value is null | undefined;
/**
 * Determines if value's type is an object.
 * @param {*} value Value to test.
 * @param {boolean} [noArray=false] If value is an array, return false.
 * @returns {boolean} true if value was null or undefined; otherwise, false.
 */
export declare function isObject(value: any | null | undefined, noArray?: boolean): value is object;
/**
 * Determines if a String represents a valid identifier name.
 * @param {string} text String to test.
 * @returns {boolean} true if value was a valid identifier name; otherwise, false.
 */
export declare function isValidIdentifierName(text: string): boolean;
/**
 * Ensures that a value is a string, converting it if necessary.
 * @param {*} value Value to assert.
 * @param {string} defaultValue The default value to return if the value is null or undefined.
 * @returns {string} Input value converted to a string.
 */
export declare function asString(value: any | null | undefined, defaultValue: string): any;
/**
 * Ensures that a value is a string, converting it if necessary.
 * @param {*} value Value to assert.
 * @param {boolean} trim If true, then the resulting string will be trimmed.
 * @param {string} defaultValue The default value to return if the value is null or undefined.
 * @returns {string} Input value converted to a string.
 */
export declare function asString(value: any | null | undefined, trim: boolean, defaultValue: string): any;
/**
 * Ensures that a value is a string, converting it if necessary.
 * @param {*} value Value to assert.
 * @param {boolean} [trim=false] If true, then the resulting string will be trimmed.
 * @param {boolean} [allowNil=false] If true, and the input value is null or undefined, then the input value will be returned; otherwise, a null or undefined input value will cause an empty string to be returned.
 * @returns {string} Input value converted to a string.
 */
export declare function asString(value: any | null | undefined, trim?: boolean, allowNil?: boolean): any;
/**
 * Ensures that a value is a floating-point number, converting it if necessary.
 * @param value
 * @param defaultValue
 * @returns {string} Input value converted to a floating-point number.
 */
export declare function asFloat(value: any | null | undefined, defaultValue?: number | null | undefined): number;
/**
 * Ensures that a value is a whole number, converting it if necessary.
 * @param value
 * @param defaultValue
 * @returns {string} Input value converted to a whole number.
 */
export declare function asInt(value: any | null | undefined, defaultValue?: number | null | undefined): number;
/**
 * Trims trailing whitespace from text.
 * @param {string} text Text to trim.
 * @returns {string} Text with trailing whitespace removed.
 */
export declare function trimRight(text: string): string;
/**
 * Trims leading whitespace from text.
 * @param {string} text Text to trim.
 * @returns {string} Text with leading whitespace removed.
 */
export declare function trimLeft(text: string): string;
export declare function asBoolean(value: any | null | undefined, nilIsTrue?: boolean): boolean;
export declare function notString(value: any | null | undefined): boolean;
export declare function notNil(value: any | null | undefined): value is string;
export declare function notNilOrEmpty(value: any | null | undefined): value is string;
export declare function isEmptyOrNotString(value: any | null | undefined): boolean;
export declare function isWhiteSpaceOrNotString(value: any | null | undefined): boolean;
export declare function asStringOrDefault(value: any | null | undefined, defaultValue: string): string;
export declare function asStringOrNull(value: any | null | undefined): string | null;
export declare function asStringOrUndefined(value: any | null | undefined): string | undefined;
export declare function isStringAndNotEmpty(value: any | null | undefined): value is string;
export declare function isStringAndNotWhiteSpace(value: any | null | undefined): value is string;
export declare function isError(value: any | null | undefined): value is Error;
export declare function compareStrings(a: any | null | undefined, b: any | null | undefined): number;
export declare function isIterable(value: any | null | undefined): value is {
    [Symbol.iterator](): Function;
};
export declare function asIterable<T>(source: T | T[] | Iterable<T> | null | undefined, allowNull?: boolean): Iterable<T>;
export declare function asArray<T>(source: T | T[] | Iterable<T> | null | undefined, allowNull?: boolean): T[];
export declare function skipFirst<T>(source: Iterable<T>, callbackfn: {
    (value: T, index: number, iterable: Iterable<T>): boolean;
}, thisArg?: any): any;
export declare function skipFirst<T>(source: Iterable<T>, count: number): any;
export declare function skipLast<T>(source: Iterable<T>, callbackfn: {
    (value: T, index: number, iterable: Iterable<T>): boolean;
}, thisArg?: any): any;
export declare function skipLast<T>(source: Iterable<T>, count: number): any;
export declare function takeFirst<T>(source: Iterable<T>, callbackfn: {
    (value: T, index: number, iterable: Iterable<T>): boolean;
}, thisArg?: any): any;
export declare function takeFirst<T>(source: Iterable<T>, count: number): any;
export declare function takeLast<T>(source: Iterable<T>, callbackfn: {
    (value: T, index: number, iterable: Iterable<T>): boolean;
}, thisArg?: any): any;
export declare function takeLast<T>(source: Iterable<T>, count: number): any;
export declare function filter<T>(source: Iterable<T>, callbackfn: {
    (value: T, index: number, iterable: Iterable<T>): boolean;
}, thisArg?: any): T[];
export declare function reverse<T>(source: Iterable<T>): T[];
export declare function indexOfAny(value: string, position: number, ...searchString: string[]): any;
export declare function indexOfAny(value: string, ...searchString: string[]): any;
