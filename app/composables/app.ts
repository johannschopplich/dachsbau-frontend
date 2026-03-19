export function useAppState() {
  return useState('app.state', () => ({
    nav: { isOpen: false },
  }))
}

export function useAppContainer() {
  return useState<HTMLElement | undefined>('app.container')
}
