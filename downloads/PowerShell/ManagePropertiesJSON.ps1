Function Convert-HsbToRgb {
    <#
        .SYNOPSIS
            Converts Hue/Saturation/Brightness color values to Red/Green/Blue percentage color values.

        .DESCRIPTION
            Converts Hue (degrees), Saturation (percentage) and Brightness (percentage) color values into 3 consecutive RGB color percentage values representing Red, Green and Blue, respectively.
    #>
    [CmdletBinding()]
    [OutputType([float[]])]
    Param(
      [Parameter(Mandatory = $true, Position = 0)]
      [ValidateRange(0.0, 360.0)]
      [Alias('H')]
      # Color hue in degreees: 0|360=Red; 45=Yellow; 135=Green; 180=Cyan; 225=Blue; 315=Magenta.
      [float]$Hue,
      
      [Parameter(Mandatory = $true, Position = 1)]
      [ValidateRange(0.0, 1.0)]
      [Alias('S')]
      # Percentage of color saturation: 0.0=gray scale; 1.0=full color saturation.
      [float]$Saturation,
      
      [Parameter(Mandatory = $true, Position = 2)]
      [ValidateRange(0.0, 1.0)]
      [Alias('Lightness', 'L', 'B')]
      # Color brightness percentage: 0.0=Completely dark (black); 1.0=Fully light (white).
      [float]$Brightness
    )
   
    [float]$fMax = 0.0;
    [float]$fMin = 0.0;
    if ($Brightness -lt 0.5) {
        [float]$fMax = $Brightness + ($Brightness * $Saturation);
        [float]$fMin = $Brightness - ($Brightness * $Saturation);
    } else {
        [float]$fMax = $Brightness - ($Brightness * $Saturation) + $Saturation;
        [float]$fMin = $Brightness + ($Brightness * $Saturation) - $Saturation;
    }

    [int]$iSextant = [Math]::Floor($Hue / ([float](60)));
    if ($Hue -ge 300.0) {
        [float]$Hue -= 360.0;
    }
    [float]$Hue /= 60.0;
    [float]$Hue -= 2.0 * [Math]::Floor((($iSextant + 1.0) % 6.0) / 2.0);
    [float]$fMid = 0.0;
    if (($iSextant % 2) -eq 0) {
        [float]$fMid = $Hue * ($fMax - $fMin) + $fMin;
    } else {
        [float]$fMid = $fMin - $Hue * ($fMax - $fMin);
    }
      
    $iMax = [Convert]::ToInt32($fMax * 255);
    $iMid = [Convert]::ToInt32($fMid * 255);
    $iMin = [Convert]::ToInt32($fMin * 255);

    switch ($iSextant) {
        1 { return @($iMid, $iMax, $iMin) }
        2 { return @($iMin, $iMax, $iMid) }
        3 { return @($iMin, $iMid, $iMax) }
        4 { return @($iMid, $iMin, $iMax) }
        5 { return @($iMax, $iMin, $iMid) }
    }
  
    return @($iMax, $iMid, $iMin);
}

Function Convert-RgbToHsb {
    <#
        .SYNOPSIS
            Converts Red/Green/Blue color percentage values to Hue/Saturation/Brightness color values.

        .DESCRIPTION
            Converts Red, Green and Blue color percentage values into 3 consecutive HSL color values representing Hue (degrees), Saturation (percentage) and Brightness (percentage), respectively.
    #>
    [CmdletBinding()]
    [OutputType([float[]])]
    Param(
      [Parameter(Mandatory = $true, Position = 0)]
      [ValidateRange(0.0, 1.0)]
      # Red color percentage value: 0=no red; 1.0=fully red.
      [float]$Red,
      
      [Parameter(Mandatory = $true, Position = 1)]
      [ValidateRange(0.0, 1.0)]
      # Green color percentage value: 0=no green; 1.0=fully green.
      [float]$Green,
      
      [Parameter(Mandatory = $true, Position = 2)]
      [ValidateRange(0.0, 1.0)]
      # Blue color percentage value: 0=no blue; 1.0=fully blue.
      [float]$Blue
    )

    $Min = 0.0;
    $Max = 1.0;
    if ($Red -lt $Green) {
        if ($Blue -lt $Red) {
            $Min = $Blue;
            $Max = $Green;
        } else {
            $Min = $Red;
            if ($Green -lt $Blue) { $Max = $Blue } else { $Max = $Green }
        }
    } else {
        if ($Blue -lt $Green) {
            # B < G < R
            $Min = $Blue;
            $Max = $Red;
        } else {
            $Min = $Green;
            if ($Red -lt $Blue) { $Max = $Blue } else { $Max = $Red }
        }
    }
    $Delta = $Max - $Min;
    $Saturation = 0.0;
    $Hue = 0.0;
    $Brightness = $Max;
    if ($Delta -gt 0) {
        if ($Max -eq $Red) {
            $Hue = ($Green - $Blue) / $Delta;
        } else {
            if ($Max -eq $Green) {
                $Hue = 2.0 + ($Blue - $Red) / $Delta;
            } else {
                $Hue = 4.0 + ($Red - $Green) / $Delta;
            }
        }
        $Hue *= 60.0;
        if ($Hue -lt 0.0) {
            $Hue += 360.0;
        }
        $mm = $Max + $Min;
        $Brightness = $mm / 2.0;
        if ($Brightness -le 0.5) {
            $Saturation = $Delta / $mm;
        } else {
            $Saturation = $Delta / (2.0 - $mm);
        }
    }
    "Min: $Min; Max: $Max" | Write-Host;
    return @($Hue, $Saturation, $Brightness);
}

