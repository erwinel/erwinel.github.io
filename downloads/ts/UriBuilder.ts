class UrlQuery implements URLSearchParams {
    toString(): string {
        throw new Error("Method not implemented.");
    }
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
    reset(value: string|URLSearchParams) {
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
}
class UriPath {
    private _pathNodes: string[];
    private _requireRooted?: boolean|{ requireRooted(): boolean };

    get isRooted(): boolean { return this._pathNodes.length > 1 && this._pathNodes[0].length == 0; }
    set isRooted(value: boolean) {
        if (value) {
            if (this._pathNodes[0].length > 0)
                this._pathNodes.unshift("");
        } else {
            if (this._pathNodes.length > 1 && this._pathNodes[0].length == 0 && !this.requireRooted)
                this._pathNodes.shift();
        }
    }
    get requireRooted(): boolean { return (typeof(this._requireRooted) === 'boolean') ? this._requireRooted : (typeof(this._requireRooted) === 'object' && this._requireRooted.requireRooted()); }
    get hasTrailingSeparator(): boolean { return this._pathNodes.length > 1 && this._pathNodes[this._pathNodes.length - 1].length == 0; }
    set hasTrailingSeparator(value: boolean) {
        if (value) {
            if (this._pathNodes[this._pathNodes.length - 1].length > 0)
                this._pathNodes.push("");
        } else {
            if (this._pathNodes.length > 1 && this._pathNodes[this._pathNodes.length - 1].length == 0) {
                this._pathNodes.pop();
                if (!this.isRooted && this.requireRooted)
                    this._pathNodes.unshift("");
            }
        }
    }
    get length(): number { return this._pathNodes.length; }
    get leaf(): string { return this._pathNodes[this._pathNodes.length - 1]; }
    set leaf(value: string) {
        if (typeof(value) !== 'string')
            throw new Error("Leaf must be a string");
        this._pathNodes[this._pathNodes.length - 1] = value; 
    }
    get container(): string|undefined {
        if (this._pathNodes.length > 1)
            return this._pathNodes.slice(0, this._pathNodes.length - 1).map(function (s) { return encodeURIComponent(s); }).join("/");
    }
    set container(value: string|undefined) {
        if (typeof(value) === 'undefined' || value === null) {
            if (this._pathNodes.length > 1)
                this._pathNodes = [this._pathNodes[this._pathNodes.length - 1]];
        } else {
            if (typeof(value) !== 'string')
                throw new Error("Container must be a string");
            let leaf: string = this._pathNodes[this._pathNodes.length - 1];
            this._pathNodes = value.split(UriPath.PathSeperatorPattern).map(function(s) {
                return decodeURIComponent(s);
            });
            this._pathNodes.push(leaf);
        }
        if (!this.isRooted && this.requireRooted)
            this._pathNodes.unshift("");
    }

    static readonly PathSeperatorPattern: RegExp = /[\/\\]/;

    constructor(items?:string[]|string, requireRooted?: boolean|{ requireRooted(): boolean }) {
        this._requireRooted = requireRooted;
        if (typeof(items) !== 'undefined' && items !== null)
        {
            if (typeof(items) == "string")
            {
                if (items.length > 0) {
                    this._pathNodes = items.split(UriPath.PathSeperatorPattern).map(function(s) {
                        return decodeURIComponent(s);
                    });
                    if (!this.isRooted && this.requireRooted)
                        this._pathNodes.unshift("");
                    return;
                }
            }
            if (Array.isArray(items) && items.length > 0) {
                let arr: string[] = [];
                items.forEach(function(s) {
                    if (s.length == 0)
                        this.push("");
                    else
                        s.split(UriPath.PathSeperatorPattern).forEach(function(s) {
                            this.push(decodeURIComponent(s));
                        }, this);
                }, arr);
                this._pathNodes = arr;
                if (!this.isRooted && this.requireRooted)
                    this._pathNodes.unshift("");
                return;
            }
        }
        this._pathNodes = [""];
        if (!this.isRooted && this.requireRooted)
            this._pathNodes.unshift("");
    }

    every(callbackfn: (value: string, index: number, array: readonly string[]) => unknown, thisArg?: any): boolean {
        throw new Error("Method not implemented.");
    }
    filter<S extends string>(callbackfn: (value: string, index: number, array: readonly string[]) => value is S, thisArg?: any): S[];
    filter(callbackfn: (value: string, index: number, array: readonly string[]) => unknown, thisArg?: any): string[];
    filter(callbackfn: any, thisArg?: any): string[] {
        throw new Error("Method not implemented.");
    }
    find<S extends string>(predicate: (this: void, value: string, index: number, obj: readonly string[]) => value is S, thisArg?: any): S;
    find(predicate: (value: string, index: number, obj: readonly string[]) => boolean, thisArg?: any): string;
    find(predicate: any, thisArg?: any): string {
        throw new Error("Method not implemented.");
    }
    findIndex(predicate: (value: string, index: number, obj: readonly string[]) => boolean, thisArg?: any): number {
        throw new Error("Method not implemented.");
    }
    forEach(callbackfn: (value: string, index: number, array: readonly string[]) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }
    get(index: number): string { return this._pathNodes[index]; }
    indexOf(searchElement: string, fromIndex?: number): number { return this._pathNodes.indexOf(searchElement, fromIndex); }
    insert(index: number, ...items: string[]): number {
        throw new Error("Method not implemented.");
    }
    lastIndexOf(searchElement: string, fromIndex?: number): number { return this._pathNodes.lastIndexOf(searchElement, fromIndex); }
    map<U>(callbackfn: (value: string, index: number, array: readonly string[]) => U, thisArg?: any): U[] { return this._pathNodes.map(callbackfn, thisArg); }
    pop(): string {
        let result: string = (this._pathNodes.length > 1) ? this._pathNodes.pop() : [].pop();
        if (!this.isRooted && this.requireRooted)
            this._pathNodes.unshift("");
        return result;
    }
    push(...items: string[]): number {
        if (typeof(items) === 'string')
            return this._pathNodes.push(items);
        let thisObj: { [key: string]: any } = { result: 0, builder: this };
        items.forEach(function(s) { this.result += this.builder._pathNodes.push(s); }, thisObj);
        return thisObj.result;
    }
    reduce(callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: readonly string[]) => string): string;
    reduce(callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: readonly string[]) => string, initialValue: string): string;
    reduce<U>(callbackfn: (previousValue: U, currentValue: string, currentIndex: number, array: readonly string[]) => U, initialValue: U): U;
    reduce(callbackfn: any, initialValue?: any): any {
        throw new Error("Method not implemented.");
    }
    reduceRight(callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: readonly string[]) => string): string;
    reduceRight(callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: readonly string[]) => string, initialValue: string): string;
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: string, currentIndex: number, array: readonly string[]) => U, initialValue: U): U;
    reduceRight(callbackfn: any, initialValue?: any): any {
        throw new Error("Method not implemented.");
    }
    remove(...items: string[]): string[] {
        if (this._pathNodes.length < 2)
            return [];
        if (typeof(items) == 'string') {
            let index: number = this._pathNodes.indexOf(items);
            if (index < 0)
                return [];
            if (index == 0)
                return [ this._pathNodes.shift() ];
            if (index == this._pathNodes.length - 1)
                return [this._pathNodes.pop() ];
            this._pathNodes = this._pathNodes.splice(index, 1);
            if (!this.isRooted && this.requireRooted)
                this._pathNodes.unshift("");
            return items;
        }

        let result: string[] = items.filter(function(s) {
            if (this._pathNodes.length < 2)
                return false;
            let i: number = this._pathNodes.indexOf(items);
            if (i < 0)
                return false;
            if (i == 0)
                this._pathNodes.shift();
            else if (i == this._pathNodes.length - 1)
                this._pathNodes.pop();
            else
                this._pathNodes = this._pathNodes.splice(i, 1);
        });
        if (!this.isRooted && this.requireRooted)
            this._pathNodes.unshift("");
        return result;
    }
    removeAt(index: number) {
        this._pathNodes = this._pathNodes.splice((this._pathNodes.length > 0) ? index : index + 1, 1);
        if (!this.isRooted && this.requireRooted)
            this._pathNodes.unshift("");
    }
    reset(value: string|UriPath) {
        throw new Error("Method not implemented.");
    }
    set(index: number, value: string) {
        if (typeof(value) !== 'string')
            throw new Error("Path node must be a string.");
        this._pathNodes[index] = value;
        if (!this.isRooted && this.requireRooted)
            this._pathNodes.unshift("");
    }
    shift(): string {
        let result: string = (this._pathNodes.length > 1) ? this._pathNodes.shift() : [].shift();
        if (!this.isRooted && this.requireRooted)
            this._pathNodes.unshift("");
        return result;
    }
    some(callbackfn: (value: string, index: number, array: readonly string[]) => unknown, thisArg?: any): boolean {
        throw new Error("Method not implemented.");
    }
    toString(): string { return this._pathNodes.map(function(s) { return encodeURIComponent(s); }).join("/"); }
    unshift(...items: string[]): number {
        if (typeof(items) === 'string') {
            let result: number = this._pathNodes.unshift(items);
            if (!this.isRooted && this.requireRooted)
                this._pathNodes.unshift("");
            return result;
        }
        let thisObj: { [key: string]: any } = { result: 0, builder: this };
        items.reverse().forEach(function(s) { this.result += this.builder._pathNodes.unshift(s); }, thisObj);
        if (!this.isRooted && this.requireRooted)
            this._pathNodes.unshift("");
        return thisObj.result;
    }
}
class UriBuilder implements URL {
    private _protocol?: string;
    private _username?: string;
    private _password?: string;
    private _host?: string;
    private _port: number = NaN;
    private _segments: UriPath;
    private _searchParams?: UrlQuery;
    private _hash?: string;

