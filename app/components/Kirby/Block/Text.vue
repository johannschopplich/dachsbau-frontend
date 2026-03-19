<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kirby'

defineProps<{
  block: KirbyBlock<
    'text',
    {
      text: string
      resolved: {
        text: string
      }
    }
  >
}>()
</script>

<template>
  <div class="prose" v-html="block.content.resolved.text" />
</template>
