import type { KirbyBlock, KirbyQueryResponse } from '#nuxt-kql'

export interface KirbySite {
  title?: string
  children?: {
    id: string
    title: string
    isListed: boolean
  }[]
  footer?: {
    id: string
    title: string
  }[]
}

export interface KirbyDefaultPageQuery {
  query: `kirby.page("${string}")`
  select: {
    id: string | boolean
    isErrorPage: string | boolean
    title: string | boolean
    text: string | boolean
    files: {
      query: string
      select: {
        id: string | boolean
        filename: string | boolean
        url: string | boolean
        srcset: string | boolean
      }
    }
  }
}

export interface KirbyDefaultPage extends KirbyQueryResponse {
  result?: {
    id: string
    isErrorPage: boolean
    title: string
    text: KirbyBlock[]
    files: {
      id: string
      filename: string
      url: string
      srcset: string
    }[]
  }
}
