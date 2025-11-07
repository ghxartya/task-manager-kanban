import { Box, Heading } from '@chakra-ui/react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import clsx from 'clsx'

import Card from '@/modules/Task/Card'

import type { Task } from '@/types/task'

interface Column {
  id: string
  title: string
}

interface ColumnProps {
  column: Column
  tasks: Task[]
  allTasks: Task[]
  activeId: string | null
  updateTasks: (newTasks: Task[]) => void
}

export default function Column({
  column,
  tasks,
  allTasks,
  activeId,
  updateTasks
}: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id
  })

  const handleDelete = (id: string) => {
    const updatedTasks = allTasks.filter(task => task.id !== id)
    updateTasks(updatedTasks)
  }

  return (
    <Box w='full'>
      <Heading my={4} size='md' textAlign='center'>
        {column.title}
      </Heading>
      <Box
        ref={setNodeRef}
        minH='200px'
        p={2}
        rounded='sm'
        className={clsx({ 'bg-blue-300': isOver })}
      >
        <SortableContext
          items={tasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map(task => (
            <Card
              key={task.id}
              task={task}
              onDelete={() => handleDelete(task.id)}
              activeId={activeId}
            />
          ))}
        </SortableContext>
      </Box>
    </Box>
  )
}
