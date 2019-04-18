
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Xml;
using System.Xml.Resolvers;
namespace XmlUtil
{
    public class PageMenuDefinition : ReadOnlyCollection<PageMenuDefinition>
    {
        public string FileName { get; }
        public string ShortName { get; }
        public string Title { get; }
        public bool Angular { get; }
        public ReadOnlyCollection<string> AdditionalJs { get; }
        public ReadOnlyCollection<string> AdditionalCss { get; }
        public PageMenuDefinition(string fileName, string title, string shortName, bool angular, IEnumerable<string> additionalJs, IEnumerable<string> additionalCss,
            params PageMenuDefinition[] nested)
            : base((nested == null) ? new PageMenuDefinition[0] : nested)
        {
            if (fileName == null)
                throw new ArgumentNullException("fileName");
            string[] invalidFileNameChars = System.IO.Path.GetInvalidFileNameChars();
            if (fileName.Trim().Length == 0 || invalidFileNameChars.Any(c => fileName.Contains(c)))
                throw new ArgumentOutOfRangeException("fileName");
            FileName = fileName;
            if (string.IsNullOrWhiteSpace(title))
                Title = ShortName = (string.IsNullOrWhiteSpace(shortName)) ? System.IO.Path.GetFileNameWithoutExtension(fileName) : shortName;
            else {
                Title = title;
                ShortName = (string.IsNullOrWhiteSpace(shortName)) ? title : shortName;
            }
            Angular = angular;
            AdditionalJs = new ReadOnlyCollection<string>((additionalJs == null) ? new string[0] : additionalJs.Where(s => !string.IsNullOrWhiteSpace(s)).ToArray());
            AdditionalCss = new ReadOnlyCollection<string>((additionalCss == null) ? new string[0] : additionalCss.Where(s => !string.IsNullOrWhiteSpace(s)).ToArray());
        }
        public PageMenuDefinition(string fileName, string title, string shortName, bool angular, IEnumerable<string> additionalJs, params PageMenuDefinition[] nested)
            : this(fileName, title, shortName, additionalJs, null, nested) { }
        public PageMenuDefinition(string fileName, string title, string shortName, bool angular, params PageMenuDefinition[] nested)
            : this(fileName, title, shortName, null, null, nested) { }
        public PageMenuDefinition(string fileName, string title, string shortName, params PageMenuDefinition[] nested) : this(fileName, title, shortName, false, null, null, nested) { }
        public PageMenuDefinition(string fileName, string title, bool angular, params PageMenuDefinition[] nested) : this(fileName, title, null, angular, null, null, nested) { }
        public PageMenuDefinition(string fileName, string title, params PageMenuDefinition[] nested) : this(fileName, title, null, false, null, null, nested) { }
        public PageMenuDefinition(string fileName, bool angular, params PageMenuDefinition[] nested) : this(fileName, null, null, angular, null, null, nested) { }
        public PageMenuDefinition(string fileName, params PageMenuDefinition[] nested) : this(fileName, null, null, false, null, null, nested) { }
    }
    public interface IProtectedNodeBase {
        XmlNode Node { get; }
        bool Disabled { get; set; }
        bool CanChangeText { get; }
    }
    public interface IProtectedNode : IProtectedNodeBase {
        bool OtherChildNodesAllowed { get; }
        IList<string> AttributeNames { get; }
        bool Protects(string attributeName);
    }
    public abstract class ProtectedNode<T> : IProtectedNodeBase
        where T : XmlNode
    {
        public T Node { get; }
        XmlNode IProtectedNodeBase.Node { get { return Node; } }
        public bool Disabled { get; set; }
        public bool CanChangeText { get; }
        protected ProtectedNode(T node, bool canChangeText) {
            Node = node;
            CanChangeText = canChangeText;
        }
    }
    public class ProtectedElement : ProtectedNode<XmlElement>, IProtectedNode {
        private string[] _attributeNames;
        public bool OtherChildNodesAllowed { get; }
        public ReadOnlyCollection<string> AttributeNames { get; }
        IList<string> IProtectedNode.AttributeNames { get { return AttributeNames; } }
        public bool Protects(string attributeName) { return !Disabled && _attributeNames.Any(s => s == attributeName); }
        public ProtectedElement(XmlElement element, bool canChangeText, bool otherChildNodesAllowed, params string[] attributeNames) : base(element) {
            OtherChildNodesAllowed = otherChildNodesAllowed;
            _attributeNames = (attributeNames == null || attributeNames.Length == 0) ? new string[0] : attributeNames.Where(s => !String.IsNullOrWhiteSpace(s)).ToArray();
            AttributeNames = new ReadOnlyCollection<string>(_attributeNames);
        }
        public ProtectedElement(XmlNode node, bool canChangeText, params string[] attributeNames) : this(element, canChangeText, false, attributeNames) { }
        public ProtectedElement(XmlNode node, params string[] attributeNames) : this(element, false, false, attributeNames) { }
    }
    public class ProtectedNode : ProtectedNode<XmlNode>, IProtectedNode {
        bool IProtectedNode.OtherChildNodesAllowed { get { return false; } }
        IList<string> IProtectedNode.AttributeNames { get { return new string[0]; } }
        public ProtectedNode(XmlNode node) : base(node) { }
        bool IProtectedNode.Protects(string attributeName) { return false; }
    }
    public class HtmlDocument
    {
        public const string DefaultDTD = "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd";
        public const string RelativeUrl_BootstrapCss = "script/api/bootstrap/css/bootstrap.css";
        public const string RelativeUrl_BootstrapGridCss = "script/api/bootstrap/css/bootstrap-grid.css";
        public const string RelativeUrl_BootstrapTableCss = "script/api/bootstrap-table/bootstrap-table.css";
        public const string RelativeUrl_AngularCss = "script/api/angular/angular-csp.css";
        public const string RelativeUrl_jQuery = "script/api/jquery/jquery.js";
        public const string RelativeUrl_BootstrapJs = "script/api/bootstrap/js/bootstrap.bundle.js";
        public const string RelativeUrl_AngularJs = "script/api/angular/angular.js";
        private XmlDocument _document = new XmlDocument();
        private XmlNamespaceManager _nsmgr;
        
