export default defineNuxtConfig({
  modules: [
    '@nuxtjs/plausible',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'nuxt-kql',
    'nuxt-schema-org',
    'nuxt-simple-robots',
    // 'nuxt-simple-sitemap',
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

    server: {
      cache: true,
    },
  },

  unocss: {
    preflight: true,
  },

  sitemap: {
    hostname: process.env.NUXT_PUBLIC_SITE_URL,
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
    typeCheck: true,
    shim: false,
  },
})
