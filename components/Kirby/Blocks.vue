<script setup lang="ts">
import { KirbyBlockHeading, KirbyBlockImage, KirbyBlockText } from '#components'
import type { KirbyBlock, KirbyBlockType } from '#nuxt-kql'
import type { KirbyFile } from '~/types'

defineProps<{
  blocks?: KirbyBlock<string>[]
  files?: KirbyFile[]
}>()

const blockComponents: Partial<Record<KirbyBlockType, any>> = {
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
