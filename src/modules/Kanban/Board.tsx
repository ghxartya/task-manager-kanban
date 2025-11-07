import { Flex } from '@chakra-ui/react'
import {
  DndContext,
  type DragOverEvent,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { columns } from '@/config/columns'

import { getTasksByStatus } from '@/utils/kanban'

import type { ColumnId, Task } from '@/types/task'

import Column from './Column'
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

  const [activeId, setActiveId] = useState<string | null>(null)

  const handleDragStart = (event: DragStartEvent) =>
    setActiveId(event.active.id as string)

  const tasksByStatus = getTasksByStatus(tasks)

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    if (activeId === overId) return

    const activeTask = tasks.find(({ id }) => id === activeId)
    if (!activeTask) return

    const isOverATask = tasks.some(({ id }) => id === overId)
    const overStatus: ColumnId = isOverATask
      ? tasks.find(({ id }) => id === overId)!.status
      : (overId as ColumnId)

    const activeStatus = activeTask.status

    let newTasks = [...tasks]

    if (activeStatus === overStatus) {
      const oldIndex = tasksByStatus[activeStatus].findIndex(
        ({ id }) => id === activeId
      )

      const newIndex = isOverATask
        ? tasksByStatus[overStatus].findIndex(({ id }) => id === overId)
        : tasksByStatus[overStatus].length

      if (oldIndex === newIndex) return

      const newColumnTasks = arrayMove(
        tasksByStatus[activeStatus],
        oldIndex,
        newIndex
      )

      newTasks = tasks
        .filter(({ status }) => status !== activeStatus)
        .concat(newColumnTasks)
    } else {
      const oldIndex = tasksByStatus[activeStatus].findIndex(
        ({ id }) => id === activeId
      )

      const newColumnTasks = [...tasksByStatus[overStatus]]
      const newIndex = isOverATask
        ? tasksByStatus[overStatus].findIndex(({ id }) => id === overId)
        : tasksByStatus[overStatus].length

      newColumnTasks.splice(newIndex, 0, { ...activeTask, status: overStatus })

      const remainingActiveTasks = [...tasksByStatus[activeStatus]]
      remainingActiveTasks.splice(oldIndex, 1)

      newTasks = tasks
        .filter(
          ({ status }) => status !== activeStatus && status !== overStatus
        )
        .concat(remainingActiveTasks)
        .concat(newColumnTasks)
    }

    updateTasks.mutate(newTasks)
  }

  const handleDragEnd = () => setActiveId(null)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Flex h={'vh'} pt={12}>
        {columns.map(column => (
          <Column
            key={column.id}
            column={column}
            tasks={tasksByStatus[column.id]}
            allTasks={tasks}
            activeId={activeId}
            updateTasks={newTasks => updateTasks.mutate(newTasks)}
          />
        ))}
      </Flex>
    </DndContext>
  )
}