    get isAbsoluteUri(): boolean { return typeof(this._protocol) === 'string'; }
    get isRooted(): boolean { return this._segments.isRooted; }
    get protocol(): string {
        return ((typeof(this._protocol) !== 'string' || this._protocol.trim().length == 0) && ((typeof(this._host) === 'string' && this._host.trim().length > 0) || 
            typeof(this._username) === 'string' || typeof(this._password) === 'string')) ? "tempuri.org" : this._host;
    }
    set protocol(value: string) {
        throw new Error("Method not implemented.");
    }
    get username(): string { return (typeof(this._username) !== 'string' && typeof(this._password) === 'string') ? "" : this._username; }
    set username(value: string) { this._username = value; }
    get password(): string { return this._password; }
    set password(value: string) { this._password = value; }
    get host(): string {
        return ((typeof(this._host) !== 'string' || this._host.trim().length == 0) && ((typeof(this._protocol) === 'string' && this._protocol.trim().length > 0) || 
            typeof(this._username) === 'string' || typeof(this._password) === 'string')) ? "tempuri.org" : this._host;
    }
    set host(value: string) { this._host = value; }
    get hostname(): string { return this.host; }
    set hostname(value: string) { this.host = value; }
    get port(): string { return (!isNaN(this._port) && Number.isFinite(this._port) && this._port > 0) ? this._port.toString() : "" }
    set port(value: string) { this._port = parseInt(value); }
    get portNumber(): number { return this._port; }
    set portNumber(value: number) { this._port = value; }
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
    get pathSegments(): UriPath { return this._segments; }
    set pathSegments(value: UriPath) { this._segments.reset(value); }
    get search(): string { return this._searchParams.toString(); }
    set search(value: string) { this._searchParams.reset(value); }
    get searchParams(): URLSearchParams { return this._searchParams; }
    set searchParams(value: URLSearchParams) { this._searchParams.reset(value); }
    get hash(): string { return this._hash; }
    set hash(value: string) { this._hash = value; }
    toJSON(): string {
        throw new Error("Method not implemented.");
    }
    constructor(uri?: string|URL) {
    }
}