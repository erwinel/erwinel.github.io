(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-config-settings.service.ts":
/*!************************************************!*\
  !*** ./src/app/app-config-settings.service.ts ***!
  \************************************************/
/*! exports provided: AppConfigSettingsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppConfigSettingsService", function() { return AppConfigSettingsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppConfigSettingsService = /** @class */ (function () {
    function AppConfigSettingsService(http) {
        this.http = http;
    }
    AppConfigSettingsService.prototype.getSettings = function () {
        return this.http.get('./assets/appConfigSettings.json', { observe: 'body' });
    };
    AppConfigSettingsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], AppConfigSettingsService);
    return AppConfigSettingsService;
}());



/***/ }),

/***/ "./src/app/app-home/app-home.component.css":
/*!*************************************************!*\
  !*** ./src/app/app-home/app-home.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app-home/app-home.component.html":
/*!**************************************************!*\
  !*** ./src/app/app-home/app-home.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <div class=\"card-header\">\n    <h2>Overview</h2>\n  </div>\n  <div class=\"card-body\">\n    The collection of Github repositories referenced by this documentation contain update sets, source code and documentation\n    for installing and maintaining custom ServiceNow applications as well as for the initial configuration of ServiceNow\n    instances.\n    <p>See\n      <!-- <page-ref-link menu-path=\"InitialConfig\" /> for initial ServiceNow configuration steps. See\n      <page-ref-link menu-path=\"UpdateSets\" /> for information on global update sets. Otherwise, use other menu options for individual application documentation. --></p>\n  </div>\n</div>\n<div class=\"card\">\n  <div class=\"card-header\">\n    <h2>Development</h2>\n  </div>\n  <div class=\"card-body\">\n    There are 2 special repositories,\n    <a href=\"../ServiceNowServerDev\" target=\"_blank\">Scripting/ServiceNowServerDev</a>\n    and\n    <a href=\"../ServiceNowClientDev\" target=\"_blank\">Scripting/ServiceNowClientDev</a>, which are intended to assist with complex source code development for other applications. These repositories use node.js\n    and NPM modules to compile TypeScript sources and generate JavaScript. This compiled JavaScript must then be manually\n    ported to the actual JavaScript code that will be used in the individual applications.\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/app-home/app-home.component.ts":
/*!************************************************!*\
  !*** ./src/app/app-home/app-home.component.ts ***!
  \************************************************/
/*! exports provided: AppHomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppHomeComponent", function() { return AppHomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app.component */ "./src/app/app.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppHomeComponent = /** @class */ (function () {
    function AppHomeComponent(_app) {
        this._app = _app;
    }
    AppHomeComponent.prototype.ngOnInit = function () {
        this._app.titleText = _app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"].DefaultTitleText;
        this._app.descriptionText = '';
    };
    AppHomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-app-home',
            template: __webpack_require__(/*! ./app-home.component.html */ "./src/app/app-home/app-home.component.html"),
            styles: [__webpack_require__(/*! ./app-home.component.css */ "./src/app/app-home/app-home.component.css")]
        }),
        __metadata("design:paramtypes", [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]])
    ], AppHomeComponent);
    return AppHomeComponent;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_home_app_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-home/app-home.component */ "./src/app/app-home/app-home.component.ts");
