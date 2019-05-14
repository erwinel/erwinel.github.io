/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
declare namespace fieldEdit {
    interface IFieldInputParentScope<TParent extends app.IMainControllerScope> extends app.INestedControllerScope<TParent> {
        inputFieldValueChanged(name: string, value: any | undefined): void;
        getInputFieldValue(name: string): any | undefined;
    }
    interface IFieldInputScope<TParent extends app.IMainControllerScope> extends IFieldInputParentScope<TParent>, app.INestedControllerScope<TParent> {
        name: string;
        label: string;
        text: string;
        value: any;
        isRequired: boolean;
        isValid: boolean;
        $parent: TParent;
        validationMessage: string;
        cssClassNames: string[];
    }
    enum cssValidationClass {
        isValid = "is-valid",
        isInvalid = "is-invalid"
    }
    abstract class fieldEditController<TParentScope extends app.IMainControllerScope, TScope extends IFieldInputScope<TParentScope>> extends app.MainControllerChild<TScope> {
        private _name;
        private _text;
        private _value?;
        private _isRequired;
        private _validationMessage;
        readonly name: string;
        text: string;
        readonly isValid: boolean;
        validationMessage: string;
        constructor($scope: TScope, name: string, label?: string, isRequired?: boolean);
        $doCheck(): void;
        private onValidationChange;
        protected coerceValue(value: any | null | undefined): any | null | undefined;
        protected convertToString(value: any | null | undefined): string;
        protected convertToValue(text: string, currentValue: any | null | undefined): any | null | undefined;
        /**
         * Re-validates the {@link IFieldInputScope#text} if any changes are detected.
         *
         * @returns {boolean} true if the {@link IFieldInputScope#text} is valid; otherwise, false.
         */
        validate(): boolean;
        protected updateValidationMessage(): void;
    }
    interface IUrlFieldInputScope<TParent extends app.IMainControllerScope> extends IFieldInputScope<TParent> {
        url?: URL;
    }
    abstract class urlFieldEditController<TParentScope extends app.IMainControllerScope, TScope extends IUrlFieldInputScope<TParentScope>> extends fieldEditController<TParentScope, TScope> {
        constructor($scope: TScope, name: string, label?: string);
        protected updateValidationMessage(): void;
    }
}
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
    interface ISetupParameterDefinitionScope extends fieldEdit.IFieldInputParentScope<IMainControllerScope> {
        serviceNowUrl: string;
        gitRepositoryBaseUrl: string;
        editDialogVisible: boolean;
        showEditDialog(): void;
        hideEditDialog(): void;
    }
    interface IDialogScope extends INestedControllerScope<IMainControllerScope> {
        isVisible: boolean;
        title: string;
        message: string;
        bodyClass: string;
        show(message: string, type?: DialogMessageType, title?: string): any;
        close(): any;
    }
    type DialogMessageType = 'info' | 'warning' | 'danger' | 'primary' | 'success';
    interface INestedControllerScope<TParent extends IMainControllerScope> extends IMainControllerScope {
        $parent: TParent;
    }
    interface IMainControllerScope extends ng.IScope {
        setupParameterDefinitions: ISetupParameterDefinitionScope;
        popupDialog: IDialogScope;
        pageNavigation: PageNavigationScope;
    }
    abstract class MainControllerChild<TScope extends INestedControllerScope<IMainControllerScope>> implements ng.IController {
        protected $scope: TScope;
        $doCheck(): void;
        constructor($scope: TScope);
        showSetupParametersEditDialog(): void;
        hideSetupParametersEditDialog(): void;
        showDialog(message: string, type?: DialogMessageType, title?: string): void;
        closeDialog(): void;
        setupParameterValueChanged(name: string, value: any | undefined): void;
        getSetupParameterValue(name: string): any | undefined;
    }
}
