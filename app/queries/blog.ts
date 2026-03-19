import type { KirbyQueryResponse, KirbyQuerySchema } from 'kirby-types'

export interface KirbyBlogCardData {
  uri: string
  title: string
  description: string
  cover?: {
    width: number
    height: number
    srcset: string
  }
}

export type KirbyBlogCardsResponse = KirbyQueryResponse<KirbyBlogCardData[]>

export const blogCardsQuery: KirbyQuerySchema = {
  query: 'page("blog").children.listed',
  select: {
    uri: true,
    title: true,
    description: true,
    cover: {
      query: 'page.cover.toFile',
      select: ['width', 'height', 'srcset'],
    },
  },
}
