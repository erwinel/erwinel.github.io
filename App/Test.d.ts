/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
declare class AppConfigDataService {
    private $log;
    private _serviceNowUrl;
    private _serviceNowUrlChangedCallback;
    constructor($log: ng.ILogService);
    serviceNowUrl(value?: URL): URL;
    onServiceNowUrlChanged<T>(callback: {
        (this: T, value: URL): void;
    }, thisArg: T): void;
    onServiceNowUrlChanged(callback: {
        (value: URL): void;
    }): void;
    getServiceNowUrlString(relativeURL?: string): string;
    private raiseServiceNowUrlChanged;
}
interface IMainScope extends ng.IScope {
    ctrl: MainController;
    serviceNowUrl: string;
    cssClass: string[];
}
declare class MainController implements ng.IController {
    private $scope;
    private appConfigData;
    private $log;
    constructor($scope: IMainScope, appConfigData: AppConfigDataService, $log: ng.ILogService);
    changeServiceNowUrlClick(event: ng.IAngularEvent): void;
    $doCheck(): void;
}
interface ISnInstanceLinkScope extends ng.IScope {
    href: string;
    relativeUrl?: string;
    relativeUrlModel?: string;
}
interface ISnInstanceLinkAttributes extends ng.IAttributes {
    target?: string;
}
declare class SnInstanceLinkController implements ng.IController {
    private $scope;
    private appConfigData;
    private $log;
    constructor($scope: ISnInstanceLinkScope, appConfigData: AppConfigDataService, $log: ng.ILogService);
    $doCheck(): void;
}
declare let module: ng.IModule;
