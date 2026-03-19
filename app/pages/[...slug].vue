<script setup lang="ts">
import type { KirbyPageResponse } from '~/queries'
import { getPageQuery } from '~/queries'

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
  const { data: errorPageData } = await useKql<KirbyPageResponse>(
    getPageQuery('error'),
  )
  data = errorPageData.value
  const event = useRequestEvent()
  if (event) setResponseStatus(event, 404)
}

// Store page data
const page = data?.result

if (!page) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
  })
}

setPage(page)
</script>

<template>
  <div
    class="mx-auto gutter pb-12 pt-36 space-y-6"
    :class="[page?.layouts?.length ? 'max-w-screen-xl' : 'max-w-screen-md']"
  >
    <h1
      class="title-hero hyphenate md:w-3/4"
      v-html="page?.title?.replace(/(dachs)$/, '&shy;$1')"
    />

    <KirbyLayouts v-if="page?.layouts?.length" :layouts="page.layouts" />

    <KirbyBlocks
      v-else-if="page?.blocks?.length"
      :blocks="page.blocks"
      class="prose text-secondary-900 font-serif md:text-xl md:font-350"
    />
  </div>
</template>
