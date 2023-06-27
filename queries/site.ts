import type { KirbyQuerySchema } from 'kirby-fest'

export const siteQuery: KirbyQuerySchema = {
  query: 'site',
  select: {
    title: true,
    description: true,
    children: {
      query: 'site.children',
      select: ['id', 'title', 'isListed'],
    },
    cover: {
      query: 'site.cover.toFile?.resize(1200)',
      select: ['url'],
    },
    footer: {
      query: 'site.footer.toPages',
      select: ['id', 'title'],
    },
  },
}
