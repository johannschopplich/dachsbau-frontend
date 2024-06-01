<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'
import type { ResolvedKirbyImage } from '~/types/kirby'

defineProps<{
  block: KirbyBlock<
    'section-backers',
    {
      backers: {
        title: string
        website: string
        text: string
        logo: string[]
      }[]
      resolved?: {
        backers: {
          title: string
          website: string
          text: string
          logo: ResolvedKirbyImage | null
        }[]
      }
    }
  >
}>()
</script>

<template>
  <div class="not-prose grid grid-cols-2 gap-2 md:grid-cols-3">
    <div
      v-for="(item, index) in block.content.resolved?.backers"
      :key="index"
      class="handdrawn-mask relative bg-secondary-100 p-3"
    >
      <div class="mb-2 flex justify-center">
        <img
          v-if="item.logo?.url"
          class="h-10 object-contain"
          :width="item.logo.width"
          :height="item.logo.height"
          :src="item.logo.url"
          :alt="`Logo von ${item.title}`"
        />
        <div v-else class="h-10" />
      </div>

      <component
        :is="item.website ? 'a' : 'p'"
        :href="item.website ? item.website : undefined"
        :target="item.website ? '_blank' : undefined"
        class="text-xl text-secondary-800 leading-none font-heading-condensed"
        :class="[item.website && 'hover:text-underline']"
      >
        <span class="absolute inset-0" />
        {{ item.title }}
      </component>
      <p class="text-sm text-secondary-600 font-serif" v-html="item.text" />
    </div>
  </div>
</template>
