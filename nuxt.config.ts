import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['@unocss/nuxt', '@vueuse/nuxt', 'nuxt-kql', './modules/prefetch'],

  runtimeConfig: {
    public: {
      siteUrl: 'https://dachsbau-tautenhain.de',
    },
  },

  kql: {
    prefix: 'api/kql',
    auth: 'bearer',
  },

  kirby: {
    prefetchSite: true,
  },

  unocss: {
    preflight: true,
  },

  typescript: {
    strict: true,
    typeCheck: 'build',
    shim: false,
  },
})
