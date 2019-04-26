using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Management.Automation;
using System.Management.Automation.Host;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Xml;
using System.Xml.Resolvers;
using System.Xml.Serialization;

namespace PageManager
{
    [XmlRoot(ElementName_Page)]
    public partial class HtmlPage : IEquatable<HtmlPage>
    {
        public static readonly Regex NormalizeWhitespaceRegex = new Regex(@"\p{C}[\s\p{C}]*| [\s\p{C}]+", RegexOptions.Compiled);
        public static readonly Regex AngularIdentifierName = new Regex(@"^[a-z_][a-z\d_]*$", RegexOptions.IgnoreCase | RegexOptions.Compiled);
        public static readonly Regex ItemUrlRegex = new Regex(@"^(?<a>file:///|http(s)?://[\w\-]+(?:\.[\w\-]+)*)?(?<p>/?((?=[^/]+/(?![?#]|$))[\w \-._~:\[\]@!\$&'()*+,;=]+/)*)(?<n>[\w \-._~:\[\]@!\$&'()*+,;=]+)/?(?<q>\?[\w \-._~:/?\[\]@!\$&'()*+,;=]*)?(?<f>#[\w \-._~:/?#\[\]@!\$&'()*+,;=]*)?$");

        public const string ElementName_Pages = "Pages";
        public const string ElementName_Page = "Page";
        public const string ElementName_OtherCssUrls = "OtherCssUrls";
        public const string ElementName_OtherJsUrls = "OtherJsUrls";
        public const string ElementName_Url = "Url";
        public const string AttributeName_Heading = "Heading";
        public const string AttributeName_FileName = "FileName";
        public const string AttributeName_LinkName = "LinkName";
        public const string AttributeName_Title = "Title";
        public const string AttributeName_NgApp = "ng-app";
        public const string AttributeName_NgController = "ng-controller";
        public const string AttributeName_AngularScriptUri = "AngularScriptUri";

        private Collection _childPages = null;
        private Collection _parentCollection = null;
        private FileUriCollection.UriStrings _otherCssUrls = new FileUriCollection.UriStrings();
        private FileUriCollection.UriStrings _otherJsUrls = new FileUriCollection.UriStrings();
        private string _heading = null;
        private string _fileName = null;
        private string _linkName = null;
        private string _title = null;
        private string _ngApp = null;
        private string _ngController = null;

        [XmlIgnore]
        public FileUri AngularScriptUri { get; set; }

        [XmlAttribute(AttributeName = AttributeName_AngularScriptUri)]
        [EditorBrowsable(EditorBrowsableState.Never)]
        public string __AttributeName_AngularScriptUri
        {
            get
            {
                FileUri uri = AngularScriptUri;
                return (uri == null) ? null : uri.ToString();
            }
            set
            {
                Monitor.Enter(SyncRoot);
                try { AngularScriptUri = (string.IsNullOrWhiteSpace(value)) ? null : ExtensionMethods.ConvertToFileUri(value); }
                finally { Monitor.Exit(SyncRoot); }
            }
        }

        [XmlArray(ElementName = ElementName_Page, IsNullable = false)]
        public Collection ChildPages
        {
            get
            {
                Monitor.Enter(SyncRoot);
                try
                {
                    if (_childPages == null)
                        (new Collection()).Parent = this;
                    return _childPages;
                }
                finally { Monitor.Exit(SyncRoot); }
            }
            set
            {
                Monitor.Enter(SyncRoot);
                try
                {
                    if (value == null)
                    {
                        if (_childPages != null)
                            _childPages.Parent = null;
                    }
                    else
                    {
                        if (_childPages != null)
                        {
                            if (!ReferenceEquals(_childPages, value))
                                return;
                            _childPages.Parent = null;
                        }
                        value.Parent = this;
                    }
                    _childPages = value;
                }
                finally { Monitor.Exit(SyncRoot); }
            }
        }

