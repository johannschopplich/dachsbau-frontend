import type { RouterConfig } from '@nuxt/schema'
import type { ScrollPosition } from '~/types'

export default <RouterConfig>{
  // Handle scrolling inside the fixed app container
  scrollBehavior(to) {
    const nuxtApp = useNuxtApp()
    const savedPositions = useScrollPositionMap()
    const container =
      document.querySelector<HTMLDivElement>('#scroll-container')!

    return new Promise((resolve) => {
      // Handle Suspense resolution
      nuxtApp.hooks.hookOnce('page:transition:finish', async () => {
        await nextTick()
        let position: ScrollPosition = savedPositions.get(
          window.history.state.position
        ) || {
          left: 0,
          top: 0,
        }

        if (to.hash) {
          position = { el: to.hash }
          document.querySelector(to.hash)?.scrollIntoView()
        } else {
          container.scrollTo(position)
        }

        resolve(position)
      })
    })
  },
}
