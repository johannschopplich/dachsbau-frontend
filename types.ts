/* eslint-disable @typescript-eslint/no-explicit-any */
import type { KirbyBlock, KirbyQueryResponse } from '#nuxt-kql'

export interface KirbyFile {
  id: string
  filename: string
  url: string
  srcset: string
}

export interface KirbySite {
  title: string
  description: string
  children: {
    id: string
    title: string
    isListed: boolean
  }[]
  cover: KirbyFile
  footer: {
    id: string
    title: string
  }[]
}

export interface KirbyDefaultPageQuery {
  query: `kirby.page("${string}")`
  select: {
    id: string | boolean
    title: string | boolean
    description: string | boolean
    text: string | boolean
    files: {
      query: string
      select: string[] | Record<string, any>
    }
  }
}

export interface KirbyDefaultPage extends KirbyQueryResponse {
  result?: {
    id: string
    title: string
    description: string
    text: KirbyBlock[]
    files: KirbyFile[]
  }
}