        public PageHeadingCollection Headings { get; }

        public HtmlDocument()
        {
            _document.AppendChild(_document.CreateDocumentType("html", null, DefaultDTD, null));
            _document.Resolver = new XmlPreloadedResolver(XmlKnownDtds.Xhtml10);
            _document.AppendChild(Document.CreateElement("html", XHtmlExtensions.NamespaceURI_xhtml)).SetAttribute("lang", "en");
            _nsmgr = new XmlNamespaceManager(_document.NameTable);
            _document.DocumentElement.AppendElement("head", headElement =>
            {
                headElement.AppendElement("meta").ApplyAttribute("name", "viewport").ApplyAttribute("content", "width=1024, initial-scale=1.0");
                headElement.AppendElement("meta").ApplyAttribute("http-equiv", "X-UA-Compatible").ApplyAttribute("content", "ie=edge");
                headElement.AppendElement("meta").ApplyAttribute("charset", "utf-8");
                headElement.AppendElement("title").InnerText = "";
                headElement.AppendElement("link").ApplyAttribute("rel", "stylesheet").ApplyAttribute("type", "text/css").ApplyAttribute("media", "screen")
                    .ApplyAttribute("href", RelativeUrl_BootstrapCss);
                headElement.AppendElement("link").ApplyAttribute("rel", "stylesheet").ApplyAttribute("type", "text/css").ApplyAttribute("media", "screen")
                    .ApplyAttribute("href", RelativeUrl_BootstrapGridCss);
                headElement.AppendElement("link").ApplyAttribute("rel", "stylesheet").ApplyAttribute("type", "text/css").ApplyAttribute("media", "screen")
                    .ApplyAttribute("href", RelativeUrl_BootstrapTableCss);
                headElement.AppendElement("script").ApplyAttribute("type", "text/javascript").ApplyAttribute("src", RelativeUrl_jQuery);
                headElement.AppendElement("script").ApplyAttribute("type", "text/javascript").ApplyAttribute("src", RelativeUrl_BootstrapJs);
            });
            XmlElement bodyElement = _document.DocumentElement.AppendElement("body", bodyElement =>
            {
                bodyElement.AppendElement("header").ApplyAttribute("class", "container-fluid border border-secondary p-sm-1").InnerText = "";
                bodyElement.AppendElement("nav").ApplyAttribute("class", "container-fluid navbar navbar-expand-lg navbar-light bg-light border border-light p-sm-1 mr-md-3")
                    .AppendElement("ul").ApplyAttribute("class", "navbar-nav mr-auto").InnerText = "";
                bodyElement.AppendElement("section").ApplyAttribute("class", CssClass_SectionNoAside).InnerText = "";
                bodyElement.AppendElement("footer").ApplyAttribute("class", "container-fluid border border-secondary p-sm-1 bg-secondary").InnerText = "";
            });
            TopNavLinks = new TopNavLinkCollection(this);
            Headings = new PageHeadingCollection(this);
            SideNavLinks = new SideNavLinkCollection(this);
        }

        public const string CssClass_SectionNoAside = "container-fluid border border-light p-md-3 text-dark";
        public const string CssClass_SectionAside = "container-fluid border border-light col-md-9 text-dark";

        public class TopNavLinkCollection : IDictionary<string, string>, IDictionary
        {
            private HtmlDocument _owner;
            string IDictionary<string, string>.this[string key] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

            ICollection<string> IDictionary<string, string>.Keys => throw new NotImplementedException();

            ICollection<string> IDictionary<string, string>.Values => throw new NotImplementedException();

            int ICollection<KeyValuePair<string, string>>.Count => throw new NotImplementedException();

            bool ICollection<KeyValuePair<string, string>>.IsReadOnly => throw new NotImplementedException();

            public PageHeadingCollection(HtmlDocument owner)
            {
                _owner = owner;
            }

            void IDictionary<string, string>.Add(string key, string value)
            {
                throw new NotImplementedException();
            }

            void ICollection<KeyValuePair<string, string>>.Add(KeyValuePair<string, string> item)
            {
                throw new NotImplementedException();
            }

            void ICollection<KeyValuePair<string, string>>.Clear()
            {
                throw new NotImplementedException();
            }

            bool ICollection<KeyValuePair<string, string>>.Contains(KeyValuePair<string, string> item)
            {
                throw new NotImplementedException();
            }

            bool IDictionary<string, string>.ContainsKey(string key)
            {
                throw new NotImplementedException();
            }

            void ICollection<KeyValuePair<string, string>>.CopyTo(KeyValuePair<string, string>[] array, int arrayIndex)
            {
                throw new NotImplementedException();
            }

            IEnumerator<KeyValuePair<string, string>> IEnumerable<KeyValuePair<string, string>>.GetEnumerator()
            {
                throw new NotImplementedException();
            }

            IEnumerator IEnumerable.GetEnumerator()
            {
                throw new NotImplementedException();
            }

            public IEnumerable<XmlElement> GetLinkElements()
            {
                return _owner._document.DocumentElement.SelectNodes("h:body/h:div[@class=\"container\"]/h:div[@class=\"container\"]//h:aside/h:ul/h:li").OfType<XmlElement>();
            }

