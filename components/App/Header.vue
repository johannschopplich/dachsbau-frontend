<script setup lang="ts">
const site = useSite()
</script>

<template>
  <header class="absolute top-6 left-0 w-full content-base z-10">
    <div class="flex gap-4 justify-center mx-auto">
      <NuxtLink
        v-for="item in (site?.children ?? []).filter((i) => i.isListed)"
        :key="item.id"
        :to="{ path: item.id }"
        class="text-xl font-heading text-primary-700 hover:text-secondary-600 md:text-2xl"
      >
        {{ item.title }}
      </NuxtLink>
    </div>
  </header>
</template>
