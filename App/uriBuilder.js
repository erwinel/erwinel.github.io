/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="app.ts" />
var uriBuilder;
(function (uriBuilder) {
    class UriBuilderScheme {
        constructor(origin) { this._origin = origin; }
        get name() { throw new Error("Property not implemented."); }
        set name(value) { throw new Error("Property not implemented."); }
        get protocol() { throw new Error("Property not implemented."); }
        set protocol(value) { throw new Error("Property not implemented."); }
        get separator() { throw new Error("Property not implemented."); }
    }
    class UriBuilderUser {
        constructor(origin) { this._origin = origin; }
        get name() { throw new Error("Property not implemented."); }
        set name(value) { throw new Error("Property not implemented."); }
        get password() { throw new Error("Property not implemented."); }
        set password(value) { throw new Error("Property not implemented."); }
    }
    class UriBuilderHost {
        constructor(origin) { this._origin = origin; }
        get hostname() { throw new Error("Property not implemented."); }
        set hostname(value) { throw new Error("Property not implemented."); }
        get port() { throw new Error("Property not implemented."); }
        set port(value) { throw new Error("Property not implemented."); }
        get portNumber() { throw new Error("Property not implemented."); }
        set portNumber(value) { throw new Error("Property not implemented."); }
    }
    class UriBuilderOrigin {
        constructor(href) {
            this._user = undefined;
            this._host = undefined;
            this._href = href;
            this._scheme = new UriBuilderScheme(this);
        }
        get protocol() { throw new Error("Property not implemented."); }
        set protocol(value) { throw new Error("Property not implemented."); }
        get scheme() { throw new Error("Property not implemented."); }
        set scheme(value) { throw new Error("Property not implemented."); }
        get separator() { throw new Error("Property not implemented."); }
        get username() { throw new Error("Property not implemented."); }
        set username(value) { throw new Error("Property not implemented."); }
        get password() { throw new Error("Property not implemented."); }
        set password(value) { throw new Error("Property not implemented."); }
        get host() { throw new Error("Property not implemented."); }
        set host(value) { throw new Error("Property not implemented."); }
        get hostname() { throw new Error("Property not implemented."); }
        set hostname(value) { throw new Error("Property not implemented."); }
        get port() { throw new Error("Property not implemented."); }
        set port(value) { throw new Error("Property not implemented."); }
        get portNumber() { throw new Error("Property not implemented."); }
        set portNumber(value) { throw new Error("Property not implemented."); }
        raiseSchemeChanged() {
            this._href.raiseOrginChanged();
        }
        raiseUserChanged() {
            this._href.raiseOrginChanged();
        }
        raiseHostChanged() {
            this._href.raiseOrginChanged();
        }
    }
    class UriBuilderPath {
        constructor(href) { this._href = href; }
        get pathname() { throw new Error("Property not implemented."); }
        set pathname(value) { throw new Error("Property not implemented."); }
        [Symbol.iterator]() {
            throw new Error("Method not implemented.");
        }
    }
    UriBuilderPath.PathSeperatorPattern = /[\/\\]+/;
    class UriBuilderQuery {
        reset(value) {
            throw new Error("Method not implemented.");
        }
        get search() { throw new Error("Property not implemented."); }
        set search(value) { throw new Error("Property not implemented."); }
        constructor(href) { this._href = href; }
        append(name, value) {
            throw new Error("Method not implemented.");
        }
        delete(name) {
            throw new Error("Method not implemented.");
        }
        get(name) {
            throw new Error("Method not implemented.");
        }
        getAll(name) {
            throw new Error("Method not implemented.");
        }
        has(name) {
            throw new Error("Method not implemented.");
        }
        set(name, value) {
            throw new Error("Method not implemented.");
        }
        sort() {
            throw new Error("Method not implemented.");
        }
        forEach(callbackfn, thisArg) {
            throw new Error("Method not implemented.");
        }
        [Symbol.iterator]() {
            throw new Error("Method not implemented.");
        }
        entries() {
            throw new Error("Method not implemented.");
        }
        keys() {
            throw new Error("Method not implemented.");
        }
        values() {
            throw new Error("Method not implemented.");
        }
    }
    class UriBuilderHref {
        constructor() {
            this._href = '';
            this._origin = undefined;
            this._query = undefined;
            this._fragment = undefined;
            this._path = new UriBuilderPath(this);
        }
        get href() { return this._href; }
        set href(value) {
            if (typeof (value) !== 'string')
                value = '';
        }
        get protocol() { return (typeof (this._origin) === 'undefined') ? '' : this._origin.protocol; }
        set protocol(value) {
            if (typeof (this._origin) === 'undefined') {
                if (app.isNilOrEmpty(value))
                    return;
                this._origin = new UriBuilderOrigin(this);
            }
            this._origin.protocol = value;
        }
        get scheme() {
            if (typeof (this._origin) !== 'undefined')
                return this._origin.scheme;
        }
        set scheme(value) {
            if (typeof (this._origin) === 'undefined') {
                if (typeof (value) !== 'string')
                    return;
                this._origin = new UriBuilderOrigin(this);
            }
            this._origin.scheme = value;
        }
        get separator() { return (typeof (this._origin) !== 'undefined') ? this._origin.separator : ''; }
        get username() {
            if (typeof (this._origin) !== 'undefined')
                return this._origin.username;
        }
        set username(value) {
            if (typeof (this._origin) === 'undefined') {
                if (typeof (value) !== 'string')
                    return;
                this._origin = new UriBuilderOrigin(this);
            }
            this._origin.username = value;
        }
        get password() {
            if (typeof (this._origin) !== 'undefined')
                return this._origin.password;
        }
        set password(value) {
            if (typeof (this._origin) === 'undefined') {
                if (typeof (value) !== 'string')
                    return;
                this._origin = new UriBuilderOrigin(this);
            }
            this._origin.password = value;
        }
        get host() { return (typeof (this._origin) !== 'undefined') ? this._origin.host : ''; }
        set host(value) {
            if (typeof (this._origin) === 'undefined') {
                if (app.isNilOrEmpty(value))
                    return;
                this._origin = new UriBuilderOrigin(this);
            }
            this._origin.host = value;
        }
        get hostname() {
            if (typeof (this._origin) !== 'undefined')
                return this._origin.hostname;
        }
        set hostname(value) {
            if (typeof (this._origin) === 'undefined') {
                if (typeof (value) !== 'string')
                    return;
                this._origin = new UriBuilderOrigin(this);
            }
            this._origin.hostname = value;
        }
        get port() {
            if (typeof (this._origin) !== 'undefined')
                return this._origin.port;
        }
        set port(value) {
            if (typeof (this._origin) === 'undefined') {
                if (typeof (value) !== 'string')
                    return;
                this._origin = new UriBuilderOrigin(this);
            }
            this._origin.port = value;
        }
        get portNumber() { return (typeof (this._origin) !== 'undefined') ? this._origin.portNumber : NaN; }
        set portNumber(value) {
            if (typeof (this._origin) === 'undefined') {
                if (typeof (value) !== 'number' || isNaN(value))
                    return;
                this._origin = new UriBuilderOrigin(this);
            }
            this._origin.portNumber = value;
        }
        get pathname() { return this._path.pathname; }
        set pathname(value) { this._path.pathname = value; }
        get search() { return (typeof (this._query) !== 'undefined') ? this._query.search : ''; }
        set search(value) {
            if (typeof (this._query) === 'undefined') {
                if (app.isNilOrEmpty(value))
                    return;
                this._query = new UriBuilderQuery(this);
            }
            this._query.search = value;
        }
        get searchParams() {
            if (typeof (this._query) === 'undefined')
                this._query = new UriBuilderQuery(this);
            return this._query;
        }
        set searchParams(value) {
            if (app.isNil(value)) {
                if (typeof (this._query) === 'undefined')
                    return;
                this._query = undefined;
                this.raiseHrefChanged();
            }
            else
                this._query.reset(value);
        }
        get fragment() { return this._fragment; }
        set fragment(value) {
            if (typeof (value) === 'string') {
                if (this._fragment === value)
                    return;
                this._fragment = value;
            }
            else {
                if (typeof (this._fragment) !== 'string')
                    return;
                this._fragment = undefined;
            }
            this.raiseHrefChanged();
        }
        get hash() { return (typeof (this._fragment) !== 'undefined') ? '#' + this._fragment : ''; }
        set hash(value) {
            if (app.isNilOrEmpty(value)) {
                if (typeof (this._fragment) === 'undefined')
                    return;
                this._fragment = undefined;
            }
            else {
                if (value.startsWith('#'))
                    value = value.substr(1);
                if (this._fragment === value)
                    return;
                this._fragment = value;
            }
            this.raiseHrefChanged();
        }
        raiseOrginChanged() {
            this.raiseHrefChanged();
        }
        raisePathChanged() {
            this.raiseHrefChanged();
        }
        raiseQueryChanged() {
            this.raiseHrefChanged();
        }
        raiseHrefChanged() {
            throw new Error("Method not implemented.");
        }
    }
    class UriBuilder {
        constructor(uri) {
            this._href = new UriBuilderHref();
        }
        get href() { throw new Error("Property not implemented."); }
        set href(value) { throw new Error("Property not implemented."); }
        get origin() { throw new Error("Property not implemented."); }
        set origin(value) { throw new Error("Property not implemented."); }
        get protocol() { throw new Error("Property not implemented."); }
        set protocol(value) { throw new Error("Property not implemented."); }
        get username() { throw new Error("Property not implemented."); }
        set username(value) { throw new Error("Property not implemented."); }
        get password() { throw new Error("Property not implemented."); }
        set password(value) { throw new Error("Property not implemented."); }
        get host() { throw new Error("Property not implemented."); }
        set host(value) { throw new Error("Property not implemented."); }
        get hostname() { throw new Error("Property not implemented."); }
        set hostname(value) { throw new Error("Property not implemented."); }
        get pathname() { throw new Error("Property not implemented."); }
        set pathname(value) { throw new Error("Property not implemented."); }
        get port() { throw new Error("Property not implemented."); }
        set port(value) { throw new Error("Property not implemented."); }
        get search() { throw new Error("Property not implemented."); }
        set search(value) { throw new Error("Property not implemented."); }
        get searchParams() { throw new Error("Property not implemented."); }
        set searchParams(value) { throw new Error("Property not implemented."); }
        get hash() { throw new Error("Property not implemented."); }
        set hash(value) { throw new Error("Property not implemented."); }
        toJSON() {
            throw new Error("Method not implemented.");
        }
    }
    UriBuilder.UrlPattern = /^(?:([^#?:\/\\@]*)(:(?:[\\\/][\\\/]?)?)(?:([^#?:\/\\@]*):([^#?:\/\\@]*)@)?(?:([^#?:\/\\@]*):(\d+))?)?([^#?]*)?(?:\?([^#]*))?(?:#(.*))?$/;
    uriBuilder.UriBuilder = UriBuilder;
    class UrlQueryParamIterator {
        constructor(queryParams) {
            this._index = 0;
            this._queryParams = queryParams;
        }
        next() {
            if (this._index < this._queryParams.length) {
                let item = this._queryParams[this._index++];
                return { value: [item.name, item.value], done: false };
            }
            return { value: [undefined, undefined], done: true };
        }
        [Symbol.iterator]() { return this; }
    }
    class UrlQueryNameIterator {
        constructor(queryParams) {
            this._index = 0;
            this._queryParams = queryParams;
        }
        next(y) {
            return (this._index < this._queryParams.length) ? { value: this._queryParams[this._index++].name, done: false } :
                { value: undefined, done: true };
        }
        [Symbol.iterator]() { return this; }
    }
    class UrlQueryValueIterator {
        constructor(queryParams) {
            this._index = 0;
            this._queryParams = queryParams;
        }
        next() {
            return (this._index < this._queryParams.length) ? { value: this._queryParams[this._index++].value, done: false } :
                { value: undefined, done: true };
        }
        [Symbol.iterator]() { return this; }
    }
    class UrlQuery {
        constructor(searchParams, properties) {
            if (typeof (searchParams) === 'undefined') {
                if (typeof (properties) === 'undefined')
                    this._properties = { pathName: '', pathSegments: [], queryParams: [], isAbsoluteUri: false, isDirty: false, schemeDefinition: new KnownSchemeDefinition() };
                else {
                    this._properties = properties;
                    this._properties.queryParams = [];
                    this.updateQueryString();
                }
            }
            else {
                this._properties = (typeof (properties) === 'undefined') ? { pathName: '', pathSegments: [], queryParams: [], isAbsoluteUri: false, isDirty: false, schemeDefinition: new KnownSchemeDefinition() } : properties;
                if (typeof (searchParams) === 'string') {
                    if (searchParams.startsWith('?'))
                        searchParams = searchParams.substr(1);
                    if (searchParams.length == 0) {
                        if (this._properties.queryString !== '')
                            this._properties.isDirty = true;
                        this._properties.queryString = '';
                    }
                    else {
                        this._properties.queryParams = searchParams.split('&').map((value) => {
                            let index = value.indexOf('=');
                            if (index < 0)
                                return { name: decodeURIComponent(value), value: null };
                            return { name: decodeURIComponent(value.substr(0, index)), value: decodeURIComponent(value.substr(index + 1)) };
                        });
                        this.updateQueryString();
                    }
                }
                else {
                    this._properties = { pathName: '', pathSegments: [], queryParams: [], isAbsoluteUri: false, isDirty: false, schemeDefinition: new KnownSchemeDefinition() };
                    searchParams.forEach((value, key) => {
                        this._properties.queryParams.push({ name: key, value: app.asDefinedOrNull(value) });
                    }, this);
                    this.updateQueryString();
                }
            }
        }
        get length() { return this._properties.queryParams.length; }
        append(name, value) {
            if (typeof (name) !== 'string')
                throw new Error("Name must be a string value.");
            this._properties.queryParams.push({ name: name, value: app.asDefinedOrNull(value) });
            this.updateQueryString();
        }
        delete(name) {
            if (typeof (name) !== 'string')
                return;
            let length = this._properties.queryParams.length;
            this._properties.queryParams = this._properties.queryParams.filter((value) => value.name === name);
            if (length != this._properties.queryParams.length)
                this.updateQueryString();
        }
        forEach(callbackfn, thisArg) {
            if (typeof (thisArg) === undefined)
                this._properties.queryParams.forEach((item) => callbackfn(item.value, item.name, this));
            else
                this._properties.queryParams.forEach((item) => callbackfn.call(item.value, item.name, thisArg));
        }
        get(name) {
            if (typeof (name) === 'string') {
                for (let i = 0; i < this._properties.queryParams.length; i++) {
                    let item = this._properties.queryParams[i];
                    if (item.name === name)
                        return item.value;
                }
            }
        }
        getAll(name) {
            return this._properties.queryParams.filter((item) => item.name === name).map((item) => item.value);
        }
        has(name) {
            if (typeof (name) === 'string') {
                for (let i = 0; i < this._properties.queryParams.length; i++) {
                    if (this._properties.queryParams[i].name === name)
                        return true;
                }
            }
            return false;
        }
        reset(searchParams) {
            if (typeof (searchParams) === 'string') {
                this._properties.queryParams = searchParams.split('&').map((value) => {
                    let index = value.indexOf('=');
                    if (index < 0)
                        return { name: decodeURIComponent(value), value: null };
                    return { name: decodeURIComponent(value.substr(0, index)), value: decodeURIComponent(value.substr(index + 1)) };
                });
                this.updateQueryString();
            }
            else {
                let arr = [];
                searchParams.forEach(function (value, key) {
                    this.push({ name: key, value: (typeof (value) === 'string') ? value : null });
                }, arr);
                this._properties.queryParams = arr;
                this.updateQueryString();
            }
        }
        set(name, value) {
            if (typeof (name) !== 'string')
                throw new Error("Name must be a string value.");
            for (let i = 0; i < this._properties.queryParams.length; i++) {
                let item = this._properties.queryParams[i];
                if (item.name === name) {
                    item.value = value;
                    this.updateQueryString();
                    return;
                }
            }
            this._properties.queryParams.push({ name: name, value: (typeof (value) === 'string') ? value : null });
            this.updateQueryString();
        }
        sort() {
            this._properties.queryParams = this._properties.queryParams.sort((a, b) => {
                let n = app.compareStrings(a.name, b.name);
                return (n == 0) ? app.compareStrings(a.value, b.value) : n;
            });
        }
        updateQueryString() {
            let queryString = this._properties.queryString;
            if (this._properties.queryParams.length > 0) {
                if (this._properties.queryParams.length == 1 && this._properties.queryParams[0].name.length == 0 && this._properties.queryParams[0].value === null) {
                    this._properties.queryParams = [];
                    this._properties.queryString = '';
                }
                else
                    this._properties.queryString = this._properties.queryParams.map((value) => (typeof (value.value) === 'string') ? encodeURIComponent(value.name) + '=' + encodeURIComponent(value.value) : encodeURIComponent(value.name)).join("&");
            }
            else
                this._properties.queryString = undefined;
            if (queryString !== this._properties.queryString)
                this._properties.isDirty = true;
        }
        toString() { return this._properties.queryString; }
        toJSON() {
            if (typeof (this._properties.queryString) !== 'string')
                return [];
            if (this._properties.queryString.length == 0)
                return [{ name: '' }];
            return this._properties.queryParams.map((item) => (typeof (item.value) === 'string') ?
                { name: item.name, value: item.value } : { name: item.name });
        }
        keys() { return new UrlQueryNameIterator(this._properties.queryParams); }
        values() { return new UrlQueryValueIterator(this._properties.queryParams); }
        entries() { return new UrlQueryParamIterator(this._properties.queryParams); }
        [Symbol.iterator]() { return new UrlQueryParamIterator(this._properties.queryParams); }
    }
    uriBuilder.UrlQuery = UrlQuery;
    class PathNameCollection {
        constructor(pathName, properties) {
            if (typeof (pathName) === 'undefined') {
                if (typeof (properties) === 'undefined')
                    this._properties = { pathName: '', pathSegments: [], queryParams: [], isAbsoluteUri: false, isDirty: false, schemeDefinition: new KnownSchemeDefinition() };
                else {
                    this._properties = properties;
                    this.updatePathName([]);
                }
            }
            else {
                this._properties = (typeof (properties) === 'undefined') ? { pathName: '', pathSegments: [], queryParams: [], isAbsoluteUri: false, isDirty: false, schemeDefinition: new KnownSchemeDefinition() } : properties;
                if (typeof (pathName) === 'string')
                    this.updatePathName(pathName.split(PathNameCollection.PathSeperatorPattern).map((n) => decodeURIComponent(n)));
                else {
                    let nArr = [];
                    let iterator = pathName[Symbol.iterator]();
                    let result = iterator.next();
                    while (!result.done) {
                        nArr.push(result.value);
                        result = iterator.next();
                    }
                    this.updatePathName(nArr);
                }
            }
        }
        get length() {
            return (this._properties.pathName.length == 0) ? 1 : ((this._properties.pathName.endsWith('/')) ? this._properties.pathSegments.length + 1 :
                this._properties.pathSegments.length);
        }
        get hasTrailingSeparator() { return this._properties.pathName.endsWith('/'); }
        set hasTrailingSeparator(value) {
            if (value) {
                if (this._properties.pathName.endsWith('/'))
                    return;
                this._properties.pathName += '/';
            }
            else {
                if (!this._properties.pathName.endsWith('/') || (this._properties.pathName.length == 1 && this._properties.isAbsoluteUri))
                    return;
                this._properties.pathName = this._properties.pathName.substr(this._properties.pathName.length - 1);
            }
            this._properties.isDirty = true;
        }
        get isRooted() { return this._properties.pathName.startsWith('/'); }
        set isRooted(value) {
            if (value) {
                if (this._properties.pathName.startsWith('/'))
                    return;
                this._properties.pathName = '/' + this._properties.pathName;
            }
            else {
                if (!this._properties.pathName.startsWith('/') || (this._properties.pathName.length == 1 && this._properties.isAbsoluteUri))
                    return;
                this._properties.pathName = this._properties.pathName.substr(1);
            }
            this._properties.isDirty = true;
        }
        get leaf() {
            let items = this.toArray();
            return items[items.length - 1];
        }
        set leaf(value) {
            let items = this.toJSON();
            items[items.length - 1] = value;
            this.updatePathName(items);
        }
        get parentPath() {
            let items = this.toJSON();
            items.pop();
            if (items.length == 1)
                return (items[0].length == 0) ? '/' : items[0];
            if (items.length > 1)
                return items.join('/');
        }
        set parentPath(value) {
            let items = this.toJSON();
            if (items.length == 1) {
                if (items[0].length == 1)
                    this.updatePathName(value.split(PathNameCollection.PathSeperatorPattern).map((n) => decodeURIComponent(n)));
                else
                    this.updatePathName(value.split(PathNameCollection.PathSeperatorPattern).map((n) => decodeURIComponent(n)).concat([items[0]]));
            }
            else
                this.updatePathName(value.split(PathNameCollection.PathSeperatorPattern).map((n) => decodeURIComponent(n)).concat([items.pop()]));
        }
        forEach(callbackfn, thisArg) {
            if (typeof (thisArg) === 'undefined')
                this.toArray().forEach(callbackfn);
            else
                this.toArray().forEach(callbackfn, thisArg);
        }
        get(index) { return this.toArray()[index]; }
        indexOf(searchElement, fromIndex) { return this.toArray().indexOf(searchElement, fromIndex); }
        lastIndexOf(searchElement, fromIndex) { return this.toArray().lastIndexOf(searchElement, fromIndex); }
        map(callbackfn, thisArg) {
            if (typeof (thisArg) === 'undefined')
                return this.toArray().map(callbackfn);
            return this.toArray().map(callbackfn, thisArg);
        }
        pop() {
            let items = this.toJSON();
            let result = items.pop();
            if (result.length > 0 || items.length > 1) {
                this.updatePathName(items);
                return result;
            }
        }
        push(...items) {
            let arr = this.toJSON();
            items.forEach((s) => arr.push((typeof (s) === 'string') ? s : ''));
            this.updatePathName(arr);
            return this.length;
        }
        reset(value) {
            if (typeof (value) === 'string')
                this.updatePathName(value.split(PathNameCollection.PathSeperatorPattern).map((n) => decodeURIComponent(n)));
            else if (typeof (value) === 'object') {
                let iterator = value[Symbol.iterator]();
                let result = iterator.next();
                let items = [];
                while (!result.done) {
                    items.push(result.value);
                    result = iterator.next();
                }
                this.updatePathName(items);
            }
            else
                this.updatePathName(['']);
        }
        set(index, name) {
            if (index < 0 || index > this.length)
                throw new Error("Index out of range");
            let arr = this.toJSON();
            if (arr.length > 1 && arr[0].length == 0)
                index++;
            if (index < arr.length)
                arr[index] = (typeof (name) !== 'string') ? '' : name;
            else
                arr.push((typeof (name) !== 'string') ? '' : name);
            this.updatePathName(arr);
        }
        shift() {
            let items = this.toJSON();
            let result = items.shift();
            if (result.length > 0) {
                this.updatePathName(items);
                return result;
            }
            else if (items.length > 1) {
                result = items.shift();
                if (result.length > 0) {
                    items.unshift('');
                    this.updatePathName(items);
                    return result;
                }
                else if (!this._properties.isAbsoluteUri) {
                    this.updatePathName(items);
                    return result;
                }
            }
        }
        unshift(...items) {
            let arr = this.toJSON();
            items.reverse().forEach((n) => arr.unshift((typeof (n) !== 'string') ? '' : n));
            this.updatePathName(items);
            return this.length;
        }
        toString() { return this._properties.pathName; }
        updatePathName(segments) {
            let pathName = this._properties.pathName;
            this._properties.pathSegments = segments.filter((s) => typeof (s) === 'string' && s.length > 0);
            this._properties.pathName = (this._properties.pathSegments.length == 0) ? '' : this._properties.pathSegments.join('/');
            if (this._properties.isAbsoluteUri || (segments.length > 0 && app.isNilOrEmpty(segments[0])))
                this._properties.pathName = '/' + this._properties.pathName;
            if (this._properties.pathSegments.length > 0 && app.isNilOrEmpty(segments[segments.length - 1]))
                this._properties.pathName += '/';
            if (pathName !== this._properties.pathName)
                this._properties.isDirty = true;
        }
        toArray() {
            return (this._properties.pathSegments.length == 0) ? [''] : ((this._properties.pathName.endsWith('/')) ? this._properties.pathSegments.concat(['']) :
                this._properties.pathSegments);
        }
        toJSON() {
            if (this._properties.pathName.length == 0)
                return [''];
            let arr;
            if (this._properties.pathName.startsWith('/')) {
                if (this._properties.pathName.length == 1)
                    return ['', ''];
                arr = [''];
            }
            else
                arr = [];
            return (this._properties.pathName.endsWith('/')) ? arr.concat(this._properties.pathSegments).concat(['']) : arr.concat(this._properties.pathSegments);
        }
        [Symbol.iterator]() { return this.toArray()[Symbol.iterator](); }
    }
    PathNameCollection.PathSeperatorPattern = /[\/\\]+/;
    uriBuilder.PathNameCollection = PathNameCollection;
    class KnownSchemeDefinition {
        constructor(name) {
            this._separator = '://';
            this._allowUsername = true;
            this._requireUsername = false;
            this._allowPassword = true;
            this._allowHost = true;
            this._requireHost = false;
            this._allowPort = true;
            this._defaultPort = NaN;
            this._allowQuery = true;
            this._allowFragment = true;
            if (app.notNilOrEmpty(name)) {
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
            }
            else {
                this._name = '';
                this._separator = '';
                this._allowHost = this._allowPort = this._allowUsername = this._allowPassword = false;
            }
        }
        get name() { return this._name; }
        get separator() { return this._separator; }
        get allowUsername() { return this._allowUsername; }
        get requireUsername() { return this._requireUsername; }
        get allowPassword() { return this._allowPassword; }
        get allowHost() { return this._allowHost; }
        get requireHost() { return this._requireHost; }
        get allowPort() { return this._allowPort; }
        get defaultPort() { return this._defaultPort; }
        get allowQuery() { return this._allowQuery; }
        get allowFragment() { return this._allowFragment; }
    }
    class UriBuilderOld {
        constructor(uri) {
            this._properties = { pathName: '', pathSegments: [], queryParams: [], isAbsoluteUri: false, isDirty: false, schemeDefinition: new KnownSchemeDefinition() };
            let p;
            let q;
            this._segments = new PathNameCollection(p, this._properties);
            this._searchParams = new UrlQuery(p, this._properties);
        }
        get isAbsoluteUri() { return this._properties.isAbsoluteUri; }
        get isRooted() { return this._segments.isRooted; }
        get protocol() {
            return (this._properties.schemeDefinition.name.length == 0) ? '' : this._properties.schemeDefinition.name + this._properties.schemeDefinition.separator.substr(0, 1);
        }
        set protocol(value) {
            let oldSchema = this._properties.schemeDefinition;
            if (app.notNilOrEmpty(value)) {
                if (value == this._properties.schemeDefinition.name)
                    return;
                this._properties.schemeDefinition = new KnownSchemeDefinition(value);
                this._properties.isAbsoluteUri = true;
                if (!this._properties.pathName.startsWith('/'))
                    this._properties.pathName = '/' + this._properties.pathName;
            }
            else {
                if (this._properties.schemeDefinition.name.length == 0)
                    return;
                this._properties.isAbsoluteUri = false;
                this._properties.schemeDefinition = new KnownSchemeDefinition();
            }
            this._properties.isDirty = true;
        }
        get username() { return (app.notNil(this._properties.userName) || app.notString(this._properties.password)) ? this._properties.userName : ''; }
        set username(value) { this._properties.userName = value; }
        get password() { return this._properties.password; }
        set password(value) { this._properties.password = value; }
        get host() {
            let h = this.hostname;
            return (app.notNilOrEmpty(h)) ? ((app.notNilOrEmpty(this._properties.port)) ? h + ':' + this._properties.port : h) : '';
        }
        set host(value) {
            if (app.notNilOrEmpty(value)) {
                let index = value.lastIndexOf(':');
                if (index < 0) {
                    this.hostname = value;
                    this.port = undefined;
                }
                else {
                    this.hostname = value.substr(0, index);
                    this.port = value.substr(index + 1);
                }
            }
            else
                this.hostname = this.port = undefined;
        }
        get hostname() {
            return (app.notNil(this._properties.hostName) || (this._properties.schemeDefinition.name.length == 0 && app.notString(this._properties.userName) &&
                app.notString(this._properties.password) && app.notNilOrEmpty(this._properties.port)) ? this._properties.hostName :
                "tempuri.org");
        }
        set hostname(value) {
            if (app.notNil(value)) {
                if (this._properties.hostName === value)
                    return;
                this._properties.hostName = value;
            }
            else {
                if (app.notString(this._properties.hostName))
                    return;
                this._properties.hostName = undefined;
            }
            this._properties.isDirty = true;
        }
        get port() { return this._properties.port; }
        set port(value) {
            if (app.notNil(value)) {
                if (this._properties.port === value)
                    return;
                this._properties.port = value;
            }
            else {
                if (app.notString(this._properties.port))
                    return;
                this._properties.port = undefined;
            }
            this._properties.isDirty = true;
        }
        get href() {
            throw new Error("Method not implemented.");
        }
        set href(value) {
            throw new Error("Method not implemented.");
        }
        get origin() {
            throw new Error("Method not implemented.");
        }
        set origin(value) {
            throw new Error("Method not implemented.");
        }
        get pathname() { return this._segments.toString(); }
        set pathname(value) { this._segments.reset(value); }
        get pathSegments() { return this._segments; }
        set pathSegments(value) { this._segments.reset(value); }
        get search() { return this._searchParams.toString(); }
        set search(value) { this._searchParams.reset(value); }
        get searchParams() { return this._searchParams; }
        set searchParams(value) { this._searchParams.reset(value); }
        get hash() { return (app.notNilOrEmpty(this._properties.fragment)) ? '#' + this._properties.fragment : ''; }
        set hash(value) {
            if (app.notNilOrEmpty(value)) {
                if (value.startsWith('#'))
                    value = value.substr(1);
                if (value === this._properties.fragment)
                    return;
                this._properties.fragment = value;
                this._properties.isDirty = true;
            }
        }
        toJSON() {
            throw new Error("Method not implemented.");
        }
    }
    uriBuilder.UriBuilderOld = UriBuilderOld;
})(uriBuilder || (uriBuilder = {}));
