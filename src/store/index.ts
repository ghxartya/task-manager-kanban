import { create } from 'zustand'

import type { Store } from '@/types/store'

export const useStore = create<Store>(set => ({
  overColumn: null,
  setOverColumn: value => set({ overColumn: value })
}))
