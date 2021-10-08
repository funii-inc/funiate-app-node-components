import React, { useEffect, useState } from 'react'
import { AppV1_List, AppV1_ListItem } from '@party-opu/funii-assist-types'
import { ListProps } from '../props'
import transpiler from '../transpiler'

const List = ({ node, testItems, renderItem }: ListProps<AppV1_List, AppV1_ListItem>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [items, setItems] = useState<any[]>([])
  useEffect(() => {
    const task = async () => {
      if (testItems) {
        setItems(testItems)
        return
      }
      // TODO: fetch
      console.info(node.data)
      setItems([])
    }
    task()
  }, [node, testItems])

  if (!node.visible) {
    return null
  }

  return (
    <div style={transpiler.listTranspile(node).containerStyle}>
      <div style={transpiler.listTranspile(node).listStyle}>
        {items.map((item, index) => (
          <div key={index} style={{ width: '100%' }}>
            {renderItem({ item })}
            {items.length - 1 !== index && (
              <>
                {/* TODO: dividerの実装 */}
                <div style={{ width: node.itemSpacing, height: node.itemSpacing }} />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
