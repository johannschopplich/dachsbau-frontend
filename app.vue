<script setup lang="ts">
import { containerInjectionKey } from './types'

import '~/assets/css/main.css'
import '~/assets/css/components.css'

useHead({
  htmlAttrs: {
    class: 'bg-primary-700',
    lang: 'de',
  },
})

const container = ref<HTMLElement | undefined>()
provide(containerInjectionKey, container)

onMounted(() => {
  const { height } = useElementSize(container)

  // Manually set `--h-content`, because somehow Android 100vh is too high
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
    <Link rel="icon" href="/favicon.svg" type="image/svg+xml" />
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
    class="fixed inset-2 bg-secondary-200 overflow-x-hidden overflow-y-scroll rounded-3xl md:inset-6"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
