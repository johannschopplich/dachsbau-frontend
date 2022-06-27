export default defineNuxtPlugin(async () => {
  const site = useSite()

  const { data } = await useKql({
    query: 'site',
    select: {
      title: true,
      description: true,
      children: {
        query: 'site.children',
        select: {
          id: true,
          title: true,
          isListed: true,
        },
      },
      footer: {
        query: 'site.footer.toPages',
        select: {
          id: true,
          title: true,
        },
      },
    },
  })

  site.value = data.value?.result || {}
})
