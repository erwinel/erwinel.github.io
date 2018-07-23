Param(
    [Parameter(Position = 0)]
    # Path to source JavaScript file. If not provided, user will be prompted.
    [string]$SourcePath = 'C:\Users\lerwi\GitHub\ServiceNowCode\scripts\force_to_update_set.js',

    [Parameter(Position = 1)]
    # Path for output file. If not provided, user will be prompted.
    [string]$TargetPath = 'C:\Users\lerwi\GitHub\erwinel.github.io\dist\force_to_update_set.html',

    [Parameter(Position = 2)]
    [ValidateSet('Yes', 'No', 'Prompt')]
    # Whether to overwrite the output file if it already exists.
    [string]$Overwrite = 'Yes'
)

Function New-CodeToken {
    Param(
        [Parameter(Mandatory = $true)]
        [System.Management.Automation.PSTokenType]$Type,

        [Parameter(Mandatory = $true, ParameterSetName = 'SourceText')]
        [int]$Start,

        [Parameter(Mandatory = $true, ParameterSetName = 'SourceText')]
        [int]$Length,

        [Parameter(Mandatory = $true, ParameterSetName = 'SourceText')]
        [string]$SourceText,

        [Parameter(Mandatory = $true, ParameterSetName = 'Match')]
        [System.Text.RegularExpressions.Group]$Group
    )
    if ($PSBoundParameters.ContainsKey('SourceText')) {
        $Text = $SourceText.Substring($Start, $Length);
        New-Object -TypeName 'System.Management.Automation.PSObject' -Property @{
            Type = [Enum]::GetName([System.Management.Automation.PSTokenType], $Type);
            Start = $Start;
            Length = $Text.Length;
            Text = $Text;
            NextIndex = $Start + $Text.Length;
        };
    } else {
        New-Object -TypeName 'System.Management.Automation.PSObject' -Property @{
            Type = [Enum]::GetName([System.Management.Automation.PSTokenType], $Type);
            Start = $Group.Index;
            Length = $Group.Length;
            Text = $Group.Value;
            NextIndex = $Group.Index + $Group.Length;
        };
    }
}

Function Get-NextNonWhiteSpacePosition {
    Param(
        [Parameter(Mandatory = $true)]
        [string]$SourceText,

        [Parameter(Mandatory = $true)]
        [int]$Position
    )
    while ($Position -lt $SourceText.Length -and [char]::IsWhiteSpace($SourceText[$Position])) { $Position++; }
    $Position | Write-Output;
}
$Script:SeparatorRegex = New-Object -TypeName 'System.Text.RegularExpressions.Regex' -ArgumentList '\G[^\r\n\S]*(\r\n?|\n|(;)|(\.))', ([System.Text.RegularExpressions.RegexOptions]::Compiled);
$Script:NumberRegex = New-Object -TypeName 'System.Text.RegularExpressions.Regex' -ArgumentList '\G[^\r\n\S]*(-?\d+(\.\d+)(e\d+)?|0x[a-fA-F\d]+)', ([System.Text.RegularExpressions.RegexOptions]::Compiled);
$Script:OperatorRegex = New-Object -TypeName 'System.Text.RegularExpressions.Regex' -ArgumentList '\G[^\r\n\S]*(([=!]=?|[+\-*/%<>])=?|\+\+|--|\?|,|&&?|\|\|?|~|\^|<<|>>>?|=>)', ([System.Text.RegularExpressions.RegexOptions]::Compiled);
$Script:StringRegex = New-Object -TypeName 'System.Text.RegularExpressions.Regex' -ArgumentList ("\G[^\r\n\S]*('[^'\r\n\\]*(\\([^\r\n]|\r\n?|\n)[^'\r\n\\]*)*(?<t>')?|" + '\G\s*"[^"\r\n\\]*(\\([^\r\n]|\r\n?|\n)[^"\r\n\\]*)*(?<t>")?)'), ([System.Text.RegularExpressions.RegexOptions]::Compiled);
$Script:GroupingRegex = New-Object -TypeName 'System.Text.RegularExpressions.Regex' -ArgumentList '\G[^\r\n\S]*(([\[({])|([\])}]))', ([System.Text.RegularExpressions.RegexOptions]::Compiled);
$Script:CommentRegex = New-Object -TypeName 'System.Text.RegularExpressions.Regex' -ArgumentList '\G[^\r\n\S]*(//[^\r\n]*(?=[\r\n]|$)|/\*[^*]*(\*[^/][^*]*)*\*/)', ([System.Text.RegularExpressions.RegexOptions]::Compiled);
$Script:NameRegex = New-Object -TypeName 'System.Text.RegularExpressions.Regex' -ArgumentList '\G[^\r\n\S]*([$_a-zA-Z][$_a-zA-Z\d]+)', ([System.Text.RegularExpressions.RegexOptions]::Compiled);
$Script:JsKeywords = @('abstract', 'arguments', 'await', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'double',
    'else', 'enum', 'eval', 'export', 'extends', 'false', 'final', 'finally', 'float', 'for', 'function', 'goto', 'if', 'implements', 'import', 'in', 'instanceof', 'int', 'interface',
    'let', 'long', 'native', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws',
    'transient', 'true', 'try', 'typeof', 'var', 'void', 'volatile', 'while', 'with', 'yield');

