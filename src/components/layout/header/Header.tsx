import { LuKanban } from 'react-icons/lu'

export default function Header() {
  return (
    <header className='h-header bg-secondary/75 fixed top-0 left-0 z-100 flex w-full items-center justify-center backdrop-blur-sm'>
      <LuKanban size={20} className='text-black dark:text-white' />
    </header>
  )
}
