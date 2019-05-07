/// <reference path="CommonJsUtility.ts" />

import * as CJU from "./CommonJsUtility";

class UriBuilderScheme {
    private _origin: UriBuilderOrigin;

    constructor(origin: UriBuilderOrigin) { this._origin = origin; }

    get name(): string { throw new Error("Property not implemented."); }
    set name(value: string) { throw new Error("Property not implemented."); }

    get protocol(): string { throw new Error("Property not implemented."); }
    set protocol(value: string) { throw new Error("Property not implemented."); }

    get separator(): string { throw new Error("Property not implemented."); }
}

class UriBuilderUser {
    private _origin: UriBuilderOrigin;

    constructor(origin: UriBuilderOrigin) { this._origin = origin; }

    get name(): string { throw new Error("Property not implemented."); }
    set name(value: string) { throw new Error("Property not implemented."); }

    get password(): string | undefined { throw new Error("Property not implemented."); }
    set password(value: string | undefined) { throw new Error("Property not implemented."); }
}

class UriBuilderHost {
    private _origin: UriBuilderOrigin;

    constructor(origin: UriBuilderOrigin) { this._origin = origin; }

    get hostname(): string { throw new Error("Property not implemented."); }
    set hostname(value: string) { throw new Error("Property not implemented."); }

    get port(): string | undefined { throw new Error("Property not implemented."); }
    set port(value: string | undefined) { throw new Error("Property not implemented."); }

    get portNumber(): number | undefined { throw new Error("Property not implemented."); }
    set portNumber(value: number | undefined) { throw new Error("Property not implemented."); }
}
class UriBuilderOrigin {
    private _href: UriBuilderHref;
    private _scheme: UriBuilderScheme;
    private _user?: UriBuilderUser = undefined;
    private _host?: UriBuilderHost = undefined;

    get protocol(): string { throw new Error("Property not implemented."); }
    set protocol(value: string) { throw new Error("Property not implemented."); }

    get scheme(): string | undefined { throw new Error("Property not implemented."); }
    set scheme(value: string | undefined) { throw new Error("Property not implemented."); }

    get separator(): string { throw new Error("Property not implemented."); }

    get username(): string | undefined { throw new Error("Property not implemented."); }
    set username(value: string | undefined) { throw new Error("Property not implemented."); }

    get password(): string | undefined { throw new Error("Property not implemented."); }
    set password(value: string | undefined) { throw new Error("Property not implemented."); }

    get host(): string { throw new Error("Property not implemented."); }
    set host(value: string) { throw new Error("Property not implemented."); }

    get hostname(): string | undefined { throw new Error("Property not implemented."); }
    set hostname(value: string | undefined) { throw new Error("Property not implemented."); }

    get port(): string | undefined { throw new Error("Property not implemented."); }
    set port(value: string | undefined) { throw new Error("Property not implemented."); }

    get portNumber(): number | undefined { throw new Error("Property not implemented."); }
    set portNumber(value: number | undefined) { throw new Error("Property not implemented."); }

    constructor(href: UriBuilderHref) {
        this._href = href;
        this._scheme = new UriBuilderScheme(this);
    }

    raiseSchemeChanged(): void {
        this._href.raiseOrginChanged();
    }

    raiseUserChanged(): void {
        this._href.raiseOrginChanged();
    }

    raiseHostChanged(): void {
        this._href.raiseOrginChanged();
    }
}

class UriBuilderPath implements Iterable<string> {
    static readonly PathSeperatorPattern: RegExp = /[\/\\]+/;

    private _href: UriBuilderHref;

    get pathname(): string { throw new Error("Property not implemented."); }
    set pathname(value: string) { throw new Error("Property not implemented."); }

    constructor(href: UriBuilderHref) { this._href = href; }

    [Symbol.iterator](): Iterator<string> {
        throw new Error("Method not implemented.");
    }
}

class UriBuilderQuery implements URLSearchParams {
    reset(value: URLSearchParams): any {
        throw new Error("Method not implemented.");
    }
    private _href: UriBuilderHref;

    get search(): string { throw new Error("Property not implemented."); }
    set search(value: string) { throw new Error("Property not implemented."); }

    constructor(href: UriBuilderHref) { this._href = href; }


    append(name: string, value: string): void {
        throw new Error("Method not implemented.");
    }

