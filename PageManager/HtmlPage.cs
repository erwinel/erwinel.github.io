using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.IO;
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
        public const string ElementName_ = "";
        public const string AttributeName_Heading = "Heading";
        public const string AttributeName_Name = "Name";
        public const string AttributeName_Title = "Title";
        public const string AttributeName_NgApp = "ng-app";
        public const string AttributeName_NgController = "ng-controller";
        public const string AttributeName_AngularScriptUri = "AngularScriptUri";
        public const string AttributeName_ = "";

        private Collection _childPages = null;
        private Collection _parentCollection = null;
        private UriCollection.UriStrings _otherCssUrls = new UriCollection.UriStrings();
        private UriCollection.UriStrings _otherJsUrls = new UriCollection.UriStrings();
        private string _heading = null;
        private string _name = null;
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
            set { AngularScriptUri = (string.IsNullOrWhiteSpace(value)) ? null : FileUri.AsFileUri(value); }
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

        [XmlAttribute(AttributeName = AttributeName_Heading)]
        public string Heading
        {
            get { return _heading; }
            set { _heading = AsNormalizedString(value, true); }
        }

        [XmlAttribute(AttributeName = AttributeName_Name)]
        public string Name
        {
            get { return _name; }
            set { _name = AsNormalizedString(value, true); }
        }

        [XmlAttribute(AttributeName = AttributeName_NgApp)]
        public string NgApp
        {
            get { return _ngApp; }
            set
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
        }

        [XmlAttribute(AttributeName = AttributeName_NgController)]
        public string NgController
        {
            get { return _ngController; }
            set
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
        }

        [XmlIgnore]
        public bool UsesAngular { get { return NgApp == null && NgController == null && AngularScriptUri == null; } }

        [XmlIgnore]
        public UriCollection OtherCssUrls { get { return _otherCssUrls.InnerList; } }

        [XmlArray(ElementName = ElementName_OtherCssUrls, IsNullable = false)]
        [EditorBrowsable(EditorBrowsableState.Never)]
        public UriCollection.UriStrings __OtherCssUrls { get { return _otherCssUrls; } set { _otherCssUrls = value ?? new UriCollection.UriStrings(); } }

        [XmlIgnore]
        public UriCollection OtherJsUrls { get { return _otherJsUrls.InnerList; } }

        [XmlArray(ElementName = ElementName_OtherJsUrls, IsNullable = false)]
        [EditorBrowsable(EditorBrowsableState.Never)]
        public UriCollection.UriStrings __OtherJsUrls { get { return _otherJsUrls; } set { _otherJsUrls = value ?? new UriCollection.UriStrings(); } }

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

        [XmlAttribute(AttributeName = AttributeName_Title)]
        public string Title
        {
            get { return _title; }
            set { _title = AsNormalizedString(value, true); }
        }

        [XmlIgnore]
        public Collection<XmlNode> Content { get; set; }

        public HtmlPage() { Content = new Collection<XmlNode>(); }

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

        public override int GetHashCode() { return Name.GetHashCode(); }

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

        public void LoadContents(string basePath) { LoadContents(new HtmlReaderWriter(basePath)); }

        private void LoadContents(HtmlReaderWriter reader)
        {
            throw new NotImplementedException();
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
