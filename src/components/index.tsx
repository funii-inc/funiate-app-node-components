import React, { useCallback } from 'react'
import { ComponentProps } from './props'
import Frame from './frame'
import List from './list'
import ListItem from './listItem'
import Typography from './typography'
import Image from './image'
import Space from './space'
import Button from './button'

const Component = ({ node, fullWidth = true, actionHandler, paths, children }: ComponentProps) => {
  const NodeTree = useCallback(
    ({ node, fullWidth = true, actionHandler, paths }: ComponentProps) => {
      switch (node.type) {
        // Layouts
        // -----------------------------
        case 'LIST': {
          return (
            <List
              node={node}
              fullWidth={fullWidth}
              renderItem={({ item }) => <NodeTree node={node.item} fullWidth={true} actionHandler={actionHandler} paths={paths} listItemData={item} />}
            />
          )
        }
        case 'FRAME': {
          return (
            <Frame node={node} fullWidth={fullWidth}>
              {children}
            </Frame>
          )
        }

        // BasicComponent
        // -----------------------------
        case 'TYPOGRAPHY': {
          return <Typography node={node} fullWidth={fullWidth} actionHandler={actionHandler} paths={paths} />
        }
        case 'IMAGE': {
          return <Image node={node} fullWidth={fullWidth} actionHandler={actionHandler} paths={paths} />
        }
        // SpaceにfullWidthの概念は不要(containerStyleがないため)
        case 'SPACE': {
          return <Space node={node} actionHandler={actionHandler} paths={paths} />
        }
        case 'BUTTON': {
          return <Button node={node} fullWidth={fullWidth} actionHandler={actionHandler} paths={paths} />
        }
        case 'LISTITEM': {
          return <ListItem node={node} fullWidth={fullWidth} actionHandler={actionHandler} paths={paths} />
        }

        default: {
          return null
        }
      }
    },
    [children]
  )

  return <NodeTree node={node} fullWidth={fullWidth} actionHandler={actionHandler} paths={paths} />
}

export default Component
