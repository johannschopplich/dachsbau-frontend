import { parseURL } from 'ufo'
import Plausible from 'plausible-tracker'

export default defineNuxtPlugin(() => {
  const { siteUrl } = useRuntimeConfig().public
  const { host: domain } = parseURL(siteUrl)

  const { enableAutoPageviews, enableAutoOutboundTracking } = Plausible({
    domain,
  })

  enableAutoPageviews()
  enableAutoOutboundTracking()
})