        [XmlAttribute(AttributeName = AttributeName_Title)]
        [EditorBrowsable(EditorBrowsableState.Never)]
        public string __Title
        {
            get
            {
                string value = _title;
                return (value == null || _fileName != value) ? value : null;
            }
            set { Title = value; }
        }

        [XmlIgnore]
        public string Title
        {
            get { return ((_title ?? _heading) ?? _linkName) ?? _fileName; }
            set
            {
                Monitor.Enter(SyncRoot);
                try { _title = AsNormalizedString(value, true); }
                finally { Monitor.Exit(SyncRoot); }
            }
        }

        [XmlAttribute(AttributeName = AttributeName_Heading)]
        [EditorBrowsable(EditorBrowsableState.Never)]
        public string __Heading
        {
            get
            {
                string value = _heading;
                string title;
                return (value == null || (((title = _title) == null || title != value) && _fileName != value)) ? value : null;
            }
            set { Heading = value; }
        }

        [XmlIgnore]
        public string Heading
        {
            get { return ((_heading ?? _title) ?? _linkName) ?? _fileName; }
            set
            {
                Monitor.Enter(SyncRoot);
                try { _heading = AsNormalizedString(value, true); }
                finally { Monitor.Exit(SyncRoot); }
            }
        }

        [XmlAttribute(AttributeName = AttributeName_LinkName)]
        [EditorBrowsable(EditorBrowsableState.Never)]
        public string __LinkName
        {
            get
            {
                string value = _linkName;
                string title;
                return (value == null || (((title = _title) == null || title != value) && _fileName != value)) ? value : null;
            }
            set { LinkName = value; }
        }

        [XmlIgnore]
        public string LinkName
        {
            get { return ((_linkName ?? _title) ?? _heading) ?? _fileName; }
            set
            {
                Monitor.Enter(SyncRoot);
                try { _linkName = AsNormalizedString(value, true); }
                finally { Monitor.Exit(SyncRoot); }
            }
        }

        [XmlAttribute(AttributeName = AttributeName_FileName)]
        public string FileName
        {
            get { return _fileName; }
            set
            {
                if (value == null)
                    throw new ArgumentNullException();
                string s = AsNormalizedString(value, true);
                if (s == null)
                    throw new ArgumentOutOfRangeException("Name cannot be empty");
                Monitor.Enter(SyncRoot);
                try
                {
                    switch (Path.GetExtension(s).ToLower())
                    {
                        case ".html":
                        case ".htm":
                            _fileName = Path.GetFileNameWithoutExtension(s);
                            break;
                        default:
                            _fileName = Path.GetFileName(s);
                            break;
                    }
                }
                catch (Exception e)
                {
                    throw new ArgumentOutOfRangeException((string.IsNullOrWhiteSpace(e.Message)) ? "Invalid name" : "Invalid name: " + e.Message.TrimStart());
                }
                finally { Monitor.Exit(SyncRoot); }
            }
        }

        [XmlAttribute(AttributeName = AttributeName_NgApp)]
        public string NgApp
        {
            get { return _ngApp; }
            set
            {
                Monitor.Enter(SyncRoot);
                try
                {
                    string ngApp;
                    if (value == null || (ngApp = value.Trim()).Length == 0)
                        _ngApp = null;
                    else
                    {
                        if (!AngularIdentifierName.IsMatch(ngApp))
                            throw new ArgumentOutOfRangeException("Invalid Angular Application Name");
                        _ngApp = ngApp;
                    }
                }
                finally { Monitor.Exit(SyncRoot); }
            }
        }

        [XmlAttribute(AttributeName = AttributeName_NgController)]
        public string NgController
        {
            get { return _ngController; }
            set
            {
                Monitor.Enter(SyncRoot);
                try
                {
                    string ngController;
                    if (value == null || (ngController = value.Trim()).Length == 0)
                        _ngController = null;
                    else
                    {
                        if (!AngularIdentifierName.IsMatch(ngController))
                            throw new ArgumentOutOfRangeException("Invalid Angular Controller Name");
                        _ngController = ngController;
                    }
                }
                finally { Monitor.Exit(SyncRoot); }
            }
        }

