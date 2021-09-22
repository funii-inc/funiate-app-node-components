import React from 'react'
import styled from 'styled-components'
import { AppV1_Typography } from '@party-opu/funii-assist-types'
import { ComponentProps } from '../props'
import transpiler from '../transpiler'
import { useCallableActions, useExistValidActions } from '../hooks'
import { calcText } from '../calc'

const Typography = ({ node, actionHandler, paths = [], listItemData }: ComponentProps<AppV1_Typography>) => {
  const onCall = useCallableActions(actionHandler)
  const exist = useExistValidActions(paths)

  if (!node.visible) {
    return null
  }

  return (
    <BaseTypography data-existlink={exist(node.actions)} style={transpiler.typographyTranspile(node)} onClick={() => onCall(node.actions)}>
      {/* FIXME: Variableを実装したらjoin周りのロジック修正 */}
      {calcText(node.text, { listItemData })}
    </BaseTypography>
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
