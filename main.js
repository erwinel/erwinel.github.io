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

module.exports = "<div class=\"card\">\n  <div class=\"card-header\">\n    <h2>Overview</h2>\n  </div>\n  <div class=\"card-body\">\n    The collection of Github repositories referenced by this documentation contain update sets, source code and documentation\n    for installing and maintaining custom ServiceNow applications as well as for the initial configuration of ServiceNow\n    instances.\n    <p>See\n      <!-- <page-ref-link menu-path=\"InitialConfig\" /> for initial ServiceNow configuration steps. See\n      <page-ref-link menu-path=\"UpdateSets\" /> for information on global update sets. Otherwise, use other menu options for individual application documentation. --></p>\n  </div>\n</div>\n<div class=\"card\">\n  <div class=\"card-header\">\n    <h2>Development</h2>\n  </div>\n  <div class=\"card-body\">\n    There are 2 special repositories,\n    <a href=\"../ServiceNowServerDev\" target=\"_blank\">\n      <!-- <page-ref-heading-text menu-path=\"Scripting/ServiceNowServerDev\" /> -->\n    </a>\n    and\n    <a href=\"../ServiceNowClientDev\" target=\"_blank\">\n      <!-- <page-ref-heading-text menu-path=\"Scripting/ServiceNowClientDev\" /> -->\n    </a>, which are intended to assist with complex source code development for other applications. These repositories use node.js\n    and NPM modules to compile TypeScript sources and generate JavaScript. This compiled JavaScript must then be manually\n    ported to the actual JavaScript code that will be used in the individual applications.\n    <ul>\n      <li>\n        <!-- <page-ref-link menu-path=\"Scripting/DevEnvSetup\" append-description=\"true\" /> -->\n      </li>\n      <li>\n        <!-- <page-ref-link menu-path=\"Scripting/Snippets\" append-description=\"true\" /> -->\n      </li>\n      <li>\n        <!-- <page-ref-link menu-path=\"Scripting/ServiceNowServerDev\" append-description=\"true\" /> -->\n      </li>\n      <li>\n        <!-- <page-ref-link menu-path=\"Scripting/ServiceNowClientDev\" append-description=\"true\" /> -->\n      </li>\n    </ul>\n  </div>\n</div>\n"

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

module.exports = "<!--[if lt IE 7]>\n  <p class=\"browsehappy\">You are using an <strong>outdated</strong> browser. Please <a href=\"#\">upgrade your browser</a> to improve your experience.</p>\n<![endif]-->\n<header class=\"container-fluid border border-secondary p-sm-1 defaultHeader\">\n  <h1>{{titleText}}</h1>{{descriptionText}}\n  <!-- <img width=\"300\" alt=\"Angular Logo\" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==\" /> -->\n</header>\n<nav class=\"container-fluid navbar navbar-expand-lg navbar-light bg-light border border-light p-sm-1 mr-md-3\">\n  <ul class=\"navbar-nav mr-auto\">\n    <li class=\"nav-item border active border-secondary bg-light\">\n      <a routerLink=\"/\" class=\"nav-link text-dark\">Home</a>\n    </li>\n    <li class=\"nav-item border border-secondary bg-dark\">\n      <a routerLink=\"/initial-config\" class=\"nav-link text-light\">Initial Config</a>\n    </li>\n    <li class=\"nav-item border border-secondary bg-dark\">\n      <a routerLink=\"/update-sets\" class=\"nav-link text-light\">Update Sets</a>\n    </li>\n    <li class=\"nav-item border border-secondary bg-dark\">\n      <a routerLink=\"/applications\" class=\"nav-link text-light\">Custom Apps</a>\n    </li>\n    <li class=\"nav-item border border-secondary bg-dark\">\n      <a routerLink=\"/dev-info\" class=\"nav-link text-light\">Dev Info</a>\n      <!-- <a target=\"_blank\" rel=\"noopener\" href=\"https://angular.io/tutorial\" class=\"\">Tour of Heroes</a> -->\n    </li>\n  </ul>\n</nav>\n<!-- <aside class=\"float-right d-inline-flex\">\n  <ul class=\"nav flex-column\">\n    <li class=\"nav-item\">\n      <a href=\"#\" class=\"nav-link\"></a>\n    </li>\n  </ul>\n</aside> -->\n<section class=\"container-fluid border border-light p-md-3\">\n  <router-outlet></router-outlet>\n</section>\n"

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
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.titleText = AppComponent_1.DefaultTitleText;
        this.descriptionText = '';
    }
    AppComponent_1 = AppComponent;
    var AppComponent_1;
    AppComponent.DefaultTitleText = 'ServiceNow Implementation, Dev and Maintenance';
    AppComponent = AppComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
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
                _large_modal_large_modal_component__WEBPACK_IMPORTED_MODULE_12__["LargeModalComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_11__["NgbModule"].forRoot()
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
            entryComponents: [_large_modal_large_modal_component__WEBPACK_IMPORTED_MODULE_12__["LargeModalComponent"]]
        })
    ], AppModule);
    return AppModule;
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

