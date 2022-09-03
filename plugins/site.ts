import { defineNuxtPlugin } from '#app'
import type { H3Error } from 'h3'

export default defineNuxtPlugin(async () => {
  const site = useSite()

  if (Object.keys(site.value).length) return

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
          query: 'site.cover.toFile.resize(1200)',
          select: ['id', 'filename', 'url'],
        },
        footer: {
          query: 'site.footer.toPages',
          select: ['id', 'title'],
        },
      },
    })

    site.value = data?.result || {}
  } catch (e) {
    console.error('Failed to load site data', (e as H3Error).message)
  }
})
