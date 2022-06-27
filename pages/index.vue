<script setup lang="ts">
import { containerInjectionKey } from '~/app.vue'

definePageMeta({
  layout: 'home',
})

const site = useSite()

const { data } = await useKql({
  query: 'kirby.page("angebote").children.listed',
  select: {
    id: true,
    title: true,
    description: true,
    cover: {
      query: 'page.content.cover.toFile',
      select: ['id', 'filename', 'url', 'srcset'],
    },
  },
})

const contentContainer = inject(containerInjectionKey)
const animationStack = reactive(new Map<number, boolean>())

onMounted(() => {
  const { y } = useScroll(contentContainer)
  const { height } = useWindowSize()

  watchEffect(() => {
    if (y.value < height.value) {
      document.documentElement.style.setProperty(
        '--screen-ratio',
        `${y.value / height.value}`
      )
    }
  })
})
</script>

<template>
  <div>
    <div class="relative w-full h-[var(--h-content)]">
      <div
        class="absolute top-1/6 left-0 right-0 flex items-center justify-center translate-y-[calc(100%*var(--screen-ratio))] pointer-events-none"
        aria-hidden="true"
      >
        <img
          class="w-[min(75vw,22rem)] opacity-25"
          src="~/assets/img/dachsbau-hof-1024.png"
          alt=""
        />
      </div>

      <div
        class="h-full max-w-screen-md mx-auto padding-content grid grid-rows-[1fr_auto_1fr] gap-4"
      >
        <div />
        <p class="title text-center">
          Praxis für Yoga, systemische Beratung und Frauenbegleitung
        </p>
        <div class="w-2px bg-primary-500 mx-auto"></div>
      </div>
    </div>

    <div
      class="animated-bg-container h-[calc(var(--h)*var(--h-content))] w-full"
      aria-hidden="true"
    >
      <div
        class="w-[50vw] h-full mx-auto scale-[calc(1+0.5*var(--screen-ratio))] transform-origin-bottom rounded-tr-full rounded-tl-full flex items-end overflow-hidden md:w-[40vw] lg:w-[30vw]"
      >
        <img
          v-if="site.cover"
          class="w-full h-[calc(200%-(100%*var(--screen-ratio)))] object-cover object-bottom"
          :srcset="site.cover?.srcset"
          sizes="
            (min-width: 1024px) 30vw,
            (min-width: 768px) 40vw,
            100vw"
          alt=""
        />
        <div v-else class="w-full h-full bg-secondary-400" />
      </div>
    </div>

    <div class="py-12 space-y-12">
      <div
        class="h-[calc(0.25*var(--h-content))] w-2px bg-primary-500 mx-auto"
      />
      <p class="title text-center">Angebote</p>
    </div>

    <div class="relative bg-primary-700">
      <div class="max-w-screen-lg mx-auto padding-content py-12">
        <div class="space-y-12">
          <div
            v-for="(item, index) in data?.result"
            :key="index"
            class="group flex flex-col gap-4 sm:flex-row sm:gap-12"
            @mouseenter="animationStack.set(index, true)"
            @mouseleave="animationStack.set(index, false)"
            @click="animationStack.clear(), animationStack.set(index, true)"
          >
            <NuxtLink
              :to="{ path: `/${item.id}` }"
              :class="[
                'aspect-[3/2] handdrawn-mask sm:w-1/2',
                index % 2 === 1 && 'sm:order-2',
              ]"
            >
              <img
                v-if="item.cover"
                :srcset="item.cover.srcset"
                class="h-full object-cover"
              />
              <div v-else class="w-full h-full bg-secondary-400" />
            </NuxtLink>

            <NuxtLink
              :to="{ path: `/${item.id}` }"
              class="block cursor-pointer flex justify-center px-4 sm:w-1/2 sm:px-0 sm:items-center"
            >
              <div>
                <div class="relative inline-block">
                  <HomeAnimatedDash
                    :is-active="animationStack.get(index) ?? false"
                  />

                  <span
                    class="relative text-2xl font-heading-condensed text-secondary-200 md:text-4xl"
                  >
                    {{ item.title }}
                  </span>
                </div>

                <div
                  class="font-serif text-secondary-200 sm:text-xl sm:font-350"
                >
                  {{ item.description }}
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full h-[var(--h-content)]">
      <div
        class="h-full max-w-screen-md mx-auto padding-content flex items-center justify-center"
      >
        <div>
          <h2 class="title relative">
            <img
              class="absolute top-1/2 -left-2 right-0 -translate-y-1/2 scale-150 pointer-events-none"
              src="~/assets/img/menu-hover-01.svg"
              alt=""
              aria-hidden="true"
            />
            <span>Kontakt</span>
          </h2>
          <div
            class="prose text-secondary-900 font-serif md:text-xl md:font-350"
          >
            <p>
              Madlen und Martin Simon<br />
              Dorfstr. 81<br />
              07639 Tautenhain
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  @apply text-4xl font-heading text-primary-500 md:text-6xl;
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

.animated-bg-mask {
  background: url('~/assets/yogascheune-hochkant.jpg') no-repeat center bottom;
  background-size: auto calc(200% - (100% * var(--screen-ratio)));
}
</style>