module.exports = "<div class=\"card\">\n  <div class=\"card-header\">\n    <h2 id=\"loadInitialGlobalUpdate\">1. Initial Global Update Set</h2>\n  </div>\n  <div class=\"card-body\">\n    <div class=\"detail\">Load and apply the initial global update set to prepare the instance.</div>\n    <ol>\n      <li class=\"align-text-top\">\n        Navigate to\n        <samp>System Update Sets</samp> &rArr;\n        <samp>Retrieved Update Sets</samp>\n        <button (click)=\"openFigure('Navigation and related links example', 'assets/images/initialConfig/relatedLinks_lg.png')\" class=\"btn btn-outline-primary mb-2 mr-2\">\n          <img src=\"assets/images/initialConfig/relatedLinks_sm.png\" alt=\"View navigation and related links example\" class=\"figure-img img-fluid rounded\"\n          />\n        </button>\n      </li>\n      <li class=\"align-text-top\">Click on\n        <samp>Import Update Set from XML</samp> under\n        <em>Related Links</em>\n      </li>\n      <li class=\"align-text-top\">Click on the\n        <samp>Choose File</samp> button and upload the\n        <a href=\"downloads/sys_remote_update_set_Initial_Setup.xml\" target=\"_blank\">sys_remote_update_set_Initial_Setup.xml</a> File in the\n        <var>downloads</var> folder of this documentation.\n        <button (click)=\"openFigure('Example of file upload dialog', 'assets/images/initialConfig/chooseFile_lg.png')\" class=\"btn btn-outline-primary mb-2 mr-2\">\n          <img src=\"assets/images/initialConfig/chooseFile_sm.png\" alt=\"Click to view example of file upload dialog\" class=\"figure-img img-fluid rounded\"\n          />\n        </button>\n      </li>\n      <li class=\"align-text-top\">Once it is loaded, open the update set and click the\n        <samp>Preview Update Set</samp> button.\n        <button (click)=\"openFigure('Example of uploaded upset set', 'assets/images/initialConfig/uploaded_lg.png')\" class=\"btn btn-outline-primary mb-2 mr-2\">\n          <img src=\"assets/images/initialConfig/uploaded_sm.png\" alt=\"Click to view example of uploaded upset set\" class=\"figure-img img-fluid rounded\"\n          />\n        </button>\n        &rArr;\n        <button (click)=\"openFigure('Example of preview success popup', 'assets/images/initialConfig/previewSuccess_lg.png')\" class=\"btn btn-outline-primary mb-2 mr-2\">\n          <img src=\"assets/images/initialConfig/previewSuccess_sm.png\" alt=\"View example of preview success popup\" class=\"figure-img img-fluid rounded\"\n          />\n        </button>\n      </li>\n      <li class=\"align-text-top\">After it is validated, click the\n        <samp>Commit Update Set</samp> to apply it.\n        <button (click)=\"openFigure('Example of commit success popup', 'assets/images/initialConfig/commitSuccess_lg.png')\" class=\"btn btn-outline-primary mb-2 mr-2\">\n          <img src=\"assets/images/initialConfig/commitSuccess_sm.png\" alt=\"View example of commit success popup\" class=\"figure-img img-fluid rounded\"\n          />\n        </button>\n      </li>\n    </ol>\n  </div>\n</div>\n\n<div class=\"card\">\n  <div class=\"card-header\">\n    <h2 id=\"importUtils\">2. Import Utility Application</h2>\n  </div>\n  <div class=\"card-body\">\n    <div class=\"detail\">In this step you will be importing a utility application which includes many utility framework functionality to support\n      other scripts. This will also create a custom system property which can be used by automated processes to determine\n      whether the current instance is for production, UAT, Testing, Development or if it is a sandbox instance.</div>\n    <ol>\n      <li class=\"align-text-top\">\n        Navigate to\n        <samp>System Applications</samp> &rArr;\n        <samp>Studio</samp>. Once you click on\n        <samp>Studio</samp>, the application studio will open in separate browser tab.\n        <button (click)=\"openFigure('Example of navigation', 'assets/images/initialConfig/systemApplicationsStudio_lg.png')\" class=\"btn btn-outline-primary mb-2 mr-2\">\n          <img src=\"assets/images/initialConfig/systemApplicationsStudio_sm.png\" alt=\"Click to view example of navigation\" class=\"figure-img img-fluid rounded\"\n          />\n        </button>\n      </li>\n      <li class=\"align-text-top\">\n        Click on the\n        <samp>Import from Source Control</samp> button in the popup dialog.\n        <button (click)=\"openFigure('Example of Select Application dialog', 'assets/images/initialConfig/importFromSourceControl_lg.png')\"\n          class=\"btn btn-outline-primary mb-2 mr-2\">\n          <img src=\"assets/images/initialConfig/importFromSourceControl_sm.png\" alt=\"Click to view example of Select Application dialog\"\n            class=\"figure-img img-fluid rounded\" />\n        </button>\n      </li>\n      <li class=\"align-text-top\">Enter credentials for connecting to the associated Git repository.\n        <button (click)=\"openFigure('Example of git credentials dialog', 'assets/images/initialConfig/importApplicationDialog_lg.png')\"\n          class=\"btn btn-outline-primary mb-2 mr-2\">\n          <img src=\"assets/images/initialConfig/importApplicationDialog_sm.png\" alt=\"Click to view example of git credentials dialog\"\n            class=\"figure-img img-fluid rounded\" />\n        </button>\n      </li>\n      <li class=\"align-text-top\">Progress will be indicated as it imports the application. Once it is finished, click the\n        <samp>Select Application</samp> button.\n        <button (click)=\"openFigure('Example of application import progress', 'assets/images/initialConfig/gitImportProgress_lg.png')\"\n          class=\"btn btn-outline-primary mb-2 mr-2\">\n          <img src=\"assets/images/initialConfig/gitImportProgress_sm.png\" alt=\"Click to view example of application import progress\"\n            class=\"figure-img img-fluid rounded\" />\n        </button>\n        &rArr;\n        <button (click)=\"openFigure('Example of application import success', 'assets/images/initialConfig/gitImportSuccess_lg.png')\"\n          class=\"btn btn-outline-primary mb-2 mr-2\">\n          <img src=\"assets/images/initialConfig/gitImportSuccess_sm.png\" alt=\"Click to view example of application import success\"\n            class=\"figure-img img-fluid rounded\" />\n        </button>\n      </li>\n      <li class=\"align-text-top\">You should now see the imported application listed. Select the application in order to put your session in the correct\n        scope, and then close out the\n        <samp>Application Studio</samp> browser tab.\n        <button (click)=\"openFigure('Example of application selections', 'assets/images/initialConfig/selectApplicationDialog_lg.png')\"\n          class=\"btn btn-outline-primary mb-2 mr-2\">\n          <img src=\"assets/images/initialConfig/selectApplicationDialog_sm.png\" alt=\"Click to view example of application selections\"\n            class=\"figure-img img-fluid rounded\" />\n        </button>\n        &rArr;\n        <button (click)=\"openFigure('Example of selected application', 'assets/images/initialConfig/importApplicationComplete_lg.png')\"\n          class=\"btn btn-outline-primary mb-2 mr-2\">\n          <img src=\"assets/images/initialConfig/importApplicationComplete_sm.png\" alt=\"Click to view example of selected application\"\n            class=\"figure-img img-fluid rounded\" />\n        </button>\n      </li>\n    </ol>\n  </div>\n</div>\n\n<div class=\"card\">\n  <div class=\"card-header\">\n    <h2 id=\"uiconfig\">3. Initial Config</h2>\n  </div>\n  <div class=\"card-body\">\n    <div class=\"detail\">In this step you will specify whether the current instance is for production, UAT, Testing, Development or if it is a\n      sandbox instance, and then you will execute a fix script to apply the corresponding color theme and other SDLC-related\n      settings, such as the logo heading text.</div>\n    <ol>\n      <li>Navigate to\n        <samp>System Properties</samp> &rArr;\n        <samp>General Properties</samp>. If you are in the &quot;Util&quot; application scope, you will see the following message:\n        <img src=\"assets/images/initialConfig/globalApplicationWarning.png\" alt=\"Example of application selection dialog\" class=\"figure-img img-fluid rounded\"\n        /> This is intentional. It is important to ensure you are in the &quot;Util&quot; application scope, otherwise the\n        next change will not be saved.\n      </li>\n      <li>Set SDLC Config Stage to the ServiceNow SDLC stage for the current server.</li>\n      <li>Change to the &quot;Global&quot; application scope.</li>\n      <li>Navigate to\n        <samp>System Definition</samp> &rArr;\n        <samp>Fix Scripts</samp>.</li>\n      <li>Open the fix script named\n        <var>Initial Army Config</var>.</li>\n      <li>Click\n        <samp>Run Fix Script</samp>.</li>\n      <li>Click\n        <samp>Proceed</samp> if you wish to wait for the script to finish; otherwise, click\n        <samp>Proceed in Background</samp> to let it run in the background. This script can take several minutes to finish. If\n        you chose to let it run in the foreground, the logged output that occurred during script execution will be displayed\n        when it is finished. At the bottom of the output, you should see a line that indicates it has succeeded.\n        <br />\n        <button (click)=\"openFigure('Example of completed fix script', 'assets/images/initialConfig/initialArmyConfigSuccess_lg.png')\"\n          class=\"btn btn-outline-primary mb-2 mr-2\">\n          <img src=\"assets/images/initialConfig/initialArmyConfigSuccess_sm.png\" alt=\"Click to view example of completed fix script\"\n            class=\"figure-img img-fluid rounded\" />\n        </button> Refresh the browser page to see the applied color scheme.\n      </li>\n    </ol>\n  </div>\n</div>\n\n<div class=\"card\">\n  <div class=\"card-header\">\n    <h2 id=\"uploadLogoImage\">5. Upload logo image</h2>\n  </div>\n  <div class=\"card-body\">\n    <div class=\"detail\">To automate configuration settings for graphical images, it would require significant overhead. Therefore, the logo image\n      will need to be uploaded manually.</div>\n    <ol>\n      <li>Ensure you are in the &quot;Global&quot; application scope.</li>\n      <li>Navigate to\n        <samp>System Properties</samp> &rArr;\n        <samp>General Properties</samp>.\n      </li>\n      <li>Scroll to the &quot;Banner Image&quot; property and click on the\n        <samp>+</samp> icon to upload the banner image.\n        <button (click)=\"openFigure('Example of banner image setting', 'assets/images/initialConfig/bannerImageSetting_lg.png')\"\n          class=\"btn btn-outline-primary mb-2 mr-2\">\n          <img src=\"assets/images/initialConfig/bannerImageSetting_sm.png\" alt=\"Click to view example of banner image setting\" class=\"figure-img img-fluid rounded\"\n          />\n        </button>\n      </li>\n      <li>Upload the logo image corresponding to the SDLC stage you previously configured. You can download an image from one\n        of the following links:\n        <ul>\n          <li>\n            <a href=\"assets/downloads/Logo/logo_army_prod.png\">\n              <img src=\"assets/downloads/Logo/logo_army_prod.png\" alt=\"Production Banner Logo\" class=\"figure-img img-fluid rounded\"\n              /> Production\n            </a>\n          </li>\n          <li>\n            <a href=\"assets/downloads/Logo/logo_army_uat.png\">\n              <img src=\"assets/downloads/Logo/logo_army_uat.png\" alt=\"UAT Banner Logo\" class=\"figure-img img-fluid rounded\"\n              /> UAT\n            </a>\n          </li>\n          <li>\n            <a href=\"assets/downloads/Logo/logo_army_test.png\">\n              <img src=\"assets/downloads/Logo/logo_army_test.png\" alt=\"Test Banner Logo\" class=\"figure-img img-fluid rounded\"\n              /> Test\n            </a>\n          </li>\n          <li>\n            <a href=\"assets/downloads/Logo/logo_army_dev.png\">\n              <img src=\"assets/downloads/Logo/logo_army_dev.png\" alt=\"Dev Banner Logo\" class=\"figure-img img-fluid rounded\"\n              /> Dev\n            </a>\n          </li>\n          <li>\n            <a href=\"assets/downloads/Logo/logo_army_sb.png\">\n              <img src=\"assets/downloads/Logo/logo_army_sb.png\" alt=\"Sandbox Banner Logo\" class=\"figure-img img-fluid rounded\"\n              /> Sandbox\n            </a>\n          </li>\n          <li>\n            <a href=\"assets/downloads/Logo/logo_service-now.png\">\n              <img src=\"assets/downloads/Logo/logo_service-now.png\" alt=\"OOTB Banner Logo\" class=\"figure-img img-fluid rounded\"\n              /> Out-of-the-box\n            </a>\n          </li>\n        </ul>\n      </li>\n    </ol>\n  </div>\n</div>\n\n<div class=\"card\">\n  <div class=\"card-header\">\n    <h2 id=\"pluginActivate\">6. Bulk Plugin Activation</h2>\n  </div>\n  <div class=\"card-body\">\n    <div class=\"detail\">In this step you will launch a fix script which will activate plugins in the background. Plugin activation progress can\n      be monitored from the progress workers list.</div>\n    <ol>\n      <li>Navigate to\n        <samp>System Definition</samp> &rArr;\n        <samp>Fix Scripts</samp>.</li>\n      <li>Open the fix script named\n        <var>Army Bulk Plugin Activation</var>.</li>\n      <li>Click\n        <samp>Run Fix Script</samp>.</li>\n      <li>Click\n        <samp>Proceed</samp> if you wish to wait for the script to finish; otherwise, click\n        <samp>Proceed in Background</samp> to let it run in the background. This script can take a long time to finish.</li>\n    </ol>\n    <div class=\"detail\">To monitor the progress of plugin activations, navigate to\n      <samp>System Diagnostics</samp> &rArr;\n      <samp>Progress Workers</samp>.</div>\n  </div>\n</div>\n\n<div class=\"card\">\n  <div class=\"card-header\">\n    <h2 id=\"importGrpNameReg\">7. Import Group Names Registry Application</h2>\n  </div>\n  <div class=\"card-body\">\n    <div class=\"detail\">The Group Names Registry applications provides a way of synchronizing User Group references between ServiceNow instances,\n      such as Dev, Test and Production.</div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/initial-sn-config/initial-sn-config.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/initial-sn-config/initial-sn-config.component.ts ***!
  \******************************************************************/
