
$DocTypeXml = (@('<!DOCTYPE html [') + ((@'
nbsp=160;iexcl=161;cent=162;pound=163;curren=164;yen=165;brvbar=166;sect=167;uml=168;copy=169;ordf=170;laquo=171;not=172;shy=173;reg=174;macr=175;deg=176;plusmn=177;sup2=178;sup3=179;acute=180;micro=181;para=182;middot=183;
cedil=184;sup1=185;ordm=186;raquo=187;frac14=188;frac12=189;frac34=190;iquest=191;Agrave=192;Aacute=193;Acirc=194;Atilde=195;Auml=196;Aring=197;AElig=198;Ccedil=199;Egrave=200;Eacute=201;Ecirc=202;Euml=203;Igrave=204;
Iacute=205;Icirc=206;Iuml=207;ETH=208;Ntilde=209;Ograve=210;Oacute=211;Ocirc=212;Otilde=213;Ouml=214;times=215;Oslash=216;Ugrave=217;Uacute=218;Ucirc=219;Uuml=220;Yacute=221;THORN=222;szlig=223;agrave=224;aacute=225;
acirc=226;atilde=227;auml=228;aring=229;aelig=230;ccedil=231;egrave=232;eacute=233;ecirc=234;euml=235;igrave=236;iacute=237;icirc=238;iuml=239;eth=240;ntilde=241;ograve=242;oacute=243;ocirc=244;otilde=245;ouml=246;divide=247;
oslash=248;ugrave=249;uacute=250;ucirc=251;uuml=252;yacute=253;thorn=254;yuml=255;OElig=338;oelig=339;Scaron=352;scaron=353;Yuml=376;fnof=402;circ=710;tilde=732;Alpha=913;Beta=914;Gamma=915;Delta=916;Epsilon=917;Zeta=918;
Eta=919;Theta=920;Iota=921;Kappa=922;Lambda=923;Mu=924;Nu=925;Xi=926;Omicron=927;Pi=928;Rho=929;Sigma=931;Tau=932;Upsilon=933;Phi=934;Chi=935;Psi=936;Omega=937;alpha=945;beta=946;gamma=947;delta=948;epsilon=949;zeta=950;
eta=951;theta=952;iota=953;kappa=954;lambda=955;mu=956;nu=957;xi=958;omicron=959;pi=960;rho=961;sigmaf=962;sigma=963;tau=964;upsilon=965;phi=966;chi=967;psi=968;omega=969;thetasym=977;upsih=978;piv=982;ensp=8194;emsp=8195;
thinsp=8201;zwnj=8204;zwj=8205;lrm=8206;rlm=8207;ndash=8211;mdash=8212;lsquo=8216;rsquo=8217;sbquo=8218;ldquo=8220;rdquo=8221;bdquo=8222;dagger=8224;Dagger=8225;bull=8226;hellip=8230;permil=8240;prime=8242;Prime=8243;
lsaquo=8249;rsaquo=8250;oline=8254;frasl=8260;euro=8364;image=8465;weierp=8472;real=8476;trade=8482;alefsym=8501;larr=8592;uarr=8593;rarr=8594;darr=8595;harr=8596;crarr=8629;lArr=8656;uArr=8657;rArr=8658;dArr=8659;hArr=8660;
forall=8704;part=8706;exist=8707;empty=8709;nabla=8711;isin=8712;notin=8713;ni=8715;prod=8719;sum=8721;minus=8722;lowast=8727;radic=8730;prop=8733;infin=8734;ang=8736;and=8743;or=8744;cap=8745;cup=8746;int=8747;there4=8756;
sim=8764;cong=8773;asymp=8776;ne=8800;equiv=8801;le=8804;ge=8805;sub=8834;sup=8835;nsub=8836;nsup=8837;sube=8838;supe=8839;oplus=8853;otimes=8855;perp=8869;sdot=8901;lceil=8968;rceil=8969;lfloor=8970;rfloor=8971;loz=9674;
spades=9824;clubs=9827;hearts=9829;diams=9830;lang=10216;rang=10217
'@ -split ';\s*') | ForEach-Object { ($k, $v) = $_.Split('='); "    <!ENTITY $k `"&#$v;`">" }) + @(']>')) | Out-String;

Function Get-HtmlXmlEntityTranslate {
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [string]$Path
    )

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

Function Test-HtmlDocument {
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [AllowNull()]
        [string]$XmlDocument
    )

    Process {
        ($null -ne $XmlDocument -and $null -ne $XmlDocument.DocumentElement -and $XmlDocument.DocumentElement.LocalName -ceq 'html' -and $XmlDocument.DocumentElement.NamespaceURI -ceq 'http://www.w3.org/1999/xhtml' -and $null -ne $XmlDocument.DocumentType -and $XmlDocument.DocumentType.Name -ceq 'html' -and $XmlDocument.DocumentType.SystemId -ceq 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd') | Write-Output;
    }
}

Function Save-HtmlDocument {
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true)]
        [string]$Path,
        
        [Parameter(Mandatory = $true)]
        [ValidateScript({ $_ | Test-HtmlDocument })]
        [string]$XmlDocument
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
            $Content = $XmlWriterSettings.Encoding.GetString($MemoryStream.ToArray()) -replace '^<!DOCTYPE[^>]*>\s*', '<!DOCTYPE html>';
            Set-Content -Path $Path -Value $Content -Encoding UTF8;
        } finally { $XmlWriter.Close() }
    } finally { $MemoryStream.Dispose() }
}

