import type { KirbyQuerySchema } from '#nuxt-kql'

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
