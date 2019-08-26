/// <reference path="../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="sys.ts" />
var regexTester;
(function (regexTester) {
    const MAX_INPUT_ITEMS = 32;
    const DEFAULT_TEXTAREA_LINES = 6;
    const MAX_TEXTAREA_LINES = 24;
    const WHITESPACE_GLOBAL_REGEXP = /[\s\r\n\p{C}]+/g;
    const NEWLINE_GLOBAL_REGEXP = /\r\n?|\n/g;
    const LINETEXT_REGEXP = /^([^\r\n]+)?(\r\n?|\n)/;
    function preventEventDefaultAndStopPropogation(event) {
        if (typeof event === undefined)
            return;
        if (!event.isDefaultPrevented())
            event.preventDefault();
        if (!event.isPropagationStopped())
            event.stopPropagation();
    }
    // #region evaluation-item directive
    let EvaluationState;
    (function (EvaluationState) {
        /** Setting the state to this value causes evaluation to start. */
        EvaluationState[EvaluationState["pending"] = 0] = "pending";
        /** Item not evaluated (usually due to expression error) */
        EvaluationState[EvaluationState["notEvaluated"] = 1] = "notEvaluated";
        /** State gets set to this value when evaluation has started. */
        EvaluationState[EvaluationState["evaluating"] = 2] = "evaluating";
        /** Evaluation succeeded */
        EvaluationState[EvaluationState["success"] = 3] = "success";
        /** Evaluation indicated no match */
        EvaluationState[EvaluationState["noMatch"] = 4] = "noMatch";
        /** Exception occurred during evaluation */
        EvaluationState[EvaluationState["error"] = 5] = "error";
    })(EvaluationState || (EvaluationState = {}));
    class EvaluationItemController {
        // TODO: Cleanup , inputText: "", isReplaceMode: false, replacementText: ""
        constructor($scope, $element, $q, $log) {
            this.$scope = $scope;
            this.$element = $element;
            this.$q = $q;
            this.$log = $log;
            $scope.resultText = $scope.evalErrorMessage = $scope.evalErrorDetailMessage = "";
            $scope.hasEvalError = $scope.hasEvalErrorDetails = $scope.showReplacementTextBox = $scope.showMatchButton = $scope.showReplaceButton = $scope.showRowDeleteButton =
                $scope.showCurrentDeleteButton = false;
            $scope.showReplacementTextRo = !$scope.isCurrent;
            $scope.matchIndex = -1;
            $scope.groups = [];
            $scope.inputLines = [{ lineNumber: 1, length: 0, sourceText: "", escapedText: "", trailingNewLine: "", isCurrentComparison: true, selectForComparison: preventEventDefaultAndStopPropogation }];
            $scope.resultLines = [{ lineNumber: 1, length: 0, sourceText: "", escapedText: "", trailingNewLine: "", isCurrentComparison: true, selectForComparison: preventEventDefaultAndStopPropogation }];
            $scope.comparison = {
                leadingEqualText: "",
                differenceIndex: 0,
                areEqual: true,
                trailingInputDifference: "",
                inputLineNumber: 1,
                trailingResultDifference: "",
                resultLineNumber: 1
            };
            let uriBuilder = $scope.uriBuilder;
            if (sys.isNil(uriBuilder) || !(uriBuilder instanceof RegexTesterController)) {
                let rootId = $scope.$root.$id;
                for (let parentScope = $scope.$parent; sys.notNil(parentScope); parentScope = (parentScope.$id === rootId) ? undefined : parentScope.$parent) {
                    if (sys.notNil(parentScope.uriBuilder) && parentScope.uriBuilder instanceof RegexTesterController) {
                        uriBuilder = parentScope.uriBuilder;
                        break;
                    }
                }
                if (sys.isNil(uriBuilder) || !(uriBuilder instanceof RegexTesterController))
                    throw new Error("Unable to detect parent uriBuilder controller scope");
            }
            this._uriBuilder = uriBuilder;
            let evaluationItem = this;
            $scope.$watch("state", (newValue, oldValue) => {
                $log.debug("Watch raised for 'EvaluationItemController.state'");
                if (newValue === EvaluationState.pending)
                    evaluationItem.startEvaluation();
            });
            $scope.$watch("inputText", () => {
                $log.debug("Watch raised for 'EvaluationItemController.inputText'");
                evaluationItem.startEvaluation();
            });
            $scope.$watch("replacementText", () => {
                $log.debug("Watch raised for 'EvaluationItemController.replacementText'");
                if (evaluationItem.$scope.isReplaceMode)
                    evaluationItem.startEvaluation();
            });
            $scope.$watch("isCurrent", () => {
                $log.debug("Watch raised for 'EvaluationItemController.isCurrent'");
                if (evaluationItem.$scope.isCurrent) {
                    evaluationItem.$scope.showReplacementTextBox = evaluationItem.$scope.showMatchButton = evaluationItem.$scope.isReplaceMode;
                    evaluationItem.$scope.showReplaceButton = !evaluationItem.$scope.showMatchButton;
                    evaluationItem.$scope.showReplacementTextRo = evaluationItem.$scope.showRowDeleteButton = false;
                    evaluationItem.$scope.showCurrentDeleteButton = evaluationItem.$scope.canDeleteCurrent;
                }
                else {
                    evaluationItem.$scope.showRowDeleteButton = evaluationItem.$scope.canDeleteCurrent;
                    evaluationItem.$scope.showReplaceButton = evaluationItem.$scope.showMatchButton = evaluationItem.$scope.showReplacementTextBox =
                        evaluationItem.$scope.showCurrentDeleteButton = false;
                    evaluationItem.$scope.showReplacementTextRo = evaluationItem.$scope.isReplaceMode;
                }
            });
            $scope.$watch("isReplaceMode", () => {
                $log.debug("Watch raised for 'EvaluationItemController.isReplaceMode'");
                if (evaluationItem.$scope.isReplaceMode) {
                    evaluationItem.$scope.showReplacementTextBox = evaluationItem.$scope.isReplaceMode && evaluationItem.$scope.isCurrent;
                    evaluationItem.$scope.showReplacementTextRo = !evaluationItem.$scope.showReplacementTextBox;
                }
                else
                    evaluationItem.$scope.showReplacementTextBox = evaluationItem.$scope.showReplacementTextRo = false;
                evaluationItem.startEvaluation();
            });
            $scope.$watch("evalErrorMessage", () => {
                $log.debug("Watch raised for 'EvaluationItemController.evalErrorMessage'");
                let value = $scope.evalErrorMessage.trim().length > 0;
                if (value !== $scope.hasEvalError)
                    $scope.hasEvalError = value;
                if (value) {
                    if ($scope.state !== EvaluationState.error)
                        $scope.state = EvaluationState.error;
                    value = $scope.evalErrorDetailMessage.trim().length > 0;
                }
                if (value !== $scope.hasEvalErrorDetails)
                    $scope.hasEvalErrorDetails = value;
                if (!value && $scope.evalErrorDetailMessage.length > 0)
                    $scope.evalErrorDetailMessage = "";
                evaluationItem.updateCssClasses();
            });
            $scope.$watch("evalErrorDetailMessage", () => {
                $log.debug("Watch raised for 'EvaluationItemController.evalErrorDetailMessage'");
                let value = $scope.hasEvalError && $scope.evalErrorDetailMessage.length > 0;
                if (value !== $scope.hasEvalErrorDetails)
                    $scope.hasEvalErrorDetails = value;
            });
            if ($scope.state === EvaluationState.pending) {
                this.updateCssClasses();
                this.startEvaluation();
            }
            else {
                if ($scope.state !== EvaluationState.notEvaluated)
                    $scope.state = EvaluationState.notEvaluated;
                this.updateCssClasses();
            }
        }
        startEvaluation() {
            if (typeof this._uriBuilder === "undefined") {
                this.$scope.state = EvaluationState.notEvaluated;
                return;
            }
            let expression = this._uriBuilder.expression;
            if (sys.isNil(expression)) {
                this.$scope.state = EvaluationState.notEvaluated;
                this.$scope.outerCssClass = ["border", "border-dark"];
                return;
            }
            this.$scope.state = EvaluationState.evaluating;
            let flags = this._uriBuilder.flags;
            let pattern = this._uriBuilder.pattern;
            let controller = this;
            let isReplaceMode = this.$scope.isReplaceMode;
            let inputText = this.$scope.inputText;
            let replacementText = this.$scope.replacementText;
            this.$q((resolve, reject) => {
                if (typeof controller._uriBuilder === "undefined" || controller.$scope.isReplaceMode !== isReplaceMode || controller.$scope.inputText !== inputText || controller.$scope.replacementText !== replacementText || sys.isNil(controller._uriBuilder.expression) || flags !== controller._uriBuilder.flags || pattern !== controller._uriBuilder.pattern)
                    resolve(undefined);
                else
                    try {
                        if (isReplaceMode)
                            resolve(inputText.replace(expression, replacementText));
                        else
                            resolve(expression.exec(controller.$scope.inputText));
                    }
                    catch (reason) {
                        reject(reason);
                    }
            }).then((result) => {
                if (typeof controller._uriBuilder === "undefined" || controller.$scope.isReplaceMode !== isReplaceMode || controller.$scope.inputText !== inputText || controller.$scope.replacementText !== replacementText || sys.isNil(controller._uriBuilder.expression) || flags !== controller._uriBuilder.flags || pattern !== controller._uriBuilder.pattern)
                    return;
                try {
                    controller.$scope.evalErrorMessage = "";
                }
                finally {
                    controller.onEvaluationCompleted(result);
                }
            }, (reason) => {
                if (typeof controller._uriBuilder === "undefined" || controller.$scope.isReplaceMode !== isReplaceMode || controller.$scope.inputText !== inputText || controller.$scope.replacementText !== replacementText || sys.isNil(controller._uriBuilder.expression) || flags !== controller._uriBuilder.flags || pattern !== controller._uriBuilder.pattern)
                    return;
                try {
                    controller.$scope.state = EvaluationState.error;
                    if (typeof reason === "string") {
                        if ((reason = reason.trim()).length > 0) {
                            controller.$scope.evalErrorDetailMessage = "";
                            controller.$scope.evalErrorMessage = reason;
                            return;
                        }
                    }
                    else if (typeof reason !== "undefined" && reason !== null) {
                        let message = reason.message;
                        let name = reason.name;
                        if (typeof message === "string" && (message = message.trim().length) > 0) {
                            let data = reason.data;
                            controller.$scope.evalErrorDetailMessage = (typeof data !== "undefined" && data !== null) ? angular.toJson(data) : "";
                            controller.$scope.evalErrorMessage = (typeof name === "string" && (name = name.trim()).length > 0) ? name + ": " + message : message;
                        }
                        else if (typeof name === "string" && (name = name.trim()).length > 0) {
                            controller.$scope.evalErrorMessage = '"' + name + '" error';
                            controller.$scope.evalErrorDetailMessage = angular.toJson(reason);
                        }
                        else {
                            controller.$scope.evalErrorDetailMessage = "";
                            controller.$scope.evalErrorMessage = (typeof reason === "object") ? angular.toJson(reason) : reason + "";
                        }
                        return;
                    }
                    controller.$scope.evalErrorDetailMessage = "";
                    controller.$scope.evalErrorMessage = "An unspecified error has occurred.";
                }
                finally {
                }
            });
        }
        onEvaluationCompleted(results) {
            let inputText = this.$scope.inputText;
            let inputLength = inputText.length;
            if (sys.isNil(results)) {
                this.$scope.state = EvaluationState.noMatch;
                this.$scope.outerCssClass = ["border", "border-warning"];
                this.$scope.resultText = this.$scope.evalErrorMessage = "";
                this.$scope.matchIndex = -1;
                this.$scope.groups = [];
                this.$scope.inputLines = [{ lineNumber: 1, length: 0, sourceText: "", escapedText: "", trailingNewLine: "", isCurrentComparison: true, selectForComparison: preventEventDefaultAndStopPropogation }];
                this.$scope.resultLines = [{ lineNumber: 1, length: 0, sourceText: "", escapedText: "", trailingNewLine: "", isCurrentComparison: true, selectForComparison: preventEventDefaultAndStopPropogation }];
                this.$scope.comparison = {
                    leadingEqualText: "",
                    differenceIndex: 0,
                    areEqual: true,
                    trailingInputDifference: "",
                    inputLineNumber: 1,
                    trailingResultDifference: "",
                    resultLineNumber: 1
                };
                return;
            }
            if (typeof results === "string") {
                this.$scope.resultText = results;
                let resultLength = results.length;
                let hasChange = results !== this.$scope.inputText;
                this.$scope.groups = [];
                this.$scope.inputLines = [];
                let lineText = inputText;
                let m = LINETEXT_REGEXP.exec(lineText);
                while (sys.notNil(m)) {
                    let n = angular.toJson(m[2]);
                    let t = m[1];
                    if (sys.isNil(t))
                        this.$scope.resultLines.push({ sourceText: "", escapedText: "", length: 0, lineNumber: this.$scope.inputLines.length + 1, trailingNewLine: n.substr(1, n.length - 2), isCurrentComparison: false, selectForComparison: preventEventDefaultAndStopPropogation });
                    else {
                        t = angular.toJson(t);
                        this.$scope.resultLines.push({ sourceText: m[1], escapedText: t.substr(1, n.length - 2), length: m[1].length, lineNumber: this.$scope.resultLines.length + 1, trailingNewLine: n.substr(1, n.length - 2), isCurrentComparison: false, selectForComparison: preventEventDefaultAndStopPropogation });
                    }
                    lineText = lineText.substr(m[0].length);
                }
                if (lineText.length > 0) {
                    let s = angular.toJson(lineText);
                    this.$scope.inputLines.push({ sourceText: lineText, escapedText: s.substr(1, s.length - 2), length: lineText.length, lineNumber: this.$scope.inputLines.length + 1, trailingNewLine: "", isCurrentComparison: false, selectForComparison: preventEventDefaultAndStopPropogation });
                }
                else if (this.$scope.inputLines.length == 0)
                    this.$scope.inputLines.push({ sourceText: "", escapedText: "", length: 0, lineNumber: 1, trailingNewLine: "", isCurrentComparison: false, selectForComparison: preventEventDefaultAndStopPropogation });
                if (hasChange) {
                    this.$scope.state = EvaluationState.success;
                    this.$scope.outerCssClass = ["border", "border-success"];
                    this.$scope.resultLines = [];
                    let matchIndex = (resultLength < inputLength) ? resultLength : inputLength;
                    for (let i = 0; i < matchIndex; i++) {
                        if (inputText.substr(i, 1) !== results.substr(i, 1)) {
                            matchIndex = i;
                            break;
                        }
                    }
                    this.$scope.matchIndex = matchIndex;
                    m = LINETEXT_REGEXP.exec(results);
                    while (sys.notNil(m)) {
                        let n = angular.toJson(m[2]);
                        let t = m[1];
                        if (sys.isNil(t))
                            this.$scope.resultLines.push({ sourceText: "", escapedText: "", length: 0, lineNumber: this.$scope.resultLines.length + 1, trailingNewLine: n.substr(1, n.length - 2), isCurrentComparison: false, selectForComparison: preventEventDefaultAndStopPropogation });
                        else {
                            t = angular.toJson(t);
                            this.$scope.resultLines.push({ sourceText: m[1], escapedText: t.substr(1, n.length - 2), length: m[1].length, lineNumber: this.$scope.resultLines.length + 1, trailingNewLine: n.substr(1, n.length - 2), isCurrentComparison: false, selectForComparison: preventEventDefaultAndStopPropogation });
                        }
                        results = results.substr(m[0].length);
                    }
                    if (results.length > 0) {
                        let s = angular.toJson(results);
                        this.$scope.resultLines.push({ sourceText: results, escapedText: s.substr(1, s.length - 2), length: results.length, lineNumber: this.$scope.resultLines.length + 1, trailingNewLine: "", isCurrentComparison: false, selectForComparison: preventEventDefaultAndStopPropogation });
                    }
                    else if (this.$scope.resultLines.length == 0)
                        this.$scope.resultLines.push({ sourceText: "", escapedText: "", length: 0, lineNumber: 1, trailingNewLine: "", isCurrentComparison: false, selectForComparison: preventEventDefaultAndStopPropogation });
                }
                else {
                    this.$scope.state = EvaluationState.noMatch;
                    this.$scope.outerCssClass = ["border", "border-info"];
                    this.$scope.matchIndex = inputLength;
                    this.$scope.resultLines = this.$scope.inputLines.map((value) => { return { sourceText: value.sourceText, escapedText: value.escapedText, length: value.length, lineNumber: value.lineNumber, trailingNewLine: value.trailingNewLine, isCurrentComparison: value.isCurrentComparison, selectForComparison: value.selectForComparison }; });
                }
                let controller = this;
                if (this.$scope.inputLines.length > 1)
                    this.$scope.inputLines.forEach((item) => {
                        item.selectForComparison = (event) => {
                            try {
                                preventEventDefaultAndStopPropogation(event);
                            }
                            finally {
                                if (!item.isCurrentComparison)
                                    controller.selectComparisonLines(item.lineNumber, controller.$scope.comparison.resultLineNumber);
                            }
                        };
                    });
                if (this.$scope.resultLines.length > 1)
                    this.$scope.resultLines.forEach((item) => {
                        item.selectForComparison = (event) => {
                            try {
                                preventEventDefaultAndStopPropogation(event);
                            }
                            finally {
                                if (!item.isCurrentComparison)
                                    controller.selectComparisonLines(controller.$scope.comparison.inputLineNumber, item.lineNumber);
                            }
                        };
                    });
            }
            else {
                this.$scope.state = EvaluationState.success;
                this.$scope.outerCssClass = ["border", "border-success"];
                this.$scope.resultText = this.$scope.evalErrorMessage = "";
                this.$scope.inputLines = [{ lineNumber: 1, length: 0, sourceText: "", escapedText: "", trailingNewLine: "", isCurrentComparison: true, selectForComparison: preventEventDefaultAndStopPropogation }];
                this.$scope.resultLines = [{ lineNumber: 1, length: 0, sourceText: "", escapedText: "", trailingNewLine: "", isCurrentComparison: true, selectForComparison: preventEventDefaultAndStopPropogation }];
                throw new Error("Method not implemented.");
            }
            this.selectComparisonLines(1, 1);
            this.$scope.evalErrorMessage = "";
            this.updateCssClasses();
        }
        updateCssClasses() {
            switch (this.$scope.state) {
                case EvaluationState.error:
                    this.$scope.outerCssClass = ["border", "border-danger"];
                    break;
                case EvaluationState.success:
                    this.$scope.outerCssClass = ["border", "border-success"];
                    break;
                case EvaluationState.noMatch:
                    this.$scope.outerCssClass = ["border", (this.$scope.isReplaceMode) ? "border-dark" : "border-success"];
                    break;
                default:
                    this.$scope.outerCssClass = ["border", "border-dark"];
                    break;
            }
        }
        selectComparisonLines(inputLineNumber, resultLineNumber) {
            let inputLine = this.$scope.inputLines[inputLineNumber - 1];
            let resultLine = this.$scope.resultLines[resultLineNumber - 1];
            this.$scope.inputLines = this.$scope.inputLines.map((item) => { item.isCurrentComparison = item.lineNumber === inputLineNumber; return item; });
            this.$scope.resultLines = this.$scope.resultLines.map((item) => { item.isCurrentComparison = item.lineNumber === resultLineNumber; return item; });
            if (inputLine.sourceText === resultLine.sourceText)
                this.$scope.comparison = {
                    leadingEqualText: inputLine.escapedText,
                    differenceIndex: inputLine.length,
                    areEqual: true,
                    trailingInputDifference: "",
                    inputLineNumber: inputLineNumber,
                    trailingResultDifference: "",
                    resultLineNumber: resultLineNumber
                };
            else {
                let differenceIndex = (inputLine.length < resultLine.length) ? inputLine.length : resultLine.length;
                for (let i = 0; i < differenceIndex; i++) {
                    if (inputLine.sourceText.substr(i, 1) !== resultLine.sourceText.substr(i, 1)) {
                        differenceIndex = i;
                        break;
                    }
                }
                if (differenceIndex == 0)
                    this.$scope.comparison = {
                        leadingEqualText: "",
                        differenceIndex: differenceIndex,
                        areEqual: false,
                        trailingInputDifference: inputLine.escapedText,
                        inputLineNumber: inputLineNumber,
                        trailingResultDifference: resultLine.escapedText,
                        resultLineNumber: resultLineNumber
                    };
                else {
                    let leadingEqualText;
                    if (differenceIndex === inputLine.length)
                        leadingEqualText = inputLine.escapedText;
                    else if (differenceIndex == resultLine.length)
                        leadingEqualText = resultLine.escapedText;
                    else {
                        leadingEqualText = angular.toJson(inputLine.sourceText.substr(0, differenceIndex));
                        leadingEqualText = leadingEqualText.substr(1, differenceIndex - 2);
                    }
                    let trailingInputDifference;
                    if (differenceIndex < inputLine.length) {
                        trailingInputDifference = angular.toJson(inputLine.sourceText.substr(differenceIndex));
                        trailingInputDifference = trailingInputDifference.substr(1, trailingInputDifference.length - 2);
                    }
                    else
                        trailingInputDifference = "";
                    let trailingResultDifference;
                    if (differenceIndex < resultLine.length) {
                        trailingResultDifference = angular.toJson(resultLine.sourceText.substr(differenceIndex));
                        trailingResultDifference = trailingResultDifference.substr(1, trailingInputDifference.length - 2);
                    }
                    else
                        trailingResultDifference = "";
                    this.$scope.comparison = {
                        leadingEqualText: leadingEqualText,
                        differenceIndex: differenceIndex,
                        areEqual: false,
                        trailingInputDifference: trailingInputDifference,
                        inputLineNumber: inputLineNumber,
                        trailingResultDifference: trailingResultDifference,
                        resultLineNumber: resultLineNumber
                    };
                }
            }
        }
        editCurrent(event) {
            preventEventDefaultAndStopPropogation(event);
            if (typeof this._uriBuilder === "undefined" || this.$scope.isCurrent)
                return;
            this._uriBuilder.editInputItem(this.$scope.index);
            this._uriBuilder = undefined;
        }
        deleteCurrent(event) {
            preventEventDefaultAndStopPropogation(event);
            if (typeof this._uriBuilder === "undefined" || !this.$scope.canDeleteCurrent)
                return;
            this._uriBuilder.deleteInputItem(this.$scope.index);
            this._uriBuilder = undefined;
        }
        setReplaceMode(replace, event) {
            preventEventDefaultAndStopPropogation(event);
            if (typeof this._uriBuilder !== "undefined" && this.$scope.isReplaceMode !== (replace = replace === true))
                this.$scope.isReplaceMode = replace;
        }
        $doCheck() { }
        static createDirective() {
            return {
                controller: ["$scope", "$element", "$q", "$log", EvaluationItemController],
                controllerAs: "evaluationItem",
                scope: {
                    index: '=',
                    state: '=',
                    canDeleteCurrent: '=',
                    isCurrent: '=',
                    inputText: '=',
                    replacementText: '=',
                    isReplaceMode: '='
                },
                template: '<div ng-class="outerCssClass" ng-transclude></div>',
                transclude: true
            };
        }
    }
    app.appModule.directive("evaluationItem", EvaluationItemController.createDirective);
    const USER_STORAGE_KEY_PREFIX = "u_";
    const CURRENT_SESSION_STORAGE_KEY = "s";
    class localRegexStorageService {
        keys() {
            let result = [];
            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                if (key.startsWith(USER_STORAGE_KEY_PREFIX))
                    result.push(key.substr(USER_STORAGE_KEY_PREFIX.length));
            }
            return result;
        }
        length() { return localStorage.length; }
        loadLastSession(controller) { return this._load(CURRENT_SESSION_STORAGE_KEY, controller); }
        load(key, controller) { return this._load(USER_STORAGE_KEY_PREFIX + key, controller); }
        _load(key, controller) {
            try {
                let json = localStorage.getItem(key);
                if (!sys.isNilOrWhiteSpace(json)) {
                    let data = (JSON.parse(json));
                    if (data.isMultiLineInput) {
                        controller.mode = EditMode.multiLine;
                        controller.$scope.multiLinePattern = data.pattern;
                    }
                    else {
                        controller.mode = EditMode.singleLine;
                        controller.$scope.singleLinePattern = data.pattern;
                    }
                    controller.$scope.stripWhitespace = data.stripWhitespace;
                    controller.$scope.globalOption = data.isGlobal;
                    controller.$scope.ignoreCaseOption = data.ignoreCase;
                    controller.$scope.multiLineOption = data.multiline;
                    controller.$scope.unicodeOption = data.unicode;
                    controller.$scope.stickyOption = data.sticky;
                    let count = data.inputText.length;
                    while (controller.$scope.inputItems.length < count)
                        controller.addInputItem(undefined);
                    while (controller.$scope.inputItems.length > count)
                        controller.deleteInputItem(count);
                    for (let i = 0; i < count; i++) {
                        controller.$scope.inputItems[i].inputText = data.inputText[i].inputText;
                        controller.$scope.inputItems[i].isReplaceMode = data.inputText[i].isReplaceMode;
                        controller.$scope.inputItems[i].replacementText = data.inputText[i].replacementText;
                    }
                }
            }
            catch (_a) { }
            return false;
        }
        save(key, controller) { this._save(USER_STORAGE_KEY_PREFIX + key, controller); }
        saveCurrentSession(controller) { this._save(CURRENT_SESSION_STORAGE_KEY, controller); }
        _save(key, controller) {
            localStorage.setItem(key, JSON.stringify({
                pattern: (controller.isMultiLineInput) ? controller.$scope.multiLinePattern : controller.$scope.singleLinePattern,
                inputText: controller.$scope.inputItems.map((i) => ({ inputText: i.inputText, isReplaceMode: i.isReplaceMode, replacementText: i.replacementText })),
                isGlobal: controller.$scope.globalOption,
                ignoreCase: controller.$scope.ignoreCaseOption,
                multiline: controller.$scope.multiLineOption,
                unicode: controller.$scope.unicodeOption,
                sticky: controller.$scope.stickyOption,
                stripWhitespace: controller.$scope.stripWhitespace
            }));
        }
        _remove(key) { localStorage.removeItem(key); }
        remove(key) { this._remove(USER_STORAGE_KEY_PREFIX + key); }
        clear() {
            let json = localStorage.getItem(CURRENT_SESSION_STORAGE_KEY);
            localStorage.clear();
            if (!sys.isNilOrWhiteSpace(json))
                localStorage.setItem(CURRENT_SESSION_STORAGE_KEY, json);
        }
        resetAll() { localStorage.clear(); }
    }
    app.appModule.factory("localRegexStorage", localRegexStorageService);
    let EditMode;
    (function (EditMode) {
        EditMode[EditMode["singleLine"] = 0] = "singleLine";
        EditMode[EditMode["multiLine"] = 1] = "multiLine";
        EditMode[EditMode["item"] = 2] = "item";
    })(EditMode = regexTester.EditMode || (regexTester.EditMode = {}));
    class RegexTesterController {
        constructor($scope, $q, $log, localRegexStorage) {
            this.$scope = $scope;
            this.$q = $q;
            this.$log = $log;
            this.localRegexStorage = localRegexStorage;
            this._mode = EditMode.singleLine;
            $scope.regexTester = this;
            $scope.ignoreCaseOption = $scope.globalOption = $scope.multiLineOption = $scope.unicodeOption = $scope.stickyOption = $scope.stripWhitespace = $scope.hasParseError = $scope.hasParseErrorDetail =
                $scope.canRemovePatternEditLine = this._isMultiLineInput = false;
            $scope.canAddInputItem = $scope.canAddPatternEditLine = $scope.showInputItemHeading = true;
            $scope.patternLineCount = DEFAULT_TEXTAREA_LINES;
            $scope.singleLinePattern = $scope.multiLinePattern = $scope.parseErrorMessage = $scope.parseErrorDetail = $scope.flags = $scope.patternDisplayText = this._pattern = this._flags = "";
            localRegexStorage.loadLastSession(this);
            $scope.$watch("singleLinePattern", () => { $scope.regexTester.onSingleLinePatternChanged(); });
            $scope.$watch("multiLinePattern", () => { $scope.regexTester.onMultiLinePatternChanged(); });
            $scope.$watchGroup(["ignoreCaseOption", "globalOption", "multiLineOption", "unicodeOption", "stickyOption"], () => { $scope.regexTester.onFlagValuesChanged(); });
            $scope.$watch("stripWhitespace", () => { $scope.regexTester.onStripWhitespaceChanged(); });
            if (sys.isNil($scope.inputItems) || $scope.inputItems.length == 0) {
                this.addInputItem(undefined);
                this.mode = EditMode.singleLine;
            }
            else
                this.startParseRegex();
        }
        get expression() { return this._expression; }
        get pattern() { return this._pattern; }
        get flags() { return this._flags; }
        get parseError() { return this._parseError; }
        set parseError(value) {
            let message, details;
            if (sys.isNil(value)) {
                if (this.$scope.hasParseError !== false)
                    this.$scope.hasParseError = false;
                if (this.$scope.hasParseErrorDetail !== false)
                    this.$scope.hasParseErrorDetail = false;
                details = message = "";
            }
            else {
                if (typeof value === "string")
                    message = value;
                else {
                    let m = value.message;
                    let name = value.name;
                    if (typeof m === "string" && (m = m.trim()).length > 0) {
                        message = m;
                        details = value.data;
                        m = value.name;
                        if (typeof m === "string" && (m = m.trim()).length > 0)
                            name = m;
                    }
                    else if (typeof (m = value.name) === "string" && (m = m.trim()).length > 0)
                        name = m;
                    if (typeof message !== "string") {
                        if (typeof name === "string") {
                            details = value;
                            message = name;
                        }
                        else
                            message = angular.toJson(value);
                    }
                    else if (typeof name === "string")
                        message = name + ": " + name;
                }
                if (sys.isNil(details))
                    details = "";
                else if (typeof details !== "string")
                    details = angular.toJson(details);
                else
                    details = details.trim();
                if (sys.isNil(message) || (message = message.trim()).length == 0)
                    message = "An unspecified error has occurred.";
                if (details.length === 0) {
                    if (this.$scope.hasParseErrorDetail !== true)
                        this.$scope.hasParseErrorDetail = true;
                }
                else if (this.$scope.hasParseErrorDetail !== false)
                    this.$scope.hasParseErrorDetail = false;
                if (this.$scope.hasParseError !== true)
                    this.$scope.hasParseError = true;
            }
            if (this.$scope.parseErrorMessage !== message)
                this.$scope.parseErrorMessage = message;
            if (this.$scope.parseErrorDetail !== details)
                this.$scope.parseErrorDetail = details;
        }
        get mode() { return this._mode; }
        set mode(value) {
            if (value === this._mode)
                return;
            this._mode = value;
            switch (value) {
                case EditMode.singleLine:
                    this.isMultiLineInput = false;
                    this.$scope.showPatternEditControl = this.$scope.showSingleLineEditControl = true;
                    this.$scope.showMultiLineEditControl = false;
                    break;
                case EditMode.multiLine:
                    this.isMultiLineInput = true;
                    this.$scope.showPatternEditControl = this.$scope.showMultiLineEditControl = true;
                    this.$scope.showSingleLineEditControl = false;
                    break;
                default:
                    this.$scope.showPatternEditControl = this.$scope.showSingleLineEditControl = this.$scope.showMultiLineEditControl = false;
                    this.$scope.showInputItemHeading = this.$scope.inputItems.length > 1;
                    return;
            }
            this.$scope.showInputItemHeading = true;
            if (sys.notNil(sys.first(this.$scope.inputItems, (value) => value.isCurrent)))
                this.$scope.inputItems = this.$scope.inputItems.map((value) => { value.isCurrent = false; return value; });
        }
        get isMultiLineInput() { return this._isMultiLineInput; }
        set isMultiLineInput(value) {
            if ((value = value === true) === this._isMultiLineInput)
                return;
            this._isMultiLineInput = value;
            let pattern;
            if (value) {
                if (this._mode === EditMode.multiLine)
                    this.mode = EditMode.singleLine;
                if (this.$scope.multiLinePattern !== (pattern = this.$scope.singleLinePattern))
                    this.$scope.multiLinePattern = pattern;
            }
            else {
                if (this._mode === EditMode.singleLine)
                    this.mode = EditMode.multiLine;
                if (this.$scope.singleLinePattern !== (pattern = this.$scope.multiLinePattern.replace((this.$scope.stripWhitespace) ? NEWLINE_GLOBAL_REGEXP : WHITESPACE_GLOBAL_REGEXP, "")))
                    this.$scope.singleLinePattern = pattern;
            }
        }
        saveCurrentSession() { this.localRegexStorage.saveCurrentSession(this); }
        onSingleLinePatternChanged() {
            this.$log.debug("Watch raised for 'singleLinePattern'");
            if (this._isMultiLineInput)
                return;
            let pattern = (this.$scope.stripWhitespace) ? this.$scope.singleLinePattern.replace(WHITESPACE_GLOBAL_REGEXP, "") : this.$scope.singleLinePattern;
            if (pattern === this._pattern)
                return;
            this._pattern = pattern;
            this.saveCurrentSession();
            this.startParseRegex();
        }
        onMultiLinePatternChanged() {
            this.$log.debug("Watch raised for 'multiLinePattern'");
            if (!this._isMultiLineInput)
                return;
            let pattern = this.$scope.multiLinePattern.replace(WHITESPACE_GLOBAL_REGEXP, "");
            if (pattern === this._pattern)
                return;
            this._pattern = pattern;
            this.startParseRegex();
        }
        onFlagValuesChanged() {
            this.$log.debug("Watch raised for flag value");
            let flags = (this.$scope.ignoreCaseOption) ? "i" : "";
            if (this.$scope.globalOption)
                flags += "g";
            if (this.$scope.multiLineOption)
                flags += "m";
            if (this.$scope.unicodeOption)
                flags += "u";
            if (this.$scope.stickyOption)
                flags += "s";
            if (this._flags === flags)
                return;
            this._flags = this.$scope.flags = flags;
            this.startParseRegex();
        }
        onStripWhitespaceChanged() {
            this.$log.debug("Watch raised for 'stripWhitespace'");
            if (this.$scope.stripWhitespace === true)
                return;
            if (this._isMultiLineInput)
                this.isMultiLineInput = false;
            else {
                let singleLinePattern = this.$scope.singleLinePattern.replace(WHITESPACE_GLOBAL_REGEXP, "");
                if (this.$scope.singleLinePattern !== singleLinePattern)
                    this.$scope.singleLinePattern = singleLinePattern;
            }
        }
        startParseRegex() {
            let flags = this._flags;
            let pattern = this._pattern;
            let controller = this;
            this.$q((resolve, reject) => {
                if (flags !== controller._flags || pattern !== controller._pattern)
                    resolve(undefined);
                let re;
                try {
                    re = (flags.length == 0) ? new RegExp(pattern) : new RegExp(pattern, flags);
                }
                catch (reason) {
                    reject(reason);
                    return;
                }
                if (sys.isNil(re))
                    reject("Failed to parse expression.");
                resolve(re);
            }).then((re) => {
                if (typeof re === "undefined" || flags !== controller._flags || pattern !== controller._pattern)
                    return;
                try {
                    controller.parseError = undefined;
                }
                finally {
                    controller._expression = re;
                    controller.onExpressionChanged();
                }
            }, (reason) => {
                if (flags !== controller._flags || pattern !== controller._pattern)
                    return;
                try {
                    controller.parseError = (sys.isNil(reason)) ? "" : reason;
                }
                finally {
                    controller._expression = undefined;
                    controller.onExpressionChanged();
                }
            });
        }
        onExpressionChanged() {
            if (sys.isNil(this._expression)) {
                try {
                    let arr = this._pattern.split("\\\\").map((value) => value.split("\\/").map((value) => value.replace("/", "\\/")).join("\\/"));
                    let patternDisplayText = "/" + arr.join("\\\\") + ((arr[arr.length - 1].endsWith("\\")) ? "\\/" : "/") + this._flags;
                    if (this.$scope.patternDisplayText !== patternDisplayText)
                        this.$scope.patternDisplayText = patternDisplayText;
                }
                finally {
                    this.$scope.inputItems.forEach((value) => { value.state = EvaluationState.notEvaluated; });
                }
            }
            else
                try {
                    this.$scope.patternDisplayText = this._expression.toString();
                }
                finally {
                    this.$scope.inputItems.forEach((value) => { value.state = EvaluationState.pending; });
                }
        }
        addInputItem(event) {
            try {
                preventEventDefaultAndStopPropogation(event);
            }
            finally {
                let index = this.$scope.inputItems.length;
                if (index < MAX_INPUT_ITEMS) {
                    if (sys.isNil(this.$scope.inputItems) || this.$scope.inputItems.length == 0)
                        this.$scope.inputItems = [{ state: (typeof this._expression === "undefined") ? EvaluationState.notEvaluated : EvaluationState.pending, canDeleteCurrent: false, isCurrent: false, inputText: "", isReplaceMode: false, replacementText: "" }];
                    else {
                        this.$scope.inputItems = this.$scope.inputItems.concat([{ state: (typeof this._expression === "undefined") ? EvaluationState.notEvaluated : EvaluationState.pending, canDeleteCurrent: true, isCurrent: false, inputText: "", isReplaceMode: false, replacementText: "" }]);
                        if (this.$scope.inputItems.length == 2)
                            this.$scope.inputItems[0].canDeleteCurrent = true;
                        this.$scope.canAddInputItem = this.$scope.inputItems.length < MAX_INPUT_ITEMS;
                    }
                }
                this.editInputItem(index);
            }
        }
        editInputItem(index) {
            let item = this.$scope.inputItems[index];
            if (item.isCurrent)
                return;
            this.$scope.inputItems = this.$scope.inputItems.map((value, i) => {
                if (index == i) {
                    this.mode = EditMode.item;
                    value.isCurrent = true;
                }
                else
                    value.isCurrent = false;
                return value;
            });
        }
        deleteInputItem(index) {
            if (this.$scope.inputItems.length < 2)
                return;
            let oldItem = this.$scope.inputItems[index];
            this.$scope.inputItems = this.$scope.inputItems.filter((value, i) => i !== index);
            if (oldItem.isCurrent) {
                let items = this.$scope.inputItems.filter((value) => value.isCurrent);
                if (items.length == 0)
                    this.$scope.inputItems[(index < this.$scope.inputItems.length) ? index : this.$scope.inputItems.length - 1].isCurrent = true;
            }
            this.$scope.showInputItemHeading = this._mode !== EditMode.item || this.$scope.inputItems.length > 1;
        }
        setInputRowCount(isIncrement, event) {
            try {
                preventEventDefaultAndStopPropogation(event);
            }
            finally {
                if (isIncrement) {
                    if (this.$scope.patternLineCount < MAX_TEXTAREA_LINES)
                        this.$scope.patternLineCount++;
                }
                else if (this.$scope.patternLineCount > 1)
                    this.$scope.patternLineCount--;
            }
        }
        optionsModal(show, event) {
            try {
                preventEventDefaultAndStopPropogation(event);
            }
            finally {
                $("#optionsModal").modal({ show: show });
            }
        }
        $doCheck() { }
    }
    regexTester.RegexTesterController = RegexTesterController;
    app.appModule.controller("regexTester", ["$scope", "$q", "$log", "localRegexStorage", RegexTesterController]);
    // #endregion
})(regexTester || (regexTester = {}));
//# sourceMappingURL=regexTester.js.map