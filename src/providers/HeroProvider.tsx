import { HeroUIProvider, type HeroUIProviderProps } from '@heroui/react'

import ThemeProvider, { type ThemeProviderProps } from './ThemeProvider'

export default function HeroProvider({
  themeProps,
  children,
  ...rest
}: HeroUIProviderProps & { themeProps?: ThemeProviderProps }) {
  return (
    <HeroUIProvider {...rest}>
      <ThemeProvider {...themeProps}>{children}</ThemeProvider>
    </HeroUIProvider>
  )
}
