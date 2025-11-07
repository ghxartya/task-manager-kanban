'use client'

import { LuMoon, LuSun } from 'react-icons/lu'

import { useColorMode } from '@/hooks/useColorMode'

export default function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? <LuMoon /> : <LuSun />
}
