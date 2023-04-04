<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'

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
    }
  >
}>()

const page = usePage()
</script>

<template>
  <div class="not-prose grid grid-cols-2 gap-2 md:grid-cols-3">
    <div
      v-for="(item, index) in block.content.backers"
      :key="index"
      class="handdrawn-mask bg-secondary-100 relative p-3"
    >
      <div class="mb-2 flex justify-center">
        <KirbyUuidResolver
          v-if="item.logo?.length"
          v-slot="{ item: image }"
          :collection="page.images"
          :uuid="item.logo[0]"
        >
          <img class="h-10" :src="image.url" :alt="`Logo von ${item.title}`" />
        </KirbyUuidResolver>
        <div v-else class="h-10" />
      </div>

      <component
        :is="item.website ? 'a' : 'p'"
        :href="item.website ? item.website : undefined"
        :target="item.website ? '_blank' : undefined"
        :class="[
          'text-secondary-800 font-heading-condensed text-xl leading-none',
          item.website && 'hover:text-underline',
        ]"
      >
        <span class="absolute inset-0" />
        {{ item.title }}
      </component>
      <p class="text-secondary-600 font-serif text-sm" v-html="item.text" />
    </div>
  </div>
</template>
