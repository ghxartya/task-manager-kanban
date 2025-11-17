'use client'

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps as NextThemesProviderProps
} from 'next-themes'

export type ThemeProviderProps = Omit<
  NextThemesProviderProps,
  'enableSystem' | 'attribute' | 'enableColorScheme' | 'defaultTheme'
>

export default function ThemeProvider({
  children,
  ...rest
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...rest}
      enableSystem
      attribute='class'
      enableColorScheme
      defaultTheme='system'
    >
      {children}
    </NextThemesProvider>
  )
}
