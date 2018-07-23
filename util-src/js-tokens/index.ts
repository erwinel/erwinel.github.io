import * as util from 'util';

const separatorRe: RegExp = /^(?:(;)|(\.))/;
const numberRe: RegExp = /^((-?\d+(\.\d+)?(e\d+)?)|(0x[a-fA-F\d]+))/;
const operatorRe: RegExp = /^(?:(?:[=!]=?|[+\-*/%<>])=?|\+\+|--|\?|,|&&?|\|\|?|~|\^|<<|>>>?|=>)/;
const stringRe: RegExp = /^('([^'\r\n\\]*(?:\\(?:[^\r\n]|\r\n?|\n)[^'\r\n\\]*)*)(')?|^"([^"\r\n\\]*(?:\\(?:[^\r\n]|\r\n?|\n)[^"\r\n\\]*)*)(")?)/;
const groupingRe: RegExp = /^(?:([\[({])|(?:[\])}]))/;
const wsOrCommentRe: RegExp = /^(?:([^\r\n\S]+)|([\r\n]+)|\/\/([^\r\n]*)|\/\*([^*]*(?:\*[^\/][^*]*)*)\*\/)/;
const nameRe: RegExp = /^[$_a-zA-Z][$_a-zA-Z\d]+/;
const whitespaceRe: RegExp = /^[^\r\n\S]+/;
const regexRe: RegExp = /^\/[^\\\/]+(\\.[^\\\/]+)*(\\.)*\/[^\s\r\n;\/]+/;
const jsKeywords: string[] = ["abstract", "arguments", "await", "boolean", "break", "byte", "case", "catch", "char", "class", "const", "continue", "debugger", "default",
    "delete", "do", "double", "else", "enum", "eval", "export", "extends", "false", "final", "finally", "float", "for", "function", "goto", "if", "implements", "import",
    "in", "instanceof", "int", "interface", "let", "long", "native", "new", "null", "package", "private", "protected", "public", "return", "short", "static", "super",
    "switch", "synchronized", "this", "throw", "throws", "transient", "true", "try", "typeof", "var", "void", "volatile", "while", "with", "yield"];
const syntaxErrorMessage: string = "Syntax error";

