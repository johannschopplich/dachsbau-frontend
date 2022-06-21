import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    const container =
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      document.querySelector<HTMLDivElement>('#scroll-container')!

    // Timeout for page transition
    setTimeout(() => {
      if (savedPosition) {
        container.scroll(savedPosition)
      } else {
        container.scroll(0, 0)
      }
    }, 150)

    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
}
