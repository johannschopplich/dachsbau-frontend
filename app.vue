<script lang="ts">
import type { InjectionKey, Ref } from 'vue'

export const containerInjectionKey = Symbol('container') as InjectionKey<
  Ref<HTMLElement | undefined>
>
</script>

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
    description: true,
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

site.value = data.value?.result || {}

const title = computed(() =>
  route.meta.title
    ? `${route.meta.title} – ${site.value.title}`
    : site.value.title
)
const description = computed(
  () => route.meta.description ?? site.value.description
)
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
    { name: 'og:description', content: description.value },
    { name: 'og:url', content: url.value },
    { name: 'og:type', content: 'website' },
    { name: 'og:image', content: 'https://vuejs.org/images/logo.png' },
    { name: 'twitter:title', content: title.value },
    { name: 'twitter:description', content: description.value },
    { name: 'twitter:url', content: url.value },
    { name: 'twitter:image', content: 'https://vuejs.org/images/logo.png' },
    { name: 'twitter:card', content: 'summary' },
  ],
}))

const container = ref<HTMLElement | undefined>()
provide(containerInjectionKey, container)
</script>

<template>
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
