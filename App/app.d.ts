/// <reference path="../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.d.ts" />
declare namespace app {
    /**
    * The main module for this app.
    *
    * @type {ng.IModule}
    */
    export let appModule: ng.IModule;
    /**
     * The relative path of the default page.
     *
     * @type {string}
     * @description - This is for a path string only - This MUST NOT contain relative segment names ("." or ".."), URL query or fragment and MUST NOT start or end with "/".
     */
    export const DEFAULT_PAGE_PATH: string;
    /**
     * The default root absolute URL of the target ServiceNow instance.
     *
     * @type {string}
     * @description - This MUST be an absolute URL and MUST NOT contain an explicit path (cannot end with "/"), URL query or fragment.
     */
    export const DEFAULT_URL_SERVICENOW: string;
    /**
     * The default root absolute URL of the remote GIT repository.
     *
     * @type {string}
     * @description - This MUST be an absolute URL and MUST NOT contain a URL query or fragment. If this contains an explicit path (which is usually the case), the path must end with a "/".
     */
    export const DEFAULT_URL_GIT_REPOSITORY: string;
    export const StorageKey_UrlConfigSettings: string;
    export const StorageKey_SetupParameterSettings: string;
    /**
     *
     *
     * @export
     * @enum {string}
     */
    export enum cssValidationClass {
        /**
         *
         */
        isValid = "is-valid",
        isInvalid = "is-invalid"
    }
    /**
     *
     *
     * @export
     * @enum {string}
     */
    export enum cssFeedbackClass {
        isValid = "valid-feedback",
        isInvalid = "invalid-feedback"
    }
    /**
     *
     *
     * @export
     * @enum {string}
     */
    export enum cssAlertClass {
        alert = "alert",
        danger = "alert-danger",
        dark = "alert-dark",
        dismissible = "alert-dismissible",
        info = "alert-info",
        heading = "alert-heading",
        light = "alert-light",
        link = "alert-link",
        primary = "alert-primary",
        secondary = "alert-secondary",
        success = "alert-success",
        warning = "alert-warning"
    }
    /**
     * Contains service URL definitions.
     *
     * @export
     * @interface IUrlConfigSettings
     */
    export interface IUrlConfigSettings {
        /**
         * The base URL for the target ServiceNow instance.
         *
         * @type {string}
         * @memberof IUrlConfigSettings
         */
        serviceNowUrl: string;
        /**
         * The base URL for the target remote GIT repository.
         *
         * @type {string}
         * @memberof IUrlConfigSettings
         */
        gitRepositoryUrl: string;
    }
    /**
     * Defines a navigation menu item.
     *
     * @interface INavigationDefinition
     */
    interface INavigationDefinition {
        /**
         * Unique identifier of navigation menu item.
         *
         * @type {string}
         * @memberof INavigationDefinition
         */
        id?: string;
        /**
         * Relative target URL of navigation menu item.
         *
         * @type {string}
         * @memberof INavigationDefinition
         */
        url: string;
        /**
         * Display text for navigation menu item.
         *
         * @type {string}
         * @memberof INavigationDefinition
         */
        linkTitle: string;
        /**
         * Page title for navigation menu item.
         *
         * @type {string}
         * @memberof INavigationDefinition
         */
        pageTitle?: string;
        /**
         * Tooltip to use for navigation menu item.
         *
         * @type {string}
         * @memberof INavigationDefinition
         */
        toolTip?: string;
        /**
         * Heading text for child menu items that are displayed in the secondary navigation menu.
         *
         * @type {string}
         * @memberof INavigationDefinition
         */
        sideNavHeading?: string;
        /**
         * Child navigation menu items for the current navigation item, which gets displayed in the secondary navigation menu.
         *
         * @type {INavigationDefinition[]}
         * @memberof INavigationDefinition
         */
        items?: INavigationDefinition[];
    }
    /**
     * Represents a menu navigation item.
     *
     * @export
     * @class NavigationItem
     */
    export class NavigationItem {
        private _appConfigData;
        private _id;
        private _linkTitle;
        private _pageTitle;
        private _toolTip;
        private _sideNavHeading;
        private _url;
        private _isCurrentPage?;
        private _previousNavItem;
        private _nextNavItem;
        private _parentNavItem;
        private _childNavItems;
        /**
         * The unique identifier of the navigation menu item.
         *
         * @readonly
         * @type {string}
         * @memberof NavigationItem
         */
        readonly id: string;
        /**
         * The display text for the current navigation menu item.
         *
         * @readonly
         * @type {string}
         * @memberof NavigationItem
         */
        readonly linkTitle: string;
        /**
         * The title of the page that corresponds to the current navigation menu item.
         *
         * @readonly
         * @type {string}
         * @memberof NavigationItem
         */
        readonly pageTitle: string;
        /**
         * The tooltip for the current navigation menu item.
         *
         * @readonly
         * @type {string}
         * @memberof NavigationItem
         */
        readonly toolTip: string;
        /**
         * The secondary navigation heading text for child navigation menu items.
         *
         * @readonly
         * @type {string}
         * @memberof NavigationItem
         */
        readonly sideNavHeading: string;
        /**
         * The navigation menu hyperlink for the current item.
         *
         * @readonly
         * @type {string}
         * @memberof NavigationItem
         */
        readonly navMenuHref: string;
        /**
         * The relative URL of the current navigation menu item.
         *
         * @readonly
         * @type {string}
         * @memberof NavigationItem
         */
        readonly url: string;
        /**
         * Indicates whether the current navigation menu item represents the current page.
         *
         * @readonly
         * @type {boolean}
         * @memberof NavigationItem
         */
        readonly isCurrentPage: boolean;
        /**
         * Indicates whether the current navigation menu item represents the current page or the parent of the current page.
         *
         * @readonly
         * @type {boolean}
         * @memberof NavigationItem
         */
        readonly hasOrIsCurrentPage: boolean;
        /**
         * Indicates whether the current navigation menu item represents an ancestor of the current page.
         *
         * @readonly
         * @type {boolean}
         * @memberof NavigationItem
         */
        readonly hasCurrentPage: boolean;
        /**
         * The CSS class names to be applied to the anchor tag.
         *
         * @readonly
         * @type {ReadonlyArray<string>}
         * @memberof NavigationItem
         */
        readonly anchorCssClass: ReadonlyArray<string>;
        /**
         * The child navigation menu items to display within the secondary navigation menu.
         *
         * @readonly
         * @type {ReadonlyArray<NavigationItem>}
         * @memberof NavigationItem
         */
        readonly childNavItems: ReadonlyArray<NavigationItem>;
        /**
         * Indicates whether the current navigation menu item has child menu items.
         *
         * @readonly
         * @type {boolean}
         * @memberof NavigationItem
         */
        readonly hasChildNavItem: boolean;
        /**
         * Indicates whether the current navigation menu item has sibling items that share the same parent menu item.
         *
         * @readonly
         * @type {boolean}
         * @memberof NavigationItem
         */
        readonly hasSiblingNavItem: boolean;
        /**
         * Indicates whether the current navigation menu item is a child item of another.
         *
         * @readonly
         * @type {boolean}
         * @memberof NavigationItem
         */
        readonly isNestedNavItem: boolean;
        /**
         * Navigation menu items to be displayed as nested items within the secondary navigation menu.
         *
         * @readonly
         * @type {ReadonlyArray<NavigationItem>}
         * @memberof NavigationItem
         */
        readonly nestedSideNavChildItems: ReadonlyArray<NavigationItem>;
        /**
         * Indicates whether the current navigation menu item represents the current page, is being displayed within the secondary navigation menu, and has child items.
         *
         * @readonly
         * @type {boolean}
         * @memberof NavigationItem
         */
        readonly showNestedSideNavChildItems: boolean;
        /**
         * Gets the parent navigation menu item.
         *
         * @readonly
         * @type {(NavigationItem | undefined)}
         * @memberof NavigationItem
         */
        readonly parentNavItem: NavigationItem | undefined;
        /**
         * Creates an instance of NavigationItem.
         *
         * @param {AppConfigDataService} _appConfigData - The appConfigData service provider.
         * @param {INavigationDefinition} navDef - The navigation menu item definition.
         * @memberof NavigationItem
         */
        constructor(_appConfigData: AppConfigDataService, navDef: INavigationDefinition);
        /**
         * Gets preceding sibling items for the current menu navigation item.
         *
         * @returns {NavigationItem[]}
         * @memberof NavigationItem
         */
        precedingSiblings(): NavigationItem[];
        /**
         * Gets following sibling items for the current menu navigation item.
         *
         * @returns {NavigationItem[]}
         * @memberof NavigationItem
         */
        followingSiblings(): NavigationItem[];
        /**
         * Gets all ancestor navigation menu items.
         *
         * @returns {NavigationItem[]}
         * @memberof NavigationItem
         */
        getAncestorNavItems(): NavigationItem[];
        /**
         * Gets ancestor navigation menu items that do not appear in the primary navigation menu.
         *
         * @returns {NavigationItem[]}
         * @memberof NavigationItem
         */
        getBreadcrumbLinks(): NavigationItem[];
        /**
         * Handles the menu item click event.
         *
         * @param {BaseJQueryEventObject} [event]
         * @memberof NavigationItem
         * @description The purpose of this member is to prevent the default action for the navigation menu item that represents the current page.
         */
        onClick(event?: BaseJQueryEventObject): void;
        /**
         * Creates a navigation menu item objects from navigation menu definition objects.
         *
         * @static
         * @param {AppConfigDataService} appConfigData - The application configuration data service provider.
         * @param {INavigationDefinition[]} [items] - Defines the navigation menu items to be created.
         * @returns {ReadonlyArray<NavigationItem>} - The navigation menu item objects.
         * @memberof NavigationItem
         */
        static createNavItems(appConfigData: AppConfigDataService, items?: INavigationDefinition[]): ReadonlyArray<NavigationItem>;
        /**
         * Finds the navigation menu item that represents the current page.
         *
         * @static
         * @param {ReadonlyArray<NavigationItem>} items - Navigation menu items to recursively search.
         * @returns {(NavigationItem | undefined)} - The navigation menu item that represents the current page or undefined if none are found that represent the current page.
         * @memberof NavigationItem
         */
        static findCurrentItem(items: ReadonlyArray<NavigationItem>): NavigationItem | undefined;
        /**
         * Creates an array of ancestor navigation menu items to be displayed as breadcrumb links.
         *
         * @static
         * @param {NavigationItem} [current] - The navigation menu item that represents the current page.
         * @returns {ReadonlyArray<NavigationItem>}
         * @memberof NavigationItem
         */
        static createSideNavBreadcrumbItems(current?: NavigationItem): ReadonlyArray<NavigationItem>;
        /**
         * Creates an array of sibling navigation menu items.
         *
         * @static
         * @param {NavigationItem} [current] - The navigation menu item that represents the current page.
         * @returns {ReadonlyArray<NavigationItem>}
         * @memberof NavigationItem
         */
        static createSideNavSiblingItems(current?: NavigationItem): ReadonlyArray<NavigationItem>;
    }
    export type DialogMessageType = 'info' | 'warning' | 'danger' | 'primary' | 'success';
    /**
     * Defines a button to be displayed in a modal popup dialog.
     *
     * @export
     * @interface IPopupDialogButtonDefinition
     * @template T The type of value returned when the associated button is clicked.
     */
    export interface IPopupDialogButtonDefinition<T> {
        /**
         * Value to be returned when the associated button is clicked.
         *
         * @type {T}
         * @memberof IPopupDialogButtonDefinition
         */
        value: T;
        /**
         * The text to be displayed for the button.
         *
         * @type {string}
         * @memberof IPopupDialogButtonDefinition
         */
        displayText: string;
    }
    /**
     * Callback for displaying a modal popup dialog.
     *
     * @export
     * @interface ITHisPopupDialogShowCallback
     * @template TTHis - Type of object to use as the "this" object when invoking the callback.
     * @template TResult - The type of result value to be produced by the modal dialog.
     * @param {string} message - The message text for the modal popup.
     * @param {string} [title] - The title for the modal popup.
     * @param {DialogMessageType} [type] - The type (severity) of the modal popup.
     * @param {IPopupDialogButtonDefinition<TResult>[]} [buttons] - The buttons to display for the modal popup, which closes the modal dialog and defines the result value.
     * @param {{ (result?: TResult): void; }} [onClose] - The callback to invoke when the modal popup dialog is closed.
     */
    export interface ITHisPopupDialogShowCallback<TTHis, TResult> {
        (this: TTHis, message: string, title?: string, type?: DialogMessageType, buttons?: IPopupDialogButtonDefinition<TResult>[], onClose?: {
            (result?: TResult): void;
        }): void;
    }
    /**
     * Callback for displaying a modal popup dialog.
     *
     * @export
     * @interface IPopupDialogShowCallback
     * @template T - The type of result value to be produced by the modal dialog.
     * @param {string} message - The message text for the modal popup.
     * @param {string} [title] - The title for the modal popup.
     * @param {DialogMessageType} [type] - The type (severity) of the modal popup.
     * @param {IPopupDialogButtonDefinition<T>[]} [buttons] - The buttons to display for the modal popup, which closes the modal dialog and defines the result value.
     * @param {{ (result?: T): void; }} [onClose] - The callback to invoke when the modal popup dialog is closed.
     * @description - This is used within the {@link AppContentController} when the main modal popup dialog is displayed.
     */
    export interface IPopupDialogShowCallback<T> {
        (message: string, title?: string, type?: DialogMessageType, buttons?: IPopupDialogButtonDefinition<T>[], onClose?: {
            (result?: T): void;
        }): void;
    }
    /**
     * Class which implements the appConfigData service.
     *
     * @export
     * @class AppConfigDataService
     */
    export class AppConfigDataService {
        private _sessionStorage;
        private $log;
        private $window;
        private _currentPageId;
        private _currentPageURL;
        private _promise;
        private _serviceNowUrl;
        private _gitRepositoryUrl;
        private _relativePagePath;
        private _pageTitle;
        private _currentItemClass;
        private _selectedItemClass;
        private _otherItemClass;
        private _topNavItems;
        private _serviceNowUrlChangedCallback;
        private _gitRepositoryUrlChangedCallback;
        private _pageTitleChangedCallback;
        private _showMainModalPopupDialogCallback;
        private _hideMainModalPopupDialogCallback;
        /**
         * Gets the current page ID.
         *
         * @returns {string} The value of the "content" attribute for the html meta tag with the name attribute of "app:pageId".
         * @memberof AppConfigDataService
         */
        currentPageId(): string;
        /**
         * Gets relative path to the current page.
         *
         * @returns {string}
         * @memberof AppConfigDataService
         */
        pagePath(): string;
        /**
         * Gets or sets the title of the current page
         *
         * @param {string} [value] - The optional value to set for the page title.
         * @returns {string} The title of the current apge.
         * @memberof AppConfigDataService
         */
        pageTitle(value?: string): string;
        /**
         * Gets the CSS class names to apply to navigation menu items that are ancestors of the item that represents the current page.
         *
         * @returns {ReadonlyArray<string>}
         * @memberof AppConfigDataService
         */
        currentItemClass(): ReadonlyArray<string>;
        /**
         * Gets the CSS class names to apply to the navigation menu item that represents the current page.
         *
         * @returns {ReadonlyArray<string>}
         * @memberof AppConfigDataService
         */
        selectedItemClass(): ReadonlyArray<string>;
        /**
         * Gets the CSS class names to apply to the navigation menu item that do not represent the current page or any of its ancestors.
         *
         * @returns {ReadonlyArray<string>}
         * @memberof AppConfigDataService
         */
        otherItemClass(): ReadonlyArray<string>;
        /**
         * Gets the navigation menu items that appear in the primary navigation menu.
         *
         * @returns {ReadonlyArray<NavigationItem>}
         * @memberof AppConfigDataService
         */
        topNavItems(): ReadonlyArray<NavigationItem>;
        /**
         * Gets or sets the base URL for the target ServiceNow instance.
         *
         * @param {URL} [value] - Optionally specify new value for base URL of the target ServiceNow instance.
         * @returns {URL}
         * @memberof AppConfigDataService
         * @description Changes in this value cause any callbacks specified through {@link AppConfigDataService#onServiceNowUrlChanged} to be invoked.
         */
        serviceNowUrl(value?: URL): URL;
        /**
         * Gets or sets the base URL for the GIT repository being used by the target ServiceNow instance.
         *
         * @param {URL} [value] - Optionally specify new value for base URL of the GIT repository being used by the target ServiceNow instance.
         * @returns {URL}
         * @memberof AppConfigDataService
         * @description Changes in this value cause any callbacks specified through {@link AppConfigDataService#onGitRepositoryUrlChanged} to be invoked.
         */
        gitRepositoryUrl(value?: URL): URL;
        /**
         *Creates an instance of AppConfigDataService.
         * @param {sessionStorageService} _sessionStorage - The sessionStorage service provider.
         * @param {ng.IHttpService} $http - The $http service provider.
         * @param {ng.ILogService} $log - The $log service provider.
         * @param {ng.IDocumentService} $document - The $document service provider.
         * @param {ng.IWindowService} $window - The $window service provider
         * @memberof AppConfigDataService
         */
        constructor(_sessionStorage: sessionStorageService, $http: ng.IHttpService, $log: ng.ILogService, $document: ng.IDocumentService, $window: ng.IWindowService);
        /**
         * Displays the main application modal dialog box.
         *
         * @template TTHis - The "this" object to use for the onClose callback method.
         * @template TResult - The type of result value produced by the modal dialog.
         * @param {string} message - The message to display in the modal dialog.
         * @param {(string | undefined)} title - The title of the modal dialog.
         * @param {(DialogMessageType | undefined)} type - The message type (severity) of the modal dailog.
         * @param {(IPopupDialogButtonDefinition<TResult>[] | undefined)} buttons - The option buttons to display in the modal dailog.
         * @param {({ (this: TTHis, result?: TResult): void; } | undefined)} onClose - The callback to invoke when the dialog box is closed.
         * @param {TTHis} thisArg - The object to use as the "this" object when onClose is invoked.
         * @memberof AppConfigDataService
         * @description This invokes the callback specified through the {@link AppConfigDataService#onShowMainModalPopupDialog} method by the {@link AppContentController} during its construction.
         */
        showMainModalPopupDialog<TTHis, TResult>(message: string, title: string | undefined, type: DialogMessageType | undefined, buttons: IPopupDialogButtonDefinition<TResult>[] | undefined, onClose: {
            (this: TTHis, result?: TResult): void;
        } | undefined, thisArg: TTHis): void;
        /**
         * Displays the main application modal dialog box
         *
         * @template T - The type of result value produced by the modal dialog.
         * @param {string} message - The message to display in the modal dialog.
         * @param {string} [title] - The title of the modal dialog.
         * @param {DialogMessageType} [type] - The message type (severity) of the modal dailog.
         * @param {IPopupDialogButtonDefinition<T>[]} [buttons] - The option buttons to display in the modal dailog.
         * @param {{ (result?: T): void; }} [onClose] - The callback to invoke when the dialog box is closed.
         * @memberof AppConfigDataService
         * @description This invokes the callback specified through the {@link AppConfigDataService#onShowMainModalPopupDialog} method by the {@link AppContentController} during its construction.
         */
        showMainModalPopupDialog<T>(message: string, title?: string, type?: DialogMessageType, buttons?: IPopupDialogButtonDefinition<T>[], onClose?: {
            (result?: T): void;
        }): void;
        /**
         * Specifies a callback to invoke when the main modal popup dialog is to be displayed.
         *
         * @param {ITHisPopupDialogShowCallback<TTHis, TResult>} callback - The callback to invoke when the main modal popup dialog is to be displayed.
         * @param {TTHis} thisArg - The object to use as the "this" object when the callback is invoked.
         * @memberof AppConfigDataService
         */
        onShowMainModalPopupDialog<TTHis, TResult>(callback: ITHisPopupDialogShowCallback<TTHis, TResult>, thisArg: TTHis): void;
        /**
         * Specifies a callback to invoke when the main modal popup dialog is to be displayed.
         *
         * @param {IPopupDialogShowCallback<T>} callback - The callback to invoke when the main modal popup dialog is to be displayed.
         * @memberof AppConfigDataService
         * @description - The {@link AppContentController} invokes this method during its construction to specify the callback that will actually display the popup dialog.
         */
        onShowMainModalPopupDialog<T>(callback: IPopupDialogShowCallback<T>): void;
        /**
         * Closes the main modal popup dialog.
         *
         * @param {*} [result] - Result value to apply.
         * @memberof AppConfigDataService
         */
        closeMainModalPopupDialog(result?: any): void;
        /**
         * Specifies a callback to invoke when the main modal popup dialog is to be closed.
         *
         * @template TTHis - The type of object used as the "this" object when the callback is invoked.
         * @template TResult - The type of result value for the modal popup dialog.
         * @param {{ (this: TTHis, result?: TResult): void }} callback - The callback to invoke when the main modal popup dialog is to be closed.
         * @param {TTHis} thisArg - The object to use as the "this" object when the callback is invoked.
         * @memberof AppConfigDataService
         */
        onCloseMainModalPopupDialog<TTHis, TResult>(callback: {
            (this: TTHis, result?: TResult): void;
        }, thisArg: TTHis): void;
        /**
         * Specifies a callback to invoke when the main modal popup dialog is to be closed.
         *
         * @template T - The type of result value for the modal popup dialog.
         * @param {{ (result?: T): void }} callback - The callback to invoke when the main modal popup dialog is to be closed.
         * @memberof AppConfigDataService
         * @description - The {@link AppContentController} invokes this method during its construction to specify the callback that will actually close the popup dialog.
         */
        onCloseMainModalPopupDialog<T>(callback: {
            (result?: T): void;
        }): void;
        /**
         * Specifies a callback to invoke when the value of {@link AppConfigDataService#serviceNowUrl} has changed.
         *
         * @template T - The type of object used as the "this" object when the callback is invoked.
         * @param {{ (this: T, value: URL): void; }} callback - The callback to invoke when the value of {@link AppConfigDataService#serviceNowUrl} has changed.
         * @param {T} thisArg - The object to use as the "this" object when the callback is invoked.
         * @memberof AppConfigDataService
         */
        onServiceNowUrlChanged<T>(callback: {
            (this: T, value: URL): void;
        }, thisArg: T): void;
        /**
         * Specifies a callback to invoke when the value of {@link AppConfigDataService#serviceNowUrl} has changed.
         *
         * @param {{ (value: URL): void; }} callback - The callback to invoke when the value of {@link AppConfigDataService#serviceNowUrl} has changed.
         * @memberof AppConfigDataService
         */
        onServiceNowUrlChanged(callback: {
            (value: URL): void;
        }): void;
        private raiseServiceNowUrlChanged;
        /**
         * Specifies a callback to invoke when the value of {@link AppConfigDataService#gitRepositoryUrl} has changed.
         *
         * @template T - The type of object used as the "this" object when the callback is invoked.
         * @param {{ (this: T, value: URL): void; }} callback - The callback to invoke when the value of {@link AppConfigDataService#gitRepositoryUrl} has changed.
         * @param {T} thisArg - The object to use as the "this" object when the callback is invoked.
         * @memberof AppConfigDataService
         */
        onGitRepositoryUrlChanged<T>(callback: {
            (this: T, value: URL): void;
        }, thisArg: T): void;
        /**
         * Specifies a callback to invoke when the value of {@link AppConfigDataService#gitRepositoryUrl} has changed.
         *
         * @param {{ (value: URL): void; }} callback - The callback to invoke when the value of {@link AppConfigDataService#gitRepositoryUrl} has changed.
         * @memberof AppConfigDataService
         */
        onGitRepositoryUrlChanged(callback: {
            (value: URL): void;
        }): void;
        private raiseGitRepositoryUrlChanged;
        /**
         * Specifies a callback to invoke when the value of {@link AppConfigDataService#pageTitle} has changed.
         *
         * @template T - The type of object used as the "this" object when the callback is invoked.
         * @param {{ (this: T, value: URL): void; }} callback - The callback to invoke when the value of {@link AppConfigDataService#pageTitle} has changed.
         * @param {T} thisArg - The object to use as the "this" object when the callback is invoked.
         * @memberof AppConfigDataService
         */
        onTitleChanged<T>(callback: {
            (this: T, value: string): void;
        }, thisArg: T): void;
        /**
         * Specifies a callback to invoke when the value of {@link AppConfigDataService#pageTitle} has changed.
         *
         * @param {{ (value: string): void; }} callback - The callback to invoke when the value of {@link AppConfigDataService#pageTitle} has changed.
         * @memberof AppConfigDataService
         */
        onTitleChanged(callback: {
            (value: string): void;
        }): void;
        private raiseTitleChanged;
        /**
         * Specifies callback(s) to invoke when settings have been loaded from appConfigData.json.
         *
         * @template T - The type of object used as the "this" object when the callback is invoked.
         * @param {{ (this: T, svc: AppConfigDataService): void; }} successCallback - The callback to invoke when settings have been successfully loaded.
         * @param {({ (this: T, reason: any, svc: AppConfigDataService): void; } | undefined)} errorCallback - The callback to invoke when there was an error loading settings from appConfigData.json.
         * @param {T} thisArg - The object to use as the "this" object when the callback is invoked.
         * @memberof AppConfigDataService
         */
        onSettingsLoaded<T>(successCallback: {
            (this: T, svc: AppConfigDataService): void;
        }, errorCallback: {
            (this: T, reason: any, svc: AppConfigDataService): void;
        } | undefined, thisArg: T): void;
        /**
         * Specifies callback(s) to invoke when settings have been loaded from appConfigData.json.
         *
         * @param {{ (svc: AppConfigDataService): void; }} successCallback - The callback to invoke when settings have been successfully loaded.
         * @param {{ (reason: any, svc: AppConfigDataService): void; }} [errorCallback] - The callback to invoke when there was an error loading settings from appConfigData.json.
         * @memberof AppConfigDataService
         */
        onSettingsLoaded(successCallback: {
            (svc: AppConfigDataService): void;
        }, errorCallback?: {
            (reason: any, svc: AppConfigDataService): void;
        }): void;
        /**
         * Creates an absolute ServiceNow URL from a relative URL.
         *
         * @param {string} [relativeUrl] - The relative ServiceNow URL.
         * @param {boolean} [toNav] - Whether to encapsulate the relative path within "/nav_to.do?uri=path".
         * @returns {string}
         * @memberof AppConfigDataService
         */
        createServiceNowUrl(relativeUrl?: string, toNav?: boolean): string;
        /**
         * Creates an absolute git URL from a relative URL.
         *
         * @param {string} [relativeUrl] - The relative GIT URL.
         * @returns {string}
         * @memberof AppConfigDataService
         */
        createGitRepositoryUrl(relativeUrl?: string): string;
        private applySettings;
        /**
         * Converts a URL path to a fallback (default) page ID.
         *
         * @static
         * @param {string} path - The URL Path to convert.
         * @returns {string} The fallback page ID for the given URL path.
         * @memberof AppConfigDataService
         */
        static toPageId(path: string): string;
    }
    /**
     * Defines a button to be shown in the modal popup dialog.
     *
     * @interface IPopupDialogButtonConfig
     * @extends {IPopupDialogButtonDefinition<any>}
     */
    export interface IPopupDialogButtonConfig extends IPopupDialogButtonDefinition<any> {
        /**
         * The click event handler for the associated button.
         *
         * @param {JQueryInputEventObject} [event] - The event object.
         * @memberof IPopupDialogButtonConfig
         */
        onClick(event?: JQueryInputEventObject): any;
    }
    /**
     *
     *
     * @interface IAppContentDirectiveScope
     * @extends {ng.IScope}
     */
    export interface IAppContentDirectiveScope extends ng.IScope {
        /**
         * The controller associated with the current scope.
         *
         * @type {AppContentController}
         * @memberof IAppContentDirectiveScope
         */
        appContentController: AppContentController;
        /**
         * The title of the current page.
         *
         * @type {string}
         * @memberof IAppContentDirectiveScope
         */
        pageTitle: string;
        /**
         * The value of the GIT repository URL field in the edit setup parameters dialog.
         *
         * @type {string}
         * @memberof IAppContentDirectiveScope
         */
        serviceNowUrl: string;
        /**
         * Indicates whether the ServiceNow URL field in the edit setup parameters dialog is valid.
         *
         * @type {boolean}
         * @memberof IAppContentDirectiveScope
         */
        serviceNowUrlIsValid: boolean;
        /**
         * The value of the GIT repository URL field in the edit setup parameters dialog.
         *
         * @type {string}
         * @memberof IAppContentDirectiveScope
         */
        gitRepositoryUrl: string;
        /**
         * Indicates whether the GIT repository URL field in the edit setup parameters dialog is valid.
         *
         * @type {boolean}
         * @memberof IAppContentDirectiveScope
         */
        gitRepositoryUrlIsValid: boolean;
        /**
         * Indicates whether all fields in the edit setup parameters dialog are valid.
         *
         * @type {boolean}
         * @memberof IAppContentDirectiveScope
         */
        setupParametersAreInvalid: boolean;
        /**
         * Indicates whether the edit setup parameters dialog is being displayed.
         *
         * @type {boolean}
         * @memberof IAppContentDirectiveScope
         */
        setupParametersDialogVisible: boolean;
        /**
         * Navigation menu items to be displayed in the primary navigation menu.
         *
         * @type {ReadonlyArray<NavigationItem>}
         * @memberof IAppContentDirectiveScope
         */
        topNavItems: ReadonlyArray<NavigationItem>;
        /**
         * Indicates whether the secondary navigation menu is to be displayed.
         *
         * @type {boolean}
         * @memberof IAppContentDirectiveScope
         */
        showSideMenu: boolean;
        /**
         * Ancestor navigation menu items to be displayed in the secondary navigation menu.
         *
         * @type {ReadonlyArray<NavigationItem>}
         * @memberof IAppContentDirectiveScope
         */
        sideNavBreadcrumbItems: ReadonlyArray<NavigationItem>;
        /**
         * Indicates whether ancestor navigation menu items are to be displayed in the secondary navigation menu.
         *
         * @type {boolean}
         * @memberof IAppContentDirectiveScope
         */
        showBreadcrumbLinks: boolean;
        /**
         * Indicates whether the child/sibling navigation menu items are to be displayed in the secondary navigation menu.
         *
         * @type {boolean}
         * @memberof IAppContentDirectiveScope
         */
        showSideNavItems: boolean;
        /**
         * Heading text for the secondary navigation menu.
         *
         * @type {string}
         * @memberof IAppContentDirectiveScope
         */
        sideNavHeading: string;
        /**
         * Indicates whether a heading is to be displayed in the secondary navigation menu.
         *
         * @type {boolean}
         * @memberof IAppContentDirectiveScope
         */
        showSideNavHeading: boolean;
        /**
         * Navigation menu items within the secondary navigation menu, exclusing any that represents the current page or sibling items following the one that represents the current page.
         *
         * @type {ReadonlyArray<NavigationItem>}
         * @memberof IAppContentDirectiveScope
         */
        sideNavItems: ReadonlyArray<NavigationItem>;
        /**
         * Indicates whether navigation menu item representing the current page is to be displayed in the secondary navigation menu.
         *
         * @type {boolean}
         * @memberof IAppContentDirectiveScope
         */
        showCurrentItem: boolean;
        /**
         * Navigation menu item representing the current page.
         *
         * @type {ReadonlyArray<NavigationItem>}
         * @memberof IAppContentDirectiveScope
         */
        currentNavItem?: NavigationItem;
        /**
         * Navigation menu items within the secondary navigation menu that follow the item representing the current page.
         *
         * @type {ReadonlyArray<NavigationItem>}
         * @memberof IAppContentDirectiveScope
         */
        followingSideNavItems: ReadonlyArray<NavigationItem>;
        /**
         * CSS class names for the main content section.
         *
         * @type {string[]}
         * @memberof IAppContentDirectiveScope
         */
        mainSectionClass: string[];
        /**
         * Indicates whether the main modal popup dialog is being displayed.
         *
         * @type {boolean}
         * @memberof IAppContentDirectiveScope
         */
        popupDialogVisible: boolean;
        /**
         * The title of the modal popup dialog.
         *
         * @type {string}
         * @memberof IAppContentDirectiveScope
         */
        popupDialogTitle: string;
        /**
         * Message text for modal popup dialog.
         *
         * @type {string}
         * @memberof IAppContentDirectiveScope
         */
        popupDialogMessage: string;
        /**
         * Buttons to be displayed in modal popup dialog.
         *
         * @type {IPopupDialogButtonConfig[]}
         * @memberof IAppContentDirectiveScope
         */
        popupDialogButtons: IPopupDialogButtonConfig[];
        /**
         * The callback to invoke when the modal popup dialog has been closed.
         *
         * @type {{ (result?: any): void; }}
         * @param {*} [result] - The dialog result value.
         * @memberof IAppContentDirectiveScope
         */
        onPopupDialogClose?: {
            (result?: any): void;
        };
        /**
         * CSS class names for the modal popup dialog body element.
         *
         * @type {string[]}
         * @memberof IAppContentDirectiveScope
         */
        popupDialogBodyClass: string[];
    }
    /**
     * Implements the controller for the appContent directive
     *
     * @class AppContentController
     * @implements {ng.IController}
     */
    export class AppContentController implements ng.IController {
        private $scope;
        private $log;
        private $window;
        private appConfigData;
        /**
         * Creates an instance of AppContentController.
         *
         * @param {IAppContentDirectiveScope} $scope - The scope for the current appContent directive.
         * @param {ng.ILogService} $log - The $log service.
         * @param {ng.IWindowService} $window - The $window service.
         * @param {AppConfigDataService} appConfigData - The appConfigData service.
         * @memberof AppContentController
         */
        constructor($scope: IAppContentDirectiveScope, $log: ng.ILogService, $window: ng.IWindowService, appConfigData: AppConfigDataService);
        private updateMainSectionClass;
        /**
         * Opens the edit dialog for setup parameters.
         *
         * @param {JQueryInputEventObject} [event] - The event object.
         * @memberof AppContentController
         */
        openSetupParametersEditDialog(event?: JQueryInputEventObject): void;
        /**
         * Closes the edit dialog for setup parameters.
         *
         * @param {JQueryInputEventObject} [event] - The event object.
         * @param {boolean} [accept] - Whether to accept any validated changes that were made.
         * @memberof AppContentController
         */
        closeSetupParametersEditDialog(event?: JQueryInputEventObject, accept?: boolean): void;
        /**
         * Closes the main modal popup dialog.
         *
         * @param {JQueryInputEventObject} [event] - The event object.
         * @param {*} [result] - The result value use as the the modal dialog result.
         * @memberof AppContentController
         */
        closePopupDialog(event?: JQueryInputEventObject, result?: any): void;
        $onInit(): void;
    }
    export class sessionStorageService implements Map<string, string> {
        private $window;
        private _allKeys;
        private _parsedKeys;
        private _parsedObjects;
        [Symbol.toStringTag]: string;
        readonly size: number;
        constructor($window: ng.IWindowService);
        private check;
        clear(): void;
        delete(key: string): boolean;
        entries(): IterableIterator<[string, string]>;
        [Symbol.iterator](): IterableIterator<[string, string]>;
        forEach(callbackfn: (value: string, key: string, map: sessionStorageService) => void, thisArg?: any): void;
        get(key: string): string | null;
        getKeys(): string[];
        getObject<T>(key: string): T | undefined;
        has(key: string): boolean;
        keys(): IterableIterator<string>;
        set(key: string, value: string): any | undefined;
        setObject<T>(key: string, value: T | undefined): any | undefined;
        values(): IterableIterator<string>;
    }
    export class CopyToClipboardService {
        private $window;
        constructor($window: ng.IWindowService);
        copy(element: JQuery, successMsg?: string): void;
    }
    export interface ISchemaProperties {
        supportsPath?: boolean;
        supportsQuery?: boolean;
        supportsFragment?: boolean;
        supportsCredentials?: boolean;
        requiresHost?: boolean;
        supportsPort?: boolean;
        requiresUsername?: boolean;
        schemeSeparator?: string;
        defaultPort?: number;
    }
    export class SchemaProperties implements ISchemaProperties {
        readonly name: string;
        readonly description: string;
        readonly supportsPath: boolean;
        readonly supportsQuery: boolean;
        readonly supportsFragment: boolean;
        readonly supportsCredentials: boolean;
        readonly requiresHost: boolean;
        readonly supportsPort: boolean;
        readonly requiresUsername: boolean;
        readonly defaultPort: number;
        readonly schemeSeparator: string;
        constructor(name: string, properties?: ISchemaProperties, description?: string);
        static getSchemaProperties(name: string): SchemaProperties;
        /**
         * File Transfer protocol
         **/
        static readonly uriScheme_ftp: SchemaProperties;
        /**
         * File Transfer protocol (secure)
         **/
        static readonly uriScheme_ftps: SchemaProperties;
        /**
         * Secure File Transfer Protocol
         **/
        static readonly uriScheme_sftp: SchemaProperties;
        /**
         * Hypertext Transfer Protocol
         **/
        static uriScheme_http: SchemaProperties;
        /**
         * Hypertext Transfer Protocol (secure)
         **/
        static uriScheme_https: SchemaProperties;
        /**
         * Gopher protocol
         **/
        static uriScheme_gopher: SchemaProperties;
        /**
         * Electronic mail address
         **/
        static uriScheme_mailto: SchemaProperties;
        /**
         * USENET news
         **/
        static uriScheme_news: SchemaProperties;
        /**
         * USENET news using NNTP access
         **/
        static uriScheme_nntp: SchemaProperties;
        /**
         * Reference to interactive sessions
         **/
        static uriScheme_telnet: SchemaProperties;
        /**
         * Wide Area Information Servers
         **/
        static uriScheme_wais: SchemaProperties;
        /**
         * Host-specific file names
         **/
        static uriScheme_file: SchemaProperties;
        /**
         * Net Pipe
         **/
        static uriScheme_netPipe: SchemaProperties;
        /**
         * Net-TCP
         **/
        static uriScheme_netTcp: SchemaProperties;
        /**
         * Lightweight Directory Access Protocol
         **/
        static uriScheme_ldap: SchemaProperties;
        /**
         * Secure Shell
         **/
        static uriScheme_ssh: SchemaProperties;
        /**
         * GIT Respository
         **/
        static uriScheme_git: SchemaProperties;
        /**
         * Uniform Resource notation
         **/
        static uriScheme_urn: SchemaProperties;
    }
    export class QueryParameters implements URLSearchParams {
        constructor(params?: string | URLSearchParams);
        append(name: string, value: string): void;
        delete(name: string): void;
        get(name: string): string;
        getAll(name: string): string[];
        has(name: string): boolean;
        set(name: string, value: string): void;
        sort(): void;
        forEach(callbackfn: (value: string, key: string, parent: URLSearchParams) => void, thisArg?: any): void;
        [Symbol.iterator](): IterableIterator<[string, string]>;
        entries(): IterableIterator<[string, string]>;
        keys(): IterableIterator<string>;
        values(): IterableIterator<string>;
    }
    export class Uri implements URL {
        private _href;
        private _origin;
        private _schemeName;
        private _schemeSeparator;
        private _username?;
        private _password?;
        private _hostname;
        private _port?;
        private _portnumber;
        private _pathname;
        private _search?;
        private _searchParams;
        private _hash?;
        href: string;
        origin: string;
        protocol: string;
        schemeName: string;
        schemeSeparator: string;
        username: string;
        password: string;
        host: string;
        hostname: string;
        port: string;
        pathname: string;
        search: string;
        searchParams: URLSearchParams;
        hash: string;
        toJSON(): string;
        constructor(baseUri: URL | Uri, relativeUri: string | URL | Uri);
        constructor(uri: URL | Uri | string);
    }
    export class UriBuilderService {
    }
    export enum NotificationMessageType {
        error = 0,
        warning = 1,
        info = 2
    }
    export interface INotificationMessage {
        type: NotificationMessageType;
        title?: string;
        message: string;
    }
    export class NotificationMessageService {
        readonly $log: ng.ILogService;
        private _messages;
        constructor($log: ng.ILogService);
        addNotificationMessage(message: string, title: string, type: NotificationMessageType): void;
        addNotificationMessage(message: string, type: NotificationMessageType): void;
        addNotificationMessage(message: string, title: string): void;
        addNotificationMessage(message: string): void;
        getMessages(type: NotificationMessageType, clear: boolean): INotificationMessage[];
        getMessages(type: NotificationMessageType): INotificationMessage[];
        getMessages(clear: boolean): INotificationMessage[];
        getMessages(): INotificationMessage[];
    }
    export {};
}