/* harmony import */ var _initial_sn_config_initial_sn_config_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./initial-sn-config/initial-sn-config.component */ "./src/app/initial-sn-config/initial-sn-config.component.ts");
/* harmony import */ var _update_sets_update_sets_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./update-sets/update-sets.component */ "./src/app/update-sets/update-sets.component.ts");
/* harmony import */ var _sn_applications_sn_applications_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sn-applications/sn-applications.component */ "./src/app/sn-applications/sn-applications.component.ts");
/* harmony import */ var _sn_dev_info_sn_dev_info_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sn-dev-info/sn-dev-info.component */ "./src/app/sn-dev-info/sn-dev-info.component.ts");
/* harmony import */ var _update_set_detail_update_set_detail_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./update-set-detail/update-set-detail.component */ "./src/app/update-set-detail/update-set-detail.component.ts");
/* harmony import */ var _sn_application_detail_sn_application_detail_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./sn-application-detail/sn-application-detail.component */ "./src/app/sn-application-detail/sn-application-detail.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var routes = [
    { path: 'initial-config', component: _initial_sn_config_initial_sn_config_component__WEBPACK_IMPORTED_MODULE_3__["InitialSnConfigComponent"] },
    { path: 'update-sets', component: _update_sets_update_sets_component__WEBPACK_IMPORTED_MODULE_4__["UpdateSetsComponent"] },
    { path: 'update-set/:id', component: _update_set_detail_update_set_detail_component__WEBPACK_IMPORTED_MODULE_7__["UpdateSetDetailComponent"] },
    { path: 'applications', component: _sn_applications_sn_applications_component__WEBPACK_IMPORTED_MODULE_5__["SnApplicationsComponent"] },
    { path: 'application/:id', component: _sn_application_detail_sn_application_detail_component__WEBPACK_IMPORTED_MODULE_8__["SnApplicationDetailComponent"] },
    { path: 'dev-info', component: _sn_dev_info_sn_dev_info_component__WEBPACK_IMPORTED_MODULE_6__["SnDevInfoComponent"] },
    { path: '', component: _app_home_app_home_component__WEBPACK_IMPORTED_MODULE_2__["AppHomeComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--[if lt IE 7]>\n  <p class=\"browsehappy\">You are using an <strong>outdated</strong> browser. Please <a href=\"#\">upgrade your browser</a> to improve your experience.</p>\n<![endif]-->\n<header class=\"container-fluid border border-secondary p-sm-1 defaultHeader\">\n  <h1>{{titleText}}</h1>{{descriptionText}}\n  <!-- <img width=\"300\" alt=\"Angular Logo\" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==\" /> -->\n</header>\n<nav class=\"container-fluid navbar navbar-expand-lg navbar-light bg-light border border-light p-sm-1 mr-md-3\">\n  <ul class=\"navbar-nav mr-auto\">\n    <li class=\"nav-item border active border-secondary bg-light\">\n      <a routerLink=\"/\" class=\"nav-link text-dark\">Home</a>\n    </li>\n    <li class=\"nav-item border border-secondary bg-dark\">\n      <a routerLink=\"/initial-config\" class=\"nav-link text-light\">Initial Config</a>\n    </li>\n    <li class=\"nav-item border border-secondary bg-dark\">\n      <a routerLink=\"/update-sets\" class=\"nav-link text-light\">Update Sets</a>\n    </li>\n    <li class=\"nav-item border border-secondary bg-dark\">\n      <a routerLink=\"/applications\" class=\"nav-link text-light\">Custom Apps</a>\n    </li>\n    <li class=\"nav-item border border-secondary bg-dark\">\n      <a routerLink=\"/dev-info\" class=\"nav-link text-light\">Dev Info</a>\n    </li>\n    <li class=\"nav-item border border-secondary bg-dark\">\n      <a routerLink=\"/server-code-snippets\" class=\"nav-link text-light\">Server-Side Code Snippets</a>\n    </li>\n  </ul>\n</nav>\n<!-- <aside class=\"float-right d-inline-flex\">\n  <ul class=\"nav flex-column\">\n    <li class=\"nav-item\">\n      <a href=\"#\" class=\"nav-link\"></a>\n    </li>\n  </ul>\n</aside> -->\n<section class=\"container-fluid border border-light p-md-3\">\n  <router-outlet></router-outlet>\n</section>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_config_settings_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-config-settings.service */ "./src/app/app-config-settings.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(appConfigSettingsSvc) {
        this.titleText = AppComponent_1.DefaultTitleText;
        this.descriptionText = '';
        this._appConfigSettings = appConfigSettingsSvc.getSettings();
    }
    AppComponent_1 = AppComponent;
    Object.defineProperty(AppComponent.prototype, "appConfigSettings", {
        get: function () { return this._appConfigSettings; },
        enumerable: true,
        configurable: true
    });
    var AppComponent_1;
    AppComponent.DefaultTitleText = 'ServiceNow Implementation, Dev and Maintenance';
    AppComponent = AppComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_app_config_settings_service__WEBPACK_IMPORTED_MODULE_1__["AppConfigSettingsService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _app_home_app_home_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-home/app-home.component */ "./src/app/app-home/app-home.component.ts");
/* harmony import */ var _sn_applications_sn_applications_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sn-applications/sn-applications.component */ "./src/app/sn-applications/sn-applications.component.ts");
/* harmony import */ var _initial_sn_config_initial_sn_config_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./initial-sn-config/initial-sn-config.component */ "./src/app/initial-sn-config/initial-sn-config.component.ts");
/* harmony import */ var _update_sets_update_sets_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./update-sets/update-sets.component */ "./src/app/update-sets/update-sets.component.ts");
/* harmony import */ var _sn_dev_info_sn_dev_info_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./sn-dev-info/sn-dev-info.component */ "./src/app/sn-dev-info/sn-dev-info.component.ts");
/* harmony import */ var _update_set_detail_update_set_detail_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./update-set-detail/update-set-detail.component */ "./src/app/update-set-detail/update-set-detail.component.ts");
/* harmony import */ var _sn_application_detail_sn_application_detail_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./sn-application-detail/sn-application-detail.component */ "./src/app/sn-application-detail/sn-application-detail.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _large_modal_large_modal_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./large-modal/large-modal.component */ "./src/app/large-modal/large-modal.component.ts");
/* harmony import */ var _popup_modal_popup_modal_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./popup-modal/popup-modal.component */ "./src/app/popup-modal/popup-modal.component.ts");
/* harmony import */ var _howto_import_update_set_howto_import_update_set_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./howto-import-update-set/howto-import-update-set.component */ "./src/app/howto-import-update-set/howto-import-update-set.component.ts");
/* harmony import */ var _howto_import_application_howto_import_application_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./howto-import-application/howto-import-application.component */ "./src/app/howto-import-application/howto-import-application.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _server_code_snippets_server_code_snippets_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./server-code-snippets/server-code-snippets.component */ "./src/app/server-code-snippets/server-code-snippets.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _app_home_app_home_component__WEBPACK_IMPORTED_MODULE_4__["AppHomeComponent"],
                _sn_applications_sn_applications_component__WEBPACK_IMPORTED_MODULE_5__["SnApplicationsComponent"],
                _initial_sn_config_initial_sn_config_component__WEBPACK_IMPORTED_MODULE_6__["InitialSnConfigComponent"],
                _update_sets_update_sets_component__WEBPACK_IMPORTED_MODULE_7__["UpdateSetsComponent"],
                _sn_dev_info_sn_dev_info_component__WEBPACK_IMPORTED_MODULE_8__["SnDevInfoComponent"],
                _update_set_detail_update_set_detail_component__WEBPACK_IMPORTED_MODULE_9__["UpdateSetDetailComponent"],
                _sn_application_detail_sn_application_detail_component__WEBPACK_IMPORTED_MODULE_10__["SnApplicationDetailComponent"],
                _large_modal_large_modal_component__WEBPACK_IMPORTED_MODULE_12__["LargeModalComponent"],
                _popup_modal_popup_modal_component__WEBPACK_IMPORTED_MODULE_13__["PopupModalComponent"],
                _howto_import_update_set_howto_import_update_set_component__WEBPACK_IMPORTED_MODULE_14__["HowtoImportUpdateSetComponent"],
                _howto_import_application_howto_import_application_component__WEBPACK_IMPORTED_MODULE_15__["HowtoImportApplicationComponent"],
                _server_code_snippets_server_code_snippets_component__WEBPACK_IMPORTED_MODULE_17__["ServerCodeSnippetsComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_16__["HttpClientModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_11__["NgbModule"].forRoot()
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
            entryComponents: [_large_modal_large_modal_component__WEBPACK_IMPORTED_MODULE_12__["LargeModalComponent"], _popup_modal_popup_modal_component__WEBPACK_IMPORTED_MODULE_13__["PopupModalComponent"], _howto_import_update_set_howto_import_update_set_component__WEBPACK_IMPORTED_MODULE_14__["HowtoImportUpdateSetComponent"], _howto_import_application_howto_import_application_component__WEBPACK_IMPORTED_MODULE_15__["HowtoImportApplicationComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/howto-import-application/howto-import-application.component.css":
/*!*********************************************************************************!*\
  !*** ./src/app/howto-import-application/howto-import-application.component.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/howto-import-application/howto-import-application.component.html":
/*!**********************************************************************************!*\
  !*** ./src/app/howto-import-application/howto-import-application.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-template #instructions>\n  <ol>\n      <li class=\"align-text-top\">\n        Navigate to\n        <samp>System Applications</samp> &rArr;\n        <samp>Studio</samp>. Once you click on\n        <samp>Studio</samp>, the application studio will open in separate browser tab.\n        <button (click)=\"openFigure('Example of navigation', 'assets/images/initialConfig/systemApplicationsStudio_lg.png')\" class=\"btn btn-outline-primary mb-2 mr-2\">\n          <img src=\"assets/images/initialConfig/systemApplicationsStudio_sm.png\" alt=\"Click to view example of navigation\" class=\"figure-img img-fluid rounded\"\n          />\n        </button>\n      </li>\n      <li class=\"align-text-top\">\n        Click on the\n        <samp>Import from Source Control</samp> button in the popup dialog.\n        <button (click)=\"openFigure('Example of Select Application dialog', 'assets/images/initialConfig/importFromSourceControl_lg.png')\"\n          class=\"btn btn-outline-primary mb-2 mr-2\">\n          <img src=\"assets/images/initialConfig/importFromSourceControl_sm.png\" alt=\"Click to view example of Select Application dialog\"\n            class=\"figure-img img-fluid rounded\" />\n        </button>\n      </li>\n      <li class=\"align-text-top\">\n        <ng-container *ngIf=\"hasRepositoryUrl; else noRepositoryUrl\">\n          Enter <kbd>{{repositoryUrl}}</kbd> as the URL to the source repository.\n        </ng-container>\n        <ng-template #noRepositoryUrl>\n            Enter the URL to the repository of the application to import.\n        </ng-template>\n      </li>\n      <li class=\"align-text-top\">Enter credentials for connecting to the associated Git repository.\n        <button (click)=\"openFigure('Example of git credentials dialog', 'assets/images/initialConfig/importApplicationDialog_lg.png')\"\n          class=\"btn btn-outline-primary mb-2 mr-2\">\n          <img src=\"assets/images/initialConfig/importApplicationDialog_sm.png\" alt=\"Click to view example of git credentials dialog\"\n            class=\"figure-img img-fluid rounded\" />\n        </button>\n      </li>\n      <li class=\"align-text-top\">Progress will be indicated as it imports the application. Once it is finished, click the\n        <samp>Select Application</samp> button.\n        <button (click)=\"openFigure('Example of application import progress', 'assets/images/initialConfig/gitImportProgress_lg.png')\"\n          class=\"btn btn-outline-primary mb-2 mr-2\">\n          <img src=\"assets/images/initialConfig/gitImportProgress_sm.png\" alt=\"Click to view example of application import progress\"\n            class=\"figure-img img-fluid rounded\" />\n        </button>\n        &rArr;\n        <button (click)=\"openFigure('Example of application import success', 'assets/images/initialConfig/gitImportSuccess_lg.png')\"\n          class=\"btn btn-outline-primary mb-2 mr-2\">\n          <img src=\"assets/images/initialConfig/gitImportSuccess_sm.png\" alt=\"Click to view example of application import success\"\n            class=\"figure-img img-fluid rounded\" />\n        </button>\n      </li>\n      <li class=\"align-text-top\">You should now see the imported application listed.\n        <button (click)=\"openFigure('Example of application selections', 'assets/images/initialConfig/selectApplicationDialog_lg.png')\"\n          class=\"btn btn-outline-primary mb-2 mr-2\">\n          <img src=\"assets/images/initialConfig/selectApplicationDialog_sm.png\" alt=\"Click to view example of application selections\"\n            class=\"figure-img img-fluid rounded\" />\n        </button>\n        &rArr;\n        <button (click)=\"openFigure('Example of selected application', 'assets/images/initialConfig/importApplicationComplete_lg.png')\"\n          class=\"btn btn-outline-primary mb-2 mr-2\">\n          <img src=\"assets/images/initialConfig/importApplicationComplete_sm.png\" alt=\"Click to view example of selected application\"\n            class=\"figure-img img-fluid rounded\" />\n        </button>\n      </li>\n    </ol>\n  </ng-template>\n  <ng-container *ngIf=\"activeModal; else notModal\">\n    <div class=\"modal-header\" *ngIf=\"nestedPopupOpen === false &amp;&amp; titleText !== null &amp;&amp; titleText.trim().length > 0\">\n      <h4 class=\"modal-title\">{{titleText}}</h4>\n      <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"activeModal.dismiss('Cross click')\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\" *ngIf=\"nestedPopupOpen === false\">\n      <ng-container *ngTemplateOutlet=\"instructions\"></ng-container>\n    </div>\n    <div class=\"modal-footer\" *ngIf=\"nestedPopupOpen === false\">\n      <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"activeModal.close('Close click')\">Close</button>\n    </div>\n  </ng-container>\n  <ng-template #notModal>\n    <h2 *ngIf=\"titleText !== null &amp;&amp; titleText.trim().length > 0\">{{titleText}}</h2>\n    <ng-container *ngTemplateOutlet=\"instructions\"></ng-container>\n  </ng-template>\n"

/***/ }),

/***/ "./src/app/howto-import-application/howto-import-application.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/howto-import-application/howto-import-application.component.ts ***!
  \********************************************************************************/
/*! exports provided: HowtoImportApplicationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HowtoImportApplicationComponent", function() { return HowtoImportApplicationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _large_modal_large_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../large-modal/large-modal.component */ "./src/app/large-modal/large-modal.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HowtoImportApplicationComponent = /** @class */ (function () {
    function HowtoImportApplicationComponent(modalService, activeModal) {
        this.modalService = modalService;
        this.activeModal = activeModal;
        this.titleText = 'How to import Update Sets';
        this._hasRepositoryUrl = false;
        this._repositoryUrl = '';
        this._nestedPopupOpen = false;
    }
    Object.defineProperty(HowtoImportApplicationComponent.prototype, "hasRepositoryUrl", {
        get: function () { return this._hasRepositoryUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HowtoImportApplicationComponent.prototype, "repositoryUrl", {
        get: function () { return this._repositoryUrl; },
        set: function (v) {
            this._hasRepositoryUrl = (typeof (v) === 'string' && (v = v.trim()).length > 0);
            this._repositoryUrl = (this._hasRepositoryUrl) ? v : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HowtoImportApplicationComponent.prototype, "nestedPopupOpen", {
        get: function () { return this._nestedPopupOpen; },
        enumerable: true,
        configurable: true
    });
    HowtoImportApplicationComponent.prototype.ngOnInit = function () { };
    HowtoImportApplicationComponent.prototype.openFigure = function (modalTitleText, modalImageUrl) {
        var _this = this;
        var modalRef = this.modalService.open(_large_modal_large_modal_component__WEBPACK_IMPORTED_MODULE_2__["LargeModalComponent"], {
            size: 'lg',
            centered: true,
            backdrop: (typeof (this.activeModal) !== 'object' || this.activeModal === null)
        });
        this._nestedPopupOpen = true;
        modalRef.result.then(function (result) {
            _this._nestedPopupOpen = false;
        }, function (reason) {
            _this._nestedPopupOpen = false;
        });
        modalRef.componentInstance.titleText = modalTitleText;
        modalRef.componentInstance.content = { src: modalImageUrl, alt: modalTitleText };
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], HowtoImportApplicationComponent.prototype, "titleText", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], HowtoImportApplicationComponent.prototype, "repositoryUrl", null);
    HowtoImportApplicationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-howto-import-application',
            template: __webpack_require__(/*! ./howto-import-application.component.html */ "./src/app/howto-import-application/howto-import-application.component.html"),
            styles: [__webpack_require__(/*! ./howto-import-application.component.css */ "./src/app/howto-import-application/howto-import-application.component.css")]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbActiveModal"]])
    ], HowtoImportApplicationComponent);
    return HowtoImportApplicationComponent;
}());



