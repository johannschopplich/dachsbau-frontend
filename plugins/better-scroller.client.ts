import { createRouterScroller } from 'vue-router-better-scroller'

interface ScrollPositionCoordinates {
  behavior?: ScrollOptions['behavior']
  left?: number
  top?: number
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    createRouterScroller({
      selectors: {
        // window: true,
        '#scroll-container': ({ type, savedPosition }) =>
          new Promise<ScrollPositionCoordinates>((resolve) => {
            // Handle Suspense route resolution
            nuxtApp.hooks.hookOnce('page:finish', () => {
              if (type === 'push') {
                resolve({ top: 0, left: 0 })
              } else if (type === 'history') {
                resolve(savedPosition || { top: 0, left: 0 })
              }
            })
          }),
      },
    }),
  )
})
