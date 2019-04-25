using System;
using System.IO;
using System.Linq;
using System.Management.Automation;
using System.Runtime.Serialization;

namespace PageManager
{
    public class FileUri : Uri, IEquatable<FileUri>, IEquatable<Uri>
    {
        /// <summary>
        /// The local file name represented by the current <see cref="FileUri"/>.
        /// </summary>
        public string FileName { get { return (Extension == null) ? BaseName : BaseName + Extension; } }

        /// <summary>
        /// The local base file name represented by the current <see cref="FileUri"/>.
        /// </summary>
        public string BaseName { get; }

        /// <summary>
        /// The extension of the local file name represented by the current <see cref="FileUri"/>.
        /// </summary>
        public string Extension { get; }

        /// <summary>
        /// The local parent path represented by the current <see cref="FileUri"/>.
        /// </summary>
        public string ParentPath { get; }

        /// <summary>
        /// If the <paramref name="source"/> <seealso cref="Uri"/> is a <seealso cref="FileUri"/>, then the <paramref name="source"/> object is returned; otherwise, it is converted to a <see cref="FileUri"/> object.
        /// </summary>
        /// <param name="source">The <seealso cref="Uri"/> to be coerced as a <see cref="FileUri"/> object.</param>
        /// <returns>The <seealso cref="Uri"/> coerced as a <see cref="FileUri"/> object.</returns>
        public static FileUri AsFileUri(Uri source) { return (source == null || source is FileUri) ? (FileUri)source : new FileUri(source.OriginalString, (source.IsAbsoluteUri) ? UriKind.Absolute : UriKind.Relative); }

        /// <summary>
        /// Gets the local base name and extension from a URI leaf name.
        /// </summary>
        /// <param name="source">The source URI leaf name.</param>
        /// <param name="extension">When this method return, contains the local file extension or an empty string if there is no extension. Lastly, this will return <c>null</c> if there the source string does not represent or have a leaf segment.</param>
        /// <returns>The local base file name (without extension) or <c>null</c> if there the source string does not represent or have a leaf segment.</returns>
        public static string ToLocalFileName(string source, out string extension)
        {
            if (string.IsNullOrEmpty(source) || (source = (new Uri(new Uri(ExtensionMethods.TempUri, UriKind.Absolute), source)).Segments?.GetNonEmpty().LastOrDefault()) == null)
            {
                extension = null;
                return null;
            }
            source = (new Uri(ExtensionMethods.FileUriBase + source)).LocalPath;
            if (string.IsNullOrEmpty(Path.GetFileName(source)) && !string.IsNullOrEmpty(extension = Path.GetDirectoryName(source)))
                source = extension;
            extension = Path.GetExtension(source);
            return Path.GetFileNameWithoutExtension(source);
        }

        /// <summary>
        /// Gets the local file name from a URI leaf name.
        /// </summary>
        /// <param name="source">The source URI leaf name.</param>
        /// <returns>The local file name (without extension) or <c>null</c> if there the source string does not represent or have a leaf segment.</returns>
        public static string ToLocalFileName(string source)
        {
            if (string.IsNullOrEmpty(source) || (source = (new Uri(new Uri(ExtensionMethods.TempUri, UriKind.Absolute), source)).Segments?.GetNonEmpty().LastOrDefault()) == null)
                return null;
            source = (new Uri(ExtensionMethods.FileUriBase + source)).LocalPath;
            string result = Path.GetFileName(source);
            if (string.IsNullOrEmpty(result) && !string.IsNullOrEmpty(result = Path.GetDirectoryName(source)))
                return Path.GetFileName(result);
            return result;
        }

        /// <summary>
        /// Initializes a new <see cref="FileUri"/> object from a formatted URI string.
        /// </summary>
        /// <param name="uriString">A formatted URI string.</param>
        /// <exception cref="ArgumentNullException"><paramref name="uriString"/> is null.</exception>
        /// <exception cref="UriFormatException"><paramref name="uriString"/> is not a valid URI string or its path does not contain a non-empty leaf segment.</exception>
        public FileUri(string uriString) : base(uriString)
        {
            ParentPath = this.SplitUriPath(true, out string baseName);
            if (string.IsNullOrEmpty(baseName))
                throw new UriFormatException("URI does not contain a file name");
            BaseName = ToLocalFileName(baseName, out string extension);
            Extension = extension;
        }

        /// <summary>
        /// Initializes a new <see cref="FileUri"/> object based on the combination of a specified base <see cref="Uri"/> and a relative <see cref="Uri"/>.
        /// </summary>
        /// <param name="baseUri">An absolute <see cref="Uri"/> that is the base for the new <see cref="FileUri"/> instance.</param>
        /// <param name="relativeUri">The relative<see cref="Uri"/> to be combined with the <paramref name="baseUri"/>.</param>
        /// <exception cref="ArgumentNullException"><paramref name="baseUri"/> is null.</exception>
        /// <exception cref="ArgumentOutOfRangeException"><paramref name="baseUri"/> is not an absolute URI.</exception>
        /// <exception cref="UriFormatException">Combining <paramref name="baseUri"/> with <paramref name="relativeUri"/> does not form a valid <see cref="FileUri"/> or the
        /// resulting <seealso cref="Uri.AbsolutePath"/> does not contain a non-empty leaf segment.</exception>
        public FileUri(Uri baseUri, Uri relativeUri) : base(baseUri, relativeUri)
        {
            ParentPath = this.SplitUriPath(true, out string baseName);
            if (string.IsNullOrEmpty(baseName))
                throw new UriFormatException("URI does not contain a file name");
            BaseName = ToLocalFileName(baseName, out string extension);
            Extension = extension;
        }

