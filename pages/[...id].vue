<script setup lang="ts">
import type { KirbyDefaultPage, KirbyDefaultPageQuery } from '~/types'

const route = useRoute()
const { data } = await useKql<KirbyDefaultPage, KirbyDefaultPageQuery>({
  query: `kirby.page("${route.path}")`,
  select: {
    id: true,
    isErrorPage: true,
    title: true,
    description: true,
    text: 'page.text.toBlocks',
    files: {
      query: 'page.files',
      select: ['id', 'filename', 'url', 'srcset'],
    },
  },
})

useHead(() => ({
  title: data.value?.result?.title,
  meta: [
    { name: 'og:title', content: data.value?.result?.title },
    { name: 'og:description', content: data.value?.result?.description },
    {
      name: 'twitter:title',
      content: data.value?.result?.title,
    },
    { name: 'twitter:description', content: data.value?.result?.description },
  ],
}))

const page = computed(() => data.value?.result)
</script>

<template>
  <div class="max-w-screen-md padding-content mx-auto pt-36 pb-12">
    <h1 class="page-title w-3/4 hyphenate">
      {{ page?.title ?? 'Oh, Mist, Seite nicht gefunden!' }}
    </h1>

    <div class="prose text-secondary-900 font-serif md:text-xl md:font-350">
      <template v-if="page">
        <KirbyBlocks :blocks="page.text ?? []" :files="page.files ?? []" />
      </template>

      <template v-else>
        <p>Mensch kann sich auch in einem Dachsbau verirren…</p>
        <p>
          Du kannst einfach zur
          <NuxtLink to="/">Startseite</NuxtLink> zurückkehren.
        </p>
      </template>
    </div>
  </div>
</template>
