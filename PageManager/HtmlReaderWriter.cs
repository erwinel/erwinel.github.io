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
using System.Xml.Schema;
using System.Xml.Serialization;
using System.Xml.Xsl;

namespace PageManager
{
    public class HtmlReaderWriter
    {
        public const string NamespaceURI_Xhtml = "http://www.w3.org/1999/xhtml";
        public const string MimeType_Xhtml = "application/xhtml+xml";
        public const string XPath_Abs_Html = "/h:html";
        public const string XPath_Rel_Body = "h:body";
        public const string XPath_Rel_Section = "h:section";
        public const string XPath_Rel_Aside = "h:aside";
        public const string XPath_Rel_DivClassContainer = "h:div[contains(\" container \", concat(\" \", normalize-space(@class), \" \"))]";
        public const string XPath_Rel_DivClassRow = "h:div[contains(\" row \", concat(\" \", normalize-space(@class), \" \"))]";
        public static readonly Regex DocTypeRegex = new Regex(@"^\s*<!DOCTYPE[^>]*>\s*", RegexOptions.Compiled);

        public string BasePath { get; }

        public PSHost Host { get; }

        public CssClassNameCollection PageHeadingClass { get; set; }

        public HtmlReaderWriter(string basePath, PSHost host)
        {
            if (basePath == null)
                throw new ArgumentNullException(basePath);
            try { basePath = Path.GetFullPath(basePath); }
            catch (Exception exc) { throw new ArgumentOutOfRangeException("basePath", (string.IsNullOrWhiteSpace(exc.Message)) ? "Invalid path string" : exc.Message); }
            if (string.IsNullOrEmpty(Path.GetFileName(basePath)))
            {
                string s = Path.GetDirectoryName(basePath);
                if (!string.IsNullOrEmpty(s))
                    basePath = s;
            }
            BasePath = basePath;
            Host = host;
        }

        internal string GetPath(string name)
        {
            if (name == null)
                throw new ArgumentNullException("name");
            if (name.Length == 0)
                throw new ArgumentOutOfRangeException("name", "Name cannot be empty");

            string path;
            try
            {
                path = Path.Combine(BasePath, name);
                if (File.Exists(path))
                    return path;
                if (Directory.Exists(path))
                    throw new FileNotFoundException("The specified name is already the name of a subdirectory.", path);
                if (!Directory.Exists(BasePath))
                    path = null;
            }
            catch (Exception e)
            {
                throw new ArgumentOutOfRangeException("name", (string.IsNullOrWhiteSpace(e.Message)) ? "Invalid base name" : "Invalid base name: " + e.Message.TrimStart());
            }

            if (path == null)
                throw new DirectoryNotFoundException("The base directory \"" + BasePath + "\" does not exist.");
            return path;
        }

        private static IEnumerable<string> GetSectionXPaths(bool hasAside)
        {
            if (hasAside)
            {
                yield return XPath_Abs_Html + "/" + XPath_Rel_Body + "/" + XPath_Rel_DivClassContainer + "/" + XPath_Rel_DivClassRow + "/" + XPath_Rel_Section;
                yield return "/" + XPath_Rel_Body + "/" + XPath_Rel_DivClassContainer + "/" + XPath_Rel_DivClassRow + "/" + XPath_Rel_Section;
                yield return "/" + XPath_Rel_DivClassContainer + "/" + XPath_Rel_DivClassRow + "/" + XPath_Rel_Section;
                yield return "/" + XPath_Rel_DivClassRow + "/" + XPath_Rel_Section;
                yield return XPath_Abs_Html + "/" + XPath_Rel_Body + "/" + XPath_Rel_Section;
                yield return "/" + XPath_Rel_Body + "/" + XPath_Rel_Section;
            }
            else
            {
                yield return XPath_Abs_Html + "/" + XPath_Rel_Body + "/" + XPath_Rel_Section;
                yield return "/" + XPath_Rel_Body + "/" + XPath_Rel_Section;
                yield return XPath_Abs_Html + "/" + XPath_Rel_Body + "/" + XPath_Rel_DivClassContainer + "/" + XPath_Rel_DivClassRow + "/" + XPath_Rel_Section;
                yield return "/" + XPath_Rel_Body + "/" + XPath_Rel_DivClassContainer + "/" + XPath_Rel_DivClassRow + "/" + XPath_Rel_Section;
                yield return "/" + XPath_Rel_DivClassContainer + "/" + XPath_Rel_DivClassRow + "/" + XPath_Rel_Section;
                yield return "/" + XPath_Rel_DivClassRow + "/" + XPath_Rel_Section;

            }
            yield return "/" + XPath_Rel_Section;
        }

