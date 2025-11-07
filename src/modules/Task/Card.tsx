import { Box, Flex, Heading, IconButton, Text } from '@chakra-ui/react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import { MdDelete } from 'react-icons/md'

import { useColorModeValue } from '@/hooks/useColorModeValue'

import type { Task } from '@/types/task'

interface TaskProps {
  task: Task
  onDelete: () => void
  activeId: string | null
}

export default function Card({ task, onDelete, activeId }: TaskProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  const priorityColor = {
    low: useColorModeValue('bg-green-300!', 'bg-green-800!'),
    medium: useColorModeValue('bg-yellow-300!', 'bg-yellow-800!'),
    high: useColorModeValue('bg-red-400!', 'bg-red-800!')
  }[task.priority]

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      cursor='grab'
      p={4}
      mb={4}
      shadow='md'
      rounded='sm'
      className={clsx(priorityColor, {
        'opacity-50': task.id === activeId
      })}
    >
      <Flex justify='space-between'>
        <Box>
          <Heading size='sm'>{task.name}</Heading>
          <Text>{task.description}</Text>
          <Text>Пріоритет: {task.priority}</Text>
          <Text>Термін: {task.term}</Text>
        </Box>
        <IconButton aria-label='Delete' onClick={onDelete}>
          <MdDelete />
        </IconButton>
      </Flex>
    </Box>
  )
}
