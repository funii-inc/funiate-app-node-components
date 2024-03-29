import React, { useCallback } from 'react'
import { ComponentProps } from './props'
import Frame from './frame'
import List from './list'
import ListItem from './listItem'
import Typography from './typography'
import Image from './image'
import Space from './space'
import Button from './button'
import defaultTheme from './defaultTheme'

const Component = ({ node, fullWidth = true, theme = defaultTheme, actionHandler, paths, children, databaseTableToolAsset, data = null }: ComponentProps) => {
  const NodeTree = useCallback(
    ({ node, fullWidth = true, theme = defaultTheme, actionHandler, paths, data, databaseTableToolAsset }: ComponentProps) => {
      switch (node.type) {
        // Layouts
        // -----------------------------
        case 'LIST': {
          return (
            <List
              node={node}
              fullWidth={fullWidth}
              theme={theme}
              renderItem={({ item }) => <NodeTree node={node.item} fullWidth={true} theme={theme} actionHandler={actionHandler} paths={paths} data={item} />}
              databaseTableToolAsset={databaseTableToolAsset}
            />
          )
        }
        case 'FRAME': {
          return (
            <Frame node={node} fullWidth={fullWidth} theme={theme}>
              {children}
            </Frame>
          )
        }

        // BasicComponent
        // -----------------------------
        case 'TYPOGRAPHY': {
          return <Typography node={node} fullWidth={fullWidth} theme={theme} actionHandler={actionHandler} paths={paths} data={data} />
        }
        case 'IMAGE': {
          return <Image node={node} fullWidth={fullWidth} theme={theme} actionHandler={actionHandler} paths={paths} data={data} />
        }
        // SpaceにfullWidthの概念は不要(containerStyleがないため)
        case 'SPACE': {
          return <Space node={node} theme={theme} actionHandler={actionHandler} paths={paths} data={data} />
        }
        case 'BUTTON': {
          return <Button node={node} fullWidth={fullWidth} theme={theme} actionHandler={actionHandler} paths={paths} data={data} />
        }
        case 'LISTITEM': {
          return <ListItem node={node} fullWidth={fullWidth} theme={theme} actionHandler={actionHandler} paths={paths} data={data} />
        }

        default: {
          return null
        }
      }
    },
    [children]
  )

  return (
    <NodeTree
      node={node}
      fullWidth={fullWidth}
      theme={theme}
      actionHandler={actionHandler}
      paths={paths}
      databaseTableToolAsset={databaseTableToolAsset}
      data={data}
    />
  )
}

export default Component
