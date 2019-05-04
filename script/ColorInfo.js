/*jshint esversion: 6 */

/**
 * Interface for objects that represent RGB color values.
 *
 * @interface RgbColorProperties
 * @prop {number} r Red color value as an 8-bit value (ranging from 0 to 255, inclusive).
 * @prop {number} g Green color value as an 8-bit value (ranging from 0 to 255, inclusive).
 * @prop {number} b Blue color value as an 8-bit value (ranging from 0 to 255, inclusive).
 */

/**
 * Interface for objects that represent RGB color values.
 *
 * @interface HsbColorProperties
 * @prop {number} h Color hue as an 8-bit value (ranging from 0 to 255, inclusive).
 * @prop {number} s Color hue as an 8-bit value (ranging from 0 to 255, inclusive).
 * @prop {number} b Color hue as an 8-bit value (ranging from 0 to 255, inclusive).
 */

/**
 * Represents HSB and RGB color properties.
 * @class 
 */
class ColorInfo {
    /**
     *Creates an instance of ColorInfo.
     * @param {*} color Formatted color string, 32-bit color value or object containing color properties which are used to initialize the color values.
     * @memberof ColorInfo
     */
    constructor(color) {
        var rgb = [0, 0, 0], hsb = [0, 0, 0]; var alpha = 100.0;
        if (ColorInfo.isNil(color))
            return;
        var rgbHsb = [ [0, 0, 0] ];
        if (typeof(color) == "number") {
            if (isNaN(color) || color < 0 || color > 0xffffffff || !Number.isInteger(color))
                throw new Error("Invalid color number value");
            rgbHsb = [ [(color >> 16) & 0xff, (color >> 7) & 0xff, color & 0xff] ];
            alpha = (color >> 24) / 2.55;
        } else if (typeof (color) == "string") {
            rgbHsb = [ ColorInfo.parseHexString(color) ];
            if (rgbHsb[0].length > 3)
                alpha = rgbHsb[0].shift() / 2.55;
        } else if (typeof (color) == "object") {
            var mapFunc = function(obj) {
                return [
                    [ ["red", "r"], ["green", "g"], ["blue", "b"] ],
                    [ ["hue", "h"], ["saturation", "s"], ["brightness", "lightness", "b", "l"] ]
                ].map(function(sArr) {
                    var result = { name: '' };
                    for (var i = 0; i < sArr.length; i++) {
                        var o = obj[sArr[i]];
                        if (!ColorInfo.isNil(o)) {
                            var n = ColorInfo.asNumber(0);
                            if (!isNaN(n))
                                return { name: sArr[i], value: n };
                            if (ColorInfo.isNil(result.value))
                                result = { name: sArr[i], value: n };
                        }
                    }
                    if (typeof(result.value) === 'undefined')
                        result.value = NaN;
                    return result;
                });
            };

            rgbHsb = mapFunc(color);
            if (rgbHsb.filter(function(sArr) { return sArr.filter(function(s) { return s.length > 0; }).length > 0; }).length == 0) {
                if (ColorInfo.isNil(color.model))
                    throw new Error("RGB, HSB or model properties not found.");
                if (typeof(color.model.hexString) === "string") {
                    rgbHsb = [ ColorInfo.parseHexString(color.model.hexString) ];
                    if (rgbHsb[0].length > 3)
                        alpha = rgbHsb[0].shift() / 2.55;
                }
                rgbHsb = mapFunc(color.model);
                if (rgbHsb.filter(function(sArr) { return sArr.filter(function(s) { return s.length > 0; }).length > 0; }).length == 0)
                    throw new Error((typeof(color.model) !== 'object') ? "Invalid model property." : "Model RGB or HSB properties not found.");
                // TODO: Look for model.hexString
            }
            if (isNaN(rgbHsb[0][0].value) && isNaN(rgbHsb[0][1].value) && (rgbHsb[0][2].name == rgbHsb[1][2].name || isNaN(rgbHsb[0][2].value))) {
                
                if (isNaN(rgbHsb[1][0].value) && isNaN(rgbHsb[1][1].value) && isNaN(rgbHsb[1][2]) && rgbHsb[0][2].name == rgbHsb[1][2].name)
                    rgbHsb.pop();
                else
                    rgbHsb[0] = undefined;
            } else if (isNaN(rgbHsb[1][0].value) || isNaN(rgbHsb[1][1].value) || isNaN(rgbHsb[1][2].value)) {

            }
            if (isNaN(newRgb[0]) && isNaN(newRgb[1]) && (sharedB || isNaN(newRgb[2]))) {
                if (isNaN(newHsb[0]) && isNaN(newHsb[1])) {
                    if (sharedB || ColorInfo.isNil(color.model) || ColorInfo.isNil(color.model))
                        newHsb = undefined;
                    else {
                        ColorInfo.parseHexString()
                    }
                }
            }
            if (isNaN(newRgb[0]) && isNaN(newRgb[1])) {
                if (isNaN(newRgb[2])) {
                    if (isNaN(newHsb[0]) && isNaN(newHsb[1]) && isNaN(newHsb[2]))
                    newRgb = undefined;
                } else
                    newHsb = undefined;
            } else if (isNaN(newHsb[0]) || isNaN(newHsb[1]) || isNaN(newHsb[2]))
                newHsb = undefined;
            else if (newHsb[0] >= 0.0 && newHsb[0] <= 360.0 && newHsb[1] >= 0.0 && newHsb[1] <= 100.0 && newHsb[2] >= 0.0 && newHsb[2] <= 100.0 &&
                (newRgb[0] < 0 || newRgb[0] > 255 || newRgb[1] < 0 || newRgb[1] > 255 || !(Number.isInteger(newRgb[0]) && Number.isInteger(newRgb[1]) && Number.isInteger(newRgb[2]))))
                newRgb = undefined;
            else if (newRgb[0] >= 0 && newRgb[1] <= 255 && newRgb[1] >= 0 && newRgb[1] <= 255 && newRgb[2] >= 0 && newRgb[2] <= 255 && Number.isInteger(newRgb[0]) && Number.isInteger(newRgb[1]) && Number.isInteger(newRgb[2]))
                newHsb = undefined;
            else if (!gs.isNil(color.model)) {
                if (typeof (color.model.hexString) != "string")
                    throw new Error("Invalid model.hexString value");
                newRgb = ColorInfo.parseHexString(color.model.hexString);
                if (ColorInfo.isNil(newRgb))
                    throw new Error("Invalid model.hexString value");
                newHsb = undefined;
            }
            else {
                var v = newRgb.filter(function (o) { return ColorInfo.isNil(0); }).length;
                if (newHsb.filter(function (o) { return ColorInfo.isNil(0); }).length > v)
                    throw new Error("Cannot get color from {h, s, b} property values");
                if (v == 0)
                    throw new Error("Color property values not specified");
                throw new Error("Cannot get color from {r, g, b} property values.");
            }
        }
        else
            throw new Error("Invalid color argument type");
        if (ColorInfo.isNil(newHsb)) {
            hsb = ColorInfo.rgbToHsb(newRgb);
            rgb = newRgb;
        }
        else {
            rgb = ColorInfo.hsbToRgb(newHsb);
            hsb = ColorInfo.rgbToHsb(rgb);
        }
        this.red = function (value) {
            if (ColorInfo.isNil(value))
                return rgb[0];
            var i = ColorInfo.asInteger(value);
            if (ColorInfo.isNil(i))
                throw new Error("Invalid Red value");
            if (i < 0 || i > 255)
                throw new Error("Red must be a value from 0 to 255.");
            if (rgb[0] == i)
                return;
            rgb[0] = i;
            hsb = ColorInfo.rgbToHsb(rgb);
        };
        this.green = function (value) {
            if (ColorInfo.isNil(value))
                return rgb[1];
            var i = ColorInfo.asInteger(value);
            if (ColorInfo.isNil(i))
                throw new Error("Invalid Green value");
            if (i < 0 || i > 255)
                throw new Error("Green must be a value from 0 to 255.");
            if (rgb[1] == i)
                return;
            rgb[1] = i;
            hsb = ColorInfo.rgbToHsb(rgb);
        };
        this.blue = function (value) {
            if (ColorInfo.isNil(value))
                return rgb[2];
            var i = ColorInfo.asInteger(value);
            if (ColorInfo.isNil(i))
                throw new Error("Invalid Green value");
            if (i < 0 || i > 255)
                throw new Error("Green must be a value from 0 to 255.");
            if (rgb[2] == i)
                return;
            rgb[2] = i;
            hsb = ColorInfo.rgbToHsb(rgb);
        };
        this.hue = function (value) {
            if (ColorInfo.isNil(value))
                return hsb[0];
            var i = ColorInfo.asInteger(value);
            if (ColorInfo.isNil(i))
                throw new Error("Invalid Red value");
            if (i < 0 || i > 255)
                throw new Error("Red must be a value from 0 to 255.");
            if (hsb[0] == i)
                return;
            hsb[0] = i;
            rgb = ColorInfo.hsbToRgb(hsb);
            hsb = ColorInfo.rgbToHsb(rgb);
        };
        this.saturation = function (value) {
            if (ColorInfo.isNil(value))
                return hsb[1];
            var i = ColorInfo.asInteger(value);
            if (ColorInfo.isNil(i))
                throw new Error("Invalid Green value");
            if (i < 0 || i > 255)
                throw new Error("Green must be a value from 0 to 255.");
            if (hsb[1] == i)
                return;
            hsb[1] = i;
            rgb = ColorInfo.hsbToRgb(hsb);
            hsb = ColorInfo.rgbToHsb(rgb);
        };
        this.brightness = function (value) {
            if (ColorInfo.isNil(value))
                return hsb[2];
            var i = ColorInfo.asInteger(value);
            if (ColorInfo.isNil(i))
                throw new Error("Invalid Green value");
            if (i < 0 || i > 255)
                throw new Error("Green must be a value from 0 to 255.");
            if (hsb[2] == i)
                return;
            hsb[2] = i;
            rgb = ColorInfo.hsbToRgb(hsb);
            hsb = ColorInfo.rgbToHsb(rgb);
        };
        this.rgbHexString = function (value) {
            if (ColorInfo.isNil(value))
                return rgb.map(function (i) {
                    if (i < 16)
                        return "0" + i.toString(16);
                    return i.toString(16);
                }).join("");
            var newRgb = ColorInfo.parseHexString(value);
            if (newRgb[0] == rgb[0] && newRgb[1] == rgb[1] && newRgb[2] == rgb[2])
                return;
            rgb = newRgb;
            hsb = ColorInfo.rgbToHsb(rgb);
        };
    }
    static as8BitInt(value, doNotRound) {
        value = ColorInfo.asNumber(value);
        if (!isNaN(value)) {
            var result = Math.round(value);
            if (!((doNotRound && result != value) || result < 0 || result > 255))
                return result;
        }
        return NaN;
    }
    static asValidByteValues(arr) {
        var result = arr.map(ColorInfo.as8BitInt).filter(ColorInfo.isNumber);
        if (result.length == arr.length)
            return result;
    }
    static asValidHsb(h, s, b) {
        var result = [ColorInfo.asNumber(h), ColorInfo.asNumber(s), ColorInfo.asNumber(b)].filter(isNumber);
        if (result.length == 3 && result[0] >= 0.0 && result[0] <= 360.0 && result[1] >= 0.0 && result[1] <= 100.0 && result[2] >= 0.0 && result[2] <= 100.0) {
            if (result[0] == 360.0)
                result[0] = 0.0;
            return result;
        }
    }
    static isNumber(value) { return typeof (value) != "undefined" && value !== null && typeof(value) === "number" && !isNaN(value) && Number.isFinite(value); }
    static asNumberOld(value) {
        if (typeof (value) != "undefined" && value !== null) {
            if (typeof (value) == "number") {
                if (!isNaN(value))
                    return value;
            }
            else if (typeof (value) == "string" && (value = value.trim().length > 0)) {
                if (ColorInfo.FloatDigitRe.test(value))
                    return parseFloat(value);
                var m = ColorInfo.HexDigitRe.exec(value);
                if (!ColorInfo.isNil(m))
                    return parseInt(m[1], 16);
                var n = parseFloat(value);
                if (!isNaN(n))
                    return n;
            }
        }
    }
    static isNil(value) { return typeof (value) == "undefined" || value === null; }
    static asInteger(value) {
        var result = asNumber(value);
        if (typeof(result) === "number")
            return (Number.isInteger(result)) ? result : Math.round(result);
        return NaN;
    }
    static asNumber(value) {
        if (!ColorInfo.isNil(value)) {
            var result;
            if (typeof (value) == "number")
                result = value;
            else if (typeof (value) == "string" && (value = value.trim().length > 0)) {
                var m = ColorInfo.HexDigitRe.exec(value);
                result = (ColorInfo.isNil(m)) ? parseFloat(value) : parseInt(m[1], 16);
            } else
                result = parseFloat(value);
            if (!isNaN(result) && Number.isFinite(result))
                return result;
        }
        return NaN;
    }
    static parseHexString(text, doNotThrow) {
        if (ColorInfo.isNil(text))
            return text;
        if (typeof (text) != "string")
        {
            if (doNotThrow)
                return;
            throw new Error("Argument must be a string value.");
        }
        var m = ColorInfo.HexStringRe.exec(text);
        if (ColorInfo.isNil(m))
        {
            if (doNotThrow)
                return;
            throw new Error("Invalid hexidecimal color string");
        }
        if (!ColorInfo.isNil(m[1]))
            return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
        return [parseInt(m[4] + m[4], 16), parseInt(m[5] + m[5], 16), parseInt(m[6] + m[6], 16)];
    }
    static rgbFtoHsb(red, green, blue) {
        if (red < 0.0 || red > 100.0)
            throw new Error("Red must be a floating-point value from 0.0 to 100.0, representing a percentage value.");
        if (green < 0.0 || green > 100.0)
            throw new Error("Green must be a floating-point value from 0.0 to 100.0, representing a percentage value.");
        if (blue < 0.0 || blue > 100.0)
            throw new Error("Blue must be a floating-point value from 0.0 to 100.0, representing a percentage value.");
        var max, min;

        red /= 100.0;
        green /= 100.0;
        blue /= 100.0;
        if (red < green)
        {
            if (blue < red)
            {
                min = blue;
                max = green;
            }
            else
            {
                min = red;
                max = (blue < green) ? green : blue;
            }
        }
        else if (blue < green)
        {
            min = blue;
            max = red;
        }
        else
        {
            min = green;
            max = (red < blue) ? blue : red;
        }

        var delta = max - min;
        if (delta == 0.0)
            return [0.0, 0.0, max];

        var h = ((max == red) ? ((green - blue) / delta) : ((max == green) ? (2.0 + (blue - red) / delta) :
            (4.0 + (red - green) / delta))) * 60.0;
        if (h < 0.0)
            h += 360.0;
        var mm = max + min;
        var b = mm / 2.0;
        return [h, ((b <= 0.5)? delta / mm : delta / (2.0 - mm)) * 100.0, b * 100.0];
    }
    static rgbToHsb(red, green, blue) { return rgbFtoHsb(byteValueToPercentage(red), byteValueToPercentage(green), byteValueToPercentage(blue)); }
    static rgbToHsbOld(rgb) {
        var r, g, b;
        if (arguments.length > 1) {
            r = arguments[0];
            g = arguments[1];
            if (arguments.length > 2)
                b = arguments[2];
        }
        else {
            if (!ColorInfo.isNil(rgb)) {
                if (Array.isArray(rgb)) {
                    if (rgb.length > 0) {
                        r = rgb[0];
                        if (rgb.length > 1) {
                            g = rgb[1];
                            if (rgb.length > 2)
                                b = rgb[2];
                        }
                    }
                    if (ColorInfo.isNil(r))
                        r = rgb.r;
                    if (ColorInfo.isNil(g))
                        g = rgb.g;
                    if (ColorInfo.isNil(b))
                        b = rgb.b;
                }
                else {
                    r = rgb.r;
                    g = rgb.g;
                    b = rgb.b;
                }
            }
        }
        r = ColorInfo.asInteger(r);
        if (ColorInfo.isNil(r))
            throw new Error("Invalid Red value");
        g = ColorInfo.asInteger(g);
        if (ColorInfo.isNil(g))
            throw new Error("Invalid Green value");
        b = ColorInfo.asInteger(b);
        if (ColorInfo.isNil(b))
            throw new Error("Invalid Blue value");
        if (r < 0 || r > 255)
            throw new Error("Red must be a value from 0 to 255");
        if (g < 0 || g > 255)
            throw new Error("Green must be a value from 0 to 255");
        if (b < 0 || b > 255)
            throw new Error("Blue must be a value from 0 to 255");
        r = r / 255.0;
        g = g / 255.0;
        b = b / 255.0;
        var max, min;
        if (r < g) {
            if (b < r) {
                min = b;
                max = g;
            }
            else {
                min = r;
                max = (b < g) ? g : b;
            }
        }
        else if (b < g) {
            min = b;
            max = r;
        }
        else {
            min = g;
            max = (r < b) ? b : r;
        }
        var delta = max - min;
        if (delta == 0.0) {
            br = max;
            h = 0.0;
            s = 0.0;
            return [0.0, 0.0, max * 100.0];
        }
        h = ((max == r) ? ((g - b) / delta) : ((max == g) ? (2.0 + (b - r) / delta) :
            (4.0 + (r - g) / delta))) * 60.0;
        if (h < 0.0)
            h += 360.0;
        var mm = max + min;
        br = mm / 2.0;
        if (br <= 0.5)
            s = delta / mm;
        else
            s = delta / (2.0 - mm);
        return [h, s * 100.0, br * 100.0];
    }
    static percentageToByteValue(value) {
        if (typeof(value) !== "undefined" && value !== null) {
            if (typeof(value) !== "number")
                value = parseFloat(value);
            if (!isNaN(value) && value >= 0 && value <= 100)
                return Math.round(value * 255);
        }
        throw new Error("Argument must be a floating-point number value ranging from 0.0 to 100.0, inclusive.");
    }
    static byteValueToPercentage(value) {
        if (typeof(value) !== "undefined" && value !== null) {
            if (typeof(value) !== "number")
                value = parseFloat(value);
            if (!isNaN(value) && value >= 0 && value < 256 && Math.round(value) == value)
                return value / 2.55;
        }
        throw new Error("Argument must be a whole number value ranging from 0 to 255, inclusive.");
    }
    static degreesToByteValue(value) {
        if (typeof(value) !== "undefined" && value !== null) {
            if (typeof(value) !== "number")
                value = parseFloat(value);
            if (!isNaN(value) && value >= 0) {
                if (value == 360)
                    return 0;
                if (value < 360) {
                    value = (value * 256.0) / 360.0;
                    return (value < 255.0) ? Math.round(value) : 255;
                }
            }
        }
        throw new Error("Argument must be a floating-point number value ranging from 0.0 to 360.0, inclusive.");
    }
    static byteValueToDegrees(value) {
        if (typeof(value) !== "undefined" && value !== null) {
            if (typeof(value) !== "number")
                value = parseFloat(value);
            if (!isNaN(value) && value >= 0 && value < 256 && Math.round(value) == value)
                return (value * 360.0) / 256.0;
        }
        throw new Error("Argument must be a whole number value ranging from 0 to 255, inclusive.");
    }
    static hsbToRgbF(hue, saturation, brightness) {
        if (hue < 0.0 || hue > 360.0)
            throw new Error("Hue must be a value from 0.0 to 360.0, inclusive.");
        if (saturation < 0.0 || saturation > 100.0)
            throw new Error("Saturation must be a value from 0.0 to 100.0, inclusive.");
        if (brightness < 0.0 || brightness > 100.0)
            throw new Error("Brightness must be a value from 0.0 to 100.0, inclusive.");
        saturation /= 100.0;
        brightness /= 100.0;
        var min, max;
        if (brightness < 0.5)
        {
            min = brightness - brightness * saturation;
            max = brightness + brightness * saturation;
        }
        else
        {
            min = brightness + brightness * saturation - saturation;
            max = brightness - brightness * saturation + saturation;
        }

        var sextant = Math.floor(hue / 60.0);
        
        hue = ((hue >= 300.0) ? hue - HUE_MAXVALUE : hue) / 60.0 - (float)(2.0 * Math.floor(((sextant + 1) % 6) / 2.0));
        var mid = hue * (max - min);
        if ((sextant % 2) == 0)
            mid += min;
        else
            mid = min - mid;

        switch (sextant)
        {
            case 1:
                return [mid * 100.0, max * 100.0, min * 100.0];
            case 2:
                return [min * 100.0, max * 100.0, mid * 100.0];
            case 3:
                return [min * 100.0, mid * 100.0, max * 100.0];
            case 4:
                return [mid * 100.0, min * 100.0, max * 100.0];
            default:
                return [max * 100.0, min * 100.0, mid * 100.0];
        }
    }
    static hsbToRgb(hue, saturation, brightness) { return hsbToRgbF(hue, saturation, brightness).map(percentageToByteValue); }
    static hsbToRgbOld(hsb) {
        var h, s, b;
        if (arguments.length > 1) {
            h = arguments[0];
            s = arguments[1];
            if (arguments.length > 2)
                b = arguments[2];
        }
        else {
            if (!ColorInfo.isNil(hsb)) {
                if (Array.isArray(hsb)) {
                    if (hsb.length > 0) {
                        h = hsb[0];
                        if (hsb.length > 1) {
                            s = hsb[1];
                            if (hsb.length > 2)
                                b = hsb[2];
                        }
                    }
                    if (ColorInfo.isNil(h))
                        h = hsb.h;
                    if (ColorInfo.isNil(s))
                        s = hsb.s;
                    if (ColorInfo.isNil(b))
                        b = hsb.b;
                }
                else {
                    h = hsb.h;
                    s = hsb.s;
                    b = hsb.b;
                }
            }
        }
        h = ColorInfo.asNumber(h);
        if (ColorInfo.isNil(h))
            throw new Error("Invalid Hue value");
        s = ColorInfo.asNumber(s);
        if (ColorInfo.isNil(s))
            throw new Error("Invalid Saturation value");
        b = ColorInfo.asNumber(b);
        if (ColorInfo.isNil(b))
            throw new Error("Invalid Brightness value");
        if (h < 0 || h > 360)
            throw new Error("Hue must be a value from 0.0 to 360.0");
        if (s < 0 || s > 100)
            throw new Error("Saturation must be a value from 0.0 to 100.0");
        if (b < 0 || b > 100)
            throw new Error("Brightness must be a value from 0.0 to 100.0");
        s = s / 100.0;
        b = b / 100.0;
        var min, max;
        if (b < 0.5) {
            min = b - b * s;
            max = b + b * s;
        }
        else {
            min = b + b * s - s;
            max = b - b * s + s;
        }
        var sextant = Math.floor(h / 60.0);
        h = ((h >= 300.0) ? h - 360.0 : h) / 60.0 - 2.0 * Math.floor(((sextant + 1.0) % 6) / 2.0);
        var mid = h * (max - min);
        if ((sextant % 2) == 0)
            mid += min;
        else
            mid = min - mid;
        switch (sextant) {
            case 0:
                return [Math.round(max * 255), Math.round(mid * 255), Math.round(min * 255)];
            case 1:
                return [Math.round(mid * 255), Math.round(max * 255), Math.round(min * 255)];
            case 2:
                return [Math.round(min * 255), Math.round(max * 255), Math.round(mid * 255)];
            case 3:
                return [Math.round(min * 255), Math.round(mid * 255), Math.round(max * 255)];
            case 4:
                return [Math.round(mid * 255), Math.round(min * 255), Math.round(max * 255)];
        }
        return [Math.round(max * 255), Math.round(min * 255), Math.round(mid * 255)];
    }
}
ColorInfo.FloatDigitRe = /^\d+\.\d+$/i;
ColorInfo.HexDigitRe = /^(?:\#|0x)?([a-f\d]{2}$)/i;
ColorInfo.HexStringRe = /^(?:\#|0x)?(?:([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})|([a-f\d])([a-f\d])([a-f\d]))$/i;

var color = new ColorInfo("#ff7700");
