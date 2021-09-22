import React from 'react'
import styled from 'styled-components'
import { AppV1_Button } from '@party-opu/funii-assist-types'
import { ComponentProps } from '../props'
import { useCallableActions, useExistValidActions } from '../hooks'
import transpiler from '../transpiler'
import { calcText } from '../calc'

const Button = ({ node, actionHandler, paths = [], listItemData }: ComponentProps<AppV1_Button>) => {
  const onCall = useCallableActions(actionHandler)
  const exist = useExistValidActions(paths)

  if (!node.visible) {
    return null
  }

  return (
    <div style={transpiler.buttonTranspile(node).containerStyle}>
      <BaseButton data-existlink={exist(node.actions)} onClick={() => onCall(node.actions)} style={transpiler.buttonTranspile(node).buttonStyle}>
        {node.icon && <div style={transpiler.buttonTranspile(node).iconStyle} />}
        {node.icon && calcText(node.text, { listItemData }).length > 0 && <div style={{ width: node.itemSpacing }} />}
        <Typography style={transpiler.buttonTranspile(node).typographyStyle}>{calcText(node.text, { listItemData })}</Typography>
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
