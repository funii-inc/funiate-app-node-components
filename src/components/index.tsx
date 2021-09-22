import React, { useCallback } from 'react'
import { ComponentProps } from './props'
import Frame from './frame'
import List from './list'
import ListItem from './listItem'
import Typography from './typography'
import Image from './image'
import Space from './space'
import Button from './button'

const Component = ({ node, actionHandler, paths, children }: ComponentProps) => {
  const NodeTree = useCallback(
    ({ node, actionHandler, paths }: ComponentProps) => {
      switch (node.type) {
        // Layouts
        // -----------------------------
        case 'LIST': {
          return <List node={node} renderItem={({ item }) => <NodeTree node={node.item} actionHandler={actionHandler} paths={paths} listItemData={item} />} />
        }
        case 'FRAME': {
          return <Frame node={node}>{children}</Frame>
        }

        // BasicComponent
        // -----------------------------
        case 'TYPOGRAPHY': {
          return <Typography node={node} actionHandler={actionHandler} paths={paths} />
        }
        case 'IMAGE': {
          return <Image node={node} actionHandler={actionHandler} paths={paths} />
        }
        case 'SPACE': {
          return <Space node={node} actionHandler={actionHandler} paths={paths} />
        }
        case 'BUTTON': {
          return <Button node={node} actionHandler={actionHandler} paths={paths} />
        }
        case 'LISTITEM': {
          return <ListItem node={node} actionHandler={actionHandler} paths={paths} />
        }

        default: {
          return null
        }
      }
    },
    [children]
  )

  return <NodeTree node={node} actionHandler={actionHandler} paths={paths} />
}

export default Component
