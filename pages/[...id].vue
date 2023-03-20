<script setup lang="ts">
import { getPageQuery } from '~/queries'
import type { KirbyQueryResponse } from '#nuxt-kql'
import type { KirbyDefaultPage } from '~/types'

const { id } = usePathSegments()
const data = ref(
  (await useKql<KirbyQueryResponse<KirbyDefaultPage>>(getPageQuery(id))).data
    .value
)

if (!data.value?.result) {
  data.value = (await useKql(getPageQuery('error'))).data.value
}

const page = setPage(() => data.value?.result as KirbyDefaultPage)
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
