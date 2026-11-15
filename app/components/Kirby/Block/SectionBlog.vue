<script setup lang="ts">
import type { KirbyBlock } from 'kirby-types'
import type { ResolvedKirbyImage } from '#shared/types/kirby'

defineProps<{
  block: KirbyBlock<
    'section-blog',
    {
      posts: {
        title: string
        url: string
        description: string | null
        cover: Pick<ResolvedKirbyImage, 'width' | 'height' | 'srcset'> | null
      }[]
    }
  >
}>()

// Random rotation between -2 and 2 degrees.
function randomRotation() {
  return Math.random() * 4 - 2
}
</script>

<template>
  <div
    class="not-prose gap-6 grid lg:mx-[-128px] md:grid-cols-3 sm:grid-cols-2"
  >
    <div
      v-for="(post, index) in block.content.posts"
      :key="index"
      class="transform transition-transform duration-300 ease-out relative hover:rotate-0 hover:scale-102"
      :style="`--un-rotate: ${randomRotation()}deg`"
    >
      <div class="group p-4 pt-6 bg-secondary-100 handdrawn-mask">
        <AppImage
          v-if="post.cover"
          loading="lazy"
          class="w-full aspect-[3/2] object-cover handdrawn-mask"
          :srcset="post.cover.srcset"
          :width="post.cover.width"
          :height="post.cover.height"
          sizes="(min-width: 768px) 16rem, (min-width: 640px) 50vw, 100vw"
          :alt="`Titelbild für ${post.title}`"
        />
        <div
          v-else
          class="bg-secondary-400 w-full aspect-[3/2] handdrawn-mask"
        />

        <div class="mt-4 px-2">
          <NuxtLink
            :to="post.url"
            class="text-2xl text-primary-700 leading-none font-heading-condensed group-hover:text-underline"
          >
            <span class="inset-0 absolute" />
            {{ post.title }}
          </NuxtLink>

          <p
            class="text-size-base text-stone-600 leading-tight font-serif mt-2"
          >
            {{ post.description }}
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
