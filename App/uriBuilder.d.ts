/// <reference path="../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.d.ts" />
/// <reference path="app.d.ts" />
declare namespace uriBuilder {
}
declare namespace uriBuilder_old {
    type UriSchemeSeparator = "://" | ":/" | ":";
    type UriPathSegmentSeparator = "/" | "\\" | ":";
    function getUriSchemeInfo(uri: string): UriSchemeInfo | undefined;
    interface IUriSchemeOption extends IUriSchemeProperties {
        name: string;
        displayText: string;
        description?: string;
        schemeSeparator: UriSchemeSeparator;
    }
    interface IUriSchemeProperties {
        supportsPath?: boolean;
        supportsQuery?: boolean;
        supportsFragment?: boolean;
        supportsCredentials?: boolean;
        requiresHost?: boolean;
        supportsHost?: boolean;
        supportsPort?: boolean;
        requiresUsername?: boolean;
        schemeSeparator?: UriSchemeSeparator;
        defaultPort?: number;
    }
    class UriSchemeInfo implements IUriSchemeOption {
        readonly name: string;
        readonly description: string;
        readonly supportsPath: boolean;
        readonly supportsQuery: boolean;
        readonly supportsFragment: boolean;
        readonly supportsCredentials: boolean;
        readonly supportsHost: boolean;
        readonly requiresHost: boolean;
        readonly supportsPort: boolean;
        readonly requiresUsername: boolean;
        readonly defaultPort: number;
        readonly schemeSeparator: UriSchemeSeparator;
        readonly displayText: string;
        constructor(name: string, properties?: IUriSchemeProperties, description?: string);
        static getSchemaProperties(name: string): UriSchemeInfo;
        /**
         * File Transfer protocol
         **/
        static readonly uriScheme_ftp: UriSchemeInfo;
        /**
         * File Transfer protocol (secure)
         **/
        static readonly uriScheme_ftps: UriSchemeInfo;
        /**
         * Secure File Transfer Protocol
         **/
        static readonly uriScheme_sftp: UriSchemeInfo;
        /**
         * Hypertext Transfer Protocol
         **/
        static uriScheme_http: UriSchemeInfo;
        /**
         * Hypertext Transfer Protocol (secure)
         **/
        static uriScheme_https: UriSchemeInfo;
        /**
         * Gopher protocol
         **/
        static uriScheme_gopher: UriSchemeInfo;
        /**
         * Electronic mail address
         **/
        static uriScheme_mailto: UriSchemeInfo;
        /**
         * USENET news
         **/
        static uriScheme_news: UriSchemeInfo;
        /**
         * USENET news using NNTP access
         **/
        static uriScheme_nntp: UriSchemeInfo;
        /**
         * Reference to interactive sessions
         **/
        static uriScheme_telnet: UriSchemeInfo;
        /**
         * Wide Area Information Servers
         **/
        static uriScheme_wais: UriSchemeInfo;
        /**
         * Host-specific file names
         **/
        static uriScheme_file: UriSchemeInfo;
        /**
         * Net Pipe
         **/
        static uriScheme_netPipe: UriSchemeInfo;
        /**
         * Net-TCP
         **/
        static uriScheme_netTcp: UriSchemeInfo;
        /**
         * Lightweight Directory Access Protocol
         **/
        static uriScheme_ldap: UriSchemeInfo;
        /**
         * Lightweight Directory Access Protocol
         **/
        static uriScheme_ssh: UriSchemeInfo;
        /**
         * GIT Respository
         **/
        static uriScheme_git: UriSchemeInfo;
        /**
         * Telephone Number
         **/
        static uriScheme_tel: UriSchemeInfo;
        /**
         * Uniform Resource notation
         **/
        static uriScheme_urn: UriSchemeInfo;
    }
}
