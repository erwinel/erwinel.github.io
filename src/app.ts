var erwinelApp = angular.module('erwinel', []);

interface ISiteMapItem {
    name: string,
    url: string,
    targetBlank?: boolean,
    hideInNav?: boolean
}
interface ISiteMapContainer extends ISiteMapItem {
    //items: (ISiteMapItem|{ isDivider: true })[]
    items: ISiteMapItem[]
}
//type ISiteMapNode = ISiteMapContainer|ISiteMapItem|{ isDivider: true };
type ISiteMapNode = ISiteMapContainer|ISiteMapItem;

function isISiteMapContainer(node: ISiteMapNode): node is ISiteMapContainer {
    let hash: { [key: string]: any } = <{ [key: string]: any }>node;
    return typeof(hash.items) == "object";
}

//function isSiteMapDivider(node: ISiteMapNode): node is { isDivider: true } {
//    return typeof((<{ [key: string]: any }>node).isDivider) == "boolean";
//}

let mainSiteMappings: (ISiteMapContainer|ISiteMapItem)[] = [
    { name: "Home", url: "index.html" },
    { name: "Initial Config", url: "InitialConfig.html" },
    { name: "Update Sets", url: "GlobalUpdateSets.html" },
    { name: "Utilities Application", url: "x_44813_util.html" },
    { name: "Group Name Registry", url: "x_44813_grpnamereg.html" },
    { name: "Security Classification", url: "x_44813_sec_clsif.html" }
];

//interface INavNodeDivider { type: "divider" }
interface INavNodeBase {
    text: string,
    href: string,
    target: string,
    itemClass: string,
    linkClass: string
}
interface INavNodeItem extends INavNodeBase {
    type: "item"
}
//type INavChildNode = INavNodeDivider|INavNodeItem;
interface INavNodeDropDown extends INavNodeBase {
    type: "dropdown",
    items: INavNodeItem[]
}
//type INavNode = INavNodeDivider|INavNodeItem|INavNodeDropDown;
type INavNode = INavNodeItem|INavNodeDropDown;
//function isINavNodeDivider(node: INavNode|INavNodeBase): node is INavNodeDivider {
//    let type: any = (<{ [key: string]: any }>node).type;
//    return typeof(type) == "string" && type == "divider";
//}

function isINavNodeItem(node: INavNode|INavNodeBase): node is INavNodeItem {
    let type: any = (<{ [key: string]: any }>node).type;
    return typeof(type) == "string" && type == "item";
}

function isINavNodeDropDown(node: INavNode|INavNodeBase): node is INavNodeDropDown {
    let type: any = (<{ [key: string]: any }>node).type;
    return typeof(type) == "string" && type == "dropdown";
}

function getNodeUrl(appRootUrl: string, siteMapNode: ISiteMapNode): URL|undefined {
    //if (!isSiteMapDivider(siteMapNode) && siteMapNode.url.length > 0 && siteMapNode.url != "#") {
    if (siteMapNode.url.length > 0 && siteMapNode.url != "#") {
        let nodeUrl: URL = new URL(appRootUrl);
        nodeUrl = new URL(siteMapNode.url, nodeUrl.href);
        while (nodeUrl.pathname.length > 1 && nodeUrl.pathname.endsWith("/") || nodeUrl.pathname.endsWith("\\"))
            nodeUrl.pathname = nodeUrl.pathname.substr(0, nodeUrl.pathname.length - 1);
        return nodeUrl;
    }
}

function getPageLinkUrl(url: URL|undefined): string {
    if (typeof(url) != "object")
        return "#";
    return url.href;
}

function getPageRefUrl(url: URL|undefined): string {
    if (typeof(url) != "object")
        return "#";
    let pageUrl: URL = new URL(url.href);
    while (pageUrl.pathname.length > 1 && pageUrl.pathname.endsWith("/") || pageUrl.pathname.endsWith("\\"))
        pageUrl.pathname = pageUrl.pathname.substr(0, pageUrl.pathname.length - 1);
    pageUrl.hash = '';
    pageUrl.search = '';
    return pageUrl.href.replace("\\", "/").toLowerCase();
}

interface IMainAppScope extends ng.IScope {
    titleText: string,
    currentNavItem?: INavNodeBase,
    navNodes: INavNodeBase[]
}

