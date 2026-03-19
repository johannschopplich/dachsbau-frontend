import type { KirbyQueryResponse, KirbyQuerySchema } from 'kirby-types'

export interface KirbySiteData {
  title: string
  description: string
  children: {
    uri: string
    title: string
    isListed: boolean
  }[]
  footer: {
    uri: string
    title: string
  }[]
  cover?: {
    url: string
  }
}

export type KirbySiteResponse = KirbyQueryResponse<KirbySiteData>

export const siteQuery: KirbyQuerySchema = {
  query: 'site',
  select: {
    title: true,
    description: true,
    children: {
      query: 'site.children',
      select: ['uri', 'title', 'isListed'],
    },
    cover: {
      query: 'site.cover.toFile?.resize(1200)',
      select: ['url'],
    },
    footer: {
      query: 'site.footer.toPages',
      select: ['uri', 'title'],
    },
  },
}
