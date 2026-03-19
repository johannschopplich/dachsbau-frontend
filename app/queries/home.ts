import type { KirbyQueryResponse, KirbyQuerySchema } from 'kirby-types'
import type { KirbySharedPageData } from './page'
import { sharedPageQuerySelects } from './page'

export interface KirbyHomeData extends KirbySharedPageData {
  intro: string
  contact: string
  children: {
    uri: string
    title: string
    description: string
    cover?: {
      srcset: string
    }
  }[]
  heroImage?: {
    srcset: string
  }
}

export type KirbyHomeResponse = KirbyQueryResponse<KirbyHomeData>

export const homeQuery: KirbyQuerySchema = {
  query: 'page("home")',
  select: {
    intro: true,
    contact: true,
    children: {
      query: 'page("angebote").children.listed',
      select: {
        uri: true,
        title: true,
        description: true,
        cover: {
          query: 'page.cover.toFile',
          select: ['srcset'],
        },
      },
    },
    heroImage: {
      query: 'page.heroImage.toFile',
      select: ['srcset'],
    },
    ...sharedPageQuerySelects,
  },
}
