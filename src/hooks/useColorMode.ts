'use client'

import { useTheme } from 'next-themes'

import type { ColorMode, UseColorMode } from '@/types/hooks'

export function useColorMode(): UseColorMode {
  const { resolvedTheme, forcedTheme, setTheme } = useTheme()
  const colorMode = forcedTheme ?? resolvedTheme

  const toggleColorMode = () =>
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')

  return {
    colorMode: colorMode as ColorMode,
    setColorMode: setTheme,
    toggleColorMode
  }
}
