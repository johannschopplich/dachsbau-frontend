<script setup lang="ts">
const route = useRoute()
const { data } = await useKql({
  query: `kirby.page("${route.path}")`,
  select: {
    id: true,
    title: true,
    description: true,
    text: 'page.text.toBlocks',
    layouts: 'page.layout.toLayouts',
    backers: 'page.backers.toStructure',
    images: {
      query: 'page.images',
      select: ['id', 'filename', 'url', 'width', 'height', 'srcset', 'alt'],
    },
  },
})

// Make current page data globally available
const page = setCurrentPage(() => data.value?.result)

const hasLayouts = computed(() => !!page.value?.layouts?.length)
</script>

<template>
  <div
    :class="[
      'padding-content mx-auto space-y-6 pt-36 pb-12',
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
          :target="item.website ? '_blank' : undefined"
          class="text-secondary-800 text-xl leading-none font-heading-condensed"
        >
          <div class="absolute inset-0" />
          {{ item.title }}
        </component>
        <p class="text-secondary-600 text-sm font-serif" v-html="item.text" />
      </div>
    </div>
  </div>
</template>
