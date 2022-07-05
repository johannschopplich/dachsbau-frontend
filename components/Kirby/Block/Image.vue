<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'
import type { KirbyImage } from '~/types'

const props = defineProps<{
  block?: KirbyBlock<'image'>
}>()

const page = usePage()
const image = computed(() =>
  ((page.value?.images ?? []) as KirbyImage[]).find(
    (i) => i.filename === props.block.content.image?.[0]
  )
)
</script>

<template>
  <figure class="!-mx-6 !sm:mx-[2em]">
    <img
      class="handdrawn-mask"
      :src="block.content.location === 'web' ? block.content.src : undefined"
      :srcset="image?.srcset"
      sizes="(min-width: 768px) 768px, 100vw"
      loading="lazy"
      :alt="block.content.alt || image?.alt"
    />

    <figcaption v-if="block.content.caption" v-html="block.content.caption" />
  </figure>
</template>
