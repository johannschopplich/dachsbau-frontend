<script setup lang="ts">
const { data } = await useKql({
  query: 'site',
  select: {
    title: 'site.title',
  },
})

console.log(data.value.result)
</script>

<template>Test</template>
