<script setup lang="ts">
const site = useSite()
</script>

<template>
  <footer class="content py-6">
    <div class="flex gap-4 justify-center">
      <NuxtLink
        v-for="item in site?.footer ?? []"
        :key="item.id"
        :to="{ path: item.id }"
        class="cursor-pointer text-xl font-heading-condensed text-primary-700 hover:text-secondary-500"
      >
        {{ item.title }}
      </NuxtLink>
    </div>
  </footer>
</template>
