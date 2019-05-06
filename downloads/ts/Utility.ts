export function notString(value?: any): boolean { return typeof (value) !== 'string'; }
export function notNil(value?: any): value is string { return typeof (value) === 'string'; }
export function notNilOrEmpty(value?: any): value is string { return typeof (value) === 'string' && value.length > 0; }
export function isEmptyOrNotString(value?: any): boolean { return typeof (value) !== 'string' || value.length == 0; }
export function asStringOrDefault(value: any | undefined, defaultValue: string): string { return (typeof (value) === 'string') ? value : defaultValue; }
export function asStringOrNull(value: any | undefined): string | null { return (typeof (value) === 'string') ? value : null; }
export function asStringOrUndefined(value: any | undefined): string | undefined { return (typeof (value) === 'string') ? value : undefined; }
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
export function skipFirst<T>(source: T[], count: number): T[] { return source.filter((value: T, index: number) => index >= count); }
export function skipWhile<T>(source: T[], callbackfn: { (value: T, index: number, array: T[]): boolean }, thisArg?: any): T[] {
    let matchFailed: boolean = false;
    if (typeof(thisArg) === 'undefined')
        return source.filter((value: T, index: number, array: T[]) => matchFailed || (matchFailed = callbackfn(value, index, array)));
    return source.filter((value: T, index: number, array: T[]) => matchFailed || (matchFailed = callbackfn(value, index, array)), thisArg);
}
export function skipLast<T>(source: T[], count: number): T[] { return source.filter((value: T, index: number, array: T[]) => index < (array.length - count)); }