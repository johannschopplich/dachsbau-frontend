import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  meta: {
    title: 'Dachsbau',
  },

  modules: ['@unocss/nuxt', '@vueuse/nuxt'],

  runtimeConfig: {
    public: {
      kirbyBaseUrl: '',
      kirbyApiKey: '',
    },
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
