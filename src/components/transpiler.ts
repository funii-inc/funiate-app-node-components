import React from 'react'
import { Property } from 'csstype'
import {
  AlignHorizontal,
  AlignVertical,
  AppV1_Button,
  AppV1_Frame,
  AppV1_Image,
  AppV1_List,
  AppV1_ListItem,
  AppV1_Space,
  AppV1_Typography,
  ThemeProps,
  AxisAlign,
  AxisDistribute,
  Color,
  SizingMode,
  SolidPaint,
  Paint,
  PlainTextStyle,
  TextStyle,
  ThemeTextStyle,
} from '@funii-inc/funii-assist-types'
import _defaultTheme from './defaultTheme'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isThemeTextStyle = (arg: any): arg is ThemeTextStyle => {
  return arg.keys !== undefined
}

class ReactStyleTranspiler {
  constructor(pxUnit = 10, defaultTheme = _defaultTheme) {
    this.pxUnit = pxUnit
    this.defaultTheme = defaultTheme
  }

  pxUnit: number
  defaultTheme: ThemeProps

  private isHex = (value: string) => {
    return value.charAt(0) === '#'
  }

  private isRgba = (value: string) => {
    const reg = /^rgba?\(.*\)$/
    return reg.test(value)
  }

  private hexToColor = (hex: string, a?: number) => {
    const nakedHex = hex.charAt(0) === '#' ? hex.slice(1) : hex
    const isShort = nakedHex.length === 3 || nakedHex.length === 4

    const twoDigitHexR = isShort ? `${nakedHex.slice(0, 1)}${nakedHex.slice(0, 1)}` : nakedHex.slice(0, 2)
    const twoDigitHexG = isShort ? `${nakedHex.slice(1, 2)}${nakedHex.slice(1, 2)}` : nakedHex.slice(2, 4)
    const twoDigitHexB = isShort ? `${nakedHex.slice(2, 3)}${nakedHex.slice(2, 3)}` : nakedHex.slice(4, 6)
    const twoDigitHexA = (isShort ? `${nakedHex.slice(3, 4)}${nakedHex.slice(3, 4)}` : nakedHex.slice(6, 8)) || 'ff'

    const decimalObject = {
      r: parseInt(twoDigitHexR, 16),
      g: parseInt(twoDigitHexG, 16),
      b: parseInt(twoDigitHexB, 16),
      a: +(parseInt(twoDigitHexA, 16) / 255).toFixed(2),
    }

    const _a: number = a && isFinite(a) ? a : decimalObject.a

    return { ...decimalObject, a: _a }
  }

  private rgbaToColor = (rgba: string, a?: number) => {
    const regExp = /^rgba?\( *([+-]?\d*\.?\d+) *, *([+-]?\d*\.?\d+) *, *([+-]?\d*\.?\d+)(?: *, *([+-]?\d*\.?\d+) *)?\)$/
    const result = regExp.exec(rgba)
    if (!result) {
      throw Error('invalid input rgba value.')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, resultR, resultG, resultB, resultA] = result

    const decimalObject = {
      r: parseInt(resultR),
      g: parseInt(resultG),
      b: parseInt(resultB),
      a: resultA === undefined ? 1 : parseFloat(resultA),
    }

    const _a = a && isFinite(a) ? a : decimalObject.a

    if (isNaN(decimalObject.a) || isNaN(decimalObject.g) || isNaN(decimalObject.b) || isNaN(_a)) {
      throw Error('invalid input rgba value.')
    }

    return { ...decimalObject, a: _a }
  }

  toCalcPaint = (paint: Paint, theme = this.defaultTheme) => {
    if (paint.type === 'SOLID') {
      return paint
    }

    const plainPaint = paint.keys.reduce((prev, crt) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return prev![crt as keyof typeof prev]
    }, theme['palette'])