enum JsTokenType {
    Whitespace,
    NewLines,
    LineComment,
    BlockComment,
    Terminator,
    Operator,
    WholeNumber,
    DecimalNumber,
    ScientificNotation,
    HexNumber,
    SingleQuoteString,
    DoubleQuoteString,
    RegExp,
    GroupStart,
    GroupEnd,
    Keyword,
    Variable,
    Property,
    Function,
    Method,
    Error
}
interface ITokenColor { type: JsTokenType[], color: string }
interface ITokenColors {
    foreground: string,
    background: string,
    colors: ITokenColor[]
}
let scriptPaneTokenColors: ITokenColors = {
    foreground: "000000",
    background: "ffffff",
    colors: [
        { type: [JsTokenType.DecimalNumber, JsTokenType.HexNumber, JsTokenType.WholeNumber, JsTokenType.ScientificNotation], color: "800080" },
        { type: [JsTokenType.Operator], color: "a9a9a9" },
        //{ type: JsTokenType.Attribute, color: "00bfff" },
        //{ type: JsTokenType.LoopLabel, color: "00008b" },
        { type: [JsTokenType.Keyword], color: "00008b" },
        { type: [JsTokenType.Method, JsTokenType.Function], color: "0000ff" },
        //{ type: JsTokenType.CommandParameter, color: "000080" },
        { type: [JsTokenType.BlockComment, JsTokenType.LineComment], color: "006400" },
        { type: [JsTokenType.Variable, JsTokenType.Property], color: "ff4500" },
        //{ type: JsTokenType.Type, color: "008080" },
        { type: [JsTokenType.SingleQuoteString, JsTokenType.DoubleQuoteString, JsTokenType.RegExp], color: "8b0000" },
        //{ type: JsTokenType.CommandArgument, color: "8a2be2" }
    ]
}
let consolePaneTokenColors: ITokenColors = {
    foreground: "f5f5f5",
    background: "012456",
    colors: [
        { type: [JsTokenType.DecimalNumber, JsTokenType.HexNumber, JsTokenType.WholeNumber, JsTokenType.ScientificNotation], color: "ffe4c4" },
        { type: [JsTokenType.Operator], color: "d3d3d3" },
        //{ type: JsTokenType.Attribute, color: "b0c4de" },
        //{ type: JsTokenType.LoopLabel, color: "e0ffff" },
        { type: [JsTokenType.Keyword], color: "e0ffff" },
        { type: [JsTokenType.Method, JsTokenType.Function], color: "e0ffff" },
        //{ type: JsTokenType.CommandParameter, color: "ffe4b5" },
        { type: [JsTokenType.BlockComment, JsTokenType.LineComment], color: "98fb98" },
        { type: [JsTokenType.Variable], color: "ff4500" },
        { type: [JsTokenType.Variable, JsTokenType.Property], color: "8fbc8f" },
        { type: [JsTokenType.SingleQuoteString, JsTokenType.DoubleQuoteString, JsTokenType.RegExp], color: "db7093" },
        //{ type: JsTokenType.CommandArgument, color: "ee82ee" }
    ]
}
interface IBaseJsTokenInfo {
    type: JsTokenType;
    value: string;
    position: number;
    length: number;
    previous?: JSTokenInfo;
    next?: JSTokenInfo
}
interface IJsTokenInfo extends IBaseJsTokenInfo {
    type: (JsTokenType.Whitespace|JsTokenType.NewLines|JsTokenType.LineComment|JsTokenType.BlockComment|JsTokenType.Terminator|JsTokenType.Operator|JsTokenType.WholeNumber|JsTokenType.DecimalNumber|JsTokenType.ScientificNotation|JsTokenType.HexNumber|JsTokenType.SingleQuoteString|JsTokenType.DoubleQuoteString|JsTokenType.RegExp|JsTokenType.GroupStart|JsTokenType.GroupEnd|JsTokenType.Keyword|JsTokenType.Variable|JsTokenType.Property|JsTokenType.Method|JsTokenType.Function|JsTokenType.Error);
}
interface IJSTokenError extends IBaseJsTokenInfo {
    type: JsTokenType.Error;
    message: string;
}
type JSTokenInfo = IJSTokenError|IJsTokenInfo;
function isJSTokenError(value: JSTokenInfo): value is IJSTokenError { return value.type == JsTokenType.Error; }

/**
 * Returns next sibling token within its parent grouping.
 * @param token Reference JS token.
 * @description If the current token is the start of a grouping, then the next token after the matching group end token is returned.
 * If the next token is the a group end token, then undefined is returned.
 */
function getNextSiblingToken(token: JSTokenInfo): JSTokenInfo|undefined {
    let next: JSTokenInfo|undefined = token.next;
    if (typeof(next) != "undefined" && next.type != JsTokenType.GroupEnd) {
        if (token.type != JsTokenType.GroupStart)
            return next;
        while (typeof(next) != "undefined") {
            token = next;
            next = getNextSiblingToken(next);
        }
        next = token.next;
        if (typeof(next) != "undefined") {
            next = next.next;
            if (typeof(next) != "undefined" && next.type != JsTokenType.GroupEnd)
                return next;
        }
    }
}

/**
 * Returns the previous sibling token within its parent grouping.
 * @param token Referene JS token.
 * @description If the preceding token is is the end of a grouping, then the matching group start token is returned.
 * If the current token is the end of a grouping, then the preceding node will be the previous sibling of the matching group start token.
 */
function getPreviousSiblingToken(token: JSTokenInfo): JSTokenInfo|undefined {
    let previous: JSTokenInfo|undefined = token.previous;
    if (typeof(previous) != "undefined") {
        if (token.type == JsTokenType.GroupEnd) {
            previous = getContainingGroupToken(previous);
            if (typeof(previous) != "undefined")
                return getPreviousSiblingToken(previous);
        } else if (previous.type != JsTokenType.GroupStart) {
            if (previous.type != JsTokenType.GroupEnd)
                return previous;
            previous = previous.previous;
            if (typeof(previous) != "undefined")
                return getContainingGroupToken(previous);
        }
    }
}

/**
 * Returns the JS grouping start token that contains the referenced JS token.
 * @param token Reference JS token.
 * @description If the referenced JS token is for the start or end of a grouping, then the JS token which contains that grouping is returned.
 */
