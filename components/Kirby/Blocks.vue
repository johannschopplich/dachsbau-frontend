<script setup lang="ts">
import { KirbyBlock } from '#nuxt-kql'
import type { KirbyFile } from '~/types'

defineProps<{
  blocks?: KirbyBlock<string>[]
  files?: KirbyFile[]
}>()
</script>

<template>
  <template v-for="(block, index) in blocks ?? []" :key="index">
    <component :is="block.content.level" v-if="block.type === 'heading'">
      {{ (block as KirbyBlock<'heading'>).content.text }}
    </component>

    <figure v-else-if="block.type === 'image'" class="!-mx-6 !sm:mx-[2em]">
      <img
        class="handdrawn-mask"
        :srcset="
          files?.find((i) => i.filename === block.content.image[0])?.srcset
        "
        sizes="(min-width: 768px) 768px, 100vw"
        alt=""
      />
      <figcaption v-if="block.content.caption">
        {{ block.content.caption }}
      </figcaption>
    </figure>

    <div v-else v-html="block.content.text" />
  </template>
</template>
