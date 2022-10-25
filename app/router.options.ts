import type { RouterConfig } from '@nuxt/schema'
import type { ScrollPosition } from '~/types'

export default <RouterConfig>{
  // Handle scrolling inside the fixed app container
  scrollBehavior(to) {
    const nuxtApp = useNuxtApp()
    const container =
      document.querySelector<HTMLDivElement>('#scroll-container')!

    return new Promise((resolve) => {
      // Handle Suspense resolution
      nuxtApp.hooks.hookOnce('page:finish', async () => {
        await nextTick()
        let position: ScrollPosition = {
          left: 0,
          top: 0,
        }

        if (to.hash) {
          position = { el: to.hash }
          document.querySelector(to.hash)?.scrollIntoView()
        } else {
          // Always scroll to top
          container.scrollTo(position)
        }

        resolve(position)
      })
    })
  },
}
