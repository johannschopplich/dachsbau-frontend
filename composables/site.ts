import { kirbySite } from '#build/kql'

export function useSite() {
  return readonly(shallowRef(kirbySite))
}
