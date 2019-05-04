export interface IHasNamedProperties { [index: string]: any }
export interface IColorModelRgb {
    a?: number;
    r: number;
    g: number;
    b: number;
}
export interface IColorModelRgb2 {
    alpha?: number;
    red: number;
    green: number;
    blue: number;
}
export interface IColorModelHsb {
    a?: number;
    h: number;
    s: number;
    b: number;
}
export interface IColorModelHsb2 {
    alpha?: number;
    hue: number;
    saturation: number;
    brightness: number;
}
export interface IColorModelHsl {
    a?: number;
    h: number;
    s: number;
    l: number;
}
export interface IColorModelHsl2 {
    alpha?: number;
    hue: number;
    saturation: number;
    lightness: number;
}
export interface IHasColorModel {
    model: IColorModelRgb|IColorModelRgb2|IColorModelHsb|IColorModelHsb2|IColorModelHsl|IColorModelHsl2
}
export type IColorModel = IColorModelRgb|IColorModelRgb2|IColorModelHsb|IColorModelHsb2|IColorModelHsl|IColorModelHsl2;
export type IColorArg = string|number|IHasColorModel|IColorModel;
export class ColorInfo implements IColorModelRgb2, IColorModelHsb2 {
    static HexStringRe: RegExp = /^(?:\#|0x)?(?:([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?|([a-f\d])([a-f\d])([a-f\d])([a-f\d])?)$/i;

    private _rgb: IColorModelRgb;
    private _hsb: IColorModelHsb;

    get red(): number { return this._rgb.r; }
    set red(value: number) {
        if (!ColorInfo.isByteValue(value))
            throw new Error("Red value must be a whole number from 0 to 255, inclusive");
        if (value == this._rgb.r)
            return;
        this._rgb.r = value;
        this._hsb = ColorInfo.toColorModelHsb(this._rgb);
    }
    get green(): number { return this._rgb.g; }
    set green(value: number) {
        if (!ColorInfo.isByteValue(value))
            throw new Error("Green value must be a whole number from 0 to 255, inclusive");
        if (value == this._rgb.g)
            return;
        this._rgb.g = value;
        this._hsb = ColorInfo.toColorModelHsb(this._rgb);
    }
    get blue(): number { return this._rgb.b; }
    set blue(value: number) {
        if (!ColorInfo.isByteValue(value))
            throw new Error("Blue value must be a whole number from 0 to 255, inclusive");
        if (value == this._rgb.b)
            return;
        this._rgb.b = value;
        this._hsb = ColorInfo.toColorModelHsb(this._rgb);
    }
    get hue(): number { return this._hsb.h; }
    set hue(value: number) {
        if (!ColorInfo.isDegreesValue(value))
            throw new Error("Hue value must be a number from 0.0 to 360.0, inclusive");
        if (value == 360.0)
            value = 0.0;
        if (value == this._hsb.h)
            return;
        this._hsb.h = value;
        this._rgb = ColorInfo.toColorModelRgb(this._hsb);
    }
    get saturation(): number { return this._hsb.s; }
    set saturation(value: number) {
        if (!ColorInfo.isPercentageValue(value))
            throw new Error("Saturation value must be a number from 0.0 to 100.0, inclusive");
        if (value == this._hsb.s)
            return;
        this._hsb.s = value;
        this._rgb = ColorInfo.toColorModelRgb(this._hsb);
    }
    get brightness(): number { return this._hsb.b; }
    set brightness(value: number) {
        if (!ColorInfo.isPercentageValue(value))
            throw new Error("Brightness value must be a number from 0.0 to 100.0, inclusive");
        if (value == this._hsb.b)
            return;
        this._hsb.b = value;
        this._rgb = ColorInfo.toColorModelRgb(this._hsb);
    }
    get alpha(): number { return this._rgb.a; }
    set alpha(value: number) {
        if (!ColorInfo.isByteValue(value))
            throw new Error("Alpha (transparency) value must be a whole number from 0 to 255, inclusive");
        this._hsb.a = ColorInfo.byteToPercentage(this._rgb.a = value);
    }

    constructor(obj?: IColorArg, g?: number, b?: number, a?: number) {
        let rgb: IColorModelRgb|undefined;
        let hsb: IColorModelHsb|undefined;
        if (ColorInfo.isNil(g) && ColorInfo.isNil(b) && ColorInfo.isNil(a)) {
            if (typeof(obj) == "string") {
                rgb = ColorInfo.parseBinHexString(obj);
                if (ColorInfo.isNil(rgb))
                    throw new Error("Invalid color binhex string");
                if (!ColorInfo.isByteValue(rgb.a))
                    rgb.a = 255;
            } else if (typeof(obj) == "number") {
                rgb = ColorInfo.fromArgb(obj);
                if (ColorInfo.isNil(rgb))
                    throw new Error("Invalid color ARGB number");
            } else {
                if (ColorInfo.isColorModel(obj)) {
                    if (ColorInfo.isColorModelRgb(obj) || ColorInfo.isColorModelRgb2(obj))
                        rgb = ColorInfo.toColorModelRgb(obj);
                    else
                        hsb = ColorInfo.toColorModelHsb(obj);
                } else if (ColorInfo.hasColorModel(obj)) {
                    if (ColorInfo.isColorModelRgb(obj.model) || ColorInfo.isColorModelRgb2(obj.model))
                        rgb = ColorInfo.toColorModelRgb(obj.model);
                    else
                        hsb = ColorInfo.toColorModelHsb(obj.model);
                }
            }
            if (ColorInfo.isNil(rgb)) {
                if (ColorInfo.isNil(hsb))
                    throw new Error("Invalid color model");
                rgb = ColorInfo.toColorModelRgb(hsb);
            } else
                hsb = ColorInfo.toColorModelHsb(rgb);
        } else {
            if (!ColorInfo.isByteValue(obj))
                throw new Error("Invalid red value");
            if (!ColorInfo.isByteValue(g))
                throw new Error("Invalid green value");
            if (!ColorInfo.isByteValue(b))
                throw new Error("Invalid blue value");
            if (ColorInfo.isNil(a))
                rgb = { r: obj, g: g, b: b, a: 255 };
            else {
                if (!ColorInfo.isByteValue(a))
                    throw new Error("Invalid alpha layer value");
                rgb = { r: obj, g: g, b: b, a: a };
            }
            hsb = ColorInfo.toColorModelHsb(rgb);
        }
    }

    setAlphaPercentage(value: number) {
        if (!ColorInfo.isPercentageValue(value))
            throw new Error("Alpha (transparency) value must be a number from 0.0 to 100.0, inclusive.");
        this._rgb.a = ColorInfo.percentageToByte(this._hsb.a = value);
    }

    toJSON(): string { return JSON.stringify(this._rgb); }

    toString(allowShorthand?: boolean, includeAlpha?: boolean): string {
        let result: string = ColorInfo.toHexByteString(this._rgb.r) + ColorInfo.toHexByteString(this._rgb.g) + ColorInfo.toHexByteString(this._rgb.b);
        if (allowShorthand && result[0] == result[1] &&  result[2] == result[3] && result[4] == result[5]) {
            if (includeAlpha) {
                let s: string = ColorInfo.toHexByteString(this._rgb.a);
                if (s[0] == s[1])
                    return result[0] + result[2] + result[3] + s[0];
                return result + s;
            }
            
            return result[0] + result[2] + result[3];
        }

        if (includeAlpha)
            return result + ColorInfo.toHexByteString(this._rgb.a);
        return result;
    }

    static toHexByteString(value: number){
        if (!ColorInfo.isByteValue(value))
            throw new Error("Value must be a whole number from 0 to 255, inclusive.");
        let result: string = value.toString(16);
        return (result.length == 1) ? "0" + result : result;
    }
    static toColorModelHsb(value: IColorModel|IColorModelRgb|IColorModelRgb2|IColorModelHsb2|IColorModelHsl|IColorModelHsl2): IColorModelHsb|undefined {
        if (typeof(value) === 'object') {
            if (ColorInfo.isColorModelHsb(value))
            {
                if (value.h == 360.0)
                    return { h: 0.0, s: value.s, b: value.b, a: ((ColorInfo.isPercentageValue(value.a)) ? value.a : 100.0) };
                if (ColorInfo.isPercentageValue(value.a))
                    return value;
                return { h: value.h, s: value.s, b: value.b, a: 100.0 };
            }
            if (ColorInfo.isColorModelHsb2(value))
                return { h: (value.hue == 360.0) ? 0.0 : value.hue, s: value.saturation, b: value.brightness, a: ((ColorInfo.isPercentageValue(value.alpha)) ? value.alpha : 100.0) };
            if (ColorInfo.isColorModelHsl(value))
                return { h: (value.h == 360.0) ? 0.0 : value.h, s: value.s, b: value.l, a: ((ColorInfo.isPercentageValue(value.a)) ? value.a : 100.0) };
            if (ColorInfo.isColorModelHsl2(value))
                return { h: (value.hue == 360.0) ? 0.0 : value.hue, s: value.saturation, b: value.lightness, a: ((ColorInfo.isPercentageValue(value.alpha)) ? value.alpha : 100.0) };
            let rgb: IColorModelRgb|undefined;
            if (ColorInfo.isColorModelRgb(value))
            {
                if (ColorInfo.isColorModelRgb(value, false))
                    rgb = { r: ColorInfo.byteToPercentage(value.r, true), g: ColorInfo.byteToPercentage(value.g, true), b: ColorInfo.byteToPercentage(value.b, true),
                        a: value.a };
                else
                    rgb = { r: (<IColorModelRgb>value).r / 100.0, g: (<IColorModelRgb>value).g / 100.0, b: (<IColorModelRgb>value).b / 100.0, a: (<IColorModelRgb>value).a };
            }
            else if (ColorInfo.isColorModelRgb2(value))
            {
                if (ColorInfo.isColorModelRgb2(value, false))
                    rgb = { r: ColorInfo.byteToPercentage(value.red, true), g: ColorInfo.byteToPercentage(value.green, true), b: ColorInfo.byteToPercentage(value.blue, true),
                        a: value.alpha };
                else
                    rgb = { r: (<IColorModelRgb2>value).red / 100.0, g: (<IColorModelRgb2>value).green / 100.0, b: (<IColorModelRgb2>value).blue / 100.0,
                        a: (<IColorModelRgb2>value).alpha };
            }

            if (typeof(rgb) === 'undefined')
                throw new Error("Invalid color model");
                  
            let max: number, min: number;

            if (rgb.r < rgb.g)
            {
                if (rgb.b < rgb.r)
                {
                    min = rgb.b;
                    max = rgb.g;
                }
                else
                {
                    min = rgb.r;
                    max = (rgb.b < rgb.g) ? rgb.g : rgb.b;
                }
            }
            else if (rgb.b < rgb.g)
            {
                min = rgb.b;
                max = rgb.r;
            }
            else
            {
                min = rgb.g;
                max = (rgb.r < rgb.b) ? rgb.b : rgb.r;
            }

            let delta:number = max - min;
            if (delta == 0.0)
                return { h: 0.0, s: 0.0, b: max * 100.0 };

            let h:number = ((max == rgb.r) ? ((rgb.g - rgb.b) / delta) : ((max == rgb.g) ? (2.0 + (rgb.b - rgb.r) / delta) :
                (4.0 + (rgb.r - rgb.g) / delta))) * 60.0;
            if (h < 0.0)
                h += 360.0;
            let mm:number = max + min;
            let b:number = mm / 2.0;
            return { h: h, s: ((b <= 0.5)? delta / mm : delta / (2.0 - mm)) * 100.0, b: b * 100.0, a: ((ColorInfo.isPercentageValue(rgb.a, true)) ? rgb.a : 100.0) };
        }
    }
    static toColorModelRgb(value: IColorModel): IColorModelRgb|undefined {
        if (typeof(value) === 'object') {
            if (ColorInfo.isColorModelRgb(value)) {
                if (ColorInfo.isColorModelRgb(value, false))
                    return value;
                if (ColorInfo.isPercentageValue((<IColorModelRgb>value).a))
                    return { r: ColorInfo.percentageToByte((<IColorModelRgb>value).r), g: ColorInfo.percentageToByte((<IColorModelRgb>value).g),
                        b: ColorInfo.percentageToByte((<IColorModelRgb>value).b), a: ColorInfo.percentageToByte((<IColorModelRgb>value).a) }
                return { r: ColorInfo.percentageToByte((<IColorModelRgb>value).r), g: ColorInfo.percentageToByte((<IColorModelRgb>value).g),
                    b: ColorInfo.percentageToByte((<IColorModelRgb>value).b) };
            }
            if (ColorInfo.isColorModelRgb2(value)) {
                if (ColorInfo.isColorModelRgb2(value, false))
                    return { r: value.red, g: value.green, b: value.blue, a: value.alpha };

                if (ColorInfo.isPercentageValue((<IColorModelRgb2>value).alpha))
                    return { r: ColorInfo.percentageToByte((<IColorModelRgb2>value).red), g: ColorInfo.percentageToByte((<IColorModelRgb2>value).green),
                        b: ColorInfo.percentageToByte((<IColorModelRgb2>value).blue), a: ColorInfo.percentageToByte((<IColorModelRgb2>value).alpha) }
                return { r: ColorInfo.percentageToByte((<IColorModelRgb2>value).red), g: ColorInfo.percentageToByte((<IColorModelRgb2>value).green),
                    b: ColorInfo.percentageToByte((<IColorModelRgb2>value).blue) };
            }
            let hsb: IColorModelHsb|undefined;
            if (ColorInfo.isColorModelHsb(value))
                hsb = { h: (value.h == 360.0) ? 0.0 : value.h / 100.0, s: value.s / 100.0, b: value.b / 100.0, a: value.a / 100.0 };
            else if (ColorInfo.isColorModelHsb2(value))
                hsb = { h: (value.hue == 360.0) ? 0.0 : value.hue / 100.0, s: value.saturation / 100.0, b: value.brightness / 100.0, a: value.alpha };
            else if (ColorInfo.isColorModelHsl(value))
                hsb = { h: (value.h == 360.0) ? 0.0 : value.h / 100.0, s: value.s / 100.0, b: value.l / 100.0, a: value.a };
            else if (ColorInfo.isColorModelHsl2(value))
                hsb = { h: (value.hue == 360.0) ? 0.0 : value.hue / 100.0, s: value.saturation / 100.0, b: value.lightness / 100.0, a: value.alpha };
                
            if (typeof(hsb) === 'undefined')
                throw new Error("Invalid color model");
              
            var min, max;
            if (hsb.b < 0.5)
            {
                min = hsb.b - hsb.b * hsb.s;
                max = hsb.b + hsb.b * hsb.s;
            }
            else
            {
                min = hsb.b + hsb.b * hsb.s - hsb.s;
                max = hsb.b - hsb.b * hsb.s + hsb.s;
            }

            var sextant = Math.floor(hsb.h / 60.0);
            
            hsb.h = ((hsb.h >= 300.0) ? hsb.h - 360.0 : hsb.h) / 60.0 - (2.0 * Math.floor(((sextant + 1) % 6) / 2.0));
            var mid = hsb.h * (max - min);
            if ((sextant % 2) == 0)
                mid += min;
            else
                mid = min - mid;

            switch (sextant)
            {
                case 1:
                    return { r: Math.round(mid * 255.0), g: Math.round(max * 255.0), b: Math.round(min * 255.0), a: ((ColorInfo.isPercentageValue(hsb.a)) ? Math.round(hsb.a * 2.55) : 255) };
                case 2:
                    return { r: Math.round(min * 255.0), g: Math.round(max * 255.0), b: Math.round(mid * 255.0), a: ((ColorInfo.isPercentageValue(hsb.a)) ? Math.round(hsb.a * 2.55) : 255) };
                case 3:
                    return { r: Math.round(min * 255.0), g: Math.round(mid * 255.0), b: Math.round(max * 255.0), a: ((ColorInfo.isPercentageValue(hsb.a)) ? Math.round(hsb.a * 2.55) : 255) };
                case 4:
                    return { r: Math.round(mid * 255.0), g: Math.round(min * 255.0), b: Math.round(max * 255.0), a: ((ColorInfo.isPercentageValue(hsb.a)) ? Math.round(hsb.a * 2.55) : 255) };
                default:
                    return { r: Math.round(max * 255.0), g: Math.round(min * 255.0), b: Math.round(mid * 255.0), a: ((ColorInfo.isPercentageValue(hsb.a)) ? Math.round(hsb.a * 2.55) : 255) };
            }
        }
    }
    static byteToPercentage(value: number, notGreaterThan1?: boolean): number|undefined {
        if (ColorInfo.isByteValue(value))
            return value / ((notGreaterThan1) ? 255.0 : 2.55);
    }
    static percentageToByte(value: number, notGreaterThan1?: boolean): number|undefined {
        if (ColorInfo.isPercentageValue(value))
            return Math.round(value * 2.55);
    }
    static fromArgb(value: number): IColorModelRgb|undefined {
        if (ColorInfo.isIntegerValue(value))
            return { a: value & 0xff, r: (value >> 8) & 0xff, g: (value >> 16) & 0xff, b: (value >> 24) & 0xff };
    }
    static toArgb(value: number|IColorModelRgb|IColorModelRgb2, g?: null, b?: number, a?: number): number {
        if (ColorInfo.isNil(g) && ColorInfo.isNil(b) && ColorInfo.isNil(a)) {
            if (typeof(value) == 'object') {
                if (ColorInfo.isColorModelRgb(value))
                    return ((ColorInfo.isByteValue(value.a)) ? value.a : 0xff) | (value.r << 8) | (value.g << 16) | (value.b << 24);
                if (ColorInfo.isColorModelRgb2(value))
                    return ((ColorInfo.isByteValue(value.alpha)) ? value.alpha : 0xff) | (value.red << 8) | (value.green << 16) | (value.blue << 24);
            }
        } else if (ColorInfo.isByteValue(value) && ColorInfo.isByteValue(g) && ColorInfo.isByteValue(b)) {
            if (ColorInfo.isNil(a))
                return 0xff | (value << 8) | (<number>g << 16) | (b << 24);
            if (ColorInfo.isByteValue(a))
                return a | (value << 8) | (<number>g << 16) | (b << 24);
        }
        return NaN;
    }
    static parseBinHexString(value?: string): IColorModelRgb|undefined {
        if (typeof(value) === 'string' && (value = value.trim()).length > 0) {
            let m: RegExpExecArray|null|undefined = ColorInfo.HexStringRe.exec(value);
            if (!ColorInfo.isNil(m))
            {
                if (ColorInfo.isNil(m[1])) {
                    if (ColorInfo.isNil(m[8]))
                        return { r: parseInt(m[5] + m[5], 16), g: parseInt(m[6] + m[6], 16), b: parseInt(m[7] + m[7], 16) };
                    return { a: parseInt(m[5] + m[5], 16), r: parseInt(m[6] + m[6], 16), g: parseInt(m[7] + m[7], 16), b: parseInt(m[8] + m[8], 16) };
                }
                if (ColorInfo.isNil(m[4]))
                    return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
                return { a: parseInt(m[1], 16), r: parseInt(m[2], 16), g: parseInt(m[3], 16), b: parseInt(m[3], 16) };
            }
        }
    }
    static hasNamedProperties(value: any): value is IHasNamedProperties { return typeof(value) == 'object' && !Array.isArray(value); }
    static isColorModelRgb(value: any, percentage?: boolean): value is IColorModelRgb {
        if (typeof(percentage) == 'boolean') {
            if (percentage)
                return ColorInfo.hasNamedProperties(value) && ColorInfo.isPercentageValue(value["r"]) && ColorInfo.isPercentageValue(value["g"]) && ColorInfo.isPercentageValue(value["b"]) &&
                    (ColorInfo.isNil(value["a"]) || ColorInfo.isPercentageValue(value["a"]));
            return ColorInfo.hasNamedProperties(value) && ColorInfo.isByteValue(value["r"]) && ColorInfo.isByteValue(value["g"]) && ColorInfo.isByteValue(value["b"]) &&
                (ColorInfo.isNil(value["a"]) || ColorInfo.isByteValue(value["a"]));
        }
        return ColorInfo.hasNamedProperties(value) && ColorInfo.isPercentageOrByte(value["r"]) && ColorInfo.isPercentageOrByte(value["g"]) && ColorInfo.isPercentageOrByte(value["b"]) &&
            (ColorInfo.isNil(value["a"]) || ColorInfo.isPercentageOrByte(value["a"]));
    }
    static isColorModelRgb2(value: any, percentage?: boolean): value is IColorModelRgb2 {
        if (typeof(percentage) == 'boolean') {
            if (percentage)
                return ColorInfo.hasNamedProperties(value) && ColorInfo.isPercentageValue(value["red"]) && ColorInfo.isPercentageValue(value["green"]) && ColorInfo.isPercentageValue(value["blue"]) &&
                    (ColorInfo.isNil(value["alpha"]) || ColorInfo.isPercentageValue(value["alpha"]));
            return ColorInfo.hasNamedProperties(value) && ColorInfo.isByteValue(value["red"]) && ColorInfo.isByteValue(value["green"]) && ColorInfo.isByteValue(value["blue"]) &&
                (ColorInfo.isNil(value["alpha"]) || ColorInfo.isByteValue(value["alpha"]));
        }
        return ColorInfo.hasNamedProperties(value) && ColorInfo.isPercentageOrByte(value["red"]) && ColorInfo.isPercentageOrByte(value["green"]) && ColorInfo.isPercentageOrByte(value["blue"]) &&
            (ColorInfo.isNil(value["alpha"]) || ColorInfo.isPercentageOrByte(value["alpha"]));
    }
    static isColorModelHsb(value: any): value is IColorModelHsb {
        return ColorInfo.hasNamedProperties(value) && ColorInfo.isByteValue(value["h"]) && ColorInfo.isByteValue(value["s"]) && ColorInfo.isByteValue(value["b"]) &&
            (ColorInfo.isNil(value["a"]) || ColorInfo.isByteValue(value["a"]));
    }
    static isColorModelHsb2(value: any): value is IColorModelHsb2 {
        return ColorInfo.hasNamedProperties(value) && ColorInfo.isByteValue(value["hue"]) && ColorInfo.isPercentageValue(value["saturation"]) && ColorInfo.isPercentageValue(value["brightness"]) &&
            (ColorInfo.isNil(value["alpha"]) || ColorInfo.isPercentageValue(value["alpha"]));
    }
    static isColorModelHsl(value: any): value is IColorModelHsl {
        return ColorInfo.hasNamedProperties(value) && ColorInfo.isByteValue(value["h"]) && ColorInfo.isPercentageValue(value["s"]) && ColorInfo.isPercentageValue(value["l"]) &&
            (ColorInfo.isNil(value["a"]) || ColorInfo.isPercentageValue(value["a"]));
    }
    static isColorModelHsl2(value: any): value is IColorModelHsl2 {
        return ColorInfo.hasNamedProperties(value) && ColorInfo.isByteValue(value["hue"]) && ColorInfo.isPercentageValue(value["saturation"]) && ColorInfo.isPercentageValue(value["lightness"]) &&
            (ColorInfo.isNil(value["alpha"]) || ColorInfo.isPercentageValue(value["alpha"]));
    }
    static isColorModel(value: any): value is IColorModelRgb|IColorModelRgb2|IColorModelHsb|IColorModelHsb2|IColorModelHsl|IColorModelHsl2 {
        return ColorInfo.hasNamedProperties(value) && 
            ((ColorInfo.isByteValue(value["r"]) && ColorInfo.isByteValue(value["g"]) && ColorInfo.isByteValue(value["b"]) &&
                (ColorInfo.isNil(value["a"]) || ColorInfo.isByteValue(value["a"]))) ||
            ((ColorInfo.isPercentageValue(value["r"]) && ColorInfo.isPercentageValue(value["g"]) && ColorInfo.isPercentageValue(value["b"]) &&
                (ColorInfo.isNil(value["a"]) || ColorInfo.isPercentageValue(value["a"])))) ||
            (ColorInfo.isByteValue(value["red"]) && ColorInfo.isByteValue(value["green"]) && ColorInfo.isByteValue(value["blue"]) &&
                (ColorInfo.isNil(value["alpha"]) || ColorInfo.isByteValue(value["alpha"]))) ||
            (ColorInfo.isPercentageValue(value["red"]) && ColorInfo.isPercentageValue(value["green"]) && ColorInfo.isPercentageValue(value["blue"]) &&
                (ColorInfo.isNil(value["alpha"]) || ColorInfo.isPercentageValue(value["alpha"]))) ||
            (ColorInfo.isDegreesValue(value["h"]) && ColorInfo.isPercentageValue(value["s"]) && ColorInfo.isPercentageValue(value["b"]) &&
                (ColorInfo.isNil(value["a"]) || ColorInfo.isPercentageValue(value["a"]))) ||
            (ColorInfo.isDegreesValue(value["hue"]) && ColorInfo.isPercentageValue(value["saturation"]) && ColorInfo.isPercentageValue(value["brightness"]) &&
                (ColorInfo.isNil(value["alpha"]) || ColorInfo.isPercentageValue(value["alpha"]))) ||
            (ColorInfo.isDegreesValue(value["h"]) && ColorInfo.isPercentageValue(value["s"]) && ColorInfo.isPercentageValue(value["l"]) &&
                (ColorInfo.isNil(value["a"]) || ColorInfo.isPercentageValue(value["a"]))) ||
            (ColorInfo.isDegreesValue(value["hue"]) && ColorInfo.isPercentageValue(value["saturation"]) && ColorInfo.isPercentageValue(value["lightness"]) &&
                (ColorInfo.isNil(value["alpha"]) || ColorInfo.isPercentageValue(value["alpha"]))));
    }
    static hasColorModel(value: any): value is IHasColorModel {
        return ColorInfo.hasNamedProperties(value) && ColorInfo.isColorModel(value["model"]);
    }
    static isNil(value: any): value is null|undefined { return typeof(value) == "undefined" || value === null; }
    static isNumberValue(value: any): value is number { return typeof(value) == "number" && !isNaN(value) && isFinite(value); }
    static isIntegerValue(value: any): value is number { return ColorInfo.isNumberValue(value) && Math.round(value) == value; }
    static isByteValue(value: any): value is number { return ColorInfo.isIntegerValue(value) && value >= 0 && value < 256; }
    static isPercentageOrByte(value: any): value is number { return ColorInfo.isNumberValue(value) && value >= 0.0 && (value < 100.0 || (value < 256 && ColorInfo.isByteValue(value))); }
    static isPercentageValue(value: any, notGreaterThan1?: boolean): value is number { return ColorInfo.isNumberValue(value) && value >= 0.0 && value <= ((notGreaterThan1) ? 1.0 : 100.0); }
    static isDegreesValue(value: any): value is number { return ColorInfo.isNumberValue(value) && value >= 0.0 && value <= 360.0; }
    static asNumberValue(value: any): number {
        if (!ColorInfo.isNil(value)) {
            if (ColorInfo.isNumberValue(value))
                return value;

            let n: number = parseFloat(value);
            if (!isNaN(n) && isFinite(n))
                return n;
        }
        return NaN;
    }
}