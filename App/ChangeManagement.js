/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />
/// <reference path="app.ts" />
/// <reference path="cards.ts" />
var changeManagment;
(function (changeManagment) {
    class ChangeManagmentController extends cards.CardParentController {
        constructor($scope, settings) {
            super($scope);
            this.$scope = $scope;
            $scope.serviceNowUrl = settings.serviceNowUrl;
            $scope.gitRepositoryBaseUrl = settings.gitRepositoryBaseUrl;
        }
    }
    app.appModule.controller("changeManagmentController", ['$scope', "targetSysConfigSettings", ChangeManagmentController]);
})(changeManagment || (changeManagment = {}));
