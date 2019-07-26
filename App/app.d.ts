/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
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
     * @description - This is for a path string only - This MUST NOT contain relative segment names ("." or ".."), URL query or fragment and MUST NOT start or end with "/".
     */
    export const DEFAULT_PAGE_PATH: string;
    /**
     * The default root absolute URL of the target ServiceNow instance.
     *
     * @description - This MUST be an absolute URL and MUST NOT contain an explicit path (cannot end with "/"), URL query or fragment.
     */
    export const DEFAULT_URL_SERVICENOW: string;
    /**
     * The default root absolute URL of the remote GIT repository.
     *
     * @description - This MUST be an absolute URL and MUST NOT contain a URL query or fragment. If this contains an explicit path (which is usually the case), the path must end with a "/".
     */
    export const DEFAULT_URL_GIT_REPOSITORY: string;
    export const ScopeEvent_OpenMainModalPopupDialog: string;
    export const ScopeEvent_CloseMainModalPopupDialog: string;
    export const ScopeEvent_ShowSetupParametersDialog: string;
    export const ScopeEvent_HideSetupParametersDialog: string;
    export const ScopeEvent_SetupParameterSettingsChanged: string;
    export const ScopeEvent_AddCollapsibleCard: string;
    export const ScopeEvent_: string;
    export const StorageKey_UrlConfigSettings: string;
    export const StorageKey_SetupParameterSettings: string;
    export enum cssValidationClass {
        isValid = "is-valid",
        isInvalid = "is-invalid"
    }
    export enum cssFeedbackClass {
        isValid = "valid-feedback",
        isInvalid = "invalid-feedback"
    }
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
    export interface IUrlConfigSettings {
        /**
         * The base URL for the target ServiceNow instance.
         */
        serviceNowUrl: string;
        /**
         * The base URL for the target remote GIT repository.
         */
        gitRepositoryUrl: string;
    }
    interface INavigationDefinition {
        id?: string;
        url: string;
        linkTitle: string;
        pageTitle?: string;
        toolTip?: string;
        sideNavHeading?: string;
        items?: INavigationDefinition[];
    }
    export class NavigationUrl {
        constructor(navItem: NavigationItem, url: string);
    }
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
        readonly id: string;
        readonly linkTitle: string;
        readonly pageTitle: string;
        readonly toolTip: string;
        readonly sideNavHeading: string;
        /**
         * The navigation menu hyperlink for the current item.
         */
        readonly navMenuHref: string;
        /**
         * The relative URL of the current item.
         */
        readonly url: string;
        /**
         * Indicates whether the current item represents the current page.
         */
        readonly isCurrentPage: boolean;
        /**
         * Indicates whether the current item represents the current page or the parent of the current page.
         */
        readonly hasOrIsCurrentPage: boolean;
        /**
         * Indicates whether the current item represents and ancestor of the current page.
         */
        readonly hasCurrentPage: boolean;
        /**
         * The CSS class names to be applied to the anchor tag.
         */
        readonly anchorCssClass: ReadonlyArray<string>;
        readonly childNavItems: ReadonlyArray<NavigationItem>;
        readonly hasChildNavItem: boolean;
        readonly hasSiblingNavItem: boolean;
        readonly isNestedNavItem: boolean;
        readonly nestedSideNavChildItems: ReadonlyArray<NavigationItem>;
        readonly showNestedSideNavChildItems: boolean;
        readonly parentNavItem: NavigationItem | undefined;
        constructor(_appConfigData: AppConfigDataService, navDef: INavigationDefinition);
        precedingSiblings(): NavigationItem[];
        followingSiblings(): NavigationItem[];
        getParentNavItems(): NavigationItem[];
        getBreadcrumbLinks(): NavigationItem[];
        onClick(event?: BaseJQueryEventObject): void;
        static createNavItems(appConfigData: AppConfigDataService, items?: INavigationDefinition[]): ReadonlyArray<NavigationItem>;
        static findCurrentItem(items: ReadonlyArray<NavigationItem>): NavigationItem | undefined;
        static createSideNavBreadcrumbItems(current?: NavigationItem): ReadonlyArray<NavigationItem>;
        static createSideNavSiblingItems(current?: NavigationItem): ReadonlyArray<NavigationItem>;
    }
    export interface IPopupDialogButtonDefinition<T> {
        value: T;
        displayText: string;
    }
    export interface ITHisPopupDialogShowCallback<TTHis, TResult> {
        (this: TTHis, message: string, title?: string, type?: DialogMessageType, buttons?: IPopupDialogButtonDefinition<TResult>[], onClose?: {
            (result?: TResult): void;
        }): void;
    }
    export interface IPopupDialogShowCallback<T> {
        (message: string, title?: string, type?: DialogMessageType, buttons?: IPopupDialogButtonDefinition<T>[], onClose?: {
            (result?: T): void;
        }): void;
    }
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
        private _sideNavBreadcrumbItems;
        private _sideNavSiblingItems;
        private _sideNavChildItems;
        private _serviceNowUrlChangedCallback;
        private _gitRepositoryUrlChangedCallback;
        private _pageTitleChangedCallback;
        private _showMainModalPopupDialogCallback;
        private _hideMainModalPopupDialogCallback;
        currentPageId(): string;
        pagePath(): string;
        pageTitle(value?: string): string;
        currentItemClass(): ReadonlyArray<string>;
        selectedItemClass(): ReadonlyArray<string>;
        otherItemClass(): ReadonlyArray<string>;
        topNavItems(): ReadonlyArray<NavigationItem>;
        serviceNowUrl(value?: URL): URL;
        gitRepositoryUrl(value?: URL): URL;
        constructor(_sessionStorage: sessionStorageService, $http: ng.IHttpService, $log: ng.ILogService, $document: ng.IDocumentService, $window: ng.IWindowService);
        showMainModalPopupDialog<TTHis, TResult>(message: string, title: string | undefined, type: DialogMessageType | undefined, buttons: IPopupDialogButtonDefinition<TResult>[] | undefined, onClose: {
            (this: TTHis, result?: TResult): void;
        } | undefined, thisArg: TTHis): void;
        showMainModalPopupDialog<T>(message: string, title?: string, type?: DialogMessageType, buttons?: IPopupDialogButtonDefinition<T>[], onClose?: {
            (result?: T): void;
        }): void;
        onShowMainModalPopupDialog<TTHis, TResult>(callback: ITHisPopupDialogShowCallback<TTHis, TResult>, thisArg: TTHis): void;
        onShowMainModalPopupDialog<T>(callback: IPopupDialogShowCallback<T>): void;
        closeMainModalPopupDialog(result?: any): void;
        onCloseMainModalPopupDialog<TTHis, TResult>(callback: {
            (this: TTHis, result?: TResult): void;
        }, thisArg: TTHis): void;
        onCloseMainModalPopupDialog<T>(callback: {
            (result?: T): void;
        }): void;
        onServiceNowUrlChanged<T>(callback: {
            (this: T, value: URL): void;
        }, thisArg: T): void;
        onServiceNowUrlChanged(callback: {
            (value: URL): void;
        }): void;
        private raiseServiceNowUrlChanged;
        onGitRepositoryUrlChanged<T>(callback: {
            (this: T, value: URL): void;
        }, thisArg: T): void;
        onGitRepositoryUrlChanged(callback: {
            (value: URL): void;
        }): void;
        private raiseGitRepositoryUrlChanged;
        onTitleChanged<T>(callback: {
            (this: T, value: string): void;
        }, thisArg: T): void;
        onTitleChanged(callback: {
            (value: string): void;
        }): void;
        private raiseTitleChanged;
        onSettingsLoaded<T>(successCallback: {
            (this: T, svc: AppConfigDataService): void;
        }, errorCallback: {
            (this: T, reason: any, svc: AppConfigDataService): void;
        } | undefined, thisArg: T): void;
        onSettingsLoaded(successCallback: {
            (svc: AppConfigDataService): void;
        }, errorCallback?: {
            (reason: any, svc: AppConfigDataService): void;
        }): void;
        createServiceNowUrl(relativeUrl?: string, toNav?: boolean): string;
        createGitRepositoryUrl(relativeUrl?: string): string;
        private applySettings;
        static toPageId(path: string): string;
    }
    export type DialogMessageType = 'info' | 'warning' | 'danger' | 'primary' | 'success';
    interface IDialogScope extends ng.IScope {
        isVisible: boolean;
        title: string;
        message: string;
        bodyClass: string;
        show(message: string, type?: DialogMessageType, title?: string): any;
        close(): any;
    }
    export class mainModalPopupDialogController implements ng.IController {
        static show($scope: ng.IScope, message: string, type?: DialogMessageType, title?: string): void;
        static hide($scope: ng.IScope): void;
        constructor($scope: IDialogScope, $rootScope: ng.IScope);
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
