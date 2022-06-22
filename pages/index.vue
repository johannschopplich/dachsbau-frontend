<script setup lang="ts">
definePageMeta({
  layout: 'home',
})

const { data } = await useQuery({
  query: 'kirby.page("dachse").children.listed',
  select: {
    id: 'page.id',
    title: 'page.title',
  },
})
</script>

<template>
  <div>
    <div class="w-full h-[calc(100vh-3rem)] flex items-center justify-center">
      <div class="max-w-screen-lg mx-auto py-12 content">
        <p class="text-6xl font-heading text-primary-500">
          Praxis für Yoga, systemische Beratung und Frauenbegleitung
        </p>
      </div>
    </div>

    <div class="bg-primary-700">
      <div class="max-w-screen-lg mx-auto py-12 content">
        <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div
            v-for="(item, index) in data?.result"
            :key="index"
            class="aspect-[2/3] relative rounded-3xl overflow-hidden"
          >
            <img
              class="h-full rounded-3xl object-cover"
              src="https://picsum.photos/200/300"
              alt=""
            />
            <p
              class="absolute bottom-2 left-0 w-full text-3xl font-heading-condensed text-secondary-200 text-center"
            >
              {{ item.title }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="w-full h-[calc(100vh-3rem)] bg-secondary-400 flex items-center justify-center"
    >
      <div class="max-w-screen-lg mx-auto py-12 content">
        <p class="text-4xl font-heading text-white">
          Praxis für Yoga, systemische Beratung und Frauenbegleitung
        </p>
      </div>
    </div>
  </div>
</template>
