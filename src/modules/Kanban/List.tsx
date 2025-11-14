import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import clsx from 'clsx'
import { TbDragDrop2 } from 'react-icons/tb'

import Item from '@/modules/Task/Item'

import { useStore } from '@/store'

import type { Column, Task } from '@/types/board'

import Text from '@/ui/text/Text'

interface ListProps {
  tasks: Task[]
  column: Column
  allTasks: Task[]
  updateTasks: (newTasks: Task[]) => void
}

export default function List({
  tasks,
  column,
  allTasks,
  updateTasks
}: ListProps) {
  const { id, title } = column
  const { isOver, setNodeRef } = useDroppable({ id })

  const handleDelete = (id: Task['id']) => {
    const updatedTasks = allTasks.filter(task => task.id !== id)
    updateTasks(updatedTasks)
  }

  const { overColumn } = useStore()

  return (
    <div
      ref={setNodeRef}
      className={clsx('h-full rounded-b-sm px-2 pb-2', {
        'bg-blue-200/50 dark:bg-blue-400/10': isOver || overColumn === id
      })}
    >
      <Text size='large' weight={700} className='my-4 text-center'>
        {title}
      </Text>
      <SortableContext
        items={tasks.map(task => task.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.length ? (
          tasks.map(task => (
            <Item
              key={task.id}
              task={task}
              onDelete={() => handleDelete(task.id)}
            />
          ))
        ) : (
          <div className='border-primary bg-secondary flex h-32 items-center justify-center rounded-md border border-dashed'>
            <TbDragDrop2 size={25} className='text-primary' />
          </div>
        )}
      </SortableContext>
    </div>
  )
}
