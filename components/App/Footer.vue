<script setup lang="ts">
const site = useSite()
</script>

<template>
  <footer class="padding-content sticky top-[var(--h-screen)] py-6">
    <div class="flex flex-col sm:flex-row sm:justify-center sm:gap-4">
      <NuxtLink
        v-for="item in site?.footer ?? []"
        :key="item.id"
        :to="{ path: `/${item.id}` }"
        class="font-heading-condensed text-primary-700 hover:text-secondary-500 text-lg md:text-xl"
      >
        {{ item.title }}
      </NuxtLink>
    </div>
  </footer>
</template>
