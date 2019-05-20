/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />
/// <reference path="app.ts" />
/// <reference path="cards.ts" />
var inicidentManagment;
(function (inicidentManagment) {
    class InicidentManagmentController extends cards.CardParentController {
        constructor($scope) {
            super($scope);
            this.$scope = $scope;
        }
    }
    app.appModule.controller("InicidentManagmentController", ['$scope', InicidentManagmentController]);
})(inicidentManagment || (inicidentManagment = {}));
