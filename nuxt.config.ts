import { siteQuery } from './queries'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/plausible',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'nuxt-kql',
    'nuxt-schema-org',
    'nuxt-simple-robots',
  ],

  runtimeConfig: {
    public: {
      siteUrl: '',
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
    wind: true,
  },

  nitro: {
    prerender: {
      // crawlLinks: true,
      routes: ['/'],
    },
  },

  typescript: {
    typeCheck: true,
    shim: false,
  },
})
