import type { ScrollPosition } from '~/types'

const scrollMap = new Map<string, ScrollPosition>()

export function useSavedPositions() {
  return scrollMap
}
