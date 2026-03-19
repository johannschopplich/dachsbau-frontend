<script setup lang="ts">
import '~/assets/css/main.css'
import '~/assets/css/prose.css'
import '~/assets/css/prose-overrides.css'

import '~/assets/fonts/Fraunces.css'
import '~/assets/fonts/Henrietta.css'
import '~/assets/fonts/HenriettaCondensed.css'

const appState = useAppState()
const appContainer = useAppContainer()

useServerHead({
  htmlAttrs: {
    class: 'min-w-[320px] bg-primary-700',
    lang: 'de',
  },
  link: [
    {
      rel: 'icon',
      href: '/favicon.png',
      type: 'image/png',
      sizes: '32x32',
    },
  ],
  meta: [
    {
      name: 'theme-color',
      content: '#3A455B',
    },
  ],
})

// Force scrolling inside container on mobile when clicking
// on the (thin) frame border accidentally
onClickOutside(appContainer, () => {
  appContainer.value?.focus()
})
</script>

<template>
  <div
    id="scroll-container"
    ref="appContainer"
    class="rounded-3xl bg-secondary-200 min-w-[320px] inset-[var(--frame-width)] fixed overflow-x-hidden overflow-y-scroll focus:outline-none"
    tabindex="-1"
  >
    <NuxtLoadingIndicator color="#5A6B8D" />

    <a
      href="#main-content"
      class="sr-only focus:text-xl focus:text-primary-700 focus:font-heading-condensed focus:left-6 focus:top-6 focus:fixed focus:z-50 focus:not-sr-only focus:text-underline"
    >
      Zum Inhalt springen
    </a>

    <div class="h-full relative">
      <AppHeader />

      <main id="main-content" tabindex="-1">
        <NuxtPage />
      </main>

      <AppFooter />
    </div>
  </div>

  <div v-show="!appState.nav.isOpen" class="pointer-events-none">
    <img
      class="w-[min(10rem,30vw)] bottom-0 right-0 fixed md:bottom-1 md:right-1"
      src="~/assets/img/dachs-im-rahmen-320.png"
      alt=""
    />
  </div>
</template>