/***/ }),

/***/ "./src/app/howto-import-update-set/howto-import-update-set.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/howto-import-update-set/howto-import-update-set.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/howto-import-update-set/howto-import-update-set.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/howto-import-update-set/howto-import-update-set.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-template #instructions>\n  <ol>\n    <li class=\"align-text-top\">\n      Navigate to\n      <samp>System Update Sets</samp> &rArr;\n      <samp>Retrieved Update Sets</samp>\n      <button (click)=\"openFigure('Navigation and related links example', 'assets/images/initialConfig/relatedLinks_lg.png')\" class=\"btn btn-outline-primary mb-2 mr-2\">\n        <img src=\"assets/images/initialConfig/relatedLinks_sm.png\" alt=\"View navigation and related links example\" class=\"figure-img img-fluid rounded\"\n        />\n      </button>\n    </li>\n    <li class=\"align-text-top\">Click on\n      <samp>Import Update Set from XML</samp> under\n      <em>Related Links</em>\n    </li>\n    <li class=\"align-text-top\">Click on the\n      <samp>Choose File</samp> button and upload\n      <a *ngIf=\"showDownloadLink; else elseTemplate\" href=\"{{downloadLinkUrl}}\" target=\"_blank\">{{updateSetFileNameDisplayText}}</a>\n      <ng-template #elseTemplate>{{updateSetFileNameDisplayText}}</ng-template>\n      <button (click)=\"openFigure('Example of file upload dialog', 'assets/images/initialConfig/chooseFile_lg.png')\" class=\"btn btn-outline-primary mb-2 mr-2\">\n        <img src=\"assets/images/initialConfig/chooseFile_sm.png\" alt=\"Click to view example of file upload dialog\" class=\"figure-img img-fluid rounded\"\n        />\n      </button>\n    </li>\n    <li class=\"align-text-top\">Once it is loaded, open the update set and click the\n      <samp>Preview Update Set</samp> button.\n      <button (click)=\"openFigure('Example of uploaded upset set', 'assets/images/initialConfig/uploaded_lg.png')\" class=\"btn btn-outline-primary mb-2 mr-2\">\n        <img src=\"assets/images/initialConfig/uploaded_sm.png\" alt=\"Click to view example of uploaded upset set\" class=\"figure-img img-fluid rounded\"\n        />\n      </button>\n      &rArr;\n      <button (click)=\"openFigure('Example of preview success popup', 'assets/images/initialConfig/previewSuccess_lg.png')\" class=\"btn btn-outline-primary mb-2 mr-2\">\n        <img src=\"assets/images/initialConfig/previewSuccess_sm.png\" alt=\"View example of preview success popup\" class=\"figure-img img-fluid rounded\"\n        />\n      </button>\n    </li>\n    <li class=\"align-text-top\">After it is validated, click the\n      <samp>Commit Update Set</samp> to apply it.\n      <button (click)=\"openFigure('Example of commit success popup', 'assets/images/initialConfig/commitSuccess_lg.png')\" class=\"btn btn-outline-primary mb-2 mr-2\">\n        <img src=\"assets/images/initialConfig/commitSuccess_sm.png\" alt=\"View example of commit success popup\" class=\"figure-img img-fluid rounded\"\n        />\n      </button>\n    </li>\n  </ol>\n</ng-template>\n<ng-container *ngIf=\"activeModal; else notModal\">\n  <div class=\"modal-header\" *ngIf=\"nestedPopupOpen === false &amp;&amp; titleText !== null &amp;&amp; titleText.trim().length > 0\">\n    <h4 class=\"modal-title\">{{titleText}}</h4>\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"activeModal.dismiss('Cross click')\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\" *ngIf=\"nestedPopupOpen === false\">\n    <ng-container *ngTemplateOutlet=\"instructions\"></ng-container>\n  </div>\n  <div class=\"modal-footer\" *ngIf=\"nestedPopupOpen === false\">\n    <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"activeModal.close('Close click')\">Close</button>\n  </div>\n</ng-container>\n<ng-template #notModal>\n  <h2 *ngIf=\"titleText !== null &amp;&amp; titleText.trim().length > 0\">{{titleText}}</h2>\n  <ng-container *ngTemplateOutlet=\"instructions\"></ng-container>\n</ng-template>\n"

/***/ }),

/***/ "./src/app/howto-import-update-set/howto-import-update-set.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/howto-import-update-set/howto-import-update-set.component.ts ***!
  \******************************************************************************/
/*! exports provided: HowtoImportUpdateSetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HowtoImportUpdateSetComponent", function() { return HowtoImportUpdateSetComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _large_modal_large_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../large-modal/large-modal.component */ "./src/app/large-modal/large-modal.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HowtoImportUpdateSetComponent = /** @class */ (function () {
    function HowtoImportUpdateSetComponent(modalService, activeModal) {
        this.modalService = modalService;
        this.activeModal = activeModal;
        this.titleText = 'How to import Update Sets';
        this.downloadLinkUrl = '';
        this.updateSetFileName = 'Update set XML';
        this._nestedPopupOpen = false;
    }
    Object.defineProperty(HowtoImportUpdateSetComponent.prototype, "nestedPopupOpen", {
        get: function () { return this._nestedPopupOpen; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HowtoImportUpdateSetComponent.prototype, "showDownloadLink", {
        get: function () { return typeof (this.downloadLinkUrl) === 'string' && this.downloadLinkUrl.trim().length > 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HowtoImportUpdateSetComponent.prototype, "updateSetFileNameDisplayText", {
        get: function () {
            if (typeof (this.updateSetFileName) === 'string' && this.updateSetFileName.trim().length > 0)
                return this.updateSetFileName;
            return (typeof (this.downloadLinkUrl) === 'string') ? this.downloadLinkUrl : 'the update set XML file';
        },
        enumerable: true,
        configurable: true
    });
    HowtoImportUpdateSetComponent.prototype.ngOnInit = function () { };
    HowtoImportUpdateSetComponent.prototype.openFigure = function (modalTitleText, modalImageUrl) {
        var _this = this;
        var modalRef = this.modalService.open(_large_modal_large_modal_component__WEBPACK_IMPORTED_MODULE_2__["LargeModalComponent"], {
            size: 'lg',
            centered: true,
            backdrop: (typeof (this.activeModal) !== 'object' || this.activeModal === null)
        });
        this._nestedPopupOpen = true;
        modalRef.result.then(function (result) {
            _this._nestedPopupOpen = false;
        }, function (reason) {
            _this._nestedPopupOpen = false;
        });
        modalRef.componentInstance.titleText = modalTitleText;
        modalRef.componentInstance.content = { src: modalImageUrl, alt: modalTitleText };
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], HowtoImportUpdateSetComponent.prototype, "titleText", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], HowtoImportUpdateSetComponent.prototype, "downloadLinkUrl", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], HowtoImportUpdateSetComponent.prototype, "updateSetFileName", void 0);
    HowtoImportUpdateSetComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-howto-import-update-set',
            template: __webpack_require__(/*! ./howto-import-update-set.component.html */ "./src/app/howto-import-update-set/howto-import-update-set.component.html"),
            styles: [__webpack_require__(/*! ./howto-import-update-set.component.css */ "./src/app/howto-import-update-set/howto-import-update-set.component.css")]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbActiveModal"]])
    ], HowtoImportUpdateSetComponent);
    return HowtoImportUpdateSetComponent;
}());



/***/ }),

