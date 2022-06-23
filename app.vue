<script setup lang="ts">
import { resolveURL } from 'ufo'
import '~/assets/main.css'

const site = useSite()
const { baseUrl } = useRuntimeConfig().public
const route = useRoute()

const { data } = await useKql({
  query: 'site',
  select: {
    title: true,
    children: {
      query: 'site.children',
      select: {
        id: true,
        title: true,
        isListed: true,
      },
    },
    footer: {
      query: 'site.footer.toPages',
      select: {
        id: true,
        title: true,
      },
    },
  },
})

site.value = data.value.result || {}

const title = computed(() =>
  route.meta.title
    ? `${route.meta.title} – ${site.value.title}`
    : site.value.title
)
const description = 'Praxis für Yoga, systemische Beratung und Frauenbegleitung'
const url = computed(() => resolveURL(baseUrl, route.path))

useHead(() => ({
  htmlAttrs: {
    class: 'bg-primary-700',
  },
  titleTemplate(chunk) {
    return chunk ? `${chunk} – ${site.value.title}` : site.value.title
  },
  link: [
    { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
    { rel: 'stylesheet', href: '/fonts/Fraunces.css' },
    { rel: 'stylesheet', href: '/fonts/Henrietta.css' },
    { rel: 'stylesheet', href: '/fonts/HenriettaCondensed.css' },
  ],
  meta: [
    { name: 'og:title', content: title.value },
    { name: 'og:description', content: description },
    { name: 'og:url', content: url.value },
    { name: 'og:type', content: 'website' },
    { name: 'og:image', content: 'https://vuejs.org/images/logo.png' },
    { name: 'twitter:title', content: title.value },
    { name: 'twitter:description', content: description },
    { name: 'twitter:url', content: url.value },
    { name: 'twitter:image', content: 'https://vuejs.org/images/logo.png' },
    { name: 'twitter:card', content: 'summary' },
  ],
}))
</script>

<template>
  <div
    id="scroll-container"
    class="fixed w-[calc(100vw-1rem)] h-[calc(100*var(--vh,1vh)-1rem)] bg-secondary-200 m-2 overflow-y-scroll rounded-3xl md:w-[calc(100vw-3rem)] md:h-[calc(100*var(--vh,1vh)-3rem)] md:m-6"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
