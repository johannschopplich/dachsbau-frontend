<script setup lang="ts">
import { containerInjectionKey } from '~/app.vue'

definePageMeta({
  layout: 'home',
})

const { data } = await useKql({
  query: 'kirby.page("angebote").children.listed',
  select: {
    id: true,
    title: true,
    description: true,
    files: {
      query: 'page.files',
      select: {
        id: true,
        filename: true,
        url: true,
        srcset: true,
      },
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
        class="h-full max-w-screen-md mx-auto padding-content grid grid-rows-[1fr_auto_1fr] gap-4 text-center md:grid-rows-[1.5fr_auto_1fr]"
      >
        <div />
        <p class="text-4xl font-heading text-primary-500 md:text-6xl">
          Praxis für Yoga, systemische Beratung und Frauenbegleitung
        </p>
        <div class="w-2px bg-primary-500 mx-auto"></div>
      </div>

      <div
        class="absolute top-1/6 left-0 right-0 flex items-center justify-center translate-y-[calc(75%*var(--screen-ratio))] translate-z-1 pointer-events-none"
        aria-hidden="true"
      >
        <img
          class="w-[min(75vw,20rem)] opacity-25"
          src="~/assets/img/dachsbau-hof-2048.png"
          alt=""
        />
      </div>
    </div>

    <div class="animated-bg-container w-full">
      <div
        class="animated-bg-mask w-[50vw] h-full mx-auto scale-[calc(1+0.5*var(--screen-ratio))] translate-z-1 transform-origin-bottom rounded-tr-full rounded-tl-full md:w-[40vw] lg:w-[30vw]"
      />
    </div>

    <div class="py-12 space-y-12">
      <div
        class="h-[calc(0.25*var(--h-content))] w-2px bg-primary-500 mx-auto"
      />
      <p class="text-4xl font-heading text-primary-500 text-center md:text-6xl">
        Angebote
      </p>
    </div>

    <div class="relative bg-primary-700">
      <div class="max-w-screen-md mx-auto padding-content py-12">
        <div class="space-y-12">
          <div
            v-for="(item, index) in data?.result"
            :key="index"
            class="group flex flex-col gap-4 sm:flex-row sm:gap-12"
            @mouseenter="animationStack.set(index, true)"
            @mouseleave="animationStack.set(index, false)"
            @click="animationStack.clear(), animationStack.set(index, true)"
          >
            <!-- <img
              src="~/assets/dachsbau-hof.jpg"
              class="handdrawn-mask w-full aspect-[3/2] object-cover"
            /> -->
            <NuxtLink
              :to="{ path: `angebote/${item.id}` }"
              :class="[
                'handdrawn-mask cursor-pointer aspect-[3/2] bg-secondary-400 sm:w-1/2',
                index % 2 === 1 && 'sm:order-2',
              ]"
            />

            <NuxtLink
              :to="{ path: 'angebote/' + item.id }"
              class="block cursor-pointer flex justify-center px-4 sm:w-1/2 sm:px-0 sm:items-center"
            >
              <div>
                <div class="relative inline-block z-1">
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
        class="h-full max-w-screen-md mx-auto padding-content flex items-center text-center"
      >
        <p class="text-4xl font-heading text-primary-500 md:text-5xl">
          Kontakt
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animated-bg-container {
  --h: 0.5;
  height: calc(var(--h) * var(--h-content));
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