Function New-Color {
    [CmdletBinding(DefaultParameterSetName = 'HEX')]
    Param(
      [Parameter(Mandatory = $true, ValueFromPipeline = $true, ParameterSetName = 'HEX')]
      [ValidatePattern('^#?[\da-fA-F]{3}([\da-fA-F]([\da-fA-F]{2}([\da-fA-F]{2})?)?)?$')]
      # Hexidecimal color string.
      [string]$InputValue,
      
      [Parameter(Mandatory = $true, ParameterSetName = 'KnownColor')]
      # Known color value.
      [System.Drawing.KnownColor]$Color,
      
      [Parameter(Mandatory = $true, Position = 0, ParameterSetName = 'RGBPercent')]
      [ValidateRange(0, 1.0)]
      # Red color percentage value: 0=no red; 1.0=fully red.
      [float]$Red,
      
      [Parameter(Mandatory = $true, Position = 1, ParameterSetName = 'RGBPercent')]
      [ValidateRange(0, 1.0)]
      # Green color percentage value: 0=no green; 1.0=fully green.
      [float]$Green,
      
      [Parameter(Mandatory = $true, Position = 2, ParameterSetName = 'RGBPercent')]
      [ValidateRange(0, 1.0)]
      # Blue color percentage value: 0=no blue; 1.0=fully blue.
      [float]$Blue,
      
      [Parameter(Mandatory = $true, ParameterSetName = 'HSB')]
      [ValidateRange(0.0, 360.0)]
      [Alias('H')]
      # Color hue in degreees: 0|360=Red; 45=Yellow; 135=Green; 180=Cyan; 225=Blue; 315=Magenta.
      [float]$Hue,
      
      [Parameter(Mandatory = $true, ParameterSetName = 'HSB')]
      [ValidateRange(0.0, 1.0)]
      [Alias('S')]
      # Percentage of color saturation: 0.0=gray scale; 1.0=full color saturation.
      [float]$Saturation,
      
      [Parameter(Mandatory = $true, ParameterSetName = 'HSB')]
      [ValidateRange(0.0, 1.0)]
      [Alias('V')]
      # Color brightness percentage: 0.0=Completely dark (black); 1.0=Fully light (white).
      [float]$Brightness,
      
      [Parameter(Position = 3, ParameterSetName = 'RGBPercent')]
      [Parameter(ParameterSetName = 'KnownColor')]
      [Parameter(ParameterSetName = 'HSB')]
      [ValidateRange(0, 1.0)]
      # Transperancy (alpha layer) percentage value: 0=transparent; 255=opaque.
      [float]$Alpha = 1.0,
      
      [Parameter(Mandatory = $true, ValueFromPipelineByPropertyName = $true, ParameterSetName = 'RGBValue')]
      [ValidateRange(0, 255)]
      # Binary Red color value: 0=no red; 255=fully red.
      [int]$R,
      
      [Parameter(Mandatory = $true, ValueFromPipelineByPropertyName = $true, ParameterSetName = 'RGBValue')]
      [ValidateRange(0, 255)]
      # Binary Green color value: 0=no green; 255=fully green.
      [int]$G,
      
      [Parameter(Mandatory = $true, ValueFromPipelineByPropertyName = $true, ParameterSetName = 'RGBValue')]
      [ValidateRange(0, 255)]
      # Blue color percentage value: 0=no blue; 1.0=fully blue.
      [int]$B,
      
      [Parameter(ValueFromPipelineByPropertyName = $true, ParameterSetName = 'RGBValue')]
      [ValidateRange(0, 255)]
      # Binary alpha layer value: 0=transparent; 255=opaque.
      [int]$A = 255
    )

    Process {
        switch ($PSCmdlet.ParameterSetName) {
            'KnownColor' {
                $ColorObj = [System.Drawing.Color]::FromKnownColor($Color);
                [int]$bA = 255 * $Alpha;
                if ($bA -ne $Color.A -and $Color -ne [System.Drawing.KnownColor]::Transparent) {
                    [System.Drawing.Color]::FromArgb($bA, $Color.R, $Color.G, $Color.B) | Write-Output;
                } else {
                    $ColorObj | Write-Output;
                }
                break;
            }
            'RGBValue' {
                [System.Drawing.Color]::FromArgb($A, $R, $G, $B) | Write-Output;
                break;
            }
            'RGBPercent' {
                [System.Drawing.Color]::FromArgb([int](255.0 * $Alpha), [int](255.0 * $Red), [int](255.0 * $Green), [int](255.0 * $Blue)) | Write-Output;
                break;
            }
            'HSB' {
                ($fltR, $fltG, $fltB) = Convert-HsbToRgb -H $Hue -S $Saturation -B $Brightness;
                [System.Drawing.Color]::FromArgb([int](255.0 * $Alpha), [int](255.0 * $fltR), [int](255.0 * $fltG), [int](255.0 * $fltB)) | Write-Output;
                break;
            }
            default {
                $Hex = $InputValue;
                if ($Hex[0] -eq '#') { $Hex = $Hex.Substring(1) }
                switch ($Hex.Length) {
                    3 {
                        [System.Drawing.Color]::FromArgb(255, [int]::Parse($Hex[0] + $Hex[0], [System.Globalization.NumberStyles]::HexNumber), [int]::Parse($Hex[1] + $Hex[1], [System.Globalization.NumberStyles]::HexNumber),
                            [int]::Parse($Hex[2] + $Hex[2], [System.Globalization.NumberStyles]::HexNumber)) | Write-Output;
                        break;
                    }
                    4 {
                        [System.Drawing.Color]::FromArgb([int]::Parse($Hex[0] + $Hex[0], [System.Globalization.NumberStyles]::HexNumber), [int]::Parse($Hex[1] + $Hex[1], [System.Globalization.NumberStyles]::HexNumber),
                            [int]::Parse($Hex[2] + $Hex[2], [System.Globalization.NumberStyles]::HexNumber), [int]::Parse($Hex[3] + $Hex[3], [System.Globalization.NumberStyles]::HexNumber)) | Write-Output;
                        break;
                    }
                    6 {
                        [System.Drawing.Color]::FromArgb(255, [int]::Parse($Hex.Substring(0, 2), [System.Globalization.NumberStyles]::HexNumber), [int]::Parse($Hex.Substring(2, 2), [System.Globalization.NumberStyles]::HexNumber),
                            [int]::Parse($Hex.Substring(4, 2), [System.Globalization.NumberStyles]::HexNumber)) | Write-Output;
                        break;
                    }
                    default {
                        [System.Drawing.Color]::FromArgb([int]::Parse($Hex.Substring(0, 2), [System.Globalization.NumberStyles]::HexNumber), [int]::Parse($Hex.Substring(2, 2), [System.Globalization.NumberStyles]::HexNumber),
                            [int]::Parse($Hex.Substring(4, 2), [System.Globalization.NumberStyles]::HexNumber), [int]::Parse($Hex.Substring(6, 2), [System.Globalization.NumberStyles]::HexNumber)) | Write-Output;
                        break;
                    }
                }
                break;
            }
        }
    }
}