            bool IDictionary<string, string>.Remove(string key)
            {
                throw new NotImplementedException();
            }

            bool ICollection<KeyValuePair<string, string>>.Remove(KeyValuePair<string, string> item)
            {
                throw new NotImplementedException();
            }

            bool IDictionary<string, string>.TryGetValue(string key, out string value)
            {
                throw new NotImplementedException();
            }
        }

        public class SideNavLinkCollection : IDictionary<string, string>, IDictionary
        {
            private HtmlDocument _owner;
            string IDictionary<string, string>.this[string key] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

            ICollection<string> IDictionary<string, string>.Keys => throw new NotImplementedException();

            ICollection<string> IDictionary<string, string>.Values => throw new NotImplementedException();

            int ICollection<KeyValuePair<string, string>>.Count => throw new NotImplementedException();

            bool ICollection<KeyValuePair<string, string>>.IsReadOnly => throw new NotImplementedException();

            public PageHeadingCollection(HtmlDocument owner)
            {
                _owner = owner;
            }

            void IDictionary<string, string>.Add(string key, string value)
            {
                throw new NotImplementedException();
            }

            void ICollection<KeyValuePair<string, string>>.Add(KeyValuePair<string, string> item)
            {
                throw new NotImplementedException();
            }

            void ICollection<KeyValuePair<string, string>>.Clear()
            {
                throw new NotImplementedException();
            }

            bool ICollection<KeyValuePair<string, string>>.Contains(KeyValuePair<string, string> item)
            {
                throw new NotImplementedException();
            }

            bool IDictionary<string, string>.ContainsKey(string key)
            {
                throw new NotImplementedException();
            }

            void ICollection<KeyValuePair<string, string>>.CopyTo(KeyValuePair<string, string>[] array, int arrayIndex)
            {
                throw new NotImplementedException();
            }

            IEnumerator<KeyValuePair<string, string>> IEnumerable<KeyValuePair<string, string>>.GetEnumerator()
            {
                throw new NotImplementedException();
            }

            IEnumerator IEnumerable.GetEnumerator()
            {
                throw new NotImplementedException();
            }

            public IEnumerable<XmlElement> GetLinkElements()
            {
                return _owner._document.DocumentElement.SelectNodes("h:body/h:nav/h:ul/h:li").OfType<XmlElement>();
            }

            bool IDictionary<string, string>.Remove(string key)
            {
                throw new NotImplementedException();
            }

            bool ICollection<KeyValuePair<string, string>>.Remove(KeyValuePair<string, string> item)
            {
                throw new NotImplementedException();
            }

            bool IDictionary<string, string>.TryGetValue(string key, out string value)
            {
                throw new NotImplementedException();
            }
        }
        
        public class PageHeadingCollection : IList<string>, IList
        {
            private HtmlDocument _owner;
            public string this[int index]
            {
                get { return GetHeadingElements().Skip(index).Select(e => (e.IsEmpty) ? "" : e.InnerText).FirstOrDefault(); }
                set
                {
                    XmlElement element = GetHeadingElements().Skip(index).FirstOrDefault();
                    if (element == null)
                        throw new IndexOutOfRangeException();
                    if (ReferenceEquals(element, GetHeadingElements().Last()))
                    {
                        XmlElement e = _document.DocumentElement.SelectSingleNode("h:head/h:title");
                        if (e == null)
                            throw new InvalidOperationException("HTML/head/title element is missing");
                        e.InnerText = element.InnerText = (value == null) ? "" : value;
                    }
                    else
                        element.InnerText = (value == null) ? "" : value;
                }
            }
            public string Title
            {
                get
                {
                    XmlElement element = GetHeadingElements().LastOrDefault();
                    return (element == null) ? null : ((element.IsEmpty) ? "" : element.InnerText);
                }
                set
                {
                    XmlElement e1 = _document.DocumentElement.SelectSingleNode("h:head/h:title");
                    if (e1 == null)
                        throw new InvalidOperationException("HTML/head/title element is missing");
                    XmlElement e2 = GetHeadingElements().LastOrDefault();
                    if (e2 == null)
                    {
                        e2 = _owner._document.DocumentElement.SelectSingleNode("h:body/h:header");
                        if (e2 == null)
                            throw new InvalidOperationException("HTML/body/header element is missing");
                        e2 = e2.AppendElement("h1");
                    }
                    e2.InnerText = e1.InnerText = (value == null) ? "" : value;
                }
            }
            object IList.this[int index] { get { return this[index]; } set { this[index] = (string)value; } }

            public int Count { get { return GetHeadingElements().Count(); } }

            bool ICollection<string>.IsReadOnly { get { return false; } }

            bool IList.IsReadOnly { get { return false; } }

            bool IList.IsFixedSize { get { return false; } }

            object ICollection.SyncRoot { get { return this; } }

            bool ICollection.IsSynchronized { get { return false; } }

            public PageHeadingCollection(HtmlDocument owner)
            {
                _owner = owner;
            }

            public void Add(string item)
            {
                XmlElement element = _owner._document.DocumentElement.SelectSingleNode("h:body/h:header");
                if (element == null)
                    throw new InvalidOperationException("HTML/body/header element is missing");

                XmlElement e = _document.DocumentElement.SelectSingleNode("h:head/h:title");
                if (e == null)
                    throw new InvalidOperationException("HTML/head/title element is missing");
                e.InnerText = element.AppendElement("h" + (GetHeadingElements().Count() + 1).ToString()).InnerText = (item == null) ? "" : item;
            }

