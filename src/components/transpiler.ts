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
  AxisAlign,
  AxisDistribute,
  Color,
  SizingMode,
  SolidPaint,
  TextStyle,
} from '@funii-inc/funii-assist-types'

class ReactStyleTranspiler {
  constructor(pxUnit = 10) {
    this.pxUnit = pxUnit
  }

  pxUnit: number

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

  toCssWidth = (width: number | null, sizingMode: SizingMode) => {
    let cssWidth: Property.Width = 'auto'
    if (sizingMode === 'FIXED' && width) {
      cssWidth = `${width / this.pxUnit}rem`
    }
    if (sizingMode === 'STRETCH') {
      cssWidth = `100%`
    }
    return cssWidth
  }

  toCssHeight = (height: number | null, sizingMode: SizingMode) => {
    let cssHeight: Property.Height = 'auto'
    if (sizingMode === 'FIXED' && height) {
      cssHeight = `${height / this.pxUnit}rem`
    }
    if (sizingMode === 'STRETCH') {
      cssHeight = `100%`
    }
    return cssHeight
  }

  toCssBorder = (stroke: SolidPaint | null, strokeWeight: number): Property.Border => {
    if (!stroke || strokeWeight === 0) {
      return 'none'
    }
    const borderColor = this.toCssColor(stroke.color)
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

  toCssTextStyle = (textStyle: TextStyle) => {
    const textAlign = this.toCssTextAlign(textStyle.textAlignHorizontal)
    const verticalAlign = this.toCssVerticalAlign(textStyle.textAlignVertical)

    const style: React.CSSProperties = {
      fontFamily: textStyle.fontFamily ?? undefined,
      fontWeight: textStyle.fontWeight,
      fontSize: `${textStyle.fontSize / this.pxUnit}rem`,
      lineHeight: textStyle.lineHeight,
      letterSpacing: textStyle.letterSpacing,
      textAlign,
      verticalAlign,
      color: textStyle.fills.length > 0 ? this.toCssColor(textStyle.fills[0].color) : 'black',
      wordBreak: 'break-word', // MEMO: ここの制御をどうするか考えないといけない
    }

    if (textStyle.lineBreak === 'BREAK') {
      style['wordBreak'] = 'break-all'
    }

    if (textStyle.lineBreak === 'NO_BREAK') {
      style['whiteSpace'] = 'nowrap'
    }

    return style
  }

  typographyTranspile = (node: AppV1_Typography) => {
    const width = this.toCssWidth(node.size.width, node.horizontalAxisSizingMode)
    const height = this.toCssHeight(node.size.height, node.verticalAxisSizingMode)

    const textStyle = this.toCssTextStyle(node.textStyle)
    const padding = this.toCssPadding(node.padding)

    const containerStyle: React.CSSProperties = {
      width,
      height,
      padding,
    }

    if (node.verticalAxisSizingMode === 'FIXED' || node.verticalAxisSizingMode === 'STRETCH') {
      containerStyle['overflowY'] = 'hidden'
    }

    if (node.horizontalAxisSizingMode === 'FIXED' || node.horizontalAxisSizingMode === 'STRETCH') {
      containerStyle['overflowX'] = 'hidden'
    }

    const typographyStyle: React.CSSProperties = {
      ...textStyle,
      width: '100%', // サイズはcontainerで指定する
      height: '100%', // サイズはcontainerで指定する
    }

    return { containerStyle, typographyStyle }
  }

  // FIXME: SizingModeがFIXEDの時は正しく表示されないので修正する必要がある
  imageTranspile = (node: AppV1_Image, imageURL?: string) => {
    const width = this.toCssWidth(node.size.width, node.horizontalAxisSizingMode)
    const height = this.toCssHeight(node.size.height, node.verticalAxisSizingMode)

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

    // const padding = this.toCssPadding(node.padding)
    const borderRadius = this.toCssBorderRadius(node.cornerRadius)

    const imagesStyle: React.CSSProperties = {
      overflow: 'hidden',
      position: 'relative',
      width,
      height,
      // padding,
      borderRadius,
      backgroundColor: node.fills.length > 0 ? this.toCssColor(node.fills[0].color) : 'transparent',
    }

    const imageStyle: React.CSSProperties = {
      width: '100%', // サイズはcontainerで指定する
      height: '100%', // サイズはcontainerで指定する
      background: imageURL ? `url(${imageURL})` : undefined,
      backgroundPosition,
      backgroundSize,
      backgroundRepeat: 'no-repeat',
    }

    return { imagesStyle, imageStyle }
  }

  spaceTranspile = (node: AppV1_Space) => {
    const style: React.CSSProperties = {
      width: `${node.size / this.pxUnit}rem`,
      height: `${node.size / this.pxUnit}rem`,
    }
    return style
  }

  buttonTranspile = (node: AppV1_Button) => {
    const width = this.toCssWidth(node.size.width, node.horizontalAxisSizingMode)
    const height = this.toCssHeight(node.size.height, node.verticalAxisSizingMode)

    // FIXME: AxisSizingModeがFIXEDで幅が小さい時の対応どうするか考えないといけない
    const paddingHorizontal = `${node.shapeHorizontalSpacing / this.pxUnit}rem`
    const paddingVertical = `${node.shapeVerticalSpacing / this.pxUnit}rem`
    const borderRadius = this.toCssBorderRadius(node.cornerRadius)
    const border = this.toCssBorder(node.stroke, node.strokeWeight)

    // const textAlign = this.toCssTextAlign(node.textStyle.textAlignHorizontal)
    // const verticalAlign = this.toCssVerticalAlign(node.textStyle.textAlignVertical)
    const textJustifyContent = this.toCssJustifyContent(node.textStyle.textAlignHorizontal)
    const textAlignItem = this.toCssAlignItems(node.textStyle.textAlignVertical)

    const justifyContent = this.toCssJustifyContent(node.shapeAlignHorizontal)
    const alignItems = this.toCssAlignItems(node.shapeAlignVertical)
    const padding = this.toCssPadding(node.padding)

    const containerStyle: React.CSSProperties = {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent,
      alignItems,
      padding,
    }

    const buttonStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: textAlignItem,
      justifyContent: textJustifyContent,
      width,
      height,
      padding: `${paddingVertical} ${paddingHorizontal}`,
      borderRadius,
      border,
      backgroundColor: node.fills.length > 0 ? this.toCssColor(node.fills[0].color) : 'black',
    }

    const iconStyle: React.CSSProperties = {
      width: `${node.textStyle.fontSize / this.pxUnit}rem`,
      height: `${node.textStyle.fontSize / this.pxUnit}rem`,
      fontSize: `${node.textStyle.fontSize / this.pxUnit}rem`,
      // FIXME: iconコンポーネントを実装したらbackgroundColorをcolorに変える。
      // color: node.textStyle.fills.length > 0 ? this.toCSSColor(node.textStyle.fills[0].color) : 'black',
      backgroundColor: node.textStyle.fills.length > 0 ? this.toCssColor(node.textStyle.fills[0].color) : 'black',
    }

    const typographyStyle: React.CSSProperties = {
      ...this.toCssTextStyle(node.textStyle),
      textAlign: 'center', // buttonStyleで制御する
      verticalAlign: 'center', // buttonStyleで制御する
    }

    return { containerStyle, buttonStyle, iconStyle, typographyStyle }
  }

