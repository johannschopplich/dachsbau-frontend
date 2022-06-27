import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  // Lazily load the necessariy site data
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

      useSite().value = data?.result || {}
    } catch (e) {
      console.error('Error loading site data', e)
      console.error('Error message:', e.message)
    }
  })()
})
