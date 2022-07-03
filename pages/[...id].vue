<script setup lang="ts">
import type { KirbyDefaultPage, KirbyDefaultPageQuery } from '~/types'

const route = useRoute()
const { data } = await useKql<KirbyDefaultPage, KirbyDefaultPageQuery>({
  query: `kirby.page("${route.path}")`,
  select: {
    id: true,
    title: true,
    description: true,
    text: 'page.text.toBlocks',
    layout: 'page.layout.toLayouts',
    files: {
      query: 'page.files',
      select: ['id', 'filename', 'url', 'srcset'],
    },
  },
})

const page = computed(() => data.value.result)
const title = computed(
  () => `${page.value?.title ?? 'Fehler'} – ${useSite().value.title}`
)
const hasLayout = computed(() => !!page.value?.layout?.length)

useHead(() => ({
  title: title.value,
  meta: [
    { property: 'og:title', content: title.value },
    { property: 'og:description', content: page.value?.description },
    {
      name: 'twitter:title',
      content: title.value,
    },
    { name: 'twitter:description', content: page.value?.description },
  ],
}))

/** Returns the number of columns this column spans */
function span(width: `${string}/${string}`, columns = 12) {
  const [a, b] = width.split('/')
  return columns * (parseInt(a) / parseInt(b))
}
</script>

<template>
  <div
    :class="[
      'padding-content mx-auto pt-36 pb-12',
      hasLayout ? 'max-w-screen-xl' : 'max-w-screen-md',
    ]"
  >
    <h1 class="page-title hyphenate md:w-3/4">
      {{ page?.title ?? 'Oh, Mist, Seite nicht gefunden!' }}
    </h1>

    <div v-if="hasLayout" class="md:space-y-12">
      <section
        v-for="layout in page.layout"
        :id="layout.id"
        :key="layout.id"
        class="md:grid md:gap-4 md:grid-cols-12"
      >
        <div
          v-for="(column, index) in layout.columns"
          :key="index"
          :style="{
            gridColumn: `span ${span(column.width)}`,
          }"
        >
          <div
            class="prose text-secondary-900 font-serif md:text-xl md:font-350"
          >
            <KirbyBlocks
              :blocks="column.blocks ?? []"
              :files="page.files ?? []"
            />
          </div>
        </div>
      </section>
    </div>

    <div class="prose text-secondary-900 font-serif md:text-xl md:font-350">
      <template v-if="page?.text">
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
