﻿Add-Type -TypeDefinition @'
namespace XmlUtil {
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;
    using System.Xml;
    using System.Xml.Resolvers;
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
    public class HtmlDocument {
        public const string DefaultDTD = "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd";
        public const string RelativeUrl_BootstrapCss = "script/api/bootstrap/css/bootstrap.css";
        public const string RelativeUrl_BootstrapGridCss = "script/api/bootstrap/css/bootstrap-grid.css";
        public const string RelativeUrl_BootstrapTableCss = script/api/bootstrap-table/bootstrap-table.css";
        public const string RelativeUrl_AngularCss = "script/api/angular/angular-csp.css";
        public const string RelativeUrl_jQuery = "script/api/jquery/jquery.js";
        public const string RelativeUrl_BootstrapJs = "script/api/bootstrap/js/bootstrap.bundle.js";
        public const string RelativeUrl_AngularJs = "script/api/angular/angular.js";
        private ProtectedElement _htmlHeadElement;
        private ProtectedElement _titleElement;
        private ProtectedElement _bootstrapTableCssElement;
        private ProtectedElement _angularCssElement;
        private ProtectedElement _bootstrapJsElement;
        private ProtectedElement _angularJsElement;
        private ProtectedElement _htmlBodyElement;
        private ProtectedElement _bodyHeaderElement;
        private ProtectedElement _topNavElement;

        public XmlPreloadedResolver Resolver { get; }
        public XmlDocument Document { get; }
        public XmlNamespaceManager Nsmgr { get; }

        public HtmlDocument(XmlDocument source, bool angular, bool aside) {
            Resolver = new XmlPreloadedResolver(XmlKnownDtds.Xhtml10);
            Document = new XmlDocument();
            Document.Resolver = Resolver;
            List<ProtectedNode> protectedNodes = new List<ProtectedNode>();
            Document.AppendChild(Document.CreateDocumentType("html", null, DefaultDTD, null));
            Document.AppendChild(Document.CreateElement("html", XHtmlExtensions.NamespaceURI_xhtml));
            Document.DocumentElement.SetAttribute("lang", "en");
            protectedNodes.Add(new ProtectedNode(Document.DocumentElement, "lang"));
            
            XmlElement parent = Document.DocumentElement.AppendElement("head");
            _htmlHeadElement = new ProtectedElement(parent, false, true);
            protectedNodes.Add(_htmlHeadElement);

            XmlElement element = parent.AppendElement("meta");
            element.SetAttribute("name", "viewport");
            element.SetAttribute("content", "width=1024, initial-scale=1.0");
            protectedNodes.Add(new ProtectedElement(element, "name", "content"));
            
            element = parent.AppendElement("meta");
            element.SetAttribute("http-equiv", "X-UA-Compatible");
            element.SetAttribute("content", "ie=edge");
            protectedNodes.Add(new ProtectedElement(element, "http-equiv", "content"));

            element = parent.AppendElement("meta");
            element.SetAttribute("charset", "utf-8");
            protectedNodes.Add(new ProtectedElement(element, "charset"));

            _titleElement = new ProtectedElement(parent.AppendElement("title"));
            protectedNodes.Add(_titleElement);
            
            element = parent.AppendElement("link");
            element.SetAttribute("rel", "stylesheet");
            element.SetAttribute("type", "text/css");
            element.SetAttribute("media", "screen");
            element.SetAttribute("href", RelativeUrl_BootstrapCss);
            protectedNodes.Add(new ProtectedElement(element, "rel", "type", "media", "href"));
            
            element = parent.AppendElement("link");
            element.SetAttribute("rel", "stylesheet");
            element.SetAttribute("type", "text/css");
            element.SetAttribute("media", "screen");
            element.SetAttribute("href", RelativeUrl_BootstrapGridCss);
            protectedNodes.Add(new ProtectedElement(element, "rel", "type", "media", "href"));

            element = parent.AppendElement("link");
            element.SetAttribute("rel", "stylesheet");
            element.SetAttribute("type", "text/css");
            element.SetAttribute("media", "screen");
            element.SetAttribute("href", RelativeUrl_BootstrapTableCss);
            _bootstrapTableCssElement = new ProtectedElement(element, "rel", "type", "media", "href");
            protectedNodes.Add(_bootstrapTableCssElement);
            
            if (angular) {
                element = parent.AppendElement("link");
                element.SetAttribute("rel", "stylesheet");
                element.SetAttribute("type", "text/css");
                element.SetAttribute("media", "screen");
                element.SetAttribute("href", RelativeUrl_AngularCss);
                _angularCssElement = new ProtectedElement(element, "rel", "type", "media", "href");
                protectedNodes.Add(_angularCssElement);
            } else
                _angularCssElement = null;

            element = parent.AppendElement("script");
            element.SetAttribute("type", "text/javascript");
            element.SetAttribute("src", RelativeUrl_jQuery);
            protectedNodes.Add(new ProtectedElement(element, "type", "src"));

            element = parent.AppendElement("script");
            element.SetAttribute("type", "text/javascript");
            element.SetAttribute("src", RelativeUrl_BootstrapJs);
            _bootstrapJsElement = new ProtectedElement(element, "type", "src"));
            protectedNodes.Add(_bootstrapJsElement);
            
            if (angular) {
                element = parent.AppendElement("script");
                element.SetAttribute("type", "text/javascript");
                element.SetAttribute("src", RelativeUrl_AngularJs);
                _angularJsElement = new ProtectedElement(element, "type", "src"));
                protectedNodes.Add(_angularJsElement);
            } else
                _angularJsElement = null;
            
            parent = Document.DocumentElement.AppendElement("body");
            _htmlBodyElement = new ProtectedNode(parent);
            protectedNodes.Add(_htmlBodyElement);
            
            element = parent.AppendElement("header");
            element.SetAttribute("class", "container-fluid border border-secondary p-sm-1");
            _bodyHeaderElement = new ProtectedElement(element, "class");
            protectedNodes.Add(_bodyHeaderElement);
            
            element = parent.AppendElement("nav");
            element.SetAttribute("class", "container-fluid navbar navbar-expand-lg navbar-light bg-light border border-light p-sm-1 mr-md-3");
            protectedNodes.Add(new ProtectedElement(element, "class"));
            
            element = element.AppendElement("ul");
            element.SetAttribute("class", "navbar-nav mr-auto");
            _topNavElement = new ProtectedElement(element, "class");
            protectedNodes.Add(_topNavElement);
            

        }
    }
    public static class XHtmlExtensions {
        public const string NamespaceURI_xhtml = "http://www.w3.org/1999/xhtml";
        public static IProtectedNode GetProtection(this IEnumerable<IProtectedNode> protectedNodes, XmlNode node) {
            IProtectedNode pn = protectedNodes.FirstOrDefault(p => ReferenceEquals(p.Node, element));
            if (pn == null && node is XmlAttribute) {
                XmlAttribute a = (XmlAttribute)node;
                if (a.NamespaceURI.Length == 0) {
                    XmlElement e = a.OwnerElement;
                    if (e != null && (pn = protectedNodes.FirstOrDefault(p => ReferenceEquals(p.Node, e))) != null && !pn.Protects(a.LocalName))
                        pn = null;
                }
            }
            return pn;
        }
        public static bool AllowsOtherChildNodes(this IEnumerable<IProtectedNode> protectedNodes, XmlElement element) {
            IProtectedNode pn = protectedNodes.FirstOrDefault(p => ReferenceEquals(p.Node, element));
            return pn == null || pn.Disabled || pn.OtherChildNodesAllowed;
        }
        public static bool CanChangeText(this IEnumerable<IProtectedNode> protectedNodes, XmlNode node) {
            IProtectedNode pn = protectedNodes.FirstOrDefault(p => ReferenceEquals(p.Node, element));
            if (pn != null)
                return pn.Disabled || pn.CanChangeText;
            if (node is XmlAttribute) {
                XmlAttribute a = (XmlAttribute)node;
                if (a.NamespaceURI.Length > 0)
                    return true;
                XmlElement e = a.OwnerElement;
                if (e != null && (pn = protectedNodes.FirstOrDefault(p => ReferenceEquals(p.Node, e))) != null)
                    return !pn.Protects(a.LocalName);
            }
            return true;
        }
        public static bool IsProtected(this IEnumerable<IProtectedNode> protectedNodes, XmlNode node) {
            IProtectedNode pn = protectedNodes.FirstOrDefault(p => ReferenceEquals(p.Node, element));
            if (pn != null)
                return !pn.Disabled;
            if (node is XmlAttribute) {
                XmlAttribute a = (XmlAttribute)node;
                if (a.NamespaceURI.Length > 0)
                    return false;
                XmlElement e = a.OwnerElement;
                if (e != null && (pn = protectedNodes.FirstOrDefault(p => ReferenceEquals(p.Node, e))) != null)
                    return pn.Protects(a.LocalName);
            }
            return false;
        }
        public static XmlElement AppendElement(this XmlElement parent, string prefix, string localName, string namespaceURI) {
            return (XmlElement)parent.AppendChild(parent.OwnerDocument.CreateElement(prefix, localName, namespaceURI));
        }
        public static XmlElement AppendElement(this XmlElement parent, string name, string namespaceURI) {
            return (XmlElement)parent.AppendChild(parent.OwnerDocument.CreateElement(name, namespaceURI));
        }
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
        public static void ClearInnerText(this XmlElement element) {
            foreach (XmlCharacterData textNode in element.GetTextNodes().ToArray())
                element.RemoveChild(textNode);
        }
        public static void SetInnerText(this XmlElement element, string text, bool asCData) {
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
                return;
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
        }
        public static void SetInnerText(this XmlElement element, string text) { return element.SetInnerText(text, false); }
        public static void SetInnerTextOptimal(this XmlElement element, string text)
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
        }
    }
}
'@ -ReferencedAssemblies 'System.Xml' -ErrorAction Stop;

Function Test-NCName {
    <#
        .SYNOPSIS
            Tests whether a name is a valid NCName.

        .DESCRIPTION
            Tests whether a name is a valid NCName according to the W3C Extended Markup Language recommendation.

        .OUTPUTS
            System.Boolean. True if the value is a valid NCName according to the W3C Extended Markup Language recommendation; otherwise, false.
    #>
    [CmdletBinding(DefaultParameterSetName = 'WriteError')]
    [OutputType([bool])]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [AllowEmptyString()]
        [AllowEmptyCollection()]
        [AllowNull()]
        # The object to test.
        [object]$InputObject,

        # Specifies that InputObject can be cast to a string value if it is not already a string value.
        [switch]$CanCast,
        
        # Specifies that an empty string value is considered to be valid.
        [switch]$AllowEmpty,

        # Specifies the name of the object that is being processed.
        [string]$CategoryTargetName = 'Input object',
        
        [AllowEmptyString()]
        [AllowEmptyCollection()]
        # The object that is being processed.
        [object]$TargetObject,

        [Parameter(ParameterSetName = 'WriteError')]
        # When writing errors, the ErrorId will start with this value, followed by a colon (:), then by additional characters which will uniquely identify the error.
        [string]$ErrorIdBase = 'Test-NCName',

        [Parameter(Mandatory = $true, ParameterSetName = 'WriteError')]
        # Specifies that an error should be written to the error stream if the test fails.
        [switch]$WriteError,
        
        [Parameter(ParameterSetName = 'Warn')]
        # Specifies that a warning should be written to the warning stream if the test fails.
        [switch]$Warn
    )

    Begin {
        if ($null -eq $Script:__Test_NCName) {
            $Script:__Test_NCName = New-Object -TypeName 'System.Text.RegularExpressions.Regex' -ArgumentList '^a-z[a-z\-_.]*$', ([System.Text.RegularExpressions.RegexOptions]([System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Compiled));
        }
    }

    Process {
        $ErrorSplat = $null;
        if ($null -eq $InputObject) {
            if ($Warn.IsPresent) {
                Write-Warning -Message "$CategoryTargetName is null";
            } else {
                if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName is null"; ErrorId = 'NullValue' } }
            }
        } else {
            $Value = $null;
            if ($InputObject -is [string]) {
                $Value = $InputObject;
            } else {
                if ($CanCast) {
                    $ErrorObj = $null;
                    try { [string]$Value = $InputObject } catch { $ErrorObj = $_ }
                    if ($null -eq $Value) {
                        if ($Warn.IsPresent) {
                            if ($null -eq $ErrorObj) {
                                Write-Warning -Message "$CategoryTargetName cannot be cast to a string value";
                            } else {
                                Write-Warning -Message "$CategoryTargetName cannot be cast to a string value: $ErrorObj";
                            }
                        } else {
                            if ($WriteError.IsPresent) {
                                $ErrorSplat = @{ Message = "$CategoryTargetName cannot be cast to a string value"; ErrorId = 'NotString' }
                                if ($null -ne $ErrorObj) { $ErrorSplat['CategoryReason'] = ($ErrorObj | Out-String).Trim() }
                            }
                        }
                    }
                } else {
                    if ($Warn.IsPresent) {
                        if ($null -eq $ErrorObj) {
                            Write-Warning -Message "$CategoryTargetName is not a string value";
                        } else {
                            Write-Warning -Message "$CategoryTargetName is not a string value: $ErrorObj";
                        }
                    } else {
                        if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName is not a string value"; ErrorId = 'NotString' } }
                    }
                }
            }
            if ($null -ne $Value) {
                if ($Value.Trim().Length -eq 0) {
                    if (-not $AllowEmpty.IsPresent) {
                        if ($Warn.IsPresent) {
                            Write-Warning -Message "$CategoryTargetName cannot be empty";
                        } else {
                            if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName cannot be empty"; ErrorId = 'Empty' } }
                        }
                        $Value = $null;
                    }
                } else {
                    if (-not $Script:__Test_NCName.IsMatch($Value)) {
                        if ($Warn.IsPresent) {
                            Write-Warning -Message "$CategoryTargetName is not a valid NCName";
                        } else {
                            if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName is not a valid NCName"; ErrorId = 'InvalidNCName' } }
                        }
                        $Value = $null;
                    }
                }
            }
        }
        if ($null -ne $ErrorSplat) {
            $ErrorSplat['ErrorId'] = "$ErrorIdBase`:$CategoryTargetName`:$($ErrorSplat['ErrorId'])";
            if ($PSBoundParameters.ContainsKey('TargetObject')) { $ErrorSplat['TargetObject'] = $TargetObject } else { if ($null -ne $InputObject) { $ErrorSplat['TargetObject'] = $InputObject } }
            if ($PSBoundParameters.ContainsKey('CategoryTargetName')) { $ErrorSplat['CategoryTargetName'] = $CategoryTargetName }
            Write-Error @ErrorSplat -Category InvalidArgument;
            $false | Write-Output;
        } else {
            ($Value -ne $null) | Write-Output;
        }
    }
}

