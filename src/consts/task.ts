import type { Task } from '@/types/board'

export const initialTasks: Task[] = [
  {
    id: '1',
    name: 'Назва',
    description: 'Опис',
    priority: 'low',
    term: '11.11.2025',
    column: 'todo'
  },
  {
    id: '2',
    name: 'Назва',
    description: 'Опис',
    priority: 'medium',
    term: '11.11.2025',
    column: 'todo'
  },
  {
    id: '3',
    name: 'Назва',
    description: 'Опис',
    priority: 'high',
    term: '11.11.2025',
    column: 'in-progress'
  },
  {
    id: '4',
    name: 'Назва',
    description: 'Опис',
    priority: 'low',
    term: '11.11.2025',
    column: 'done'
  }
]