Function Get-DocumentHead {
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true)]
        [ValidateScript({ $_ | Test-HtmlDocument })]
        [string]$XmlDocument
    )

    $nsmgr = New-Object -TypeName 'System.Xml.XmlNamespaceManager' -ArgumentList $XmlDocument.NameTable;
    $nsmgr.AddNamespace('h', 'http://www.w3.org/1999/xhtml');
    $XmlElement = $XmlDocument.DocumentElement.SelectSingleNode('h:head', $nsmgr);
    if ($null -ne $XmlElement) { return $XmlElement }
    $XmlElement = $XmlDocument.SelectSingleNode('*', $nsmgr);
    if ($null -eq $XmlElement) {
        return $XmlDocument.DocumentElement.AppendChild($XmlDocument.CreateElement('head', 'http://www.w3.org/1999/xhtml'));
    }
    return $XmlDocument.DocumentElement.InsertBefore($XmlDocument.CreateElement('head', 'http://www.w3.org/1999/xhtml'), $XmlElement);
}

Function Get-DocumentBody {
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true)]
        [string]$XmlDocument
    )
    $nsmgr = New-Object -TypeName 'System.Xml.XmlNamespaceManager' -ArgumentList $XmlDocument.NameTable;
    $nsmgr.AddNamespace('h', 'http://www.w3.org/1999/xhtml');
    $XmlElement = $XmlDocument.DocumentElement.SelectSingleNode('h:body', $nsmgr);
    if ($null -ne $XmlElement) { return $XmlElement }
    $XmlElement = $XmlDocument.DocumentElement.SelectSingleNode('h:head', $nsmgr);
    if ($null -ne $Xmlelement) {
        $XmlDocument.DocumentElement.InsertAfter($XmlDocument.CreateElement('body', 'http://www.w3.org/1999/xhtml'), $XmlElement);
    }
    $XmlElement = $XmlDocument.SelectSingleNode('*', $nsmgr);
    if ($null -eq $XmlElement) {
        return $XmlDocument.DocumentElement.AppendChild($XmlDocument.CreateElement('body', 'http://www.w3.org/1999/xhtml'));
    }
    return $XmlDocument.DocumentElement.InsertBefore($XmlDocument.CreateElement('body', 'http://www.w3.org/1999/xhtml'), $XmlElement);
}

Function Set-PageNavigation {
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true)]
        [string]$Path,
        
        [Parameter(Mandatory = $true)]
        [string]$XmlDocument
    )
}

$XmlDocument.OuterXml;

$Content


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