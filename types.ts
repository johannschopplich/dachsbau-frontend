import type { RouterScrollBehavior } from 'vue-router'
import type { KirbyBlock, KirbyLayout } from '#nuxt-kql'

export type ScrollPosition = Awaited<ReturnType<RouterScrollBehavior>>

export interface KirbyImage {
  id: string
  uuid: string
  url: string
  width: string
  height: string
  srcset: string
  alt: string
}

export interface KirbyDefaultPage {
  id: string
  title: string
  description: string
  text?: KirbyBlock[]
  layouts?: KirbyLayout[]
  images: KirbyImage[]
}
