import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button, ScrollShadow } from '@heroui/react'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { BiSolidEdit } from 'react-icons/bi'
import { LuTrash } from 'react-icons/lu'

import { getLocalizedTaskTerm } from '@/utils/task'

import type { Task } from '@/types/board'

import File from '@/ui/file/File'
import Text from '@/ui/text/Text'

interface ItemProps {
  task: Task
  className?: string
  onEdit: () => void
  onDelete: () => void
}

export default function Item({ task, className, onEdit, onDelete }: ItemProps) {
  const {
    listeners,
    transform,
    transition,
    setNodeRef,
    attributes,
    isDragging,
    isOver,
    active
  } = useSortable({ id: task.id })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1
  }

  const timeoutRef = useRef<NodeJS.Timeout>()
  const [isDeletePending, setIsDeletePending] = useState(false)

  const handleDeleteClick = () => {
    if (isDeletePending) {
      onDelete()
      setIsDeletePending(false)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    } else {
      setIsDeletePending(true)
      timeoutRef.current = setTimeout(() => setIsDeletePending(false), 2000)
    }
  }

  useEffect(() => {
    return () => timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [])

  return (
    <div
      style={style}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      className={clsx(
        'h-41 cursor-grab touch-none rounded-sm p-4 shadow-lg not-last:mb-4',
        {
          'bg-red-300 dark:bg-red-900/50': task.priority === 'high',
          'bg-green-200 dark:bg-green-900/50': task.priority === 'low',
          'bg-yellow-100 dark:bg-yellow-900/50': task.priority === 'medium',
          'outline-2 outline-blue-500':
            isOver && active && active.id === task.id
        },
        className
      )}
    >
      <div className='flex h-full items-start justify-between'>
        <div className='w-[calc(100%-3.75rem)]'>
          <Text weight={500} selectable={false} nowrap>
            {task.name}
          </Text>
          <ScrollShadow className='h-20' hideScrollBar>
            <Text size='small' selectable={false}>
              {task.description}
            </Text>
          </ScrollShadow>
          <Text weight={500} selectable={false} nowrap>
            Виконати до {getLocalizedTaskTerm(task.term)}
          </Text>
        </div>
        <div className='flex h-full flex-col justify-between'>
          <File
            file={task.file}
            className='transition-transform-opacity h-9.5 w-9.5 min-w-auto'
          />
          <Button
            isIconOnly
            radius='full'
            color='primary'
            aria-label='Edit task'
            className='transition-transform-opacity h-9.5 w-9.5 min-w-auto'
            onPress={onEdit}
          >
            <BiSolidEdit size={20} className='text-white dark:text-black' />
          </Button>
          <Button
            isIconOnly
            radius='full'
            color='primary'
            aria-label='Delete task'
            className='transition-transform-opacity h-9.5 w-9.5 min-w-auto'
            onPress={handleDeleteClick}
          >
            <LuTrash
              size={20}
              className={clsx('text-white dark:text-black', {
                'text-danger-300!': isDeletePending
              })}
            />
          </Button>
        </div>
      </div>
    </div>
  )
}
