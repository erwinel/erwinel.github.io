/// <reference path="Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="sys.ts" />
var regexTester;
(function (regexTester_1) {
    // #region regexParsingService
    // #region regex patterns
    const RegexPatternParseRe = /([.^$|)])|(\[(\^)?)|(?:{(\d+)(,\d+)?}(\?)?)|([?*+]\??)|(\((?:\?(?:([:#=!])|(<([^[^$.|?*+()<>']+)>)|('([^[^$.|?*+()<>']+)')))?)|(?:\\(?:u([a-f\d]{4})|x([a-f\d]{2})|(0(?:(?:[123][0-7]?|[4-7])[0-7]?)?|[1-3](?:[0-7]{1,2}|[89])?|[4-9]\d?)|(.)))/i;
    let RegexPatternParseGroups;
    (function (RegexPatternParseGroups) {
        RegexPatternParseGroups[RegexPatternParseGroups["all"] = 0] = "all";
        RegexPatternParseGroups[RegexPatternParseGroups["special"] = 1] = "special";
        RegexPatternParseGroups[RegexPatternParseGroups["charClass"] = 2] = "charClass";
        RegexPatternParseGroups[RegexPatternParseGroups["negateCharClass"] = 3] = "negateCharClass";
        RegexPatternParseGroups[RegexPatternParseGroups["minRepeat"] = 4] = "minRepeat";
        RegexPatternParseGroups[RegexPatternParseGroups["maxRepeat"] = 5] = "maxRepeat";
        RegexPatternParseGroups[RegexPatternParseGroups["minMaxLazy"] = 6] = "minMaxLazy";
        RegexPatternParseGroups[RegexPatternParseGroups["quantifier"] = 7] = "quantifier";
        RegexPatternParseGroups[RegexPatternParseGroups["openGroup"] = 8] = "openGroup";
        RegexPatternParseGroups[RegexPatternParseGroups["groupType"] = 9] = "groupType";
        RegexPatternParseGroups[RegexPatternParseGroups["groupNameA"] = 10] = "groupNameA";
        RegexPatternParseGroups[RegexPatternParseGroups["groupNameS"] = 11] = "groupNameS";
        RegexPatternParseGroups[RegexPatternParseGroups["unicode"] = 12] = "unicode";
        RegexPatternParseGroups[RegexPatternParseGroups["hex"] = 13] = "hex";
        RegexPatternParseGroups[RegexPatternParseGroups["escNumber"] = 14] = "escNumber";
        RegexPatternParseGroups[RegexPatternParseGroups["escLiteral"] = 15] = "escLiteral";
    })(RegexPatternParseGroups || (RegexPatternParseGroups = {}));
    const regexCharsParseRe = /(\])|(-(?!]))|(?:\\(?:u([a-f\d]{4})|x([a-f\d]{2})|(0(?:(?:[123][0-7]?|[4-7])[0-7]?)?|[1-3](?:[0-7]{1,2}|[89])?|[4-9]\d?)|(.)))/i;
    let RegexCharsParseGroups;
    (function (RegexCharsParseGroups) {
        RegexCharsParseGroups[RegexCharsParseGroups["all"] = 0] = "all";
        RegexCharsParseGroups[RegexCharsParseGroups["end"] = 1] = "end";
        RegexCharsParseGroups[RegexCharsParseGroups["range"] = 2] = "range";
        RegexCharsParseGroups[RegexCharsParseGroups["unicode"] = 3] = "unicode";
        RegexCharsParseGroups[RegexCharsParseGroups["hex"] = 4] = "hex";
        RegexCharsParseGroups[RegexCharsParseGroups["escNumber"] = 5] = "escNumber";
        RegexCharsParseGroups[RegexCharsParseGroups["escLiteral"] = 6] = "escLiteral";
    })(RegexCharsParseGroups || (RegexCharsParseGroups = {}));
    const parseRegexCommentRe = /(\))|(?:\\(?:u([a-f\d]{4})|x([a-f\d]{2})|(0(?:(?:[123][0-7]?|[4-7])[0-7]?)?|[1-3](?:[0-7]{1,2}|[89])?|[4-9]\d?)|(.)))/;
    let RegexCommentParseGroups;
    (function (RegexCommentParseGroups) {
        RegexCommentParseGroups[RegexCommentParseGroups["all"] = 0] = "all";
        RegexCommentParseGroups[RegexCommentParseGroups["endGroup"] = 1] = "endGroup";
        RegexCommentParseGroups[RegexCommentParseGroups["unicode"] = 2] = "unicode";
        RegexCommentParseGroups[RegexCommentParseGroups["hex"] = 3] = "hex";
        RegexCommentParseGroups[RegexCommentParseGroups["escNumber"] = 4] = "escNumber";
        RegexCommentParseGroups[RegexCommentParseGroups["escLiteral"] = 5] = "escLiteral";
    })(RegexCommentParseGroups || (RegexCommentParseGroups = {}));
    // #endregion
    // #region RegexToken Classes
    let RegexTokenType;
    (function (RegexTokenType) {
        RegexTokenType[RegexTokenType["literal"] = 0] = "literal";
        RegexTokenType[RegexTokenType["group"] = 1] = "group";
        RegexTokenType[RegexTokenType["charClass"] = 2] = "charClass";
        RegexTokenType[RegexTokenType["anyChar"] = 3] = "anyChar";
        RegexTokenType[RegexTokenType["startAnchor"] = 4] = "startAnchor";
        RegexTokenType[RegexTokenType["endAnchor"] = 5] = "endAnchor";
        RegexTokenType[RegexTokenType["alternation"] = 6] = "alternation";
        RegexTokenType[RegexTokenType["range"] = 7] = "range";
        RegexTokenType[RegexTokenType["escape"] = 8] = "escape";
        RegexTokenType[RegexTokenType["quantifier"] = 9] = "quantifier";
        RegexTokenType[RegexTokenType["comment"] = 10] = "comment";
        RegexTokenType[RegexTokenType["error"] = 11] = "error";
    })(RegexTokenType || (RegexTokenType = {}));
    ;
    class RegexToken {
        constructor(_type) {
            this._type = _type;
        }
        get type() { return this._type; }
    }
    class ErrorRegexToken extends RegexToken {
        constructor(_text) {
            super(RegexTokenType.error);
            this._text = _text;
        }
        get text() { return this._text; }
    }
    class QuantifierRegexToken extends RegexToken {
        constructor(_isLazy) {
            super(RegexTokenType.quantifier);
            this._isLazy = _isLazy;
        }
        get isLazy() { return this._isLazy; }
    }
    class SimpleQuantifierRegexToken extends QuantifierRegexToken {
        constructor(_oneOrMore, isLazy) {
            super(isLazy);
            this._oneOrMore = _oneOrMore;
        }
        get oneOrMore() { return this._oneOrMore; }
    }
    class LimitedQuantifierRegexToken extends QuantifierRegexToken {
        constructor(isLazy, _min) {
            super(isLazy);
            this._min = _min;
        }
        get min() { return this._min; }
    }
    class FixedQuantifierRegexToken extends LimitedQuantifierRegexToken {
        constructor(isLazy, min) { super(isLazy, min); }
    }
    class BoundedQuantifierRegexToken extends LimitedQuantifierRegexToken {
        constructor(isLazy, min, _max) {
            super(isLazy, min);
            this._max = _max;
        }
        get max() { return this._max; }
    }
    class SpecialCharRegexToken extends RegexToken {
        constructor(type) { super(type); }
    }
    class GroupRegexToken extends RegexToken {
        constructor(_modifier) {
            super(RegexTokenType.group);
            this._modifier = _modifier;
            this._subExpressions = [];
        }
        get modifier() { return this._modifier; }
        get subExpressions() { return this._subExpressions; }
        static parse(pattern) {
            let root = new NormalGroupRegexToken();
            pattern = GroupRegexToken.parseSubExpressions(pattern, root);
            if (pattern.length > 0)
                root._subExpressions.push(new ErrorRegexToken(pattern));
            return root._subExpressions;
        }
        static parseSubExpressions(pattern, group) {
            if (sys.isNilOrEmpty(pattern))
                return pattern;
            let match = RegexPatternParseRe.exec(pattern);
            while (!sys.isNilOrEmpty(match)) {
                if (match.index > 0)
                    group._subExpressions.push(new LiteralCharactersRegexToken(pattern.substr(0, match.index)));
                pattern = pattern.substr(match.index + match[0].length);
                if (typeof match[RegexPatternParseGroups.special] === "string") {
                    if (match[RegexPatternParseGroups.special] === ")")
                        return pattern;
                    group._subExpressions.push(new SpecialCharRegexToken((match[RegexPatternParseGroups.special] === "^") ? RegexTokenType.startAnchor : ((match[RegexPatternParseGroups.special] === "$") ? RegexTokenType.endAnchor :
                        ((match[RegexPatternParseGroups.special] === "|") ? RegexTokenType.alternation : RegexTokenType.anyChar))));
                }
                else if (typeof match[RegexPatternParseGroups.charClass] === "string") {
                    let subExpressions = [];
                    pattern = GroupRegexToken.parseCharClass(pattern, subExpressions);
                    group._subExpressions.push(new CharacterClassRegexToken(typeof match[RegexPatternParseGroups.negateCharClass] === "string", subExpressions));
                }
                else if (typeof match[RegexPatternParseGroups.minRepeat] === "string") {
                    if (typeof match[RegexPatternParseGroups.maxRepeat] !== "string")
                        group._subExpressions.push(new FixedQuantifierRegexToken(typeof match[RegexPatternParseGroups.minMaxLazy] === "string", match[RegexPatternParseGroups.minRepeat]));
                    else if (match[RegexPatternParseGroups.maxRepeat].length == 1)
                        group._subExpressions.push(new BoundedQuantifierRegexToken(typeof match[RegexPatternParseGroups.minMaxLazy] === "string", match[RegexPatternParseGroups.minRepeat]));
                    else
                        group._subExpressions.push(new BoundedQuantifierRegexToken(typeof match[RegexPatternParseGroups.minMaxLazy] === "string", match[RegexPatternParseGroups.minRepeat], match[RegexPatternParseGroups.maxRepeat].substr(1)));
                }
                else if (typeof match[RegexPatternParseGroups.quantifier] === "string")
                    group._subExpressions.push(new SimpleQuantifierRegexToken(match[RegexPatternParseGroups.quantifier].startsWith("+"), match[RegexPatternParseGroups.quantifier].length > 1));
                else if (typeof match[RegexPatternParseGroups.openGroup] === "string") {
                    let groupType = match[RegexPatternParseGroups.groupType];
                    if (groupType === "#") {
                        let comment = new CommentGroupRegextToken();
                        group._subExpressions.push(comment);
                        pattern = GroupRegexToken.parseCommentGroup(pattern, comment);
                    }
                    else {
                        let subGroup;
                        if (typeof match[RegexPatternParseGroups.groupNameA] === "string")
                            subGroup = new NamedGroupRegexToken(match[RegexPatternParseGroups.groupNameA], "<");
                        else if (typeof match[RegexPatternParseGroups.groupNameS] === "string")
                            subGroup = new NamedGroupRegexToken(match[RegexPatternParseGroups.groupNameA], "'");
                        else if (typeof groupType === "string") {
                            if (groupType === "=" || groupType === "!")
                                subGroup = new LookAheadGroupRegexToken(groupType);
                            else
                                subGroup = new NonCapturingGroupRegexToken();
                        }
                        else
                            subGroup = new NormalGroupRegexToken();
                        group._subExpressions.push(subGroup);
                        pattern = GroupRegexToken.parseSubExpressions(pattern, subGroup);
                    }
                }
                else if (typeof match[RegexPatternParseGroups.unicode] === "string")
                    group._subExpressions.push(new EscapedValueRegexToken(match[RegexPatternParseGroups.unicode], "u"));
                else if (typeof match[RegexPatternParseGroups.hex] === "string")
                    group._subExpressions.push(new EscapedValueRegexToken(match[RegexPatternParseGroups.hex], "x"));
                else if (typeof match[RegexPatternParseGroups.escNumber] === "string")
                    group._subExpressions.push(new EscapedValueRegexToken(match[RegexPatternParseGroups.escNumber]));
                else if (typeof match[RegexPatternParseGroups.escLiteral] === "string")
                    group._subExpressions.push(new EscapedCharacterRegexToken(match[RegexPatternParseGroups.escLiteral]));
                if (pattern.length == 0)
                    return pattern;
                match = RegexPatternParseRe.exec(pattern);
            }
            group._subExpressions.push(new LiteralCharactersRegexToken(pattern));
            return "";
        }
        static parseCharClass(pattern, subExpressions) {
            if (sys.isNilOrEmpty(pattern))
                return pattern;
            let match = regexCharsParseRe.exec(pattern);
            while (!sys.isNilOrEmpty(match)) {
                if (match.index > 0)
                    subExpressions.push(new LiteralCharactersRegexToken(pattern.substr(0, match.index)));
                pattern = pattern.substr(match.index + match[0].length);
                if (typeof match[RegexCharsParseGroups.end] === "string")
                    break;
                if (typeof match[RegexCharsParseGroups.range] === "string")
                    subExpressions.push(new SpecialCharRegexToken(RegexTokenType.range));
                else if (typeof match[RegexCharsParseGroups.hex] === "string")
                    subExpressions.push(new EscapedValueRegexToken(match[RegexCharsParseGroups.hex], "x"));
                else if (typeof match[RegexCharsParseGroups.escNumber] === "string")
                    subExpressions.push(new EscapedValueRegexToken(match[RegexCharsParseGroups.escNumber]));
                else if (typeof match[RegexCharsParseGroups.escLiteral] === "string")
                    subExpressions.push(new EscapedCharacterRegexToken(match[RegexCharsParseGroups.escLiteral]));
                if (pattern.length == 0)
                    break;
                match = regexCharsParseRe.exec(pattern);
            }
            return pattern;
        }
        static parseCommentGroup(pattern, comment) {
            if (sys.isNilOrEmpty(pattern))
                return pattern;
            let match = parseRegexCommentRe.exec(pattern);
            while (!sys.isNilOrEmpty(match)) {
                if (match.index > 0)
                    comment._subExpressions.push(new LiteralCharactersRegexToken(pattern.substr(0, match.index)));
                pattern = pattern.substr(match.index + match[0].length);
                if (typeof match[RegexCommentParseGroups.endGroup] === "string")
                    break;
                if (typeof match[RegexCommentParseGroups.hex] === "string")
                    comment._subExpressions.push(new EscapedValueRegexToken(match[RegexCommentParseGroups.hex], "x"));
                else if (typeof match[RegexCommentParseGroups.escNumber] === "string")
                    comment._subExpressions.push(new EscapedValueRegexToken(match[RegexCommentParseGroups.escNumber]));
                else if (typeof match[RegexCommentParseGroups.escLiteral] === "string")
                    comment._subExpressions.push(new EscapedCharacterRegexToken(match[RegexCommentParseGroups.escLiteral]));
                if (pattern.length == 0)
                    break;
                match = parseRegexCommentRe.exec(pattern);
            }
            return pattern;
        }
    }
    class CommentGroupRegextToken extends GroupRegexToken {
        constructor() { super("#"); }
    }
    class NonCapturingGroupRegexToken extends GroupRegexToken {
        constructor() { super(":"); }
    }
    class LookAheadGroupRegexToken extends GroupRegexToken {
        constructor(modifier) { super(modifier); }
    }
    class CapturingGroupRegexToken extends GroupRegexToken {
        constructor(modifier) { super(modifier); }
    }
    class NormalGroupRegexToken extends CapturingGroupRegexToken {
        constructor() { super(); }
    }
    class NamedGroupRegexToken extends CapturingGroupRegexToken {
        constructor(_name, modifier) {
            super(modifier);
            this._name = _name;
        }
        get name() { return this._name; }
    }
    class EscapedRegexToken extends RegexToken {
        constructor(_text) {
            super(RegexTokenType.escape);
            this._text = _text;
        }
        get text() { return this._text; }
    }
    class EscapedCharacterRegexToken extends EscapedRegexToken {
        constructor(char) { super(char); }
    }
    class EscapedValueRegexToken extends EscapedRegexToken {
        constructor(text, _prefix) {
            super(text);
            this._prefix = _prefix;
        }
        get prefix() { return this._prefix; }
    }
    class LiteralCharactersRegexToken extends RegexToken {
        constructor(_text) {
            super(RegexTokenType.literal);
            this._text = _text;
        }
        get text() { return this._text; }
    }
    class CharacterClassRegexToken extends RegexToken {
        constructor(_isNegative, subExpressions) {
            super(RegexTokenType.literal);
            this._isNegative = _isNegative;
            this._subExpressions = [];
            this._subExpressions = (sys.isNil(subExpressions)) ? [] : subExpressions;
        }
        get subExpressions() { return this._subExpressions; }
        get isNegative() { return this._isNegative; }
    }
    // #endregion
    class RegexParsingService {
        getTokens(pattern) { return GroupRegexToken.parse(pattern); }
    }
    app.appModule.factory("regexParsingService", RegexParsingService);
    class localRegexStorageService {
        keys() {
            let result = [];
            for (let i = 0; i < localStorage.length; i++)
                result.push(localStorage.key(i));
            return result;
        }
        length() { return localStorage.length; }
        load(key, controller) {
            try {
                let json = localStorage.getItem(key);
                if (!sys.isNilOrWhiteSpace(json)) {
                    let data = (JSON.parse(json));
                    controller.inputPattern = data.pattern;
                    let i = data.inputText.length;
                    while (controller.inputItems.length < i)
                        controller.addInputItem();
                    i--;
                    while (controller.inputItems.length > i)
                        controller.inputItems[i].delete();
                    do {
                        controller.inputItems[i].inputText = data.inputText[i--];
                    } while (i > -1);
                    controller.inputItems.forEach((i) => i.setNotEvaluated());
                    controller.areEvaluationsVisible = false;
                }
            }
            catch (_a) { }
            return false;
        }
        save(key, controller) {
            localStorage.setItem(key, JSON.stringify({
                pattern: controller.inputPattern,
                inputText: controller.inputItems.map((i) => i.inputText),
                isGlobal: controller.isGlobal,
                ignoreCase: controller.ignoreCase,
                multiline: controller.multiline,
                unicode: controller.unicode,
                sticky: controller.sticky,
                dotAll: controller.dotAll,
                ignoreWhitespace: controller.ignoreWhitespace
            }));
        }
        remove(key) { localStorage.removeItem(key); }
        clear() { localStorage.clear(); }
    }
    app.appModule.factory("localRegexStorageService", localRegexStorageService);
    class RegexGroupContentController {
        constructor($scope) {
            this.$scope = $scope;
        }
        static createDirective() {
            return {
                controller: ["$scope", RegexGroupContentController],
                controllerAs: "regexGroupContent",
                require: "^^regexTesterController",
                restrict: "E",
                scope: { regexTokens: "=tokens" },
                templateUrl: "regexGroupContent.htm",
                transclude: true,
                link: (scope, element, attr, regexTester) => {
                    scope.regexTester = regexTester;
                    let regexGroups = scope.regexGroups;
                }
            };
        }
        $onInit() { }
    }
    app.appModule.directive("regexGroupContent", RegexGroupContentController.createDirective);
    ;
    class TestStringItem {
        constructor(_owner) {
            this._owner = _owner;
            this._success = false;
            this._statusMessage = "Not evaluated";
            this._cssClass = ['alert', 'alert-secondary'];
            this._evaluated = false;
            this._inputText = "";
            this._canDelete = false;
            this._isCurrent = false;
            this._matchIndex = -1;
            this._matchGroups = [];
            let n = _owner.inputItems.length;
            if (!sys.isNil(TestStringItem.find(n, _owner))) {
                for (n = 0; n < _owner.inputItems.length; n++) {
                    if (sys.isNil(TestStringItem.find(n, _owner)))
                        break;
                }
            }
            this._itemNumber = n;
        }
        get itemNumber() { return this._itemNumber; }
        get success() { return this._success; }
        get statusMessage() { return this._statusMessage; }
        get cssClass() { return this._cssClass; }
        get evaluated() { return this._evaluated; }
        get inputText() { return this._inputText; }
        set inputText(value) {
            if (this._inputText === (value = sys.asString(value)))
                return;
            this._inputText = value;
            this.setNotEvaluated();
            let regex = this._owner.regex;
            if (sys.isNil(regex))
                return;
            let item = this;
            this._owner.$q((resolve, reject) => {
                try {
                    resolve(item.evaluateRegex(regex, value));
                }
                catch (e) {
                    reject(e);
                }
            }).then((results) => {
                item.onEvaluated(value, regex, results);
                this._owner.hasEvaluations = true;
            }, (reason) => { item.onError(reason); });
        }
        get canDelete() { return this._canDelete; }
        get isCurrent() { return this._isCurrent; }
        get matchIndex() { return this._matchIndex; }
        get matchGroups() { return this._matchGroups; }
        edit() { this._owner.inputItems.forEach((value) => value._isCurrent = (value._itemNumber === this._itemNumber)); }
        delete() {
            if (this._owner.inputItems.length < 2)
                return false;
            for (let i = 0; i < this._owner.inputItems.length; i++) {
                if (this._owner.inputItems[i]._itemNumber === this._itemNumber) {
                    let removed;
                    if (i == 0)
                        removed = this._owner.inputItems.shift();
                    else if (i === this._owner.inputItems.length - 1)
                        removed = this._owner.inputItems.pop();
                    else
                        removed = this._owner.inputItems.splice(i, 1)[0];
                    if (this._owner.inputItems.length == 1) {
                        this._owner.inputItems[0]._canDelete = false;
                        this._owner.inputItems[0]._isCurrent = true;
                    }
                    else if (removed._isCurrent)
                        this._owner.inputItems[(i > 1) ? i - 1 : 0]._isCurrent = true;
                    return true;
                }
            }
            return false;
        }
        evaluateRegex(regex, source) {
            let match = regex.exec(source);
            if (sys.isNilOrEmpty(match))
                return { matchIndex: -1, groups: [] };
            let result = [];
            return {
                matchIndex: match.index,
                groups: match.map((value, index) => {
                    if (sys.isNil(value))
                        return { index: index, statusMessage: "No match", success: false, value: value, cssClass: ['alert', 'alert-warning'] };
                    return { index: index, statusMessage: "Matched " + value.length + " characters", success: true, value: value, cssClass: ['alert', 'alert-success'] };
                })
            };
        }
        onEvaluated(value, regex, results) {
            if (value !== this._inputText)
                return;
            let r = this._owner.regex;
            if (sys.isNil(r) || r.source !== regex.source || r.flags !== regex.flags)
                return;
            this._evaluated = true;
            if (sys.isNilOrEmpty(results.groups)) {
                this._matchGroups = [];
                this._cssClass = ["alert", "alert-danger"];
                this._statusMessage = "No match";
                this._matchIndex = -1;
            }
            else {
                this._matchGroups = results.groups;
                this._cssClass = ["alert", "alert-success"];
                this._statusMessage = results.groups.length + " matches starting at index " + results.matchIndex;
                this._matchIndex = results.matchIndex;
            }
        }
        onError(reason) {
            this._evaluated = true;
            this._matchGroups = [];
            this._cssClass = ["alert", "alert-danger"];
            if (sys.isNil(reason))
                this._statusMessage = "Match evaluation error";
            else
                this._statusMessage = "Match evaluation error: " + ((typeof reason === "string") ? reason : (((typeof reason === "object") ? ng.toJson(reason) : sys.asString(reason))));
            this._matchIndex = -1;
        }
        evaluate(regex) {
            let value = this._inputText;
            this.setNotEvaluated();
            let results;
            try {
                results = this.evaluateRegex(regex, value);
            }
            catch (e) {
                this.onError(e);
                return;
            }
            this.onEvaluated(value, regex, results);
        }
        setNotEvaluated() {
            this._evaluated = this._success = false;
            this._statusMessage = "Not evaluated";
            this._cssClass = ['alert', 'alert-secondary'];
            this._matchIndex = -1;
        }
        static add(owner) {
            owner.inputItems.forEach((value) => value._isCurrent = false);
            let result = new TestStringItem(owner);
            result._isCurrent = true;
            owner.inputItems.push(result);
            if (owner.inputItems.length < 2)
                return result;
            if (owner.inputItems.length == 2)
                owner.inputItems[0]._canDelete = true;
            result._canDelete = true;
            return result;
        }
        static find(itemNumber, owner) { return owner.inputItems.find((value) => value.itemNumber === itemNumber); }
    }
    const whitespacRe = /\s+/g;
    class regexTesterController {
        constructor($scope, $q, storageSvc) {
            this.$scope = $scope;
            this.$q = $q;
            this.storageSvc = storageSvc;
            this._inputItems = [];
            this._inputPattern = "";
            this._isGlobal = false;
            this._ignoreCase = false;
            this._multiline = false;
            this._unicode = false;
            this._sticky = false;
            this._dotAll = false;
            this._ignoreWhitespace = false;
            this._normalizedPattern = "";
            this._fullPattern = "";
            this._flags = "";
            this._areOptionsVisible = false;
            this._hasParseError = false;
            this._currentSavedName = "";
            this._savedNames = [];
            this._patternParseError = "";
            this._validationClass = [];
            this._areEvaluationsVisible = false;
            this._hasEvaluations = false;
            TestStringItem.add(this);
        }
        get regex() { return this._regex; }
        get inputPattern() { return this._inputPattern; }
        set inputPattern(value) {
            if (this._inputPattern === (value = sys.asString(value)))
                return;
            this._inputPattern = value;
            if (this._ignoreWhitespace)
                value = value.trim().replace(whitespacRe, "");
            if (this._normalizedPattern === value)
                return;
            this._normalizedPattern = value;
            this.updateFullPattern();
        }
        get hasEvaluations() { return this._hasEvaluations; }
        set hasEvaluations(value) {
            if (value === (value = sys.asBoolean(value)))
                return;
            this._hasEvaluations = value;
        }
        get inputRowCount() { return this._inputRowCount; }
        get canIncreaseInputRows() { return this._inputRowCount < 25 && !this._ignoreWhitespace; }
        get canDecreaseInputRows() { return this._inputRowCount > 3 && !this._ignoreWhitespace; }
        get inputItems() { return this._inputItems; }
        get fullPattern() { return this._fullPattern; }
        get flags() { return this._flags; }
        get isGlobal() { return this._isGlobal; }
        set isGlobal(value) {
            if (value === (value = sys.asBoolean(value)))
                return;
            this._isGlobal = value;
        }
        get ignoreCase() { return this._ignoreCase; }
        set ignoreCase(value) {
            if (value === (value = sys.asBoolean(value)))
                return;
            this._isGlobal = value;
        }
        get multiline() { return this._multiline; }
        set multiline(value) {
            if (value === (value = sys.asBoolean(value)))
                return;
            this._isGlobal = value;
        }
        get unicode() { return this._unicode; }
        set unicode(value) {
            if (value === (value = sys.asBoolean(value)))
                return;
            this._isGlobal = value;
        }
        get sticky() { return this._sticky; }
        set sticky(value) {
            if (value === (value = sys.asBoolean(value)))
                return;
            this._isGlobal = value;
        }
        get dotAll() { return this._dotAll; }
        set dotAll(value) {
            if (value === (value = sys.asBoolean(value)))
                return;
            this._isGlobal = value;
        }
        get ignoreWhitespace() { return this._ignoreWhitespace; }
        set ignoreWhitespace(value) {
            if (value === (value = sys.asBoolean(value)))
                return;
            this._isGlobal = value;
        }
        get areOptionsVisible() { return this._areOptionsVisible; }
        set areOptionsVisible(value) {
            if (value === (value = sys.asBoolean(value)))
                return;
            this._isGlobal = value;
        }
        get hasParseError() { return this._hasParseError; }
        get currentSavedName() { return this._currentSavedName; }
        get savedNames() { return this._savedNames; }
        get isSessionInfoVisible() { return this._areOptionsVisible && (this._savedNames.length > 0 || this._sessionLoadMessage.length > 0); }
        get isSessionNameHeadingVisible() { return this._sessionLoadMessage.length > 0 || (this._areOptionsVisible && this._savedNames.length > 0); }
        get sessionLoadMessage() { return this._sessionLoadMessage; }
        get hasSessionLoadMessage() { return this._sessionLoadMessage.length > 0; }
        get hasSavedSessionNames() { return this._areOptionsVisible && this._savedNames.length > 0; }
        get sessionSaveMessage() { return this._sessionSaveMessage; }
        get hasSaveSessionMessage() { return this._sessionSaveMessage.length > 0; }
        get patternParseError() { return this._patternParseError; }
        get validationClass() { return this._validationClass; }
        get areEvaluationsVisible() { return this._areEvaluationsVisible; }
        set areEvaluationsVisible(value) {
            if (value === (value = sys.asBoolean(value)))
                return;
            this._areEvaluationsVisible = value;
        }
        get displayInputTextBox() { return !this._areEvaluationsVisible; }
        set displayInputTextBox(value) {
            if (value !== (value = sys.asBoolean(value)))
                return;
            this._areEvaluationsVisible = !value;
        }
        setInputRowCount(inc) {
            if (inc) {
                if (this._inputRowCount < 25)
                    this._inputRowCount++;
            }
            else if (this._inputRowCount > 3)
                this._inputRowCount--;
        }
        loadSession(name) {
            this._sessionLoadMessage = this._sessionSaveMessage = '';
            this.storageSvc.load(name, this);
            this._currentSavedName = name;
            this._sessionLoadMessage = 'Session "' + name + '" loaded at ' + Date();
        }
        deleteSession(name) {
            this._sessionLoadMessage = this._sessionSaveMessage = '';
            this.storageSvc.remove(name);
            this._savedNames = this.storageSvc.keys();
            this._sessionLoadMessage = 'Session "' + name + '" deleted.';
        }
        saveSession() {
            this._sessionLoadMessage = this._sessionSaveMessage = '';
            if (sys.isNilOrWhiteSpace(this._currentSavedName))
                alert("Saved session must have a name.");
            else {
                this.storageSvc.save((this._currentSavedName = this._currentSavedName.trim()), this);
                this._sessionSaveMessage = 'Session "' + this._currentSavedName + '" saved at ' + Date();
            }
            this._savedNames = this.storageSvc.keys();
        }
        editOptions(value) {
            this._sessionLoadMessage = this._sessionSaveMessage = '';
            this._areOptionsVisible = value;
        }
        editInput() { this.displayInputTextBox = true; }
        showEvaluations() { this.areEvaluationsVisible = true; }
        addInputItem() { TestStringItem.add(this); }
        updateFlags() {
            let flags = (this._ignoreCase) ? "i" : "";
            if (this._isGlobal)
                flags += "g";
            if (this._multiline)
                flags += "m";
            if (this._unicode)
                flags += "u";
            if (this._sticky)
                flags += "y";
            if (this._dotAll)
                flags += "s";
            if (flags === this._flags)
                return;
            this._flags = flags;
            this.updateFullPattern();
        }
        updateFullPattern() {
            let fullPattern = "/" + this._normalizedPattern + "/" + this._flags;
            if (this._fullPattern === fullPattern)
                return;
            this._fullPattern = fullPattern;
            this._patternParseError = "";
            this._hasParseError = false;
            this._regex = undefined;
            this._inputItems.forEach((item) => item.setNotEvaluated());
            this._hasEvaluations = false;
            let controller = this;
            this.$q((resolve, reject) => {
                try {
                    let regex = (controller._flags.length == 0) ? new RegExp(controller._normalizedPattern) : new RegExp(controller._normalizedPattern, controller._flags);
                    if (sys.isNil(regex))
                        throw "Failed to create regular expression.";
                    resolve(regex);
                }
                catch (e) {
                    reject(e);
                    return;
                }
            }).then((regex) => {
                if (fullPattern !== controller._fullPattern || !sys.isNil(controller._regex))
                    return;
                controller._regex = regex;
                let failCount;
                failCount = controller.inputItems.filter((value) => {
                    value.evaluate(regex);
                    return !value.success;
                }).length;
                if (failCount > 0 && (controller.inputItems.length > 1 || controller.inputItems[0].inputText.length > 0)) {
                    controller._patternParseError = (failCount == 1) ? "1 string did not match" : failCount + " strings did not match";
                    controller._validationClass = ['alert', 'alert-warning'];
                }
                else if (controller._normalizedPattern.length == 0) {
                    controller._patternParseError = 'Pattern is empty.';
                    controller._validationClass = ['alert', 'alert-warning'];
                }
                else
                    controller._validationClass = [];
                this._hasEvaluations = true;
            }, (reason) => {
                controller._patternParseError = "Pattern parse error: " + ((typeof reason === "string") ? reason : (((typeof reason === "object") ? ng.toJson(reason) : sys.asString(reason))));
                controller._validationClass = ['alert', 'alert-danger'];
            });
        }
        $doCheck() { }
    }
    app.appModule.controller("regexTesterController", ["$scope", "$q", "localRegexStorageService", regexTesterController]);
    // #endregion
})(regexTester || (regexTester = {}));
