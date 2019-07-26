/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="sys.d.ts" />
declare namespace regexTester {
    interface IStoredInputItem {
        inputText: string;
        replacementText: string;
        isReplaceMode: boolean;
    }
    interface IStoredRegex {
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
}
