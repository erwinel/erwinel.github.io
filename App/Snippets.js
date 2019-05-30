/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />
/// <reference path="app.ts" />
/// <reference path="cards.ts" />
var snippets;
(function (snippets) {
    app.appModule.controller("snippetsController", ['$scope', cards.CardParentController]);
    class ClipardCardController extends cards.CardController {
        constructor($scope, copyToClipboardService, headingText, contentElementId, copyToClipboardSuccessMsg) {
            super($scope, headingText);
            this.copyToClipboardService = copyToClipboardService;
            this.contentElementId = contentElementId;
            this.copyToClipboardSuccessMsg = copyToClipboardSuccessMsg;
            let controller = this;
            $scope.contentElementId = contentElementId;
            $scope.copyToClipboard = () => { return controller.copyToClipboard(); };
        }
        copyToClipboard() {
            this.copyToClipboardService.copy($("#" + this.contentElementId), this.copyToClipboardSuccessMsg);
            return false;
        }
    }
    class ForceToUpdateSetWithValidationController extends ClipardCardController {
        constructor($scope, copyToClipboard) { super($scope, copyToClipboard, 'Force To Update Set', 'forceToUpdateSetWithValidation', 'Code copied to clipboard'); }
    }
    app.appModule.controller("forceToUpdateSetWithValidationController", ['$scope', 'copyToClipboardService', ForceToUpdateSetWithValidationController]);
    class ForceToUpdateSetNoValidationController extends ClipardCardController {
        constructor($scope, copyToClipboard) { super($scope, copyToClipboard, 'Force To Update Set (no validation)', 'forceToUpdateSetNoValidation', 'Code copied to clipboard'); }
    }
    app.appModule.controller("forceToUpdateSetNoValidationController", ['$scope', 'copyToClipboardService', ForceToUpdateSetNoValidationController]);
})(snippets || (snippets = {}));
