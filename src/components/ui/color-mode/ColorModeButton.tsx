'use client'

import type { IconButtonProps } from '@chakra-ui/react'
import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react'
import { forwardRef } from 'react'

import { useColorMode } from '@/hooks/useColorMode'

import ColorModeIcon from './ColorModeIcon'

export const ColorModeButton = forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, 'aria-label'>
>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode()

  return (
    <ClientOnly fallback={<Skeleton boxSize='9' />}>
      <IconButton
        onClick={toggleColorMode}
        variant='ghost'
        aria-label='Toggle color mode'
        size='sm'
        ref={ref}
        {...props}
        css={{
          _icon: {
            width: '5',
            height: '5'
          }
        }}
      >
        <ColorModeIcon />
      </IconButton>
    </ClientOnly>
  )
})
