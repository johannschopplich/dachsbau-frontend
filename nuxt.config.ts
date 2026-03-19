import { siteQuery } from './app/queries'

export default defineNuxtConfig({
  compatibilityDate: '2025-08-01',

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

  unocss: {
    preflight: true,
  },
})
