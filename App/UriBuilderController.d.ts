/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="MainModule.d.ts" />
declare namespace uriBuilder {
    class UriBuilder implements URL {
        static readonly UrlPattern: RegExp;
        private _href;
        constructor(uri?: string);
        href: string;
        origin: string;
        protocol: string;
        username: string;
        password: string;
        host: string;
        hostname: string;
        pathname: string;
        port: string;
        search: string;
        searchParams: URLSearchParams;
        hash: string;
        toJSON(): string;
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
        queryParams: {
            name: string;
            value: string | null;
        }[];
        fragment?: string;
        isDirty: boolean;
    }
    class UrlQuery implements URLSearchParams {
        private _properties;
        readonly length: number;
        constructor(searchParams: URLSearchParams);
        constructor(queryString?: string, properties?: IUrlProperties);
        append(name: string, value: string | null): void;
        delete(name: string): void;
        forEach(callbackfn: (value: string | null, key: string, parent: URLSearchParams) => void, thisArg?: any): void;
        get(name: string): string | null | undefined;
        getAll(name: string): (string | null)[];
        has(name: string): boolean;
        reset(searchParams: string | URLSearchParams): void;
        set(name: string, value: string | null): void;
        sort(): void;
        private updateQueryString;
        toString(): string;
        toJSON(): {
            name: string;
            value?: string;
        }[];
        keys(): IterableIterator<string>;
        values(): IterableIterator<string | null>;
        entries(): IterableIterator<[string, string | null]>;
        [Symbol.iterator](): IterableIterator<[string, string | null]>;
    }
    class PathNameCollection implements Iterable<string> {
        static readonly PathSeperatorPattern: RegExp;
        private _properties;
        readonly length: number;
        hasTrailingSeparator: boolean;
        isRooted: boolean;
        leaf: string;
        parentPath: string | undefined;
        constructor(pathNames: Iterable<string>);
        constructor(pathName?: string, properties?: IUrlProperties);
        forEach(callbackfn: (value: string, index: number, array: string[]) => void, thisArg?: any): void;
        get(index: number): string;
        indexOf(searchElement: string, fromIndex?: number): number;
        lastIndexOf(searchElement: string, fromIndex?: number): number;
        map<U>(callbackfn: (value: string, index: number, array: string[]) => U, thisArg?: any): U[];
        pop(): string;
        push(...items: string[]): number;
        reset(value: string | Iterable<string>): any;
        set(index: number, name: string): void;
        shift(): string;
        unshift(...items: string[]): number;
        toString(): string;
        updatePathName(segments: string[]): void;
        private toArray;
        toJSON(): string[];
        [Symbol.iterator](): Iterator<string>;
    }
    class KnownSchemeDefinition {
        private _name;
        private _separator;
        private _allowUsername;
        private _requireUsername;
        private _allowPassword;
        private _allowHost;
        private _requireHost;
        private _allowPort;
        private _defaultPort;
        private _allowQuery;
        private _allowFragment;
        readonly name: string;
        readonly separator: string;
        readonly allowUsername: boolean;
        readonly requireUsername: boolean;
        readonly allowPassword: boolean;
        readonly allowHost: boolean;
        readonly requireHost: boolean;
        readonly allowPort: boolean;
        readonly defaultPort: number;
        readonly allowQuery: boolean;
        readonly allowFragment: boolean;
        constructor(name?: string);
    }
    class UriBuilderOld implements URL {
        private _properties;
        private _segments;
        private _searchParams?;
        readonly isAbsoluteUri: boolean;
        readonly isRooted: boolean;
        protocol: string;
        username: string | undefined;
        password: string | undefined;
        host: string;
        hostname: string;
        port: string;
        href: string;
        origin: string;
        pathname: string;
        pathSegments: PathNameCollection;
        search: string;
        searchParams: URLSearchParams;
        hash: string;
        toJSON(): string;
        constructor(uri?: string | URL);
    }
}
