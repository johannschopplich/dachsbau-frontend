import { siteQuery } from './app/queries'

export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',

  modules: ['@unocss/nuxt', '@vueuse/nuxt', 'nuxt-kirby'],

  runtimeConfig: {
    public: {
      siteUrl: 'https://dachsbau-tautenhain.de',
    },
  },

  kirby: {
    auth: 'bearer',
    prefetch: {
      kirbySite: siteQuery,
    },
  },
})
