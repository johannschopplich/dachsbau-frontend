<script setup lang="ts">
const { id } = usePathSegments()
const { data } = await useKql({
  query: `kirby.page("${id}")`,
  select: {
    id: true,
    intendedTemplate: true,
    title: true,
    description: true,
    text: 'page.text.toResolvedBlocks',
    backers: 'page.backers.toStructure',
    images: {
      query: 'page.files.template("image")',
      select: ['uuid', 'url'],
    },
    // Social media preview
    cover: {
      query: 'page.cover.or(site.cover).toFile?.resize(1200)',
      select: ['url'],
    },
  },
})

const page = data.value?.result
setPage(page)

const resolver = createUuidResolver(page.images)
</script>

<template>
  <div class="padding-content mx-auto max-w-screen-md space-y-6 pt-36 pb-12">
    <h1 class="page-title hyphenate md:w-3/4">
      {{ page?.title }}
    </h1>

    <KirbyBlocks
      :blocks="page?.text ?? []"
      class="prose text-secondary-900 md:font-350 font-serif md:text-xl"
    />

    <div v-if="page?.backers" class="grid grid-cols-2 gap-2 md:grid-cols-3">
      <div
        v-for="(item, index) in page.backers"
        :key="index"
        class="handdrawn-mask bg-secondary-100 relative p-3"
      >
        <div class="mb-2 flex justify-center">
          <img
            v-if="item.logo?.length"
            class="h-10"
            :src="resolver(item.logo?.[0])?.url"
            :alt="`Logo für ${item.title}`"
          />
          <div v-else class="h-10" />
        </div>

        <component
          :is="item.website ? 'a' : 'p'"
          :href="item.website"
          :target="item.website ? '_blank' : undefined"
          class="text-secondary-800 font-heading-condensed text-xl leading-none"
        >
          <div class="absolute inset-0" />
          {{ item.title }}
        </component>
        <p class="text-secondary-600 font-serif text-sm" v-html="item.text" />
      </div>
    </div>
  </div>
</template>
