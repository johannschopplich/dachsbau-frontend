/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InjectionKey, Ref } from 'vue'
import type { KirbyBlock, KirbyLayout } from '#nuxt-kql'

export const containerInjectionKey = Symbol('container') as InjectionKey<
  Ref<HTMLElement | undefined>
>

export interface KirbyImage {
  id: string
  filename: string
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
