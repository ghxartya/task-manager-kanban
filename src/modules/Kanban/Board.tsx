import {
  DndContext,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useEffect, useRef, useState } from 'react'

import Item from '@/modules/Task/Item'

import { columns } from '@/config/columns'

import { useStore } from '@/store'

import {
  findColumnId,
  getActiveTask,
  getTasksByColumn,
  isTasksEqual
} from '@/utils/board'

import type { Task } from '@/types/board'

import List from './List'
import { initialTasks } from '@/consts/task'

export default function Board() {
  const [tasks, setTasks] = useState(initialTasks)
  const [activeId, setActiveId] = useState<Task['id']>('')

  const prevTasksRef = useRef(tasks)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const [activeTask, setActiveTask] = useState<Task | undefined>()
  const [tasksByColumn, setTasksByColumn] = useState(() =>
    getTasksByColumn(tasks)
  )

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 50,
        tolerance: 5
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  useEffect(() => setTasksByColumn(getTasksByColumn(tasks)), [tasks])
  useEffect(() => {
    if (activeId) setActiveTask(getActiveTask(tasks, activeId))
  }, [activeId])

  const { overColumn, setOverColumn } = useStore()

  const handleDragStart = (event: DragStartEvent) =>
    setActiveId(event.active.id)

  const scheduleUpdate = (newTasks: Task[]) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      if (!isTasksEqual(newTasks, prevTasksRef.current)) {
        prevTasksRef.current = newTasks
        setTasks(newTasks)
      }
    }, 10)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over, delta } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    const activeCol = findColumnId(tasks, activeId)
    const overCol = findColumnId(tasks, overId)

    if (!activeCol || !overCol) return
    const sameColumn = activeCol === overCol

    let nextTasks = tasks
    setOverColumn(overCol)

    if (!sameColumn) {
      const dragged = tasks.find(t => t.id === activeId)
      if (!dragged) return

      const withoutDragged = tasks.filter(t => t.id !== activeId)
      const moved = { ...dragged, column: overCol }

      if (overId === overCol) nextTasks = [...withoutDragged, moved]
      else {
        const overIdx = withoutDragged.findIndex(t => t.id === overId)
        if (overIdx === -1) return

        const insertOffset = delta.y > 0 ? 1 : 0
        nextTasks = [
          ...withoutDragged.slice(0, overIdx + insertOffset),
          moved,
          ...withoutDragged.slice(overIdx + insertOffset)
        ]
      }
    } else if (activeId !== overId) {
      const columnTasks = tasksByColumn[activeCol]
      const oldIdx = columnTasks.findIndex(t => t.id === activeId)
      const newIdx = columnTasks.findIndex(t => t.id === overId)

      if (oldIdx !== -1 && newIdx !== -1) {
        const other = tasks.filter(t => t.column !== activeCol)
        const reordered = arrayMove(columnTasks, oldIdx, newIdx)
        nextTasks = [...other, ...reordered]
      }
    }

    scheduleUpdate(nextTasks)
  }

  const cleanUp = () => {
    setActiveId('')
    if (overColumn) setOverColumn(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragCancel={cleanUp}
      onDragEnd={cleanUp}
    >
      {columns.map(column => (
        <List
          key={column.id}
          column={column}
          allTasks={tasks}
          updateTasks={setTasks}
          tasks={tasksByColumn[column.id]}
        />
      ))}
      <DragOverlay
        dropAnimation={{
          duration: 150,
          easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)'
        }}
      >
        {activeTask && (
          <Item
            task={activeTask}
            onDelete={() => null}
            className='backdrop-blur-sm'
          />
        )}
      </DragOverlay>
    </DndContext>
  )
}
