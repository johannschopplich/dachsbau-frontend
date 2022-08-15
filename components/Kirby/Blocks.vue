<script setup lang="ts">
import {
  KirbyBlockHeading,
  KirbyBlockImage,
  KirbyBlockLine,
  KirbyBlockList,
  KirbyBlockQuote,
  KirbyBlockText,
  // @ts-expect-error: To be fixed in Nuxt upstream
} from '#components'
import type { ComponentPublicInstance } from 'vue'
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  blocks: KirbyBlock<string>[]
}>()

const blockComponents: Partial<
  Record<string, new () => ComponentPublicInstance>
> = {
  heading: KirbyBlockHeading,
  image: KirbyBlockImage,
  line: KirbyBlockLine,
  list: KirbyBlockList,
  quote: KirbyBlockQuote,
  text: KirbyBlockText,
}

const router = useRouter()
const route = useRoute()
const content = ref<HTMLElement | undefined>()

if (process.client) {
  useEventListener(window, 'hashchange', navigate)
  useEventListener(content, 'click', handleAnchors)
}

function navigate() {
  if (window.location.hash) {
    document
      .querySelector(window.location.hash)
      ?.scrollIntoView({ behavior: 'smooth' })
  }
}

function handleAnchors(
  event: MouseEvent & {
    target: HTMLElement
  }
) {
  const link = event.target.closest('a')

  if (
    !event.defaultPrevented &&
    link &&
    event.button === 0 &&
    link.target !== '_blank' &&
    link.rel !== 'external' &&
    !link.download &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  ) {
    const url = new URL(link.href)
    const { origin, pathname: path, hash } = url

    if (origin !== window.location.origin) return
    event.preventDefault()

    if (hash && (!path || path === route.path)) {
      window.history.replaceState({}, '', link.href)
      navigate()
    } else {
      router.push({ path, hash })
    }
  }
}
</script>

<template>
  <div ref="content">
    <template v-for="(block, index) in blocks ?? []" :key="index">
      <component :is="blockComponents[block.type]" :block="block" />
    </template>
  </div>
</template>
