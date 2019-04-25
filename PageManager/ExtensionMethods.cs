using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Management.Automation;
using System.Text.RegularExpressions;

namespace PageManager
{
    public static class ExtensionMethods
    {
        internal const string TempUri = "http://tempuri.org/";

        internal const string FileUriBase = "file:///";

        private static readonly char[] _queryAndFragmentChars = new char[] { '?', '#' };

        public static readonly Regex UrlPathSeparatorNormalizeRegex = new Regex(@"\\|/[\\/]+", RegexOptions.Compiled);

        public static readonly Regex AltPathSeparatorNormalizeRegex = new Regex(@"/|\\[\\/]+", RegexOptions.Compiled);

        public static IEnumerable<string> GetNonEmpty(this IEnumerable<string> source) { return source?.Where(s => !string.IsNullOrEmpty(s)); }

        public static IEnumerable<string> GetNonEmptyTrimmed(this IEnumerable<string> source) { return source?.Where(s => s != null).Select(s => s.Trim()).Where(s => s.Length > 0); }

        public static bool TryConvertToString(object value, out string result)
        {
            if (value == null)
                result = null;
            else
            {
                object baseObject = (value is PSObject) ? ((PSObject)value).BaseObject : value;
                if (baseObject is string)
                    result = (string)baseObject;
                else
                {
                    try { result = Convert.ToString(value); }
                    catch
                    {
                        result = null;
                        return false;
                    }
                }
            }
            return true;
        }

        public static string ConvertToString(object value, string paramName)
        {
            if (value == null)
                return null;

            object baseObject = (value is PSObject) ? ((PSObject)value).BaseObject : value;
            if (baseObject is string)
                return (string)baseObject;
            try { return Convert.ToString(value); }
            catch (Exception e)
            {
                throw new ArgumentOutOfRangeException((string.IsNullOrWhiteSpace(paramName)) ? "value" : paramName, (string.IsNullOrWhiteSpace(e.Message)) ? "Invalid parameter type." : "Invalid parameter type: " + e.Message.TrimStart());
            }
        }

        public static string ConvertToString(object value) { return ConvertToString(value, null); }

        public static bool TryConvertToStringEnumerable(object value, out IEnumerable<string> result)
        {
            if (value == null)
                result = null;
            else
            {
                object baseObject = (value is PSObject) ? ((PSObject)value).BaseObject : value;
                if (baseObject is IEnumerable<string>)
                    result = (IEnumerable<string>)baseObject;
                else if (baseObject is string)
                    result = new string[] { (string)baseObject };
                else if (baseObject is IEnumerable)
                {
                    Collection<string> collection = new Collection<string>();
                    foreach (object obj in (IEnumerable)value)
                    {
                        if (!TryConvertToString(obj, out string s))
                        {
                            result = null;
                            return false;
                        }
                        collection.Add(s);
                    }
                    result = collection;
                }
                else if (TryConvertToString(value, out string item))
                    result = new string[] { item };
                else
                {
                    result = null;
                    return false;
                }
            }
            return true;
        }

        public static IEnumerable<string> ConvertToStringEnumerable(object value, string paramName)
        {
            if (value == null)
                return null;

            object baseObject = (value is PSObject) ? ((PSObject)value).BaseObject : value;
            if (baseObject is IEnumerable<string>)
                return (IEnumerable<string>)baseObject;
            if (baseObject is string)
                return new string[] { (string)baseObject };
            try
            {
                if (baseObject is IEnumerable)
                    return ((IEnumerable)baseObject).Cast<object>().Select(ConvertToString);
                return new string[] { ConvertToString(value) };
            }
            catch (Exception e)
            {
                throw new ArgumentOutOfRangeException((string.IsNullOrWhiteSpace(paramName)) ? "value" : paramName, (string.IsNullOrWhiteSpace(e.Message)) ? "Invalid parameter type." : "Invalid parameter type: " + e.Message.TrimStart());
            }
        }

        public static IEnumerable<string> ConvertToStringEnumerable(object value) { return ConvertToStringEnumerable(value); }

