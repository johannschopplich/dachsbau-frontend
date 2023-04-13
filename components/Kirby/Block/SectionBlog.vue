<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  block: KirbyBlock<'section-blog'>
}>()

const { data } = await useKql({
  query: 'kirby.page("blog").children.listed',
  select: {
    id: true,
    title: true,
    description: true,
    cover: {
      query: 'page.cover.toFile',
      select: ['width', 'height', 'srcset'],
    },
  },
})

// Random number between -1 and 1
function random() {
  return Math.random() * 4 - 2
}
</script>

<template>
  <div
    class="not-prose grid gap-6 md:grid-cols-3 sm:grid-cols-2 lg:mx-[-128px]"
  >
    <div
      v-for="(item, index) in data?.result"
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
          class="handdrawn-mask aspect-[3/2] w-full bg-secondary-400"
        />

        <div class="mt-4 px-2">
          <NuxtLink
            :to="`/${item.id}`"
            class="font-heading-condensed text-2xl leading-none text-primary-700 group-hover:text-underline"
          >
            <span class="absolute inset-0" />
            {{ item.title }}
          </NuxtLink>

          <p
            class="mt-2 font-serif text-size-base leading-tight text-stone-600"
          >
            {{ item.description }}
          </p>
        </div>

        <img
          class="pointer-events-none absolute left-[calc(50%+1rem)] w-6 -top-2 -translate-x-1/2"
          src="~/assets/img/pin-shadow-128.png"
          width="128"
          height="151"
          alt=""
          aria-hidden="true"
        />
      </div>

      <img
        class="pointer-events-none absolute left-[calc(50%+1rem)] w-6 -top-2 -translate-x-1/2"
        src="~/assets/img/pin-128.png"
        width="128"
        height="151"
        alt=""
        aria-hidden="true"
      />
    </div>
  </div>
</template>
