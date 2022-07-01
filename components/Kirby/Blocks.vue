<script setup lang="ts">
import { KirbyBlockHeading, KirbyBlockImage, KirbyBlockText } from '#components'
import type { ComponentPublicInstance } from 'vue'
import type { KirbyBlock, KirbyBlockType } from '#nuxt-kql'
import type { KirbyFile } from '~/types'

defineProps<{
  blocks?: KirbyBlock<string>[]
  files?: KirbyFile[]
}>()

const blockComponents: Partial<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<KirbyBlockType, new (...args: any[]) => ComponentPublicInstance>
> = {
  heading: KirbyBlockHeading,
  image: KirbyBlockImage,
  text: KirbyBlockText,
}
</script>

<template>
  <template v-for="(block, index) in blocks ?? []" :key="index">
    <component
      :is="blockComponents[block.type]"
      :block="block"
      :files="files"
    />
  </template>
</template>
