import React from 'react'
// import styled from 'styled-components'
import { AppV1_Frame } from '@funii-inc/funiate-types'
import { FrameProps } from '../props'
import transpiler from '../transpiler'
import defaultTheme from '../defaultTheme'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Frame = ({ node, fullWidth = true, theme = defaultTheme, children }: FrameProps<AppV1_Frame>) => {
  if (!node.visible) {
    return null
  }

  return (
    <div style={transpiler.frameTranspile(node, fullWidth, theme).containerStyle}>
      <div style={transpiler.frameTranspile(node, fullWidth, theme).frameStyle}>{children}</div>
    </div>
  )
}

export default Frame
