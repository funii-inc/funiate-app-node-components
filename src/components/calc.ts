import { StorageFile, Variable } from '@party-opu/funii-assist-types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isVariable = (arg: any): arg is Variable => {
  return arg.type && arg.name && arg.source
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isStorageFile = (arg: any): arg is StorageFile => {
  return arg.url !== undefined
}

type ListItemData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

type CalcOption = {
  listItemData?: ListItemData
}

export const calcText = (text: (string | Variable)[], option?: CalcOption) => {
  const _calcText = text.map((chunk) => {
    if (typeof chunk === 'string') {
      return chunk
    }
    if (isVariable(chunk) && chunk.type === 'TEXT' && chunk.source.selector === 'LIST_ITEM_DATA' && option?.listItemData) {
      const hit = option.listItemData[chunk.source.columnID]
      if (!hit || typeof hit !== 'string') {
        return ''
      }
      return hit
    }
    return ''
  })
  return _calcText.join('')
}

export const calcImages = (images: (StorageFile | Variable)[], option?: CalcOption) => {
  const _calcImage = images.map((chunk) => {
    if (isStorageFile(chunk)) {
      return {
        size: chunk.size,
        url: chunk.url,
      }
    }
    if (isVariable(chunk) && chunk.type === 'IMAGE' && chunk.source.selector === 'LIST_ITEM_DATA' && option?.listItemData) {
      const hit = option?.listItemData[chunk.source.columnID]
      if (!hit || !hit.url) {
        return {
          size: {
            width: null,
            height: null,
          },
          url: null,
        }
      }
      return {
        size: hit.size,
        url: hit.url,
      }
    }

    return {
      size: {
        width: null,
        height: null,
      },
      url: null,
    }
  })
  return _calcImage
}