/***/ "./src/app/initial-sn-config/initial-sn-config.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/initial-sn-config/initial-sn-config.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/initial-sn-config/initial-sn-config.component.html":
/*!********************************************************************!*\
  !*** ./src/app/initial-sn-config/initial-sn-config.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <div class=\"card-header\">\n    <h2 id=\"createAdminAccount\">1. Create Administrative Logins</h2>\n  </div>\n  <div class=\"card-body\">\n    <div class=\"detail\">Create application administrative accounts in ServiceNow and assign the following roles:\n      <ul>\n        <li>admin</li>\n        <li>security_admin</li>\n      </ul>\n    </div>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <h3>Accounts on internet cloud instance</h3>\n      </div>\n      <div class=\"card-body\">\n        In order to properly attribute where changes were made, administrative accounts on internet cloud instances (hosted by ServiceNow)\n        the login account name should start with the person's last name, followed by their first initial, and end in \"_da\".\n        <br />Example:\n        <samp>Leonard Erwine &rArr; erwinel_da</samp>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"card\">\n  <div class=\"card-header\">\n    <h2 id=\"loadInitialGlobalUpdate\">2. Initial Global Update Set</h2>\n  </div>\n  <div class=\"card-body\">\n    <div class=\"detail\">Load and apply the <a href=\"{{howtoImportUpdateSetFolder}}/{{howtoImportUpdateSetFileName}}\" target=\"_blank\">{{howtoImportUpdateSetFileName}}</a> File in the\n      <var>{{howtoImportUpdateSetFolder}}</var> folder of this documentation to apply the initial global update set, which prepares the ServiceNow instance.</div>\n      <div><button (click)=\"openHowtoImportUpdateSet()\" class=\"btn btn-outline-primary mb-2 mr-2\">Click Here</button> to view instructions for applying update sets.</div>\n  </div>\n</div>\n\n<div class=\"card\">\n  <div class=\"card-header\">\n    <h2 id=\"importUtils\">3. Import Utility Application</h2>\n  </div>\n  <div class=\"card-body\">\n    <div class=\"detail\">In this step you will be importing a utility application which includes many utility framework functionality to support\n      other scripts. This will also create a custom system property which can be used by automated processes to determine\n      whether the current instance is for production, UAT, Testing, Development or if it is a sandbox instance.</div>\n    <ol>\n      <li>Import the util application from <kbd>{{utilRepositoryUrl}}</kbd>.\n        <div><button (click)=\"openHowtoImportApplication('util')\" class=\"btn btn-outline-primary mb-2 mr-2\">Click Here</button>\n          to view instructions for importing applications from source countrol.</div>\n      </li>\n      <li>Once the appplication is imported, select that application in order to put your session in the correct\n        scope, and then close out the <samp>Application Studio</samp> browser tab.</li>\n    </ol>\n  </div>\n</div>\n\n<div class=\"card\">\n  <div class=\"card-header\">\n    <h2 id=\"uiconfig\">4. Initial Config</h2>\n  </div>\n  <div class=\"card-body\">\n    <div class=\"detail\">In this step you will specify whether the current instance is for production, UAT, Testing, Development or if it is a\n      sandbox instance, and then you will execute a fix script to apply the corresponding color theme and other SDLC-related\n      settings, such as the logo heading text.</div>\n    <ol>\n      <li>Navigate to\n        <samp>System Properties</samp> &rArr;\n        <samp>Basic Configuration</samp>. If you are in the &quot;Util&quot; application scope, you will see the following message:\n        <img src=\"assets/images/initialConfig/globalApplicationWarning.png\" alt=\"Example of application selection dialog\" class=\"figure-img img-fluid rounded\" />\n        This is intentional. It is important to ensure you are in the &quot;Util&quot; application scope, otherwise the\n        next change will not be saved.\n      </li>\n      <li>Set SDLC Config Stage to the ServiceNow SDLC stage for the current server.</li>\n      <li>Change to the &quot;Global&quot; application scope.</li>\n      <li>Navigate to\n        <samp>System Definition</samp> &rArr;\n        <samp>Fix Scripts</samp>.</li>\n      <li>Open the fix script named\n        <var>Initial Army Config</var>.</li>\n      <li>Click\n        <samp>Run Fix Script</samp>.</li>\n      <li>Click\n        <samp>Proceed</samp> if you wish to wait for the script to finish; otherwise, click\n        <samp>Proceed in Background</samp> to let it run in the background. This script can take several minutes to finish. If\n        you chose to let it run in the foreground, the logged output that occurred during script execution will be displayed\n        when it is finished. At the bottom of the output, you should see a line that indicates it has succeeded.\n        <br />\n        <button (click)=\"openFigure('Example of completed fix script', 'assets/images/initialConfig/initialArmyConfigSuccess_lg.png')\" class=\"btn btn-outline-primary mb-2 mr-2\">\n          <img src=\"assets/images/initialConfig/initialArmyConfigSuccess_sm.png\" alt=\"Click to view example of completed fix script\" class=\"figure-img img-fluid rounded\" />\n        </button> Refresh the browser page to see the applied color scheme.\n      </li>\n    </ol>\n  </div>\n</div>\n\n<div class=\"card\">\n  <div class=\"card-header\">\n    <h2 id=\"uploadLogoImage\">5. Upload logo image</h2>\n  </div>\n  <div class=\"card-body\">\n    <div class=\"detail\">To automate configuration settings for graphical images, it would require significant overhead. Therefore, the logo image\n      will need to be uploaded manually.</div>\n    <ol>\n      <li>Ensure you are in the &quot;Global&quot; application scope.</li>\n      <li>Navigate to\n        <samp>System Properties</samp> &rArr;\n        <samp>Basic Configuration</samp>.\n      </li>\n      <li>Scroll to the &quot;Banner Image&quot; property and click on the\n        <samp>+</samp> icon to upload the banner image.\n        <button (click)=\"openFigure('Example of banner image setting', 'assets/images/initialConfig/bannerImageSetting_lg.png')\"\n          class=\"btn btn-outline-primary mb-2 mr-2\">\n          <img src=\"assets/images/initialConfig/bannerImageSetting_sm.png\" alt=\"Click to view example of banner image setting\" class=\"figure-img img-fluid rounded\" />\n        </button>\n      </li>\n      <li>Upload the logo image corresponding to the SDLC stage you previously configured. You can download an image from one\n        of the following links:\n        <ul>\n          <li>\n            <a href=\"assets/downloads/Logo/logo_army_prod.png\">\n              <img src=\"assets/downloads/Logo/logo_army_prod.png\" alt=\"Production Banner Logo\" class=\"figure-img img-fluid rounded\" /> Production\n            </a>\n          </li>\n          <li>\n            <a href=\"assets/downloads/Logo/logo_army_uat.png\">\n              <img src=\"assets/downloads/Logo/logo_army_uat.png\" alt=\"UAT Banner Logo\" class=\"figure-img img-fluid rounded\" /> UAT\n            </a>\n          </li>\n          <li>\n            <a href=\"assets/downloads/Logo/logo_army_test.png\">\n              <img src=\"assets/downloads/Logo/logo_army_test.png\" alt=\"Test Banner Logo\" class=\"figure-img img-fluid rounded\" /> Test\n            </a>\n          </li>\n          <li>\n            <a href=\"assets/downloads/Logo/logo_army_dev.png\">\n              <img src=\"assets/downloads/Logo/logo_army_dev.png\" alt=\"Dev Banner Logo\" class=\"figure-img img-fluid rounded\" /> Dev\n            </a>\n          </li>\n          <li>\n            <a href=\"assets/downloads/Logo/logo_army_sb.png\">\n              <img src=\"assets/downloads/Logo/logo_army_sb.png\" alt=\"Sandbox Banner Logo\" class=\"figure-img img-fluid rounded\" /> Sandbox\n            </a>\n          </li>\n          <li>\n            <a href=\"assets/downloads/Logo/logo_service-now.png\">\n              <img src=\"assets/downloads/Logo/logo_service-now.png\" alt=\"OOTB Banner Logo\" class=\"figure-img img-fluid rounded\" /> Out-of-the-box\n            </a>\n          </li>\n        </ul>\n      </li>\n    </ol>\n  </div>\n</div>\n\n<div class=\"card\">\n  <div class=\"card-header\">\n    <h2 id=\"pluginActivate\">6. Bulk Plugin Activation</h2>\n  </div>\n  <div class=\"card-body\">\n    <div class=\"detail\">In this step you will launch a fix script which will activate plugins in the background. Plugin activation progress can\n      be monitored from the progress workers list.</div>\n    <ol>\n      <li>Navigate to\n        <samp>System Definition</samp> &rArr;\n        <samp>Fix Scripts</samp>.</li>\n      <li>Open the fix script named\n        <var>Army Bulk Plugin Activation</var>.</li>\n      <li>Click\n        <samp>Run Fix Script</samp>.</li>\n      <li>Click\n        <samp>Proceed</samp> if you wish to wait for the script to finish; otherwise, click\n        <samp>Proceed in Background</samp> to let it run in the background. This script can take a long time to finish.</li>\n    </ol>\n    <div class=\"detail\">To monitor the progress of plugin activations, navigate to\n      <samp>System Diagnostics</samp> &rArr;\n      <samp>Progress Workers</samp>.</div>\n  </div>\n</div>\n\n<div class=\"card\">\n  <div class=\"card-header\">\n    <h2 id=\"importAdImport\">7. Configure Active Directory Import</h2>\n  </div>\n  <div class=\"card-body\">\n    <div class=\"detail\">\n    </div>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <h3>Update / Create LDAP Server</h3>\n      </div>\n      <div class=\"card-body\">\n        <div class=\"detail\">\n          <ol>\n            <li>Navigate to\n              <samp>System LDAP</samp> &rArr; <samp>LDAP Servers</samp> and open the pre-defined LDAP server if one exists; otherwise, click &quot;New&quot; to create a new record.</li>\n            <li>Provide the following information in the form, and save changes (insert and stay):\n              <ul>\n                <li><var>Name</var> - This is the display name, not the server name.</li>\n                <li><var>Active</var> - <em>checked</em></li>\n                <li><var>Login distinguished name</var> - The login name, which should be in the format <samp>account@domain.name</samp>.</li>\n                <li><var>Password</var> - The authentication password.</li>\n                <li><var>Starting search directory</var> - This is the DN of the root of the directory search.</li>\n                <li><var>MID Server</var> - This can initially be left blank.</li>\n              </ul>\n            </li>\n            <li>Under LDAP Server URLs, use <samp>Insert a new row...</samp> to add the LDAP URL for each of the LDAP servers.\n              <var>Active</var> and <var>Operational Status</var> should both be set to true.</li>\n            <li>In the <samp>Advanced Options</samp> section, check the following fields nd save changes:\n              <ul>\n                <li>Listener</li>\n                <li>Paging</li>\n              </ul>\n            </li>\n          </ol>\n        </div>\n      </div>\n    </div>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <h3>Create LDAP OU Definitions</h3>\n      </div>\n      <div class=\"card-body\">\n        <div class=\"card\">\n          <div class=\"card-header\">\n            <h4>Enterprise Users Active Directory Import</h4>\n          </div>\n          <div class=\"card-body\">\n            <div class=\"detail\">Navigate to\n              <samp>System LDAP</samp> &rArr; <samp>LDAP Servers</samp> and open the LDAP server that was just created/updated in the previous section.\n              <div class=\"alert-info\">All users must be imported before the LDAP Group definitions can be imported.</div>\n              <ol>\n                <li>Under <samp>LDAP OU Definitions</samp> at the bottom of the page, add an entry for Enterprise Users:\n                  <ul>\n                    <li><var>Name</var> - <samp>Enterprise User Import</samp></li>\n                    <li><var>RDN</var> - The canonical name of the LDAP folder to import from (ie. <samp>OU=Enterprise Users</samp>).</li>\n                    <li><var>Query Field</var> - <samp>sAMAccountName</samp>.\n                      <div class=\"alert-warning\">This specification was taken from existing documentation.\n                        We may need to test whether it would work if we used userPincipalName, instead.</div>\n                    </li>\n                    <li><var>Active</var> - checked</li>\n                    <li><var>Server</var> - This should be the same as the parent record we started from.</li>\n                    <li><var>Table</var> - <samp>User [sys_user]</samp></li>\n                    <li><var>Filter</var> - <samp>(&(objectClass=person)(sn=*)(!(objectClass=computer))(!(userAccountControl:1.2.840.113556.1.4.803:=2)))</samp>\n                      <div class=\"alert-info\">Utilize the <samp>Test connection</samp> link under <samp>Related Links</samp> to verify there are no errors in the filter.</div></li>\n                  </ul>\n                </li>\n                <li>Under <samp>Data Sources</samp>, add a new entry:\n                  <ul>\n                    <li><var>Name</var> - <samp>Enterprise LDAP users</samp></li>\n                    <li><var>Import set table label</var> - <samp>Enterprise User Import</samp>.</li>\n                    <li><var>Import set table name</var> - This should be automatically generated as <samp>u_enterprise_user_import</samp>.</li>\n                    <li><var>Type</var> - <samp>LDAP</samp></li>\n                    <li><var>LDAP Target</var> - <samp>Enterprise User Import</samp>.</li>\n                  </ul>\n                </li>\n                <li>Create Transform Map\n                  <ol>\n                    <li>Under <samp>Related Links</samp>, click <samp>Test Load 20 records</samp>.</li>\n                    <li>Select <samp>Create Transform Map</samp> and provide the following values:\n                      <ul>\n                        <li><var>Name</var> - <samp>Enterprise Enterprise User Import</samp></li>\n                        <li><var>Source table</var> - <samp>Enterprise User Import [u_enterprise_user_import]</samp>.</li>\n                        <li><var>Target Table</var> - <samp>User [sys_user]</samp></li>\n                        <li><var>Active</var> - checked</li>\n                        <li><var>Run business rules</var> - checked</li>\n                        <li><var>Enforce mandatory fields</var> - No</li>\n                        <li><var>Copy empty fields</var> - unchecked</li>\n                        <li><var>Run script</var> - unchecked</li>\n                      </ul>\n                    </li>\n                  </ol>\n                </li>\n                <li>Map LDAP fields\n                  <ol>\n                    <li>Under <samp>Related Links</samp>, click <samp>Auto Map Matching Fields</samp>.</li>\n                    <li>Under <samp>Related Links</samp>, click <samp>Mapping assist</samp> to ensure all fields are mapped appropriately.</li>\n                  </ol>\n                </li>\n                <li>Coalesce Enterprise User Imports\n                  <ol>\n                    <li>Navigate to <samp>System LDAP</samp> &rArr; <samp>Transform Maps</samp> &rArr; <samp>Enterprise User Import</samp>.</li>\n                    <li>Under the <samp>Field Maps</samp> tab, double-click the <samp>Coalesce</samp> value for the <samp>u_samaccountname</samp> source field and change it to <samp>true</samp>.\n                      <div class=\"alert-warning\">This specification was taken from existing documentation.\n                        If we used userPincipalName instead of samAccountName, then we will coalesce using the <samp>u_userprincipalname</samp> field, instead.</div></li>\n                  </ol>\n                </li>\n                <li>Under <samp>Related Links</samp>, click <samp>Transform</samp>, and in the resulting page, click the <samp>Transform</samp> button to apply the transform map.</li>\n                <li>Navigate to <samp>System LDAP</samp> &rArr; <samp>Data Sources</samp> and open the <samp>Enterprise LDAP users</samp> data source.</li>\n                <li>Under <samp>Related Links</samp>, click <samp>Load all records</samp>.</li>\n                <li>Once all users are loaded, click <samp>Run Transform</samp>, and then in the resulting page, click the <samp>Transform</samp> button.</li>\n              </ol>\n            </div>\n          </div>\n        </div>\n        <div class=\"card\">\n          <div class=\"card-header\">\n            <h4>Admin Users Active Directory Import</h4>\n          </div>\n          <div class=\"card-body\">\n            <div class=\"detail\">Navigate to\n              <samp>System LDAP</samp> &rArr; <samp>LDAP Servers</samp> and open the LDAP server that was just created/updated in the previous section.\n              <div class=\"alert-info\">All users must be imported before the LDAP Group definitions can be imported.</div>\n              <ol>\n                <li>Under <samp>LDAP OU Definitions</samp> at the bottom of the page, add an entry for Admin Users:\n                  <ul>\n                    <li><var>Name</var> - <samp>Admin User Import</samp></li>\n                    <li><var>RDN</var> - The canonical name of the LDAP folder to import from (ie. <samp>OU=Administration</samp>).</li>\n                    <li><var>Query Field</var> - <samp>sAMAccountName</samp>.\n                      <div class=\"alert-warning\">This specification was taken from existing documentation.\n                        We may need to test whether it would work if we used userPincipalName, instead.</div>\n                    </li>\n                    <li><var>Active</var> - checked</li>\n                    <li><var>Server</var> - This should be the same as the parent record we started from.</li>\n                    <li><var>Table</var> - <samp>User [sys_user]</samp></li>\n                    <li><var>Filter</var> - <samp>(&(objectClass=person)(sn=*)(!(objectClass=computer))(!(userAccountControl:1.2.840.113556.1.4.803:=2)))</samp>\n                      <div class=\"alert-info\">Utilize the <samp>Test connection</samp> link under <samp>Related Links</samp> to verify there are no errors in the filter.</div></li>\n                  </ul>\n                </li>\n                <li>Under <samp>Data Sources</samp>, add a new entry:\n                  <ul>\n                    <li><var>Name</var> - <samp>Admin LDAP users</samp></li>\n                    <li><var>Import set table label</var> - <samp>Admin User Import</samp>.</li>\n                    <li><var>Import set table name</var> - This should be automatically generated as <samp>u_admin_user_import</samp>.</li>\n                    <li><var>Type</var> - <samp>LDAP</samp></li>\n                    <li><var>LDAP Target</var> - <samp>Admin User Import</samp>.</li>\n                  </ul>\n                </li>\n                <li>Create Transform Map\n                  <ol>\n                    <li>Under <samp>Related Links</samp>, click <samp>Test Load 20 records</samp>.</li>\n                    <li>Select <samp>Create Transform Map</samp> and provide the following values:\n                      <ul>\n                        <li><var>Name</var> - <samp>Admin User Import</samp></li>\n                        <li><var>Source table</var> - <samp>Admin User Import [u_admin_user_import]</samp>.</li>\n                        <li><var>Target Table</var> - <samp>User [sys_user]</samp></li>\n                        <li><var>Active</var> - checked</li>\n                        <li><var>Run business rules</var> - checked</li>\n                        <li><var>Enforce mandatory fields</var> - No</li>\n                        <li><var>Copy empty fields</var> - unchecked</li>\n                        <li><var>Run script</var> - unchecked</li>\n                      </ul>\n                    </li>\n                  </ol>\n                </li>\n                <li>Map LDAP fields\n                  <ol>\n                    <li>Under <samp>Related Links</samp>, click <samp>Auto Map Matching Fields</samp>.</li>\n                    <li>Under <samp>Related Links</samp>, click <samp>Mapping assist</samp> to ensure all fields are mapped appropriately.</li>\n                  </ol>\n                </li>\n                <li>Coalesce Admin User Imports\n                  <ol>\n                    <li>Navigate to <samp>System LDAP</samp> &rArr; <samp>Transform Maps</samp> &rArr; <samp>Admin User Import</samp>.</li>\n                    <li>Under the <samp>Field Maps</samp> tab, double-click the <samp>Coalesce</samp> value for the <samp>u_samaccountname</samp> source field and change it to <samp>true</samp>.\n                      <div class=\"alert-warning\">This specification was taken from existing documentation.\n                        If we used userPincipalName instead of samAccountName, then we will coalesce using the <samp>u_userprincipalname</samp> field, instead.</div></li>\n                  </ol>\n                </li>\n                <li>Under <samp>Related Links</samp>, click <samp>Transform</samp>, and in the resulting page, click the <samp>Transform</samp> button to apply the transform map.</li>\n                <li>Navigate to <samp>System LDAP</samp> &rArr; <samp>Data Sources</samp> and open the <samp>Admin LDAP users</samp> data source.</li>\n                <li>Under <samp>Related Links</samp>, click <samp>Load all records</samp>.</li>\n                <li>Once all users are loaded, click <samp>Run Transform</samp>, and then in the resulting page, click the <samp>Transform</samp> button.</li>\n              </ol>\n            </div>\n          </div>\n        </div>\n        <div class=\"card\">\n          <div class=\"card-header\">\n            <h4>Active Directory Group Import</h4>\n          </div>\n          <div class=\"card-body\">\n            <div class=\"detail\">\n              <em>Not yet documented...</em>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"card\">\n  <div class=\"card-header\">\n    <h2 id=\"importGrpNameReg\">8. Import Group Names Registry Application</h2>\n  </div>\n  <div class=\"card-body\">\n    <div class=\"detail\">The Group Names Registry applications provides a way of synchronizing User Group references between ServiceNow instances,\n      such as Dev, Test and Production.</div>\n    <ol>\n      <li>Import the GroupNameRegistry application from <kbd>{{grpnameregRepositoryUrl}}</kbd>.\n        <div><button (click)=\"openHowtoImportApplication('grpnamereg')\" class=\"btn btn-outline-primary mb-2 mr-2\">Click Here</button> to view instructions for importing\n          applications from source countrol.</div>\n        Once the application is imported, select the GroupNameRegistry application and close the Application Studio tab.\n      </li>\n      <li>Refresh the browser page in order to reload the navigation menu on the left-hand side.</li>\n      <li>Navigate to <samp>Group Name Registry</samp> &rArr; <samp>Interop Group Names</samp>.\n        <button (click)=\"openFigure('Example of changed navigation', 'assets/images/initialConfig/GroupNameRegiestryNavItem_lg.png')\"\n          class=\"btn btn-outline-primary mb-2 mr-2\">\n          <img src=\"assets/images/initialConfig/GroupNameRegiestryNavItem_sm.png\" alt=\"Click to view example of changed navigation\" class=\"figure-img img-fluid rounded\" />\n        </button></li>\n    </ol>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/initial-sn-config/initial-sn-config.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/initial-sn-config/initial-sn-config.component.ts ***!
  \******************************************************************/
