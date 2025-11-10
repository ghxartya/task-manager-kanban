import { LuKanban } from 'react-icons/lu'

export default function Header() {
  return (
    <header className='h-header bg-secondary fixed top-0 left-0 z-100 flex w-full items-center justify-center'>
      <LuKanban size={20} className='text-black dark:text-white' />
    </header>
  )
}
