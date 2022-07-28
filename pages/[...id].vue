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
    select: ['id', 'filename', 'url', 'srcset', 'alt'],
  },
}

const { data: defaultData } = await useKql<
  KirbyDefaultPage,
  KirbyDefaultPageQuery
>({
  query: `kirby.page("${route.path}")`,
  select,
})

let data = ref<KirbyQueryResponse>(defaultData.value)

if (!data.value?.result) {
  const { data: errorData } = await useKql({
    query: 'kirby.page("error")',
    select,
  })
  data.value = errorData.value
}

const page = computed(() => data.value.result)
const hasLayouts = computed(() => !!page.value?.layouts?.length)

// Make current page data globally available
usePage(page.value)
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
.prose :where(figure) {
  --at-apply: '-mx-6 sm:mx-[2em]';
}

.prose :where(figcaption) {
  --at-apply: 'px-6 sm:px-2';
}
</style>