/*! exports provided: InitialSnConfigComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InitialSnConfigComponent", function() { return InitialSnConfigComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app.component */ "./src/app/app.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _large_modal_large_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../large-modal/large-modal.component */ "./src/app/large-modal/large-modal.component.ts");
/* harmony import */ var _howto_import_update_set_howto_import_update_set_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../howto-import-update-set/howto-import-update-set.component */ "./src/app/howto-import-update-set/howto-import-update-set.component.ts");
/* harmony import */ var _howto_import_application_howto_import_application_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../howto-import-application/howto-import-application.component */ "./src/app/howto-import-application/howto-import-application.component.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var InitialSnConfigComponent = /** @class */ (function () {
    function InitialSnConfigComponent(_app, _modalService) {
        var _this = this;
        this._app = _app;
        this._modalService = _modalService;
        this._modalTitleText = '';
        this._modalImageUrl = '';
        this._howtoImportUpdateSetFolder = 'assets/downloads';
        this._howtoImportUpdateSetFileName = 'sys_remote_update_set_Initial_Setup.xml';
        this._utilRepositoryUrl = '';
        this._grpnameregRepositoryUrl = '';
        this._urlSettings = {
            util: '',
            grpnamereg: ''
        };
        this._repositoryUrlSettings = this._app.appConfigSettings.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (r) {
            return {
                util: r.rootGitUrl + '/x_44813_util.git',
                grpnamereg: r.rootGitUrl + '/x_44813_grpnamereg.git'
            };
        }));
        this._repositoryUrlSettings.subscribe(function (settings) {
            _this._utilRepositoryUrl = settings.util;
            _this._grpnameregRepositoryUrl = settings.grpnamereg;
        });
    }
    InitialSnConfigComponent_1 = InitialSnConfigComponent;
    Object.defineProperty(InitialSnConfigComponent.prototype, "modalTitleText", {
        get: function () { return this._modalTitleText; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InitialSnConfigComponent.prototype, "modalImageUrl", {
        get: function () { return this._modalImageUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InitialSnConfigComponent.prototype, "howtoImportUpdateSetFolder", {
        get: function () { return this._howtoImportUpdateSetFolder; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InitialSnConfigComponent.prototype, "howtoImportUpdateSetFileName", {
        get: function () { return this._howtoImportUpdateSetFileName; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InitialSnConfigComponent.prototype, "utilRepositoryUrl", {
        get: function () { return this._utilRepositoryUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InitialSnConfigComponent.prototype, "grpnameregRepositoryUrl", {
        get: function () { return this._grpnameregRepositoryUrl; },
        enumerable: true,
        configurable: true
    });
    InitialSnConfigComponent.prototype.openHowtoImportUpdateSet = function () {
        var modalRef = this._modalService.open(_howto_import_update_set_howto_import_update_set_component__WEBPACK_IMPORTED_MODULE_4__["HowtoImportUpdateSetComponent"], { size: 'lg', centered: true, backdrop: 'static' });
        modalRef.componentInstance.downloadLinkUrl = this._howtoImportUpdateSetFolder + '/' + this._howtoImportUpdateSetFileName;
        modalRef.componentInstance.updateSetFileName = this._howtoImportUpdateSetFileName;
    };
    InitialSnConfigComponent.prototype.openHowtoImportApplication = function (name) {
        var modalRef = this._modalService.open(_howto_import_application_howto_import_application_component__WEBPACK_IMPORTED_MODULE_5__["HowtoImportApplicationComponent"], { size: 'lg', centered: true, backdrop: 'static' });
        this._repositoryUrlSettings.subscribe(function (settings) {
            modalRef.componentInstance.repositoryUrl = settings[name];
        });
    };
    InitialSnConfigComponent.prototype.openFigure = function (modalTitleText, modalImageUrl) {
        var modalRef = this._modalService.open(_large_modal_large_modal_component__WEBPACK_IMPORTED_MODULE_3__["LargeModalComponent"], { size: 'lg', centered: true, backdrop: 'static' });
        modalRef.componentInstance.titleText = modalTitleText;
        modalRef.componentInstance.content = { src: modalImageUrl, alt: modalTitleText };
    };
    InitialSnConfigComponent.prototype.ngOnInit = function () {
        this._app.titleText = InitialSnConfigComponent_1.TitleText;
        this._app.descriptionText = '';
    };
    var InitialSnConfigComponent_1;
    InitialSnConfigComponent.TitleText = 'Initial Configuration';
    InitialSnConfigComponent = InitialSnConfigComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-initial-sn-config',
            template: __webpack_require__(/*! ./initial-sn-config.component.html */ "./src/app/initial-sn-config/initial-sn-config.component.html"),
            styles: [__webpack_require__(/*! ./initial-sn-config.component.css */ "./src/app/initial-sn-config/initial-sn-config.component.css")]
        }),
        __metadata("design:paramtypes", [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModal"]])
    ], InitialSnConfigComponent);
    return InitialSnConfigComponent;
}());



/***/ }),

/***/ "./src/app/large-modal/large-modal.component.css":
/*!*******************************************************!*\
  !*** ./src/app/large-modal/large-modal.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/large-modal/large-modal.component.html":
/*!********************************************************!*\
  !*** ./src/app/large-modal/large-modal.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\" *ngIf=\"titleText !== null &amp;&amp; titleText.trim().length > 0\">\n  <h4 class=\"modal-title\">{{titleText}}</h4>\n  <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"activeModal.dismiss('Cross click')\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n<div class=\"modal-body\">\n  <ng-template ngFor let-item [ngForOf]=\"templateContent\">\n    <ng-container [ngSwitch]=\"item.type\">\n      <p *ngSwitchCase=\"'p'\">\n          <ng-template ngFor let-item [ngForOf]=\"content\">\n            <img *ngIf=\"item.type=='figure'; else notFigureTemplate\" class=\"figure-img img-fluid rounded\" src=\"{{item.src}}\" alt=\"{{item.alt}}\" />\n            <ng-template #notFigureTemplate>\n                <strong *ngIf=\"item.bold; else textNotBoldTemplate\">{{item.text}}</strong>\n            </ng-template>\n          </ng-template>\n      </p>\n      <button *ngSwitchCase=\"'popup'\" (click)=\"openNestedPopup(item)\" class=\"btn btn-outline-primary mb- mr-0 pt-0 pb-0\">{{item.displayText}}</button>\n      <img *ngSwitchCase=\"'figure'\" class=\"figure-img img-fluid rounded\" src=\"{{item.src}}\" alt=\"{{item.alt}}\" />\n      <ng-container *ngSwitchDefault>\n          <strong *ngIf=\"item.bold; else textNotBoldTemplate\">{{item.text}}</strong>\n      </ng-container>\n    </ng-container>\n    <ng-template #textNotBoldTemplate>{{item.text}}</ng-template>\n  </ng-template>\n</div>\n<div class=\"modal-footer\">\n  <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"activeModal.close('Close click')\">Close</button>\n</div>\n"

/***/ }),

/***/ "./src/app/large-modal/large-modal.component.ts":
/*!******************************************************!*\
  !*** ./src/app/large-modal/large-modal.component.ts ***!
  \******************************************************/
/*! exports provided: LargeModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LargeModalComponent", function() { return LargeModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Determines whether a value is an object represents a set of paragraph tags with nested content.
 *
 * @param {InputContent} value - Object to test.
 * @returns {value is IInputParagraph} True if the value represents a set of paragraph tags with nested content.
 */
function isInputParagraph(value) {
    return typeof (value) === 'object' && typeof (value.type) === 'string' && value.type === 'p';
}
/**
 * Determines whether a value is an object that represents an image to be displayed as a figure.
 *
 * @param {InputContent} value - Value to test.
 * @returns {value is IInputFigure} True if the value represents an image to be displayed as a figure.
 */
function isInputFigure(value) {
    return typeof (value) === 'object' && typeof (value.src) === 'string' &&
        typeof (value.alt) === 'string';
}
/**
 * Determines whether a value is an object that represents an embedded modal popup.
 *
 * @param {InputContent} value - Value to test.
 * @returns {value is IInputNestedPopup} True if the value represents an embedded modal popup.
 */
function isInputNestedPopup(value) {
    return typeof (value) === 'object' && typeof (value.titleText) === 'string';
}
/**
 * Transforms component content input to an object that can be used within this component's template.
 *
 * @param {(InputContent)} value - Component content input value(s).
 * @returns {TemplateContent} Object that can be used within this component's template.
 */
function importModalContent(value) {
    if (isInputParagraph(value))
        return {
            type: 'p',
            content: (Array.isArray(value.content)) ? value.content.map(importModalContent) : [importModalContent(value.content)]
        };
    if (isInputFigure(value))
        return {
            type: 'figure',
            src: value.src,
            alt: value.alt
        };
    if (isInputNestedPopup(value))
        return {
            type: 'popup',
            titleText: value.titleText,
            displayText: (typeof (value.displayText) === 'string' && value.displayText.trim().length > 0) ? value.displayText : value.titleText,
            content: value.content
        };
    if (typeof (value) === 'string')
        return { type: 'text', text: value, bold: false };
    return { type: 'text', text: value.text, bold: (typeof (value.bold) === 'boolean' && value.bold) };
}
/**
 * Component to show a modal popup with custom content.
 *
 * @export
 * @class LargeModalComponent
 */
var LargeModalComponent = /** @class */ (function () {
    function LargeModalComponent(activeModal, _modalService) {
        this.activeModal = activeModal;
        this._modalService = _modalService;
        this._templateContent = [];
        /**
         * Title of modal popup.
         *
         * @memberof LargeModalComponent
         */
        this.titleText = '';
    }
    LargeModalComponent_1 = LargeModalComponent;
    Object.defineProperty(LargeModalComponent.prototype, "content", {
        /**
         * Sets the content for the modal popup.
         *
         * @type {(InputContent|InputContent[])}
         * @memberof LargeModalComponent
         */
        set: function (value) {
            this._templateContent = (Array.isArray(value)) ? value.map(importModalContent) : [importModalContent(value)];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LargeModalComponent.prototype, "templateContent", {
        /**
         * Gets the objects used by the template to display the modal popup contents.
         *
         * @readonly
         * @type {TemplateContent[]}
         * @memberof LargeModalComponent
         */
        get: function () { return this._templateContent; },
        enumerable: true,
        configurable: true
    });
    LargeModalComponent.prototype.openNestedPopup = function (item) {
        var modalRef = this._modalService.open(LargeModalComponent_1, { size: 'lg' });
        modalRef.componentInstance.titleText = item.titleText;
        modalRef.componentInstance.content = item.content;
    };
    var LargeModalComponent_1;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], LargeModalComponent.prototype, "titleText", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], LargeModalComponent.prototype, "content", null);
    LargeModalComponent = LargeModalComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-large-modal',
            template: __webpack_require__(/*! ./large-modal.component.html */ "./src/app/large-modal/large-modal.component.html"),
            styles: [__webpack_require__(/*! ./large-modal.component.css */ "./src/app/large-modal/large-modal.component.css")]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbActiveModal"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"]])
    ], LargeModalComponent);
    return LargeModalComponent;
}());



