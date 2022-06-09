/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NitroFetchRequest } from 'nitropack'
import type { Ref } from 'vue'

export type KqlQuery = `${'kirby' | 'site' | 'page'}${string}`

export interface KqlQueryRequest {
  query: KqlQuery
  select?: Record<string, string | boolean> | string[]
}

export interface KqlQueryResponse {
  code: number
  status: string
  result: any
}

export function useKql<ResT = KqlQueryResponse, ReqT = KqlQueryRequest>(
  body: Ref<ReqT> | ReqT | (() => ReqT)
) {
  const { kirbyBaseUrl, kirbyApiKey } = useRuntimeConfig()

  return useFetch<ResT, Error, NitroFetchRequest, ResT>('api/kql', {
    baseURL: kirbyBaseUrl,
    method: 'POST',
    body,
    headers: {
      Authorization: `Bearer ${kirbyApiKey}`,
    },
  })
}
