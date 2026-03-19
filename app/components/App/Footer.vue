<script setup lang="ts">
const site = useSite()
</script>

<template>
  <footer class="gutter pb-6 pt-12 top-[100svh] sticky">
    <div class="flex flex-col sm:flex-row sm:gap-4 sm:justify-center">
      <NuxtLink
        v-for="item in site.footer ?? []"
        :key="item.uri"
        :to="`/${item.uri}`"
        class="text-lg text-primary-700 font-heading-condensed md:text-xl hover:text-secondary-500"
      >
        {{ item.title }}
      </NuxtLink>
    </div>
  </footer>
</template>
