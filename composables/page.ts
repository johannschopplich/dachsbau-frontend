import { resolveURL } from 'ufo'
import type { MaybeComputedRef } from '@vueuse/core'

export function useCurrentPage<
  T extends Record<string, any> = Record<string, any>
>() {
  return useState<T>('kql.page', () => ({} as T))
}

export function setCurrentPage<
  T extends Record<string, any> = Record<string, any>
>(data: MaybeComputedRef<T>) {
  const _data = computed(() => resolveUnref(data) ?? {})

  const page = useCurrentPage()
  page.value = _data.value

  // Generate meta tags for the current page
  usePageMeta(_data.value)

  return _data
}

function usePageMeta(page: Record<string, any>) {
  const site = useSite()
  const route = useRoute()
  const { siteUrl } = useRuntimeConfig().public

  const title = page?.title
    ? `${page?.title} – ${site.value.title}`
    : site.value.title
  const description = page?.description || site.value.description
  const url = resolveURL(siteUrl, route.path)
  const image = page?.cover?.url ?? site.value?.cover?.url

  useHead({
    title,
    meta: [
      { rel: 'canonical', href: url },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: image },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:url', content: url },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:image', content: image },
    ],
  })
}
