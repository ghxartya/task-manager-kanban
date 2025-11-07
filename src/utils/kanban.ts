import { columns } from '@/config/columns'

import type { ColumnId, Task } from '@/types/task'

export const getTasksByStatus = (tasks: Task[]) => {
  return columns.reduce(
    (acc, column) => {
      acc[column.id] = tasks.filter(task => task.status === column.id)
      return acc
    },
    {} as Record<ColumnId, Task[]>
  )
}
