import { unref } from 'vue'
import type { Ref } from 'vue'

export function usePage<T extends Record<string, any>>(data?: T | Ref<T>) {
  const nuxtApp = useNuxtApp()
  const page = useState<T>('kql.page', () => ({} as T))

  if (data) {
    nuxtApp.hook('page:finish', () => {
      page.value = unref(data)
    })
  }

  return page
}
