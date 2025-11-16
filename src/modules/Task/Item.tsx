import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button, ScrollShadow } from '@heroui/react'
import clsx from 'clsx'
import { BiSolidEdit } from 'react-icons/bi'
import { LuTrash } from 'react-icons/lu'

import { getLocalizedTaskTerm, getTaskPriorityText } from '@/utils/task'

import type { Task } from '@/types/board'

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
          <ScrollShadow className='h-15' hideScrollBar>
            <Text size='small' selectable={false}>
              {task.description}
            </Text>
          </ScrollShadow>
          <Text selectable={false} nowrap>
            Пріоритет: {getTaskPriorityText(task.priority)}
          </Text>
          <Text selectable={false} nowrap>
            Термін: {getLocalizedTaskTerm(task.term)}
          </Text>
        </div>
        <div className='flex h-full flex-col justify-between'>
          <Button
            isIconOnly
            radius='full'
            color='primary'
            aria-label='Edit task'
            className='transition-transform-opacity'
            onPress={onEdit}
          >
            <BiSolidEdit size={20} className='text-white dark:text-black' />
          </Button>
          <Button
            isIconOnly
            radius='full'
            color='primary'
            aria-label='Delete task'
            className='transition-transform-opacity'
            onPress={onDelete}
          >
            <LuTrash size={20} className='text-white dark:text-black' />
          </Button>
        </div>
      </div>
    </div>
  )
}
