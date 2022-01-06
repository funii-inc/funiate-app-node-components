import { ThemeProps, SolidPaint, PlainTextStyle, PaletteColor, ThemePalettePaint } from '@funii-inc/funiate-types'

export const whitePaint: SolidPaint = { type: 'SOLID', color: { r: 255, g: 255, b: 255, a: 1 } }
export const blackPaint: SolidPaint = { type: 'SOLID', color: { r: 0, g: 0, b: 0, a: 1 } }
export const primaryPaint: SolidPaint = { type: 'SOLID', color: { r: 0, g: 0, b: 0, a: 1 } }
export const warningPaint: SolidPaint = { type: 'SOLID', color: { r: 245, g: 166, b: 35, a: 1 } }
export const errorPaint: SolidPaint = { type: 'SOLID', color: { r: 238, g: 0, b: 0, a: 1 } }
export const successPaint: SolidPaint = { type: 'SOLID', color: { r: 0, g: 223, b: 243, a: 1 } }

export const textPrimaryPaint: SolidPaint = { type: 'SOLID', color: { r: 0, g: 0, b: 0, a: 1 } }
export const textSecondaryPaint: SolidPaint = { type: 'SOLID', color: { r: 102, g: 102, b: 102, a: 1 } }
export const textDisabledPaint: SolidPaint = { type: 'SOLID', color: { r: 204, g: 204, b: 204, a: 1 } }

export const backgroundPaint: SolidPaint = { type: 'SOLID', color: { r: 248, g: 248, b: 248, a: 1 } }

export const dividerPaint: SolidPaint = { type: 'SOLID', color: { r: 234, g: 234, b: 234, a: 1 } }

export const textPrimaryThemePaint: ThemePalettePaint = { type: 'PALETTE', keys: ['text', 'primary'] }
export const textSecondaryThemePaint: ThemePalettePaint = { type: 'PALETTE', keys: ['text', 'secondary'] }

type Palette = {
  primary: PaletteColor
  secondary: PaletteColor
  warning: PaletteColor
  error: PaletteColor
  success: PaletteColor
  text: {
    primary: SolidPaint
    secondary: SolidPaint
    disabled: SolidPaint
  }
  background: {
    default: SolidPaint
    paper: SolidPaint
  }
  divider: SolidPaint
}

const defaultPalette: Palette = {
  primary: {
    light: primaryPaint,
    main: primaryPaint,
    dark: primaryPaint,
    contrastText: whitePaint,
  },
  secondary: {
    light: primaryPaint,
    main: primaryPaint,
    dark: primaryPaint,
    contrastText: whitePaint,
  },
  warning: {
    light: warningPaint,
    main: warningPaint,
    dark: warningPaint,
    contrastText: whitePaint,
  },
  error: {
    light: errorPaint,
    main: errorPaint,
    dark: errorPaint,
    contrastText: whitePaint,
  },
  success: {
    light: successPaint,
    main: successPaint,
    dark: successPaint,
    contrastText: whitePaint,
  },
  text: {
    primary: textPrimaryPaint,
    secondary: textSecondaryPaint,
    disabled: textDisabledPaint,
  },
  background: {
    default: backgroundPaint,
    paper: whitePaint,
  },
  divider: dividerPaint,
}

export const LIGHT = 300
export const REGULAR = 400
export const MEDIUM = 500
export const BOLD = 700

export const headline1: PlainTextStyle = {
  fontFamily: null,
  fontWeight: LIGHT,
  fontSize: 96,
  lineHeight: 1.2,
  letterSpacing: -1.5,
  lineBreak: 'BREAK',
  textAlignHorizontal: 'LEFT',
  textAlignVertical: 'CENTER',
  fills: [textPrimaryThemePaint],
}

export const headline2: PlainTextStyle = {
  fontFamily: null,
  fontWeight: LIGHT,
  fontSize: 60,
  lineHeight: 1.2,
  letterSpacing: -0.5,
  lineBreak: 'BREAK',
  textAlignHorizontal: 'LEFT',
  textAlignVertical: 'CENTER',
  fills: [textPrimaryThemePaint],
}

export const headline3: PlainTextStyle = {
  fontFamily: null,
  fontWeight: REGULAR,
  fontSize: 48,
  lineHeight: 1.2,
  letterSpacing: 0,
  lineBreak: 'BREAK',
  textAlignHorizontal: 'LEFT',
  textAlignVertical: 'CENTER',
  fills: [textPrimaryThemePaint],
}

