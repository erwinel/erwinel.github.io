/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
class AppConfigDataService {
    constructor($log) {
        this.$log = $log;
        this._serviceNowUrl = new URL('http://tempuri.org');
        $log.info("AppConfigDataService constructor");
    }
    serviceNowUrl(value) {
        if (typeof value === "object" && value !== null && value instanceof URL && this._serviceNowUrl.href !== value.href) {
            this.$log.info("Changing URL");
            this._serviceNowUrl = value;
            this.raiseServiceNowUrlChanged();
        }
        return this._serviceNowUrl;
    }
    onServiceNowUrlChanged(callback, thisArg) {
        if (typeof callback !== "function")
            return;
        let serviceNowUrlChangedCallback = this._serviceNowUrlChangedCallback;
        if (arguments.length > 1) {
            if (typeof serviceNowUrlChangedCallback === "function")
                this._serviceNowUrlChangedCallback = (value) => { try {
                    serviceNowUrlChangedCallback(value);
                }
                finally {
                    callback.call(thisArg, value);
                } };
            else
                this._serviceNowUrlChangedCallback = (value) => { callback.call(thisArg, value); };
            callback.call(thisArg, this._serviceNowUrl);
            return;
        }
        if (typeof serviceNowUrlChangedCallback === "function")
            this._serviceNowUrlChangedCallback = (value) => { try {
                serviceNowUrlChangedCallback(value);
            }
            finally {
                callback(value);
            } };
        else
            this._serviceNowUrlChangedCallback = callback;
        callback(this._serviceNowUrl);
    }
    getServiceNowUrlString(relativeURL) {
        if (typeof relativeURL === "string" && relativeURL.length > 0 && relativeURL !== ".")
            return (new URL(relativeURL, this._serviceNowUrl)).href;
        return this._serviceNowUrl.href;
    }
    raiseServiceNowUrlChanged() {
        let callback = this._serviceNowUrlChangedCallback;
        if (typeof callback === "function")
            callback(this._serviceNowUrl);
    }
}
class MainController {
    constructor($scope, appConfigData, $log) {
        this.$scope = $scope;
        this.appConfigData = appConfigData;
        this.$log = $log;
        $log.info("MainController constructor start");
        $scope.serviceNowUrl = appConfigData.getServiceNowUrlString();
        $scope.cssClass = ['alert', 'alert-success'];
        $log.info("MainController constructor end");
    }
    changeServiceNowUrlClick(event) {
        if (typeof this.$scope.serviceNowUrl === "string" && this.$scope.serviceNowUrl.trim().length > 0)
            try {
                this.$log.info("Setting URL");
                this.appConfigData.serviceNowUrl(new URL(this.$scope.serviceNowUrl));
                this.$scope.cssClass = ['alert', 'alert-success'];
            }
            catch (e) {
                this.$log.error("Error changing URL: " + 3);
                this.$scope.cssClass = ['alert', 'alert-danger'];
            }
        else {
            this.$log.warn("URL is empty");
            this.$scope.cssClass = ['alert', 'alert-warning'];
        }
        if (!event.defaultPrevented)
            event.preventDefault();
    }
    $doCheck() { }
}
class SnInstanceLinkController {
    constructor($scope, appConfigData, $log) {
        this.$scope = $scope;
        this.appConfigData = appConfigData;
        this.$log = $log;
        $log.info("SnInstanceLinkController constructor start");
        appConfigData.onServiceNowUrlChanged((value) => {
            $log.info("SnInstanceLinkController onServiceNowUrlChanged start");
            if (typeof $scope.relativeUrlModel === "string" && $scope.relativeUrlModel.length > 0)
                $scope.href = appConfigData.getServiceNowUrlString($scope.relativeUrlModel);
            else
                $scope.href = appConfigData.getServiceNowUrlString($scope.relativeUrl);
            $log.info("SnInstanceLinkController onServiceNowUrlChanged end; href=" + angular.toJson($scope.href));
        });
        $log.info("SnInstanceLinkController constructor end");
    }
    $doCheck() { }
}
let module = angular.module("mainModule", []);
module.service('appConfigData', ['$log', AppConfigDataService]).directive("snInstanceLink", () => {
    return {
        restrict: "E",
        controller: ['$scope', 'appConfigData', '$log', SnInstanceLinkController],
        transclude: true,
        link: (scope, element, attrs) => {
            if (typeof attrs.target !== "string")
                attrs.$set("target", "_blank");
        },
        scope: {
            relativeUrl: "@?",
            relativeUrlModel: "=?"
        },
        replace: true,
        template: '<a ng-href="{{href}}" ng-transclude></a>'
    };
}).controller("mainController", ['$scope', 'appConfigData', '$log', MainController]);
