<script setup lang="ts">
import { containerInjectionKey } from '~/app.vue'

const site = useSite()
const isOpen = ref(false)

const contentContainer = inject(containerInjectionKey)
const isLocked = useScrollLock(contentContainer)

const navItems = computed(() =>
  (site.value?.children ?? []).filter((i) => i.isListed)
)

function toggleMenu() {
  contentContainer.value.scrollTo({ top: 0, left: 0 })
  isLocked.value = !isLocked.value
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
  isLocked.value = false
}
</script>

<template>
  <header
    class="absolute top-6 left-6 right-6 flex justify-between items-start z-20 md:right-auto"
  >
    <NuxtLink
      to="/"
      :class="[
        'group block relative text-size-2xl leading-none font-heading-condensed md:leading-tight',
        isOpen ? 'text-white' : 'text-primary-700',
      ]"
    >
      <img
        class="absolute left-0 right-0 -bottom-1/6 opacity-0 group-hover:opacity-100 md:-bottom-1/2 pointer-events-none"
        src="~/assets/img/menu-hover-04.svg"
        alt=""
        aria-hidden="true"
      />
      <span class="relative">
        Dachsbau<br class="inline md:hidden" />
        Tautenhain
      </span>
    </NuxtLink>

    <button
      :aria-expanded="isOpen"
      :aria-label="isOpen ? 'Menu schließen' : 'Menu öffnen'"
      :class="[
        'group appearance-none relative cursor-pointer text-size-2xl leading-none font-heading-condensed md:hidden',
        isOpen ? 'text-white' : 'text-primary-700',
      ]"
      @click="toggleMenu()"
    >
      <img
        :class="[
          'absolute inset-0 scale-200 opacity-0 pointer-events-none group-hover:opacity-100',
          isOpen && 'hidden',
        ]"
        src="~/assets/img/menu-hover-03.svg"
        alt=""
        aria-hidden="true"
      />
      <span class="relative">{{ isOpen ? 'Schließen' : 'Menü' }}</span>
    </button>
  </header>

  <nav
    :class="[
      'navigation absolute top-0 left-0 right-0 px-6 bg-primary-600 flex justify-center items-center z-10 md:top-6 md:bg-transparent md:justify-end',
      isOpen && 'is-open',
    ]"
  >
    <ul class="flex flex-col md:flex-row md:gap-4">
      <NuxtLink
        v-for="item in navItems"
        :key="item.id"
        :to="{ path: item.id }"
        class="text-size-4xl leading-tight font-heading-condensed text-white hover:text-secondary-600 md:text-size-2xl md:text-primary-700"
        @click="close()"
      >
        {{ item.title }}
      </NuxtLink>
    </ul>
  </nav>

  <div
    :class="[
      'fixed bottom-0 left-4 transition-transform-250 pointer-events-none z-20',
      isOpen
        ? 'translate-y-[20%] rotate-20 transition-delay-250'
        : 'translate-y-[100%] rotate-0 opacity-0 invisible',
    ]"
    aria-hidden="true"
  >
    <img class="h-48" src="~/assets/img/frechdachs-512.png" alt="" />
  </div>
</template>

<style scoped>
@media (max-width: 767.98px) {
  .navigation {
    height: 100%;
    box-shadow: 0 0 5rem 5rem rgba(0, 0, 0, 0.5);
  }

  .navigation:not(.is-open) {
    pointer-events: none;
    visibility: hidden;
    opacity: 0;
    height: 0;
  }

  .navigation.is-open {
    transition: height 250ms ease-in, opacity 250ms ease-in;
  }

  .navigation ul {
    opacity: 0;
    transform: translateY(0.5rem);
  }

  .navigation.is-open ul {
    opacity: 1;
    transform: translateY(0);
    transition: transform 250ms ease 250ms, opacity 500ms ease 250ms;
  }
}
</style>
