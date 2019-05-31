/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />
var app;
(function (app) {
    /**
    * The main module for this app.
    *
    * @type {ng.IModule}
    */
    app.appModule = angular.module("app", []);
    app.ScopeEvent_OpenMainModalPopupDialog = 'OpenMainModalPopupDialog';
    app.ScopeEvent_CloseMainModalPopupDialog = 'CloseMainModalPopupDialog';
    app.ScopeEvent_ShowSetupParametersDialog = 'showSetupParameterDefinitionsControllerDialog';
    app.ScopeEvent_HideSetupParametersDialog = 'hideSetupParameterDefinitionsControllerDialog';
    app.ScopeEvent_SetupParameterSettingsChanged = "SetupParameterSettingsChanged";
    app.ScopeEvent_AddCollapsibleCard = "AddCollapsibleCard";
    app.ScopeEvent_ = "";
    app.StorageKey_SetupParameterSettings = "targetSysConfigSettings";
    const DefaultURL_ServiceNow = "https://inscomscd.service-now.com";
    const DefaultURL_GitRepositoryBase = "https://github.com/erwinel";
    function initializePageNavigationScope(parentScope, location, http) {
        let scope = parentScope.pageNavigation = (parentScope.$new());
        scope.top = (scope.pageNavigation.$new());
        scope.top.items = [];
        scope.top.currentItemIndex = -1;
        scope.side = (scope.pageNavigation.$new());
        scope.side.items = [];
        scope.side.currentItemIndex = -1;
        http.get("./pageNavigation.json").then((nav) => {
            let pageName = location.path().split("/").reduce((previousValue, currentValue) => { return (currentValue.length > 0) ? currentValue : previousValue; }, "").toLowerCase();
            if (sys.isNil(nav.data))
                alert("Failed to load navigation from ./pageNavigation.json. Reason (" + nav.status + "): " + nav.statusText);
            else if (typeof (nav.data.items) === 'undefined')
                alert("Failed to load navigation from ./pageNavigation.json. Reason: No items returned. Status: (" + nav.status + "): " + nav.statusText);
            else {
                nav.data.items.forEach((d, index) => {
                    let item = toNavItem(pageName, nav.data, scope.top, d);
                    if ((item.isCurrent || item.currentItemIndex > -1) && scope.top.currentItemIndex < 0)
                        scope.top.currentItemIndex = index;
                });
                if (scope.top.currentItemIndex > -1) {
                    let sideItem = scope.top.items[scope.top.currentItemIndex];
                    scope.side.items = sideItem.items;
                    scope.side.currentItemIndex = sideItem.currentItemIndex;
                    sideItem.items = [];
                    sideItem.currentItemIndex = -1;
                }
                let container = (scope.side.currentItemIndex < 0) ? scope.top : scope.side;
                let selectedItem = container.items[(container.currentItemIndex < 0) ? 0 : container.currentItemIndex];
                while (!selectedItem.isCurrent) {
                    if (selectedItem.currentItemIndex < 0)
                        break;
                    selectedItem = selectedItem.items[selectedItem.currentItemIndex];
                }
                scope.pageTitle = selectedItem.pageTitle;
            }
        }).catch((reason) => {
            if (!sys.isNil(reason)) {
                if (typeof (reason) !== 'string') {
                    try {
                        alert("Failed to load navigation from ./pageNavigation.json. Reason: " + JSON.stringify(reason) + ".");
                    }
                    catch (_a) {
                        alert("Failed to load navigation from ./pageNavigation.json. Reason: " + reason + ".");
                    }
                }
                else if ((reason = reason.trim()).length > 0)
                    alert("Failed to load navigation from ./pageNavigation.json. Reason: " + reason);
            }
            alert("Failed to load navigation from ./pageNavigation.json. Reason: unknown.");
        });
    }
    // #endregion
    // #region NavigationItemScope
    function toNavItem(pageName, config, container, definition) {
        let item = (container.$new());
        item.linkTitle = definition.linkTitle;
        item.pageTitle = (sys.isNilOrWhiteSpace(definition.pageTitle)) ? definition.linkTitle : definition.pageTitle;
        item.currentItemIndex = -1;
        if (pageName === definition.url) {
            item.href = '#';
            item.class = config.currentItemClass;
            item.isCurrent = true;
            item.onClick = () => { return false; };
        }
        else {
            item.isCurrent = false;
            item.href = definition.url;
            item.class = config.otherItemClass;
            item.onClick = () => { return true; };
        }
        item.items = [];
        if (!sys.isNilOrEmpty(definition.items)) {
            definition.items.forEach((d, index) => {
                let childItem = toNavItem(pageName, config, item, d);
                if ((childItem.isCurrent || childItem.currentItemIndex > -1) && item.currentItemIndex < 0) {
                    item.currentItemIndex = index;
                    item.class = config.selectedItemClass;
                }
            });
        }
        container.items.push(item);
        return item;
    }
    // #endregion
    // #region Directives
    app.appModule.directive("mainAppPageHead", () => {
        return {
            restrict: "E",
            scope: true,
            templateUrl: 'Template/mainAppPageHead.htm'
        };
    });
    class mainPageController {
        constructor($scope, $location, $http, settings) {
            this.$scope = $scope;
            this.$location = $location;
            this.$http = $http;
            this.settings = settings;
            $scope.serviceNowUrl = settings.serviceNowUrl;
            $scope.gitRepositoryBaseUrl = settings.gitRepositoryBaseUrl;
            settings.onChanged($scope, (event, value) => {
                $scope.serviceNowUrl = value.serviceNowUrl;
                $scope.gitRepositoryBaseUrl = value.gitRepositoryBaseUrl;
            });
            initializePageNavigationScope($scope, $location, $http);
            $scope.showSetupParametersEditDialog = () => {
                targetSysConfigEditController.show($scope);
            };
        }
        $doCheck() { }
        showSetupParametersEditDialog() { targetSysConfigEditController.show(this.$scope); }
        hideSetupParametersEditDialog() { targetSysConfigEditController.hide(this.$scope); }
        showModalDialogMessage(message, type = 'info', title) { mainModalPopupDialogController.show(this.$scope, message, type, title); }
        hideModalDialogMessage() { mainModalPopupDialogController.hide(this.$scope); }
    }
    app.appModule.controller("mainPageController", ['$scope', "$location", "$http", "targetSysConfigSettings", mainPageController]);
    class MainControllerChild {
        constructor($scope) {
            this.$scope = $scope;
        }
        $doCheck() { }
        showSetupParametersEditDialog() { targetSysConfigEditController.show(this.$scope); }
        hideSetupParametersEditDialog() { targetSysConfigEditController.hide(this.$scope); }
        showModalDialogMessage(message, type = 'info', title) { mainModalPopupDialogController.show(this.$scope, message, type, title); }
        hideModalDialogMessage() { mainModalPopupDialogController.hide(this.$scope); }
    }
    app.MainControllerChild = MainControllerChild;
    class mainModalPopupDialogController {
        constructor($scope, $rootScope) {
            $scope.title = '';
            $scope.message = '';
            $scope.bodyClass = '';
            $scope.close = () => { $('#mainModalPopupDialog').modal('hide'); };
            $rootScope.$on(app.ScopeEvent_OpenMainModalPopupDialog, (event, message, type, title) => {
                if (sys.isNilOrWhiteSpace(title)) {
                    switch (type) {
                        case 'warning':
                            $scope.title = 'Warning';
                            break;
                        case 'danger':
                            $scope.title = 'Critical';
                            break;
                        case 'success':
                            $scope.title = 'Success';
                            break;
                        default:
                            $scope.title = 'Notice';
                    }
                }
                else
                    $scope.title = title;
                $scope.bodyClass = 'modal-body alert alert-' + type;
                $scope.message = (sys.isNil(message)) ? '' : message;
                $('#mainModalPopupDialog').modal('show');
            });
            $rootScope.$on(app.ScopeEvent_CloseMainModalPopupDialog, (event) => { $('#mainModalPopupDialog').modal('hide'); });
        }
        static show($scope, message, type, title) {
            $scope.$broadcast(app.ScopeEvent_OpenMainModalPopupDialog, message, type, title);
        }
        static hide($scope) {
            $scope.$broadcast(app.ScopeEvent_CloseMainModalPopupDialog);
        }
    }
    app.mainModalPopupDialogController = mainModalPopupDialogController;
    app.appModule.controller("mainModalPopupDialogController", ['$scope', '$rootScope', mainModalPopupDialogController]);
    // #endregion
    // #region Session Storage Service
    class SessionStorageEntryEnumerator {
        constructor(_window, _keys) {
            this._window = _window;
            this._keys = _keys;
            this._index = 0;
        }
        [Symbol.iterator]() { return this; }
        next() {
            if (this._window.sessionStorage.length !== this._keys.length)
                this._index = this._keys.length;
            else if (this._index < this._keys.length) {
                try {
                    let key = this._keys[this._index];
                    let value = this._window.sessionStorage.getItem(key);
                    if (!sys.isNil(value))
                        return { done: false, value: [key, value] };
                    this._index = this._keys.length;
                }
                catch (_a) {
                    this._index = this._keys.length;
                }
            }
            return { done: true, value: undefined };
        }
    }
    class SessionStorageValueEnumerator {
        constructor(_window, _keys) {
            this._window = _window;
            this._keys = _keys;
            this._index = 0;
        }
        [Symbol.iterator]() { return this; }
        next() {
            if (this._window.sessionStorage.length !== this._keys.length)
                this._index = this._keys.length;
            else if (this._index < this._keys.length) {
                try {
                    let value = this._window.sessionStorage.getItem(this._keys[this._index]);
                    if (!sys.isNil(value))
                        return { done: false, value: value };
                    this._index = this._keys.length;
                }
                catch (_a) {
                    this._index = this._keys.length;
                }
            }
            return { done: true, value: undefined };
        }
    }
    class sessionStorageService {
        constructor($window) {
            this.$window = $window;
            this[Symbol.toStringTag] = 'sessionStorageService';
            this.check(true);
        }
        get size() { return this.$window.sessionStorage.length; }
        check(forceRefresh = false) {
            if (!forceRefresh && this.$window.sessionStorage.length == this._allKeys.length)
                return;
            this._allKeys = [];
            this._parsedKeys = [];
            this._parsedObjects = [];
            for (let i = 0; i < this.$window.sessionStorage.length; i++)
                this._allKeys.push(this.$window.sessionStorage.key(i));
        }
        clear() {
            this.$window.sessionStorage.clear();
            this._allKeys = [];
            this._parsedKeys = [];
            this._parsedObjects = [];
        }
        delete(key) {
            this.check();
            this.$window.sessionStorage.removeItem(key);
            let i = this._parsedKeys.indexOf(key);
            if (i < 0)
                return false;
            if (i == 0) {
                this._parsedKeys.shift();
                this._parsedObjects.shift();
            }
            else if (i == (this._parsedKeys.length - 1)) {
                this._parsedKeys.pop();
                this._parsedObjects.pop();
            }
            else {
                this._parsedKeys.splice(i, 1);
                this._parsedObjects.splice(i, 1);
            }
        }
        entries() { return new SessionStorageEntryEnumerator(this.$window, this._allKeys); }
        [Symbol.iterator]() { return this.entries(); }
        forEach(callbackfn, thisArg) {
            this.check();
            if (typeof (thisArg) === "undefined")
                this._allKeys.forEach((key, index) => {
                    if (index < this._allKeys.length && this._allKeys[index] === key) {
                        let value;
                        try {
                            value = this.$window.sessionStorage.getItem(key);
                        }
                        catch ( /* okay to ignore */_a) { /* okay to ignore */ }
                        if (!sys.isNil(value))
                            callbackfn(value, key, this);
                    }
                }, this);
            else
                this._allKeys.forEach((key, index) => {
                    if (index < this._allKeys.length && this._allKeys[index] === key) {
                        let value;
                        try {
                            value = this.$window.sessionStorage.getItem(key);
                        }
                        catch ( /* okay to ignore */_a) { /* okay to ignore */ }
                        if (!sys.isNil(value))
                            callbackfn.call(thisArg, value, key, this);
                    }
                }, this);
        }
        get(key) {
            this.check();
            try {
                if (this._allKeys.indexOf(key) > -1)
                    return this.$window.sessionStorage.getItem(key);
            }
            catch ( /* okay to ignore */_a) { /* okay to ignore */ }
            return null;
        }
        getKeys() {
            this.check();
            return Array.from(this._allKeys);
        }
        getObject(key) {
            this.check();
            let i = this._parsedKeys.indexOf(key);
            if (i > -1)
                return this._parsedObjects[i];
            try {
                let json = this.$window.sessionStorage.getItem(key);
                if (!sys.isNilOrEmpty(json)) {
                    let result;
                    if (json !== "undefined")
                        result = (ng.fromJson(json));
                    this._parsedKeys.push(key);
                    this._parsedObjects.push(result);
                    return result;
                }
            }
            catch (_a) { }
        }
        has(key) {
            this.check();
            return this._allKeys.indexOf(key) > -1;
        }
        keys() {
            this.check();
            return Array.from(this._allKeys).values();
        }
        set(key, value) {
            try {
                if (sys.isNil(value))
                    this.$window.sessionStorage.removeItem(key);
                else
                    this.$window.sessionStorage.setItem(key, value);
                let i = this._parsedKeys.indexOf(key);
                if (i == 0) {
                    this._parsedKeys.shift();
                    this._parsedObjects.shift();
                }
                else if (i == (this._parsedKeys.length - 1)) {
                    this._parsedKeys.pop();
                    this._parsedObjects.pop();
                }
                else if (i < this._parsedKeys.length) {
                    this._parsedKeys.splice(i, 1);
                    this._parsedObjects.splice(i, 1);
                }
            }
            catch (e) {
                return e;
            }
        }
        setObject(key, value) {
            try {
                if (typeof (value) === "undefined")
                    this.$window.sessionStorage.setItem(key, "undefined");
                else
                    this.$window.sessionStorage.setItem(key, ng.toJson(value, false));
                let i = this._parsedKeys.indexOf(key);
                if (i < 0) {
                    this._parsedKeys.push(key);
                    this._parsedObjects.push(value);
                }
                else
                    this._parsedObjects[i] = value;
            }
            catch (e) {
                return e;
            }
        }
        values() { return new SessionStorageValueEnumerator(this.$window, this._allKeys); }
    }
    app.sessionStorageService = sessionStorageService;
    app.appModule.service("sessionStorageService", ["$window", sessionStorageService]);
    // #endregion
    // #region Copy To Clipboard Service
    class copyToClipboardService {
        constructor($window) {
            this.$window = $window;
        }
        copy(element, successMsg) {
            try {
                element.text();
                let range = this.$window.document.createRange();
                range.selectNode(element[0]);
                let selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                this.$window.document.execCommand('copy');
                selection.removeAllRanges();
                if ((typeof successMsg === "string") && (successMsg = successMsg.trim()).length > 0)
                    alert(successMsg);
                else
                    alert('Text copied to clipboard');
            }
            catch (ex) {
                alert('Failed to copy to clipboard: ' + ex);
            }
        }
    }
    app.copyToClipboardService = copyToClipboardService;
    app.appModule.service("copyToClipboardService", ["$window", copyToClipboardService]);
    // #endregion
    // #region Target SyStem Configuration Information
    let cssValidationClass;
    (function (cssValidationClass) {
        cssValidationClass["isValid"] = "is-valid";
        cssValidationClass["isInvalid"] = "is-invalid";
    })(cssValidationClass = app.cssValidationClass || (app.cssValidationClass = {}));
    let cssFeedbackClass;
    (function (cssFeedbackClass) {
        cssFeedbackClass["isValid"] = "is-valid";
        cssFeedbackClass["isInvalid"] = "is-invalid";
    })(cssFeedbackClass = app.cssFeedbackClass || (app.cssFeedbackClass = {}));
    class targetSysConfigEditController {
        constructor($scope, _settings) {
            this.$scope = $scope;
            this._settings = _settings;
            $scope.serviceNowUrlField = ($scope.$new());
            $scope.serviceNowUrlField.original = $scope.serviceNowUrlField.text = $scope.serviceNowUrlField.lastValidated = _settings.serviceNowUrl;
            $scope.serviceNowUrlField.validationMessage = '';
            $scope.serviceNowUrlField.validationClass = ['form-control', cssValidationClass.isValid];
            $scope.serviceNowUrlField.messageClass = ['invalid-feedback'];
            $scope.serviceNowUrlField.isValid = true;
            $scope.gitRepositoryBaseUrlField = ($scope.$new());
            $scope.gitRepositoryBaseUrlField.original = $scope.gitRepositoryBaseUrlField.text = $scope.gitRepositoryBaseUrlField.lastValidated = _settings.gitRepositoryBaseUrl;
            $scope.gitRepositoryBaseUrlField.validationMessage = '';
            $scope.gitRepositoryBaseUrlField.validationClass = ['form-control', cssValidationClass.isValid];
            $scope.gitRepositoryBaseUrlField.messageClass = ['invalid-feedback'];
            $scope.gitRepositoryBaseUrlField.isValid = true;
            $scope.message = '';
            $scope.bodyClass = '';
            $scope.close = () => { $('#setupParametersDialog').modal('hide'); };
            $scope.cancel = () => {
                $scope.serviceNowUrlField.text = $scope.serviceNowUrlField.lastValidated = $scope.serviceNowUrlField.original;
                $scope.serviceNowUrlField.validationMessage = '';
                $scope.serviceNowUrlField.validationClass = ['form-control', cssValidationClass.isValid];
                $scope.serviceNowUrlField.messageClass = ['invalid-feedback'];
                $scope.serviceNowUrlField.isValid = true;
                $scope.gitRepositoryBaseUrlField.text = $scope.gitRepositoryBaseUrlField.lastValidated = $scope.gitRepositoryBaseUrlField.original;
                $scope.gitRepositoryBaseUrlField.validationMessage = '';
                $scope.gitRepositoryBaseUrlField.validationClass = ['form-control', cssValidationClass.isValid];
                $scope.gitRepositoryBaseUrlField.isValid = true;
                $scope.gitRepositoryBaseUrlField.messageClass = ['invalid-feedback'];
                $('#setupParametersDialog').modal('hide');
            };
            $scope.accept = () => {
                this.$doCheck();
                if (!$scope.serviceNowUrlField.isValid) {
                    if (!$scope.gitRepositoryBaseUrlField.isValid)
                        alert("ServiceNow URL and GIT Repository Base URL are not valid.");
                    alert("ServiceNow URL is not valid.");
                    return;
                }
                if (!$scope.gitRepositoryBaseUrlField.isValid) {
                    alert("GIT Repository Base URL is not valid.");
                    return;
                }
                $scope.serviceNowUrlField.original = $scope.serviceNowUrlField.text = $scope.serviceNowUrlField.lastValidated = $scope.serviceNowUrlField.text =
                    sys.subStringBefore(sys.subStringBefore($scope.serviceNowUrlField.text, '#'), '?');
                $scope.serviceNowUrlField.validationMessage = '';
                $scope.serviceNowUrlField.validationClass = ['form-control', cssValidationClass.isValid];
                $scope.serviceNowUrlField.messageClass = ['invalid-feedback'];
                $scope.gitRepositoryBaseUrlField.original = $scope.gitRepositoryBaseUrlField.text = $scope.gitRepositoryBaseUrlField.lastValidated =
                    $scope.gitRepositoryBaseUrlField.text = sys.subStringBefore(sys.subStringBefore($scope.gitRepositoryBaseUrlField.text, '#'), '?');
                $scope.gitRepositoryBaseUrlField.validationMessage = '';
                $scope.gitRepositoryBaseUrlField.validationClass = ['form-control', cssValidationClass.isValid];
                $scope.gitRepositoryBaseUrlField.messageClass = ['invalid-feedback'];
                $('#setupParametersDialog').modal('hide');
                this._settings.serviceNowUrl = $scope.serviceNowUrlField.original;
                this._settings.gitRepositoryBaseUrl = $scope.gitRepositoryBaseUrlField.original;
            };
            $scope.$on(app.ScopeEvent_ShowSetupParametersDialog, (event) => {
                $('#setupParametersDialog').modal('show');
            });
            $scope.$on(app.ScopeEvent_HideSetupParametersDialog, (event) => {
                $('#setupParametersDialog').modal('hide');
            });
        }
        $doCheck() {
            [this.$scope.serviceNowUrlField, this.$scope.gitRepositoryBaseUrlField].forEach((item) => {
                if (item.lastValidated === item.text)
                    return;
                let uri = sys.asString(item.text, true, '');
                item.lastValidated = uri;
                if (uri.length === 0)
                    item.validationMessage = 'URL is required.';
                else {
                    let fragment = '', query = '';
                    let i = uri.indexOf('#');
                    if (i > -1) {
                        fragment = uri.substr(i);
                        uri = uri.substr(0, i);
                    }
                    i = uri.indexOf('?');
                    if (i > -1) {
                        fragment = uri.substr(i);
                        uri = uri.substr(0, i);
                    }
                    let match;
                    if (uri.length > 0)
                        match = sys.uriParseRegex.exec(uri);
                    if (sys.isNilOrEmpty(match))
                        item.validationMessage = 'Invalid URL.';
                    else if (sys.isNilOrWhiteSpace(match[sys.uriParseGroup.origin]))
                        item.validationMessage = 'URL cannot be relative.';
                    else if (sys.isNilOrWhiteSpace(match[sys.uriParseGroup.schemeName]) || sys.isNilOrWhiteSpace(match[sys.uriParseGroup.hostname]))
                        item.validationMessage = 'Invalid URL.';
                    else {
                        item.isValid = true;
                        if (query.length > 0)
                            item.validationMessage = 'URI query string will be ignored.';
                        else if (fragment.length > 0)
                            item.validationMessage = 'URI fragment (hash) will be ignored.';
                        else
                            return;
                        item.validationClass = ['form-control', cssValidationClass.isInvalid];
                        item.messageClass = ['invalid-feedback', 'text-warning'];
                        return;
                    }
                }
                item.isValid = false;
                item.validationClass = ['form-control', cssValidationClass.isInvalid];
                item.messageClass = ['invalid-feedback'];
            });
        }
        static show($scope) {
            $scope.$broadcast(app.ScopeEvent_ShowSetupParametersDialog);
        }
        static hide($scope) {
            $scope.$broadcast(app.ScopeEvent_HideSetupParametersDialog);
        }
    }
    app.targetSysConfigEditController = targetSysConfigEditController;
    app.appModule.controller("targetSysConfigEditController", ['$scope', 'targetSysConfigSettings', targetSysConfigEditController]);
    class targetSysConfigSettings {
        constructor($rootScope, _sessionStorage, $http) {
            this.$rootScope = $rootScope;
            this._sessionStorage = _sessionStorage;
            this._settings = _sessionStorage.getObject("targetSysConfigSettings");
            if (sys.isNil(this._settings))
                this._settings = { serviceNowUrl: DefaultURL_ServiceNow, gitRepositoryBaseUrl: DefaultURL_GitRepositoryBase };
            else {
                if (sys.isNilOrWhiteSpace(this._settings.serviceNowUrl))
                    this._settings.serviceNowUrl = DefaultURL_ServiceNow;
                if (sys.isNilOrWhiteSpace(this._settings.gitRepositoryBaseUrl))
                    this._settings.gitRepositoryBaseUrl = DefaultURL_GitRepositoryBase;
            }
            $http.get("./defaults.json").then((nav) => {
                if (sys.isNil(nav.data))
                    return;
                if (sys.isNil(nav.data.serviceNowUrl) || this._settings.serviceNowUrl === nav.data.serviceNowUrl) {
                    if (sys.isNil(nav.data.serviceNowUrl) || this._settings.serviceNowUrl === nav.data.serviceNowUrl)
                        return;
                    this._settings.gitRepositoryBaseUrl = nav.data.gitRepositoryBaseUrl;
                }
                else {
                    this._settings.serviceNowUrl = nav.data.serviceNowUrl;
                    if (!sys.isNil(nav.data.serviceNowUrl) && this._settings.serviceNowUrl !== nav.data.serviceNowUrl)
                        this._settings.gitRepositoryBaseUrl = nav.data.gitRepositoryBaseUrl;
                }
                this._sessionStorage.setObject(app.StorageKey_SetupParameterSettings, this._settings);
                this.raiseUpdated();
            });
        }
        get serviceNowUrl() { return this._settings.serviceNowUrl; }
        set serviceNowUrl(value) {
            if (value === this._settings.serviceNowUrl)
                return;
            if (sys.isNilOrWhiteSpace(value))
                throw new Error("URL cannot be empty.");
            let parsedUrl = sys.parseUriString(value);
            if (sys.isNil(parsedUrl.origin))
                throw new Error("URL cannot be relative.");
            if (!(sys.isNil(parsedUrl.queryString) && sys.isNil(parsedUrl.fragment) && parsedUrl.path.length == 0)) {
                if (value === parsedUrl.origin.value)
                    return;
                this._settings.serviceNowUrl = parsedUrl.origin.value;
            }
            else
                this._settings.serviceNowUrl = value;
            this._sessionStorage.setObject(app.StorageKey_SetupParameterSettings, this._settings);
            this.raiseUpdated();
        }
        get gitRepositoryBaseUrl() { return this._settings.gitRepositoryBaseUrl; }
        set gitRepositoryBaseUrl(value) {
            if (value === this._settings.gitRepositoryBaseUrl)
                return;
            if (sys.isNilOrWhiteSpace(value))
                throw new Error("URL cannot be empty.");
            let parsedUrl = sys.parseUriString(value);
            if (sys.isNil(parsedUrl.origin))
                throw new Error("URL cannot be relative.");
            if (!(sys.isNil(parsedUrl.queryString) && sys.isNil(parsedUrl.fragment))) {
                value = parsedUrl.origin.value + parsedUrl.path;
                if (value === this._settings.gitRepositoryBaseUrl)
                    return;
            }
            this._settings.gitRepositoryBaseUrl = value;
            this._sessionStorage.setObject(app.StorageKey_SetupParameterSettings, this._settings);
            this.raiseUpdated();
        }
        raiseUpdated() {
            this.$rootScope.$emit(app.ScopeEvent_SetupParameterSettingsChanged, {
                serviceNowUrl: this._settings.serviceNowUrl,
                gitRepositoryBaseUrl: this._settings.gitRepositoryBaseUrl
            });
        }
        onChanged(scope, handler) { scope.$on(app.ScopeEvent_SetupParameterSettingsChanged, handler); }
    }
    app.targetSysConfigSettings = targetSysConfigSettings;
    app.appModule.factory("targetSysConfigSettings", ["$rootScope", "sessionStorageService", "$http", targetSysConfigSettings]);
    // #endregion
    // #endregion
    // #region urlBuilderService
    const uriParseRegex = /^(([^\\\/@:]*)(:[\\\/]{0,2})((?=[^\\\/@:]*(?::[^\\\/@:]*)?@)([^\\\/@:]*)(:[^\\\/@:]*)?@)?([^\\\/@:]*)(?:(?=:\d*(?:[\\\/:]|$)):(\d*))?(?=[\\\/:]|$))?(.+)?$/;
    const originParseRegex = /^(([^\\\/@\s?#:]+)(:\/{0,2})((?=[^\\\/@?#:]*(?::[^\\\/@?#:]*)?@)([^\\\/@?#:]*)(:[^\\\/@?#:]*)?@)?(?:([^\\\/@?#\s:]+)(?:(?=:\d*(?:[\\\/:]|$)):(\d*))?)?)([\/:])?$/;
    const schemeNameRegex = /^([^\\\/@\s:]+):?$/;
    const schemeSeparatorRegex = /^:(\/\/?)?$/;
    const hostRegex = /^([^\\\/?#@\s"]+)(:\d+)?$/;
    const fileSystemPathRegex = /^([a-z]:([\\\/]([^\\\/?#:]|$)|$)|[\\\/]{2}[^\\\/?#:]+)/i;
    let uriParseGroup;
    (function (uriParseGroup) {
        uriParseGroup[uriParseGroup["all"] = 0] = "all";
        uriParseGroup[uriParseGroup["origin"] = 1] = "origin";
        uriParseGroup[uriParseGroup["schemeName"] = 2] = "schemeName";
        uriParseGroup[uriParseGroup["schemeSeparator"] = 3] = "schemeSeparator";
        uriParseGroup[uriParseGroup["userInfo"] = 4] = "userInfo";
        uriParseGroup[uriParseGroup["username"] = 5] = "username";
        uriParseGroup[uriParseGroup["password"] = 6] = "password";
        uriParseGroup[uriParseGroup["hostname"] = 7] = "hostname";
        uriParseGroup[uriParseGroup["portnumber"] = 8] = "portnumber";
        uriParseGroup[uriParseGroup["path"] = 9] = "path";
    })(uriParseGroup || (uriParseGroup = {}));
    class SchemaProperties {
        constructor(name, properties) {
            this.name = name;
            if (typeof (properties) === 'undefined' || properties === null) {
                this.supportsPath = true;
                this.supportsQuery = true;
                this.supportsFragment = true;
                this.supportsCredentials = true;
                this.requiresHost = false;
                this.supportsPort = true;
                this.requiresUsername = false;
                this.defaultPort = NaN;
                this.schemeSeparator = "://";
            }
            else {
                this.supportsPath = (typeof (properties.supportsPath) !== 'boolean' || properties.supportsPath === true);
                this.supportsQuery = (typeof (properties.supportsQuery) !== 'boolean' || properties.supportsQuery === true);
                this.supportsFragment = (typeof (properties.supportsFragment) !== 'boolean' || properties.supportsFragment === true);
                this.supportsCredentials = (typeof (properties.supportsCredentials) !== 'boolean' || properties.supportsCredentials === true);
                this.requiresHost = (typeof (properties.requiresHost) !== 'boolean' || properties.requiresHost === true);
                this.supportsPort = (typeof (properties.supportsPort) !== 'boolean' || properties.supportsPort === true);
                this.requiresUsername = (typeof (properties.requiresUsername) === 'boolean' && properties.requiresUsername === true);
                this.defaultPort = properties.defaultPort;
                this.schemeSeparator = (typeof (properties.schemeSeparator) == 'string') ? properties.schemeSeparator : "://";
            }
        }
        static getSchemaProperties(name) {
            if (name.endsWith(':'))
                name = name.substr(0, name.length - 1);
            switch (name) {
                case 'ftp':
                    return SchemaProperties.uriScheme_ftp;
                case 'ftps':
                    return SchemaProperties.uriScheme_ftps;
                case 'sftp':
                    return SchemaProperties.uriScheme_sftp;
                case 'http':
                    return SchemaProperties.uriScheme_http;
                case 'https':
                    return SchemaProperties.uriScheme_https;
                case 'gopher':
                    return SchemaProperties.uriScheme_gopher;
                case 'mailto':
                    return SchemaProperties.uriScheme_mailto;
                case 'news':
                    return SchemaProperties.uriScheme_news;
                case 'nntp':
                    return SchemaProperties.uriScheme_nntp;
                case 'telnet':
                    return SchemaProperties.uriScheme_telnet;
                case 'wais':
                    return SchemaProperties.uriScheme_wais;
                case 'file':
                    return SchemaProperties.uriScheme_file;
                case 'net.pipe':
                    return SchemaProperties.uriScheme_netPipe;
                case 'net.tcp':
                    return SchemaProperties.uriScheme_netTcp;
                case 'ldap':
                    return SchemaProperties.uriScheme_ldap;
                case 'ssh':
                    return SchemaProperties.uriScheme_ssh;
                case 'git':
                    return SchemaProperties.uriScheme_git;
                case 'urn':
                    return SchemaProperties.uriScheme_urn;
            }
            return new SchemaProperties(name);
        }
        ;
    }
    /**
     * File Transfer protocol
     **/
    SchemaProperties.uriScheme_ftp = new SchemaProperties("ftp", { supportsQuery: false, supportsFragment: false, defaultPort: 21 });
    /**
     * File Transfer protocol (secure)
     **/
    SchemaProperties.uriScheme_ftps = new SchemaProperties("ftps", { supportsQuery: false, supportsFragment: false, defaultPort: 990 });
    /**
     * Secure File Transfer Protocol
     **/
    SchemaProperties.uriScheme_sftp = new SchemaProperties("sftp", { supportsQuery: false, supportsFragment: false, defaultPort: 22 });
    /**
     * Hypertext Transfer Protocol
     **/
    SchemaProperties.uriScheme_http = new SchemaProperties("http", { defaultPort: 80 });
    /**
     * Hypertext Transfer Protocol (secure)
     **/
    SchemaProperties.uriScheme_https = new SchemaProperties("https", { defaultPort: 443 });
    /**
     * The Gopher protocol
     **/
    SchemaProperties.uriScheme_gopher = new SchemaProperties("gopher", { defaultPort: 70 });
    /**
     * Electronic mail address
     **/
    SchemaProperties.uriScheme_mailto = new SchemaProperties("mailto", { schemeSeparator: ":" });
    /**
     * USENET news
     **/
    SchemaProperties.uriScheme_news = new SchemaProperties("news", { supportsCredentials: false, requiresHost: false, supportsPort: false, schemeSeparator: ":" });
    /**
     * USENET news using NNTP access
     **/
    SchemaProperties.uriScheme_nntp = new SchemaProperties("nntp", { defaultPort: 119 });
    /**
     * Reference to interactive sessions
     **/
    SchemaProperties.uriScheme_telnet = new SchemaProperties("telnet", { supportsPath: false, supportsQuery: false, supportsFragment: false, supportsCredentials: false, defaultPort: 23 });
    /**
     * Wide Area Information Servers
     **/
    SchemaProperties.uriScheme_wais = new SchemaProperties("wais", { defaultPort: 443 });
    /**
     * Host-specific file names
     **/
    SchemaProperties.uriScheme_file = new SchemaProperties("file", { supportsQuery: false, supportsFragment: false, supportsCredentials: false, requiresHost: false, supportsPort: false });
    /**
     * Net Pipe
     **/
    SchemaProperties.uriScheme_netPipe = new SchemaProperties("net.pipe", { supportsPort: false });
    /**
     * Net-TCP
     **/
    SchemaProperties.uriScheme_netTcp = new SchemaProperties("net.tcp", { defaultPort: 808 });
    /**
     * Lightweight Directory Access Protocol
     **/
    SchemaProperties.uriScheme_ldap = new SchemaProperties("ldap", { defaultPort: 389 });
    /**
     * Lightweight Directory Access Protocol
     **/
    SchemaProperties.uriScheme_ssh = new SchemaProperties("ssh", { defaultPort: 22 });
    /**
     * GIT Respository
     **/
    SchemaProperties.uriScheme_git = new SchemaProperties("git", { supportsQuery: false, supportsFragment: false, defaultPort: 9418 });
    /**
     * Uniform Resource notation
     **/
    SchemaProperties.uriScheme_urn = new SchemaProperties("urn", { supportsCredentials: false, requiresHost: false, supportsPort: false, schemeSeparator: ":" });
    app.SchemaProperties = SchemaProperties;
    class QueryParameters {
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
    app.QueryParameters = QueryParameters;
    class Uri {
        constructor(baseUri, relativeUri) {
            this._href = "";
            this._origin = "";
            this._schemeName = "";
            this._schemeSeparator = "";
            this._username = undefined;
            this._password = undefined;
            this._hostname = "";
            this._port = undefined;
            this._portnumber = NaN;
            this._pathname = "";
            this._search = undefined;
            this._searchParams = new QueryParameters();
            this._hash = undefined;
            if ((typeof baseUri === "undefined") || baseUri === null) {
                if ((typeof relativeUri === "undefined") || relativeUri === null)
                    baseUri = "";
            }
            if (typeof (baseUri) === "string" && fileSystemPathRegex.test(baseUri))
                try {
                    let parseUrl = new URL(baseUri);
                    if ((typeof parseUrl === "object") && parseUrl !== null)
                        baseUri = parseUrl;
                }
                catch (_a) { }
            let relative = ((typeof relativeUri !== "undefined") && relativeUri !== null) ? ((relativeUri instanceof Uri) ? relativeUri : new Uri(relativeUri)) : undefined;
        }
        get href() { return this._href; }
        ;
        set href(value) { this._href = value; }
        get origin() { return this._origin; }
        ;
        set origin(value) {
            if ((typeof (value) == "string") && value.trim().length > 0) {
                let m = originParseRegex.exec(value);
                if ((typeof m !== "object") || m === null)
                    throw new Error("Invalid origin");
                this._origin = m[uriParseGroup.origin];
                this._schemeName = m[uriParseGroup.schemeName];
                this._schemeSeparator = m[uriParseGroup.schemeSeparator];
                this._username = (typeof m[uriParseGroup.username] === "string" || typeof m[uriParseGroup.userInfo] !== "string") ? m[uriParseGroup.username] : "";
                this._password = m[uriParseGroup.password];
                this._hostname = m[uriParseGroup.hostname];
                this._port = m[uriParseGroup.portnumber];
                let s;
                this._portnumber = NaN;
                if ((typeof this._port === "string") && (s = this._port.trim()).length > 0) {
                    try {
                        this._portnumber = parseInt(s);
                    }
                    catch (_a) { }
                    if (typeof this._portnumber !== "number")
                        this._portnumber = NaN;
                }
                if (typeof m[uriParseGroup.path] == "string" && !this._pathname.startsWith("/"))
                    this._pathname = (this._pathname.length == 0) ? "/" : "/" + this._pathname;
            }
            else {
                if (this._origin.length == 0)
                    return;
                this._origin = "";
            }
        }
        get protocol() { return (typeof (this._schemeName) === "string") ? this._schemeName + this._schemeSeparator.substr(0, 1) : ""; }
        ;
        set protocol(value) {
            if ((typeof (value) == "string") && value.trim().length > 0) {
                let index = value.indexOf(":");
                if (index >= 0 && index < value.length - 1)
                    throw new Error("Invalid protocol string");
                this.schemeName = value;
            }
            else
                this.schemeName = "";
        }
        get schemeName() { return this._schemeName; }
        set schemeName(value) {
            if ((value = (typeof value !== "string") ? "" : value.trim()).length > 0) {
                let m = schemeNameRegex.exec(value);
                if ((typeof m !== "object") || m === null)
                    throw new Error("Invalid scheme name");
                this._schemeName = m[1];
                if (this._schemeSeparator.length == 0)
                    this._schemeSeparator = SchemaProperties.getSchemaProperties(this._schemeName).schemeSeparator;
            }
            else {
                this._schemeName = this._schemeSeparator = "";
            }
        }
        get schemeSeparator() { return this._schemeSeparator; }
        set schemeSeparator(value) {
            if ((value = (typeof value !== "string") ? "" : value.trim()).length > 0) {
                if (!schemeSeparatorRegex.test(value))
                    throw new Error("Invalid scheme separator");
                if (this._schemeName.length == 0)
                    this._schemeName = (value == ":") ? SchemaProperties.uriScheme_urn.name : SchemaProperties.uriScheme_http.name;
                this._schemeSeparator = value;
            }
            else
                this._schemeName = this._schemeSeparator = "";
            this._schemeSeparator = value;
        }
        get username() { return this._username; }
        ;
        set username(value) { this._username = value; }
        get password() { return this._password; }
        ;
        set password(value) { this._password = value; }
        get host() { return (typeof this._port == "string") ? this._hostname + ":" + this._port : this._hostname; }
        set host(value) {
            if ((value = (typeof value !== "string") ? "" : value.trim()).length > 0) {
                let m = hostRegex.exec(value);
                if ((typeof m !== "object") || m === null)
                    throw new Error("Invalid host");
                let p = NaN;
                if (typeof m[2] === "string") {
                    try {
                        p = parseInt(m[2]);
                    }
                    catch (_a) { }
                    if (p === 0 || p === -1)
                        p = NaN;
                    else if (typeof p !== "number" || isNaN(p) || p < 0 || p > 65535)
                        throw new Error("Invalid port");
                }
                this._portnumber = p;
                this._hostname = m[1];
            }
            else
                this._schemeName = this._schemeSeparator = "";
            this._schemeSeparator = value;
        }
        get hostname() { return this._hostname; }
        ;
        set hostname(value) { this._hostname = value; }
        get port() { return this._port; }
        ;
        set port(value) { this._port = value; }
        get pathname() { return this._pathname; }
        ;
        set pathname(value) { this._pathname = value; }
        get search() { return this._search; }
        ;
        set search(value) { this._search = value; }
        get searchParams() { return this._searchParams; }
        set searchParams(value) { this._searchParams = value; }
        get hash() { return this._hash; }
        set hash(value) { this._hash = value; }
        toJSON() {
            throw new Error("Method not implemented.");
        }
    }
    app.Uri = Uri;
    class UriBuilderService {
    }
    app.UriBuilderService = UriBuilderService;
    app.appModule.factory("uriBuilderService", ["$rootScope", UriBuilderService]);
    // #endregion
})(app || (app = {}));
