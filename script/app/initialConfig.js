// Configures scope variables related to showing and hiding cards.
function setupTopLevelCardChange($scope, name, headingText) {
    function onTopLevelCardChanged() {
        if ($scope.currentTopLevelCard === name) {
            $scope.topLevelCardVisible = true;
            $scope.topLevelIconUrl = "images/collapse.svg";
            $scope.topLevelIconVerb = "Collapse";
        } else {
            $scope.topLevelCardVisible = false;
            $scope.topLevelIconUrl = "images/expand.svg";
            $scope.topLevelIconVerb = "Expand";
        }
    }
    $scope.cardHeadingText = headingText;
    $scope.cardNumber = $scope.addNotifyTopLevelCardSelect(onTopLevelCardChanged);
    $scope.toggleTopLevelCardSelect = function() {
        if ($scope.currentTopLevelCard === name)
            $scope.currentTopLevelCard = "";
        else
            $scope.currentTopLevelCard = name;
        onTopLevelCardChanged();
    };
    onTopLevelCardChanged();
}
var mainModule = angular.module("mainModule", []);
mainModule.controller("mainController", function($scope) {
    var notifyCardChange = [];
    var uri = new URL('http://tempuri.org/my%20path/my name/mypage.aspx?yours=mine+theirs&see&me=%20#hash%3Ddone');
    $scope.protocol = uri.protocol;
    $scope.pathname = uri.pathname;
    var iterator = uri.searchParams[Symbol.iterator]();
    var r = iterator.next();
    var v = r.value[0];
    $scope.qp1 = (typeof (v) === 'string') ? JSON.stringify(v) : typeof (v);
    v = r.value[1];
    $scope.qp2 = (typeof (v) === 'string') ? JSON.stringify(v) : typeof (v);
    $scope.hash = uri.hash;
    $scope.addNotifyTopLevelCardSelect = function(f) {
        if (typeof(f) === "function")
            notifyCardChange.push(f);
        return notifyCardChange.length;
    };
    $scope.setTopLevelCardVisible = function(n) {
        if (n === $scope.currentTopLevelCard)
            return;
        localStorage.setItem("currentTopLevelCard", n);
        $scope.currentTopLevelCard = n;
        notifyCardChange.filter(function(f) { f(n); });
    };

    $scope.currentTopLevelCard = "";

    $scope.infoDialog = $scope.$new();
    $scope.infoDialog.visible = false;
    $scope.infoDialog.title = "";
    $scope.infoDialog.message = "";
    $scope.showInfoDialog = function(message, title) {
        var s = Utility.asString(title, true);
        $scope.infoDialog.title = (s.length > 0) ? s : "Notice";
        $scope.infoDialog.message = Utility.asString(message, true);
        $scope.infoDialog.visible = true;
    };
    $scope.infoDialog.close = function() { $scope.infoDialog.visible = false; };

    $scope.warningDialog = $scope.$new();
    $scope.warningDialog.visible = false;
    $scope.warningDialog.title = "";
    $scope.warningDialog.message = "";
    $scope.showWarningDialog = function(message, title) {
        var s = Utility.asString(title, true);
        $scope.warningDialog.title = (s.length > 0) ? s : "Warning";
        $scope.warningDialog.message = Utility.asString(message, true);
        $scope.warningDialog.visible = true;
    };
    $scope.warningDialog.close = function() { $scope.warningDialog.visible = false; };

    var s = localStorage.getItem("currentTopLevelCard");
    $scope.setTopLevelCardVisible((Utility.isNil(s) || s.length == 0) ? "adminLogins" : s);

    $scope.repositoryBaseUrl = 'https://github.com/erwinel';
});
mainModule.controller("adminLoginsController", function($scope) {
    setupTopLevelCardChange($scope, "adminLogins", "Add Administrative Logins");
});
mainModule.controller("importInitiaUpdateSetController", function($scope) {
    setupTopLevelCardChange($scope, "importInitiaUpdateSet", "Import Initial Update Set");
});
mainModule.controller("importUtilityAppController", function($scope) {
    setupTopLevelCardChange($scope, "importUtilityApp", "Import Utility Application");
});
mainModule.controller("initialConfigController", function($scope) {
    setupTopLevelCardChange($scope, "initialConfig", "Initial Config");
});
mainModule.controller("uploadLogoImageController", function($scope) {
    setupTopLevelCardChange($scope, "uploadLogoImage", "Upload logo image");
});
mainModule.controller("bulkPluginActivationController", function($scope) {
    setupTopLevelCardChange($scope, "bulkPluginActivation", "Bulk Plugin Activation");
});
mainModule.controller("activeDirectoryImportController", function($scope) {
    setupTopLevelCardChange($scope, "activeDirectoryImport", "Configure Active Directory Import");
});
mainModule.controller("importPhysNetworksController", function($scope) {
    setupTopLevelCardChange($scope, "importPhysNetworks", "Import Physical Networks Application");
});
mainModule.controller("serviceCatalogConfigController", function($scope) {
    setupTopLevelCardChange($scope, "serviceCatalogConfig", "Import Service Catalog Update Set");
});