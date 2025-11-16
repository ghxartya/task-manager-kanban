import { LuKanban } from 'react-icons/lu'

export default function Header({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <header className='h-header bg-secondary/75 fixed top-0 left-0 z-50 flex w-full items-center justify-end gap-1.75 px-3.75 backdrop-blur-sm max-sm:pl-12.5'>
      <LuKanban
        size={20}
        className='fixed left-1/2 -translate-x-1/2 text-black max-sm:left-3.75 max-sm:translate-x-0 dark:text-white'
      />
      {children}
    </header>
  )
}
