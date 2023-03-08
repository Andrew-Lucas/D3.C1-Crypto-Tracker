import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import styled, { ThemeProvider } from 'styled-components'
import { isDarkMode } from './atoms'
import GlobalStyle from './components/GlobalStyles'
import AppRouter from './Router'
import { darkTheme, lightTheme } from './theme'

const ChangeThemeBTN = styled.button`
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  border-radius: 7px;
  font-size: 17px;
  cursor: pointer;
`

const Wrapper = styled.main`
  width: 525px;
  padding: 0 10px;
  margin: 0 auto;
`

function App() {
  const isDark = useRecoilValue(isDarkMode)
  const setTheme = useSetRecoilState(isDarkMode)
  const changeTheme = () => setTheme((theme) => !theme)

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <ChangeThemeBTN onClick={changeTheme}>
          {isDark ? 'LightMode' : 'DarkMode'}
        </ChangeThemeBTN>
        <Wrapper>
          <AppRouter />
        </Wrapper>
      </ThemeProvider>
    </>
  )
}

export default App