Function Set-Color {
    [CmdletBinding(DefaultParameterSetName = 'Alpha')]
    Param(
      [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
      [System.Drawing.Color]$InputColor,
      
      [Parameter(ParameterSetName = 'RGBPercent')]
      [ValidateRange(0, 1.0)]
      # Red color percentage value: 0=no red; 1.0=fully red.
      [float]$Red,
      
      [Parameter(ParameterSetName = 'RGBPercent')]
      [ValidateRange(0, 1.0)]
      # Green color percentage value: 0=no green; 1.0=fully green.
      [float]$Green,
      
      [Parameter(ParameterSetName = 'RGBPercent')]
      [ValidateRange(0, 1.0)]
      # Blue color percentage value: 0=no blue; 1.0=fully blue.
      [float]$Blue,
      
      [Parameter(ParameterSetName = 'HSB')]
      [ValidateRange(0.0, 360.0)]
      [Alias('H')]
      [float]$Hue,
      
      [Parameter(ParameterSetName = 'HSB')]
      [ValidateRange(0.0, 1.0)]
      [Alias('S')]
      [float]$Saturation,
      
      [Parameter(ParameterSetName = 'HSB')]
      [ValidateRange(0.0, 1.0)]
      [Alias('V')]
      [float]$Brightness,
      
      [Parameter(Mandatory = $true, ParameterSetName = 'Alpha')]
      [Parameter(ParameterSetName = 'RGBPercent')]
      [Parameter(ParameterSetName = 'HSB')]
      [ValidateRange(0, 1.0)]
      # Transperancy (alpha layer) percentage value: 0=transparent; 255=opaque.
      [float]$Alpha,
      
      [Parameter(ParameterSetName = 'RGBValue')]
      [ValidateRange(0, 255)]
      # Binary Red color value: 0=no red; 255=fully red.
      [int]$R,
      
      [Parameter(ParameterSetName = 'RGBValue')]
      [ValidateRange(0, 255)]
      # Binary Green color value: 0=no green; 255=fully green.
      [int]$G,
      
      [Parameter(ParameterSetName = 'RGBValue')]
      [ValidateRange(0, 255)]
      # Blue color percentage value: 0=no blue; 1.0=fully blue.
      [int]$B,
      
      [Parameter(ParameterSetName = 'RGBValue')]
      [ValidateRange(0, 255)]
      # Binary alpha layer value: 0=transparent; 255=opaque.
      [int]$A
    )

    Process {
        switch ($PSCmdlet.ParameterSetName) {
            'HSB' {
                $fltH = $Hue; $fltS = $Saturation; $fltB = $Brightness;
                if (-not $PSBoundParameters.ContainsKey('Hue')) { $fltH = $InputColor.GetHue() }
                if (-not $PSBoundParameters.ContainsKey('Saturation')) { $fltS = $InputColor.GetSaturation() }
                if (-not $PSBoundParameters.ContainsKey('Brightness')) { $fltB = $InputColor.GetBrightness() }
                if ($PSBoundParameters.ContainsKey('Alpha')) {
                    (New-Color -Hue $fltH -Saturation $fltS -Brightness $fltB -Alpha $Alpha) | Write-Output;
                } else {
                    (New-Color -Hue $fltH -Saturation $fltS -Brightness $fltB -Alpha ([float]($InputColor.A) / 255.0)) | Write-Output;
                }
                break;
            }
            'RGBValue' {
                $bA = $A; $bR = $R; $bG = $G; $bB = $B;
                if (-not $PSBoundParameters.ContainsKey('A')) { $bA = $InputColor.A }
                if (-not $PSBoundParameters.ContainsKey('R')) { $bR = $InputColor.R }
                if (-not $PSBoundParameters.ContainsKey('G')) { $bB = $InputColor.G }
                if (-not $PSBoundParameters.ContainsKey('B')) { $bG = $InputColor.B }
                (New-Color -R $bR -G $bG -B $bB -A $bA) | Write-Output;
                break;
            }
            'RGBPercent' {
                $fltA = $Alpha; $fltR = $Red; $fltG = $Green; $fltB = $Blue;
                if (-not $PSBoundParameters.ContainsKey('Alpha')) { $fltA = [float]($InputColor.A) / 255.0 }
                if (-not $PSBoundParameters.ContainsKey('Red')) { $fltR = [float]($InputColor.R) / 255.0 }
                if (-not $PSBoundParameters.ContainsKey('Green')) { $fltG = [float]($InputColor.G) / 255.0 }
                if (-not $PSBoundParameters.ContainsKey('Blue')) { $fltB = [float]($InputColor.B) / 255.0 }
                (New-Color -Red $fltR -Green $fltG -Blue $fltB -Alpha $fltA) | Write-Output;
            }
            default {
                (New-Color -R $InputColor.R -G $InputColor.G -B $InputColor.B -A ([int](255.0 * $Alpha))) | Write-Output;
                break;
            }
        }
    }
}

Function Move-Color {
    [CmdletBinding(DefaultParameterSetName = 'Alpha')]
    Param(
      [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
      [System.Drawing.Color]$InputColor,
      
      [Parameter(ParameterSetName = 'RGB')]
      [ValidateRange(-1.0, 1.0)]
      [Alias('R')]
      # Increase or decrease red value by specified percentage: negative=less red; positive=more red.
      [float]$Red,
      
      [Parameter(ParameterSetName = 'RGB')]
      [ValidateRange(-1.0, 1.0)]
      [Alias('G')]
      # Increase or decrease green value by specified percentage: negative=less green; positive=more green.
      [float]$Green,
      
      [Parameter(ParameterSetName = 'RGB')]
      [ValidateRange(-1.0, 1.0)]
      [Alias('B')]
      # Increase or decrease blue value by specified percentage: negative=less blue; positive=more blue.
      [float]$Blue,
      
      [Parameter(ParameterSetName = 'HSB')]
      [ValidateRange(-360.0, 360.0)]
      [Alias('H')]
      # Shift hue by specified number of degrees: negative=red-to-blue/cyan-to-yellow shift; positive: red-to-green/cyan-to-magenta shift.
      [float]$Hue,
      
      [Parameter(ParameterSetName = 'HSB')]
      [ValidateRange(-1.0, 1.0)]
      [Alias('S')]
      # Increase or decrease saturation by specified percentage: negative=less colorful; positive=more colorful.
      [float]$Saturation,
      
      [Parameter(ParameterSetName = 'HSB')]
      [ValidateRange(-1.0, 1.0)]
      [Alias('V')]
      # Increase or decrease brightness by specified percentage: negative=darker; positive=lighter.
      [float]$Brightness,
      
      [Parameter(Mandatory = $true, ParameterSetName = 'Alpha')]
      [Parameter(ParameterSetName = 'RGB')]
      [Parameter(ParameterSetName = 'HSB')]
      [ValidateRange(-1.0, 1.0)]
      [Alias('A')]
      # Increase or decrease alpha layer (transperancy) value by specified percentage: negative=more transparent; positive=more opaque.
      [float]$Alpha
    )

    Process {
        switch ($PSCmdlet.ParameterSetName) {
            'HSB' {
                [float]$fltA = ($InputColor.A) / 255.0; $fltH = $InputColor.GetHue(); $fltS = $InputColor.GetSaturation(); $fltB = $InputColor.GetBrightness();
                if ($PSBoundParameters.ContainsKey('Hue')) {
                    $fltH += $Hue;
                    if ($fltH -lt 0.0) { $fltH += 360.0 } else { if ($fltH -gt 360.0) { $fltH -= 360.0 } }
                }
                if ($PSBoundParameters.ContainsKey('Saturation')) {
                    if ($Saturation -lt 0) {
                        $fltS *= (1.0 + $Saturation);
                    } else {
                        $fltS += ((1.0 - $fltS) * $Saturation);
                    }
                }
                if ($PSBoundParameters.ContainsKey('Brightness')) {
                    if ($Brightness -lt 0) {
                        $fltB *= (1.0 + $Brightness);
                    } else {
                        $fltB += ((1.0 - $fltS) * $Brightness);
                    }
                }
                if ($PSBoundParameters.ContainsKey('Alpha')) {
                    if ($Alpha -lt 0) {
                        $fltA * (1.0 + $Alpha);
                    } else {
                        $fltA += ((1.0 - $fltA) * $Alpha);
                    }
                }
                (New-Color -Hue $fltH -Saturation $fltS -Brightness $fltB -Alpha $fltA) | Write-Output;
                break;
            }
            'RGB' {
                $bA = $InputColor.A; $bR = $InputColor.R; $bG = $InputColor.G; $bB = $InputColor.B;
                if ($PSBoundParameters.ContainsKey('Alpha')) {
                    if ($Alpha -lt 0) {
                        [int]$bA = [double]$bA * (1.0 + $Alpha);
                    } else {
                        $bA += [int]((255 - $bA) * $Alpha);
                    }
                }
                if ($PSBoundParameters.ContainsKey('Red')) {
                    if ($Red -lt 0) {
                        [int]$bR = [double]$bR * (1.0 + $Red);
                    } else {
                        $bR += [int]((255 - $bR) * $Red);
                    }
                }
                if ($PSBoundParameters.ContainsKey('Green')) {
                    if ($Green -lt 0) {
                        [int]$bG = [double]$bG * (1.0 + $Green);
                    } else {
                        $bG += [int]((255 - $bG) * $Green);
                    }
                }
                if ($PSBoundParameters.ContainsKey('Blue')) {
                    if ($Blue -lt 0) {
                        [int]$bB = [double]$bB * (1.0 + $Blue);
                    } else {
                        $bB += [int]((255 - $bB) * $Blue);
                    }
                }
                (New-Color -R $bR -G $bG -B $bB -A $bA) | Write-Output;
                break;
            }
            default {
                if ($Alpha -lt 0) {
                    (New-Color -R $InputColor.R -G $InputColor.G -B $InputColor.B -A ([int]([double]($InputColor.A) * (1.0 + $Alpha)))) | Write-Output;
                } else {
                    (New-Color -R $InputColor.R -G $InputColor.G -B $InputColor.B -A ($InputColor.A + [int]((255 - $InputColor.A) * $Alpha))) | Write-Output;
                }
                break;
            }
        }
    }
}


$JsonText = @'
[
	{ name: "glide.sys.default.tz", type: "timezone", description: "System timezone for all users unless overridden in the user\u0027s record", sys_package: "glidesoft",
		prod: "US/Eastern", uat: "US/Eastern", test: "US/Eastern", dev: "US/Eastern", sb: "US/Eastern" },
	{ name: "glide.product.name", type: "string", description: "Browser tab title", sys_package: "apps/system2",
		prod: "ServiceNow Production", uat: "ServiceNow UAT", test: "ServiceNow Test", dev: "ServiceNow Dev", sb: "ServiceNow Sandbox" },
	{ name: "glide.product.description", type: "string", description: "Page header caption", sys_package: "apps/system2",
		ootb: "Service Management", prod: "Enterprise Service Tool", uat: "Enterprise Service Tool", test: "Enterprise Service Tool", dev: "Enterprise Service Tool", sb: "Enterprise Service Tool" },
	{ name: "css.base.color", type: "color", description: "Banner and list caption background color", sys_package: "apps/system2",
		ootb: "#767676", prod: "#985252", uat: "#526498", test: "#645298", dev: "#649852", sb: "#767676" },
	{ name: "css.banner.description.color", type: "color", description: "Banner text color", sys_package: "glidesoft",
		ootb: "#AAAAAA", prod: "#d58181", uat: "#8196d5", test: "#96d581", dev: "#96d581", sb: "#AAAAAA" },
	{ name: "css.$navpage-header-bg", type: "color", description: "Header Background Color", sys_package: "com.glide.ui.ui16",
		ootb: "#303a46", prod: "#5b1a1a", uat: "#1a2a5b", test: "#9681d5", dev: "#2a5b1a", sb: "#303a46" },
	{ name: "css.$navpage-header-color", type: "color", description: "Header Background Color", sys_package: "com.glide.ui.ui16",
		ootb: "#ffffff", prod: "#fafad2", uat: "#fafad2", test: "#fafad2", dev: "#fafad2", sb: "#ffffff" },
	{ name: "css.$navpage-header-divider-color", type: "color", description: "Header divider stripe color", sys_package: "global",
		ootb: "#455464", prod: "#822626", uat: "#263d82", test: "#3d2682", dev: "#3d8226", sb: "#455464" },
	{ name: "css.$navpage-nav-bg", type: "color", description: "Navigation Header/Footer", sys_package: "com.glide.ui.ui16",
		ootb: "#303A46", prod: "#5b1a1a", uat: "#1a2a5b", test: "#9681d5", dev: "#2a5b1a", sb: "#303A46" },
	{ name: "css.$subnav-background-color", type: "color", description: "Navigation background expanded items", sys_package: "com.glide.ui.ui16",
		ootb: "#303a46", prod: "#592222", uat: "#223d59", test: "#2f2259", dev: "#2f5922", sb: "#223d59" },
	{ name: "css.$navpage-nav-color-sub", type: "color", description: "Module text color for UI16\u003cbr/\u003eAlso affects unselected navigation tab icon and favorite icons color.", sys_package: "com.glide.ui.ui16",
		ootb: "#bec1c6", prod: "#d7d7ac", uat: "#d7d7ac", test: "#d7d7ac", dev: "#dde1ee", sb: "#bec1c6" },
	{ name: "css.$navpage-nav-selected-bg", type: "color", description: "Navigation selected tab background color", sys_package: "com.glide.ui.ui16",
		ootb: "#4B545F", prod: "#7e2a2a", uat: "#2a3f7e", test: "#3f2a7e", dev: "#3f7e2a", sb: "#4B545F" },
	{ name: "css.$nav-hr-color", type: "color", description: "Navigation separator color", sys_package: "com.glide.ui.ui16",
		ootb: "#303a46", prod: "#7e2a2a", uat: "#2a3f7e", test: "#3f2a7e", dev: "#3f7e2a", sb: "#303a46" },
	{ name: "css.$navpage-nav-bg-sub", type: "color", description: "Background for navigator and sidebars", sys_package: "com.glide.ui.ui16",
		ootb: "#455464", prod: "#822626", uat: "#263d82", test: "#3d2682", dev: "#3d8226", sb: "#455464" },
	{ name: "css.$navpage-nav-unselected-color", type: "color", description: "Unselected navigation tab icon and favorite icons color", sys_package: "global",
		ootb: "#bec1c6", prod: "#e0a3a3", uat: "#a3c2e0", test: "#b3a3e0", dev: "#b3e0a3", sb: "#bec1c6" },
	{ name: "css.$navpage-nav-selected-color", type: "color", description: "Currently selected Navigation tab icon color for UI16",
		ootb: "#ffffff", prod: "#afeeee", uat: "#f08080", test: "#f08080", dev: "#f08080", sb: "#ffffff" },
	{ name: "css.$navpage-nav-border", type: "color", description: "Border color for UI16", sys_package: "com.glide.ui.ui16",
		ootb: "#ddd", prod: "#eecdcd", uat: "#ced6ee", test: "#d6ceee", dev: "#d6eece", sb: "#ddd" },
	{ name: "css.$nav-highlight-main", type: "color", description: "Navigation highlight background color", sys_package: "com.glide.ui.ui16",
		ootb: "#3D4853", prod: "#493131", uat: "#2e3d4d", test: "#373149", dev: "#374931", sb: "#3D4853" },
	{ name: "css.$accent-color-dark", type: "color", description: "Color used for edge bookmarks and navigator favorites",
		ootb: "#3e95f4", prod: "#3e95f4", uat: "#3e95f4", test: "#3e95f4", dev: "#3e95f4", sb: "#3e95f4" },
	{ name: "glide.ui.module.highlight_color", type: "color", description: "Background color used to highlight selected when typing in the navigation filter",
		ootb: "#eeeeee", prod: "#eeeeee", uat: "#eeeeee", test: "#eeeeee", dev: "#eeeeee", sb: "#eeeeee" }
]
'@;

Add-Type -AssemblyName 'System.Web' -ErrorAction Stop;
Add-Type -AssemblyName 'System.Web.Abstractions' -ErrorAction Stop;
Add-Type -AssemblyName 'System.Web.Extensions' -ErrorAction Stop;

$JavaScriptSerializer = New-Object -TypeName 'System.Web.Script.Serialization.JavaScriptSerializer';

[System.Collections.ObjectModel.Collection[System.Collections.Generic.Dictionary`2[System.String,System.Object]]]$SettingsValues = $JavaScriptSerializer.DeserializeObject($JsonText);
$JsonPath = $PSScriptRoot | Join-Path -ChildPath 'sys_properties_config.json';
#[System.IO.File]::ReadAllText($Path);
[Xml]$HtmlDocument = @'
<html lang="en">
<head>
    <meta name="viewport" content="width=1024, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <meta charset="utf-8" />
    <title>Color Settings</title>
</head>
</html>
'@;
$CaptionMappings = @{
    ootb = 'Out-of-the-box';
    prod = 'Production';
    uat = 'UAT';
    test = 'Test';
    dev = 'Development';
    sb = 'Sandbox';
}
$BodyElement = $HtmlDocument.DocumentElement.AppendChild($HtmlDocument.CreateElement('body'));
foreach ($stage in @('ootb', 'prod', 'uat', 'test', 'dev', 'sb')) {
    $TableElement = $BodyElement.AppendChild($HtmlDocument.CreateElement('table'));
    $TableElement.AppendChild($HtmlDocument.CreateElement('caption')).InnerText = $CaptionMappings[$stage];
    $TableElement.Attributes.Append($HtmlDocument.CreateAttribute('style')).Value = 'border-collapse:collapse;border:1px solid black';
    $TrElement = $TableElement.AppendChild($HtmlDocument.CreateElement('thead')).AppendChild($HtmlDocument.CreateElement('tr'));
    $ThElement = $TrElement.AppendChild($HtmlDocument.CreateElement('th'));
    $ThElement.Attributes.Append($HtmlDocument.CreateAttribute('scope')).Value = 'Col';
    $ThElement.InnerText = 'Name';
    $ThElement = $TrElement.AppendChild($HtmlDocument.CreateElement('th'));
    $ThElement.Attributes.Append($HtmlDocument.CreateAttribute('scope')).Value = 'Col';
    $ThElement.InnerText = 'R';
    $ThElement = $TrElement.AppendChild($HtmlDocument.CreateElement('th'));
    $ThElement.Attributes.Append($HtmlDocument.CreateAttribute('scope')).Value = 'Col';
    $ThElement.InnerText = 'G';
    $ThElement = $TrElement.AppendChild($HtmlDocument.CreateElement('th'));
    $ThElement.Attributes.Append($HtmlDocument.CreateAttribute('scope')).Value = 'Col';
    $ThElement.InnerText = 'B';
    $ThElement = $TrElement.AppendChild($HtmlDocument.CreateElement('th'));
    $ThElement.Attributes.Append($HtmlDocument.CreateAttribute('scope')).Value = 'Col';
    $ThElement.InnerText = 'H';
    $ThElement = $TrElement.AppendChild($HtmlDocument.CreateElement('th'));
    $ThElement.Attributes.Append($HtmlDocument.CreateAttribute('scope')).Value = 'Col';
    $ThElement.InnerText = 'S';
    $ThElement = $TrElement.AppendChild($HtmlDocument.CreateElement('th'));
    $ThElement.Attributes.Append($HtmlDocument.CreateAttribute('scope')).Value = 'Col';
    $ThElement.InnerText = 'B';
    $TBodyElement = $TableElement.AppendChild($HtmlDocument.CreateElement('tbody'));
    foreach ($Dictionary in $SettingsValues) {
        if ($Dictionary.ContainsKey($stage) -and $Dictionary['type'] -eq 'color') {
            $BgRed, $BgGreen, $BgBlue = $BgHue = $BgSaturation = $BgBrightness = $null;
            switch ($stage) {
                'prod' {
                    $cv = $Dictionary['ootb'].Substring(1);
                    if ($cv.Length -eq 3) { $cv = "$($cv[0])$($cv[0])$($cv[1])$($cv[1])$($cv[2])$($cv[2])" }
                    $BgRed = [int]::Parse($cv.Substring(0, 2), [System.Globalization.NumberStyles]::HexNumber);
                    $BgGreen = [int]::Parse($cv.Substring(2, 2), [System.Globalization.NumberStyles]::HexNumber);
                    $BgBlue = [int]::Parse($cv.Substring(4, 2), [System.Globalization.NumberStyles]::HexNumber);
                    ($BgHue, $BgSaturation, $BgBrightness) = Convert-RgbToHsb -R (([double]$BgRed) / 255.0) -G (([double]$BgGreen) / 255.0) -B (([double]$BgBlue) / 255.0);
                    $BgHue -= 210.0;
                    if ($BgHue -lt 0.0) { $BgHue += 360.0 }
                    if ($BgSaturation -ne 0.0) {
                        $BgSaturation += ((1.0 - $BgSaturation) * 0.65);
                    }
                    if ($Dictionary['name'] -eq 'css.$navpage-nav-color-sub') {
                        $BgBrightness += ((1.0 - $BgBrightness) * 0.25);
                    }
                    ($BgRed, $BgGreen, $BgBlue) = Convert-HsbToRgb -Hue $BgHue -Saturation $BgSaturation -Brightness $BgBrightness;
                    $Dictionary[$stage] = "#$($BgRed.ToString('x2'))$($BgGreen.ToString('x2'))$($BgBlue.ToString('x2'))";
                    break;
                }
                'uat' {
                    $cv = $Dictionary['ootb'].Substring(1);
                    if ($cv.Length -eq 3) { $cv = "$($cv[0])$($cv[0])$($cv[1])$($cv[1])$($cv[2])$($cv[2])" }
                    $BgRed = [int]::Parse($cv.Substring(0, 2), [System.Globalization.NumberStyles]::HexNumber);
                    $BgGreen = [int]::Parse($cv.Substring(2, 2), [System.Globalization.NumberStyles]::HexNumber);
                    $BgBlue = [int]::Parse($cv.Substring(4, 2), [System.Globalization.NumberStyles]::HexNumber);
                    ($BgHue, $BgSaturation, $BgBrightness) = Convert-RgbToHsb -R (([double]$BgRed) / 255.0) -G (([double]$BgGreen) / 255.0) -B (([double]$BgBlue) / 255.0);
                    $BgHue += 20.0;
                    if ($BgHue -gt 360.0) { $BgHue -= 360.0 }
                    if ($BgSaturation -ne 0.0) {
                        $BgSaturation += ((1.0 - $BgSaturation) * 0.65);
                    }
                    if ($Dictionary['name'] -eq 'css.$navpage-nav-color-sub') {
                        $BgBrightness += ((1.0 - $BgBrightness) * 0.25);
                    }
                    ($BgRed, $BgGreen, $BgBlue) = Convert-HsbToRgb -Hue $BgHue -Saturation $BgSaturation -Brightness $BgBrightness;
                    $Dictionary[$stage] = "#$($BgRed.ToString('x2'))$($BgGreen.ToString('x2'))$($BgBlue.ToString('x2'))";
                    break;
                }
                'dev' {
                    $cv = $Dictionary['ootb'].Substring(1);
                    if ($cv.Length -eq 3) { $cv = "$($cv[0])$($cv[0])$($cv[1])$($cv[1])$($cv[2])$($cv[2])" }
                    $BgRed = [int]::Parse($cv.Substring(0, 2), [System.Globalization.NumberStyles]::HexNumber);
                    $BgGreen = [int]::Parse($cv.Substring(2, 2), [System.Globalization.NumberStyles]::HexNumber);
                    $BgBlue = [int]::Parse($cv.Substring(4, 2), [System.Globalization.NumberStyles]::HexNumber);
                    ($BgHue, $BgSaturation, $BgBrightness) = Convert-RgbToHsb -R (([double]$BgRed) / 255.0) -G (([double]$BgGreen) / 255.0) -B (([double]$BgBlue) / 255.0);
                    $BgHue -= 120.0;
                    if ($BgHue -lt 0.0) { $BgHue += 360.0 }
                    if ($BgSaturation -ne 0.0) {
                        $BgSaturation += ((1.0 - $BgSaturation) * 0.65);
                    }
                    if ($Dictionary['name'] -eq 'css.$navpage-nav-color-sub') {
                        $BgBrightness += ((1.0 - $BgBrightness) * 0.25);
                    }
                    ($BgRed, $BgGreen, $BgBlue) = Convert-HsbToRgb -Hue $BgHue -Saturation $BgSaturation -Brightness $BgBrightness;
                    $Dictionary[$stage] = "#$($BgRed.ToString('x2'))$($BgGreen.ToString('x2'))$($BgBlue.ToString('x2'))";
                    break;
                }
                'test' {
                    $cv = $Dictionary['ootb'].Substring(1);
                    if ($cv.Length -eq 3) { $cv = "$($cv[0])$($cv[0])$($cv[1])$($cv[1])$($cv[2])$($cv[2])" }
                    $BgRed = [int]::Parse($cv.Substring(0, 2), [System.Globalization.NumberStyles]::HexNumber);
                    $BgGreen = [int]::Parse($cv.Substring(2, 2), [System.Globalization.NumberStyles]::HexNumber);
                    $BgBlue = [int]::Parse($cv.Substring(4, 2), [System.Globalization.NumberStyles]::HexNumber);
                    ($BgHue, $BgSaturation, $BgBrightness) = Convert-RgbToHsb -R (([double]$BgRed) / 255.0) -G (([double]$BgGreen) / 255.0) -B (([double]$BgBlue) / 255.0);
                    $BgHue -= 20.0;
                    if ($BgHue -lt 0.0) { $BgHue += 360.0 }
                    if ($BgSaturation -ne 0.0) {
                        $BgSaturation += ((1.0 - $BgSaturation) * 0.65);
                    }
                    if ($Dictionary['name'] -eq 'css.$navpage-nav-color-sub') {
                        $BgBrightness += ((1.0 - $BgBrightness) * 0.25);
                    }
                    ($BgRed, $BgGreen, $BgBlue) = Convert-HsbToRgb -Hue $BgHue -Saturation $BgSaturation -Brightness $BgBrightness;
                    $Dictionary[$stage] = "#$($BgRed.ToString('x2'))$($BgGreen.ToString('x2'))$($BgBlue.ToString('x2'))";
                    break;
                }
                default {
                    $cv = $Dictionary[$stage].Substring(1);
                    if ($cv.Length -eq 3) { $cv = "$($cv[0])$($cv[0])$($cv[1])$($cv[1])$($cv[2])$($cv[2])" }
                    $BgRed = [int]::Parse($cv.Substring(0, 2), [System.Globalization.NumberStyles]::HexNumber);
                    $BgGreen = [int]::Parse($cv.Substring(2, 2), [System.Globalization.NumberStyles]::HexNumber);
                    $BgBlue = [int]::Parse($cv.Substring(4, 2), [System.Globalization.NumberStyles]::HexNumber);
                    ($BgHue, $BgSaturation, $BgBrightness) = Convert-RgbToHsb -R (([double]$BgRed) / 255.0) -G (([double]$BgGreen) / 255.0) -B (([double]$BgBlue) / 255.0);
                    break;
                }
            }
            $FgRed = 255 - $BgRed;
            $FgGreen = 255 - $BgGreen;
            $FgBlue = 255 - $BgBlue;
            ($FgHue, $FgSaturation, $FgBrightness) = Convert-RgbToHsb -R (([double]$FgRed) / 255.0) -G (([double]$FgGreen) / 255.0) -B (([double]$FgBlue) / 255.0);
            if ($FgSaturation -lt 0.25) {
                if ($FgBrightness -gt 0.35 -and $FgBrightness -lt 0.65) {
                    if ($FgBrightness -lt 0.5) {
                        $FgBrightness = 1.0;
                    } else {
                        $FgBrightness = 0.0;
                    }
                }
                ($FgRed, $FgGreen, $FgBlue) = Convert-HsbToRgb -Hue $FgHue -Saturation $FgSaturation -Brightness $FgBrightness;
            }
            $TrElement = $TBodyElement.AppendChild($HtmlDocument.CreateElement('tr'));
            $ThElement = $TrElement.AppendChild($HtmlDocument.CreateElement('th'));
            $ThElement.Attributes.Append($HtmlDocument.CreateAttribute('scope')).Value = 'Row';
            $CssText = "border:1px solid black;color:#$($FgRed.ToString('x2'))$($FgGreen.ToString('x2'))$($FgBlue.ToString('x2'));background-color:#$($BgRed.ToString('x2'))$($BgGreen.ToString('x2'))$($BgBlue.ToString('x2'));";
            $ThElement.Attributes.Append($HtmlDocument.CreateAttribute('style')).Value = $CssText;
            $ThElement.InnerText = $Dictionary['name'];
        
            $TdElement = $TrElement.AppendChild($HtmlDocument.CreateElement('td'));
            $TdElement.Attributes.Append($HtmlDocument.CreateAttribute('style')).Value = $CssText;
            $TdElement.InnerText = $BgRed.ToString();
        
            $TdElement = $TrElement.AppendChild($HtmlDocument.CreateElement('td'));
            $TdElement.Attributes.Append($HtmlDocument.CreateAttribute('style')).Value = $CssText;
            $TdElement.InnerText = $BgGreen.ToString();
        
            $TdElement = $TrElement.AppendChild($HtmlDocument.CreateElement('td'));
            $TdElement.Attributes.Append($HtmlDocument.CreateAttribute('style')).Value = $CssText;
            $TdElement.InnerText = $BgBlue.ToString();
        
            $TdElement = $TrElement.AppendChild($HtmlDocument.CreateElement('td'));
            $TdElement.Attributes.Append($HtmlDocument.CreateAttribute('style')).Value = $CssText;
            $TdElement.InnerText = $BgHue.ToString();
        
            $TdElement = $TrElement.AppendChild($HtmlDocument.CreateElement('td'));
            $TdElement.Attributes.Append($HtmlDocument.CreateAttribute('style')).Value = $CssText;
            $TdElement.InnerText = $BgSaturation.ToString();
        
            $TdElement = $TrElement.AppendChild($HtmlDocument.CreateElement('td'));
            $TdElement.Attributes.Append($HtmlDocument.CreateAttribute('style')).Value = $CssText;
            $TdElement.InnerText = $BgBrightness.ToString();
        }
    }
}
$StringBuilder = New-Object -TypeName 'System.Text.StringBuilder';
$StringBuilder.AppendLine("[") | Out-Null;

$OrderedKeys1 = @('type', 'description', 'sys_package');
$OrderedKeys2 = @('ootb', 'prod', 'uat', 'test', 'dev', 'sb');
for ($SettingIndex = 0; $SettingIndex -lt $SettingsValues.Count; $SettingIndex++) {
    if ($SettingIndex -gt 0) { $StringBuilder.AppendLine(",") | Out-Null }
    $StringBuilder.Append("`t{ name: ") | Out-Null;
    $JavaScriptSerializer.Serialize($SettingsValues[$SettingIndex]['name'], $StringBuilder);
    $OrderedKeys1 | ForEach-Object {
        if ($SettingsValues[$SettingIndex].ContainsKey($_) -and -not [string]::IsNullOrWhiteSpace($SettingsValues[$SettingIndex][$_])) {
            $StringBuilder.Append(', ').Append($_).Append(': ') | Out-Null;
            $JavaScriptSerializer.Serialize($SettingsValues[$SettingIndex][$_], $StringBuilder);
        }
    }
    $ac = $false;
    $OrderedKeys2 | ForEach-Object {
        if ($SettingsValues[$SettingIndex].ContainsKey($_) -and -not [string]::IsNullOrWhiteSpace($SettingsValues[$SettingIndex][$_])) {
            if ($ac) {
                $StringBuilder.Append(', ').Append($_).Append(': ') | Out-Null;
            } else {
                $ac = $true;
                $StringBuilder.AppendLine(',').Append("`t`t").Append($_).Append(': ') | Out-Null;
            }
            $JavaScriptSerializer.Serialize($SettingsValues[$SettingIndex][$_], $StringBuilder);
        }
    }
    $StringBuilder.Append(' }') | Out-Null;
}
[System.IO.File]::WriteAllText($JsonPath, $StringBuilder.AppendLine().Append(']').ToString(), (New-Object -TypeName 'System.Text.UTF8Encoding' -ArgumentList $false, $false));
"JSON saved to $JsonPath" | Write-Host;
$HtmlPath = $PSScriptRoot | Join-Path -ChildPath 'sys_properties_config.html';
$XmlWriterSettings = New-Object -TypeName 'System.Xml.XmlWriterSettings';
$XmlWriterSettings.Indent = $true;
$XmlWriterSettings.CheckCharacters = $false;
$XmlWriterSettings.Encoding = New-Object -TypeName 'System.Text.UTF8Encoding' -ArgumentList $false, $false;
$XmlWriter = [System.Xml.XmlWriter]::Create($HtmlPath, $XmlWriterSettings);
try {
    $HtmlDocument.WriteTo($XmlWriter);
    $XmlWriter.Flush();
} finally { $XmlWriter.Close() }
"HTML saved to $HtmlPath" | Write-Host;
<#
{ name: "css.$nav-highlight-main", type: "color", description: "Navigation highlight background color", sys_package: "com.glide.ui.ui16",
        prod: "#493131", uat: "#2e3d4d", sb: "#3D4853", dev: "#374931", test: "#373149" }
#>