/***/ }),

/***/ "./src/app/popup-modal/popup-modal.component.css":
/*!*******************************************************!*\
  !*** ./src/app/popup-modal/popup-modal.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/popup-modal/popup-modal.component.html":
/*!********************************************************!*\
  !*** ./src/app/popup-modal/popup-modal.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\" *ngIf=\"titleText !== null &amp;&amp; titleText.trim().length > 0\">\n  <h4 class=\"modal-title\">{{titleText}}</h4>\n  <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"activeModal.dismiss('Cross click')\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n<div class=\"modal-body\">\n  <ng-container *ngComponentOutlet=\"bodyComponent\"></ng-container>\n</div>\n<div class=\"modal-footer\">\n  <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"activeModal.close('Close click')\">Close</button>\n</div>\n"

/***/ }),

/***/ "./src/app/popup-modal/popup-modal.component.ts":
/*!******************************************************!*\
  !*** ./src/app/popup-modal/popup-modal.component.ts ***!
  \******************************************************/
/*! exports provided: PopupModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopupModalComponent", function() { return PopupModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PopupModalComponent = /** @class */ (function () {
    function PopupModalComponent(activeModal) {
        this.activeModal = activeModal;
        /**
         * Title of modal popup.
         *
         * @memberof PopupModalComponent
         */
        this.titleText = '';
    }
    PopupModalComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], PopupModalComponent.prototype, "titleText", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], PopupModalComponent.prototype, "bodyComponent", void 0);
    PopupModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-popup-modal',
            template: __webpack_require__(/*! ./popup-modal.component.html */ "./src/app/popup-modal/popup-modal.component.html"),
            styles: [__webpack_require__(/*! ./popup-modal.component.css */ "./src/app/popup-modal/popup-modal.component.css")]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbActiveModal"]])
    ], PopupModalComponent);
    return PopupModalComponent;
}());



