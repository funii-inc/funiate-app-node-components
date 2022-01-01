import React from 'react'
import styled from 'styled-components'
import { AppV1_ListItem, Variable, StorageFile, InternalLinkAction } from '@funii-inc/funii-assist-types'
import { ComponentProps } from '../props'
import { useCallableActions, useExistValidActions } from '../hooks'
import { calcText, calcImages } from '../calc'
import transpiler from '../transpiler'
import defaultTheme from '../defaultTheme'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isVariable = (arg: any): arg is Variable => {
  return arg.type && arg.name && arg.source
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isStorageFile = (arg: any): arg is StorageFile => {
  return arg.url !== undefined
}

const ListItem = ({ node, fullWidth = true, theme = defaultTheme, actionHandler, paths = [], data }: ComponentProps<AppV1_ListItem>) => {
  const onCall = useCallableActions(actionHandler)
  const exist = useExistValidActions(paths)

  const addedRecordIDActions = node.actions.map((action) => {
    if (action.type === 'INTERNAL_LINK' && data) {
      return {
        ...action,
        data: {
          ...(action as InternalLinkAction).data,
          recordID: data.id,
        },
      } as InternalLinkAction
    }
    return action
  })

  if (!node.visible) {
    return null
  }
  return (
    <div style={transpiler.listItemTranspile(node, fullWidth, theme).containerStyle}>
      <BaseListItem
        data-existlink={exist(addedRecordIDActions)}
        onClick={() => onCall(addedRecordIDActions)}
        style={transpiler.listItemTranspile(node, fullWidth, theme).listItemStyle}
      >
        {node.icon && (
          <>
            <IconWrapper>
              {calcImages(node.icon, { data }).map((img, index) => {
                if (isStorageFile(img)) {
                  return (
                    <div
                      key={`${index}-${img.url}`}
                      style={{ ...transpiler.listItemTranspile(node, fullWidth, theme).imageIconStyle, backgroundImage: `url(${img.url})` }}
                    />
                  )
                }
                if (isVariable(img) && img.type === 'IMAGE' && img.source.selector === 'LIST_ITEM_DATA') {
                  return (
                    <div
                      key={`${index}-${img.url}`}
                      style={{ ...transpiler.listItemTranspile(node, fullWidth).imageIconStyle, backgroundImage: `url(${img.url})` }}
                    />
                  )
                }
                return (
                  <div key={`${index}-${img.url}`} style={transpiler.listItemTranspile(node, fullWidth, theme).iconStyle}>
                    <img src={img.url} />
                  </div>
                )
              })}
            </IconWrapper>
            <div style={{ width: 9 }} />
          </>
        )}
        <ListItemText>
          <p style={transpiler.listItemTranspile(node, fullWidth).primaryTextStyle}>{calcText(node.primaryText, { data })}</p>
          <p style={transpiler.listItemTranspile(node, fullWidth).secondaryTextStyle}>{calcText(node.secondaryText, { data })}</p>
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
