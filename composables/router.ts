import type { MaybeComputedRef } from '@vueuse/core'
import type { ScrollPosition } from '~/types'

const scrollMap = new Map<string, ScrollPosition>()
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

  onMounted(() => {
    const route = useRoute()
    useScroll(element, {
      onStop: (event) => {
        scrollMap.set(route.fullPath, {
          top: (event.target as HTMLElement)?.scrollTop,
        })
      },
    })

    isInitialized = true
  })
}

export function useScrollPositionMap() {
  return scrollMap
}