        /// <summary>
        /// Initializes a new <see cref="FileUri"/> object based on the combination of a specified base <see cref="Uri"/> and a relative formatted URI string.
        /// </summary>
        /// <param name="baseUri">An absolute <see cref="Uri"/> that is the base for the new <see cref="FileUri"/> instance.</param>
        /// <param name="relativeUri">The relative formatted URI string to be combined with the <paramref name="baseUri"/>.</param>
        /// <exception cref="ArgumentNullException"><paramref name="baseUri"/> is null.</exception>
        /// <exception cref="ArgumentOutOfRangeException"><paramref name="baseUri"/> is not an absolute URI.</exception>
        /// <exception cref="UriFormatException">Combining <paramref name="baseUri"/> with <paramref name="relativeUri"/> does not form a valid <see cref="FileUri"/> or the
        /// resulting <seealso cref="Uri.AbsolutePath"/> does not contain a non-empty leaf segment.</exception>
        public FileUri(Uri baseUri, string relativeUri) : base(baseUri, relativeUri)
        {
            ParentPath = this.SplitUriPath(true, out string baseName);
            if (string.IsNullOrEmpty(baseName))
                throw new UriFormatException("URI does not contain a file name");
            BaseName = ToLocalFileName(baseName, out string extension);
            Extension = extension;
        }

