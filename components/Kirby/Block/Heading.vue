<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  block?: KirbyBlock<'heading'>
}>()
</script>

<template>
  <component :is="block.content.level" v-if="block.type === 'heading'">
    {{ block.content.text }}
  </component>
</template>
