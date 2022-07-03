<script setup lang="ts">
import { resolveURL } from 'ufo'
import { containerInjectionKey } from './types'

import '~/assets/css/main.css'
import '~/assets/css/components.css'

const site = useSite()
const { baseUrl } = useRuntimeConfig().public
const route = useRoute()

const title = computed(() =>
  route.meta.title
    ? `${route.meta.title} – ${site.value.title}`
    : site.value.title
)
const description = computed(
  () => route.meta.description ?? site.value.description
)
const url = computed(() => resolveURL(baseUrl, route.path))

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
    <Title>{{ title }}</Title>

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

    <Meta name="description" :content="description" />
    <Meta property="og:title" :content="title" />
    <Meta property="og:description" :content="description" />
    <Meta property="og:url" :content="url" />
    <Meta property="og:type" :content="'website'" />
    <Meta property="og:image" :content="'https://vuejs.org/images/logo.png'" />
    <Meta name="twitter:title" :content="title" />
    <Meta name="twitter:description" :content="description" />
    <Meta name="twitter:url" :content="url" />
    <Meta name="twitter:image" :content="'https://vuejs.org/images/logo.png'" />
    <Meta name="twitter:card" content="summary" />

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
