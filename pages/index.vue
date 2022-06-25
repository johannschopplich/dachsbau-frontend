<script setup lang="ts">
import { containerInjectionKey } from '~/app.vue'

definePageMeta({
  layout: 'home',
})

const { data } = await useKql({
  query: 'kirby.page("dachse").children.listed',
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

  watch(
    y,
    (value) => {
      if (value < height.value) {
        document.documentElement.style.setProperty(
          '--screen-ratio',
          `${value / height.value}`
        )
      }
    },
    { immediate: true }
  )
})
</script>

<template>
  <div>
    <div class="relative w-full h-[var(--h-content)]">
      <div
        class="floating-hero h-full max-w-screen-md mx-auto content-base grid grid-rows-[1fr_auto_1fr] gap-4 text-center md:grid-rows-[1.5fr_auto_1fr]"
      >
        <div />
        <p class="text-4xl font-heading text-primary-500 md:text-6xl">
          Praxis für Yoga, systemische Beratung und Frauenbegleitung
        </p>
        <div class="w-2px bg-primary-500 mx-auto"></div>
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
      <div class="max-w-screen-md mx-auto py-12 content-base">
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
            <div
              :class="[
                'handdrawn-mask cursor-pointer aspect-[3/2] bg-secondary-400 sm:w-1/2',
                index % 2 === 1 && 'sm:order-2',
              ]"
            />

            <div
              class="cursor-pointer flex justify-center px-4 sm:w-1/2 sm:px-0 sm:items-center"
            >
              <div>
                <div class="relative inline-block z-5">
                  <HomeAnimatedDash
                    :is-active="animationStack.get(index) ?? false"
                  />

                  <span
                    class="relative text-2xl font-heading-condensed text-secondary-200 md:text-4xl"
                  >
                    {{ item.title }}
                  </span>
                </div>
                <p class="font-serif text-secondary-200 sm:text-xl sm:font-350">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full h-[var(--h-content)]">
      <div
        class="h-full max-w-screen-md mx-auto content-base flex items-center text-center"
      >
        <p class="text-4xl font-heading text-primary-500 md:text-5xl">
          Kontakt
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.floating-hero::before {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateZ(1);
  background: url('~/assets/img/dachsbau-hof-2048.png') no-repeat center
    calc(25% + (50% * var(--screen-ratio)));
  background-size: min(75vw, 20rem) auto;
  opacity: 0.25;
  pointer-events: none;
}

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
