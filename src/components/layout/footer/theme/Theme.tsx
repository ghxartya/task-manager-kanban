'use client'

import { Switch, type SwitchProps } from '@heroui/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'

import { THEMES } from '@/consts/themes'

type ThemeProps = Omit<
  SwitchProps,
  'aria-label' | 'isSelected' | 'onValueChange' | 'thumbIcon'
>

export default function Theme(props: ThemeProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [isSelected, setIsSelected] = useState(
    resolvedTheme === THEMES.DARK ? false : true
  )

  useEffect(() => {
    if (isSelected) setTheme(THEMES.LIGHT)
    else setTheme(THEMES.DARK)
  }, [isSelected])

  return (
    <Switch
      {...props}
      aria-label='Toggle color scheme'
      isSelected={isSelected}
      onValueChange={setIsSelected}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <LuSun size={20} className={className} />
        ) : (
          <LuMoon size={20} className={className} />
        )
      }
    />
  )
}
