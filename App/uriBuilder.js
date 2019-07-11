/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />
/// <reference path="app.ts" />
var uriBuilder;
(function (uriBuilder_1) {
    // #region evaluation-item directive
    class EvaluationItemController {
        constructor($scope, $element, $attrs, $q, $log) {
            this.$scope = $scope;
            this.$element = $element;
            this.$attrs = $attrs;
            this.$q = $q;
            this.$log = $log;
            $scope.evaluationItem = this;
            let uriBuilder = $scope.uriBuilder;
            if (sys.isNil(uriBuilder) || !(uriBuilder instanceof UriBuilderController)) {
                let rootId = $scope.$root.$id;
                for (let parentScope = $scope.$parent; !sys.isNil(parentScope); parentScope = (parentScope.$id === rootId) ? undefined : parentScope.$parent) {
                    if (!sys.isNil(parentScope.uriBuilder) && parentScope.uriBuilder instanceof UriBuilderController) {
                        uriBuilder = parentScope.uriBuilder;
                        break;
                    }
                }
                if (sys.isNil(uriBuilder) || !(uriBuilder instanceof UriBuilderController))
                    throw new Error("Unable to detect parent uriBuilder controller scope");
            }
            this._uriBuilder = uriBuilder;
            uriBuilder.$scope.$watch("expression", (newValue, oldValue, uriBuilderScope) => {
            });
        }
        $doCheck() {
        }
        static createDirective() {
            return {
                controller: ["$scope", "$element", "$attrs", "$q", "$log", EvaluationItemController],
                controllerAs: "evaluationItem",
                scope: {
                    id: '=',
                    success: '='
                },
                template: '',
                transclude: true
            };
        }
    }
    app.appModule.directive("evaluationItem", EvaluationItemController.createDirective);
    class RegexPatternController {
        constructor($scope, $q, $log) {
            this.$scope = $scope;
            this.$q = $q;
            this.$log = $log;
            $scope.currentController = this;
            let uriBuilder = $scope.uriBuilder;
            if (sys.isNil(uriBuilder) || !(uriBuilder instanceof UriBuilderController)) {
                let rootId = $scope.$root.$id;
                for (let parentScope = $scope.$parent; !sys.isNil(parentScope); parentScope = (parentScope.$id === rootId) ? undefined : parentScope.$parent) {
                    if (!sys.isNil(parentScope.uriBuilder) && parentScope.uriBuilder instanceof UriBuilderController) {
                        uriBuilder = parentScope.uriBuilder;
                        break;
                    }
                }
                if (sys.isNil(uriBuilder) || !(uriBuilder instanceof UriBuilderController))
                    throw new Error("Unable to detect parent uriBuilder controller scope");
            }
            this._uriBuilder = uriBuilder;
        }
        $doCheck() {
        }
    }
    app.appModule.controller("regexPattern", ["$scope", "$q", "$log", RegexPatternController]);
    class UriBuilderController {
        constructor($scope, $log) {
            this.$scope = $scope;
            this.$log = $log;
            $scope.uriBuilder = this;
            $scope.inputItems = [{ id: 0 }];
        }
        $doCheck() {
        }
    }
    app.appModule.controller("uriBuilder", ["$scope", "$log", UriBuilderController]);
    // #endregion
})(uriBuilder || (uriBuilder = {}));
var uriBuilder_old;
(function (uriBuilder_old) {
    const CSS_CLASS_VALID = "is-valid";
    const CSS_CLASS_INVALID = "is-invalid";
    const CSS_CLASS_TEXT_WARNING = "text-warning";
    const uriSchemeParseRe = /^([a-zA-Z_][-.\dA-_a-z~\ud800-\udbff]*)(:[\\/]{0,2})/;
    const uriAuthorityParseRe = /^(([^@:\\\/]+)?(:([^@:\\\/]+)?)?@)?(?:([^@:\\\/]+)?(?::(\d+)(?=[\\\/:]|$))?)?/;
    const leadingPathSegmentRe = /^[^:\\\/]+/;
    const trailingPathSegmentRe = /^(:\\\/)([^:\\\/]+)?/;
    /*
      https://john.doe:userpassword@www.example.com:65535/forum/questions/?tag=networking&order=newest#top
      ├─┬─┘└┬┘├───┬──┘ └─────┬────┤ ├──────┬──────┘ └─┬─┤│               │ │                         │ │ │
      │ │   │ │username  password │ │  hostname     port││               │ │                         │ │ │
      │ │   │ ├─────────┬─────────┘ └─────────┬─────────┤│               │ │                         │ │ │
      │ │ sep │     userinfo                 host       ││               │ │                         │ │ │
      │ │     └──────────────────┬──────────────────────┤│               │ │                         │ │ │
      │ scheme               authority                  ││               │ │                         │ │ │
      └───────────────────────┬─────────────────────────┘└───────┬───────┘ └────────────┬────────────┘ └┬┘
                            origin                              path                   query        fragment

      file:///C:/Program%20Files%20(x86)/Common%20Files/microsoft%20shared
      ├─┬┘└┬┘││                                                          │
      │ │sep ││                                                          │
      │scheme││                                                          │
      └───┬──┘└────────────────────────────┬─────────────────────────────┘
        origin                           path

      file://remoteserver.mycompany.org/Shared%20Files/Report.xlsx
      ├─┬┘└┬┘└────────────┬───────────┤│                         │
      │ │ sep       host/authority    ││                         │
      │scheme                         ││                         │
      └───────────────┬───────────────┘└────────────┬────────────┘
                    origin                        path

      ldap://[2001:db8::7]/c=GB?objectClass?one
      ├─┬┘└┬┘└─────┬─────┤│   │ │             │
      │ │ sep    host    ││   │ │             │
      │ scheme           ││   │ │             │
      └─────────┬────────┘└─┬─┘ └──────┬──────┘
             origin        path      query

      mailto:John.Doe@example.com
      ├──┬─┘ ├───┬──┘ └────┬────┤
      │  │   │username    host  │
      │  │   └─────────┬────────┤
      │scheme       authority   │
      └────────────┬────────────┘
                origin

      news:comp.infosystems.www.servers.unix
      ├─┬┘ └───────────────┬───────────────┤
      │scheme        host/authority        │
      └──────────────────┬─────────────────┘
                      origin
    
      tel:+1-816-555-1212
      ├┬┘ └──────┬──────┤
      ││  host/authority│
      │scheme           │
      └────────┬────────┘
    
      telnet://192.0.2.16:80/
      ├──┬─┘└┬┘├────┬───┘ ├┤│
      │  │   │ │hostname  │││
      │  │   │ │       port││
      │  │ sep └─────┬─────┤│
      │ scheme   host/auth ││
      └──────────┬─────────┘│
               origin      path
    
      urn:oasis:names:specification:docbook:dtd:xml:4.1.2
      ├┬┘ └─┬─┤ │                                       │
      ││  host│ │                                       │
      │scheme │ │                                       │
      └───┬───┘ └───────────────────┬───────────────────┘
        origin                     path
     */
    function getUriSchemeInfo(uri) {
        if ((typeof uri === "string") && uri.length > 0) {
            let m = uriSchemeParseRe.exec(uri);
            if ((typeof m === "object") && m !== null) {
                let scheme = UriSchemeInfo.getSchemaProperties(m[1]);
                let s = m[2].replace("\\", "/");
                if (scheme.schemeSeparator === s)
                    return scheme;
                return new UriSchemeInfo(scheme.name, {
                    supportsPath: scheme.supportsPath, supportsQuery: scheme.supportsQuery, supportsFragment: scheme.supportsFragment, supportsCredentials: scheme.supportsCredentials,
                    requiresHost: scheme.requiresHost, supportsHost: scheme.supportsHost, supportsPort: scheme.supportsPort, requiresUsername: scheme.requiresUsername, schemeSeparator: s, defaultPort: scheme.defaultPort
                }, scheme.description);
            }
        }
    }
    uriBuilder_old.getUriSchemeInfo = getUriSchemeInfo;
    class UriSchemeInfo {
        constructor(name, properties, description) {
            this.name = name;
            this.description = (typeof description === "string") ? description.trim() : "";
            if (typeof (properties) === 'undefined' || properties === null) {
                this.supportsPath = true;
                this.supportsQuery = true;
                this.supportsFragment = true;
                this.supportsCredentials = true;
                this.supportsHost = true;
                this.requiresHost = false;
                this.supportsPort = true;
                this.requiresUsername = false;
                this.defaultPort = NaN;
                this.schemeSeparator = "://";
            }
            else {
                this.schemeSeparator = (typeof (properties.schemeSeparator) == 'string') ? properties.schemeSeparator : "://";
                if (this.schemeSeparator == ":") {
                    this.supportsHost = ((typeof properties.supportsHost === 'boolean') && properties.supportsHost === true);
                    this.requiresHost = (this.supportsHost && (typeof properties.requiresHost === 'boolean') && properties.requiresHost === true);
                }
                else {
                    this.supportsHost = ((typeof properties.supportsHost !== 'boolean') || properties.supportsHost === true);
                    this.requiresHost = (this.supportsHost && (typeof properties.requiresHost !== 'boolean') || properties.requiresHost === true);
                }
                this.supportsPath = ((typeof properties.supportsPath !== 'boolean') || properties.supportsPath === true);
                this.supportsQuery = ((typeof properties.supportsQuery !== 'boolean') || properties.supportsQuery === true);
                this.supportsFragment = ((typeof properties.supportsFragment !== 'boolean') || properties.supportsFragment === true);
                this.supportsCredentials = (this.supportsHost && (typeof properties.supportsCredentials !== 'boolean') || properties.supportsCredentials === true);
                this.supportsPort = (this.supportsHost && (typeof properties.supportsPort !== 'boolean') || properties.supportsPort === true);
                this.requiresUsername = (this.supportsHost && (typeof properties.requiresUsername === 'boolean') && properties.requiresUsername === true);
                this.defaultPort = (this.supportsPort && typeof properties.defaultPort === "number") ? properties.defaultPort : NaN;
            }
        }
        get displayText() {
            return (this.description.length == 0) ? "\"" + this.name + "\" Schema" : this.description + " (" + this.name + ")";
        }
        static getSchemaProperties(name) {
            if (name.endsWith(':'))
                name = name.substr(0, name.length - 1);
            switch (name) {
                case 'ftp':
                    return UriSchemeInfo.uriScheme_ftp;
                case 'ftps':
                    return UriSchemeInfo.uriScheme_ftps;
                case 'sftp':
                    return UriSchemeInfo.uriScheme_sftp;
                case 'http':
                    return UriSchemeInfo.uriScheme_http;
                case 'https':
                    return UriSchemeInfo.uriScheme_https;
                case 'gopher':
                    return UriSchemeInfo.uriScheme_gopher;
                case 'mailto':
                    return UriSchemeInfo.uriScheme_mailto;
                case 'news':
                    return UriSchemeInfo.uriScheme_news;
                case 'nntp':
                    return UriSchemeInfo.uriScheme_nntp;
                case 'telnet':
                    return UriSchemeInfo.uriScheme_telnet;
                case 'wais':
                    return UriSchemeInfo.uriScheme_wais;
                case 'file':
                    return UriSchemeInfo.uriScheme_file;
                case 'net.pipe':
                    return UriSchemeInfo.uriScheme_netPipe;
                case 'net.tcp':
                    return UriSchemeInfo.uriScheme_netTcp;
                case 'ldap':
                    return UriSchemeInfo.uriScheme_ldap;
                case 'ssh':
                    return UriSchemeInfo.uriScheme_ssh;
                case 'git':
                    return UriSchemeInfo.uriScheme_git;
                case 'tel':
                    return UriSchemeInfo.uriScheme_tel;
                case 'urn':
                    return UriSchemeInfo.uriScheme_urn;
            }
            return new UriSchemeInfo(name);
        }
    }
    /**
     * File Transfer protocol
     **/
    UriSchemeInfo.uriScheme_ftp = new UriSchemeInfo("ftp", { supportsQuery: false, supportsFragment: false, defaultPort: 21 }, "File Transfer protocol");
    /**
     * File Transfer protocol (secure)
     **/
    UriSchemeInfo.uriScheme_ftps = new UriSchemeInfo("ftps", { supportsQuery: false, supportsFragment: false, defaultPort: 990 }, "File Transfer protocol (secure)");
    /**
     * Secure File Transfer Protocol
     **/
    UriSchemeInfo.uriScheme_sftp = new UriSchemeInfo("sftp", { supportsQuery: false, supportsFragment: false, defaultPort: 22 }, "Secure File Transfer Protocol");
    /**
     * Hypertext Transfer Protocol
     **/
    UriSchemeInfo.uriScheme_http = new UriSchemeInfo("http", { defaultPort: 80 }, "Hypertext Transfer Protocol");
    /**
     * Hypertext Transfer Protocol (secure)
     **/
    UriSchemeInfo.uriScheme_https = new UriSchemeInfo("https", { defaultPort: 443 }, "Hypertext Transfer Protocol (secure)");
    /**
     * Gopher protocol
     **/
    UriSchemeInfo.uriScheme_gopher = new UriSchemeInfo("gopher", { defaultPort: 70 }, "Gopher protocol");
    /**
     * Electronic mail address
     **/
    UriSchemeInfo.uriScheme_mailto = new UriSchemeInfo("mailto", { schemeSeparator: ":", requiresUsername: true, supportsCredentials: false }, "Electronic mail address");
    /**
     * USENET news
     **/
    UriSchemeInfo.uriScheme_news = new UriSchemeInfo("news", { supportsHost: false, schemeSeparator: ":" }, "USENET news");
    /**
     * USENET news using NNTP access
     **/
    UriSchemeInfo.uriScheme_nntp = new UriSchemeInfo("nntp", { defaultPort: 119 }, "USENET news using NNTP access");
    /**
     * Reference to interactive sessions
     **/
    UriSchemeInfo.uriScheme_telnet = new UriSchemeInfo("telnet", { supportsPath: false, supportsQuery: false, supportsFragment: false, supportsCredentials: false, defaultPort: 23 }, "Reference to interactive sessions");
    /**
     * Wide Area Information Servers
     **/
    UriSchemeInfo.uriScheme_wais = new UriSchemeInfo("wais", { defaultPort: 443 }, "Wide Area Information Servers");
    /**
     * Host-specific file names
     **/
    UriSchemeInfo.uriScheme_file = new UriSchemeInfo("file", { supportsQuery: false, supportsFragment: false, supportsCredentials: false, requiresHost: false, supportsPort: false }, "Host-specific file names");
    /**
     * Net Pipe
     **/
    UriSchemeInfo.uriScheme_netPipe = new UriSchemeInfo("net.pipe", { supportsPort: false }, "Net Pipe");
    /**
     * Net-TCP
     **/
    UriSchemeInfo.uriScheme_netTcp = new UriSchemeInfo("net.tcp", { defaultPort: 808 }, "Net-TCP");
    /**
     * Lightweight Directory Access Protocol
     **/
    UriSchemeInfo.uriScheme_ldap = new UriSchemeInfo("ldap", { defaultPort: 389 }, "Lightweight Directory Access Protocol");
    /**
     * Lightweight Directory Access Protocol
     **/
    UriSchemeInfo.uriScheme_ssh = new UriSchemeInfo("ssh", { defaultPort: 22 }, "Lightweight Directory Access Protocol");
    /**
     * GIT Respository
     **/
    UriSchemeInfo.uriScheme_git = new UriSchemeInfo("git", { supportsQuery: false, supportsFragment: false, defaultPort: 9418 }, "GIT Respository");
    /**
     * Telephone Number
     **/
    UriSchemeInfo.uriScheme_tel = new UriSchemeInfo("tel", { supportsHost: false, schemeSeparator: ":", supportsPath: false, supportsFragment: false, supportsQuery: false }, "Telephone Number");
    /**
     * Uniform Resource notation
     **/
    UriSchemeInfo.uriScheme_urn = new UriSchemeInfo("urn", { supportsHost: false, schemeSeparator: ":" }, "Uniform Resource notation");
    uriBuilder_old.UriSchemeInfo = UriSchemeInfo;
    class UriBuilderQueryItem {
        constructor(_id, _key, value, _onChangeCallback, _onDeleteCallback) {
            this._id = _id;
            this._key = _key;
            this._onChangeCallback = _onChangeCallback;
            this._onDeleteCallback = _onDeleteCallback;
            if (typeof _key !== "string")
                _key = "";
            this._hasValue = typeof value === "string";
            this._value = (this._hasValue && typeof value === "string") ? value : "";
        }
        get key() { return this._key; }
        set key(value) {
            if (this._key === (value = sys.asString(value, "")))
                return;
            this._key = value;
            if (typeof this._onChangeCallback === "function")
                this._onChangeCallback();
        }
        get hasValue() { return this._hasValue; }
        set hasValue(value) {
            if (this._hasValue === (value = value == true))
                return;
            this._hasValue = value;
            if (typeof this._onChangeCallback === "function")
                this._onChangeCallback();
        }
        get value() { return (this._hasValue) ? this._value : ""; }
        set value(value) {
            if (this._value === (value = sys.asString(value, "")))
                return;
            this._value = value;
            if (this._hasValue && typeof this._onChangeCallback === "function")
                this._onChangeCallback();
        }
        toString() { return (this._hasValue) ? escape(this._key) + "=" + escape(this._value) : escape(this._key); }
        deleteCurrent() {
            if (typeof this._onDeleteCallback === "function")
                this._onDeleteCallback(this);
        }
        static push(array, key, value, onChangeCallback, onDeleteCallback) {
            let id = array.length;
            array.push(new UriBuilderQueryItem(id, key, value, onChangeCallback, onDeleteCallback));
        }
        static clear(array) {
            while (array.length > 0) {
                let item = array.pop();
                item._onChangeCallback = undefined;
                item._onDeleteCallback = undefined;
                item._id = -1;
            }
        }
        static deleteItem(array, item) {
            let index;
            if (sys.isNil(item) || (index = item._id) < 0 || index >= array.length || item._key !== array[index]._key || item._hasValue !== array[index]._hasValue || item._value !== array[index]._value)
                return false;
            item = array[index];
            item._onChangeCallback = undefined;
            item._onDeleteCallback = undefined;
            item._id = -1;
            if (index == 0)
                array.shift();
            else if (index < array.length)
                array.splice(index, 1);
            else {
                array.pop();
                return true;
            }
            for (let i = index; i < array.length; i++)
                array[i]._id = i;
            return true;
        }
    }
    class UriPathSegmentSeparatorOption {
        constructor(_value) {
            this._value = _value;
        }
        get label() { return (this._value.length == 0) ? "(none)" : this._value; }
        get value() { return this._value; }
    }
    class UriBuilderPathSegment {
        constructor(_id, _leadingSeparator, _name, _onChangeCallback, _onDeleteCallback, _separatorOptional = false) {
            this._id = _id;
            this._leadingSeparator = _leadingSeparator;
            this._name = _name;
            this._onChangeCallback = _onChangeCallback;
            this._onDeleteCallback = _onDeleteCallback;
            this._separatorOptional = _separatorOptional;
            if (typeof _leadingSeparator !== "string")
                _leadingSeparator = (_separatorOptional) ? "/" : "";
            else if (_separatorOptional && _leadingSeparator.length == 0)
                _leadingSeparator = "/";
            if (typeof _name !== "string")
                _name = "";
            this._separatorOptions = (_separatorOptional) ? this._separatorOptions : this._separatorOptions.filter((value) => value.value.length > 0);
            for (let index = 0; index < this._separatorOptions.length; index++) {
                if (this._separatorOptions[index].value === _leadingSeparator) {
                    this._selectedSeparatorIndex = index;
                    return;
                }
            }
            this._selectedSeparatorIndex = 0;
            this._leadingSeparator = this._separatorOptions[0].value;
        }
        get leadingSeparator() { return this._leadingSeparator; }
        set leadingSeparator(value) {
            value = sys.asString(value);
            if (this._leadingSeparator === (value = sys.asString(value)))
                return;
            for (let index = 0; index < this._separatorOptions.length; index++) {
                if (this._separatorOptions[index].value === value) {
                    this._leadingSeparator = value;
                    this.selectedSeparatorIndex = index;
                    return;
                }
            }
        }
        get selectedSeparatorIndex() { return this._selectedSeparatorIndex; }
        set selectedSeparatorIndex(value) {
            if (typeof value !== "number" || isNaN(value) || value < 0 || (value = Math.round(value)) >= this._separatorOptions.length || value === this._selectedSeparatorIndex)
                return;
            this._selectedSeparatorIndex = value;
            if (typeof this._onChangeCallback === "function")
                this._onChangeCallback();
        }
        get name() { return this._name; }
        set name(value) {
            if (this._name === (value = sys.asString(value, "")))
                return;
            this._name = value;
            if (typeof this._onChangeCallback === "function")
                this._onChangeCallback();
        }
        get separatorOptional() { return this._separatorOptional; }
        set separatorOptional(value) {
            if (this._separatorOptional === (value = value == true))
                return;
            this._separatorOptions = (this._separatorOptional) ? this._separatorOptions : this._separatorOptions.filter((value) => value.value.length > 0);
            for (let index = 0; index < this._separatorOptions.length; index++) {
                if (this._separatorOptions[index].value === this._leadingSeparator) {
                    if (this._selectedSeparatorIndex !== index) {
                        this._selectedSeparatorIndex = index;
                        if (typeof this._onChangeCallback === "function")
                            this._onChangeCallback();
                    }
                    return;
                }
            }
            this._selectedSeparatorIndex = 0;
            this._leadingSeparator = this._separatorOptions[0].value;
            if (typeof this._onChangeCallback === "function")
                this._onChangeCallback();
        }
        deleteCurrent() {
            if (typeof this._onDeleteCallback === "function")
                this._onDeleteCallback(this);
        }
        static push(array, leadingSeparator, name, onChangeCallback, onDeleteCallback) {
            let id = array.length;
            array.push(new UriBuilderPathSegment(id, leadingSeparator, name, onChangeCallback, onDeleteCallback, id == 0));
        }
        static reset(array, leadingSeparator, name) {
            while (array.length > 1) {
                let item = array.pop();
                item._onChangeCallback = undefined;
                item._onDeleteCallback = undefined;
                item._id = -1;
            }
            if (array[0]._name === name && array[0]._leadingSeparator === leadingSeparator)
                return false;
            array[0]._name = name;
            array[0]._leadingSeparator = leadingSeparator;
            return true;
        }
        static deleteItem(array, item) {
            let index;
            if (sys.isNil(item) || (index = item._id) < 0 || index >= array.length || item._name !== array[index]._name || item._selectedSeparatorIndex !== array[index]._selectedSeparatorIndex)
                return false;
            item._id = -1;
            item = array[index];
            item._onChangeCallback = undefined;
            item._onDeleteCallback = undefined;
            if (array.length < 2) {
                if (array[0]._name.length == 0 && array[0]._leadingSeparator.length == 0)
                    return false;
                array[0]._name = "";
                array[0]._leadingSeparator = "";
                return true;
            }
            if (index == 0)
                array.shift();
            else if (index < array.length)
                array.splice(index, 1);
            else {
                array.pop();
                return true;
            }
            for (let i = index; i < array.length; i++)
                array[i]._id = i;
            if (index == 0)
                array[0]._separatorOptional = true;
            return true;
        }
    }
    UriBuilderPathSegment._pathSeparatorOptions = [
        new UriPathSegmentSeparatorOption("/"),
        new UriPathSegmentSeparatorOption(":"),
        new UriPathSegmentSeparatorOption("\\"),
        new UriPathSegmentSeparatorOption("")
    ];
    class UriBuilderController {
        constructor() {
            this._isBuildUriMode = false;
            this._isBuildPathMode = false;
            this._isBuildQueryMode = false;
            this._href = "";
            this._selectedSchemIndex = 0;
            this._otherSchemeName = "";
            this._schemeErrorMessage = "";
            this._selectedSchemeSeparatorIndex = 0;
            this._isAbsolute = false;
            this._hasAuthority = false;
            this._hasUserInfo = false;
            this._userName = "";
            this._hasPassword = false;
            this._password = "";
            this._hostName = "";
            this._hasPort = false;
            this._portNumber = "";
            this._portValue = NaN;
            this._defaultPort = NaN;
            this._portErrorMessage = "";
            this._pathString = "";
            this._pathSegments = [];
            this._hasQuery = false;
            this._queryValues = [];
            this._hasFragment = false;
            this._fragment = "";
            let controller = this;
            UriBuilderPathSegment.push(this._pathSegments, "", "", () => {
                if (controller.isBuildPathMode)
                    controller.rebuildPath();
            }, (item) => {
                if (UriBuilderPathSegment.deleteItem(controller._pathSegments, item) && controller.isBuildPathMode)
                    controller.rebuildPath();
            });
        }
        get isBuildUriMode() { return this._isBuildUriMode; }
        set isBuildUriMode(value) {
            if (this._isBuildUriMode === (value = value == true))
                return;
            this._isBuildUriMode = value;
            this.validate();
        }
        get isParseUriMode() { return !this._isBuildUriMode; }
        get href() { return this._href; }
        set href(value) {
            if (this._href === (value = (typeof value === "string") ? value.trim() : ""))
                return;
            this._href = value;
            if (this._isBuildUriMode)
                return;
            let index = value.indexOf("#");
            this._hasFragment = index >= 0;
            if (this._hasFragment) {
                this._fragment = unescape(value.substr(index + 1));
                value = value.substr(0, index);
            }
            else
                this._fragment = "";
            index = value.indexOf("?");
            this._hasQuery = index >= 0;
            UriBuilderQueryItem.clear(this._queryValues);
            let controller = this;
            if (this._hasQuery) {
                this._queryString = value.substr(index + 1);
                if (this._queryString.length > 0) {
                    this._queryString.split("&").forEach((kvp) => {
                        let i = kvp.indexOf("=");
                        if (i < 0)
                            UriBuilderQueryItem.push(this._queryValues, unescape(kvp), undefined, () => {
                                if (controller.isBuildQueryMode)
                                    controller.rebuildQuery();
                            }, (item) => {
                                if (UriBuilderQueryItem.deleteItem(controller._queryValues, item) && controller.isBuildQueryMode)
                                    controller.rebuildQuery();
                            });
                        else
                            UriBuilderQueryItem.push(this._queryValues, unescape(kvp.substr(0, i)), unescape(kvp.substr(i + 1)), () => {
                                if (controller.isBuildQueryMode)
                                    controller.rebuildQuery();
                            }, (item) => {
                                if (UriBuilderQueryItem.deleteItem(controller._queryValues, item) && controller.isBuildQueryMode)
                                    controller.rebuildQuery();
                            });
                    });
                }
                value = value.substr(0, index);
            }
            let scheme = getUriSchemeInfo(value);
            this._isAbsoluteUri = !sys.isNil(scheme);
            let m;
            if (this._isAbsoluteUri) {
                value = value.substr(scheme.name.length + scheme.schemeSeparator.length);
                this._otherSchemeName = scheme.name;
                this._selectedSchemeSeparatorIndex = UriBuilderController._schemeSeparatorOptions.indexOf(scheme.schemeSeparator);
                this._selectedSchemIndex = -1;
                for (let i = 0; i < UriBuilderController._schemeSeparatorOptions.length; i++) {
                    if (UriBuilderController._schemeOptions[i].name === scheme.name && UriBuilderController._schemeOptions[i].schemeSeparator === scheme.schemeSeparator) {
                        this._selectedSchemIndex = i;
                        break;
                    }
                }
                m = uriAuthorityParseRe.exec(value);
                this._hasAuthority = !sys.isNil(m);
                if (this._hasAuthority) {
                    this._hasUserInfo = !sys.isNil(m[1]);
                    if (this._hasUserInfo) {
                        this._userName = unescape(sys.asString(m[2], ""));
                        this._hasPassword = !sys.isNil(m[3]);
                        this._password = (this._hasPassword) ? unescape(m[4]) : "";
                    }
                    else {
                        this._hasPassword = false;
                        this._userName = this._password = "";
                    }
                    this._hostName = unescape(sys.asString(m[5], ""));
                    this._hasPort = !sys.isNil(m[6]);
                    this._portNumber = (this._hasPort) ? m[6] : "";
                    value = value.substr(m[0].length);
                }
                else {
                    this._hasUserInfo = this._hasPassword = this._hasPort = false;
                    this._userName = this._password = this._portNumber = "";
                    m = trailingPathSegmentRe.exec(value);
                    if (sys.isNil(m) || sys.isNil(m[1]))
                        this._hostName = "";
                    else {
                        this._hostName = unescape(m[1]);
                        value = value.substr(m[1].length);
                    }
                }
            }
            else {
                this._hasAuthority = this._hasUserInfo = this._hasPassword = this._hasPort = false;
                this._userName = this._password = this._hostName = this._portNumber = "";
            }
            this._pathString = value;
            m = leadingPathSegmentRe.exec(value);
            if (sys.isNil(m)) {
                m = trailingPathSegmentRe.exec(value);
                if (sys.isNil(m)) {
                    UriBuilderPathSegment.reset(this._pathSegments, "", unescape(value));
                    return;
                }
                UriBuilderPathSegment.reset(this._pathSegments, m[1], unescape(sys.asString(m[2])));
            }
            else
                UriBuilderPathSegment.reset(this._pathSegments, "", unescape(m[0]));
            while (value.length > m[0].length) {
                value = value.substr(m[0].length);
                m = trailingPathSegmentRe.exec(value);
                UriBuilderPathSegment.push(this._pathSegments, m[1], unescape(sys.asString(m[2])), () => {
                    if (controller.isBuildPathMode)
                        controller.rebuildPath();
                }, (item) => {
                    if (UriBuilderPathSegment.deleteItem(controller._pathSegments, item) && controller.isBuildPathMode)
                        controller.rebuildPath();
                });
            }
            this.validate();
        }
        get uriType() { return (this._isAbsolute) ? "Absolute" : ((this._pathSegments[0].leadingSeparator.length > 0) ? "Relative (rooted)" : "Relative"); }
        get isAbsolute() { return this._isAbsolute; }
        set isAbsolute(value) {
            if (this._isAbsolute === (value = sys.asBoolean(value, false)))
                return;
            this._isAbsolute = value;
            this.validate();
            if (this._isBuildUriMode)
                this.rebuildHref();
        }
        get isRelative() { return !this._isAbsolute; }
        get schemeName() {
            let s = this.selectedSchemeName;
            return (s.length == 0) ? this._otherSchemeName : s;
        }
        get schemeSeparator() {
            return (this.isCustomScheme) ? this.selectedSchemeSeparator : UriBuilderController._schemeOptions[this._selectedSchemIndex].schemeSeparator;
        }
        get schemeOptions() { return UriBuilderController._schemeOptions; }
        get selectedSchemeName() { return UriBuilderController._schemeOptions[this._selectedSchemIndex].name; }
        set selectedSchemeName(value) {
            for (let index = 0; index < UriBuilderController._schemeOptions.length; index++) {
                if (UriBuilderController._schemeOptions[index].name === value) {
                    this.selectedSchemIndex = index;
                    return;
                }
            }
        }
        get isCustomScheme() { return this.selectedSchemeName.length == 0; }
        get selectedSchemIndex() { return this._selectedSchemIndex; }
        set selectedSchemIndex(value) {
            if (typeof value !== "number" || isNaN(value) || value < 0 || value >= UriBuilderController._schemeOptions.length || value === this._selectedSchemIndex)
                return;
            this._selectedSchemIndex = value;
            this.validate();
            if (this._isBuildUriMode && this._isAbsolute)
                this.rebuildHref();
        }
        get otherSchemeName() { return this._otherSchemeName; }
        set otherSchemeName(value) {
            if (this._otherSchemeName === (value = sys.asString(value, "")))
                return;
            this._otherSchemeName = value;
            this.validate();
            if (this._isBuildUriMode && this._isAbsolute && this.isCustomScheme)
                this.rebuildHref();
        }
        get schemeErrorMessage() { return (this._isAbsolute) ? this._schemeErrorMessage : ""; }
        get hasSchemeError() { return this._isAbsolute && this._schemeErrorMessage.length > 0; }
        get schemeSeparatorOptions() { return UriBuilderController._schemeSeparatorOptions; }
        get selectedSchemeSeparator() { return UriBuilderController._schemeSeparatorOptions[this._selectedSchemeSeparatorIndex]; }
        set selectedSchemeSeparator(value) {
            for (let index = 0; index < UriBuilderController._schemeSeparatorOptions.length; index++) {
                if (UriBuilderController._schemeSeparatorOptions[index] === value) {
                    this.selectedSchemeSeparatorIndex = index;
                    return;
                }
            }
        }
        get selectedSchemeSeparatorIndex() { return this._selectedSchemeSeparatorIndex; }
        set selectedSchemeSeparatorIndex(value) {
            if (typeof value !== "number" || isNaN(value) || value < 0 || value >= UriBuilderController._schemeSeparatorOptions.length || value === this._selectedSchemeSeparatorIndex)
                return;
            this._selectedSchemeSeparatorIndex = value;
            this.validate();
            if (this._isBuildUriMode && this._isAbsolute && this.isCustomScheme)
                this.rebuildHref();
        }
        get hasAuthority() { return this._hasAuthority && this._isAbsolute; }
        set hasAuthority(value) {
            if (this._hasAuthority === (value = sys.asBoolean(value, false)))
                return;
            this._hasAuthority = value;
            this.validate();
            if (this._isBuildUriMode && this._isAbsolute)
                this.rebuildHref();
        }
        get hasUserInfo() { return this._hasUserInfo && this.hasAuthority; }
        set hasUserInfo(value) {
            if (this._hasUserInfo === (value = sys.asBoolean(value, false)))
                return;
            this._hasUserInfo = value;
            if (this._isBuildUriMode && this._isAbsolute && this.hasAuthority)
                this.rebuildHref();
        }
        get userName() { return (this.hasUserInfo) ? this._userName : ""; }
        set userName(value) {
            if (this._userName === (value = sys.asString(value, "")))
                return;
            this._userName = value;
            if (this._isBuildUriMode && this._isAbsolute && this.hasUserInfo)
                this.rebuildHref();
        }
        get hasPassword() { return this._hasPassword && this.hasUserInfo; }
        set hasPassword(value) {
            if (this._hasPassword === (value = sys.asBoolean(value, false)))
                return;
            this._hasPassword = value;
            if (this._isBuildUriMode && this._isAbsolute && this.hasUserInfo)
                this.rebuildHref();
        }
        get password() { return (this.hasPassword) ? this._password : ""; }
        set password(value) {
            if (this._password === (value = sys.asString(value, "")))
                return;
            this._password = value;
            if (this._isBuildUriMode && this._isAbsolute && this.hasPassword)
                this.rebuildHref();
        }
        get hostName() { return (this.hasAuthority) ? this._hostName : ""; }
        set hostName(value) {
            if (this._hostName === (value = sys.asString(value, "")))
                return;
            this._hostName = value;
            this.validate();
            if (this._isBuildUriMode && this.hasAuthority)
                this.rebuildHref();
        }
        get hasPort() { return this._hasPort && this.hasAuthority; }
        set hasPort(value) {
            if (this._hasPort === (value = sys.asBoolean(value, false)))
                return;
            this._hasPort = value;
            this.validate();
            if (this._isBuildUriMode && this.hasAuthority)
                this.rebuildHref();
        }
        get usingDefaultPort() { return this.isAbsolute && (!this.hasPort || this._portNumber.trim().length == 0) && !isNaN(this._defaultPort); }
        get portNumber() { return (this.hasPort) ? this._portNumber : ""; }
        set portNumber(value) {
            if (this._portNumber === (value = sys.asString(value, "")))
                return;
            this._portNumber = value;
            this.validate();
            if (this._isBuildUriMode && this._isAbsolute)
                this.rebuildHref();
        }
        get portValue() { return this._portValue; }
        get portDisplayText() {
            if (this.isAbsolute) {
                let n;
                if (this.hasPort) {
                    n = this._portValue;
                    return (isNaN(n)) ? this._portNumber : n.toString();
                }
                n = this._defaultPort;
                if (!isNaN(n))
                    return n.toString();
            }
            return "";
        }
        get hasPortError() { return this.hasPort && this._portErrorMessage.length > 0; }
        get portErrorMessage() { return (this.hasPortError) ? this._portErrorMessage : ""; }
        get isBuildPathMode() { return this._isBuildUriMode && this._isBuildPathMode; }
        set isBuildPathMode(value) {
            if (this._isBuildPathMode === (value = value == true))
                return;
            this._isBuildPathMode = value;
            this.validate();
        }
        get isParsePathMode() { return this._isBuildUriMode && !this._isBuildPathMode; }
        get pathSegments() { return this._pathSegments; }
        get pathString() { return this._pathString; }
        set pathString(value) {
            if (this._pathString === (value = sys.asString(value, "")))
                return;
            this._pathString = value;
            if (this.isParsePathMode)
                this.rebuildHref();
        }
        get isBuildQueryMode() { return this._isBuildUriMode && this._isBuildQueryMode; }
        set isBuildQueryMode(value) {
            if (this._isBuildQueryMode === (value = value == true))
                return;
            this._isBuildQueryMode = value;
        }
        get isParseQueryMode() { return this._isBuildUriMode && !this._isBuildQueryMode; }
        get hasQuery() { return this._hasQuery; }
        set hasQuery(value) {
            if (this._hasQuery === (value = sys.asBoolean(value, false)))
                return;
            this._hasQuery = value;
            if (this._isBuildUriMode)
                this.rebuildHref();
        }
        get queryValues() { return this._queryValues; }
        get queryString() { return this._queryString; }
        set queryString(value) {
            if (this._queryString === (value = sys.asString(value, "")))
                return;
            this._queryString = value;
            if (this.isParseQueryMode)
                this.rebuildHref();
        }
        get hasFragment() { return this._hasFragment; }
        set hasFragment(value) {
            if (this._hasFragment === (value = sys.asBoolean(value, false)))
                return;
            this._hasFragment = value;
            if (this._isBuildUriMode)
                this.rebuildHref();
        }
        get fragment() { return this._fragment; }
        set fragment(value) {
            if (this._fragment === (value = sys.asString(value, "")))
                return;
            this._fragment = value;
            if (this._isBuildUriMode)
                this.rebuildHref();
        }
        get parseUriButtonClass() { return ["btn", (this._isBuildUriMode) ? "btn-primary" : "btn-secondary"]; }
        get buildUriButtonClass() { return ["btn", (this._isBuildUriMode) ? "btn-secondary" : "btn-primary"]; }
        validate() {
            if (this.isAbsolute) {
                let opt = UriBuilderController._schemeOptions[this._selectedSchemIndex];
                if (opt.name.length == 0) {
                    let m = uriSchemeParseRe.exec(this._otherSchemeName);
                    if (sys.isNil(m))
                        this._schemeErrorMessage = (this._otherSchemeName.trim().length == 0) ? "Scheme name cannot be empty." : "Invalid scheme name.";
                    else {
                        opt = UriBuilderController._schemeOptions.filter((v) => v.name === this._otherSchemeName).concat(opt)[0];
                        this._schemeErrorMessage = "";
                    }
                }
                else
                    this._schemeErrorMessage = "";
                this._defaultPort = (typeof opt.defaultPort == "number") ? opt.defaultPort : NaN;
                if (this.hasAuthority) {
                    if (this.hasPort) {
                        let s = this._portNumber.trim();
                        if (s.length == 0) {
                            this._portValue = this._defaultPort;
                            this._portErrorMessage = "Port cannot be empty.";
                        }
                        else {
                            this._portValue = parseInt(s);
                            if (isNaN(this._portValue))
                                this._portErrorMessage = "Invalid port number.";
                            else if (this._portValue < 1 || this._portValue > 65535)
                                this._portErrorMessage = "Port number out of range.";
                            else
                                this._portErrorMessage = "";
                        }
                    }
                }
                else {
                    this._portValue = this._defaultPort;
                    this._portErrorMessage = "";
                }
            }
            else {
                this._portValue = this._defaultPort = NaN;
                this._schemeErrorMessage = this._portErrorMessage = "";
            }
        }
        rebuildHref() {
            let path = this._pathString;
            if (this.isAbsolute) {
                if (path.length > 0 && (!path.startsWith("/") || path.startsWith("\\") || path.startsWith(":")))
                    path = "/" + path;
                let href = this.schemeName + this.schemeSeparator;
                if (this.hasUserInfo)
                    href += ((this.hasPassword) ? encodeURIComponent(this.userName) + ":" + encodeURIComponent(this.password) : encodeURIComponent(this.userName)) + "@";
                href += this.hostName;
                if (this.hasPort)
                    href += ":" + this.portNumber;
                path = ((path.length > 0 && (!path.startsWith("/") || path.startsWith("\\") || path.startsWith(":"))) ? href + "/" : href) + path;
            }
            if (this.hasQuery)
                path += "?" + this._queryString;
            this._href = (this.hasFragment) ? path + "#" + encodeURI(this.fragment) : path;
        }
        rebuildQuery() {
            let s = this._queryValues.map((value) => (value.hasValue) ? encodeURIComponent(value.key) + "=" + encodeURIComponent(value.value) : encodeURIComponent(value.key)).join("&");
            if (s !== this._queryString) {
                this._queryString = s;
                this.rebuildHref();
            }
        }
        rebuildPath() {
            let s = this._pathSegments.map((value) => value.leadingSeparator + encodeURIComponent(value.name)).join("");
            if (s !== this._pathString) {
                this._pathString = s;
                this.rebuildHref();
            }
        }
        $onInit() { }
    }
    UriBuilderController._schemeOptions = [
        UriSchemeInfo.uriScheme_http,
        UriSchemeInfo.uriScheme_https,
        UriSchemeInfo.uriScheme_file,
        UriSchemeInfo.uriScheme_ldap,
        UriSchemeInfo.uriScheme_ftp,
        UriSchemeInfo.uriScheme_ftps,
        UriSchemeInfo.uriScheme_git,
        UriSchemeInfo.uriScheme_mailto,
        UriSchemeInfo.uriScheme_netPipe,
        UriSchemeInfo.uriScheme_netTcp,
        UriSchemeInfo.uriScheme_nntp,
        UriSchemeInfo.uriScheme_sftp,
        UriSchemeInfo.uriScheme_ssh,
        UriSchemeInfo.uriScheme_tel,
        UriSchemeInfo.uriScheme_telnet,
        UriSchemeInfo.uriScheme_news,
        UriSchemeInfo.uriScheme_gopher,
        UriSchemeInfo.uriScheme_urn,
        { name: "", displayText: "(other)" }
    ];
    UriBuilderController._schemeSeparatorOptions = ["://", ":/", ":"];
    app.appModule.controller("uriBuilderController_old", ["$Scope", UriBuilderController]);
})(uriBuilder_old || (uriBuilder_old = {}));