Function Test-UriString {
    <#
        .SYNOPSIS
            Tests whether a URI is valid.

        .DESCRIPTION
            Tests whether a value is a valid URI.

        .OUTPUTS
            System.Boolean. True if the value is a valid URI; otherwise, false.
    #>
    [CmdletBinding(DefaultParameterSetName = 'WriteError')]
    [OutputType([bool])]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [AllowEmptyString()]
        [AllowEmptyCollection()]
        [AllowNull()]
        # The object to test.
        [object]$InputObject,
        
        # Specifies that InputObject can be cast to a string value if it is not already a string value, Uri or UriBuilder object.
        [switch]$CanCast,
        
        # Specifies that a Uri object can be used.
        [switch]$AllowUriObject,
        
        # Specifies that a UriBuilder object can be used.
        [switch]$AllowUriBuilder,
        
        # Specifies that an empty string value is considered to be valid.
        [switch]$AllowEmpty,

        # Specifies the kind of Uri that is considered to be valid.
        [UriKind]$Kind = [UriKind]::RelativeOrAbsolute,
        
        # Specifies the name of the object that is being processed.
        [string]$CategoryTargetName = 'Input object',
        
        [AllowEmptyString()]
        [AllowEmptyCollection()]
        # The object that is being processed.
        [object]$TargetObject,

        [Parameter(ParameterSetName = 'WriteError')]
        # When writing errors, the ErrorId will start with this value, followed by a colon (:), then by additional characters which will uniquely identify the error.
        [string]$ErrorIdBase = 'Test-UriString',

        [Parameter(Mandatory = $true, ParameterSetName = 'WriteError')]
        # Specifies that an error should be written to the error stream if the test fails.
        [switch]$WriteError,
        
        [Parameter(ParameterSetName = 'Warn')]
        # Specifies that a warning should be written to the warning stream if the test fails.
        [switch]$Warn
    )

    Process {
        $ErrorSplat = $null;
        [string]$Value = $null;
        if ($null -eq $InputObject) {
            if ($Warn.IsPresent) {
                Write-Warning -Message "$CategoryTargetName is null";
            } else {
                if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName is null"; ErrorId = 'NullValue' } }
            }
        } else {
            [Uri]$Uri = $null;
            $ErrorObj = $null;
            if ($InputObject -is [string]) {
                $Value = $InputObject;
            } else {
                if ($InputObject -is [Uri]) {
                    if ($AllowUriObject.IsPresent) {
                        $Uri = $InputObject;
                    } else {
                        if ($Warn.IsPresent) {
                            if ($AllowUriBuilder.IsPresent) {
                                Write-Warning -Message "$CategoryTargetName is not a string value or UriBuilder object";
                            } else {
                                Write-Warning -Message "$CategoryTargetName is not a string value";
                            }
                        } else {
                            if ($WriteError.IsPresent) {
                                if ($AllowUriBuilder.IsPresent) {
                                    $ErrorSplat = @{ Message = "$CategoryTargetName is not a string value or UriBuilder object"; ErrorId = 'NotAStringOrUriBuilder' };
                                } else {
                                    $ErrorSplat = @{ Message = "$CategoryTargetName is not a string value"; ErrorId = 'NotAString' };
                                }
                            }
                        }
                    }
                } else {
                    if ($InputObject -is [UriBuilder]) {
                        if ($AllowUriBuilder.IsPresent) {
                            try { $Uri = $InputObject.Uri } catch { $ErrorObj = $_ }
                            if ($null -eq $Uri) {
                                if ($Warn.IsPresent) {
                                    if ($null -eq $ErrorObj) {
                                        Write-Warning -Message "$CategoryTargetName does not contain a URI value";
                                    } else {
                                        Write-Warning -Message "$CategoryTargetName does not contain a URI value: $ErrorObj";
                                    }
                                } else {
                                    if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName does not contain a URI value"; ErrorId = 'NoURI' } }
                                }
                            }
                        } else {
                            if ($Warn.IsPresent) {
                                if ($AllowUriObject.IsPresent) {
                                    Write-Warning -Message "$CategoryTargetName is not a string value or Uri object";
                                } else {
                                    Write-Warning -Message "$CategoryTargetName is not a string value";
                                }
                            } else {
                                if ($WriteError.IsPresent) {
                                    if ($AllowUriObject.IsPresent) {
                                        $ErrorSplat = @{ Message = "$CategoryTargetName is not a string value or Uri object"; ErrorId = 'NotAStringOrUri' };
                                    } else {
                                        $ErrorSplat = @{ Message = "$CategoryTargetName is not a string value"; ErrorId = 'NotAString' };
                                    }
                                }
                            }
                        }
                    } else {
                        if ($CanCast) {
                            try { [string]$Value = $InputObject } catch { $ErrorObj = $_ }
                            if ($null -eq $Value) {
                                if ($Warn.IsPresent) {
                                    if ($null -eq $ErrorObj) {
                                        Write-Warning -Message "$CategoryTargetName cannot be cast to a string value";
                                    } else {
                                        Write-Warning -Message "$CategoryTargetName cannot be cast to a string value: $ErrorObj";
                                    }
                                } else {
                                    if ($WriteError.IsPresent) {
                                        $ErrorSplat = @{ Message = "$CategoryTargetName cannot be cast to a string value"; ErrorId = 'InvalidType' };
                                    }
                                }
                            }
                        } else {
                            if ($Warn.IsPresent) {
                                if ($AllowUriObject.IsPresent) {
                                    if ($AllowUriBuilder.IsPresent) {
                                        Write-Warning -Message "$CategoryTargetName is not a string value, Uri or UriBuilder object";
                                    } else {
                                        Write-Warning -Message "$CategoryTargetName is not a string value or Uri object";
                                    }
                                } else {
                                    if ($AllowUriBuilder.IsPresent) {
                                        Write-Warning -Message "$CategoryTargetName is not a string value or UriBuilder object";
                                    } else {
                                        Write-Warning -Message "$CategoryTargetName is not a string value";
                                    }
                                }
                            } else {
                                if ($WriteError.IsPresent) {
                                    $ErrorSplat = @{ ErrorId = 'InvalidType' };
                                    if ($AllowUriObject.IsPresent) {
                                        if ($AllowUriBuilder.IsPresent) {
                                            $ErrorSplat['Message'] = "$CategoryTargetName is not a string value, Uri or UriBuilder object";
                                        } else {
                                            $ErrorSplat['Message'] = "$CategoryTargetName is not a string value or Uri object";
                                        }
                                    } else {
                                        if ($AllowUriBuilder.IsPresent) {
                                            $ErrorSplat['Message'] = "$CategoryTargetName is not a string value or UriBuilder object";
                                        } else {
                                            $ErrorSplat['Message'] = "$CategoryTargetName is not a string value";
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if ($null -ne $Value) {
                if ($Value.Trim().Length -eq 0) {
                    if (-not $AllowEmpty) {
                        $Value = $null;
                        if ($Warn.IsPresent) {
                            Write-Warning -Message "$CategoryTargetName cannot be empty";
                        } else {
                            if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName cannot be empty"; ErrorId = 'Empty' } }
                        }
                    }
                } else {
                    if (-not [Uri]::TryCreate($Value, $Kind, [ref]$Uri)) {
                        $Value = $null;
                        if ($Warn.IsPresent) {
                            Write-Warning -Message "$CategoryTargetName is not a valid URI string";
                        } else {
                            if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName is not a valid URI string"; ErrorId = 'InvalidURI' } }
                        }
                    }
                }
            } else {
                if ($null -ne $Uri) {
                    if ($Kind -eq [UriKind]::Absolute) {
                        if ($Uri.IsAbsoluteUri) {
                            $Value = $Uri.AbsoluteUri;
                        } else {
                            if ($Warn.IsPresent) {
                                Write-Warning -Message "$CategoryTargetName is not an absolute URI";
                            } else {
                                if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName is not an absolute URI"; ErrorId = 'NotAbsolute' } }
                            }
                        }
                    } else {
                        if ($Kind -eq [UriKind]::Relative) {
                            if ($Uri.IsAbsoluteUri) {
                                if ($Warn.IsPresent) {
                                    Write-Warning -Message "$CategoryTargetName is not a relative URI";
                                } else {
                                    if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName is not a relative URI"; ErrorId = 'NotAbsolute' } }
                                }
                            } else {
                                $Value = $Uri.ToString();
                            }
                        } else {
                            $Value = $Uri.ToString();
                        }
                    }
                }
            }
        }
        if ($null -ne $ErrorSplat) {
            $ErrorSplat['ErrorId'] = "$ErrorIdBase`:$CategoryTargetName`:$($ErrorSplat['ErrorId'])";
            if ($PSBoundParameters.ContainsKey('TargetObject')) { $ErrorSplat['TargetObject'] = $TargetObject } else { $ErrorSplat['TargetObject'] = $InputObject }
            if ($PSBoundParameters.ContainsKey('CategoryTargetName')) { $ErrorSplat['CategoryTargetName'] = $CategoryTargetName }
            if ($null -ne $ErrorObj) { $ErrorSplat['CategoryReason'] = ($ErrorObj | Out-String).Trim() }
            Write-Error @ErrorSplat -Category InvalidArgument;
            $false | Write-Output;
        } else {
            ($Value -ne $null) | Write-Output;
        }
    }
}

Function Test-AttributeArgument {
    <#
        .SYNOPSIS
            Tests whether a Hashtable representing an XML attribute argument contains valid keys and values.

        .DESCRIPTION
            Tests whether a Hashtable representing an XML attribute argument contains the following: A 'Name' key whose value is a valid NCName; A 'Value' key that is not null and can be cast to a string value;
            If present, the value of the 'NamespaceURI' key is null, an empty string or an absolute URI.

        .OUTPUTS
            System.Boolean. True if the Hashtable representing an XML attribute filter contains valid keys and values; otherwise, false.
    #>
    [CmdletBinding(DefaultParameterSetName = 'WriteError')]
    [OutputType([bool])]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [AllowEmptyCollection()]
        # The Hashtable to test.
        [Hashtable]$Filter,
        
        # Specifies the name of the object that is being processed.
        [string]$CategoryTargetName,
        
        [AllowEmptyString()]
        [AllowEmptyCollection()]
        # The object that is being processed.
        [object]$TargetObject,

        [Parameter(ParameterSetName = 'WriteError')]
        # When writing errors, the ErrorId will start with this value, followed by a colon (:), then by additional characters which will uniquely identify the error.
        [string]$ErrorIdBase = 'Test-AttributeFilter',

        [Parameter(Mandatory = $true, ParameterSetName = 'WriteError')]
        # Specifies that an error should be written to the error stream if the test fails.
        [switch]$WriteError,
        
        [Parameter(ParameterSetName = 'Warn')]
        # Specifies that a warning should be written to the warning stream if the test fails.
        [switch]$Warn
    )

    Process {
        $ErrorObj = $ErrorSplat = $null;
        $Success = $Filter.ContainsKey('Name');
        if ($Success) {
            if ($Filter.ContainsKey('Value')) {
                $Splat = @{ }
                if ($PSBoundParameters.ContainsKey('CategoryTargetName')) { $Splat['CategoryTargetName'] = $CategoryTargetName } else { $Splat['CategoryTargetName'] = 'Name' }
                if ($PSBoundParameters.ContainsKey('TargetObject')) { $Splat['TargetObject'] = $TargetObject } else {  $Splat['TargetObject'] = $Filter }
                if ($Warn.IsPresent) { $Splat['Warn'] = $Warn } else { if ($WriteError.IsPresent) { $Splat['WriteError'] = $WriteError } }
                $Success = Test-NCName @Splat -InputObject $Filter['Name'] -ErrorIdBase $ErrorIdBase -CategoryTargetName 'Name' -CanCast;
                if ($Success) {
                    $Success = $null -ne $Filter['Value'];
                    if ($Success) {
                        try { [string]$Value = $Filter['Value'] } catch { $ErrorObj = $_ }
                        $Success = $null -ne $Value;
                        if (-not $Success) {
                            if ($Warn.IsPresent) {
                                if ($null -eq $ErrorObj) {
                                    Write-Warning -Message "The value for the 'Value' key in $CategoryTargetName cannot be cast to a string value";
                                } else {
                                    Write-Warning -Message "The value for the 'Value' key in $CategoryTargetName cannot be cast to a string value: $ErrorObj";
                                }
                            } else {
                                if ($WriteError.IsPresent) {
                                    $ErrorSplat = @{ Message = "The value for the 'Value' key in $CategoryTargetName cannot be cast to a string value"; ErrorId = 'InvalidType' };
                                }
                            }
                        }
                    } else {
                        if ($Warn.IsPresent) {
                           Write-Warning -Message "Value key in $CategoryTargetName cannot be null";
                        } else {
                            if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "Value key in $CategoryTargetName cannot be null"; ErrorId = 'ValueNull' }; }
                        }
                    }
                }
                $NamespaceURI = $null;
                if ($Success) {
                    $TargetName = 'NamespaceURI';
                    if ($Filter.ContainsKey('NamespaceURI')) {
                        $NamespaceURI = $Filter['NamespaceURI'];
                    } else {
                        if ($Filter.ContainsKey('Namespace')) {
                            $TargetName = 'Namespace';
                            $NamespaceURI = $Filter['Namespace'];
                        } else {
                            $TargetName = 'NS';
                            if ($Filter.ContainsKey('NS')) { $NamespaceURI = $Filter['NS'] }
                        }
                    }
                    if ($null -ne $NamespaceURI) {
                        $Splat = @{ };
                        if ($PSBoundParameters.ContainsKey('CategoryTargetName')) { $Splat['CategoryTargetName'] = $CategoryTargetName } else { $Splat['CategoryTargetName'] = 'Name' }
                        if ($PSBoundParameters.ContainsKey('TargetObject')) { $Splat['TargetObject'] = $TargetObject } else {  $Splat['TargetObject'] = $Filter }
                        if ($Warn.IsPresent) { $Splat['Warn'] = $Warn } else { if ($WriteError.IsPresent) { $Splat['WriteError'] = $WriteError } }
                        $Success = Test-UriString @Splat -InputObject $NamespaceURI -CategoryTargetName $TargetName -ErrorIdBase $ErrorIdBase -CanCast -AllowUriObject -AllowUriBuilder -AllowEmpty -Kind Absolute;
                    }
                }
            } else {
                if ($Warn.IsPresent) {
                   Write-Warning -Message "Value key is not present in $CategoryTargetName";
                } else {
                    if ($WriteError.IsPresent) {
                        $ErrorSplat = @{ Message = "Value key is not present in $CategoryTargetName"; ErrorId = 'ValueMissing' };
                    }
                }
            }
        } else {
            if ($Warn.IsPresent) {
               Write-Warning -Message "Name key is not present in $CategoryTargetName";
            } else {
                if ($WriteError.IsPresent) {
                    $ErrorSplat = @{ Message = "Name key is not present in $CategoryTargetName"; ErrorId = 'NameMissing' };
                }
            }
        }
        if ($null -ne $ErrorSplat) {
            $ErrorSplat['ErrorId'] = "$ErrorIdBase`:$CategoryTargetName`:$($ErrorSplat['ErrorId'])";
            if ($PSBoundParameters.ContainsKey('TargetObject')) { $ErrorSplat['TargetObject'] = $TargetObject } else { $ErrorSplat['TargetObject'] = $Filter }
            if ($PSBoundParameters.ContainsKey('CategoryTargetName')) { $ErrorSplat['CategoryTargetName'] = $CategoryTargetName }
            if ($null -ne $ErrorObj) { $ErrorSplat['CategoryReason'] = ($ErrorObj | Out-String).Trim() }
            Write-Error @ErrorSplat -Category InvalidArgument;
            $false | Write-Output;
        } else {
            $Success | Write-Output;
        }
    }
}

Function Test-XmlElement {
    <#
        .SYNOPSIS
            Tests whether a value is a valid XML element.

        .DESCRIPTION
            Tests whether an object is a valid XML element.

        .OUTPUTS
            System.Boolean. True if the object is a valid XML element; otherwise, false.
    #>
    [CmdletBinding(DefaultParameterSetName = 'WriteError')]
    [OutputType([bool])]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [AllowEmptyString()]
        [AllowEmptyCollection()]
        [AllowNull()]
        # The object to test.
        [object]$InputObject,
        
        [ValidateScript({ $_ | Test-NCName -CategoryTargetName 'LocalName' -ErrorIdBase 'Test-XmlDocument' -WriteError })]
        # Specifies local XML element names that are considered to be valid. If not specified, then any local name will be valid.
        [string[]]$LocalName,

        [ValidateScript({ $null -eq $_ -or (Test-UriString -InputObject $_ -Kind Absolute -CategoryTargetName 'NamespaceURI' -ErrorIdBase 'Test-XmlDocument' -CanCast -AllowUriObject -AllowUriBuilder -AllowEmpty -WriteError) })]
        [AllowEmptyString()]
        [AllowNull()]
        # Specifies the namespace URI that is considered to be valid. If null, any namespace is valid. If not specified, then only XHTML elements are valid.
        [object]$NamespaceURI = 'http://www.w3.org/1999/xhtml',
        
        # Specifies the name of the object that is being processed.
        [string]$CategoryTargetName = 'Input object',
        
        [AllowEmptyString()]
        [AllowEmptyCollection()]
        # The object that is being processed.
        [object]$TargetObject,

        [Parameter(ParameterSetName = 'WriteError')]
        # When writing errors, the ErrorId will start with this value, followed by a colon (:), then by additional characters which will uniquely identify the error.
        [string]$ErrorIdBase = 'Test-XmlElement',

        [Parameter(Mandatory = $true, ParameterSetName = 'WriteError')]
        # Specifies that an error should be written to the error stream if the test fails.
        [switch]$WriteError,
        
        [Parameter(ParameterSetName = 'Warn')]
        # Specifies that a warning should be written to the warning stream if the test fails.
        [switch]$Warn,

        # Ignore case when LocalName is specified.
        [switch]$IgnoreNameCase,

        [AllowNull()]
        # Specifies that the element is valid only if it occurs before the referenced node. If null, then element is valid only if it is the last node.
        [System.Xml.XmlNode]$Before,

        [AllowNull()]
        # Specifies that the element is valid only if it occurs after the referenced node. If null, then element is valid only if it is the first node.
        [System.Xml.XmlNode]$After,
        
        [AllowNull()]
        # Specifies that the element is valid only if the referenced element is the next element. If null, then element is valid only if it is the last element.
        [System.Xml.XmlElement]$NextElement,
        
        [AllowNull()]
        # Specifies that the element is valid only if the referenced element is the previous element. If null, then element is valid only if it is the first element.
        [System.Xml.XmlElement]$PreviousElement,
        
        [AllowNull()]
        # Specifies that the element is valid only if the referenced node is the next sibling. If null, then element is valid only if it is the last node.
        [System.Xml.XmlNode]$NextSibling,
        
        [AllowNull()]
        # Specifies that the element is valid only if the referenced node is the previous sibling. If null, then element is valid only if it is the first node.
        [System.Xml.XmlNode]$PreviousSibling
    )

    Process {
        $Success = $true;
        if ($null -eq $InputObject) {
            if ($Warn.IsPresent) {
                Write-Warning -Message "$CategoryTargetName is null";
            } else {
                if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName is null"; ErrorId = 'NullValue' } }
            }
            $Success = $false;
        } else {
            if ($InputObject -is [System.Xml.XmlElement]) {
                [System.Xml.XmlElement]$XmlElement = $null;
                if ($PSBoundParameters.ContainsKey($LocalName)) {
                    if ($IgnoreNameCase.IsPresent) {
                        if ($LocalName -icontains $LocalName) { $XmlElement = $InputObject; }
                    } else {
                        if ($LocalName -cnotcontains $LocalName) { $XmlElement = $InputObject; }
                    }
                } else {
                    $XmlElement = $InputObject;
                }
                if ($null -eq $XmlElement) {
                    if ($Warn.IsPresent) {
                        Write-Warning -Message "$CategoryTargetName name is not valid";
                    } else {
                        if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName name is not valid"; ErrorId = 'InvalidName' } }
                    }
                    $Success = $false;
                } else {
                    if ($null -ne $NamespaceURI -and $XmlElement.NamespaceURI -cne $NamespaceURI) {
                        $Success = $false;
                        if ($Warn.IsPresent) {
                            Write-Warning -Message "$CategoryTargetName name is not valid";
                        } else {
                            if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName namespace URI is not valid"; ErrorId = 'InvalidName' } }
                        }
                    } else {
                        if ($PSBoundParameters.ContainsKey('Before')) {
                            if ($null -eq $Before) {
                                $Success = $null -eq $XmlElement.NextSibling;
                                if (-not $Success) {
                                    if ($Warn.IsPresent) {
                                        Write-Warning -Message "$CategoryTargetName is not the last node";
                                    } else {
                                        if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName is not the last node"; ErrorId = 'NotLastNode' } }
                                    }
                                }
                            } else {
                                $Success = $false;
                                for ($n = $XmlElement.NextSibling; $null -ne $n; $n = $n.NextSibling) {
                                    if ([object]::ReferenceEquals($n, $Before)) {
                                        $Success = $true;
                                        break;
                                    }
                                }
                                if (-not $Success) {
                                    if ($Warn.IsPresent) {
                                        Write-Warning -Message "$CategoryTargetName does not occur before the referenced node";
                                    } else {
                                        if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName does not occur before the referenced node"; ErrorId = 'NotBeforeNode' } }
                                    }
                                }
                            }
                        }
                        if ($Success -and $PSBoundParameters.ContainsKey('After')) {
                            if ($null -eq $After) {
                                $Success = $null -eq $XmlElement.PreviousSibling;
                                if (-not $Success) {
                                    if ($Warn.IsPresent) {
                                        Write-Warning -Message "$CategoryTargetName is not the first node";
                                    } else {
                                        if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName is not the first node"; ErrorId = 'NotFirstNode' } }
                                    }
                                }
                            } else {
                                $Success = $false;
                                for ($n = $XmlElement.PreviousSibling; $null -ne $n; $n = $n.PreviousSibling) {
                                    if ([object]::ReferenceEquals($n, $After)) {
                                        $Success = $true;
                                        break;
                                    }
                                }
                                if (-not $Success) {
                                    if ($Warn.IsPresent) {
                                        Write-Warning -Message "$CategoryTargetName does not occur after the referenced node";
                                    } else {
                                        if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName does not occur after the referenced node"; ErrorId = 'NotAfterNode' } }
                                    }
                                }
                            }
                        }
                        if ($Success -and $PSBoundParameters.ContainsKey('NextElement')) {
                            $Sibling = $XmlElement.NextSibling;
                            while ($null -ne $Sibling -and $Sibling -isnot [System.Xml.XmlElement]) { $Sibling = $Sibling.NextSibling }
                            if ($null -eq $NextElement) {
                                $Success = $null -eq $Sibling;
                                if (-not $Success) {
                                    if ($Warn.IsPresent) {
                                        Write-Warning -Message "$CategoryTargetName is not the last element";
                                    } else {
                                        if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName is not the last element"; ErrorId = 'NotLastElement' } }
                                    }
                                }
                            } else {
                                $Success = $null -ne $Sibling -and [object]::ReferenceEquals($Sibling, $NextElement);
                                if (-not $Success) {
                                    if ($Warn.IsPresent) {
                                        Write-Warning -Message "Referenced element is not the next sibling element of $CategoryTargetName";
                                    } else {
                                        if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "Referenced element is not the next sibling element of $CategoryTargetName"; ErrorId = 'NotNextElement' } }
                                    }
                                }
                            }
                        }
                        if ($Success -and $PSBoundParameters.ContainsKey('PreviousElement')) {
                            $Sibling = $XmlElement.PreviousSibling;
                            while ($null -ne $Sibling -and $Sibling -isnot [System.Xml.XmlElement]) { $Sibling = $Sibling.PreviousSibling }
                            if ($null -eq $PreviousElement) {
                                $Success = $null -eq $Sibling;
                                if (-not $Success) {
                                    if ($Warn.IsPresent) {
                                        Write-Warning -Message "$CategoryTargetName is not the first element";
                                    } else {
                                        if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName is not the first element"; ErrorId = 'NotFirstElement' } }
                                    }
                                }
                            } else {
                                $Success = $null -ne $Sibling -and [object]::ReferenceEquals($Sibling, $PreviousElement);
                                if (-not $Success) {
                                    if ($Warn.IsPresent) {
                                        Write-Warning -Message "Referenced element is not the next sibling element of $CategoryTargetName";
                                    } else {
                                        if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "Referenced element is not the next sibling element of $CategoryTargetName"; ErrorId = 'NotPreviousElement' } }
                                    }
                                }
                            }
                        }

                        
                        if ($Success -and $PSBoundParameters.ContainsKey('NextSibling')) {
                            if ($null -eq $NextSibling) {
                                $Success = $null -eq $XmlElement.NextSibling;
                                if (-not $Success) {
                                    if ($Warn.IsPresent) {
                                        Write-Warning -Message "$CategoryTargetName is not the last node";
                                    } else {
                                        if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName is not the last node"; ErrorId = 'NotLastNode' } }
                                    }
                                }
                            } else {
                                $Success = $null -ne $XmlElement.NextSibling -and [object]::ReferenceEquals($XmlElement.NextSibling, $NextSibling);
                                if (-not $Success) {
                                    if ($Warn.IsPresent) {
                                        Write-Warning -Message "Referenced node is not the next sibling of $CategoryTargetName";
                                    } else {
                                        if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "Referenced node is not the next sibling of $CategoryTargetName"; ErrorId = 'NotNextSibling' } }
                                    }
                                }
                            }
                        }
                        if ($Success -and $PSBoundParameters.ContainsKey('PreviousSibling')) {
                            if ($null -eq $PreviousSibling) {
                                $Success = $null -eq $XmlElement.PreviousSibling;
                                if (-not $Success) {
                                    if ($Warn.IsPresent) {
                                        Write-Warning -Message "$CategoryTargetName is not the first node";
                                    } else {
                                        if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName is not the first node"; ErrorId = 'NotFirstNode' } }
                                    }
                                }
                            } else {
                                $Success = $null -ne $XmlElement.PreviousSibling -and [object]::ReferenceEquals($XmlElement.PreviousSibling, $PreviousElement);
                                if (-not $Success) {
                                    if ($Warn.IsPresent) {
                                        Write-Warning -Message "Referenced node is not the next sibling of $CategoryTargetName";
                                    } else {
                                        if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "Referenced node is not the next sibling of $CategoryTargetName"; ErrorId = 'NotPreviousSibling' } }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                $Success = $false;
                if ($InputObject -is [System.Xml.XmlNode]) {
                    if ($Warn.IsPresent) {
                        Write-Warning -Message "$CategoryTargetName is not an XmlElement";
                    } else {
                        if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName is not an XmlElement"; ErrorId = 'NotXmlElement' } }
                    }
                } else {
                    if ($Warn.IsPresent) {
                        Write-Warning -Message "$CategoryTargetName is not an XmlNode";
                    } else {
                        if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName is not an XmlNode"; ErrorId = 'NotXmlElement' } }
                    }
                }
            }
        }
        if ($null -ne $ErrorSplat) {
            $ErrorSplat['ErrorId'] = "$ErrorIdBase`:$CategoryTargetName`:$($ErrorSplat['ErrorId'])";
            if ($PSBoundParameters.ContainsKey('TargetObject')) { $ErrorSplat['TargetObject'] = $TargetObject } else { if ($null -ne $InputObject) { $ErrorSplat['TargetObject'] = $InputObject } }
            if ($PSBoundParameters.ContainsKey('CategoryTargetName')) { $ErrorSplat['CategoryTargetName'] = $CategoryTargetName }
            if ($null -ne $ErrorObj) { $ErrorSplat['CategoryReason'] = ($ErrorObj | Out-String).Trim() }
            Write-Error @ErrorSplat -Category InvalidArgument;
            $false | Write-Output;
        } else {
            $Success | Write-Output;
        }
    }
}

Function Test-XmlDocument {
    <#
        .SYNOPSIS
            Tests whether a value is a valid XML document.

        .DESCRIPTION
            Tests whether an object is a valid XML document.

        .OUTPUTS
            System.Boolean. True if the object is a valid XML document; otherwise, false.
    #>
    [CmdletBinding(DefaultParameterSetName = 'WriteError')]
    [OutputType([bool])]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [AllowEmptyString()]
        [AllowEmptyCollection()]
        [AllowNull()]
        # The object to test.
        [object]$InputObject,
        
        [ValidateScript({ $_ | Test-NCName -CategoryTargetName 'LocalName' -ErrorIdBase 'Test-XmlDocument' -WriteError })]
        # Specifies local XML element names that are considered to be valid for the document element. If not specified, then any local name will be valid.
        [string[]]$LocalName,

        [ValidateScript({ $null -eq $_ -or (Test-UriString -InputObject $_ -Kind Absolute -CategoryTargetName 'NamespaceURI' -ErrorIdBase 'Test-XmlDocument' -CanCast -AllowUriObject -AllowUriBuilder -AllowEmpty -WriteError) })]
        [AllowEmptyString()]
        [AllowNull()]
        # Specifies the namespace URI that is considered to be valid for the document element. If null, any namespace is valid. If not specified, then only XHTML elements are valid.
        [object]$NamespaceURI = 'http://www.w3.org/1999/xhtml',
        
        [AllowEmptyString()]
        [AllowNull()]
        # Specifies the document type SystemId that is to be valid. If null, then the document type is ignored; otherwise the Name of the DocumentType LocalName must match the LocalName of the root element.
        [string]$DocumentType = 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd',

        # Specifies the name of the object that is being processed.
        [string]$CategoryTargetName = 'Input object',
        
        [AllowEmptyString()]
        [AllowEmptyCollection()]
        # The object that is being processed.
        [object]$TargetObject,

        [Parameter(ParameterSetName = 'WriteError')]
        # When writing errors, the ErrorId will start with this value, followed by a colon (:), then by additional characters which will uniquely identify the error.
        [string]$ErrorIdBase = 'Test-XmlDocument',

        [Parameter(Mandatory = $true, ParameterSetName = 'WriteError')]
        # Specifies that an error should be written to the error stream if the test fails.
        [switch]$WriteError,
        
        [Parameter(ParameterSetName = 'Warn')]
        # Specifies that a warning should be written to the warning stream if the test fails.
        [switch]$Warn,

        # Ignore case when LocalName is specified.
        [switch]$IgnoreNameCase
    )
    
    Process {
        $Success = ($null -ne $InputObject);
        if ($Success) {
            $Success = ($InputObject -is [System.Xml.XmlDocument]);
            if ($Success) {
                $Success = $null -ne $InputObject.DocumentElement;
                if ($Success) {
                    $Splat = @{ };
                    if ($PSBoundParameters.ContainsKey('LocalName')) {
                        $Splat['LocalName'] = $LocalName;
                        $Splat['NamespaceURI'] = $NamespaceURI;
                    } else {
                        if ($null -ne $NamespaceURI) { $Splat['NamespaceURI'] = $NamespaceURI }
                    }
                    if ($Splat.Count -gt 0) {
                        if ($PSBoundParameters.ContainsKey('CategoryTargetName')) { $Splat['CategoryTargetName'] = $CategoryTargetName }
                        if ($PSBoundParameters.ContainsKey('TargetObject')) { $Splat['TargetObject'] = $TargetObject } else { if ($null -ne $InputObject) { $Splat['TargetObject'] = $InputObject } }
                        if ($IgnoreNameCase.IsPresent) { $Splat['IgnoreNameCase'] = $IgnoreNameCase }
                        if ($WriteError.IsPresent) { $Splat['WriteError'] = $WriteError } else { if ($Warn.IsPresent) { $Splat['Warn'] = $Warn } }
                        $Success = Test-XmlElement $Splat -InputObject $InputObject.DocumentElement -ErrorIdBase $ErrorIdBase -CategoryTargetName 'DocumentElement';
                    }
                    if ($Success -and $null -ne $DocumentType) {
                        $Success = ($null -ne $InputObject.DocumentType);
                        if ($Success) {
                            $Success = -not ([string]::IsNullOrEmpty($InputObject.DocumentType.LocalName) -or $InputObject.DocumentType.LocalName -cne $InputObject.DocumentElement.LocalName);
                            if ($Success) {
                                if ([string]::IsNullOrWhiteSpace($InputObject.DocumentType.SystemId)) {
                                    $Success = ($DocumentType.Trim().Length -eq 0);
                                } else {
                                    $Success = ($InputObject.DocumentType.SystemId -ceq $DocumentType);
                                }
                                if (-not $Success) {
                                    if ($Warn.IsPresent) {
                                        Write-Warning -Message "$CategoryTargetName DocumentType SystemId is invalid";
                                    } else {
                                        if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName DocumentType SystemId is invalid"; ErrorId = 'InvalidDTD' } }
                                    }
                                }
                            } else {
                                if ($Warn.IsPresent) {
                                    Write-Warning -Message "$CategoryTargetName DocumentType LocalName is invalid";
                                } else {
                                    if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName DocumentType LocalName is invalid"; ErrorId = 'InvalidDTD' } }
                                }
                            }
                        } else {
                            if ($Warn.IsPresent) {
                                Write-Warning -Message "$CategoryTargetName does not contain a DocumentType";
                            } else {
                                if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName does not contain a DocumentType"; ErrorId = 'NoDTD' } }
                            }
                        }
                    }
                } else {
                    if ($Warn.IsPresent) {
                        Write-Warning -Message "$CategoryTargetName does not contain a root element";
                    } else {
                        if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName does not contain a root element"; ErrorId = 'NoRootElement' } }
                    }
                }
            } else {
                if ($InputObject -is [System.Xml.XmlNode]) {
                    if ($Warn.IsPresent) {
                        Write-Warning -Message "$CategoryTargetName is not an XmlDocument";
                    } else {
                        if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName is not an XmlElement"; ErrorId = 'NotXmlDocument' } }
                    }
                } else {
                    if ($Warn.IsPresent) {
                        Write-Warning -Message "$CategoryTargetName is not an XmlNode";
                    } else {
                        if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName is not an XmlNode"; ErrorId = 'NotXmlDocument' } }
                    }
                }
            }
        } else {
            if ($Warn.IsPresent) {
                Write-Warning -Message "$CategoryTargetName is null";
            } else {
                if ($WriteError.IsPresent) { $ErrorSplat = @{ Message = "$CategoryTargetName is null"; ErrorId = 'NullValue' } }
            }
        }
        if ($null -ne $ErrorSplat) {
            $ErrorSplat['ErrorId'] = "$ErrorIdBase`:$CategoryTargetName`:$($ErrorSplat['ErrorId'])";
            if ($PSBoundParameters.ContainsKey('TargetObject')) { $ErrorSplat['TargetObject'] = $TargetObject } else { if ($null -ne $InputObject) { $ErrorSplat['TargetObject'] = $InputObject } }
            if ($PSBoundParameters.ContainsKey('CategoryTargetName')) { $ErrorSplat['CategoryTargetName'] = $CategoryTargetName }
            if ($null -ne $ErrorObj) { $ErrorSplat['CategoryReason'] = ($ErrorObj | Out-String).Trim() }
            Write-Error @ErrorSplat -Category InvalidArgument;
            $false | Write-Output;
        } else {
            $Success | Write-Output;
        }
    }
}

