import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Store } from '@/types/store'

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      tasks: [],
      editingTask: null,
      addTask: newTask => set({ tasks: [...get().tasks, newTask] }),
      updateTask: updatedTask =>
        set({
          tasks: get().tasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task
          )
        }),
      deleteTask: taskId =>
        set({ tasks: get().tasks.filter(task => task.id !== taskId) }),
      setTasks: tasks => set({ tasks }),
      setEditingTask: editingTask => set({ editingTask })
    }),
    { name: 'main-storage', partialize: state => ({ tasks: state.tasks }) }
  )
)
