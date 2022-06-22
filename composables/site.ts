import type { KirbySite } from '~/types'

export function useSite() {
  return useState('kql.site', () => ({} as KirbySite))
}
