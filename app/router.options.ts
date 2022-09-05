import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp()
    const container =
      document.querySelector<HTMLDivElement>('#scroll-container')!

    return new Promise((resolve) => {
      // Handle Suspense resolution
      nuxtApp.hook('page:finish', () => {
        // Timeout for page transition
        setTimeout(() => {
          if (to.hash) {
            resolve({
              el: to.hash,
              behavior: 'smooth',
            })
          } else {
            // Handle scrolling inside the fixed app container
            container.scrollTo(savedPosition ?? { top: 0 })
            resolve(savedPosition ?? { top: 0 })
          }
        }, 150)
      })
    })
  },
}
