import React from 'react'
import styled from 'styled-components'
import { AppV1_ListItem } from '@funii-inc/funii-assist-types'
import { ComponentProps } from '../props'
import { useCallableActions, useExistValidActions } from '../hooks'
import { calcText } from '../calc'
import transpiler from '../transpiler'

const ListItem = ({ node, actionHandler, paths = [], listItemData }: ComponentProps<AppV1_ListItem>) => {
  const onCall = useCallableActions(actionHandler)
  const exist = useExistValidActions(paths)

  if (!node.visible) {
    return null
  }

  return (
    <div style={transpiler.listItemTranspile(node).containerStyle}>
      <BaseListItem data-existlink={exist(node.actions)} onClick={() => onCall(node.actions)} style={transpiler.listItemTranspile(node).listItemStyle}>
        {node.icon && (
          <>
            <IconWrapper>
              <div style={transpiler.listItemTranspile(node).iconStyle} />
            </IconWrapper>
            <div style={{ width: 9 }} />
          </>
        )}
        <ListItemText>
          <p style={transpiler.listItemTranspile(node).primaryTextStyle}>{calcText(node.primaryText, { listItemData })}</p>
          <p style={transpiler.listItemTranspile(node).secondaryTextStyle}>{calcText(node.secondaryText, { listItemData })}</p>
        </ListItemText>
      </BaseListItem>
    </div>
  )
}

const BaseListItem = styled.button`
  border: none;
  &[data-existlink='true'] {
    cursor: pointer;
  }
`

const IconWrapper = styled.div`
  padding: 6px;
`

const ListItemText = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default ListItem
