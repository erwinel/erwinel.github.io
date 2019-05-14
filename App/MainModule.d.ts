/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
declare namespace app {
    /**
    * The main module for this app.
    *
    * @type {ng.IModule}
    */
    let MainModule: ng.IModule;
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
    function stringBefore(source: string, search: string): string;
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
    interface IPageNavigationScope<TParent extends IMainControllerScope> extends INestedControllerScope<TParent> {
        pageTitle: string;
        top: IRootNavigationContainerScope<IPageNavigationScope<TParent>>;
        side: IRootNavigationContainerScope<IPageNavigationScope<TParent>>;
    }
    interface IRootNavigationContainerScope<TParent extends IPageNavigationScope<IMainControllerScope>> extends IPageNavigationScope<TParent> {
        currentItemIndex: number;
        items: INavigationItemScope<IRootNavigationContainerScope<TParent>>[];
    }
    interface RootNavigationContainerScope extends IRootNavigationContainerScope<IPageNavigationScope<IMainControllerScope>> {
        items: INavigationItemScope<RootNavigationContainerScope>[];
    }
    interface PageNavigationScope extends IPageNavigationScope<IMainControllerScope> {
        top: RootNavigationContainerScope;
        side: RootNavigationContainerScope;
    }
    interface INavigationItemScope<TParent extends RootNavigationContainerScope> extends IRootNavigationContainerScope<TParent> {
        linkTitle: string;
        pageTitle: string;
        href: string;
        class: string[];
        isCurrent: boolean;
        onClick(): void;
    }
    interface INestedControllerScope<TParent extends IMainControllerScope> extends IMainControllerScope {
        $parent: TParent;
    }
    interface IMainControllerScope extends ng.IScope {
        serviceNowUrl: string;
        gitRepositoryBaseUrl: string;
        pageNavigation: PageNavigationScope;
        showSetupParametersEditDialog(): void;
    }
    abstract class MainControllerChild<TScope extends INestedControllerScope<IMainControllerScope>> implements ng.IController {
        protected $scope: TScope;
        $doCheck(): void;
        constructor($scope: TScope);
        showSetupParametersEditDialog(): void;
        hideSetupParametersEditDialog(): void;
        showModalDialogMessage(message: string, type?: DialogMessageType, title?: string): void;
        hideModalDialogMessage(): void;
    }
    type DialogMessageType = 'info' | 'warning' | 'danger' | 'primary' | 'success';
    interface IDialogScope extends INestedControllerScope<IMainControllerScope> {
        isVisible: boolean;
        title: string;
        message: string;
        bodyClass: string;
        show(message: string, type?: DialogMessageType, title?: string): any;
        close(): any;
    }
    const BroadcastEvent_OpenMainModalPopupDialog: string;
    const BroadcastEvent_CloseMainModalPopupDialog: string;
    class mainModalPopupDialogController extends MainControllerChild<IDialogScope> {
        static show($scope: ng.IScope, message: string, type?: DialogMessageType, title?: string): void;
        static hide($scope: ng.IScope): void;
        constructor($scope: IDialogScope, $rootScope: ng.IScope);
    }
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
        path = 9
    }
    enum cssValidationClass {
        isValid = "is-valid",
        isInvalid = "is-invalid"
    }
    enum cssFeedbackClass {
        isValid = "is-valid",
        isInvalid = "is-invalid"
    }
    interface ISetupParameterDefinitions {
        serviceNowUrl: string;
        gitRepositoryBaseUrl: string;
    }
    interface ISetupParameterFieldState extends INestedControllerScope<ISetupParameterDefinitionScope> {
        original: string;
        text: string;
        isValid: boolean;
        lastValidated: string;
        validationMessage: string;
        validationClass: string[];
        messageClass: string[];
    }
    interface ISetupParameterDefinitionScope extends ISetupParameterDefinitions, INestedControllerScope<IMainControllerScope> {
        cancel(): void;
        accept(): void;
        close(): void;
        serviceNowUrlField: ISetupParameterFieldState;
        gitRepositoryBaseUrlField: ISetupParameterFieldState;
    }
    const BroadcastEvent_SetupParametersChanged: string;
    const BroadcastEvent_ShowSetupParametersDialog: string;
    const BroadcastEvent_HideSetupParametersDialog: string;
    class setupParameterDefinitionsController extends MainControllerChild<ISetupParameterDefinitionScope> {
        constructor($scope: ISetupParameterDefinitionScope, $rootScope: ng.IScope);
        private static _settings;
        static getSettings(): ISetupParameterDefinitions;
        $doCheck(): void;
        static show($scope: ng.IScope): void;
        static hide($scope: ng.IScope): void;
    }
}
