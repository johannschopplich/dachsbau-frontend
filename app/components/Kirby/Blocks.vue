<script setup lang="ts">
import type { KirbyBlock } from 'kirby-types'
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
  blocks: KirbyBlock[]
}>()

const blockComponents: Record<string, Component> = {
  heading: LazyKirbyBlockHeading,
  image: LazyKirbyBlockImage,
  line: LazyKirbyBlockLine,
  list: LazyKirbyBlockList,
  quote: LazyKirbyBlockQuote,
  text: LazyKirbyBlockText,
  'section-backers': LazyKirbyBlockSectionBackers,
  'section-blog': LazyKirbyBlockSectionBlog,
}
</script>

<template>
  <div>
    <template v-for="(block, index) in blocks" :key="index">
      <component :is="blockComponents[block.type]" :block="block" />
    </template>
  </div>
</template>
