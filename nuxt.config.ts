import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['@unocss/nuxt', '@vueuse/nuxt', 'nuxt-kql'],

  runtimeConfig: {
    public: {
      baseUrl: '',
    },
  },

  kql: {
    kirbyAuth: 'bearer',
    kirbyEndpoint: 'api/kql',
  },

  unocss: {
    preflight: true,
    uno: true,
    icons: {
      scale: 1.2,
      extraProperties: {
        position: 'relative',
        display: 'inline-block',
        'vertical-align': 'middle',
        bottom: '0.125ex',
      },
    },
  },

  typescript: {
    shim: false,
  },
})
