<script setup lang="ts">
import type { KirbyQueryResponse } from '#nuxt-kql'
import type { KirbyDefaultPage } from '~/types'

const route = useRoute()
const defaultQuery = {
  id: true,
  title: true,
  description: true,
  text: 'page.text.toBlocks',
  layouts: 'page.layout.toLayouts',
  // Get all images for the Kirby image block
  images: {
    query: 'page.images',
    select: ['id', 'filename', 'url', 'width', 'height', 'srcset', 'alt'],
  },
  // Social media preview
  cover: {
    query: 'page.cover.or(site.cover).toFile.resize(1200)',
    select: ['url'],
  },
}

const { data: defaultData } = await useKql<
  KirbyQueryResponse<KirbyDefaultPage>
>({
  query: `kirby.page("${route.path}")`,
  select: defaultQuery,
})

let data = ref<KirbyQueryResponse<KirbyDefaultPage> | null>(defaultData.value)

if (!data.value?.result) {
  const { data: errorData } = await useKql({
    query: 'kirby.page("error")',
    select: defaultQuery,
  })
  data.value = errorData.value
}

// Make current page data globally available
const page = setCurrentPage(() => data.value?.result as KirbyDefaultPage)

const hasLayouts = computed(() => !!page.value?.layouts?.length)
</script>

<template>
  <div
    :class="[
      'padding-content mx-auto space-y-6 pt-36 pb-12',
      hasLayouts ? 'max-w-screen-xl' : 'max-w-screen-md',
    ]"
  >
    <h1
      class="page-title hyphenate md:w-3/4"
      v-html="page?.title?.replace(/(dachs)$/, '&shy;$1')"
    />

    <KirbyLayouts v-if="hasLayouts" :layouts="page.layouts ?? []" />

    <KirbyBlocks
      :blocks="page?.text ?? []"
      class="prose text-secondary-900 md:font-350 font-serif md:text-xl"
    />
  </div>
</template>
