<script setup lang="ts">
const site = useSite()
</script>

<template>
  <footer class="sticky top-[var(--h-screen)] padding-content py-6">
    <div class="flex gap-1 flex-col sm:flex-row sm:gap-4 sm:justify-center">
      <NuxtLink
        v-for="item in site?.footer ?? []"
        :key="item.id"
        :to="{ path: `/${item.id}` }"
        class="text-lg font-heading-condensed text-primary-700 hover:text-secondary-500 md:text-xl"
      >
        {{ item.title }}
      </NuxtLink>
    </div>
  </footer>
</template>
