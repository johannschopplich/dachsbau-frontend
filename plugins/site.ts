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
          query: 'site.content.cover.toFile',
          select: ['id', 'filename', 'url', 'srcset', 'alt'],
        },
        footer: {
          query: 'site.footer.toPages',
          select: ['id', 'title'],
        },
      },
    })
    site.value = data?.result || {}
  } catch (e) {
    console.error('Error loading site data:', (e as H3Error).message)
  }
})