function getContainingGroupToken(token: JSTokenInfo): JSTokenInfo|undefined {
    let previous: JSTokenInfo|undefined = token.previous;
    if (typeof(previous) != "undefined") {
        if (previous.type == JsTokenType.GroupStart)
            return previous;
        if (token.type == JsTokenType.GroupEnd) {
            previous = getContainingGroupToken(previous);
            return (typeof(previous) == "undefined") ? previous : getContainingGroupToken(previous);
        }
        do {
            token = previous;
            previous = getPreviousSiblingToken(previous);
        } while (typeof(previous) != "undefined");
        return token.previous;
    }
    return previous;
}

/**
 * Returns the current grouping start token for the referenced JS token.
 * @param token Reference JS token.
 * @description If the referenced token is for the start of a grouping, then that same token is returned.
 * If the referenced token is for the end of a grouping, then the matching grouping start token is returned.
 */
function getCurrentGroupToken(token: JSTokenInfo): JSTokenInfo|undefined {
    if (token.type == JsTokenType.GroupStart)
        return token;
    let previous: JSTokenInfo|undefined = token.previous;
    if (typeof(previous) != "undefined")
        return (previous.type == JsTokenType.GroupStart) ? previous : getContainingGroupToken(previous);
}

function getPrecedingNonWsSiblingToken(token: JSTokenInfo, newLinesAsWs?: boolean): JSTokenInfo|undefined {
    let previous: JSTokenInfo|undefined = getPreviousSiblingToken(token);
    if (newLinesAsWs) {
        while (typeof(previous) != "undefined") {
            if (previous.type != JsTokenType.Whitespace && previous.type != JsTokenType.NewLines)
                return previous;
            previous = getPreviousSiblingToken(token);
        }
    } else {
        while (typeof(previous) != "undefined") {
            if (previous.type != JsTokenType.Whitespace)
                return previous;
            previous = getPreviousSiblingToken(token);
        }
    }
}

