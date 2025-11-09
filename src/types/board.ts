export interface Column {
  id: 'todo' | 'in-progress' | 'done'
  title: string
}

export interface Task {
  id: string
  name: string
  description: string
  priority: 'low' | 'medium' | 'high'
  term: string
  column: Column['id']
}
