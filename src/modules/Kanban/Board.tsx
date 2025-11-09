import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { columns } from '@/config/columns'

import { getTasksByColumn } from '@/utils/board'

import type { Task } from '@/types/board'

import List from './List'
import { initialTasks } from '@/consts/task'

export default function Board() {
  const queryClient = useQueryClient()

  const { data: tasks } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: () => queryClient.getQueryData(['tasks']) ?? [],
    initialData: initialTasks
  })

  const updateTasks = useMutation({
    mutationFn: (newTasks: Task[]) => {
      queryClient.setQueryData(['tasks'], newTasks)
      return Promise.resolve(newTasks)
    }
  })

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const tasksByColumn = getTasksByColumn(tasks)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const activeTask = tasks.find(task => task.id === activeId)
    if (!activeTask) return

    const activeColumn = activeTask.column
    const overColumn =
      tasks.find(task => task.id === overId)?.column ??
      (overId as Task['column'])

    if (activeColumn === overColumn) {
      // Reorder within the same column
      let columnTasks = tasks.filter(task => task.column === activeColumn)
      const activeIndex = columnTasks.findIndex(task => task.id === activeId)
      const overIndex = columnTasks.findIndex(task => task.id === overId)

      if (activeIndex === overIndex) return

      columnTasks = arrayMove(columnTasks, activeIndex, overIndex)

      const otherTasks = tasks.filter(task => task.column !== activeColumn)
      const newTasks = [...otherTasks, ...columnTasks]

      updateTasks.mutate(newTasks)
    } else {
      // Move to a different column
      let overIndex: number
      const destinationTasks = tasks.filter(task => task.column === overColumn)

      if (overColumn === overId) overIndex = destinationTasks.length
      else overIndex = destinationTasks.findIndex(task => task.id === overId)

      const newActive: Task = { ...activeTask, column: overColumn }
      const newDestinationTasks = [...destinationTasks]
      newDestinationTasks.splice(overIndex, 0, newActive)

      const sourceTasks = tasks.filter(
        task => task.column === activeColumn && task.id !== activeId
      )
      const otherTasks = tasks.filter(
        task => task.column !== activeColumn && task.column !== overColumn
      )

      const newTasks = [...otherTasks, ...sourceTasks, ...newDestinationTasks]

      updateTasks.mutate(newTasks)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      <div className='flex'>
        {columns.map(column => (
          <List
            key={column.id}
            column={column}
            tasks={tasksByColumn[column.id]}
            allTasks={tasks}
            updateTasks={newTasks => updateTasks.mutate(newTasks)}
          />
        ))}
      </div>
    </DndContext>
  )
}
