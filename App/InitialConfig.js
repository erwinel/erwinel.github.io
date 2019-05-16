/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="app.ts" />
/// <reference path="cards.ts" />
var initialConfig;
(function (initialConfig) {
    class topLevelCardController extends cards.CardController {
        constructor($scope, name, headingText) {
            super($scope, name, headingText);
            this.$scope = $scope;
        }
    }
    class InitialConfigController extends cards.CardParentController {
        constructor($scope) {
            super($scope);
            this.$scope = $scope;
            $scope.cardNames = ['adminLogins', 'importInitiaUpdateSet', 'importUtilityApp', 'initialConfig', 'uploadLogoImage', 'bulkPluginActivation', 'activeDirectoryImport', 'importPhysNetworks',
                'serviceCatalogConfig'];
            $scope.selectedCard = 'adminLogins';
        }
    }
    app.MainModule.controller("InitialConfigController", ['$scope', InitialConfigController]);
    class adminLoginsController extends topLevelCardController {
        constructor($scope) { super($scope, adminLoginsController.cardName, 'Add Administrative Logins'); }
    }
    adminLoginsController.cardName = 'adminLogins';
    app.MainModule.controller("adminLoginsController", ['$scope', adminLoginsController]);
    class importInitiaUpdateSetController extends topLevelCardController {
        constructor($scope) { super($scope, importInitiaUpdateSetController.cardName, 'Import Initial Update Set'); }
    }
    importInitiaUpdateSetController.cardName = 'importInitiaUpdateSet';
    app.MainModule.controller("importInitiaUpdateSetController", ['$scope', importInitiaUpdateSetController]);
    class importUtilityAppController extends topLevelCardController {
        constructor($scope) { super($scope, importUtilityAppController.cardName, 'Import Utility Application'); }
    }
    importUtilityAppController.cardName = 'importUtilityApp';
    app.MainModule.controller("importUtilityAppController", ['$scope', importUtilityAppController]);
    class initialConfigController extends topLevelCardController {
        constructor($scope) { super($scope, initialConfigController.cardName, 'Initial Config'); }
    }
    initialConfigController.cardName = 'initialConfig';
    app.MainModule.controller("initialConfigController", ['$scope', initialConfigController]);
    class uploadLogoImageController extends topLevelCardController {
        constructor($scope) { super($scope, uploadLogoImageController.cardName, 'Upload logo image'); }
    }
    uploadLogoImageController.cardName = 'uploadLogoImage';
    app.MainModule.controller("uploadLogoImageController", ['$scope', uploadLogoImageController]);
    class bulkPluginActivationController extends topLevelCardController {
        constructor($scope) { super($scope, bulkPluginActivationController.cardName, 'Bulk Plugin Activation'); }
    }
    bulkPluginActivationController.cardName = 'bulkPluginActivation';
    app.MainModule.controller("bulkPluginActivationController", ['$scope', bulkPluginActivationController]);
    class activeDirectoryImportController extends topLevelCardController {
        constructor($scope) { super($scope, activeDirectoryImportController.cardName, 'Configure Active Directory Import'); }
    }
    activeDirectoryImportController.cardName = 'activeDirectoryImport';
    app.MainModule.controller("activeDirectoryImportController", ['$scope', activeDirectoryImportController]);
    class importPhysNetworksController extends topLevelCardController {
        constructor($scope) { super($scope, importPhysNetworksController.cardName, 'Import Physical Networks Application'); }
    }
    importPhysNetworksController.cardName = 'importPhysNetworks';
    app.MainModule.controller("importPhysNetworksController", ['$scope', importPhysNetworksController]);
    class serviceCatalogConfigController extends topLevelCardController {
        constructor($scope) { super($scope, serviceCatalogConfigController.cardName, 'Import Service Catalog Update Set'); }
    }
    serviceCatalogConfigController.cardName = 'serviceCatalogConfig';
    app.MainModule.controller("serviceCatalogConfigController", ['$scope', serviceCatalogConfigController]);
    // #endregion
})(initialConfig || (initialConfig = {}));