/***/ }),

/***/ "./src/app/server-code-snippets/server-code-snippets.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/server-code-snippets/server-code-snippets.component.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/server-code-snippets/server-code-snippets.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/server-code-snippets/server-code-snippets.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n    <div class=\"card-header\"><h2>Force To Update Set</h2></div>\n    <div class=\"card-body\">\n      The following snippets are for UI actions that will push the current record to the current update set:\n      <div class=\"card\">\n          <div class=\"card-header\"><h3>With Checks</h3></div>\n          <div class=\"card-body\">\n              The following snippet is for UI actions that onlypushes the current record to the current update set if it is not already being tracked in update sets.\n              <code>(function () {{\n    //Commit any changes to the record\n    current.update();\n    //Check to make sure the table isn&#39;t synchronized already\n    var tbl = current.getTableName();\n    if (tbl.startsWith(&#39;wf_&#39;) || tbl.startsWith(&#39;sys_ui_&#39;) || tbl == &#39;sys_choice&#39; || current.getED().getBooleanAttribute(&#39;update_synch&#39;) || current.getED().getBooleanAttribute(&#39;update_synch_custom&#39;)) {{\n        gs.addErrorMessage(&#39;Updates are already being recorded for this table.&#39;);\n        action.setRedirectURL(current);\n    }}\n    else {{\n        //Push the update into the current update set\n        var um = new GlideUpdateManager2();\n        um.saveRecord(current);\n        //Query for the current update set to display info message\n        var setID = gs.getPreference(&#39;sys_update_set&#39;);\n        var us = new GlideRecord(&#39;sys_update_set&#39;);\n        us.get(setID);\n        //Display info message and reload the form\n        gs.addInfoMessage(&#39;Record included in &lt;a href=&quot;sys_update_set.do?sys_id=&#39; + setID + &#39;&quot;&gt;&#39; + us.name + &#39;&lt;/a&gt; update set.&#39;);\n        action.setRedirectURL(current);\n    }}\n}})();</code>\n          </div>\n      </div>\n      <div class=\"card\">\n          <div class=\"card-header\"><h3>No Checks</h3></div>\n          <div class=\"card-body\">\n              The following snippet is for UI actions that always pushes the current record to the current update set.\n              <code>(function () {{\n    //Commit any changes to the record\n    current.update();\n    //Check to make sure the table isn&#39;t synchronized already\n    var tbl = current.getTableName();\n    //Push the update into the current update set\n    var um = new GlideUpdateManager2();\n    um.saveRecord(current);\n    //Query for the current update set to display info message\n    var setID = gs.getPreference(&#39;sys_update_set&#39;);\n    var us = new GlideRecord(&#39;sys_update_set&#39;);\n    us.get(setID);\n    //Display info message and reload the form\n    gs.addInfoMessage(&#39;Record included in &lt;a href=&quot;sys_update_set.do?sys_id=&#39; + setID + &#39;&quot;&gt;&#39; + us.name + &#39;&lt;/a&gt; update set.&#39;);\n    action.setRedirectURL(current);\n}})();</code>\n          </div>\n      </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/server-code-snippets/server-code-snippets.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/server-code-snippets/server-code-snippets.component.ts ***!
  \************************************************************************/
/*! exports provided: ServerCodeSnippetsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerCodeSnippetsComponent", function() { return ServerCodeSnippetsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ServerCodeSnippetsComponent = /** @class */ (function () {
    function ServerCodeSnippetsComponent() {
    }
    ServerCodeSnippetsComponent.prototype.ngOnInit = function () {
    };
    ServerCodeSnippetsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-server-code-snippets',
            template: __webpack_require__(/*! ./server-code-snippets.component.html */ "./src/app/server-code-snippets/server-code-snippets.component.html"),
            styles: [__webpack_require__(/*! ./server-code-snippets.component.css */ "./src/app/server-code-snippets/server-code-snippets.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ServerCodeSnippetsComponent);
    return ServerCodeSnippetsComponent;
}());



/***/ }),

/***/ "./src/app/sn-application-detail/sn-application-detail.component.css":
/*!***************************************************************************!*\
  !*** ./src/app/sn-application-detail/sn-application-detail.component.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/sn-application-detail/sn-application-detail.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/sn-application-detail/sn-application-detail.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  sn-application-detail works!\n</p>\n"

/***/ }),

/***/ "./src/app/sn-application-detail/sn-application-detail.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/sn-application-detail/sn-application-detail.component.ts ***!
  \**************************************************************************/
