using System;
using System.Management.Automation;
using System.Runtime.Serialization;

namespace PageManager
{
    public class FileUri : Uri, IEquatable<FileUri>, IEquatable<Uri>
    {
        public string BaseName { get; }

        public string Extension { get; }

        public string ParentPath { get; }

        public static FileUri AsFileUri(Uri uri) { return (uri == null || uri is FileUri) ? (FileUri)uri : new FileUri(uri.OriginalString, (uri.IsAbsoluteUri) ? UriKind.Absolute : UriKind.Relative); }

        public FileUri(string uriString) : base(uriString)
        {
            if ((BaseName = GetDirAndName(this, out string extension, out string dir)) == null)
                throw new UriFormatException("URI does not contain a file name");
            Extension = extension;
            ParentPath = dir;
        }

        public FileUri(Uri baseUri, Uri relativeUri) : base(baseUri, relativeUri)
        {
            if ((BaseName = GetDirAndName(this, out string extension, out string dir)) == null)
                throw new UriFormatException("URI does not contain a file name");
            Extension = extension;
            ParentPath = dir;
        }

        public FileUri(Uri baseUri, string relativeUri) : base(baseUri, relativeUri)
        {
            if ((BaseName = GetDirAndName(this, out string extension, out string dir)) == null)
                throw new UriFormatException("URI does not contain a file name");
            Extension = extension;
            ParentPath = dir;
        }

        public FileUri(string uriString, UriKind uriKind) : base(uriString, uriKind)
        {
            if ((BaseName = GetDirAndName(this, out string extension, out string dir)) == null)
                throw new UriFormatException("URI does not contain a file name");
            Extension = extension;
            ParentPath = dir;
        }

        protected FileUri(SerializationInfo serializationInfo, StreamingContext streamingContext) : base(serializationInfo, streamingContext)
        {
            BaseName = GetDirAndName(this, out string extension, out string dir) ?? "";
            Extension = extension ?? "";
            ParentPath = dir;
        }

        #region AsFileUri Methods

        public static bool TryCastAsFileUri(object value, out FileUri result)
        {
            if (value != null)
            {
                if (value is PSObject)
                    value = ((PSObject)value).BaseObject;
                try
                {
                    if (value is string)
                        result = new FileUri((string)value);
                    if (value is Uri)
                        result = AsFileUri((Uri)value);
                    else
                    {
                        result = null;
                        return false;
                    }
                }
                catch
                {
                    result = null;
                    return false;
                }
            }
            else
                result = null;
            return true;
        }

        public static FileUri AsFileUri(object value, string paramName)
        {
            try
            {
                if (value != null)
                {
                    if (value is PSObject)
                        value = ((PSObject)value).BaseObject;
                    if (value is string)
                        return new FileUri((string)value);
                }
                return AsFileUri((Uri)value);
            }
            catch (IndexOutOfRangeException) { throw; }
            catch (ArgumentNullException exception)
            {
                if (string.IsNullOrWhiteSpace(paramName))
                    paramName = "value";
                if (exception.ParamName != null && exception.ParamName == paramName)
                    throw;
                if (string.IsNullOrWhiteSpace(exception.Message))
                    throw new ArgumentNullException(paramName);
                throw new ArgumentNullException(exception.Message, paramName);
            }
            catch (ArgumentOutOfRangeException exception)
            {
                if (string.IsNullOrWhiteSpace(paramName))
                    paramName = "value";
                if (exception.ParamName != null && exception.ParamName == paramName)
                    throw;
                if (string.IsNullOrWhiteSpace(exception.Message))
                    throw new ArgumentOutOfRangeException(paramName);
                throw new ArgumentOutOfRangeException(exception.Message, paramName);
            }
            catch (ArgumentException exception)
            {
                if (string.IsNullOrWhiteSpace(paramName))
                    paramName = "value";
                if (exception.ParamName != null && exception.ParamName == paramName)
                    throw;
                throw new ArgumentException(exception.Message, paramName, exception);
            }
            catch (InvalidCastException exception) { throw new ArgumentException((string.IsNullOrWhiteSpace(exception.Message)) ? "Invalid type" : exception.Message, (string.IsNullOrWhiteSpace(paramName)) ? "value" : paramName, exception); }
        }

