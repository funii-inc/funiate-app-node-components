import React from 'react'
import { AppV1_Space } from '@party-opu/funii-assist-types'
import { ComponentProps } from '../props'
import transpiler from '../transpiler'

const Space = ({ node }: ComponentProps<AppV1_Space>) => {
  if (!node.visible) {
    return null
  }

  return <div style={transpiler.spaceTranspile(node)} />
}

export default Space
