import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: 'large' | 'base' | 'small' | 'tiny'
  color?: 'primary' | 'danger'
  weight?: 400 | 500 | 700
  selectable?: boolean
  nowrap?: boolean
  center?: boolean
}

export default function Text({
  size = 'base',
  weight = 400,
  color = 'primary',
  selectable = true,
  className,
  children,
  nowrap,
  center,
  ...rest
}: TextProps) {
  return (
    <p
      {...rest}
      className={clsx(
        'whitespace-pre-wrap select-none',
        {
          'text-center': center,
          'text-lg': size === 'large',
          'text-sm': size === 'small',
          'text-base': size === 'base',
          'text-tiny': size === 'tiny',
          'font-normal': weight === 400,
          'font-medium': weight === 500,
          'font-bold': weight === 700,
          'text-danger': color === 'danger',
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