Function Write-OutputElement {
    Param(
        [Parameter(Mandatory = $true)]
        [string]$TagName,

        [Hashtable]$Attributes,

        [Parameter(ParameterSetName = 'ScriptBlock')]
        [ScriptBlock]$WriteContent,

        [Parameter(Mandatory = $true, ParameterSetName = 'Text')]
        [AllowEmptyString()]
        [string]$InnerText
    )

    $XmlWriter.WriteStartElement($TagName);
    $ElementClosed = $false;
    try {
        if ($PSBoundParameters.ContainsKey('Attributes') -and $Attributes.Count -gt 0) {
            $Attributes.Keys | ForEach-Object {
                $Value = $Attributes[$_];
                if ($Value -ne $null) {
                    if ($Value -isnot [string]) { $Value = ($Value | Out-String) -replace '(\r\n?|\n)$', ''; }
                    $Script:XmlWriter.WriteAttributeString($_, $Value);
                }
            }
        }
        if ($PSBoundParameters.ContainsKey('InnerText')) {
            $Script:XmlWriter.WriteString($InnerText);
        } else {
            if ($PSBoundParameters.ContainsKey('WriteContent')) { &$WriteContent }
        }
        $ElementClosed = $true;
        $XmlWriter.WriteEndElement();
    } catch {
        if (-not $ElementClosed) { try { $XmlWriter.WriteEndElement() } catch { } }
        throw;
    }
}

