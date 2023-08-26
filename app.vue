<script setup lang="ts">
import '~/assets/css/main.css'
import '~/assets/css/components.css'
import '~/assets/css/prose.css'

import '~/assets/fonts/Fraunces.css'
import '~/assets/fonts/Henrietta.css'
import '~/assets/fonts/HenriettaCondensed.css'

const appState = useAppState()
const appContainer = useAppContainer()

useHead({
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
    class="fixed inset-[var(--frame-width)] min-w-[320px] overflow-x-hidden overflow-y-scroll rounded-3xl bg-secondary-200 focus:outline-none"
    tabindex="-1"
  >
    <NuxtLoadingIndicator color="#5A6B8D" />

    <div class="relative h-full">
      <AppHeader />

      <main>
        <NuxtPage />
      </main>

      <AppFooter />
    </div>
  </div>

  <div v-show="!appState.nav.isOpen" class="pointer-events-none">
    <img
      class="fixed bottom-0 right-0 w-[min(10rem,30vw)] md:bottom-1 md:right-1"
      src="~/assets/img/dachs-im-rahmen-320.png"
      alt=""
    />
  </div>
</template>
