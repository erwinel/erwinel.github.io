/// <reference path="MainModule.ts" />
class MyClass {
    constructor() {
        this.value = 0;
    }
}
let module = angular.module("mainModule", []);
module.controller("mainController", function ($scope) {
    $scope.baseValue = 0;
    $scope.baseObj = new MyClass();
    $scope.manual = $scope.$new();
    $scope.manual.manualValue = 0;
    $scope.manual.manualObj = new MyClass();
    $scope.incBaseValue = function () { $scope.baseValue++; };
    $scope.incBaseObj = function () { $scope.baseObj.value++; };
    $scope.incManualBaseValue = function () { $scope.manual.baseValue++; };
    $scope.incManualBaseObj = function () { $scope.manual.baseObj.value++; };
    $scope.incManualValue = function () { $scope.manual.manualValue++; };
    $scope.incManualObj = function () { $scope.manual.manualObj.value++; };
    $scope.$watch('baseValue', () => alert('mainController.baseValue'));
    $scope.manual.$watch('baseValue', () => alert('mainController.manual.baseValue'));
    $scope.manual.$watch('manualValue', () => alert('mainController.manual.manualValue'));
});
module.controller("nestedController", function ($scope) {
    $scope.nestedIncBaseValue = function () { $scope.baseValue++; };
    $scope.parentIncBaseValue = function () { $scope.$parent.baseValue++; };
    $scope.nestedIncBaseObj = function () { $scope.baseObj.value++; };
    $scope.parentIncBaseObj = function () { $scope.$parent.baseObj.value++; };
    $scope.nestedIncManualBaseValue = function () { $scope.manual.baseValue++; };
    $scope.parentIncManualBaseValue = function () { $scope.$parent.manual.baseValue++; };
    $scope.nestedIncManualBaseObj = function () { $scope.manual.baseObj.value++; };
    $scope.parentIncManualBaseObj = function () { $scope.$parent.manual.baseObj.value++; };
    $scope.nestedIncManualValue = function () { $scope.manual.manualValue++; };
    $scope.parentIncManualValue = function () { $scope.$parent.manual.manualValue++; };
    $scope.nestedIncManualObj = function () { $scope.manual.manualObj.value++; };
    $scope.parentIncManualObj = function () { $scope.$parent.manual.manualObj.value++; };
    $scope.$watch('baseValue', () => alert('nestedController.baseValue'));
    $scope.manual.$watch('baseValue', () => alert('nestedController.manual.baseValue'));
    $scope.manual.$watch('manualValue', () => alert('nestedController.manual.manualValue'));
});
