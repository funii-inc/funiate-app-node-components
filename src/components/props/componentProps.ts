import { AppV1_NodeMap, Action, AppV1_List, AppV1_Frame } from '@funii-inc/funii-assist-types'

export type ArtboardSize = 'desktop' | 'tablet' | 'mobile'

export const DESKTOP_MIN_WIDTH = 1200
export const TABLET_MIN_WIDTH = 700

export type ActionHandler = (action: Action) => Promise<void> | void

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentProps<T = AppV1_NodeMap, U = any, P = any> = {
  node: T
  actionHandler?: ActionHandler
  paths?: string[]
  screenItemData?: U
  listItemData?: P
  children?: React.ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ListProps<T = AppV1_List, U = { [key: string]: any }> = {
  node: T
  testItems?: U[]
  renderItem: ({ item }: { item: U }) => React.ReactNode
}

export type FrameProps<T = AppV1_Frame> = {
  node: T
  children?: React.ReactNode
}
