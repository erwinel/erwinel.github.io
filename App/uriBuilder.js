/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />
/// <reference path="app.ts" />
var uriBuilder;
(function (uriBuilder) {
    const CSS_CLASS_VALID = "is-valid";
    const CSS_CLASS_INVALID = "is-invalid";
    const CSS_CLASS_TEXT_WARNING = "text-warning";
    let ValidationStatus;
    (function (ValidationStatus) {
        ValidationStatus[ValidationStatus["Success"] = 0] = "Success";
        ValidationStatus[ValidationStatus["Warning"] = 1] = "Warning";
        ValidationStatus[ValidationStatus["Error"] = 2] = "Error";
    })(ValidationStatus || (ValidationStatus = {}));
    class optionField {
        constructor($Scope, _onChangeCallback) {
            this.$Scope = $Scope;
            this._onChangeCallback = _onChangeCallback;
            this._enableRelated = true;
            this._isChecked = false;
            $Scope.isChecked = this._isChecked;
            $Scope.enableRelated = this._enableRelated && this._isChecked;
            let current = this;
            $Scope.onChange = () => {
                if (current._isChecked === ($Scope.isChecked == true) || !current._enableRelated)
                    return;
                current._isChecked = ($Scope.isChecked == true);
                $Scope.enableRelated = current._enableRelated && current._isChecked;
                if (typeof current._onChangeCallback === "function")
                    current._onChangeCallback(!current._isChecked, current._isChecked);
            };
        }
        get isChecked() { return this._isChecked; }
        set isChecked(value) {
            if (this._isChecked === value)
                return;
            this._isChecked = this.$Scope.isChecked = value;
            this.$Scope.enableRelated = this._enableRelated && this._isChecked;
            if (typeof this._onChangeCallback === "function")
                this._onChangeCallback(!this._isChecked, this._isChecked);
        }
        get enableRelated() { return this._enableRelated; }
        set enableRelated(value) {
            if (this._enableRelated === value)
                return;
            this._enableRelated = value;
            if (value) {
                let isChecked = (this.$Scope.isChecked == true);
                this.$Scope.enableRelated = isChecked;
                if (this._isChecked != isChecked) {
                    this._isChecked = isChecked;
                    if (typeof this._onChangeCallback === "function")
                        this._onChangeCallback(!this._isChecked, this._isChecked);
                }
            }
            else
                this.$Scope.enableRelated = false;
        }
        setWithoutChangeNotify(value) {
            this._isChecked = this.$Scope.isChecked = value;
            this.$Scope.enableRelated = this._enableRelated && this._isChecked;
        }
    }
    class FieldWithValidation {
        constructor(name, $Scope, _onChangeCallback) {
            this.name = name;
            this.$Scope = $Scope;
            this._onChangeCallback = _onChangeCallback;
            $Scope.inputText = "";
            $Scope.fieldName = name;
            $Scope.validationStatus = ValidationStatus.Success;
            $Scope.cssClass = [CSS_CLASS_VALID];
            $Scope.validationMessage = "";
            let current = this;
            $Scope.onChange = () => {
                let newValue = this.coerceOutput(this.$Scope.inputText);
                if (newValue === this._originalText)
                    return;
                this._originalText = newValue;
                this.validate();
                if (typeof this._onChangeCallback === "function")
                    this._onChangeCallback();
            };
        }
        get inputText() { return this.$Scope.inputText; }
        set inputText(text) {
            this.$Scope.inputText = (typeof text === "string") ? text : "";
            let newValue = this.coerceOutput(this.$Scope.inputText);
            if (newValue === this._originalText)
                return;
            this._originalText = newValue;
            this.validate();
            if (typeof this._onChangeCallback === "function")
                this._onChangeCallback();
        }
        get outputText() { return this._outputText; }
        get validationMessage() { return this.$Scope.validationMessage; }
        get validationStatus() {
            let result = this.$Scope.validationStatus;
            if ((typeof result !== "number") || isNaN(result))
                this.$Scope.validationStatus = result = (((typeof this.$Scope.validationMessage !== "string") || this.$Scope.validationMessage.length == 0) ? ValidationStatus.Success : ValidationStatus.Error);
            return result;
        }
        setWithoutChangeNotify(text) {
            this.$Scope.inputText = (typeof text === "string") ? text : "";
            let newValue = this.coerceOutput(this.$Scope.inputText);
            if (newValue === this._originalText)
                return;
            this._originalText = newValue;
            this.validate();
        }
        validate() {
            let newValue = this.coerceOutput(this.$Scope.inputText);
            if (newValue === this._outputText)
                return this.validationStatus;
            this._outputText = newValue;
            let message = this.getValidationMessage(newValue);
            if (typeof message === "string")
                this.setValidation(message);
            else if (typeof message === "number")
                this.setValidation("", message);
            else if ((typeof message === "object") && message !== null && Array.isArray(message))
                this.setValidation(message[0], message[1]);
            else
                this.setValidation("");
            this.$Scope.cssClass = (this.$Scope.validationStatus == ValidationStatus.Warning) ? [CSS_CLASS_INVALID, CSS_CLASS_TEXT_WARNING] : [(this.$Scope.validationStatus == ValidationStatus.Success) ? CSS_CLASS_VALID : CSS_CLASS_INVALID];
            return this.validationStatus;
        }
        setValidText(text) {
            this.$Scope.inputText = this._originalText = this._outputText = this.coerceOutput(text);
            this.$Scope.cssClass = [CSS_CLASS_VALID];
            this.$Scope.validationMessage = "";
            this.$Scope.isValid = true;
            if (typeof this._onChangeCallback === "function")
                this._onChangeCallback();
        }
        coerceOutput(inputText) { return (typeof inputText === "string") ? inputText : ""; }
        setValidation(message, status) {
            if ((typeof message === "string") && (message = message.trim()).length > 0) {
                this.$Scope.validationMessage = message;
                this.$Scope.validationStatus = (isNaN(status)) ? ValidationStatus.Success : ((status === ValidationStatus.Success || status === ValidationStatus.Warning) ? status : ValidationStatus.Error);
            }
            else if (typeof status === "number" && !isNaN(status)) {
                switch (status) {
                    case ValidationStatus.Success:
                        this.$Scope.validationMessage = "";
                        this.$Scope.validationStatus = ValidationStatus.Success;
                        break;
                    case ValidationStatus.Warning:
                        this.$Scope.validationMessage = "Invalid value";
                        this.$Scope.validationStatus = ValidationStatus.Warning;
                        break;
                    default:
                        this.$Scope.validationMessage = "Invalid value";
                        this.$Scope.validationStatus = ValidationStatus.Error;
                        break;
                }
            }
            else {
                this.$Scope.validationMessage = "";
                this.$Scope.validationStatus = ValidationStatus.Success;
            }
        }
    }
    class HrefField extends FieldWithValidation {
        constructor(name, $Scope, onChangeCallback) { super(name, $Scope, onChangeCallback); }
        getValidationMessage(inputText) { return ""; }
        setValidTextAndStatus(text, message) {
            this.setValidText(text);
        }
    }
    class SchemeField extends FieldWithValidation {
        constructor(name, $Scope, onChangeCallback) { super(name, $Scope, onChangeCallback); }
        getValidationMessage(inputText) { return ""; }
    }
    class UserNameField extends FieldWithValidation {
        constructor(name, $Scope, onChangeCallback) { super(name, $Scope, onChangeCallback); }
        getValidationMessage(inputText) { return ""; }
    }
    class PasswordField extends FieldWithValidation {
        constructor(name, $Scope, onChangeCallback) { super(name, $Scope, onChangeCallback); }
        getValidationMessage(inputText) { return ""; }
    }
    class HostField extends FieldWithValidation {
        constructor(name, $Scope, onChangeCallback) { super(name, $Scope, onChangeCallback); }
        getValidationMessage(inputText) { return ""; }
    }
    class PortField extends FieldWithValidation {
        constructor(name, $Scope, onChangeCallback) { super(name, $Scope, onChangeCallback); }
        getValidationMessage(inputText) { return ""; }
    }
    class PathStringField extends FieldWithValidation {
        constructor(name, $Scope, onChangeCallback) { super(name, $Scope, onChangeCallback); }
        getValidationMessage(inputText) { return ""; }
    }
    class QueryStringField extends FieldWithValidation {
        constructor(name, $Scope, onChangeCallback) { super(name, $Scope, onChangeCallback); }
        getValidationMessage(inputText) { return ""; }
    }
    class FragmentField extends FieldWithValidation {
        constructor(name, $Scope, onChangeCallback) { super(name, $Scope, onChangeCallback); }
        getValidationMessage(inputText) { return ""; }
    }
    class UriBuilderController {
        constructor($Scope) {
            this.$Scope = $Scope;
            $Scope.href = ($Scope.$new());
            $Scope.hasOrigin = ($Scope.$new());
            $Scope.hasUsername = ($Scope.$new());
            $Scope.hasPassword = ($Scope.$new());
            $Scope.hasHost = ($Scope.$new());
            $Scope.hasPort = ($Scope.$new());
            $Scope.hasQuery = ($Scope.$new());
            $Scope.hasFragment = ($Scope.$new());
            $Scope.schemeOptions = [
                UriSchemeInfo.uriScheme_https,
                UriSchemeInfo.uriScheme_http,
                UriSchemeInfo.uriScheme_ssh,
                UriSchemeInfo.uriScheme_file,
                UriSchemeInfo.uriScheme_ldap,
                UriSchemeInfo.uriScheme_netPipe,
                UriSchemeInfo.uriScheme_netTcp,
                UriSchemeInfo.uriScheme_wais,
                UriSchemeInfo.uriScheme_mailto,
                UriSchemeInfo.uriScheme_ftp,
                UriSchemeInfo.uriScheme_ftps,
                UriSchemeInfo.uriScheme_sftp,
                UriSchemeInfo.uriScheme_git,
                UriSchemeInfo.uriScheme_news,
                UriSchemeInfo.uriScheme_nntp,
                UriSchemeInfo.uriScheme_tel,
                UriSchemeInfo.uriScheme_telnet,
                UriSchemeInfo.uriScheme_gopher,
                UriSchemeInfo.uriScheme_urn,
                { name: "", displayText: "(other)" }
            ];
            $Scope.separatorOptions = ["://", ":", ":/"];
            $Scope.selectedScheme = this._selectedScheme = ($Scope.currentScheme = this._currrentScheme = UriSchemeInfo.uriScheme_https).name;
            $Scope.selectedSeparator = $Scope.currentScheme.name;
            let controller = this;
            this._href = new HrefField("Full URI", $Scope.href, () => controller.onHrefChanged());
            this._hasOrigin = new optionField($Scope.hasOrigin, () => { controller.onHasOriginChange(); });
            this._hasUsername = new optionField($Scope.hasUsername, () => {
                controller._hasPassword.enableRelated = controller._hasUsername.isChecked;
                controller.rebuildHref();
            });
            this._hasPassword = new optionField($Scope.hasPassword, () => { controller.rebuildHref(); });
            this._hasHost = new optionField($Scope.hasHost, () => {
                controller._hasPort.enableRelated = controller._hasHost.isChecked;
                controller.rebuildHref();
            });
            this._hasPort = new optionField($Scope.hasPort, () => { controller.rebuildHref(); });
            this._hasQuery = new optionField($Scope.hasQuery, () => { controller.rebuildHref(); });
            this._hasFragment = new optionField($Scope.hasFragment, () => { controller.rebuildHref(); });
            this._scheme = new SchemeField("Scheme", $Scope.scheme, () => { controller.onSchemeChange(); });
            this._username = new UserNameField("User Name", $Scope.username, () => { controller.rebuildHref(); });
            this._password = new PasswordField("Password", $Scope.password, () => { controller.rebuildHref(); });
            this._host = new HostField("Host Name", $Scope.host, () => { controller.rebuildHref(); });
            this._port = new PortField("Port", $Scope.port, () => { controller.rebuildHref(); });
            this._pathString = new PathStringField("Path", $Scope.pathString, () => { controller.rebuildHref(); });
            this._queryString = new QueryStringField("Query", $Scope.queryString, () => { controller.rebuildHref(); });
            this._fragment = new FragmentField("Fragment", $Scope.fragment, () => { controller.rebuildHref(); });
        }
        onSchemeChange() {
            let selectedScheme = (typeof this.$Scope.selectedScheme === "string") ? this.$Scope.selectedScheme : "";
            if (selectedScheme !== this._selectedScheme) {
                if (selectedScheme.length == 0) {
                    this._selectedScheme = "";
                    this.$Scope.selectedSeparator = this._selectedSeparator = this.$Scope.currentScheme.schemeSeparator;
                    this._scheme.setValidText(this._currrentScheme.name);
                    return;
                }
                this._selectedScheme = this.$Scope.selectedScheme;
                this.$Scope.currentScheme = this._currrentScheme = UriSchemeInfo.getSchemaProperties(this._selectedScheme);
            }
            else if (this._selectedScheme.length == 0) {
                if (this._scheme.validationStatus === ValidationStatus.Error)
                    return;
                if ((this.$Scope.selectedSeparator === "://" || this.$Scope.selectedSeparator === ":/" || this.$Scope.selectedSeparator === ":"))
                    this._selectedSeparator = this.$Scope.selectedSeparator;
                else
                    this.$Scope.selectedSeparator = this._selectedSeparator;
                let scheme = UriSchemeInfo.getSchemaProperties(this._scheme.outputText);
                this.$Scope.currentScheme = this._currrentScheme = (scheme.schemeSeparator === this._selectedSeparator) ? scheme : new UriSchemeInfo(scheme.name, {
                    defaultPort: scheme.defaultPort, requiresHost: scheme.requiresHost, requiresUsername: scheme.requiresUsername, schemeSeparator: this._selectedSeparator, supportsCredentials: scheme.supportsCredentials, supportsFragment: scheme.supportsFragment,
                    supportsHost: scheme.supportsHost, supportsPath: scheme.supportsPath, supportsPort: scheme.supportsPort, supportsQuery: scheme.supportsQuery
                }, scheme.description);
            }
            this.rebuildHref();
        }
        onHasOriginChange() {
            if (this._hasOrigin.isChecked) {
                this._hasUsername.enableRelated = true;
                if (this._hasUsername.isChecked)
                    this._hasPassword.enableRelated = true;
                this._hasHost.enableRelated = true;
                if (this._hasHost.isChecked)
                    this._hasPort.enableRelated = true;
            }
            else
                this._hasUsername.enableRelated = this._hasPassword.enableRelated = this._hasHost.enableRelated = this._hasPort.enableRelated = false;
            this.rebuildHref();
        }
        rebuildHref() {
            let validationFields = [this._pathString];
            if (this._hasOrigin.isChecked) {
                if (this._selectedScheme.length == 0)
                    validationFields.push(this._scheme);
                if (this._hasUsername.isChecked) {
                    validationFields.push(this._username);
                    if (this._hasPassword.isChecked)
                        validationFields.push(this._password);
                }
                if (this._hasHost.isChecked) {
                    validationFields.push(this._host);
                    if (this._hasPort.isChecked)
                        validationFields.push(this._port);
                }
            }
            if (this._hasQuery)
                validationFields.push(this._queryString);
            if (this._hasFragment)
                validationFields.push(this._fragment);
            if (validationFields.filter((f) => f.validationStatus == ValidationStatus.Error).length > 0)
                return;
            let href = "";
            if (this._hasOrigin.isChecked) {
                href = this._currrentScheme.name + this._currrentScheme.schemeSeparator;
                if (this._hasUsername.isChecked) {
                    href += encodeURIComponent(this._username.outputText);
                    if (this._hasPassword.isChecked)
                        href += ":" + encodeURIComponent(this._password.outputText);
                    href += "@";
                }
                if (this._hasHost.isChecked) {
                    href += this._host.outputText;
                    if (this._hasPort.isChecked)
                        href += ":" + this._port.outputText;
                }
                if (this._pathString.outputText.length > 0 && !this._pathString.outputText.startsWith("/"))
                    href += "/";
                if (this._pathString.outputText.length > 0)
                    href += this._pathString.outputText;
            }
            else
                href = this._pathString.outputText;
            if (this._hasQuery.isChecked)
                href += "?" + this._queryString.outputText;
            this._href.setValidText((this._hasFragment) ? href + "#" + this._fragment.outputText : href);
        }
        onHrefChanged() {
            let href = this._href.outputText;
            let index = href.indexOf("#");
            if (index < 0) {
                this._hasFragment.setWithoutChangeNotify(false);
                this._fragment.setWithoutChangeNotify("");
            }
            else {
                this._hasFragment.setWithoutChangeNotify(true);
                this._fragment.setWithoutChangeNotify(href.substr(index + 1));
                href = href.substr(0, index);
            }
            index = href.indexOf("?");
            if (index < 0) {
                this._hasQuery.setWithoutChangeNotify(false);
                this._queryString.setWithoutChangeNotify("");
            }
            else {
                this._hasQuery.setWithoutChangeNotify(true);
                this._queryString.setWithoutChangeNotify(href.substr(index + 1));
                href = href.substr(0, index);
            }
            let scheme = getUriSchemeInfo(href);
            if (typeof scheme === "object") {
                this._hasOrigin.setWithoutChangeNotify(true);
                // TODO: Parse after scheme
                this.$Scope.currentScheme = this._currrentScheme = scheme;
                let selectedOption = this.$Scope.schemeOptions.find((value) => value.name === scheme.name && value.schemeSeparator === scheme.schemeSeparator);
                if ((typeof selectedOption === "object") && selectedOption !== null)
                    this.$Scope.selectedScheme = this._selectedScheme = scheme.name;
                else {
                    this.$Scope.selectedScheme = this._selectedScheme = "";
                    this.$Scope.selectedSeparator = scheme.schemeSeparator;
                }
                href = href.substr(scheme.name.length + scheme.schemeSeparator.length);
                // TODO: Parse for username/password
                // TODO: Parse for host/port
            }
            else {
                this._hasOrigin.setWithoutChangeNotify(false);
                this._hasUsername.setWithoutChangeNotify(false);
                this._hasPassword.setWithoutChangeNotify(false);
                this._hasHost.setWithoutChangeNotify(false);
                this._hasPort.setWithoutChangeNotify(false);
                this._username.setWithoutChangeNotify("");
                this._password.setWithoutChangeNotify("");
                this._host.setWithoutChangeNotify("");
                this._port.setWithoutChangeNotify("");
            }
            let validationFields = [this._pathString];
            if (this._hasOrigin.isChecked) {
                if (this._selectedScheme.length == 0)
                    validationFields.push(this._scheme);
                if (this._hasUsername.isChecked) {
                    validationFields.push(this._username);
                    if (this._hasPassword.isChecked)
                        validationFields.push(this._password);
                }
                if (this._hasHost.isChecked) {
                    validationFields.push(this._host);
                    if (this._hasPort.isChecked)
                        validationFields.push(this._port);
                }
            }
            if (this._hasQuery)
                validationFields.push(this._queryString);
            if (this._hasFragment)
                validationFields.push(this._fragment);
            validationFields = validationFields.filter((f) => f.validationStatus != ValidationStatus.Success);
            if (validationFields.length == 0)
                this._href.setValidation("", ValidationStatus.Success);
            else
                this._href.setValidation((validationFields.length == 1) ? validationFields[0].name + ": " + validationFields[0].validationMessage : validationFields.map((f) => f.name + ": " + f.validationMessage).join("; "), (validationFields.filter((f) => f.validationStatus == ValidationStatus.Error).length == 0) ? ValidationStatus.Warning : ValidationStatus.Error);
        }
        $onInit() {
        }
    }
    app.appModule.controller("uriBuilderController", ["$Scope", UriBuilderController]);
    const uriSchemeParseRe = /^([a-zA-Z_][-.\dA-_a-z~\ud800-\udbff]*)(:[\\/]{0,2})/;
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
    uriBuilder.getUriSchemeInfo = getUriSchemeInfo;
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
    uriBuilder.UriSchemeInfo = UriSchemeInfo;
})(uriBuilder || (uriBuilder = {}));
