import React, { useMemo } from 'react'
import { AppV1_List, MergedTableRecord, mergeTableRecord } from '@funii-inc/funii-assist-types'
import { ListProps } from '../props'
import transpiler from '../transpiler'

type ComponentListProps = Required<ListProps<AppV1_List, MergedTableRecord>> & {
  tableID: string
}

const Component = ({ node, tableID, fullWidth = true, renderItem, databaseTableToolAsset }: ComponentListProps) => {
  const { useTableRecordTools, useTableImageTools, useTableMultiTagTools, useTableTagTools } = databaseTableToolAsset()

  const { tableRecordDictionary } = useTableRecordTools({ tableID })
  const { tableImageMappings } = useTableImageTools({ tableID })
  const { tableMultiTagMappings } = useTableMultiTagTools({ tableID })
  const { tableTagMappings } = useTableTagTools({ tableID })

  const items = useMemo(
    () =>
      Object.keys(tableRecordDictionary).map((key) =>
        mergeTableRecord(tableRecordDictionary[key], tableTagMappings, tableMultiTagMappings, tableImageMappings)
      ),
    [tableRecordDictionary, tableTagMappings, tableMultiTagMappings, tableImageMappings]
  )

  if (!tableRecordDictionary) return null

  if (!node.visible) {
    return null
  }

  return (
    <div style={transpiler.listTranspile(node, fullWidth).containerStyle}>
      <div style={transpiler.listTranspile(node, fullWidth).listStyle}>
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

const List = ({ node, fullWidth = true, renderItem, databaseTableToolAsset }: ListProps<AppV1_List, MergedTableRecord>) => {
  if (!node.data?.source.tableID || !databaseTableToolAsset) return <div />
  return (
    <Component node={node} tableID={node.data?.source.tableID} fullWidth={fullWidth} renderItem={renderItem} databaseTableToolAsset={databaseTableToolAsset} />
  )
}

export default List