    delete(name: string): void {
        throw new Error("Method not implemented.");
    }
    get(name: string): string {
        throw new Error("Method not implemented.");
    }
    getAll(name: string): string[] {
        throw new Error("Method not implemented.");
    }
    has(name: string): boolean {
        throw new Error("Method not implemented.");
    }
    set(name: string, value: string): void {
        throw new Error("Method not implemented.");
    }
    sort(): void {
        throw new Error("Method not implemented.");
    }
    forEach(callbackfn: (value: string, key: string, parent: URLSearchParams) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }
    [Symbol.iterator](): IterableIterator<[string, string]> {
        throw new Error("Method not implemented.");
    }
    entries(): IterableIterator<[string, string]> {
        throw new Error("Method not implemented.");
    }
    keys(): IterableIterator<string> {
        throw new Error("Method not implemented.");
    }
    values(): IterableIterator<string> {
        throw new Error("Method not implemented.");
    }
}

class UriBuilderHref {
    private _href: string = '';
    private _origin?: UriBuilderOrigin = undefined;
    private _path: UriBuilderPath;
    private _query?: UriBuilderQuery = undefined;
    private _fragment?: string = undefined;

    get href(): string { return this._href; }
    set href(value: string) {
        if (typeof (value) !== 'string')
            value = '';
    }

    get protocol(): string { return (typeof (this._origin) === 'undefined') ? '' : this._origin.protocol; }
    set protocol(value: string) {
        if (typeof (this._origin) === 'undefined') {
            if (CJU.isEmptyOrNotString(value))
                return;
            this._origin = new UriBuilderOrigin(this);
        }
        this._origin.protocol = value;
    }

    get scheme(): string | undefined {
        if (typeof (this._origin) !== 'undefined')
            return this._origin.scheme;
    }
    set scheme(value: string | undefined) {
        if (typeof (this._origin) === 'undefined') {
            if (typeof (value) !== 'string')
                return;
            this._origin = new UriBuilderOrigin(this);
        }
        this._origin.scheme = value;
    }

    get separator(): string { return (typeof (this._origin) !== 'undefined') ? this._origin.separator : ''; }

    get username(): string | undefined {
        if (typeof (this._origin) !== 'undefined')
            return this._origin.username;
    }
    set username(value: string | undefined) {
        if (typeof (this._origin) === 'undefined') {
            if (typeof (value) !== 'string')
                return;
            this._origin = new UriBuilderOrigin(this);
        }
        this._origin.username = value;
    }

    get password(): string | undefined {
        if (typeof (this._origin) !== 'undefined')
            return this._origin.password;
    }
    set password(value: string | undefined) {
        if (typeof (this._origin) === 'undefined') {
            if (typeof (value) !== 'string')
                return;
            this._origin = new UriBuilderOrigin(this);
        }
        this._origin.password = value;
    }

    get host(): string { return (typeof (this._origin) !== 'undefined') ? this._origin.host : ''; }
    set host(value: string) {
        if (typeof (this._origin) === 'undefined') {
            if (CJU.isEmptyOrNotString(value))
                return;
            this._origin = new UriBuilderOrigin(this);
        }
        this._origin.host = value;
    }

    get hostname(): string | undefined {
        if (typeof (this._origin) !== 'undefined')
            return this._origin.hostname;
    }
    set hostname(value: string | undefined) {
        if (typeof (this._origin) === 'undefined') {
            if (typeof (value) !== 'string')
                return;
            this._origin = new UriBuilderOrigin(this);
        }
        this._origin.hostname = value;
    }

    get port(): string | undefined {
        if (typeof (this._origin) !== 'undefined')
            return this._origin.port;
    }
    set port(value: string | undefined) {
        if (typeof (this._origin) === 'undefined') {
            if (typeof (value) !== 'string')
                return;
            this._origin = new UriBuilderOrigin(this);
        }
        this._origin.port = value;
    }

    get portNumber(): number | undefined { return (typeof (this._origin) !== 'undefined') ? this._origin.portNumber : NaN; }
    set portNumber(value: number | undefined) {
        if (typeof (this._origin) === 'undefined') {
            if (typeof (value) !== 'number' || isNaN(value))
                return;
            this._origin = new UriBuilderOrigin(this);
        }
        this._origin.portNumber = value;
    }

    get pathname(): string { return this._path.pathname; }
    set pathname(value: string) { this._path.pathname = value; }

    get search(): string { return (typeof (this._query) !== 'undefined') ? this._query.search : ''; }
    set search(value: string) {
        if (typeof (this._query) === 'undefined') {
            if (CJU.isEmptyOrNotString(value))
                return;
            this._query = new UriBuilderQuery(this);
        }
        this._query.search = value;
    }

