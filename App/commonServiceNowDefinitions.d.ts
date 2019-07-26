declare namespace sn {
    export interface GlideElement {
        /**
         * Gets the object label.
         * @returns {string} The object label.
         */
        getLabel(): string;
        /**
         * Gets the name of the field.
         * @returns {string} The name of the field.
         */
        getName(): string;
        /**
         * Determines if a field is null.
         * @returns {boolean} True if the field is null or an empty string, false if not.
         */
        nil(): boolean;
        /**
         * Sets the value of a field.
         * @param {*} value Object value to set the field to.
         */
        setValue(value: any): void;
        /**
         * Converts the value to a string.
         * @returns {string} The value as a string
         */
        toString(): string;
    }
    export interface GlideRecord {
        readonly sys_id: GlideElement;
        [key: string]: GlideElement | any;
        /**
         * Retrieves the string value of an underlying element in a field.
         * @param {string} name The name of the field to get the value from.
         * @returns {string|null|undefined} The value of the field.
         */
        getValue(name: string): string | null | undefined;
        /**
         * Indicates whether the user's role permits them to read the associated GlideRecord.
         * @returns {boolean} True if the field can be read, false otherwise.
         */
        canRead(): boolean;
        /**
         * Determines whether the user's role permits them to write to the associated GlideRecord.
         * @returns {boolean} True if the user can write to the field, false otherwis.
         */
        canWrite(): boolean;
        /**
         * Retrieves the string value of an underlying element in a field.
         * @param {string} name The name of the field to get the value from.
         * @returns {string|null|undefined} The value of the field.
         */
        getValue(name: string): string | null | undefined;
        /**
         * Checks if the current record is a new record that has not yet been inserted into the database.
         * @returns {boolean} True if the record is new and has not been inserted into the database.
         */
        isNewRecord(): boolean;
    }
    export interface GlideSession {
        isInteractive(): boolean;
        isLoggedIn(): boolean;
    }
    class Emulated_GlideSession implements GlideSession {
        private _isInteractive;
        private _isLoggedIn;
        private _errorMessages;
        private _infoMessages;
        private _logCache;
        private _service;
        constructor(_isInteractive: boolean, _isLoggedIn: boolean);
        isInteractive(): boolean;
        isLoggedIn(): boolean;
        addErrorMessage(message: any): void;
        addInfoMessage(message: any): void;
        debug(message: any): void;
        error(message: any): void;
        warn(message: any): void;
        info(message: any): void;
        getErrorMessages(clear?: boolean): string[];
        getInfoMessages(clear?: boolean): string[];
        attachNotificationMessageService(service: app.NotificationMessageService): void;
    }
    export interface GlideSystem {
        /**
         * Adds an error message for the current session.
         * @param {*} message The message to add.
         */
        addErrorMessage(message: any): void;
        /**
         * Adds an info message for the current session. This method is not supported for asynchronous business rules.
         * @param {*} message An info message object.
         */
        addInfoMessage(message: any): void;
        /**
         * Adds an info message for the current session. This method is not supported for asynchronous business rules.
         * @param {string} message The log message with place holders for any variable arguments.
         * @param {*} [parm1] First variable argument.
         * @param {*} [parm2] Second variable argument.
         * @param {*} [parm3] Third variable argument.
         * @param {*} [parm4] Fourth variable argument.
         * @param {*} [parm5] Fifth variable argument.
         */
        debug(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;
        /**
         * Writes an error message to the system log.
         * @param {string} message The log message with place holders for any variable arguments.
         * @param {*} [parm1] First variable argument.
         * @param {*} [parm2] Second variable argument.
         * @param {*} [parm3] Third variable argument.
         * @param {*} [parm4] Fourth variable argument.
         * @param {*} [parm5] Fifth variable argument.
         */
        error(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;
        /**
         * Returns the list of error messages for the session that were added by addErrorMessage().
         * @returns {string[]} List of error messages.
         */
        getErrorMessages(): string[];
        /**
         * Gets a reference to the current Glide session.
         * @returns {GlideSession} A reference for the current session.
         */
        getSession(): GlideSession;
        /**
         * Writes an info message to the system log.
         * @param {string} message The log message with place holders for any variable arguments.
         * @param {*} [parm1] First variable argument.
         * @param {*} [parm2] Second variable argument.
         * @param {*} [parm3] Third variable argument.
         * @param {*} [parm4] Fourth variable argument.
         * @param {*} [parm5] Fifth variable argument.
         */
        info(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;
        /**
         * Determines if debugging is active for a specific scope.
         * @returns {boolean} True if either session debugging is active or the log level is set to debug for the specified scope.
         */
        isDebugging(): boolean;
        /**
         * Checks if the current session is interactive. An example of an interactive session is when a user logs in normally. An example of a non-interactive session is using a SOAP request to retrieve data.
         * @returns {boolean} True if the session is interactive.
         */
        isInteractive(): boolean;
        /**
         * Determines if the current user is currently logged in.
         * @returns {boolean} True if the current user is logged in.
         */
        isLoggedIn(): boolean;
        /**
         * Queries an object and returns true if the object is null, undefined, or contains an empty string.
         * @param {*} o The object to be checked.
         * @returns {boolean} True if the object is null, undefined, or contains an empty string; otherwise, returns false.
         */
        nil<T>(o?: T | null): o is null | undefined;
        /**
         * Writes a warning message to the system log.
         * @param {string} message The log message with place holders for any variable arguments.
         * @param {*} [parm1] First variable argument.
         * @param {*} [parm2] Second variable argument.
         * @param {*} [parm3] Third variable argument.
         * @param {*} [parm4] Fourth variable argument.
         * @param {*} [parm5] Fifth variable argument.
         */
        warn(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;
    }
    class Emulated_GlideSystem implements GlideSystem {
        private _session;
        constructor(_session: Emulated_GlideSession);
        addErrorMessage(message: any): void;
        addInfoMessage(message: any): void;
        debug(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;
        error(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;
        getErrorMessages(): string[];
        getSession(): GlideSession;
        info(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;
        isDebugging(): boolean;
        isInteractive(): boolean;
        isLoggedIn(): boolean;
        nil<T>(o?: T | null): o is null | undefined;
        warn(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;
    }
    export const gs: Emulated_GlideSystem;
    export {};
}
declare namespace sn_emulation_helpers {
    class Emulated_GlideElement implements sn.GlideElement {
        private readonly _gr;
        private _value;
        private _name;
        private readonly _label;
        constructor(_gr: sn.GlideRecord, _value: any | null | undefined, _name: string, label?: string);
        getLabel(): string;
        getName(): string;
        canRead(): boolean;
        canWrite(): boolean;
        setValue(value: any): void;
        nil(): boolean;
        toString(): string;
        belongsToEmulatedRecord(gr: Emulated_GlideRecord): boolean;
    }
    class Emulated_SysId extends Emulated_GlideElement {
        private readonly _instance;
        static toSysIdString(obj: any | null | undefined, newIfNotValid?: boolean): string;
        static NewSysId(): string;
        constructor(gr: sn.GlideRecord, value?: string);
        static areSame(x: Emulated_SysId, y: sn.GlideElement): y is Emulated_SysId;
    }
    class Emulated_GlideRecord implements sn.GlideRecord {
        private _sys_id;
        private _labels;
        [key: string]: sn.GlideElement | any;
        readonly sys_id: sn.GlideElement;
        constructor(values?: {
            [key: string]: any | null | undefined;
        });
        protected __addElement(name: string, value: any | null | undefined, label?: string): void;
        protected __getElement(name: string): Emulated_GlideElement | undefined;
        getValue(name: string): string;
        canRead(): boolean;
        canWrite(): boolean;
        setValue(name: string, value: any): void;
        isNewRecord(): boolean;
    }
}
