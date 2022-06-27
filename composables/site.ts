import type { KirbySite } from '~/types'

export function useSite() {
  return useState<KirbySite>('kql.site', () => ({}))
}
