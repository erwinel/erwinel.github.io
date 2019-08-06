/// <reference path="../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />
var app;
(function (app) {
    /**
    * The main module for this app.
    *
    * @type {ng.IModule}
    */
    app.appModule = angular.module("app", []);
    // #region Constants
    /**
     * The relative path of the default page.
     *
     * @type {string}
     * @description - This is for a path string only - This MUST NOT contain relative segment names ("." or ".."), URL query or fragment and MUST NOT start or end with "/".
     */
    app.DEFAULT_PAGE_PATH = "index.html";
    /**
     * The default root absolute URL of the target ServiceNow instance.
     *
     * @type {string}
     * @description - This MUST be an absolute URL and MUST NOT contain an explicit path (cannot end with "/"), URL query or fragment.
     */
    app.DEFAULT_URL_SERVICENOW = "https://inscomscd.service-now.com";
    /**
     * The default root absolute URL of the remote GIT repository.
     *
     * @type {string}
     * @description - This MUST be an absolute URL and MUST NOT contain a URL query or fragment. If this contains an explicit path (which is usually the case), the path must end with a "/".
     */
    app.DEFAULT_URL_GIT_REPOSITORY = "https://github.com/erwinel/";
    const DEFAULT_CURRENT_ITEM_CLASS = ["active", "nav-link"];
    const DEFAULT_SELECTED_ITEM_CLASS = ["active", "nav-link"];
    const DEFAULT_OTHER_ITEM_CLASS = ["nav-link"];
    const SERVICENAME_APP_CONFIG_DATA = "appConfigData";
    const DIRECTIVE_NAME_APPCONTENT = "appContent";
    const DIRECTIVE_NAME_URLINPUT = "urlInput";
    app.StorageKey_UrlConfigSettings = "UrlConfig";
    app.StorageKey_SetupParameterSettings = "targetSysConfigSettings";
    /**
     *
     *
     * @export
     * @enum {string}
     */
    let cssValidationClass;
    (function (cssValidationClass) {
        /**
         *
         */
        cssValidationClass["isValid"] = "is-valid";
        cssValidationClass["isInvalid"] = "is-invalid";
    })(cssValidationClass = app.cssValidationClass || (app.cssValidationClass = {}));
    /**
     *
     *
     * @export
     * @enum {string}
     */
    let cssFeedbackClass;
    (function (cssFeedbackClass) {
        cssFeedbackClass["isValid"] = "valid-feedback";
        cssFeedbackClass["isInvalid"] = "invalid-feedback";
    })(cssFeedbackClass = app.cssFeedbackClass || (app.cssFeedbackClass = {}));
    /**
     *
     *
     * @export
     * @enum {string}
     */
    let cssAlertClass;
    (function (cssAlertClass) {
        cssAlertClass["alert"] = "alert";
        cssAlertClass["danger"] = "alert-danger";
        cssAlertClass["dark"] = "alert-dark";
        cssAlertClass["dismissible"] = "alert-dismissible";
        cssAlertClass["info"] = "alert-info";
        cssAlertClass["heading"] = "alert-heading";
        cssAlertClass["light"] = "alert-light";
        cssAlertClass["link"] = "alert-link";
        cssAlertClass["primary"] = "alert-primary";
        cssAlertClass["secondary"] = "alert-secondary";
        cssAlertClass["success"] = "alert-success";
        cssAlertClass["warning"] = "alert-warning";
    })(cssAlertClass = app.cssAlertClass || (app.cssAlertClass = {}));
    /**
     * Represents a menu navigation item.
     *
     * @export
     * @class NavigationItem
     */
    class NavigationItem {
        /**
         * Creates an instance of NavigationItem.
         *
         * @param {AppConfigDataService} _appConfigData - The appConfigData service provider.
         * @param {INavigationDefinition} navDef - The navigation menu item definition.
         * @memberof NavigationItem
         */
        constructor(_appConfigData, navDef) {
            this._appConfigData = _appConfigData;
            this._url = navDef.url;
            this._sideNavHeading = (typeof navDef.sideNavHeading === "string") ? navDef.sideNavHeading.trim() : "";
            this._linkTitle = (typeof navDef.linkTitle === "string" && navDef.linkTitle.length > 0) ? navDef.linkTitle : navDef.url;
            this._pageTitle = (typeof navDef.pageTitle === "string") ? navDef.pageTitle.trim() : "";
            this._toolTip = (typeof navDef.toolTip === "string") ? navDef.toolTip.trim() : ((this._pageTitle != this._linkTitle) ? this._pageTitle : "");
            if (typeof navDef.id !== "string" || (this._id = navDef.id).length === 0)
                this._id = AppConfigDataService.toPageId(this._url);
            if (this._id === _appConfigData.currentPageId())
                this._isCurrentPage = true;
            this._childNavItems = NavigationItem.createNavItems(_appConfigData, navDef.items);
            this._childNavItems.forEach((item) => { item._parentNavItem = this; }, this);
            if (this.isCurrentPage)
                this.getAncestorNavItems().forEach((item) => { item._isCurrentPage = false; });
        }
        /**
         * The unique identifier of the navigation menu item.
         *
         * @readonly
         * @type {string}
         * @memberof NavigationItem
         */
        get id() { return this._id; }
        /**
         * The display text for the current navigation menu item.
         *
         * @readonly
         * @type {string}
         * @memberof NavigationItem
         */
        get linkTitle() { return this._linkTitle; }
        /**
         * The title of the page that corresponds to the current navigation menu item.
         *
         * @readonly
         * @type {string}
         * @memberof NavigationItem
         */
        get pageTitle() { return this._pageTitle; }
        /**
         * The tooltip for the current navigation menu item.
         *
         * @readonly
         * @type {string}
         * @memberof NavigationItem
         */
        get toolTip() { return this._toolTip; }
        /**
         * The secondary navigation heading text for child navigation menu items.
         *
         * @readonly
         * @type {string}
         * @memberof NavigationItem
         */
        get sideNavHeading() { return this._sideNavHeading; }
        /**
         * The navigation menu hyperlink for the current item.
         *
         * @readonly
         * @type {string}
         * @memberof NavigationItem
         */
        get navMenuHref() { return (this.hasOrIsCurrentPage) ? "#" : this._url; }
        /**
         * The relative URL of the current navigation menu item.
         *
         * @readonly
         * @type {string}
         * @memberof NavigationItem
         */
        get url() { return this._url; }
        /**
         * Indicates whether the current navigation menu item represents the current page.
         *
         * @readonly
         * @type {boolean}
         * @memberof NavigationItem
         */
        get isCurrentPage() { return this._isCurrentPage === true; }
        /**
         * Indicates whether the current navigation menu item represents the current page or the parent of the current page.
         *
         * @readonly
         * @type {boolean}
         * @memberof NavigationItem
         */
        get hasOrIsCurrentPage() { return typeof this._isCurrentPage === "boolean"; }
        /**
         * Indicates whether the current navigation menu item represents an ancestor of the current page.
         *
         * @readonly
         * @type {boolean}
         * @memberof NavigationItem
         */
        get hasCurrentPage() { return this._isCurrentPage === false; }
        /**
         * The CSS class names to be applied to the anchor tag.
         *
         * @readonly
         * @type {ReadonlyArray<string>}
         * @memberof NavigationItem
         */
        get anchorCssClass() { return (this.isCurrentPage) ? this._appConfigData.currentItemClass() : ((this.hasOrIsCurrentPage) ? this._appConfigData.selectedItemClass() : this._appConfigData.otherItemClass()); }
        /**
         * The child navigation menu items to display within the secondary navigation menu.
         *
         * @readonly
         * @type {ReadonlyArray<NavigationItem>}
         * @memberof NavigationItem
         */
        get childNavItems() { return this._childNavItems; }
        /**
         * Indicates whether the current navigation menu item has child menu items.
         *
         * @readonly
         * @type {boolean}
         * @memberof NavigationItem
         */
        get hasChildNavItem() { return this._childNavItems.length > 0; }
        /**
         * Indicates whether the current navigation menu item has sibling items that share the same parent menu item.
         *
         * @readonly
         * @type {boolean}
         * @memberof NavigationItem
         */
        get hasSiblingNavItem() { return sys.notNil(this._previousNavItem) || sys.notNil(this._nextNavItem); }
        /**
         * Indicates whether the current navigation menu item is a child item of another.
         *
         * @readonly
         * @type {boolean}
         * @memberof NavigationItem
         */
        get isNestedNavItem() { return sys.notNil(this._parentNavItem); }
        /**
         * Navigation menu items to be displayed as nested items within the secondary navigation menu.
         *
         * @readonly
         * @type {ReadonlyArray<NavigationItem>}
         * @memberof NavigationItem
         */
        get nestedSideNavChildItems() { return (this.showNestedSideNavChildItems) ? this._childNavItems : []; }
        /**
         * Indicates whether the current navigation menu item represents the current page, is being displayed within the secondary navigation menu, and has child items.
         *
         * @readonly
         * @type {boolean}
         * @memberof NavigationItem
         */
        get showNestedSideNavChildItems() { return this.isCurrentPage && this.isNestedNavItem && this.hasChildNavItem && !this.hasSiblingNavItem; }
        /**
         * Gets the parent navigation menu item.
         *
         * @readonly
         * @type {(NavigationItem | undefined)}
         * @memberof NavigationItem
         */
        get parentNavItem() { return this._parentNavItem; }
        /**
         * Gets preceding sibling items for the current menu navigation item.
         *
         * @returns {NavigationItem[]}
         * @memberof NavigationItem
         */
        precedingSiblings() {
            if (typeof this._previousNavItem === "undefined")
                return [];
            let result = this._previousNavItem.precedingSiblings();
            result.push(this._previousNavItem);
            return result;
        }
        /**
         * Gets following sibling items for the current menu navigation item.
         *
         * @returns {NavigationItem[]}
         * @memberof NavigationItem
         */
        followingSiblings() {
            let result = [];
            for (let i = this._nextNavItem; typeof i !== "undefined"; i = i._nextNavItem)
                result.push(i);
            return result;
        }
        /**
         * Gets all ancestor navigation menu items.
         *
         * @returns {NavigationItem[]}
         * @memberof NavigationItem
         */
        getAncestorNavItems() {
            let result = [];
            for (let i = this._parentNavItem; typeof i !== "undefined"; i = i._parentNavItem)
                result.unshift(i);
            return result;
        }
        /**
         * Gets ancestor navigation menu items that do not appear in the primary navigation menu.
         *
         * @returns {NavigationItem[]}
         * @memberof NavigationItem
         */
        getBreadcrumbLinks() {
            let result = [];
            if (sys.notNil(this._parentNavItem) && sys.notNil(this._parentNavItem._parentNavItem))
                for (let i = this._parentNavItem; typeof i !== "undefined"; i = i._parentNavItem)
                    result.unshift(i);
            return result;
        }
        /**
         * Handles the menu item click event.
         *
         * @param {BaseJQueryEventObject} [event]
         * @memberof NavigationItem
         * @description The purpose of this member is to prevent the default action for the navigation menu item that represents the current page.
         */
        onClick(event) {
            if (this.isCurrentPage && sys.notNil(event)) {
                if (!event.isDefaultPrevented)
                    event.preventDefault();
                if (!event.isPropagationStopped)
                    event.stopPropagation();
            }
        }
        /**
         * Creates a navigation menu item objects from navigation menu definition objects.
         *
         * @static
         * @param {AppConfigDataService} appConfigData - The application configuration data service provider.
         * @param {INavigationDefinition[]} [items] - Defines the navigation menu items to be created.
         * @returns {ReadonlyArray<NavigationItem>} - The navigation menu item objects.
         * @memberof NavigationItem
         */
        static createNavItems(appConfigData, items) {
            if (typeof items !== "object" || items === null)
                return [];
            let result = items.filter((value) => typeof value === "object" && value !== null).map((value) => new NavigationItem(appConfigData, value));
            if (result.length > 0) {
                let previous = result[0];
                for (let i = 1; i < result.length; i++)
                    previous = (result[0]._previousNavItem = previous)._nextNavItem = result[0];
            }
            return result;
        }
        /**
         * Finds the navigation menu item that represents the current page.
         *
         * @static
         * @param {ReadonlyArray<NavigationItem>} items - Navigation menu items to recursively search.
         * @returns {(NavigationItem | undefined)} - The navigation menu item that represents the current page or undefined if none are found that represent the current page.
         * @memberof NavigationItem
         */
        static findCurrentItem(items) {
            if (items.length == 0)
                return undefined;
            if (items.length == 1)
                return (items[0].isCurrentPage) ? items[0] : this.findCurrentItem(items[0]._childNavItems);
            for (let i = 0; i < items.length; i++) {
                if (items[i].hasOrIsCurrentPage)
                    return (items[i].isCurrentPage) ? items[i] : this.findCurrentItem(items[i]._childNavItems);
            }
        }
        /**
         * Creates an array of ancestor navigation menu items to be displayed as breadcrumb links.
         *
         * @static
         * @param {NavigationItem} [current] - The navigation menu item that represents the current page.
         * @returns {ReadonlyArray<NavigationItem>}
         * @memberof NavigationItem
         */
        static createSideNavBreadcrumbItems(current) {
            if (typeof current === "undefined" || typeof current._parentNavItem === "undefined")
                return [];
            let result = [];
            while (typeof (current = current._parentNavItem)._parentNavItem !== "undefined")
                result.unshift(current);
            return result;
        }
        /**
         * Creates an array of sibling navigation menu items.
         *
         * @static
         * @param {NavigationItem} [current] - The navigation menu item that represents the current page.
         * @returns {ReadonlyArray<NavigationItem>}
         * @memberof NavigationItem
         */
        static createSideNavSiblingItems(current) {
            if (typeof current === "undefined" || typeof current._parentNavItem === "undefined")
                return [];
            let result = [current];
            if (typeof current._previousNavItem === "undefined") {
                if (typeof current._nextNavItem === "undefined")
                    return [];
            }
            else
                for (let item = current._previousNavItem; typeof item != "undefined"; item = item._previousNavItem)
                    result.unshift(item);
            for (let item = current._nextNavItem; typeof item != "undefined"; item = item._nextNavItem)
                result.push(item);
            return result;
        }
    }
    app.NavigationItem = NavigationItem;
    /**
     * Class which implements the appConfigData service.
     *
     * @export
     * @class AppConfigDataService
     */
    class AppConfigDataService {
        /**
         *Creates an instance of AppConfigDataService.
         * @param {sessionStorageService} _sessionStorage - The sessionStorage service provider.
         * @param {ng.IHttpService} $http - The $http service provider.
         * @param {ng.ILogService} $log - The $log service provider.
         * @param {ng.IDocumentService} $document - The $document service provider.
         * @param {ng.IWindowService} $window - The $window service provider
         * @memberof AppConfigDataService
         */
        constructor(_sessionStorage, $http, $log, $document, $window) {
            this._sessionStorage = _sessionStorage;
            this.$log = $log;
            this.$window = $window;
            this._serviceNowUrl = new URL(app.DEFAULT_URL_SERVICENOW);
            this._gitRepositoryUrl = new URL(app.DEFAULT_URL_GIT_REPOSITORY);
            this._currentItemClass = DEFAULT_CURRENT_ITEM_CLASS;
            this._selectedItemClass = DEFAULT_SELECTED_ITEM_CLASS;
            this._otherItemClass = DEFAULT_OTHER_ITEM_CLASS;
            this._topNavItems = [];
            let headElement = $document.find('head').first();
            let titleElement = headElement.find('title');
            if (titleElement.length == 0) {
                headElement.children().append(titleElement = $('<title></title>'));
                this._pageTitle = "";
            }
            else
                this._pageTitle = titleElement.text().trim();
            try {
                this._currentPageURL = new URL($window.location.href);
            }
            catch (_a) {
                // Just in case
                this._currentPageURL = new URL("http://localhost");
                this._currentPageURL.pathname = app.DEFAULT_PAGE_PATH;
            }
            let segments = (typeof this._currentPageURL.pathname !== "string" || this._currentPageURL.pathname.length == 0 || this._currentPageURL.pathname == "/") ? [] : this._currentPageURL.pathname.split("/").filter((n) => n.length > 0);
            if (segments.length == 0)
                segments = app.DEFAULT_PAGE_PATH.split("/");
            else if (!(/\.html?$/i).test(segments[segments.length - 1])) {
                let arr = app.DEFAULT_PAGE_PATH.split("/");
                segments.push(arr[arr.length - 1]);
            }
            this._currentPageURL.pathname = "/" + (this._relativePagePath = (segments.length == 1) ? segments[0] : segments.join("/"));
            if ((this._currentPageId = headElement.find('meta[name="app:pageId"]').attr("content")).length == 0)
                this._currentPageId = AppConfigDataService.toPageId(this._currentPageURL.pathname);
            if (this._pageTitle.length === 0)
                this._pageTitle = this._currentPageId;
            let svc = this;
            this._promise = $http.get("./appConfigData.json").then((result) => {
                if (typeof result.data !== "object")
                    sys.logResponse(result, $log, "Expected object response type, actual is " + (typeof result.data), true);
                else if (result.data == null) {
                    if (sys.toHttpResponseStatusCode(result) === sys.HttpResponseStatusCode.noContent)
                        $log.warn("Response object was null.");
                }
                else {
                    svc.applySettings(result.data);
                    if (this._pageTitle.trim() !== titleElement.text().trim())
                        titleElement.text(this._pageTitle);
                    return;
                }
                result;
                svc.applySettings();
            }, (reason) => {
                $log.error("Unexpected error making application configuration data request: " + ((typeof reason === "object") ? angular.toJson(reason) : reason));
            });
        }
        /**
         * Gets the current page ID.
         *
         * @returns {string} The value of the "content" attribute for the html meta tag with the name attribute of "app:pageId".
         * @memberof AppConfigDataService
         */
        currentPageId() { return this._currentPageId; }
        /**
         * Gets relative path to the current page.
         *
         * @returns {string}
         * @memberof AppConfigDataService
         */
        pagePath() { return this._relativePagePath; }
        /**
         * Gets or sets the title of the current page
         *
         * @param {string} [value] - The optional value to set for the page title.
         * @returns {string} The title of the current apge.
         * @memberof AppConfigDataService
         */
        pageTitle(value) {
            if (typeof value === "string" && value.trim().length > 0 && value !== this._pageTitle) {
                this._pageTitle = value;
                this.raiseTitleChanged();
            }
            return this._pageTitle;
        }
        /**
         * Gets the CSS class names to apply to navigation menu items that are ancestors of the item that represents the current page.
         *
         * @returns {ReadonlyArray<string>}
         * @memberof AppConfigDataService
         */
        currentItemClass() { return this._currentItemClass; }
        /**
         * Gets the CSS class names to apply to the navigation menu item that represents the current page.
         *
         * @returns {ReadonlyArray<string>}
         * @memberof AppConfigDataService
         */
        selectedItemClass() { return this._selectedItemClass; }
        /**
         * Gets the CSS class names to apply to the navigation menu item that do not represent the current page or any of its ancestors.
         *
         * @returns {ReadonlyArray<string>}
         * @memberof AppConfigDataService
         */
        otherItemClass() { return this._otherItemClass; }
        /**
         * Gets the navigation menu items that appear in the primary navigation menu.
         *
         * @returns {ReadonlyArray<NavigationItem>}
         * @memberof AppConfigDataService
         */
        topNavItems() { return this._topNavItems; }
        /**
         * Gets or sets the base URL for the target ServiceNow instance.
         *
         * @param {URL} [value] - Optionally specify new value for base URL of the target ServiceNow instance.
         * @returns {URL}
         * @memberof AppConfigDataService
         * @description Changes in this value cause any callbacks specified through {@link AppConfigDataService#onServiceNowUrlChanged} to be invoked.
         */
        serviceNowUrl(value) {
            if (typeof value === "object" && value !== null && value instanceof URL && this._serviceNowUrl.href !== value.href) {
                this._serviceNowUrl = value;
                this.raiseServiceNowUrlChanged();
            }
            return this._serviceNowUrl;
        }
        /**
         * Gets or sets the base URL for the GIT repository being used by the target ServiceNow instance.
         *
         * @param {URL} [value] - Optionally specify new value for base URL of the GIT repository being used by the target ServiceNow instance.
         * @returns {URL}
         * @memberof AppConfigDataService
         * @description Changes in this value cause any callbacks specified through {@link AppConfigDataService#onGitRepositoryUrlChanged} to be invoked.
         */
        gitRepositoryUrl(value) {
            if (typeof value === "object" && value !== null && value instanceof URL && this._gitRepositoryUrl.href !== value.href) {
                this._gitRepositoryUrl = value;
                this.raiseGitRepositoryUrlChanged();
            }
            return this._gitRepositoryUrl;
        }
        showMainModalPopupDialog(message, title, type, buttons, onClose, thisArg) {
            let callback = this._showMainModalPopupDialogCallback;
            if (typeof callback === "function") {
                if (arguments.length > 5)
                    callback(message, title, type, buttons, (result) => callback.call(thisArg, result));
                else
                    callback(message, title, type, buttons, onClose);
            }
        }
        onShowMainModalPopupDialog(callback, thisArg) {
            if (typeof callback !== "function")
                return;
            let showMainModalPopupDialogCallback = this._showMainModalPopupDialogCallback;
            if (arguments.length > 1) {
                if (typeof showMainModalPopupDialogCallback === "function")
                    this._showMainModalPopupDialogCallback = (message, title, type, buttons, onClose) => {
                        try {
                            showMainModalPopupDialogCallback(title, message, type, buttons, onClose);
                        }
                        finally {
                            callback.call(thisArg, message, title, type, buttons, onClose);
                        }
                    };
                else
                    this._showMainModalPopupDialogCallback = (message, title, type, buttons, onClose) => {
                        callback.call(thisArg, message, title, type, buttons, onClose);
                    };
            }
            else if (typeof showMainModalPopupDialogCallback === "function")
                this._showMainModalPopupDialogCallback = (message, title, type, buttons, onClose) => {
                    try {
                        showMainModalPopupDialogCallback(message, title, type, buttons, onClose);
                    }
                    finally {
                        callback(message, title, type, buttons, onClose);
                    }
                };
            else
                this._showMainModalPopupDialogCallback = callback;
        }
        /**
         * Closes the main modal popup dialog.
         *
         * @param {*} [result] - Result value to apply.
         * @memberof AppConfigDataService
         */
        closeMainModalPopupDialog(result) {
            let callback = this._hideMainModalPopupDialogCallback;
            if (typeof callback === "function")
                callback(result);
        }
        onCloseMainModalPopupDialog(callback, thisArg) {
            if (typeof callback !== "function")
                return;
            let hideMainModalPopupDialogCallback = this._hideMainModalPopupDialogCallback;
            if (arguments.length > 1) {
                if (typeof hideMainModalPopupDialogCallback === "function")
                    this._hideMainModalPopupDialogCallback = (result) => {
                        try {
                            hideMainModalPopupDialogCallback(result);
                        }
                        finally {
                            callback.call(thisArg, result);
                        }
                    };
                else
                    this._hideMainModalPopupDialogCallback = (result) => {
                        callback.call(thisArg, result);
                    };
            }
            else if (typeof hideMainModalPopupDialogCallback === "function")
                this._hideMainModalPopupDialogCallback = (result) => {
                    try {
                        hideMainModalPopupDialogCallback(result);
                    }
                    finally {
                        callback(result);
                    }
                };
            else
                this._hideMainModalPopupDialogCallback = callback;
        }
        onServiceNowUrlChanged(callback, thisArg) {
            if (typeof callback !== "function")
                return;
            let serviceNowUrlChangedCallback = this._serviceNowUrlChangedCallback;
            if (arguments.length > 1) {
                if (typeof serviceNowUrlChangedCallback === "function")
                    this._serviceNowUrlChangedCallback = (value) => { try {
                        serviceNowUrlChangedCallback(value);
                    }
                    finally {
                        callback.call(thisArg, value);
                    } };
                else
                    this._serviceNowUrlChangedCallback = (value) => { callback.call(thisArg, value); };
                callback.call(thisArg, this._serviceNowUrl);
                return;
            }
            if (typeof serviceNowUrlChangedCallback === "function")
                this._serviceNowUrlChangedCallback = (value) => { try {
                    serviceNowUrlChangedCallback(value);
                }
                finally {
                    callback(value);
                } };
            else
                this._serviceNowUrlChangedCallback = callback;
            callback(this._serviceNowUrl);
        }
        raiseServiceNowUrlChanged() {
            let callback = this._serviceNowUrlChangedCallback;
            if (typeof callback === "function")
                callback(this._serviceNowUrl);
        }
        onGitRepositoryUrlChanged(callback, thisArg) {
            if (typeof callback !== "function")
                return;
            let gitRepositoryUrlChangedCallback = this._gitRepositoryUrlChangedCallback;
            if (arguments.length > 1) {
                if (typeof gitRepositoryUrlChangedCallback === "function")
                    this._gitRepositoryUrlChangedCallback = (value) => { try {
                        gitRepositoryUrlChangedCallback(value);
                    }
                    finally {
                        callback.call(thisArg, value);
                    } };
                else
                    this._gitRepositoryUrlChangedCallback = (value) => { callback.call(thisArg, value); };
                callback.call(thisArg, this._serviceNowUrl);
                return;
            }
            if (typeof gitRepositoryUrlChangedCallback === "function")
                this._gitRepositoryUrlChangedCallback = (value) => { try {
                    gitRepositoryUrlChangedCallback(value);
                }
                finally {
                    callback(value);
                } };
            else
                this._gitRepositoryUrlChangedCallback = callback;
            callback(this._gitRepositoryUrl);
        }
        raiseGitRepositoryUrlChanged() {
            let callback = this._gitRepositoryUrlChangedCallback;
            if (typeof callback === "function")
                callback(this._gitRepositoryUrl);
        }
        onTitleChanged(callback, thisArg) {
            if (typeof callback !== "function")
                return;
            let pageTitleChangedCallback = this._pageTitleChangedCallback;
            if (arguments.length > 1) {
                if (typeof pageTitleChangedCallback === "function")
                    this._pageTitleChangedCallback = (value) => { try {
                        pageTitleChangedCallback(value);
                    }
                    finally {
                        callback.call(thisArg, value);
                    } };
                else
                    this._pageTitleChangedCallback = (value) => { callback.call(thisArg, value); };
                callback.call(thisArg, this._serviceNowUrl);
                return;
            }
            if (typeof pageTitleChangedCallback === "function")
                this._pageTitleChangedCallback = (value) => { try {
                    pageTitleChangedCallback(value);
                }
                finally {
                    callback(value);
                } };
            else
                this._pageTitleChangedCallback = callback;
            callback(this._pageTitle);
        }
        raiseTitleChanged() {
            let callback = this._pageTitleChangedCallback;
            if (typeof callback === "function")
                callback(this._pageTitle);
        }
        onSettingsLoaded(successCallback, errorCallback, thisArg) {
            let svc = this;
            this._promise.then(() => {
                if (arguments.length > 2)
                    successCallback.call(thisArg, svc);
                else
                    successCallback(svc);
            }, (reason) => {
                if (typeof errorCallback === "function") {
                    if (arguments.length > 2)
                        errorCallback.call(thisArg, reason, svc);
                    else
                        errorCallback(reason, svc);
                }
            });
        }
        /**
         * Creates an absolute ServiceNow URL from a relative URL.
         *
         * @param {string} [relativeUrl] - The relative ServiceNow URL.
         * @param {boolean} [toNav] - Whether to encapsulate the relative path within "/nav_to.do?uri=path".
         * @returns {string}
         * @memberof AppConfigDataService
         */
        createServiceNowUrl(relativeUrl, toNav) {
            if (typeof relativeUrl === "string" && relativeUrl.length > 0 && relativeUrl !== ".") {
                let url = new URL(relativeUrl, sys.makeDirectoryUrl(this._serviceNowUrl));
                if (toNav === true) {
                    let search = url.pathname.replace('/', '%2F');
                    url.pathname = '/nav_to.do';
                    if (typeof url.search === "string" && url.search.length > 0)
                        search += encodeURIComponent(url.search);
                    if (typeof url.hash === "string" && url.hash.length > 0) {
                        search += encodeURIComponent(url.hash);
                        url.hash = '';
                    }
                    url.search = "?uri=" + search;
                }
                return url.href;
            }
            return this._serviceNowUrl.href;
        }
        /**
         * Creates an absolute git URL from a relative URL.
         *
         * @param {string} [relativeUrl] - The relative GIT URL.
         * @returns {string}
         * @memberof AppConfigDataService
         */
        createGitRepositoryUrl(relativeUrl) {
            if (typeof relativeUrl === "string" && relativeUrl.length > 0 && relativeUrl !== ".")
                return (new URL(relativeUrl, sys.makeDirectoryUrl(this._gitRepositoryUrl))).href;
            return this._gitRepositoryUrl.href;
        }
        applySettings(appJson) {
            let settings = this._sessionStorage.getObject(app.StorageKey_UrlConfigSettings);
            if (typeof settings === "object" && settings !== null) {
                if (typeof settings.serviceNowUrl === "string" && settings.serviceNowUrl.length > 0)
                    this.serviceNowUrl(new URL(settings.serviceNowUrl));
                else if (typeof appJson === "object" && appJson !== null && typeof appJson.serviceNowUrl === "string" && appJson.serviceNowUrl.length > 0)
                    this.serviceNowUrl(new URL(appJson.serviceNowUrl));
                if (typeof settings.gitRepositoryUrl === "string" && settings.gitRepositoryUrl.length > 0)
                    this.gitRepositoryUrl(new URL(settings.gitRepositoryUrl));
                else if (typeof appJson === "object" && appJson !== null && typeof appJson.gitRepositoryUrl === "string" && appJson.gitRepositoryUrl.length > 0)
                    this.gitRepositoryUrl(new URL(appJson.gitRepositoryUrl));
            }
            else if (typeof appJson === "object" && appJson !== null) {
                if (typeof appJson.serviceNowUrl === "string" && appJson.serviceNowUrl.length > 0)
                    this.serviceNowUrl(new URL(appJson.serviceNowUrl));
                if (typeof appJson.gitRepositoryUrl === "string" && appJson.gitRepositoryUrl.length > 0)
                    this.gitRepositoryUrl(new URL(appJson.gitRepositoryUrl));
            }
            this._sessionStorage.setObject(app.StorageKey_UrlConfigSettings, settings);
            if (typeof appJson === "object" && appJson !== null && typeof appJson.navigation === "object" && appJson.navigation !== null)
                this._topNavItems = NavigationItem.createNavItems(this, appJson.navigation.items);
            else
                this._topNavItems = NavigationItem.createNavItems(this);
            let current = NavigationItem.findCurrentItem(this.topNavItems());
            if (sys.notNil(current) && current.pageTitle.length > 0)
                this.pageTitle(current.pageTitle);
            //this._sideNavBreadcrumbItems = NavigationItem.createSideNavBreadcrumbItems(current);
            //this._sideNavSiblingItems = NavigationItem.createSideNavSiblingItems(current);
        }
        /**
         * Converts a URL path to a fallback (default) page ID.
         *
         * @static
         * @param {string} path - The URL Path to convert.
         * @returns {string} The fallback page ID for the given URL path.
         * @memberof AppConfigDataService
         */
        static toPageId(path) {
            let arr;
            let i;
            if (typeof path !== "string" || path.length == 0 || path == "/" || (arr = path.split("/").filter((value) => value.length > 0)).length === 0)
                arr = app.DEFAULT_PAGE_PATH.split("/").filter((value) => value.length > 0);
            let n = arr.pop();
            if ((i = n.lastIndexOf(".")) < 1 || i === n.length - 1) {
                let a = app.DEFAULT_PAGE_PATH.split("/").filter((value) => value.length > 0);
                arr.push(n);
                n = a[a.length - 1];
                if ((i = n.lastIndexOf(".")) < 0) {
                    arr.push(n);
                    return arr.join("/");
                }
            }
            arr.push(n.substr(0, i));
            return (arr.length === 1) ? arr[0] : arr.join("/");
        }
    }
    app.AppConfigDataService = AppConfigDataService;
    app.appModule.factory(SERVICENAME_APP_CONFIG_DATA, ["sessionStorageService", "$http", '$log', '$document', '$window', AppConfigDataService]);
    class UrlInputFieldController {
        constructor($scope) {
            this.$scope = $scope;
            this._isEmpty = true;
            this._invalidFormat = false;
            let ctrl = this;
        }
        validate(value) {
            if (typeof value != "string" || value.trim().length === 0) {
                if (this.$scope.required === true) {
                    this.$scope.inputClass = [cssFeedbackClass.isInvalid];
                    this.$scope.messageClass = [cssAlertClass.alert, cssAlertClass.warning];
                    this.$scope.validationMessage = "URL not provided.";
                    this.$scope.isValid = false;
                }
                else {
                    this.$scope.isValid = true;
                    this.$scope.inputClass = [cssFeedbackClass.isValid];
                    this.$scope.messageClass = [];
                    this.$scope.validationMessage = "";
                    this.$scope.textModel = "";
                }
                return this.$scope.isValid;
            }
            let url;
            try {
                url = new URL(value);
            }
            catch (_a) {
                let i = value.indexOf('#');
                let hash;
                if (i > -1) {
                    hash = value.substr(i);
                    value = value.substr(0, i);
                }
                else
                    hash = '';
                let search;
                i = value.indexOf('?');
                if (i > -1) {
                    search = value.substr(i);
                    value = value.substr(0, i);
                }
                else
                    search = '';
                try {
                    url = new URL(((value.length > 0) ? new URL(value, 'http://tempuri.org') : new URL('http://tempuri.org')) + search + hash);
                }
                catch (err) {
                    this.$scope.inputClass = [cssFeedbackClass.isInvalid];
                    this.$scope.messageClass = [cssAlertClass.alert, cssAlertClass.danger];
                    this.$scope.validationMessage = "Invalid URL format: " + err;
                    this.$scope.isValid = false;
                    return false;
                }
                if (this.$scope.allowRelative !== true) {
                    this.$scope.inputClass = [cssFeedbackClass.isInvalid];
                    this.$scope.messageClass = [cssAlertClass.alert, cssAlertClass.danger];
                    this.$scope.validationMessage = "Relative URL not allowed";
                    this.$scope.isValid = false;
                    return false;
                }
            }
            if (url.hash.length > 0 && this.$scope.allowFragment !== true)
                this.$scope.validationMessage = "URL fragment not allowed";
            else if (url.search.length > 0 && this.$scope.allowQuery !== true)
                this.$scope.validationMessage = "URL query string not allowed";
            else if (url.pathname.length > 0 && url.pathname != "/" && this.$scope.allowPath !== true)
                this.$scope.validationMessage = "URL path not allowed";
            else {
                this.$scope.isValid = true;
                this.$scope.inputClass = [cssFeedbackClass.isValid];
                this.$scope.messageClass = [];
                this.$scope.validationMessage = "";
                this.$scope.textModel = value;
                return true;
            }
            this.$scope.inputClass = [cssFeedbackClass.isInvalid];
            this.$scope.messageClass = [cssAlertClass.alert, cssAlertClass.danger];
            this.$scope.isValid = false;
            return false;
        }
        static createDirective() {
            return {
                restrict: "E",
                controller: ['$scope', UrlInputFieldController],
                controllerAs: 'ctrl',
                link: (scope, element, attrs) => {
                    if (typeof scope.textBoxId !== "string" || scope.textBoxId.trim().length == 0) {
                        let i = 0;
                        let id = DIRECTIVE_NAME_URLINPUT + ":" + i++;
                        for (let e = $(id); sys.notNil(e) && e.length > 0; e = $(id))
                            id = DIRECTIVE_NAME_URLINPUT + ":" + i++;
                        scope.textBoxId = id;
                    }
                    scope.$watch('textModel', (value) => {
                        if (typeof value === "string" && value !== scope.text)
                            scope.text = value;
                    });
                    scope.$watch('text', (value) => { scope.ctrl.validate((typeof value !== "string") ? "" : value); });
                    scope.$watchGroup(["required", "allowRelative", "allowPath", "allowQuery", "allowFragment"], () => { scope.ctrl.validate((typeof scope.text !== "string") ? "" : scope.text); });
                },
                scope: {
                    textModel: '=',
                    isValid: '=?',
                    allowPath: '=?',
                    allowFragment: '=?',
                    allowQuery: '=?',
                    allowRelative: '=?',
                    required: '=?',
                    labelText: '@',
                    textBoxId: '@?'
                },
                template: '<label for="{{textBoxId}}">{{labelText}}</label><input type="text" ng-class="inputClass" id="{{textBoxId}}" ng-model="text" /><div ng-class="messageClass" ng-hide="isValid">{{validationMessage}}</div>'
            };
        }
    }
    app.appModule.directive(DIRECTIVE_NAME_URLINPUT, UrlInputFieldController.createDirective);
    /**
     * Implements the controller for the appContent directive
     *
     * @class AppContentController
     * @implements {ng.IController}
     */
    class AppContentController {
        /**
         * Creates an instance of AppContentController.
         *
         * @param {IAppContentDirectiveScope} $scope - The scope for the current appContent directive.
         * @param {ng.ILogService} $log - The $log service.
         * @param {ng.IWindowService} $window - The $window service.
         * @param {AppConfigDataService} appConfigData - The appConfigData service.
         * @memberof AppContentController
         */
        constructor($scope, $log, $window, appConfigData) {
            this.$scope = $scope;
            this.$log = $log;
            this.$window = $window;
            this.appConfigData = appConfigData;
            $scope.serviceNowUrlIsValid = $scope.gitRepositoryUrlIsValid = $scope.setupParametersAreInvalid = true;
            $scope.setupParametersDialogVisible = $scope.showSideMenu = $scope.showBreadcrumbLinks = $scope.showSideNavItems = $scope.showSideNavHeading = $scope.showCurrentItem = $scope.popupDialogVisible = false;
            $scope.topNavItems = $scope.sideNavBreadcrumbItems = $scope.sideNavItems = $scope.followingSideNavItems = [];
            $scope.popupDialogButtons = [];
            $scope.sideNavHeading = $scope.popupDialogTitle = $scope.popupDialogMessage = '';
            $scope.pageTitle = appConfigData.pageTitle();
            $scope.serviceNowUrl = appConfigData.serviceNowUrl().href;
            $scope.gitRepositoryUrl = appConfigData.gitRepositoryUrl().href;
            $scope.popupDialogBodyClass = [];
            this.updateMainSectionClass();
            $scope.$watchGroup(['serviceNowUrlIsValid', 'gitRepositoryBaseUrlIsValid'], () => {
                let areValid = $scope.serviceNowUrlIsValid && $scope.gitRepositoryBaseUrlIsValid;
                if (areValid !== $scope.setupParametersAreInvalid)
                    $scope.setupParametersAreInvalid = areValid;
            });
            appConfigData.onShowMainModalPopupDialog((message, title, type, buttons, onClose) => {
                if ($scope.popupDialogVisible) {
                    $('#mainModalPopupDialog').modal('hide');
                    $scope.popupDialogVisible = false;
                    if (typeof $scope.onPopupDialogClose === "function")
                        $scope.onPopupDialogClose();
                }
                $scope.popupDialogMessage = message;
                $scope.onClose = onClose;
                if (typeof buttons !== "object" || buttons === null || ($scope.popupDialogButtons = buttons.filter(b => typeof b === "object" && b !== null)).length === 0)
                    $scope.popupDialogButtons = [{ displayText: "Close", onClick: (event) => { $scope.appContentController.closePopupDialog(event); } }];
                else
                    $scope.popupDialogButtons.forEach((value) => {
                        value.onClick = (event) => $scope.appContentController.closePopupDialog(event, value.value);
                    });
                if (sys.isNilOrWhiteSpace(title)) {
                    switch (type) {
                        case 'warning':
                            $scope.popupDialogTitle = 'Warning';
                            break;
                        case 'danger':
                            $scope.popupDialogTitle = 'Critical';
                            break;
                        case 'success':
                            $scope.popupDialogTitle = 'Success';
                            break;
                        default:
                            $scope.popupDialogTitle = 'Notice';
                            type = "info";
                            break;
                    }
                }
                else
                    $scope.popupDialogTitle = title;
                $scope.popupDialogBodyClass = ['modal-body', 'alert', 'alert-' + type];
                $('#mainModalPopupDialog').modal('show');
                $scope.setupParametersDialogVisible = true;
            });
            appConfigData.onCloseMainModalPopupDialog((result) => {
                if ($scope.popupDialogVisible) {
                    $('#mainModalPopupDialog').modal('hide');
                    $scope.popupDialogVisible = false;
                    if (typeof $scope.onPopupDialogClose === "function") {
                        if (arguments.length > 0)
                            $scope.onPopupDialogClose(result);
                        else
                            $scope.onPopupDialogClose();
                    }
                }
            });
            appConfigData.onTitleChanged((value) => { $scope.pageTitle = value; });
            appConfigData.onServiceNowUrlChanged((value) => { $scope.serviceNowUrl = value.href; });
            appConfigData.onGitRepositoryUrlChanged((value) => { $scope.gitRepositoryBaseUrl = value.href; });
            appConfigData.onSettingsLoaded(() => {
                $scope.topNavItems = appConfigData.topNavItems();
                let currentNavItem = NavigationItem.findCurrentItem($scope.topNavItems);
                if (sys.isNil(currentNavItem)) {
                    $scope.showBreadcrumbLinks = $scope.showSideMenu = $scope.showSideNavHeading = $scope.showSideNavItems = $scope.showCurrentItem = false;
                    $scope.sideNavHeading = '';
                    $scope.sideNavBreadcrumbItems = $scope.sideNavItems = $scope.followingSideNavItems = [];
                    $scope.currentNavItem = undefined;
                }
                else {
                    if (currentNavItem.isNestedNavItem) {
                        $scope.showBreadcrumbLinks = ($scope.sideNavBreadcrumbItems = currentNavItem.getBreadcrumbLinks()).length > 0;
                        let parentNavItem = currentNavItem.parentNavItem;
                        if (currentNavItem.hasSiblingNavItem) {
                            $scope.showSideMenu = $scope.showSideNavItems = $scope.showCurrentItem = true;
                            $scope.sideNavItems = currentNavItem.precedingSiblings();
                            $scope.followingSideNavItems = currentNavItem.followingSiblings();
                            $scope.showSideNavHeading = ($scope.sideNavHeading = parentNavItem.sideNavHeading.trim()).length > 0;
                            $scope.currentNavItem = currentNavItem;
                        }
                        else {
                            $scope.showSideNavItems = $scope.showSideNavHeading = $scope.showCurrentItem = false;
                            $scope.followingSideNavItems = $scope.sideNavItems = [];
                            $scope.showSideMenu = $scope.showBreadcrumbLinks;
                            $scope.sideNavHeading = '';
                            $scope.currentNavItem = undefined;
                        }
                    }
                    else {
                        $scope.currentNavItem = undefined;
                        $scope.showBreadcrumbLinks = $scope.showCurrentItem = false;
                        $scope.sideNavBreadcrumbItems = $scope.followingSideNavItems = [];
                        $scope.showSideMenu = $scope.showSideNavItems = currentNavItem.hasChildNavItem;
                        if ($scope.showSideMenu) {
                            $scope.showSideNavHeading = ($scope.sideNavHeading = currentNavItem.sideNavHeading.trim()).length > 0;
                            $scope.sideNavItems = currentNavItem.childNavItems;
                        }
                        else {
                            $scope.sideNavItems = [];
                            $scope.sideNavHeading = '';
                            $scope.showSideNavHeading = $scope.showSideNavItems = false;
                        }
                    }
                }
                this.updateMainSectionClass();
            }, (reason) => {
                $log.error("Error loading application settings: " + ((typeof reason === "object") ? angular.toJson(reason) : reason));
                $window.alert("Unexpected error loading application settings. See browser log for more detail.");
            }, this);
        }
        updateMainSectionClass() {
            if (this.$scope.showSideMenu)
                this.$scope.mainSectionClass = ["container-fluid", "col-8", "col-lg-9"];
            else
                this.$scope.mainSectionClass = ["container-fluid", "col-12"];
        }
        /**
         * Opens the edit dialog for setup parameters.
         *
         * @param {JQueryInputEventObject} [event] - The event object.
         * @memberof AppContentController
         */
        openSetupParametersEditDialog(event) {
            sys.preventEventDefault(event);
            if (!this.$scope.setupParametersDialogVisible) {
                $("#setupParametersDialog").modal('show');
                this.$scope.setupParametersDialogVisible = true;
            }
        }
        /**
         * Closes the edit dialog for setup parameters.
         *
         * @param {JQueryInputEventObject} [event] - The event object.
         * @param {boolean} [accept] - Whether to accept any validated changes that were made.
         * @memberof AppContentController
         */
        closeSetupParametersEditDialog(event, accept) {
            sys.preventEventDefault(event);
            if (this.$scope.setupParametersDialogVisible) {
                $("#setupParametersDialog").modal('hide');
                this.$scope.setupParametersDialogVisible = false;
            }
        }
        /**
         * Closes the main modal popup dialog.
         *
         * @param {JQueryInputEventObject} [event] - The event object.
         * @param {*} [result] - The result value use as the the modal dialog result.
         * @memberof AppContentController
         */
        closePopupDialog(event, result) {
            sys.preventEventDefault(event);
            if (this.$scope.popupDialogVisible) {
                $("#mainModalPopupDialog").modal('hide');
                this.$scope.popupDialogVisible = false;
                if (typeof this.$scope.onPopupDialogClose === "function") {
                    if (arguments.length > 1)
                        this.$scope.onPopupDialogClose(result);
                    else
                        this.$scope.onPopupDialogClose();
                }
            }
        }
        $onInit() { }
    }
    app.AppContentController = AppContentController;
    app.appModule.directive(DIRECTIVE_NAME_APPCONTENT, () => {
        return {
            controller: ['$scope', '$log', '$window', SERVICENAME_APP_CONFIG_DATA, AppContentController],
            controllerAs: 'appContentController',
            restrict: "E",
            scope: true,
            templateUrl: 'Template/appContent.htm'
        };
    });
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
                    if (sys.notNil(value))
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
                    if (sys.notNil(value))
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
                        if (sys.notNil(value))
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
                        if (sys.notNil(value))
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
                    this.$window.sessionStorage.setItem(key, angular.toJson(value, false));
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
    class CopyToClipboardService {
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
    app.CopyToClipboardService = CopyToClipboardService;
    app.appModule.service("copyToClipboardService", ["$window", CopyToClipboardService]);
    // #endregion
    // #region copyToClipboardButton directive <copy-to-clipboard-button target="id" class="" success-message=""></copy-to-clipboard-button>
    const btnCssClassRe = /(^|\s)btn(\s|$)/g;
    const btnStyleCssClassRe = /(^|\s)btn-\S/g;
    const paddingCssClassRe = /(^|\s)p(l|t|r|b)?-\S/g;
    class ClipboardCopyController {
        constructor($scope, copyToClipboardService) {
            this.$scope = $scope;
            this.copyToClipboardService = copyToClipboardService;
        }
        get cssClass() { return this._cssClass; }
        get targetId() { return this._targetId; }
        copyToClipboard() { this.copyToClipboardService.copy($("#" + this._targetId), this._successMessage); }
        static createDirective() {
            return {
                restrict: "E",
                controllerAs: "clipboardCopyController",
                controller: ["$scope", "copyToClipboardService", ClipboardCopyController],
                replace: true,
                template: '<button ng-click="clipboardCopyController.copyToClipboard()" onclick="return false;"><svg class="fill-light stroke-dark" width="16" height="16"><use xlink:href="images/icons.svg#clipboard"></use></svg></button>',
                link: (scope, element, attr, controller) => {
                    scope.clipboardCopyController.initialize(attr.target, attr.successMessage, attr.class);
                }
            };
        }
        initialize(targetId, successMessage, cssClass) {
            this._targetId = targetId;
            this._successMessage = successMessage;
            if (typeof cssClass === "string" && (cssClass = cssClass.trim()).length > 0) {
                this._cssClass = sys.unique(cssClass.split(sys.whitespaceRe));
                if (this._cssClass.indexOf('btn') < 0)
                    this._cssClass.unshift('btn');
                if (!btnStyleCssClassRe.test(cssClass)) {
                    this._cssClass.push("btn-light");
                    this._cssClass.push("btn-outline-dark");
                }
                if (!paddingCssClassRe.test(cssClass))
                    this._cssClass.push("p-1");
            }
            else
                this._cssClass = ['btn', 'btn-light', 'btn-outline-dark', 'p-1'];
        }
        $onInit() { }
    }
    app.appModule.directive("copyToClipboardButton", ClipboardCopyController.createDirective);
    class SnInstanceLinkController {
        constructor($scope, appConfigData) {
            $scope.href = '';
            appConfigData.onServiceNowUrlChanged((value) => {
                if (typeof $scope.relativeUrlModel === "string" && $scope.relativeUrlModel.length > 0)
                    $scope.href = appConfigData.createServiceNowUrl($scope.relativeUrlModel, sys.asBoolean($scope.toNav));
                else
                    $scope.href = appConfigData.createServiceNowUrl($scope.relativeUrl, sys.asBoolean($scope.toNav));
            });
            $scope.$watchGroup(['relativeUrlModel', 'relativeUrl', 'toNav'], () => {
                if (typeof $scope.relativeUrlModel === "string" && $scope.relativeUrlModel.length > 0)
                    $scope.href = appConfigData.createServiceNowUrl($scope.relativeUrlModel, sys.asBoolean($scope.toNav));
                else
                    $scope.href = appConfigData.createServiceNowUrl($scope.relativeUrl, sys.asBoolean($scope.toNav));
            });
        }
    }
    app.appModule.directive("snInstanceLink", () => {
        return {
            restrict: "E",
            controller: ['$scope', 'appConfigData', SnInstanceLinkController],
            link: (scope, element, attrs) => {
                if (typeof attrs.target !== "string")
                    attrs.$set("target", "_blank");
            },
            scope: {
                relativeUrl: "@?",
                relativeUrlModel: "=?",
                toNav: "@?"
            },
            replace: true,
            template: '<a ng-href="{{href}}" ng-transclude></a>',
            transclude: true
        };
    });
    class GitnInstanceLinkController {
        constructor($scope, appConfigData) {
            $scope.linkText = $scope.href = '';
            appConfigData.onGitRepositoryUrlChanged((value) => {
                if (typeof $scope.relativeUrlModel === "string" && $scope.relativeUrlModel.length > 0)
                    $scope.href = appConfigData.createGitRepositoryUrl($scope.relativeUrlModel);
                else
                    $scope.href = appConfigData.createGitRepositoryUrl($scope.relativeUrl);
            });
            $scope.$watchGroup(['relativeUrlModel', 'relativeUrl'], () => {
                if (typeof $scope.relativeUrlModel === "string" && $scope.relativeUrlModel.length > 0)
                    $scope.href = appConfigData.createGitRepositoryUrl($scope.relativeUrlModel);
                else
                    $scope.href = appConfigData.createGitRepositoryUrl($scope.relativeUrl);
            });
            $scope.$watchGroup(['textModel', 'text', 'href'], () => {
                $scope.linkText = (typeof $scope.textModel === "string" && $scope.textModel.length > 0) ? $scope.textModel : ((typeof $scope.text === "string" && $scope.text.length > 0) ? $scope.text : $scope.href);
            });
            $scope.linkText = (typeof $scope.textModel === "string" && $scope.textModel.length > 0) ? $scope.textModel : ((typeof $scope.text === "string" && $scope.text.length > 0) ? $scope.text : $scope.href);
        }
    }
    app.appModule.directive("gitInstanceLink", () => {
        return {
            restrict: "E",
            controller: ['$scope', 'appConfigData', GitnInstanceLinkController],
            link: (scope, element, attrs) => {
                if (typeof attrs.target !== "string")
                    attrs.$set("target", "_blank");
            },
            scope: {
                relativeUrl: "@?",
                relativeUrlModel: "=?",
                text: "@?",
                textModel: "=?"
            },
            replace: true,
            template: '<a ng-href="{{href}}">{{linkText}}</a>'
        };
    });
    // #endregion
    // #region pageTitle directive - <title page-title></title>
    class PageTitleDirectiveController {
        constructor($element, appConfigData) { appConfigData.onTitleChanged((value) => { $element.text(value); }); }
    }
    app.appModule.directive("gitInstanceLink", () => {
        return {
            restrict: "A",
            controller: ['$element', 'appConfigData', PageTitleDirectiveController]
        };
    });
    app.appModule.directive("externalLink", () => {
        return {
            restrict: "E",
            transclude: true,
            scope: {
                relativeUriExpression: "=?",
                anchorClassExpression: "=?"
            },
            template: '<a ng-href="{{href}}" ng-class="anchorClass" target="_blank"><ng-transclude></ng-transclude></a>',
            link: (scope, element, attr, controller) => {
                let href = (typeof attr.ngHref === "string") ? attr.ngHref : ((typeof attr.href === "string") ? attr.href : "");
                let relativeUri = (typeof scope.relativeUriExpression === "string") ? scope.relativeUriExpression : ((typeof attr.relativeUri === "string") ? attr.relativeUri : "");
                if (relativeUri.length > 0) {
                    if (href.length == 0)
                        scope.href = (relativeUri.length > 0) ? relativeUri : "#";
                    else {
                        let url;
                        try {
                            url = new URL(relativeUri, href);
                        }
                        catch ( /* okay to ignore */_a) { /* okay to ignore */ }
                        if (typeof url === "object" && url !== null)
                            scope.href = url.href;
                        else
                            scope.href = href + relativeUri;
                    }
                }
                else
                    scope.href = (href.length == 0) ? "#" : href;
                let n;
                let c;
                if (typeof attr.anchorClass === "string" && (c = attr.anchorClass.trim()).length > 0) {
                    n = c.split(/\s+/g);
                    if (typeof scope.anchorClassExpression === "string" && (c = scope.anchorClassExpression.trim()).length > 0)
                        n = n.concat(c.split(/\s+/g));
                }
                else if (typeof scope.anchorClassExpression === "string" && (c = scope.anchorClassExpression.trim()).length > 0)
                    n = c.split(/\s+/g);
                else {
                    scope.anchorClass = [];
                    return;
                }
                scope.anchorClass = sys.unique(n, (x, y) => x === y);
            }
        };
    });
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
        constructor(name, properties, description) {
            this.name = name;
            description = ((typeof description !== "string") || (description = description.trim()).length == 0) ? "\"" + name + "\" scheme" : description;
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
    }
    /**
     * File Transfer protocol
     **/
    SchemaProperties.uriScheme_ftp = new SchemaProperties("ftp", { supportsQuery: false, supportsFragment: false, defaultPort: 21 }, "File Transfer protocol");
    /**
     * File Transfer protocol (secure)
     **/
    SchemaProperties.uriScheme_ftps = new SchemaProperties("ftps", { supportsQuery: false, supportsFragment: false, defaultPort: 990 }, "File Transfer protocol (secure)");
    /**
     * Secure File Transfer Protocol
     **/
    SchemaProperties.uriScheme_sftp = new SchemaProperties("sftp", { supportsQuery: false, supportsFragment: false, defaultPort: 22 }, "Secure File Transfer Protocol");
    /**
     * Hypertext Transfer Protocol
     **/
    SchemaProperties.uriScheme_http = new SchemaProperties("http", { defaultPort: 80 }, "Hypertext Transfer Protocol");
    /**
     * Hypertext Transfer Protocol (secure)
     **/
    SchemaProperties.uriScheme_https = new SchemaProperties("https", { defaultPort: 443 }, "Hypertext Transfer Protocol (secure)");
    /**
     * Gopher protocol
     **/
    SchemaProperties.uriScheme_gopher = new SchemaProperties("gopher", { defaultPort: 70 }, "Gopher protocol");
    /**
     * Electronic mail address
     **/
    SchemaProperties.uriScheme_mailto = new SchemaProperties("mailto", { schemeSeparator: ":" }, "Electronic mail address");
    /**
     * USENET news
     **/
    SchemaProperties.uriScheme_news = new SchemaProperties("news", { supportsCredentials: false, requiresHost: false, supportsPort: false, schemeSeparator: ":" }, "USENET news");
    /**
     * USENET news using NNTP access
     **/
    SchemaProperties.uriScheme_nntp = new SchemaProperties("nntp", { defaultPort: 119 }, "USENET news using NNTP access");
    /**
     * Reference to interactive sessions
     **/
    SchemaProperties.uriScheme_telnet = new SchemaProperties("telnet", { supportsPath: false, supportsQuery: false, supportsFragment: false, supportsCredentials: false, defaultPort: 23 }, "Reference to interactive sessions");
    /**
     * Wide Area Information Servers
     **/
    SchemaProperties.uriScheme_wais = new SchemaProperties("wais", { defaultPort: 443 }, "Wide Area Information Servers");
    /**
     * Host-specific file names
     **/
    SchemaProperties.uriScheme_file = new SchemaProperties("file", { supportsQuery: false, supportsFragment: false, supportsCredentials: false, requiresHost: false, supportsPort: false }, "Host-specific file names");
    /**
     * Net Pipe
     **/
    SchemaProperties.uriScheme_netPipe = new SchemaProperties("net.pipe", { supportsPort: false }, "Net Pipe");
    /**
     * Net-TCP
     **/
    SchemaProperties.uriScheme_netTcp = new SchemaProperties("net.tcp", { defaultPort: 808 }, "Net-TCP");
    /**
     * Lightweight Directory Access Protocol
     **/
    SchemaProperties.uriScheme_ldap = new SchemaProperties("ldap", { defaultPort: 389 }, "Lightweight Directory Access Protocol");
    /**
     * Secure Shell
     **/
    SchemaProperties.uriScheme_ssh = new SchemaProperties("ssh", { defaultPort: 22 }, "Secure Shell");
    /**
     * GIT Respository
     **/
    SchemaProperties.uriScheme_git = new SchemaProperties("git", { supportsQuery: false, supportsFragment: false, defaultPort: 9418 }, "GIT Respository");
    /**
     * Uniform Resource notation
     **/
    SchemaProperties.uriScheme_urn = new SchemaProperties("urn", { supportsCredentials: false, requiresHost: false, supportsPort: false, schemeSeparator: ":" }, "Uniform Resource notation");
    app.SchemaProperties = SchemaProperties;
    class QueryParameters {
        constructor(params) {
            throw new Error("Not Implemented");
            // TODO: Implement QueryParameters constructor.
        }
        append(name, value) {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.append().
        }
        delete(name) {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.delete().
        }
        get(name) {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.get().
        }
        getAll(name) {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.getAll().
        }
        has(name) {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.has().
        }
        set(name, value) {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.set().
        }
        sort() {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.sort().
        }
        forEach(callbackfn, thisArg) {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.forEach().
        }
        [Symbol.iterator]() {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.iterator().
        }
        entries() {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.entries().
        }
        keys() {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.keys().
        }
        values() {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.values().
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
            if ((typeof baseUri === "undefined") || ((typeof baseUri !== "string") && ((typeof baseUri !== "object") || baseUri === null))) {
                if ((typeof relativeUri === "undefined") || ((typeof relativeUri !== "string") && ((typeof relativeUri !== "object") || relativeUri === null)))
                    baseUri = "";
                else
                    baseUri = relativeUri;
                relativeUri = undefined;
            }
            if (typeof baseUri === "string") {
                // TODO: Implement QueryParameters constructor(string, *).
            }
            else if (baseUri instanceof Uri) {
                this._href = baseUri._href;
                this._origin = baseUri._origin;
                this._schemeName = baseUri._href;
                this._schemeSeparator = baseUri._schemeSeparator;
                this._username = baseUri._username;
                this._password = baseUri._password;
                this._hostname = baseUri._hostname;
                this._port = baseUri._port;
                this._portnumber = baseUri._portnumber;
                this._pathname = baseUri._pathname;
                this._search = baseUri._search;
                this._searchParams = new QueryParameters(baseUri._searchParams);
                this._hash = baseUri._hash;
            }
            else {
                // TODO: Implement QueryParameters constructor(Uri, *).
            }
            // TODO: Implement QueryParameters constructor(*, relative).
        }
        // TODO: Implement QueryParameters.href.
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
        // TODO: Implement QueryParameters.protocol.
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
        // TODO: Implement QueryParameters.schemeName.
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
        // TODO: Implement QueryParameters.schemeSeparator.
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
        // TODO: Implement QueryParameters.username.
        get username() { return this._username; }
        ;
        set username(value) { this._username = value; }
        // TODO: Implement QueryParameters.password.
        get password() { return this._password; }
        ;
        set password(value) { this._password = value; }
        // TODO: Implement QueryParameters.host.
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
        // TODO: Implement QueryParameters.hostname.
        get hostname() { return this._hostname; }
        ;
        set hostname(value) { this._hostname = value; }
        // TODO: Implement QueryParameters.port.
        get port() { return this._port; }
        ;
        set port(value) { this._port = value; }
        // TODO: Implement QueryParameters.pathname.
        get pathname() { return this._pathname; }
        ;
        set pathname(value) { this._pathname = value; }
        // TODO: Implement QueryParameters.search.
        get search() { return this._search; }
        ;
        set search(value) { this._search = value; }
        // TODO: Implement QueryParameters.searchParams.
        get searchParams() { return this._searchParams; }
        set searchParams(value) { this._searchParams = value; }
        // TODO: Implement QueryParameters.hash.
        get hash() { return this._hash; }
        set hash(value) { this._hash = value; }
        // TODO: Implement QueryParameters.toJSON().
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
    // #region notificationMessageService
    let NotificationMessageType;
    (function (NotificationMessageType) {
        NotificationMessageType[NotificationMessageType["error"] = 0] = "error";
        NotificationMessageType[NotificationMessageType["warning"] = 1] = "warning";
        NotificationMessageType[NotificationMessageType["info"] = 2] = "info";
    })(NotificationMessageType = app.NotificationMessageType || (app.NotificationMessageType = {}));
    class NotificationMessageService {
        constructor($log) {
            this.$log = $log;
            this._messages = [];
        }
        addNotificationMessage(message, title, type) {
            if (typeof title === "number") {
                type = title;
                title = undefined;
            }
            if (typeof type !== "number" || (type !== NotificationMessageType.error && type !== NotificationMessageType.warning && type !== NotificationMessageType.info))
                type = NotificationMessageType.info;
            this._messages.push({
                type: type,
                title: (typeof title !== "string" || (title = title.trim()).length == 0) ? (type === NotificationMessageType.error) ? "Error" : ((type === NotificationMessageType.warning) ? "Warning" : "Notice") : title,
                message: message
            });
        }
        getMessages(type, clear) {
            let result = this._messages;
            if (typeof type === "boolean")
                clear = type;
            else if (typeof type === "number" && (type === NotificationMessageType.error || type === NotificationMessageType.warning || type === NotificationMessageType.info)) {
                if (clear === true)
                    this._messages = result.filter((item) => item.type !== type);
                return result.filter((item) => item.type === type);
            }
            if (clear === true)
                this._messages = [];
            return result;
        }
    }
    app.NotificationMessageService = NotificationMessageService;
    app.appModule.factory("notificationMessageService", ["$log", NotificationMessageService]);
    // #endregion
})(app || (app = {}));
