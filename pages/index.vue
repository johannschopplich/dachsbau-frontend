<script setup lang="ts">
import { promiseTimeout } from '@vueuse/core'

const { data } = await useKql({
  query: 'kirby.page("home")',
  select: {
    id: true,
    intendedTemplate: true,
    intro: true,
    contact: true,
    children: {
      query: 'kirby.page("angebote").children.listed',
      select: {
        id: true,
        title: true,
        description: true,
        cover: {
          query: 'page.cover.toFile',
          select: ['srcset'],
        },
      },
    },
    heroImage: {
      query: 'page.heroImage.toFile',
      select: ['srcset'],
    },
    // Social media preview
    cover: {
      query: 'page.cover.or(site.cover).toFile?.resize(1200)',
      select: ['url'],
    },
  },
})

const page = data.value?.result
setPage(page)

const isTouchscreen = process.client
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

/**
 * Delay the navigation to the next page by 500ms on mobile devices to allow
 * the animation to finish
 */
async function delayedNavigateTo(...args: Parameters<typeof navigateTo>) {
  if (isTouchscreen) {
    await promiseTimeout(500)
  }

  await navigateTo(...args)
}
</script>

<template>
  <div>
    <div class="relative h-[var(--content-height)] w-full">
      <div
        class="pointer-events-none absolute inset-x-0 top-1/6 flex translate-y-$translate items-center justify-center md:top-1/10"
        style="--translate: calc(100% * var(--screen-ratio))"
        aria-hidden="true"
      >
        <img
          class="animate-bounce-mellow w-[min(75vw,22rem)] opacity-25"
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
        class="relative grid grid-rows-[1fr_auto_1fr] mx-auto h-full max-w-screen-md gap-4 padding-content"
      >
        <div />
        <p class="title text-center" v-html="page.intro" />
        <div class="mx-auto w-2px bg-primary-500"></div>
      </div>
    </div>

    <div
      class="animated-bg-container h-$height w-full"
      style="--height: calc(var(--h) * var(--content-height))"
      aria-hidden="true"
    >
      <div
        class="mx-auto h-full w-[50vw] flex transform-origin-bottom scale-$scale items-end overflow-hidden rounded-t-full lg:w-[30vw] md:w-[40vw]"
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
        <div v-else class="h-full w-full bg-secondary-400" />
      </div>
    </div>

    <div class="py-12 space-y-12">
      <div
        class="mx-auto h-$height w-2px bg-primary-500"
        style="--height: calc(0.25 * var(--content-height))"
      />
      <p class="title text-center">Angebote</p>
    </div>

    <div class="bg-primary-700">
      <div class="mx-auto max-w-screen-lg py-12 padding-content">
        <div class="space-y-12">
          <div
            v-for="(item, index) in page?.children ?? []"
            :key="index"
            class="group relative flex flex-col gap-4 sm:flex-row sm:gap-12"
            @mouseenter="animationStack.set(index, true)"
            @mouseleave="animationStack.set(index, false)"
          >
            <!-- Hijack the click event to prevent the animation from
            being interrupted on mobile devices -->
            <div
              class="absolute inset-0 z-10 cursor-pointer"
              @click="delayedNavigateTo(`/${item.id}`)"
            />

            <NuxtLink
              :to="`/${item.id}`"
              class="sm:w-1/2"
              :class="[index % 2 === 1 && 'sm:order-2']"
              :aria-label="item.title"
            >
              <img
                v-if="item.cover"
                class="handdrawn-mask aspect-[3/2] w-full object-cover"
                :srcset="item.cover.srcset"
                sizes="(min-width: 768px) 32rem, (min-width: 640px) 50vw, 100vw"
                :alt="`Titelbild für ${item.title}`"
              />
              <div
                v-else
                class="handdrawn-mask aspect-[3/2] h-full w-full bg-secondary-400"
              />
            </NuxtLink>

            <NuxtLink
              :to="`/${item.id}`"
              class="flex justify-center px-4 sm:w-1/2 sm:items-center sm:px-0"
            >
              <div>
                <div class="relative inline-block">
                  <HomeAnimatedDash :is-active="animationStack.get(index)" />

                  <span
                    class="relative text-2xl text-secondary-200 font-heading-condensed md:text-4xl"
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
        class="mx-auto h-full max-w-screen-md flex items-center justify-end sm:justify-center padding-content"
      >
        <div class="flex items-end gap-3 md:gap-12">
          <div>
            <h2 class="title relative mb-6 w-min">
              <img
                class="pointer-events-none absolute right-0 top-1/2 scale-150 -left-2 -translate-y-1/2"
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
.title {
  --at-apply: 'text-4xl font-heading text-primary-500 md:text-6xl';
}

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
