var mainModule = angular.module("MainModule", ['ngRoute']);

// var routeSelectionInfo = (function (routeInfoItems) {
//     function routeNavItem(routeDef, parentRoute) {
//         var path;
//         if (typeof(routeDef.path) !== 'string' || (path = routeDef.path.trim()).length == 0) {
//             if (typeof(parentRoute) !== 'object' || parentRoute === null)
//                 throw 'Path must be defined if parent route is not defined';
//             if (typeof(routeDef.relativePath) !== 'string' || (path = routeDef.relativePath.trim()).length == 0 || path == '/')
//                 throw 'Invalid relative path';
//             this.path = ((path.subString(0, 1) != '/') ? parentRoute.path + '/' : parentRoute.path) + path;
//         } else {
//             this.path = (path.subString(0, 1) != '/') ? '/' + path : path;
//         }
//         if (typeof(routeDef.route) != 'object' || routeDef.route === null || Array.isArray(routeDef.route))
//             throw 'Invalid route';
//         if (typeof(routeDef.linkTitle) !== 'string' || (this.linkTitle = routeDef.linkTitle.trim()).length == 0)
//             throw 'Invalid linkTitle';
//         if (typeof(routeDef.pageTitle) != 'string' || (this.pageTitle = routeDef.pageTitle.trim()).length == 0)
//             this.pageTitle = this.linkTitle;
//         this.navItems = [];
//         this.rootNavItems = [];
//         if (typeof(routeDef.subNav) != 'object' || routeDef.subNav === null || !Array.isArray(routeDef.subNav))
//             return;
//         for (var i = 0; i < routeDef.subNav.length; i++)
//             this.rootNavItems.push(new routeNavItem(this, routeDef[i]));
//     }
//     function routeSelectionInfo(routeInfoItems) {
//         this.rootNavItems = [];
//         this.navItems = [];
//         for (var i = 0; i < routeInfoItems.subNav.length; i++)
//             this.rootNavItems.push(new routeNavItem(this, routeInfoItems[i]));
//     }
//     return new routeSelectionInfo(routeInfoItems);
// }());

var allRouteDefinitions = [
    {
        path: '/home',
        route: {
            templateUrl: 'Home.htm',
            controller: 'HomePageController'
        },
        linkTitle: 'Home'
    }, {
        path: '/snippets',
        route: {
            templateUrl: 'Snippets.htm',
            controller: 'SnippetsController'
        },
        linkTitle: 'Code Snippets',
        pageTitle: 'Code Snippets'
    }
];

mainModule.controller('MainController', function($scope, $route, $routeParams, $location) {
    console.log('Instantiated "MainController"');
    $scope.CurrentRoute = $route;
    $scope.CurrentParams = $routeParams;
    $scope.PageRouteDefinitions = allRouteDefinitions;
    $scope.CurrentPageRouteDefinition = allRouteDefinitions[0];
    $scope.UpdateCurrentRoute = function(controllerName) {
        console.log('Called "UpdateCurrentRoute"');
        $scope.currentPath = $location.path();
        var routeIndex = 0;
        var i;
        for (i = 0; i < allRouteDefinitions.length; i++) {
            if (allRouteDefinitions[i].route.controller == controllerName) {
                routeIndex = i;
                break;
            }
        }
        for (i = 0; i < allRouteDefinitions.length; i++) {
            if (i != routeIndex) {
                allRouteDefinitions[i].menuItemCss = allRouteDefinitions[i].menuLinkCss = '';
            } else {
                allRouteDefinitions[i].menuItemCss = allRouteDefinitions[i].menuLinkCss = ' active';
            }
        }
        $scope.CurrentPageRouteDefinition = allRouteDefinitions[routeIndex];
        var s = $scope.CurrentPageRouteDefinition.pageTitle;
        if (typeof(s) == 'undefined' || s === null || (s = ((typeof(s) == 'string') ? s : s + "").trim()).length == 0)
        $scope.CurrentPageRouteDefinition.pageTitle = 'ServiceNow Implementation and Maintenance';
    };
    $scope.$on('$routeChangeSuccess', function (event, current, previous) { $scope.UpdateCurrentRoute(); });
    $scope.UpdateCurrentRoute(allRouteDefinitions[0].route.controller);
});

