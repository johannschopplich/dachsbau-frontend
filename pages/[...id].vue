<script setup lang="ts">
import type { KirbyQueryResponse } from '#nuxt-kql'
import type { KirbyDefaultPage } from '~/types'

const data = ref(
  (await usePageDataById<KirbyDefaultPage>(useRoute().path)).value
)

if (!data.value?.result) {
  data.value = (await usePageDataById('error')).value
}

const page = setPage(() => data.value?.result as KirbyDefaultPage)
const hasLayouts = computed(() => !!page.value?.layouts?.length)

async function usePageDataById<T = any>(id: string) {
  const { data } = await useKql<KirbyQueryResponse<T>>({
    query: `kirby.page("${id}")`,
    select: {
      id: true,
      title: true,
      description: true,
      text: 'page.text.toBlocks',
      layouts: 'page.layout.toLayouts',
      // Social media preview
      cover: {
        query: 'page.cover.or(site.cover).toFile?.resize(1200)',
        select: ['url'],
      },
    },
  })
  return data
}
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
