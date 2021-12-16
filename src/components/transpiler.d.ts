import React from 'react';
import { Property } from 'csstype';
import { AlignHorizontal, AlignVertical, AppV1_Button, AppV1_Frame, AppV1_Image, AppV1_List, AppV1_ListItem, AppV1_Space, AppV1_Typography, ThemeProps, AxisAlign, AxisDistribute, Color, SizingMode, SolidPaint, Paint, PlainTextStyle, TextStyle } from '@funii-inc/funii-assist-types';
declare class ReactStyleTranspiler {
    constructor(pxUnit?: number, defaultTheme?: ThemeProps);
    pxUnit: number;
    defaultTheme: ThemeProps;
    private isHex;
    private isRgba;
    private hexToColor;
    private rgbaToColor;
    toCalcPaint: (paint: Paint, theme?: ThemeProps) => SolidPaint;
    toCalcTextStyle: (textStyle: TextStyle, theme?: ThemeProps) => PlainTextStyle;
    toCssColor: (color: Color) => Property.Color;
    toColor: (colorCode: string, a?: number | undefined) => {
        a: number;
        r: number;
        g: number;
        b: number;
    };
    toCssPadding: (padding: number[]) => Property.Padding;
    toCssBorderRadius: (cornerRadius: number[]) => Property.BorderRadius;
    toCssHeight: (height: number | null, sizingMode: SizingMode, py?: number | undefined) => (string & {}) | "auto";
    toCssWidth: (width: number | null, sizingMode: SizingMode, px?: number | undefined) => (string & {}) | "auto";
    toCssBorder: (stroke: Paint | null, strokeWeight: number, theme?: ThemeProps) => Property.Border;
    toCssTextAlign: (alignHorizontal: AlignHorizontal) => Property.TextAlign;
    toCssVerticalAlign: (alignVertical: AlignVertical) => Property.VerticalAlign;
    toCssJustifyContent: (alignHorizontal: AlignHorizontal | AxisAlign) => Property.JustifyContent;
    toCssAlignItems: (alignVertical: AlignVertical | AxisAlign) => Property.AlignItems;
    toCssAlignContent: (axisDistribute: AxisDistribute) => Property.AlignContent;
    toCssTextStyle: (textStyle: TextStyle, theme?: ThemeProps) => React.CSSProperties;
    typographyTranspile: (node: AppV1_Typography, fullWidth?: boolean | undefined, theme?: ThemeProps) => {
        containerStyle: React.CSSProperties;
        typographyStyle: React.CSSProperties;
    };
    imageTranspile: (node: AppV1_Image, imageURL?: string | undefined, fullWidth?: boolean | undefined, theme?: ThemeProps) => {
        containerStyle: React.CSSProperties;
        imagesStyle: React.CSSProperties;
        imageStyle: React.CSSProperties;
    };
    spaceTranspile: (node: AppV1_Space) => React.CSSProperties;
    buttonTranspile: (node: AppV1_Button, fullWidth?: boolean | undefined, theme?: ThemeProps) => {
        containerStyle: React.CSSProperties;
        buttonStyle: React.CSSProperties;
        iconStyle: React.CSSProperties;
        typographyStyle: React.CSSProperties;
    };
    listTranspile: (node: AppV1_List, fullWidth?: boolean | undefined, theme?: ThemeProps) => {
        containerStyle: React.CSSProperties;
        listStyle: React.CSSProperties;
    };
    listItemTranspile: (node: AppV1_ListItem, fullWidth?: boolean | undefined, theme?: ThemeProps) => {
        containerStyle: React.CSSProperties;
        listItemStyle: React.CSSProperties;
        iconStyle: React.CSSProperties;
        imageIconStyle: React.CSSProperties;
        primaryTextStyle: React.CSSProperties;
        secondaryTextStyle: React.CSSProperties;
    };
    frameTranspile: (node: AppV1_Frame, fullWidth?: boolean | undefined, theme?: ThemeProps) => {
        containerStyle: React.CSSProperties;
        frameStyle: React.CSSProperties;
    };
}
declare const transpiler: ReactStyleTranspiler;
export default transpiler;
//# sourceMappingURL=transpiler.d.ts.map