import type { MaybeComputedRef } from '@vueuse/core'
import type { ScrollPosition } from '~/types'

const scrollMap = new Map<number, ScrollPosition>()
let isInitialized = false

/**
 * Save the scroll position of the current route, because the window's
 * scroll position will stay identical between pages when using the
 * fixed app container
 */
export function useScrollPosition(
  element: MaybeComputedRef<
    HTMLElement | SVGElement | Window | Document | null | undefined
  >
) {
  if (isInitialized) return

  const { y } = useScroll(element)

  addRouteMiddleware(
    'scroll-position',
    () => {
      const { position } = window.history.state || {}
      scrollMap.set(position, { top: y.value })
    },
    { global: true }
  )

  isInitialized = true
}

export function useScrollPositionMap() {
  return scrollMap
}
