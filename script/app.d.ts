/// <reference types="angular" />
declare var erwinelApp: angular.IModule;
interface ISiteMapItem {
    name: string;
    url: string;
    targetBlank?: boolean;
    hideInNav?: boolean;
}
interface ISiteMapContainer extends ISiteMapItem {
    items: ISiteMapItem[];
}
declare type ISiteMapNode = ISiteMapContainer | ISiteMapItem;
declare function isISiteMapContainer(node: ISiteMapNode): node is ISiteMapContainer;
declare let mainSiteMappings: (ISiteMapContainer | ISiteMapItem)[];
interface INavNodeBase {
    text: string;
    href: string;
    target: string;
    itemClass: string;
    linkClass: string;
}
interface INavNodeItem extends INavNodeBase {
    type: "item";
}
interface INavNodeDropDown extends INavNodeBase {
    type: "dropdown";
    items: INavNodeItem[];
}
declare type INavNode = INavNodeItem | INavNodeDropDown;
declare function isINavNodeItem(node: INavNode | INavNodeBase): node is INavNodeItem;
declare function isINavNodeDropDown(node: INavNode | INavNodeBase): node is INavNodeDropDown;
declare function getNodeUrl(appRootUrl: string, siteMapNode: ISiteMapNode): URL | undefined;
declare function getPageLinkUrl(url: URL | undefined): string;
declare function getPageRefUrl(url: URL | undefined): string;
interface IMainAppScope extends ng.IScope {
    titleText: string;
    currentNavItem?: INavNodeBase;
    navNodes: INavNodeBase[];
}
//# sourceMappingURL=app.d.ts.map