<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'
import type { KirbyFile } from '~/types'

const props = defineProps<{
  block?: KirbyBlock<'image'>
}>()

const page = usePage()
const files = computed<KirbyFile[]>(() => page.value?.files ?? [])
const srcset = computed(
  () =>
    files.value?.find((i) => i.filename === props.block.content.image[0])
      ?.srcset
)
</script>

<template>
  <figure class="!-mx-6 !sm:mx-[2em]">
    <img
      class="handdrawn-mask"
      :srcset="srcset"
      sizes="(min-width: 768px) 768px, 100vw"
      loading="lazy"
      :alt="block.content?.alt"
    />

    <figcaption v-if="block.content.caption">
      {{ block.content.caption }}
    </figcaption>
  </figure>
</template>
