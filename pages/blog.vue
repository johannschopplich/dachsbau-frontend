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
          select: ['id', 'filename', 'url', 'srcset', 'alt'],
        },
      },
    },
  },
})

const page = computed(() => data.value.result)
usePage(data.value.result)

// Random number between -1 and 1
const random = () => Math.random() * 4 - 2
</script>

<template>
  <div class="pt-36 pb-12">
    <div class="max-w-screen-md padding-content mx-auto mb-6">
      <h1 class="page-title hyphenate md:w-3/4">Blog</h1>
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
              class="handdrawn-mask aspect-[3/2] w-full object-cover"
              :srcset="item.cover.srcset"
              sizes="(min-width: 768px) 16rem, (min-width: 640px) 50vw, 100vw"
              loading="lazy"
            />
            <div
              v-else
              class="handdrawn-mask aspect-[3/2] w-full bg-secondary-400"
            />
          </div>

          <div class="px-2">
            <NuxtLink
              :to="{ path: `/${item.id}` }"
              class="text-2xl leading-none text-primary-700 font-heading-condensed group-hover:text-underline"
            >
              <span class="absolute inset-0" />
              {{ item.title }}
            </NuxtLink>

            <p class="text-stone-500 font-serif leading-tight font-350">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
