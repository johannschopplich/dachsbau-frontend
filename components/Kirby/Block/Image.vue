<script lang="ts">
export interface ResolvedKirbyImage {
  url: string
  width: number
  height: number
  srcset: string
  alt: string | null
}
</script>

<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  block: KirbyBlock<
    'resolved-image',
    {
      location: string
      image: string[]
      src: string
      alt: string
      caption: string
      link: string
      resolved: {
        image: ResolvedKirbyImage[]
      }
    }
  >
}>()

const figure = ref<HTMLElement | undefined>()
const { width } = useElementSize(figure)
</script>

<template>
  <figure ref="figure">
    <img
      class="handdrawn-mask"
      :src="block.content.location === 'web' ? block.content.src : undefined"
      :srcset="block.content.resolved.image?.[0].srcset"
      :width="block.content.resolved.image?.[0].width"
      :height="block.content.resolved.image?.[0].height"
      :sizes="`${width}px`"
      :alt="block.content.alt || block.content.resolved.image?.[0].alt || ''"
    />

    <figcaption v-if="block.content.caption" v-html="block.content.caption" />
  </figure>
</template>
