<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'
import type { KirbyFile } from '~/types'

defineProps<{
  block?: KirbyBlock<'image'>
  files?: KirbyFile[]
}>()
</script>

<template>
  <figure class="!-mx-6 !sm:mx-[2em]">
    <img
      class="handdrawn-mask"
      :srcset="
        files?.find((i) => i.filename === block.content.image[0])?.srcset
      "
      sizes="(min-width: 768px) 768px, 100vw"
      loading="lazy"
      :alt="block.content?.alt"
    />

    <figcaption v-if="block.content.caption">
      {{ block.content.caption }}
    </figcaption>
  </figure>
</template>
