import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  const site = useSite()

  // Lazily load the site data
  ;(async () => {
    try {
      const data = await $kql({
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

      site.value = data?.result || {}
    } catch (e) {
      console.error('Error loading site data:', e.message)
    }
  })()
})
