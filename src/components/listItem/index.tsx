import React from 'react'
import styled from 'styled-components'
import { AppV1_ListItem, MergedTableRecord, Variable, StorageFile } from '@funii-inc/funii-assist-types'
import { ComponentProps } from '../props'
import { useCallableActions, useExistValidActions } from '../hooks'
import { calcText, calcImages } from '../calc'
import transpiler from '../transpiler'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isVariable = (arg: any): arg is Variable => {
  return arg.type && arg.name && arg.source
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isStorageFile = (arg: any): arg is StorageFile => {
  return arg.url !== undefined
}

const ListItem = ({
  node,
  fullWidth = true,
  actionHandler,
  paths = [],
  listItemData,
}: ComponentProps<AppV1_ListItem, MergedTableRecord, MergedTableRecord>) => {
  const onCall = useCallableActions(actionHandler)
  const exist = useExistValidActions(paths)

  if (!node.visible) {
    return null
  }
  return (
    <div style={transpiler.listItemTranspile(node, fullWidth).containerStyle}>
      <BaseListItem
        data-existlink={exist(node.actions)}
        onClick={() => onCall(node.actions)}
        style={transpiler.listItemTranspile(node, fullWidth).listItemStyle}
      >
        {node.icon && (
          <>
            <IconWrapper>
              {calcImages(node.icon, { listItemData }).map((img, index) => {
                if (isStorageFile(img)) {
                  return (
                    <div
                      key={`${index}-${img.url}`}
                      style={{ ...transpiler.listItemTranspile(node, fullWidth).imageIconStyle, backgroundImage: `url(${img.url})` }}
                    />
                  )
                }
                if (isVariable(img) && img.type === 'IMAGE' && img.source.selector === 'LIST_ITEM_DATA') {
                  return (
                    <div
                      key={`${index}-${img.url}`}
                      style={{ ...transpiler.listItemTranspile(node, fullWidth).imageIconStyle, backgroundImage: `url(${img.url})` }}
                    >
                      {img.url}
                    </div>
                  )
                }
                return (
                  <div key={`${index}-${img.url}`} style={transpiler.listItemTranspile(node, fullWidth).iconStyle}>
                    <img src={img.url} />
                  </div>
                )
              })}
            </IconWrapper>
            <div style={{ width: 9 }} />
          </>
        )}
        <ListItemText>
          <p style={transpiler.listItemTranspile(node, fullWidth).primaryTextStyle}>{calcText(node.primaryText, { listItemData })}</p>
          <p style={transpiler.listItemTranspile(node, fullWidth).secondaryTextStyle}>{calcText(node.secondaryText, { listItemData })}</p>
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
