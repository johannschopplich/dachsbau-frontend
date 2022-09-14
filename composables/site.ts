import { kirbySite } from '#build/kql'
import type { KirbySite } from '#build/kql'

export function useSite() {
  return useState<Partial<KirbySite>>('kql.site', () => kirbySite)
}
