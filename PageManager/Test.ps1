Add-Type -Path ($PSScriptRoot | Join-Path -ChildPath 'bin\Debug\PageManager.dll') -ErrorAction Stop;
$XmlPreloadedResolver = $null;
$XmlDocument = [PageManager.HtmlReaderWriter]::LoadHtml(($PSScriptRoot | Join-Path -ChildPath '../index.html'), [ref]$XmlPreloadedResolver);
$Encoding = $null;
[PageManager.HtmlReaderWriter]::FromXhtml($XmlDocument, [ref]$Encoding);