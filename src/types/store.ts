import type { Task } from './board'

export interface Store {
  tasks: Task[]
  editingTask: Task | null
  addTask: (value: Task) => void
  updateTask: (value: Task) => void
  deleteTask: (value: Task['id']) => void
  setTasks: (value: Store['tasks']) => void
  setEditingTask: (value: Store['editingTask']) => void
}
