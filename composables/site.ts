import { site } from '#build/kql'
import type { Site } from '#build/kql'

export function useSite() {
  return useState<Partial<Site>>('kql.site', () => site)
}
