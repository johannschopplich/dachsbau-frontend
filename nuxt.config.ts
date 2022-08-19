import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['@unocss/nuxt', '@vueuse/nuxt', 'nuxt-kql'],

  kql: {
    prefix: 'api/kql',
    auth: 'bearer',
  },

  unocss: {
    preflight: true,
  },

  typescript: {
    strict: true,
    // typeCheck: true,
    shim: false,
  },
})