    get searchParams(): URLSearchParams {
        if (typeof (this._query) === 'undefined')
            this._query = new UriBuilderQuery(this);
        return this._query;
    }
    set searchParams(value: URLSearchParams) {
        if (CJU.isNil(value)) {
            if (typeof (this._query) === 'undefined')
                return;
            this._query = undefined;
            this.raiseHrefChanged();
        } else
            this._query.reset(value);
    }

    get fragment(): string | undefined { return this._fragment; }
    set fragment(value: string | undefined) {
        if (typeof (value) === 'string') {
            if (this._fragment === value)
                return;
            this._fragment = value;
        } else {
            if (typeof (this._fragment) !== 'string')
                return;
            this._fragment = undefined;
        }
        this.raiseHrefChanged();
    }

    get hash(): string { return (typeof (this._fragment) !== 'undefined') ? '#' + this._fragment : ''; }
    set hash(value: string) {
        if (CJU.isEmptyOrNotString(value)) {
            if (typeof (this._fragment) === 'undefined')
                return;
            this._fragment = undefined;
        } else {
            if (value.startsWith('#'))
                value = value.substr(1);
            if (this._fragment === value)
                return;
            this._fragment = value;
        }
        this.raiseHrefChanged();
    }

    constructor() {
        this._path = new UriBuilderPath(this);
    }

    raiseOrginChanged(): void {
        this.raiseHrefChanged();
    }

    raisePathChanged(): void {
        this.raiseHrefChanged();
    }

    raiseQueryChanged(): void {
        this.raiseHrefChanged();
    }

    private raiseHrefChanged(): void {
        throw new Error("Method not implemented.");
    }
}

