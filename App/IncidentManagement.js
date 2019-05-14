/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="MainModule.ts" />
/// <reference path="CollapsibleCardControllers.ts" />
var inicidentManagment;
(function (inicidentManagment) {
    class InicidentManagmentController extends cards.CardParentController {
        constructor($scope) {
            super($scope);
            this.$scope = $scope;
        }
    }
    app.MainModule.controller("InicidentManagmentController", ['$scope', InicidentManagmentController]);
})(inicidentManagment || (inicidentManagment = {}));
