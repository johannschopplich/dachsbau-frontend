<script setup lang="ts">
import { toRefs } from '@vueuse/core'

const nuxtApp = useNuxtApp()
const route = useRoute()
const site = useSite()

const appContainer = useAppContainer()
const appState = useAppState()
const { nav } = toRefs(appState)
const isRedirecting = ref(false)

const isLocked = useScrollLock(appContainer)

const navItems = computed(() =>
  (site.value?.children ?? []).filter((i: Record<string, any>) => i.isListed)
)

// On Suspense resolved event
nuxtApp.hook('page:finish', () => {
  isRedirecting.value = false
})

function toggleMenu() {
  appContainer.value?.scrollTo({ top: 0 })
  isLocked.value = !isLocked.value
  nav.value.isOpen = !nav.value.isOpen
}

async function close(path: string) {
  if (isRedirecting.value) return

  if (path === route.path) {
    nav.value.isOpen = false
    isLocked.value = false
    return
  }

  isRedirecting.value = true
  await until(isRedirecting).toBe(false)
  nav.value.isOpen = false
  isLocked.value = false
}
</script>

<template>
  <header
    class="md:right-initial absolute inset-x-4 top-6 flex items-start justify-between sm:inset-x-6"
  >
    <NuxtLink
      to="/"
      class="text-size-xl text-primary-700 font-heading-condensed md:text-size-2xl group z-10 flex gap-2 leading-none md:leading-tight"
    >
      <img
        class="mt-[-0.125em] h-[1em]"
        src="~/assets/img/dachsbau-logo-64.png"
        alt="Dachsbau Tautenhain Logo"
      />

      <div class="relative">
        <img
          class="-bottom-1/6 pointer-events-none absolute inset-x-0 opacity-0 group-hover:opacity-100 md:-bottom-1/2"
          src="~/assets/img/menu-hover-04.svg"
          alt=""
          aria-hidden="true"
        />
        <span class="relative">
          Dachsbau<br class="inline md:hidden" />
          Tautenhain
        </span>
      </div>
    </NuxtLink>

    <button
      :class="[
        'text-size-xl font-heading-condensed md:text-size-xl group relative z-20 cursor-pointer appearance-none leading-none md:hidden',
        nav.isOpen ? 'text-white' : 'text-primary-700',
      ]"
      :aria-expanded="nav.isOpen"
      :aria-label="nav.isOpen ? 'Menu schließen' : 'Menu öffnen'"
      @click="toggleMenu()"
    >
      <img
        :class="[
          'scale-200 pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100',
          nav.isOpen && 'hidden',
        ]"
        src="~/assets/img/menu-hover-03.svg"
        alt=""
        aria-hidden="true"
      />
      <span class="relative">{{ nav.isOpen ? 'Schließen' : 'Menü' }}</span>
    </button>
  </header>

  <nav
    :class="[
      'navigation bg-primary-600 md:left-initial absolute inset-x-0 top-0 z-10 flex items-center justify-center px-6 md:top-6 md:rounded-none md:bg-transparent',
      nav.isOpen && 'is-open',
    ]"
  >
    <ul class="flex flex-col gap-4 md:flex-row">
      <NuxtLink
        v-for="item in navItems"
        :key="item.id"
        :to="`/${item.id}`"
        class="text-size-4xl font-heading-condensed hover:text-secondary-600 md:text-size-2xl md:text-primary-700 leading-tight text-white"
        @click="close(`/${item.id}`)"
      >
        {{ item.title }}
      </NuxtLink>
    </ul>

    <div
      :class="[
        'transition-transform-250 pointer-events-none fixed bottom-0 left-6 md:hidden',
        nav.isOpen
          ? 'rotate-15 transition-delay-250 translate-y-[20%]'
          : 'invisible translate-y-[100%] rotate-0 opacity-0',
      ]"
      aria-hidden="true"
    >
      <img class="h-48" src="~/assets/img/frechdachs-512.png" alt="" />
    </div>
  </nav>
</template>

<style scoped>
@media (max-width: 767.98px) {
  .navigation {
    --timing-fn: cubic-bezier(0.4, 0, 0.2, 1);
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
    transition: height 250ms var(--timing-fn), opacity 250ms var(--timing-fn);
  }

  .navigation ul {
    opacity: 0;
    transform: translateY(0.5rem);
  }

  .navigation.is-open ul {
    opacity: 1;
    transform: translateY(0);
    transition: transform 250ms var(--timing-fn) 250ms,
      opacity 500ms var(--timing-fn) 250ms;
  }
}
</style>
