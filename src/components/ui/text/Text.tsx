import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: 'large' | 'base' | 'small'
  weight?: 400 | 500 | 700
  color?: 'primary'
  selectable?: boolean
  nowrap?: boolean
}

export default function Text({
  size = 'base',
  weight = 400,
  color = 'primary',
  selectable = true,
  className,
  children,
  nowrap,
  ...rest
}: TextProps) {
  return (
    <p
      {...rest}
      className={clsx(
        'whitespace-pre-wrap select-none',
        {
          'text-lg': size === 'large',
          'text-sm': size === 'small',
          'text-base': size === 'base',
          'font-normal': weight === 400,
          'font-medium': weight === 500,
          'font-bold': weight === 700,
          'text-primary': color === 'primary',
          'selection:text-primary/75 cursor-text select-text': selectable,
          'max-w-full overflow-hidden text-ellipsis whitespace-nowrap!': nowrap
        },
        className
      )}
    >
      {children}
    </p>
  )
}