        public static XmlDocument CreateHtml5Document(bool hasAside, XmlPreloadedResolver resolver, out XmlElement sectionElement)
        {
            XmlDocument resultDocument = CreateHtml5Document(resolver);
            XmlElement xmlElement = resultDocument.GetHtmlBodyElement();
            if (hasAside)
                xmlElement = xmlElement.AppendElement("div").ApplyAttribute("class", "container").AppendElement("div").ApplyAttribute("class", "row");
            sectionElement = xmlElement.AppendElement("section");
            return resultDocument;
        }

        public static XmlDocument CreateHtml5Document(bool hasAside, out XmlElement sectionElement) { return CreateHtml5Document(hasAside, null, out sectionElement); }

        public static XmlDocument CreateHtml5Document(XmlPreloadedResolver resolver)
        {
            XmlDocument resultDocument = new XmlDocument { XmlResolver = resolver ?? new XmlPreloadedResolver(XmlKnownDtds.Xhtml10) };
            resultDocument.AppendChild(resultDocument.CreateDocumentType("html", "", EntityMapDictionary.DtdURI_Xhtml_Transitional, ""));
            XmlElement xmlElement = ((XmlElement)resultDocument.AppendChild(resultDocument.CreateElement("html", NamespaceURI_Xhtml))).AppendElement("head");
            xmlElement.AppendElement("meta").ApplyAttribute("name", "viewport").ApplyAttribute("content", "width=1024, initial-scale=1.0");
            xmlElement.AppendElement("meta").ApplyAttribute("http-equiv", "X-UA-Compatible").ApplyAttribute("content", "utf-8");
            xmlElement.AppendElement("meta").ApplyAttribute("charset", "ie=edge");
            xmlElement.AppendElement("title").InnerText = "";
            xmlElement = resultDocument.DocumentElement.AppendElement("body");
            return resultDocument;
        }

        public static XmlDocument CreateHtml5Document() { return CreateHtml5Document(null); }

        internal XmlElement GetContent(bool hasAside, string name)
        {
            XmlDocument htmlDocument = LoadHtml(GetPath(name), out XmlPreloadedResolver resolver);
            XmlNamespaceManager nsmgr = new XmlNamespaceManager(htmlDocument.NameTable);
            nsmgr.AddNamespace("h", htmlDocument.DocumentElement.NamespaceURI);
            XmlDocument result = CreateHtml5Document(hasAside, resolver, out XmlElement sectionElement);
            XmlElement element = GetSectionXPaths(hasAside).Select(x => htmlDocument.SelectSingleNode(x, nsmgr)).Cast<XmlElement>().FirstOrDefault(e => e != null);
            if (element == null || element.IsEmpty)
                return sectionElement;
            foreach (XmlNode node in element.ChildNodes)
            {
                if (node is XmlElement)
                    sectionElement.AppendChild(result.ImportAsXhtml((XmlElement)node));
                else
                    sectionElement.AppendChild(result.ImportNode(node, true));
            }
            return sectionElement;
        }

        public static XmlDocument LoadHtml(string path, out XmlPreloadedResolver resolver)
        {
            resolver = new XmlPreloadedResolver(XmlKnownDtds.Xhtml10);
            XmlDocument htmlDocument = new XmlDocument { XmlResolver = resolver };
            htmlDocument.AppendChild(htmlDocument.CreateDocumentType("html", "", EntityMapDictionary.DtdURI_Xhtml_Transitional, ""));
            htmlDocument.AppendChild(htmlDocument.CreateElement("html", NamespaceURI_Xhtml));
            if (string.IsNullOrEmpty(path) || !File.Exists(path))
                return htmlDocument;
            string content;
            using (StreamReader reader = new StreamReader(path, new UTF8Encoding(false, false)))
                content = reader.ReadToEnd();
            Match m = DocTypeRegex.Match(content);
            Uri uri = new Uri(path, UriKind.Absolute);
            resolver.Add(uri, "<!DOCTYPE html SYSTEM \"" + EntityMapDictionary.DtdURI_Xhtml_Transitional + "\">" + Environment.NewLine + ((m.Success) ? content.Substring(m.Length) : content));
            using (XmlReader reader = XmlReader.Create(uri.AbsoluteUri, new XmlReaderSettings { CheckCharacters = false, DtdProcessing = DtdProcessing.Parse, XmlResolver = resolver }))
                htmlDocument.Load(reader);
            ConvertElementContentToEntities(htmlDocument, EntityMapDictionary.Default, htmlDocument.DocumentElement);
            return htmlDocument;
        }

