<script setup lang="ts">
import type { KirbyDefaultPage, KirbyDefaultPageQuery } from '~/types'

const route = useRoute()
const select = {
  id: true,
  title: true,
  description: true,
  text: 'page.text.toBlocks',
  layouts: 'page.layout.toLayouts',
  files: {
    query: 'page.files',
    select: ['id', 'filename', 'url', 'srcset'],
  },
}

const { data: defaultData } = await useKql<
  KirbyDefaultPage,
  KirbyDefaultPageQuery
>({
  query: `kirby.page("${route.path}")`,
  select,
})

let data = ref(defaultData.value)

if (!data.value?.result) {
  const { data: errorData } = await useKql({
    query: 'kirby.page("error}")',
    select,
  })
  data.value = errorData.value
}

const page = computed(() => data.value.result)
usePage(data.value.result)

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

    <div class="prose text-secondary-900 font-serif md:text-xl md:font-350">
      <KirbyBlocks :blocks="page.text ?? []" />
    </div>
  </div>
</template>
