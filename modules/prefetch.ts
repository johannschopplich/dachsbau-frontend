import { $fetch } from 'ohmyfetch'
import { addTemplate, defineNuxtModule, useLogger } from '@nuxt/kit'
import type { KirbyQueryRequest, KirbyQueryResponse } from '#nuxt-kql'

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
      let site: KirbyQueryResponse | undefined

      if (options.site) {
        logger.info('Prefetching site data...')

        site = await kql({
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
        })
      }

      addTemplate({
        filename: 'nuxt-kql/cache.mjs',
        write: true,
        getContents() {
          return `
export const site = ${JSON.stringify(site?.result || {})}
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

async function kql(query: KirbyQueryRequest) {
  return await $fetch<KirbyQueryResponse>('api/kql', {
    baseURL: process.env.KIRBY_BASE_URL,
    method: 'POST',
    body: query,
    headers: {
      Authorization: `Bearer ${process.env.KIRBY_API_TOKEN}`,
    },
  })
}