        private static void ConvertElementContentToEntities(XmlDocument xmlDocument, EntityMapDictionary entityTranslate, XmlElement element)
        {
            if (element.HasAttributes)
            {
                foreach (XmlAttribute attribute in element.Attributes)
                {
                    if (attribute.Value.Length > 0)
                        ConvertTextNodesToEnties(xmlDocument, entityTranslate, attribute);
                }
            }

            if (element.IsEmpty)
                return;

            ConvertTextNodesToEnties(xmlDocument, entityTranslate, element);

            for (XmlNode currentNode = element.FirstChild; currentNode != null; currentNode = currentNode.NextSibling)
            {
                if (currentNode is XmlElement)
                    ConvertElementContentToEntities(xmlDocument, entityTranslate, (XmlElement)currentNode);
            }
        }

        private static void ConvertTextNodesToEnties(XmlDocument xmlDocument, EntityMapDictionary entityTranslate, XmlNode parentNode)
        {
            for (XmlNode currentNode = parentNode.FirstChild; currentNode != null; currentNode = currentNode.NextSibling)
            {
                if (currentNode is XmlText)
                {
                    string text = currentNode.InnerText;
                    for (int i = 0; i < text.Length; i++)
                    {
                        char c = text[i];
                        if (entityTranslate.ContainsKey(c))
                        {
                            if (i > 0)
                            {
                                if (i == text.Length - 1)
                                {
                                    XmlNode nextNode = parentNode.InsertAfter(xmlDocument.CreateEntityReference(entityTranslate[c]), currentNode);
                                    currentNode.InnerText = text = currentNode.InnerText.Substring(0, i);
                                    XmlNode node = currentNode;
                                    if (ReferenceEquals(currentNode = currentNode.NextSibling, nextNode))
                                        break;
                                    currentNode = node;
                                }
                                else
                                {
                                    parentNode.InsertBefore(xmlDocument.CreateTextNode(text.Substring(0, i)), currentNode);
                                    parentNode.InsertBefore(xmlDocument.CreateEntityReference(entityTranslate[c]), currentNode);
                                    currentNode.InnerText = text = currentNode.InnerText.Substring(i + 1);
                                }
                                i = -1;
                            }
                            else if (text.Length == 1)
                            {
                                XmlNode nextNode = xmlDocument.CreateEntityReference(entityTranslate[c]);
                                parentNode.ReplaceChild(nextNode, currentNode);
                                currentNode = nextNode;
                                break;
                            }
                            else
                            {
                                parentNode.InsertBefore(xmlDocument.CreateEntityReference(entityTranslate[c]), currentNode);
                                currentNode.InnerText = text = currentNode.InnerText.Substring(1);
                                i--;
                            }
                        }
                    }
                }
            }
        }

        public static byte[] ToBytes(XmlDocument document, Encoding encoding)
        {
            ConvertElementContentToEntities(document, EntityMapDictionary.Default, document.DocumentElement);
            using (MemoryStream stream = new MemoryStream())
            {
                using (XmlWriter writer = XmlWriter.Create(stream, new XmlWriterSettings
                {
                    CheckCharacters = false,
                    Encoding = encoding ?? new UTF8Encoding(false, false),
                    Indent = true,
                    OmitXmlDeclaration = true,
                    CloseOutput = false
                }))
                {
                    writer.WriteDocType("html", null, null, null);
                    document.DocumentElement.WriteTo(writer);
                    writer.Flush();
                }
                return stream.ToArray();
            }
        }

