import { Button } from '@heroui/react'
import { CiFileOff, CiFileOn } from 'react-icons/ci'

import type { Task } from '@/types/board'

interface FileProps {
  file: Task['file']
  className?: string
  isFileInput?: boolean
}

export default function File({ file, className, isFileInput }: FileProps) {
  return (
    <Button
      isIconOnly
      radius='full'
      color='primary'
      isDisabled={!file}
      className={className}
      aria-label='View file'
      size={isFileInput ? 'sm' : 'md'}
      onPress={() => file && window.open(file, '_blank')}
    >
      {file ? (
        <CiFileOn
          size={20}
          strokeWidth={1}
          className='text-white dark:text-black'
        />
      ) : (
        <CiFileOff
          size={20}
          strokeWidth={1}
          className='text-white dark:text-black'
        />
      )}
    </Button>
  )
}
