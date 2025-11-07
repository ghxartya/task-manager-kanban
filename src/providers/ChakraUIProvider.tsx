'use client'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import type { ThemeProviderProps } from 'next-themes'

import ColorModeProvider from './ColorModeProvider'

export default function ChakraUIProvider(props: ThemeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
