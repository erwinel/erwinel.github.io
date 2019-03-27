/**
 * Utility methods and properties
 * @namespace
*/
var Utility = (function() {
    var urlParseRe = /^(([^@:/?#]*):(?:\/\/((?:([^@:/?#]*)(?::([^@:/?#]*))?@)?([^:/?#]*)(?::(\d+(?=[:/?#]|$)))?))?)?(([:/]+(?=(?:[^?#:/]+[:/]*)?(?:\?|\#|$))|[:/]*[^:/?#]+(?=[:/]+[^?#])(?:[:/]+[^:/?#]+(?=[:/]+[^?#]))*)?[:/]*((\.*(?:\.[^.:/?#]*(?=\.)|[^.:/?#]+)*)(?:\.([^.:/?#]*))?)[:/]*)(?:\?([^#]*))?(?:\#(.*))?$/;
    var trimRightRe = /^((\s*\S+)(\s+\S+)*)\s*$/;
    var trimLeftRe = /^\s*(\S.*)$/;
    var identifierRe = /^[a-z_][a-z\d]*$/i;
    var falseStringRe = /^(f(alse)?|no?|0+(\.0+)?)([^\w-]|$)/i;

    return {
        DialogCloseAction: {
            primary: 0,
            secondary: 1,
            tertiary: 2,
            close: -1
        },

        /**
         * Determines if a value is null or undefined.
         * @param {*} value Value to test.
         * @returns {boolean} true if value was null or undefined; otherwise, false.
         */
        isNil: function(value) { return typeof(value) == "undefined" || value === null; },

        /**
         * Determines if value's type is an object.
         * @param {*} value Value to test.
         * @param {boolean} [noArray=false] If value is an array, return false.
         * @returns {boolean} true if value was null or undefined; otherwise, false.
         */
        isObject: function(value, noArray) {
            return (typeof(value) == "object" && value !== null && !(noArray && Array.isArray(value)));
        },

        /**
         * Determines if a String represents a valid identifier name.
         * @param {string} text String to test.
         * @returns {boolean} true if value was a valid identifier name; otherwise, false.
         */
        isValidIdentifierName: function(text) {
            return typeof(text) == "string" && identifierRe.test(text);
        },

        /**
         * Trims trailing whitespace from text.
         * @param {string} text Text to trim.
         * @returns {string} Text with trailing whitespace removed.
         */
        trimRight: function(text) {
            var m = trimRightRe.exec(Utility.asString(text));
            return (Utility.isNil(m)) ? "" : m[1];
        },

        /**
         * Trims leading whitespace from text.
         * @param {string} text Text to trim.
         * @returns {string} Text with leading whitespace removed.
         */
        trimLeft: function(text) {
            var m = trimLeftRe.exec(Utility.asString(text));
            return (Utility.isNil(m)) ? "" : m[1];
        },

        /**
         * Ensures a value is a string.
         * @param {*} value Value to test.
         * @param {boolean} [trim=false] If true, then the resulting string will be trimmed.
         * @param {allowNil} [trim=false] If true, and the input value is null or undefined, then the input value will be returned; otherwise, a null or undefined input value will cause an empty string to be returned.
         * @returns {string} Input value converted to a string.
         */
        asString: function(value, trim, allowNil) {
            if (Utility.isNil(value)) {
                if (allowNil)
                    return value;
                return "";
            }
            if (typeof(value) != "string") {
                if (Array.isArray(v))
                    value = value.join("\n");
                else {
                    try { value = value.toString(); } catch (err) { /* okay to ignnore */ }
                    if (Utility.isNil(value)) {
                        if (allowNil)
                            return value;
                        return "";
                    }
                    if (typeof(value) != "string") {
                        try {
                            value = Object.prototype.toString.call(value);
                            if (Utility.isNil(value)) {
                                if (allowNil)
                                    return value;
                                return "";
                            }
                        }
                        catch (err) {
                            try { value = value + ""; }
                            catch (err) {
                                if (allowNil)
                                    return;
                                return "";
                            }
                        }
                    }
                }
            }

            if (trim)
                return value.trim();
            
            return value;
        },

        parseUrl: function(urlString) {
            urlString = Utility.asString(urlString, true);
            var result = { originalString: Utility.asString(urlString), baseUrl: null, scheme: null, authority: null, userName: null, pw: null, host: null, port: null,
                path: null, dir: null, leaf: null, baseName: null, ext: null, query: null, fragment: null, pathAndQuery: null };
            var m = urlParseRe.exec(result.originalString.trim());
            if (Utility.isNil(m))
                return result;
            if (!Utility.isNil(m[1]))
                result.baseUrl = m[1];
            if (!Utility.isNil(m[2]))
                result.scheme = m[2];
            if (!Utility.isNil(m[3]))
                result.authority = m[3];
            if (!Utility.isNil(m[4]))
                result.userName = m[4];
            if (!Utility.isNil(m[5]))
                result.pw = m[5];
            if (!Utility.isNil(m[6]))
                result.host = m[6];
            if (!Utility.isNil(m[7]))
                result.port = m[7];
            if (!Utility.isNil(m[8]))
                result.path = m[8];
            if (!Utility.isNil(m[9]))
                result.dir = m[9];
            if (!Utility.isNil(m[10]))
                result.leaf = m[10];
            if (!Utility.isNil(m[11]))
                result.baseName = m[11];
            if (!Utility.isNil(m[12]))
                result.ext = m[12];
            if (!Utility.isNil(m[13]))
                result.query = m[13];
            if (!Utility.isNil(m[14]))
                result.fragment = m[14];
            if (Utility.isNil(result.path)) {
                if (Utility.isNil(result.query)) {
                    if (!Utility.isNil(result.fragment))
                        result.pathAndQuery = "#" + result.fragment;
                } else
                    result.pathAndQuery = "?" + ((Utility.isNil(result.fragment)) ? result.query : result.query + "#" + result.fragment);
            } else {
                urlString = result.path;
                if (Utility.isNil(result.query))
                    result.pathAndQuery = (Utility.isNil(result.fragment)) ? result.path : result.path + "#" + result.fragment;
                else
                    result.pathAndQuery = result.path + "?" + ((Utility.isNil(result.fragment)) ? result.query : result.query + "#" + result.fragment);
            }
            return result;
        },
        
        asBoolean: function(value, nilIsTrue) {
            if (Utility.isNil(value))
                return (nilIsTrue == true);
            if (typeof(value) == "boolean")
                return value;
            if (typeof(value) == "object") {
                if (!Array.isArray(value)) {
                    if (typeof(value.valueOf) == "function") {
                        try { value = value.valueOf(); } catch (e) { }
                        if (Utility.isNil(value))
                            return (nilIsTrue == true);
                    }
                    if (typeof(value) != "object" || !Array.isArray(value))
                        value = [value];
                    else if (value.length == 0)
                        return false;
                } else if (value.length == 0)
                    return false;
            } else
                value = [value];
            if (nilIsTrue) {
                for (var i = 0; i < value.length; i++) {
                    var v = value[i];
                    if (Utility.isNil(v))
                        return true;
                    if (typeof(v) == "boolean") {
                        if (v)
                            return true;
                        continue;
                    }
                    if (typeof(v) != "string") {
                        if (typeof(v.valueOf) == "function") {
                            try { v = v.valueOf(); } catch (e) { }
                            if (Utility.isNil(v))
                                return true;
                            if (typeof(v) == "boolean") {
                                if (v)
                                    return true;
                                continue;
                            }
                        }
                        if (typeof(v) != "string")
                            v = Utility.asString(v);
                    }

                    if (v.length == 0 || (v = v.trim()).length == 0 || !falseStringRe.test(v))
                        return true;
                }
            } else {
                for (var i = 0; i < value.length; i++) {
                    var v = value[i];
                    if (Utility.isNil(v))
                        continue;
                    if (typeof(v) == "boolean") {
                        if (v)
                            return true;
                        continue;
                    }
                    if (typeof(v) != "string") {
                        if (typeof(v.valueOf) == "function") {
                            try { v = v.valueOf(); } catch (e) { }
                            if (Utility.isNil(v))
                                continue;
                            if (typeof(v) == "boolean") {
                                if (v)
                                    return true;
                                continue;
                            }
                        }
                        if (typeof(v) != "string")
                            v = Utility.asString(v);
                    }

                    if (v.length > 0 && (v = v.trim()).length > 0 && !falseStringRe.test(v))
                        return true;
                }
            }
            return false;
        }
    };
})();