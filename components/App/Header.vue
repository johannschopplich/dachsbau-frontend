<script setup lang="ts">
import { containerInjectionKey } from '~/app.vue'

const site = useSite()
const isOpen = ref(false)

const contentContainer = inject(containerInjectionKey)
const isLocked = useScrollLock(contentContainer)

const navItems = computed(() => [
  {
    id: '/',
    title: 'Startseite',
    isListed: true,
  },
  ...(site.value?.children ?? []).filter((i) => i.isListed),
])

function toggleMenu() {
  isLocked.value = !isLocked.value
  isOpen.value = !isOpen.value
  contentContainer.value.scroll({ top: 0, behavior: 'smooth' })
}

function close() {
  isOpen.value = false
  isLocked.value = false
}
</script>

<template>
  <header>
    <button
      :aria-expanded="isOpen"
      :aria-label="isOpen ? 'Menu schließen' : 'Menu öffnen'"
      :class="[
        'appearance-none cursor-pointer absolute top-0 right-0 p-6 text-2xl font-heading-condensed z-20 hover:text-underline md:hidden',
        isOpen ? 'text-white' : 'text-primary-700',
      ]"
      @click="toggleMenu()"
    >
      {{ isOpen ? 'Schließen' : 'Menü' }}
    </button>

    <nav
      :class="[
        'navigation absolute top-0 left-0 bottom-0 w-full bg-primary-600 flex items-center justify-center z-10 md:top-6 md:bg-transparent',
        isOpen && 'is-open',
      ]"
    >
      <ul class="flex flex-col gap-2 md:flex-row md:gap-4">
        <NuxtLink
          v-for="item in navItems"
          :key="item.id"
          :to="{ path: item.id }"
          class="text-4xl font-heading text-white hover:text-secondary-600 md:text-2xl md:text-primary-700"
          @click="close()"
        >
          {{ item.title }}
        </NuxtLink>
      </ul>
    </nav>

    <div
      :class="[
        'fixed bottom-0 left-4 transition-transform-250 z-20',
        isOpen
          ? 'translate-y-[20%] rotate-20 transition-delay-250'
          : 'translate-y-[100%] rotate-0 opacity-0 invisible pointer-events-none',
      ]"
    >
      <img class="h-[10rem]" src="~/assets/img/frechdachs-1024.png" alt="" />
    </div>
  </header>
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
