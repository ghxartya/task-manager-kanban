import type { Column } from './board'

export interface Store {
  overColumn: Column['id'] | null
  setOverColumn: (value: Store['overColumn']) => void
}
