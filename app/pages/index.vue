<script setup lang="ts">
import type { KirbyHomeResponse } from '~/queries'
import { promiseTimeout } from '@vueuse/core'
import { homeQuery } from '~/queries'

const { data } = await useKql<KirbyHomeResponse>(homeQuery)

const page = data.value?.result

if (!page) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Failed to load homepage',
  })
}

setPage(page)

const isTouchscreen = import.meta.client
  ? matchMedia('(hover: none), (pointer: coarse)').matches
  : false
const appContainer = useAppContainer()
const animationStack = reactive(new Map<number, boolean>())

onMounted(() => {
  const { height } = useWindowSize()
  const { pause, resume } = useRafFn(setScreenRatioVar, { immediate: false })
  const { y } = useScroll(appContainer, {
    onScroll() {
      resume()
    },
    onStop() {
      pause()
    },
  })

  setScreenRatioVar()

  function setScreenRatioVar() {
    document.documentElement.style.setProperty(
      '--screen-ratio',
      y.value < height.value ? `${y.value / height.value}` : '1',
    )
  }
})

/** Delays navigation on touch devices to let animations complete. */
async function delayedNavigateTo(...args: Parameters<typeof navigateTo>) {
  if (isTouchscreen) {
    await promiseTimeout(500)
  }

  await navigateTo(...args)
}
</script>

<template>
  <div>
    <h1 class="sr-only">Dachsbau Tautenhain</h1>

    <div class="h-[var(--content-height)] w-full relative">
      <div
        class="flex pointer-events-none translate-y-$translate items-center inset-x-0 top-1/6 justify-center absolute md:top-1/10"
        style="--translate: calc(100% * var(--screen-ratio))"
        aria-hidden="true"
      >
        <img
          class="animate-bounce-mellow opacity-25 w-[min(75vw,22rem)]"
          srcset="
            ~/assets/img/dachsbau-hof-512.png   512w,
            ~/assets/img/dachsbau-hof-1024.png 1024w
          "
          sizes="
            (min-width: 768px) 22rem,
            75vw
          "
          width="1024"
          height="649"
          alt=""
        />
      </div>

      <div
        class="mx-auto gutter gap-4 grid grid-rows-[1fr_auto_1fr] h-full max-w-screen-md relative"
      >
        <div />
        <p
          class="text-4xl text-primary-500 font-heading text-center md:text-6xl"
          v-html="page.intro"
        />
        <div class="mx-auto bg-primary-500 w-2px"></div>
      </div>
    </div>

    <div
      class="animated-bg-container h-$height w-full"
      style="--height: calc(var(--h) * var(--content-height))"
      aria-hidden="true"
    >
      <div
        class="mx-auto rounded-t-full flex h-full w-[50vw] transform-origin-bottom scale-$scale items-end overflow-hidden lg:w-[30vw] md:w-[40vw]"
        style="--scale: calc(1 + 0.5 * var(--screen-ratio))"
      >
        <img
          v-if="page.heroImage"
          class="h-$height w-full object-cover object-bottom"
          style="--height: calc(200% - (100% * var(--screen-ratio)))"
          :srcset="page.heroImage.srcset"
          sizes="
            (min-width: 768px) 50vw,
            100vw"
          alt=""
        />
        <div v-else class="bg-secondary-400 h-full w-full" />
      </div>
    </div>

    <div class="py-12 space-y-12">
      <div
        class="mx-auto bg-primary-500 h-$height w-2px"
        style="--height: calc(0.25 * var(--content-height))"
      />
      <p class="text-4xl text-primary-500 font-heading text-center md:text-6xl">
        Angebote
      </p>
    </div>

    <div class="bg-primary-700">
      <div class="mx-auto gutter py-12 max-w-screen-lg">
        <div class="space-y-12">
          <div
            v-for="(item, index) in page.children"
            :key="index"
            class="group flex flex-col gap-4 relative sm:flex-row sm:gap-12"
            @mouseenter="animationStack.set(index, true)"
            @mouseleave="animationStack.set(index, false)"
          >
            <!-- Hijack the click event to prevent the animation from
            being interrupted on mobile devices -->
            <div
              class="cursor-pointer inset-0 absolute z-10"
              @click="delayedNavigateTo(`/${item.uri}`)"
            />

            <NuxtLink
              :to="`/${item.uri}`"
              class="sm:w-1/2"
              :class="[index % 2 === 1 && 'sm:order-2']"
              :aria-label="item.title"
            >
              <img
                v-if="item.cover"
                class="w-full aspect-[3/2] object-cover handdrawn-mask"
                :srcset="item.cover.srcset"
                sizes="(min-width: 768px) 32rem, (min-width: 640px) 50vw, 100vw"
                :alt="`Titelbild für ${item.title}`"
              />
              <div
                v-else
                class="bg-secondary-400 h-full w-full aspect-[3/2] handdrawn-mask"
              />
            </NuxtLink>

            <NuxtLink
              :to="`/${item.uri}`"
              class="px-4 flex justify-center sm:px-0 sm:w-1/2 sm:items-center"
            >
              <div>
                <div class="inline-block relative">
                  <HomeAnimatedDash :is-active="animationStack.get(index)" />

                  <span
                    class="text-2xl text-secondary-200 font-heading-condensed relative md:text-4xl"
                  >
                    {{ item.title }}
                  </span>
                </div>

                <div
                  class="text-secondary-200 font-serif md:text-xl md:font-350"
                >
                  {{ item.description }}
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="h-[var(--content-height)] w-full">
      <div
        class="mx-auto gutter flex h-full max-w-screen-md items-center justify-end sm:justify-center"
      >
        <div class="flex gap-3 items-end md:gap-12">
          <div>
            <h2
              class="text-4xl text-primary-500 font-heading mb-6 w-min relative md:text-6xl"
            >
              <img
                class="pointer-events-none scale-150 right-0 top-1/2 absolute -translate-y-1/2 -left-2"
                src="~/assets/img/menu-hover-01.svg"
                alt=""
                aria-hidden="true"
              />
              <span>Kontakt</span>
            </h2>
            <div
              class="prose text-secondary-900 font-serif md:text-xl md:font-350"
            >
              <p v-html="page.contact" />
            </div>
          </div>
          <div class="flex-shrink-0">
            <img
              loading="lazy"
              class="h-[12rem] -mb-2 md:h-[16rem]"
              src="~/assets/img/dachsbau-mueffels.png"
              alt="Meerschweinchen im Dachsbau"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-bounce-mellow {
  animation: bounce-mellow 4s infinite;
}

@keyframes bounce-mellow {
  0% {
    transform: translateY(0) scaleX(1);
  }
  50% {
    transform: translateY(0.5rem) scaleX(0.98);
  }
  100% {
    transform: translateY(0) scaleX(1);
  }
}

.animated-bg-container {
  --h: 0.5;
}

@media (min-width: 768px) {
  .animated-bg-container {
    --h: 0.75;
  }
}

@media (min-width: 1024px) {
  .animated-bg-container {
    --h: 1;
  }
}
</style>
