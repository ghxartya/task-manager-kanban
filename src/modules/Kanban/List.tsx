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
  overColumn: Column['id'] | undefined
}

export default function List({ tasks, column, overColumn }: ListProps) {
  const { id, title } = column

  const { setEditingTask, deleteTask } = useStore()
  const { isOver, setNodeRef } = useDroppable({ id })

  const handleEdit = (task: Task) => setEditingTask(task)
  const handleDelete = (taskId: Task['id']) => deleteTask(taskId)

  return (
    <div
      ref={setNodeRef}
      className={clsx('h-full rounded-b-sm px-3.75 pb-3.75', {
        'bg-blue-200/50 dark:bg-blue-400/10': isOver || overColumn === id
      })}
    >
      <Text size='large' weight={700} className='my-3.75' center>
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
              onEdit={() => handleEdit(task)}
              onDelete={() => handleDelete(task.id)}
            />
          ))
        ) : (
          <div className='border-primary bg-secondary flex h-45 items-center justify-center rounded-md border border-dashed'>
            <TbDragDrop2 size={25} className='text-primary' />
          </div>
        )}
      </SortableContext>
    </div>
  )
}
