import { StorageFile, Variable, MergedTableRecord } from '@funii-inc/funii-assist-types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isVariable = (arg: any): arg is Variable => {
  return arg.type && arg.name && arg.source
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isStorageFile = (arg: any): arg is StorageFile => {
  return arg.url !== undefined
}

type CalcOption = {
  mergedTableRecord?: MergedTableRecord | null
  recordID?: string
}

export const calcText = (text: (string | Variable)[], option?: CalcOption) => {
  const _calcText = text.map((chunk) => {
    if (typeof chunk === 'string') {
      return chunk
    }
    if (isVariable(chunk) && chunk.type === 'TEXT' && option?.mergedTableRecord) {
      const hit = option.mergedTableRecord.data[chunk.source.columnID]
      if (hit?.type === 'text') {
        return hit.value
      }

      if (hit?.type === 'tag') {
        return hit.value?.label
      }

      if (hit?.type === 'multi-tag') {
        return hit.value.map((data) => data?.label).reduce((prev, cur) => `${prev}, ${cur}`)
      }

      if (hit?.type === 'mask-text') {
        return hit.value?.token
      }

      if (hit?.type === 'boolean') {
        return hit.value
      }

      if (hit?.type === 'email') {
        return hit.value
      }

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
      return [
        {
          size: chunk.size,
          url: chunk.url,
        },
      ]
    }
    if (isVariable(chunk) && chunk.type === 'IMAGE' && option?.mergedTableRecord) {
      const hit = option?.mergedTableRecord.data[chunk.source.columnID]

      if (!hit || !hit?.value || hit.type !== 'image') {
        return [
          {
            size: {
              width: null,
              height: null,
            },
            url: null as never as string,
          },
        ]
      }
      return hit.value.map((imageValue) => ({
        size: imageValue?.size,
        url: imageValue.thumbnailURL,
      }))
    }

    return [
      {
        size: {
          width: null,
          height: null,
        },
        url: null as never as string,
      },
    ]
  })
  return _calcImage.reduce((prev, curr) => [...prev, ...curr])
}
