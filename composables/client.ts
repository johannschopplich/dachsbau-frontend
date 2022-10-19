const appState = ref({ isOpen: false })
const appContainer = ref<HTMLElement | undefined>()

export function useAppState() {
  return appState
}

export function useAppContainer() {
  return appContainer
}