        public static byte[] ToBytes(XmlDocument document) { return ToBytes(document, null); }

        public static void SaveHtml(string path, XmlDocument document, Encoding encoding)
        {
            File.WriteAllBytes(path, ToBytes(document, encoding));
        }

        public const string ProgressActivity_SavePages = "Saving Page Content";

        public void SavePages(IEnumerable<HtmlPage> pages)
        {
            HtmlPage[] pageArray = pages.ToArray();
            int total = pageArray.Length;
            for (int pageIndex = 0; pageIndex < pageArray.Length; pageIndex++)
            {
                HtmlPage page = pageArray[pageIndex];
                if (Host != null)
                    Host.UI.WriteProgress(1L, new ProgressRecord(0, ProgressActivity_SavePages, "Saving page " + (pageIndex + 1).ToString() + " of " + total.ToString())
                    {
                        CurrentOperation = page.Title,
                        PercentComplete = Convert.ToInt32(Convert.ToSingle(pageIndex * 100) / Convert.ToSingle(total))
                    });
                try
                {
                    XmlDocument document = CreateHtml5Document();
                    XmlElement element = document.GetHtmlHeadElement();
                    element.GetXhtmlElements("title").First().InnerText = page.Title;
                    element.AppendElement("link").ApplyAttribute("rel", "stylesheet").ApplyAttribute("type", "text/css").ApplyAttribute("media", "screen").ApplyAttribute("href", "script/api/bootstrap/css/bootstrap.css");
                    element.AppendElement("link").ApplyAttribute("rel", "stylesheet").ApplyAttribute("type", "text/css").ApplyAttribute("media", "screen").ApplyAttribute("href", "script/api/bootstrap/css/bootstrap-grid.css");
                    element.AppendElement("link").ApplyAttribute("rel", "stylesheet").ApplyAttribute("type", "text/css").ApplyAttribute("media", "screen").ApplyAttribute("href", "script/api/bootstrap-table/bootstrap-table.css");
                    if (page.UsesAngular)
                        element.AppendElement("link").ApplyAttribute("rel", "stylesheet").ApplyAttribute("type", "text/css").ApplyAttribute("media", "screen").ApplyAttribute("href", "script/api/angular/angular-csp.css");
                    foreach (FileUri uri in page.OtherCssUrls)
                        element.AppendElement("link").ApplyAttribute("rel", "stylesheet").ApplyAttribute("type", "text/css").ApplyAttribute("media", "screen").ApplyAttribute("href", uri.ToString());
                    element.AppendElement("script").ApplyAttribute("type", "text/javascript").ApplyAttribute("href", "script/api/jquery/jquery.js").InnerText = "";
                    element.AppendElement("script").ApplyAttribute("type", "text/javascript").ApplyAttribute("href", "script/api/bootstrap/js/bootstrap.bundle.js").InnerText = "";
                    if (page.UsesAngular)
                        element.AppendElement("script").ApplyAttribute("type", "text/javascript").ApplyAttribute("href", "script/api/angular/angular.js").InnerText = "";
                    foreach (FileUri uri in page.OtherJsUrls)
                        element.AppendElement("script").ApplyAttribute("type", "text/javascript").ApplyAttribute("href", uri.ToString()).InnerText = "";
                    element = document.GetHtmlBodyElement();
                    XmlElement parentElement = element.AppendElement("header").ApplyAttribute("class", "container-fluid border border-secondary p-sm-1");
                    HtmlPage parentPage = page.Parent;
                    int level = 1;
                    if (parentPage != null && parentPage.Parent != null)
                    {
                        do { parentElement.AppendElement((level < 6) ? "h" + level.ToString() : "h6").InnerText = parentPage.Heading; }
                        while ((parentPage = parentPage.Parent) != null && parentPage.Parent != null);
                    }
                    parentElement.AppendElement((level < 6) ? "h" + level.ToString() : "h6").InnerText = page.Heading;
                    parentElement = element.AppendElement("nav").ApplyAttribute("class", "container-fluid navbar navbar-expand-lg navbar-light bg-light border border-light p-sm-1 mr-md-3")
                        .AppendElement("ul").ApplyAttribute("class", "navbar-nav mr-auto");
                    foreach (HtmlPage navPage in page.GetTopLevelNavItems())
                    {
                        if (ReferenceEquals(navPage, page))
                            parentElement.AppendElement("li").ApplyAttribute("class", "active nav-item border border-secondary bg-dark")
                                .AppendElement("a").ApplyAttribute("href", "#").ApplyAttribute("class", "active nav-link text-light").ApplyAttribute("onclick", "return false;")
                                .InnerText = navPage.LinkName;
                        else if (page.IsContainedBy(navPage))
                            parentElement.AppendElement("li").ApplyAttribute("class", "active nav-item border border-secondary bg-dark")
                                .AppendElement("a").ApplyAttribute("href", navPage.FileName + ".html").ApplyAttribute("class", "active nav-link text-light")
                                .InnerText = navPage.LinkName;
                        else
                            parentElement.AppendElement("li").ApplyAttribute("class", "nav-item border border-secondary bg-dark")
                                .AppendElement("a").ApplyAttribute("href", navPage.FileName + ".html").ApplyAttribute("class", "nav-link text-light")
                                .InnerText = navPage.LinkName;
                    }
                    IList<HtmlPage> sideNav = page.GetSideNavItems();
                    if (sideNav.Count == 0)
                        parentElement = element.AppendElement("section").ApplyAttribute("class", "container-fluid border border-light p-md-3 text-dark");
                    else
                    {
                        XmlElement containerElement = element.AppendElement("div").ApplyAttribute("class", "container").AppendElement("div").ApplyAttribute("class", "row flex-nowrap");
                        parentElement = containerElement.AppendElement("section").ApplyAttribute("class", "container-fluid border border-light col-md-9 text-dark");
                        containerElement = containerElement.AppendElement("aside").ApplyAttribute("class", "coontainer-fluid border border-secondary bg-secondary text-secondary col-md-3");
                        foreach (HtmlPage navPage in sideNav)
                        {
                            if (ReferenceEquals(navPage, page))
                                containerElement.AppendElement("li").ApplyAttribute("class", "active nav-item border border-secondary bg-dark")
                                    .AppendElement("a").ApplyAttribute("href", "#").ApplyAttribute("class", "active nav-link text-light").ApplyAttribute("onclick", "return false;")
                                    .InnerText = navPage.LinkName;
                            else
                                containerElement.AppendElement("li").ApplyAttribute("class", "nav-item border border-secondary bg-dark")
                                    .AppendElement("a").ApplyAttribute("href", navPage.FileName + ".html").ApplyAttribute("class", "nav-link text-light")
                                    .InnerText = navPage.LinkName;
                        }
                    }
                    string text = page.NgApp;
                    if (text != null)
                        parentElement.SetAttribute("ng-app", text);
                    text = page.NgController;
                    if (text != null)
                        parentElement.SetAttribute("ng-controller", text);
                    XmlElement content = page.Content;
                    if (!content.IsEmpty)
                    {
                        foreach (XmlNode node in content.ChildNodes)
                        {
                            if (node is XmlElement)
                                parentElement.AppendChild(document.ImportAsXhtml((XmlElement)node));
                            else
                                parentElement.AppendChild(document.ImportNode(node, true));
                        }
                    }
                    element.AppendElement("footer").ApplyAttribute("class", "container-fluid border border-secondary p-sm-1 bg-secondary").InnerText = "Notice goes here";
                    SaveHtml(GetPath(page.FileName), document, null);
                }
                catch (Exception exception)
                {
                    if (Host != null)
                    {
                        string message = "Error saving page " + (pageIndex + 1).ToString() + ": " + exception.ToString();
                        Host.UI.WriteProgress(1L, new ProgressRecord(0, ProgressActivity_SavePages, message)
                        {
                            CurrentOperation = page.Title,
                            PercentComplete = Convert.ToInt32(Convert.ToSingle(pageIndex * 100) / Convert.ToSingle(total)),
                            RecordType = ProgressRecordType.Completed
                        });
                        Host.UI.WriteErrorLine(message);
                    }
                    throw;
                }
            }
            if (Host != null)
                Host.UI.WriteProgress(1L, new ProgressRecord(0, ProgressActivity_SavePages, "Completed")
                {
                    PercentComplete = 100,
                    RecordType = ProgressRecordType.Completed
                });
        }
    }
}