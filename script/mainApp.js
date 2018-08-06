"use strict";
var navSettingsJSON;
(function (navSettingsJSON) {
    function isContainer(item) { return typeof (item.navItems) == "object" && Array.isArray(item.navItems); }
    navSettingsJSON.isContainer = isContainer;
    function isPageItem(item) { return typeof (item.pageUrl) == "string"; }
    navSettingsJSON.isPageItem = isPageItem;
    function isLinkItem(item) { return typeof (item.linkUrl) == "string"; }
    navSettingsJSON.isLinkItem = isLinkItem;
})(navSettingsJSON || (navSettingsJSON = {}));
var menuControllers;
(function (menuControllers) {
    class NavItem {
        constructor(source, parent, precedingNode) {
            this.__NavItem__uniqueId = Symbol();
            this._parent = parent;
            this._id = source.id;
            this._scope = (((NavItem.isNavItem(parent)) ? parent._scope : parent).$new(true));
            this._scope.controller = this;
            this._scope.isActive = false;
            this._scope.isSelected = false;
            this._scope.level = (NavItem.isNavItem(parent)) ? parent.level + 1 : 0;
            this._scope.linkClass = "nav-link text-light";
            this._scope.itemClass = "nav-item border border-secondary bg-dark";
            this._scope.title = source.title;
            this._scope.heading = (typeof (source.heading) == "string" && source.heading.length > 0) ? source.heading : source.title;
            this._scope.description = (typeof (source.description) == "string") ? source.description : "";
            if (navSettingsJSON.isPageItem(source)) {
                this._scope.url = source.pageUrl;
                this._scope.isPage = true;
            }
            else {
                this._scope.isPage = false;
                this._scope.url = (navSettingsJSON.isLinkItem(source)) ? source.linkUrl : "";
            }
            this._navItems = (navSettingsJSON.isContainer(source)) ? NavItem.import(source.navItems, this) : [];
            this._scope.navItems = this._navItems.map(function (value) { return value._scope; });
            this._precedingNode = precedingNode;
            if (typeof (precedingNode) != "undefined") {
                this._followingNode = precedingNode.followingNode;
                precedingNode._followingNode = this;
                if (typeof (this._followingNode) != "undefined")
                    this._followingNode._precedingNode = this;
            }
        }
        get id() { return this._id; }
        get scope() { return this._scope; }
        get parent() { return this._parent; }
        get title() { return this._scope.title; }
        get description() { return this._scope.description; }
        get heading() { return this._scope.heading; }
        get url() { return this._scope.url; }
        get isPage() { return this._scope.isPage; }
        get isActive() { return this._scope.isActive; }
        set isActive(value) {
            if (this._scope.isActive == value || !this._scope.isPage)
                return;
            let parent = this._parent;
            let current = this;
            if (value) {
                let oldScope = this._parent.activeNavItem;
                if (typeof (oldScope) != "undefined" && oldScope.controller.__NavItem__uniqueId == this.__NavItem__uniqueId)
                    return;
                while (NavItem.isNavItem(parent)) {
                    parent._scope.linkClass = "nav-link light";
                    parent._scope.itemClass = "nav-item border active border-secondary bg-light";
                    parent._scope.isSelected = true;
                    parent._scope.current = current._scope;
                    current = parent;
                    parent = parent._parent;
                }
                parent.current = current._scope;
                parent.sideNavNodes = current._scope.navItems;
                parent.includeUrl = "pages/" + this._scope.url;
                parent.titleText = this.title;
                parent.descriptionText = this.heading;
                parent.activeNavItem = this._scope;
                this._scope.linkClass = "nav-link light";
                this._scope.itemClass = "nav-item border active border-secondary bg-light";
                if (typeof (oldScope) != "undefined")
                    oldScope.controller.isActive = false;
            }
            else {
                this._scope.linkClass = "nav-link text-light";
                this._scope.itemClass = "nav-item border border-secondary bg-dark";
                while (NavItem.isNavItem(parent)) {
                    if (typeof (parent._scope.current) == "undefined" || parent._scope.current.controller.__NavItem__uniqueId !== current.__NavItem__uniqueId)
                        break;
                    parent._scope.isSelected = false;
                    parent._scope.current = undefined;
                    parent._scope.linkClass = "nav-link text-light";
                    parent._scope.itemClass = "nav-item border border-secondary bg-dark";
                    current = parent;
                    parent = parent._parent;
                }
                if (!NavItem.isNavItem(parent))
                    parent.current = undefined;
            }
            this._scope.isActive = value;
            this._scope.isSelected = value;
        }
        get isSelected() { return this._scope.isSelected; }
        get level() { return this._scope.level; }
        get precedingNode() { return this._precedingNode; }
        get followingNode() { return this._followingNode; }
        get navItems() { return this._navItems; }
        get activeNavItem() { return this._parent.activeNavItem; }
        set activeNavItem(scope) {
            if (typeof (scope) == "undefined")
                this.isActive = false;
            else
                scope.isActive = true;
        }
        isAncestor(other) {
            let parent = this._parent;
            if (NavItem.isNavItem(other)) {
                while (NavItem.isNavItem(parent)) {
                    if (parent.__NavItem__uniqueId == other.__NavItem__uniqueId)
                        return true;
                    parent = parent._parent;
                }
            }
            else {
                while (NavItem.isNavItem(parent))
                    parent = parent._parent;
                return parent.navItems.filter(function (n) {
                    return n.controller.__NavItem__uniqueId === this.__NavItem__uniqueId;
                }, this).length > 0;
            }
            return false;
        }
        raiseActivate() { this.isActive = true; return false; }
        equals(other) { return NavItem.isNavItem(other) && other.__NavItem__uniqueId === this.__NavItem__uniqueId; }
        static import(source, parent) {
            let precedingNode;
            return source.map(function (n) {
                precedingNode = new NavItem(n, parent, precedingNode);
                return precedingNode;
            });
        }
        static isNavItem(node) { return typeof (node.__NavItem__uniqueId) == "symbol"; }
        static getNavItemById(parent, idValue, ...idValues) {
            idValues = (typeof (idValues) != "undefined" && idValues.length > 0) ? ((typeof (idValue) == "string") ? [idValue] : idValue).concat(idValues) : (typeof (idValue) == "string") ? [idValue] : idValue;
            if ((idValues = idValues.map(function (v) { return v.trim(); }).filter(function (v) { return v.length > 0; })).length > 0) {
                let initialId = (idValues.shift());
                let matches = ((parent instanceof NavItem) ? parent._navItems : ((!Array.isArray(parent)) ? parent.navItems.map(function (v) { return v.controller; }) : parent))
                    .filter(function (v) { return v._id === initialId; });
                if (matches.length > 0) {
                    if (idValues.length > 0) {
                        matches = idValues.reduce(function (pv, cv) {
                            if (pv.length > 0)
                                return (pv[0]._navItems.length == 0) ? pv[0]._navItems : pv[0]._navItems.filter(function (v) { return v.id === cv; });
                            return pv;
                        }, matches);
                        if (matches.length == 0)
                            return;
                    }
                    return matches[0];
                }
            }
        }
    }
    menuControllers.NavItem = NavItem;
    function initializeTopLevelScope(scope, http) {
        scope.navItems = [];
        scope.sideNavNodes = [];
        scope.titleText = "";
        scope.descriptionText = "";
        http.get("navSettings.json").then(function (response) {
            scope.navItems = NavItem.import(response.data.navItems, scope).map(function (item) { return item.scope; });
            if (scope.navItems.length > 0)
                scope.navItems[0].controller.isActive = true;
        });
    }
    menuControllers.initializeTopLevelScope = initializeTopLevelScope;
    function isContainerScope(scope) {
        return typeof (scope.navItems) == "object" && scope.navItems !== null && Array.isArray(scope.navItems);
    }
    menuControllers.isContainerScope = isContainerScope;
    function isNavScope(scope) {
        return typeof (scope.title) == "string" && typeof (scope.heading) == "string" &&
            typeof (scope.description) == "string" && typeof (scope.url) == "string" &&
            typeof (scope.isPage) == "boolean" && typeof (scope.isActive) == "boolean" &&
            typeof (scope.isSelected) == "boolean" && typeof (scope.level) == "number" &&
            typeof (scope.itemClass) == "string" && typeof (scope.linkClass) == "string" &&
            typeof (scope.controller) == "object" && scope.controller !== null &&
            scope.controller instanceof NavItem;
    }
    menuControllers.isNavScope = isNavScope;
    function isParentItem(value) {
        return typeof (value.activeNavItem) == "object" && value.activeNavItem !== null &&
            isScopeObject(value.activeNavItem) && isNavScope(value.activeNavItem);
    }
    menuControllers.isParentItem = isParentItem;
    function isTopLevelScope(scope) {
        return isContainerScope(scope) && isParentItem(scope) && typeof (scope.includeUrl) == "string" && typeof (scope.titleText) == "string" &&
            typeof (scope.descriptionText) == "string" && typeof (scope.sideNavNodes) == "object" &&
            scope.sideNavNodes !== null && Array.isArray(scope.sideNavNodes);
    }
    menuControllers.isTopLevelScope = isTopLevelScope;
})(menuControllers || (menuControllers = {}));
function isScopeObject(value) {
    return typeof (value.$apply) == "function" && typeof (value.$applyAsync) == "function" &&
        typeof (value.$broadcast) == "function" && typeof (value.$destroy) == "function" &&
        typeof (value.$digest) == "function" && typeof (value.$suspend) == "function" &&
        typeof (value.$isSuspended) == "function" && typeof (value.$resume) == "function" &&
        typeof (value.$emit) == "function" && typeof (value.$eval) == "function" &&
        typeof (value.$evalAsync) == "function" && typeof (value.$new) == "function" &&
        typeof (value.$on) == "function" && typeof (value.$watch) == "function" &&
        typeof (value.$watchCollection) == "function" && typeof (value.$watchGroup) == "function" &&
        typeof (value.$parent) == "object" && typeof (value.$root) == "object" &&
        typeof (value.$id) == "number";
}
class mainController {
    static isMainAppScope(scope) {
        return menuControllers.isTopLevelScope(scope) && typeof (scope.scrollToAnchor) == "function";
    }
    constructor($scope, $http, $location, $anchorScroll, logger) {
        $scope.logMessages = logger.getLogEntries();
        menuControllers.initializeTopLevelScope($scope, $http);
        $scope.scrollToAnchor = function (name) {
            $location.hash(name);
            $anchorScroll(name);
        };
        $scope.setPage = function (id, ...subId) {
            let item = mainController.getNavItem($scope, id, subId);
            if (typeof (item) != "undefined")
                item.isActive = true;
        };
        $scope.getPageHeading = function (id, ...subId) {
            let item = mainController.getNavItem($scope, id, subId);
            return (typeof (item) != "undefined") ? ((item.heading.length == 0) ? item.title : item.heading) : ((typeof (subId) != "undefined" && subId.length > 0) ? id + "/" + subId.join("/") : id);
        };
        $scope.getPageTitle = function (id, ...subId) {
            let item = mainController.getNavItem($scope, id, subId);
            return (typeof (item) != "undefined") ? item.title : ((typeof (subId) != "undefined" && subId.length > 0) ? id + "/" + subId.join("/") : id);
        };
        return this;
    }
    static getNavItem($scope, id, subId) {
        throw "getNavItem is obsolete. Use pageRefLink, pageRefHeadingText or pageRefTitleText directive, instead";
    }
}
function ensureUniqueId(defaultId, id) {
    if ((defaultId = defaultId.trim()).length == 0)
        defaultId = "_node";
    if (typeof (id) != "string" || (id = id.trim().length) == 0)
        id = defaultId;
    let element = $('#' + id);
    if (element.length > 0) {
        let idx = 0;
        do {
            id = defaultId + idx;
            element = $('#' + id);
            idx++;
        } while (element.length > 0);
    }
    return id;
}
;
;
class AppLoggerService {
    constructor() {
        this._logEntries = [];
    }
    getLogEntries() { return this._logEntries; }
    log(message) {
        if (typeof (message) == "string")
            this._logEntries.push({ message: message, type: "Message", code: 0, detail: "", id: this._logEntries.length });
        else {
            let detailStr;
            if (typeof (message.detail) == "string")
                detailStr = message.detail;
            else if (typeof (message.detail) == "undefined" || message.detail === null) {
                let detailObj = {};
                let count = 0;
                detailStr = "";
                if (typeof (message.description) == "string") {
                    count++;
                    detailStr = message.description;
                    detailObj.description = detailStr;
                }
                if (typeof (message.fileName) == "string") {
                    count++;
                    detailStr = message.fileName;
                    detailObj.fileName = detailStr;
                }
                if (typeof (message.lineNumber) == "number") {
                    count++;
                    detailObj.lineNumber = message.lineNumber;
                    detailStr = detailObj.lineNumber.toString();
                }
                if (typeof (message.columnNumber) == "number") {
                    count++;
                    detailObj.columnNumber = message.columnNumber;
                    detailStr = detailObj.columnNumber.toString();
                }
                if (typeof (message.stack) == "string") {
                    count++;
                    detailStr = message.stack;
                    detailObj.stack = detailStr;
                }
                if (count > 1)
                    detailStr = JSON.stringify(detailObj);
            }
            else if (typeof (message.detail) != "function")
                detailStr = JSON.stringify(message.detail);
            else
                detailStr = message.detail.ToString();
            this._logEntries.push({
                message: message.message,
                type: (message.type == "string") ? message.type : ((message.name == "string") ? message.name : ((message instanceof Error) ? "Error" : "Message")),
                code: (message.code == "number") ? message.code : ((message.number == "number") ? message.number : ((message instanceof Error) ? -1 : 0)),
                detail: detailStr,
                id: this._logEntries.length
            });
        }
    }
}
angular.module("main", [])
    .service('appLogger', AppLoggerService)
    .controller("mainController", ['$scope', '$http', '$location', '$anchorScroll', 'appLogger', mainController])
    .directive('hashScrollLink', ['$location', '$anchorScroll', 'appLogger', function ($location, $anchorScroll, logger) {
        return {
            link: function (scope, instanceElement, instanceAttributes) {
                let text = instanceAttributes.text;
                let id = instanceAttributes.refId;
                if (typeof (id) == "string" && (id = id.trim()).length > 0) {
                    let element = $('<a />');
                    let contentHtml;
                    if (instanceAttributes.encapsulateContents === "true" && (contentHtml = instanceElement.html()).trim().length == 0)
                        contentHtml = undefined;
                    if (typeof (contentHtml) == "string") {
                        element.append(contentHtml);
                        instanceElement.empty();
                    }
                    instanceElement.append(element);
                    element.attr("href", "javascript:noop()");
                    if (typeof (instanceAttributes.class) == "string" && instanceAttributes.class.trim().length > 0)
                        element.addClass(instanceAttributes.class);
                    element.click(function () {
                        $location.hash(id);
                        $anchorScroll(id);
                    });
                    if (typeof (text) == "string" && (text = text.trim()).length > 0)
                        element.text(text);
                    else if (typeof (contentHtml) != "string") {
                        let target = $('#' + id);
                        if (target.length > 0)
                            element.text(target.text());
                        else
                            element.text(id);
                    }
                }
                else if (typeof (text) == "string" && (text = text.trim()).length > 0)
                    instanceElement.text(text);
            }
        };
    }])
    .directive('pageRefLink', ['appLogger', function (logger) {
        return {
            link: function (scope, instanceElement, instanceAttributes) {
                if (typeof (instanceAttributes.menuPath) == "string" && mainController.isMainAppScope(scope)) {
                    let id = instanceAttributes.menuPath.split("/").map(function (v) { return v.trim(); }).filter(function (v) { return v.length > 0; });
                    if (id.length > 0) {
                        logger.log("Looking up pageRefLink " + instanceAttributes.menuPath);
                        let item = menuControllers.NavItem.getNavItemById(scope, id);
                        if (typeof (item) != "undefined") {
                            logger.log("Found pageRefLink url " + item.url);
                            let element;
                            if (item.isActive)
                                element = $('<samp />');
                            else {
                                element = $('<a href="javascript:noop()" />');
                                element.click(function () {
                                    item.isActive = true;
                                });
                            }
                            if (typeof (instanceAttributes.class) == "string" && instanceAttributes.class.trim().length > 0)
                                element.addClass(instanceAttributes.class);
                            if (typeof (instanceAttributes.text) != "string" || instanceAttributes.text === "heading")
                                element.text(item.heading);
                            else if (instanceAttributes.text === "title")
                                element.text(item.title);
                            else if (instanceAttributes.text === "description")
                                element.text(item.description);
                            else
                                element.text(item.url);
                            instanceElement.append(element);
                            if (instanceAttributes.appendDescription === "true" && instanceAttributes.text !== "description" && item.description.length > 0)
                                instanceElement.text(" - " + item.description);
                            return;
                        }
                    }
                }
                instanceElement.text("");
            }
        };
    }])
    .directive('pageRefHeadingText', ['appLogger', function (logger) {
        return {
            link: function (scope, instanceElement, instanceAttributes) {
                let element;
                if (typeof (instanceAttributes.tagName) == "string" && instanceAttributes.tagName.trim().length > 0) {
                    element = $('<' + instanceAttributes.tagName + ' />');
                    instanceElement.append(element);
                }
                else
                    element = instanceElement;
                if (typeof (instanceAttributes.class) == "string" && instanceAttributes.class.trim().length > 0)
                    element.addClass(instanceAttributes.class);
                if (typeof (instanceAttributes.menuPath) == "string" && mainController.isMainAppScope(scope)) {
                    let id = instanceAttributes.menuPath.split("/").map(function (v) { return v.trim(); }).filter(function (v) { return v.length > 0; });
                    if (id.length > 0) {
                        let item = menuControllers.NavItem.getNavItemById(scope, id);
                        if (typeof (item) != "undefined") {
                            element.text((item.heading.length > 0) ? item.heading : item.title);
                            return;
                        }
                    }
                }
                element.text("");
            }
        };
    }])
    .directive('pageRefTitleText', ['appLogger', function (logger) {
        return {
            link: function (scope, instanceElement, instanceAttributes) {
                let element;
                if (typeof (instanceAttributes.tagName) == "string" && instanceAttributes.tagName.trim().length > 0) {
                    element = $('<' + instanceAttributes.tagName + ' />');
                    instanceElement.append(element);
                }
                else
                    element = instanceElement;
                if (typeof (instanceAttributes.class) == "string" && instanceAttributes.class.trim().length > 0)
                    element.addClass(instanceAttributes.class);
                if (typeof (instanceAttributes.menuPath) == "string" && mainController.isMainAppScope(scope)) {
                    let id = instanceAttributes.menuPath.split("/").map(function (v) { return v.trim(); }).filter(function (v) { return v.length > 0; });
                    if (id.length > 0) {
                        let item = menuControllers.NavItem.getNavItemById(scope, id);
                        if (typeof (item) != "undefined") {
                            element.text(item.title);
                            return;
                        }
                    }
                }
                element.text("");
            }
        };
    }])
    .directive('modalPopupDialogCentered', ['appLogger', function (logger) {
        return {
            link: function (scope, instanceElement, instanceAttributes) {
                let id = ensureUniqueId("modalPopupDialogCentered", instanceAttributes.id);
                let modalPopupButtonElement = instanceElement.children('modal-popup-dialog-button:first');
                let buttonElement = ((modalPopupButtonElement.length == 0) ? instanceElement : modalPopupButtonElement).children('button[type="button"][data-toggle="modal"]:first');
                if (buttonElement.length == 0) {
                    buttonElement = $('<button type="button" class="btn d-inline-flex align-top btn-outline-info mb-1 bg-light" data-toggle="modal" />');
                    ((modalPopupButtonElement.length == 0) ? instanceElement : modalPopupButtonElement).append(buttonElement);
                }
                buttonElement.attr("data-target", "#" + id);
                let modalOuterElement = $('<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" />');
                modalOuterElement.insertAfter(instanceElement);
                modalOuterElement.attr("id", id);
                let modalDialogElement = $('<div class="modal-dialog modal-dialog-centered" role="document" />');
                modalOuterElement.append(modalDialogElement);
                let modalContentElement = $('<div class="modal-content" />');
                modalDialogElement.append(modalContentElement);
                let modalHeaderElement = instanceElement.children('.modal-header:first');
                let modalBodyElement = instanceElement.children('.modal-body:first');
                let modalFooterElement = instanceElement.children('.modal-footer:first');
                let modalTitleElement;
                let modalCloseElement;
                if (modalHeaderElement.length == 0) {
                    modalHeaderElement = $('<div class="modal-header" />');
                    modalTitleElement = $('<h5 class="modal-title" />');
                    modalHeaderElement.append(modalTitleElement);
                    modalCloseElement = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close" />');
                    modalHeaderElement.append(modalCloseElement);
                    modalCloseElement.append('<span aria-hidden="true">&times;</span>');
                }
                else {
                    modalHeaderElement.detach();
                    modalTitleElement = modalHeaderElement.children('.modal-title:first');
                    modalCloseElement = modalHeaderElement.children('button[type="button"][data-dismiss="modal"]:first');
                    if (modalCloseElement.length == 0) {
                        modalCloseElement = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close" />');
                        modalHeaderElement.append(modalCloseElement);
                        modalCloseElement.append('<span aria-hidden="true">&times;</span>');
                    }
                    if (modalTitleElement.length == 0) {
                        modalTitleElement = $('<h5 class="modal-title" />');
                        modalTitleElement.insertBefore(modalCloseElement);
                    }
                }
                modalContentElement.append(modalHeaderElement);
                if (modalBodyElement.length == 0) {
                    modalBodyElement = $('<div class="modal-footer" />');
                    modalBodyElement.append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>');
                }
                else
                    modalBodyElement.detach();
                modalContentElement.append(modalBodyElement);
                if (modalFooterElement.length == 0) {
                    modalFooterElement = $('<div class="modal-footer" />');
                    modalFooterElement.append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>');
                }
                else
                    modalFooterElement.detach();
                modalContentElement.append(modalFooterElement);
                let element;
                if (typeof (instanceAttributes.text) == "string" && instanceAttributes.text.trim().length > 0)
                    modalBodyElement.text(instanceAttributes.text);
                if (typeof (instanceAttributes.title) == "string" && instanceAttributes.title.trim().length > 0) {
                    modalTitleElement.text(instanceAttributes.title);
                    buttonElement.attr("title", instanceAttributes.title);
                }
            }
        };
    }])
    .directive('modalPopupDialogButton', ['appLogger', function (logger) {
        return {
            link: function (scope, instanceElement, instanceAttributes) {
                let element = $('<button type="button" class="btn d-inline-flex align-top btn-outline-info mb-1 bg-light" data-toggle="modal" />');
                instanceElement.append(element);
                if (typeof (instanceAttributes.class) == "string" && instanceAttributes.class.trim().length > 0)
                    element.addClass(instanceAttributes.class);
                if (typeof (instanceAttributes.dataTarget) == "string" && instanceAttributes.dataTarget.trim().length > 0)
                    element.attr('data-target', instanceAttributes.dataTarget);
                if (typeof (instanceAttributes.title) == "string" && instanceAttributes.title.trim().length > 0)
                    element.attr('title', instanceAttributes.title);
                let contentHtml;
                if (instanceAttributes.encapsulateContents === "true" && (contentHtml = instanceElement.html()).trim().length == 0)
                    contentHtml = undefined;
                if (typeof (contentHtml) == "string") {
                    element.append(contentHtml);
                    instanceElement.empty();
                }
                if (typeof (instanceAttributes.src) == "string" && instanceAttributes.src.trim().length > 0) {
                    let img = $('<img class="figure-img img-fluid rounded" />');
                    element.append(img);
                    img.attr('src', instanceAttributes.src);
                    if (typeof (instanceAttributes.alt) == "string" && instanceAttributes.alt.trim().length > 0)
                        element.attr('alt', instanceAttributes.alt);
                }
                if (typeof (instanceAttributes.text) == "string" && instanceAttributes.text.trim().length > 0)
                    element.text(instanceAttributes.text);
            }
        };
    }]);
