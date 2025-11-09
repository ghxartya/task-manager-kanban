import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import clsx from 'clsx'

import Item from '@/modules/Task/Item'

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
  const { setNodeRef, isOver } = useDroppable({
    id: column.id
  })

  const handleDelete = (id: string) => {
    const updatedTasks = allTasks.filter(task => task.id !== id)
    updateTasks(updatedTasks)
  }

  return (
    <div className='w-full'>
      <Text size='large' weight={700} className='my-4 text-center'>
        {column.title}
      </Text>
      <div
        ref={setNodeRef}
        className={clsx('min-h-[200px] rounded-sm p-2', {
          'bg-blue-200 dark:bg-blue-300': isOver
        })}
      >
        <SortableContext
          items={tasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map(task => (
            <Item
              key={task.id}
              task={task}
              onDelete={() => handleDelete(task.id)}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}
