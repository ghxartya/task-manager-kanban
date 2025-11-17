import { DateTime } from 'luxon'

import type { Task } from '@/types/board'

export const getLocalizedTaskTerm = (term: Task['term']) =>
  DateTime.fromISO(term).toLocaleString(
    {
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      year: 'numeric',
      hourCycle: 'h23',
      minute: '2-digit'
    },
    { locale: 'uk-UA' }
  )
