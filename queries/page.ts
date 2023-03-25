import type { KirbyQuerySchema } from '#nuxt-kql'
import type { KirbyBlock, KirbyLayout, KirbyQueryResponse } from '#nuxt-kql'

export type KirbyPageResponse = KirbyQueryResponse<{
  id: string
  title: string
  description: string
  text: KirbyBlock[]
  layouts: KirbyLayout[]
  cover?: {
    url: string
  }
}>

export function getPageQuery(pageId: string): KirbyQuerySchema {
  return {
    query: `kirby.page("${pageId}")`,
    select: {
      id: true,
      title: true,
      description: true,
      text: 'page.text.toResolvedBlocks',
      layouts: 'page.layout.toResolvedLayouts',
      // Social media preview
      cover: {
        query: 'page.cover.or(site.cover).toFile?.resize(1200)',
        select: ['url'],
      },
    },
  }
}
