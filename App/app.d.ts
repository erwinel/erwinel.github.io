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
    let appModule: ng.IModule;
    const ScopeEvent_OpenMainModalPopupDialog: string;
    const ScopeEvent_CloseMainModalPopupDialog: string;
    const ScopeEvent_ShowSetupParametersDialog: string;
    const ScopeEvent_HideSetupParametersDialog: string;
    const ScopeEvent_SetupParameterSettingsChanged: string;
    const ScopeEvent_AddCollapsibleCard: string;
    const ScopeEvent_: string;
    const StorageKey_SetupParameterSettings = "targetSysConfigSettings";
    interface INavigationContainerScope extends ng.IScope {
        currentItemIndex: number;
        pageTitle: string;
        items: INavigationItemScope[];
    }
    interface IPageNavigationScope extends ng.IScope {
        top: INavigationContainerScope;
        side: INavigationContainerScope;
    }
    interface INavigationItemScope extends ng.IScope, INavigationContainerScope {
        linkTitle: string;
        pageTitle: string;
        href: string;
        class: string[];
        isCurrent: boolean;
        onClick(): void;
    }
    interface IMainControllerScope extends ng.IScope {
        serviceNowUrl: string;
        gitRepositoryBaseUrl: string;
        pageNavigation: IPageNavigationScope;
        showSetupParametersEditDialog(): void;
    }
    abstract class MainControllerChild<TScope extends IMainControllerScope> implements ng.IController {
        protected $scope: TScope;
        $doCheck(): void;
        constructor($scope: TScope);
        showSetupParametersEditDialog(): void;
        hideSetupParametersEditDialog(): void;
        showModalDialogMessage(message: string, type?: DialogMessageType, title?: string): void;
        hideModalDialogMessage(): void;
    }
    type DialogMessageType = 'info' | 'warning' | 'danger' | 'primary' | 'success';
    interface IDialogScope extends ng.IScope {
        isVisible: boolean;
        title: string;
        message: string;
        bodyClass: string;
        show(message: string, type?: DialogMessageType, title?: string): any;
        close(): any;
    }
    class mainModalPopupDialogController implements ng.IController {
        static show($scope: ng.IScope, message: string, type?: DialogMessageType, title?: string): void;
        static hide($scope: ng.IScope): void;
        constructor($scope: IDialogScope, $rootScope: ng.IScope);
    }
    class sessionStorageService implements Map<string, string> {
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
    class CopyToClipboardService {
        private $window;
        constructor($window: ng.IWindowService);
        copy(element: JQuery, successMsg?: string): void;
    }
    enum cssValidationClass {
        isValid = "is-valid",
        isInvalid = "is-invalid"
    }
    enum cssFeedbackClass {
        isValid = "is-valid",
        isInvalid = "is-invalid"
    }
    interface ISysConfigEditFieldState extends ISysConfigEditScope {
        original: string;
        text: string;
        isValid: boolean;
        lastValidated: string;
        validationMessage: string;
        validationClass: string[];
        messageClass: string[];
    }
    interface ISysConfigEditScope extends ng.IScope {
        serviceNowUrl: string;
        gitRepositoryBaseUrl: string;
        cancel(): void;
        accept(): void;
        close(): void;
        serviceNowUrlField: ISysConfigEditFieldState;
        gitRepositoryBaseUrlField: ISysConfigEditFieldState;
    }
    class targetSysConfigEditController implements ng.IController {
        protected $scope: ISysConfigEditScope;
        private _settings;
        constructor($scope: ISysConfigEditScope, _settings: targetSysConfigSettings);
        $doCheck(): void;
        static show($scope: ng.IScope): void;
        static hide($scope: ng.IScope): void;
    }
    interface ISysConfigSettings {
        serviceNowUrl: string;
        gitRepositoryBaseUrl: string;
    }
    class targetSysConfigSettings {
        private $rootScope;
        private _sessionStorage;
        private _settings;
        serviceNowUrl: string;
        gitRepositoryBaseUrl: string;
        private raiseUpdated;
        onChanged(scope: ng.IScope, handler: (event: ng.IAngularEvent, settings: ISysConfigSettings) => void): void;
        constructor($rootScope: ng.IScope, _sessionStorage: sessionStorageService, $http: ng.IHttpService);
    }
    interface ISchemaProperties {
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
    class SchemaProperties implements ISchemaProperties {
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
    class QueryParameters implements URLSearchParams {
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
    class Uri implements URL {
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
    class UriBuilderService {
    }
    enum NotificationMessageType {
        error = 0,
        warning = 1,
        info = 2
    }
    interface INotificationMessage {
        type: NotificationMessageType;
        title?: string;
        message: string;
    }
    class NotificationMessageService {
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
}
