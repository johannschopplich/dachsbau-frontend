import { readFile } from 'fs/promises'
import destr from 'destr'
import { defineNuxtPlugin } from '#app'
import type { H3Error } from 'h3'
import type { KirbyQueryResponse } from '#nuxt-kql'

export default defineNuxtPlugin(async () => {
  const site = useSite()
  let data: KirbyQueryResponse | undefined

  try {
    data = destr(await readFile('public/site.json', 'utf8'))
    site.value = data?.result || {}
  } catch (e) {
    console.warn('Preloaded site data not found')
  }

  if (!data) {
    fetchSite()
  }

  async function fetchSite() {
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
  }
})
