/// <reference path="sys.d.ts" />
export interface IHasNamedProperties {
    [index: string]: any;
}
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
    model: IColorModelRgb | IColorModelRgb2 | IColorModelHsb | IColorModelHsb2 | IColorModelHsl | IColorModelHsl2;
}
export declare type IColorModel = IColorModelRgb | IColorModelRgb2 | IColorModelHsb | IColorModelHsb2 | IColorModelHsl | IColorModelHsl2;
export declare type IColorArg = string | number | IHasColorModel | IColorModel;
export declare class ColorInfo implements IColorModelRgb2, IColorModelHsb2 {
    static HexStringRe: RegExp;
    private _rgb;
    private _hsb;
    red: number;
    green: number;
    blue: number;
    hue: number;
    saturation: number;
    brightness: number;
    alpha: number;
    constructor(obj?: IColorArg, g?: number, b?: number, a?: number);
    setAlphaPercentage(value: number): void;
    toJSON(): string;
    toString(allowShorthand?: boolean, includeAlpha?: boolean): string;
    static toHexByteString(value: number): string;
    static toColorModelHsb(value: IColorModel | IColorModelRgb | IColorModelRgb2 | IColorModelHsb2 | IColorModelHsl | IColorModelHsl2): IColorModelHsb | undefined;
    static toColorModelRgb(value: IColorModel): IColorModelRgb | undefined;
    static byteToPercentage(value: number, notGreaterThan1?: boolean): number | undefined;
    static percentageToByte(value: number, notGreaterThan1?: boolean): number | undefined;
    static fromArgb(value: number): IColorModelRgb | undefined;
    static toArgb(value: number | IColorModelRgb | IColorModelRgb2, g?: null, b?: number, a?: number): number;
    static parseBinHexString(value?: string): IColorModelRgb | undefined;
    static hasNamedProperties(value: any): value is IHasNamedProperties;
    static isColorModelRgb(value: any, percentage?: boolean): value is IColorModelRgb;
    static isColorModelRgb2(value: any, percentage?: boolean): value is IColorModelRgb2;
    static isColorModelHsb(value: any): value is IColorModelHsb;
    static isColorModelHsb2(value: any): value is IColorModelHsb2;
    static isColorModelHsl(value: any): value is IColorModelHsl;
    static isColorModelHsl2(value: any): value is IColorModelHsl2;
    static isColorModel(value: any): value is IColorModelRgb | IColorModelRgb2 | IColorModelHsb | IColorModelHsb2 | IColorModelHsl | IColorModelHsl2;
    static hasColorModel(value: any): value is IHasColorModel;
    static isNil(value: any): value is null | undefined;
    static isNumberValue(value: any): value is number;
    static isIntegerValue(value: any): value is number;
    static isByteValue(value: any): value is number;
    static isPercentageOrByte(value: any): value is number;
    static isPercentageValue(value: any, notGreaterThan1?: boolean): value is number;
    static isDegreesValue(value: any): value is number;
    static asNumberValue(value: any): number;
}
