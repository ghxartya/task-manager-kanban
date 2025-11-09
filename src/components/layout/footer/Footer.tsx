import Theme from './theme/Theme'

export default function Footer() {
  return (
    <footer className='h-footer fixed bottom-0 left-0 z-100 flex w-full items-center justify-center backdrop-blur-sm'>
      <Theme size='lg' classNames={{ wrapper: 'bg-neutral-900' }} />
    </footer>
  )
}
