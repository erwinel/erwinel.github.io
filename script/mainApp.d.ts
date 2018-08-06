/// <reference types="angular" />
declare module navSettingsJSON {
    interface INavItem {
        id?: string;
        title: string;
        heading?: string;
        description?: string;
    }
    interface ILinkPage extends INavItem {
        linkUrl: string;
    }
    interface ILeafPage extends INavItem {
        pageUrl: string;
    }
    interface IContainer extends INavItem {
        navItems: NavItem[];
    }
    interface IContainerPage extends IContainer, ILeafPage {
    }
    interface IContainerLink extends IContainer, ILinkPage {
    }
    type NavItem = ILeafPage | ILinkPage | IContainerPage | IContainerLink;
    function isContainer(item: INavItem): item is IContainer;
    function isPageItem(item: INavItem): item is ILeafPage;
    function isLinkItem(item: INavItem): item is ILinkPage;
}
declare module menuControllers {
    interface IParentItem {
        activeNavItem?: INavScope;
    }
    interface IContainerScope extends angular.IScope {
        navItems: INavScope[];
        current?: INavScope;
    }
    interface ITopLevelScope extends IContainerScope, IParentItem {
        includeUrl: string;
        titleText: string;
        descriptionText: string;
        sideNavNodes: INavScope[];
    }
    interface INavScope extends IContainerScope {
        title: string;
        heading: string;
        description: string;
        url: string;
        isPage: boolean;
        isActive: boolean;
        isSelected: boolean;
        level: number;
        controller: NavItem;
        itemClass: string;
        linkClass: string;
    }
    class NavItem implements IParentItem {
        private __NavItem__uniqueId;
        private _id;
        private _scope;
        private _parent;
        private _precedingNode?;
        private _followingNode?;
        private _navItems;
        readonly id: string | undefined;
        readonly scope: INavScope;
        readonly parent: NavItem | ITopLevelScope;
        readonly title: string;
        readonly description: string;
        readonly heading: string;
        readonly url: string;
        readonly isPage: boolean;
        isActive: boolean;
        readonly isSelected: boolean;
        readonly level: number;
        readonly precedingNode: NavItem | undefined;
        readonly followingNode: NavItem | undefined;
        readonly navItems: ReadonlyArray<NavItem>;
        activeNavItem: INavScope | undefined;
        isAncestor(other: NavItem | ITopLevelScope): boolean;
        raiseActivate(): boolean;
        equals(other: NavItem | ITopLevelScope): boolean;
        constructor(source: navSettingsJSON.NavItem, parent: NavItem | ITopLevelScope, precedingNode?: NavItem);
        static import(source: navSettingsJSON.NavItem[], parent: NavItem | ITopLevelScope): NavItem[];
        static isNavItem(node: NavItem | ITopLevelScope): node is NavItem;
        static getNavItemById(parent: IContainerScope | NavItem | NavItem[], idValue: string | string[], ...idValues: string[]): NavItem | undefined;
    }
    function initializeTopLevelScope(scope: ITopLevelScope, http: angular.IHttpService): void;
    function isContainerScope(scope: angular.IScope): scope is IContainerScope;
    function isNavScope(scope: angular.IScope): scope is INavScope;
    function isParentItem(value: object): value is IParentItem;
    function isTopLevelScope(scope: angular.IScope): scope is ITopLevelScope;
}
declare function isScopeObject(value: object): value is angular.IScope;
interface IMainAppScope extends menuControllers.ITopLevelScope {
    scrollToAnchor: {
        (name: string): void;
    };
    setPage: {
        (id: string, ...subId: string[]): void;
    };
    getPageHeading: {
        (id: string, ...subId: string[]): string;
    };
    getPageTitle: {
        (id: string, ...subId: string[]): string;
    };
    logMessages: IAppLoggerEntry[];
}
declare class mainController {
    static isMainAppScope(scope: angular.IScope): scope is IMainAppScope;
    constructor($scope: IMainAppScope, $http: angular.IHttpService, $location: angular.ILocationService, $anchorScroll: angular.IAnchorScrollService, logger: AppLoggerService);
    static getNavItem($scope: IMainAppScope, id: string, subId: string[] | undefined): menuControllers.NavItem | undefined;
}
declare function ensureUniqueId(defaultId: string, id?: any): any;
interface IAppLoggerInfo {
    message: string;
    type?: string;
    code?: number;
    detail?: any;
}
interface IAppLoggerEntry {
    message: string;
    type: string;
    code: number;
    detail: string;
    id: number;
}
interface IAppLogger {
    getLogEntries: {
        (): IAppLoggerEntry[];
    };
    log: {
        (message: string | IAppLoggerInfo | Error): void;
    };
}
declare class AppLoggerService {
    private _logEntries;
    getLogEntries(): IAppLoggerEntry[];
    log(message: string | IAppLoggerInfo | Error): void;
}
//# sourceMappingURL=mainApp.d.ts.map