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
            $scope.copyContentToClipboard = () => { return controller.copyContentToClipboard(); };
        }
        copyContentToClipboard() {
            this.copyToClipboardService.copy($("#" + this.contentElementId), this.copyToClipboardSuccessMsg);
            return false;
        }
    }
    class ClipboardWithConditionCardController extends ClipardCardController {
        constructor($scope, copyToClipboardService, headingText, contentElementId, conditionElementId, copyToClipboardSuccessMsg) {
            super($scope, copyToClipboardService, headingText, contentElementId, copyToClipboardSuccessMsg);
            this.conditionElementId = conditionElementId;
            $scope.conditionElementId = conditionElementId;
            let controller = this;
            $scope.copyConditionToClipboard = () => { return controller.copyConditionToClipboard(); };
        }
        copyConditionToClipboard() {
            this.copyToClipboardService.copy($("#" + this.conditionElementId));
            return false;
        }
    }
    class ForceToUpdateSetWithValidationController extends ClipboardWithConditionCardController {
        constructor($scope, copyToClipboard) { super($scope, copyToClipboard, 'Force To Update Set', 'forceToUpdateSet1Content', 'forceToUpdateSet1Condition', 'Code copied to clipboard'); }
    }
    app.appModule.controller("forceToUpdateSetWithValidationController", ['$scope', 'copyToClipboardService', ForceToUpdateSetWithValidationController]);
    class ForceToUpdateSetNoValidationController extends ClipboardWithConditionCardController {
        constructor($scope, copyToClipboard) { super($scope, copyToClipboard, 'Force To Update Set (no validation)', 'forceToUpdateSet2Content', 'forceToUpdateSet2Condition', 'Code copied to clipboard'); }
    }
    app.appModule.controller("forceToUpdateSetNoValidationController", ['$scope', 'copyToClipboardService', ForceToUpdateSetNoValidationController]);
    class MoveToUpdateSetController extends ClipboardWithConditionCardController {
        constructor($scope, copyToClipboard) { super($scope, copyToClipboard, 'Move To Current Update Set', 'moveToUpdateSetContent', 'moveToUpdateSetCondition', 'Code copied to clipboard'); }
    }
    app.appModule.controller("moveToUpdateSetController", ['$scope', 'copyToClipboardService', MoveToUpdateSetController]);
})(snippets || (snippets = {}));