/*! exports provided: SnApplicationDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SnApplicationDetailComponent", function() { return SnApplicationDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app.component */ "./src/app/app.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SnApplicationDetailComponent = /** @class */ (function () {
    function SnApplicationDetailComponent(_app) {
        this._app = _app;
    }
    SnApplicationDetailComponent.prototype.ngOnInit = function () {
        this._app.titleText = 'Custom Application Detail';
        this._app.descriptionText = '';
    };
    SnApplicationDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sn-application-detail',
            template: __webpack_require__(/*! ./sn-application-detail.component.html */ "./src/app/sn-application-detail/sn-application-detail.component.html"),
            styles: [__webpack_require__(/*! ./sn-application-detail.component.css */ "./src/app/sn-application-detail/sn-application-detail.component.css")]
        }),
        __metadata("design:paramtypes", [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]])
    ], SnApplicationDetailComponent);
    return SnApplicationDetailComponent;
}());



/***/ }),

/***/ "./src/app/sn-applications/sn-applications.component.css":
/*!***************************************************************!*\
  !*** ./src/app/sn-applications/sn-applications.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/sn-applications/sn-applications.component.html":
/*!****************************************************************!*\
  !*** ./src/app/sn-applications/sn-applications.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<em>Not yet implemented.</em>\n"

/***/ }),

/***/ "./src/app/sn-applications/sn-applications.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/sn-applications/sn-applications.component.ts ***!
  \**************************************************************/
/*! exports provided: SnApplicationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SnApplicationsComponent", function() { return SnApplicationsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app.component */ "./src/app/app.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SnApplicationsComponent = /** @class */ (function () {
    function SnApplicationsComponent(_app) {
        this._app = _app;
    }
    SnApplicationsComponent_1 = SnApplicationsComponent;
    SnApplicationsComponent.prototype.ngOnInit = function () {
        this._app.titleText = SnApplicationsComponent_1.TitleText;
        this._app.descriptionText = '';
    };
    var SnApplicationsComponent_1;
    SnApplicationsComponent.TitleText = 'Custom Applications';
    SnApplicationsComponent = SnApplicationsComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sn-applications',
            template: __webpack_require__(/*! ./sn-applications.component.html */ "./src/app/sn-applications/sn-applications.component.html"),
            styles: [__webpack_require__(/*! ./sn-applications.component.css */ "./src/app/sn-applications/sn-applications.component.css")]
        }),
        __metadata("design:paramtypes", [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]])
    ], SnApplicationsComponent);
    return SnApplicationsComponent;
}());



/***/ }),

/***/ "./src/app/sn-dev-info/sn-dev-info.component.css":
/*!*******************************************************!*\
  !*** ./src/app/sn-dev-info/sn-dev-info.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/sn-dev-info/sn-dev-info.component.html":
/*!********************************************************!*\
  !*** ./src/app/sn-dev-info/sn-dev-info.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "Following are steps for configuring the development workstation environment:\n<div class=\"card\">\n  <div class=\"card-header\">\n    <h2>1. Install Git Client</h2>\n  </div>\n  <div class=\"card-body\">\n    The installer for the Git client which is compatible with Visual Studio Code can be downloade from\n    <a href=\"https://git-scm.com/\" target=\"_blank\">https://git-scm.com/</a>.\n    <br />Optionally, install\n    <a href=\"https://desktop.github.com/\" target=\"_blank\">GitHub Desktop</a> to make it easier to create and manage repositories that are cloned locally from Git.\n  </div>\n</div>\n<div class=\"card\">\n  <div class=\"card-header\">\n    <h2>2. Install node.js</h2>\n  </div>\n  <div class=\"card-body\">\n    The installer for node.js can be downloaded from\n    <a href=\"https://nodejs.org\" target=\"_blank\">https://nodejs.org</a>.\n  </div>\n</div>\n<div class=\"card\">\n  <div class=\"card-header\">\n    <h2>3. Install Visual Studio Code</h2>\n  </div>\n  <div class=\"card-body\">\n    Installer can be downloaded from\n    <a href=\"https://code.visualstudio.com/download\" target=\"_blank\">https://code.visualstudio.com/download</a>.\n  </div>\n</div>\n<div class=\"card\">\n  <div class=\"card-header\">\n    <h2>Configure global git settings for credential helper and email address</h2>\n  </div>\n  <div class=\"card-body\">\n    For Windows installations, it's probably best to use the Windows Credential Store to store your Git login credentials, so\n    you don't have to enter your username and password every time you synchronize with the remote repository. The following\n    will configure git to use the\n    <a href=\"https://github.com/Microsoft/Git-Credential-Manager-for-Windows\" target=\"_blank\">windows credential helper</a>:\n    <pre class=\"console-pane pre-scrollable\"><code>git config --global credential.helper wincred</code></pre>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <h3>Configuring for GitLab remote Server</h3>\n      </div>\n      <div class=\"card-body\">\n        <em>(to be determined)</em>\n      </div>\n    </div>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <h3>Configuring for GitHub remote Server</h3>\n      </div>\n      <div class=\"card-body\">\n        GitHub uses the configured email address to identify the account you are are authenticating:\n        <p>Using your personal private email address that is associated with the github account:</p>\n        <pre class=\"console-pane pre-scrollable\"><code>git config --global user.email <kbd>email@address</kbd></code></pre>\n        Using github-provided no-reply email address that is associated with the github account:\n        <pre class=\"console-pane pre-scrollable\"><code>git config --global user.email <kbd>userid</kbd>+<kbd>loginName</kbd>@users.noreply.github.com</code></pre>\n      </div>\n    </div>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <h3>Configuring user name</h3>\n      </div>\n      <div class=\"card-body\">\n        The user name determines what user name is displayed when repository changes are checked in (this is not the same as authentication\n        account info)\n        <pre class=\"console-pane pre-scrollable\"><code>git config --global user.name <kbd>user name</kbd></code></pre>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/sn-dev-info/sn-dev-info.component.ts":
/*!******************************************************!*\
  !*** ./src/app/sn-dev-info/sn-dev-info.component.ts ***!
  \******************************************************/
/*! exports provided: SnDevInfoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SnDevInfoComponent", function() { return SnDevInfoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app.component */ "./src/app/app.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SnDevInfoComponent = /** @class */ (function () {
    function SnDevInfoComponent(_app) {
        this._app = _app;
    }
    SnDevInfoComponent_1 = SnDevInfoComponent;
    SnDevInfoComponent.prototype.ngOnInit = function () {
        this._app.titleText = SnDevInfoComponent_1.TitleText;
        this._app.descriptionText = '';
    };
    var SnDevInfoComponent_1;
    SnDevInfoComponent.TitleText = 'ServiceNow Dev Info';
    SnDevInfoComponent = SnDevInfoComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sn-dev-info',
            template: __webpack_require__(/*! ./sn-dev-info.component.html */ "./src/app/sn-dev-info/sn-dev-info.component.html"),
            styles: [__webpack_require__(/*! ./sn-dev-info.component.css */ "./src/app/sn-dev-info/sn-dev-info.component.css")]
        }),
        __metadata("design:paramtypes", [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]])
    ], SnDevInfoComponent);
    return SnDevInfoComponent;
}());



/***/ }),

/***/ "./src/app/update-set-detail/update-set-detail.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/update-set-detail/update-set-detail.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/update-set-detail/update-set-detail.component.html":
/*!********************************************************************!*\
  !*** ./src/app/update-set-detail/update-set-detail.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  update-set-detail works!\n</p>\n"

/***/ }),

/***/ "./src/app/update-set-detail/update-set-detail.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/update-set-detail/update-set-detail.component.ts ***!
  \******************************************************************/
/*! exports provided: UpdateSetDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateSetDetailComponent", function() { return UpdateSetDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app.component */ "./src/app/app.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UpdateSetDetailComponent = /** @class */ (function () {
    function UpdateSetDetailComponent(_app) {
        this._app = _app;
    }
    UpdateSetDetailComponent.prototype.ngOnInit = function () {
        this._app.titleText = 'Update Set Detail';
        this._app.descriptionText = '';
    };
    UpdateSetDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-update-set-detail',
            template: __webpack_require__(/*! ./update-set-detail.component.html */ "./src/app/update-set-detail/update-set-detail.component.html"),
            styles: [__webpack_require__(/*! ./update-set-detail.component.css */ "./src/app/update-set-detail/update-set-detail.component.css")]
        }),
        __metadata("design:paramtypes", [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]])
    ], UpdateSetDetailComponent);
    return UpdateSetDetailComponent;
}());



/***/ }),

/***/ "./src/app/update-sets/update-sets.component.css":
/*!*******************************************************!*\
  !*** ./src/app/update-sets/update-sets.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/update-sets/update-sets.component.html":
/*!********************************************************!*\
  !*** ./src/app/update-sets/update-sets.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<em>Not yet implemented.</em>\n"

/***/ }),

/***/ "./src/app/update-sets/update-sets.component.ts":
/*!******************************************************!*\
  !*** ./src/app/update-sets/update-sets.component.ts ***!
  \******************************************************/
/*! exports provided: UpdateSetsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateSetsComponent", function() { return UpdateSetsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app.component */ "./src/app/app.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UpdateSetsComponent = /** @class */ (function () {
    function UpdateSetsComponent(_app) {
        this._app = _app;
    }
    UpdateSetsComponent_1 = UpdateSetsComponent;
    UpdateSetsComponent.prototype.ngOnInit = function () {
        this._app.titleText = UpdateSetsComponent_1.TitleText;
        this._app.descriptionText = '';
    };
    var UpdateSetsComponent_1;
    UpdateSetsComponent.TitleText = 'Update Sets';
    UpdateSetsComponent = UpdateSetsComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-update-sets',
            template: __webpack_require__(/*! ./update-sets.component.html */ "./src/app/update-sets/update-sets.component.html"),
            styles: [__webpack_require__(/*! ./update-sets.component.css */ "./src/app/update-sets/update-sets.component.css")]
        }),
        __metadata("design:paramtypes", [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]])
    ], UpdateSetsComponent);
    return UpdateSetsComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\lerwi\GitHub\SNImplementationDocs\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map