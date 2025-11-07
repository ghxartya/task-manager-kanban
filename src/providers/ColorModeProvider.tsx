'use client'

import { ThemeProvider, type ThemeProviderProps } from 'next-themes'

export default function ColorModeProvider(props: ThemeProviderProps) {
  return (
    <ThemeProvider
      enableSystem
      attribute='class'
      enableColorScheme
      disableTransitionOnChange
      {...props}
    />
  )
}
