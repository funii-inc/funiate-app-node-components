import { useCallback } from 'react'
import { Action } from '@funii-inc/funii-assist-types'
import { ActionHandler } from './props'

const defaultActionHandler: ActionHandler = (action) => console.info(`${action.type}-action`)

export const useCallableActions = (actionHandler: ActionHandler = defaultActionHandler) => {
  const onCall = useCallback(
    async (actions: Action[]) => {
      for (let i = 0; i < actions.length; i++) {
        const action = actions[i]
        await actionHandler(action)
      }
    },
    [actionHandler]
  )

  return onCall
}

export const useExistValidActions = (paths: string[]) => {
  const exist = useCallback(
    (actions: Action[]) => {
      let isExist = false
      actions.forEach((action) => {
        if (action.type === 'INTERNAL_LINK') {
          // FIXME: Variableを実装したらjoin周りのロジック修正
          if (paths.includes(action.value.join(''))) {
            isExist = true
          }
        } else if (action.type === 'EXTERNAL_LINK') {
          if (action.value) {
            isExist = true
          }
        } else if (action.type === 'API') {
          if (action.endpoint) {
            isExist = true
          }
        }
      })
      return isExist
    },
    [paths]
  )

  return exist
}
