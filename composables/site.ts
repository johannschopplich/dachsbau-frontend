import { site } from '#build/kirby'
import type { KirbySite } from '#build/kirby'

export function useSite() {
  return useState<Partial<KirbySite>>('kql.site', () => site)
}
