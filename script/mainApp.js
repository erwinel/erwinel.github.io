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
            this._scope.itemsById = {};
            this._scope.navItems = this._navItems.map(function (value) { return value._scope; });
            for (var i = 0; i < this._scope.navItems.length; i++) {
                let id = this._scope.navItems[i].controller.id;
                if (typeof (id) == "string" && id.length > 0)
                    this._scope.itemsById[id] = this._scope.navItems[i];
            }
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
    }
    menuControllers.NavItem = NavItem;
    function initializeTopLevelScope(scope, http) {
        scope.navItems = [];
        scope.sideNavNodes = [];
        scope.titleText = "";
        scope.descriptionText = "";
        scope.itemsById = {};
        http.get("navSettings.json").then(function (response) {
            scope.navItems = NavItem.import(response.data.navItems, scope).map(function (item) { return item.scope; });
            if (scope.navItems.length > 0) {
                scope.navItems[0].controller.isActive = true;
                for (var i = 0; i < scope.navItems.length; i++) {
                    let id = scope.navItems[i].controller.id;
                    if (typeof (id) == "string" && id.length > 0)
                        scope.itemsById[id] = scope.navItems[i];
                }
            }
        });
    }
    menuControllers.initializeTopLevelScope = initializeTopLevelScope;
})(menuControllers || (menuControllers = {}));
class mainController {
    constructor($scope, $http) {
        menuControllers.initializeTopLevelScope($scope, $http);
        return this;
    }
}
angular.module("main", [])
    .controller("mainController", mainController);
