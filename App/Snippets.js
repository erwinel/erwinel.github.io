/// <reference path="../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />
/// <reference path="app.ts" />
/// <reference path="accordionGroup.ts" />
var snippets;
(function (snippets) {
    class ClipardCardController {
        constructor($scope, copyToClipboardService, contentElementId, copyToClipboardSuccessMsg) {
            this.$scope = $scope;
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
        $doCheck() { }
    }
    class ClipboardWithConditionCardController extends ClipardCardController {
        constructor($scope, copyToClipboardService, contentElementId, conditionElementId, copyToClipboardSuccessMsg) {
            super($scope, copyToClipboardService, contentElementId, copyToClipboardSuccessMsg);
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
        constructor($scope, copyToClipboard) { super($scope, copyToClipboard, 'forceToUpdateSet1Content', 'forceToUpdateSet1Condition', 'Code copied to clipboard'); }
    }
    app.appModule.controller("forceToUpdateSetWithValidationController", ['$scope', 'copyToClipboardService', ForceToUpdateSetWithValidationController]);
    class ForceToUpdateSetNoValidationController extends ClipboardWithConditionCardController {
        constructor($scope, copyToClipboard) { super($scope, copyToClipboard, 'forceToUpdateSet2Content', 'forceToUpdateSet2Condition', 'Code copied to clipboard'); }
    }
    app.appModule.controller("forceToUpdateSetNoValidationController", ['$scope', 'copyToClipboardService', ForceToUpdateSetNoValidationController]);
    class MoveToUpdateSetController extends ClipboardWithConditionCardController {
        constructor($scope, copyToClipboard) { super($scope, copyToClipboard, 'moveToUpdateSetContent', 'moveToUpdateSetCondition', 'Code copied to clipboard'); }
    }
    app.appModule.controller("moveToUpdateSetController", ['$scope', 'copyToClipboardService', MoveToUpdateSetController]);
})(snippets || (snippets = {}));
//# sourceMappingURL=Snippets.js.map