/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="sys.d.ts" />
declare namespace regexTester {
    interface IStoredRegex {
        pattern: string;
        inputText: string[];
        isGlobal: boolean;
        ignoreCase: boolean;
        multiline: boolean;
        unicode: boolean;
        sticky: boolean;
        dotAll: boolean;
        ignoreWhitespace: boolean;
    }
}
