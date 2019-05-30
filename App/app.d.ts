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
    class copyToClipboardService {
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
}