Function Search-JsToken {
    Param(
        [Parameter(Mandatory = $true)]
        [string]$SourceText,

        [Parameter(Mandatory = $true)]
        [int]$Position
    )

    $m = $Script:CommentRegex.Match($SourceText, $Position);
    if ($m.Success) {
        New-CodeToken -Type Comment -Group $m.Groups[1];
    } else {
        $m = $Script:SeparatorRegex.Match($SourceText, $Position);
        if ($m.Success) {
            if ($m.Groups[2].Success) {
                New-CodeToken -Type StatementSeparator -Group $m.Groups[1];
            } else {
                if ($m.Groups[3].Success) {
                    New-CodeToken -Type Unknown -Group $m.Groups[1];
                } else {
                    New-CodeToken -Type NewLine -Group $m.Groups[1];
                }
            }
        } else {
            $m = $Script:NumberRegex.Match($SourceText, $Position);
            if ($m.Success) {
                New-CodeToken -Type Number -Group $m.Groups[1];
            } else {
                $m = $Script:OperatorRegex.Match($SourceText, $Position);
                if ($m.Success) {
                    New-CodeToken -Type Operator -Group $m.Groups[1];
                } else {
                    $m = $Script:StringRegex.Match($SourceText, $Position);
                    if ($m.Success) {
                        New-CodeToken -Type String -Group $m.Groups[1];
                    } else {
                        $m = $Script:GroupingRegex.Match($SourceText, $Position);
                        if ($m.Success) {
                            if ($m.Groups[2].Success) {
                                New-CodeToken -Type GroupStart -Group $m.Groups[1];
                            } else {
                                New-CodeToken -Type GroupEnd -Group $m.Groups[1];
                            }
                        } else {
                            $m = $Script:NameRegex.Match($SourceText, $Position);
                            if ($m.Success) {
                                if ($Script:JsKeywords -ccontains $m.Groups[1].Value) {
                                    New-CodeToken -Type Keyword -Group $m.Groups[1];
                                } else {
                                    New-CodeToken -Type Variable -Group $m.Groups[1];
                                }
                            } else {
                                $Text = $SourceText.Substring($Position);
                                if ($Text.TrimEnd().Length -gt 0) {
                                    $JsonText = '';
                                    if ($Text.Length -gt 255) {
                                        $JsonText = ConvertTo-Json -InputObject $Text.Substring(0, 255);
                                        $JsonText += "...";
                                    } else {
                                        $JsonText = ConvertTo-Json -InputObject $Text;
                                    }
                                    Write-Error -Message "Syntax unknown at position $Position ($JsonText)" -Category SyntaxError -TargetObject $Text;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

Function Get-JsCodeTokens {
    Param(
        [Parameter(Mandatory = $true)]
        [string]$SourceText
    )

    $Token = Search-JsToken -SourceText $SourceText -Position 0;
    while ($Token -ne $null) {
        $Token | Write-Output;
        $Token = Search-JsToken -SourceText $SourceText -Position $Token.NextIndex;
    }
}

Function Compress-JsCodeTokens {
    Param(
        [Parameter(Mandatory = $true, ValueFromPipelineByPropertyName = $true)]
        [string]$Type,
        [Parameter(Mandatory = $true, ValueFromPipelineByPropertyName = $true)]
        [int]$Start,
        [Parameter(Mandatory = $true, ValueFromPipelineByPropertyName = $true)]
        [int]$Length,
        [Parameter(Mandatory = $true, ValueFromPipelineByPropertyName = $true)]
        [string]$Text,
        [Parameter(Mandatory = $true, ValueFromPipelineByPropertyName = $true)]
        [int]$NextIndex
    )

    Begin {
        $AllTokens = New-Object -TypeName 'System.Collections.ObjectModel.Collection[System.Management.Automation.PSObject]';
    }
    Process {
        $AllTokens.Add((New-Object -TypeName 'System.Management.Automation.PSObject' -Property @{
            Type = $Type;
            Start = $Start;
            Length = $Length;
            Text = $Text;
            NextIndex = $NextIndex;
        }));
    }
    End {
        for ($i = 0; $i -lt $AllTokens.Count; $i++) {
            if ($AllTokens[$i].Type -eq 'Unknown') {
                if ($i -eq 0 -or $i -eq ($AllTokens.Count - 1)) {
                    Write-Error -Message "Syntax error at position $($AllTokens[$i].Start)" -ErrorAction Stop;
                }
                $PrevToken = $AllTokens[$i - 1];
                $NextToken = $AllTokens[$i + 1];
                if ($PrevToken.NextIndex -ne $AllTokens[$i].Start -or $NextToken.Start -ne $AllTokens[$i].NextIndex) {
                    Write-Error -Message "Syntax error at position $($AllTokens[$i].Start)" -ErrorAction Stop;
                }
                if (($PrevToken.Type -eq 'Variable' -or (($PrevToken.Type -eq 'GroupEnd' -and $PrevToken.Text -ne '}'))) -and ($NextToken.Type -eq 'Variable' -or $NextToken.Type -eq 'Keyword')) {
                    $AllTokens[$i + 1] = New-Object -TypeName 'System.Management.Automation.PSObject' -Property @{
                        Type = 'Member';
                        Start = $NextToken.Start - 1;
                        Length = $NextToken.Length + 1;
                        Text = "." + $NextToken.Text;
                        NextIndex = $NextToken.NextIndex;
                    };
                    $AllTokens.RemoveAt($i);
                    $i--;
                } else {
                    Write-Error -Message "Syntax error at position $($AllTokens[$i].Start)" -ErrorAction Stop;
                }
            }
        }
        for ($i = 0; $i -lt ($AllTokens.Count - 1); $i++) {
            if (($AllTokens[$i].Type -eq 'Variable' -or $AllTokens[$i].Type -eq 'Member') -and ($AllTokens[$i+1].Type -eq 'GroupStart' -and $AllTokens[$i+1].Text -eq '(')) {
                $AllTokens[$i] = New-Object -TypeName 'System.Management.Automation.PSObject' -Property @{
                    Type = 'Command';
                    Start = $AllTokens[$i].Start;
                    Length = $AllTokens[$i].Length;
                    Text = $AllTokens[$i].Text;
                    NextIndex = $AllTokens[$i].NextIndex;
                };
            }
        }
        $AllTokens | Write-Output;
    }
}

Function Write-StyleRules {
    Param()

    $Script:XmlWriter.WriteString(@"

.console-pane,
.script-pane {
    border: 2px double var(--secondary);
    padding: 4pt;
    display: block;
}
.console-pane,
.script-pane,
.console-pane code,
.script-pane code,
.console-pane var,
.script-pane var {
    font: var(--font-family-monospace);
    font-size: small;
    font-weight: normal;
}
"@);
    $Script:ScriptTokenTypeMap = @{};
    $Script:ConsoleTokenTypeMap = @{};
    ((@(
        (New-Object -TypeName 'System.Management.Automation.PSObject' -Property @{
            ClassName = 'script-pane';
            ParentSelector = '';
            TagName = '';
            Color = $Script:ColorSettings.ScriptPane.Foreground;
        }), (New-Object -TypeName 'System.Management.Automation.PSObject' -Property @{
            ClassName = 'code';
            ParentSelector = '.script-pane';
            TagName = '';
            Color = $Script:ColorSettings.ScriptPane.Foreground;
        }), (New-Object -TypeName 'System.Management.Automation.PSObject' -Property @{
            ClassName = 'console-pane';
            ParentSelector = '';
            TagName = '';
            Color = $Script:ColorSettings.ConsolePane.Foreground;
        }), (New-Object -TypeName 'System.Management.Automation.PSObject' -Property @{
            ClassName = 'code';
            ParentSelector = '.console-pane';
            TagName = '';
            Color = $Script:ColorSettings.ConsolePane.Foreground;
        })
    ) + @($Script:ColorSettings.ScriptPane.TokenColors.Keys | ForEach-Object {
        $Color = $Script:ColorSettings.ScriptPane.TokenColors[$_];
        switch ($_) {
            'String' {
                $RenderInfo = New-Object -TypeName 'System.Management.Automation.PSObject' -Property @{
                    ClassName = '';
                    ParentSelector = '.script-pane';
                    TagName = 'q';
                    Color = $Color
                };
                $Script:ScriptTokenTypeMap[$_] = $RenderInfo;
                $RenderInfo | Write-Output;
                break;
            }
            'Variable' {
                $RenderInfo = New-Object -TypeName 'System.Management.Automation.PSObject' -Property @{
                    ClassName = '';
                    ParentSelector = '.script-pane';
                    TagName = 'var';
                    Color = $Color;
                };
                $Script:ScriptTokenTypeMap[$_] = $RenderInfo;
                $RenderInfo | Write-Output;
                break;
            }
            default {
                if ($Color -ne $Script:ColorSettings.ScriptPane.Foreground) {
                    $RenderInfo = New-Object -TypeName 'System.Management.Automation.PSObject' -Property @{
                        ClassName = 'script-' + $_.ToLower();
                        ParentSelector = '.script-pane';
                        TagName = '';
                        Color = $Color;
                    };
                    $Script:ScriptTokenTypeMap[$_] = $RenderInfo;
                    $RenderInfo | Write-Output;
                }
                break;
            }
        }
    }) + @($Script:ColorSettings.ConsolePane.TokenColors.Keys | ForEach-Object {
        $Color = $Script:ColorSettings.ConsolePane.TokenColors[$_];
        switch ($_) {
            'String' {
                $RenderInfo = New-Object -TypeName 'System.Management.Automation.PSObject' -Property @{
                    ClassName = '';
                    ParentSelector = '.console-pane';
                    TagName = 'q';
                    Color = $Color
                };
                $Script:ConsoleTokenTypeMap[$_] = $RenderInfo;
                $RenderInfo | Write-Output;
                break;
            }
            'Variable' {
                $RenderInfo = New-Object -TypeName 'System.Management.Automation.PSObject' -Property @{
                    ClassName = '';
                    ParentSelector = '.console-pane';
                    TagName = 'var';
                    Color = $Color
                };
                $Script:ConsoleTokenTypeMap[$_] = $RenderInfo;
                $RenderInfo | Write-Output;
                break;
            }
            default {
                if ($Color -ne $Script:ColorSettings.ConsolePane.Foreground) {
                    $RenderInfo = New-Object -TypeName 'System.Management.Automation.PSObject' -Property @{
                        ClassName = 'console-' + $_.ToLower();
                        ParentSelector = '.console-pane';
                        TagName = '';
                        Color = $Color;
                    };
                    $Script:ConsoleTokenTypeMap[$_] = $RenderInfo;
                    $RenderInfo | Write-Output;
                }
                break;
            }
        }
    })) | Group-Object -Property 'Color') | ForEach-Object {
        $Selectors = @($_.Group | ForEach-Object {
            if ($_.ParentSelector.Length -gt 0) {
                if ($_.TagName.Length -gt 0) { "$($_.ParentSelector) $($_.TagName)" } else { "$($_.ParentSelector) .$($_.ClassName)" }
            } else {
                if ($_.TagName.Length -gt 0) { $_.TagName } else { ".$($_.ClassName)" }
            }
        });
        $Rules = @("color: #$($_.Name)");
        if (@($_.Group | Where-Object { $_.ParentSelector.Length -eq 0 -and $_.ClassName -eq 'script-pane' }).Count -gt 0) { $Rules = $Rules + @("background-color: #$($Script:ColorSettings.ScriptPane.Background)"); }
        if (@($_.Group | Where-Object { $_.ParentSelector.Length -eq 0 -and $_.ClassName -eq 'console-pane' }).Count -gt 0) { $Rules = $Rules + @("background-color: #$($Script:ColorSettings.ConsolePane.Background)") }
        if ($Rules.Count -eq 1) {
            $Script:XmlWriter.WriteString("`r`n$($Selectors -join ", ") { $($Rules[0]); }");
        } else {
            $Script:XmlWriter.WriteString(@"

$($Selectors -join ",`r`n") {
    $($Rules -join ";`r`n    ");
}
"@);
        }
    }
    $Script:XmlWriter.WriteString(@"

.script-pane q:before, .console-pane q:before { content: no-open-quote; }
.script-pane q:after, .console-pane q:after { content: no-close-quote; }

"@);
}

Function Write-ScriptCode {
    Param(
        [Parameter(Mandatory = $true)]
        [Hashtable]$TokenTypeMap
    )

    $StartIndex = 0;
    $Depth = 0;
    $Script:ParsedTokens | ForEach-Object {
        $Token = $_;
        if ($TokenTypeMap.ContainsKey($Token.Type)) {
            if ($Token.Start -gt $StartIndex) { $Script:XmlWriter.WriteString($Script:Code.Substring($StartIndex, $Token.Start - $StartIndex)) }
            if ($TokenTypeMap[$Token.Type].TagName.Length -gt 0) {
                Write-OutputElement -TagName $TokenTypeMap[$Token.Type].TagName -InnerText $Script:Code.Substring($Token.Start, $Token.Length);
            } else {
                Write-OutputElement -TagName 'span' -Attributes @{ class = $TokenTypeMap[$Token.Type].ClassName } -InnerText $Script:Code.Substring($Token.Start, $Token.Length);
            }
            $StartIndex = $Token.Start + $Token.Length;
        }
    }
    if ($StartIndex -lt $Script:Code.Length) { $Script:XmlWriter.WriteString($Script:Code.Substring($StartIndex)) }
}

Function Convert-JsCodeToHtml {
    [CmdletBinding(DefaultParameterSetName = 'Opt')]
    Param(
        # Path to source JavaScript file. If not provided, user will be prompted.
        [string]$SourcePath,

        # Path for output file. If not provided, user will be prompted.
        [string]$TargetPath,

        [Parameter(Mandatory = $true, ParameterSetName = 'Force')]
        # Allows target output file to be overwritten if it already exists.
        [switch]$Force,

        [Parameter(ParameterSetName = 'Opt')]
        # If target output file already exists, prompt user whether to overwrite.
        [switch]$PromptIfTargetExists
    )

    $CategoryActivity = 'Reading from source file';
    if ([string]::IsNullOrWhiteSpace($SourcePath)) {
        $SourcePath = Read-Host -Prompt 'Enter path to source JavaScript file';
        if ([string]::IsNullOrWhiteSpace($SourcePath)) {
            Write-Error -Message 'Source path not provided' -Category InvalidArgument -ErrorId 'NoSourcePath' -TargetObject $SourcePath -CategoryActivity $CategoryActivity -CategoryTargetName 'SourcePath';
            Write-Warning -Message 'User aborted.';
            return;
        }
    }
    if (Test-Path -LiteralPath $SourcePath -PathType Leaf) {
        $Content = $null;
        try {
            $Content = Get-Content -Path $SourcePath -ErrorAction Stop;
            if ($Content -eq $null) {
                Write-Error -Message 'Failed to load content' -Category ReadError -ErrorId 'NoContent' -TargetObject $SourcePath -CategoryActivity $CategoryActivity -CategoryTargetName 'SourcePath' -ErrorAction Stop;
            }
        } catch {
            Write-Error -ErrorRecord $_ -CategoryActivity $CategoryActivity -CategoryReason 'Failed to load content' -CategoryTargetName 'SourcePath';
        }
        if ($Content -eq $null) {
            Write-Warning -Message "Failed to load content from '$SourcePath'. Aborting.";
            return;
        }
        $Script:Code = ($Content | Out-String).TrimEnd();
    } else {
        if (Test-Path -LiteralPath $SourcePath -PathType Container) {
            Write-Error -Message "'$SourcePath' is not a file." -Category InvalidType -ErrorId 'SourceIsDirectory' -TargetObject $SourcePath -CategoryActivity $CategoryActivity -CategoryTargetName 'SourcePath';
        } else {
            Write-Error -Message "'$SourcePath' was not found." -Category ObjectNotFound -ErrorId 'SourceNotFound' -TargetObject $SourcePath -CategoryActivity $CategoryActivity -CategoryTargetName 'SourcePath';
        }
        Write-Warning -Message 'Source file not found. Aborting.';
        return;
    }
    if ($Script:Code.TrimStart().Length -eq 0) {
        Write-Error -Message "'$SourcePath' was empty." -Category InvalidResult -ErrorId 'SourceEmpty' -TargetObject $SourcePath -CategoryActivity $CategoryActivity -CategoryTargetName 'SourcePath';
        Write-Warning -Message 'Source file was empty. Aborting.';
        return;
    }

    $Script:ParsedTokens = @((Get-JsCodeTokens -SourceText $Script:Code) | Compress-JsCodeTokens);
    $CategoryActivity = 'Validating from target file';
    if ([string]::IsNullOrWhiteSpace($TargetPath)) {
        $TargetPath = Read-Host -Prompt 'Enter path for output file';
        if ([string]::IsNullOrWhiteSpace($TargetPath)) {
            Write-Error -Message 'Target path not provided' -Category InvalidArgument -ErrorId 'NoTargetPath' -TargetObject $TargetPath -CategoryActivity $CategoryActivity -CategoryTargetName 'TargetPath';
            Write-Warning -Message 'User aborted.';
            return;
        }
    }
    $TargetExists = Test-Path -LiteralPath $SourcePath -PathType Leaf;
    if ($TargetExists) {
        if ($PromptIfTargetExists) {
            $Choices = New-Object -TypeName 'System.Collections.ObjectModel.Collection[System.Management.Automation.Host.ChoiceDescription]';
            $Choices.Add((New-Object -TypeName 'System.Management.Automation.Host.ChoiceDescription' -ArgumentList 'Y', 'Overwrite file'));
            $Choices.Add((New-Object -TypeName 'System.Management.Automation.Host.ChoiceDescription' -ArgumentList 'N', 'Do NOT overwrite file'));
            $Index = $Host.UI.PromptForChoice('Overwrite?', "'$SourcePath' already exists.`r`n`r`nDo you want to overwrite this file?", $Choices, 1);
            if ($Index -eq $null -or $Index -ne 0) {
                Write-Error -Message "'$TargetPath' already exists" -Category ResourceExists -ErrorId 'TargetPathExists' -TargetObject $TargetPath -CategoryActivity $CategoryActivity -CategoryTargetName 'TargetPath' -CategoryReason 'User did not allow overwrite';
                Write-Warning -Message 'User aborted (Target path already exists). Aborting.';
                return;
            }
        } else {
            if (-not $Force) {
                Write-Error -Message "'$TargetPath' already exists" -Category ResourceExists -ErrorId 'TargetPathExists' -TargetObject $TargetPath -CategoryActivity $CategoryActivity -CategoryTargetName 'TargetPath';
                Write-Warning -Message 'Target path already exists. Aborting.';
                return;
            }
        }
    } else {
        if (Test-Path -LiteralPath $SourcePath -PathType Container) {
            Write-Error -Message "'$SourcePath' is a subdirectory." -Category InvalidType -ErrorId 'TargetIsDirectory' -TargetObject $TargetPath -CategoryActivity $CategoryActivity -CategoryTargetName 'TargetPath';
        }
    }

    $Settings = New-Object -TypeName 'System.Xml.XmlWriterSettings';
    $Settings.CheckCharacters = $false;
    $Settings.Indent = $false;
    $Settings.OmitXmlDeclaration = $true;
    $Settings.WriteEndDocumentOnClose = $true;
    if ($TargetExists) { $CategoryActivity = 'Truncating target file' } else { $CategoryActivity = 'Creating target file' }
    $ErrorCount = $Error.Count;
    $Script:XmlWriter = $null;
    $CategoryReason = 'Failed to open target file for writing';
    try { $Script:XmlWriter = [System.Xml.XmlWriter]::Create($TargetPath, $Settings) }
    catch {
        Write-Error -ErrorRecord $_ -CategoryActivity $CategoryActivity -CategoryReason $CategoryReason -CategoryTargetName 'TargetPath';
        Write-Warning -Message "$CategoryReason Aborting";
        return;
    }
    if ($Script:XmlWriter -eq $null) {
        if ($ErrorCount -lt $Error.Count) {
            Write-Error -ErrorRecord $Error[$Error.Count - 1] -CategoryActivity $CategoryActivity -CategoryReason $CategoryReason -CategoryTargetName 'TargetPath';
        } else {
            Write-Error -Message "Failed to open'$SourcePath' for writing." -Category OpenError -ErrorId 'TargetOpenError' -TargetObject $TargetPath -CategoryActivity $CategoryActivity -CategoryTargetName 'TargetPath';
        }
        Write-Warning -Message "$CategoryReason Aborting";
        return;
    }
    try {
        $Script:XmlWriter.WriteRaw("<!DOCTYPE html>`r`n");
        $FileName = $SourcePath | Split-Path -Leaf;
        Write-OutputElement -TagName 'html' -WriteContent {
            Write-OutputElement -TagName 'head' -WriteContent {
                Write-OutputElement -TagName 'title' -InnerText $FileName;
                Write-OutputElement -TagName 'style' -Attributes @{ type = 'text/css' } -WriteContent { Write-StyleRules }
            }
            Write-OutputElement -TagName 'body' -WriteContent {
                $Script:XmlWriter.WriteString("`r`n");
                Write-OutputElement -TagName 'h1' -InnerText $FileName;
                $Script:XmlWriter.WriteString("`r`n");
                Write-OutputElement -TagName 'h2' -InnerText 'Script Pane';
                $Script:XmlWriter.WriteString("`r`n");
                Write-OutputElement -TagName 'pre' -Attributes @{ class = 'script-pane' } -WriteContent {
                    Write-OutputElement -TagName 'code' -WriteContent { Write-ScriptCode -TokenTypeMap $Script:ScriptTokenTypeMap }
                }
                $Script:XmlWriter.WriteString("`r`n");
                Write-OutputElement -TagName 'h2' -InnerText 'Console Pane';
                $Script:XmlWriter.WriteString("`r`n");
                Write-OutputElement -TagName 'pre' -Attributes @{ class = 'console-pane' } -WriteContent {
                    Write-OutputElement -TagName 'code' -WriteContent { Write-ScriptCode -TokenTypeMap $Script:ConsoleTokenTypeMap }
                }
            }
        }
    } finally {
        $Script:XmlWriter.Flush();
        $XmlWriter.Close();
    }

    Write-Host "Code written to $TargetPath";
}

$Script:ColorSettings = Import-Clixml -LiteralPath ($PSScriptRoot | Join-Path -ChildPath 'TokenColors.xml');
$Splat = @{ ErrorAction = [System.Management.Automation.ActionPreference]::Continue };
if (-not [string]::IsNullOrWhiteSpace($SourcePath)) { $Splat['SourcePath'] = $SourcePath }
if (-not [string]::IsNullOrWhiteSpace($TargetPath)) { $Splat['TargetPath'] = $TargetPath }
if ($Overwrite -eq 'Yes') {
    $Splat['Force'] = [System.Management.Automation.SwitchParameter]::Present;
} else {
    if ($Overwrite -eq 'Prompt') { $Splat['PromptIfTargetExists'] = [System.Management.Automation.SwitchParameter]::Present }
}
$DebugPreference = [System.Management.Automation.ActionPreference]::Continue;
Convert-JsCodeToHtml @Splat;