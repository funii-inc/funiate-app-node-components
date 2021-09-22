import React from 'react'
// import styled from 'styled-components'
import { AppV1_Frame } from '@party-opu/funii-assist-types'
import { FrameProps } from '../props'
import transpiler from '../transpiler'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Frame = ({ node, children }: FrameProps<AppV1_Frame>) => {
  if (!node.visible) {
    return null
  }

  return (
    <div style={transpiler.frameTranspile(node).containerStyle}>
      <div style={transpiler.frameTranspile(node).frameStyle}>{children}</div>
    </div>
  )
}

export default Frame
