<script setup lang="ts">
import type { KirbyQueryResponse } from '#nuxt-kql'
import type { KirbyDefaultPage, KirbyDefaultPageQuery } from '~/types'

const route = useRoute()
const routeSelects: Record<string, Record<string, any>> = {
  '/freundinnen': {
    backers: 'page.backers.toStructure',
  },
}

const select = {
  id: true,
  title: true,
  description: true,
  text: 'page.text.toBlocks',
  layouts: 'page.layout.toLayouts',
  ...(routeSelects?.[route.path] ?? {}),
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

    <!-- Custom template logic -->
    <div v-if="page.backers" class="grid gap-2 grid-cols-2 md:grid-cols-3">
      <div
        v-for="(item, index) in page.backers"
        :key="index"
        class="relative bg-secondary-100 p-3"
      >
        <div class="flex justify-center mb-2">
          <img
            v-if="item.logo?.length"
            class="h-10"
            :srcset="
              page.images.find((i: any) => i.filename === item.logo?.[0])?.srcset
            "
            :alt="`Logo für ${item.title}`"
          />
          <div v-else class="h-10" />
        </div>

        <component
          :is="item.website ? 'a' : 'p'"
          :href="item.website"
          class="text-secondary-800 text-xl font-heading-condensed"
        >
          <div class="absolute inset-0" />
          {{ item.title }}
        </component>
        <p class="text-secondary-600 text-sm font-serif" v-html="item.text" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.prose :where(figcaption) {
  --at-apply: 'sm:px-2';
}
</style>
