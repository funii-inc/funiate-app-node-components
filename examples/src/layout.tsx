import React from 'react'
import styled from 'styled-components'

const Layout: React.FC = ({ children }) => (
  <Root>
    <Header>
      <HeaderTitle>funiate-app-node-components</HeaderTitle>
    </Header>
    <Container>{children}</Container>
  </Root>
)

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  color: #202020;
`

const Header = styled.div`
  position: sticky;
  z-index: 999;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 75px;
  background-color: #ffffff;
  padding: 24px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
`

export const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
`

export const Heading = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: #202020;
`

export const SubHeading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #404040;
`

const Container = styled.div`
  max-width: 60rem;
  height: 100%;
  padding: 24px;
`

export const ComponentArea = styled.div`
  padding: 24px;
  /* background-color: #f1f1f1; */
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
`

const sizeHandler = (size: 's' | 'm' | 'l' | 'xl' | 'xxl') => {
  switch (size) {
    case 's':
      return '12px'
    case 'm':
      return '18px'
    case 'l':
      return '20px'
    case 'xl':
      return '40px'
    case 'xxl':
      return '60px'
  }
}

export const Spacer = styled.div<{ size?: 's' | 'm' | 'l' }>`
  height: ${(props) => sizeHandler(props.size ?? 'm')};
`

export default Layout