Function New-HtmlDocument {
    [CmdletBinding()]
    [OutputType([System.Xml.XmlDocument])]
    Param(
        [bool]$Aside = $false,
        [bool]$Angular = $false
    )
    $XmlDocument.CreateDocumentType
    $HtmlDocument = New-Object -TypeName 'System.Xml.XmlDocument';
    $HtmlDocument.XmlResolver = New-Object -TypeName 'System.Xml.Resolvers.XmlPreloadedResolver' -ArgumentList ([System.Xml.Resolvers.XmlKnownDtds]::Xhtml10);
    $ns = 'http://www.w3.org/1999/xhtml';
    $HtmlDocument.AppendChild($HtmlDocument.CreateElement('html', $ns));
    $HtmlDocument.DocumentElement.Attributes.Append($HtmlDocument.CreateAttribute('lang')).Value = 'en';
    $HeadElement = $HtmlDocument.DocumentElement.AppendChild($HtmlDocument.CreateElement('head'));
    $XmlElement = $HeadElement.AppendChild($HtmlDocument.CreateElement('meta'));
    $XmlElement.Attributes.Append($HtmlDocument.CreateAttribute('name')).Value = 'viewport';
    $XmlElement.Attributes.Append($HtmlDocument.CreateAttribute('content')).Value = 'width=1024, initial-scale=1.0';
    $XmlElement = $HeadElement.AppendChild($HtmlDocument.CreateElement('meta'));
    $XmlElement.Attributes.Append($HtmlDocument.CreateAttribute('http-equiv')).Value = 'X-UA-Compatible';
    $XmlElement.Attributes.Append($HtmlDocument.CreateAttribute('content')).Value = 'ie=edge';
    $XmlElement = $HeadElement.AppendChild($HtmlDocument.CreateElement('meta'));
    $XmlElement.Attributes.Append($HtmlDocument.CreateAttribute('charset')).Value = 'utf-8';
    $HeadElement.AppendChild($HtmlDocument.CreateElement('meta')).InnerText = $Title | Select-Object -Last 1;
    $CssFiles = @('bootstrap/css/bootstrap.css', 'bootstrap/css/bootstrap-grid.css', 'bootstrap-table/bootstrap-table.css');
    $JsFiles = @('/jquery/jquery.js', 'bootstrap/js/bootstrap.bundle.js');
    if ($Angular) {
        $CssFiles += @('angular/angular-csp.css');
        $JsFiles += @('angular/angular.js');
    }
    $CssFiles | ForEach-Object {
        $XmlElement = $HeadElement.AppendChild($HtmlDocument.CreateElement('link'));
        $XmlElement.Attributes.Append($HtmlDocument.CreateAttribute('rel')).Value = 'stylesheet';
        $XmlElement.Attributes.Append($HtmlDocument.CreateAttribute('type')).Value = 'text/css';
        $XmlElement.Attributes.Append($HtmlDocument.CreateAttribute('media')).Value = 'screen';
        $XmlElement.Attributes.Append($HtmlDocument.CreateAttribute('href')).Value = "script/api/$_";
    }
    $JsFiles | ForEach-Object {
        $XmlElement = $HeadElement.AppendChild($HtmlDocument.CreateElement('script'));
        $XmlElement.Attributes.Append($HtmlDocument.CreateAttribute('type')).Value = 'text/javascript';
        $XmlElement.Attributes.Append($HtmlDocument.CreateAttribute('src')).Value = "script/api/$_";
        $XmlElement.InnerText = '';
    }
    $BodyElement = $HtmlDocument.DocumentElement.AppendChild($HtmlDocument.CreateElement('head'));
    $XmlElement = $BodyElement.AppendChild($HtmlDocument.CreateElement('header'));
    $XmlElement.Attributes.Append($HtmlDocument.CreateAttribute('class')).Value = 'container-fluid border border-secondary p-sm-1';
    $XmlElement = $BodyElement.AppendChild($HtmlDocument.CreateElement('nav'));
    $XmlElement.Attributes.Append($HtmlDocument.CreateAttribute('class')).Value = 'container-fluid navbar navbar-expand-lg navbar-light bg-light border border-light p-sm-1 mr-md-3';
    $XmlElement = $XmlElement.AppendChild($HtmlDocument.CreateElement('ul'));
    $XmlElement.Attributes.Append($HtmlDocument.CreateAttribute('class')).Value = 'navbar-nav mr-auto';
    if ($Aside) {
        $XmlElement = $BodyElement.AppendChild($HtmlDocument.CreateElement('div'));
        $XmlElement.Attributes.Append($HtmlDocument.CreateAttribute('class')).Value = 'class';
        $XmlElement = $XmlElement.AppendChild($HtmlDocument.CreateElement('div'));
        $XmlElement.Attributes.Append($HtmlDocument.CreateAttribute('class')).Value = 'row flex-nowrap';
        $XmlElement.AppendChild($HtmlDocument.CreateElement('section')).Attributes.Append($HtmlDocument.CreateAttribute('class')).Value = 'container-fluid border border-light col-md-9 text-dark';
        $XmlElement.AppendChild($HtmlDocument.CreateElement('aside')).Attributes.Append($HtmlDocument.CreateAttribute('class')).Value = 'container-fluid border border-secondary bg-secondary text-secondary col-md-3';
    } else {
        $BodyElement.AppendChild($HtmlDocument.CreateElement('section')).Attributes.Append($HtmlDocument.CreateAttribute('class')).Value = 'container-fluid border border-light p-md-3 text-dark';
    }
    $BodyElement.AppendChild($HtmlDocument.CreateElement('footer')).Attributes.Append($HtmlDocument.CreateAttribute('class')).Value = 'container-fluid border border-secondary p-sm-1 bg-secondary';
    return $HtmlDocument;
}

