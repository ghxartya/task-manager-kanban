import { DateTime } from 'luxon'

import type { Task } from '@/types/board'

export const getTaskPriorityText = (priority: Task['priority']) => {
  switch (priority) {
    case 'low':
      return 'низький'
    case 'medium':
      return 'середній'
    case 'high':
      return 'високий'
  }
}

export const getLocalizedTaskTerm = (term: Task['term']) =>
  DateTime.fromISO(term).toLocaleString(
    {
      day: '2-digit',
      hour: '2-digit',
      year: 'numeric',
      month: '2-digit',
      hourCycle: 'h23',
      minute: '2-digit'
    },
    { locale: 'uk-UA' }
  )