mainModule.controller('HomePageController', function($scope, $routeParams) {
    $scope.UpdateCurrentRoute('HomePageController');
});

mainModule.controller('SnippetsController', function($scope, $routeParams) {
    $scope.UpdateCurrentRoute('SnippetsController');

    $scope.selectionObject = { 
        menu: { serverSide: { }, clientSide: { } },
        serverScope: { cardSelections: { } },
        clientScope: { cardSelections: { } }
    };
    $scope.selectionObject.serverScope.selectGroup = function(id) {
        $scope.selectionObject.serverScope.selectedGroupId = id;
    };
    $scope.selectionObject.clientScope.selectGroup = function(id) {
        $scope.selectionObject.clientScope.selectedGroupId = id;
    };
    $scope.selectionObject.setSelection = function(isServerSide) {
        $scope.selectionObject.serverScope.isSelected = isServerSide;
        $scope.selectionObject.clientScope.isSelected = !isServerSide;
        if (isServerSide) {
            $scope.selectionObject.menu.serverSide.navItemCss = $scope.selectionObject.menu.serverSide.linkItemCss = ' active';
            $scope.selectionObject.menu.clientSide.navItemCss = $scope.selectionObject.menu.clientSide.linkItemCss = '';
        } else {
            $scope.selectionObject.menu.serverSide.navItemCss = $scope.selectionObject.menu.serverSide.linkItemCss = '';
            $scope.selectionObject.menu.clientSide.navItemCss = $scope.selectionObject.menu.clientSide.linkItemCss = ' active';
        }
    };

    $scope.selectionObject.setSelection(true);
});

mainModule.controller('ServerSideSnippetsController', function($scope) {
    $scope.isSelected = $scope.selectionObject.serverScope.isSelected;
    $scope.selectedGroupId = $scope.selectionObject.serverScope.selectedGroupId;
    $scope.selectGroup = function(id) {
        if (id === $scope.selectedGroupId)
            return;
        $scope.cardSelections[$scope.selectedGroupId] = $scope.selectedCardId;
        $scope.selectedCardId = $scope.cardSelections[id];
        $scope.selectedGroupId = id;
    };
    $scope.cardSelections = {
        uiActions: 'forceToUpdateSet',
        tbd2: 'tbd3'
    };
    $scope.selectedGroupId = 'uiActions';
    $scope.selectedCardId = $scope.cardSelections[$scope.selectedGroupId];
    $scope.selectionObject.serverScope = $scope;
    $scope.GroupIconUrl = function(id) { return ($scope.selectedGroupId == id) ? 'images/collapse.svg' : 'images/expand.svg'; };
    $scope.GroupIconVerb = function(id) { return ($scope.selectedGroupId == id) ? 'Collapse' : 'Expand'; };
});

mainModule.controller('ClientSideSnippetsController', function($scope) {
    $scope.isSelected = $scope.selectionObject.clientScope.isSelected;
    $scope.selectedGroupId = $scope.selectionObject.clientScope.selectedGroupId;
    $scope.selectGroup = function(id) {
        if (id === $scope.selectedGroupId)
            return;
        $scope.cardSelections[$scope.selectedGroupId] = $scope.selectedCardId;
        $scope.selectedCardId = $scope.cardSelections[id];
        $scope.selectedGroupId = id;
    };
    $scope.cardSelections = {
        tbd: 'tbd2'
    };
    $scope.selectedGroupId = 'tbd';
    $scope.selectedCardId = $scope.cardSelections[$scope.selectedGroupId];
    $scope.selectionObject.clientScope = $scope;
    $scope.GroupIconUrl = function(id) { return ($scope.selectedGroupId == id) ? 'images/collapse.svg' : 'images/expand.svg'; };
    $scope.GroupIconVerb = function(id) { return ($scope.selectedGroupId == id) ? 'Collapse' : 'Expand'; };
});

mainModule.config(['$routeProvider', function($routeProvider) {
    for (var i = 0; i < allRouteDefinitions.length; i++)
        $routeProvider.when(allRouteDefinitions[i].path, allRouteDefinitions[i].route);
    $routeProvider.otherwise(allRouteDefinitions[0].path);
}]);