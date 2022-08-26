import { $fetch } from 'ohmyfetch'
import { addTemplate, defineNuxtModule, useLogger } from '@nuxt/kit'
import type { KirbyQueryRequest, KirbyQueryResponse } from '#nuxt-kql'

export default defineNuxtModule({
  meta: {
    name: 'kirby',
    configKey: 'kirby',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  defaults: {
    prefetchSite: false,
  },
  async setup(options) {
    const logger = useLogger()

    let site: KirbyQueryResponse | undefined

    if (options.prefetchSite) {
      logger.info('Prefetching site data...')

      try {
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
      } catch (e) {
        logger.error("Couldn't prefetch site data")
      }
    }

    addTemplate({
      filename: 'kirby.ts',
      write: true,
      getContents() {
        return `
export const site${site?.result ? '' : ': KirbySite'} = ${JSON.stringify(
          site?.result ?? {}
        )}
export type KirbySite = ${site?.result ? 'typeof site' : 'Record<string, any>'}
`.trimStart()
      },
    })
  },
})

function kql(query: KirbyQueryRequest) {
  return $fetch<KirbyQueryResponse>('api/kql', {
    baseURL: process.env.KIRBY_BASE_URL,
    method: 'POST',
    body: query,
    headers: {
      Authorization: `Bearer ${process.env.KIRBY_API_TOKEN}`,
    },
  })
}