export const headline4: PlainTextStyle = {
  fontFamily: null,
  fontWeight: REGULAR,
  fontSize: 34,
  lineHeight: 1.2,
  letterSpacing: 0.25,
  lineBreak: 'BREAK',
  textAlignHorizontal: 'LEFT',
  textAlignVertical: 'CENTER',
  fills: [textPrimaryThemePaint],
}

export const headline5: PlainTextStyle = {
  fontFamily: null,
  fontWeight: REGULAR,
  fontSize: 24,
  lineHeight: 1.2,
  letterSpacing: 0,
  lineBreak: 'BREAK',
  textAlignHorizontal: 'LEFT',
  textAlignVertical: 'CENTER',
  fills: [textPrimaryThemePaint],
}

export const headline6: PlainTextStyle = {
  fontFamily: null,
  fontWeight: MEDIUM,
  fontSize: 20,
  lineHeight: 1.2,
  letterSpacing: 0.15,
  lineBreak: 'BREAK',
  textAlignHorizontal: 'LEFT',
  textAlignVertical: 'CENTER',
  fills: [textPrimaryThemePaint],
}

export const subtitle1: PlainTextStyle = {
  fontFamily: null,
  fontWeight: REGULAR,
  fontSize: 16,
  lineHeight: 1.2,
  letterSpacing: 0.15,
  lineBreak: 'BREAK',
  textAlignHorizontal: 'LEFT',
  textAlignVertical: 'CENTER',
  fills: [textPrimaryThemePaint],
}

export const subtitle2: PlainTextStyle = {
  fontFamily: null,
  fontWeight: MEDIUM,
  fontSize: 14,
  lineHeight: 1.2,
  letterSpacing: 0.1,
  lineBreak: 'BREAK',
  textAlignHorizontal: 'LEFT',
  textAlignVertical: 'CENTER',
  fills: [textPrimaryThemePaint],
}

export const body1: PlainTextStyle = {
  fontFamily: null,
  fontWeight: REGULAR,
  fontSize: 16,
  lineHeight: 1.2,
  letterSpacing: 0.5,
  lineBreak: 'BREAK',
  textAlignHorizontal: 'LEFT',
  textAlignVertical: 'CENTER',
  fills: [textPrimaryThemePaint],
}

export const body2: PlainTextStyle = {
  fontFamily: null,
  fontWeight: REGULAR,
  fontSize: 14,
  lineHeight: 1.2,
  letterSpacing: 0.25,
  lineBreak: 'BREAK',
  textAlignHorizontal: 'LEFT',
  textAlignVertical: 'CENTER',
  fills: [textPrimaryThemePaint],
}

export const button: PlainTextStyle = {
  fontFamily: null,
  fontWeight: MEDIUM,
  fontSize: 14,
  lineHeight: 1.2,
  letterSpacing: 1.25,
  lineBreak: 'BREAK',
  textAlignHorizontal: 'LEFT',
  textAlignVertical: 'CENTER',
  fills: [textPrimaryThemePaint],
}

export const caption: PlainTextStyle = {
  fontFamily: null,
  fontWeight: REGULAR,
  fontSize: 12,
  lineHeight: 1.2,
  letterSpacing: 0.4,
  lineBreak: 'BREAK',
  textAlignHorizontal: 'LEFT',
  textAlignVertical: 'CENTER',
  fills: [textPrimaryThemePaint],
}

export const overline: PlainTextStyle = {
  fontFamily: null,
  fontWeight: REGULAR,
  fontSize: 10,
  lineHeight: 1.2,
  letterSpacing: 1.5,
  lineBreak: 'BREAK',
  textAlignHorizontal: 'LEFT',
  textAlignVertical: 'CENTER',
  fills: [textPrimaryThemePaint],
}

type Text = {
  headline1: PlainTextStyle
  headline2: PlainTextStyle
  headline3: PlainTextStyle
  headline4: PlainTextStyle
  headline5: PlainTextStyle
  headline6: PlainTextStyle
  subtitle1: PlainTextStyle
  subtitle2: PlainTextStyle
  body1: PlainTextStyle
  body2: PlainTextStyle
  button: PlainTextStyle
  caption: PlainTextStyle
  overline: PlainTextStyle
}

const defaultText: Text = {
  headline1,
  headline2,
  headline3,
  headline4,
  headline5,
  headline6,
  subtitle1,
  subtitle2,
  body1,
  body2,
  button,
  caption,
  overline,
}

export const SPACING_UNIT = 12

const defaultTheme: ThemeProps = {
  palette: defaultPalette,
  text: defaultText,
  spacing: SPACING_UNIT,
}

export default defaultTheme