    return plainPaint as unknown as SolidPaint
  }

  toCalcTextStyle = (textStyle: TextStyle, theme = this.defaultTheme) => {
    if (!isThemeTextStyle(textStyle)) {
      // const calcTextStyle: PlainTextStyle = {
      //   ...textStyle,
      //   fills: textStyle.fills.map((fill) => this.toCalcPaint(fill)),
      // }
      // return calcTextStyle
      return textStyle
    }

    const plainTextStyle = textStyle.keys.reduce((prev, crt) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return prev![crt as keyof typeof prev]
    }, theme['text'])

    const calcTextStyle: PlainTextStyle = {
      ...(plainTextStyle as unknown as PlainTextStyle),
      // fills: (plainTextStyle as unknown as PlainTextStyle).fills.map((fill) => this.toCalcPaint(fill)),
    }

    return calcTextStyle
  }

  toCssColor = (color: Color): Property.Color => {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
  }

  toColor = (colorCode: string, a?: number) => {
    if (this.isHex(colorCode)) {
      return this.hexToColor(colorCode, a)
    }

    if (this.isRgba(colorCode)) {
      return this.rgbaToColor(colorCode, a)
    }

    throw Error('invalid input color-code.')
  }

  toCssPadding = (padding: number[]): Property.Padding => {
    let cssPadding = ''
    padding.forEach((num, index) => {
      if (index === padding.length - 1) {
        cssPadding += `${num / this.pxUnit}rem`
        return
      }
      cssPadding += `${num / this.pxUnit}rem `
    })
    return cssPadding
  }

  toCssBorderRadius = (cornerRadius: number[]): Property.BorderRadius => {
    let borderRadius = ''
    cornerRadius.forEach((num, index) => {
      if (index === cornerRadius.length - 1) {
        borderRadius += `${num / this.pxUnit}rem`
        return
      }
      borderRadius += `${num / this.pxUnit}rem `
    })
    return borderRadius
  }

  toCssHeight = (height: number | null, sizingMode: SizingMode, py?: number) => {
    let cssHeight: Property.Height = 'auto'
    if (sizingMode === 'FIXED' && height) {
      cssHeight = `${(height + (py ?? 0)) / this.pxUnit}rem`
    }
    if (sizingMode === 'STRETCH') {
      cssHeight = `100%`
    }
    return cssHeight
  }

  toCssWidth = (width: number | null, sizingMode: SizingMode, px?: number) => {
    let cssWidth: Property.Width = 'auto'
    if (sizingMode === 'FIXED' && width) {
      cssWidth = `${(width + (px ?? 0)) / this.pxUnit}rem`
    }
    if (sizingMode === 'STRETCH') {
      cssWidth = `100%`
    }
    return cssWidth
  }

  toCssBorder = (stroke: Paint | null, strokeWeight: number, theme = this.defaultTheme): Property.Border => {
    if (!stroke || strokeWeight === 0) {
      return 'none'
    }
    const plainStroke = this.toCalcPaint(stroke, theme)
    const borderColor = this.toCssColor(plainStroke.color)
    const border = `${strokeWeight / this.pxUnit}rem solid ${borderColor}`
    return border
  }

  toCssTextAlign = (alignHorizontal: AlignHorizontal): Property.TextAlign => {
    let textAlign: Property.TextAlign = 'left'
    if (alignHorizontal === 'CENTER') {
      textAlign = 'center'
    }
    if (alignHorizontal === 'RIGHT') {
      textAlign = 'right'
    }
    return textAlign
  }

  toCssVerticalAlign = (alignVertical: AlignVertical): Property.VerticalAlign => {
    let verticalAlign: Property.VerticalAlign = 'top'
    if (alignVertical === 'CENTER') {
      verticalAlign = ' middle'
    }
    if (alignVertical === 'BOTTOM') {
      verticalAlign = 'bottom'
    }
    return verticalAlign
  }

  toCssJustifyContent = (alignHorizontal: AlignHorizontal | AxisAlign): Property.JustifyContent => {
    let justifyContent: Property.JustifyContent = 'flex-start'
    if (alignHorizontal === 'CENTER') {
      justifyContent = 'center'
    }
    if (alignHorizontal === 'RIGHT' || alignHorizontal === 'END') {
      justifyContent = 'flex-end'
    }
    return justifyContent
  }

  toCssAlignItems = (alignVertical: AlignVertical | AxisAlign): Property.AlignItems => {
    let alignItems: Property.AlignItems = 'start'
    if (alignVertical === 'CENTER') {
      alignItems = 'center'
    }
    if (alignVertical === 'BOTTOM' || alignVertical === 'END') {
      alignItems = 'end'
    }
    return alignItems
  }

  toCssAlignContent = (axisDistribute: AxisDistribute): Property.AlignContent => {
    let alignContent: Property.AlignContent = 'start'
    if (axisDistribute === 'CENTER') {
      alignContent = 'center'
    }
    if (axisDistribute === 'END') {
      alignContent = 'end'
    }
    if (axisDistribute === 'SPACE_BETWEEN') {
      alignContent = 'space-between'
    }
    if (axisDistribute === 'SPACE_AROUND') {
      alignContent = 'space-around'
    }
    return alignContent
  }

  toCssTextStyle = (textStyle: TextStyle, theme = this.defaultTheme) => {
    const plainTextStyle = this.toCalcTextStyle(textStyle, theme)
    const textAlign = this.toCssTextAlign(plainTextStyle.textAlignHorizontal)
    const verticalAlign = this.toCssVerticalAlign(plainTextStyle.textAlignVertical)

    const style: React.CSSProperties = {
      fontFamily: plainTextStyle.fontFamily ?? undefined,
      fontWeight: plainTextStyle.fontWeight,
      fontSize: `${plainTextStyle.fontSize / this.pxUnit}rem`,
      lineHeight: plainTextStyle.lineHeight,
      letterSpacing: plainTextStyle.letterSpacing,
      textAlign,
      verticalAlign,
      color: plainTextStyle.fills.length > 0 ? this.toCssColor(plainTextStyle.fills[0].color) : 'black',
      wordBreak: 'break-word', // MEMO: ここの制御をどうするか考えないといけない
    }

    if (plainTextStyle.lineBreak === 'BREAK') {
      style['wordBreak'] = 'break-all'
    }

    if (plainTextStyle.lineBreak === 'NO_BREAK') {
      style['whiteSpace'] = 'nowrap'
    }

    return style
  }

  typographyTranspile = (node: AppV1_Typography, fullWidth?: boolean, theme = this.defaultTheme) => {
    const px = node.padding[1] + node.padding[3]
    const py = node.padding[0] + node.padding[2]
    const containerWidth = fullWidth ? '100%' : this.toCssWidth(node.size.width, node.horizontalAxisSizingMode, px)
    const containerHeight = this.toCssHeight(node.size.height, node.verticalAxisSizingMode, py)
    const containerPadding = this.toCssPadding(node.padding)

    const width = this.toCssWidth(node.size.width, node.horizontalAxisSizingMode)
    const textStyle = this.toCssTextStyle(node.textStyle, theme)

    const containerStyle: React.CSSProperties = {
      flexShrink: 0,
      width: containerWidth,
      overflowX: 'hidden',
      height: containerHeight,
      padding: containerPadding,
    }

    if (node.verticalAxisSizingMode === 'FIXED' || node.verticalAxisSizingMode === 'STRETCH') {
      containerStyle['overflowY'] = 'hidden'
    }

    const typographyStyle: React.CSSProperties = {
      ...textStyle,
      width,
      height: 'auto', // 高さはcontainerに任せる
    }

    return { containerStyle, typographyStyle }
  }

  imageTranspile = (node: AppV1_Image, imageURL?: string, fullWidth?: boolean, theme = this.defaultTheme) => {
    const px = node.padding[1] + node.padding[3]
    const py = node.padding[0] + node.padding[2]
    const containerWidth = fullWidth ? '100%' : this.toCssWidth(node.size.width, node.horizontalAxisSizingMode, px)
    const containerHeight = this.toCssHeight(node.size.height, node.verticalAxisSizingMode, py)
    const containerPadding = this.toCssPadding(node.padding)

    const width = this.toCssWidth(node.size.width, node.horizontalAxisSizingMode)

    const backgroundPosition = 'center'
    // if (node.imageStyle.imageAlignVertical === 'CENTER') {
    //   backgroundPosition = 'top 50%'
    // }
    // if (node.imageStyle.imageAlignVertical === 'TOP') {
    //   backgroundPosition = 'top 0%'
    // }
    // if (node.imageStyle.imageAlignVertical === 'BOTTOM') {
    //   backgroundPosition = 'bottom 0%'
    // }
    // if (node.imageStyle.imageAlignHorizontal === 'CENTER') {
    //   backgroundPosition += ' left 50%'
    // }
    // if (node.imageStyle.imageAlignHorizontal === 'LEFT') {
    //   backgroundPosition += ' left 0%'
    // }
    // if (node.imageStyle.imageAlignHorizontal === 'RIGHT') {
    //   backgroundPosition += ' right 0%'
    // }

    let backgroundSize = 'contain'
    if (node.scaleMode === 'FILL') {
      backgroundSize = 'cover'
    }

    const borderRadius = this.toCssBorderRadius(node.cornerRadius)

    const containerStyle: React.CSSProperties = {
      flexShrink: 0,
      flexGrow: 0,
      width: containerWidth,
      overflowX: 'hidden',
      height: containerHeight,
      padding: containerPadding,
    }

    if (node.verticalAxisSizingMode === 'FIXED' || node.verticalAxisSizingMode === 'STRETCH') {
      containerStyle['overflowY'] = 'hidden'
    }

    const imagesStyle: React.CSSProperties = {
      position: 'relative',
      width,
      height: '100%', // 高さはcontainerに任せる
      overflow: 'hidden',
      borderRadius,
      backgroundColor: node.fills.length > 0 ? this.toCssColor(this.toCalcPaint(node.fills[0], theme).color) : 'transparent',
    }

    // MEMO: 幅が%だとflexでの制御ができないのでmarginで制御している。(position(relative - absolute)を利用しているので消える)
    if (node.imageAlignHorizontal === 'LEFT') {
      imagesStyle['marginRight'] = 'auto'
    }
    if (node.imageAlignHorizontal === 'CENTER') {
      imagesStyle['marginRight'] = 'auto'
      imagesStyle['marginLeft'] = 'auto'
    }
    if (node.imageAlignHorizontal === 'RIGHT') {
      imagesStyle['marginLeft'] = 'auto'
    }

    const imageStyle: React.CSSProperties = {
      width: '100%', // 幅はimagesに任せる
      height: '100%', // 高さはimagesに任せる
      background: imageURL ? `url(${imageURL})` : undefined,
      backgroundPosition,
      backgroundSize,
      backgroundRepeat: 'no-repeat',
    }

    return { containerStyle, imagesStyle, imageStyle }
  }

  spaceTranspile = (node: AppV1_Space) => {
    const style: React.CSSProperties = {
      flexShrink: 0,
      width: `${node.size / this.pxUnit}rem`,
      height: `${node.size / this.pxUnit}rem`,
    }
    return style
  }

  buttonTranspile = (node: AppV1_Button, fullWidth?: boolean, theme = this.defaultTheme) => {
    const calcTextStyle = this.toCalcTextStyle(node.textStyle, theme)

    const px = node.padding[1] + node.padding[3]
    const containerWidth = fullWidth ? '100%' : this.toCssWidth(node.size.width, node.horizontalAxisSizingMode, px)
    const containerJustifyContent = this.toCssJustifyContent(node.shapeAlignHorizontal)
    const containerAlignItems = this.toCssAlignItems(node.shapeAlignVertical)
    const containerPadding = this.toCssPadding(node.padding)

    const buttonWidth = this.toCssWidth(node.size.width, node.horizontalAxisSizingMode)
    const buttonHeight = this.toCssHeight(node.size.height, node.verticalAxisSizingMode)
    const buttonTextJustifyContent = this.toCssJustifyContent(calcTextStyle.textAlignHorizontal)
    const buttonTextAlignItem = this.toCssAlignItems(calcTextStyle.textAlignVertical)
    const buttonPx = `${node.shapeHorizontalSpacing / this.pxUnit}rem` // FIXME: AxisSizingModeがFIXEDで幅が小さい時の対応どうするか考えないといけない
    const buttonPy = `${node.shapeVerticalSpacing / this.pxUnit}rem` // FIXME: AxisSizingModeがFIXEDで幅が小さい時の対応どうするか考えないといけない
    const buttonBorderRadius = this.toCssBorderRadius(node.cornerRadius)
    const buttonBorder = this.toCssBorder(node.stroke, node.strokeWeight, theme)

    const containerStyle: React.CSSProperties = {
      flexShrink: 0,
      width: containerWidth,
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: containerJustifyContent,
      alignItems: containerAlignItems,
      padding: containerPadding,
    }

    const buttonStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: buttonTextAlignItem,
      justifyContent: buttonTextJustifyContent,
      width: buttonWidth,
      height: buttonHeight,
      padding: `${buttonPy} ${buttonPx}`,
      borderRadius: buttonBorderRadius,
      border: buttonBorder,
      backgroundColor: node.fills.length > 0 ? this.toCssColor(this.toCalcPaint(node.fills[0]).color) : 'black',
    }

    //MEMO: 2021/12/13 textStyleの部分で、新しいテーマ設定の型と競合しており、エラー回避のため無理矢理　PlainTextStyle　の型を当てはめています。
    const iconStyle: React.CSSProperties = {
      width: `${calcTextStyle.fontSize / this.pxUnit}rem`,
      height: `${calcTextStyle.fontSize / this.pxUnit}rem`,
      fontSize: `${calcTextStyle.fontSize / this.pxUnit}rem`,
      // FIXME: iconコンポーネントを実装したらbackgroundColorをcolorに変える。
      // color: node.textStyle.fills.length > 0 ? this.toCSSColor(node.textStyle.fills[0].color) : 'black',
      backgroundColor: calcTextStyle.fills.length > 0 ? this.toCssColor(calcTextStyle.fills[0].color) : 'black',
    }

    const typographyStyle: React.CSSProperties = {
      ...this.toCssTextStyle(node.textStyle, theme),
      textAlign: 'center', // buttonStyleで制御する
      verticalAlign: 'center', // buttonStyleで制御する
    }

    return { containerStyle, buttonStyle, iconStyle, typographyStyle }
  }

  listTranspile = (node: AppV1_List, fullWidth?: boolean, theme = this.defaultTheme) => {
    const px = node.padding[1] + node.padding[3]
    const containerWidth = fullWidth
      ? '100%'
      : this.toCssWidth(node.size.width, node.layoutMode === 'HORIZONTAL' ? node.primaryAxisSizingMode : node.counterAxisSizingMode, px)
    const containerJustifyContent = this.toCssJustifyContent(node.listAlignHorizontal)
    const containerAlignItems = this.toCssAlignItems(node.listAlignVertical)
    const containerPadding = this.toCssPadding(node.padding)

    const width = this.toCssWidth(node.size.width, node.layoutMode === 'HORIZONTAL' ? node.primaryAxisSizingMode : node.counterAxisSizingMode)
    const height = this.toCssHeight(node.size.height, node.layoutMode === 'VERTICAL' ? node.primaryAxisSizingMode : node.counterAxisSizingMode)

    const listPadding = this.toCssPadding(node.listSpacing)

    const borderRadius = this.toCssBorderRadius(node.cornerRadius)
    const border = this.toCssBorder(node.stroke, node.strokeWeight, theme)

    const listAlignItems = this.toCssAlignItems(node.primaryAxisAlign)
    const listAlignContent = this.toCssAlignContent(node.counterAxisDistribute)

    const containerStyle: React.CSSProperties = {
      flexShrink: 0,
      width: containerWidth,
      display: 'flex',
      justifyContent: containerJustifyContent,
      alignItems: containerAlignItems,
      padding: containerPadding,
    }

    const listStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: node.layoutMode === 'HORIZONTAL' ? 'row' : 'column',
      overflowX: node.layoutMode === 'HORIZONTAL' ? 'scroll' : 'auto',
      overflowY: node.layoutMode === 'VERTICAL' ? 'scroll' : 'auto',
      alignItems: listAlignItems,
      alignContent: listAlignContent,
      width,
      height,
      padding: listPadding,
      backgroundColor: node.fills.length > 0 ? this.toCssColor(this.toCalcPaint(node.fills[0]).color) : 'transparent',
      borderRadius,
      border,
    }

    return { containerStyle, listStyle }
  }

  listItemTranspile = (node: AppV1_ListItem, fullWidth?: boolean, theme = this.defaultTheme) => {
    const calcPrimaryTextStyle = this.toCalcTextStyle(node.primaryTextStyle, theme)

    const px = node.padding[1] + node.padding[3]
    const containerWidth = fullWidth ? '100%' : this.toCssWidth(node.size.width, node.horizontalAxisSizingMode, px)
    const containerJustifyContent = this.toCssJustifyContent(node.shapeAlignHorizontal)
    const containerAlignItems = this.toCssAlignItems(node.shapeAlignVertical)
    const containerPadding = this.toCssPadding(node.padding)

    const width = this.toCssWidth(node.size.width, node.horizontalAxisSizingMode)
    const height = this.toCssHeight(node.size.height, node.verticalAxisSizingMode)

    const itemPaddingHorizontal = `${node.shapeHorizontalSpacing / this.pxUnit}rem`
    const itemPaddingVertical = `${node.shapeVerticalSpacing / this.pxUnit}rem`

    const borderRadius = this.toCssBorderRadius(node.cornerRadius)

    const containerStyle: React.CSSProperties = {
      flexShrink: 0,
      width: containerWidth,
      display: 'flex',
      justifyContent: containerJustifyContent,
      alignItems: containerAlignItems,
      padding: containerPadding,
    }

    const listItemStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width,
      height,
      padding: `${itemPaddingVertical} ${itemPaddingHorizontal}`,
      backgroundColor: node.fills.length > 0 ? this.toCssColor(this.toCalcPaint(node.fills[0]).color) : 'transparent',
      borderRadius,
    }

    //MEMO: 2021/12/13 textStyleの部分で、新しいテーマ設定の型と競合しており、エラー回避のため無理矢理　PlainTextStyle　の型を当てはめています。
    const iconStyle: React.CSSProperties = {
      width: `${calcPrimaryTextStyle.fontSize / this.pxUnit}rem`,
      height: `${calcPrimaryTextStyle.fontSize / this.pxUnit}rem`,
      fontSize: `${calcPrimaryTextStyle.fontSize / this.pxUnit}rem`,
      // FIXME: iconコンポーネントを実装したらbackgroundColorをcolorに変える。
      // color: node.textStyle.fills.length > 0 ? this.toCSSColor(node.textStyle.fills[0].color) : 'black',
      backgroundColor: calcPrimaryTextStyle.fills.length > 0 ? this.toCssColor(calcPrimaryTextStyle.fills[0].color) : 'black',
    }

    //MEMO: 2021/12/13 textStyleの部分で、新しいテーマ設定の型と競合しており、エラー回避のため無理矢理　PlainTextStyle　の型を当てはめています。
    const imageIconStyle: React.CSSProperties = {
      width: `${calcPrimaryTextStyle.fontSize / this.pxUnit}rem`,
      height: `${calcPrimaryTextStyle.fontSize / this.pxUnit}rem`,
      fontSize: `${calcPrimaryTextStyle.fontSize / this.pxUnit}rem`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      // FIXME: iconコンポーネントを実装したらbackgroundColorをcolorに変える。
      // color: node.textStyle.fills.length > 0 ? this.toCSSColor(node.textStyle.fills[0].color) : 'black',
      backgroundColor: calcPrimaryTextStyle.fills.length > 0 ? this.toCssColor(calcPrimaryTextStyle.fills[0].color) : 'black',
    }

    const primaryTextStyle: React.CSSProperties = this.toCssTextStyle(node.primaryTextStyle, theme)
    const secondaryTextStyle: React.CSSProperties = this.toCssTextStyle(node.secondaryTextStyle, theme)

    return { containerStyle, listItemStyle, iconStyle, imageIconStyle, primaryTextStyle, secondaryTextStyle }
  }

  frameTranspile = (node: AppV1_Frame, fullWidth?: boolean, theme = this.defaultTheme) => {
    const px = node.padding[1] + node.padding[3]
    const containerWidth = fullWidth
      ? '100%'
      : this.toCssWidth(node.size.width, node.layoutMode === 'HORIZONTAL' ? node.primaryAxisSizingMode : node.counterAxisSizingMode, px)
    const containerJustifyContent = this.toCssJustifyContent(node.frameAlignHorizontal)
    const containerAlignItems = this.toCssAlignItems(node.frameAlignVertical)
    const containerPadding = this.toCssPadding(node.padding)

    const width = this.toCssWidth(node.size.width, node.layoutMode === 'HORIZONTAL' ? node.primaryAxisSizingMode : node.counterAxisSizingMode)
    const height = this.toCssHeight(node.size.height, node.layoutMode === 'VERTICAL' ? node.primaryAxisSizingMode : node.counterAxisSizingMode)
    const framePadding = this.toCssPadding(node.frameSpacing)

    const borderRadius = this.toCssBorderRadius(node.cornerRadius)
    const border = this.toCssBorder(node.stroke, node.strokeWeight, theme)

    const frameAlignItems = this.toCssAlignItems(node.primaryAxisAlign)
    const frameAlignContent = this.toCssAlignContent(node.counterAxisDistribute)

    const containerStyle: React.CSSProperties = {
      flexShrink: 0,
      width: containerWidth,
      display: 'flex',
      justifyContent: containerJustifyContent,
      alignItems: containerAlignItems,
      padding: containerPadding,
    }

    const frameStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: node.layoutMode === 'HORIZONTAL' ? 'row' : 'column',
      overflowX: node.layoutMode === 'HORIZONTAL' ? 'scroll' : 'hidden',
      overflowY: node.layoutMode === 'VERTICAL' ? 'scroll' : 'hidden',
      alignItems: frameAlignItems,
      alignContent: frameAlignContent,
      width,
      height,
      padding: framePadding,
      backgroundColor: node.fills.length > 0 ? this.toCssColor(this.toCalcPaint(node.fills[0]).color) : 'transparent',
      borderRadius,
      border,
    }

    if (node.layoutMode === 'VERTICAL' && width === 'auto') {
      frameStyle['width'] = '100%'
    }

    if (node.layoutMode === 'HORIZONTAL' && width === 'auto') {
      frameStyle['minWidth'] = '100%'
    }

    return { containerStyle, frameStyle }
  }
}

const transpiler = new ReactStyleTranspiler()
export default transpiler