        public static bool TryConvertTo<T>(object value, out T result)
        {
            if (value == null)
            {
                try { result = (T)value; }
                catch
                {
                    result = default;
                    return false;
                }
            }
            else
            {
                object baseObject = (value is PSObject) ? ((PSObject)value).BaseObject : value;
                if (baseObject is T)
                    result = (T)baseObject;
                else
                {
                    try { result = (T)Convert.ChangeType(baseObject, typeof(T)); }
                    catch
                    {
                        result = default;
                        return false;
                    }
                }
            }

            return true;
        }

        public static T ConvertTo<T>(object value, string paramName)
        {
            if (value == null)
            {
                try { return (T)value; }
                catch (Exception e) { throw new ArgumentNullException((string.IsNullOrWhiteSpace(paramName)) ? "value" : paramName, (string.IsNullOrWhiteSpace(e.Message)) ? "Parameter value not set to an instance of an object." : "Invalid parameter value: " + e.Message.TrimStart()); }
            }

            object baseObject = (value is PSObject) ? ((PSObject)value).BaseObject : value;
            if (baseObject is T)
                return (T)baseObject;
            try { return (T)Convert.ChangeType(baseObject, typeof(T)); }
            catch (Exception e)
            {
                try { return (T)Convert.ChangeType(value, typeof(T)); }
                catch { throw new ArgumentOutOfRangeException((string.IsNullOrWhiteSpace(paramName)) ? "value" : paramName, (string.IsNullOrWhiteSpace(e.Message)) ? "Invalid parameter type." : "Invalid parameter type: " + e.Message.TrimStart()); }
            }
        }

        public static T ConvertTo<T>(object value) { return ConvertTo<T>(value); }

        public static bool TryConvertToEnumerable<T>(object value, out IEnumerable<T> result)
        {
            if (value == null)
                result = null;
            else
            {
                object baseObject = (value is PSObject) ? ((PSObject)value).BaseObject : value;
                if (baseObject is T)
                    result = new T[] { (T)baseObject };
                else if (baseObject is IEnumerable<T>)
                    result = (IEnumerable<T>)baseObject;
                else if (baseObject is IEnumerable)
                {
                    Collection<T> collection = new Collection<T>();
                    foreach (object obj in (IEnumerable)value)
                    {
                        if (!TryConvertTo(obj, out T v))
                        {
                            result = null;
                            return false;
                        }
                        collection.Add(v);
                    }
                    result = collection;
                }
                else if (TryConvertTo(value, out T item))
                    result = new T[] { item };
                else
                {
                    result = default;
                    return false;
                }
            }

            return true;
        }

        public static IEnumerable<T> ConvertToEnumerable<T>(object value, string paramName)
        {
            if (value == null)
                return null;

            object baseObject = (value is PSObject) ? ((PSObject)value).BaseObject : value;
            if (baseObject is T)
                return new T[] { (T)baseObject };
            if (baseObject is IEnumerable<T>)
                return new T[] { (T)baseObject };
            try
            {
                if (baseObject is IEnumerable)
                    return ((IEnumerable)baseObject).Cast<object>().Select(ConvertTo<T>);
                return new T[] { (T)Convert.ChangeType(baseObject, typeof(T)) };
            }
            catch (Exception e)
            {
                if (value is PSObject)
                {
                    try { return new T[] { (T)Convert.ChangeType(value, typeof(T)) }; }
                    catch
                    {
                        try { return (IEnumerable<T>)Convert.ChangeType(value, typeof(IEnumerable<T>)); } catch { /* okay to ignore */ }
                    }
                }
                else
                    try { return (IEnumerable<T>)Convert.ChangeType(value, typeof(IEnumerable<T>)); } catch { /* okay to ignore */ }
                throw new ArgumentOutOfRangeException((string.IsNullOrWhiteSpace(paramName)) ? "value" : paramName, (string.IsNullOrWhiteSpace(e.Message)) ? "Invalid parameter type." : "Invalid parameter type: " + e.Message.TrimStart());
            }
        }

