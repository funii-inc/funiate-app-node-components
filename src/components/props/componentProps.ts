import { AppV1_NodeMap, Action, AppV1_List, AppV1_Frame, ThemeProps, MergedTableRecord } from '@funii-inc/funiate-types'
export type ArtboardSize = 'desktop' | 'tablet' | 'mobile'

export const DESKTOP_MIN_WIDTH = 1200
export const TABLET_MIN_WIDTH = 700

export type ActionHandler = (action: Action) => Promise<void> | void

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentProps<T = AppV1_NodeMap, U = any> = {
  node: T
  fullWidth?: boolean
  theme?: ThemeProps
  actionHandler?: ActionHandler
  paths?: string[]
  screenItemData?: U
  data: MergedTableRecord | null
  children?: React.ReactNode
  databaseTableToolAsset?: () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useTableRecordTools: ({ tableID }: { tableID: string }) => any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useTableImageTools: ({ tableID }: { tableID: string }) => any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useTableMultiTagTools: ({ tableID }: { tableID: string }) => any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useTableTagTools: ({ tableID }: { tableID: string }) => any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useTableColumnMappingTools: ({ tableID }: { tableID: string }) => any
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ListProps<T = AppV1_List, U = { [key: string]: any }> = {
  node: T
  fullWidth?: boolean
  theme?: ThemeProps
  renderItem: ({ item }: { item: U }) => React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  databaseTableToolAsset?: () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useTableRecordTools: ({ tableID }: { tableID: string }) => any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useTableImageTools: ({ tableID }: { tableID: string }) => any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useTableMultiTagTools: ({ tableID }: { tableID: string }) => any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useTableTagTools: ({ tableID }: { tableID: string }) => any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useTableColumnMappingTools: ({ tableID }: { tableID: string }) => any
  }
}

export type FrameProps<T = AppV1_Frame> = {
  node: T
  fullWidth?: boolean
  theme?: ThemeProps
  children?: React.ReactNode
}
