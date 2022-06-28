import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp()
    const container =
      document.querySelector<HTMLDivElement>('#scroll-container')

    // On Suspense resolved event
    nuxtApp.hook('page:finish', () => {
      // Timeout for page transition
      setTimeout(() => {
        // Handle scrolling inside the fixed app container
        container.scrollTo(savedPosition ?? { top: 0 })
      }, 150)
    })

    // Unused currently, but keep it for later
    return savedPosition ?? { top: 0 }
  },
}