        /// <summary>
        /// Initializes a new <see cref="FileUri"/> object from a formatted URI string.
        /// </summary>
        /// <param name="uriString">A formatted URI string.</param>
        /// <param name="uriKind">Specifies whether the URI string is a relative URI, absolute URI, or is indeterminate.</param>
        /// <exception cref="ArgumentNullException"><paramref name="uriString"/> is null.</exception>
        /// <exception cref="UriFormatException"><paramref name="uriString"/> is not a valid URI string according to the specified <paramref name="uriKind"/>
        /// or its path does not contain a non-empty leaf segment.</exception>
        public FileUri(string uriString, UriKind uriKind) : base(uriString, uriKind)
        {
            ParentPath = this.SplitUriPath(true, out string baseName);
            if (string.IsNullOrEmpty(baseName))
                throw new UriFormatException("URI does not contain a file name");
            BaseName = ToLocalFileName(baseName, out string extension);
            Extension = extension;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="FileUri"/> class from the specified instances of the <seealso cref="SerializationInfo"/> and <seealso cref="StreamingContext"/> classes.
        /// </summary>
        /// <param name="serializationInfo">An instance of the <seealso cref="SerializationInfo"/> class containing the information required to serialize the new <see cref="FileUri"/> instance.</param>
        /// <param name="streamingContext">A <seealso cref="StreamingContext"/> value containing the source of the serialized stream associated with the new <see cref="FileUri"/> instance.</param>
        protected FileUri(SerializationInfo serializationInfo, StreamingContext streamingContext) : base(serializationInfo, streamingContext)
        {
            ParentPath = this.SplitUriPath(true, out string baseName);
            BaseName = ToLocalFileName(baseName, out string extension) ?? "";
            Extension = extension;
        }

        /// <summary>
        /// Initializes a new <see cref="FileUri"/> object based on the combination of a specified base <see cref="Uri"/> and a relative formatted URI path and leaf name.
        /// </summary>
        /// <param name="baseUri">An <see cref="Uri"/> that is the base for the new <see cref="FileUri"/> instance. This can be relative or absolute.</param>
        /// <param name="parentPath">The relative formatted URI path string to be combined with the <paramref name="baseUri"/>.</param>
        /// <param name="leafName">The name of the leaf segment to be appended to the combination of <paramref name="baseUri"/> and <paramref name="parentPath"/>.</param>
        /// <exception cref="ArgumentNullException"><paramref name="baseUri"/> or <paramref name="leafName"/> is null.</exception>
        /// <exception cref="ArgumentOutOfRangeException"><paramref name="leafName"/> is empty.</exception>
        /// <exception cref="UriFormatException"><paramref name="parentPath"/> or <paramref name="leafName"/> contains a fragment or query
        /// <para>-or</para>
        /// <paramref name="parentPath"/> or <paramref name="leafName"/> is an absolute URI
        /// <para>-or</para>
        /// <paramref name="leafName"/> contains a path separator or is a relative path segment name
        /// <para>-or</para>
        /// <para>Combining <paramref name="baseUri"/> with <paramref name="parentPath"/> and <paramref name="leafName"/> does not form a valid <see cref="FileUri"/></para>
        /// <para>-or</para>
        /// <para>the resulting <seealso cref="Uri.AbsolutePath"/> does not contain a non-empty leaf segment.</para></exception>
        public FileUri(Uri baseUri, string parentPath, string leafName) : base(baseUri, MakeRelativeUri(parentPath, leafName))
        {
            ParentPath = this.SplitUriPath(true, out leafName);
            if (string.IsNullOrEmpty(leafName))
                throw new UriFormatException("URI does not contain a file name");
            BaseName = ToLocalFileName(leafName, out string extension);
            Extension = extension;
        }

        internal static Uri MakeRelativeUri(string parentPath, string leafName)
        {
            if (leafName == null)
                throw new ArgumentNullException("leafName");

            if (leafName.Length == 0)
                throw new ArgumentOutOfRangeException("leafName", "Leaf name cannot be empty.");

            try
            {
                if (leafName == "." || leafName == "..")
                    throw new UriFormatException("Leaf name cannot be a relative path reference.");
                if (leafName.Contains("?"))
                    throw new UriFormatException("Leaf name cannot contain a query string.");
                if (leafName.Contains("#"))
                    throw new UriFormatException("Leaf name cannot contain a fragment.");
                if ((new Uri(leafName)).IsAbsoluteUri)
                    throw new UriFormatException("Leaf name cannot be an absolute URI");
                if ((new Uri(new Uri(ExtensionMethods.TempUri, UriKind.RelativeOrAbsolute), "/_" + leafName.Replace('.', '_'))).AbsolutePath.LastIndexOf('/') > 0)
                    throw new UriFormatException("Leaf name cannot contain path separators");
            }
            catch (Exception e)
            {
                throw new ArgumentOutOfRangeException("baseName", (string.IsNullOrWhiteSpace(e.Message)) ? "Invalid Base Name" : "Invalid Base Name: " + e.Message);
            }


            try
            {
                if (string.IsNullOrEmpty(parentPath))
                    return new Uri(leafName, UriKind.Relative);

                if (parentPath.Contains("?"))
                    throw new UriFormatException("Parent path cannot contain a query string.");
                if (parentPath.Contains("#"))
                    throw new UriFormatException("Parent path cannot contain a fragment.");
                if ((new Uri(parentPath)).IsAbsoluteUri)
                    throw new UriFormatException("Parent path cannot be an absolute URI");
                char c = parentPath[parentPath.Length - 1];
                if (c == '/' || c == '\\')
                    return new Uri(parentPath + leafName, UriKind.Relative);

                if (parentPath.Length > 1 && parentPath.Contains("\\") && !parentPath.Contains("/"))
                    return new Uri(parentPath + "\\" + leafName, UriKind.Relative);
                return new Uri(parentPath + "/" + leafName, UriKind.Relative);
            }
            catch (Exception e)
            {
                throw new ArgumentOutOfRangeException("parentPath", (string.IsNullOrWhiteSpace(e.Message)) ? "Parent path Extension" : "Parent path Extension: " + e.Message);
            }
        }

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

        /// <summary>
        /// Creates a new <see cref="FileUri"/> using the specified formatted URI string.
        /// </summary>
        /// <param name="uriString">A formatted URI string.</param>
        /// <param name="uriKind">Specifies whether the URI string is a relative URI, absolute URI, or is indeterminate.</param>
        /// <param name="result">When this method returns, contains the new <see cref="FileUri"/>.</param>
        /// <returns><c>true</c> if a <see cref="FileUri"/> was successfully created; otherwise, false.</returns>
        public static bool TryCreate(string uriString, UriKind kind, out FileUri result)
        {
            if (TryCreate(uriString, kind, out Uri uri))
            {
                string parentPath = uri.SplitUriPath(out string leafName);
                if (!string.IsNullOrEmpty(leafName))
                {
                    if (uri.IsAbsoluteUri)
                        result = new FileUri(uri, parentPath, leafName);
                    else
                        result = new FileUri((parentPath == null) ? leafName : parentPath + "/" + leafName);
                    return true;
                }
            }
            result = null;
            return false;
        }

        public static bool operator ==(FileUri uri1, FileUri uri2) { return ((object)uri1 == null) ? (object)uri2 == null : uri1.Equals(uri2); }
        public static bool operator ==(FileUri uri1, Uri uri2) { return ((object)uri1 == null) ? (object)uri2 == null : uri1.Equals(uri2); }
        public static bool operator ==(Uri uri1, FileUri uri2) { return ((object)uri2 == null) ? (object)uri1 == null : uri2.Equals(uri1); }
        public static bool operator !=(FileUri uri1, FileUri uri2) { return ((object)uri1 == null) ? (object)uri2 != null : !uri1.Equals(uri2); }
        public static bool operator !=(FileUri uri1, Uri uri2) { return ((object)uri1 == null) ? (object)uri2 != null : !uri1.Equals(uri2); }
        public static bool operator !=(Uri uri1, FileUri uri2) { return ((object)uri2 == null) ? (object)uri1 != null : !uri2.Equals(uri1); }
    }
}
