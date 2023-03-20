/**
 * Returns the ID of the current route
 *
 * @remarks
 * Leading and trailing slashes are removed to ensure the computed hash key
 * is consistent with the route path
 */
export function usePathSegments(route = useRoute()) {
  const id = route.path

  return {
    id: withoutTrailingSlash(withoutLeadingSlash(id)),
  }
}

function withoutLeadingSlash(input = '') {
  return input.startsWith('/') ? input.slice(1) : input
}

function withoutTrailingSlash(input = '') {
  return input.endsWith('/') ? input.slice(0, -1) : input
}