function parseJsTokens(sourceText: string): JSTokenInfo {
    if (sourceText.length == 0)
        return {
            type: JsTokenType.Whitespace,
            value: "",
            position: 0,
            length: 0
        };
    let previous: JSTokenInfo|undefined;
    let current: JSTokenInfo;
    let position: number = 0;
    do {
        let matches: RegExpMatchArray|null = sourceText.match(wsOrCommentRe);
        if (matches !== null) {
            if (matches[1] !== null)
                current = {
                    type: JsTokenType.Whitespace,
                    value: matches[0],
                    position: position,
                    length: matches[0].length
                };
            else if (matches[2] !== null)
                current = {
                    type: JsTokenType.NewLines,
                    value: matches[0],
                    position: position,
                    length: matches[0].length
                };
            else if (matches[3] !== null)
                current = {
                    type: JsTokenType.LineComment,
                    value: matches[3],
                    position: position,
                    length: matches[0].length
                };
            else
                current = {
                    type: JsTokenType.BlockComment,
                    value: matches[4],
                    position: position,
                    length: matches[0].length
                };
        } else if ((matches = sourceText.match(separatorRe)) !== null) {
            if (matches[1] !== null)
                current = {
                    type: JsTokenType.Terminator,
                    value: matches[0],
                    position: position,
                    length: matches[0].length
                };
            else
                current = {
                    type: JsTokenType.Operator,
                    value: matches[0],
                    position: position,
                    length: matches[0].length
                };
        } else if ((matches = sourceText.match(numberRe)) !== null)
            current = {
                type: (matches[3] !== null) ? JsTokenType.ScientificNotation : ((matches[2] !== null) ? JsTokenType.DecimalNumber : ((matches[1] !== null) ? JsTokenType.WholeNumber : JsTokenType.HexNumber)),
                value: matches[0],
                position: position,
                length: matches[0].length
            };
        else if ((matches = sourceText.match(operatorRe)) !== null)
            current = {
                type: JsTokenType.Operator,
                value: matches[0],
                position: position,
                length: matches[0].length
            };
        else if ((matches = sourceText.match(stringRe)) !== null) {
            if (matches[1] !== null) {
                try {
                    current = {
                        type: JsTokenType.SingleQuoteString,
                        value: matches[1],
                        position: position,
                        length: matches[0].length
                    };
                } catch (err) {
                    current = {
                        type: JsTokenType.Error,
                        value: matches[0],
                        position: position,
                        length: matches[0].length,
                        message: "Invalid string: " + err
                    };
                }
            } else {
                try {
                    current = {
                        type: JsTokenType.DoubleQuoteString,
                        value: matches[2],
                        position: position,
                        length: matches[0].length
                    };
                } catch (err) {
                    current = {
                        type: JsTokenType.Error,
                        value: matches[0],
                        position: position,
                        length: matches[0].length,
                        message: "Invalid string: " + err
                    };
                }
            }
        } else if ((matches = sourceText.match(regexRe)) !== null) {
            current = {
                type: JsTokenType.RegExp,
                value: matches[0],
                position: position,
                length: matches[0].length
            };
        } else if ((matches = sourceText.match(groupingRe)) !== null) {
            if (matches[1] !== null)
                current = {
                    type: JsTokenType.GroupStart,
                    value: matches[0],
                    position: position,
                    length: matches[0].length
                };
            else
                current = {
                    type: JsTokenType.GroupEnd,
                    value: matches[0],
                    position: position,
                    length: matches[0].length
                };
        } else if ((matches = sourceText.match(nameRe)) !== null)
            current = {
                type: (jsKeywords.filter(function(n: string) { return n == (<string[]>matches)[0]; }).length == 0) ? JsTokenType.Variable : JsTokenType.Keyword,
                value: matches[0],
                position: position,
                length: matches[0].length
            };
        else {
            if (typeof(previous) != "undefined" && isJSTokenError(previous) && previous.message.startsWith(syntaxErrorMessage)) {
                previous.value = previous.value + sourceText.substr(0, 1)
                previous.length = previous.length + 1;
                if ((sourceText = sourceText.substr(1)).length == 0)
                    break;
                continue;
            }
            current = {
                type: JsTokenType.Error,
                message: util.format("%s (%s)", syntaxErrorMessage, (new Date()).toDateString()),
                value: sourceText.substr(0, 1),
                position: position,
                length: 1
            };
        }
        current.previous = previous;
        if (typeof(previous) != "undefined") {
            let previousOp: JSTokenInfo|undefined;
            previous.next = current;
            switch (current.type) {
                case JsTokenType.Variable:
                case JsTokenType.Keyword:
                    previousOp = getPrecedingNonWsSiblingToken(current);
                    if (typeof(previousOp) != "undefined" && previousOp.type == JsTokenType.Operator && previousOp.value == ".")
                        current.type = JsTokenType.Property;
                    break;
                case JsTokenType.GroupStart:
                    previousOp = getPrecedingNonWsSiblingToken(current);
                    if (typeof(previousOp) != "undefined") {
                        if (previousOp.type == JsTokenType.Property)
                            previousOp.type = JsTokenType.Method;
                        else if (previousOp.type == JsTokenType.Variable)
                            previousOp.type = JsTokenType.Function;
                    }
                    break;
            }
        }
        previous = current;
        position += current.length;
        sourceText = sourceText.substr(current.length);
    } while (sourceText.length > 0);

    do {
        current = previous;
        previous = previous.previous;
    } while (typeof(previous) != "undefined");

    return current;
}

function encodeHtml(str: string) {
    if (str.length == 0)
        return str;
    return str.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace("\"", "&quot;")
}

function jsTokensToHtml(token?: JSTokenInfo): string {
    let htmlText: string = "";
    while (typeof(token) != "undefined") {
        switch (token.type) {
            case JsTokenType.BlockComment:
            case JsTokenType.LineComment:
            case JsTokenType.DecimalNumber:
            case JsTokenType.WholeNumber:
            case JsTokenType.ScientificNotation:
            case JsTokenType.HexNumber:
            case JsTokenType.DoubleQuoteString:
            case JsTokenType.SingleQuoteString:
            case JsTokenType.Function:
            case JsTokenType.Keyword:
            case JsTokenType.Method:
            case JsTokenType.Property:
            case JsTokenType.RegExp:
            case JsTokenType.Variable:
            case JsTokenType.GroupEnd:
            case JsTokenType.GroupStart:
            case JsTokenType.Operator:
            case JsTokenType.Terminator:
            case JsTokenType.Error:
            default:
                htmlText += encodeHtml(token.value);
                break;
        }
    }

    return htmlText;
}

