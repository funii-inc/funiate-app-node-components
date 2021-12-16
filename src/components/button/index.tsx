import React from 'react'
import styled from 'styled-components'
import { AppV1_Button } from '@funii-inc/funii-assist-types'
import { ComponentProps } from '../props'
import { useCallableActions, useExistValidActions } from '../hooks'
import transpiler from '../transpiler'
import { calcText } from '../calc'
import defaultTheme from '../defaultTheme'

const Button = ({ node, fullWidth = true, theme = defaultTheme, actionHandler, paths = [], mergedTableRecord }: ComponentProps<AppV1_Button>) => {
  const onCall = useCallableActions(actionHandler)
  const exist = useExistValidActions(paths)

  if (!node.visible) {
    return null
  }

  return (
    <div style={transpiler.buttonTranspile(node, fullWidth, theme).containerStyle}>
      <BaseButton
        data-existlink={exist(node.actions)}
        onClick={() => onCall(node.actions)}
        style={transpiler.buttonTranspile(node, fullWidth, theme).buttonStyle}
      >
        {node.icon && <div style={transpiler.buttonTranspile(node, fullWidth, theme).iconStyle} />}
        {node.icon && calcText(node.text, { mergedTableRecord }).length > 0 && <div style={{ width: node.itemSpacing }} />}
        <Typography style={transpiler.buttonTranspile(node, fullWidth, theme).typographyStyle}>{calcText(node.text, { mergedTableRecord })}</Typography>
      </BaseButton>
    </div>
  )
}

const BaseButton = styled.button`
  &[data-existlink='true'] {
    cursor: pointer;
  }
`

const Typography = styled.p`
  white-space: pre-wrap;
`

export default Button
