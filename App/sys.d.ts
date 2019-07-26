declare namespace sys {
    const whitespaceRe: RegExp;
    const isTrueRe: RegExp;
    const isFalseRe: RegExp;
    const trueFalseRe: RegExp;
    /**
     * Determines if a value is null or undefined.
     * @param {*} value Value to test.
     * @returns {boolean} true if value was null or undefined; otherwise, false.
     */
    function isNil(value: any | null | undefined): value is null | undefined;
    function isNilOrEmpty<T>(value: Array<T> | null | undefined): value is ({
        length: 0;
    } & Array<T>) | null | undefined;
    function isNilOrEmpty(value: Array<any> | null | undefined): value is ({
        length: 0;
    } & Array<any>) | null | undefined;
    function isNilOrEmpty(value: string | null | undefined): value is ({
        length: 0;
    } & string) | null | undefined;
    function isNilOrWhiteSpace(value: string | null | undefined): boolean;
    function notNil<T>(obj: T | null | undefined): obj is T;
    function notNil(obj: any | null | undefined): obj is boolean | number | string | object | symbol;
    function notNilOrEmpty<T>(value: Array<T> | null | undefined): value is Array<T>;
    function notNilOrEmpty(value: Array<any> | null | undefined): value is Array<any>;
    function notNilOrEmpty(value: string | null | undefined): value is string;
    function notNilOrWhiteSpace(value: string | null | undefined): value is string;
    function isNumber(value: any | null | undefined): value is number;
    /**
     * Determines if value's type is an object.
     * @param {*} value Value to test.
     * @param {boolean} [noArray=false] If value is an array, return false.
     * @returns {boolean} true if value was null or undefined; otherwise, false.
     */
    function isObject(value: any | null | undefined, noArray?: boolean): value is object;
    /**
     * Determines if a String represents a valid identifier name.
     * @param {string} text String to test.
     * @returns {boolean} true if value was a valid identifier name; otherwise, false.
     */
    function isValidIdentifierName(text: string): boolean;
    function asNotNil<T>(value: T | null | undefined, defaultValue: T): T;
    function asNotNil(value: string | null | undefined, trim?: boolean): string;
    function asNotNil(value: string | null | undefined, defaultValue: string, trim: boolean): string;
    function stringFormat(format: string, ...args: any[]): string;
    /**
     * Ensures that a value is a string, converting it if necessary.
     * @param {*} value Value to assert.
     * @param {string} defaultValue The default value to return if the value is null or undefined.
     * @returns {string} Input value converted to a string.
     */
    function asString(value: any | null | undefined, defaultValue: string): any;
    /**
     * Ensures that a value is a string, converting it if necessary.
     * @param {*} value Value to assert.
     * @param {boolean} trim If true, then the resulting string will be trimmed.
     * @param {string} defaultValue The default value to return if the value is null or undefined.
     * @returns {string} Input value converted to a string.
     */
    function asString(value: any | null | undefined, trim: boolean, defaultValue: string): any;
    /**
     * Ensures that a value is a string, converting it if necessary.
     * @param {*} value Value to assert.
     * @param {boolean} [trim=false] If true, then the resulting string will be trimmed.
     * @param {boolean} [allowNil=false] If true, and the input value is null or undefined, then the input value will be returned; otherwise, a null or undefined input value will cause an empty string to be returned.
     * @returns {string} Input value converted to a string.
     */
    function asString(value: any | null | undefined, trim?: boolean, allowNil?: boolean): any;
    function subStringBefore(source: string, search: RegExp, nilIfNoMatch?: boolean): string;
    function subStringBefore(source: string, search: string, nilIfNoMatch?: boolean, caseSensitive?: boolean): string;
    function subStringAfter(source: string, search: RegExp, nilIfNoMatch?: boolean): string;
    function subStringAfter(source: string, search: string, nilIfNoMatch?: boolean, caseSensitive?: boolean): string;
    function splitAt(source: string, index: number): [string, string] | [string];
    function splitAt(source: string, search: RegExp, includeMatch?: false): [string, string] | [string];
    function splitAt(source: string, search: RegExp, includeMatch: true): [string, string, string] | [string];
    function splitAt(source: string, search: string, caseSensitive?: boolean): [string, string] | [string];
    /**
     * Ensures that a value is a floating-point number, converting it if necessary.
     * @param value
     * @param defaultValue
     * @returns {string} Input value converted to a floating-point number.
     */
    function asFloat(value: any | null | undefined, defaultValue?: number | null | undefined): number;
    /**
     * Ensures that a value is a whole number, converting it if necessary.
     * @param value
     * @param defaultValue
     * @returns {string} Input value converted to a whole number.
     */
    function asInt(value: any | null | undefined, defaultValue?: number | null | undefined): number;
    /**
     * Trims trailing whitespace from text.
     * @param {string} text Text to trim.
     * @returns {string} Text with trailing whitespace removed.
     */
    function trimRight(text: string): string;
    /**
     * Trims leading whitespace from text.
     * @param {string} text Text to trim.
     * @returns {string} Text with leading whitespace removed.
     */
    function trimLeft(text: string): string;
    function asBoolean(value: any | null | undefined, nilIsTrue?: boolean): boolean;
    function notString(value: any | null | undefined): boolean;
    function asNotWhitespaceOrUndefined(value: string | null | undefined, trim?: boolean): string | undefined;
    function asDefinedOrNull<T>(value: T | null | undefined): T | null;
    function asUndefinedIfNull<T>(value: T | null | undefined): T | undefined;
    function asNotEmptyOrNull<T>(value: Array<T> | null | undefined): Array<T> | undefined;
    function asNotEmptyOrNull(value: Array<any> | null | undefined): Array<any> | undefined;
    function asNotEmptyOrNull(value: string | null | undefined, trim?: boolean): string | undefined;
    function asNotWhitespaceOrNull(value: string | null | undefined, trim?: boolean): string | null;
    function asNotEmptyOrUndefined<T>(value: Array<T> | null | undefined): Array<T> | undefined;
    function asNotEmptyOrUndefined(value: Array<any> | null | undefined): Array<any> | undefined;
    function asNotEmptyOrUndefined(value: string | null | undefined, trim?: boolean): string | undefined;
    function isError(value: any | null | undefined): value is Error;
    function compareStrings(a: any | null | undefined, b: any | null | undefined): number;
    function isIterable(value: any | null | undefined): value is {
        [Symbol.iterator](): Function;
    };
    function asIterable<T>(source: T | T[] | Iterable<T> | null | undefined, allowNull?: boolean): Iterable<T>;
    function asArray<T>(source: T | T[] | Iterable<T> | null | undefined, allowNull?: boolean): T[];
    function skipFirst<T>(source: Iterable<T>, callbackfn: {
        (value: T, index: number, iterable: Iterable<T>): boolean;
    }, thisArg?: any): any;
    function skipFirst<T>(source: Iterable<T>, count: number): any;
    function skipLast<T>(source: Iterable<T>, callbackfn: {
        (value: T, index: number, iterable: Iterable<T>): boolean;
    }, thisArg?: any): any;
    function skipLast<T>(source: Iterable<T>, count: number): any;
    function takeFirst<T>(source: Iterable<T>, callbackfn: {
        (value: T, index: number, iterable: Iterable<T>): boolean;
    }, thisArg?: any): any;
    function takeFirst<T>(source: Iterable<T>, count: number): any;
    function takeLast<T>(source: Iterable<T>, callbackfn: {
        (value: T, index: number, iterable: Iterable<T>): boolean;
    }, thisArg?: any): any;
    function takeLast<T>(source: Iterable<T>, count: number): any;
    function filter<T>(source: Iterable<T>, callbackfn: {
        (value: T, index: number, iterable: Iterable<T>): boolean;
    }, thisArg?: any): T[];
    function first<T>(source: Iterable<T>, callbackfn: (value: T, index: number, iterable: Iterable<T>) => boolean, thisArg?: any): T | undefined;
    function indexOf<T>(source: Iterable<T>, callbackfn: (value: T, index: number, iterable: Iterable<T>) => boolean, thisArg?: any): number;
    function last<T>(source: Iterable<T>, callbackfn: (value: T, index: number, iterable: Iterable<T>) => boolean, thisArg?: any): T | undefined;
    function join<T>(source: Iterable<T>, separator?: string): string;
    function reverse<T>(source: Iterable<T>): T[];
    function indexOfAny(value: string, position: number, ...searchString: string[]): any;
    function indexOfAny(value: string, ...searchString: string[]): any;
    function map<TSource, TResult>(source: Iterable<TSource>, callbackfn: (value: TSource, index: number, iterable: Iterable<TSource>) => TResult, thisArg?: any): TResult[];
    function every<T>(source: Iterable<T>, callbackfn: (value: T, index: number, iterable: Iterable<T>) => boolean, thisArg?: any): boolean;
    function some<T>(source: Iterable<T>, callbackfn: (value: T, index: number, iterable: Iterable<T>) => boolean, thisArg?: any): boolean;
    function forEach<T>(source: Iterable<T>, callbackfn: (value: T, index: number, iterable: Iterable<T>) => void, thisArg?: any): void;
    function reduce<TSource, TResult>(source: Iterable<TSource>, callbackfn: (previousValue: TResult, currentValue: TSource, currentIndex: number, iterable: Iterable<TSource>) => TResult, initialValue: TResult): TResult;
    function unique<T>(source: Iterable<T>, callbackfn?: (x: T, y: T) => boolean, thisArg?: any): T[];
    function areSequencesEqual<T>(source: Iterable<T> | null | undefined, target: Iterable<T> | null | undefined): boolean;
    function areSequencesEqual<T>(source: Iterable<T> | null | undefined, target: Iterable<T> | null | undefined, callbackfn: (x: T, y: T, index: number) => boolean, thisArg?: any): boolean;
    function isEventPropagationStoppedFunc(event: ng.IAngularEvent | BaseJQueryEventObject | null | undefined): boolean;
    function preventEventDefault(event: ng.IAngularEvent | BaseJQueryEventObject | null | undefined, stopPropogation?: boolean): void;
    function stopEventPropagation(event: ng.IAngularEvent | BaseJQueryEventObject | null | undefined, preventDefault?: boolean): void;
    function makeDirectoryUrl(url: URL | string): URL | string;
    /**
     * Represents status HTTP response status codes.
     *
     * @enum
     * @description These were derrived from the following authoritative source: {@link https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html}.
     */
    enum HttpResponseStatusCode {
        /**
         * The client SHOULD continue with its request.
         *
         * @member HttpResponseStatusCode
         * @description This interim response is used to inform the client that the initial part of the request has been received and has not yet been rejected by the server. The client SHOULD continue by sending the remainder of the request or, if the request has already been completed, ignore this response.
         */
        continue = 100,
        /**
         * The server understands and is willing to comply with the client's request for a change in the application protocol.
         *
         * @member HttpResponseStatusCode
         * @description The server understands and is willing to comply with the client's request, via the Upgrade Message Header field, for a change in the application protocol being used on this connection. The server will switch protocols to those defined by the response's Upgrade header field immediately after the empty line which terminates the 101 response.
         */
        switchingProtocols = 101,
        /**
         * The request has succeeded.
         *
         * @member HttpResponseStatusCode
         */
        ok = 200,
        /**
         * The request has been fulfilled and resulted in a new resource being created.
         *
         * @member HttpResponseStatusCode
         * @description The newly created resource can be referenced by the URI(s) returned in the entity of the response, with the most specific URI for the resource given by a Location header field. The response SHOULD include an entity containing a list of resource characteristics and location(s) from which the user or user agent can choose the one most appropriate. The entity format is specified by the media type given in the Content-Type header field.
         */
        created = 201,
        /**
         * The request has been accepted for processing, but the processing has not been completed.
         *
         * @member HttpResponseStatusCode
         * @description The request might or might not eventually be acted upon, as it might be disallowed when processing actually takes place. There is no facility for re-sending a status code from an asynchronous operation such as this.
         */
        accepted = 202,
        /**
         * The returned metainformation in the entity-header is not the definitive set as available from the origin server, but is gathered from a local or a third-party copy
         *
         * @member HttpResponseStatusCode
         * @description
         */
        nonAuthoritativeInformation = 203,
        /**
         * The server has fulfilled the request but does not need to return an entity-body, and might want to return updated metainformation.
         *
         * @member HttpResponseStatusCode
         * @description The response MAY include new or updated metainformation in the form of entity-headers, which if present SHOULD be associated with the requested variant.
         */
        noContent = 204,
        /**
         * The server has fulfilled the request and the user agent SHOULD reset the document view which caused the request to be sent.
         *
         * @member HttpResponseStatusCode
         */
        resetContent = 205,
        /**
         * The server has fulfilled the partial GET request for the resource.
         *
         * @member HttpResponseStatusCode
         */
        partialContent = 206,
        /**
         * Multiple resources correspond to the request.
         *
         * @member HttpResponseStatusCode
         * @description  The requested resource corresponds to any one of a set of representations, each with its own specific location, and agent- driven negotiation information (section 12) is being provided so that the user (or user agent) can select a preferred representation and redirect its request to that location.
         */
        multipleChoices = 300,
        /**
         * The requested resource is permanently located at another URI, usually provided in the Location response field.
         *
         * @member HttpResponseStatusCode
         * @description The requested resource has been assigned a new permanent URI and any future references to this resource SHOULD use one of the returned URIs. Clients with link editing capabilities ought to automatically re-link references to the Request-URI to one or more of the new references returned by the server, where possible.
         */
        movedPermanently = 301,
        /**
         * The requested resource is temporarily located at another URI, usually provided in the Location response field.
         *
         * @member HttpResponseStatusCode
         * @description The requested resource resides temporarily under a different URI. Since the redirection might be altered on occasion, the client SHOULD continue to use the Request-URI for future requests. This response is only cacheable if indicated by a Cache-Control or Expires header field.
         */
        found = 302,
        /**
         * The response to the request can be found under a different URI, usually provided in the Location response field.
         *
         * @member HttpResponseStatusCode
         * @description The response to the request can be found under a different URI and SHOULD be retrieved using a GET method on that resource. This method exists primarily to allow the output of a POST-activated script to redirect the user agent to a selected resource. The new URI is not a substitute reference for the originally requested resource.
         */
        seeOther = 303,
        /**
         * The requested resource has not been modified.
         *
         * @member HttpResponseStatusCode
         * @description This response code usually results from a conditional request; otherwise, the server should not send this response.
         */
        notModified = 304,
        /**
         * The requested resource MUST be accessed through the proxy given by the Location field.
         *
         * @member HttpResponseStatusCode
         */
        useProxy = 305,
        /**
         * (unused redirection response code)
         *
         * @member HttpResponseStatusCode
         * @description This status code was used in a previous version of the specification, is no longer used, and the code is reserved.
         */
        unusedRedirection = 306,
        /**
         * The requested resource resides temporarily under a different URI.
         *
         * @member HttpResponseStatusCode
         * @description Since the redirection MAY be altered on occasion, the client SHOULD continue to use the Request-URI for future requests. This response is only cacheable if indicated by a Cache-Control or Expires header field.
         */
        temporaryRedirect = 307,
        /**
         * The request could not be understood by the server due to malformed syntax.
         *
         * @member HttpResponseStatusCode
         */
        badRequest = 400,
        /**
         * The request requires user authentication.
         *
         * @member HttpResponseStatusCode
         * @description The response MUST include a WWW-Authenticate header field (section 14.47) containing a challenge applicable to the requested resource. The client MAY repeat the request with a suitable Authorization header field (section 14.8). If the request already included Authorization credentials, then the 401 response indicates that authorization has been refused for those credentials.
         */
        unauthorized = 401,
        /**
         * This code is reserved for future use.
         *
         * @member HttpResponseStatusCode
         */
        paymentRequired = 402,
        /**
         * The server understood the request, but is refusing to fulfill it.
         *
         * @member HttpResponseStatusCode
         * @description Authorization will not help and the request SHOULD NOT be repeated.
         */
        forbidden = 403,
        /**
         * The server has not found anything matching the Request-URI.
         *
         * @member HttpResponseStatusCode
         */
        notFound = 404,
        /**
         * The method specified in the Request-Line is not allowed for the resource identified by the Request-URI.
         *
         * @member HttpResponseStatusCode
         * @description The response will include an Allow header containing a list of valid methods for the requested resource.
         */
        methodNotAllowed = 405,
        /**
         * The resource identified by the request is only capable of generating response entities which have content characteristics not acceptable according to the accept headers sent in the request.
         *
         * @member HttpResponseStatusCode
         */
        notAcceptable = 406,
        /**
         * This code is similar to 401 (Unauthorized), but indicates that the client must first authenticate itself with the proxy.
         *
         * @member HttpResponseStatusCode
         * @description The proxy will return a Proxy-Authenticate header field containing a challenge applicable to the proxy for the requested resource. The client MAY repeat the request with a suitable Proxy-Authorization header field.
         */
        proxyAuthenticationRequired = 407,
        /**
         * The client did not produce a request within the time that the server was prepared to wait.
         *
         * @member HttpResponseStatusCode
         */
        requestTimeout = 408,
        /**
         * The request could not be completed due to a conflict with the current state of the resource.
         *
         * @member HttpResponseStatusCode
         */
        conflict = 409,
        /**
         * The requested resource is no longer available at the server and no forwarding address is known.
         *
         * @member HttpResponseStatusCode
         */
        gone = 410,
        /**
         * The server refuses to accept the request without a defined Content-Length.
         *
         * @member HttpResponseStatusCode
         */
        lengthRequired = 411,
        /**
         * The precondition given in one or more of the request-header fields evaluated to false when it was tested on the server.
         *
         * @member HttpResponseStatusCode
         */
        preconditionFailed = 412,
        /**
         * The server is refusing to process a request because the request entity is larger than the server is willing or able to process.
         *
         * @member HttpResponseStatusCode
         * @description The server MAY close the connection to prevent the client from continuing the request.
         */
        requestEntityTooLarge = 413,
        /**
         * The server is refusing to service the request because the Request-URI is longer than the server is willing to interpret.
         *
         * @member HttpResponseStatusCode
         */
        requestUriTooLong = 414,
        /**
         * The server is refusing to service the request because the entity of the request is in a format not supported by the requested resource for the requested method.
         *
         * @member HttpResponseStatusCode
         */
        unsupportedMediaType = 415,
        /**
         * Range specified in request not viable.
         *
         * @member HttpResponseStatusCode
         * @description Request included a Range request-header field, and none of the range-specifier values in this field overlap the current extent of the selected resource, and the request did not include an If-Range request-header field.
         */
        requestedRangeNotSatisfiable = 416,
        /**
         * The expectation given in an Expect request-header field could not be met.
         *
         * @member HttpResponseStatusCode
         * @description The expectation given in an Expect request-header field could not be met by this server, or, if the server is a proxy, the server has unambiguous evidence that the request could not be met by the next-hop server.
         */
        expectationFailed = 417,
        /**
         * The server encountered an unexpected condition which prevented it from fulfilling the request.
         *
         * @member HttpResponseStatusCode
         */
        internalServerError = 500,
        /**
         * The server does not support the functionality required to fulfill the request.
         *
         * @member HttpResponseStatusCode
         */
        notImplemented = 501,
        /**
         * The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request.
         *
         * @member HttpResponseStatusCode
         */
        badGateway = 502,
        /**
         * The server is currently unable to handle the request due to a temporary overloading or maintenance of the server.
         *
         * @member HttpResponseStatusCode
         */
        serviceUnavailable = 503,
        /**
         * The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.
         *
         * @member HttpResponseStatusCode
         * @description The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server specified by the URI (e.g. HTTP, FTP, LDAP) or some other auxiliary server (e.g. DNS) it needed to access in attempting to complete the request.
         */
        gatewayTimeout = 504,
        /**
         * The server does not support, or refuses to support, the HTTP protocol version that was used in the request message.
         *
         * @member HttpResponseStatusCode
         */
        httpVersionNotSupported = 505
    }
    enum HttpResponseStatusClass {
        informational = 1,
        successful = 2,
        redirect = 3,
        clientError = 4,
        serverError = 5,
        NOT_NUMBER = -1,
        OUT_OF_RANGE = -2
    }
    function toHttpResponseStatusClass(response: number | ng.IHttpPromiseCallbackArg<any> | null | undefined): HttpResponseStatusClass;
    function toHttpResponseStatusCode(response: number | ng.IHttpPromiseCallbackArg<any> | null | undefined): HttpResponseStatusCode | undefined;
    function toHttpResponseStatusMessage(response: number | ng.IHttpPromiseCallbackArg<any> | null | undefined): string;
    /**
     * Indicates whether the response is provisional, consisting only of the Status-Line and optional headers, and is terminated by an empty line.
     *
     * @param {number | ng.IHttpPromiseCallbackArg<any>} response - The response code or response object.
     * @returns {boolean} True if the response is provisional; otherwise, false.
     */
    function isInformationalHttpResponse(response: number | ng.IHttpPromiseCallbackArg<any> | null | undefined): boolean;
    /**
     * Indicates whether the client's request was successfully received, understood, and accepted.
     *
     * @param {number | ng.IHttpPromiseCallbackArg<any>} response - The response code or response object.
     * @returns {boolean} True if the client's request was successful; otherwise, false.
     */
    function isSuccessfulHttpResponse(response: number | ng.IHttpPromiseCallbackArg<any> | null | undefined): boolean;
    /**
     * Indicates whether further action needs to be taken by the user agent in order to fulfill the request.
     *
     * @param {number | ng.IHttpPromiseCallbackArg<any>} response - The response code or response object.
     * @returns {boolean} True if further action needs to be taken by the user agent in order to fulfill the request; otherwise, false.
     */
    function isRedirectionHttpResponse(response: number | ng.IHttpPromiseCallbackArg<any> | null | undefined): boolean;
    /**
     * Indicates whether there was an error in the client request.
     *
     * @param {number | ng.IHttpPromiseCallbackArg<any>} response - The response code or response object.
     * @returns {boolean} True if there was an error in the client request; otherwise, false.
     */
    function isClientErrorHttpResponse(response: number | ng.IHttpPromiseCallbackArg<any> | null | undefined): boolean;
    /**
     * Indicates whether the server encountered an unexpected condition which prevented it from fulfilling the request.
     *
     * @param {number | ng.IHttpPromiseCallbackArg<any>} response - The response code or response object.
     * @returns {boolean} True if the server encountered an unexpected condition which prevented it from fulfilling the request; otherwise, false.
     */
    function isServerErrorHttpResponse(response: number | ng.IHttpPromiseCallbackArg<any> | null | undefined): boolean;
    function logResponse(response: number | ng.IHttpPromiseCallbackArg<any>, logService: ng.ILogService, message: string, force: boolean): void;
    function logResponse(response: number | ng.IHttpPromiseCallbackArg<any>, logService: ng.ILogService, messageOrForce?: string | boolean): void;
    const uriParseRegex_beforeQuery: RegExp;
    const uriParseRegex: RegExp;
    enum uriParseGroup {
        all = 0,
        origin = 1,
        schemeName = 2,
        schemeSeparator = 3,
        userInfo = 4,
        username = 5,
        password = 6,
        hostname = 7,
        portnumber = 8,
        path = 9,
        search = 10,
        queryString = 11,
        hash = 12,
        fragment = 13
    }
    interface IParsedUriString {
        source: string;
        origin?: {
            value: string;
            scheme: {
                name: string;
                separator: string;
            };
            userInfo?: {
                value: string;
                name: string;
                password?: string;
            };
            host: {
                value: string;
                name: string;
                portnumber?: string;
            };
        };
        path: string;
        queryString?: string;
        fragment?: string;
    }
    function parseUriString(source: string): IParsedUriString;
}
