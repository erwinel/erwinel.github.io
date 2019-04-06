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

Function Merge-Color {
    [CmdletBinding(DefaultParameterSetName = 'Alpha')]
    Param(
      [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
      [System.Drawing.Color[]]$InputColor
    )
    
    Begin { [float[]]$Hue = @(); $Saturation = $Brightness = $Alpha = 0.0; $Count = 0 }
    
    Process {
        $Count += $InputColor.Length;
        $InputColor | ForEach-Object {
            $Hue += @($_.GetHue());
            $Saturation += [double]($_.GetSaturation());
            $Brightness += [double]($_.GetBrightness());
            $Alpha += [double]($_.A) / 255.0;
        }
    }

    End {
        if ($Hue.Count -eq 1) {
            New-Color -Hue $Hue[0] -Saturation $Saturation -Brightness $Brightness -Alpha $Alpha;
        } else {
            $h = $RightHue = $LeftHue = [double]($Hue[0]);
            ($Hue | Select-Object -Skip 1) | ForEach-Object {
                [double]$d = $_;
                if ($h -lt 
                $diff = [Math]::Abs($RightHue - $d);
                if ($diff -gt 180.0) {
                    $diff = 360.0 - $diff;

                } else {
                }

                @(
                    @{ X = 0; Y = 90; Z = 45; E1 = 45; E2 = 45 },
                    @{ X = 90; Y = 0; Z = 45; E1 = 45; E2 = 45 },
                    @{ X = 45; Y = 135; Z = 90; E1 = 90; E2 = 90 },
                    @{ X = 135; Y = 45; Z = 90; E1 = 90; E2 = 90 },
                    @{ X = 90; Y = 180; Z = 135; E1 = 315; E2 = 135 },
                    @{ X = 180; Y = 90; Z = 135; E1 = 315; E2 = 135 },
                    @{ X = 135; Y = 225; Z = 180; E1 = 0; E2 = 180 },
                    @{ X = 225; Y = 135; Z = 180; E1 = 0; E2 = 180 },
                    @{ X = 180; Y = 270; Z = 225; E1 = 225; E2 = 225 },
                    @{ X = 270; Y = 180; Z = 225; E1 = 225; E2 = 225 },
                    @{ X = 225; Y = 315; Z = 270; E1 = 270; E2 = 270 },
                    @{ X = 315; Y = 225; Z = 270; E1 = 270; E2 = 270 },
                    @{ X = 0; Y = 90; Z = 180; E1 = 45; E2 = -30 },
                    @{ X = 90; Y = 0; Z = 180; E1 = 45; E2 = -30 },
                    @{ X = 0; Y = 180; Z = 90; E1 = 180; E2 = -30 },
                    @{ X = 180; Y = 0; Z = 90; E1 = 180; E2 = -30 },
                    @{ X = 90; Y = 180; Z = 0; E1 = 315; E2 = -30 },
                    @{ X = 180; Y = 90; Z = 0; E1 = 315; E2 = -30 },
                    @{ X = 45; Y = 135; Z = 225; E1 = 90; E2 = 15 },
                    @{ X = 135; Y = 45; Z = 225; E1 = 90; E2 = 15 },
                    @{ X = 45; Y = 225; Z = 135; E1 = 225; E2 = 15 },
                    @{ X = 225; Y = 45; Z = 135; E1 = 225; E2 = 15 },
                    @{ X = 135; Y = 225; Z = 45; E1 = 0; E2 = 15 },
                    @{ X = 225; Y = 135; Z = 45; E1 = 0; E2 = 15 },
                    @{ X = 90; Y = 180; Z = 270; E1 = 315; E2 = 300 },
                    @{ X = 180; Y = 90; Z = 270; E1 = 315; E2 = 300 },
                    @{ X = 90; Y = 270; Z = 180; E1 = 270; E2 = 300 },
                    @{ X = 270; Y = 90; Z = 180; E1 = 270; E2 = 300 },
                    @{ X = 180; Y = 270; Z = 90; E1 = 225; E2 = 300 },
                    @{ X = 270; Y = 180; Z = 90; E1 = 225; E2 = 300 },
                    @{ X = 135; Y = 225; Z = 315; E1 = 0; E2 = 345 },
                    @{ X = 225; Y = 135; Z = 315; E1 = 0; E2 = 345 },
                    @{ X = 135; Y = 315; Z = 225; E1 = 315; E2 = 345 },
                    @{ X = 315; Y = 135; Z = 225; E1 = 315; E2 = 345 },
                    @{ X = 225; Y = 315; Z = 135; E1 = 270; E2 = 345 },
                    @{ X = 315; Y = 225; Z = 135; E1 = 270; E2 = 345 },
                    @{ X = 0; Y = 50; Z = 40; E1 = 25; E2 = 30 },
                    @{ X = 0; Y = 40; Z = 50; E1 = 20; E2 = 30 },
                    @{ X = 40; Y = 50; Z = 0; E1 = 45; E2 = 30 },
                    @{ X = 50; Y = 40; Z = 0; E1 = 45; E2 = 30 },
                    @{ X = 0; Y = 120; Z = 270; E1 = 60; E2 = 10 },
                    @{ X = 0; Y = 270; Z = 120; E1 = 315; E2 = 10 },
                    @{ X = 270; Y = 120; Z = 0; E1 = 15; E2 = 10 },
                    @{ X = 120; Y = 270; Z = 0; E1 = 15; E2 = 10 },
                    @{ X = 0; Y = 50; Z = 40; E1 = 25; E2 = 30 },
                    @{ X = 0; Y = 40; Z = 50; E1 = 20; E2 = 30 },
                    @{ X = 40; Y = 50; Z = 0; E1 = 45; E2 = 30 },
                    @{ X = 50; Y = 40; Z = 0; E1 = 45; E2 = 30 },
                    @{ X = 0; Y = 120; Z = 270; E1 = 60; E2 = 10 },
                    @{ X = 0; Y = 270; Z = 120; E1 = 315; E2 = 10 },
                    @{ X = 270; Y = 120; Z = 0; E1 = 15; E2 = 10 },
                    @{ X = 120; Y = 270; Z = 0; E1 = 15; E2 = 10 },
                    @{ X = 45; Y = 95; Z = 85; E1 = 70; E2 = 75 },
                    @{ X = 315; Y = 5; Z = 355; E1 = 340; E2 = 345 },
                    @{ X = 180; Y = 5; Z = -5; E1 = 272.5; E2 = -60 },
                    @{ X = 45; Y = 85; Z = 95; E1 = 65; E2 = 75 },
                    @{ X = 315; Y = 355; Z = 5; E1 = 335; E2 = 345 },
                    @{ X = 180; Y = -5; Z = 5; E1 = 267.5; E2 = -60 },
                    @{ X = 85; Y = 95; Z = 45; E1 = 90; E2 = 75 },
                    @{ X = 355; Y = 5; Z = 315; E1 = 0; E2 = 345 },
                    @{ X = 220; Y = 5; Z = -45; E1 = 292.5; E2 = -60 },
                    @{ X = 95; Y = 85; Z = 45; E1 = 90; E2 = 75 },
                    @{ X = 5; Y = 355; Z = 315; E1 = 0; E2 = 345 },
                    @{ X = 230; Y = -5; Z = -45; E1 = 292.5; E2 = -60 },
                    @{ X = 45; Y = 165; Z = 315; E1 = 105; E2 = 55 },
                    @{ X = 315; Y = 75; Z = 225; E1 = 15; E2 = 325 },
                    @{ X = 180; Y = 75; Z = 225; E1 = 307.5; E2 = 160 },
                    @{ X = 45; Y = 315; Z = 165; E1 = 0; E2 = 55 },
                    @{ X = 315; Y = 225; Z = 75; E1 = 270; E2 = 325 },
                    @{ X = 180; Y = 225; Z = 75; E1 = 202.5; E2 = 160 },
                    @{ X = 315; Y = 165; Z = 45; E1 = 60; E2 = 55 },
                    @{ X = 225; Y = 75; Z = 315; E1 = 330; E2 = 325 },
                    @{ X = 90; Y = 75; Z = -45; E1 = 82.5; E2 = 40 },
                    @{ X = 165; Y = 315; Z = 45; E1 = 60; E2 = 55 },
                    @{ X = 75; Y = 225; Z = 315; E1 = 330; E2 = 325 },
                    @{ X = 300; Y = 225; Z = -45; E1 = 262.5; E2 = 280 },
                    @{ X = 0; Y = 50; Z = 40; E1 = 25; E2 = 30 },
                    @{ X = 45; Y = 95; Z = 85; E1 = 70; E2 = 75 },
                    @{ X = 315; Y = 5; Z = 355; E1 = 340; E2 = 345 },
                    @{ X = 180; Y = 230; Z = 220; E1 = 205; E2 = 210 },
                    @{ X = 0; Y = 40; Z = 50; E1 = 20; E2 = 30 },
                    @{ X = 45; Y = 85; Z = 95; E1 = 65; E2 = 75 },
                    @{ X = 315; Y = 355; Z = 5; E1 = 335; E2 = 345 },
                    @{ X = 180; Y = 220; Z = 230; E1 = 200; E2 = 210 },
                    @{ X = 50; Y = 0; Z = 40; E1 = 25; E2 = 30 },
                    @{ X = 95; Y = 45; Z = 85; E1 = 70; E2 = 75 },
                    @{ X = 5; Y = 315; Z = 355; E1 = 340; E2 = 345 },
                    @{ X = 230; Y = 180; Z = 220; E1 = 205; E2 = 210 },
                    @{ X = 40; Y = 50; Z = 0; E1 = 45; E2 = 30 },
                    @{ X = 85; Y = 95; Z = 45; E1 = 90; E2 = 75 },
                    @{ X = 355; Y = 5; Z = 315; E1 = 0; E2 = 345 },
                    @{ X = 220; Y = 230; Z = 180; E1 = 225; E2 = 210 },
                    @{ X = 0; Y = 120; Z = 270; E1 = 60; E2 = 10 },
                    @{ X = 45; Y = 165; Z = 315; E1 = 105; E2 = 55 },
                    @{ X = 315; Y = 75; Z = 225; E1 = 15; E2 = 325 },
                    @{ X = 180; Y = 300; Z = 90; E1 = 240; E2 = 310 },
                    @{ X = 0; Y = 270; Z = 120; E1 = 315; E2 = 10 },
                    @{ X = 45; Y = 315; Z = 165; E1 = 0; E2 = 55 },
                    @{ X = 315; Y = 225; Z = 75; E1 = 270; E2 = 325 },
                    @{ X = 180; Y = 90; Z = 300; E1 = 315; E2 = 310 },
                    @{ X = 120; Y = 0; Z = 270; E1 = 60; E2 = 10 },
                    @{ X = 165; Y = 45; Z = 315; E1 = 105; E2 = 55 },
                    @{ X = 75; Y = 315; Z = 225; E1 = 15; E2 = 325 },
                    @{ X = 300; Y = 180; Z = 90; E1 = 240; E2 = 310 },
                    @{ X = 270; Y = 120; Z = 0; E1 = 15; E2 = 10 },
                    @{ X = 315; Y = 165; Z = 45; E1 = 60; E2 = 55 },
                    @{ X = 225; Y = 75; Z = 315; E1 = 330; E2 = 325 },
                    @{ X = 90; Y = 300; Z = 180; E1 = 15; E2 = 310 }
                ) | ForEach-Object {
                    [float]$x = $_.X;
                    [float]$y = $_.Y;
                    [float]$z = $_.Z;
                    $x = 0.0; $y = 315.0; $z = 045.0;
                    ($v1, $v2, $v3) = @($x, $y, $z) | Sort-Object;
                    $e2 = 0;
                    if (($v3 - $v1) -lt 180 -or ($v2 - $v1) -le ($v3 - $v2)) {
                        ($v1 + $v2 + $v3) / 3.0;
                    } else {
                        ($v1 + $v2 + $v3 + 360.0) / 3.0
                    }

                    $e1 = ($x + $y) / 2.0;
                    $x = 315; $y = 45
                    if ($x -gt 180.0) {
                        if ($y -lt 180.0) {
                            $e1 = ($x + $y) / 2.0;
                        }
                    } else {
                        if ($y -gt 180) {
                            $e1 = ((360.0 - $y) + $x) / 2.0;
                        } else {
                            $e1 = ($x + $y) / 2.0;
                        }
                    }
                    $diff = [Math]::Abs($x - $y);
                    if ($diff -gt 180.0) { $diff = 360 - 180 }
                    if ($x -lt $y) {
                        if (($e1 - $x) -ne $diff) {
                            "Expected Diff ($x, $y): $($e1 - $x); Actual: $diff";
                        }
                    } else {
                        if (($e1 - $y) -ne $diff) {
                            "Expected Diff ($x, $y): $($e1 - $y); Actual: $diff";
                        }
                    }
                }
                (360-315)+5
                <#
                          0
                      315   045
                    270       090
                      225   135
                         180
                #>
                <#
                Expected AVG(180, 0): 270; Actual 90
                Expected AVG(225, 45): 315; Actual 135
                Expected AVG(270, 90): 0; Actual 180
                Expected AVG(315, 135): 45; Actual 225
                Expected AVG(270, 0): 315; Actual 135
                Expected AVG(315, 45): 0; Actual 180

                    @{ X = 0; Y = 90; Z = 180; E1 = 45; E2 = 90 },
                    @{ X = 45; Y = 135; Z = 225; E1 = 90; E2 = 135 },
                    @{ X = 315; Y = 45; Z = 135; E1 = 0; E2 = 45 },
                    @{ X = 0; Y = 180; Z = ; E1 = 270 },
                    @{ X = 45; Y = 225; E1 = 315 },
                    @{ X = 90; Y = 270; E1 = 0 },
                    @{ X = 0; Y = 40; E1 = 20 },
                    0, 45, 90, 135, 180, 225, 270, 315, 0, 45, 90, 135, 180, 225, 270, 315, 0, 45, 90, 135, 180, 225, 270, 315, 0


                    X = 0; Y = 180; Z = 90; AVG(0, 180) = 90; AVG(0, 180, 90) = 90
                    X = 45; Y = 225; Z = 135; AVG(45, 225) = 135; AVG(45, 225, 135) = 135
                    X = 90; Y = 270; Z = 180; AVG(90, 270) = 180; AVG(90, 270, 180) = 180
                    X = 135; Y = 315; Z = 225; AVG(135, 315) = 225; AVG(135, 315, 225) = 225
                    X = 180; Y = 0; Z = 270; AVG(180, 0) = 270; AVG(180, 0, 270) = 270
                    X = 225; Y = 45; Z = 315; AVG(225, 45) = 315; AVG(225, 45, 315) = 315
                    X = 270; Y = 90; Z = 0; AVG(270, 90) = 0; AVG(270, 90, 0) = 0
                    X = 315; Y = 135; Z = 45; AVG(315, 135) = 45; AVG(315, 135, 45) = 45
                    X = 0; Y = 90; Z = 45; AVG(0, 90) = 45; AVG(0, 90, 45) = 45
                    X = 45; Y = 135; Z = 90; AVG(45, 135) = 90; AVG(45, 135, 90) = 90
                    X = 90; Y = 180; Z = 135; AVG(90, 180) = 135; AVG(90, 180, 135) = 135
                    X = 135; Y = 225; Z = 180; AVG(135, 225) = 180; AVG(135, 225, 180) = 180
                    X = 180; Y = 270; Z = 225; AVG(180, 270) = 225; AVG(180, 270, 225) = 225
                    X = 225; Y = 315; Z = 270; AVG(225, 315) = 270; AVG(225, 315, 270) = 270
                    X = 270; Y = 0; Z = 315; AVG(270, 0) = 315; AVG(270, 0, 315) = 315
                    X = 315; Y = 45; Z = 0; AVG(315, 45) = 0; AVG(315, 45, 0) = 0
                    X = 0; Y = 40; Z = 50; AVG(0, 40) = 20; AVG(0, 40, 50) = 30
                    X = 45; Y = 85; Z = 95; AVG(45, 85) = 65; AVG(45, 85, 95) = 75
                    X = 90; Y = 130; Z = 140; AVG(90, 130) = 110; AVG(90, 130, 140) = 120
                    X = 135; Y = 175; Z = 185; AVG(135, 175) = 155; AVG(135, 175, 185) = 165
                    X = 180; Y = 220; Z = 230; AVG(180, 220) = 200; AVG(180, 220, 230) = 210
                    X = 225; Y = 265; Z = 275; AVG(225, 265) = 245; AVG(225, 265, 275) = 255
                    X = 270; Y = 310; Z = 320; AVG(270, 310) = 290; AVG(270, 310, 320) = 300
                    X = 315; Y = 355; Z = 5; AVG(315, 355) = 335; AVG(315, 355, 5) = 345

                #>
                if ($d -lt $MinHue) {
                    $diffMin = $MaxHue - $d;
                } else {
                    $diffMin = $d - $MaxHue;
                }
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

@(&{
    $t = @([System.Collections.Generic.IEnumerator[System.Collections.Generic.KeyValuePair`2]], [System.Collections.IDictionaryEnumerator], [System.Collections.Generic.IEnumerator`1]);
    $t += @($t | ForEach-Object { $_.GetInterfaces() } | Select-Object -Unique);
    ($t | ForEach-Object { $_.GetProperties() } | Sort-Object -Property 'Name') | ForEach-Object {
        if ($_.CanRead) {
            if ($_.CanWrite) {
                "$($_.PropertyType) $($_.DeclaringType).$($_.Name) {"
                if ($_.CanRead) { "    get { throw new NotImplementedException(); }" }
                if ($_.CanWrite) { "    set { throw new NotImplementedException(); }" }
                "}";
            } else {
                "$($_.PropertyType) $($_.DeclaringType).$($_.Name) { get { throw new NotImplementedException(); } }";
            }
        } else {
            "$($_.PropertyType) $($_.DeclaringType).$($_.Name) { set { throw new NotImplementedException(); } }";
        }
    }
    ($t | ForEach-Object { $_.GetMethods() } | Sort-Object -Property 'Name') | ForEach-Object {
        if (-not $_.IsSpecialName) {
            if (([System.Reflection.MethodInfo]$_).IsGenericMethod) {
                "$($_.ReturnType) $($_.DeclaringType).$($_.Name)<$((([System.Reflection.MethodInfo]$_).GetGenericArguments() | ForEach-Object { $_.ToString() }) -join ',')>($(($_.GetParameters() | ForEach-Object { $_.ToString() }) -join ', ')) { throw new NotImplementedException(); }";
            } else {
                "$($_.ReturnType) $($_.DeclaringType).$($_.Name)($(($_.GetParameters() | ForEach-Object { $_.ToString() }) -join ', ')) { throw new NotImplementedException(); }";
            }
        }
    }
}) | ForEach-Object { $_.Replace('[TKey,TValue]', '<TKey,TValue>').Replace('[TKey]', '<TValue>').Replace('[TValue]', '<TValue>').Replace('[System.Object]', '<object>').Replace('System.Collections.Generic.', '').Replace('System.Collections.', '').Replace('System.Object', 'object').Replace('System.Int32', 'int').Replace('System.Boolean', 'bool').Replace('System.', '').Replace('[KeyValuePair<TKey,TValue>]', '<KeyValuePair<TKey,TValue>>').Replace('`1', '').Replace('`2', '') }
# | ForEach-Object { $_.Replace('[T]', '<T>').Replace('[System.Object]', '<object>').Replace('System.Collections.Generic.', '').Replace('System.Collections.', '').Replace('System.Object', 'object').Replace('System.Int32', 'int').Replace('System.Boolean', 'bool').Replace('System.', '').Replace('`1', '') }
# | ForEach-Object { $_.Replace('[TKey,TValue]', '<TKey,TValue>').Replace('[TKey]', '<TValue>').Replace('[TValue]', '<TValue>').Replace('[System.Object]', '<object>').Replace('System.Collections.Generic.', '').Replace('System.Collections.', '').Replace('System.Object', 'object').Replace('System.Int32', 'int').Replace('System.Boolean', 'bool').Replace('System.', '').Replace('[KeyValuePair<TKey,TValue>]', '<KeyValuePair<TKey,TValue>>').Replace('`1', '').Replace('`2', '') }

[System.Threading.Monitor]
Add-Type -AssemblyName 'System.Web' -ErrorAction Stop;
Add-Type -AssemblyName 'System.Web.Abstractions' -ErrorAction Stop;
Add-Type -AssemblyName 'System.Web.Extensions' -ErrorAction Stop;

$InputText = Read-Host -Prompt 'Enter ServiceNow URL (blank to skip out-of-the-box value validation)';
$XmlDocument = $null;
if (-not [string]::IsNullOrWhiteSpace($InputText)) {
    $Uri = $null;
    if (-not [Uri]::TryCreate($InputText.Trim(), [UriKind]::Absolute, [ref]$Uri)) {
        Write-Warning -Message 'Aborting: Invalid URI';
        return;
    }
    $UriBuilder = New-Object -TypeName 'System.UriBuilder' -ArgumentList $Uri;
    $UriBuilder.Path = '/sys_properties_list.do';
    $UriBuilder.Query = 'sysparm_query=type%3Dcolor%5EORnameLIKEcolor%5EORnameSTARTSWITHglide.product.&XML';
    $UriBuilder.Fragment = '';
    (
        'Using a web browser, download the XML from the following URL:',
        "`t$($UriBuilder.Uri.AbsoluteUri)"
    ) | Write-Host;
    $InputText = Read-Host -Prompt 'Path to downloaded XML';
    if ([string]::IsNullOrWhiteSpace($InputText)) {
        Write-Warning -Message 'Aborting: Path not provided.';
        return;
    }
    if (-not ($InputText | Test-Path -PathType Leaf)) {
        Write-Warning -Message 'Aborting: File not found.';
        return;
    }
    $XmlDocument = New-Object -TypeName 'System.Xml.XmlDocument';
    $XmlDocument.Load($InputText);
    if ($null -eq $XmlDocument.DocumentElement) {
        Write-Warning -Message 'Aborting: Failed to load XML data.';
        return;
    }
}

$JavaScriptSerializer = New-Object -TypeName 'System.Web.Script.Serialization.JavaScriptSerializer';

[System.Collections.ObjectModel.Collection[System.Collections.Generic.Dictionary`2[System.String,System.Object]]]$SettingsValues = $JavaScriptSerializer.DeserializeObject($JsonText);
$Path = $PSScriptRoot | Join-Path -ChildPath 'sys_properties_config.json';

if ($null -ne $XmlDocument) {
    for ($SettingIndex = 0; $SettingIndex -lt $SettingsValues.Count; $SettingIndex++) {
        $SettingsValues[$SettingIndex]['name'];
        $XmlValue = $null;
        $XmlElement = $XmlDocument.SelectSingleNode("/xml/sys_properties[./name=`"$($SettingsValues[$SettingIndex]['name'])`"]");
        if ($null -eq $XmlElement) {
            Write-Warning -Message "Setting named `"$($SettingsValues[$SettingIndex]['name'])`" does not have a corresponding sys_properties element in source data.";
        } else {
            $ValueElement = $XmlElement.SelectSingleNode('value');
            if ($null -eq $ValueElement -or $ValueElement.IsEmpty) {
                Write-Warning -Message "Setting named `"$($SettingsValues[$SettingIndex]['name'])`" has no value in source data.";
            } else {
                $XmlValue = $ValueElement.InnerText;
            }
        }

        if ([string]::IsNullOrEmpty($XmlValue)) {
            if ($SettingsValues[$SettingIndex].ContainsKey('ootb')) { $SettingsValues[$SettingIndex].Remove('ootb') | Out-Null }
        } else {
            if ($SettingsValues[$SettingIndex].ContainsKey('ootb')) {
                $SettingsValues[$SettingIndex]['ootb'] = $XmlValue;
            } else {
                $SettingsValues[$SettingIndex].Add('ootb', $XmlValue);
            }
        }
        
        if ($null -ne $XmlElement) {
            $ValueElement = $XmlElement.SelectSingleNode('description');
            if ($null -ne $ValueElement -and -not ($ValueElement.IsEmpty -or [string]::IsNullOrWhiteSpace($ValueElement.InnerText))) {
                if ($SettingsValues[$SettingIndex].ContainsKey('description')) {
                    if ([string]::IsNullOrWhiteSpace($SettingsValues[$SettingIndex]['description'])) { $SettingsValues[$SettingIndex]['description'] = $ValueElement.InnerText.Trim() }
                } else {
                    $SettingsValues[$SettingIndex].Add('description', $ValueElement.InnerText.Trim());
                }
            }
        }
        
        if ($SettingsValues[$SettingIndex].ContainsKey('ootb')) {
            ('prod', 'uat', 'test', 'dev', 'sb') | ForEach-Object {
                if (-not $SettingsValues[$SettingIndex].ContainsKey($_)) { $SettingsValues[$SettingIndex].Add($_, $SettingsValues[$SettingIndex]['ootb']) }
            }
        }
    }
}

foreach ($Dictionary in $SettingsValues) {
    if ($Dictionary.ContainsKey('ootb') -and $Dictionary['type'] -eq 'color') {
        $cv = $Dictionary['ootb'].Substring(1);
        if ($cv.Length -eq 3) { $cv += $cv }
        $Red =  [int]::Parse($cv.Substring(0, 2), [System.Globalization.NumberStyles]::HexNumber);
        $Green =  [int]::Parse($cv.Substring(2, 2), [System.Globalization.NumberStyles]::HexNumber);
        $Blue =  [int]::Parse($cv.Substring(4, 2), [System.Globalization.NumberStyles]::HexNumber);
        ($Hue, $Saturation, $Brightness) = Convert-RgbToHsb -R (([double]$Red) / 255.0) -G (([double]$Green) / 255.0) -B (([double]$Blue) / 255.0);
        Write-Information -MessageData "($Red, $Green, $Blue) => ($Hue, $Saturation, $Brightness)" -InformationAction Continue;
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
[System.Windows.Forms.Clipboard]::SetText($StringBuilder.AppendLine().Append(']').ToString());
<#
{ name: "css.$nav-highlight-main", type: "color", description: "Navigation highlight background color", sys_package: "com.glide.ui.ui16",
        prod: "#493131", uat: "#2e3d4d", sb: "#3D4853", dev: "#374931", test: "#373149" }
#>