Function Get-HtmlXmlEntityTranslate {
    [CmdletBinding()]
    [OutputType([System.Collections.Generic.Dictionary[System.Char,System.String]])]
    Param()

    if ($null -eq $Script:__Get_HtmlXmlEntityTranslate) {
        $XmlResolver = New-Object -TypeName 'System.Xml.Resolvers.XmlPreloadedResolver' -ArgumentList ([System.Xml.Resolvers.XmlKnownDtds]::Xhtml10);
        $Script:__Get_HtmlXmlEntityTranslate = [System.Collections.Generic.Dictionary[System.Char,System.String]]::new();
        @('http://www.w3.org/TR/xhtml1/DTD/xhtml-symbol.ent', 'http://www.w3.org/TR/xhtml1/DTD/xhtml-special.ent', 'http://www.w3.org/TR/xhtml1/DTD/xhtml-special.ent') | ForEach-Object {
            [System.IO.Stream]$Stream = $Script:__Get_HtmlXmlEntityTranslate.GetEntity($_, $null, [System.IO.Stream]);
            $DtdDocument = New-Object -TypeName 'System.Xml.XmlDocument';
            try {
                $StreamReader = [System.IO.StreamReader]::new($Stream);
                try { $DtdDocument.LoadXml("<!DOCTYPE html [$($StreamReader.ReadToEnd())]><html />"); }
                finally { $StreamReader.Close() }
            } finally { $Stream.Close() }
            $DtdDocument.ChildNodes | Where-Object { $_ -is [System.Xml.XmlDocumentType] } | ForEach-Object {
                @($_.Entities) | ForEach-Object {
                    if ($_.InnerText.Length -eq 1) {
                        [char]$c = $_.InnerText[0];
                        if ($c -ne '>' -and $c -ne '&' -and $c -ne '>' -and -not $EntityTranslate.ContainsKey($c)) { $EntityTranslate.Add($c, $_.Name) }
                    }
                }
            }
        }
    }

    (,$Script:__Get_HtmlXmlEntityTranslate) | Write-Output;
}

Function Load-HtmlDocument {
    [CmdletBinding()]
    [OutputType([System.Xml.XmlDocument])]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [string]$Path
    )

    Begin {
        if ($null -eq $Script:__LoadHtmlDocument_Settings) {
            $Script:__LoadHtmlDocument_Settings = New-Object -TypeName 'System.Xml.XmlReaderSettings' -Property @{
                XmlResolver = New-Object -TypeName 'System.Xml.Resolvers.XmlPreloadedResolver' -ArgumentList ([System.Xml.Resolvers.XmlKnownDtds]::Xhtml10);
                ProhibitDtd = $false;
                ValidationType = [System.Xml.ValidationType]::None;
                ValidationFlags = ([System.Xml.Schema.XmlSchemaValidationFlags]([System.Xml.Schema.XmlSchemaValidationFlags]::AllowXmlAttributes -bor [System.Xml.Schema.XmlSchemaValidationFlags]::ProcessIdentityConstraints -bor [System.Xml.Schema.XmlSchemaValidationFlags]::ProcessInlineSchema));
            };
        }
    }

    Process {
        $XmlDocument = New-Object -TypeName 'System.Xml.XmlDocument';
        $XmlDocument.XmlResolver = $Script:__LoadHtmlDocument_Settings.XmlResolver;
        $Content = $null;
        if ($Path | Test-Path) {
            $Content = ((Get-Content -Path $Path) | Out-String).Trim() -replace '^<!DOCTYPE[^>]*>\s*', '<!DOCTYPE html SYSTEM "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
        } else {
            $Content = @'
<!DOCTYPE html SYSTEM "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en" />
'@;
        }
        if ($null -ne $Content) {
            $StringReader = [System.IO.StringReader]::new($Content);
            try {
                $XmlReader = [System.Xml.XmlReader]::Create($StringReader, $XmlReaderSettings);
                try { $XmlDocument.Load($XmlReader) }
                finally { $XmlReader.Close(); }
            } finally { $StringReader.Dispose() }
            $XmlDocument | Write-Output;
        }
    }
}

