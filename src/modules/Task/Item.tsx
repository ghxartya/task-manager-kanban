import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from '@heroui/react'
import clsx from 'clsx'
import { LuTrash } from 'react-icons/lu'

import { getTaskPriorityText } from '@/utils/board'

import type { Task } from '@/types/board'

import Text from '@/ui/text/Text'

interface ItemProps {
  task: Task
  onDelete: () => void
}

export default function Item({ task, onDelete }: ItemProps) {
  const {
    listeners,
    transform,
    transition,
    setNodeRef,
    attributes,
    isDragging
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <div
      style={style}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      className={clsx('mb-4 cursor-grab rounded-sm p-4 shadow-lg', {
        'bg-red-300 dark:bg-red-900/50': task.priority === 'high',
        'bg-green-200 dark:bg-green-900/50': task.priority === 'low',
        'bg-yellow-100 dark:bg-yellow-900/50': task.priority === 'medium'
      })}
    >
      <div className='flex items-start justify-between'>
        <div>
          <Text weight={500} selectable={false} nowrap>
            {task.name}
          </Text>
          <Text selectable={false} nowrap>
            {task.description}
          </Text>
          <Text selectable={false} nowrap>
            Пріоритет: {getTaskPriorityText(task)}
          </Text>
          <Text selectable={false} nowrap>
            Термін: {task.term}
          </Text>
        </div>
        <Button
          isIconOnly
          color='primary'
          aria-label='Delete task'
          radius='full'
          onPress={onDelete}
        >
          <LuTrash size={20} className='text-white dark:text-black' />
        </Button>
      </div>
    </div>
  )
}
