<script setup lang="ts">
import type { KirbyLayout } from '#nuxt-kql'

defineProps<{
  layouts: KirbyLayout[]
}>()

/** Returns the number of columns this column spans */
function span(width: `${string}/${string}`, columns = 12) {
  const [a, b] = width.split('/')
  return columns * (parseInt(a) / parseInt(b))
}
</script>

<template>
  <div class="md:space-y-12">
    <section
      v-for="layout in layouts"
      :id="layout.id"
      :key="layout.id"
      class="gap-4 md:grid md:gap-16 md:grid-cols-12"
    >
      <div
        v-for="(column, index) in layout.columns"
        :key="index"
        :style="{
          gridColumn: `span ${span(column.width)}`,
        }"
      >
        <KirbyBlocks
          :blocks="column.blocks"
          class="prose text-secondary-900 font-serif md:text-xl md:font-350"
        />
      </div>
    </section>
  </div>
</template>
