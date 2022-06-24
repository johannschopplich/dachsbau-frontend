<script setup lang="ts">
const site = useSite()
</script>

<template>
  <footer class="sticky top-[var(--h-screen)] content-base py-6">
    <div class="flex gap-4 justify-center">
      <NuxtLink
        v-for="item in site?.footer ?? []"
        :key="item.id"
        :to="{ path: item.id }"
        class="text-lg font-heading-condensed text-primary-700 hover:text-secondary-500 md:text-xl"
      >
        {{ item.title }}
      </NuxtLink>
    </div>
  </footer>
</template>
