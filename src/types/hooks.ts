export type ColorMode = 'light' | 'dark'

export interface UseColorMode {
  colorMode: ColorMode
  toggleColorMode: () => void
  setColorMode: (colorMode: ColorMode) => void
}