erwinelApp.controller("mainController", function($scope: IMainAppScope, $http: ng.IHttpService) {
    let currentUrl: URL = new URL(document.URL);
    while (currentUrl.pathname.length > 1 && currentUrl.pathname.endsWith("/") || currentUrl.pathname.endsWith("\\"))
        currentUrl.pathname = currentUrl.pathname.substr(0, currentUrl.pathname.length - 1);
    currentUrl.hash = '';
    currentUrl.search = '';
    let currentPage: string = getPageRefUrl(currentUrl);
    let scriptSrc: string|undefined = $("#appScript").attr("src");
    let currentNodeNotSet = true;
    if (typeof(scriptSrc) == "string") {
        let appRootUrl: string = (new URL("..", new URL(scriptSrc, currentUrl.href))).href;
        $scope.navNodes = [];
        for (var i = 0; i < mainSiteMappings.length; i++) {
            let siteMapNode: ISiteMapNode = mainSiteMappings[i];
            let dd: boolean|undefined = siteMapNode.hideInNav;
            if (dd)
                continue;
            let nodeUrl: URL|undefined = getNodeUrl(appRootUrl, siteMapNode);
            let linkUrl: string = getPageLinkUrl(nodeUrl);
            let navNode: INavNodeBase;
            let isCurrentNode: boolean = currentNodeNotSet && getPageRefUrl(nodeUrl) === currentPage;
            let href: string = (isCurrentNode) ? "#" : getPageLinkUrl(nodeUrl);
            let b: boolean|undefined = siteMapNode.targetBlank;
            let target: string = (typeof(b) == "boolean" && b && href != "#") ? "_blank" : "";
            if (isISiteMapContainer(siteMapNode) && siteMapNode.items.length > 0) {
                navNode = <INavNodeDropDown>{
                    type: "dropdown",
                    text: siteMapNode.name,
                    href: href,
                    target: target,
                    itemClass: "border",
                    linkClass: "",
                    items: []
                };
            } else {
                navNode = <INavNodeItem>{
                    type: "item",
                    text: siteMapNode.name,
                    href: href,
                    target: target,
                    itemClass: "border",
                    linkClass: ""
                };
            }
            if (isCurrentNode)
                navNode.itemClass += " active";
            navNode.itemClass += " border-secondary";
            if (isCurrentNode) {
                $scope.currentNavItem = navNode;
                currentNodeNotSet = false;
                navNode.itemClass += " bg-light";
                navNode.linkClass = "text";
            } else {
                navNode.itemClass += " bg-dark";
                navNode.linkClass = "text-light";
            }
            $scope.navNodes.push(navNode);
            if (isINavNodeDropDown(navNode)) {
                // let items: (ISiteMapItem|{ isDivider: true })[] = (<ISiteMapContainer>siteMapNode).items;
                let items: ISiteMapItem[] = (<ISiteMapContainer>siteMapNode).items;
                for (var n = 0; n < items.length; n++) {
                    //let item: ISiteMapItem|{ isDivider: true } = items[n];
                    let item: ISiteMapItem = items[n];
                    //if (isSiteMapDivider(item))
                    //    navNode.items.push({ type: "divider" });
                    //else {
                        dd = siteMapNode.hideInNav;
                        if (dd)
                            continue;
                        nodeUrl = getNodeUrl(appRootUrl, item);
                        if (currentNodeNotSet && getPageRefUrl(nodeUrl) === currentPage) {
                            navNode.items.push({
                                type: "item",
                                text: item.name,
                                href: "#",
                                target: "",
                                itemClass: "active bg-dark",
                                linkClass: "text-light"
                            });
                        } else {
                            linkUrl = getPageLinkUrl(nodeUrl);
                            b = siteMapNode.targetBlank;
                            navNode.items.push({
                                type: "item",
                                text: item.name,
                                href: linkUrl,
                                target: (typeof(b) == "boolean" && b && linkUrl != "#") ? "_target" : "",
                                itemClass: "bg-light",
                                linkClass: "text"
                            });
                        }
                    //}
                }
            }
        }
        $scope.titleText = document.title;
    } else {
        $scope.titleText = "Warning: Script element with id of 'appScript' not found. Cannot initialize menu.";
    }
});