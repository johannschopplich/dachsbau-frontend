import type {
  KirbyBlock,
  KirbyLayout,
  KirbyQueryResponse,
  KirbyQuerySchema,
} from '#nuxt-kql'

export interface KirbyPageData {
  id: string
  intendedTemplate: string
  title: string
  description: string
  text: KirbyBlock<string>[]
  layouts: KirbyLayout[]
  cover?: {
    url: string
  }
}

export type KirbyPageResponse = KirbyQueryResponse<KirbyPageData>

export function getPageQuery(pageId: string): KirbyQuerySchema {
  return {
    query: `page("${pageId}")`,
    select: {
      id: true,
      intendedTemplate: true,
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