export class UriBuilder implements URL {
    static readonly UrlPattern: RegExp = /^(?:([^#?:\/\\@]*)(:(?:[\\\/][\\\/]?)?)(?:([^#?:\/\\@]*):([^#?:\/\\@]*)@)?(?:([^#?:\/\\@]*):(\d+))?)?([^#?]*)?(?:\?([^#]*))?(?:#(.*))?$/;

    private _href: UriBuilderHref = new UriBuilderHref();

    constructor(uri?: string) {

    }

    get href(): string { throw new Error("Property not implemented."); }
    set href(value: string) { throw new Error("Property not implemented."); }

    get origin(): string { throw new Error("Property not implemented."); }
    set origin(value: string) { throw new Error("Property not implemented."); }

    get protocol(): string { throw new Error("Property not implemented."); }
    set protocol(value: string) { throw new Error("Property not implemented."); }

    get username(): string { throw new Error("Property not implemented."); }
    set username(value: string) { throw new Error("Property not implemented."); }

    get password(): string { throw new Error("Property not implemented."); }
    set password(value: string) { throw new Error("Property not implemented."); }

    get host(): string { throw new Error("Property not implemented."); }
    set host(value: string) { throw new Error("Property not implemented."); }

    get hostname(): string { throw new Error("Property not implemented."); }
    set hostname(value: string) { throw new Error("Property not implemented."); }

    get pathname(): string { throw new Error("Property not implemented."); }
    set pathname(value: string) { throw new Error("Property not implemented."); }

    get port(): string { throw new Error("Property not implemented."); }
    set port(value: string) { throw new Error("Property not implemented."); }

    get search(): string { throw new Error("Property not implemented."); }
    set search(value: string) { throw new Error("Property not implemented."); }

    get searchParams(): URLSearchParams { throw new Error("Property not implemented."); }
    set searchParams(value: URLSearchParams) { throw new Error("Property not implemented."); }

    get hash(): string { throw new Error("Property not implemented."); }
    set hash(value: string) { throw new Error("Property not implemented."); }

    toJSON(): string {
        throw new Error("Method not implemented.");
    }


}


interface IUrlProperties {
    isAbsoluteUri: boolean;
    schemeDefinition: KnownSchemeDefinition;
    userName?: string;
    password?: string;
    hostName?: string;
    port?: string;
    pathName: string;
    pathSegments: string[];
    queryString?: string;
    queryParams: { name: string, value: string | null }[];
    fragment?: string;
    isDirty: boolean;
}

class UrlQueryParamIterator implements IterableIterator<[string, string | null]> {
    private _index: number = 0;
    private _queryParams: { name: string, value: string | null }[];
    constructor(queryParams: { name: string, value: string | null }[]) { this._queryParams = queryParams; }
    next(): IteratorResult<[string, string | null]> {
        if (this._index < this._queryParams.length) {
            let item: { name: string, value: string | null } = this._queryParams[this._index++];
            return { value: [item.name, item.value], done: false };
        }
        return { value: [undefined, undefined], done: true };
    }
    [Symbol.iterator](): IterableIterator<[string, string | null]> { return this; }
}
class UrlQueryNameIterator implements IterableIterator<string> {
    private _index: number = 0;
    private _queryParams: { name: string, value?: string }[];
    constructor(queryParams: { name: string, value?: string }[]) { this._queryParams = queryParams; }
    next(y): IteratorResult<string> {
        return (this._index < this._queryParams.length) ? { value: this._queryParams[this._index++].name, done: false } :
            { value: undefined, done: true };
    }
    [Symbol.iterator](): IterableIterator<string> { return this; }
}
class UrlQueryValueIterator implements IterableIterator<string | null> {
    private _index: number = 0;
    private _queryParams: { name: string, value: string | null }[];
    constructor(queryParams: { name: string, value: string | null }[]) { this._queryParams = queryParams; }
    next(): IteratorResult<string | null> {
        return (this._index < this._queryParams.length) ? { value: this._queryParams[this._index++].value, done: false } :
            { value: undefined, done: true };
    }
    [Symbol.iterator](): IterableIterator<string | null> { return this; }
}
export class UrlQuery implements URLSearchParams {
    private _properties: IUrlProperties;

    get length(): number { return this._properties.queryParams.length; }

    constructor(searchParams: URLSearchParams);
    constructor(queryString?: string, properties?: IUrlProperties);
    constructor(searchParams?: string | URLSearchParams, properties?: IUrlProperties) {
        if (typeof (searchParams) === 'undefined') {
            if (typeof (properties) === 'undefined')
                this._properties = { pathName: '', pathSegments: [], queryParams: [], isAbsoluteUri: false, isDirty: false, schemeDefinition: new KnownSchemeDefinition() };
            else {
                this._properties = properties;
                this._properties.queryParams = [];
                this.updateQueryString();
            }
        } else {
            this._properties = (typeof (properties) === 'undefined') ? { pathName: '', pathSegments: [], queryParams: [], isAbsoluteUri: false, isDirty: false, schemeDefinition: new KnownSchemeDefinition() } : properties;
            if (typeof (searchParams) === 'string') {
                if (searchParams.startsWith('?'))
                    searchParams = searchParams.substr(1);
                if (searchParams.length == 0) {
                    if (this._properties.queryString !== '')
                        this._properties.isDirty = true;
                    this._properties.queryString = '';
                } else {
                    this._properties.queryParams = searchParams.split('&').map((value: string) => {
                        let index: number = value.indexOf('=');
                        if (index < 0)
                            return { name: decodeURIComponent(value), value: null };
                        return { name: decodeURIComponent(value.substr(0, index)), value: decodeURIComponent(value.substr(index + 1)) };
                    });
                    this.updateQueryString();
                }
            } else {
                this._properties = { pathName: '', pathSegments: [], queryParams: [], isAbsoluteUri: false, isDirty: false, schemeDefinition: new KnownSchemeDefinition() };
                searchParams.forEach((value: string, key: string) => {
                    this._properties.queryParams.push({ name: key, value: CJU.asStringOrNull(value) });
                }, this);
                this.updateQueryString();
            }
        }
    }

    append(name: string, value: string | null): void {
        if (typeof(name) !== 'string')
            throw new Error("Name must be a string value.");
        this._properties.queryParams.push({ name: name, value: CJU.asStringOrNull(value) });
        this.updateQueryString();
    }

    delete(name: string): void {
        if (typeof (name) !== 'string')
            return;
        let length: number = this._properties.queryParams.length;
        this._properties.queryParams = this._properties.queryParams.filter((value: { name: string, value: string | null }) => value.name === name);
        if (length != this._properties.queryParams.length)
            this.updateQueryString();
    }

    forEach(callbackfn: (value: string | null, key: string, parent: URLSearchParams) => void, thisArg?: any): void {
        if (typeof (thisArg) === undefined)
            this._properties.queryParams.forEach((item: { name: string; value: string | null }) => callbackfn(item.value, item.name, this));
        else
            this._properties.queryParams.forEach((item: { name: string; value: string | null }) => callbackfn.call(item.value, item.name, thisArg));
    }

    get(name: string): string | null | undefined {
        if (typeof (name) === 'string') {
            for (let i: number = 0; i < this._properties.queryParams.length; i++) {
                let item: { name: string; value: string | null } = this._properties.queryParams[i];
                if (item.name === name)
                    return item.value;
            }
        }
    }

    getAll(name: string): (string | null)[] {
        return this._properties.queryParams.filter((item: { name: string; value: string | null }) =>
            item.name === name).map((item: { name: string; value: string | null }) => item.value);
    }

    has(name: string): boolean {
        if (typeof (name) === 'string') {
            for (let i: number = 0; i < this._properties.queryParams.length; i++) {
                if (this._properties.queryParams[i].name === name)
                    return true;
            }
        }
        return false;
    }

    reset(searchParams: string | URLSearchParams) {
        if (typeof (searchParams) === 'string') {
            this._properties.queryParams = searchParams.split('&').map((value: string) => {
                let index: number = value.indexOf('=');
                if (index < 0)
                    return { name: decodeURIComponent(value), value: null };
                return { name: decodeURIComponent(value.substr(0, index)), value: decodeURIComponent(value.substr(index + 1)) };
            });
            this.updateQueryString();
        } else {
            let arr: { name: string; value: string | null }[] = [];
            searchParams.forEach(function(value: string, key: string) {
                this.push({ name: key, value: (typeof (value) === 'string') ? value : null });
            }, arr);
            this._properties.queryParams = arr;
            this.updateQueryString();
        }
    }

    set(name: string, value: string | null): void {
        if (typeof (name) !== 'string')
            throw new Error("Name must be a string value.");
        for (let i: number = 0; i < this._properties.queryParams.length; i++) {
            let item: { name: string; value: string | null } = this._properties.queryParams[i];
            if (item.name === name) {
                item.value = value;
                this.updateQueryString();
                return;
            }
        }
        this._properties.queryParams.push({ name: name, value: (typeof (value) === 'string') ? value : null });
        this.updateQueryString();
    }

    sort(): void {
        this._properties.queryParams = this._properties.queryParams.sort((a: { name: string; value: string | null }, b: { name: string; value: string | null }) => {
            let n: number = CJU.compareStrings(a.name, b.name);
            return (n == 0) ? CJU.compareStrings(a.value, b.value) : n;
        });
    }

    private updateQueryString() {
        let queryString: string | undefined = this._properties.queryString;

        if (this._properties.queryParams.length > 0) {
            if (this._properties.queryParams.length == 1 && this._properties.queryParams[0].name.length == 0 && this._properties.queryParams[0].value === null) {
                this._properties.queryParams = [];
                this._properties.queryString = '';
            } else
                this._properties.queryString = this._properties.queryParams.map((value: { name: string, value: string | null }) =>
                    (typeof (value.value) === 'string') ? encodeURIComponent(value.name) + '=' + encodeURIComponent(value.value) : encodeURIComponent(value.name)).join("&");
        }
        else
            this._properties.queryString = undefined;
        if (queryString !== this._properties.queryString)
            this._properties.isDirty = true;
    }

    toString(): string { return this._properties.queryString; }

    toJSON(): { name: string; value?: string }[] {
        if (typeof (this._properties.queryString) !== 'string')
            return [];
        if (this._properties.queryString.length == 0)
            return [{ name: '' }];
        return this._properties.queryParams.map((item: { name: string; value: string | null }) => (typeof (item.value) === 'string') ?
            { name: item.name, value: item.value } : { name: item.name });
    }

    keys(): IterableIterator<string> { return new UrlQueryNameIterator(this._properties.queryParams); }
    values(): IterableIterator<string | null> { return new UrlQueryValueIterator(this._properties.queryParams); }
    entries(): IterableIterator<[string, string | null]> { return new UrlQueryParamIterator(this._properties.queryParams); }
    [Symbol.iterator](): IterableIterator<[string, string | null]> { return new UrlQueryParamIterator(this._properties.queryParams); }
}

export class PathNameCollection implements Iterable<string> {
    static readonly PathSeperatorPattern: RegExp = /[\/\\]+/;

    private _properties: IUrlProperties;

    get length(): number {
        return (this._properties.pathName.length == 0) ? 1 : ((this._properties.pathName.endsWith('/')) ? this._properties.pathSegments.length + 1 :
            this._properties.pathSegments.length);
    }

    get hasTrailingSeparator(): boolean { return this._properties.pathName.endsWith('/'); }
    set hasTrailingSeparator(value: boolean) {
        if (value) {
            if (this._properties.pathName.endsWith('/'))
                return;
            this._properties.pathName += '/';
        } else {
            if (!this._properties.pathName.endsWith('/') || (this._properties.pathName.length == 1 && this._properties.isAbsoluteUri))
                return;
            this._properties.pathName = this._properties.pathName.substr(this._properties.pathName.length - 1);
        }
        this._properties.isDirty = true;
    }

    get isRooted(): boolean { return this._properties.pathName.startsWith('/'); }
    set isRooted(value: boolean) {
        if (value) {
            if (this._properties.pathName.startsWith('/'))
                return;
            this._properties.pathName = '/' + this._properties.pathName;
        } else {
            if (!this._properties.pathName.startsWith('/') || (this._properties.pathName.length == 1 && this._properties.isAbsoluteUri))
                return;
            this._properties.pathName = this._properties.pathName.substr(1);
        }
        this._properties.isDirty = true;
    }

    get leaf(): string {
        let items: string[] = this.toArray();
        return items[items.length - 1];
    }
    set leaf(value: string) {
        let items: string[] = this.toJSON();
        items[items.length - 1] = value;
        this.updatePathName(items);
    }

    get parentPath(): string | undefined {
        let items: string[] = this.toJSON();
        items.pop();
        if (items.length == 1)
            return (items[0].length == 0) ? '/' : items[0];
        if (items.length > 1)
            return items.join('/');
    }
    set parentPath(value: string | undefined) {
        let items: string[] = this.toJSON();
        if (items.length == 1) {
            if (items[0].length == 1)
                this.updatePathName(value.split(PathNameCollection.PathSeperatorPattern).map((n: string) => decodeURIComponent(n)));
            else
                this.updatePathName(value.split(PathNameCollection.PathSeperatorPattern).map((n: string) => decodeURIComponent(n)).concat([items[0]]));
        } else
            this.updatePathName(value.split(PathNameCollection.PathSeperatorPattern).map((n: string) => decodeURIComponent(n)).concat([items.pop()]));
    }

    constructor(pathNames: Iterable<string>);
    constructor(pathName?: string, properties?: IUrlProperties);
    constructor(pathName?: string | Iterable<string>, properties?: IUrlProperties) {
        if (typeof (pathName) === 'undefined') {
            if (typeof (properties) === 'undefined')
                this._properties = { pathName: '', pathSegments: [], queryParams: [], isAbsoluteUri: false, isDirty: false, schemeDefinition: new KnownSchemeDefinition() };
            else {
                this._properties = properties;
                this.updatePathName([]);
            }
        } else {
            this._properties = (typeof (properties) === 'undefined') ? { pathName: '', pathSegments: [], queryParams: [], isAbsoluteUri: false, isDirty: false, schemeDefinition: new KnownSchemeDefinition() } : properties;
            if (typeof (pathName) === 'string')
                this.updatePathName(pathName.split(PathNameCollection.PathSeperatorPattern).map((n: string) => decodeURIComponent(n)));
            else {
                let nArr: string[] = [];
                let iterator: Iterator<string> = pathName[Symbol.iterator]();
                let result: IteratorResult<string> = iterator.next();
                while (!result.done) {
                    nArr.push(result.value)
                    result = iterator.next();
                }
                this.updatePathName(nArr);
            }
        }
    }

    forEach(callbackfn: (value: string, index: number, array: string[]) => void, thisArg?: any): void {
        if (typeof (thisArg) === 'undefined')
            this.toArray().forEach(callbackfn);
        else
            this.toArray().forEach(callbackfn, thisArg);
    }

    get(index: number): string { return this.toArray()[index]; }

    indexOf(searchElement: string, fromIndex?: number): number { return this.toArray().indexOf(searchElement, fromIndex); }

    lastIndexOf(searchElement: string, fromIndex?: number): number { return this.toArray().lastIndexOf(searchElement, fromIndex); }

    map<U>(callbackfn: (value: string, index: number, array: string[]) => U, thisArg?: any): U[] {
        if (typeof (thisArg) === 'undefined')
            return this.toArray().map(callbackfn);
        return this.toArray().map(callbackfn, thisArg);
    }

    pop(): string {
        let items: string[] = this.toJSON();
        let result: string = items.pop();
        if (result.length > 0 || items.length > 1) {
            this.updatePathName(items);
            return result;
        }
    }

    push(...items: string[]): number {
        let arr: string[] = this.toJSON();
        items.forEach((s: string) => arr.push((typeof (s) === 'string') ? s : ''));
        this.updatePathName(arr);
        return this.length;
    }

    reset(value: string | Iterable<string>): any {
        if (typeof (value) === 'string')
            this.updatePathName(value.split(PathNameCollection.PathSeperatorPattern).map((n: string) => decodeURIComponent(n)));
        else if (typeof (value) === 'object') {
            let iterator: Iterator<string> = value[Symbol.iterator]();
            let result: IteratorResult<string> = iterator.next();
            let items: string[] = [];
            while (!result.done) {
                items.push(result.value);
                result = iterator.next();
            }
            this.updatePathName(items);
        } else
            this.updatePathName(['']);
    }

    set(index: number, name: string) {
        if (index < 0 || index > this.length)
            throw new Error("Index out of range");
        let arr: string[] = this.toJSON();
        if (arr.length > 1 && arr[0].length == 0)
            index++;
        if (index < arr.length)
            arr[index] = (typeof (name) !== 'string') ? '' : name;
        else
            arr.push((typeof (name) !== 'string') ? '' : name);
        this.updatePathName(arr);
    }

    shift(): string {
        let items: string[] = this.toJSON();
        let result: string = items.shift();
        if (result.length > 0) {
            this.updatePathName(items);
            return result;
        } else if (items.length > 1) {
            result = items.shift();
            if (result.length > 0) {
                items.unshift('');
                this.updatePathName(items);
                return result;
            } else if (!this._properties.isAbsoluteUri) {
                this.updatePathName(items);
                return result;
            }
        }
    }

    unshift(...items: string[]): number {
        let arr: string[] = this.toJSON();
        items.reverse().forEach((n: string) => arr.unshift((typeof (n) !== 'string') ? '' : n));
        this.updatePathName(items);
        return this.length;
    }

    toString(): string { return this._properties.pathName; }

    updatePathName(segments: string[]) {
        let pathName: string = this._properties.pathName;
        this._properties.pathSegments = segments.filter((s: string) => typeof (s) === 'string' && s.length > 0);
        this._properties.pathName = (this._properties.pathSegments.length == 0) ? '' : this._properties.pathSegments.join('/');
        if (this._properties.isAbsoluteUri || (segments.length > 0 && CJU.isEmptyOrNotString(segments[0])))
            this._properties.pathName = '/' + this._properties.pathName;
        if (this._properties.pathSegments.length > 0 && CJU.isEmptyOrNotString(segments[segments.length - 1]))
            this._properties.pathName += '/';
        if (pathName !== this._properties.pathName)
            this._properties.isDirty = true;
    }

    private toArray() {
        return (this._properties.pathSegments.length == 0) ? [''] : ((this._properties.pathName.endsWith('/')) ? this._properties.pathSegments.concat(['']) :
            this._properties.pathSegments);
    }

    toJSON(): string[] {
        if (this._properties.pathName.length == 0)
            return [''];
        let arr: string[];
        if (this._properties.pathName.startsWith('/')) {
            if (this._properties.pathName.length == 1)
                return ['', ''];
            arr = [''];
        } else
            arr = [];
        return (this._properties.pathName.endsWith('/')) ? arr.concat(this._properties.pathSegments).concat(['']) : arr.concat(this._properties.pathSegments);
    }

    [Symbol.iterator](): Iterator<string> { return this.toArray()[Symbol.iterator](); }
}

class KnownSchemeDefinition {
    private _name: string;
    private _separator: string = '://';
    private _allowUsername: boolean = true;
    private _requireUsername: boolean = false;
    private _allowPassword: boolean = true;
    private _allowHost: boolean = true;
    private _requireHost: boolean = false;
    private _allowPort: boolean = true;
    private _defaultPort: number = NaN;
    private _allowQuery: boolean = true;
    private _allowFragment: boolean = true;
    get name(): string { return this._name; }
    get separator(): string { return this._separator; }
    get allowUsername(): boolean { return this._allowUsername; }
    get requireUsername(): boolean { return this._requireUsername; }
    get allowPassword(): boolean { return this._allowPassword; }
    get allowHost(): boolean { return this._allowHost; }
    get requireHost(): boolean { return this._requireHost; }
    get allowPort(): boolean { return this._allowPort; }
    get defaultPort(): number { return this._defaultPort; }
    get allowQuery(): boolean { return this._allowQuery; }
    get allowFragment(): boolean { return this._allowFragment; }

    constructor(name?: string) {
        if (CJU.notNilOrEmpty(name)) {
            this._name = name;
            switch (name) {
                case 'http':
                    this._defaultPort = 80;
                    this._requireHost = true;
                    break;
                case 'https':
                    this._defaultPort = 443;
                    this._requireHost = true;
                case 'file':
                    this._allowFragment = this._allowQuery = this._allowPort = this._allowUsername = this._allowPassword = false;
                    break;
            }
        } else {
            this._name = '';
            this._separator = '';
            this._allowHost = this._allowPort = this._allowUsername = this._allowPassword = false;
        }
    }
}

export class UriBuilderOld implements URL {
    private _properties: IUrlProperties;
    private _segments: PathNameCollection;
    private _searchParams?: UrlQuery;

    get isAbsoluteUri(): boolean { return this._properties.isAbsoluteUri; }

    get isRooted(): boolean { return this._segments.isRooted; }

    get protocol(): string {
        return (this._properties.schemeDefinition.name.length == 0) ? '' : this._properties.schemeDefinition.name + this._properties.schemeDefinition.separator.substr(0, 1);
    }
    set protocol(value: string) {
        let oldSchema: KnownSchemeDefinition = this._properties.schemeDefinition;
        if (CJU.notNilOrEmpty(value)) {
            if (value == this._properties.schemeDefinition.name)
                return;
            this._properties.schemeDefinition = new KnownSchemeDefinition(value);
            this._properties.isAbsoluteUri = true;
            if (!this._properties.pathName.startsWith('/'))
                this._properties.pathName = '/' + this._properties.pathName;
        } else {
            if (this._properties.schemeDefinition.name.length == 0)
                return;
            this._properties.isAbsoluteUri = false;
            this._properties.schemeDefinition = new KnownSchemeDefinition();
        }

        this._properties.isDirty = true;
    }

    get username(): string | undefined { return (CJU.notNil(this._properties.userName) || CJU.notString(this._properties.password)) ? this._properties.userName : ''; }
    set username(value: string | undefined) { this._properties.userName = value; }

    get password(): string | undefined { return this._properties.password; }
    set password(value: string | undefined) { this._properties.password = value; }

    get host(): string {
        let h: string = this.hostname;
        return (CJU.notNilOrEmpty(h)) ? ((CJU.notNilOrEmpty(this._properties.port)) ? h + ':' + this._properties.port : h) : '';
    }
    set host(value: string) {
        if (CJU.notNilOrEmpty(value)) {
            let index: number = value.lastIndexOf(':');
            if (index < 0) {
                this.hostname = value;
                this.port = undefined;
            } else {
                this.hostname = value.substr(0, index);
                this.port = value.substr(index + 1);
            }
        } else
            this.hostname = this.port = undefined;
    }

    get hostname(): string {
        return (CJU.notNil(this._properties.hostName) || (this._properties.schemeDefinition.name.length == 0 && CJU.notString(this._properties.userName) &&
            CJU.notString(this._properties.password) && CJU.notNilOrEmpty(this._properties.port)) ? this._properties.hostName :
            "tempuri.org");
    }
    set hostname(value: string) {
        if (CJU.notNil(value)) {
            if (this._properties.hostName === value)
                return;
            this._properties.hostName = value;
        } else {
            if (CJU.notString(this._properties.hostName))
                return;
            this._properties.hostName = undefined;
        }
        this._properties.isDirty = true;
    }

    get port(): string { return this._properties.port; }
    set port(value: string) {
        if (CJU.notNil(value)) {
            if (this._properties.port === value)
                return;
            this._properties.port = value;
        } else {
            if (CJU.notString(this._properties.port))
                return;
            this._properties.port = undefined;
        }
        this._properties.isDirty = true;
    }

    get href(): string {
        throw new Error("Method not implemented.");
    }
    set href(value: string) {
        throw new Error("Method not implemented.");
    }

    get origin(): string {
        throw new Error("Method not implemented.");
    }
    set origin(value: string) {
        throw new Error("Method not implemented.");
    }

    get pathname(): string { return this._segments.toString(); }
    set pathname(value: string) { this._segments.reset(value); }

    get pathSegments(): PathNameCollection { return this._segments; }
    set pathSegments(value: PathNameCollection) { this._segments.reset(value); }

    get search(): string { return this._searchParams.toString(); }
    set search(value: string) { this._searchParams.reset(value); }

    get searchParams(): URLSearchParams { return this._searchParams; }
    set searchParams(value: URLSearchParams) { this._searchParams.reset(value); }

    get hash(): string { return (CJU.notNilOrEmpty(this._properties.fragment)) ? '#' + this._properties.fragment : ''; }
    set hash(value: string) {
        if (CJU.notNilOrEmpty(value)) {
            if (value.startsWith('#'))
                value = value.substr(1);
            if (value === this._properties.fragment)
                return;
            this._properties.fragment = value;
            this._properties.isDirty = true;
        }
    }

    toJSON(): string {
        throw new Error("Method not implemented.");
    }

    constructor(uri?: string | URL) {
        this._properties = { pathName: '', pathSegments: [], queryParams: [], isAbsoluteUri: false, isDirty: false, schemeDefinition: new KnownSchemeDefinition() };
        let p: string;
        let q: string;
        this._segments = new PathNameCollection(p, this._properties);
        this._searchParams = new UrlQuery(p, this._properties);
    }
}