Function Save-HtmlDocument {
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true)]
        [string]$Path,
        
        [Parameter(Mandatory = $true)]
        [ValidateScript({ $_ | Test-XmlDocument -CategoryTargetName 'XmlDocument' -ErrorIdBase 'Save-HtmlDocument' -WriteError })]
        [System.Xml.XmlDocument]$XmlDocument
    )
    
    if ($null -eq $Script:__Save_HtmlDocument_Translate) {
        $XmlResolver = New-Object -TypeName 'System.Xml.Resolvers.XmlPreloadedResolver' -ArgumentList ([System.Xml.Resolvers.XmlKnownDtds]::Xhtml10);
        $Script:__Save_HtmlDocument_Translate = [System.Collections.Generic.Dictionary[System.Char,System.String]]::new();
        @('http://www.w3.org/TR/xhtml1/DTD/xhtml-symbol.ent', 'http://www.w3.org/TR/xhtml1/DTD/xhtml-special.ent', 'http://www.w3.org/TR/xhtml1/DTD/xhtml-special.ent') | ForEach-Object {
            [System.IO.Stream]$Stream = $Script:__Save_HtmlDocument_Translate.GetEntity($_, $null, [System.IO.Stream]);
            $DtdDocument = New-Object -TypeName 'System.Xml.XmlDocument';
            try {
                $StreamReader = [System.IO.StreamReader]::new($Stream);
                try { $DtdDocument.LoadXml("<!DOCTYPE html [$($StreamReader.ReadToEnd())]><html />"); }
                finally { $StreamReader.Close() }
            } finally { $Stream.Close() }
            $DtdDocument.ChildNodes | Where-Object { $_ -is [System.Xml.XmlDocumentType] } | ForEach-Object {
                @($_.Entities) | ForEach-Object {
                    if ($_.InnerText.Length -eq 1) {
                        [char]$c = $_.InnerText[0];
                        if ($c -ne '>' -and $c -ne '&' -and $c -ne '>' -and -not $EntityTranslate.ContainsKey($c)) { $EntityTranslate.Add($c, $_.Name) }
                    }
                }
            }
        }
    }

    $ConvertedDocument = New-Object -TypeName 'System.Xml.XmlDocument';
    $ConvertedDocument.LoadXml($XmlDocument.OuterXml);
    $EntityTranslate = Get-HtmlXmlEntityTranslate;
    foreach ($TextNode in @(@($ConvertedDocument.SelectNodes('//text()')) | Where-Object { $_ -isnot [System.Xml.XmlCDataSection] })) {
        $Text = $TextNode.InnerText;
        $Indexes = @($EntityTranslate.Keys | ForEach-Object {
            $i = $Text.IndexOf($_);
            if ($i -ge 0) { $i | Write-Output }
        } | Sort-Object);
        if ($Indexes.Count -gt 0) {
            $Position = 0;
            $Nodes = @($Indexes | ForEach-Object {
                if ($Position -lt $_) { $ConvertedDocument.CreateTextNode($Text.Substring($Position, $_ - $Position)) }
                $Position = $_ + 1;
                $XmlDocument.CreateEntityReference($EntityTranslate[$Text[$_]]);
            });
            $LastNode = $Nodes[0];
            $TextNode.ParentNode.ReplaceChild($Nodes[0], $TextNode);
            ($Nodes | Select-Object -Skip 1) | ForEach-Object {
                $LastNode.ParentNode.InsertAfter($_, $LastNode);
                $LastNode = $_;
            }
            if ($Position -lt $Text.Length) { $LastNode.ParentNode.InsertAfter($ConvertedDocument.CreateTextNode($Text.Substring($Position)), $LastNode) }
        }
    }
    foreach ($XmlAttribute in @($ConvertedDocument.SelectNodes('//@*'))) {
        foreach ($TextNode in @($XmlAttribute.ChildNodes)) {
            $Text = $TextNode.InnerText;
            $Indexes = @($EntityTranslate.Keys | ForEach-Object {
                $i = $Text.IndexOf($_);
                if ($i -ge 0) { $i | Write-Output }
            } | Sort-Object);
            if ($Indexes.Count -gt 0) {
                $Position = 0;
                $Nodes = @($Indexes | ForEach-Object {
                    if ($Position -lt $_) { $ConvertedDocument.CreateTextNode($Text.Substring($Position, $_ - $Position)) }
                    $Position = $_ + 1;
                    $ConvertedDocument.CreateEntityReference($EntityTranslate[$Text[$_]]);
                });
                $LastNode = $Nodes[0];
                $XmlAttribute.ReplaceChild($Nodes[0], $TextNode);
                ($Nodes | Select-Object -Skip 1) | ForEach-Object {
                    $XmlAttribute.InsertAfter($_, $LastNode);
                    $LastNode = $_;
                }
                if ($Position -lt $Text.Length) { XmlAttribute.InsertAfter($ConvertedDocument.CreateTextNode($Text.Substring($Position)), $LastNode) }
            }
        }
    }
    $XmlWriterSettings = [System.Xml.XmlWriterSettings]::new();
    $XmlWriterSettings.OmitXmlDeclaration = $true;
    $XmlWriterSettings.Encoding = New-Object -TypeName 'System.Text.UTF8Encoding' -ArgumentList $false, $false;
    $XmlWriterSettings.Indent = $true;
    $XmlWriterSettings.CheckCharacters = $false;
    $MemoryStream = [System.IO.MemoryStream]::new();
    try {
        $XmlWriter = [System.Xml.XmlWriter]::Create($MemoryStream, $XmlWriterSettings);
        try {
            $ConvertedDocument.WriteTo($XmlWriter);
            $XmlWriter.Flush();
            $Content = $XmlWriterSettings.Encoding.GetString($MemoryStream.ToArray()) -replace '^<!DOCTYPE[^>]*>', '<!DOCTYPE html>';
            Set-Content -Path $Path -Value $Content -Encoding UTF8;
        } finally { $XmlWriter.Close() }
    } finally { $MemoryStream.Dispose() }
}

Function Find-XmlElement {
    [OutputType([System.Xml.XmlElement])]
    [CmdletBinding(DefaultParameterSetName = 'Child_PosOnly')]
    Param(
        [Parameter(Mandatory = $true, ParameterSetName = 'Child_PosOnly')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Child_AttrText')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Child_AttrPattern')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Child_AttrNumber')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Child_AttrIsTrue')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Child_AttrIsFalse')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Child_AttrPredicate')]
        [System.Xml.XmlElement[]]$Parent,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Filter_AttrText')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Filter_AttrPattern')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Filter_AttrNumber')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Filter_AttrIsTrue')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Filter_AttrIsFalse')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Filter_AttrPredicate')]
        [System.Xml.XmlElement[]]$XmlElement,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Child_PosOnly')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Child_AttrText')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Child_AttrPattern')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Child_AttrNumber')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Child_AttrIsTrue')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Child_AttrIsFalse')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Child_AttrPredicate')]
        [ValidateScript({ Test-NCName -InputObject $_ -CategoryTargetName 'AttributeName' -ErrorIdBase 'Find-XmlElement' -WriteError })]
        [string]$ElementName,
        
        [Parameter(ParameterSetName = 'Child_PosOnly')]
        [Parameter(ParameterSetName = 'Child_AttrText')]
        [Parameter(ParameterSetName = 'Child_AttrPattern')]
        [Parameter(ParameterSetName = 'Child_AttrNumber')]
        [Parameter(ParameterSetName = 'Child_AttrIsTrue')]
        [Parameter(ParameterSetName = 'Child_AttrIsFalse')]
        [Parameter(ParameterSetName = 'Child_AttrPredicate')]
        [ValidateScript({ $null -eq $_ -or (Test-UriString -InputObject $_ -Kind Absolute -CategoryTargetName 'ElementNS' -ErrorIdBase 'Find-XmlElement' -CanCast -AllowUriObject -AllowUriBuilder -AllowEmpty -WriteError) })]
        [AllowEmptyString()]
        [string]$ElementNS = 'http://www.w3.org/1999/xhtml',
        
        [ValidateScript({ Test-NCName -InputObject $_ -CategoryTargetName 'AttributeName' -ErrorIdBase 'Find-XmlElement' -WriteError })]
        [string]$AttributeName,
        
        [ValidateScript({ $null -eq $_ -or (Test-UriString -InputObject $_ -Kind Absolute -CategoryTargetName 'AttributeNS' -ErrorIdBase 'Find-XmlElement' -CanCast -AllowUriObject -AllowUriBuilder -AllowEmpty -WriteError) })]
        [AllowEmptyString()]
        [string]$AttributeNS = '',
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Child_AttrText')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Filter_AttrText')]
        [AllowEmptyString()]
        [string]$Text,
        
        [Parameter(ParameterSetName = 'Child_AttrText')]
        [Parameter(ParameterSetName = 'Filter_AttrText')]
        [StringComparison]$Comparison = [StringComparison]::InvariantCulture,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Child_Regex')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Filter_Regex')]
        [System.Text.RegularExpressions.Regex]$Regex,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Child_AttrPattern')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Filter_AttrPattern')]
        [ValiteScript({ $null -ne (New-Object -TypeName 'System.Text.RegularExpressions.Regex' -ArgumentList $_) })]
        [string]$Pattern,
        
        [Parameter(ParameterSetName = 'Child_AttrPattern')]
        [Parameter(ParameterSetName = 'Filter_AttrPattern')]
        [System.Text.RegularExpressions.RegexOptions[]]$Options,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Child_AttrNumber')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Filter_AttrNumber')]
        [float]$NumberValue,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Child_AttrIsTrue')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Filter_AttrIsTrue')]
        [switch]$IsTrue,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Child_AttrIsFalse')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Filter_AttrIsFalse')]
        [switch]$IsFalse,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Child_AttributeExists')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Filter_AttributeExists')]
        [switch]$Exists,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Child_AttributeNotExists')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Filter_AttributeNotExists')]
        [switch]$DoesNotExist,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Child_AttrPredicate')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Filter_AttrPredicate')]
        [ScriptBlock]$Predicate,
        
        [int]$Position
    )

    [System.Xml.XmlElement[]]$MatchingElements = @();
    if ($PSBoundParameters.ContainsKey('ElementName')) {
        [System.Xml.XmlElement[]]$MatchingElements = @($Parent | Where-Object { -not $_.IsEmpty } | ForEach-Object { $_.ChildNodes | Where-Object { $_ -is [System.Xml.XmlElement] -and $_.LocalName -ceq $ElementName -and $_.NamespaceURI -ceq $ElementNS } });
    } else {
        [System.Xml.XmlElement[]]$MatchingElements = $XmlElement;
    }
    
    if ($MatchingElements.Length -gt 0) {
        switch ($PSCmdlet.ParameterSetName.Split(([char[]]@('_')))[1]) {
            'AttrText' {
                [System.Xml.XmlElement[]]$MatchingElements = @($MatchingElements | Where-Object {
                    $XmlAttribute = $_.Attributes[$AttributeName, $AttributeNS];
                    ($null -ne $XmlAttribute -and [string]::Equals($XmlAttribute.Value, $Text, $Comparison));
                });
                break;
            }
            'Regex' {
                [System.Xml.XmlElement[]]$MatchingElements = @($MatchingElements | Where-Object {
                    $XmlAttribute = $_.Attributes[$AttributeName, $AttributeNS];
                    ($null -ne $XmlAttribute -and $Regex.IsMatch($XmlAttribute.Value));
                });
                break;
            }
            'AttrPattern' {
                [System.Text.RegularExpressions.Regex]$Regex = $null;
                if ($null -ne $Options -and $Options.Length -gt 0) {
                    $o = $Options[0];
                    if ($Options.Length -gt 0) { for ($i = 1; $i -lt $Options.Length; $i++) { [System.Text.RegularExpressions.RegexOptions]$o = $o -bor $Options[$i] } }
                    $Regex = New-Object -TypeName 'System.Text.RegularExpressions.Regex' -ArgumentList $Pattern, $o;
                } else {
                    $Regex = New-Object -TypeName 'System.Text.RegularExpressions.Regex' -ArgumentList $Pattern;
                }
                [System.Xml.XmlElement[]]$MatchingElements = @($MatchingElements | Where-Object {
                    $XmlAttribute = $_.Attributes[$AttributeName, $AttributeNS];
                    ($null -ne $XmlAttribute -and $Regex.IsMatch($XmlAttribute.Value));
                });
                break;
            }
            'AttrNumber' {
                [float]$f = 0;
                [System.Xml.XmlElement[]]$MatchingElements = @($MatchingElements | Foreach-Object {
                    $XmlAttribute = $_.Attributes[$AttributeName, $AttributeNS];
                    ($null -ne $XmlAttribute -and $XmlAttribute.Value.Trim().Length -gt 0 -and [float]::TryParse($XmlAttribute.Value, [ref]$f) -and $f -eq $NumberValue);
                });
                break;
            }
            'AttrIsTrue' {
                [float]$f = 0;
                [System.Xml.XmlElement[]]$MatchingElements = @($MatchingElements | Foreach-Object {
                    $XmlAttribute = $_.Attributes[$AttributeName, $AttributeNS];
                    ($null -ne $XmlAttribute -and $XmlAttribute.Value.Trim().Length -gt 0 -and ($XmlAttribute.Value -eq 'true' -or ([float]::TryParse($XmlAttribute.Value, [ref]$f) -and $f -ne 0)));
                });
                break;
            }
            'AttrIsFalse' {
                [float]$f = 0;
                [System.Xml.XmlElement[]]$MatchingElements = @($MatchingElements | Foreach-Object {
                    $XmlAttribute = $_.Attributes[$AttributeName, $AttributeNS];
                    ($null -ne $XmlAttribute -and $XmlAttribute.Value.Trim().Length -gt 0 -and ($XmlAttribute.Value -eq 'false' -or ([float]::TryParse($XmlAttribute.Value, [ref]$f) -and $f -eq 0)));
                });
                break;
            }
            'AttrPredicate' {
                [float]$f = 0;
                $FloatValues = @($MatchingElements | Foreach-Object {
                    $XmlAttribute = $_.Attributes[$AttributeName, $AttributeNS];
                    ($null -ne $XmlAttribute -and @(@($XmlAttribute.Value) | Where-Object $Predicate).Count -gt 0);
                });
                break;
            }
            'AttributeExists' {
                [System.Xml.XmlElement[]]$MatchingElements = @($MatchingElements | Where-Object { $null -ne $_.Attributes[$AttributeName, $AttributeNS] });
                break;
            }
            'AttributeNotExists' {
                [System.Xml.XmlElement[]]$MatchingElements = @($MatchingElements | Where-Object { $null -eq $_.Attributes[$AttributeName, $AttributeNS] });
                break;
            }
        }
        if ($MatchingElements.Length -gt 0) {
            if ($PSBoundParameters.ContainsKey('Position')) {
                if ($Position -gt 0 -and $Position -le $MatchingElements.Length) {
                    Write-Output -InputObject $MatchingElements[$Position - 1] -NoEnumerate;
                }
            } else {
                Write-Output -InputObject $MatchingElements;
            }
        }
    }
}

Function Add-XmlElement {
    [CmdletBinding()]
    [OutputType([System.Xml.XmlElement])]
    Param(
        [Parameter(Mandatory = $true, ParameterSetName = 'Parent')]
        [System.Xml.XmlElement]$Parent,
        
        [ValidateScript({ Test-NCName -InputObject $_ -CategoryTargetName 'AttributeName' -ErrorIdBase 'Find-XmlElement' -WriteError })]
        [string]$ElementName,
        
        [ValidateScript({ $null -eq $_ -or (Test-UriString -InputObject $_ -Kind Absolute -CategoryTargetName 'ElementNS' -ErrorIdBase 'Find-XmlElement' -CanCast -AllowUriObject -AllowUriBuilder -AllowEmpty -WriteError) })]
        [AllowEmptyString()]
        [string]$ElementNS = 'http://www.w3.org/1999/xhtml',

        [Parameter(Mandatory = $true, ParameterSetName = 'Before')]
        [ValidateScript({ $null -ne $_.ParentNode })]
        [System.Xml.XmlElement]$Before,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'After')]
        [ValidateScript({ $null -ne $_.ParentNode })]
        [System.Xml.XmlElement]$After,

        [ValidateScript({ Test-AttributeArgument -Filter $_ -CategoryTargetName 'OtherAttributes' -ErrorIdBase 'Add-XmlElement' -WriteError })]
        [AllowEmptyCollection()]
        [Hashtable[]]$Attribute,

        # Inner text of element.
        [AllowEmptyString()]
        [string]$InnerText,

        # Add inner text as a CDATA section if InnerText is specified.
        [switch]$CData,

        [Parameter(ParameterSetName = 'Parent')]
        [switch]$FirstElement,

        [switch]$PassThru
    )
    
    [System.Xml.XmlDocument]$XmlDocument = $null;
    if ($PSBoundParameters.ContainsKey('Parent')) {
        $XmlDocument = $Parent.OwnerDocument;
        $b = $null;
        if ($FirstElement.IsPresent) { $b = $Parent.SelectSingleNode('*[1]') }
        if ($null -eq $b) {
            if ([string]::IsNullOrWhiteSpace($ElementNS)) {
                $XmlElement = $Parent.AppendChild($XmlDocument.CreateElement($ElementName));
            } else {
                $XmlElement = $Parent.AppendChild($XmlDocument.CreateElement($ElementName, $ElementNS));
            }
        } else {
            if ([string]::IsNullOrWhiteSpace($ElementNS)) {
                $XmlElement = $Parent.InsertBefore($XmlDocument.CreateElement($ElementName), $b);
            } else {
                $XmlElement = $Parent.InsertBefore($XmlDocument.CreateElement($ElementName, $ElementNS), $b);
            }
        }
    } else {
        if ($PSBoundParameters.ContainsKey('Before')) {
            $XmlDocument = $Before.OwnerDocument;
            if ([string]::IsNullOrWhiteSpace($ElementNS)) {
                $XmlElement = $Before.ParentNode.InsertBefore($XmlDocument.CreateElement($ElementName), $Before);
            } else {
                $XmlElement = $Before.ParentNode.InsertBefore($XmlDocument.CreateElement($ElementName, $ElementNS), $Before);
            }
        } else {
            $XmlDocument = $After.OwnerDocument;
            if ([string]::IsNullOrWhiteSpace($ElementNS)) {
                $XmlElement = $After.ParentNode.InsertAfter($XmlDocument.CreateElement($ElementName), $After);
            } else {
                $XmlElement = $After.ParentNode.InsertAfter($XmlDocument.CreateElement($ElementName, $ElementNS), $After);
            }
        }
    }
    if ($PSBoundParameters.ContainsKey('InnerText')) {
        if ($CData) {
            $XmlElement.AppendChild($XmlDocument.CreateCDataSection($InnerText)) | Out-Null;
        } else {
            $XmlElement.InnerText = $InnerText;
        }
    }
    if ($PSBoundParameters.ContainsKey('Attribute') -and $Attribute.Length -gt 0) {
        $Attribute | ForEach-Object {
            [string]$Name = $_['Name'];
            [string]$Value = $_['Value'];
            if ($_['Value'] -is [bool] -or $_['Value'] -is [char] -or $_['Value'] -is [decimal] -or $_['Value'] -is [sbyte] -or $_['Value'] -is [int16] -or $_['Value'] -is [int] -or $_['Value'] -is [long] -or $_['Value'] -is [byte] -or $_['Value'] -is [uint16] -or $_['Value'] -is [uint32] -or $_['Value'] -is [uint64] -or $_['Value'] -is [float] -or $_['Value'] -is [double] -or $_['Value'] -is [timespan] -or $_['Value'] -is [guid]) {
                $Value = [System.Xml.XmlConvert]::ToString($_['Value']);
            } else {
                if ($_['Value'] -is [DateTime]) { $Value = [System.Xml.XmlConvert]::ToString($_['Value'], [System.Xml.XmlDateTimeSerializationMode]::RoundtripKind) }
            }
            [string]$NamespaceURI = '';
            if ($_.ContainsKey('NamespaceURI')) {
                [string]$NamespaceURI = $_['NamespaceURI'];
            } else {
                if ($_.ContainsKey('Namespace')) {
                    [string]$NamespaceURI = $_['Namespace'];
                } else {
                    if ($_.ContainsKey('NS')) { [string]$NamespaceURI = $_['NS'] }
                }
            }
            if ([string]::IsNullOrWhiteSpace($NamespaceURI)) {
                $XmlElement.Attributes.Append($XmlDocument.CreateAttribute($Name)).Value = $Value;
            } else {
                $XmlElement.Attributes.Append($XmlDocument.CreateAttribute($Name, $NamspaceURI)).Value = $Value;
            }
        }
    }
    if ($PassThru) { Write-Output -InputObject $XmlElement -NoEnumerate }
}

