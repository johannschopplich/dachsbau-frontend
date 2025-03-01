import { siteQuery } from './queries'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  modules: ['@unocss/nuxt', '@vueuse/nuxt', 'nuxt-vitalizer', 'nuxt-kql'],

  runtimeConfig: {
    public: {
      siteUrl: 'https://dachsbau-tautenhain.de',
    },
  },

  kql: {
    // Enable token-based authentication
    auth: 'bearer',

    // Prefetch queries at build-time
    prefetch: {
      kirbySite: siteQuery,
    },
  },

  unocss: {
    preflight: true,
  },
})
