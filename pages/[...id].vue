<script setup lang="ts">
import { KirbyBlock } from '#nuxt-kql'
import type { KirbyDefaultPage, KirbyDefaultPageQuery } from '~/types'

const route = useRoute()

const { data } = await useKql<KirbyDefaultPage, KirbyDefaultPageQuery>({
  query: `kirby.page("${route.path}")`,
  select: {
    id: true,
    isErrorPage: true,
    title: true,
    text: 'page.text.toBlocks',
    files: {
      query: 'page.files',
      select: {
        id: true,
        filename: true,
        url: true,
        srcset: true,
      },
    },
  },
})

useHead(() => ({
  title: data.value?.result?.title,
  meta: [
    { name: 'og:title', content: `${data.value?.result?.title} – Dachsbau` },
    { name: 'og:description', content: route.meta.description },
    {
      name: 'twitter:title',
      content: `${data.value?.result?.title} – Dachsbau`,
    },
    { name: 'twitter:description', content: route.meta.description },
  ],
}))

const text = computed<KirbyBlock<string>[]>(
  () => data.value?.result?.text ?? []
)
</script>

<template>
  <div>
    <h1
      class="w-3/4 text-5xl text-primary-600 font-heading-condensed font-medium md:text-6xl"
    >
      {{ data?.result?.title }}
    </h1>

    <div
      v-if="data?.result"
      class="prose text-secondary-900 font-serif md:text-xl md:font-350"
    >
      <template v-for="(block, index) in text" :key="index">
        <component :is="block.content.level" v-if="block.type === 'heading'">
          {{ (block as KirbyBlock<'heading'>).content.text }}
        </component>
        <div v-else v-html="block.content.text" />
      </template>
    </div>

    <div v-else class="prose">
      <h1>Oh, Mist, Seite nicht gefunden!</h1>
      <p>Mensch kann sich auch in einem Dachsbau verirren.</p>
      <p>
        Du kannst einfach zur
        <NuxtLink to="/">Startseite</NuxtLink> zurückkehren.
      </p>
    </div>
  </div>
</template>
