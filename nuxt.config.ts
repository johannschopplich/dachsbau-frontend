import { siteQuery } from './queries'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/plausible',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'nuxt-kql',
    'nuxt-simple-robots',
  ],

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

  experimental: {
    typescriptBundlerResolution: true,
    inlineSSRStyles: false,
  },

  typescript: {
    typeCheck: 'build',
    shim: false,
  },
})
