import React from 'react'
// import styled from 'styled-components'
import { AppV1_Frame } from '@funii-inc/funii-assist-types'
import { FrameProps } from '../props'
import transpiler from '../transpiler'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Frame = ({ node, fullWidth = true, children }: FrameProps<AppV1_Frame>) => {
  if (!node.visible) {
    return null
  }

  return (
    <div style={transpiler.frameTranspile(node, fullWidth).containerStyle}>
      <div style={transpiler.frameTranspile(node, fullWidth).frameStyle}>{children}</div>
    </div>
  )
}

export default Frame
