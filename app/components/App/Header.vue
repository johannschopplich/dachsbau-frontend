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
const navItems = computed(
  () => site.value.children?.filter((i) => i.isListed) ?? [],
)

// On Suspense resolved event
nuxtApp.hook('page:finish', () => {
  isRedirecting.value = false
})

// Close menu on Escape key
useEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'Escape' && nav.value.isOpen) {
    nav.value.isOpen = false
    isLocked.value = false
  }
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
    class="flex items-start inset-x-4 top-6 justify-between absolute sm:inset-x-6 md:right-initial"
  >
    <NuxtLink
      to="/"
      class="group text-size-xl text-primary-700 leading-none font-heading-condensed flex gap-2 z-10 md:text-size-2xl md:leading-tight"
    >
      <img
        class="mt-[-0.125em] h-[1em]"
        src="~/assets/img/dachsbau-logo-64.png"
        alt="Dachsbau Tautenhain Logo"
      />

      <div class="relative">
        <img
          class="opacity-0 pointer-events-none inset-x-0 absolute group-hover:opacity-100 -bottom-1/6 md:-bottom-1/2"
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
      class="group text-size-xl leading-none font-heading-condensed appearance-none cursor-pointer relative z-20 md:text-size-xl md:hidden"
      :class="[nav.isOpen ? 'text-white' : 'text-primary-700']"
      :aria-expanded="nav.isOpen"
      aria-controls="main-navigation"
      :aria-label="nav.isOpen ? 'Menu schließen' : 'Menu öffnen'"
      @click="toggleMenu()"
    >
      <img
        class="opacity-0 pointer-events-none scale-200 inset-0 absolute group-hover:opacity-100"
        :class="[nav.isOpen && 'hidden']"
        src="~/assets/img/menu-hover-03.svg"
        alt=""
        aria-hidden="true"
      />
      <span class="relative">{{ nav.isOpen ? 'Schließen' : 'Menü' }}</span>
    </button>
  </header>

  <nav
    id="main-navigation"
    aria-label="Hauptnavigation"
    class="navigation px-6 bg-primary-600 flex items-center inset-x-0 top-0 justify-center absolute z-10 md:rounded-none md:bg-transparent md:left-initial md:top-6"
    :class="[nav.isOpen && 'is-open']"
  >
    <ul class="flex flex-col gap-4 md:flex-row">
      <li v-for="item in navItems" :key="item.uri">
        <NuxtLink
          :to="`/${item.uri}`"
          :aria-current="route.path === `/${item.uri}` ? 'page' : undefined"
          class="text-size-4xl text-white leading-tight font-heading-condensed md:text-size-2xl hover:text-secondary-600 md:text-primary-700"
          @click="close(`/${item.uri}`)"
        >
          {{ item.title }}
        </NuxtLink>
      </li>
    </ul>

    <div
      class="pointer-events-none transition-transform-250 bottom-0 left-6 fixed md:hidden"
      :class="[
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
    transition:
      height 250ms var(--timing-fn),
      opacity 250ms var(--timing-fn);
  }

  .navigation ul {
    opacity: 0;
    transform: translateY(0.5rem);
  }

  .navigation.is-open ul {
    opacity: 1;
    transform: translateY(0);
    transition:
      transform 250ms var(--timing-fn) 250ms,
      opacity 500ms var(--timing-fn) 250ms;
  }
}
</style>
