import { LuKanban } from 'react-icons/lu'

export default function Header() {
  return (
    <header className='h-header fixed top-0 left-0 z-100 flex w-full items-center justify-center bg-gray-200 dark:bg-neutral-900'>
      <LuKanban size={20} />
    </header>
  )
}
