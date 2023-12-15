<script setup lang="ts">
import { getPageQuery } from '~/queries'
import type { KirbyPageResponse } from '~/queries'

// Use current slug or fall back to the homepage
const { slug } = useRoute().params
const pageUri =
  (Array.isArray(slug) ? slug.filter(Boolean).join('/') : slug) || 'home'

const { data: pageData } = await useKql<KirbyPageResponse>(
  getPageQuery(pageUri),
)

let data = pageData.value

// If page content is empty, load the error page
if (!data?.result) {
  const { data: pageData } = await useKql(getPageQuery('error'))
  data = pageData.value
  setResponseStatus(useRequestEvent(), 404)
}

// Store page data
const page = data?.result
setPage(page)
</script>

<template>
  <div
    class="mx-auto pb-12 pt-36 space-y-6 padding-content"
    :class="[page?.layouts?.length ? 'max-w-screen-xl' : 'max-w-screen-md']"
  >
    <h1
      class="hyphenate md:w-3/4 page-title"
      v-html="page?.title?.replace(/(dachs)$/, '&shy;$1')"
    />

    <KirbyLayouts v-if="page?.layouts?.length" :layouts="page.layouts" />

    <KirbyBlocks
      v-else-if="page?.text?.length"
      :blocks="page.text"
      class="prose text-secondary-900 font-serif md:text-xl md:font-350"
    />
  </div>
</template>
