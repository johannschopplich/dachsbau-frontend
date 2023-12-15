<script setup lang="ts">
const site = useSite()
</script>

<template>
  <footer class="sticky top-[100svh] pb-6 pt-12 padding-content">
    <div class="flex flex-col sm:flex-row sm:justify-center sm:gap-4">
      <NuxtLink
        v-for="item in site.footer"
        :key="item.id"
        :to="`/${item.id}`"
        class="text-lg text-primary-700 font-heading-condensed md:text-xl hover:text-secondary-500"
      >
        {{ item.title }}
      </NuxtLink>
    </div>
  </footer>
</template>
