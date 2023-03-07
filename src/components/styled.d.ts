import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    accent: string
    bgColor: string
    textColor: string
    btn: {
      primary: string
      secondary: string
    }
  }
}