        [XmlIgnore]
        public bool UsesAngular { get { return NgApp == null && NgController == null && AngularScriptUri == null; } }

        [XmlIgnore]
        public FileUriCollection OtherCssUrls { get { return _otherCssUrls.InnerList; } }

        [XmlArray(ElementName = ElementName_OtherCssUrls, IsNullable = false)]
        [EditorBrowsable(EditorBrowsableState.Never)]
        public FileUriCollection.UriStrings __OtherCssUrls
        {
            get { return _otherCssUrls; }
            set
            {
                Monitor.Enter(SyncRoot);
                try { _otherCssUrls = value ?? new FileUriCollection.UriStrings(); }
                finally { Monitor.Exit(SyncRoot); }
            }
        }

        [XmlIgnore]
        public FileUriCollection OtherJsUrls { get { return _otherJsUrls.InnerList; } }

        [XmlArray(ElementName = ElementName_OtherJsUrls, IsNullable = false)]
        [EditorBrowsable(EditorBrowsableState.Never)]
        public FileUriCollection.UriStrings __OtherJsUrls
        {
            get { return _otherJsUrls; }
            set
            {
                Monitor.Enter(SyncRoot);
                try { _otherJsUrls = value ?? new FileUriCollection.UriStrings(); }
                finally { Monitor.Exit(SyncRoot); }
            }
        }

        [XmlIgnore]
        public HtmlPage Parent
        {
            get
            {
                Monitor.Enter(SyncRoot);
                try { return (_parentCollection == null) ? null : _parentCollection.Parent; }
                finally { Monitor.Exit(SyncRoot); }
            }
        }

        [XmlIgnore]
        public object SyncRoot { get; } = new object();

        private XmlElement _content = null;

        [XmlIgnore]
        public XmlElement Content
        {
            get
            {
                Monitor.Enter(SyncRoot);
                try
                {
                    if (_content == null)
                    {
                        HtmlReaderWriter.CreateHtml5Document(GetSideNavItems().Count > 0, out XmlElement content);
                        _content = content;
                    }
                    return _content;
                }
                finally { Monitor.Exit(SyncRoot); }
            }
            set
            {
                Monitor.Enter(SyncRoot);
                try { _content = value; }
                finally { Monitor.Exit(SyncRoot); }
            }
        }

        public Collection GetTopLevelNavItems()
        {
            HtmlPage parent = Parent;
            if (parent != null)
                return parent.GetTopLevelNavItems();

            return ChildPages;
        }

        public IList<HtmlPage> GetSideNavItems()
        {
            HtmlPage parent = Parent;
            if (parent == null || parent.Parent == null)
                return new HtmlPage[0];
            return parent.ChildPages;
        }

        public static string AsNormalizedString(string value, bool emptyIsNull)
        {
            if (!string.IsNullOrEmpty(value) && (value = NormalizeWhitespaceRegex.Replace(value, " ").Trim()).Length > 0)
                return value;
            return emptyIsNull ? null : "";
        }

        public bool Contains(HtmlPage other, bool recursive)
        {
            if (other == null || ReferenceEquals(other, this))
                return false;
            Monitor.Enter(SyncRoot);
            try
            {
                if (_childPages == null || _childPages.Count == 0)
                    return false;
                if (recursive)
                    return other.IsContainedBy(this);
                Monitor.Enter(other.SyncRoot);
                try { return other.Parent != null && ReferenceEquals(other.Parent, this); }
                finally { Monitor.Exit(other.SyncRoot); }
            }
            finally { Monitor.Exit(SyncRoot); }
        }

        public bool Equals(HtmlPage other) { return other != null && ReferenceEquals(this, other); }

        public override bool Equals(object obj) { return obj != null && Collection.TryCastAsHtmlPage(obj, out HtmlPage result) && ReferenceEquals(this, result); }

