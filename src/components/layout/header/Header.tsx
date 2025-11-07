import ColorModeButton from '@/ui/color-mode'

export default function Header() {
  return (
    <header className='fixed top-0 left-0 z-100 flex h-12 w-full items-center justify-center bg-gray-200 dark:bg-neutral-900'>
      <ColorModeButton />
    </header>
  )
}
