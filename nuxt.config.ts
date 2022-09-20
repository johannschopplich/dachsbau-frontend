export default defineNuxtConfig({
  modules: ['@unocss/nuxt', '@vueuse/nuxt', 'nuxt-kql'],

  runtimeConfig: {
    public: {
      siteUrl: 'https://dachsbau-tautenhain.de',
    },
  },

  kql: {
    prefix: 'api/kql',
    auth: 'bearer',
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

  typescript: {
    strict: true,
    typeCheck: true,
    shim: false,
  },
})
