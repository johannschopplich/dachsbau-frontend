<script setup lang="ts">
import type { KirbyQueryResponse } from '#nuxt-kql'
import type { KirbyDefaultPage, KirbyDefaultPageQuery } from '~/types'

const route = useRoute()
const select = {
  id: true,
  title: true,
  description: true,
  text: 'page.text.toBlocks',
  layouts: 'page.layout.toLayouts',
  images: {
    query: 'page.images',
    select: ['id', 'filename', 'url', 'width', 'height', 'srcset', 'alt'],
  },
}

const { data: defaultData } = await useKql<
  KirbyDefaultPage,
  KirbyDefaultPageQuery
>({
  query: `kirby.page("${route.path}")`,
  select,
})

let data = ref<KirbyQueryResponse | null>(defaultData.value)

if (!data.value?.result) {
  const { data: errorData } = await useKql({
    query: 'kirby.page("error")',
    select,
  })
  data.value = errorData.value
}

// Make current page data globally available
const page = setCurrentPage(() => data.value?.result)

const hasLayouts = computed(() => !!page.value?.layouts?.length)
</script>

<template>
  <div
    :class="[
      'padding-content mx-auto pt-36 pb-12',
      hasLayouts ? 'max-w-screen-xl' : 'max-w-screen-md',
    ]"
  >
    <h1 class="page-title hyphenate md:w-3/4">
      {{ page?.title }}
    </h1>

    <KirbyLayouts v-if="hasLayouts" :layouts="page.layouts ?? []" />

    <KirbyBlocks
      :blocks="page?.text ?? []"
      class="prose text-secondary-900 font-serif md:text-xl md:font-350"
    />
  </div>
</template>

<style scoped>
.prose :where(figcaption) {
  --at-apply: 'sm:px-2';
}
</style>