            int IList.Add(object value)
            {
                XmlElement element = _owner._document.DocumentElement.SelectSingleNode("h:body/h:header");
                if (element == null)
                    throw new InvalidOperationException("HTML/body/header element is missing");
                XmlElement e = _document.DocumentElement.SelectSingleNode("h:head/h:title");
                if (e == null)
                    throw new InvalidOperationException("HTML/head/title element is missing");
                int index = GetHeadingElements().Count();
                e.InnerText = element.AppendElement("h" + (index + 1).ToString()).InnerText = (value == null) ? "" : (value is string) ? (string)value : value.ToString();
                return index;
            }

            public void Clear()
            {
                XmlElement element = _owner._document.DocumentElement.SelectSingleNode("h:body/h:header");
                if (element == null)
                    throw new InvalidOperationException("HTML/body/header element is missing");
                XmlElement e = _document.DocumentElement.SelectSingleNode("h:head/h:title");
                if (e == null)
                    throw new InvalidOperationException("HTML/head/title element is missing");
                element.IsEmpty = true;
                element.InnerText = e.InnerText = "";
            }

            public bool Contains(string item)
            {
                if (string.IsNullOrEmpty(item))
                    return GetHeadingElements().Any(i => i.IsEmpty || i.InnerText.Length == 0);
                return GetHeadingElements().Any(i => !i.IsEmpty && i.InnerText == item);
            }

            bool IList.Contains(object value) { return value != null && value is string && Contains((string)value); }

            public void CopyTo(string[] array, int arrayIndex) { GetHeadingElements().Select(e => (e.IsEmpty) ? "" : e.InnerText).ToList().CopyTo(array, arrayIndex); }

            void ICollection.CopyTo(Array array, int index) { GetHeadingElements().Select(e => (e.IsEmpty) ? "" : e.InnerText).ToArray().CopyTo(array, index); }

            public IEnumerator<string> GetEnumerator() { return GetHeadingElements().Select(e => (e.IsEmpty) ? "" : e.InnerText).GetEnumerator(); }

            IEnumerator IEnumerable.GetEnumerator() { return GetEnumerator(); }

            public IEnumerable<XmlElement> GetHeadingElements()
            {
                _owner._document.DocumentElement.SelectNodes("h:body/h:header/h*").OfType<XmlElement>().Select(e =>
                {
                    int i;
                    if (e.LocalName.Length > 1 && e.LocalName[0] == 'h' && int.TryParse(e.LocalName.Substring(1), out i))
                        return new { E = e, I = i };
                }).Where(a => a != null).OrderBy(a => a.I).Select(a => a.E);
            }

            public int IndexOf(string item)
            {
                index = -1;
                if (string.IsNullOrEmpty(item))
                {
                    foreach (XmlElement element in GetHeadingElements())
                    {
                        index++;
                        if (element.IsEmpty || element.InnerText.Length == 0)
                            return index;
                    }
                }
                else
                {
                    foreach (XmlElement element in GetHeadingElements())
                    {
                        index++;
                        if (!element.IsEmpty && element.InnerText == item)
                            return index;
                    }
                }
                return -1;
            }

            int IList.IndexOf(object value) { return (value != null && value is string) ? IndexOf((string)value) : -1; }

            public void Insert(int index, string item)
            {
                XmlElement e1 = _owner._document.DocumentElement.SelectSingleNode("h:body/h:header");
                if (e1 == null)
                    throw new InvalidOperationException("HTML/body/header element is missing");
                XmlElement e2 = _document.DocumentElement.SelectSingleNode("h:head/h:title");
                if (e2 == null)
                    throw new InvalidOperationException("HTML/head/title element is missing");
                IEnumerable<XmlElement> elements = GetHeadingElements().Skip(index);
                XmlElement e = elements.FirstOrDefault();
                if (e == null)
                    throw new ArgumentOutOfRangeException("index");
                string s = (e.IsEmpty) ? "" : e.InnerText;
                e.InnerText = (item == null) ? "" : item;
                item = s;
                index++;
                foreach (XmlElement f in elements.Skip(1))
                {
                    index++;
                    s = (f.IsEmpty) ? "" : f.InnerText;
                    f.InnerText = item;
                    item = s;
                }
                e2.InnerText = e1.AppendElement("h" + (index + 1).ToString()).InnerText = item;
            }

            void IList.Insert(int index, object value) { Insert(index, (value == null) ? "" : (value is string) ? (string)value : value.ToString()); }

            public bool Remove(string item)
            {
                int index = IndexOf(item);
                if (index < 0)
                    return false;
                RemoveAt(index);
                return true;
            }

            void IList.Remove(object value)
            {
                if (value != null && value is string)
                    Remove((string)value);
            }

