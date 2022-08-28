<script setup lang="ts">
import { containerInjectionKey } from '~/types'

import '~/assets/css/main.css'
import '~/assets/css/components.css'

useHead({
  htmlAttrs: {
    class: 'min-w-[320px] bg-primary-700',
    lang: 'de',
  },
})

const nav = useNavState()
const container = ref<HTMLElement | undefined>()
provide(containerInjectionKey, container)

onClickOutside(container, () => {
  container.value?.focus()
})

onMounted(() => {
  const { height } = useElementSize(container)

  // Manually set `--h-content`, because somehow `100vh` on Android is too tall
  watchEffect(() =>
    document.documentElement.style.setProperty(
      '--h-content',
      `${height.value}px`
    )
  )
})
</script>

<template>
  <Head>
    <Link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
    <Link rel="stylesheet" href="/fonts/Fraunces.css" />
    <Link rel="stylesheet" href="/fonts/Henrietta.css" />
    <Link rel="stylesheet" href="/fonts/HenriettaCondensed.css" />
    <Link
      rel="preload"
      href="/fonts/VCHenrietta-Regular.woff2"
      as="font"
      type="font/woff2"
      crossorigin="anonymous"
    />
    <Link
      rel="preload"
      href="/fonts/VCHenriettaCondensed-Regular.woff2"
      as="font"
      type="font/woff2"
      crossorigin="anonymous"
    />
    <Link
      rel="preload"
      href="/fonts/VCHenriettaCondensed-Medium.woff2"
      as="font"
      type="font/woff2"
      crossorigin="anonymous"
    />

    <Meta name="theme-color" content="#3A455B" />
  </Head>

  <div
    id="scroll-container"
    ref="container"
    class="fixed inset-[var(--frame-width)] min-w-[320px] bg-secondary-200 overflow-x-hidden overflow-y-scroll rounded-3xl focus:outline-none"
    tabindex="-1"
  >
    <NuxtLayout>
      <NuxtLoadingIndicator color="#5A6B8D" />
      <NuxtPage />
    </NuxtLayout>
  </div>

  <div v-show="!nav.isOpen" class="pointer-events-none">
    <img
      class="fixed right-0 bottom-0 w-[min(10rem,30vw)] md:right-1 md:bottom-1"
      src="~/assets/img/dachs-im-rahmen-320.png"
      alt=""
    />
  </div>
</template>