Function Set-XmlAttribute {
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true)]
        [System.Xml.XmlElement]$XmlElement,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Multiple')]
        [ValidateScript({ Test-AttributeArgument -Filter $_ -CategoryTargetName 'OtherAttributes' -ErrorIdBase 'Add-XmlElement' -WriteError })]
        [Hashtable[]]$Attribute,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'AttrText')]
        [Parameter(Mandatory = $true, ParameterSetName = 'AttrNumber')]
        [Parameter(Mandatory = $true, ParameterSetName = 'IsTrue')]
        [Parameter(Mandatory = $true, ParameterSetName = 'IsFalse')]
        [ValidateScript({ Test-NCName -InputObject $_ -CategoryTargetName 'AttributeName' -ErrorIdBase 'Find-XmlElement' -WriteError })]
        [string]$AttributeName,
        
        [Parameter(ParameterSetName = 'AttrText')]
        [Parameter(ParameterSetName = 'AttrNumber')]
        [Parameter(ParameterSetName = 'IsTrue')]
        [Parameter(ParameterSetName = 'IsFalse')]
        [ValidateScript({ $null -eq $_ -or (Test-UriString -InputObject $_ -Kind Absolute -CategoryTargetName 'AttributeNS' -ErrorIdBase 'Find-XmlElement' -CanCast -AllowUriObject -AllowUriBuilder -AllowEmpty -WriteError) })]
        [AllowEmptyString()]
        [string]$AttributeNS = '',
        
        [Parameter(Mandatory = $true, ParameterSetName = 'AttrText')]
        [AllowEmptyString()]
        [object]$Value,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'IsTrue')]
        [switch]$IsTrue,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'IsFalse')]
        [switch]$IsFalse
    )
    
    if ($PSBoundParameters.ContainsKey('Attribute')) {
        $Attribute | ForEach-Object {
            [string]$Name = $_['Name'];
            [string]$v = $_['Value'];
            if ($_['Value'] -is [bool] -or $_['Value'] -is [char] -or $_['Value'] -is [decimal] -or $_['Value'] -is [sbyte] -or $_['Value'] -is [int16] -or $_['Value'] -is [int] -or $_['Value'] -is [long] -or $_['Value'] -is [byte] -or $_['Value'] -is [uint16] -or $_['Value'] -is [uint32] -or $_['Value'] -is [uint64] -or $_['Value'] -is [float] -or $_['Value'] -is [double] -or $_['Value'] -is [timespan] -or $_['Value'] -is [guid]) {
                $v = [System.Xml.XmlConvert]::ToString($_['Value']);
            } else {
                if ($_['Value'] -is [DateTime]) { $v = [System.Xml.XmlConvert]::ToString($_['Value'], [System.Xml.XmlDateTimeSerializationMode]::RoundtripKind) }
            }
            [string]$NamespaceURI = '';
            if ($_.ContainsKey('NamespaceURI')) {
                [string]$NamespaceURI = $_['NamespaceURI'];
            } else {
                if ($_.ContainsKey('Namespace')) {
                    [string]$NamespaceURI = $_['Namespace'];
                } else {
                    if ($_.ContainsKey('NS')) { [string]$NamespaceURI = $_['NS'] }
                }
            }
            if ([string]::IsNullOrWhiteSpace($NamespaceURI)) {
                $XmlElement.Attributes.Append($XmlDocument.CreateAttribute($Name)).Value = $v;
            } else {
                $XmlElement.Attributes.Append($XmlDocument.CreateAttribute($Name, $NamspaceURI)).Value = $v;
            }
        }
    } else {
        [string]$v = $Value;
        if ($Value -is [bool] -or $Value -is [char] -or $Value -is [decimal] -or $Value -is [sbyte] -or $Value -is [int16] -or $Value -is [int] -or $Value -is [long] -or $Value -is [byte] -or $Value -is [uint16] -or $Value -is [uint32] -or $Value -is [uint64] -or $Value -is [float] -or $Value -is [double] -or $Value -is [timespan] -or $Value -is [guid]) {
            $v = [System.Xml.XmlConvert]::ToString($Value);
        } else {
            if ($Value -is [DateTime]) { $v = [System.Xml.XmlConvert]::ToString($Value, [System.Xml.XmlDateTimeSerializationMode]::RoundtripKind) }
        }
        if ([string]::IsNullOrWhiteSpace($AttributeNS)) {
            $XmlElement.Attributes.Append($XmlDocument.CreateAttribute($Name)).Value = $v;
        } else {
            $XmlElement.Attributes.Append($XmlDocument.CreateAttribute($Name, $AttributeNS)).Value = $v;
        }
    }
}

Function Get-DocumentHead {
    [CmdletBinding(DefaultParameterSetName = 'EnsurePosition')]
    [OutputType([System.Xml.XmlElement])]
    Param(
        [Parameter(Mandatory = $true)]
        [ValidateScript({ Test-XmlDocument -InputObject $_ -CategoryTargetName 'XmlDocument' -ErrorIdBase 'Get-DocumentHead' -WriteError })]
        [System.Xml.XmlDocument]$XmlDocument,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Validate')]
        [switch]$Validate,
        
        [Parameter(ParameterSetName = 'EnsurePosition')]
        [switch]$EnsurePosition
    )

    $HeadElement = Find-XmlElement -Parent $XmlDocument.DocumentElement -ElementName 'head';
    if ($null -eq $HeadElement) {
        $HeadElement = Add-XmlElement -Parent $XmlDocument.DocumentElement -ElementName 'head' -FirstElement -PassThru;
        Add-XmlElement -Parent $HeadElement -ElementName 'meta' -Attribute @{ Name = 'name'; Value = 'viewport' }, @{ Name = 'content'; Value = 'width=1024, initial-scale=1.0' };
        Add-XmlElement -Parent $HeadElement -ElementName 'meta' -Attribute @{ Name = 'http-equiv'; Value = 'X-UA-Compatible' }, @{ Name = 'content'; Value = 'ie=edge' };
        Add-XmlElement -Parent $HeadElement -ElementName 'meta' -Attribute @{ Name = 'charset'; Value = 'utf-8' };
        Add-XmlElement -Parent $HeadElement -ElementName 'title' -InnerText 'ServiceNow Implementation and Maintenance';
        @('script/api/bootstrap/css/bootstrap.css', 'script/api/bootstrap/css/bootstrap-grid.css', 'script/api/bootstrap-table/bootstrap-table.css') | ForEach-Object {
            Add-XmlElement -Parent $HeadElement -ElementName 'link' -Attribute @{ Name = 'rel'; Value = 'stylesheet' }, @{ Name = 'type'; Value = 'text/css' }, @{ Name = 'media'; Value = 'screen' }, @{ Name = 'href'; Value = $_ };
        }
        @('script/api/jquery/jquery.js', 'script/api/bootstrap/js/bootstrap.bundle.js') | ForEach-Object {
            Add-XmlElement -Parent $HeadElement -ElementName 'script' -Attribute @{ Name = 'type'; Value = 'text/javascript' }, @{ Name = 'src'; Value = $_ } -InnerText '';
        }
    } else {
        if (($Validate.IsPresent -or $EnsurePosition.IsPresent) -and -not (Test-XmlElement -InputObject $HeadElement -PreviousElement $null)) {
            $HeadElement = $XmlDocument.DocumentElement.InsertBefore($XmlDocument.DocumentElement.RemoveChild($HeadElement), $XmlDocument.DocumentElement.SelectSingleNode('*[1]'));
        }
        if ($Validate.IsPresent) {
            $PreviousSibling = Find-XmlElement -Parent $HeadElement -ElementName 'meta' -AttributeName 'name' -Text 'viewport' -Comparison InvariantCultureIgnoreCase;
            if ($null -eq $PreviousSibling) {
                $PreviousSibling = Add-XmlElement -Parent $HeadElement -ElementName 'meta' -Attribute @{ Name = 'name'; Value = 'viewport' }, @{ Name = 'content'; Value = 'width=1024, initial-scale=1.0' } -FirstElement -PassThru;
            } else {
                if (-not (Test-XmlElement -InputObject $PreviousSibling -PreviousElement $null)) {
                    $PreviousSibling = $HeadElement.InsertBefore($HeadElement.RemoveChild($PreviousSibling), $HeadElement.SelectSingleNode('*[1]'));
                }
                if ($null -eq $PreviousSibling.Attributes['content']) {
                    $PreviousSibling.Attributes.Append($XmlDocument.CreateAttribute('content')).Value = 'width=1024, initial-scale=1.0';
                } else {
                    $PreviousSibling.Attributes['content'].Value = 'width=1024, initial-scale=1.0';
                }
            }
            $XmlElement = Find-XmlElement -Parent $HeadElement -ElementName 'meta' -AttributeName 'http-equiv' -Text 'X-UA-Compatible' -Comparison InvariantCultureIgnoreCase;
            if ($null -eq $XmlElement) {
                $PreviousSibling = Add-XmlElement -After $PreviousSibling -ElementName 'meta' -Attribute @{ Name = 'http-equiv'; Value = 'X-UA-Compatible' }, @{ Name = 'content'; Value = 'ie=edge' } -PassThru;
            } else {
                if (Test-XmlElement -InputObject $XmlElement -PreviousElement $PreviousSibling) {
                    $PreviousSibling = $XmlElement;
                } else {
                    $PreviousSibling = $HeadElement.InsertAfter($HeadElement.RemoveChild($XmlElement), $PreviousSibling);
                }
                if ($null -eq $XmlElement.Attributes['content']) {
                    $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('content')).Value = 'ie=edge';
                } else {
                    $XmlElement.Attributes['content'].Value = 'ie=edge';
                }
            }
            $XmlElement = Find-XmlElement -Parent $HeadElement -ElementName 'meta' -AttributeName 'charset' -Exists;
            if ($null -eq $XmlElement) {
                $PreviousSibling = Add-XmlElement -After $PreviousSibling -ElementName 'meta' -Attribute @{ Name = 'charset'; Value = 'utf-8' } -PassThru;
            } else {
                $XmlElement.Attributes['charset'].Value = 'utf-8';
                if (Test-XmlElement -InputObject $XmlElement -PreviousElement $PreviousSibling) {
                    $PreviousSibling = $XmlElement;
                } else {
                    $PreviousSibling = $HeadElement.InsertAfter($HeadElement.RemoveChild($XmlElement), $PreviousSibling);
                }
            }
            $XmlElement = Find-XmlElement -Parent $HeadElement -ElementName 'title' -Position 1;
            if ($null -eq $XmlElement) {
                $PreviousSibling = Add-XmlElement -After $PreviousSibling -ElementName 'title' -InnerText 'ServiceNow Implementation and Maintenance' -PassThru;
            } else {
                if ($XmlElement.IsEmpty -or $XmlElement.InnerText.Trim().Length -eq 0) { $XmlElement.InnerText = 'ServiceNow Implementation and Maintenance' }
                if (Test-XmlElement -InputObject $XmlElement -PreviousElement $PreviousSibling) {
                    $PreviousSibling = $XmlElement;
                } else {
                    $PreviousSibling = $HeadElement.InsertAfter($HeadElement.RemoveChild($XmlElement), $PreviousSibling);
                }
            }
            @('script/api/bootstrap/css/bootstrap.css', 'script/api/bootstrap/css/bootstrap-grid.css', 'script/api/bootstrap-table/bootstrap-table.css') | ForEach-Object {
                $XmlElement = Find-XmlElement -Parent $HeadElement -ElementName 'link' -AttributeName 'href' -Text $_ -Comparison InvariantCultureIgnoreCase;
                if ($null -eq $XmlElement) {
                    $PreviousSibling = Add-XmlElement -After $PreviousSibling -ElementName 'link' -Attribute @{ Name = 'rel'; Value = 'stylesheet' }, @{ Name = 'type'; Value = 'text/css' }, @{ Name = 'media'; Value = 'screen' }, @{ Name = 'href'; Value = $_ } -PassThru;
                } else {
                    Set-XmlAttribute -XmlElement $XmlElement -Attribute @{ Name = 'rel'; Value = 'stylesheet' }, @{ Name = 'type'; Value = 'text/css' }, @{ Name = 'media'; Value = 'screen' };
                    if (Test-XmlElement -InputObject $XmlElement -PreviousElement $PreviousSibling) {
                        $PreviousSibling = $XmlElement;
                    } else {
                        $PreviousSibling = $HeadElement.InsertAfter($HeadElement.RemoveChild($XmlElement), $PreviousSibling);
                    }
                }
            }
            $LastCss = $PreviousSibling;
            $AngularCssElement = Find-XmlElement -Parent $HeadElement -ElementName 'link' -AttributeName 'href' -Text 'script/api/angular/angular-csp.css' -Comparison InvariantCultureIgnoreCase;
            if ($null -ne $AngularCssElement) {
                Set-XmlAttribute -XmlElement $AngularCssElement -Attribute @{ Name = 'rel'; Value = 'stylesheet' }, @{ Name = 'type'; Value = 'text/css' }, @{ Name = 'media'; Value = 'screen' };
                if (-not (Test-XmlElement -InputObject $AngularCssElement -PreviousElement $PreviousSibling)) {
                    $AngularCssElement = $HeadElement.InsertAfter($HeadElement.RemoveChild($AngularCssElement), $PreviousSibling);
                }
                $LastCss = $PreviousSibling = $AngularCssElement;
            }
            @('script/api/jquery/jquery.js', 'script/api/bootstrap/js/bootstrap.bundle.js') | ForEach-Object {
                $XmlElement = Find-XmlElement -Parent $HeadElement -ElementName 'script' -AttributeName 'src' -Text $_ -Comparison InvariantCultureIgnoreCase;
                if ($null -eq $XmlElement) {
                    $PreviousSibling = Add-XmlElement -After $PreviousSibling -ElementName 'script' -Attribute @{ Name = 'type'; Value = 'text/javascript' }, @{ Name = 'src'; Value = $_ } -InnerText '' -PassThru;
                } else {
                    Set-XmlAttribute -XmlElement $XmlElement -AttributeName 'type' -Value 'text/javascript';
                    $XmlElement.InnerText = '';
                    if (Test-XmlElement -InputObject $XmlElement -PreviousElement $PreviousSibling) {
                        $PreviousSibling = $XmlElement;
                    } else {
                        $PreviousSibling = $HeadElement.InsertAfter($HeadElement.RemoveChild($XmlElement), $PreviousSibling);
                    }
                }
            }
            $XmlElement = Find-XmlElement -Parent $HeadElement -ElementName 'script' -AttributeName 'src' -Text 'script/api/angular/angular.js' -Comparison InvariantCultureIgnoreCase;
            if ($null -eq $XmlElement) {
                if ($null -ne $AngularCssElement) {
                    $PreviousSibling = Add-XmlElement -After $PreviousSibling -ElementName 'link' -Attribute @{ Name = 'type'; Value = 'text/javascript' }, @{ Name = 'src'; Value = 'script/api/angular/angular.js' } -InnerText '' -PassThru;
                }
            } else {
                Set-XmlAttribute -XmlElement $XmlElement -AttributeName 'type' -Value 'text/javascript';
                $XmlElement.InnerText = '';
                if (Test-XmlElement -InputObject $XmlElement -PreviousElement $PreviousSibling) {
                    $PreviousSibling = $XmlElement;
                } else {
                    $PreviousSibling = $HeadElement.InsertAfter($HeadElement.RemoveChild($XmlElement), $PreviousSibling);
                }
                if ($null -eq $AngularCssElement) {
                    $AngularCssElement = Add-XmlElement -After $LastCss -ElementName 'link' -Attribute @{ Name = 'rel'; Value = 'stylesheet' }, @{ Name = 'type'; Value = 'text/css' }, @{ Name = 'media'; Value = 'screen' }, @{ Name = 'href'; Value = 'script/api/angular/angular-csp.css' } -PassThru;
                }
            }
        }
    }

    return $HeadElement;
}

