/// <reference path="app.d.ts" />
declare class MyClass {
    value: number;
}
interface IMainManualScope extends IMainControllerScope {
    manualValue: number;
    manualObj: MyClass;
}
interface IMainControllerScope extends ng.IScope {
    baseValue: number;
    baseObj: MyClass;
    manual: IMainManualScope;
    incBaseValue: Function;
    incBaseObj: Function;
    incManualBaseValue: Function;
    incManualBaseObj: Function;
    incManualValue: Function;
    incManualObj: Function;
}
interface INestedControllerScope extends IMainControllerScope {
    $parent: IMainControllerScope;
}
declare let module: ng.IModule;
