using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.IO;
using System.Linq;
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
        public const string XPath_Abs_Html = "/h:html";
        public const string XPath_Rel_Body = "h:body";
        public const string XPath_Rel_Section = "h:section";
        public const string XPath_Rel_Aside = "h:aside";
        public const string XPath_Rel_DivClassContainer = "h:div[contains(\" container \", concat(\" \", normalize-space(@class), \" \"))]";
        public const string XPath_Rel_DivClassRow = "h:div[contains(\" row \", concat(\" \", normalize-space(@class), \" \"))]";
        public static readonly Regex DocTypeRegex = new Regex(@"^\s*<!DOCTYPE[^>]*>\s*", RegexOptions.Compiled);

        public string BasePath { get; }

        public CssClassNameCollection PageHeadingClass { get; set; }

        public HtmlReaderWriter(string basePath)
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

        internal void FillContents(Collection<XmlNode> content, bool hasAside, string name)
        {
            if (content == null)
                throw new ArgumentNullException("content");
            XmlDocument htmlDocument = LoadHtml(GetPath(name), out XmlPreloadedResolver resolver);
            XmlNamespaceManager nsmgr = new XmlNamespaceManager(htmlDocument.NameTable);
            nsmgr.AddNamespace("h", htmlDocument.DocumentElement.NamespaceURI);
            XmlElement element = GetSectionXPaths(hasAside).Select(x => htmlDocument.SelectSingleNode(x, nsmgr)).Cast<XmlElement>().FirstOrDefault(e => e != null);
            content.Clear();
            if (element == null || element.IsEmpty)
                return;
            XmlDocument resultDocument = new XmlDocument();
            resultDocument.XmlResolver = resolver;
            resultDocument.AppendChild(resultDocument.ImportNode(htmlDocument.DocumentType, true));
            string ns = htmlDocument.DocumentElement.NamespaceURI;
            resultDocument.AppendChild(resultDocument.CreateElement("html", ns)).AppendChild(resultDocument.CreateElement("head", ns)).InnerText = "";
            XmlElement parentElement = (XmlElement)resultDocument.DocumentElement.AppendChild(resultDocument.CreateElement("body", ns));
            if (hasAside)
            {
                parentElement = (XmlElement)parentElement.AppendChild(resultDocument.CreateElement("div", ns));
                parentElement.Attributes.Append(resultDocument.CreateAttribute("class")).Value = "container";
                parentElement = (XmlElement)parentElement.AppendChild(resultDocument.CreateElement("div", ns));
                parentElement.Attributes.Append(resultDocument.CreateAttribute("class")).Value = "row";
            }
            parentElement = (XmlElement)resultDocument.DocumentElement.AppendChild(resultDocument.CreateElement("section", ns));
            foreach (XmlNode node in element.ChildNodes)
                content.Add(parentElement.AppendChild(resultDocument.ImportNode(node, true)));
        }

        public static XmlDocument LoadHtml(string path, out XmlPreloadedResolver resolver)
        {
            resolver = new XmlPreloadedResolver(XmlKnownDtds.Xhtml10);
            XmlDocument htmlDocument = new XmlDocument();
            htmlDocument.XmlResolver = resolver;
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

        public static string FromXhtml(XmlDocument source, out Encoding encoding)
        {
            XslCompiledTransform transform = new XslCompiledTransform();
            XmlDocument document = new XmlDocument();
            document.LoadXml(XmlContent.FromXhtmlTransform);
            transform.Load(document);
            XmlWriterSettings settings = new XmlWriterSettings { CheckCharacters = false, Encoding = (encoding = new UTF8Encoding(false, false)), Indent = true, OmitXmlDeclaration = true, CloseOutput = false };
            string text;
            using (MemoryStream stream = new MemoryStream())
            {
                using (XmlWriter xmlWriter = XmlWriter.Create(stream, settings))
                {
                    transform.Transform(source, xmlWriter);
                    xmlWriter.Flush();
                }
                stream.Seek(0L, SeekOrigin.Begin);
                using (StreamReader reader = new StreamReader(stream, settings.Encoding))
                    text = reader.ReadToEnd();
            }
            Match m = DocTypeRegex.Match(text);
            return "<!DOCTYPE html>" + Environment.NewLine + ((m.Success) ? text.Substring(m.Length) : text);
        }

        public static void SaveHtml(string path, XmlDocument document)
        {
            ConvertElementContentToEntities(document, EntityMapDictionary.Default, document.DocumentElement);
            File.WriteAllText(path, FromXhtml(document, out Encoding encoding), encoding);
        }
    }
}