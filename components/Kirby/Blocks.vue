<script setup lang="ts">
import {
  KirbyBlockHeading,
  KirbyBlockImage,
  KirbyBlockLine,
  KirbyBlockList,
  KirbyBlockQuote,
  KirbyBlockText,
} from '#components'
import type { ComponentPublicInstance } from 'vue'
import type { KirbyBlock, KirbyBlockType } from '#nuxt-kql'
import type { KirbyFile } from '~/types'

defineProps<{
  blocks?: KirbyBlock<string>[]
  files?: KirbyFile[]
}>()

const blockComponents: Partial<
  Record<KirbyBlockType, new (...args: any[]) => ComponentPublicInstance>
> = {
  heading: KirbyBlockHeading,
  image: KirbyBlockImage,
  line: KirbyBlockLine,
  list: KirbyBlockList,
  quote: KirbyBlockQuote,
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
