<script setup lang="ts">
import '~/assets/css/main.css'
import '~/assets/css/components.css'
import '~/assets/css/prose.css'

const route = useRoute()
const navState = useAppState()
const appContainer = useAppContainer()

// Force scrolling inside container on mobile when clicking
// on the (thin) frame border accidentally
onClickOutside(appContainer, () => {
  appContainer.value?.focus()
})

// Set actual vh on mobile – not in app.vue but embedded script to
// avoid layout shift before hydration
useHead({
  script: [
    {
      children:
        "matchMedia('(hover: none)').matches && document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)",
    },
  ],
})

onMounted(() => {
  const { height } = useElementSize(appContainer)
  const { y } = useScroll(appContainer)
  const scrollPositions = useSavedPositions()

  // Save the scroll position, since the fixed container
  // will return the same value always
  watchDebounced(
    y,
    () => {
      scrollPositions.set(route.fullPath, { top: y.value })
    },
    { debounce: 100 }
  )

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
  <Html class="bg-primary-700 min-w-[320px]" lang="de">
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

    <Body>
      <div
        id="scroll-container"
        ref="appContainer"
        class="bg-secondary-200 fixed inset-[var(--frame-width)] min-w-[320px] overflow-x-hidden overflow-y-scroll rounded-3xl focus:outline-none"
        tabindex="-1"
      >
        <NuxtLayout>
          <NuxtLoadingIndicator color="#5A6B8D" />
          <NuxtPage />
        </NuxtLayout>
      </div>

      <div v-show="!navState.isOpen" class="pointer-events-none">
        <img
          class="fixed right-0 bottom-0 w-[min(10rem,30vw)] md:right-1 md:bottom-1"
          src="~/assets/img/dachs-im-rahmen-320.png"
          alt=""
        />
      </div>
    </Body>
  </Html>
</template>