Function Get-DocumentBody {
    [CmdletBinding()]
    [OutputType([System.Xml.XmlElement])]
    Param(
        [Parameter(Mandatory = $true)]
        [ValidateScript({ Test-XmlDocument -InputObject $_ -CategoryTargetName 'XmlDocument' -ErrorIdBase 'Get-DocumentBody' -WriteError })]
        [System.Xml.XmlDocument]$XmlDocument,
        
        [switch]$Validate
    )

    $BodyElement = Find-XmlElement -Parent $XmlDocument.DocumentElement -ElementName 'body' -Position 1;
    if ($null -eq $BodyElement) {
        $BodyElement = Add-XmlElement -After (Get-DocumentHead -XmlDocument $XmlDocument -EnsurePosition) -ElementName 'body' -PassThru;
    } else {
        if ($Validate.IsPresent) {
            $HeadElement = Get-DocumentHead -XmlDocument $XmlDocument -EnsurePosition;
            if (-not (Test-XmlElement -InputObject $BodyElement -PreviousElement $HeadElement)) {
                $BodyElement = $XmlDocument.DocumentElement.InsertAfter($XmlDocument.DocumentElement.RemoveChild($BodyElement), $HeadElement);
            }
        }
    }
    $BodyElement | Write-Output;
}

Function Get-PagHeaderElement {
    [CmdletBinding()]
    [OutputType([System.Xml.XmlElement])]
    Param(
        [Parameter(Mandatory = $true)]
        [ValidateScript({ Test-XmlDocument -InputObject $_ -CategoryTargetName 'XmlDocument' -ErrorIdBase 'Get-PagHeaderElement' -WriteError })]
        [System.Xml.XmlDocument]$XmlDocument,

        [switch]$Validate
    )
    
    $BodyElement = Get-DocumentBody -Validate;
    $PagHeaderElement = Find-XmlElement -Parent $BodyElement -ElementName 'header' -Position 1;
    if ($null -eq $PagHeaderElement) {
        $PagHeaderElement = Add-XmlElement -Parent $BodyElement -ElementName 'header' -Attribute @{ Name = 'class'; Value = 'container-fluid border border-secondary p-sm-1' } -FirstElement -PassThru;
    } else {
        if ($Validate.IsPresent) {
            if (-not (Test-XmlElement -InputObject $BodyElement -PreviousElement $null)) {
                $PagHeaderElement = $BodyElement.InsertBefore($BodyElement.RemoveChild($PagHeaderElement), $BodyElement.SelectSingleNode('*[1]'));
            }
            Set-XmlAttribute -XmlElement $PagHeaderElement -AttributeName 'class' -Value 'container-fluid border border-secondary p-sm-1';
        }
    }
    $PagHeaderElement | Write-Output;
}

Function Get-PageNavigationElement {
    [CmdletBinding()]
    [OutputType([System.Xml.XmlElement])]
    Param(
        [Parameter(Mandatory = $true)]
        [ValidateScript({ Test-XmlDocument -InputObject $_ -CategoryTargetName 'XmlDocument' -ErrorIdBase 'Get-PageNavigationElement' -WriteError })]
        [System.Xml.XmlDocument]$XmlDocument
    )
    
    $BodyElement = Get-DocumentBody -Validate;
    $PageNavigationElement = Find-XmlElement -Parent $BodyElement -ElementName 'nav' -Position 1;
    if ($null -eq $PageNavigationElement) {
        $PageNavigationElement = Add-XmlElement -After (Get-PagHeaderElement -XmlDocument $XmlDocument -Validate) -ElementName 'nav' -Attribute @{ Name = 'class'; Value = 'container-fluid navbar navbar-expand-lg navbar-light bg-light border border-light p-sm-1 mr-md-3' } -PassThru;
        $PageNavigationElement = Add-XmlElement -After $PageNavigationElement -ElementName 'ul' -Attribute @{ Name = 'class'; Value = 'navbar-nav mr-auto' } -PassThru;
    } else {
        if ($Validate.IsPresent) {
            $PagHeaderElement = Get-PagHeaderElement -XmlDocument $XmlDocument -Validate;
            if (-not (Test-XmlElement -InputObject $PageNavigationElement -PreviousElement $PagHeaderElement)) {
                $PageNavigationElement = $BodyElement.InsertAfter($BodyElement.RemoveChild($PageNavigationElement), $PagHeaderElement);
            }
            Set-XmlAttribute -XmlElement $PageNavigationElement -AttributeName 'class' -Value 'container-fluid navbar navbar-expand-lg navbar-light bg-light border border-light p-sm-1 mr-md-3';
        }
        $XmlElement = Find-XmlElement -Parent $PageNavigationElement -ElementName 'ul' -Position 1;
        if ($null -eq $XmlElement) {
            $PageNavigationElement = Add-XmlElement -After $PageNavigationElement -ElementName 'ul' -Attribute @{ Name = 'class'; Value = 'navbar-nav mr-auto' } -PassThru;
        } else {
            if ($Validate.IsPresent) {
                if (-not (Test-XmlElement -InputObject $XmlElement -PreviousElement $null)) {
                    $PageNavigationElement = $PageNavigationElement.InsertBefore($PageNavigationElement.RemoveChild($XmlElement), $PageNavigationElement.SelectSingleNode('@*[1]'));
                } else {
                    $PageNavigationElement = $XmlElement;
                }
                Set-XmlAttribute -XmlElement $PageNavigationElement -AttributeName 'class' -Value 'navbar-nav mr-auto';
            } else {
                $PageNavigationElement = $XmlElement;
            }
        }
    }
    $PageNavigationElement | Write-Output;
}

Function Get-PageSectionElement {
    [CmdletBinding()]
    [OutputType([System.Xml.XmlElement])]
    Param(
        [Parameter(Mandatory = $true)]
        [ValidateScript({ Test-XmlDocument -InputObject $_ -CategoryTargetName 'XmlDocument' -ErrorIdBase 'Get-PageSectionElement' -WriteError })]
        [System.Xml.XmlDocument]$XmlDocument
    )
    
    $BodyElement = Get-DocumentBody -Validate;
    $PageSectionElement = Find-XmlElement -Parent $BodyElement -ElementName 'section' -Position 1;
    if ($null -eq $PageSectionElement) {
        $PageSectionElement = Add-XmlElement -After (Get-PageNavigationElement -XmlDocument $XmlDocument -Validate) -ElementName 'section' -Attribute @{ Name = 'class'; Value = 'container-fluid border border-light p-md-3 text-dark' } -PassThru;
    } else {
        if ($Validate.IsPresent) {
            $PageNavigationElement = Get-PageNavigationElement -XmlDocument $XmlDocument -Validate;
            if (-not (Test-XmlElement -InputObject $PageSectionElement -PreviousElement $PageNavigationElement)) {
                $PageSectionElement = $BodyElement.InsertAfter($BodyElement.RemoveChild($PageSectionElement), $PageNavigationElement);
            }
            Set-XmlAttribute -XmlElement $PageSectionElement -AttributeName 'class' -Value 'container-fluid border border-light p-md-3 text-dark';
        }
    }
    $PageSectionElement | Write-Output;
}

Function Get-PageFooterElement {
    [CmdletBinding()]
    [OutputType([System.Xml.XmlElement])]
    Param(
        [Parameter(Mandatory = $true)]
        [ValidateScript({ Test-XmlDocument -InputObject $_ -CategoryTargetName 'XmlDocument' -ErrorIdBase 'Get-PageSectionElement' -WriteError })]
        [System.Xml.XmlDocument]$XmlDocument
    )
    
    $BodyElement = Get-DocumentBody -Validate;
    $PageFooterElement = Find-XmlElement -Parent $BodyElement -ElementName 'footer' -Position 1;
    if ($null -eq $PageFooterElement) {
        $PageFooterElement = Add-XmlElement -After (Get-PageSectionElement -XmlDocument $XmlDocument -Validate) -ElementName 'section' -Attribute @{ Name = 'footer'; Value = 'container-fluid border border-secondary p-sm-1 bg-secondary' } -PassThru;
    } else {
        if ($Validate.IsPresent) {
            $PageSectionElement = Get-PageSectionElement -XmlDocument $XmlDocument -Validate;
            if (-not (Test-XmlElement -InputObject $PageFooterElement -PreviousElement $PageSectionElement)) {
                $PageFooterElement = $BodyElement.InsertAfter($BodyElement.RemoveChild($PageFooterElement), $PageSectionElement);
            }
            Set-XmlAttribute -XmlElement $PageFooterElement -AttributeName 'class' -Value 'container-fluid border border-secondary p-sm-1 bg-secondary';
        }
    }
    $PageFooterElement | Write-Output;
}

Function Set-PageNavigation {
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true)]
        [ValidateScript({ Test-XmlDocument -InputObject $_ -CategoryTargetName 'XmlDocument' -ErrorIdBase 'Set-PageNavigation' -WriteError })]
        [System.Xml.XmlDocument]$XmlDocument
    )

    $PageNavigationElement = Get-PageNavigationElement -XmlDocument $XmlDocument -Validate;
    $PageNavigationElement.IsEmpty = $true;

}

$XmlDocument.OuterXml;


$HtmlRoot = (($PSScriptRoot | Join-Path -ChildPath '../..') | Resolve-Path).Path;

$HtmlPages = New-Object -TypeName 'System.Collections.Generic.Dictionary[System.String, System.Xml.XmlDocument]' -ArgumentList ([StringComparer]::InvariantCultureIgnoreCase);
$Regex = New-Object -TypeName 'System.Text.RegularExpressions.Regex' -ArgumentList '^(\s*<!DOCTYPE[^>]*>\s*|\s+)';

foreach ($FileInfo in @(Get-ChildItem -LiteralPath $HtmlRoot -Filter '*.html')) {
    $Text = ((Get-Content -LiteralPath $FileInfo.FullName) | Out-String).Trim();
    $m = $Regex.Match($Text);
    if ($m.Success) {
        $Text = $DocTypeXml + $Text.Substring($m.Length);
    } else {
        $Text = $DocTypeXml + $Text;
    }
    $XmlDocument = $null;
    $XmlDocument = New-Object -TypeName 'System.Xml.XmlDocument';
    try { $XmlDocument.LoadXml($Text); }
    catch {
        $Exception = $_;
        if ($null -ne $Exception.Exception) { $Exception = $Exception.Exception }
        if ($null -ne $Exception.InnerException) { $Exception = $Exception.InnerException }
        Write-Warning -Message "XML Load Error: $_";
        if ($null -ne $Exception.LineNumber -and $Exception.LineNumber -gt 0) {
            ((($Text -split '\r\n?|\n') | Select-Object -First ($Exception.LineNumber + 1)) | Select-Object -Last 3) | ForEach-Object { Write-Information -MessageData $_ -InformationAction Continue }
        }
    }
    if ($null -eq $XmlDocument.DocumentElement) {
        Write-Warning -Message "Failed to load HTML from $($FileInfo.Name)";
    } else {
        $HtmlPages.Add($FileInfo.BaseName, $XmlDocument);
    }
}

$MainNav = @{
    index = @{
        Order = 0;
        Title = 'Home';
        Heading = 'ServiceNow Implementation and Maintenance';
        SubNav = @{};
        Angular = $false;
        Scripts = @();
    };
    ImplementationNotes = @{
        Order = 1;
        Title = 'Implementation Notes';
        Heading = 'ServiceNow Implementation Notes';
        SubNav = @{
            ServiceCatalog = @{
                Order = 0;
                Title = 'Service Catalog';
                Heading = 'Service Catalog';
                SubNav = @{};
                Angular = $false;
                Scripts = @();
            }
        };
        Angular = $false;
        Scripts = @();
    };
    initialConfig = @{
        Order = 2;
        Title = 'Initial Config';
        Heading = 'Initial Configuration Instructions';
        SubNav = @{};
        Angular = $true;
        Scripts = @('Utility.js', 'ColorInfo.js', 'app/initialConfig.js');
    };
    snippets = @{
        Order = 3;
        Title = 'Code Snippets';
        Heading = 'ServiceNow Code Snippets';
        SubNav = @{};
        Angular = $false;
        Scripts = @();
    };
}

