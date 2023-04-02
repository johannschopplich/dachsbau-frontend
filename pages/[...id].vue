<script setup lang="ts">
import { getPageQuery } from '~/queries'
import type { KirbyPageResponse } from '~/queries'

const { id } = usePathSegments()
const data = ref((await useKql<KirbyPageResponse>(getPageQuery(id))).data.value)

if (!data.value?.result) {
  data.value = (await useKql(getPageQuery('error'))).data.value
}

const page = data.value?.result
setPage(page)
</script>

<template>
  <div
    :class="[
      'padding-content mx-auto space-y-6 pb-12 pt-36',
      page?.layouts?.length ? 'max-w-screen-xl' : 'max-w-screen-md',
    ]"
  >
    <h1
      class="page-title hyphenate md:w-3/4"
      v-html="page?.title?.replace(/(dachs)$/, '&shy;$1')"
    />

    <KirbyLayouts v-if="page?.layouts?.length" :layouts="page.layouts" />

    <KirbyBlocks
      v-else-if="page?.text?.length"
      :blocks="page.text"
      class="prose text-secondary-900 md:font-350 font-serif md:text-xl"
    />
  </div>
</template>