        public static FileUri AsFileUri(object value) { return AsFileUri(value, null); }

        #endregion

        public bool Equals(FileUri other) { return other != null && (ReferenceEquals(this, other) || base.Equals(other)); }

        public bool Equals(Uri other) { return base.Equals(other); }

        public override bool Equals(object comparand)
        {
            if (comparand != null && comparand is PSObject)
                comparand = ((PSObject)comparand).BaseObject;

            return base.Equals(comparand);
        }

        public override int GetHashCode() { return ToString().GetHashCode(); }

        private static readonly char[] _qf = new char[] { '?', '#' };

        public override string ToString()
        {
            if (IsAbsoluteUri)
                return base.ToString();
            int index = OriginalString.IndexOfAny(_qf);
            if (index < 0)
                return ((ParentPath == null) ? BaseName : ParentPath + "/" + BaseName) + Extension;

            return ((ParentPath == null) ? BaseName : ParentPath + "/" + BaseName) + Extension + OriginalString.Substring(index);
        }

        public static string GetDirAndName(Uri uri, out string extension, out string dir)
        {
            if (uri == null)
            {
                dir = extension = null;
                return null;
            }

            string path;
            if (uri.IsAbsoluteUri)
                path = uri.AbsolutePath;
            else if (uri.OriginalString.Length == 0)
            {
                dir = "";
                extension = null;
                return null;
            }
            else
            {
                Uri a = new Uri(new Uri("file:///", UriKind.Absolute), uri);
                path = (uri.OriginalString[0] != '%' && uri.OriginalString[0] != ' ' && a.AbsolutePath.Length > 1 && uri.OriginalString[0] != a.AbsolutePath[0] && uri.OriginalString[0] == a.AbsolutePath[1]) ? a.AbsolutePath.Substring(1) : a.AbsolutePath;
            }
            if (path.Length == 0 || path == "/")
            {
                dir = "";
                extension = null;
                return null;
            }
            if (path[path.Length - 1] == '/')
                path = path.Substring(path.Length - 1);

            int index = path.LastIndexOf('/');
            if (index < 0)
                dir = null;
            else if (index == 0)
            {
                dir = "";
                if (path.Length == 1)
                {
                    extension = null;
                    return null;
                }
            }
            else
                dir = path.Substring(0, index);
            path = path.Substring(index + 1);
            index = path.LastIndexOf('.');
            if (index > 0)
            {
                extension = path.Substring(index);
                return path.Substring(0, index);
            }

            extension = "";
            return path;
        }

        public static bool operator ==(FileUri uri1, FileUri uri2) { return ((object)uri1 == null) ? (object)uri2 == null : uri1.Equals(uri2); }
        public static bool operator ==(FileUri uri1, Uri uri2) { return ((object)uri1 == null) ? (object)uri2 == null : uri1.Equals(uri2); }
        public static bool operator ==(Uri uri1, FileUri uri2) { return ((object)uri2 == null) ? (object)uri1 == null : uri2.Equals(uri1); }
        public static bool operator !=(FileUri uri1, FileUri uri2) { return ((object)uri1 == null) ? (object)uri2 != null : !uri1.Equals(uri2); }
        public static bool operator !=(FileUri uri1, Uri uri2) { return ((object)uri1 == null) ? (object)uri2 != null : !uri1.Equals(uri2); }
        public static bool operator !=(Uri uri1, FileUri uri2) { return ((object)uri2 == null) ? (object)uri1 != null : !uri2.Equals(uri1); }
    }
}
