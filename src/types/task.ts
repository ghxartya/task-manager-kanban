import type { columns } from '@/config/columns'

export type ColumnId = (typeof columns)[number]['id']

export interface Task {
  id: string
  name: string
  description: string
  priority: 'low' | 'medium' | 'high'
  term: string
  status: ColumnId
}
