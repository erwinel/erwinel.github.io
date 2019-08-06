/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="sys.d.ts" />
declare namespace regexTester {
    enum EvaluationState {
        /** Setting the state to this value causes evaluation to start. */
        pending = 0,
        /** Item not evaluated (usually due to expression error) */
        notEvaluated = 1,
        /** State gets set to this value when evaluation has started. */
        evaluating = 2,
        /** Evaluation succeeded */
        success = 3,
        /** Evaluation indicated no match */
        noMatch = 4,
        /** Exception occurred during evaluation */
        error = 5
    }
    export interface IStoredInputItem {
        inputText: string;
        replacementText: string;
        isReplaceMode: boolean;
    }
    export interface IStoredRegex {
        pattern: string;
        inputText: IStoredInputItem[];
        isGlobal: boolean;
        ignoreCase: boolean;
        multiline: boolean;
        unicode: boolean;
        sticky: boolean;
        stripWhitespace: boolean;
        isMultiLineInput: boolean;
    }
    class localRegexStorageService {
        keys(): string[];
        length(): number;
        loadLastSession(controller: RegexTesterController): boolean;
        load(key: string, controller: RegexTesterController): boolean;
        private _load;
        save(key: string, controller: RegexTesterController): void;
        saveCurrentSession(controller: RegexTesterController): void;
        private _save;
        private _remove;
        remove(key: string): void;
        clear(): void;
        resetAll(): void;
    }
    export interface IEvaluationItem {
        state: EvaluationState;
        canDeleteCurrent: boolean;
        isCurrent: boolean;
        inputText: string;
        replacementText: string;
        isReplaceMode: boolean;
    }
    export enum EditMode {
        singleLine = 0,
        multiLine = 1,
        item = 2
    }
    export interface IRegexTesterScope extends ng.IScope {
        regexTester: RegexTesterController;
        inputItems: IEvaluationItem[];
        singleLinePattern: string;
        multiLinePattern: string;
        flags: string;
        ignoreCaseOption: boolean;
        globalOption: boolean;
        multiLineOption: boolean;
        unicodeOption: boolean;
        stickyOption: boolean;
        stripWhitespace: boolean;
        hasParseError: boolean;
        parseErrorMessage: string;
        hasParseErrorDetail: boolean;
        parseErrorDetail: string;
        patternDisplayText: string;
        canAddInputItem: boolean;
        patternLineCount: number;
        showPatternEditControl: boolean;
        showSingleLineEditControl: boolean;
        showMultiLineEditControl: boolean;
        canAddPatternEditLine: boolean;
        canRemovePatternEditLine: boolean;
        showInputItemHeading: boolean;
    }
    export class RegexTesterController implements ng.IController {
        $scope: IRegexTesterScope;
        private $q;
        private $log;
        private localRegexStorage;
        private _expression;
        private _pattern;
        private _flags;
        private _isMultiLineInput;
        private _mode;
        private _parseError;
        readonly expression: RegExp | undefined;
        readonly pattern: string;
        readonly flags: string;
        parseError: any | undefined;
        mode: EditMode;
        isMultiLineInput: boolean;
        constructor($scope: IRegexTesterScope, $q: ng.IQService, $log: ng.ILogService, localRegexStorage: localRegexStorageService);
        saveCurrentSession(): void;
        private onSingleLinePatternChanged;
        private onMultiLinePatternChanged;
        private onFlagValuesChanged;
        private onStripWhitespaceChanged;
        private startParseRegex;
        private onExpressionChanged;
        addInputItem(event: BaseJQueryEventObject): void;
        editInputItem(index: number): void;
        deleteInputItem(index: number): void;
        setInputRowCount(isIncrement: boolean, event: BaseJQueryEventObject): void;
        optionsModal(show: boolean, event: BaseJQueryEventObject): void;
        $doCheck(): void;
    }
    export {};
}
