export default defineNuxtPlugin(async () => {
  const site = useSite()

  const { data } = await useKql({
    query: 'site',
    select: {
      title: true,
      description: true,
      children: {
        query: 'site.children',
        select: ['id', 'title', 'isListed'],
      },
      cover: {
        query: 'site.content.cover.toFile',
        select: ['id', 'filename', 'url', 'srcset'],
      },
      footer: {
        query: 'site.footer.toPages',
        select: ['id', 'title'],
      },
    },
  })

  site.value = data.value?.result || {}
})