            public void RemoveAt(int index)
            {
                XmlElement e1 = _owner._document.DocumentElement.SelectSingleNode("h:body/h:header");
                if (e1 == null)
                    throw new InvalidOperationException("HTML/body/header element is missing");
                XmlElement e2 = _document.DocumentElement.SelectSingleNode("h:head/h:title");
                if (e2 == null)
                    throw new InvalidOperationException("HTML/head/title element is missing");
                IEnumerable<XmlElement> elements = GetHeadingElements().Skip(index);
                XmlElement e = elements.FirstOrDefault();
                if (e == null)
                    throw new ArgumentOutOfRangeException("index");
                foreach (XmlElement f in elements.Skip(1))
                {
                    f.InnerText = (e.IsEmpty) ? "" : e.InnerText;
                    e = f;
                }
                e1.RemoveChild(e);
                e = elements.LastOrDefault();
                e2.InnerText = (e == null || e.IsEmpty) ? "" : e.InnerText;
            }
        }
    }
    public class NavLinkItem
    {
        public string Name { get; set; }
        public string Uri { get; set; }
        partial string Target { get; set; }
    }
    public class HtmlDocumentOld {
        public const string DefaultDTD = "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd";
        public const string RelativeUrl_BootstrapCss = "script/api/bootstrap/css/bootstrap.css";
        public const string RelativeUrl_BootstrapGridCss = "script/api/bootstrap/css/bootstrap-grid.css";
        public const string RelativeUrl_BootstrapTableCss = "script/api/bootstrap-table/bootstrap-table.css";
        public const string RelativeUrl_AngularCss = "script/api/angular/angular-csp.css";
        public const string RelativeUrl_jQuery = "script/api/jquery/jquery.js";
        public const string RelativeUrl_BootstrapJs = "script/api/bootstrap/js/bootstrap.bundle.js";
        public const string RelativeUrl_AngularJs = "script/api/angular/angular.js";
        public PageMenuDefinition Definition { get; }
        public HtmlDocumentOld Parent { get; }
        private List<IProtectedNode> _protectedNodes = new List<IProtectedNode>();
        private ProtectedElement _htmlHeadElement;
        private ProtectedElement _titleElement;
        private ProtectedElement _bootstrapTableCssElement;
        private ProtectedElement _angularCssElement;
        private ProtectedElement _bootstrapJsElement;
        private ProtectedElement _angularJsElement;
        private ProtectedElement _htmlBodyElement;
        private ProtectedElement _bodyHeaderElement;
        private ProtectedElement _topNavElement;
        private ProtectedElement _containerElement;
        private ProtectedElement _rowElement;
        private ProtectedElement _sectionElement;
        private ProtectedElement _asideElement;

        public XmlPreloadedResolver Resolver { get { return (XmlPreloadedResolver)Document.Resolver; } }
        public XmlDocument Document { get; }
        public XmlNamespaceManager Nsmgr { get; }
        
        public static IEnumerable<HtmlDocumentOld> Load(PageMenuDefinition homeDefinition)
        {
            PageMenuDefinition[] topNav = (new PageMenuDefinition { homeDefinition }).Concat(homeDefinition).ToArray();
            XmlPreloadedResolver resolver = new XmlPreloadedResolver(XmlKnownDtds.Xhtml10);
            HtmlDocumentOld homeDocument = new HtmlDocumentOld(homeDefinition, resolver, topNav, new HtmlDocumentOld[0]);
            yield return homeDocument;
            foreach (HtmlDocumentOld d in Load(homeDefinition, topNav, new HtmlDocumentOld[0]))
                yield return d;
        }

        private static IEnumerable<HtmlDocumentOld> Load(PageMenuDefinition definition, PageMenuDefinition[] topNav, IEnumerable<HtmlDocumentOld> parentDocuments)
        {
            HtmlDocumentOld document = new HtmlDocumentOld(definition, topNav, parentDocuments);
            yield return document;
            parentDocuments = parentDocuments.Concat(new HtmlDocumentOld[] { document });
            foreach (HtmlDocumentOld d in Load(definition, topNav, parentDocuments))
                yield return d;
        }