Function Validate-NavigationPage {
    Param(
        [Parameter(Mandatory = $true)]
        [string]$Name,
        
        [Parameter(Mandatory = $true)]
        [string]$Heading,
        
        [Parameter(Mandatory = $true)]
        [bool]$Angular,
        
        [Parameter(Mandatory = $true)]
        [AllowEmptyCollection()]
        [Hashtable]$SubNav,
        
        [Parameter(Mandatory = $true)]
        [AllowEmptyCollection()]
        [string[]]$Scripts,
        
        [string[]]$Parent
    )
    
    if ($null -eq $Parent -or $Parent.Length -eq 0) {
        Write-Information -MessageData "Updating $Name.html";
    } else {
        Write-Information -MessageData "Updating $($Parent -join ' : ') : $Name.html";
    }
    $XmlDocument = $null;
    if ($Script:HtmlPages.ContainsKey($Name)) {
        $XmlDocument = $HtmlPages[$TopNavName];
        if ($XmlDocument.DocumentElement.PSBase.LocalName -ine 'html') {
            $XmlElement = $XmlDocument.DocumentElement;
            $XmlDocument.ReplaceChild($XmlDocument.CreateElement('html'), $XmlElement);
            $XmlDocument.DocumentElement.AppendChild($XmlElement);
        } else {
            if ($XmlDocument.DocumentElement.PSBase.LocalName -cne 'html') {
                $XmlElement = $XmlDocument.DocumentElement;
                $XmlDocument.ReplaceChild($XmlDocument.CreateElement('html'), $XmlElement) | Out-Null;
                foreach ($XmlAttribute in $XmlElement.SelectNodes('@*')) {
                    $XmlDocument.DocumentElement.Attributes.Append($XmlAttribute.CloneNode($true)) | Out-Null;
                }
                if (-not $XmlElement.IsEmpty) { foreach ($XmlNode in @($XmlElement.ChildNodes)) { $XmlDocument.DocumentElement.AppendChild($XmlElement.RemoveChild($_)) | Out-Null } }
            }
        }
        $HeadElement = $XmlDocument.DocumentElement.SelectSingleNode('head');
        if ($null -ne $HeadElement) { $XmlDocument.DocumentElement.RemoveChild($HeadElement) | Out-Null }
        $BodyElement = $XmlDocument.DocumentElement.SelectSingleNode('body');
        if ($null -ne $BodyElement) {
            $XmlDocument.DocumentElement.RemoveChild($BodyElement) | Out-Null;
        } else {
            $BodyElement = $XmlDocument.CreateElement('body');
        }
        foreach ($XmlNode in @($XmlDocument.DocumentElement.SelectNodes('*|text()'))) {
            $BodyElement.AppendChild($XmlDocument.DocumentElement.RemoveChild($XmlNode)) | Out-Null;
        }
        if ($null -eq $XmlDocument.DocumentElement.FirstChild) {
            $HeadElement = $XmlDocument.DocumentElement.AppendChild($XmlDocument.CreateElement('head'));
        } else {
            $HeadElement = $XmlDocument.DocumentElement.InsertBefore($XmlDocument.CreateElement('head'), $XmlDocument.DocumentElement.FirstChild);
        }
        $XmlDocument.DocumentElement.InsertAfter($BodyElement, $HeadElement);
        if ($null -eq $XmlDocument.DocumentElement.Attributes['lang']) {
            $XmlDocument.DocumentElement.Attributes.Append($XmlDocument.CreateAttribute('lang')).Value = 'en';
        }
        @('header', 'nav', 'footer', 'aside') | ForEach-Object {
            $XmlElement = $BodyElementt.SelectSingleNode($_);
            if ($null -ne $XmlElement) { $XmlDocument.DocumentElement.RemoveChild($XmlElement) | Out-Null }
        }
        @($XmlDocument.DocumentElement.SelectNodes('*|text()')) | ForEach-Object { $BodyElement.AppendChild($XmlDocument.DocumentElement.RemoveChild($_)) }
    } else {
        [Xml]$XmlDocument = "$DocTypeXml<html lang=`"en`"/>";
        $HeadElement = $XmlDocument.DocumentElement.AppendChild($XmlDocument.CreateElement('head'));
        $BodyElement = $XmlDocument.DocumentElement.AppendChild($XmlDocument.CreateElement('body'));
        $Script:HtmlPages.Add($TopNavName, $XmlDocument);
    }

    $XmlElement = $HeadElement.AppendChild($XmlDocument.CreateElement('meta'));
    $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('name')).Value = 'viewport';
    $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('content')).Value = 'width=1024, initial-scale=1.0';
    $XmlElement = $HeadElement.AppendChild($XmlDocument.CreateElement('meta'));
    $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('http-equiv')).Value = 'X-UA-Compatible';
    $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('content')).Value = 'ie=edge';
    $HeadElement.AppendChild($XmlDocument.CreateElement('meta')).Attributes.Append($XmlDocument.CreateAttribute('charset')).Value = 'utf-8';
    $HeadElement.AppendChild($XmlDocument.CreateElement('title')).InnerText = $Heading;
    @('bootstrap/css/bootstrap.css', 'bootstrap/css/bootstrap-grid.css', 'bootstrap-table/bootstrap-table.css') | ForEach-Object {
        $XmlElement = $HeadElement.AppendChild($XmlDocument.CreateElement('link'));
        $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('rel')).Value = 'stylesheet';
        $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('type')).Value = 'text/css';
        $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('media')).Value = 'screen';
        $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('href')).Value = "script/api/$_";
    }
    $XmlElement = $HeadElement.SelectSingleNode('link[@href="script/api/angular/angular-csp.css"]');
    if ($Angular) {
        $XmlElement = $HeadElement.AppendChild($XmlDocument.CreateElement('link'));
        $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('rel')).Value = 'stylesheet';
        $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('type')).Value = 'text/css';
        $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('media')).Value = 'screen';
        $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('href')).Value = 'script/api/angular/angular-csp.css';
    }
    @('jquery/jquery.js', 'bootstrap/js/bootstrap.bundle.js') | ForEach-Object {
        $XmlElement = $HeadElement.AppendChild($XmlDocument.CreateElement('script'));
        $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('type')).Value = 'text/javascript';
        $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('src')).Value = "script/api/$_";
    }
    $XmlElement = $HeadElement.SelectSingleNode('script[@src="script/api/angular/angular.js"]');
    if ($Angular) {
        $XmlElement = $HeadElement.AppendChild($XmlDocument.CreateElement('script'));
        $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('type')).Value = 'text/javascript';
        $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('src')).Value = 'script/api/angular/angular.js';
    }
    if ($Scripts.Length -gt 0) {
        $Scripts | ForEach-Object {
            $XmlElement = $HeadElement.AppendChild($XmlDocument.CreateElement('script'));
            $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('type')).Value = 'text/javascript';
            $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('src')).Value = "script/$_";
        }
    }
    
    $SectionElement = $BodyElement.SelectSingleNode('section');
    if ($null -ne $SectionElement) {
        $BodyElement.RemoveChild($SectionElement) | Out-Null;
    } else {
        $DivElement = @($BodyElement.SelectNodes('div[not(count(@class)=0)]')) | Where-Object { $_.Attributes['class'].Value.Contains('container') } | Select-Object -First 1;
        if ($null -eq $DivElement) {
            $DivElement = @($BodyElement.SelectNodes('div[not(count(@class)=0)]')) | Where-Object { $_.Attributes['class'].Value.Contains('row') } | Select-Object -First 1;
            if ($null -ne $DivElement) {
                $SectionElement = $DivElement.SelectSingleNode('section');
                if ($null -ne $SectionElement) { $DivElement.RemoveChild($SectionElement) | Out-Null }
                foreach ($XmlNode in @($DivElement.SelectNode('*|text()|comment()'))) {
                    $SectionElement.AppendChild($DivElement.RemoveChild($XmlNode));
                }
            }
        } else {
            $SectionElement = $DivElement.SelectSingleNode('section');
            $RowElement = @($DivElement.SelectNodes('div[not(count(@class)=0)]')) | Where-Object { $_.Attributes['class'].Value.Contains('row') } | Select-Object -First 1;
            if ($null -ne $SectionElement) {
                $DivElement.RemoveChild($SectionElement) | Out-Null;
                if ($null -ne $RowElement) {
                    $DivElement.RemoveChild($RowElement) | Out-Null;
                    foreach ($XmlNode in @($DivElement.SelectNode('*|text()|comment()'))) {
                        $SectionElement.AppendChild($DivElement.RemoveChild($XmlNode)) | Out-Null;;
                    }
                    foreach ($XmlNode in @($RowElement.SelectNode('*|text()|comment()'))) {
                        $SectionElement.AppendChild($RowElement.RemoveChild($XmlNode)) | Out-Null;;
                    }
                } else {
                    foreach ($XmlNode in @($DivElement.SelectNode('*|text()|comment()'))) {
                        $SectionElement.AppendChild($DivElement.RemoveChild($XmlNode)) | Out-Null;;
                    }
                }
            } else {
                if ($null -ne $RowElement) {
                    $SectionElement = $RowElement.SelectSingleNode('section');
                    if ($null -ne $SectionElement) { $RowElement.RemoveChild($SectionElement) | Out-Null }
                    foreach ($XmlNode in @($RowElement.SelectNode('*|text()|comment()'))) {
                        $SectionElement.AppendChild($RowElement.RemoveChild($XmlNode)) | Out-Null;;
                    }
                    $DivElement.RemoveChild($RowElement) | Out-Null;
                }
                if ($null -eq $SectionElement) {
                    $SectionElement = $XmlDocument.CreateElement('section');
                }
            }
        }
    }

    $HeaderElement = $BodyElement.AppendChild($XmlDocument.CreateElement('header'));
    $HeaderElement.Attributes.Append($XmlDocument.CreateAttribute('class')).Value = 'container-fluid border border-secondary p-sm-1';
    if ($null -eq $Parent -or $Parent.Length -lt 2) {
        $HeaderElement.AppendChild($XmlDocument.CreateElement('h1')).InnerText = $Heading;
    } else {
        for ($i = 1; $i -lt $Parent.Length; $i++) {
            $HeaderElement.AppendChild($XmlDocument.CreateElement("h$i")).InnerText = $Parent[$i];
        }
        $HeaderElement.AppendChild($XmlDocument.CreateElement("h$($Parent.Length - 1)")).InnerText = $Heading;
    }
    
    $NavElement = $BodyElement.AppendChild($XmlDocument.CreateElement('nav'));
    $NavElement.Attributes.Append($XmlDocument.CreateAttribute('class')).Value = 'container-fluid navbar navbar-expand-lg navbar-light bg-light border border-light p-sm-1 mr-md-3';
    $NavElement = $NavElement.AppendChild($XmlDocument.CreateElement('ul'));
    $NavElement.Attributes.Append($XmlDocument.CreateAttribute('class')).Value = 'navbar-nav mr-auto';

    foreach ($ItemName in $Script:MainNav.Keys) {
        $XmlElement = $NavElement.AppendChild($XmlDocument.CreateElement('li'));
        if ($ItemName -eq $Name -or ($null -ne $Parent -and $Parent -contains $ItemName)) {
            $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('class')).Value = 'active nav-item border border-secondary bg-dark';
            $XmlElement = $XmlElement.AppendChild($XmlDocument.CreateElement('a'));
            $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('href')).Value = '#';
            $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('class')).Value = 'active nav-link text-light';
            $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('onclick')).Value = 'return false;';
        } else {
            $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('class')).Value = 'nav-item border border-secondary bg-dark';
            $XmlElement = $XmlElement.AppendChild($XmlDocument.CreateElement('a'));
            $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('href')).Value = "$ItemName.html";
            $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('class')).Value = 'nav-link text-light';
        }
        $XmlElement.InnerText = $Script:MainNav[$ItemName]['Title'];
    }

    $ContainerElement = $BodyElement;
    if ($null -ne $SubNav -and $SubNav.Count -gt 0) {
        $ContainerElement = $BodyElement.AppendChild($XmlDocument.CreateElement('div'));
        $ContainerElement.Attributes.Append($XmlDocument.CreateAttribute('class')).Value = 'container';
        $ContainerElement = $ContainerElement.AppendChild($XmlDocument.CreateElement('div'));
        $ContainerElement.Attributes.Append($XmlDocument.CreateAttribute('class')).Value = 'row flex-nowrap';
        $ContainerElement.AppendChild($SectionElement) | Out-Null;
        if ($null -eq $SectionElement.Attributes['class']) {
            $SectionElement.Attributes.Append($XmlDocument.CreateAttribute('class')).Value = 'container-fluid border border-light col-md-9 text-dark';
        } else {
            $SectionElement.Attributes['class'].Value = 'container-fluid border border-light col-md-9 text-dark';
        }
        $XmlElement = $ContainerElement.AppendChild($XmlDocument.CreateElement('aside'));
        $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('class')).Value = 'container-fluid border border-secondary bg-secondary text-secondary col-md-3';
        $NavElement = $NavElement.AppendChild($XmlDocument.CreateElement('ul'));
        foreach ($ItemName in (@($SubNav.Keys) | Sort-Object -Property @{ Expression = { if ($null -eq $SubNav[$_]['Order']) { -1 } else { $SubNav[$_]['Order'] } } })) {
            $XmlElement = $NavElement.AppendChild($XmlDocument.CreateElement('li'));
            if ($ItemName -eq $Name) {
                $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('class')).Value = 'active border border-secondary bg-dark';
                $XmlElement = $XmlElement.AppendChild($XmlDocument.CreateElement('a'));
                $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('href')).Value = '#';
                $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('class')).Value = 'active text-light';
                $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('onclick')).Value = 'return false;';
            } else {
                $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('class')).Value = 'border border-secondary bg-dark';
                $XmlElement = $XmlElement.AppendChild($XmlDocument.CreateElement('a'));
                $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('href')).Value = "$ItemName.html";
                $XmlElement.Attributes.Append($XmlDocument.CreateAttribute('class')).Value = 'nav-link text-light';
            }
            $XmlElement.InnerText = $SubNav[$ItemName]['Title'];
            if ($null -eq $Parent -or $Parent.Length -eq 0) {
                Validate-NavigationPage -Name $ItemName -Heading $SubNav[$ItemName]['Heading'] -Angular $SubNav[$ItemName]['Angular'] -SubNav $SubNav[$ItemName]['SubNav'] -Scripts $SubNav[$ItemName]['Scripts'] -Parent @($Name);
            } else {
                Validate-NavigationPage -Name $ItemName -Heading $SubNav[$ItemName]['Heading'] -Angular $SubNav[$ItemName]['Angular'] -SubNav $SubNav[$ItemName]['SubNav'] -Scripts $SubNav[$ItemName]['Scripts'] -Parent @($Parent + @($Name));
            }
        }
    } else {
        if ($null -eq $SectionElement.Attributes['class']) {
            $SectionElement.Attributes.Append($XmlDocument.CreateAttribute('class')).Value = 'container-fluid border border-light p-md-3 text-dark';
        } else {
            $SectionElement.Attributes['class'].Value = 'container-fluid border border-light p-md-3 text-dark';
        }
    }
    $FooterElement = $BodyElement.InsertAfter($XmlDocument.CreateElement('footer'), $ContainerElement);
    $FooterElement.Attributes.Append($XmlDocument.CreateAttribute('class')).Value = 'container-fluid border border-secondary p-sm-1 bg-secondary';
    $DateTime = [DateTime]::Now;
    $FooterElement.InnerText = "Updated $($DateTime.ToLongDateString()) at $($DateTime.ToLongTimeString())";
    
    if ($null -eq $Parent -or $Parent.Length -eq 0) {
        foreach ($TopNavName in @($Script:MainNav.Keys | Sort-Object -Property @{ Expression = { if ($null -eq $Script:MainNav[$_].Order) { -1 } else { $Script:MainNav[$_].Order } } })) {
            if ($TopNavName -ne $Name) {
                Validate-NavigationPage -Name $TopNavName -Title $Script:MainNav[$TopNavName]['Title'] -Heading $Script:MainNav[$TopNavName]['Heading'] -Angular $Script:MainNav[$TopNavName]['Angular'] -SubNav $Script:MainNav[$TopNavName]['SubNav'] -Scripts $Script:MainNav[$TopNavName]['Scripts'];
            }
        }
    }
}

Validate-NavigationPage -Name 'index' -Heading $MainNav['index']['Heading'] -Angular $MainNav['index']['Angular'] -SubNav $MainNav['index']['SubNav'] -Scripts $MainNav['index']['Scripts'];