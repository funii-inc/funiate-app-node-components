import React from 'react'
import styled from 'styled-components'
import { TABLET_MIN_WIDTH, ArtboardSize } from '../../components/props'
import { useMediaQuery } from 'react-responsive'

type Props = {
  smUp: boolean
  children: React.ReactNode
  artboardSize: ArtboardSize
}

const Hidden: React.FC<Props> = ({ smUp = true, children, artboardSize }) => {
  const useIsTablet = () => {
    const isTablet = useMediaQuery({ minWidth: TABLET_MIN_WIDTH })
    return artboardSize ? (artboardSize === 'tablet' ? true : false) : isTablet
  }

  const isTablet = useIsTablet()

  return <BaseHidden style={(!isTablet && !smUp) || (isTablet && smUp) ? { display: 'none' } : { display: 'block' }}>{children}</BaseHidden>
}

const BaseHidden = styled.div`
  width: 100%;
  height: 100%;
`

export default Hidden
