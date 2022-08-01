<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'
import type { KirbyImage } from '~/types'

const props = defineProps<{
  block?: KirbyBlock<'image'>
}>()

const page = useCurrentPage()
const image = computed(() =>
  ((page.value?.images ?? []) as KirbyImage[]).find(
    (i) => i.filename === props.block.content.image?.[0]
  )
)

const figure = ref<HTMLElement | undefined>()
const { width } = useElementSize(figure)
</script>

<template>
  <figure ref="figure">
    <img
      class="handdrawn-mask"
      :src="block.content.location === 'web' ? block.content.src : undefined"
      :srcset="image?.srcset"
      :sizes="`${width}px`"
      loading="lazy"
      :alt="block.content.alt || image?.alt"
    />

    <figcaption v-if="block.content.caption" v-html="block.content.caption" />
  </figure>
</template>
