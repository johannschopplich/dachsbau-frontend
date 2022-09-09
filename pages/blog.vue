<script setup lang="ts">
const route = useRoute()
const { data } = await useKql({
  query: `kirby.page("${route.path}")`,
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
          query: 'page.cover.toFile',
          select: ['width', 'height', 'srcset'],
        },
      },
    },
  },
})

// Make current page data globally available
const page = setCurrentPage(data.value?.result)

// Random number between -1 and 1
function random() {
  return Math.random() * 4 - 2
}
</script>

<template>
  <div class="pt-36 pb-12">
    <div class="padding-content mx-auto mb-6 max-w-screen-md">
      <h1 class="page-title hyphenate md:w-3/4">Blog</h1>
    </div>

    <div class="padding-content mx-auto max-w-screen-lg">
      <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        <div
          v-for="(item, index) in page?.posts ?? []"
          :key="index"
          class="relative transform"
          :style="`--un-rotate: ${random()}deg`"
        >
          <div class="group handdrawn-mask bg-secondary-100 p-4 pt-6">
            <img
              v-if="item.cover"
              class="handdrawn-mask aspect-[3/2] w-full object-cover"
              :srcset="item.cover.srcset"
              :width="item.cover.width"
              :height="item.cover.height"
              sizes="(min-width: 768px) 16rem, (min-width: 640px) 50vw, 100vw"
              alt=""
            />
            <div
              v-else
              class="handdrawn-mask bg-secondary-400 aspect-[3/2] w-full"
            />

            <div class="mt-4 px-2">
              <NuxtLink
                :to="{ path: `/${item.id}` }"
                class="text-primary-700 font-heading-condensed group-hover:text-underline text-2xl leading-none"
              >
                <span class="absolute inset-0" />
                {{ item.title }}
              </NuxtLink>

              <p class="font-350 mt-2 font-serif leading-tight text-stone-600">
                {{ item.description }}
              </p>
            </div>

            <img
              class="pin"
              src="~/assets/img/pin-shadow-128.png"
              width="128"
              height="151"
              alt=""
              aria-hidden="true"
            />
          </div>

          <img
            class="pointer-events-none absolute -top-2 left-[calc(50%+1rem)] w-6 -translate-x-1/2"
            src="~/assets/img/pin-128.png"
            width="128"
            height="151"
            alt=""
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pin {
  --at-apply: 'absolute pointer-events-none -top-2 left-[calc(50%+1rem)] -translate-x-1/2 w-6';
}
</style>
