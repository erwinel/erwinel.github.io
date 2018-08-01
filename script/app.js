"use strict";
var erwinelApp = angular.module('erwinel', []);
function isISiteMapContainer(node) {
    let hash = node;
    return typeof (hash.items) == "object";
}
//function isSiteMapDivider(node: ISiteMapNode): node is { isDivider: true } {
//    return typeof((<{ [key: string]: any }>node).isDivider) == "boolean";
//}
let mainSiteMappings = [
    { name: "Home", url: "index.html" },
    { name: "Initial Config", url: "InitialConfig.html" },
    { name: "Update Sets", url: "GlobalUpdateSets.html" },
    { name: "Utilities Application", url: "x_44813_util.html" },
    { name: "Group Name Registry", url: "x_44813_grpnamereg.html" },
    { name: "Security Classification", url: "x_44813_sec_clsif.html" }
];
//function isINavNodeDivider(node: INavNode|INavNodeBase): node is INavNodeDivider {
//    let type: any = (<{ [key: string]: any }>node).type;
//    return typeof(type) == "string" && type == "divider";
//}
function isINavNodeItem(node) {
    let type = node.type;
    return typeof (type) == "string" && type == "item";
}
function isINavNodeDropDown(node) {
    let type = node.type;
    return typeof (type) == "string" && type == "dropdown";
}
function getNodeUrl(appRootUrl, siteMapNode) {
    //if (!isSiteMapDivider(siteMapNode) && siteMapNode.url.length > 0 && siteMapNode.url != "#") {
    if (siteMapNode.url.length > 0 && siteMapNode.url != "#") {
        let nodeUrl = new URL(appRootUrl);
        nodeUrl = new URL(siteMapNode.url, nodeUrl.href);
        while (nodeUrl.pathname.length > 1 && nodeUrl.pathname.endsWith("/") || nodeUrl.pathname.endsWith("\\"))
            nodeUrl.pathname = nodeUrl.pathname.substr(0, nodeUrl.pathname.length - 1);
        return nodeUrl;
    }
}
function getPageLinkUrl(url) {
    if (typeof (url) != "object")
        return "#";
    return url.href;
}
function getPageRefUrl(url) {
    if (typeof (url) != "object")
        return "#";
    let pageUrl = new URL(url.href);
    while (pageUrl.pathname.length > 1 && pageUrl.pathname.endsWith("/") || pageUrl.pathname.endsWith("\\"))
        pageUrl.pathname = pageUrl.pathname.substr(0, pageUrl.pathname.length - 1);
    pageUrl.hash = '';
    pageUrl.search = '';
    return pageUrl.href.replace("\\", "/").toLowerCase();
}
erwinelApp.controller("mainController", function ($scope, $http) {
    let currentUrl = new URL(document.URL);
    while (currentUrl.pathname.length > 1 && currentUrl.pathname.endsWith("/") || currentUrl.pathname.endsWith("\\"))
        currentUrl.pathname = currentUrl.pathname.substr(0, currentUrl.pathname.length - 1);
    currentUrl.hash = '';
    currentUrl.search = '';
    let currentPage = getPageRefUrl(currentUrl);
    let scriptSrc = $("#appScript").attr("src");
    let currentNodeNotSet = true;
    if (typeof (scriptSrc) == "string") {
        let appRootUrl = (new URL("..", new URL(scriptSrc, currentUrl.href))).href;
        $scope.navNodes = [];
        for (var i = 0; i < mainSiteMappings.length; i++) {
            let siteMapNode = mainSiteMappings[i];
            let dd = siteMapNode.hideInNav;
            if (dd)
                continue;
            let nodeUrl = getNodeUrl(appRootUrl, siteMapNode);
            let linkUrl = getPageLinkUrl(nodeUrl);
            let navNode;
            let isCurrentNode = currentNodeNotSet && getPageRefUrl(nodeUrl) === currentPage;
            let href = (isCurrentNode) ? "#" : getPageLinkUrl(nodeUrl);
            let b = siteMapNode.targetBlank;
            let target = (typeof (b) == "boolean" && b && href != "#") ? "_blank" : "";
            if (isISiteMapContainer(siteMapNode) && siteMapNode.items.length > 0) {
                navNode = {
                    type: "dropdown",
                    text: siteMapNode.name,
                    href: href,
                    target: target,
                    itemClass: "border",
                    linkClass: "",
                    items: []
                };
            }
            else {
                navNode = {
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
            }
            else {
                navNode.itemClass += " bg-dark";
                navNode.linkClass = "text-light";
            }
            $scope.navNodes.push(navNode);
            if (isINavNodeDropDown(navNode)) {
                // let items: (ISiteMapItem|{ isDivider: true })[] = (<ISiteMapContainer>siteMapNode).items;
                let items = siteMapNode.items;
                for (var n = 0; n < items.length; n++) {
                    //let item: ISiteMapItem|{ isDivider: true } = items[n];
                    let item = items[n];
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
                    }
                    else {
                        linkUrl = getPageLinkUrl(nodeUrl);
                        b = siteMapNode.targetBlank;
                        navNode.items.push({
                            type: "item",
                            text: item.name,
                            href: linkUrl,
                            target: (typeof (b) == "boolean" && b && linkUrl != "#") ? "_target" : "",
                            itemClass: "bg-light",
                            linkClass: "text"
                        });
                    }
                    //}
                }
            }
        }
        $scope.titleText = document.title;
    }
    else {
        $scope.titleText = "Warning: Script element with id of 'appScript' not found. Cannot initialize menu.";
    }
});
