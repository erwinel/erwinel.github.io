var sn;
(function (sn) {
    class Emulated_GlideSession {
        constructor(_isInteractive, _isLoggedIn) {
            this._isInteractive = _isInteractive;
            this._isLoggedIn = _isLoggedIn;
            this._errorMessages = [];
            this._infoMessages = [];
            this._logCache = [];
        }
        isInteractive() { return this._isInteractive; }
        isLoggedIn() { return this._isLoggedIn; }
        addErrorMessage(message) {
            this._errorMessages.push(message);
            let service = this._service;
            if (typeof service === "object" && service != null)
                service.addNotificationMessage(message, "Emulated Glide Session Message", notificationMessageService.NotificationMessageType.error);
        }
        addInfoMessage(message) {
            this._infoMessages.push(message);
            let service = this._service;
            if (typeof service === "object" && service != null)
                service.addNotificationMessage(message, "Emulated Glide Session Message", notificationMessageService.NotificationMessageType.info);
        }
        debug(message) {
            let service = this._service;
            if (typeof service === "object" && service != null)
                service.$log.debug({ type: "Emulated Glide Session Log Message", message: message });
            else
                this._logCache.push({ level: "debug", message: message });
        }
        error(message) {
            let service = this._service;
            if (typeof service === "object" && service != null)
                service.$log.error({ type: "Emulated Glide Session Log Message", message: message });
            else
                this._logCache.push({ level: "error", message: message });
        }
        warn(message) {
            let service = this._service;
            if (typeof service === "object" && service != null)
                service.$log.warn({ type: "Emulated Glide Session Log Message", message: message });
            else
                this._logCache.push({ level: "warn", message: message });
        }
        info(message) {
            let service = this._service;
            if (typeof service === "object" && service != null)
                service.$log.info({ type: "Emulated Glide Session Log Message", message: message });
            else
                this._logCache.push({ level: "info", message: message });
        }
        getErrorMessages(clear) {
            let result = this._errorMessages;
            if (clear === true)
                this._errorMessages = [];
            return result;
        }
        getInfoMessages(clear) {
            let result = this._infoMessages;
            if (clear === true)
                this._infoMessages = [];
            return result;
        }
        attachNotificationMessageService(service) {
            this._service = service;
            if ((typeof service !== "object") || service == null)
                return;
            let logCache = this._logCache;
            this._logCache = [];
            let errorMessages = this._errorMessages;
            let infoMessages = this._infoMessages;
            logCache.forEach((value) => {
                switch (value.level) {
                    case "error":
                        service.$log.error({ type: "Emulated Glide Session Log Message", message: value.message });
                        break;
                    case "warn":
                        service.$log.warn({ type: "Emulated Glide Session Log Message", message: value.message });
                        break;
                    case "info":
                        service.$log.info({ type: "Emulated Glide Session Log Message", message: value.message });
                        break;
                    default:
                        service.$log.debug({ type: "Emulated Glide Session Log Message", message: value.message });
                        break;
                }
            });
            errorMessages.forEach((message) => service.addNotificationMessage(message, "Emulated Glide Session Message", notificationMessageService.NotificationMessageType.error));
            infoMessages.forEach((message) => service.addNotificationMessage(message, "Emulated Glide Session Message", notificationMessageService.NotificationMessageType.info));
        }
    }
    class Emulated_GlideSystem {
        constructor(_session) {
            this._session = _session;
        }
        addErrorMessage(message) { this._session.addErrorMessage(message); }
        addInfoMessage(message) { this._session.addInfoMessage(message); }
        debug(message, parm1, parm2, parm3, parm4, parm5) { this._session.debug(sys.stringFormat(message, parm1, parm2, parm3, parm4, parm5)); }
        error(message, parm1, parm2, parm3, parm4, parm5) { this._session.error(sys.stringFormat(message, parm1, parm2, parm3, parm4, parm5)); }
        getErrorMessages() { return this._session.getErrorMessages(); }
        getSession() { return this._session; }
        info(message, parm1, parm2, parm3, parm4, parm5) { this._session.info(sys.stringFormat(message, parm1, parm2, parm3, parm4, parm5)); }
        isDebugging() { return true; }
        isInteractive() { return this._session.isInteractive(); }
        isLoggedIn() { return this._session.isLoggedIn(); }
        nil(o) { return sys.isNil(o); }
        warn(message, parm1, parm2, parm3, parm4, parm5) { this._session.warn(sys.stringFormat(message, parm1, parm2, parm3, parm4, parm5)); }
    }
    sn.gs = new Emulated_GlideSystem(new Emulated_GlideSession(true, true));
})(sn || (sn = {}));
var sn_emulation_helpers;
(function (sn_emulation_helpers) {
    class Emulated_GlideElement {
        constructor(_gr, _value, _name, label) {
            this._gr = _gr;
            this._value = _value;
            this._name = _name;
            this._label = ((typeof label === "string") && (label = label.trim()).length > 0) ? label : _name;
        }
        getLabel() { return this._label; }
        getName() { return this._name; }
        canRead() { return true; }
        canWrite() { return true; }
        setValue(value) { this._value = (isGlideElement(value)) ? ((value instanceof Emulated_GlideElement) ? value._value : value.toString()) : value; }
        nil() { return sys.isNil(this._value); }
        toString() {
            let value = this._value;
            return (sys.isNil(value)) ? "" : ((typeof value === "string") ? value : value + "");
        }
        belongsToEmulatedRecord(gr) {
            return Emulated_SysId.areSame(gr.sys_id, this._gr.sys_id);
        }
    }
    sn_emulation_helpers.Emulated_GlideElement = Emulated_GlideElement;
    function isGlideElement(obj) {
        return (typeof obj === "object") && obj !== null && !Array.isArray(obj) && (typeof obj["getLabel"] === "function") && (typeof obj["getName"] === "function") && (typeof obj["nil"] === "function");
    }
    class Emulated_SysId extends Emulated_GlideElement {
        constructor(gr, value) {
            super(gr, Emulated_SysId.toSysIdString(value, true), "sys_id", "Sys ID");
            this._instance = Symbol();
        }
        static toSysIdString(obj, newIfNotValid) {
            let sys_id = (isGlideElement(obj)) ? obj.toString() : ((typeof obj === "string") ? obj : ((sys.isNil(obj)) ? "" : obj + ""));
            if ((sys_id = sys_id.trim()).length == 32 && sys_id.match(/^[\da-f]+$/i))
                return sys_id.toLowerCase();
            if (newIfNotValid === true)
                return Emulated_SysId.NewSysId();
        }
        static NewSysId() {
            let value = "";
            let rv = [];
            for (let i = 0; i < 32; i++)
                rv.push(Math.round(Math.random() * 255.0).toString(16));
            return rv.join("");
        }
        static areSame(x, y) {
            return (typeof x === "object") && (typeof y === "object") && ((x === null) ? y === null : (y != null && (y instanceof Emulated_SysId) && x._instance === y._instance));
        }
    }
    sn_emulation_helpers.Emulated_SysId = Emulated_SysId;
    class Emulated_GlideRecord {
        constructor(values) {
            this._labels = {};
            let sys_id;
            if (typeof values === "object" && values !== null && !Array.isArray(values)) {
                for (let n in values) {
                    let obj = values[n];
                    if (n === "sys_id")
                        sys_id = values[n];
                    else if (isGlideElement(obj)) {
                        let o = obj.getName();
                        if (sys.isNil(o) || o === n) {
                            let label = obj.getLabel();
                            this._labels[n] = ((typeof label === "string") && label.trim().length > 0) ? label : n;
                        }
                        else
                            this._labels[n] = n;
                        this[n] = new Emulated_GlideElement(this, obj.toString(), n, this._labels[n]);
                    }
                    else {
                        this._labels[n] = n;
                        this[n] = new Emulated_GlideElement(this, obj, n, n);
                    }
                }
            }
            this._sys_id = new Emulated_SysId(this, sys_id);
            this._labels[this._sys_id.getName()] = this._sys_id.getLabel();
        }
        get sys_id() { return; }
        __addElement(name, value, label) {
            if (typeof label === "string" && label.trim().length > 0)
                this._labels[name] = label;
            else if (typeof this._labels[name] !== "string")
                this._labels[name] = name;
            if (isGlideElement(value)) {
                if (value instanceof Emulated_GlideElement && value.belongsToEmulatedRecord(this) && value.getName() === name)
                    this[name] = value;
                else
                    this[name] = new Emulated_GlideElement(this, value.toString(), name, this._labels[name]);
            }
            else
                this[name] = new Emulated_GlideElement(this, value, name, this._labels[name]);
        }
        __getElement(name) {
            if (typeof name === "string" && (name = name.trim()).length > 0) {
                let obj = this[name];
                let label;
                if (typeof obj !== "undefined") {
                    let result;
                    if ((typeof obj === "object") && obj !== null && isGlideElement(obj)) {
                        if (obj instanceof Emulated_GlideElement && obj.belongsToEmulatedRecord(this) && obj.getName() === name)
                            label = (result = obj).getLabel();
                        else {
                            if (obj.getName() === name) {
                                let label = obj.getLabel();
                                if (typeof label === "string" && label.trim().length == 0)
                                    label = this._labels[name];
                            }
                            else
                                label = this._labels[name];
                            result = new Emulated_GlideElement(this, null, name, (typeof label === "string") ? label : name);
                            this[name] = result;
                        }
                    }
                    else {
                        label = this._labels[name];
                        result = new Emulated_GlideElement(this, obj, name, (typeof label === "string") ? label : name);
                        this[name] = result;
                    }
                    if (typeof this._labels[name] !== "string")
                        this._labels[name] = label;
                    return result;
                }
            }
        }
        getValue(name) {
            let element = this.__getElement(name);
            if (typeof element !== null)
                return element.toString();
        }
        canRead() { return true; }
        canWrite() { return false; }
        setValue(name, value) {
            let element = this.__getElement(name);
            if (typeof element !== null)
                element.setValue(value);
            else
                this.__addElement(name, value);
        }
        isNewRecord() { return false; }
    }
    sn_emulation_helpers.Emulated_GlideRecord = Emulated_GlideRecord;
})(sn_emulation_helpers || (sn_emulation_helpers = {}));
//# sourceMappingURL=commonServiceNowDefinitions.js.map