<script setup lang="ts">
const site = useSite()
</script>

<template>
  <header class="content py-6">
    <div class="flex gap-4 justify-center">
      <NuxtLink
        v-for="item in (site?.children ?? []).filter((i) => i.isListed)"
        :key="item.id"
        :to="{ path: item.id }"
        class="cursor-pointer text-2xl font-heading text-primary-700 hover:text-secondary-600"
      >
        {{ item.title }}
      </NuxtLink>
    </div>
  </header>
</template>