        private HtmlDocumentOld(PageMenuDefinition definition, XmlPreloadedResolver resolver, PageMenuDefinition[] topNav, IEnumerable<HtmlDocumentOld> parentDocuments) {
            Document = new XmlDocument();
            Document.Resolver = resolver;
            Definition = definition;
            Parent = parentDocuments.FirstOrDefault();
            Document.AppendChild(Document.CreateDocumentType("html", null, DefaultDTD, null));
            Document.AppendChild(Document.CreateElement("html", XHtmlExtensions.NamespaceURI_xhtml));
            Document.DocumentElement.SetAttribute("lang", "en");
            _protectedNodes.Add(new ProtectedNode(Document.DocumentElement, "lang"));
            
            XmlElement parent = Document.DocumentElement.AppendElement("head");
            _htmlHeadElement = new ProtectedElement(parent, false, true);
            _protectedNodes.Add(_htmlHeadElement);

            XmlElement element = parent.AppendElement("meta");
            element.SetAttribute("name", "viewport");
            element.SetAttribute("content", "width=1024, initial-scale=1.0");
            _protectedNodes.Add(new ProtectedElement(element, "name", "content"));
            
            element = parent.AppendElement("meta");
            element.SetAttribute("http-equiv", "X-UA-Compatible");
            element.SetAttribute("content", "ie=edge");
            _protectedNodes.Add(new ProtectedElement(element, "http-equiv", "content"));

            element = parent.AppendElement("meta");
            element.SetAttribute("charset", "utf-8");
            _protectedNodes.Add(new ProtectedElement(element, "charset"));
            
            element = parent.AppendElement("title");
            element.InnerText = definition.Title;
            _titleElement = new ProtectedElement(element);
            _protectedNodes.Add(_titleElement);
            
            element = parent.AppendElement("link");
            element.SetAttribute("rel", "stylesheet");
            element.SetAttribute("type", "text/css");
            element.SetAttribute("media", "screen");
            element.SetAttribute("href", RelativeUrl_BootstrapCss);
            _protectedNodes.Add(new ProtectedElement(element, "rel", "type", "media", "href"));
            
            element = parent.AppendElement("link");
            element.SetAttribute("rel", "stylesheet");
            element.SetAttribute("type", "text/css");
            element.SetAttribute("media", "screen");
            element.SetAttribute("href", RelativeUrl_BootstrapGridCss);
            _protectedNodes.Add(new ProtectedElement(element, "rel", "type", "media", "href"));

            element = parent.AppendElement("link");
            element.SetAttribute("rel", "stylesheet");
            element.SetAttribute("type", "text/css");
            element.SetAttribute("media", "screen");
            element.SetAttribute("href", RelativeUrl_BootstrapTableCss);
            _bootstrapTableCssElement = new ProtectedElement(element, "rel", "type", "media", "href");
            _protectedNodes.Add(_bootstrapTableCssElement);
            
            if (angular) {
                element = parent.AppendElement("link");
                element.SetAttribute("rel", "stylesheet");
                element.SetAttribute("type", "text/css");
                element.SetAttribute("media", "screen");
                element.SetAttribute("href", RelativeUrl_AngularCss);
                _angularCssElement = new ProtectedElement(element, "rel", "type", "media", "href");
                _protectedNodes.Add(_angularCssElement);
            } else
                _angularCssElement = null;

            element = parent.AppendElement("script");
            element.SetAttribute("type", "text/javascript");
            element.SetAttribute("src", RelativeUrl_jQuery);
            _protectedNodes.Add(new ProtectedElement(element, "type", "src"));

            element = parent.AppendElement("script");
            element.SetAttribute("type", "text/javascript");
            element.SetAttribute("src", RelativeUrl_BootstrapJs);
            _bootstrapJsElement = new ProtectedElement(element, "type", "src");
            _protectedNodes.Add(_bootstrapJsElement);
            
            if (angular) {
                element = parent.AppendElement("script");
                element.SetAttribute("type", "text/javascript");
                element.SetAttribute("src", RelativeUrl_AngularJs);
                _angularJsElement = new ProtectedElement(element, "type", "src");
                _protectedNodes.Add(_angularJsElement);
            } else
                _angularJsElement = null;
            
            XmlElement bodyElement = Document.DocumentElement.AppendElement("body");
            _htmlBodyElement = new ProtectedNode(bodyElement);
            _protectedNodes.Add(_htmlBodyElement);
            
            XmlElement bodyHeaderElement = bodyElement.AppendElement("header");
            bodyHeaderElement.SetAttribute("class", "container-fluid border border-secondary p-sm-1");
            _bodyHeaderElement = new ProtectedElement(bodyHeaderElement, "class");
            _protectedNodes.Add(_bodyHeaderElement);
            
            int index = 1;
            foreach (HtmlDocumentOld pd in parentDocuments) {
                element = bodyHeaderElement.AppendElement("h" + index.ToString());
                element.InnerText = pd.Definition.ShortName;
                _protectedNodes.Add(new ProtectedElement(element));
                index++;
            }
            
            element = bodyElement.AppendElement("h" + index.ToString());
            element.InnerText = definition.ShortName;
            _protectedNodes.Add(new ProtectedElement(element));

            element = bodyElement.AppendElement("nav");
            element.SetAttribute("class", "container-fluid navbar navbar-expand-lg navbar-light bg-light border border-light p-sm-1 mr-md-3");
            _protectedNodes.Add(new ProtectedElement(element, "class"));
            
            XmlElement navElement = bodyElement.AppendElement("ul");
            navElement.SetAttribute("class", "navbar-nav mr-auto");
            _topNavElement = new ProtectedElement(navElement, "class");
            _protectedNodes.Add(_topNavElement);
            foreach (PageMenuDefinition tn in topNav) {
                XmlElement liElement = navElement.AppendElement("li");
                XmlElement element = liElement.AppendElement("a");
                if (ReferenceEquals(tn, definition) || parentDocuments.Any(pd => ReferenceEquals(pd.Definition, tn))) {
                    liElement.SetAttribute("class", "active nav-item border border-secondary bg-dark");
                    element.SetAttribute("class", "active nav-link text-light");
                    element.SetAttribute("href", "#");
                    element.SetAttribute("onclick", "return false;");
                } else {
                    liElement.SetAttribute("class", "nav-item border border-secondary bg-dark");
                    element.SetAttribute("class", "nav-link text-light");
                    element.SetAttribute("href", tn.FileName);
                }
                _protectedNodes.Add(new ProtectedElement(liElement));
                _protectedNodes.Add(new ProtectedElement(element));
                element.InnerText = tn.ShortName;
            }

            if (Parent != null && (parentDocuments.Skip(1).Any() || Parent.Definition.Count > 1 || definition.Count > 0)) {
                element = bodyElement.AppendElement("div");
                element.SetAttribute("class", "container");
                _containerElement = new ProtectedElement(element, "class");
                _protectedNodes.Add(_containerElement);
                navElement = element.AppendElement("div");
                navElement.SetAttribute("class", "row flex-nowrap");
                _rowElement = new ProtectedElement(navElement, "class");
                _protectedNodes.Add(_rowElement);
                element = navElement.AppendElement("section");
                element.SetAttribute("class", "container-fluid border border-light col-md-9 text-dark");
                _sectionElement = new ProtectedElement(element, "class");
                _protectedNodes.Add(_sectionElement);
                navElement = navElement.AppendElement("aside");
                navElement.SetAttribute("class", "container-fluid border border-secondary bg-secondary text-secondary col-md-3");
                _asideElement = new ProtectedElement(navElement, "class");
                _protectedNodes.Add(_asideElement);
                if (parentDocuments.Skip(1).Any()) {
                    XmlElement ulElement =  navElement.AppendElement("ul");
                    _protectedNodes.Add(new ProtectedElement(ulElement));
                    foreach (PageMenuDefinition pd in parentDocuments.Skip((parent.Definition.Count < 2) ? 1 : 2).Reverse()) {
                        element = uiElement.AppendElement("li");
                        _protectedNodes.Add(new ProtectedElement(element));
                        element = element.AppendElement("a");
                        _protectedNodes.Add(new ProtectedElement(element));
                        element.SetAttribute("href", pd.FileName);
                        element.InnerText = pd.ShortName;
                    }
                    if (Parent.Definition.Count > 1 || definition.Count > 0)
                        _protectedNodes.Add(new ProtectedElement(navElement.AppendElement("br")));
                }
                if (Parent.Definition.Count > 1) {
                    XmlElement ulElement =  navElement.AppendElement("ul");
                    _protectedNodes.Add(new ProtectedElement(ulElement));
                    foreach (PageMenuDefinition pd in Parent.Definition) {
                        element = uiElement.AppendElement("li");
                        _protectedNodes.Add(new ProtectedElement(element));
                        if (!ReferenceEquals(pd, definition)) {
                            element = element.AppendElement("a");
                            _protectedNodes.Add(new ProtectedElement(element));
                            element.SetAttribute("href", pd.FileName);
                        }
                        element.InnerText = pd.ShortName;
                    }
                    if (definition.Count > 0)
                        _protectedNodes.Add(new ProtectedElement(navElement.AppendElement("br")));
                }
                if (definition.Count > 0) {
                    XmlElement ulElement =  navElement.AppendElement("ul");
                    _protectedNodes.Add(new ProtectedElement(ulElement));
                    foreach (PageMenuDefinition pd in definition) {
                        element = uiElement.AppendElement("li");
                        _protectedNodes.Add(new ProtectedElement(element));
                        element = element.AppendElement("a");
                        _protectedNodes.Add(new ProtectedElement(element));
                        element.SetAttribute("href", pd.FileName);
                        element.InnerText = pd.ShortName;
                    }
                }
            } else {
                _containerElement = _rowElement = _asideElement = null;
                element = bodyElement.AppendElement("section");
                element.SetAttribute("class", "container-fluid border border-light p-md-3 text-dark");
                _sectionElement = new ProtectedElement(element, "class");
                _protectedNodes.Add(_sectionElement);
            }
        }
        public HtmlDocumentOld(string title, bool angular, params HtmlDocumentOld[] parentDocument) : this(title, angular, (IEnumerable<HtmlDocumentOld>)parentDocument) { }
    }
    public static class XHtmlExtensions {
        public const string NamespaceURI_xhtml = "http://www.w3.org/1999/xhtml";
        public static XmlElement ApplyAttribute(this XmlElement parent, string prefix, string localName, string namespaceURI, string value)
        {
            if (namespaceURI == null)
                namespaceURI = "";
            XmlAttribute attribute = parent.Attributes[localName, namespaceURI];
            if (value == null)
            {
                if (attribute != null)
                    parent.Attributes.Remove(attribute);
            }
            else if (attribute == null)
            {
                if (prefix == null)
                    prefix = "";
                parent.Attributes.Append(parent.OwnerDocument.CreateAttribute(prefix, localName, namespaceURI)).Value = value;
            }
            else
                attribute.Value = value;
            return parent;
        }
        public static XmlElement ApplyAttribute(this XmlElement parent, string localName, string namespaceURI, string value)
        {
            if (namespaceURI == null)
                namespaceURI = "";
            if (value != null)
                parent.SetAttribute(localName, namespaceURI, value);
            else
            {
                XmlAttribute attribute = parent.Attributes[localName, namespaceURI];
                if (attribute != null)
                    parent.Attributes.Remove(attribute);
            }
            return parent;
        }
        public static XmlElement ApplyAttribute(this XmlElement parent, string localName, string value) { return parent.ApplyAttribute(localName, "", value); }
        public static XmlElement AppendElement(this XmlElement parent, string prefix, string localName, string namespaceURI, Action<XmlElement> onAdded)
        {
            onAdded((XmlElement)parent.AppendChild(parent.OwnerDocument.CreateElement(prefix, localName, namespaceURI)));
            return parent;
        }
        public static XmlElement AppendElement(this XmlElement parent, string prefix, string localName, string namespaceURI)
        {
            return parent.AppendElement(parent, prefix, localName, namespaceURI, null);
        }
        public static XmlElement AppendElement(this XmlElement parent, string name, string namespaceURI, Action<XmlElement> onAdded)
        {
            onAdded((XmlElement)parent.AppendChild(parent.OwnerDocument.CreateElement(name, namespaceURI)));
            return parent;
        }
        public static XmlElement AppendElement(this XmlElement parent, string name, string namespaceURI)
        {
            return (XmlElement)parent.AppendChild(parent.OwnerDocument.CreateElement(name, namespaceURI));
        }
        public static XmlElement AppendElement(this XmlElement parent, string name, Action<XmlElement> onAdded) { return parent.AppendElement(name, NamespaceURI_xhtml, onAdded); }
        public static XmlElement AppendElement(this XmlElement parent, string name) { return parent.AppendElement(name, NamespaceURI_xhtml); }
        public static IEnumerable<XmlCharacterData> GetTextNodes(this XmlElement element, bool ignoreOuterWhitespace) {
            if (ignoreOuterWhitespace)
                return  element.GetTextNodes().Reverse().SkipWhile(n => n.InnerText.Trim().Length == 0).Reverse().SkipWhile(n => n.InnerText.Trim().Length == 0);
            return element.GetTextNodes();
        }
        public static IEnumerable<XmlCharacterData> GetTextNodes(this XmlElement element) {
            return (element.IsEmpty) ? new XmlCharacterData[0] : element.ChildNodes.OfType<XmlCharacterData>();
        }
        public static IEnumerable<XmlElement> GetElementNodes(this XmlElement element, string localName, string namespaceURI, StringComparison nameComparison) {
            if (namespaceURI == null)
                namespaceURI = "";
            return element.GetElementNodes().Where(element.NamespaceURI == namespaceURI && string.Equals(localName, element.LocalName, nameComparison));
        }
        public static IEnumerable<XmlElement> GetElementNodes(this XmlElement element, string localName, string namespaceURI, IEqualityComparer<string> nameComparer) {
            if (namespaceURI == null)
                namespaceURI = "";
            return element.GetElementNodes().Where(element.NamespaceURI == namespaceURI && nameComparer.Equals(localName, element.LocalName));
        }
        public static IEnumerable<XmlElement> GetElementNodes(this XmlElement element, string localName, StringComparison nameComparison) {
            return element.GetElementNodes(localName, NamespaceURI_xhtml, nameComparison);
        }
        public static IEnumerable<XmlElement> GetElementNodes(this XmlElement element, string localName, IEqualityComparer<string> nameComparer) {
            return element.GetElementNodes(localName, NamespaceURI_xhtml, nameComparer);
        }
        public static IEnumerable<XmlElement> GetElementNodes(this XmlElement element, string localName, string namespaceURI) {
            return element.GetElementNodes().Where(element.NamespaceURI == namespaceURI && element.LocalName == localName);
        }
        public static IEnumerable<XmlElement> GetElementNodes(this XmlElement element, string localName) { return element.GetElementNodes(localName, NamespaceURI_xhtml); }
        public static IEnumerable<XmlElement> GetElementNodes(this XmlElement element) { return (element.IsEmpty) ? new XmlElement[0] : element.ChildNodes.OfType<XmlElement>(); }
        public static XmlElement ClearInnerText(this XmlElement element) {
            foreach (XmlCharacterData textNode in element.GetTextNodes().ToArray())
                element.RemoveChild(textNode);
            return element;
        }
        public static XmlElement SetInnerText(this XmlElement element, string text, bool asCData) {
            XmlCharacterData[] textNodes = element.GetTextNodes().ToArray();
            if (textNodes.Length == 0)
                element.AppendChild((asCData) ? element.OwnerDocument.CreateCDataSection(text) : element.OwnerDocument.CreateTextNode(text));
            if (textNodes.Length == 1) {
                if (asCData) {
                    if (textNodes[0] is XmlCDataSection)
                        textNodes[0].InnerText = text;
                    else
                        element.ReplaceChild(element.OwnerDocument.CreateCDataSection(text), textNodes[0]);
                } else if (textNodes[0] is XmlText)
                    textNodes[0].InnerText = text;
                else
                    element.ReplaceChild(element.OwnerDocument.CreateTextNode(text), textNodes[0]);
            return element;
            }
            
            XmlCharacterData node = textNodes[0];
            for (int i = 0; i < textNodes.Length; i++) {
                if (textNodes[i].InnerText.Trim().Length > 0) {
                    node = textNodes[i];
                    break;
                }
            }
            
            if (asCData) {
                if (node is XmlCDataSection)
                    node.InnerText = text;
                else {
                    XmlCDataSection cData = element.OwnerDocument.CreateCDataSection(text);
                    element.ReplaceChild(cData, node);
                    node = cData;
                }
            } else if (node is XmlText)
                node.InnerText = text;
            else {
                XmlText xmlText = element.OwnerDocument.CreateTextNode(text);
                element.ReplaceChild(xmlText, node);
                node = xmlText;
            }
            while (node.PreviousSibling != null && node.PreviousSibling is XmlCharacterData)
                element.RemoveChild(node.PreviousSibling);
            while (node.NextSibling != null && node.NextSibling is XmlCharacterData)
                element.RemoveChild(node.NextSibling);
            if (node.NextSibling == null)
                return;
            for (XmlNode node = node.NextSibling.NextSibling; node != null; node = node.NextSibling) {
                if (node is XmlCharacterData && ((XmlCharacterData)node).InnerText.Trim().Length > 0) {
                    XmlNode n = node;
                    node = n.PreviousSibling;
                    element.RemoveChild(n);
                }
            }
            return element;
        }
        public static XmlElement SetInnerText(this XmlElement element, string text) { return element.SetInnerText(text, false); }
        public static XmlElement SetInnerTextOptimal(this XmlElement element, string text)
        {
            XmlCharacterData[] textNodes = element.GetTextNodes().ToArray();
            XmlText xmlText = element.OwnerDocument.CreateTextNode(text);
            XmlCDataSection cData;
            XmlCharacterData node;
            if (text.Length == 0 || !(char.IsWhiteSpace(text[0]) || (text.Length > 1 && char.IsWhiteSpace(text[text.Length - 1])) || text.IndexOfAny(new char[] { '\t', '\r', '\n' }) > -1))
                cData = null;
            else
            {
                cData = element.OwnerDocument.CreateCDataSection(text);
                if (cData.OuterXml.Length < xmlText.OuterXml.Length)
                    xmlText = null;
            }
            if (xmlText == null) {
                if (node is XmlCDataSection)
                    node.InnerText = text;
                else {
                    element.ReplaceChild(cData, node);
                    node = cData;
                }
            } else if (node is XmlText)
                node.InnerText = text;
            else {
                element.ReplaceChild(xmlText, node);
                node = xmlText;
            }
            while (node.PreviousSibling != null && node.PreviousSibling is XmlCharacterData)
                element.RemoveChild(node.PreviousSibling);
            while (node.NextSibling != null && node.NextSibling is XmlCharacterData)
                element.RemoveChild(node.NextSibling);
            if (node.NextSibling == null)
                return;
            for (XmlNode node = node.NextSibling.NextSibling; node != null; node = node.NextSibling) {
                if (node is XmlCharacterData && ((XmlCharacterData)node).InnerText.Trim().Length > 0) {
                    XmlNode n = node;
                    node = n.PreviousSibling;
                    element.RemoveChild(n);
                }
            }
            return element;
        }
    }
}