        public static IEnumerable<T> ConvertToEnumerable<T>(object value) { return ConvertToEnumerable<T>(value, null); }

        public static bool TryConvertToUri(object value, UriKind kind, out Uri result)
        {
            if (value != null)
            {
                object baseObject = (value is PSObject) ? ((PSObject)value).BaseObject : value;
                if (baseObject is Uri)
                {
                    result = (Uri)baseObject;
                    if (kind == UriKind.Absolute)
                        return result.IsAbsoluteUri;
                    else if (kind == UriKind.Relative)
                        return !result.IsAbsoluteUri;
                }
                else if (baseObject is string)
                {
                    if (!Uri.TryCreate((string)baseObject, kind, out result))
                        return false;
                }
                else if (!TryConvertTo<Uri>(value, out result) && !(TryConvertToString(value, out string s) && Uri.TryCreate(s, kind, out result)))
                {
                    result = null;
                    return false;
                }
            }
            else
                result = null;
            return true;
        }

        public static bool TryConvertToUri(object value, out Uri result) { return TryConvertToUri(value, UriKind.RelativeOrAbsolute, out result); }

        public static Uri ConvertToUri(object value, UriKind kind, string paramName)
        {
            if (value == null)
                return null;
            try
            {
                object baseObject = (value is PSObject) ? ((PSObject)value).BaseObject : value;
                Uri result;
                if (baseObject is Uri)
                    result = (Uri)baseObject;
                else
                {
                    if (baseObject is string)
                        return new Uri((string)baseObject, kind);
                    if (!TryConvertTo(value, out result))
                        return new Uri(ConvertToString(value), kind);
                }
                if (kind == UriKind.Absolute)
                {
                    if (!result.IsAbsoluteUri)
                        throw new UriFormatException("URI is not absolute.");
                }
                if (kind == UriKind.Relative && !result.IsAbsoluteUri)
                    throw new UriFormatException("URI is not relative.");
                return result;
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

        public static Uri ConvertToUri(object value, UriKind kind) { return ConvertToUri(value, kind, null); }

        public static Uri ConvertToUri(object value, string paramName) { return ConvertToUri(value, UriKind.RelativeOrAbsolute, paramName); }

        public static Uri ConvertToUri(object value) { return ConvertToUri(value, null); }

        public static bool TryConvertToFileUri(object value, UriKind kind, out FileUri result)
        {
            if (value != null)
            {
                object baseObject = (value is PSObject) ? ((PSObject)value).BaseObject : value;
                try
                {
                    if (baseObject is Uri)
                    {
                        result = FileUri.AsFileUri((Uri)value);
                        if (kind == UriKind.Absolute)
                        {
                            if (!result.IsAbsoluteUri)
                                throw new UriFormatException("URI is not absolute.");
                        }
                        if (kind == UriKind.Relative && !result.IsAbsoluteUri)
                            throw new UriFormatException("URI is not relative.");
                    }
                    else if (TryConvertToString(value, out string uriString))
                        result = new FileUri(uriString, kind);
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

        public static bool TryConvertToFileUri(object value, out FileUri result) { return TryConvertToFileUri(value, UriKind.RelativeOrAbsolute, out result); }

        public static FileUri ConvertToFileUri(object value, string paramName)
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
                return ConvertToFileUri((Uri)value);
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

        public static FileUri ConvertToFileUri(object value) { return ConvertToFileUri(value, null); }

        /// <summary>
        /// Parses parent path, base leaf name, leaf extension, query and fragment from a source <seealso cref="Uri"/>.
        /// </summary>
        /// <param name="uri">The source <seealso cref="Uri"/>, which can be both relative and absolute URIs.</param>
        /// <param name="ignoreTrailingSeparators"><c>true</c> if trailing separators are ignored; otherwise, a trailing separator indicates that the leaf segment is empty.</param>
        /// <param name="baseName">The base name of the leaf segment or <c>null</c> if the source <seealso cref="Uri"/> is empty or null.</param>
        /// <param name="extension">The extension of the leaf segment, which always starts with &quot;.&quot; if there is an extension. If there is no extension, then this will be an empty string.
        /// Lastly, This will be <c>null</c> if the source <seealso cref="Uri"/> is empty or null.</param>
        /// <param name="query">The URI query string (minus the leading &quot;?&quot;) or <c>null</c> if there is no query string.</param>
        /// <param name="fragment">The URI fragment (minus the leading &quot;#&quot;) or <c>null</c> if there is no fragment.</param>
        /// <returns>The parent path of the <see cref="Uri"/> or <c>null</c> if <seealso cref="Uri"/> is relative and contains no path specification.</returns>
        public static string SplitUriPath(this Uri uri, bool ignoreTrailingSeparators, out string baseName, out string extension, out string query, out string fragment)
        {
            string parentPath = SplitUriPath(uri, ignoreTrailingSeparators, out baseName, out query, out fragment);
            if (baseName == null)
            {
                extension = null;
                return parentPath;
            }
            int index = baseName.LastIndexOf(".");
            if (index > 0)
            {
                extension = baseName.Substring(index);
                baseName = baseName.Substring(0, index);
            }
            else
                extension = "";
            return parentPath;
        }

        /// <summary>
        /// Parses parent path, leaf name, query and fragment from a source <seealso cref="Uri"/>.
        /// </summary>
        /// <param name="uri">The source <seealso cref="Uri"/>, which can be both relative and absolute URIs.</param>
        /// <param name="ignoreTrailingSeparators"><c>true</c> if trailing separators are ignored; otherwise, a trailing separator indicates that the leaf segment is empty.</param>
        /// <param name="leafName">The name of the leaf segment or <c>null</c> if the source <seealso cref="Uri"/> is empty or null.</param>
        /// <param name="query">The URI query string (minus the leading &quot;?&quot;) or <c>null</c> if there is no query string.</param>
        /// <param name="fragment">The URI fragment (minus the leading &quot;#&quot;) or <c>null</c> if there is no fragment.</param>
        /// <returns>The parent path of the <see cref="Uri"/> or <c>null</c> if <seealso cref="Uri"/> is relative and contains no path specification.</returns>
        public static string SplitUriPath(this Uri uri, bool ignoreTrailingSeparators, out string leafName, out string query, out string fragment)
        {
            if (uri == null)
            {
                leafName = query = fragment = null;
                return null;
            }

            int index;
            string path;
            if (uri.IsAbsoluteUri)
            {
                path = uri.AbsolutePath;
                if (string.IsNullOrEmpty(query = uri.Query))
                    query = null;
                else if (query[0] == '?')
                    query = query.Substring(1);
                if (string.IsNullOrEmpty(fragment = uri.Fragment))
                    fragment = null;
                else if (fragment[0] == '?')
                    fragment = fragment.Substring(1);
            }
            else if (uri.OriginalString.Length == 0)
            {
                leafName = "";
                query = fragment = null;
                return null;
            }
            else
            {
                path = uri.ToString();
                index = path.IndexOfAny(_queryAndFragmentChars);
                if (index < 0)
                    query = fragment = null;
                else
                {
                    if (path[index] == '#')
                    {
                        query = null;
                        fragment = path.Substring(index + 1);
                    }
                    else
                    {
                        query = path.Substring(index + 1);
                        int i = query.IndexOf('#');
                        if (i < 0)
                            fragment = null;
                        else
                        {
                            fragment = query.Substring(i + 1);
                            query = query.Substring(0, i);
                        }
                    }
                    if (index == 0)
                    {
                        leafName = "";
                        return null;
                    }
                    path = path.Substring(0, index);
                }

                char c = '_';
                string np;
                if (path.Contains("\\"))
                {
                    np = AltPathSeparatorNormalizeRegex.Replace(path, "\\");
                    if (np != path)
                        uri = new Uri(np, UriKind.Relative);
                    path = FileUriBase;
                }
                else
                {
                    np = UrlPathSeparatorNormalizeRegex.Replace(path, "/");
                    if (np != path)
                        uri = new Uri(np, UriKind.Relative);
                    path = TempUri;
                }
                if (np.Length > 1 && np[1] == '_')
                    c = '~';
                path = (new Uri(new Uri(path + c + "/", UriKind.Absolute), uri)).AbsolutePath;
                if (path.Length > 2 && path[1] == c)
                    path = path.Substring(3);
            }

            index = path.LastIndexOf('/');
            if (index > 0 && index == path.Length - 1 && ignoreTrailingSeparators)
            {
                do { index--; } while (index > 0 && path[index] == '/');
                index = path.LastIndexOf('/');
            }
            if (index < 0)
            {
                leafName = path;
                return null;
            }
            leafName = path.Substring(index + 1);
            return path.Substring(0, index);
        }

        /// <summary>
        /// Parses parent path, base leaf name, leaf extension, query and fragment from a source <seealso cref="Uri"/>.
        /// </summary>
        /// <param name="uri">The source <seealso cref="Uri"/>, which can be both relative and absolute URIs.</param>
        /// <param name="baseName">The base name of the leaf segment or <c>null</c> if the source <seealso cref="Uri"/> is empty or null.</param>
        /// <param name="extension">The extension of the leaf segment, which always starts with &quot;.&quot; if there is an extension. If there is no extension, then this will be an empty string.
        /// Lastly, This will be <c>null</c> if the source <seealso cref="Uri"/> is empty or null.</param>
        /// <param name="query">The URI query string (minus the leading &quot;?&quot;) or <c>null</c> if there is no query string.</param>
        /// <param name="fragment">The URI fragment (minus the leading &quot;#&quot;) or <c>null</c> if there is no fragment.</param>
        /// <returns>The parent path of the <see cref="Uri"/> or <c>null</c> if <seealso cref="Uri"/> is relative and contains no path specification.</returns>
        public static string SplitUriPath(this Uri uri, out string baseName, out string extension, out string query, out string fragment) { return SplitUriPath(uri, false, out baseName, out extension, out query, out fragment); }

        /// <summary>
        /// Parses parent path, leaf name, query and fragment from a source <seealso cref="Uri"/>.
        /// </summary>
        /// <param name="uri">The source <seealso cref="Uri"/>, which can be both relative and absolute URIs.</param>
        /// <param name="leafName">The name of the leaf segment or <c>null</c> if the source <seealso cref="Uri"/> is empty or null.</param>
        /// <param name="query">The URI query string (minus the leading &quot;?&quot;) or <c>null</c> if there is no query string.</param>
        /// <param name="fragment">The URI fragment (minus the leading &quot;#&quot;) or <c>null</c> if there is no fragment.</param>
        /// <returns>The parent path of the <see cref="Uri"/> or <c>null</c> if <seealso cref="Uri"/> is relative and contains no path specification.</returns>
        public static string SplitUriPath(this Uri uri, out string leafName, out string query, out string fragment) { return SplitUriPath(uri, false, out leafName, out query, out fragment); }

        /// <summary>
        /// Parses parent path, base leaf name and leaf extension from a source <seealso cref="Uri"/>.
        /// </summary>
        /// <param name="uri">The source <seealso cref="Uri"/>, which can be both relative and absolute URIs.</param>
        /// <param name="ignoreTrailingSeparators"><c>true</c> if trailing separators are ignored; otherwise, a trailing separator indicates that the leaf segment is empty.</param>
        /// <param name="baseName">The base name of the leaf segment or <c>null</c> if the source <seealso cref="Uri"/> is empty or null.</param>
        /// <param name="extension">The extension of the leaf segment, which always starts with &quot;.&quot; if there is an extension. If there is no extension, then this will be an empty string.
        /// Lastly, This will be <c>null</c> if the source <seealso cref="Uri"/> is empty or null.</param>
        /// <returns>The parent path of the <see cref="Uri"/> or <c>null</c> if <seealso cref="Uri"/> is relative and contains no path specification.</returns>
        public static string SplitUriPath(this Uri uri, bool ignoreTrailingSeparators, out string baseName, out string extension)
        {
            string parentPath = SplitUriPath(uri, ignoreTrailingSeparators, out baseName);
            if (baseName == null)
            {
                extension = null;
                return parentPath;
            }
            int index = baseName.LastIndexOf(".");
            if (index > 0)
            {
                extension = baseName.Substring(index);
                baseName = baseName.Substring(0, index);
            }
            else
                extension = "";
            return parentPath;
        }

        /// <summary>
        /// Parses parent path and leaf name from a source <seealso cref="Uri"/>.
        /// </summary>
        /// <param name="uri">The source <seealso cref="Uri"/>, which can be both relative and absolute URIs.</param>
        /// <param name="ignoreTrailingSeparators"><c>true</c> if trailing separators are ignored; otherwise, a trailing separator indicates that the leaf segment is empty.</param>
        /// <param name="leafName">The name of the leaf segment or <c>null</c> if the source <seealso cref="Uri"/> is empty or null.</param>
        /// <returns>The parent path of the <see cref="Uri"/> or <c>null</c> if <seealso cref="Uri"/> is relative and contains no path specification.</returns>
        public static string SplitUriPath(this Uri uri, bool ignoreTrailingSeparators, out string leafName)
        {
            if (uri == null)
            {
                leafName = null;
                return null;
            }

            int index;
            string path;
            if (uri.IsAbsoluteUri)
                path = uri.AbsolutePath;
            else if (uri.OriginalString.Length == 0)
            {
                leafName = "";
                return null;
            }
            else
            {
                path = uri.ToString();
                index = path.IndexOfAny(_queryAndFragmentChars);
                if (index == 0)
                {
                    leafName = "";
                    return null;
                }
                if (index > 0)
                    path = path.Substring(0, index);

                char c = '_';
                if (path.Length > 1 && path[1] == '_')
                    c = '~';
                path = ((path.Contains("\\")) ? FileUriBase : TempUri) + c + "/";
                path = (new Uri(new Uri(path, UriKind.Absolute), uri)).AbsolutePath;
                if (path.Length > 2 && path[1] == c)
                    path = path.Substring(3);
            }

            index = path.LastIndexOf('/');
            if (index > 0 && index == path.Length - 1 && ignoreTrailingSeparators)
            {
                do { index--; } while (index > 0 && path[index] == '/');
                index = path.LastIndexOf('/');
            }
            if (index < 0)
            {
                leafName = path;
                return null;
            }
            leafName = path.Substring(index + 1);
            return path.Substring(0, index);
        }

        /// <summary>
        /// Parses parent path, base leaf name and leaf extension from a source <seealso cref="Uri"/>.
        /// </summary>
        /// <param name="uri">The source <seealso cref="Uri"/>, which can be both relative and absolute URIs.</param>
        /// <param name="baseName">The base name of the leaf segment or <c>null</c> if the source <seealso cref="Uri"/> is empty or null.</param>
        /// <param name="extension">The extension of the leaf segment, which always starts with &quot;.&quot; if there is an extension. If there is no extension, then this will be an empty string.
        /// Lastly, This will be <c>null</c> if the source <seealso cref="Uri"/> is empty or null.</param>
        /// <returns>The parent path of the <see cref="Uri"/> or <c>null</c> if <seealso cref="Uri"/> is relative and contains no path specification.</returns>
        public static string SplitUriPath(this Uri uri, out string baseName, out string extension) { return SplitUriPath(uri, out baseName, out extension); }

        /// <summary>
        /// Parses parent path and leaf name from a source <seealso cref="Uri"/>.
        /// </summary>
        /// <param name="uri">The source <seealso cref="Uri"/>, which can be both relative and absolute URIs.</param>
        /// <param name="leafName">The name of the leaf segment or <c>null</c> if the source <seealso cref="Uri"/> is empty or null.</param>
        /// <returns>The parent path of the <see cref="Uri"/> or <c>null</c> if <seealso cref="Uri"/> is relative and contains no path specification.</returns>
        public static string SplitUriPath(this Uri uri, out string leafName) { return SplitUriPath(uri, out leafName); }
    }
}
