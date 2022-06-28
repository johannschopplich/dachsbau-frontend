<script setup lang="ts">
const { data } = await useKql({
  query: 'kirby.page("blog")',
  select: {
    title: true,
    description: true,
    posts: {
      query: 'page.children.listed',
      select: {
        id: true,
        title: true,
        description: true,
        cover: {
          query: 'page.content.cover.toFile',
          select: ['id', 'filename', 'url', 'srcset'],
        },
      },
    },
  },
})

useHead(() => ({
  title: data.value?.result?.title,
  meta: [
    { name: 'og:title', content: data.value?.result?.title },
    { name: 'og:description', content: data.value?.result?.description },
    {
      name: 'twitter:title',
      content: data.value?.result?.title,
    },
    { name: 'twitter:description', content: data.value?.result?.description },
  ],
}))

const page = computed(() => data.value?.result)

// Random number between -1 and 1
const random = () => Math.random() * 4 - 2
</script>

<template>
  <div class="pt-36 pb-12">
    <div class="max-w-screen-md padding-content mx-auto mb-6">
      <h1 class="page-title w-3/4 hyphenate">Blog</h1>
    </div>

    <div class="max-w-screen-lg padding-content mx-auto">
      <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        <div
          v-for="(item, index) in page.posts"
          :key="index"
          class="group relative space-y-4"
        >
          <div :style="`transform: rotate(${random()}deg)`">
            <img
              v-if="item.cover"
              :srcset="item.cover.srcset"
              class="aspect-[3/2] w-full object-cover border-2 border-secondary-400 rounded-lg"
            />
            <div v-else class="w-full h-full bg-secondary-400 rounded-lg" />
          </div>

          <div class="px-2">
            <NuxtLink
              :to="{ path: `/${item.id}` }"
              class="text-2xl leading-none text-primary-700 font-heading-condensed group-hover:text-underline"
            >
              <span class="absolute inset-0" />
              {{ item.title }}
            </NuxtLink>

            <p class="font-serif leading-tight text-stone-500">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
