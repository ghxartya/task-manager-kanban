import { columns } from '@/config/columns'

import type { Column, Task } from '@/types/board'

export const getActiveTask = (tasks: Task[], activeId: Task['id']) =>
  tasks.find(task => task.id === activeId)

export const isTasksEqual = (next: Task[], prev: Task[]) => {
  if (next.length !== prev.length) return false
  return next.every(
    (task, index) =>
      task.id === prev[index].id && task.column === prev[index].column
  )
}

export const findColumnId = (tasks: Task[], taskId: Task['id']) => {
  if (columns.some(column => column.id === taskId))
    return taskId as Column['id']
  return tasks.find(task => task.id === taskId)?.column
}

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
