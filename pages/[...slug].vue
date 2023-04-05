<script setup lang="ts">
import { getPageQuery } from '~/queries'
import type { KirbyPageResponse } from '~/queries'

// Use current slug or fall back to the homepage
const { slug } = useRoute().params
const pageUri =
  (Array.isArray(slug) ? slug.filter(Boolean).join('/') : slug) || 'home'

let data = (await useKql<KirbyPageResponse>(getPageQuery(pageUri))).data.value

if (!data?.result) {
  data = (await useKql(getPageQuery('error'))).data.value
  setResponseStatus(useRequestEvent(), 404)
}

const page = data?.result
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
