<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kirby'
import type { KirbyBlogCardsResponse } from '~/queries'
import { blogCardsQuery } from '~/queries'

defineProps<{
  block: KirbyBlock<'section-blog'>
}>()

const { data } = await useKql<KirbyBlogCardsResponse>(blogCardsQuery)

// Random number between -1 and 1
function random() {
  return Math.random() * 4 - 2
}
</script>

<template>
  <div
    class="not-prose gap-6 grid lg:mx-[-128px] md:grid-cols-3 sm:grid-cols-2"
  >
    <div
      v-for="(item, index) in data?.result"
      :key="index"
      class="transform relative"
      :style="`--un-rotate: ${random()}deg`"
    >
      <div class="group p-4 pt-6 bg-secondary-100 handdrawn-mask">
        <img
          v-if="item.cover"
          class="w-full aspect-[3/2] object-cover handdrawn-mask"
          :srcset="item.cover.srcset"
          :width="item.cover.width"
          :height="item.cover.height"
          sizes="(min-width: 768px) 16rem, (min-width: 640px) 50vw, 100vw"
          :alt="`Titelbild für ${item.title}`"
        />
        <div
          v-else
          class="bg-secondary-400 w-full aspect-[3/2] handdrawn-mask"
        />

        <div class="mt-4 px-2">
          <NuxtLink
            :to="`/${item.uri}`"
            class="text-2xl text-primary-700 leading-none font-heading-condensed group-hover:text-underline"
          >
            <span class="inset-0 absolute" />
            {{ item.title }}
          </NuxtLink>

          <p
            class="text-size-base text-stone-600 leading-tight font-serif mt-2"
          >
            {{ item.description }}
          </p>
        </div>

        <img
          class="w-6 pointer-events-none left-[calc(50%+1rem)] absolute -translate-x-1/2 -top-2"
          src="~/assets/img/pin-shadow-128.png"
          width="128"
          height="151"
          alt=""
          aria-hidden="true"
        />
      </div>

      <img
        class="w-6 pointer-events-none left-[calc(50%+1rem)] absolute -translate-x-1/2 -top-2"
        src="~/assets/img/pin-128.png"
        width="128"
        height="151"
        alt=""
        aria-hidden="true"
      />
    </div>
  </div>
</template>