  listTranspile = (node: AppV1_List) => {
    const width = this.toCssWidth(node.size.width, node.layoutMode === 'HORIZONTAL' ? node.primaryAxisSizingMode : node.counterAxisSizingMode)
    const height = this.toCssHeight(node.size.height, node.layoutMode === 'VERTICAL' ? node.primaryAxisSizingMode : node.counterAxisSizingMode)

    const listPadding = this.toCssPadding(node.listSpacing)

    const justifyContent = this.toCssJustifyContent(node.listAlignHorizontal)
    const alignItems = this.toCssAlignItems(node.listAlignVertical)

    const borderRadius = this.toCssBorderRadius(node.cornerRadius)
    const border = this.toCssBorder(node.stroke, node.strokeWeight)
    const padding = this.toCssPadding(node.padding)

    const listAlignItems = this.toCssAlignItems(node.primaryAxisAlign)
    const listAlignContent = this.toCssAlignContent(node.counterAxisDistribute)

    const containerStyle: React.CSSProperties = {
      width: '100%',
      display: 'flex',
      justifyContent,
      alignItems,
      padding,
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
      backgroundColor: node.fills.length > 0 ? this.toCssColor(node.fills[0].color) : 'transparent',
      borderRadius,
      border,
    }

    return { containerStyle, listStyle }
  }

