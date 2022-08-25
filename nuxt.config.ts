import { writeFile } from 'fs/promises'
import { $fetch } from 'ohmyfetch'
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['@unocss/nuxt', '@vueuse/nuxt', 'nuxt-kql'],

  hooks: {
    'build:before': async () => {
      const data = await $fetch('api/kql', {
        baseURL: process.env.KIRBY_BASE_URL,
        method: 'POST',
        body: {
          query: 'site',
          select: {
            title: true,
            description: true,
            children: {
              query: 'site.children',
              select: ['id', 'title', 'isListed'],
            },
            cover: {
              query: 'site.content.cover.toFile',
              select: ['id', 'filename', 'url', 'srcset', 'alt'],
            },
            footer: {
              query: 'site.footer.toPages',
              select: ['id', 'title'],
            },
          },
        },
        headers: {
          Authorization: `Bearer ${process.env.KIRBY_API_TOKEN}`,
        },
      })

      await writeFile('public/site.json', JSON.stringify(data, null, 2))
    },
  },

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
