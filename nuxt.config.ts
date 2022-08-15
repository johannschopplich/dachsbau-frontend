import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['@unocss/nuxt', '@vueuse/nuxt', 'nuxt-kql'],

  kql: {
    prefix: 'api/kql',
    auth: 'bearer',
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
    strict: true,
    typeCheck: true,
    shim: false,
  },
})