  listItemTranspile = (node: AppV1_ListItem) => {
    const width = this.toCssWidth(node.size.width, node.horizontalAxisSizingMode)
    const height = this.toCssHeight(node.size.height, node.verticalAxisSizingMode)

    const itemPaddingHorizontal = `${node.shapeHorizontalSpacing / this.pxUnit}rem`
    const itemPaddingVertical = `${node.shapeVerticalSpacing / this.pxUnit}rem`

    const borderRadius = this.toCssBorderRadius(node.cornerRadius)

    const justifyContent = this.toCssJustifyContent(node.shapeAlignHorizontal)
    const alignItems = this.toCssAlignItems(node.shapeAlignVertical)
    const padding = this.toCssPadding(node.padding)

    const containerStyle: React.CSSProperties = {
      width: '100%',
      display: 'flex',
      justifyContent,
      alignItems,
      padding,
    }

    const listItemStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width,
      height,
      padding: `${itemPaddingVertical} ${itemPaddingHorizontal}`,
      backgroundColor: node.fills.length > 0 ? this.toCssColor(node.fills[0].color) : 'transparent',
      borderRadius,
    }

    const iconStyle: React.CSSProperties = {
      width: `${node.primaryTextStyle.fontSize / this.pxUnit}rem`,
      height: `${node.primaryTextStyle.fontSize / this.pxUnit}rem`,
      fontSize: `${node.primaryTextStyle.fontSize / this.pxUnit}rem`,
      // FIXME: iconコンポーネントを実装したらbackgroundColorをcolorに変える。
      // color: node.textStyle.fills.length > 0 ? this.toCSSColor(node.textStyle.fills[0].color) : 'black',
      backgroundColor: node.primaryTextStyle.fills.length > 0 ? this.toCssColor(node.primaryTextStyle.fills[0].color) : 'black',
    }

    const primaryTextStyle: React.CSSProperties = this.toCssTextStyle(node.primaryTextStyle)
    const secondaryTextStyle: React.CSSProperties = this.toCssTextStyle(node.secondaryTextStyle)

    return { containerStyle, listItemStyle, iconStyle, primaryTextStyle, secondaryTextStyle }
  }

  frameTranspile = (node: AppV1_Frame) => {
    const width = this.toCssWidth(node.size.width, node.layoutMode === 'HORIZONTAL' ? node.primaryAxisSizingMode : node.counterAxisSizingMode)
    const height = this.toCssHeight(node.size.height, node.layoutMode === 'VERTICAL' ? node.primaryAxisSizingMode : node.counterAxisSizingMode)
    const framePadding = this.toCssPadding(node.frameSpacing)

    const justifyContent = this.toCssJustifyContent(node.frameAlignHorizontal)
    const alignItems = this.toCssAlignItems(node.frameAlignVertical)

    const borderRadius = this.toCssBorderRadius(node.cornerRadius)
    const border = this.toCssBorder(node.stroke, node.strokeWeight)
    const padding = this.toCssPadding(node.padding)

    const frameAlignItems = this.toCssAlignItems(node.primaryAxisAlign)
    const frameAlignContent = this.toCssAlignContent(node.counterAxisDistribute)

    const containerStyle: React.CSSProperties = {
      width: '100%',
      display: 'flex',
      justifyContent,
      alignItems,
      padding,
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
      backgroundColor: node.fills.length > 0 ? this.toCssColor(node.fills[0].color) : 'transparent',
      borderRadius,
      border,
    }

    return { containerStyle, frameStyle }
  }
}

const transpiler = new ReactStyleTranspiler()
export default transpiler
