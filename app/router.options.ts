import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp()
    const container =
      document.querySelector<HTMLDivElement>('#scroll-container')

    return new Promise((resolve) => {
      // On Suspense resolved event
      nuxtApp.hook('page:finish', () => {
        // Timeout for page transition
        setTimeout(() => {
          // Handle scrolling inside the fixed app container
          if (to.hash) {
            resolve({
              el: to.hash,
              behavior: 'smooth',
            })
            return
          }

          container?.scrollTo(savedPosition ?? { top: 0 })

          resolve(savedPosition ?? { top: 0 })
        }, 150)
      })
    })
  },
}
