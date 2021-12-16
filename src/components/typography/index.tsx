import React from 'react'
import styled from 'styled-components'
import { AppV1_Typography } from '@funii-inc/funii-assist-types'
import { ComponentProps } from '../props'
import transpiler from '../transpiler'
import { useCallableActions, useExistValidActions } from '../hooks'
import { calcText } from '../calc'

const Typography = ({ node, fullWidth = true, actionHandler, paths = [], mergedTableRecord }: ComponentProps<AppV1_Typography>) => {
  const onCall = useCallableActions(actionHandler)
  const exist = useExistValidActions(paths)

  if (!node.visible) {
    return null
  }

  return (
    <div style={transpiler.typographyTranspile(node, fullWidth).containerStyle}>
      <BaseTypography
        data-existlink={exist(node.actions)}
        style={transpiler.typographyTranspile(node, fullWidth).typographyStyle}
        onClick={() => onCall(node.actions)}
      >
        {/* FIXME: Variableを実装したらjoin周りのロジック修正 */}
        {calcText(node.text, { mergedTableRecord })}
      </BaseTypography>
    </div>
  )
}

const BaseTypography = styled.p`
  width: 100%;
  white-space: pre-wrap;

  &[data-existlink='true'] {
    text-decoration: none;
    cursor: pointer;
  }
`

export default Typography