/*! exports provided: ModalVisiblity, InitialSnConfigComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalVisiblity", function() { return ModalVisiblity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InitialSnConfigComponent", function() { return InitialSnConfigComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app.component */ "./src/app/app.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _large_modal_large_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../large-modal/large-modal.component */ "./src/app/large-modal/large-modal.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ModalVisiblity = /** @class */ (function () {
    function ModalVisiblity() {
        this._isVisible = false;
    }
    Object.defineProperty(ModalVisiblity.prototype, "isVisible", {
        get: function () { return this._isVisible; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalVisiblity.prototype, "isHidden", {
        get: function () { return !this._isVisible; },
        enumerable: true,
        configurable: true
    });
    ModalVisiblity.prototype.toggle = function () { this._isVisible = !this._isVisible; };
    ModalVisiblity.prototype.show = function () {
        console.log('Making visible');
        this._isVisible = true;
    };
    ModalVisiblity.prototype.hide = function () {
        console.log('Making invisible');
        this._isVisible = false;
    };
    return ModalVisiblity;
}());

var InitialSnConfigComponent = /** @class */ (function () {
    function InitialSnConfigComponent(_app, _modalService) {
        this._app = _app;
        this._modalService = _modalService;
        this._modalTitleText = '';
        this._modalImageUrl = '';
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
    InitialSnConfigComponent.prototype.openFigure = function (modalTitleText, modalImageUrl) {
        var modalRef = this._modalService.open(_large_modal_large_modal_component__WEBPACK_IMPORTED_MODULE_3__["LargeModalComponent"], { size: 'lg' });
        modalRef.componentInstance.titleText = modalTitleText;
        modalRef.componentInstance.content = { type: 'figure', src: modalImageUrl, alt: modalTitleText };
    };
    InitialSnConfigComponent.prototype.openLg = function (content) {
        this._modalTitleText = 'My Modal';
        this._modalService.open(content, { size: 'lg' });
    };
    InitialSnConfigComponent.prototype.openLg2 = function (content) {
        this._modalTitleText = 'My Modal 2';
        this._modalService.open(content, { size: 'lg' });
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

module.exports = "<div class=\"modal-header\">\n  <h4 class=\"modal-title\">{{titleText}}</h4>\n  <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"activeModal.dismiss('Cross click')\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n<div class=\"modal-body\">\n  <ng-template ngFor let-item [ngForOf]=\"content\">\n    <strong *ngIf=\"item.type=='text' &amp;&amp; item.bold\">{{item.text}}</strong>\n    <ng-template [ngIf]=\"item.type=='text' &amp;&amp; !item.bold\">{{item.text}}</ng-template>\n    <img *ngIf=\"item.type=='figure'\" class=\"figure-img img-fluid rounded\" src=\"{{item.src}}\" alt=\"{{item.alt}}\" />\n    <p *ngIf=\"item.type=='p'\">\n        <ng-template ngFor let-item [ngForOf]=\"content\">\n          <strong *ngIf=\"item.type=='text' &amp;&amp; item.bold\">{{item.text}}</strong>\n          <ng-template [ngIf]=\"item.type=='text' &amp;&amp; !item.bold\">{{item.text}}</ng-template>\n          <img *ngIf=\"item.type=='figure'\" class=\"figure-img img-fluid rounded\" src=\"{{item.src}}\" alt=\"{{item.alt}}\" />\n        </ng-template>\n    </p>\n  </ng-template>\n</div>\n<div class=\"modal-footer\">\n  <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"activeModal.close('Close click')\">Close</button>\n</div>\n"

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


function isLargeModalBodyText(value) {
    return value.type === 'text';
}
function isLargeModalBodyParagraph(value) {
    return value.type === 'p';
}
function isLargeModalBodyFigure(value) {
    return value.type === 'figure';
}
function importLargeModalBodyContent(value) {
    if (typeof (value) === 'string')
        return [{ type: 'text', text: value }];
    if (Array.isArray(value))
        return value.map(function (v) {
            if (typeof (v) === 'string')
                return { type: 'text', text: v };
            if (isLargeModalBodyParagraph(v))
                return {
                    type: 'p',
                    content: (importLargeModalBodyContent(v.content))
                };
            return v;
        });
    if (isLargeModalBodyParagraph(value))
        return [{
                type: 'p',
                content: (importLargeModalBodyContent(value.content))
            }];
    return [value];
}
var LargeModalComponent = /** @class */ (function () {
    function LargeModalComponent(activeModal) {
        this.activeModal = activeModal;
        this._content = [];
    }
    Object.defineProperty(LargeModalComponent.prototype, "content", {
        get: function () { return this._content; },
        set: function (value) {
            this._content = importLargeModalBodyContent(value);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], LargeModalComponent.prototype, "titleText", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], LargeModalComponent.prototype, "content", null);
    LargeModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-large-modal',
            template: __webpack_require__(/*! ./large-modal.component.html */ "./src/app/large-modal/large-modal.component.html"),
            styles: [__webpack_require__(/*! ./large-modal.component.css */ "./src/app/large-modal/large-modal.component.css")]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbActiveModal"]])
    ], LargeModalComponent);
    return LargeModalComponent;
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

module.exports = "<p>\n  sn-applications works!\n</p>\n"

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

module.exports = "<p>\n  sn-dev-info works!\n</p>\n"

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

module.exports = "<p>\n  update-sets works!\n</p>\n"

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