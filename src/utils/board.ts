import { columns } from '@/config/columns'

import type { Column, Task } from '@/types/board'

export const getTasksByColumn = (tasks: Task[]) => {
  return columns.reduce(
    (acc, column) => {
      acc[column.id] = tasks.filter(task => task.column === column.id)
      return acc
    },
    {} as Record<Column['id'], Task[]>
  )
}

export const getTaskPriorityText = (task: Task) => {
  switch (task.priority) {
    case 'low':
      return 'низький'
    case 'medium':
      return 'середній'
    case 'high':
      return 'високий'
  }
}
