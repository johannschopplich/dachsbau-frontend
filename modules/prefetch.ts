import { $fetch } from 'ohmyfetch'
import { addTemplate, defineNuxtModule, useLogger } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'nuxt-kql/prefetch',
    configKey: 'kqlPrefetch',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  defaults: {
    site: false,
  },
  async setup(options, nuxt) {
    const logger = useLogger()

    nuxt.hook('nitro:init', async () => {
      if (!options.site) return
      logger.info('Prefetching site data...')

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

      addTemplate({
        filename: 'nuxt-kql/cache.mjs',
        write: true,
        getContents() {
          return `
export const site = ${JSON.stringify(data.result)}
`.trimStart()
        },
      })
    })

    addTemplate({
      filename: 'nuxt-kql/cache.d.ts',
      write: true,
      getContents() {
        return `
export declare const site: Record<string, any>
`.trimStart()
      },
    })
  },
})
