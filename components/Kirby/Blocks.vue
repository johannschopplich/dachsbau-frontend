<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'
import type { Component } from 'vue'
import {
  LazyKirbyBlockHeading,
  LazyKirbyBlockImage,
  LazyKirbyBlockLine,
  LazyKirbyBlockList,
  LazyKirbyBlockQuote,
  LazyKirbyBlockSectionBackers,
  LazyKirbyBlockSectionBlog,
  LazyKirbyBlockText,
} from '#components'

defineProps<{
  blocks: KirbyBlock<string>[]
}>()

const blockComponents: Record<string, Component> = {
  heading: LazyKirbyBlockHeading,
  image: LazyKirbyBlockImage,
  line: LazyKirbyBlockLine,
  list: LazyKirbyBlockList,
  quote: LazyKirbyBlockQuote,
  text: LazyKirbyBlockText,
  // Custom blocks
  'section-backers': LazyKirbyBlockSectionBackers,
  'section-blog': LazyKirbyBlockSectionBlog,
}

const content = ref<HTMLElement | undefined>()
useInternalLinks(content)
</script>

<template>
  <div ref="content">
    <template v-for="(block, index) in blocks" :key="index">
      <component :is="blockComponents[block.type]" :block="block" />
    </template>
  </div>
</template>
