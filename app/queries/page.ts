import type {
  KirbyBlock,
  KirbyLayout,
  KirbyQueryResponse,
  KirbyQuerySchema,
} from 'kirby-types'

export interface KirbySharedPageData {
  uri: string
  intendedTemplate: string
  title: string
  customTitle: string
  description: string
  cover?: {
    url: string
  }
}

export interface KirbyPageData extends KirbySharedPageData {
  blocks: KirbyBlock<string>[]
  layouts: KirbyLayout[]
}

export type KirbyPageResponse = KirbyQueryResponse<KirbyPageData>

export const sharedPageQuerySelects: KirbyQuerySchema['select'] = {
  uri: true,
  intendedTemplate: true,
  title: true,
  customTitle: true,
  description: true,
  cover: {
    query: 'page.cover.or(site.cover).toFile?.resize(1200)',
    select: ['url'],
  },
}

export function getPageQuery(pageId: string): KirbyQuerySchema {
  return {
    query: `page("${pageId}")`,
    select: {
      blocks: 'page.text.toResolvedBlocks',
      layouts: 'page.layout.toResolvedLayouts',
      ...sharedPageQuerySelects,
    },
  }
}
