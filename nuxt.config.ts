export default defineNuxtConfig({
  modules: ['@unocss/nuxt', '@vueuse/nuxt', 'nuxt-kirby'],

  compatibilityDate: '2026-11-01',

  runtimeConfig: {
    public: {
      siteUrl: 'https://dachsbau-tautenhain.de',
    },
  },

  kirby: {
    auth: 'bearer',
  },
})
