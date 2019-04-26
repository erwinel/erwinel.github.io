Add-Type -Path ($PSScriptRoot | Join-Path -ChildPath 'bin\Debug\PageManager.dll') -ErrorAction Stop;

$RootHtmlPage = [PageManager.HtmlPage]::new();
$RootHtmlPage.FileName = "index";
$RootHtmlPage.Title = "ServiceNow Implementation and Maintenance";
$RootHtmlPage.LinkName = "Home";