        public override int GetHashCode() { return FileName.GetHashCode(); }

        public IEnumerable<HtmlPage> GetAllChildPages()
        {
            Collection childPages = _childPages;
            if (childPages != null)
            {
                foreach (HtmlPage page in childPages)
                {
                    yield return page;
                    foreach (HtmlPage p in page.GetAllChildPages())
                        yield return p;
                }
            }
        }

        public IEnumerable<HtmlPage> GetAllPages()
        {
            HtmlPage parent = Parent;
            if (parent != null)
                return parent.GetAllPages();
            return (new HtmlPage[] { this }).Concat(GetAllChildPages());
        }

        public bool IsContainedBy(HtmlPage other)
        {
            if (other == null || ReferenceEquals(other, this))
                return false;
            Monitor.Enter(SyncRoot);
            try
            {
                if (Parent == null)
                    return false;
                return ReferenceEquals(Parent, other) || Parent.IsContainedBy(other);
            }
            finally { Monitor.Exit(SyncRoot); }
        }

        public static HtmlPage Load(string path)
        {
            using (XmlReader reader = XmlReader.Create(path))
                return Load(reader);
        }

        public static HtmlPage Load(Stream stream)
        {
            using (XmlReader reader = XmlReader.Create(stream))
                return Load(reader);
        }

        public static HtmlPage Load(TextReader reader)
        {
            using (XmlReader xmlReader = XmlReader.Create(reader))
                return Load(xmlReader);
        }

        public static HtmlPage Load(XmlReader reader)
        {
            XmlSerializer serializer = new XmlSerializer(typeof(HtmlPage));
            return (HtmlPage)serializer.Deserialize(reader);
        }

        public void LoadContents(string basePath, PSHost host) { LoadContents(new HtmlReaderWriter(basePath, host)); }

        public void LoadContents(HtmlReaderWriter reader)
        {
            Monitor.Enter(SyncRoot);
            try
            {
                if (_fileName == null)
                    throw new InvalidOperationException("Page name is not defined");
                Content = reader.GetContent(GetSideNavItems().Count > 0, _fileName);
                if (_childPages != null)
                {
                    foreach (HtmlPage page in _childPages.ToArray())
                        page.LoadContents(reader);
                }
            }
            finally { Monitor.Exit(SyncRoot); }
        }

        public void SaveContents(string basePath, PSHost host) { SaveContents(new HtmlReaderWriter(basePath, host)); }

        public void SaveContents(HtmlReaderWriter writer)
        {
            Monitor.Enter(SyncRoot);
            try { writer.SavePages((new HtmlPage[] { this }).Concat(GetAllChildPages())); }
            finally { Monitor.Exit(SyncRoot); }
        }

        public void Save(string path)
        {
            using (XmlWriter writer = XmlWriter.Create(path, new XmlWriterSettings { CheckCharacters = false, CloseOutput = true, Encoding = new UTF8Encoding(false, false), Indent = true }))
            {
                Save(writer);
                writer.Flush();
            }
        }

        public void Save(Stream stream)
        {
            using (XmlWriter writer = XmlWriter.Create(stream, new XmlWriterSettings { CheckCharacters = false, CloseOutput = false, Encoding = new UTF8Encoding(false, false), Indent = true }))
            {
                Save(writer);
                writer.Flush();
            }
        }

        public void Save(StreamWriter writer)
        {
            using (XmlWriter xmlWriter = XmlWriter.Create(writer, new XmlWriterSettings { CheckCharacters = false, CloseOutput = false, Encoding = new UTF8Encoding(false, false), Indent = true }))
            {
                Save(xmlWriter);
                xmlWriter.Flush();
            }
        }

        private void Save(XmlWriter writer)
        {
            XmlSerializer serializer = new XmlSerializer(typeof(HtmlPage));
            serializer.Serialize(writer, this);
        }

        public override string ToString()
        {
            return base.ToString();
        }
    }
}