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
    inlineSSRStyles: false,
  },

  typescript: {
    shim: false,
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'bundler',
      },
    },
  },
})
