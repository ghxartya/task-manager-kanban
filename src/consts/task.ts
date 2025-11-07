import type { Task } from '@/types/task'

export const initialTasks: Task[] = [
  {
    id: '1',
    name: 'Назва',
    description: 'Опис',
    priority: 'low',
    term: '11.11.2025',
    status: 'todo'
  },
  {
    id: '2',
    name: 'Назва',
    description: 'Опис',
    priority: 'medium',
    term: '11.11.2025',
    status: 'todo'
  },
  {
    id: '3',
    name: 'Назва',
    description: 'Опис',
    priority: 'high',
    term: '11.11.2025',
    status: 'in_progress'
  },
  {
    id: '4',
    name: 'Назва',
    description: 'Опис',
    priority: 'low',
    term: '11.11.2025',
    status: 'done'
  }
]
