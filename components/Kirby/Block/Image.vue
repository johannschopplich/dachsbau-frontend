<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'
import type { KirbyImage } from '~/types'

defineProps<{
  block: KirbyBlock<
    'resolved-image',
    {
      location: string
      image: KirbyImage
      src: string
      alt: string
      caption: string
      link: string
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
      :srcset="block.content.image.srcset"
      :width="block.content.image.width"
      :height="block.content.image.height"
      :sizes="`${width}px`"
      :alt="block.content.alt || block.content.image.alt"
    />

    <figcaption v-if="block.content.caption" v-html="block.content.caption" />
  </figure>
</template>
