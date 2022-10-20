export default defineNuxtConfig({
  modules: ['@unocss/nuxt', '@vueuse/nuxt', 'nuxt-kql', 'nuxt-plausible'],

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
      kirbySite: {
        query: 'site',
        select: {
          title: true,
          description: true,
          children: {
            query: 'site.children',
            select: ['id', 'title', 'isListed'],
          },
          cover: {
            query: 'site.cover.toFile.resize(1200)',
            select: ['url'],
          },
          footer: {
            query: 'site.footer.toPages',
            select: ['id', 'title'],
          },
        },
      },
    },
  },

  unocss: {
    preflight: true,
  },

  experimental: {
    inlineSSRStyles: false,
  },

  nitro: {
    prerender: {
      // crawlLinks: true,
      routes: ['/'],
    },
  },

  typescript: {
    strict: true,
    typeCheck: true,
    shim: false,
  },
})
